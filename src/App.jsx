import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import WelcomeScreen   from './components/WelcomeScreen';
import Header          from './components/Header';
import CompanyCard     from './components/CompanyCard';
import PredictionModal from './components/PredictionModal';
import EventPopup      from './components/EventPopup';
import ResultScreen    from './components/ResultScreen';

import {
  INITIAL_COMPANIES,
  EVENTS,
  STARTING_CASH,
  TOTAL_ROUNDS,
  CORRECT_PREDICTION_BONUS,
} from './data/constants';

function getInitialPortfolio() {
  return Object.fromEntries(INITIAL_COMPANIES.map(c => [c.id, 0]));
}

function pickEventsForGame() {
  return [...EVENTS].sort(() => Math.random() - 0.5).slice(0, TOTAL_ROUNDS);
}

const TIPS = [
  'Spread your money across all 3 companies to stay safe!',
  'Prices change with news — watch for hints before you trade!',
  'Buy low, sell high = profit! 📈',
  "Don't put all your money in one company!",
  'Last round! Sell shares now to lock in your profits!',
];

export default function App() {
  const [gameState, setGameState]               = useState('welcome');
  const [cash, setCash]                         = useState(STARTING_CASH);
  const [companies, setCompanies]               = useState(INITIAL_COMPANIES);
  const [portfolio, setPortfolio]               = useState(getInitialPortfolio());
  const [round, setRound]                       = useState(1);
  const [events, setEvents]                     = useState([]);
  const [currentEvent, setCurrentEvent]         = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [priceFlash, setPriceFlash]             = useState({});
  const [bonusMessage, setBonusMessage]         = useState(null);

  const calcPortfolioValue = useCallback(
    (comps = companies, port = portfolio) =>
      comps.reduce((acc, c) => acc + (port[c.id] || 0) * c.price, 0),
    [companies, portfolio]
  );

  const startGame = () => {
    const picked = pickEventsForGame();
    setCash(STARTING_CASH);
    setCompanies(INITIAL_COMPANIES.map(c => ({ ...c })));
    setPortfolio(getInitialPortfolio());
    setRound(1);
    setEvents(picked);
    setCurrentEvent(picked[0]);
    setPredictionResult(null);
    setPriceFlash({});
    setBonusMessage(null);
    setGameState('predicting');
  };

  const handleBuy = (id, qty) => {
    const co = companies.find(c => c.id === id);
    if (cash < co.price * qty || qty <= 0) return;
    setCash(p => p - co.price * qty);
    setPortfolio(p => ({ ...p, [id]: (p[id] || 0) + qty }));
  };

  const handleSell = (id, qty) => {
    const co = companies.find(c => c.id === id);
    if ((portfolio[id] || 0) < qty || qty <= 0) return;
    setCash(p => p + co.price * qty);
    setPortfolio(p => ({ ...p, [id]: p[id] - qty }));
  };

  const handlePredict = (guess) => {
    setPredictionResult(guess);
    // Move to shopping without updating prices yet!
    setGameState('shopping');
  };

  const handleEndRound = () => {
    const ev = currentEvent;
    
    // Now the round ends, the market reacts, and prices update!
    setCompanies(prev => prev.map(c => {
      if (c.id === ev.companyId) {
        return { ...c, price: Math.max(10, Math.round(c.price * (1 + ev.priceChange))) };
      }
      const randomNoise = (Math.random() * 0.10) - 0.05;
      return { ...c, price: Math.max(10, Math.round(c.price * (1 + randomNoise))) };
    }));

    setPriceFlash({ [ev.companyId]: ev.direction });
    
    if (predictionResult === ev.direction) {
      setCash(p => p + CORRECT_PREDICTION_BONUS);
      setBonusMessage(`🎉 +₹${CORRECT_PREDICTION_BONUS} bonus!`);
    } else {
      setBonusMessage(null);
    }
    
    setGameState('event');
  };

  const handleEventContinue = () => { 
    setBonusMessage(null); 
    
    // Move to next round
    const next = round + 1;
    if (next > TOTAL_ROUNDS) { 
      setGameState('gameover'); 
    } else {
      setRound(next);
      setCurrentEvent(events[next - 1]);
      setPredictionResult(null);
      setPriceFlash({});
      setGameState('predicting');
    }
  };

  if (gameState === 'welcome')  return <WelcomeScreen onStart={startGame} />;
  if (gameState === 'gameover') return (
    <ResultScreen cash={cash} portfolio={portfolio} companies={companies} onRestart={() => setGameState('welcome')} />
  );

  return (
    <div className="min-h-screen py-8">

      {/* Bonus toast */}
      <AnimatePresence>
        {bonusMessage && (
          <motion.div
            key="bonus"
            initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white font-black px-5 py-2 rounded-full shadow-lg text-sm"
          >
            {bonusMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-[900px] mx-auto flex flex-col gap-6 px-4">
        {/* Header */}
        <Header cash={cash} round={round} portfolioValue={calcPortfolioValue()} />

        {/* ── Game board ── */}
        <div className="flex gap-6 items-start">

          {/* ── Daily Bugle news panel ── */}
          <div className="game-card w-[260px] flex-shrink-0 p-5 flex flex-col gap-3 relative pb-8">
            {/* Title */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 text-xl">📰</span>
              <p className="font-hand font-bold text-red-500 text-xl leading-none">Daily Bugle</p>
            </div>

            {currentEvent ? (
              <>
                <p className="font-bold text-slate-800 text-sm leading-snug">{currentEvent.headline}</p>
                <p className="text-slate-600 text-lg leading-snug font-hand mt-1">
                  {currentEvent.detail}
                </p>
                <p className="text-right font-hand text-slate-400 text-sm absolute bottom-3 right-4">
                  Read carefully!
                </p>
              </>
            ) : (
              <p className="text-slate-400 text-lg italic font-hand">No news yet…</p>
            )}
          </div>

          {/* ── Company cards + End Round ── */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
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

            <div className="flex justify-end pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEndRound}
                className="font-bold text-white px-8 py-3 rounded-xl shadow-sm text-base transition-all"
                style={{ background: '#F5A623' }}
              >
                {round < TOTAL_ROUNDS ? 'End Round →' : 'See Results 🏁'}
              </motion.button>
            </div>
          </div>

        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {gameState === 'predicting' && currentEvent && (
          <PredictionModal key="pred" event={currentEvent} onPredict={handlePredict} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {gameState === 'event' && currentEvent && (
          <EventPopup key="ev" event={currentEvent} predictionResult={predictionResult} onContinue={handleEventContinue} />
        )}
      </AnimatePresence>
    </div>
  );
}
