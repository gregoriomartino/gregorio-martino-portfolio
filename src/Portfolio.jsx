import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Profile from './components/Profile'
import Scene from './components/Scene'
import ChatBot from './components/ChatBot'
import translations from './translation'

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('it')
  const t = translations[language]

  const season = getSeason()

  return (
    <div className={`${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} min-h-screen transition-colors flex flex-col`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} t={t} />

      <main className="max-w-4xl mx-auto p-6 flex-grow">
        <Profile t={t} />
{/*     <Scene darkMode={darkMode} season={season} /> */}
<ChatBot darkMode={darkMode} season={season} />
      </main>

      <Footer t={t} darkMode={darkMode} />
    </div>
  )
}

function getSeason() {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}
