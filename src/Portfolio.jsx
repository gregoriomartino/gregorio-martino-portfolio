import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Sun, Moon } from 'lucide-react'

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} min-h-screen transition-colors`}>
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

      <section className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-3">Profilo Professionale</h2>
        <p className="leading-relaxed">
          Sviluppatore software con oltre 5 anni di esperienza in ambienti enterprise (Agenzia delle Entrate, Autostrade per
          l’Italia). Specializzato in Java e architetture full-stack.
          Mi occupo di evoluzione, manutenzione e ottimizzazione di sistemi complessi, con attenzione alla qualità del
          codice e alla collaborazione in team.


          
        </p>
      </section>
    </div>
  )
}