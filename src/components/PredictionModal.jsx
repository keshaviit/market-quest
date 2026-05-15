import { motion } from 'framer-motion';

export default function PredictionModal({ event, onPredict }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: 'rgba(0,0,0,0.45)' }}>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="game-card w-full max-w-sm overflow-hidden"
      >
        {/* Amber top bar */}
        <div className="h-2 bg-amber-400" />

        <div className="px-6 py-6 flex flex-col gap-4">
          {/* Header */}
          <div className="text-center">
            <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">🔮 Make your call!</p>
            <h2 className="font-black text-gray-800 text-2xl">What will happen?</h2>
          </div>

          {/* News box */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 text-sm">📰</span>
              <p className="text-xs text-red-500 font-black uppercase tracking-wider">Daily Bugle</p>
            </div>
            <p className="font-bold text-gray-700 text-sm leading-snug">{event.headline}</p>
          </div>

          <p className="text-center text-sm font-bold text-gray-500">
            Will the share price go...
          </p>

          {/* UP / DOWN buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => onPredict('up')}
              className="flex-1 py-5 rounded-2xl font-black text-white text-xl flex flex-col items-center gap-1"
              style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}
            >
              <span>📈</span>
              <span>UP!</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => onPredict('down')}
              className="flex-1 py-5 rounded-2xl font-black text-white text-xl flex flex-col items-center gap-1"
              style={{ background: 'linear-gradient(135deg,#f43f5e,#e11d48)' }}
            >
              <span>📉</span>
              <span>DOWN!</span>
            </motion.button>
          </div>

          <p className="text-center text-xs text-gray-400 font-semibold">
            ✨ Guess right → get ₹150 bonus!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
