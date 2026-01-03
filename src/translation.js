import chatbotTranslation from './chatbotTranslation';

const translations = {
  it: {
    role: 'Ingegnere Software e AI',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    downloadCV: 'Scarica CV',
    profile: '',
    profileText:
      'Progetto sistemi software evoluti trasformando architetture legacy in piattaforme moderne, affidabili e orientate all’intelligenza artificiale.Se non sono davanti all’IDE, probabilmente sono su un sentiero a fare enduro con la mia bici.',
    location: 'San Giovanni Rotondo, Italia',
    rights: 'Tutti i diritti riservati.',
    ...chatbotTranslation.it
  },

  en: {
    role: 'Software & AI Engineer',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    downloadCV: 'Download CV',
    profile: '',
    profileText:
      'Evolving complex software systems by transforming legacy architectures into modern, reliable, AI‑driven platforms.When not in front of an IDE, there’s a good chance you’ll find me riding enduro trails on my bike',
    location: 'San Giovanni Rotondo, Italy',
    rights: 'All rights reserved.',
    ...chatbotTranslation.en
  },

  es: {
    role: 'Ingeniero de Software e IA',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    downloadCV: 'Descargar CV',
    profile: '',
    profileText:
    'Desarrollo sistemas de software avanzados, transformando arquitecturas heredadas en plataformas modernas, fiables y orientadas a la inteligencia artificial. Cuando no estoy delante del IDE, probablemente estoy en un sendero haciendo enduro con mi bicicleta',
    location: 'San Giovanni Rotondo, Italia',
    rights: 'Todos los derechos reservados.',
    ...chatbotTranslation.es
  },

  fr: {
    role: 'Ingenieur de logiciel et IA',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    downloadCV: 'Telecharger CV',
    profile: '',
    profileText:
      'Je conçois des systèmes logiciels avancés en transformant des architectures legacy en plateformes modernes, fiables et orientées vers l’intelligence artificielle. Quand je ne suis pas devant l’IDE, il y a de fortes chances que je sois sur un sentier à faire de l’enduro avec mon vélo',
    rights: 'Tous droits reservés.',
    ...chatbotTranslation.fr
  }



};

export default translations;
