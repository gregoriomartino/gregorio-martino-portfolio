import { Sun, Moon } from 'lucide-react'
import VisitsPage from './VisitsPage'
import '../Header.css'

export default function Header({ darkMode, setDarkMode, language, setLanguage, t, stats }) {
  return (
    <header className={`header relative bg-black text-green-500 w-full px-4 md:px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between`}>
      
      {/* Mini visits box in alto a sinistra */}
      <div className="absolute top-4 left-4 w-36 md:w-48 z-10">
        <VisitsPage stats={stats} darkMode={darkMode} mini showGeo />
      </div>

      {/* Titolo e ruolo */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4 mt-12 md:mt-0">
        <h1 className="text-lg md:text-2xl font-bold">{t.name || 'Gregorio Martino'}</h1>
        <p className="text-sm md:text-base">{t.role}</p>
      </div>

      {/* Bottoni social e CV */}
      <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
        <a href="https://www.linkedin.com/in/gregorio-martino-5a42a3171/" target="_blank" rel="noopener noreferrer">
          <button className="px-2 py-1 text-sm md:text-base border border-green-500 rounded">{t.linkedin}</button>
        </a>
        <a href="https://github.com/gregoriomartino" target="_blank" rel="noopener noreferrer">
          <button className="px-2 py-1 text-sm md:text-base border border-green-500 rounded">{t.github}</button>
        </a>
        <a href="https://gitlab.com/martinogregorio2-group" target="_blank" rel="noopener noreferrer">
          <button className="px-2 py-1 text-sm md:text-base border border-green-500 rounded">{t.gitlab}</button>
        </a>
        <a href={`${import.meta.env.BASE_URL}cv_gregorio_martino.pdf`} download>
          <button className="px-2 py-1 text-sm md:text-base border border-green-500 rounded">{t.downloadCV}</button>
        </a>
      </div>

      {/* Dark/Light toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full border border-green-500"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Selettore lingua */}
      <div className="absolute top-4 right-20 flex gap-1">
        {['it', 'en', 'es'].map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-2 py-1 text-xs md:text-sm rounded ${
              language === lang
                ? 'bg-green-500 text-black'
                : 'border border-green-500 text-green-500'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  )
}
