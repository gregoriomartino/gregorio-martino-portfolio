import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Scene({ darkMode }) {
  const controls = useAnimation();
  const cloudControls1 = useAnimation();
  const cloudControls2 = useAnimation();

  const [isJumping, setIsJumping] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [cyclistX, setCyclistX] = useState(33);
  const [timeOfDay, setTimeOfDay] = useState("day"); // day, sunset, night
  const [showControls, setShowControls] = useState(true);
  const isDragging = useRef(false);
  const animationFrame = useRef(0);

  useEffect(() => {
    // Animazione ciclista con impennate dinamiche
    async function animate() {
      while (true) {
        const baseY = 120;
        const wave = 15 * Math.sin(animationFrame.current / 20);
        const shouldWheelie = animationFrame.current % 80 === 0 && !isJumping;

        await controls.start({
          y: isJumping ? baseY - 50 : baseY + wave,
          rotate: isJumping ? -30 : shouldWheelie ? -20 : wave / 4,
          x: isJumping ? 20 : shouldWheelie ? 10 : 0,
          transition: { duration: 0.06, ease: "easeOut" },
        });

        animationFrame.current += speed;
      }
    }
    animate();

    // Nuvole che si muovono
    cloudControls1.start({
      x: [0, -800],
      transition: { duration: 30 / speed, repeat: Infinity, ease: "linear" }
    });
    cloudControls2.start({
      x: [0, -900],
      transition: { duration: 40 / speed, repeat: Infinity, ease: "linear" }
    });
  }, [controls, cloudControls1, cloudControls2, speed, isJumping]);

  // Gestione tastiera
  useEffect(() => {
    function handleKeyDown(e) {
      switch(e.key) {
        case "ArrowUp":
        case " ":
          e.preventDefault();
          handleJump();
          break;
        case "ArrowRight":
          e.preventDefault();
          setSpeed(prev => Math.min(prev + 0.5, 3));
          break;
        case "ArrowLeft":
          e.preventDefault();
          setSpeed(prev => Math.max(prev - 0.5, 0.5));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSpeed(1);
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleJump() {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  }

  function cycleTimeOfDay() {
    setTimeOfDay(prev => {
      if (prev === "day") return "sunset";
      if (prev === "sunset") return "night";
      return "day";
    });
  }

  function handleDragStart() {
    isDragging.current = true;
  }

  function handleDrag(e, info) {
    if (isDragging.current) {
      const newX = Math.max(10, Math.min(70, cyclistX + info.delta.x / 10));
      setCyclistX(newX);
    }
  }

  function handleDragEnd() {
    isDragging.current = false;
  }

  const getBackgroundGradient = () => {
    if (darkMode) return "bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-800";

    switch(timeOfDay) {
      case "sunset":
        return "bg-gradient-to-b from-orange-400 via-pink-400 to-purple-400";
      case "night":
        return "bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-800";
      default:
        return "bg-gradient-to-b from-sky-400 via-orange-200 to-amber-100";
    }
  };

  return (
    <div
      className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 cursor-pointer"
      onClick={cycleTimeOfDay}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setTimeout(() => setShowControls(false), 3000)}
    >
      {/* Sfondo dinamico */}
      <div className={`absolute inset-0 transition-all duration-1000 ${getBackgroundGradient()}`} />

      {/* Pannello controlli */}
      <motion.div
        className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-xs z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="font-bold mb-2">🎮 CONTROLLI</div>
        <div className="space-y-1">
          <div>⬆️ / SPAZIO: Salta</div>
          <div>➡️ : Accelera</div>
          <div>⬅️ : Rallenta</div>
          <div>⬇️ : Reset velocità</div>
          <div>🖱️ DRAG: Muovi ciclista</div>
          <div>🖱️ CLICK: Cambia ora</div>
        </div>
        <div className="mt-2 pt-2 border-t border-white/30">
          <div>⚡ Velocità: {speed.toFixed(1)}x</div>
          <div>🌅 Ora: {timeOfDay === "day" ? "Giorno" : timeOfDay === "sunset" ? "Tramonto" : "Notte"}</div>
        </div>
      </motion.div>

      {/* Indicatore velocità */}
      <motion.div
        className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white font-bold z-20"
        animate={{ scale: speed > 1.5 ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.3, repeat: speed > 1.5 ? Infinity : 0 }}
      >
        {speed > 2 ? "🔥" : speed > 1.5 ? "⚡" : "🚴"} {speed.toFixed(1)}x
      </motion.div>

      {/* Sole/Luna con raggi */}
      <motion.div
        className="absolute top-6 right-12 cursor-pointer"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className={`relative w-16 h-16 rounded-full ${
            timeOfDay === "night" || darkMode ? "bg-slate-200 shadow-lg shadow-slate-400/50" : "bg-yellow-300"
          }`}
          animate={{
            scale: [1, 1.15, 1],
            rotate: timeOfDay === "night" || darkMode ? 0 : 360
          }}
          transition={{
            duration: timeOfDay === "night" || darkMode ? 4 : 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {timeOfDay !== "night" && !darkMode && [...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-6 bg-yellow-400 origin-top"
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 45}deg)`
              }}
              animate={{
                scaleY: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Nuvole animate */}
      <motion.div animate={cloudControls1} className="absolute top-8 left-full flex gap-64">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`relative w-24 h-12 ${darkMode || timeOfDay === "night" ? "opacity-20" : "opacity-80"}`}>
            <div className={`absolute w-16 h-8 rounded-full ${darkMode || timeOfDay === "night" ? "bg-slate-600" : "bg-white"} left-4 top-2`} />
            <div className={`absolute w-12 h-10 rounded-full ${darkMode || timeOfDay === "night" ? "bg-slate-600" : "bg-white"} left-0 top-1`} />
            <div className={`absolute w-14 h-9 rounded-full ${darkMode || timeOfDay === "night" ? "bg-slate-600" : "bg-white"} left-10 top-0`} />
          </div>
        ))}
      </motion.div>

      <motion.div animate={cloudControls2} className="absolute top-16 left-full flex gap-96">
        {[...Array(2)].map((_, i) => (
          <div key={i} className={`relative w-20 h-10 ${darkMode || timeOfDay === "night" ? "opacity-15" : "opacity-60"}`}>
            <div className={`absolute w-14 h-7 rounded-full ${darkMode || timeOfDay === "night" ? "bg-slate-500" : "bg-white"} left-3 top-2`} />
            <div className={`absolute w-10 h-8 rounded-full ${darkMode || timeOfDay === "night" ? "bg-slate-500" : "bg-white"} left-0 top-0`} />
          </div>
        ))}
      </motion.div>

      {/* Montagne con più dettaglio */}
      <svg className="absolute bottom-16 left-0 right-0 w-full h-48">
        <defs>
          <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={darkMode || timeOfDay === "night" ? "#1e293b" : "#64748b"} />
            <stop offset="100%" stopColor={darkMode || timeOfDay === "night" ? "#334155" : "#94a3b8"} />
          </linearGradient>
        </defs>
        <path
          d="M0,120 L80,60 L160,100 L240,40 L320,90 L400,70 L480,110 L560,50 L640,100 L720,80 L800,120 L900,90 L900,200 L0,200 Z"
          fill="url(#mountainGrad)"
          opacity={darkMode || timeOfDay === "night" ? "0.9" : "1"}
        />
        <path
          d="M0,140 L100,90 L200,130 L300,80 L400,120 L500,100 L600,140 L700,110 L800,145 L900,120 L900,200 L0,200 Z"
          fill={darkMode || timeOfDay === "night" ? "#475569" : "#cbd5e1"}
          opacity="0.7"
        />
      </svg>

      {/* Alberi ai lati della strada */}
      {[...Array(6)].map((_, i) => {
        const side = i % 2 === 0 ? 'left' : 'right';
        const pos = (i / 2) * 30;
        return (
          <motion.div
            key={i}
            className={`absolute bottom-20 ${side}-${pos === 0 ? '4' : pos === 30 ? '20' : '36'}`}
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <svg width="30" height="40" viewBox="0 0 30 40">
              <rect x="12" y="25" width="6" height="15" fill={darkMode || timeOfDay === "night" ? "#3a3a3a" : "#654321"} />
              <polygon points="15,5 5,25 25,25" fill={darkMode || timeOfDay === "night" ? "#1a4d1a" : "#228B22"} />
              <polygon points="15,10 7,22 23,22" fill={darkMode || timeOfDay === "night" ? "#1f5c1f" : "#32CD32"} />
            </svg>
          </motion.div>
        );
      })}

      {/* Strada con effetti */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-16 ${
          darkMode || timeOfDay === "night" ? "bg-gradient-to-b from-slate-700 to-slate-800" : "bg-gradient-to-b from-slate-400 to-slate-500"
        } shadow-inner`}
      >
        {/* Strisce stradali animate */}
        <motion.div
          className="absolute top-2 left-0 right-0 h-1.5 flex gap-6"
          animate={{ x: [0, -120] }}
          transition={{ duration: 1.5 / speed, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`w-20 h-1.5 rounded-full ${
                darkMode || timeOfDay === "night" ? "bg-slate-500" : "bg-slate-300"
              }`}
            />
          ))}
        </motion.div>

        {/* Bordo strada */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${
          darkMode || timeOfDay === "night" ? "bg-yellow-600" : "bg-yellow-500"
        }`} />
      </div>

      {/* Ciclista con impennate e movimento fluido - DRAGGABLE */}
      <motion.div
        className="absolute origin-bottom z-10 cursor-move"
        style={{ left: `${cyclistX}%` }}
        animate={controls}
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="110" height="70" viewBox="0 0 110 70">
          {/* Ombra della bici */}
          <ellipse
            cx="50"
            cy="65"
            rx="35"
            ry="4"
            fill="black"
            opacity="0.2"
          />

          {/* Ruota posteriore con raggi */}
          <g>
            <motion.circle
              cx="20"
              cy="55"
              r="12"
              stroke="#1a1a1a"
              strokeWidth="3"
              fill="#2a2a2a"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6 / speed, repeat: Infinity, ease: "linear" }}
            />
            {[...Array(6)].map((_, i) => (
              <motion.line
                key={i}
                x1="20"
                y1="55"
                x2="20"
                y2="43"
                stroke="#4a4a4a"
                strokeWidth="1.5"
                style={{ transformOrigin: "20px 55px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6 / speed, repeat: Infinity, ease: "linear" }}
                initial={{ rotate: i * 60 }}
              />
            ))}
          </g>

          {/* Ruota anteriore con raggi */}
          <g>
            <motion.circle
              cx="75"
              cy="55"
              r="12"
              stroke="#1a1a1a"
              strokeWidth="3"
              fill="#2a2a2a"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6 / speed, repeat: Infinity, ease: "linear" }}
            />
            {[...Array(6)].map((_, i) => (
              <motion.line
                key={`front-${i}`}
                x1="75"
                y1="55"
                x2="75"
                y2="43"
                stroke="#4a4a4a"
                strokeWidth="1.5"
                style={{ transformOrigin: "75px 55px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6 / speed, repeat: Infinity, ease: "linear" }}
                initial={{ rotate: i * 60 }}
              />
            ))}
          </g>

          {/* Telaio della bici - più dettagliato */}
          <line x1="20" y1="55" x2="48" y2="35" stroke="#ff6600" strokeWidth="5" strokeLinecap="round" />
          <line x1="48" y1="35" x2="75" y2="55" stroke="#ff6600" strokeWidth="5" strokeLinecap="round" />
          <line x1="48" y1="35" x2="45" y2="55" stroke="#ff6600" strokeWidth="4" strokeLinecap="round" />
          <line x1="45" y1="55" x2="20" y2="55" stroke="#ff4400" strokeWidth="3" strokeLinecap="round" />

          {/* Manubrio */}
          <line x1="48" y1="35" x2="70" y2="38" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
          <line x1="70" y1="38" x2="68" y2="33" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
          <line x1="70" y1="38" x2="72" y2="33" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />

          {/* Sellino */}
          <line x1="30" y1="35" x2="40" y2="35" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />

          {/* Ciclista - corpo animato */}
          <motion.g
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 0.6 / speed,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Testa */}
            <circle
              cx="52"
              cy="22"
              r="7"
              fill="#FFD700"
              stroke="#1a1a1a"
              strokeWidth="2"
            />
            {/* Casco */}
            <path
              d="M 45 22 Q 52 15 59 22"
              fill="none"
              stroke="#ff0000"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Corpo */}
            <line x1="52" y1="29" x2="48" y2="42" stroke="#0066cc" strokeWidth="5" strokeLinecap="round" />

            {/* Braccia - che si muovono */}
            <motion.line
              x1="50" y1="32" x2="68" y2="36"
              stroke="#FFD700"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ x2: [68, 70, 68] }}
              transition={{ duration: 0.6 / speed, repeat: Infinity }}
            />

            {/* Gambe - pedalata */}
            <motion.g
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.6 / speed, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "45px 55px" }}
            >
              <line x1="45" y1="55" x2="40" y2="45" stroke="#0066cc" strokeWidth="4" strokeLinecap="round" />
            </motion.g>
            <motion.g
              animate={{ rotate: [180, 540] }}
              transition={{ duration: 0.6 / speed, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "45px 55px" }}
            >
              <line x1="45" y1="55" x2="50" y2="45" stroke="#0066cc" strokeWidth="4" strokeLinecap="round" />
            </motion.g>
          </motion.g>
        </svg>

        {/* Particelle di velocità */}
        <motion.div
          className="absolute -left-4 top-8"
          animate={{
            x: [-10, -30],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 0.4 / speed,
            repeat: Infinity,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-0.5 bg-blue-400 rounded"
              style={{ top: i * 6 }}
              animate={{
                scaleX: [1, 0],
              }}
              transition={{
                duration: 0.4 / speed,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}