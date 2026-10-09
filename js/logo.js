/**
 * DevCollab Logo & Brand Visual System
 * 
 * Icon Concept:
 * - Three vertical rectangular bars increasing in height:
 *   Bar 1 (Short): Developer Growth
 *   Bar 2 (Medium): Progress
 *   Bar 3 (Tall): Collaboration & Building Together
 * - Spark/Neon Effect (✦) orbiting/bursting from the tallest bar:
 *   Represents Innovation, AI, Creativity, New ideas, Technology.
 */

const DevLogo = {
  /**
   * Generates the SVG for the standalone 3-bar + spark icon
   * @param {number} size - base size in px (e.g. 32, 40, 48)
   * @param {boolean} animated - whether to include the subtle pulsing spark
   * @returns {string} SVG HTML string
   */
  renderIcon(size = 36, animated = true) {
    const scale = size / 36;
    const sparkClass = animated ? 'logo-spark' : '';
    const barClass = animated ? 'logo-bar-3' : '';

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="select-none flex-shrink-0">
        <defs>
          <!-- Gradient for Bar 1 (Growth) -->
          <linearGradient id="bar1Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#00D9FF" />
            <stop offset="100%" stop-color="#0284C7" />
          </linearGradient>
          <!-- Gradient for Bar 2 (Progress) -->
          <linearGradient id="bar2Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38BDF8" />
            <stop offset="100%" stop-color="#6366F1" />
          </linearGradient>
          <!-- Gradient for Bar 3 (Collaboration & Building) -->
          <linearGradient id="bar3Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#818CF8" />
            <stop offset="100%" stop-color="#A855F7" />
          </linearGradient>
          <!-- Spark Radiant Gradient -->
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#00FFFF" />
            <stop offset="50%" stop-color="#C084FC" />
            <stop offset="100%" stop-color="#FF3DF5" />
          </linearGradient>
          <!-- Subtle Glow Filter -->
          <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="sparkGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 2 -0.1" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- Ambient Glow behind tallest bar and spark -->
        <circle cx="28" cy="14" r="14" fill="#6366F1" opacity="0.22" filter="blur(6px)" />
        <circle cx="34" cy="8" r="8" fill="#00D9FF" opacity="0.35" filter="blur(4px)" />

        <!-- Bar 1: Developer Growth (Shortest) -->
        <rect x="6" y="24" width="7" height="15" rx="3.5" fill="url(#bar1Grad)" />
        
        <!-- Bar 2: Progress (Medium) -->
        <rect x="16" y="16" width="7" height="23" rx="3.5" fill="url(#bar2Grad)" />
        
        <!-- Bar 3: Collaboration & Building Together (Tallest) -->
        <rect class="${barClass}" x="26" y="8" width="7.5" height="31" rx="3.75" fill="url(#bar3Grad)" filter="url(#neonGlow)" />
        
        <!-- Spark ✦ : Innovation, AI & Creativity -->
        <g class="${sparkClass}" style="transform-origin: 36px 7px;">
          <!-- Central Spark Shape (4-point Geometric Diamond Star) -->
          <path d="M 36 2 
                   C 36 5.5, 37.5 7, 41 7 
                   C 37.5 7, 36 8.5, 36 12 
                   C 36 8.5, 34.5 7, 31 7 
                   C 34.5 7, 36 5.5, 36 2 Z" 
                fill="url(#sparkGrad)" 
                filter="url(#sparkGlow)" />
          
          <!-- Micro Accent Particle Dots -->
          <circle cx="41.5" cy="2.5" r="1" fill="#00D9FF" opacity="0.9" />
          <circle cx="30" cy="2" r="0.8" fill="#C084FC" opacity="0.8" />
          <circle cx="39" cy="12" r="0.75" fill="#38BDF8" opacity="0.85" />
        </g>
      </svg>
    `;
  },

  /**
   * Generates the App Icon container (e.g. for App Drawer, Favicon preview, Mobile Screen)
   * @param {number} size - base size in px
   * @returns {string} SVG HTML string
   */
  renderAppIcon(size = 56) {
    return `
      <div class="relative inline-flex items-center justify-center flex-shrink-0 group" style="width: ${size}px; height: ${size}px;">
        <!-- Glowing aura behind icon -->
        <div class="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-indigo-500/20 to-purple-500/30 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300"></div>
        <!-- Squircle border container -->
        <div class="relative w-full h-full rounded-2xl bg-slate-900/90 dark:bg-slate-950/95 border border-slate-700/60 dark:border-slate-800 shadow-xl flex items-center justify-center p-2 backdrop-blur-xl">
          ${this.renderIcon(size * 0.72, true)}
        </div>
      </div>
    `;
  },

  /**
   * Generates Full Logo (Icon + Typography + optional slogan/tagline)
   * @param {number} iconSize - size of the logo icon
   * @param {boolean} showTagline - whether to show "Connect · Collaborate · Build"
   * @returns {string} HTML string
   */
  renderFull(iconSize = 36, showTagline = false) {
    return `
      <div class="inline-flex items-center gap-3 cursor-pointer select-none group">
        <div class="flex-shrink-0 transform group-hover:scale-105 transition-transform duration-200">
          ${this.renderIcon(iconSize, true)}
        </div>
        <div class="flex flex-col justify-center">
          <div class="flex items-center gap-1.5 leading-none">
            <span class="text-xl font-extrabold tracking-tight text-white dark:text-white font-sans">Dev</span>
            <span class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-sans">Collab</span>
            <span class="ml-1 text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">PRO</span>
          </div>
          ${showTagline ? `
            <span class="text-[10px] font-medium tracking-wider text-slate-400 mt-1 uppercase">
              Connect <span class="text-cyan-400">·</span> Collaborate <span class="text-indigo-400">·</span> Build
            </span>
          ` : ''}
        </div>
      </div>
    `;
  }
};

window.DevLogo = DevLogo;
