import { motion } from 'framer-motion'

export default function CyclistAnimation({ darkMode }) {
  return (
    <motion.div
      className="absolute bottom-20 left-1/3"
      animate={{ y: [0, -10, 0, -8, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* SVG ciclista qui */}
    </motion.div>
  )
}
