import { motion } from 'framer-motion'

export default function CyclistAnimation({ darkMode }) {
  return (
    <motion.div
      className="absolute bottom-0 left-1/3"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="80" height="60" viewBox="0 0 80 60">
        <circle cx="20" cy="50" r="10" fill={darkMode ? '#94a3b8' : '#475569'} /> {/* ruota */}
        <circle cx="60" cy="50" r="10" fill={darkMode ? '#94a3b8' : '#475569'} /> {/* ruota */}
        <line x1="20" y1="50" x2="60" y2="50" stroke="#ff6600" strokeWidth="3" /> {/* telaio */}
        <circle cx="40" cy="40" r="5" fill="#ff6600" /> {/* ciclista */}
      </svg>
    </motion.div>
  )
}
