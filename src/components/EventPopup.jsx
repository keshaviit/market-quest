import { motion, AnimatePresence } from 'framer-motion';
import { CORRECT_PREDICTION_BONUS } from '../data/constants';

export default function EventPopup({ event, predictionResult, onContinue }) {
  const correct = predictionResult === event.direction;
  const isUp    = event.direction === 'up';
  const pct     = Math.abs(Math.round(event.priceChange * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: 'rgba(0,0,0,0.45)' }}>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="game-card w-full max-w-sm overflow-hidden"
      >
        {/* Amber top bar */}
        <div className="h-2 bg-amber-400" />

        <div className="px-6 py-6 flex flex-col gap-4">
          {/* Breaking news header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-red-500 text-sm">📰</span>
            <p className="text-xs text-red-500 font-black uppercase tracking-wider">Daily Bugle</p>
          </div>

          <h3 className="font-black text-gray-800 text-lg leading-snug">{event.headline}</h3>
          <p className="text-sm text-gray-500 font-semibold leading-snug -mt-2">{event.detail}</p>

          {/* Price change pill */}
          <div className={`rounded-xl py-3 text-center border ${isUp ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <p className="text-xs text-gray-400 font-semibold mb-1">Price changed by</p>
            <p className={`font-black text-3xl ${isUp ? 'text-green-600' : 'text-red-500'}`}>
              {isUp ? '📈 +' : '📉 −'}{pct}%
            </p>
          </div>

          {/* Prediction result */}
          <AnimatePresence>
            {predictionResult && (
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`rounded-xl py-3 text-center border ${correct ? 'border-green-200 bg-green-50' : 'border-red-100 bg-red-50'}`}
              >
                <div className={`text-3xl mb-1 ${correct ? 'wiggle' : 'shake'}`}>{correct ? '🎉' : '😅'}</div>
                {correct ? (
                  <>
                    <p className="font-black text-green-700">Correct! +₹{CORRECT_PREDICTION_BONUS} bonus!</p>
                  </>
                ) : (
                  <p className="font-black text-red-500">Wrong guess! Better luck next round 💪</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Continue button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onContinue}
            className="btn-amber w-full py-4 rounded-2xl text-base"
          >
            Next Round →
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
