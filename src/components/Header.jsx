import { motion } from 'framer-motion';
import { TOTAL_ROUNDS } from '../data/constants';

export default function Header({ cash, round, portfolioValue }) {
  const totalWealth = cash + portfolioValue;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-4 border-indigo-200"
    >
      <div className="max-w-4xl mx-auto px-4 py-3">
        {/* Title row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            <h1 className="text-xl font-black text-indigo-700 tracking-tight">Market Quest</h1>
          </div>
          {/* Round indicator */}
          <div className="flex items-center gap-1 bg-indigo-100 rounded-full px-4 py-1">
            <span className="text-sm font-bold text-indigo-600">Round</span>
            <span className="text-lg font-black text-indigo-700">{Math.min(round, TOTAL_ROUNDS)}</span>
            <span className="text-sm font-bold text-indigo-400">/ {TOTAL_ROUNDS}</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {/* Cash */}
          <div className="bg-emerald-100 rounded-2xl p-2 text-center">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide">💵 Cash</p>
            <p className="text-base font-black text-emerald-700">₹{cash.toLocaleString()}</p>
          </div>

          {/* Shares Value */}
          <div className="bg-violet-100 rounded-2xl p-2 text-center">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-wide">📦 Shares</p>
            <p className="text-base font-black text-violet-700">₹{portfolioValue.toLocaleString()}</p>
          </div>

          {/* Total */}
          <div className="bg-amber-100 rounded-2xl p-2 text-center">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">💰 Total</p>
            <p className="text-base font-black text-amber-700">₹{totalWealth.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
