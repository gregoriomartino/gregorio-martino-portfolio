import { motion } from 'framer-motion'

export default function Scene({ darkMode, season }) {
  return (
    <div className="relative h-64 overflow-hidden rounded-lg">

      {/* Strada */}
      <div className={`absolute bottom-0 left-0 right-0 h-16 ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`}>
        <motion.div
          className="absolute top-1 left-0 right-0 h-1 flex gap-8"
          animate={{ x: [0, -100] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`w-16 h-1 ${darkMode ? 'bg-slate-600' : 'bg-slate-400'}`} />
          ))}
        </motion.div>
      </div>

      {/* Montagne */}
      <svg className="absolute bottom-16 left-0 right-0 w-full h-48">
        <path
          d="M0,100 C100,50 200,150 300,100 C400,50 500,150 600,100 C700,50 800,150 900,100 L900,200 L0,200 Z"
          fill={darkMode ? "#334155" : "#94a3b8"}
        />
      </svg>

      {/* Ciclista */}
      <motion.div
        className="absolute bottom-16 left-20"
        animate={{ y: [0, -10, 0, -8, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="100" height="60" viewBox="0 0 100 60">
          {/* Ruote */}
          <motion.circle
            cx="20" cy="50" r="10"
            stroke="#1a1a1a" strokeWidth="3" fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="70" cy="50" r="10"
            stroke="#1a1a1a" strokeWidth="3" fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          />

          {/* Telaio */}
          <line x1="20" y1="50" x2="50" y2="30" stroke="#ff6600" strokeWidth="4" />
          <line x1="50" y1="30" x2="70" y2="50" stroke="#ff6600" strokeWidth="4" />
          <line x1="50" y1="30" x2="45" y2="50" stroke="#ff6600" strokeWidth="4" />

          {/* Ciclista */}
          <circle cx="50" cy="25" r="6" fill="#ff6600" stroke="#1a1a1a" strokeWidth="1" />
          <line x1="50" y1="31" x2="42" y2="45" stroke="#1a1a1a" strokeWidth="3" />
          <line x1="50" y1="31" x2="58" y2="45" stroke="#1a1a1a" strokeWidth="3" />
        </svg>
      </motion.div>

      {/* Sole/Luna */}
      <motion.div
        className={`absolute top-4 right-8 w-12 h-12 rounded-full ${darkMode ? 'bg-slate-300' : 'bg-yellow-400'}`}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
