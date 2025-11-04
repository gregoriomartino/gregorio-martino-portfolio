import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import '../VisitsPage.css'

export default function VisitsPage({ stats, darkMode, mini = false }) {
  const [animatedStats, setAnimatedStats] = useState({
    totalVisits: 0,
    visitsToday: 0,
    uniqueVisitors: 0,
  })
  const [uniqueVisits, setUniqueVisits] = useState([])

  const geoCache = React.useRef({})

  const animateValue = (start, end, key) => {
    const duration = 1
    const steps = 50
    const interval = (duration * 1000) / steps
    let current = start
    const increment = (end - start) / steps
    const anim = setInterval(() => {
      current += increment
      setAnimatedStats(prev => ({ ...prev, [key]: Math.round(current) }))
    }, interval)
    setTimeout(() => clearInterval(anim), duration * 1000)
  }

  // Convert country code in emoji bandiera 🇮🇹
  const countryCodeToFlag = (code) => {
    if (!code) return ''
    return code
      .toUpperCase()
      .replace(/./g, char =>
        String.fromCodePoint(127397 + char.charCodeAt())
      )
  }

  const fetchGeo = async (ip) => {
    if (!ip || ip === '-') return { geo: 'N/A', flag: '' }
    if (geoCache.current[ip]) return geoCache.current[ip]

    try {
      const res = await fetch(`https://ipapi.co/${ip}/json/`)
      if (!res.ok) return { geo: 'N/A', flag: '' }
      const data = await res.json()
      const geo = data.city ? `${data.city}, ${data.country_name}` : 'N/A'
      const flag = countryCodeToFlag(data.country_code)
      geoCache.current[ip] = { geo, flag }
      return { geo, flag }
    } catch (err) {
      return { geo: 'N/A', flag: '' }
    }
  }

  useEffect(() => {
    if (!stats) return

    animateValue(animatedStats.totalVisits, stats.totalVisits, 'totalVisits')
    animateValue(animatedStats.visitsToday, stats.visitsToday, 'visitsToday')
    animateValue(animatedStats.uniqueVisitors, stats.uniqueVisitors, 'uniqueVisitors')

    const seenIps = new Set()
    const uniques = []

    const loadGeo = async () => {
      for (const entry of stats.lastVisits || []) {
        const parts = entry.split('|').map(p => p.trim())
        const timestamp = parts[0]
        const ip = parts[1] || '-'
        const path = parts[3] || '-'

        if (!seenIps.has(ip)) {
          seenIps.add(ip)
          const { geo, flag } = await fetchGeo(ip)
          uniques.push({ ip, path, timestamp, geo, flag })
        }
      }
      setUniqueVisits(uniques)
    }

    loadGeo()
  }, [stats])

  if (mini) {
    return (
      <div className={`visits-mini ${darkMode ? 'dark' : ''} bg-black text-green-500 p-2 rounded text-xs`}>
        {!stats ? (
          <p>Caricamento...</p>
        ) : (
          <>
            <p>Total: {animatedStats.totalVisits}</p>
            <p>Oggi: {animatedStats.visitsToday}</p>
            <p>Unici: {animatedStats.uniqueVisitors}</p>
            {uniqueVisits[0] && (
              <p className="mini-visit-ip">
                IP: {uniqueVisits[0].ip} - Geo: {uniqueVisits[0].geo} {uniqueVisits[0].flag}
              </p>
            )}
          </>
        )}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`visits-container ${darkMode ? 'dark' : ''}`}
    >
      <h2>Stato Visite</h2>
      {!stats ? (
        <p className="text-center">Caricamento in corso...</p>
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
                  <span className="visit-meta text-xs">
                    ({v.ip} · {v.geo} {v.flag} · {new Date(v.timestamp).toLocaleTimeString()})
                  </span>
                </motion.li>
              ))}
            </ul>
          </li>
        </ul>
      )}
    </motion.div>
  )
}
