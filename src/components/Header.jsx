import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import VisitsPage from './VisitsPage'
import '../Header.css'

export default function Header({ darkMode, setDarkMode, language, setLanguage, t, stats }) {
  return (
    <header className={`header relative ${darkMode ? 'dark' : ''}`}>
      {/* Mini visits box in alto a sinistra */}
      <div className="visits-mini-container absolute top-4 left-4">
        <VisitsPage stats={stats} darkMode={darkMode} mini />
      </div>

      {/* Titolo e ruolo */}
      <h1 className="header-title">{t.name || 'Gregorio Martino'}</h1>
      <p className="header-role">{t.role}</p>

      {/* Bottoni social e CV */}
      <div className="header-social">
        <a href="https://www.linkedin.com/in/gregorio-martino-5a42a3171/" target="_blank" rel="noopener noreferrer">
          <Button>{t.linkedin}</Button>
        </a>
        <a href="https://github.com/gregoriomartino" target="_blank" rel="noopener noreferrer">
          <Button>{t.github}</Button>
        </a>
        <a href="https://gitlab.com/martinogregorio2-group" target="_blank" rel="noopener noreferrer">
          <Button>{t.gitlab}</Button>
        </a>
        <a href={`${import.meta.env.BASE_URL}cv_gregorio_martino.pdf`} download>
          <Button>{t.downloadCV}</Button>
        </a>
      </div>

      {/* Pulsante Dark/Light */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="dark-toggle rounded-full border px-2 py-2 absolute top-4 right-6"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Selettore lingua */}
      <div className="language-selector absolute top-4 right-20 flex gap-1">
        {['it', 'en', 'es'].map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`lang-btn px-2 py-1 rounded text-sm ${language === lang ? 'bg-black-700 text-white' : darkMode ? 'bg-black-800 text-black-400' : 'bg-black-200 text-black-700'}`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  )
}
