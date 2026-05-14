import { motion } from 'framer-motion';

export default function Badge({ badge }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
      className={`bg-gradient-to-br ${badge.color} rounded-3xl p-6 text-center text-white shadow-2xl mx-auto max-w-xs`}
    >
      <div className="text-7xl mb-3 star-anim inline-block">{badge.emoji}</div>
      <h3 className="text-2xl font-black mb-1">{badge.label}</h3>
      <p className="text-white/90 text-sm font-semibold leading-relaxed">{badge.desc}</p>
    </motion.div>
  );
}
