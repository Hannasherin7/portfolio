export const profile = {
  name: 'Hanna Sherin',
  role: 'Full Stack Developer',
  roles: ['Full Stack Developer', 'PHP · Laravel Engineer', 'MERN Developer', 'Java · Spring Boot'],
  location: 'Kerala, India',
  email: 'hannasherin7110@gmail.com',
  phone: '+91 95394 97110',
  tagline:
    'I build production-grade web experiences — from multi-level commission engines to cinematic front-ends.',
  intro:
    'Full Stack Developer and MCA graduate (2025) with production experience across the complete web lifecycle — from MySQL schema design to React UI — on a live e-commerce platform serving 100–500 users. I care about clean architecture, smooth interactions, and code that scales.',
  socials: {
    github: 'https://github.com/Hannasherin7',
    linkedin: 'https://www.linkedin.com/in/hanna-sherin916854272',
    portfolio: 'https://portfolio-hanna.vercel.app',
  },
  resumes: [
    { label: 'Full Stack', file: '/resumes/hanna_sherin_full_stack_developer.pdf' },
    { label: 'PHP · Laravel', file: '/resumes/hanna_sherin_php_laravel_developer.pdf' },
    { label: 'Java', file: '/resumes/hanna_sherin_java_programmer.pdf' },
  ],
}

export const stats = [
  { value: '500+', label: 'Active users served' },
  { value: '3+', label: 'Commission network levels' },
  { value: '30%', label: 'Query efficiency gained' },
  { value: '5+', label: 'Apps shipped as intern' },
]

export const skillGroups = [
  {
    title: 'Backend',
    items: ['PHP', 'Laravel', 'Node.js', 'Express.js', 'Java', 'Spring Boot'],
  },
  {
    title: 'Frontend',
    items: ['React.js', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
  },
  {
    title: 'Databases',
    items: ['MySQL', 'MongoDB', 'SQL', 'Relational Design'],
  },
  {
    title: 'Concepts & Tools',
    items: ['REST APIs', 'JWT Auth', 'MVC', 'Agile / Scrum', 'Git', 'Postman'],
  },
]

export const experience = [
  {
    role: 'PHP Laravel Developer',
    company: 'Bpract Software Solutions',
    place: 'Calicut, Kerala',
    period: 'May 2025 — Present',
    points: [
      'Architect and maintain backend modules for a live MLM-based e-commerce platform serving 100–500 active users — commission engines, downline tracking and referral hierarchy in PHP/Laravel.',
      'Designed complex business logic for ordering, payment workflows and multi-tier hierarchy, ensuring accurate commission distribution across 3+ network levels.',
      'Optimised MySQL schemas and queries for interconnected commission, inventory and transaction data — improving query efficiency by 30%.',
      'Built React.js UI components integrated with RESTful APIs, reducing page-load inconsistencies by 25%.',
    ],
  },
  {
    role: 'MERN Stack Developer Intern',
    company: 'Ipix Technologies',
    place: 'Cyberpark, Kozhikode',
    period: 'Feb 2025 — May 2025',
    points: [
      'Built and maintained 5+ scalable web applications with MongoDB, Express.js, React.js and Node.js in a professional agile team.',
      'Integrated third-party RESTful APIs across projects and resolved 20+ bugs across frontend and backend layers.',
      'Applied Git best practices, contributing to shared codebases with consistent code-review participation.',
    ],
  },
]

export const projects = [
  {
    title: 'EcoHarvest',
    tag: 'Full Stack · ML',
    stack: ['MERN', 'Python', 'ML'],
    year: '2025',
    desc: 'A full-stack marketplace connecting farmers with consumers for organic produce — featuring ML-based crop yield prediction, order tracking, recipe sharing and a farmer blog.',
    accent: '#2ee6c9',
  },
  {
    title: 'DSA Visualizer',
    tag: 'Java · Spring Boot',
    stack: ['Java', 'Spring Boot', 'React'],
    year: '2025',
    desc: 'An interactive learning tool with step-by-step visualisations of Bubble Sort, Binary Search, Stack, Queue, Circular Queue and Linked List — backed by a Spring Boot REST API.',
    accent: '#7c5cff',
  },
  {
    title: 'Apartment Management',
    tag: 'MERN · Role-based',
    stack: ['React', 'Node', 'MongoDB'],
    year: '2024',
    desc: 'A role-based platform for residents and admins to manage events, complaints and notices — secured with JWT authentication.',
    accent: '#ff8a5c',
  },
  {
    title: 'Fitness Tracker',
    tag: 'MERN · Data Viz',
    stack: ['MERN', 'Charts'],
    year: '2024',
    desc: 'A user-centric fitness app for logging workouts, setting goals, monitoring caloric intake and visualising progress through dynamic charts.',
    accent: '#5c9bff',
  },
  {
    title: 'Bus Pass Booking',
    tag: 'MERN · College',
    stack: ['React', 'Node', 'JWT'],
    year: '2024',
    desc: 'An online bus-pass management system for FISAT students — booking, cancellation, admin controls and secure JWT-based login.',
    accent: '#e65cff',
  },
]

export const education = [
  {
    degree: 'Master of Computer Application (MCA)',
    school: 'FISAT, Angamaly',
    university: 'APJ Abdul Kalam Technological University (KTU)',
    period: 'Jun 2023 — May 2025',
    score: 'CGPA 8.27 / 10',
    logo: '/logos/ktu.png',
    badge: 'KTU',
  },
  {
    degree: 'Bachelor of Computer Science (BCS)',
    school: 'MCAS Moodadi, Kozhikode',
    university: 'University of Calicut',
    period: 'Jun 2020 — Apr 2023',
    score: 'CGPA 6.66 / 10',
    logo: '/logos/calicut.png',
    badge: 'CU',
  },
]

export const certifications = [
  'Artificial Intelligence Fundamentals — IBM SkillsBuild',
  'SQL and Relational Databases — IBM',
  'Learn Java Programming: Beginner to Master — Udemy',
  'Introduction to Data Science — Infosys Springboard',
  'Python Django Internship — Bluegen Solutions',
  'MERN Stack Application Development — Link Ur Codes × FISAT',
]

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]
