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