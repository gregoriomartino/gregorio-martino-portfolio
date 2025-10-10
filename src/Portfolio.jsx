import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
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

          {/* Background elements - Trees */}
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

          {/* Mountains - autumn style */}
          <motion.div
            className="absolute bottom-20 left-0 right-0 flex justify-center gap-4"
            animate={{ x: [0, -50] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative w-40 h-32">
                <svg viewBox="0 0 100 80" className="w-full h-full">
                  <polygon
                    points="0,80 50,0 100,80"
                    fill={darkMode ? "#334155" : "#a0522d"}
                  />
                  <polygon
                    points="30,30 50,0 70,30"
                    fill={darkMode ? "#64748b" : "#facc15"}
                  />
                </svg>
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
            {/* SVG del ciclista rimane invariato */}
            {/* ... il resto del tuo SVG del ciclista ... */}
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
