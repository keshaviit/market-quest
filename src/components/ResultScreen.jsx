import { motion } from 'framer-motion';
import Badge from './Badge';
import { STARTING_CASH, getBadge } from '../data/constants';

export default function ResultScreen({ cash, portfolio, companies, onRestart }) {
  // Calculate final wealth
  const sharesValue = companies.reduce((acc, c) => acc + (portfolio[c.id] || 0) * c.price, 0);
  const finalWealth = cash + sharesValue;
  const gain = finalWealth - STARTING_CASH;
  const badge = getBadge(finalWealth, STARTING_CASH);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        {/* Title */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🏁</div>
          <h1 className="text-4xl font-black text-indigo-700 mb-1">Game Over!</h1>
          <p className="text-gray-500 font-bold text-base">Here's how you did in 5 rounds</p>
        </div>

        {/* Wealth summary card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-5 border-4 border-indigo-200">
          <div className="text-center mb-4">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Final Wealth</p>
            <p className="text-5xl font-black text-indigo-700">₹{finalWealth.toLocaleString()}</p>
            <div className={`mt-2 inline-block px-4 py-1 rounded-full font-black text-sm ${gain >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              {gain >= 0 ? '📈 +' : '📉 '}₹{Math.abs(gain).toLocaleString()} from ₹{STARTING_CASH.toLocaleString()}
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="bg-emerald-50 rounded-2xl p-3 text-center border border-emerald-200">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">💵 Cash Left</p>
              <p className="text-xl font-black text-emerald-700">₹{cash.toLocaleString()}</p>
            </div>
            <div className="bg-violet-50 rounded-2xl p-3 text-center border border-violet-200">
              <p className="text-xs font-bold text-violet-600 uppercase tracking-wide mb-1">📦 Shares Value</p>
              <p className="text-xl font-black text-violet-700">₹{sharesValue.toLocaleString()}</p>
            </div>
          </div>

          {/* Per company breakdown */}
          <div className="mt-3 space-y-2">
            {companies.map(c => {
              const shares = portfolio[c.id] || 0;
              if (shares === 0) return null;
              return (
                <div key={c.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                  <span className="font-bold text-gray-700">{c.emoji} {c.name}</span>
                  <span className="font-black text-gray-800 text-sm">
                    {shares} shares × ₹{c.price} = <span className="text-indigo-600">₹{(shares * c.price).toLocaleString()}</span>
                  </span>
                </div>
              );
            })}
            {companies.every(c => (portfolio[c.id] || 0) === 0) && (
              <p className="text-center text-gray-400 text-sm font-semibold">No shares held at the end.</p>
            )}
          </div>
        </div>

        {/* Badge */}
        <div className="mb-6">
          <p className="text-center font-black text-gray-600 mb-3 text-sm uppercase tracking-wider">🏅 Your Badge</p>
          <Badge badge={badge} />
        </div>

        {/* Learning tip */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 mb-6">
          <p className="text-center font-black text-yellow-700 text-sm mb-1">💡 What you learned today:</p>
          <ul className="text-yellow-800 text-sm font-semibold space-y-1 list-disc list-inside">
            <li>News affects company prices</li>
            <li>Spreading money reduces risk</li>
            <li>Buying low & selling high makes profit</li>
            <li>Patience is a superpower in investing!</li>
          </ul>
        </div>

        {/* Play Again */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onRestart}
          className="w-full py-5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 text-white rounded-3xl font-black text-xl shadow-2xl hover:shadow-violet-300 transition-all pulse-btn"
        >
          🔄 Play Again!
        </motion.button>
      </motion.div>
    </div>
  );
}
