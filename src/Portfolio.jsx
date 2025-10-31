import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Profile from './components/Profile'
import TrisGame from './components/TrisGame'
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
        <TrisGame darkMode={darkMode} season={season} />
      </main>

      <Footer t={t} darkMode={darkMode} />
    </div>
  )
}

/*************  ✨ Windsurf Command 🌟  *************/
function getSeason() {
  const month = new Date().getMonth() + 1
  const seasons = {
    spring: [3, 4, 5],
    summer: [6, 7, 8],
    autumn: [9, 10, 11],
    winter: [12, 1, 2]
  }

  // TODO: improve this implementation
  for (const [seasonName, months] of Object.entries(seasons)) {
    if (months.includes(month)) return seasonName
  }

  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}
/*******  168f31a0-ff91-4070-bb1d-155f669b39b9  *******/
