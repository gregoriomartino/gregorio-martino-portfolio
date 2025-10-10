import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Profile from './components/Profile'
import CyclistAnimation from './components/CyclistAnimation'
import Mountains from './components/Mountains'
import Road from './components/Road'
import translation from './translation'

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('it')

  const t = translations[language]

  const season = getSeason() // funzione helper che determina la stagione

  return (
    <div className={`${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} min-h-screen transition-colors flex flex-col`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} t={t} />

      <section className="max-w-4xl mx-auto p-6 flex-grow">
        <Profile t={t} />
        <div className="mt-12 relative h-64 overflow-hidden rounded-lg">
          <Road darkMode={darkMode} />
          <Mountains darkMode={darkMode} season={season} />
          <CyclistAnimation darkMode={darkMode} />
        </div>
      </section>

      <Footer t={t} darkMode={darkMode} />
    </div>
  )
}

// Helper
function getSeason() {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}
