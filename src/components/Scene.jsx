import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function Scene({ darkMode }) {
  const controls = useAnimation();
  const cloudControls1 = useAnimation();
  const cloudControls2 = useAnimation();

  useEffect(() => {
    // Animazione ciclista (movimento continuo)
    async function animate() {
      let frame = 0;
      while (true) {
        const baseY = 120;
        const wave = 15 * Math.sin(frame / 20);
        const shouldWheelie = frame % 80 === 0;

        await controls.start({
          y: baseY + wave,
          rotate: shouldWheelie ? -15 : wave / 4,
          x: shouldWheelie ? 8 : 0,
          transition: { duration: 0.06, ease: "easeOut" },
        });

        frame++;
      }
    }
    animate();

    // Nuvole
    cloudControls1.start({
      x: [0, -800],
      transition: { duration: 30, repeat: Infinity, ease: "linear" },
    });
    cloudControls2.start({
      x: [0, -900],
      transition: { duration: 40, repeat: Infinity, ease: "linear" },
    });
  }, [controls, cloudControls1, cloudControls2]);

  return (
    <div
      className={`relative h-64 overflow-hidden rounded-lg bg-gradient-to-b ${
        darkMode
          ? "from-indigo-950 via-slate-900 to-slate-800"
          : "from-sky-400 via-orange-200 to-amber-100"
      }`}
    >
      {/* Sole/Luna */}
      <motion.div className="absolute top-6 right-12">
        <motion.div
          className={`relative w-16 h-16 rounded-full ${
            darkMode ? "bg-slate-200 shadow-lg shadow-slate-400/50" : "bg-yellow-300"
          }`}
          animate={{
            scale: [1, 1.15, 1],
            rotate: darkMode ? 0 : 360,
          }}
          transition={{
            duration: darkMode ? 4 : 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Nuvole animate */}
      <motion.div animate={cloudControls1} className="absolute top-8 left-full flex gap-64">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`relative w-24 h-12 ${darkMode ? "opacity-20" : "opacity-80"}`}>
            <div className={`absolute w-16 h-8 rounded-full ${darkMode ? "bg-slate-600" : "bg-white"} left-4 top-2`} />
            <div className={`absolute w-12 h-10 rounded-full ${darkMode ? "bg-slate-600" : "bg-white"} left-0 top-1`} />
            <div className={`absolute w-14 h-9 rounded-full ${darkMode ? "bg-slate-600" : "bg-white"} left-10 top-0`} />
          </div>
        ))}
      </motion.div>

      <motion.div animate={cloudControls2} className="absolute top-16 left-full flex gap-96">
        {[...Array(2)].map((_, i) => (
          <div key={i} className={`relative w-20 h-10 ${darkMode ? "opacity-15" : "opacity-60"}`}>
            <div className={`absolute w-14 h-7 rounded-full ${darkMode ? "bg-slate-500" : "bg-white"} left-3 top-2`} />
            <div className={`absolute w-10 h-8 rounded-full ${darkMode ? "bg-slate-500" : "bg-white"} left-0 top-0`} />
          </div>
        ))}
      </motion.div>

      {/* Montagne */}
      <svg className="absolute bottom-16 left-0 right-0 w-full h-48">
        <defs>
          <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={darkMode ? "#1e293b" : "#64748b"} />
            <stop offset="100%" stopColor={darkMode ? "#334155" : "#94a3b8"} />
          </linearGradient>
        </defs>
        <path
          d="M0,120 L80,60 L160,100 L240,40 L320,90 L400,70 L480,110 L560,50 L640,100 L720,80 L800,120 L900,90 L900,200 L0,200 Z"
          fill="url(#mountainGrad)"
          opacity={darkMode ? "0.9" : "1"}
        />
        <path
          d="M0,140 L100,90 L200,130 L300,80 L400,120 L500,100 L600,140 L700,110 L800,145 L900,120 L900,200 L0,200 Z"
          fill={darkMode ? "#475569" : "#cbd5e1"}
          opacity="0.7"
        />
      </svg>

      {/* Strada */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-16 ${
          darkMode ? "bg-gradient-to-b from-slate-700 to-slate-800" : "bg-gradient-to-b from-slate-400 to-slate-500"
        } shadow-inner`}
      >
        <motion.div
          className="absolute top-2 left-0 right-0 h-1.5 flex gap-6"
          animate={{ x: [0, -120] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`w-20 h-1.5 rounded-full ${
                darkMode ? "bg-slate-500" : "bg-slate-300"
              }`}
            />
          ))}
        </motion.div>
        <div className={`absolute top-0 left-0 right-0 h-1 ${
          darkMode ? "bg-yellow-600" : "bg-yellow-500"
        }`} />
      </div>

      {/* Ciclista */}
      <motion.div className="absolute left-1/3 origin-bottom z-10" animate={controls}>
        <svg width="110" height="70" viewBox="0 0 110 70">
          <ellipse cx="50" cy="65" rx="35" ry="4" fill="black" opacity="0.2" />

          {/* Ruote animate */}
          {[20, 75].map((cx, idx) => (
            <g key={idx}>
              <motion.circle
                cx={cx}
                cy="55"
                r="12"
                stroke="#1a1a1a"
                strokeWidth="3"
                fill="#2a2a2a"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
              />
            </g>
          ))}

          {/* Telaio */}
          <line x1="20" y1="55" x2="48" y2="35" stroke="#ff6600" strokeWidth="5" strokeLinecap="round" />
          <line x1="48" y1="35" x2="75" y2="55" stroke="#ff6600" strokeWidth="5" strokeLinecap="round" />
          <line x1="48" y1="35" x2="45" y2="55" stroke="#ff6600" strokeWidth="4" strokeLinecap="round" />

          {/* Ciclista */}
          <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>
            <circle cx="52" cy="22" r="7" fill="#FFD700" stroke="#1a1a1a" strokeWidth="2" />
            <line x1="52" y1="29" x2="48" y2="42" stroke="#0066cc" strokeWidth="5" strokeLinecap="round" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
