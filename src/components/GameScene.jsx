// GameScene.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function GameScene({ darkMode }) {
  const [position, setPosition] = useState({ x: 50, y: 150 })
  const [obstacles, setObstacles] = useState([])
  const [score, setScore] = useState(0)

  // Genera ostacoli ogni 2s
  useEffect(() => {
    const interval = setInterval(() => {
      const newObstacle = { id: Date.now(), x: 400, y: Math.random() * 100 + 50 }
      setObstacles(prev => [...prev, newObstacle])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Muove gli ostacoli a sinistra
  useEffect(() => {
    const move = setInterval(() => {
      setObstacles(prev =>
        prev
          .map(o => ({ ...o, x: o.x - 5 }))
          .filter(o => o.x > -50)
      )
      setScore(prev => prev + 1)
    }, 50)
    return () => clearInterval(move)
  }, [])

  // Controllo collisioni
  useEffect(() => {
    obstacles.forEach(o => {
      if (Math.abs(o.x - position.x) < 30 && Math.abs(o.y - position.y) < 30) {
        alert(`Game Over! Score: ${score}`)
        setScore(0)
        setObstacles([])
      }
    })
  }, [obstacles, position, score])

  // Controllo frecce
  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'ArrowUp') setPosition(p => ({ ...p, y: Math.max(p.y - 20, 0) }))
      if (e.key === 'ArrowDown') setPosition(p => ({ ...p, y: Math.min(p.y + 20, 250) }))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className={`relative w-full h-300 overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Ciclista */}
      <motion.div
        className="absolute w-14 h-14"
        style={{ left: position.x, top: position.y }}
        animate={{ y: position.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <svg width="56" height="56" viewBox="0 0 56 56">
          {/* Ruote */}
          <motion.circle
            cx="14"
            cy="42"
            r="10"
            stroke="#1a1a1a"
            strokeWidth="3"
            fill="none"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
            style={{ originX: '14px', originY: '42px' }}
          />
          <motion.circle
            cx="42"
            cy="42"
            r="10"
            stroke="#1a1a1a"
            strokeWidth="3"
            fill="none"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
            style={{ originX: '42px', originY: '42px' }}
          />
          {/* Telaio */}
          <line x1="14" y1="42" x2="42" y2="42" stroke="#ff6600" strokeWidth="4" />
          <line x1="28" y1="28" x2="14" y2="42" stroke="#ff6600" strokeWidth="4" />
          <line x1="28" y1="28" x2="42" y2="42" stroke="#ff6600" strokeWidth="4" />
          {/* Ciclista - testa */}
          <circle cx="28" cy="20" r="6" fill="#ff6600" stroke="#1a1a1a" strokeWidth="2" />
          {/* Corpo */}
          <line x1="28" y1="26" x2="28" y2="36" stroke="#1a1a1a" strokeWidth="3" />
          <line x1="28" y1="30" x2="22" y2="36" stroke="#1a1a1a" strokeWidth="2" />
          <line x1="28" y1="30" x2="34" y2="36" stroke="#1a1a1a" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Ostacoli */}
      {obstacles.map(o => (
        <motion.div
          key={o.id}
          className="absolute w-6 h-6 bg-red-500 rounded"
          style={{ left: o.x, top: o.y }}
          animate={{ x: o.x }}
        />
      ))}

      {/* Strada */}
      <div className={`absolute bottom-0 left-0 right-0 h-20 ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`}>
        <motion.div
          className="absolute top-2 left-0 right-0 h-1 flex gap-4"
          animate={{ x: [0, -100] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`w-16 h-1 ${darkMode ? 'bg-slate-600' : 'bg-slate-400'}`} />
          ))}
        </motion.div>
      </div>

      {/* Punteggio */}
      <div className="absolute top-2 left-2 text-white font-bold">{score}</div>
    </div>
  )
}
