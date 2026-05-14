import { motion } from 'framer-motion';
import { STARTING_CASH, TOTAL_ROUNDS } from '../data/constants';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-600 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-5 w-20 h-20 bg-yellow-300/20 rounded-full blur-2xl" />

      {/* Floating emojis */}
      <div className="absolute top-16 left-1/4 text-4xl float-emoji" style={{ animationDelay: '0s' }}>📈</div>
      <div className="absolute top-24 right-1/4 text-3xl float-emoji" style={{ animationDelay: '0.8s' }}>💰</div>
      <div className="absolute bottom-28 left-1/5 text-3xl float-emoji" style={{ animationDelay: '1.5s' }}>⭐</div>
      <div className="absolute bottom-20 right-1/5 text-4xl float-emoji" style={{ animationDelay: '0.4s' }}>🚀</div>

      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        className="text-center relative z-10 max-w-md w-full"
      >
        {/* Logo / emoji cluster */}
        <div className="mb-4 flex justify-center gap-3 text-5xl">
          <span className="bounce-in inline-block" style={{ animationDelay: '0.1s' }}>🍫</span>
          <span className="bounce-in inline-block" style={{ animationDelay: '0.2s' }}>🎮</span>
          <span className="bounce-in inline-block" style={{ animationDelay: '0.3s' }}>🤖</span>
        </div>

        {/* Title */}
        <h1 className="text-6xl font-black text-white drop-shadow-lg mb-1 tracking-tight">
          Market
        </h1>
        <h1 className="text-6xl font-black text-yellow-300 drop-shadow-lg mb-4 tracking-tight">
          Quest!
        </h1>

        <p className="text-white/90 font-bold text-lg mb-6 leading-relaxed">
          Learn how the stock market works <br />
          <span className="text-yellow-200">while playing a fun game! 🎯</span>
        </p>

        {/* Info cards */}
        <div className="grid grid-cols-3 gap-3 mb-7">
          {[
            { icon: '💵', label: 'Start with', value: `₹${STARTING_CASH.toLocaleString()}` },
            { icon: '🔄', label: 'Play for', value: `${TOTAL_ROUNDS} Rounds` },
            { icon: '🏆', label: 'Earn a', value: 'Badge!' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 border border-white/30"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="text-white/70 text-xs font-bold">{item.label}</p>
              <p className="text-white font-black text-sm">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Companies preview */}
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 mb-6 border border-white/20">
          <p className="text-white/70 font-bold text-xs mb-2 uppercase tracking-wider">You'll trade shares of</p>
          <div className="flex justify-center gap-4">
            {[
              { emoji: '🍫', name: 'ChocoBlast' },
              { emoji: '🎮', name: 'PlayForge' },
              { emoji: '🤖', name: 'RoboSpark' },
            ].map((c, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl">{c.emoji}</div>
                <p className="text-white font-black text-xs">{c.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.4)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="w-full py-5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-3xl font-black text-2xl shadow-2xl hover:from-yellow-300 hover:to-orange-300 transition-all mb-3"
        >
          🚀 Start Playing!
        </motion.button>

        <p className="text-white/60 text-xs font-semibold">
          Perfect for Class 5 to Class 10 students
        </p>
      </motion.div>
    </div>
  );
}
