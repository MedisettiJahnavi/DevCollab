/**
 * DevCollab Dashboard View
 */

const DashboardView = {
  render(state) {
    const user = state.currentUser;
    const hour = new Date().getHours();
    const greetingTime = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    // Top suggested developers (ranked by match score)
    const suggestedDevs = [...state.developers].sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);

    return `
      <div class="space-y-8 animate-fade-in pb-12">
        <!-- Top Welcome Banner & Search Hero -->
        <div class="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/70 border border-slate-800 shadow-2xl">
          <!-- Ambient glowing gradients -->
          <div class="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute right-40 -bottom-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-2">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>Active Developer Network · 2,400+ Developers Online</span>
              </div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                ${greetingTime}, ${user.name} 👋
              </h1>
              <p class="text-sm text-slate-400 max-w-xl">
                Discover developers matching your skills, collaborate on open-source & MVP projects, and communicate in real time with high-fidelity voice.
              </p>
            </div>

            <!-- Quick Action Buttons -->
            <div class="flex flex-wrap items-center gap-3">
              <button onclick="store.navigate('discover')"
                      class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2">
                <i data-lucide="compass" class="w-4 h-4"></i>
                <span>Discover Developers</span>
              </button>
              <button onclick="store.state.modals.createProject = true; store.notify();"
                      class="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2">
                <i data-lucide="plus" class="w-4 h-4 text-cyan-400"></i>
                <span>New Project</span>
              </button>
            </div>
          </div>

          <!-- Hero Global Search Bar -->
          <div class="relative mt-6">
            <div class="relative flex items-center">
              <i data-lucide="search" class="w-5 h-5 text-cyan-400 absolute left-4"></i>
              <input type="text" id="dashboard-hero-search"
                     placeholder="Search developers, skills, roles, or projects... (e.g. 'React with 3+ years', 'AI/ML Engineer')"
                     onkeydown="if(event.key === 'Enter') { store.setDiscoverFilter('query', this.value); store.navigate('discover'); }"
                     class="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 shadow-inner backdrop-blur-md" />
              <button onclick="const val = document.getElementById('dashboard-hero-search').value; store.setDiscoverFilter('query', val); store.navigate('discover');"
                      class="absolute right-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all">
                Search
              </button>
            </div>
          </div>
        </div>

        <!-- Network Metrics Stats Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="glass-card p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-medium">Developer Matches</span>
              <div class="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <i data-lucide="users" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="text-2xl font-bold text-white tracking-tight">84</div>
            <div class="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <i data-lucide="trending-up" class="w-3 h-3"></i>
              <span>+12 new this week</span>
            </div>
          </div>

          <div class="glass-card p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-medium">Active Projects</span>
              <div class="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <i data-lucide="folder-git-2" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="text-2xl font-bold text-white tracking-tight">${state.projects.length}</div>
            <div class="text-[11px] text-slate-400 mt-1">2 in progress · 1 in planning</div>
          </div>

          <div class="glass-card p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-medium">Voice Collaborations</span>
              <div class="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <i data-lucide="mic" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="text-2xl font-bold text-white tracking-tight">18 hrs</div>
            <div class="text-[11px] text-purple-400 mt-1">HD latency &lt; 24ms</div>
          </div>

          <div class="glass-card p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-medium">Profile Match Rate</span>
              <div class="p-2 rounded-xl bg-pink-500/10 text-pink-400">
                <i data-lucide="sparkles" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="text-2xl font-bold text-white tracking-tight">96%</div>
            <div class="text-[11px] text-cyan-400 mt-1">Based on fullstack stack</div>
          </div>
        </div>

        <!-- Section: Suggested Developers Based on Skills & Interests -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-white flex items-center gap-2">
                <span>Suggested Developers</span>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  AI Matched
                </span>
              </h2>
              <p class="text-xs text-slate-400 mt-0.5">Recommended collaborators based on your skills, tech stack, and experience.</p>
            </div>

            <button onclick="store.navigate('discover')"
                    class="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group">
              <span>View All Developers</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"></i>
            </button>
          </div>

          <!-- Developer Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${suggestedDevs.map(dev => this.renderDeveloperCard(dev, state)).join('')}
          </div>
        </div>

        <!-- Section: Active Collaboration Projects & Activity Split -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Active Collaboration Projects (2 Cols) -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-bold text-white">Active Collaboration Projects</h2>
                <p class="text-xs text-slate-400">Projects you are building or leading with other devs.</p>
              </div>
              <button onclick="store.navigate('projects')" class="text-xs font-semibold text-cyan-400 hover:underline">
                Explore Projects →
              </button>
            </div>

            <div class="space-y-3">
              ${state.projects.slice(0, 2).map(project => `
                <div onclick="store.navigate('projects', { projectId: '${project.id}' })"
                     class="glass-card p-5 rounded-2xl border border-slate-800 hover:border-slate-700 cursor-pointer transition-all group">
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          ${project.projectType}
                        </span>
                        <span class="text-xs text-slate-400">Deadline: ${project.deadline}</span>
                      </div>
                      <h3 class="text-base font-bold text-white group-hover:text-cyan-400 transition-colors mt-1.5">
                        ${project.title}
                      </h3>
                      <p class="text-xs text-slate-400 mt-1 line-clamp-2">${project.description}</p>
                    </div>

                    <!-- Progress Ring / Percentage -->
                    <div class="text-right flex-shrink-0">
                      <div class="text-sm font-bold text-white font-mono">${project.progress}%</div>
                      <span class="text-[10px] text-slate-500">Progress</span>
                    </div>
                  </div>

                  <!-- Progress Bar -->
                  <div class="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full" style="width: ${project.progress}%"></div>
                  </div>

                  <!-- Footer: Members & Required Skills -->
                  <div class="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/60">
                    <!-- Members Stack -->
                    <div class="flex items-center -space-x-2">
                      ${project.members.map(m => `
                        <img src="${m.avatar}" alt="${m.name}" title="${m.name} (${m.role})" class="w-6 h-6 rounded-full object-cover ring-2 ring-slate-900" />
                      `).join('')}
                      <span class="text-xs text-slate-400 ml-3">${project.members.length} / ${project.maxTeamSize} team</span>
                    </div>

                    <!-- Required Skills Badges -->
                    <div class="flex flex-wrap gap-1.5">
                      ${project.requiredSkills.slice(0, 3).map(skill => `
                        <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
                          ${skill}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Recent Network Activity & Quick Shortcuts (1 Col) -->
          <div class="space-y-4">
            <h2 class="text-lg font-bold text-white">Network Activity</h2>
            
            <div class="glass-card p-4 rounded-2xl border border-slate-800 space-y-3">
              <div class="flex items-start gap-3 pb-3 border-b border-slate-800/80">
                <div class="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 flex-shrink-0 mt-0.5">
                  <i data-lucide="git-pull-request" class="w-4 h-4"></i>
                </div>
                <div class="text-xs">
                  <span class="text-white font-semibold">David Chen</span> pushed 3 commits to <span class="text-cyan-400">kubewatchdog</span>.
                  <div class="text-[10px] text-slate-500 mt-0.5">15 mins ago</div>
                </div>
              </div>

              <div class="flex items-start gap-3 pb-3 border-b border-slate-800/80">
                <div class="p-2 rounded-xl bg-purple-500/10 text-purple-400 flex-shrink-0 mt-0.5">
                  <i data-lucide="phone-call" class="w-4 h-4"></i>
                </div>
                <div class="text-xs">
                  Completed voice sync with <span class="text-white font-semibold">Alex Johnson</span> (14m).
                  <div class="text-[10px] text-slate-500 mt-0.5">1 hour ago</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 flex-shrink-0 mt-0.5">
                  <i data-lucide="user-check" class="w-4 h-4"></i>
                </div>
                <div class="text-xs">
                  Connected with <span class="text-white font-semibold">Sarah Williams</span>.
                  <div class="text-[10px] text-slate-500 mt-0.5">Yesterday</div>
                </div>
              </div>
            </div>

            <!-- Developer Discovery Fast Filter Tags -->
            <div class="glass-card p-4 rounded-2xl border border-slate-800">
              <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">Popular Tech Stacks</div>
              <div class="flex flex-wrap gap-1.5">
                ${['React', 'Next.js', 'Python', 'AI/ML', 'Go', 'Rust', 'TypeScript', 'Kubernetes'].map(tag => `
                  <button onclick="store.setDiscoverFilter('query', '${tag}'); store.navigate('discover');"
                          class="px-2.5 py-1 rounded-lg text-xs bg-slate-800/80 hover:bg-cyan-500/15 hover:text-cyan-400 hover:border-cyan-500/30 border border-slate-700/80 text-slate-300 transition-colors">
                    #${tag}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Reusable Developer Card Component
   */
  renderDeveloperCard(dev, state) {
    const isConnected = dev.connectionStatus === 'connected';
    const isPending = dev.connectionStatus === 'pending';

    let availDot = 'bg-emerald-400';
    let availText = 'Available for Projects';
    if (dev.availability === 'Part-time') {
      availDot = 'bg-amber-400';
      availText = 'Part-time / Mentoring';
    } else if (dev.availability === 'Busy') {
      availDot = 'bg-rose-400';
      availText = 'In a Project';
    }

    return `
      <div class="glass-card p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group">
        <div>
          <!-- Top Row: Avatar, Info, Match Score Badge -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-3">
              <div class="relative cursor-pointer flex-shrink-0" onclick="store.navigate('profile', { devId: '${dev.id}' })">
                <img src="${dev.avatar}" alt="${dev.name}" class="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-800 group-hover:ring-cyan-500/50 transition-all" />
                ${dev.isOnline ? `
                  <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 status-beacon-online"></span>
                ` : ''}
              </div>

              <div>
                <div class="flex items-center gap-1.5 flex-wrap">
                  <h3 onclick="store.navigate('profile', { devId: '${dev.id}' })"
                      class="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer">
                    ${dev.name}
                  </h3>
                  ${dev.verified ? `
                    <i data-lucide="check-circle" class="w-3.5 h-3.5 text-cyan-400" title="Verified Developer"></i>
                  ` : ''}
                </div>
                <div class="text-xs text-slate-400">@${dev.username} · ${dev.role}</div>
                <div class="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                  <i data-lucide="map-pin" class="w-3 h-3"></i>
                  <span>${dev.location}</span>
                </div>
              </div>
            </div>

            <!-- Match Score Badge -->
            <div class="text-right flex-shrink-0">
              <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full match-score-badge text-cyan-300 text-xs font-bold font-mono">
                <i data-lucide="sparkles" class="w-3 h-3 text-cyan-400"></i>
                <span>${dev.matchScore}%</span>
              </div>
              <div class="text-[10px] text-slate-500 mt-0.5">Match</div>
            </div>
          </div>

          <!-- Availability & Experience Pill -->
          <div class="flex items-center gap-2 mt-3 pt-3 border-t border-slate-800/60">
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800 text-[11px] font-medium text-slate-300">
              <span class="w-2 h-2 rounded-full ${availDot}"></span>
              <span>${availText}</span>
            </span>
            <span class="text-[11px] text-slate-400">
              ${dev.experienceYears} yrs exp (${dev.experienceLevel})
            </span>
          </div>

          <!-- Match explanation -->
          <div class="text-[11px] text-slate-400 mt-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 italic">
            "${dev.matchReason}"
          </div>

          <!-- Skills Badges -->
          <div class="flex flex-wrap gap-1.5 mt-3">
            ${dev.skills.slice(0, 4).map(skill => `
              <span class="px-2 py-0.5 rounded-lg text-xs font-medium glow-tag">
                ${skill}
              </span>
            `).join('')}
            ${dev.skills.length > 4 ? `
              <span class="px-1.5 py-0.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-400">
                +${dev.skills.length - 4}
              </span>
            ` : ''}
          </div>
        </div>

        <!-- Action Buttons Row -->
        <div class="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800">
          <button onclick="store.navigate('profile', { devId: '${dev.id}' })"
                  class="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                  title="View Profile">
            <i data-lucide="user" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline">Profile</span>
          </button>

          <button onclick="
            const chat = store.state.conversations.find(c => c.participantId === '${dev.id}') || { id: 'chat-${dev.id}', participantId: '${dev.id}', participantName: '${dev.name}', avatar: '${dev.avatar}', role: '${dev.role}', isOnline: true, unreadCount: 0, messages: [] };
            if (!store.state.conversations.some(c => c.id === chat.id)) { store.state.conversations.push(chat); }
            store.navigate('chats', { chatId: chat.id });
          "
                  class="py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 border border-transparent text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                  title="Direct Message">
            <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline">Message</span>
          </button>

          <button onclick="store.startVoiceCall('${dev.id}')"
                  class="py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 border border-transparent text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                  title="Voice Call">
            <i data-lucide="phone-call" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline">Voice</span>
          </button>

          <button onclick="store.toggleConnection('${dev.id}')"
                  class="py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                    isConnected 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/40' 
                      : isPending 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                      : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-sm shadow-cyan-500/20'
                  }"
                  title="${isConnected ? 'Connected' : isPending ? 'Pending' : 'Connect'}">
            <i data-lucide="${isConnected ? 'user-check' : isPending ? 'clock' : 'user-plus'}" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline">${isConnected ? 'Connected' : isPending ? 'Pending' : 'Connect'}</span>
          </button>
        </div>
      </div>
    `;
  }
};

window.DashboardView = DashboardView;
