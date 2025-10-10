import { motion } from 'framer-motion'

export default function Mountains({ season = 'spring', darkMode }) {
  const colors = {
    spring: darkMode ? 'bg-green-800' : 'bg-green-400',
    summer: darkMode ? 'bg-emerald-900' : 'bg-green-600',
    autumn: darkMode ? 'bg-amber-900' : 'bg-yellow-700',
    winter: darkMode ? 'bg-slate-700' : 'bg-white',
  }

  const mountainColor = colors[season] || colors.spring

  const heights = [24, 32, 28] // altezza variabile delle montagne

  return (
    <motion.div className="absolute bottom-16 left-0 right-0 flex justify-center items-end gap-6">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`${mountainColor} w-32 h-${h} clip-triangle`}
          style={{ zIndex: i }}
        ></div>
      ))}
    </motion.div>
  )
}
