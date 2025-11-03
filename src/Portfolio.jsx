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
    

      </main>

      <Footer t={t} darkMode={darkMode} />
    </div>
  )
}
