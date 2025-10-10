import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Sun, Moon, Mail, MapPin, Languages } from 'lucide-react'

const translations = {
  it: {
    role: 'Full-Stack Java Developer',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    downloadCV: 'Scarica CV',
    profile: 'Profilo Professionale',
    profileText: 'Sono uno sviluppatore Java con oltre 5 anni di esperienza in ambienti enterprise. Amo costruire soluzioni pulite e affidabili, trasformando codice legacy in architetture moderne. Credo nella collaborazione, nella curiosità tecnica e nel miglioramento continuo.',
    location: 'Foggia, Italia',
    rights: 'Tutti i diritti riservati.'
  },
  en: {
    role: 'Full-Stack Java Developer',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    downloadCV: 'Download CV',
    profile: 'Professional Profile',
    profileText: 'I am a Java developer with over 5 years of experience in enterprise environments. I love building clean and reliable solutions, transforming legacy code into modern architectures. I believe in collaboration, technical curiosity, and continuous improvement.',
    location: 'Foggia, Italy',
    rights: 'All rights reserved.'
  },
  es: {
    role: 'Desarrollador Full-Stack Java',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    downloadCV: 'Descargar CV',
    profile: 'Perfil Profesional',
    profileText: 'Soy un desarrollador Java con más de 5 años de experiencia en entornos empresariales. Me encanta construir soluciones limpias y confiables, transformando código legacy en arquitecturas modernas. Creo en la colaboración, la curiosidad técnica y la mejora continua.',
    location: 'Foggia, Italia',
    rights: 'Todos los derechos reservados.'
  }
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('it')

  const t = translations[language]

  return (
    <div className={`${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} min-h-screen transition-colors flex flex-col`}>
      <header className="text-center py-10 relative">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-2">
          Gregorio Martino
        </motion.h1>
        <p className="text-lg text-slate-500">{t.role}</p>
        <div className="mt-4 space-x-3">
          <a href="https://www.linkedin.com/in/gregorio-martino-5a42a3171/" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">{t.linkedin}</Button>
         </a>

         <a href="https://github.com/gregoriomartino" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">{t.github}</Button>
         </a>

         <a href="https://gitlab.com/martinogregorio2-group" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">{t.gitlab}</Button>
         </a>


          <a href={`${import.meta.env.BASE_URL}cv_gregorio_martino.pdf`} download>

            <Button>{t.downloadCV}</Button>
          </a>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-6 p-2 rounded-full border border-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="absolute top-4 right-20 flex gap-1">
          {['it', 'en', 'es'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                language === lang
                  ? darkMode
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-800 text-white'
                  : darkMode
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <section className="max-w-4xl mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-semibold mb-3">{t.profile}</h2>
        <p className="leading-relaxed">
       {t.profileText}
        </p>

        {/* Cycling Animation */}
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

          {/* Background elements */}
          <motion.div
            className="absolute bottom-20 left-0 right-0 flex gap-32"
            animate={{ x: [0, -200] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex-shrink-0">
                {/* Trees */}
                <div className="relative">
                  <div className={`w-2 h-16 ${darkMode ? 'bg-amber-900' : 'bg-amber-800'}`} />
                  <div className={`absolute -top-8 -left-6 w-14 h-14 rounded-full ${darkMode ? 'bg-green-800' : 'bg-green-600'}`} />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Cyclist on Husqvarna HC5 */}
          <motion.div
            className="absolute bottom-20 left-1/3"
            animate={{
              y: [0, -10, 0, -8, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Husqvarna HC5 E-Bike */}
            <svg width="140" height="90" viewBox="0 0 140 90" className="relative">
              {/* Back wheel - MTB style with thicker tire */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                style={{ originX: "25px", originY: "70px" }}
              >
                {/* Tire */}
                <circle cx="25" cy="70" r="15" stroke="#1a1a1a" strokeWidth="4" fill="none" />
                <circle cx="25" cy="70" r="13" stroke={darkMode ? "#64748b" : "#374151"} strokeWidth="2" fill="none" />
                {/* Spokes */}
                <line x1="25" y1="55" x2="25" y2="85" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <line x1="10" y1="70" x2="40" y2="70" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <line x1="14" y1="59" x2="36" y2="81" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1" />
                <line x1="36" y1="59" x2="14" y2="81" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1" />
                {/* Disc brake */}
                <circle cx="25" cy="70" r="5" fill="#ff6600" opacity="0.8" />
              </motion.g>

              {/* Front wheel - MTB style with thicker tire */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                style={{ originX: "105px", originY: "70px" }}
              >
                {/* Tire */}
                <circle cx="105" cy="70" r="15" stroke="#1a1a1a" strokeWidth="4" fill="none" />
                <circle cx="105" cy="70" r="13" stroke={darkMode ? "#64748b" : "#374151"} strokeWidth="2" fill="none" />
                {/* Spokes */}
                <line x1="105" y1="55" x2="105" y2="85" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <line x1="90" y1="70" x2="120" y2="70" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <line x1="94" y1="59" x2="116" y2="81" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1" />
                <line x1="116" y1="59" x2="94" y2="81" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1" />
                {/* Disc brake */}
                <circle cx="105" cy="70" r="5" fill="#ff6600" opacity="0.8" />
              </motion.g>

              {/* Front suspension fork - Husqvarna style */}
              <line x1="105" y1="70" x2="95" y2="45" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
              <line x1="105" y1="70" x2="97" y2="48" stroke="#ff6600" strokeWidth="2" />

              {/* Main frame - Orange/Black Husqvarna colors */}
              {/* Down tube */}
              <line x1="25" y1="70" x2="55" y2="42" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
              <line x1="25" y1="70" x2="55" y2="42" stroke="#ff6600" strokeWidth="4" strokeLinecap="round" />

              {/* Top tube */}
              <line x1="55" y1="42" x2="85" y2="40" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
              <line x1="55" y1="42" x2="85" y2="40" stroke="#ff6600" strokeWidth="4" strokeLinecap="round" />

              {/* Seat tube */}
              <line x1="55" y1="42" x2="48" y2="70" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
              <line x1="55" y1="42" x2="48" y2="70" stroke="#ff6600" strokeWidth="4" strokeLinecap="round" />

              {/* Head tube */}
              <line x1="85" y1="40" x2="95" y2="45" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />

              {/* Chain stay */}
              <line x1="48" y1="70" x2="105" y2="70" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />

              {/* Seat stay */}
              <line x1="55" y1="45" x2="105" y2="70" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />

              {/* E-bike battery pack - distinctive Husqvarna feature */}
              <rect x="35" y="50" width="20" height="18" rx="2" fill="#1a1a1a" stroke="#ff6600" strokeWidth="2" />
              <text x="45" y="61" fontSize="8" fill="#ff6600" textAnchor="middle" fontWeight="bold">HC5</text>

              {/* Husqvarna logo on frame */}
              <circle cx="42" cy="45" r="6" fill="#1a1a1a" stroke="#ff6600" strokeWidth="1.5" />
              <text x="42" y="48" fontSize="6" fill="#ff6600" textAnchor="middle" fontWeight="bold">H</text>

              {/* Seat post and saddle */}
              <line x1="55" y1="42" x2="55" y2="32" stroke="#1a1a1a" strokeWidth="3" />
              <ellipse cx="55" cy="30" rx="10" ry="4" fill="#1a1a1a" stroke="#ff6600" strokeWidth="1" />

              {/* Handlebars - MTB style flat bars */}
              <line x1="95" y1="45" x2="98" y2="38" stroke="#1a1a1a" strokeWidth="3" />
              <line x1="90" y1="38" x2="106" y2="38" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />

              {/* Grips */}
              <circle cx="90" cy="38" r="2" fill="#ff6600" />
              <circle cx="106" cy="38" r="2" fill="#ff6600" />

              {/* Person - Cyclist */}
              {/* Full-face helmet - Integral style */}
              <ellipse cx="65" cy="22" rx="9" ry="8" fill="#ff6600" stroke="#1a1a1a" strokeWidth="2" />
              {/* Visor */}
              <ellipse cx="68" cy="22" rx="4" ry="3" fill="#1a1a1a" opacity="0.7" />
              <ellipse cx="68" cy="22" rx="3.5" ry="2.5" fill={darkMode ? "#334155" : "#64748b"} opacity="0.5" />
              {/* Chin guard */}
              <path d="M 58 26 Q 65 29 72 26" stroke="#1a1a1a" strokeWidth="2" fill="#ff6600" />
              {/* Ventilation slots */}
              <line x1="60" y1="20" x2="62" y2="20" stroke="#1a1a1a" strokeWidth="1" />
              <line x1="60" y1="23" x2="62" y2="23" stroke="#1a1a1a" strokeWidth="1" />
              {/* Helmet details */}
              <circle cx="70" cy="18" r="1" fill="#ffffff" opacity="0.6" />

              {/* Neck/Body connection */}
              <line x1="65" y1="29" x2="65" y2="31" stroke={darkMode ? "#fbbf24" : "#f59e0b"} strokeWidth="3" />

              {/* Body - cycling jersey */}
              <line x1="65" y1="31" x2="58" y2="45" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
              <line x1="65" y1="31" x2="58" y2="45" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

              {/* Arms */}
              <motion.g
                animate={{
                  rotate: [0, -8, 0, 8, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ originX: "65px", originY: "31px" }}
              >
                <line x1="65" y1="33" x2="88" y2="40" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
                <line x1="65" y1="33" x2="88" y2="40" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="88" y1="40" x2="98" y2="38" stroke={darkMode ? "#fbbf24" : "#f59e0b"} strokeWidth="3" strokeLinecap="round" />
              </motion.g>

              {/* Legs - animated pedaling */}
              <motion.g
                animate={{
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ originX: "48px", originY: "60px" }}
              >
                <line x1="58" y1="45" x2="48" y2="60" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
                <line x1="48" y1="60" x2="55" y2="68" stroke={darkMode ? "#fbbf24" : "#f59e0b"} strokeWidth="3" strokeLinecap="round" />
              </motion.g>

              {/* Crank and pedal */}
              <circle cx="48" cy="60" r="8" fill="none" stroke="#1a1a1a" strokeWidth="2" />
              <circle cx="48" cy="60" r="3" fill="#ff6600" />
            </svg>
          </motion.div>

          {/* Sun/Moon in sky */}
          <motion.div
            className={`absolute top-8 right-12 w-12 h-12 rounded-full ${darkMode ? 'bg-slate-300' : 'bg-yellow-400'}`}
            animate={{
              scale: darkMode ? [1, 1.1, 1] : [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {darkMode && (
              <>
                <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-slate-400" />
                <div className="absolute top-6 left-5 w-2 h-2 rounded-full bg-slate-400" />
              </>
            )}
          </motion.div>

          {/* Clouds */}
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
      </section>

      <footer className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-t mt-auto`}>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-lg mb-1">Gregorio Martino</h3>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.role}
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} className={darkMode ? 'text-slate-400' : 'text-slate-600'} />
                <a href="mailto:gregorio@example.com" className="hover:underline">
                  gregorio@example.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className={darkMode ? 'text-slate-400' : 'text-slate-600'} />
                <span>{t.location}</span>
              </div>
            </div>
          </div>

          <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'} text-center text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <p>© {new Date().getFullYear()} Gregorio Martino. {t.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}