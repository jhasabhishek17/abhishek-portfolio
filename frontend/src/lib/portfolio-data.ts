// ============================================================
// 🎯 PORTFOLIO DATA — EDIT THIS FILE TO CUSTOMIZE YOUR PORTFOLIO
// ============================================================

export const personalInfo = {
  name: "Abhishek",
  title: "Full Stack Developer & CS Engineer",
  tagline: "I build scalable web apps, solve complex problems, and turn ideas into production software.",
  email: "abhishek@email.com",
  phone: "+91 98765 43210",
  location: "Dhanbad, Jharkhand, India",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-profile",
  twitter: "",
  leetcode: "https://leetcode.com/your-username",
  resumeUrl: "/resume.pdf",
  profileImage: "",
  availableForWork: true,
  graduationYear: "2026",
  degree: "B.Tech Computer Science & Engineering",
  cgpa: "8.7",
  college: "Your College Name",
}

export const stats = {
  projectsBuilt: 8,
  problemsSolved: 500,
  certifications: 10,
  internships: 3,
  leetcodeRating: 1750,
}

export const skills = [
  { category: "Languages", items: ["C++", "Python", "JavaScript", "TypeScript", "Java", "SQL"] },
  { category: "Frontend", items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Redux"] },
  { category: "Backend", items: ["Node.js", "Express.js", "Django", "FastAPI", "REST APIs", "GraphQL"] },
  { category: "Database & Cloud", items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "AWS", "Docker"] },
  { category: "ML & Data Science", items: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "Matplotlib"] },
  { category: "CS Core & Tools", items: ["DSA", "OOP", "OS", "DBMS", "CN", "Git", "Linux", "Postman"] },
]

export const experience = [
  {
    company: "TechCorp Solutions Pvt. Ltd.",
    role: "Software Development Intern",
    period: "May 2025 – Jul 2025",
    duration: "3 months",
    type: "Remote",
    description: [
      "Developed REST APIs with Node.js & Express serving 10k+ daily requests.",
      "Reduced page load time by 35% via lazy loading and code splitting in React.",
      "Collaborated in Agile team of 6 using Git, Jira, and weekly sprints.",
    ],
    tech: ["Node.js", "React", "MongoDB", "Docker"],
  },
  {
    company: "DataMinds AI",
    role: "Machine Learning Intern",
    period: "Dec 2024 – Feb 2025",
    duration: "2 months",
    type: "Hybrid",
    description: [
      "Built classification models using Scikit-learn achieving 92% accuracy.",
      "EDA and feature engineering on 50k-row datasets with Pandas & Matplotlib.",
      "Deployed model as REST API using FastAPI + Docker on AWS EC2.",
    ],
    tech: ["Python", "Scikit-learn", "FastAPI", "AWS"],
  },
  {
    company: "WebWave Studios",
    role: "Frontend Developer Intern",
    period: "May 2024 – Jul 2024",
    duration: "2 months",
    type: "Remote",
    description: [
      "Redesigned 5 client landing pages improving mobile responsiveness.",
      "Integrated payment, maps, and auth APIs into React components.",
    ],
    tech: ["React", "Tailwind CSS", "JavaScript"],
  },
]

export const featuredProjects = [
  {
    title: "DevConnect — Developer Collaboration Platform",
    description: "Full-stack platform where developers post project ideas, find collaborators, and manage tasks with real-time chat. JWT auth, role-based access, analytics dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "JWT"],
    liveUrl: "https://devconnect.vercel.app",
    githubUrl: "https://github.com/your-username/devconnect",
    featured: true,
  },
  {
    title: "AI Resume Screener",
    description: "ML model that parses resumes and ranks candidates using NLP and cosine similarity. Flask API backend with React frontend.",
    tech: ["Python", "Flask", "NLP", "Scikit-learn", "React"],
    liveUrl: "",
    githubUrl: "https://github.com/your-username/ai-resume-screener",
    featured: false,
  },
  {
    title: "EduPlatform — Online Learning App",
    description: "Course platform with video streaming, progress tracking, quizzes, and Stripe payment integration.",
    tech: ["Next.js", "PostgreSQL", "Stripe", "AWS S3"],
    liveUrl: "https://eduplatform.vercel.app",
    githubUrl: "https://github.com/your-username/eduplatform",
    featured: false,
  },
]

export const achievements = [
  { icon: "🏆", title: "Smart India Hackathon 2024 — 1st Place", subtitle: "National Level · Ministry of Education" },
  { icon: "⭐", title: "5-Star HackerRank (C++ & Python)", subtitle: "Top 5% · Problem Solving Badge" },
  { icon: "🎖️", title: "LeetCode Rating 1750+ · 500+ Problems", subtitle: "Data Structures & Algorithms" },
  { icon: "🥇", title: "Best Project Award — College Tech Fest 2024", subtitle: "DevConnect Platform" },
  { icon: "📝", title: "Published Paper — ICSE 2024", subtitle: "AI-based Resume Screening Systems" },
  { icon: "🌐", title: "Open Source Contributor — 3 Merged PRs", subtitle: "Public GitHub Repositories" },
]

export const certifications = [
  { name: "Google Cloud Associate Engineer", issuer: "Google", date: "Jan 2025", credentialUrl: "" },
  { name: "Meta Front-End Developer Professional Certificate", issuer: "Meta / Coursera", date: "Sep 2024", credentialUrl: "" },
  { name: "Machine Learning Specialization", issuer: "DeepLearning.AI / Coursera", date: "Nov 2023", credentialUrl: "" },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Aug 2024", credentialUrl: "" },
  { name: "Data Structures & Algorithms in Python", issuer: "NPTEL", date: "Mar 2024", credentialUrl: "" },
  { name: "Database Management Systems", issuer: "NPTEL", date: "Apr 2023", credentialUrl: "" },
]
