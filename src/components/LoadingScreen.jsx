import { useEffect, useRef } from 'react'

export default function LoadingScreen({ onFinish }) {
  const canvasRef = useRef(null)
  const bikeRef = useRef(null)
  const backWheelRef = useRef(null)
  const frontWheelRef = useRef(null)
  const labelRef = useRef(null)

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

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = '#0f0'
      ctx.font = `${fontSize}px monospace`
      drops.forEach((y, i) => {
        ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * fontSize, y * fontSize)
        drops[i] = y * fontSize > height && Math.random() > 0.975 ? 0 : y + 1
      })
      requestAnimationFrame(drawMatrix)
    }
    drawMatrix()

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

    // --- Progress simulato con binari ---
    let progress = 0
    const progressInterval = setInterval(() => {
      progress += Math.random() * 3 + 1
      if (progress >= 100) {
        progress = 100
        labelRef.current.textContent = 'Pronto!'
        clearInterval(progressInterval)
        // bici esce verso destra
        let xPos = 0
        const moveOut = () => {
          xPos += 10
          bikeRef.current.setAttribute('transform', `translate(${xPos},${yPos})`)
          if (xPos < width) requestAnimationFrame(moveOut)
          else onFinish()
        }
        moveOut()
      } else {
        labelRef.current.textContent = Array.from({ length: 10 }, () => (Math.random() > 0.5 ? 1 : 0)).join('')
      }
    }, 100)

    return () => {
      clearInterval(progressInterval)
      window.removeEventListener('resize', handleResize)
    }
  }, [onFinish])

  return (
    <div className="fixed inset-0 z-50">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <svg ref={bikeRef} className="w-1/3 max-w-xs mb-6" viewBox="0 0 300 160">
          <g className="bike-group">
            {/* Telaio */}
            <line x1="60" y1="110" x2="130" y2="70" stroke="#0f0" />
            <line x1="130" y1="70" x2="200" y2="110" stroke="#0f0" />
            <line x1="130" y1="70" x2="115" y2="90" stroke="#0f0" />
            <line x1="115" y1="90" x2="85" y2="90" stroke="#0f0" />
            <line x1="85" y1="90" x2="60" y2="110" stroke="#0f0" />
            <line x1="130" y1="70" x2="145" y2="60" stroke="#0f0" />
            <line x1="145" y1="60" x2="155" y2="65" stroke="#0f0" />
            <line x1="115" y1="90" x2="110" y2="75" stroke="#0f0" />
            <rect x="105" y="70" width="15" height="4" rx="2" fill="#0f0" />
            <line x1="115" y1="90" x2="115" y2="100" stroke="#0f0" />
            {/* Ruote */}
            <g ref={backWheelRef} transform="translate(60,110)" />
            <g ref={frontWheelRef} transform="translate(200,110)" />
            {/* Omino con laptop */}
            <g className="rider">
              <line x1="110" y1="75" x2="105" y2="95" stroke="#0f0" />
              <line x1="110" y1="75" x2="115" y2="95" stroke="#0f0" />
              <line x1="110" y1="75" x2="110" y2="55" stroke="#0f0" />
              <circle cx="110" cy="48" r="6" fill="#0f0" />
              <line x1="110" y1="58" x2="135" y2="65" stroke="#0f0" />
              <line x1="110" y1="60" x2="145" y2="60" stroke="#0f0" />
              <rect x="145" y="45" width="28" height="20" rx="2" fill="#0f0" />
            </g>
          </g>
        </svg>
        <div ref={labelRef} className="text-xl font-mono" />
      </div>
    </div>
  )
}
