import { motion } from 'framer-motion';
import { STARTING_CASH, getBadge } from '../data/constants';

export default function ResultScreen({ cash, portfolio, companies, onRestart }) {
  const sharesValue = companies.reduce((acc, c) => acc + (portfolio[c.id] || 0) * c.price, 0);
  const finalWealth = cash + sharesValue;
  const gain        = finalWealth - STARTING_CASH;
  const badge       = getBadge(finalWealth, STARTING_CASH);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="game-card w-full max-w-sm overflow-hidden"
      >
        {/* Orange top accent */}
        <div className="h-2 bg-amber-400 w-full rounded-none" />

        {/* Body */}
        <div className="flex flex-col items-center px-8 py-8 gap-5">
          {/* Header label */}
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-sm">🎓</span>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Market Quest</p>
          </div>

          <h1 className="font-black text-gray-800 text-3xl text-center leading-tight">Report Card</h1>

          {/* Star + sparkles */}
          <div className="relative flex items-center justify-center w-32 h-32">
            <span className="absolute -top-1 -left-1 text-amber-400 text-sm float">✦</span>
            <span className="absolute -top-2 right-1 text-amber-400 text-xs float2">✦</span>
            <span className="absolute bottom-0 -right-2 text-amber-300 text-sm float3">✦</span>
            <span className="text-8xl star-burst">{badge.emoji}</span>
          </div>

          {/* Badge title */}
          <p className="font-black text-gray-800 text-xl text-center">{badge.label}!</p>

          {/* Final stash box */}
          <div className="w-full rounded-2xl bg-gray-50 border border-gray-200 py-4 text-center">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Final Stash</p>
            <p className="font-black text-amber-500 text-4xl">₹{finalWealth.toLocaleString()}</p>
          </div>

          {/* Gain badge */}
          <div className={`flex items-center gap-2 px-5 py-2 rounded-full border ${gain >= 0 ? 'border-green-300 bg-green-50 text-green-600' : 'border-red-200 bg-red-50 text-red-500'}`}>
            <span className="text-base">{gain >= 0 ? '↗' : '↘'}</span>
            <span className="font-black text-sm">
              {gain >= 0 ? 'You made' : 'You lost'} ₹{Math.abs(gain).toLocaleString()}!
            </span>
          </div>

          {/* Breakdown */}
          <div className="w-full grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-gray-50 border border-gray-200 py-3">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">💵 Cash</p>
              <p className="font-black text-gray-700 text-lg">₹{cash.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-200 py-3">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">📦 Shares</p>
              <p className="font-black text-gray-700 text-lg">₹{sharesValue.toLocaleString()}</p>
            </div>
          </div>

          {/* Play Again */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onRestart}
            className="btn-amber w-full py-4 rounded-2xl text-lg amber-pulse gap-3"
          >
            🔄 Play Again
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
