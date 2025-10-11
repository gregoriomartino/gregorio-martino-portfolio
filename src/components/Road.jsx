import { motion } from 'framer-motion'

export default function Road({ darkMode }) {
  const roadBlocks = Array.from({ length: 20 })

  return (
    <div className={`absolute bottom-0 left-0 right-0 h-20 ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`}>
      <motion.div
        className="absolute top-2 left-0 right-0 h-1 flex gap-8"
        animate={{ x: [0, -100] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        {roadBlocks.map((_, i) => (
          <div key={i} className={`w-16 h-1 ${darkMode ? 'bg-slate-600' : 'bg-slate-400'}`} />
        ))}
      </motion.div>
    </div>
  )
}
