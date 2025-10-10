import { Mail, MapPin } from 'lucide-react'

export default function Footer({ t, darkMode }) {
  return (
    <footer className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-t mt-auto`}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-1">Gregorio Martino</h3>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.role}</p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} className={darkMode ? 'text-slate-400' : 'text-slate-600'} />
              <a href="mailto:martinogregorio2@gmail.com" className="hover:underline">
                martinogregorio2@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className={darkMode ? 'text-slate-400' : 'text-slate-600'} />
              <span>{t.location}</span>
            </div>
          </div>
        </div>

        <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'} text-center text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <p>© {new Date().getFullYear()} Gregorio Martino. {t.rights}</p>
        </div>
      </div>
    </footer>
  )
}
