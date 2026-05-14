import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import WelcomeScreen from './components/WelcomeScreen';
import Header from './components/Header';
import CompanyCard from './components/CompanyCard';
import PredictionModal from './components/PredictionModal';
import EventPopup from './components/EventPopup';
import ResultScreen from './components/ResultScreen';

import {
  INITIAL_COMPANIES,
  EVENTS,
  STARTING_CASH,
  TOTAL_ROUNDS,
  CORRECT_PREDICTION_BONUS,
} from './data/constants';

// ─── Game States ──────────────────────────────────────────────────────────────
// 'welcome'    → welcome screen
// 'shopping'   → player can buy / sell
// 'predicting' → player guesses price direction
// 'event'      → show news event + prediction result
// 'gameover'   → final result screen

function getInitialPortfolio() {
  return Object.fromEntries(INITIAL_COMPANIES.map(c => [c.id, 0]));
}

// Pick one event per round, ensuring all companies appear at least once in 5 rounds
function pickEventsForGame() {
  const shuffled = [...EVENTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, TOTAL_ROUNDS);
}

export default function App() {
  const [gameState, setGameState] = useState('welcome');
  const [cash, setCash] = useState(STARTING_CASH);
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [portfolio, setPortfolio] = useState(getInitialPortfolio());
  const [round, setRound] = useState(1);
  const [events, setEvents] = useState([]);             // pre-chosen events for the game
  const [currentEvent, setCurrentEvent] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null); // 'up' or 'down'
  const [priceFlash, setPriceFlash] = useState({});     // { companyId: 'up' | 'down' }
  const [bonusMessage, setBonusMessage] = useState(null);

  // ─── Helpers ───────────────────────────────────────────────────────────────

  const calcPortfolioValue = useCallback(
    (comps = companies, port = portfolio) =>
      comps.reduce((acc, c) => acc + (port[c.id] || 0) * c.price, 0),
    [companies, portfolio]
  );

  // ─── Game Actions ──────────────────────────────────────────────────────────

  const startGame = () => {
    const pickedEvents = pickEventsForGame();
    setCash(STARTING_CASH);
    setCompanies(INITIAL_COMPANIES.map(c => ({ ...c }))); // fresh copy
    setPortfolio(getInitialPortfolio());
    setRound(1);
    setEvents(pickedEvents);
    setCurrentEvent(pickedEvents[0]);
    setPredictionResult(null);
    setPriceFlash({});
    setBonusMessage(null);
    setGameState('predicting'); // start with prediction for round 1
  };

  const handleBuy = (companyId, qty) => {
    const company = companies.find(c => c.id === companyId);
    const totalCost = company.price * qty;
    if (cash < totalCost || qty <= 0) return;
    setCash(prev => prev - totalCost);
    setPortfolio(prev => ({ ...prev, [companyId]: (prev[companyId] || 0) + qty }));
  };

  const handleSell = (companyId, qty) => {
    if ((portfolio[companyId] || 0) < qty || qty <= 0) return;
    const company = companies.find(c => c.id === companyId);
    const totalGain = company.price * qty;
    setCash(prev => prev + totalGain);
    setPortfolio(prev => ({ ...prev, [companyId]: prev[companyId] - qty }));
  };

  // Player submitted a prediction
  const handlePredict = (guess) => {
    setPredictionResult(guess);
    const event = currentEvent;

    // Apply price change to the target company
    setCompanies(prev =>
      prev.map(c => {
        if (c.id !== event.companyId) return c;
        const newPrice = Math.max(10, Math.round(c.price * (1 + event.priceChange)));
        return { ...c, price: newPrice };
      })
    );

    // Flash animation
    setPriceFlash({ [event.companyId]: event.direction });
    setTimeout(() => setPriceFlash({}), 1200);

    // Bonus if correct
    if (guess === event.direction) {
      setCash(prev => prev + CORRECT_PREDICTION_BONUS);
      setBonusMessage(`🎉 +₹${CORRECT_PREDICTION_BONUS} bonus!`);
    } else {
      setBonusMessage(null);
    }

    setGameState('event');
  };

  // Player clicks "Continue" from the event popup → shopping phase
  const handleEventContinue = () => {
    setBonusMessage(null);
    setGameState('shopping');
  };

  // Player clicks "Next Round" → move to next round's prediction (or game over)
  const handleNextRound = () => {
    const nextRound = round + 1;
    if (nextRound > TOTAL_ROUNDS) {
      setGameState('gameover');
    } else {
      setRound(nextRound);
      setCurrentEvent(events[nextRound - 1]);
      setPredictionResult(null);
      setGameState('predicting');
    }
  };

  const handleRestart = () => {
    setGameState('welcome');
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  if (gameState === 'welcome') {
    return <WelcomeScreen onStart={startGame} />;
  }

  if (gameState === 'gameover') {
    return (
      <ResultScreen
        cash={cash}
        portfolio={portfolio}
        companies={companies}
        onRestart={handleRestart}
      />
    );
  }

  // Main game screen (shopping + overlays)
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-50 to-violet-100">
      <Header
        cash={cash}
        round={round}
        portfolioValue={calcPortfolioValue()}
      />

      {/* Bonus toast */}
      <AnimatePresence>
        {bonusMessage && (
          <motion.div
            key="bonus-toast"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white font-black px-6 py-2 rounded-full shadow-lg text-sm"
          >
            {bonusMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Company cards */}
      <main className="max-w-4xl mx-auto px-4 py-5 space-y-4">
        {/* Round banner */}
        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl p-4 text-white flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Round {round} of {TOTAL_ROUNDS}</p>
            <h2 className="text-lg font-black">Buy &amp; Sell Time! 🛒</h2>
            <p className="text-white/80 text-xs font-semibold">Pick your shares wisely before next news hits!</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextRound}
            className="bg-white text-indigo-700 font-black px-4 py-2 rounded-2xl text-sm shadow hover:bg-indigo-50 transition-colors whitespace-nowrap"
          >
            {round < TOTAL_ROUNDS ? 'Next Round →' : 'See Results 🏁'}
          </motion.button>
        </div>

        {/* Company cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map(company => (
            <CompanyCard
              key={company.id}
              company={company}
              ownedShares={portfolio[company.id] || 0}
              cash={cash}
              onBuy={handleBuy}
              onSell={handleSell}
              priceFlash={priceFlash[company.id] || null}
            />
          ))}
        </div>

        {/* Quick tip */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-indigo-100 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">💡 Quick Tip</p>
          <p className="text-sm font-semibold text-gray-600">
            {round === 1 && "Spread your money across all 3 companies to stay safe!"}
            {round === 2 && "Prices change with news — watch for hints!"}
            {round === 3 && "Buying low and selling high = profit! 📈"}
            {round === 4 && "Don't put all your money in just one company!"}
            {round === 5 && "Last round! Sell your shares to lock in your profits!"}
          </p>
        </div>
      </main>

      {/* ── Overlays ─────────────────────────────────────────────────────── */}

      <AnimatePresence>
        {gameState === 'predicting' && currentEvent && (
          <PredictionModal
            key="prediction"
            event={currentEvent}
            onPredict={handlePredict}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameState === 'event' && currentEvent && (
          <EventPopup
            key="event"
            event={currentEvent}
            predictionResult={predictionResult}
            onContinue={handleEventContinue}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
