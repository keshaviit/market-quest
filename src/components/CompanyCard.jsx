import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const THEMES = {
  chocoblast: { bg: '#e0f2fe', border: '#38bdf8' }, 
  playforge:  { bg: '#ffedd5', border: '#fb923c' },
  robospark:  { bg: '#ffe4e6', border: '#fb7185' },
};

export default function CompanyCard({ company, ownedShares, cash, onBuy, onSell, priceFlash }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('buy');
  const [qty,  setQty]  = useState(1);

  const theme   = THEMES[company.id] || THEMES.chocoblast;
  const maxBuy  = Math.floor(cash / company.price);
  const maxQty  = mode === 'buy' ? maxBuy : ownedShares;
  const total   = qty * company.price;
  const isUp    = priceFlash === 'up';
  const isDown  = priceFlash === 'down';

  const openTrade = () => { setOpen(true); setMode('buy'); setQty(1); };
  const close     = ()  => setOpen(false);
  const deal      = ()  => {
    if (mode === 'buy')  onBuy(company.id, qty);
    else                 onSell(company.id, qty);
    close();
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-card p-5 relative"
      >
        {/* Header row */}
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl border-2"
            style={{ backgroundColor: theme.bg, borderColor: theme.border }}
          >
            {company.emoji}
          </div>
          <h2 className="font-bold text-slate-800 text-lg">{company.name}</h2>
        </div>

        {/* Stats row */}
        <div className="flex justify-between items-end mb-1">
          <div>
            <p className="font-hand text-slate-400 italic text-sm">Current Price</p>
            <div className={`flex items-center gap-1 ${isUp ? 'flash-up' : isDown ? 'flash-down' : ''}`}>
              <span className="font-black text-2xl text-slate-800">₹{company.price}</span>
              {isUp && <span className="text-green-500 font-bold text-xl leading-none">↗</span>}
              {isDown && <span className="text-red-500 font-bold text-xl leading-none">↘</span>}
              {!isUp && !isDown && <span className="text-slate-400 font-bold text-xl leading-none">→</span>}
            </div>
          </div>
          <div className="text-right">
            <p className="font-hand text-slate-400 italic text-sm">You own:</p>
            <p className="font-bold text-slate-800 text-sm">{ownedShares} shares</p>
          </div>
        </div>

        <div className="dashed-line"></div>

        {/* Action Button */}
        <button onClick={openTrade} className="trade-btn w-full py-2 flex justify-center items-center gap-2 text-slate-700 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          Trade
        </button>
      </motion.div>

      {/* Trade Modal */}
      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
            style={{ background: 'rgba(0,0,0,0.4)' }}
            onClick={e => e.target === e.currentTarget && close()}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{   scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="game-card w-full max-w-xs overflow-hidden !border-0"
            >
              <div className="h-1.5 bg-amber-400" />
              <div className="flex items-center justify-between px-5 pt-4 pb-1">
                <button onClick={close} className="text-slate-400 hover:text-slate-600 text-base font-bold leading-none">✕</button>
                <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Trade Desk</p>
                <div className="w-5" />
              </div>
              <div className="flex flex-col items-center gap-1 px-5 pb-4 pt-2">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-3xl border-2"
                  style={{ backgroundColor: theme.bg, borderColor: theme.border }}
                >
                  {company.emoji}
                </div>
                <p className="font-black text-slate-800 text-xl mt-1">{company.name}</p>
                <p className="text-sm text-slate-500 font-hand">Current Price: <strong className="text-slate-800 font-sans">₹{company.price}</strong></p>
              </div>

              <div className="mx-5 mb-4 flex rounded-xl p-1 bg-slate-100">
                {['buy', 'sell'].map(m => (
                  <button
                    key={m}
                    onClick={() => { setMode(m); setQty(1); }}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all capitalize ${
                      mode === m ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-6 mb-2">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full border-2 border-slate-200 text-slate-500 font-black text-xl flex items-center justify-center"
                >−</motion.button>
                <div className="text-center">
                  <p className="font-black text-5xl text-slate-800 leading-none">{qty}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">shares</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setQty(q => Math.min(maxQty, q + 1))}
                  className="w-10 h-10 rounded-full border-2 border-slate-200 text-slate-500 font-black text-xl flex items-center justify-center"
                >+</motion.button>
              </div>

              <div className="mx-5 my-3 dashed-line" />
              <p className="text-center text-sm text-slate-500 font-hand font-bold mb-4">
                {mode === 'buy' ? 'Total Cost:' : 'You receive:'}{' '}
                <span className="text-amber-500 font-black text-xl font-sans">₹{total.toLocaleString()}</span>
              </p>

              <div className="px-5 pb-5">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={deal}
                  disabled={mode === 'buy' ? maxBuy < 1 : ownedShares < 1}
                  className="w-full py-3.5 rounded-xl font-black text-white text-base disabled:opacity-40"
                  style={{ background: '#F5A623' }}
                >
                  ✅ DEAL!
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
