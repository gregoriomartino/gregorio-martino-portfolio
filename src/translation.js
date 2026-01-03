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
      '< I design advanced software systems, transforming legacy architectures into modern, reliable platforms oriented towards artificial intelligence. I work with JavaEE, microservices on Docker and REST APIs, integrating machine learning and deep learning into enterprise and mission‑critical environments. I move across backend, cloud and hardware (home robotics, 3D printing with Arduino and C), with a strong focus on design quality and code maintainability. Away from the screen, enduro mountain biking is my balance lab. If I am not in front of the IDE, I am probably on a trail riding my bike. />',
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
      '< Diseño sistemas de software avanzados, transformando arquitecturas heredadas en plataformas modernas, fiables y orientadas a la inteligencia artificial. Trabajo con JavaEE, microservicios en Docker y API REST, integrando machine learning y deep learning en entornos empresariales y de misión crítica. Me muevo entre backend, cloud y hardware (robótica doméstica, impresión 3D con Arduino y C), con un fuerte enfoque en la calidad del diseño y la mantenibilidad del código. Lejos de la pantalla, el ciclismo de enduro es mi laboratorio de equilibrio. Si no estoy delante del IDE, probablemente estoy en un sendero haciendo enduro con mi bicicleta. />',
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
      '< Je conçois des systèmes logiciels avancés en transformant des architectures legacy en plateformes modernes, fiables et orientées vers l’intelligence artificielle. Je travaille avec JavaEE, des microservices sur Docker et des API REST, en intégrant le machine learning et le deep learning dans des environnements d’entreprise et critiques pour la mission. J’évolue entre backend, cloud et hardware (robotique domestique, impression 3D avec Arduino et C), avec une forte attention à la qualité du design et à la maintenabilité du code. Loin de l’écran, le VTT enduro est mon laboratoire d’équilibre. Si je ne suis pas devant l’IDE, je suis probablement sur un sentier en train de faire de l’enduro avec mon vélo. />',
    location: 'San Giovanni Rotondo, Italia',
    rights: 'Tous droits reservés.',
    ...chatbotTranslation.fr
  }



};

export default translations;
