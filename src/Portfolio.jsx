import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Profile from './components/Profile'
import TrisGame from './components/TrisGame'
import VisitsPage from './components/VisitsPage'
import translations from './translation'

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('it')
  const t = translations[language]

  const [stats, setStats] = useState(null)

  // Track visit all'avvio
  useEffect(() => {
    fetch('http://localhost:8080/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname, referrer: document.referrer })
    }).catch(err => console.warn('track error', err))
  }, [])

  // Fetch stats live
  useEffect(() => {
    const fetchStats = () => {
      fetch('http://localhost:8080/api/stats')
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.warn('stats error', err))
    }

    fetchStats()
    const interval = setInterval(fetchStats, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Router>
      <div className={`${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} min-h-screen transition-colors flex flex-col`}>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />

        <main className="max-w-4xl mx-auto p-6 flex-grow">
          <Routes>
            <Route path="/" element={<Profile t={t} />} />
            <Route path="/games" element={<TrisGame />} />
            <Route path="/visits" element={<VisitsPage stats={stats} />} />
          </Routes>
        </main>

        <Footer t={t} darkMode={darkMode} />
      </div>
    </Router>
  )
}
