import { motion } from 'framer-motion';

export default function Badge({ badge }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -15 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.25 }}
      className="rounded-3xl p-7 text-center text-white shadow-2xl mx-auto max-w-xs"
      style={{ background: `linear-gradient(135deg, ${badge.colorA}, ${badge.colorB})` }}
    >
      <div className="text-8xl mb-3 star-burst inline-block">{badge.emoji}</div>
      <h3 className="text-3xl font-black mb-2">{badge.label}</h3>
      <p className="text-white/90 font-bold text-sm leading-relaxed">{badge.desc}</p>
    </motion.div>
  );
}
