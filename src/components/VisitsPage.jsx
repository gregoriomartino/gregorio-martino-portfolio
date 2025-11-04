import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import '../VisitsPage.css'

export default function VisitsPage({ stats, darkMode, mini = false }) {
  const [animatedStats, setAnimatedStats] = useState({
    totalVisits: 0,
    visitsToday: 0,
    uniqueVisitors: 0,
  })

  // Animazione solo se non mini
  useEffect(() => {
    if (!stats || mini) return

    const duration = 1
    const steps = 50
    const interval = (duration * 1000) / steps

    const animateValue = (start, end, key) => {
      let current = start
      const increment = (end - start) / steps
      const anim = setInterval(() => {
        current += increment
        setAnimatedStats(prev => ({ ...prev, [key]: Math.round(current) }))
      }, interval)
      setTimeout(() => clearInterval(anim), duration * 1000)
    }

    animateValue(animatedStats.totalVisits, stats.totalVisits, 'totalVisits')
    animateValue(animatedStats.visitsToday, stats.visitsToday, 'visitsToday')
    animateValue(animatedStats.uniqueVisitors, stats.uniqueVisitors, 'uniqueVisitors')
  }, [stats, mini])

  // Mini box: mostra solo le statistiche principali
  if (mini) {
    return (
      <div className={`visits-mini ${darkMode ? 'dark' : ''}`}>
        {!stats ? (
          <p className="text-xs">Caricamento...</p>
        ) : (
          <div className="visits-mini-stats text-xs font-mono">
            <p>Total: {stats.totalVisits}</p>
            <p>Oggi: {stats.visitsToday}</p>
            <p>Unici: {stats.uniqueVisitors}</p>
          </div>
        )}
      </div>
    )
  }

  // Versione completa
  const parseUniqueVisits = (entries = []) => {
    const seenIps = new Set()
    const uniqueVisits = []

    for (const entry of entries) {
      const parts = entry.split('|').map(p => p.trim())
      const ip = parts[1] || '-'
      const path = parts[3] || '-'
      const timestamp = parts[0]

      if (!seenIps.has(ip)) {
        seenIps.add(ip)
        uniqueVisits.push({ ip, path, timestamp })
      }
    }

    return uniqueVisits
  }

  const uniqueVisits = parseUniqueVisits(stats?.lastVisits)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`visits-container ${darkMode ? 'dark' : ''}`}
    >
      <h2>Stato Visite</h2>
      {!stats ? (
        <p>Caricamento in corso...</p>
      ) : (
        <ul className="visits-list">
          <li><strong>Visite totali:</strong> {animatedStats.totalVisits}</li>
          <li><strong>Visite oggi:</strong> {animatedStats.visitsToday}</li>
          <li><strong>Utenti unici:</strong> {animatedStats.uniqueVisitors}</li>
          <li>
            <strong>Ultime pagine visitate (per IP unico):</strong>
            <ul className="unique-visits">
              {uniqueVisits.map((v, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="font-semibold">{v.path}</span>
                  <span className="visit-meta"> ({v.ip} · {new Date(v.timestamp).toLocaleTimeString()})</span>
                </motion.li>
              ))}
            </ul>
          </li>
        </ul>
      )}
    </motion.div>
  )
}
