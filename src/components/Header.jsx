import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import '../Header.css'

export default function Header({
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  t,
  onShowGames,
  onShowVisits
}) {
  return (
    <header className="header">
      <h1 className="header-title">Gregorio Martino</h1>
      <p className="header-role">{t.role}</p>

      {/* Bottoni social e CV */}
      <div className="header-social">
        <a href="https://www.linkedin.com/in/gregorio-martino-5a42a3171/" target="_blank" rel="noopener noreferrer">
          <Button className="button">{t.linkedin}</Button>
        </a>
        <a href="https://github.com/gregoriomartino" target="_blank" rel="noopener noreferrer">
          <Button className="button">{t.github}</Button>
        </a>
        <a href="https://gitlab.com/martinogregorio2-group" target="_blank" rel="noopener noreferrer">
          <Button className="button">{t.gitlab}</Button>
        </a>
        <a href={`${import.meta.env.BASE_URL}cv_gregorio_martino.pdf`} download>
          <Button className="button">{t.downloadCV}</Button>
        </a>
      </div>

      {/* Azioni principali */}
      <div className="header-actions">
        <Button className="button" onClick={onShowGames}>🎮 {t.games}</Button>
        <Button className="button secondary" onClick={onShowVisits}>📊 {t.visits}</Button>
      </div>

      {/* Toggle Dark/Light */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="dark-toggle"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Selettore lingua */}
      <div className="language-selector">
        {['it', 'en', 'es'].map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`lang-btn ${language === lang ? 'active' : ''}`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  )
}
