import { motion } from 'framer-motion'
import Mountains from './Mountains'
import Road from './Road'

export default function Scene({ darkMode, season }) {
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg">

      {/* Pianeta centrale */}
      <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500" />

      {/* Montagne sullo sfondo */}
      <Mountains darkMode={darkMode} season={season} />

      {/* Strada in primo piano */}
      <Road darkMode={darkMode} />

      {/* Nuvole in movimento */}
      <motion.div
        className="absolute top-8 left-0 right-0 flex gap-32"
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

      {/* Ciclista in orbita */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "0px -120px" }} // distanza dal centro = raggio orbita
      >
        <svg width="50" height="50" viewBox="0 0 140 90">
          {/* Ruota posteriore */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
            style={{ originX: "25px", originY: "70px" }}
          >
            <circle cx="25" cy="70" r="15" stroke="#1a1a1a" strokeWidth="4" fill="none" />
          </motion.g>

          {/* Ruota anteriore */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
            style={{ originX: "105px", originY: "70px" }}
          >
            <circle cx="105" cy="70" r="15" stroke="#1a1a1a" strokeWidth="4" fill="none" />
          </motion.g>

          {/* Telaio */}
          <line x1="25" y1="70" x2="55" y2="42" stroke="#ff6600" strokeWidth="4" />
          <line x1="55" y1="42" x2="85" y2="40" stroke="#ff6600" strokeWidth="4" />
          <line x1="55" y1="42" x2="48" y2="70" stroke="#ff6600" strokeWidth="4" />

          {/* Ciclista */}
          <circle cx="65" cy="22" r="8" fill="#ff6600" />
        </svg>
      </motion.div>
    </div>
  )
}
