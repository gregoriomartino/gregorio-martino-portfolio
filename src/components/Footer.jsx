import { Mail, MapPin } from 'lucide-react'
import VisitsPage from './VisitsPage'
import '../Footer.css'
import ChatbotWidget from './ChatbotWidget'

export default function Footer({ t, darkMode, season, stats }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/*ini visits */}
        <div className="footer-left">


          {/*           <div className="visits-mini-container"> */}
          {/*             <VisitsPage stats={stats} darkMode={true} mini /> */}
          {/*           </div> */}
        </div>

        {/* Colonna destra: ChatBot */}
        <div className="footer-chat">
          <ChatbotWidget t={t} darkMode={darkMode} season={season} iconClassName="bg-blue-500 rounded-full p-2 text-white" />
        </div>
      </div>



      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Gregorio Martino. {t.rights}</p>
      </div>
    </footer>
  )
}
