import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Sun, Moon, Mail, MapPin, Languages } from 'lucide-react'

const translations = {
  it: {
    role: 'Software Developer',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    downloadCV: 'Scarica CV',
    profile: 'Profilo Professionale',
    profileText: 'Sviluppatore Java con oltre 5 anni di esperienza, appassionato di architetture pulite e scalabili. Mi piace trasformare codice legacy in sistemi moderni, curando qualità e performance. Fuori dal codice, pratico ciclismo enduro: mi allena alla perseveranza e alla gestione delle difficoltà, qualità che porto anche nei progetti software.',
    location: 'San Giovanni Rotondo, Italia',
    rights: 'Tutti i diritti riservati.'
  },
  en: {
    role: 'Software Developer',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    downloadCV: 'Download CV',
    profile: 'Professional Profile',
    profileText: 'I am a Java developer with over 5 years of experience in enterprise environments. I love building clean and reliable solutions, transforming legacy code into modern architectures. I believe in collaboration, technical curiosity, and continuous improvement.',
    location: 'San Giovanni Rotondo, Italy',
    rights: 'All rights reserved.'
  },
  es: {
    role: 'Software Developer',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    downloadCV: 'Descargar CV',
    profile: 'Perfil Profesional',
    profileText: 'Soy un desarrollador Java con más de 5 años de experiencia en entornos empresariales. Me encanta construir soluciones limpias y confiables, transformando código legacy en arquitecturas modernas. Creo en la colaboración, la curiosidad técnica y la mejora continua.',
    location: 'San Giovanni Rotondo, Italia',
    rights: 'Todos los derechos reservados.'
  }
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('it')
  const t = translations[language]

  // Determina la stagione
  const month = new Date().getMonth() + 1
  let mountainColor = 'bg-green-600'
  if (month >= 9 && month <= 11) mountainColor = 'bg-orange-600' // Autunno
  else if (month >= 12 || month <= 2) mountainColor = 'bg-white' // Inverno
  else if (month >= 3 && month <= 5) mountainColor = 'bg-green-400' // Primavera
  else mountainColor = 'bg-green-600' // Estate

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
        <p className="leading-relaxed">{t.profileText}</p>

        {/* Cycling Animation */}
        <div className="mt-12 relative h-64 overflow-hidden rounded-lg">
          {/* Mountains */}
          <motion.div className="absolute bottom-16 left-0 right-0 flex justify-center items-end gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`w-32 h-24 clip-path-triangle ${mountainColor}`}></div>
            ))}
          </motion.div>

          {/* Road */}
          <div className={`absolute bottom-0 left-0 right-0 h-20 ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`}>
            <motion.div
              className="absolute top-2 left-0 right-0 h-1 flex gap-8"
              animate={{ x: [0, -100] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`w-16 h-1 ${darkMode ? 'bg-slate-600' : 'bg-slate-400'}`} />
              ))}
            </motion.div>
          </div>

          {/* Cyclist on Husqvarna HC5 */}
          <motion.div
            className="absolute bottom-20 left-1/3"
            animate={{ y: [0, -10, 0, -8, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* SVG ciclista (stesso codice già presente nel tuo file) */}
            <svg width="140" height="90" viewBox="0 0 140 90" className="relative">
              {/* Inserisci qui tutto il tuo SVG del ciclista */}
            </svg>
          </motion.div>

          {/* Sun/Moon */}
          <motion.div
            className={`absolute top-8 right-12 w-12 h-12 rounded-full ${darkMode ? 'bg-slate-300' : 'bg-yellow-400'}`}
            animate={{ scale: darkMode ? [1, 1.1, 1] : [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {darkMode && (
              <>
                <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-slate-400" />
                <div className="absolute top-6 left-5 w-2 h-2 rounded-full bg-slate-400" />
              </>
            )}
          </motion.div>
        </div>
      </section>

      <footer className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-t mt-auto`}>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-lg mb-1">Gregorio Martino</h3>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.role}</p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} className={darkMode ? 'text-slate-400' : 'text-slate-600'} />
                <a href="mailto:martinogregorio2@gmail.com" className="hover:underline">
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
