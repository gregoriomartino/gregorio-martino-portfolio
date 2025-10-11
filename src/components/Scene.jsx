import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import Mountains from './Mountains'
import Road from './Road'

export default function Scene({ darkMode, season }) {
  const orbitControls = useAnimation()

  // Avvia l'orbita continua
  useEffect(() => {
    orbitControls.start({
      rotate: 360,
      transition: { duration: 10, repeat: Infinity, ease: 'linear' }
    })
  }, [])

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
      {/* Pianeta centrale */}
      <div className={`absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-blue-500'} border-4 border-gray-300`} />

      {/* Montagne sullo sfondo */}
      <Mountains darkMode={darkMode} season={season} />

      {/* Strada */}
      <Road darkMode={darkMode} />

      {/* Nuvole */}
      <motion.div
        className="absolute top-8 left-0 right-0 flex gap-32"
        animate={{ x: [0, -150] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-2">
            <div className={`w-12 h-6 rounded-full ${darkMode ? 'bg-slate-600' : 'bg-white'} opacity-70`} />
            <div className={`w-10 h-5 rounded-full ${darkMode ? 'bg-slate-600' : 'bg-white'} opacity-70 -ml-6 mt-1`} />
          </div>
        ))}
      </motion.div>

      {/* Sole / Luna */}
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

      {/* Ciclista in orbita realistica */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        animate={orbitControls}
        style={{ transformOrigin: '0px -120px' }}
      >
        <motion.div
          className="rotate-[-20deg]" // inclinazione iniziale
          animate={{ rotate: [-20, 20, -20] }} // oscillazione corpo durante orbita
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="70" height="70" viewBox="0 0 140 90">
            {/* Ruota posteriore */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
              style={{ originX: '25px', originY: '70px' }}
            >
              <circle cx="25" cy="70" r="15" stroke="#1a1a1a" strokeWidth="4" fill="none" />
            </motion.g>

            {/* Ruota anteriore */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
              style={{ originX: '105px', originY: '70px' }}
            >
              <circle cx="105" cy="70" r="15" stroke="#1a1a1a" strokeWidth="4" fill="none" />
            </motion.g>

            {/* Telaio */}
            <line x1="25" y1="70" x2="55" y2="42" stroke="#ff6600" strokeWidth="4" />
            <line x1="55" y1="42" x2="85" y2="40" stroke="#ff6600" strokeWidth="4" />
            <line x1="55" y1="42" x2="48" y2="70" stroke="#ff6600" strokeWidth="4" />

            {/* Batteria */}
            <rect x="35" y="50" width="20" height="18" rx="2" fill="#1a1a1a" stroke="#ff6600" strokeWidth="2" />
            <text x="45" y="61" fontSize="8" fill="#ff6600" textAnchor="middle" fontWeight="bold">HC5</text>

            {/* Ciclista */}
            <ellipse cx="65" cy="22" rx="8" ry="8" fill="#ff6600" stroke="#1a1a1a" strokeWidth="1" />

            {/* Braccia */}
            <motion.line
              x1="65" y1="31" x2="88" y2="40"
              stroke="#1a1a1a"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ rotate: [0, -10, 0, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ originX: '65px', originY: '31px' }}
            />

            {/* Gambe */}
            <motion.line
              x1="48" y1="60" x2="55" y2="68"
              stroke="#fbbf24"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
              style={{ originX: '48px', originY: '60px' }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
