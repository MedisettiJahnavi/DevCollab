/**
 * DevCollab Demo Data & Seed Store
 */

const DevData = {
  // Current Logged-in User
  currentUser: {
    id: "user-current",
    name: "Jordan Lee",
    username: "jordanlee_dev",
    email: "jordan.lee@devcollab.io",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    role: "Fullstack Engineer",
    company: "Apex Tech Labs",
    location: "San Francisco, CA",
    timezone: "UTC-7 (PST)",
    experienceYears: 4,
    experienceLevel: "Mid-Senior",
    availability: "Available",
    bio: "Passionate full-stack developer obsessed with clean architecture, real-time web applications, and AI integrations. Always excited to hack on open-source projects or build MVPs.",
    skills: ["React", "TypeScript", "Next.js", "Node.js", "Python", "Tailwind CSS", "PostgreSQL", "Docker"],
    interests: ["AI/ML Applications", "Real-Time Collaboration", "DevTools", "Open Source"],
    collaborationTypes: ["Hackathons", "Side Projects", "Open Source", "Co-founder"],
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    portfolio: "https://jordanlee.dev",
    matchScore: 100,
    twoFactorEnabled: false,
    stats: {
      projectsCreated: 3,
      collaborations: 12,
      reputationScore: 980,
      profileViews: 342
    }
  },

  // Available Master Skills for Selection & Filtering
  availableSkills: [
    "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Angular", "Svelte",
    "Node.js", "Python", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby",
    "Flutter", "React Native", "Android", "iOS", "Swift", "Kotlin",
    "DevOps", "Docker", "Kubernetes", "AWS", "Google Cloud", "Azure", "Terraform",
    "AI/ML", "PyTorch", "TensorFlow", "LangChain", "OpenAI", "HuggingFace",
    "UI/UX", "Tailwind CSS", "Figma", "GraphQL", "PostgreSQL", "MongoDB", "Redis"
  ],

  // Developer Profiles
  developers: [
    {
      id: "dev-1",
      name: "Alex Johnson",
      username: "alexj_frontend",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      role: "Frontend Developer",
      company: "Veloce Systems",
      location: "Austin, TX (Remote)",
      timezone: "UTC-5 (CDT)",
      experienceYears: 4,
      experienceLevel: "Mid-Level",
      availability: "Available",
      verified: true,
      matchScore: 94,
      matchReason: "Matches your React + TypeScript stack and frontend collaboration requirements.",
      bio: "Crafting hyper-responsive user interfaces and fluid design systems. Specialist in Next.js App Router, modern CSS, web animation, and accessible design systems.",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "UI/UX", "Jest"],
      collaborationTypes: ["Side Projects", "Hackathons", "Open Source"],
      github: "https://github.com/alexj-frontend",
      linkedin: "https://linkedin.com/in/alexjohnson-dev",
      portfolio: "https://alexjohnson.codes",
      connectionStatus: "connected", // 'none', 'pending', 'connected'
      isOnline: true,
      lastActive: "Just now",
      experienceTimeline: [
        { role: "Senior Frontend Engineer", company: "Veloce Systems", period: "2023 - Present", description: "Spearheaded migration to Next.js 14, improving Core Web Vitals score to 99%." },
        { role: "Frontend Developer", company: "PixelCraft Agency", period: "2021 - 2023", description: "Built 15+ high-conversion responsive client applications using React and Tailwind." },
        { role: "Junior Web Developer", company: "Codex Labs", period: "2020 - 2021", description: "Developed reusable UI components and automated E2E tests with Cypress." }
      ],
      projects: [
        {
          name: "FluidDesign UI Kit",
          description: "An accessible, head-less React component library powered by Tailwind CSS and Radix UI.",
          technologies: ["React", "TypeScript", "Tailwind CSS"],
          stars: 480,
          github: "https://github.com/alexj/fluid-ui",
          demo: "https://fluid-ui-demo.app"
        },
        {
          name: "DevDocs Fast Search",
          description: "Lightning-fast offline documentation browser with keyboard shortcuts and fuzzy matching.",
          technologies: ["Next.js", "WebAssembly", "Algolia"],
          stars: 215,
          github: "https://github.com/alexj/fast-devdocs",
          demo: "https://fast-devdocs.app"
        }
      ],
      reviews: [
        { author: "Sarah Williams", rating: 5, date: "2 weeks ago", comment: "Alex is an incredible frontend collaborator! Clean code, super fast turnaround, and intuitive UI choices." },
        { author: "David Chen", rating: 5, date: "1 month ago", comment: "Paired with Alex on a hackathon project. His TypeScript architecture made backend integration effortless." }
      ]
    },
    {
      id: "dev-2",
      name: "Sarah Williams",
      username: "sarah_ai_engineer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      role: "AI/ML Engineer",
      company: "NeuralPulse AI",
      location: "Seattle, WA",
      timezone: "UTC-7 (PST)",
      experienceYears: 5,
      experienceLevel: "Senior",
      availability: "Available",
      verified: true,
      matchScore: 89,
      matchReason: "Matches your Python & AI/ML project needs with expertise in LLM agent pipelines.",
      bio: "Building production generative AI systems, autonomous agents, and fine-tuning domain-specific LLMs. Excited to collaborate on real-world AI applications.",
      skills: ["Python", "AI/ML", "PyTorch", "TensorFlow", "LangChain", "OpenAI", "Docker", "PostgreSQL"],
      collaborationTypes: ["Hackathons", "Startup MVP", "Side Projects"],
      github: "https://github.com/sarahw-ai",
      linkedin: "https://linkedin.com/in/sarahwilliams-ml",
      portfolio: "https://sarahwilliams.ai",
      connectionStatus: "connected",
      isOnline: true,
      lastActive: "5m ago",
      experienceTimeline: [
        { role: "Staff AI Engineer", company: "NeuralPulse AI", period: "2022 - Present", description: "Architected low-latency RAG vector database engine serving 2M daily queries." },
        { role: "Machine Learning Researcher", company: "Cognitive AI Labs", period: "2020 - 2022", description: "Fine-tuned open-source transformers for multi-modal code understanding." },
        { role: "Data Scientist", company: "QuantMetrics", period: "2019 - 2020", description: "Trained predictive analytics models with PyTorch and distributed Spark clusters." }
      ],
      projects: [
        {
          name: "AgentFlow Orchestrator",
          description: "Declarative multi-agent framework for resilient tool calling and structured output extraction.",
          technologies: ["Python", "LangChain", "FastAPI"],
          stars: 1240,
          github: "https://github.com/sarahw/agentflow",
          demo: "https://agentflow.dev"
        },
        {
          name: "VectorCache",
          description: "In-memory semantic vector cache reducing OpenAI API costs by 65%.",
          technologies: ["Python", "Rust", "Redis"],
          stars: 870,
          github: "https://github.com/sarahw/vectorcache",
          demo: "https://vectorcache.io"
        }
      ],
      reviews: [
        { author: "Jordan Lee", rating: 5, date: "3 days ago", comment: "Outstanding knowledge of LLMs and vector search. Shipped our prototype in record time!" }
      ]
    },
    {
      id: "dev-3",
      name: "David Chen",
      username: "davidchen_stack",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      role: "Fullstack Architect",
      company: "CloudScale Infra",
      location: "Toronto, Canada",
      timezone: "UTC-4 (EDT)",
      experienceYears: 7,
      experienceLevel: "Senior",
      availability: "Available",
      verified: true,
      matchScore: 96,
      matchReason: "Matches your Node.js + Go backend architecture with Kubernetes containerization.",
      bio: "High-concurrency systems engineer and distributed backend architect. When not scaling Go microservices, I build modern web applications and developer tools.",
      skills: ["Go", "Node.js", "Kubernetes", "Docker", "React", "TypeScript", "PostgreSQL", "AWS"],
      collaborationTypes: ["Co-founder", "Open Source", "Startup MVP"],
      github: "https://github.com/davidchen-dev",
      linkedin: "https://linkedin.com/in/davidchen-stack",
      portfolio: "https://davidchen.tech",
      connectionStatus: "none",
      isOnline: true,
      lastActive: "Just now",
      experienceTimeline: [
        { role: "Principal Architect", company: "CloudScale Infra", period: "2021 - Present", description: "Designed event-driven backend handling 45,000 req/sec with 99.995% uptime." },
        { role: "Senior Backend Engineer", company: "FinGrid Systems", period: "2018 - 2021", description: "Migrated legacy monolith to Go microservices in Kubernetes on AWS." }
      ],
      projects: [
        {
          name: "KubeWatchdog",
          description: "Zero-dependency Kubernetes cluster anomaly detection agent with Slack and Discord webhooks.",
          technologies: ["Go", "Kubernetes", "Prometheus"],
          stars: 940,
          github: "https://github.com/davidchen/kubewatchdog",
          demo: "https://kubewatchdog.dev"
        }
      ],
      reviews: [
        { author: "Marcus Vance", rating: 5, date: "1 month ago", comment: "David writes the cleanest Go code I've ever reviewed. Exceptional DevOps intuition." }
      ]
    },
    {
      id: "dev-4",
      name: "Elena Rostova",
      username: "elena_rustacean",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      role: "Systems & Rust Developer",
      company: "ZeroCopy Labs",
      location: "Berlin, Germany",
      timezone: "UTC+2 (CEST)",
      experienceYears: 6,
      experienceLevel: "Senior",
      availability: "Part-time",
      verified: true,
      matchScore: 84,
      matchReason: "Low-level performance engineer with WebAssembly and systems programming expertise.",
      bio: "Systems programming enthusiast. Passionate about memory safety, compiler optimizations, WebAssembly runtimes, and high-performance network protocols.",
      skills: ["Rust", "C++", "WebAssembly", "Go", "Docker", "Linux", "DevOps"],
      collaborationTypes: ["Open Source", "Side Projects"],
      github: "https://github.com/elena-rostova",
      linkedin: "https://linkedin.com/in/elena-rostova-rust",
      portfolio: "https://elenarostova.dev",
      connectionStatus: "pending",
      isOnline: false,
      lastActive: "2 hours ago",
      experienceTimeline: [
        { role: "Staff Systems Engineer", company: "ZeroCopy Labs", period: "2021 - Present", description: "Implemented low-latency serialization engine achieving 4x throughput improvement." }
      ],
      projects: [
        {
          name: "FastWasm Sandbox",
          description: "Ultra-lightweight isolated WebAssembly runtime built with Rust.",
          technologies: ["Rust", "WebAssembly", "C++"],
          stars: 1650,
          github: "https://github.com/elena/fastwasm",
          demo: "https://fastwasm.io"
        }
      ],
      reviews: [
        { author: "Kenji Sato", rating: 5, date: "3 weeks ago", comment: "Incredible systems engineer. Her Rust code is lightning-fast and bulletproof." }
      ]
    },
    {
      id: "dev-5",
      name: "Marcus Vance",
      username: "marcus_cloudops",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
      role: "DevOps & Cloud Architect",
      company: "TerraScale Cloud",
      location: "London, UK",
      timezone: "UTC+1 (BST)",
      experienceYears: 5,
      experienceLevel: "Senior",
      availability: "Available",
      verified: true,
      matchScore: 91,
      matchReason: "Matches your cloud deployment, CI/CD, and automated infrastructure needs.",
      bio: "Automating everything from Git commit to Kubernetes multi-region clusters. Specialist in Terraform, GitHub Actions, AWS architectures, and observability.",
      skills: ["DevOps", "AWS", "Terraform", "Kubernetes", "Docker", "Python", "Google Cloud", "CI/CD"],
      collaborationTypes: ["Side Projects", "Startup MVP", "Hackathons"],
      github: "https://github.com/marcusvance",
      linkedin: "https://linkedin.com/in/marcus-vance-cloud",
      portfolio: "https://marcusvance.cloud",
      connectionStatus: "none",
      isOnline: true,
      lastActive: "15m ago",
      experienceTimeline: [
        { role: "Lead DevOps Specialist", company: "TerraScale", period: "2022 - Present", description: "Automated multi-account AWS landing zones using Terraform." }
      ],
      projects: [
        {
          name: "Terraform-K8s-Blueprint",
          description: "Turnkey production-ready EKS & GKE Terraform scaffolding.",
          technologies: ["Terraform", "AWS", "Kubernetes"],
          stars: 720,
          github: "https://github.com/marcus/k8s-blueprint",
          demo: "https://terrascale.io/blueprint"
        }
      ],
      reviews: []
    },
    {
      id: "dev-6",
      name: "Priya Patel",
      username: "priya_designcode",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
      role: "UI/UX & Creative Frontend",
      company: "Studio Chroma",
      location: "San Jose, CA",
      timezone: "UTC-7 (PST)",
      experienceYears: 3,
      experienceLevel: "Mid-Level",
      availability: "Available",
      verified: true,
      matchScore: 95,
      matchReason: "Matches your React + Tailwind styling needs with stunning modern UI/UX design.",
      bio: "Bridging the gap between Figma design systems and production React components. Passionate about 3D WebGL, interactive micro-interactions, and sleek dark mode UI.",
      skills: ["UI/UX", "React", "Tailwind CSS", "Figma", "TypeScript", "Next.js", "Three.js"],
      collaborationTypes: ["Hackathons", "Startup MVP", "Side Projects"],
      github: "https://github.com/priyapatel-ui",
      linkedin: "https://linkedin.com/in/priya-patel-design",
      portfolio: "https://priyapatel.design",
      connectionStatus: "connected",
      isOnline: true,
      lastActive: "Just now",
      experienceTimeline: [
        { role: "Design Systems Engineer", company: "Studio Chroma", period: "2022 - Present", description: "Built design token pipeline connecting Figma tokens directly to Tailwind config." }
      ],
      projects: [
        {
          name: "GlowGrid UI",
          description: "Futuristic dark-mode cyber UI kit with glassmorphism components.",
          technologies: ["React", "Tailwind CSS", "Framer Motion"],
          stars: 1100,
          github: "https://github.com/priya/glowgrid",
          demo: "https://glowgrid.design"
        }
      ],
      reviews: [
        { author: "Alex Johnson", rating: 5, date: "1 month ago", comment: "Priya makes every UI looks 10x more polished. Working with her is a delight!" }
      ]
    },
    {
      id: "dev-7",
      name: "Liam O'Connor",
      username: "liam_mobile",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
      role: "Mobile App Specialist",
      company: "AppCrafted",
      location: "Dublin, Ireland",
      timezone: "UTC+1 (IST)",
      experienceYears: 4,
      experienceLevel: "Mid-Level",
      availability: "Busy",
      verified: true,
      matchScore: 82,
      matchReason: "Expert in cross-platform mobile development with Flutter and React Native.",
      bio: "Building butter-smooth cross platform iOS and Android applications. Deep experience in offline-first SQLite architectures, push notifications, and native bridge modules.",
      skills: ["Flutter", "React Native", "TypeScript", "iOS", "Android", "Swift", "Firebase"],
      collaborationTypes: ["Side Projects", "Co-founder"],
      github: "https://github.com/liamoconnor-mobile",
      linkedin: "https://linkedin.com/in/liamoconnor",
      portfolio: "https://liamoconnor.app",
      connectionStatus: "none",
      isOnline: false,
      lastActive: "Yesterday",
      experienceTimeline: [
        { role: "Senior Mobile Developer", company: "AppCrafted", period: "2021 - Present", description: "Shipped 4 commercial apps on Google Play and App Store with 4.8+ ratings." }
      ],
      projects: [
        {
          name: "PulseFit Tracker",
          description: "Offline-first open source workout logger with Bluetooth heart rate sync.",
          technologies: ["Flutter", "Dart", "SQLite"],
          stars: 530,
          github: "https://github.com/liam/pulsefit",
          demo: "https://pulsefit.app"
        }
      ],
      reviews: []
    },
    {
      id: "dev-8",
      name: "Kenji Sato",
      username: "kenjisato_backend",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
      role: "Distributed Systems & Go Dev",
      company: "Tokyo Cloud Engine",
      location: "Tokyo, Japan",
      timezone: "UTC+9 (JST)",
      experienceYears: 8,
      experienceLevel: "Lead/Staff",
      availability: "Available",
      verified: true,
      matchScore: 93,
      matchReason: "Matches high performance distributed backend architecture with Go & Redis.",
      bio: "Distributed consensus, raft algorithms, and low latency streaming services. Passionate about open-source message queues and database internals.",
      skills: ["Go", "PostgreSQL", "Redis", "Docker", "Kubernetes", "C++", "Python"],
      collaborationTypes: ["Open Source", "Startup MVP"],
      github: "https://github.com/kenjisato",
      linkedin: "https://linkedin.com/in/kenji-sato-eng",
      portfolio: "https://kenjisato.dev",
      connectionStatus: "none",
      isOnline: true,
      lastActive: "30m ago",
      experienceTimeline: [
        { role: "Staff Backend Engineer", company: "Tokyo Cloud Engine", period: "2020 - Present", description: "Engineered distributed streaming broker processing 200k msgs/second." }
      ],
      projects: [
        {
          name: "NanoRaft",
          description: "Minimal, educational implementation of Raft consensus protocol in pure Go.",
          technologies: ["Go", "Networking"],
          stars: 1890,
          github: "https://github.com/kenji/nanoraft",
          demo: "https://nanoraft.io"
        }
      ],
      reviews: []
    }
  ],

  // Collaboration Projects
  projects: [
    {
      id: "proj-1",
      title: "AI Developer Collaboration Platform",
      tagline: "Intelligent matchmaker and live pair programming workspace for developers.",
      description: "Building the next generation collaborative platform that unites developers worldwide with intelligent skill matching, WebRTC low-latency voice, and real-time code sharing.",
      requiredSkills: ["React", "Node.js", "Python", "AI/ML"],
      projectType: "Startup MVP",
      visibility: "Public",
      teamSize: 4,
      maxTeamSize: 6,
      progress: 68,
      deadline: "Nov 30, 2026",
      owner: "user-current",
      members: [
        { id: "user-current", name: "Jordan Lee", role: "Frontend Lead", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" },
        { id: "dev-1", name: "Alex Johnson", role: "UI Systems Dev", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" },
        { id: "dev-2", name: "Sarah Williams", role: "AI Pipeline Lead", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80" },
        { id: "dev-3", name: "David Chen", role: "Backend Architect", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80" }
      ],
      openRoles: ["Rust Voice Engineer", "DevOps Engineer"],
      tasks: [
        { id: "t-1", title: "Complete WebRTC audio signaling state machine", status: "in-progress", priority: "high", assignee: "Alex Johnson" },
        { id: "t-2", title: "Integrate vector embeddings for skill matcher", status: "completed", priority: "high", assignee: "Sarah Williams" },
        { id: "t-3", title: "Configure Redis pub/sub for real-time chat", status: "completed", priority: "medium", assignee: "David Chen" },
        { id: "t-4", title: "Implement dark mode neon spark animation tokens", status: "completed", priority: "low", assignee: "Jordan Lee" },
        { id: "t-5", title: "Set up Docker compose & production CI/CD", status: "todo", priority: "medium", assignee: "Unassigned" }
      ],
      discussions: [
        {
          id: "d-1",
          author: "Sarah Williams",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
          time: "2 hours ago",
          content: "I benchmarked our developer skill matching algorithm with 1,000 synthetic test profiles. Cosine similarity on sentence transformers gives 94%+ accuracy for tech stack relevance!",
          likes: 4
        },
        {
          id: "d-2",
          author: "David Chen",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
          time: "1 hour ago",
          content: "Awesome! The Go websocket handler is tested and ready to stream real-time match events straight to the dashboard client.",
          likes: 3
        }
      ],
      files: [
        { name: "architecture-diagram-v2.pdf", size: "2.4 MB", type: "PDF", date: "Yesterday" },
        { name: "api-specs-v1.yaml", size: "84 KB", type: "Code", date: "3 days ago" },
        { name: "figma-ui-kit-export.fig", size: "14.2 MB", type: "Design", date: "Oct 2, 2026" }
      ],
      activity: [
        { user: "Sarah Williams", action: "completed task 'Integrate vector embeddings for skill matcher'", time: "2h ago" },
        { user: "David Chen", action: "pushed commit 'feat(api): optimize connection pooling'", time: "4h ago" },
        { user: "Jordan Lee", action: "created new milestone 'Beta Release'", time: "1d ago" }
      ]
    },
    {
      id: "proj-2",
      title: "Cloud-Native CLI Tool for Kubernetes",
      tagline: "High-speed multi-cluster monitoring and automated remediation CLI.",
      description: "An open-source interactive terminal tool written in Go that simplifies multi-cluster telemetry, ingress route debugging, and ephemeral pod introspection.",
      requiredSkills: ["Go", "Kubernetes", "Docker", "DevOps"],
      projectType: "Open Source",
      visibility: "Public",
      teamSize: 3,
      maxTeamSize: 5,
      progress: 42,
      deadline: "Dec 15, 2026",
      owner: "dev-3",
      members: [
        { id: "dev-3", name: "David Chen", role: "Maintainer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80" },
        { id: "dev-5", name: "Marcus Vance", role: "Cloud Infra", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80" },
        { id: "dev-8", name: "Kenji Sato", role: "Core Engine", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80" }
      ],
      openRoles: ["Technical Writer", "Frontend / Web Doc Dev"],
      tasks: [
        { id: "t-21", title: "Implement cluster topology ASCII renderer", status: "in-progress", priority: "high", assignee: "Kenji Sato" },
        { id: "t-22", title: "Add OAuth2 and kubeconfig token refresh", status: "todo", priority: "medium", assignee: "David Chen" }
      ],
      discussions: [],
      files: [],
      activity: [
        { user: "Marcus Vance", action: "setup GitHub Actions matrix tests on Ubuntu, MacOS and Windows", time: "1d ago" }
      ]
    },
    {
      id: "proj-3",
      title: "Real-time Collaborative Canvas Whiteboard",
      tagline: "Figma-like infinite canvas with CRDT synchronization and voice rooms.",
      description: "Infinite vector canvas with pressure-sensitive drawing, sticky notes, flowchart node connectors, and peer-to-peer audio communication via WebRTC.",
      requiredSkills: ["React", "TypeScript", "UI/UX", "WebAssembly"],
      projectType: "Hackathon",
      visibility: "Public",
      teamSize: 2,
      maxTeamSize: 4,
      progress: 85,
      deadline: "Oct 24, 2026",
      owner: "dev-6",
      members: [
        { id: "dev-6", name: "Priya Patel", role: "UI Architect", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80" },
        { id: "user-current", name: "Jordan Lee", role: "Fullstack Eng", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" }
      ],
      openRoles: ["Canvas Performance Specialist"],
      tasks: [
        { id: "t-31", title: "Smooth Bezier curve pen interpolation", status: "completed", priority: "high", assignee: "Priya Patel" }
      ],
      discussions: [],
      files: [],
      activity: []
    }
  ],

  // Chat Conversations
  conversations: [
    {
      id: "chat-alex",
      participantId: "dev-1",
      participantName: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      role: "Frontend Developer",
      isOnline: true,
      unreadCount: 2,
      lastMessageTime: "10:42 AM",
      messages: [
        {
          id: "m-1",
          senderId: "dev-1",
          senderName: "Alex Johnson",
          time: "10:30 AM",
          type: "text",
          content: "Hey Jordan! Checked out your recent PR on the DevCollab dashboard. The responsive layout on tablet and mobile looks super slick! 🚀",
          reactions: [{ emoji: "👍", count: 1, reacted: true }]
        },
        {
          id: "m-2",
          senderId: "user-current",
          senderName: "Jordan Lee",
          time: "10:35 AM",
          type: "text",
          content: "Thanks Alex! Did you manage to verify the Lucide icon alignments and the 3-bar logo SVG pulse?",
          reactions: []
        },
        {
          id: "m-3",
          senderId: "dev-1",
          senderName: "Alex Johnson",
          time: "10:40 AM",
          type: "code",
          language: "typescript",
          content: `// Testing SVG Spark Animation Trigger\nconst sparkPulse = (intensity: number) => {\n  return intensity > 0.8 ? 'logo-spark-burst' : 'logo-spark';\n};\n\nconsole.log(sparkPulse(0.95)); // -> 'logo-spark-burst'`,
          reactions: [{ emoji: "🔥", count: 2, reacted: false }]
        },
        {
          id: "m-4",
          senderId: "dev-1",
          senderName: "Alex Johnson",
          time: "10:42 AM",
          type: "text",
          content: "Works like a charm! Ready for a quick 5-min voice sync whenever you have a moment?",
          reactions: []
        }
      ]
    },
    {
      id: "chat-sarah",
      participantId: "dev-2",
      participantName: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      role: "AI/ML Engineer",
      isOnline: true,
      unreadCount: 0,
      lastMessageTime: "Yesterday",
      messages: [
        {
          id: "ms-1",
          senderId: "dev-2",
          senderName: "Sarah Williams",
          time: "Yesterday, 3:15 PM",
          type: "text",
          content: "Hey Jordan! I finished fine-tuning our developer recommendation model. It ranks devs by skills and active availability.",
          reactions: [{ emoji: "❤️", count: 1, reacted: true }]
        },
        {
          id: "ms-2",
          senderId: "user-current",
          senderName: "Jordan Lee",
          time: "Yesterday, 3:20 PM",
          type: "text",
          content: "That is huge Sarah! Let's wire it to the Discover page filter pipeline.",
          reactions: []
        }
      ]
    },
    {
      id: "chat-priya",
      participantId: "dev-6",
      participantName: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
      role: "UI/UX & Creative Frontend",
      isOnline: true,
      unreadCount: 0,
      lastMessageTime: "Oct 6",
      messages: [
        {
          id: "mp-1",
          senderId: "dev-6",
          senderName: "Priya Patel",
          time: "Oct 6, 2:40 PM",
          type: "text",
          content: "Hey Jordan! Pushed the updated neon cyan color variables and glassmorphism cards. Check them out in Settings > Theme!",
          reactions: [{ emoji: "✨", count: 1, reacted: true }]
        }
      ]
    }
  ],

  // Voice Call History
  callHistory: [
    {
      id: "call-1",
      participantId: "dev-1",
      participantName: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      type: "incoming", // incoming, outgoing, missed
      status: "completed",
      duration: "14m 28s",
      timestamp: "Today, 11:15 AM",
      quality: "HD Audio"
    },
    {
      id: "call-2",
      participantId: "dev-2",
      participantName: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      type: "outgoing",
      status: "completed",
      duration: "08m 10s",
      timestamp: "Yesterday, 4:20 PM",
      quality: "HD Audio"
    },
    {
      id: "call-3",
      participantId: "dev-4",
      participantName: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      type: "incoming",
      status: "missed",
      duration: "0s",
      timestamp: "Oct 5, 2:10 PM",
      quality: "Failed"
    }
  ],

  // Notifications
  notifications: [
    {
      id: "notif-1",
      type: "message",
      title: "New Message from Alex Johnson",
      content: "Works like a charm! Ready for a quick 5-min voice sync whenever you have a moment?",
      time: "2m ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      actionType: "chat",
      actionId: "chat-alex"
    },
    {
      id: "notif-2",
      type: "connection_request",
      title: "Connection Request",
      content: "Elena Rostova wants to connect with you based on shared interest in WebAssembly and Systems architecture.",
      time: "1 hour ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      actionType: "connect",
      actionId: "dev-4"
    },
    {
      id: "notif-3",
      type: "project_invite",
      title: "Project Invitation",
      content: "David Chen invited you to collaborate on 'Cloud-Native CLI Tool for Kubernetes' as Frontend/Docs Contributor.",
      time: "4 hours ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      actionType: "project",
      actionId: "proj-2"
    },
    {
      id: "notif-4",
      type: "recommendation",
      title: "96% Developer Match",
      content: "David Chen just updated his availability to Available. Matches your Go & Kubernetes stack.",
      time: "Yesterday",
      read: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      actionType: "profile",
      actionId: "dev-3"
    },
    {
      id: "notif-5",
      type: "task",
      title: "Task Assigned",
      content: "You were assigned to 'Implement dark mode neon spark animation tokens' in AI Developer Platform.",
      time: "2 days ago",
      read: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      actionType: "project",
      actionId: "proj-1"
    }
  ],

  // Activity History Items
  activityHistory: [
    { type: "search", query: "Find React developers with 3+ years experience", time: "Today, 10:15 AM" },
    { type: "search", query: "Python developers interested in AI", time: "Today, 09:30 AM" },
    { type: "voice", detail: "Voice call with Alex Johnson (14m 28s)", time: "Today, 11:15 AM" },
    { type: "project", detail: "Updated task status in AI Developer Collaboration Platform", time: "Yesterday, 05:40 PM" },
    { type: "profile_view", detail: "Viewed Sarah Williams' profile", time: "Yesterday, 03:10 PM" }
  ]
};

window.DevData = DevData;
