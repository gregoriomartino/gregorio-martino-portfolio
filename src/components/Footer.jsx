import { Mail, MapPin } from 'lucide-react'
import ChatBot from './ChatBot'
import VisitsPage from './VisitsPage'
import '../Footer.css'

export default function Footer({ t, darkMode, season, stats }) {
  return (
    <footer className="footer bg-black text-green-500 p-6">
      <div className="footer-container max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between gap-6">

        {/* Colonna sinistra: info + mini visits */}
        <div className="footer-left flex flex-col md:flex-row md:items-start gap-6">

          {/* Info e contatti */}
          <div className="footer-info flex flex-col gap-4">
            <h3 className="footer-name text-xl md:text-2xl font-bold">Gregorio Martino</h3>
            <p className="footer-role text-sm md:text-base">{t.role}</p>

            <div className="footer-contact flex flex-col gap-1 text-sm md:text-base">
              <div className="contact-item flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:martinogregorio2@gmail.com">martinogregorio2@gmail.com</a>
              </div>
              <div className="contact-item flex items-center gap-2">
                <MapPin size={16} />
                <span>{t.location}</span>
              </div>
            </div>
          </div>

          {/* Mini visits box */}
          <div className="visits-mini-container w-full md:w-auto mt-4 md:mt-0">
            <VisitsPage stats={stats} darkMode={true} mini />
          </div>
        </div>

        {/* ChatBot a destra */}
        <div className="footer-chat md:self-start">
          <ChatBot darkMode={darkMode} season={season} />
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="footer-bottom mt-6 text-center text-sm md:text-base">
        <p>© {new Date().getFullYear()} Gregorio Martino. {t.rights}</p>
      </div>
    </footer>
  )
}
