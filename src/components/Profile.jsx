import { motion } from 'framer-motion'

export default function Profile({ t, darkMode }) {
  return (
    <div>
      {/* Titolo e descrizione */}
      <h2 className="text-2xl font-semibold mb-3">{t.profile}</h2>
      <p className="leading-relaxed">{t.profileText}</p>

      {/* Animazione ciclista */}
      <div className="mt-12 relative h-64 overflow-hidden rounded-lg">
        {/* Road */}
        <div className={`absolute bottom-0 left-0 right-0 h-20 ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`}>
          <motion.div
            className="absolute top-2 left-0 right-0 h-1 flex gap-8"
            animate={{ x: [0, -100] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`w-16 h-1 ${darkMode ? 'bg-slate-600' : 'bg-slate-400'}`} />
            ))}
          </motion.div>
        </div>

        {/* Alberi */}
        <motion.div
          className="absolute bottom-20 left-0 right-0 flex gap-32"
          animate={{ x: [0, -200] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex-shrink-0">
              <div className="relative">
                <div className={`w-2 h-16 ${darkMode ? 'bg-amber-900' : 'bg-amber-800'}`} />
                <div className={`absolute -top-8 -left-6 w-14 h-14 rounded-full ${darkMode ? 'bg-green-800' : 'bg-green-600'}`} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Ciclista completo */}
        <motion.div
          className="absolute bottom-20 left-1/3"
          animate={{ y: [0, -10, 0, -8, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="140" height="90" viewBox="0 0 140 90" className="relative">
            {/* Ruote */}
            <motion.g animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} style={{ originX: "25px", originY: "70px" }}>
              <circle cx="25" cy="70" r="15" stroke="#1a1a1a" strokeWidth="4" fill="none" />
              <circle cx="25" cy="70" r="13" stroke={darkMode ? "#64748b" : "#374151"} strokeWidth="2" fill="none" />
              <line x1="25" y1="55" x2="25" y2="85" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
              <line x1="10" y1="70" x2="40" y2="70" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
              <line x1="14" y1="59" x2="36" y2="81" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1" />
              <line x1="36" y1="59" x2="14" y2="81" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1" />
              <circle cx="25" cy="70" r="5" fill="#ff6600" opacity="0.8" />
            </motion.g>

            <motion.g animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} style={{ originX: "105px", originY: "70px" }}>
              <circle cx="105" cy="70" r="15" stroke="#1a1a1a" strokeWidth="4" fill="none" />
              <circle cx="105" cy="70" r="13" stroke={darkMode ? "#64748b" : "#374151"} strokeWidth="2" fill="none" />
              <line x1="105" y1="55" x2="105" y2="85" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
              <line x1="90" y1="70" x2="120" y2="70" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
              <line x1="94" y1="59" x2="116" y2="81" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1" />
              <line x1="116" y1="59" x2="94" y2="81" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1" />
              <circle cx="105" cy="70" r="5" fill="#ff6600" opacity="0.8" />
            </motion.g>

            {/* Telaio e ciclista */}
            <line x1="25" y1="70" x2="55" y2="42" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
            <line x1="25" y1="70" x2="55" y2="42" stroke="#ff6600" strokeWidth="4" strokeLinecap="round" />
            <line x1="55" y1="42" x2="85" y2="40" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
            <line x1="55" y1="42" x2="85" y2="40" stroke="#ff6600" strokeWidth="4" strokeLinecap="round" />
            <line x1="55" y1="42" x2="48" y2="70" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
            <line x1="55" y1="42" x2="48" y2="70" stroke="#ff6600" strokeWidth="4" strokeLinecap="round" />
            <line x1="85" y1="40" x2="95" y2="45" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
            <line x1="48" y1="70" x2="105" y2="70" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
            <line x1="55" y1="45" x2="105" y2="70" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />

            {/* Batteria */}
            <rect x="35" y="50" width="20" height="18" rx="2" fill="#1a1a1a" stroke="#ff6600" strokeWidth="2" />
            <text x="45" y="61" fontSize="8" fill="#ff6600" textAnchor="middle" fontWeight="bold">HC5</text>

            {/* Ciclista */}
            <ellipse cx="65" cy="22" rx="9" ry="8" fill="#ff6600" stroke="#1a1a1a" strokeWidth="2" />
            <ellipse cx="68" cy="22" rx="4" ry="3" fill="#1a1a1a" opacity="0.7" />
            <ellipse cx="68" cy="22" rx="3.5" ry="2.5" fill={darkMode ? "#334155" : "#64748b"} opacity="0.5" />
            <path d="M 58 26 Q 65 29 72 26" stroke="#1a1a1a" strokeWidth="2" fill="#ff6600" />

            <line x1="65" y1="29" x2="65" y2="31" stroke={darkMode ? "#fbbf24" : "#f59e0b"} strokeWidth="3" />
            <line x1="65" y1="31" x2="58" y2="45" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
            <line x1="65" y1="31" x2="58" y2="45" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

            <motion.g
              animate={{ rotate: [0, -8, 0, 8, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              style={{ originX: "65px", originY: "31px" }}
            >
              <line x1="65" y1="33" x2="88" y2="40" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
              <line x1="65" y1="33" x2="88" y2="40" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="88" y1="40" x2="98" y2="38" stroke={darkMode ? "#fbbf24" : "#f59e0b"} strokeWidth="3" strokeLinecap="round" />
            </motion.g>

            <motion.g
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
              style={{ originX: "48px", originY: "60px" }}
            >
              <line x1="58" y1="45" x2="48" y2="60" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
              <line x1="48" y1="60" x2="55" y2="68" stroke={darkMode ? "#fbbf24" : "#f59e0b"} strokeWidth="3" strokeLinecap="round" />
            </motion.g>

            <circle cx="48" cy="60" r="8" fill="none" stroke="#1a1a1a" strokeWidth="2" />
            <circle cx="48" cy="60" r="3" fill="#ff6600" />
          </svg>
        </motion.div>

        {/* Sole/Luna */}
        <motion.div
          className={`absolute top-8 right-12 w-12 h-12 rounded-full ${darkMode ? 'bg-slate-300' : 'bg-yellow-400'}`}
          animate={{ scale: darkMode ? [1, 1.1, 1] : [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {darkMode && (
            <>
              <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-slate-400" />
              <div className="absolute top-6 left-5 w-2 h-2 rounded-full bg-slate-400" />
            </>
          )}
        </motion.div>

        {/* Nuvole */}
        <motion.div
          className="absolute top-12 left-0 right-0 flex gap-32"
          animate={{ x: [0, -150] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-2">
              <div className={`w-12 h-6 rounded-full ${darkMode ? 'bg-slate-600' : 'bg-white'} opacity-70`} />
              <div className={`w-10 h-5 rounded-full ${darkMode ? 'bg-slate-600' : 'bg-white'} opacity-70 -ml-6 mt-1`} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
