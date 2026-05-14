import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CompanyCard({ company, ownedShares, cash, onBuy, onSell, priceFlash }) {
  const [buyQty, setBuyQty] = useState(1);
  const [sellQty, setSellQty] = useState(1);
  const [showBuyPanel, setShowBuyPanel] = useState(false);
  const [showSellPanel, setShowSellPanel] = useState(false);

  const canBuy = cash >= company.price * buyQty;
  const canSell = ownedShares >= sellQty;
  const maxBuyable = Math.floor(cash / company.price);

  const handleBuy = () => {
    onBuy(company.id, buyQty);
    setShowBuyPanel(false);
    setBuyQty(1);
  };

  const handleSell = () => {
    onSell(company.id, sellQty);
    setShowSellPanel(false);
    setSellQty(1);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-3xl border-2 ${company.border} ${company.lightBg} overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300`}
    >
      {/* Gradient header strip */}
      <div className={`bg-gradient-to-r ${company.color} p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <span className="text-4xl drop-shadow">{company.emoji}</span>
          <div>
            <h2 className="text-white font-black text-lg leading-tight">{company.name}</h2>
            <p className="text-white/80 text-xs font-medium">{company.tagline}</p>
          </div>
        </div>

        {/* Price badge */}
        <div
          className={`bg-white/90 rounded-2xl px-3 py-2 text-center min-w-[72px] transition-colors duration-300 ${
            priceFlash === 'up' ? 'price-up' : priceFlash === 'down' ? 'price-down' : ''
          }`}
        >
          <p className="text-xs font-bold text-gray-500">Price</p>
          <p className="text-xl font-black text-gray-800">₹{company.price}</p>
          {priceFlash === 'up' && <p className="text-xs font-bold text-emerald-600">▲ Up!</p>}
          {priceFlash === 'down' && <p className="text-xs font-bold text-red-500">▼ Down!</p>}
        </div>
      </div>

      {/* Shares owned row */}
      <div className="px-4 py-3 flex items-center justify-between bg-white/60">
        <div className="flex items-center gap-2">
          <span className="text-lg">📦</span>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">You own</p>
            <p className="text-lg font-black text-gray-800">
              {ownedShares} share{ownedShares !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wide text-right">Total value</p>
          <p className="text-lg font-black text-indigo-700 text-right">₹{(ownedShares * company.price).toLocaleString()}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 pb-4 flex gap-3">
        {/* BUY */}
        <div className="flex-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setShowBuyPanel(!showBuyPanel); setShowSellPanel(false); }}
            disabled={maxBuyable === 0}
            className={`w-full py-3 rounded-2xl font-black text-base transition-all duration-200 ${
              maxBuyable === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-emerald-200 active:scale-95'
            }`}
          >
            🛒 Buy
          </motion.button>

          <AnimatePresence>
            {showBuyPanel && maxBuyable > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 bg-emerald-50 border border-emerald-200 rounded-2xl p-3 overflow-hidden"
              >
                <p className="text-xs text-emerald-700 font-bold mb-2 text-center">
                  Max: {maxBuyable} share{maxBuyable !== 1 ? 's' : ''}
                </p>
                <div className="flex items-center gap-2 mb-2 justify-center">
                  <button
                    onClick={() => setBuyQty(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-emerald-200 text-emerald-800 font-black text-lg hover:bg-emerald-300 transition"
                  >−</button>
                  <span className="text-lg font-black text-emerald-800 w-8 text-center">{buyQty}</span>
                  <button
                    onClick={() => setBuyQty(q => Math.min(maxBuyable, q + 1))}
                    className="w-8 h-8 rounded-full bg-emerald-200 text-emerald-800 font-black text-lg hover:bg-emerald-300 transition"
                  >+</button>
                </div>
                <p className="text-center text-xs text-emerald-600 font-bold mb-2">Cost: ₹{(buyQty * company.price).toLocaleString()}</p>
                <button
                  onClick={handleBuy}
                  disabled={!canBuy}
                  className="w-full py-2 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 disabled:opacity-50 transition"
                >
                  Confirm Buy ✅
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SELL */}
        <div className="flex-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setShowSellPanel(!showSellPanel); setShowBuyPanel(false); }}
            disabled={ownedShares === 0}
            className={`w-full py-3 rounded-2xl font-black text-base transition-all duration-200 ${
              ownedShares === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-rose-500 hover:bg-rose-600 text-white shadow-md hover:shadow-rose-200 active:scale-95'
            }`}
          >
            💸 Sell
          </motion.button>

          <AnimatePresence>
            {showSellPanel && ownedShares > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 bg-rose-50 border border-rose-200 rounded-2xl p-3 overflow-hidden"
              >
                <p className="text-xs text-rose-700 font-bold mb-2 text-center">
                  You have: {ownedShares} share{ownedShares !== 1 ? 's' : ''}
                </p>
                <div className="flex items-center gap-2 mb-2 justify-center">
                  <button
                    onClick={() => setSellQty(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-rose-200 text-rose-800 font-black text-lg hover:bg-rose-300 transition"
                  >−</button>
                  <span className="text-lg font-black text-rose-800 w-8 text-center">{sellQty}</span>
                  <button
                    onClick={() => setSellQty(q => Math.min(ownedShares, q + 1))}
                    className="w-8 h-8 rounded-full bg-rose-200 text-rose-800 font-black text-lg hover:bg-rose-300 transition"
                  >+</button>
                </div>
                <p className="text-center text-xs text-rose-600 font-bold mb-2">You get: ₹{(sellQty * company.price).toLocaleString()}</p>
                <button
                  onClick={handleSell}
                  disabled={!canSell}
                  className="w-full py-2 bg-rose-600 text-white rounded-xl font-black text-sm hover:bg-rose-700 disabled:opacity-50 transition"
                >
                  Confirm Sell ✅
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
