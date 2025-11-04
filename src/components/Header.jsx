import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import VisitsPage from './VisitsPage'
import '../Header.css'

export default function Header({ darkMode, setDarkMode, language, setLanguage, t, stats }) {
  return (
    <header className="header">
      <h1 className="header-title glow">Gregorio Martino</h1>
      <p className="header-role">{t.role}</p>

      <div className="header-social">
        <a href="https://www.linkedin.com/in/gregorio-martino-5a42a3171/" target="_blank" rel="noopener noreferrer">
          <Button className="neon-button glow">{t.linkedin}</Button>
        </a>
        <a href="https://github.com/gregoriomartino" target="_blank" rel="noopener noreferrer">
          <Button className="neon-button glow">{t.github}</Button>
        </a>
        <a href="https://gitlab.com/martinogregorio2-group" target="_blank" rel="noopener noreferrer">
          <Button className="neon-button glow">{t.gitlab}</Button>
        </a>
        <a href={`${import.meta.env.BASE_URL}cv_gregorio_martino.pdf`} download>
          <Button className="neon-button glow">{t.downloadCV}</Button>
        </a>
      </div>

      <div className="header-actions">
        <Button className="neon-button glow">🎮 {t.games}</Button>
      </div>

      <button onClick={() => setDarkMode(!darkMode)} className="dark-toggle neon-button-circle glow">
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="language-selector">
        {['it', 'en', 'es'].map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`lang-btn glow ${language === lang ? 'active' : ''}`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* VisitsPage sempre visibile */}
      <VisitsPage stats={stats} darkMode={darkMode} />
    </header>
  )
}
