import { motion } from 'framer-motion'

export default function CyclistAnimation({ darkMode }) {
  return (
    <motion.div
      className="absolute bottom-0 left-1/3"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="140" height="90" viewBox="0 0 140 90">
        {/* Ruota posteriore */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          style={{ originX: "25px", originY: "70px" }}
        >
          <circle cx="25" cy="70" r="15" stroke="#1a1a1a" strokeWidth="4" fill="none" />
          <circle cx="25" cy="70" r="13" stroke={darkMode ? "#64748b" : "#374151"} strokeWidth="2" fill="none" />
        </motion.g>

        {/* Ruota anteriore */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          style={{ originX: "105px", originY: "70px" }}
        >
          <circle cx="105" cy="70" r="15" stroke="#1a1a1a" strokeWidth="4" fill="none" />
          <circle cx="105" cy="70" r="13" stroke={darkMode ? "#64748b" : "#374151"} strokeWidth="2" fill="none" />
        </motion.g>

        {/* Telaio */}
        <line x1="25" y1="70" x2="55" y2="42" stroke="#ff6600" strokeWidth="4" />
        <line x1="55" y1="42" x2="85" y2="40" stroke="#ff6600" strokeWidth="4" />
        <line x1="55" y1="42" x2="48" y2="70" stroke="#ff6600" strokeWidth="4" />

        {/* Ciclista */}
        <circle cx="65" cy="22" r="8" fill="#ff6600" />

        {/* Pedale */}
        <motion.line
          x1="48" y1="60" x2="55" y2="68"
          stroke={darkMode ? "#fbbf24" : "#f59e0b"}
          strokeWidth="3"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          style={{ originX: "48px", originY: "60px" }}
        />
      </svg>
    </motion.div>
  )
}
