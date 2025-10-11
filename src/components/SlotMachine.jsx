import { motion } from "framer-motion";
import { useState } from "react";

export default function SlotMachine() {
  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState(["🍒", "🍋", "🍊"]);
  const [message, setMessage] = useState("Premi SPIN per giocare!");

  // La tua immagine caricata di default
  const [userImage] = useState("/mio-volto.jpg");

  // Simboli disponibili - include la tua faccia
  const getSymbols = () => {
    const baseSymbols = ["🍒", "🍋", "🍊", "🍇", "⭐"];
    return [...baseSymbols, "face", "face", "face"];
  };

  function spin() {
    if (spinning) return;

    setSpinning(true);
    setMessage("Girando...");

    const symbols = getSymbols();

    setTimeout(() => {
      const newResults = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];

      setResults(newResults);
      setSpinning(false);

      // Controlla vincite
      if (newResults[0] === newResults[1] && newResults[1] === newResults[2]) {
        if (newResults[0] === "face") {
          setMessage("🎉🎉 SUPER JACKPOT! 3 TUE FACCE! 🎉🎉");
        } else {
          setMessage("🎉 JACKPOT! HAI VINTO! 🎉");
        }
      } else if (
        newResults[0] === newResults[1] ||
        newResults[1] === newResults[2] ||
        newResults[0] === newResults[2]
      ) {
        setMessage("💰 Hai vinto qualcosa!");
      } else {
        setMessage("😢 Riprova!");
      }
    }, 2000);
  }

  function renderSymbol(symbol) {
    if (symbol === "face" && userImage) {
      return (
        <img
          src={userImage}
          alt="Your face"
          className="w-full h-full object-cover rounded-xl"
        />
      );
    }
    return <span>{symbol}</span>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 p-8">
      <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-3xl shadow-2xl p-8 border-8 border-yellow-700">
        <h1 className="text-4xl font-bold text-center mb-6 text-purple-900">
          🎰 SLOT MACHINE 🎰
        </h1>

        <div className="mb-4 bg-white rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={userImage}
              alt="Preview"
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
            />
            <span className="text-purple-900 font-bold">✅ Foto caricata!</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6 shadow-inner">
          <div className="flex gap-4 justify-center">
            {results.map((symbol, index) => (
              <motion.div
                key={index}
                className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-7xl shadow-lg border-4 border-purple-700 overflow-hidden"
                animate={
                  spinning
                    ? {
                        y: [0, -20, 0, -20, 0],
                        rotate: [0, 360, 720, 1080, 1440],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.6, 1],
                }}
              >
                {renderSymbol(symbol)}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="bg-purple-900 text-white text-2xl font-bold text-center py-4 px-6 rounded-xl mb-6 shadow-lg"
          animate={{
            scale: message.includes("JACKPOT") ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            repeat: message.includes("JACKPOT") ? Infinity : 0,
          }}
        >
          {message}
        </motion.div>

        <motion.button
          onClick={spin}
          disabled={spinning}
          className={`w-full py-6 text-3xl font-bold rounded-xl shadow-lg transition-all ${
            spinning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 active:scale-95"
          } text-white`}
          whileHover={!spinning ? { scale: 1.05 } : {}}
          whileTap={!spinning ? { scale: 0.95 } : {}}
        >
          {spinning ? "⏳ GIRANDO..." : "🎲 SPIN!"}
        </motion.button>

        <div className="mt-6 text-center text-purple-900 text-sm">
          <p className="font-bold">Come vincere:</p>
          <p>3 simboli uguali = JACKPOT 🎉</p>
          <p>2 simboli uguali = Vittoria 💰</p>
          <p className="mt-2 text-pink-700 font-bold">
            3 tue facce = SUPER JACKPOT! 🎉🎉
          </p>
        </div>
      </div>
    </div>
  );
}
