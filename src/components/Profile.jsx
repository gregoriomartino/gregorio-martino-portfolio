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

        {/* Background elements (alberi) */}
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

        {/* Ciclista */}
        <motion.div
          className="absolute bottom-20 left-1/3"
          animate={{ y: [0, -10, 0, -8, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Qui puoi inserire il tuo SVG della bici */}
          <svg width="140" height="90" viewBox="0 0 140 90" className="relative">
            {/* Ruote, telaio, ciclista ecc. */}
            {/* Puoi riusare il tuo codice SVG già presente */}
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
