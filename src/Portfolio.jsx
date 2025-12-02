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
  const [language, setLanguage] = useState('it')
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const t = translations[language]
  const navigate = useNavigate()

//   // Traccia la visita all'avvio
//   useEffect(() => {
//     fetch('http://localhost:8080/api/track', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         path: window.location.hash || '/',
//         referrer: document.referrer,
//       }),
//     }).catch(err => console.warn('track error', err))
//   }, [])
//
//   // Fetch stats live ogni 12 ore
//   useEffect(() => {
//     const fetchStats = () => {
//       fetch('http://localhost:8080/api/stats')
//         .then(res => res.json())
//         .then(data => setStats(data))
//         .catch(err => console.warn('stats error', err))
//     }
//
//     fetchStats()
//     const interval = setInterval(fetchStats, 12 * 60 * 60 * 1000)
//     return () => clearInterval(interval)
//   }, [])

  // Navigazione giochi/visite
  const handleShowGames = () => navigate('/games')
  const handleShowVisits = () => navigate('/visits')

  if (loading) {
    return <LoadingScreen onFinish={() => setLoading(false)} />
  }

  return (
    <div className="bg-black text-green-500 min-h-screen flex flex-col font-sans">
      <Header
        language={language}
        setLanguage={setLanguage}
        t={t}
        
      />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8 grid gap-8">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Profile t={t} />
              </div>
            }
          />
          <Route
            path="/games"
            element={
              <div className="bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-8 transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
                <TrisGame />
              </div>
            }
          />
          <Route
            path="/visits"
            element={
              <div className="bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-8 transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
                <VisitsPage stats={stats} darkMode={true} />
              </div>
            }
          />
        </Routes>
      </main>

      <Footer t={t}
      stats={stats}
       />
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
