import { motion } from 'framer-motion';
import { TOTAL_ROUNDS } from '../data/constants';

export default function Header({ cash, round, portfolioValue }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="game-card w-full px-6 py-4 flex items-center justify-between"
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded bg-amber-500 text-white flex items-center justify-center text-xl shadow-sm">
          💳
        </div>
        <div>
          <h1 className="font-hand font-bold text-2xl leading-none text-slate-800">Market Quest</h1>
          <p className="text-sm font-semibold text-slate-400 italic font-hand">Round {round}/{TOTAL_ROUNDS}</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center">
          <span className="font-hand text-slate-400 text-sm font-bold uppercase tracking-wider">CASH</span>
          <span className="font-black text-xl text-slate-800 bg-green-50 px-2 rounded">₹{cash.toLocaleString()}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-hand text-slate-400 text-sm font-bold uppercase tracking-wider">PORTFOLIO</span>
          <span className="font-black text-xl text-slate-800">₹{portfolioValue.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  );
}
