// ============================================================
// 🎮 PROJECTS CONTROLLER — Interactive Backend API Demos
// ============================================================

// 1. DevConnect Demo Data & Realtime Chat Simulator
exports.getDevConnectDemo = (req, res) => {
  res.json({
    success: true,
    platform: "DevConnect",
    version: "2.1.0",
    stats: { activeDevelopers: 142, activeProjects: 28, openTasks: 89 },
    developers: [
      { name: "Abhishek", role: "Lead Full Stack Dev", status: "Online", avatar: "👨‍💻", skills: ["React", "Node.js", "MongoDB"] },
      { name: "Sarah Chen", role: "UI/UX Designer", status: "In Meeting", avatar: "👩‍🎨", skills: ["Figma", "Tailwind", "CSS3"] },
      { name: "Alex Ramirez", role: "Backend Engineer", status: "Online", avatar: "⚡", skills: ["Python", "FastAPI", "PostgreSQL"] },
      { name: "Emily Watson", role: "DevOps Engineer", status: "Away", avatar: "🚀", skills: ["Docker", "Kubernetes", "AWS"] },
    ],
    tasks: [
      { id: 1, title: "Integrate OAuth 2.0 Auth Flow", category: "Backend", priority: "High", status: "In Progress", assignee: "Abhishek" },
      { id: 2, title: "Redesign Developer Dashboard", category: "UI/UX", priority: "Medium", status: "In Review", assignee: "Sarah Chen" },
      { id: 3, title: "Setup Docker Container & CI/CD", category: "DevOps", priority: "High", status: "Done", assignee: "Emily Watson" },
      { id: 4, title: "Optimize MongoDB Indexing", category: "Database", priority: "Low", status: "To Do", assignee: "Alex Ramirez" },
    ],
    chatMessages: [
      { id: 1, sender: "Sarah Chen", time: "10:14 AM", text: "Hey team! I updated the design specs for DevConnect v2 on Figma." },
      { id: 2, sender: "Abhishek", time: "10:16 AM", text: "Great! I'm linking the new REST endpoints with Node.js & Socket.io." },
      { id: 3, sender: "Alex Ramirez", time: "10:18 AM", text: "Awesome! All database queries are indexed and benchmarked under 20ms response time." },
    ]
  })
}

// 2. AI Resume Screener Analyzer API
exports.analyzeResume = (req, res) => {
  const { resumeText = '', jobDescription = '' } = req.body

  const sampleSkills = ["Python", "Node.js", "React", "TypeScript", "SQL", "Docker", "AWS", "REST APIs", "Git", "DSA"]
  
  // Simple NLP keyword extraction logic
  const textUpper = (resumeText + ' ' + jobDescription).toUpperCase()
  const detectedSkills = sampleSkills.filter(s => textUpper.includes(s.toUpperCase()))
  
  const finalSkills = detectedSkills.length > 0 ? detectedSkills : ["Python", "React", "Node.js", "SQL", "Docker"]
  
  // Calculate match score
  let score = 85 + Math.floor(Math.random() * 11)
  if (resumeText.length > 100) score = Math.min(98, score + 3)

  res.json({
    success: true,
    matchScore: score,
    matchTier: score >= 90 ? "Strong Match (Top Tier)" : "Good Match",
    parsedCandidate: {
      name: "Abhishek",
      title: "Full Stack Software Engineer",
      experienceYears: "2+ Years",
      education: "B.Tech Computer Science & Engineering",
      cgpa: "8.7 / 10"
    },
    extractedSkills: finalSkills,
    missingSkills: ["Kubernetes", "GraphQL"],
    aiFeedback: [
      "✅ Strong alignment with modern web stack requirements (React, Node.js, TypeScript).",
      "✅ Proven experience building scalable REST APIs and handling 10k+ requests.",
      "💡 Recommendation: Consider adding certifications in Kubernetes or System Design."
    ]
  })
}

// 3. EduPlatform Courses & Video Curriculum API
exports.getEduPlatformCourses = (req, res) => {
  res.json({
    success: true,
    platform: "EduPlatform",
    totalCourses: 12,
    activeStudents: 3420,
    featuredCourse: {
      id: "course-101",
      title: "Mastering Full-Stack Web Development & System Design",
      instructor: "Abhishek (Senior CS Engineer)",
      rating: 4.9,
      reviewsCount: 1280,
      totalHours: "24.5 Hours",
      lessonsCount: 32,
      progressPercentage: 42,
      syllabus: [
        { module: "Module 1: Modern JavaScript & TypeScript Deep Dive", duration: "3.5 hrs", status: "Completed" },
        { module: "Module 2: React 18, Next.js 14 App Router & Tailwind CSS", duration: "5.0 hrs", status: "Completed" },
        { module: "Module 3: Node.js, Express & Microservice Architecture", duration: "6.0 hrs", status: "In Progress" },
        { module: "Module 4: Database Design (PostgreSQL & MongoDB)", duration: "4.5 hrs", status: "Upcoming" },
        { module: "Module 5: System Design & Production Deployment", duration: "5.5 hrs", status: "Upcoming" },
      ],
      interactiveQuiz: {
        id: "q-301",
        question: "Which hook in React 18 is best suited for deferring non-urgent UI state updates?",
        options: ["useDeferredValue", "useEffect", "useMemo", "useCallback"],
        correctIndex: 0,
        explanation: "useDeferredValue allows you to defer updating a part of the UI that is computationally expensive."
      }
    }
  })
}
