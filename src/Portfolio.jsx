import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Sun, Moon, Mail, MapPin, Languages } from 'lucide-react'

const translations = {
  it: {
    role: 'Full-Stack Java Developer',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    downloadCV: 'Scarica CV',
    profile: 'Profilo Professionale',
    profileText: 'Sono uno sviluppatore Java con oltre 5 anni di esperienza in ambienti enterprise. Amo costruire soluzioni pulite e affidabili, trasformando codice legacy in architetture moderne. Credo nella collaborazione, nella curiosità tecnica e nel miglioramento continuo.',
    location: 'Foggia, Italia',
    rights: 'Tutti i diritti riservati.'
  },
  en: {
    role: 'Full-Stack Java Developer',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    downloadCV: 'Download CV',
    profile: 'Professional Profile',
    profileText: 'I am a Java developer with over 5 years of experience in enterprise environments. I love building clean and reliable solutions, transforming legacy code into modern architectures. I believe in collaboration, technical curiosity, and continuous improvement.',
    location: 'Foggia, Italy',
    rights: 'All rights reserved.'
  },
  es: {
    role: 'Desarrollador Full-Stack Java',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    downloadCV: 'Descargar CV',
    profile: 'Perfil Profesional',
    profileText: 'Soy un desarrollador Java con más de 5 años de experiencia en entornos empresariales. Me encanta construir soluciones limpias y confiables, transformando código legacy en arquitecturas modernas. Creo en la colaboración, la curiosidad técnica y la mejora continua.',
    location: 'Foggia, Italia',
    rights: 'Todos los derechos reservados.'
  }
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('it')

  const t = translations[language]