import { motion } from 'framer-motion'

export default function Mountains({ darkMode, season }) {
  const trees = Array.from({ length: 10 })

  return (
    <motion.div
      className="absolute bottom-20 left-0 right-0 flex gap-32"
      animate={{ x: [0, -200] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      {trees.map((_, i) => (
        <div key={i} className="flex-shrink-0 relative">
          {/* Tronco */}
          <div className={`w-2 h-16 ${darkMode ? 'bg-amber-900' : 'bg-amber-800'}`} />
          {/* Chioma */}
          <div className={`absolute -top-8 -left-6 w-14 h-14 rounded-full ${darkMode ? 'bg-green-800' : 'bg-green-600'}`} />
        </div>
      ))}
    </motion.div>
  )
}
