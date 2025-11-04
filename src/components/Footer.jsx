import { Mail, MapPin } from 'lucide-react'
import ChatBot from './ChatBot'
import '../Footer.css'

export default function Footer({ t, darkMode, season }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-info">
            <h3 className="footer-name">Gregorio Martino</h3>
            <p className="footer-role">{t.role}</p>
          </div>

          <div className="footer-contact">
            <div className="contact-item">
              <Mail size={16} />
              <a href="mailto:martinogregorio2@gmail.com">martinogregorio2@gmail.com</a>
            </div>
            <div className="contact-item">
              <MapPin size={16} />
              <span>{t.location}</span>
            </div>
          </div>
        </div>

        <div className="footer-chat">
          <ChatBot darkMode={darkMode} season={season} />
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Gregorio Martino. {t.rights}</p>
        </div>
      </div>
    </footer>
  )
}
