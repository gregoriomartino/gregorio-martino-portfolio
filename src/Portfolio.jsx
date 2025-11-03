import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Profile from './components/Profile'
import TrisGame from './components/TrisGame'
import translations from './translation'

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('it')
  const t = translations[language]

  const [stats, setStats] = useState(null) // Stato per le statistiche
  const season = getSeason()

  // 🔹 Track visit all'avvio della pagina
  useEffect(() => {
    fetch('http://localhost:8080/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname, referrer: document.referrer })
    }).catch(err => console.warn('track error', err));
  }, []);

  // 🔹 Fetch stats live ogni 5 secondi
  useEffect(() => {
    const fetchStats = () => {
      fetch('http://localhost:8080/api/stats')
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.warn('stats error', err));
    }

    fetchStats() // primo fetch subito
    const interval = setInterval(fetchStats, 5000) // ogni 5 secondi

    return () => clearInterval(interval) // cleanup all'unmount
  }, []);

  return (
    <div className={`${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} min-h-screen transition-colors flex flex-col`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} t={t} />

      <main className="max-w-4xl mx-auto p-6 flex-grow">
        <Profile t={t} />
        <TrisGame darkMode={darkMode} season={season} />

        {/* 📊 Statistiche visite */}
        {stats && (
          <section className="mt-6 p-4 border rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100">
            <h2 className="font-bold mb-2">📊 Statistiche visite (Live)</h2>
            <p>Total Visits: {stats.totalVisits}</p>
            <p>Unique Visitors: {stats.uniqueVisitors}</p>
            <h3 className="mt-2 font-semibold">Ultime 20 visite:</h3>
            <ul className="list-disc list-inside text-sm">
              {stats.lastVisits.map((v, i) => <li key={i}>{v}</li>)}
            </ul>
          </section>
        )}
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

  for (const [seasonName, months] of Object.entries(seasons)) {
    if (months.includes(month)) return seasonName
  }

  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}
/*******  168f31a0-ff91-4070-bb1d-155f669b39b9  *******/
