import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import VisitsPage from './VisitsPage'
import '../Header.css'

export default function Header({ darkMode, setDarkMode, language, setLanguage, t, stats }) {
  return (
    <header className="header relative p-6">
      {/* Mini visits box in alto a sinistra */}
      <div className="visits-mini-container absolute top-4 left-4">
        <VisitsPage stats={stats} darkMode={darkMode} mini />
      </div>

      <h1 className="header-title">{t.name || 'Gregorio Martino'}</h1>
      <p className="header-role">{t.role}</p>

      <div className="header-social mt-4 flex gap-2 flex-wrap">
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

      <div className="header-actions mt-4">
        <Button onClick={() => alert('Vai ai giochi!')}>🎮 {t.games}</Button>
      </div>

      <button onClick={() => setDarkMode(!darkMode)} className="dark-toggle absolute top-4 right-4 p-2 border rounded">
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="language-selector absolute top-4 right-20 flex gap-1">
        {['it', 'en', 'es'].map(lang => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`lang-btn px-2 py-1 rounded ${language === lang ? 'bg-gray-400 text-white' : ''}`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  )
}
