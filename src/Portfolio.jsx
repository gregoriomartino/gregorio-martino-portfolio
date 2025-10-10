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

          {/* Cyclist */}
          <motion.div
            className="absolute bottom-20 left-1/3"
            animate={{
              y: [0, -8, 0, -6, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Bike frame */}
            <svg width="120" height="80" viewBox="0 0 120 80" className="relative">
              {/* Back wheel */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                style={{ originX: "20px", originY: "65px" }}
              >
                <circle cx="20" cy="65" r="12" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="2" fill="none" />
                <line x1="20" y1="53" x2="20" y2="77" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <line x1="8" y1="65" x2="32" y2="65" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <line x1="12" y1="57" x2="28" y2="73" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1" />
                <line x1="28" y1="57" x2="12" y2="73" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1" />
              </motion.g>

              {/* Front wheel */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                style={{ originX: "90px", originY: "65px" }}
              >
                <circle cx="90" cy="65" r="12" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="2" fill="none" />
                <line x1="90" y1="53" x2="90" y2="77" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <line x1="78" y1="65" x2="102" y2="65" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <line x1="82" y1="57" x2="98" y2="73" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1" />
                <line x1="98" y1="57" x2="82" y2="73" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="1" />
              </motion.g>

              {/* Frame */}
              <line x1="20" y1="65" x2="45" y2="45" stroke={darkMode ? "#ef4444" : "#dc2626"} strokeWidth="3" />
              <line x1="45" y1="45" x2="65" y2="45" stroke={darkMode ? "#ef4444" : "#dc2626"} strokeWidth="3" />
              <line x1="65" y1="45" x2="90" y2="65" stroke={darkMode ? "#ef4444" : "#dc2626"} strokeWidth="3" />
              <line x1="45" y1="45" x2="45" y2="65" stroke={darkMode ? "#ef4444" : "#dc2626"} strokeWidth="3" />
              <line x1="45" y1="65" x2="90" y2="65" stroke={darkMode ? "#ef4444" : "#dc2626"} strokeWidth="2" />

              {/* Seat */}
              <ellipse cx="45" cy="42" rx="8" ry="3" fill={darkMode ? "#1e293b" : "#0f172a"} />

              {/* Handlebars */}
              <line x1="65" y1="45" x2="75" y2="38" stroke={darkMode ? "#64748b" : "#475569"} strokeWidth="2" />
              <line x1="72" y1="38" x2="78" y2="38" stroke={darkMode ? "#64748b" : "#475569"} strokeWidth="2" />

              {/* Person */}
              {/* Head */}
              <circle cx="55" cy="28" r="6" fill={darkMode ? "#fbbf24" : "#f59e0b"} />

              {/* Body */}
              <line x1="55" y1="34" x2="50" y2="45" stroke={darkMode ? "#3b82f6" : "#2563eb"} strokeWidth="4" strokeLinecap="round" />

              {/* Arms */}
              <motion.g
                animate={{
                  rotate: [0, -5, 0, 5, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ originX: "55px", originY: "34px" }}
              >
                <line x1="55" y1="36" x2="68" y2="40" stroke={darkMode ? "#3b82f6" : "#2563eb"} strokeWidth="3" strokeLinecap="round" />
                <line x1="68" y1="40" x2="75" y2="38" stroke={darkMode ? "#fbbf24" : "#f59e0b"} strokeWidth="2.5" strokeLinecap="round" />
              </motion.g>

              {/* Legs - animated pedaling */}
              <motion.g
                animate={{
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ originX: "45px", originY: "55px" }}
              >
                <line x1="50" y1="45" x2="45" y2="55" stroke={darkMode ? "#1e40af" : "#1e3a8a"} strokeWidth="3" strokeLinecap="round" />
                <line x1="45" y1="55" x2="52" y2="62" stroke={darkMode ? "#fbbf24" : "#f59e0b"} strokeWidth="2.5" strokeLinecap="round" />
              </motion.g>

              {/* Pedal circle */}
              <circle cx="45" cy="55" r="2" fill={darkMode ? "#64748b" : "#475569"} />
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
                  martinogregorio2@gmail.com
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