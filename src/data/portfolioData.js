export const personalInfo = {
  name: "Abhishek Jha",
  role: "Full Stack Developer",
  learningFocus: "Data Science & Analytical Computing",
  location: "Delhi, India",
  email: "jhasabhishek17@gmail.com",
  phone: "+91 9911129755",
  github: "https://github.com/jhasabhishek17",
  linkedin: "https://www.linkedin.com/in/abhishek-jha-32a7402ab/",
  resumeUrl: "/Abhishek_Jha_Resume.pdf",
  tagline: "Engineering full-stack systems with architectural discipline and exploring analytical computing with Python.",
  bio: "I am a Full Stack Developer focused on building resilient web applications and systems that solve real problems. I architect clean backends with Node.js and Express, build responsive interfaces with React, and actively explore Data Science and Computer Vision using Python, NumPy, and OpenCV.",
  dataScienceNote: "I am currently learning Data Science — working through NumPy, Pandas, Matplotlib, and Jupyter Notebooks to bridge algorithmic data processing with practical software engineering.",
  availability: "Open to full-time engineering roles & impactful collaborations",
  education: {
    degree: "B.Tech in Electronics & Communication Engineering",
    focus: "Full-Stack Software Engineering & Computer Vision Systems"
  }
};

export const projects = [
  {
    id: "petpaws",
    title: "PetPaws Platform",
    tagline: "Full-Stack Pet Care & Marketplace Ecosystem",
    category: "fullstack",
    featured: true,
    description: "Full-stack pet marketplace and veterinary care platform with role-based access, real-time logistics tracking, and itemized tax invoice generation.",
    longDescription: "PetPaws is an end-to-end full-stack marketplace and healthcare platform engineered with React, Node.js, and Express. Built to solve fragmented pet commerce, it features dedicated role-based portals for Buyers, Sellers, and Veterinary Doctors, multi-tier checkout simulation (UPI/NetBanking), automated inventory decrementing, live pet transport tracking, automated itemized tax invoices, and integrated appointment scheduling.",
    tech: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "REST API", "Render"],
    role: "Full Stack Developer — Architecture, Frontend UI, & REST API",
    liveUrl: "https://petpaws-frontend.onrender.com",
    githubUrl: "https://github.com/jhasabhishek17/PetPaws",
    image: "/images/petpaws_preview.jpg",
    badges: ["Live on Render", "Production Full Stack"],
    highlights: [
      "Role-based access model catering to Buyers, Sellers, and Veterinary Specialists",
      "Simulated checkout flow with UPI, NetBanking, and transactional verification",
      "Automated stock management and live transport tracking status engine",
      "Tax-compliant itemized PDF invoice generation for completed transactions",
      "Integrated veterinary tele-consultation booking interface"
    ]
  },
  {
    id: "wanderlust",
    title: "Wanderlust",
    tagline: "Full-Stack Accommodation Platform with Spatial Mapping",
    category: "fullstack",
    featured: true,
    description: "Production accommodation platform built on MVC principles with Mapbox spatial geocoding, Cloudinary media storage, and session authentication.",
    longDescription: "Wanderlust is a production-style travel accommodation platform inspired by Airbnb, built with Node.js, Express, and MongoDB following strict MVC architecture. It empowers users to explore, create, manage, and review unique stays worldwide. Incorporates Mapbox geocoding for interactive spatial mapping, Cloudinary for high-res asset pipelines, Passport.js for session authentication, and comprehensive Joi schema validations.",
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "EJS", "Passport.js", "Cloudinary", "Mapbox", "Render"],
    role: "Full Stack Developer — MVC Architecture, Authentication, & Mapbox Integration",
    liveUrl: "https://wanderlust-imfd.onrender.com/listings",
    githubUrl: "https://github.com/jhasabhishek17/wanderlust",
    image: "/images/wanderlust_after_login.png",
    badges: ["Live on Render", "MVC Architecture"],
    highlights: [
      "Clean MVC architecture decoupling models, Express routes, and EJS views",
      "Mapbox API integration converting natural addresses into interactive map pins",
      "Cloudinary image storage pipeline with Multer for secure photo uploads",
      "Session-based authentication with Passport Local and route authorization guards",
      "Relational reviews and rating system with Mongoose schema modeling",
      "Tax calculation toggle (18% GST) and location search filtering"
    ]
  },
  {
    id: "video-panorama",
    title: "Video Panorama Studio",
    tagline: "Computer Vision Keyframe Extraction & Stitching Pipeline",
    category: "python",
    featured: true,
    description: "Computer vision web app converting video clips into seamless panoramic composites using Laplacian variance filtering and SIFT homography.",
    longDescription: "A computer vision application built with Python, Flask, OpenCV, and NumPy. It processes raw panning video files by calculating Laplacian variance to isolate sharp, blur-free keyframes, extracts feature descriptors with SIFT, and computes homography matrices with RANSAC to stitch ultra-wide seamless panoramic images with multi-band feather blending and automatic ROI border cropping.",
    tech: ["Python", "Flask", "OpenCV", "SIFT", "RANSAC", "NumPy", "HTML5/CSS3"],
    role: "Computer Vision Engineer — Keyframe Detection & Stitching Pipeline",
    liveUrl: null,
    liveNote: "Local Flask App (Run via app.py)",
    githubUrl: "https://github.com/jhasabhishek17/python-project/tree/main/video-panorama-generator",
    image: "/images/video_panorama_studio.jpg",
    badges: ["Computer Vision", "Flask Web App"],
    highlights: [
      "Laplacian variance edge-filtering to automatically discard motion-blurred video frames",
      "Scale-Invariant Feature Transform (SIFT) algorithm for resilient keypoint matching",
      "RANSAC homography estimation with cylindrical warp mapping for projection correction",
      "Multi-band feather blending eliminates noticeable seam artifacts across adjacent frames",
      "Drag-and-drop web interface with live processing feedback"
    ]
  },
  {
    id: "instagram-fetcher",
    title: "Instagram Intelligence Studio",
    tagline: "Asynchronous OSINT Profile Analytics Desktop Tool",
    category: "python",
    featured: false,
    description: "Dark-themed desktop GUI application for asynchronous OSINT profile analytics, user metadata retrieval, and avatar inspection.",
    longDescription: "A dark-themed desktop utility built in Python with Tkinter. Performs asynchronous non-blocking OSINT metadata gathering from public Instagram profiles. Concurrently retrieves follower counts, following ratios, post frequency, verification badges, private account status, and bio external links while rendering high-resolution profile imagery without UI freezing.",
    tech: ["Python", "Tkinter", "Async Requests", "Pillow", "JSON Parsing"],
    role: "Python Developer — Desktop GUI Architecture & Async Requests",
    liveUrl: null,
    liveNote: "Desktop GUI App (Run via main.py)",
    githubUrl: "https://github.com/jhasabhishek17/python-project/tree/main/instagram-user-details",
    image: "/images/instagram_user_fetcher.jpg",
    badges: ["Desktop Application", "OSINT Tool"],
    highlights: [
      "Multithreaded background worker pattern ensuring a smooth, non-freezing GUI",
      "Real-time extraction of follower/following metrics, bio links, and business status",
      "Pillow image processing pipeline displaying high-res profile avatars",
      "Clean dark-themed custom Tkinter interface with structured analytics cards"
    ]
  },
  {
    id: "snake-game",
    title: "Python Snake Arcade",
    tagline: "Classic 2D Arcade Game Engine in Pygame",
    category: "python",
    featured: false,
    description: "Classic 2D arcade Snake game engine built with Python and Pygame featuring grid-matrix physics, collision detection, and score tracking.",
    longDescription: "A fully functional classic Snake game built from the ground up using Python and Pygame. It implements grid matrix coordinate mathematics, multi-speed frame-rate difficulty settings (Easy, Medium, Hard), wall and self-collision detection algorithms, random food spawning on free grid coordinates, and persistent high-score tracking with a retro HUD interface.",
    tech: ["Python 3", "Pygame", "Grid Matrix Mathematics", "Collision Algorithms"],
    role: "Python Developer — Game Logic & Pygame Architecture",
    liveUrl: null,
    liveNote: "Desktop Pygame App (Run via snake.py)",
    githubUrl: "https://github.com/jhasabhishek17/python-project/tree/main/snakeGame",
    image: "/images/snake_game_preview.png",
    badges: ["Pygame Arcade", "Desktop Application"],
    highlights: [
      "Grid matrix coordinate calculation (32x24 grid cells with 20px cell dimensions)",
      "Multi-level difficulty controller adjusting tick rates (8 FPS, 12 FPS, 18 FPS)",
      "Strict vector-based wall collision and self-intersecting body detection",
      "Custom HUD displaying real-time score, session high-score, and active difficulty"
    ]
  },
  {
    id: "notepad-app",
    title: "Notepad Application",
    tagline: "Cross-Platform Desktop Text Editor",
    category: "tools",
    featured: false,
    description: "Clean cross-platform text editor with live word and character counters, dynamic font styling, and native file dialogue management.",
    longDescription: "A minimalist text editor built from scratch in Python and Tkinter. Implements native OS file dialogue bindings (Open, Save, Save As), live status bar listeners calculating line, word, and character counts in real time, customizable editor font sizing, and robust undo/redo history stacks.",
    tech: ["Python", "Tkinter", "File I/O", "Event Architecture"],
    role: "Python Developer — Application Architecture & UI",
    liveUrl: null,
    liveNote: "Desktop GUI App (Run via main.py)",
    githubUrl: "https://github.com/jhasabhishek17/python-project/tree/main/notepad-app",
    image: "/images/notepad_app_preview.jpg",
    badges: ["Desktop Application", "System Utility"],
    highlights: [
      "Event-driven key release listeners delivering instantaneous word/character metrics",
      "Dynamic font family and point size configuration with live editor preview",
      "Native system clipboard, undo/redo state tracking, and word-wrap toggles"
    ]
  },
  {
    id: "name-generator",
    title: "Random Name Generator",
    tagline: "Developer Mock Data Generation Utility",
    category: "tools",
    featured: false,
    description: "Developer mock data utility generating realistic synthetic identities with customizable gender/type filters and one-click clipboard export.",
    longDescription: "A specialized mock data generator created in Python Tkinter to accelerate frontend and database testing. Enables developers to configure gender filters, name component types (Full, First, Last), and batch quantities from 1 to 50, with instantaneous one-click clipboard copying.",
    tech: ["Python", "Tkinter", "Clipboard API"],
    role: "Python Developer — Developer Utility Tool",
    liveUrl: null,
    liveNote: "Desktop GUI App (Run via main.py)",
    githubUrl: "https://github.com/jhasabhishek17/python-project/tree/main/name-generator",
    image: "/images/random_name_generator.jpg",
    badges: ["Developer Tool", "Desktop Application"],
    highlights: [
      "Fast combinatorial identity generation algorithm with fallback structures",
      "Direct integration with OS clipboard for zero-friction mock data pasting",
      "Clean, focused desktop UI designed specifically for developer workflows"
    ]
  },
  {
    id: "weather-app",
    title: "Weather App",
    tagline: "Responsive Meteorological Forecast Application",
    category: "fullstack",
    featured: false,
    description: "Responsive meteorological forecast web application tracking live atmospheric metrics, thermal perception, and humidity via OpenWeather API.",
    longDescription: "A responsive web application created with React and Material UI that fetches live meteorological telemetry from the OpenWeatherMap API. Surfaces temperature, humidity, thermal perception (feels-like), and atmospheric highs/lows with responsive search and error resilience.",
    tech: ["React.js", "Material UI", "REST API", "OpenWeatherMap"],
    role: "Frontend Developer — API Integration & Responsive UI",
    liveUrl: null,
    liveNote: "React Application (Source available on GitHub)",
    githubUrl: "https://github.com/jhasabhishek17/Weather-App",
    image: "/images/weather_app_preview.png",
    badges: ["React Application", "API Integration"],
    highlights: [
      "Live asynchronous data fetching from OpenWeatherMap REST endpoints",
      "Component-driven layout with responsive Material UI primitives",
      "Graceful error handling for invalid or unrecognized geographical queries"
    ]
  }
];

export const skillCategories = [
  {
    name: "Frontend Engineering",
    description: "Building responsive, accessible, component-driven client interfaces",
    skills: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Material UI", "Responsive Design"]
  },
  {
    name: "Backend & Architecture",
    description: "Engineering REST APIs, server logic, and secure authentication",
    skills: ["Node.js", "Express.js", "RESTful APIs", "MVC Architecture", "Passport.js", "Middleware", "Joi Validation"]
  },
  {
    name: "Databases & Storage",
    description: "Data modeling, schema design, and cloud asset pipelines",
    skills: ["MongoDB", "Mongoose ODM", "MongoDB Atlas", "Cloudinary"]
  },
  {
    name: "Python & Data Science",
    description: "Analytical computation, computer vision, and desktop GUI applications",
    skills: ["Python 3", "OpenCV", "Pygame", "NumPy", "Pandas", "Matplotlib", "Jupyter Notebooks", "Flask", "Tkinter"]
  },
  {
    name: "Developer Tools & Cloud",
    description: "Workflow tooling, version control, spatial services, and deployment",
    skills: ["Git", "GitHub", "Render", "Mapbox GL", "Vite", "Postman", "npm"]
  }
];
