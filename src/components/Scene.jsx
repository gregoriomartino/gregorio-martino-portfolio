import Road from './Road'
import Mountains from './Mountains'
import CyclistAnimation from './CyclistAnimation'

export default function Scene({ darkMode, season }) {
  return (
    <div className="mt-12 relative h-64 overflow-hidden rounded-lg">
      <Road darkMode={darkMode} />
      <Mountains darkMode={darkMode} season={season} />
      <CyclistAnimation darkMode={darkMode} />
      {/* Sole/Luna e Nuvole rimangono invariati */}
    </div>
  )
}
