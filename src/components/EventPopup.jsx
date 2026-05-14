import { motion, AnimatePresence } from 'framer-motion';
import { CORRECT_PREDICTION_BONUS } from '../data/constants';

export default function EventPopup({ event, predictionResult, onContinue }) {
  const correct = predictionResult === event.direction;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden border-4 border-yellow-300"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 text-center">
          <p className="text-white font-black text-sm uppercase tracking-widest mb-1">📰 Breaking News!</p>
          <div className="text-4xl">⚡</div>
        </div>

        <div className="p-5">
          {/* Headline */}
          <h3 className="text-lg font-black text-gray-800 text-center leading-snug mb-2">
            {event.headline}
          </h3>
          <p className="text-gray-500 font-semibold text-sm text-center mb-4">{event.detail}</p>

          {/* Price change indicator */}
          <div className={`rounded-2xl p-3 mb-4 text-center ${event.direction === 'up' ? 'bg-emerald-100 border-2 border-emerald-300' : 'bg-rose-100 border-2 border-rose-300'}`}>
            <p className="text-sm font-bold text-gray-600 mb-1">Share price changed by</p>
            <p className={`text-3xl font-black ${event.direction === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {event.direction === 'up' ? '📈' : '📉'}{' '}
              {event.direction === 'up' ? '+' : ''}{Math.round(event.priceChange * 100)}%
            </p>
          </div>

          {/* Prediction result */}
          <AnimatePresence>
            {predictionResult && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`rounded-2xl p-3 mb-4 text-center ${correct ? 'bg-emerald-50 border-2 border-emerald-300' : 'bg-rose-50 border-2 border-rose-300'}`}
              >
                {correct ? (
                  <>
                    <p className="text-2xl mb-1">🎉</p>
                    <p className="font-black text-emerald-700 text-base">Wow, correct guess!</p>
                    <p className="text-sm font-bold text-emerald-600">You earned a bonus of ₹{CORRECT_PREDICTION_BONUS}! 💰</p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl mb-1">😅</p>
                    <p className="font-black text-rose-700 text-base">Oops, wrong guess!</p>
                    <p className="text-sm font-bold text-rose-500">Better luck next round!</p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onContinue}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-indigo-200 transition-all pulse-btn"
          >
            Continue Shopping! 🛒
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
