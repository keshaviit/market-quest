import { motion } from 'framer-motion';

export default function PredictionModal({ event, onPredict }) {
  const company = event.companyId;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center border-4 border-indigo-300"
      >
        {/* Icon */}
        <div className="text-5xl mb-3 bounce-in">🔮</div>

        <h2 className="text-2xl font-black text-indigo-700 mb-2">Predict It!</h2>
        <p className="text-gray-600 font-semibold text-sm mb-4 leading-relaxed">
          Before we reveal the news, can you guess what will happen to{' '}
          <span className="font-black text-indigo-700">{event.headline.split('!')[0].replace(/[🍫🎮🤖🌟😬😟🏆💻⚡🚀🌧️]/gu, '').trim().split(' ').slice(0,2).join(' ')}</span>?
        </p>

        {/* Preview card */}
        <div className="bg-indigo-50 rounded-2xl p-3 mb-5 border border-indigo-100">
          <p className="text-sm font-bold text-gray-700 leading-snug">{event.headline}</p>
        </div>

        <p className="text-base font-black text-gray-700 mb-4">
          Will the share price go...
        </p>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPredict('up')}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-black text-lg shadow-md transition-colors"
          >
            📈 Up!
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPredict('down')}
            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-2xl font-black text-lg shadow-md transition-colors"
          >
            📉 Down!
          </motion.button>
        </div>

        <p className="text-xs text-gray-400 font-semibold mt-3">
          ✨ Guess right and get a bonus!
        </p>
      </motion.div>
    </div>
  );
}
