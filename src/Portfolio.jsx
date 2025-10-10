import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Sun, Moon, Mail, MapPin } from 'lucide-react'

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} min-h-screen transition-colors flex flex-col`}>
      <header className="text-center py-10 relative">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-2">
          Gregorio Martino
        </motion.h1>
        <p className="text-lg text-slate-500">Full-Stack Java Developer</p>
        <div className="mt-4 space-x-3">
          <a href="https://www.linkedin.com/in/gregorio-martino-5a42a3171/" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">LinkedIn</Button>
         </a>

         <a href="https://github.com/gregoriomartino" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">GitHub</Button>
         </a>

         <a href="https://gitlab.com/martinogregorio2-group" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">GitLab</Button>
         </a>


          <a href={`${import.meta.env.BASE_URL}cv_gregorio_martino.pdf`} download>

            <Button>Scarica CV</Button>
          </a>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-6 p-2 rounded-full border border-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <section className="max-w-4xl mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-semibold mb-3">Profilo Professionale</h2>
        <p className="leading-relaxed">
       Sono uno sviluppatore Java con oltre 5 anni di esperienza in ambienti enterprise.
       Amo costruire soluzioni pulite e affidabili, trasformando codice legacy in architetture moderne.
       Credo nella collaborazione, nella curiosità tecnica e nel miglioramento continuo.
        </p>
      </section>

      <footer className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-t mt-auto`}>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-lg mb-1">Gregorio Martino</h3>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Full-Stack Java Developer
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
                <span>Foggia, Italia</span>
              </div>
            </div>
          </div>

          <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'} text-center text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <p>© {new Date().getFullYear()} Gregorio Martino. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}