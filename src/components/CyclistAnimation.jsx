import { motion } from 'framer-motion'

export default function CyclistAnimation({ darkMode }) {
  return (
    <motion.div
      className="absolute bottom-20 left-1/3"
      animate={{ y: [0, -10, 0, -8, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="140" height="90" viewBox="0 0 140 90">
        {/* Ruote */}
        {['25','105'].map(cx => (
          <motion.g
            key={cx}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
            style={{ originX: `${cx}px`, originY: "70px" }}
          >
            <circle cx={cx} cy="70" r="15" stroke="#1a1a1a" strokeWidth="4" fill="none" />
            <circle cx={cx} cy="70" r="13" stroke={darkMode ? "#64748b" : "#374151"} strokeWidth="2" fill="none" />
          </motion.g>
        ))}

        {/* Telaio semplice */}
        <line x1="25" y1="70" x2="55" y2="42" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
        <line x1="55" y1="42" x2="85" y2="40" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
        <line x1="55" y1="42" x2="48" y2="70" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />

        {/* Ciclista - corpo */}
        <line x1="65" y1="31" x2="58" y2="45" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
        <line x1="65" y1="31" x2="58" y2="45" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

        {/* Braccia animate */}
        <motion.g
          animate={{ rotate: [0, -8, 0, 8, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "65px", originY: "31px" }}
        >
          <line x1="65" y1="33" x2="88" y2="40" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
        </motion.g>

        {/* Gambe animate */}
        <motion.g
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          style={{ originX: "48px", originY: "60px" }}
        >
          <line x1="58" y1="45" x2="48" y2="60" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
        </motion.g>
      </svg>
    </motion.div>
  )
}
