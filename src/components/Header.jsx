import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Header({ darkMode, setDarkMode, language, setLanguage, t }) {
  return (
    <header className="text-center py-10 relative">
      <h1 className="text-4xl font-bold mb-2">Gregorio Martino</h1>
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
  )
}
