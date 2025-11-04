import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Profile from './components/Profile'
import TrisGame from './components/TrisGame'
import VisitsPage from './components/VisitsPage'
import LoadingScreen from './components/LoadingScreen'
import translations from './translation'

function PortfolioInner() {
  const [darkMode, setDarkMode] = useState(true) // tema nero
  const [language, setLanguage] = useState('it')
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const t = translations[language]
  const navigate = useNavigate()

  // Traccia la visita all'avvio
  useEffect(() => {
    fetch('http://localhost:8080/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: window.location.hash || '/',
        referrer: document.referrer,
      }),
    }).catch(err => console.warn('track error', err))
  }, [])

  // Fetch stats live ogni 12 ore
  useEffect(() => {
    const fetchStats = () => {
      fetch('http://localhost:8080/api/stats')
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.warn('stats error', err))
    }

    fetchStats()
    const interval = setInterval(fetchStats, 12 * 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const handleShowGames = () => navigate('/games')
  const handleShowVisits = () => navigate('/visits')

  if (loading) {
    return <LoadingScreen onFinish={() => setLoading(false)} />
  }

  return (
    <div className={`bg-black text-green-500 min-h-screen flex flex-col transition-colors duration-500 font-sans overflow-x-hidden`}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        t={t}
        onShowGames={handleShowGames}
        onShowVisits={handleShowVisits}
        stats={stats}
      />

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 md:px-6 py-8 grid gap-8">
        <Routes>
          <Route
            path="/"
            element={
              <div className="bg-black rounded-3xl shadow-lg p-6 md:p-8 transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 w-full">
                <Profile t={t} />
              </div>
            }
          />
          <Route
            path="/games"
            element={
              <div className="bg-black rounded-3xl shadow-lg p-6 md:p-8 transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 w-full">
                <TrisGame darkMode={darkMode} />
              </div>
            }
          />
          <Route
            path="/visits"
            element={
              <div className="bg-black rounded-3xl shadow-lg p-6 md:p-8 transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 w-full">
                <VisitsPage stats={stats} darkMode={darkMode} />
              </div>
            }
          />
        </Routes>
      </main>

      <Footer t={t} darkMode={darkMode} />
    </div>
  )
}

export default function Portfolio() {
  return (
    <Router basename="/">
      <PortfolioInner />
    </Router>
  )
}
