import { motion } from 'framer-motion';
import { STARTING_CASH, TOTAL_ROUNDS } from '../data/constants';

const COMPANIES = [
  { emoji: '🍫', name: 'ChocoBlast', price: '₹100' },
  { emoji: '🎮', name: 'PlayForge',  price: '₹200' },
  { emoji: '🤖', name: 'RoboSpark',  price: '₹300' },
];

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="game-card w-full max-w-sm overflow-hidden"
      >
        {/* Amber top accent */}
        <div className="h-2 bg-amber-400 w-full" />

        <div className="flex flex-col items-center px-7 py-8 gap-5">

          {/* Header label */}
          <div className="flex items-center gap-2">
            <span className="text-lg">📈</span>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Market Quest</p>
          </div>

          {/* Emoji trio */}
          <div className="flex gap-4">
            {COMPANIES.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 220 }}
                className="float"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-4xl shadow-sm">
                  {c.emoji}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="font-black text-gray-800 text-5xl leading-tight">Market<br/>Quest!</h1>
            <p className="text-gray-400 font-bold text-sm mt-2">Learn the stock market by playing! 🎯</p>
          </div>

          {/* Stats */}
          <div className="w-full grid grid-cols-3 gap-2">
            {[
              { icon: '💵', label: 'Start with', value: `₹${STARTING_CASH.toLocaleString()}` },
              { icon: '🔄', label: 'Rounds',     value: `${TOTAL_ROUNDS} only` },
              { icon: '🏅', label: 'Win a',      value: 'Badge!' },
            ].map(s => (
              <div key={s.label} className="rounded-xl bg-gray-50 border border-gray-200 py-3 text-center">
                <div className="text-xl mb-0.5">{s.icon}</div>
                <p className="text-gray-400 text-xs font-bold">{s.label}</p>
                <p className="text-gray-800 font-black text-sm">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Company list */}
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 divide-y divide-gray-200">
            {COMPANIES.map(c => (
              <div key={c.name} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.emoji}</span>
                  <span className="font-black text-gray-700 text-sm">{c.name}</span>
                </div>
                <span className="font-bold text-amber-500 text-sm">{c.price} / share</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onStart}
            className="btn-amber amber-pulse w-full py-5 rounded-2xl text-xl"
          >
            🚀 Start Playing!
          </motion.button>

          <p className="text-gray-300 text-xs font-bold">Class 5 – Class 10 · Virtual money only</p>
        </div>
      </motion.div>
    </div>
  );
}
