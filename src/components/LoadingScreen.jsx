import { useEffect, useRef, useState } from 'react'
import '../LoadingScreen.css'


export default function LoadingScreen({ onFinish }) {
  const canvasRef = useRef(null)
  const bikeRef = useRef(null)
  const backWheelRef = useRef(null)
  const frontWheelRef = useRef(null)
  const labelRef = useRef(null)
  const progressBarRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight
    const fontSize = 16
    let columns = Math.floor(width / fontSize)
    let drops = Array(columns).fill(1)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      columns = Math.floor(width / fontSize)
      drops = Array(columns).fill(1)
    }
    window.addEventListener('resize', handleResize)

    // --- Ruote animate ---
    let angle = 0
    const rotateWheels = () => {
      angle += 0.1
      const r = 18
      const spokes = 8
      const setSpokes = (wheel) => {
        while (wheel.firstChild) wheel.removeChild(wheel.firstChild)
        for (let i = 0; i < spokes; i++) {
          const a = ((i * 360) / spokes + angle * 57.2958) * Math.PI / 180
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          line.setAttribute('x1', 0)
          line.setAttribute('y1', 0)
          line.setAttribute('x2', r * Math.cos(a))
          line.setAttribute('y2', r * Math.sin(a))
          line.setAttribute('stroke', '#0f0')
          wheel.appendChild(line)
        }
      }
      setSpokes(backWheelRef.current)
      setSpokes(frontWheelRef.current)
      requestAnimationFrame(rotateWheels)
    }
    rotateWheels()

    // --- Oscillazione bici ---
    let dy = 1
    let yPos = 0
    const moveBike = () => {
      yPos += dy
      if (yPos > 3 || yPos < -3) dy *= -1
      bikeRef.current.style.setProperty('--y-pos', `${yPos}px`)
      if (!bikeRef.current.classList.contains('bike-exit')) {
        bikeRef.current.setAttribute('transform', `translate(0,${yPos})`)
      }
      requestAnimationFrame(moveBike)
    }
    moveBike()

    // --- Progress ---
    let progressValue = 0
    const totalDuration = 1500
    const intervalTime = 50
    const incrementPerInterval = (100 / totalDuration) * intervalTime

    const progressInterval = setInterval(() => {
      progressValue += incrementPerInterval
      if (progressValue >= 100) {
        progressValue = 100
        setProgress(100)
        progressBarRef.current.style.setProperty('--progress', '100%')
        labelRef.current.textContent = 'Benvenuto!'
        labelRef.current.classList.add('ready-state')
        clearInterval(progressInterval)

        setTimeout(() => {
          bikeRef.current.classList.add('bike-exit')
          setTimeout(() => onFinish(), 1000)
        }, 500)
      } else {
        setProgress(progressValue)
        progressBarRef.current.style.setProperty('--progress', `${progressValue}%`)
        labelRef.current.textContent = `LOADING ${Math.floor(progressValue)}%`
      }
    }, intervalTime)

    return () => {
      clearInterval(progressInterval)
      window.removeEventListener('resize', handleResize)
    }
  }, [onFinish])

  return (
    <div className="loading-screen">
      <canvas ref={canvasRef} className="canvas-full" />
      <div className="scanlines" />

      <div className="centered-content">
        <div className="relative mb-8">
          <svg ref={bikeRef} className="bike-svg" viewBox="0 0 300 160">
            <g className="bike-group">
              {/* Telaio */}
              <line x1="60" y1="110" x2="130" y2="70" stroke="#0f0" strokeWidth="2" />
              <line x1="130" y1="70" x2="200" y2="110" stroke="#0f0" strokeWidth="2" />
              <line x1="130" y1="70" x2="115" y2="90" stroke="#0f0" strokeWidth="2" />
              <line x1="115" y1="90" x2="85" y2="90" stroke="#0f0" strokeWidth="2" />
              <line x1="85" y1="90" x2="60" y2="110" stroke="#0f0" strokeWidth="2" />
              <line x1="130" y1="70" x2="145" y2="60" stroke="#0f0" strokeWidth="2" />
              <line x1="145" y1="60" x2="155" y2="65" stroke="#0f0" strokeWidth="2" />
              <line x1="115" y1="90" x2="110" y2="75" stroke="#0f0" strokeWidth="2" />
              <rect x="105" y="70" width="15" height="4" rx="2" fill="#0f0" />
              <line x1="115" y1="90" x2="115" y2="100" stroke="#0f0" strokeWidth="2" />

              {/* Ruote */}
              <circle cx="60" cy="110" r="20" stroke="#0f0" strokeWidth="2" fill="none" opacity="0.3" />
              <circle cx="200" cy="110" r="20" stroke="#0f0" strokeWidth="2" fill="none" opacity="0.3" />
              <g ref={backWheelRef} transform="translate(60,110)" />
              <g ref={frontWheelRef} transform="translate(200,110)" />

              {/* Omino */}
              <g className="rider">
                <line x1="110" y1="75" x2="105" y2="95" stroke="#0f0" strokeWidth="2" />
                <line x1="110" y1="75" x2="115" y2="95" stroke="#0f0" strokeWidth="2" />
                <line x1="110" y1="75" x2="110" y2="55" stroke="#0f0" strokeWidth="2" />
                <circle cx="110" cy="48" r="7" fill="#0f0" stroke="#000" strokeWidth="1" />
                <line x1="110" y1="58" x2="135" y2="65" stroke="#0f0" strokeWidth="2" />
                <line x1="110" y1="60" x2="145" y2="60" stroke="#0f0" strokeWidth="2" />
                <rect x="145" y="45" width="28" height="20" rx="2" fill="#0f0" stroke="#000" />
                <rect x="148" y="48" width="22" height="14" rx="1" fill="#000" />
              </g>
            </g>
          </svg>
        </div>

        <div className="progress-container">
          <div className="progress-bar-bg">
            <div ref={progressBarRef} className="progress-bar-fill">
              <div className="progress-bar-shimmer" />
            </div>
            <div className="progress-bar-grid" />
          </div>
          <div className="progress-texts">
            <span className="opacity-70">INIT...</span>
            <span className="font-bold">{Math.floor(progress)}%</span>
            <span className="opacity-70">SYS.OK</span>
          </div>
        </div>

        <div ref={labelRef} className="label" />

        <div className="binary-stream">
          <div>{Array.from({ length: 50 }, () => Math.random() > 0.5 ? '1' : '0').join(' ')}</div>
        </div>
      </div>
    </div>
  )
}
