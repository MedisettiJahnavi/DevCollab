# DevCollab — Modern Developers’ Collaboration Platform

> **"Find developers. Connect. Collaborate. Build."**

DevCollab is a high-performance, responsive developer collaboration and networking platform designed for modern software engineers, open-source maintainers, and tech creators. It unites intelligent developer discovery, real-time code-oriented messaging, WebRTC-quality voice communication, and agile project management into a single cohesive experience.

---

## ✦ 1. Branding & Logo Identity

The DevCollab brand identity embodies modern software engineering, personal growth, and technological breakthrough.

```
       ✦ (Innovation, AI & Creativity)
       ▮
   ▮   ▮
▮  ▮   ▮
1  2   3
```

### The Three Vertical Rectangular Bars
* **Bar 1 (Shortest · Electric Cyan `#00D9FF`):** **Developer Growth** — Learning foundational skills, expanding horizons, and starting out in tech.
* **Bar 2 (Medium · Neon Indigo `#6366F1`):** **Progress** — Gaining experience, leveling up engineering competence, and building momentum.
* **Bar 3 (Tallest · Electric Violet `#A855F7`):** **Collaboration & Building Projects Together** — Reaching high impact by partnering with peers to build production-grade platforms.

### The Innovation Spark (`✦`)
* Orbiting directly above the tallest bar is a glowing 4-point geometric spark representing **Innovation**, **AI & Autonomous Agents**, **Creativity**, **New Ideas**, and **Next-Gen Technologies**.

### Assets Provided
* `assets/logo.svg` — Full horizontal brand logo with icon, wordmark, and PRO badge.
* `assets/app-icon.svg` — Standalone squircle mobile app icon with deep carbon background and glowing aura.
* `js/logo.js` — Dynamic inline SVG renderer with animated pulse and customizable sizes.

---

## 🚀 2. Application Architecture & Core Areas

DevCollab is built with a clean, modular architecture:

```
├── index.html                  # Main SPA entry point
├── start-server.ps1            # Lightweight zero-dependency local web server
├── css/
│   └── custom.css              # Glassmorphism, neon animations, and scrollbars
├── assets/
│   ├── logo.svg                # Full SVG brand logo
│   └── app-icon.svg            # Standalone squircle application icon
└── js/
    ├── app.js                  # Application orchestrator, router & keyboard shortcuts
    ├── data.js                 # Seed store with realistic developer profiles & projects
    ├── state.js                # Central reactive state manager & LocalStorage sync
    ├── logo.js                 # DevCollab SVG generator & branding visual system
    ├── audio-visualizer.js     # Glowing audio waveform canvas visualizer engine
    ├── components.js           # Layout, persistent sidebar, mobile bottom nav, headers & modals
    └── views/
        ├── auth.js             # Authentication (Login, Signup, Forgot, 4-step Onboarding)
        ├── dashboard.js        # Developer dashboard with AI matches & live metrics
        ├── discover.js         # Intelligent search engine & multi-attribute filter suite
        ├── profile.js          # Detailed developer profile, 52-week heatmap & reviews
        ├── chat.js             # Real-time messaging, code snippets, voice notes & reactions
        ├── voice.js            # Dedicated voice communication room & call history
        ├── projects.js         # Collaboration project dashboard & Kanban task board
        ├── notifications.js    # Notification center with one-click approvals
        └── settings.js         # Complete settings: Profile, theme, privacy & history logs
```

---

## ⚡ 3. Key Feature Walkthrough

### 1. Authentication & Onboarding
* **Login & Registration:** Email/password credentials, show/hide password toggle, remember me, forgot password simulator, and Google/GitHub OAuth integrations.
* **1-Click Demo Login:** Instant testing mode to explore the platform with a pre-configured user profile.
* **4-Step Onboarding Wizard:**
  1. *Basic Info:* Profile picture presets, full name, username, location, short bio.
  2. *Professional Info:* Current position, company, developer role, and availability status (🟢 Available, 🟡 Part-time, 🔴 Busy).
  3. *Skills:* Multi-tag selection across 40+ technologies with custom skill input.
  4. *Socials & Collaboration:* GitHub, LinkedIn, Portfolio URLs, and preferred collaboration formats (Hackathons, Side Projects, Open Source, Co-founder).

### 2. Intelligent Developer Discovery (`Discover.js`)
* **Natural Language Queries:** Search using everyday developer language:
  * *"React developers with 3+ years experience"*
  * *"Python developers interested in AI"*
  * *"Backend developers with Node.js"*
  * *"Available for collaboration"*
* **Smart Match Score Breakdown:** Calculates synergy percentages (e.g. `96% Match`) with detailed explanations of why two developers match.
* **Multi-Filter Controls:** Filter by Role, multi-select Skills, Experience level, Availability, Remote-only, and sort by Best Match, Experience, Activity, or Newest.
* **View Modes:** Toggle between rich responsive Grid view and List view.

### 3. Comprehensive Developer Profiles (`Profile.js`)
* **Profile Header:** Cover banner, avatar with live presence beacon, verified badge, current position, location, and timezone.
* **Primary Actions:** Direct Message, Voice Call, Connect/Pending toggle, and Project Invitation modal.
* **Tabs:**
  * **Overview & Bio:** Detailed developer bio and collaboration preferences.
  * **Skills:** Categorized neon badge tags.
  * **Experience Timeline:** Interactive career timeline of past positions and achievements.
  * **Projects & Repositories:** Cards with GitHub repository links, star counts, and live demos.
  * **Contribution Activity:** Simulated 52-week GitHub-style contribution heatmap.
  * **Peer Reviews:** Testimonials and ratings from previous collaboration partners.

### 4. Real-Time Developer Messaging (`Chat.js`)
* **Conversations Sidebar:** Search chats, unread counter badges, and online developers carousel.
* **Rich Developer Messages:**
  * Formatted text with emojis.
  * Code snippets with syntax styling, copy-to-clipboard button, and language indicators (TypeScript, Python, Go, Rust, SQL).
  * Simulated voice note recordings with waveform playback.
  * Double check mark read receipts (`✓✓`).
  * Message reactions (`👍`, `❤️`, `🚀`, `🔥`, `💡`, `💻`).
  * Quote reply and message deletion.
  * Simulated live typing indicator (*"Alex Johnson is typing..."*).

### 5. Dedicated Voice Communication (`Voice.js`)
* **WebRTC HD Voice Simulation:** Start voice rooms directly from profiles, direct messages, or the voice tab.
* **Interactive Glowing Audio Waveform:** Built with HTML5 Canvas and harmonics, supporting both synthetic speech oscillation and real hardware microphone inputs.
* **Call Controls:** Mute/unmute microphone, speaker/headphone toggle, hardware microphone input test, invite peers to room, and end call.
* **Call History Logs:** Chronological record of incoming, outgoing, missed, and completed calls with duration and one-click redial.

### 6. Project Collaboration & Kanban (`Projects.js`)
* **Project Dashboard:** Overview with milestone progress bars, required skills, and team members.
* **Interactive Kanban Board:** Drag/move tasks between *To Do*, *In Progress*, and *Completed* with priority tags and assignees.
* **Discussion Threads:** Team architectural forum with threaded posts and comments.
* **Files & Resources:** Centralized repository for architectural PDFs, Figma links, and API specs.
* **Project Creation:** Modal with required skills selection, team size, project type, and deadlines.

### 7. Notification Center (`Notifications.js`)
* Categorized tabs: *All*, *Unread*, *Messages*, *Connection Requests*, *Projects & Tasks*.
* Interactive action buttons: One-click "Accept Connection", "Join Project", and "Reply in Chat".

### 8. Settings Suite (`Settings.js`)
* **Personal Details:** Edit profile photo, bio, job position, skills, and links.
* **Appearance & Theme:** Toggle between **Dark Mode**, **Light Mode**, or **System Default**, plus 4 neon accent themes (**Electric Cyan**, **Neon Violet**, **Emerald Cyber**, **Amber Blaze**).
* **Privacy:** Control profile search visibility, online status beacon, and messaging permissions.
* **History Management:** Review and clear search query history and voice call logs.
* **Security:** Change password, active session audit, and Two-Factor Authentication (2FA) toggle.

---

## 💻 4. Running DevCollab

### Option A: Direct Browser Launch (Zero Installation)
Simply double-click `index.html` or open it in any modern browser (Chrome, Edge, Firefox, Safari). All features, audio visualizers, and state persistence will run immediately.

### Option B: Local Web Server (PowerShell)
To run a local HTTP server with automatic browser opening:
1. Open PowerShell in this folder.
2. Run:
   ```powershell
   .\start-server.ps1
   ```
3. The server starts at `http://localhost:5050/` and automatically launches your browser.

---

## ⌨️ 5. Keyboard Shortcuts

* <kbd>Ctrl</kbd> + <kbd>K</kbd> (or <kbd>Cmd</kbd> + <kbd>K</kbd>): Open Command Search Modal.
* <kbd>Escape</kbd>: Close active modal or popover.
* <kbd>Enter</kbd> (in chat): Send message.

---

## 🛡️ License & Credits
Created for the DevCollab developer community. Built with clean HTML5, Tailwind CSS, Lucide Icons, and Web Audio API.
