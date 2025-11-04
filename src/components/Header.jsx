import { Button } from '@/components/ui/Button'
import '../Header.css'

export default function Header({ language, setLanguage, t, stats }) {
  return (
    <header className="header relative bg-black text-green-500 p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">

      

      {/* Titolo e ruolo */}
      <div className="flex flex-col items-start md:items-start mt-16 md:mt-0">
        <h1 className="header-title text-2xl md:text-3xl font-bold">{t.name || 'Gregorio Martino'}</h1>
        <p className="header-role text-sm md:text-base">{t.role}</p>
      </div>

      {/* Bottoni social e CV */}
      <div className="header-social flex flex-wrap gap-2 md:gap-4 mt-4 md:mt-0">
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

      {/* Selettore lingua */}
      <div className="language-selector flex gap-1 mt-4 md:mt-0">
        {['it', 'en', 'es'].map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-2 py-1 rounded text-sm ${
              language === lang ? 'bg-green-700 text-white' : 'bg-green-900 text-green-400'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  )
}
