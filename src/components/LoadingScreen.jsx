import { useEffect, useRef, useState } from 'react'

export default function LoadingScreen({ onFinish }) {
  const canvasRef = useRef(null)
  const bikeRef = useRef(null)
  const backWheelRef = useRef(null)
  const frontWheelRef = useRef(null)
  const labelRef = useRef(null)
  const progressBarRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // --- Canvas Matrix ---
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

    // Matrix rain con intensità variabile
    /* const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, width, height)
      
      drops.forEach((y, i) => {
        // Variazione colore per profondità
        const brightness = Math.floor(Math.random() * 100 + 155)
        ctx.fillStyle = `rgb(0,${brightness},0)`
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * fontSize, y * fontSize)
        
        // Glow effect sulle lettere più vicine
        if (Math.random() > 0.98) {
          ctx.shadowBlur = 10
          ctx.shadowColor = '#0f0'
        } else {
          ctx.shadowBlur = 0
        }
        
        drops[i] = y * fontSize > height && Math.random() > 0.975 ? 0 : y + 1
      })
      requestAnimationFrame(drawMatrix)
    }
    drawMatrix() */

    // --- Ruote animate senza GSAP ---
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

    // --- Bici  ---
    let dy = 1
    let yPos = 0
    const moveBike = () => {
      yPos += dy
      if (yPos > 3 || yPos < -3) dy *= -1
      bikeRef.current.setAttribute('transform', `translate(0,${yPos})`)
      requestAnimationFrame(moveBike)
    }
    moveBike()

    // --- Progress OTTIMIZZATO: 1.5 secondi totali ---
    let progressValue = 0
    const totalDuration = 1500
    const intervalTime = 50
    const incrementPerInterval = (100 / totalDuration) * intervalTime
    
    const progressInterval = setInterval(() => {
      progressValue += incrementPerInterval
      
      if (progressValue >= 100) {
        progressValue = 100
        setProgress(100)
        labelRef.current.textContent = 'SYSTEM READY'
        labelRef.current.classList.add('ready-state')
        clearInterval(progressInterval)
        
        setTimeout(() => {
          // bici esce verso destra con scia
          let xPos = 0
          let opacity = 1
          const moveOut = () => {
            xPos += 25
            opacity -= 0.02
            bikeRef.current.setAttribute('transform', `translate(${xPos},${yPos})`)
            bikeRef.current.style.opacity = opacity
            if (xPos < width + 100) requestAnimationFrame(moveOut)
            else onFinish()
          }
          moveOut()
        }, 500)
      } else {
        setProgress(progressValue)
        labelRef.current.textContent = `LOADING ${Math.floor(progressValue)}%`
      }
    }, intervalTime)

    return () => {
      clearInterval(progressInterval)
      window.removeEventListener('resize', handleResize)
    }
  }, [onFinish])

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10" 
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #0f0 2px, #0f0 4px)',
             animation: 'scanline 8s linear infinite'
           }} />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {/* Bici con effetto glow */}
        <div className="relative mb-8">
          <svg ref={bikeRef} className="w-1/3 max-w-xs drop-shadow-[0_0_15px_rgba(0,255,0,0.7)]" viewBox="0 0 300 160"
               style={{ filter: 'drop-shadow(0 0 10px #0f0) drop-shadow(0 0 20px #0f0)', transition: 'opacity 0.3s' }}>
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
              
              {/* Ruote con cerchi */}
              <circle cx="60" cy="110" r="20" stroke="#0f0" strokeWidth="2" fill="none" opacity="0.3" />
              <circle cx="200" cy="110" r="20" stroke="#0f0" strokeWidth="2" fill="none" opacity="0.3" />
              <g ref={backWheelRef} transform="translate(60,110)" />
              <g ref={frontWheelRef} transform="translate(200,110)" />
              
              {/* Omino con laptop */}
              <g className="rider">
                <line x1="110" y1="75" x2="105" y2="95" stroke="#0f0" strokeWidth="2" />
                <line x1="110" y1="75" x2="115" y2="95" stroke="#0f0" strokeWidth="2" />
                <line x1="110" y1="75" x2="110" y2="55" stroke="#0f0" strokeWidth="2" />
                <circle cx="110" cy="48" r="7" fill="#0f0" stroke="#000" strokeWidth="1" />
                <line x1="110" y1="58" x2="135" y2="65" stroke="#0f0" strokeWidth="2" />
                <line x1="110" y1="60" x2="145" y2="60" stroke="#0f0" strokeWidth="2" />
                <rect x="145" y="45" width="28" height="20" rx="2" fill="#0f0" stroke="#000" />
                {/* Schermo laptop con dettagli */}
                <rect x="148" y="48" width="22" height="14" rx="1" fill="#000" />
                <text x="152" y="58" fontSize="6" fill="#0f0" fontFamily="monospace">{'<>'}</text>
              </g>
            </g>
          </svg>
        </div>
        
        {/* Progress bar container */}
        <div className="w-2/3 max-w-md mb-6">
          <div className="relative h-3 bg-black border-2 border-green-500 rounded-sm overflow-hidden"
               style={{ boxShadow: '0 0 10px rgba(0,255,0,0.3), inset 0 0 10px rgba(0,0,0,0.5)' }}>
            {/* Progress fill con animazione */}
            <div 
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-green-600 via-green-400 to-green-500 transition-all duration-200 relative"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 15px rgba(0,255,0,0.8)'
              }}
            >
              {/* Scanning effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                   style={{ animation: 'shimmer 1s infinite' }} />
            </div>
            
            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none" 
                 style={{
                   backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,255,0,0.1) 10px, rgba(0,255,0,0.1) 11px)'
                 }} />
          </div>
          
          {/* Percentage e dettagli */}
          <div className="flex justify-between mt-2 text-xs font-mono text-green-400">
            <span className="opacity-70">INIT...</span>
            <span className="font-bold">{Math.floor(progress)}%</span>
            <span className="opacity-70">SYS.OK</span>
          </div>
        </div>
        
        {/* Label principale con effetti */}
        <div 
          ref={labelRef} 
          className="text-2xl font-mono font-bold text-green-400 tracking-wider transition-all duration-300"
          style={{ 
            textShadow: '0 0 10px #0f0, 0 0 20px #0f0, 0 0 30px #0f0',
            letterSpacing: '0.3em'
          }}
        />
        
        {/* Binary code stream decorativo */}
        <div className="mt-4 text-xs font-mono text-green-600 opacity-50 overflow-hidden h-4">
          <div style={{ animation: 'scroll 2s linear infinite' }}>
            {Array.from({ length: 50 }, () => Math.random() > 0.5 ? '1' : '0').join(' ')}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .ready-state {
          animation: pulse 0.5s ease-in-out 3;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}