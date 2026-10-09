/**
 * DevCollab Developer Profile View
 * 
 * Detailed profile page featuring cover backdrop, verified badges, action buttons,
 * about bio, skills badges, experience timeline, portfolio project cards,
 * 52-week contribution heatmap simulator, and peer collaboration reviews.
 */

const ProfileView = {
  activeTab: 'overview', // 'overview', 'projects', 'activity', 'reviews'

  render(state) {
    // If viewing another developer by ID or current user
    const devId = state.selectedDevId;
    const isOwnProfile = !devId || devId === state.currentUser.id;
    const dev = isOwnProfile ? state.currentUser : (state.developers.find(d => d.id === devId) || state.currentUser);

    const isConnected = dev.connectionStatus === 'connected';
    const isPending = dev.connectionStatus === 'pending';

    let availDot = 'bg-emerald-400';
    let availText = 'Available for Collaboration';
    if (dev.availability === 'Part-time') {
      availDot = 'bg-amber-400';
      availText = 'Part-time & Mentorship';
    } else if (dev.availability === 'Busy') {
      availDot = 'bg-rose-400';
      availText = 'Busy in Active Project';
    }

    return `
      <div class="space-y-6 animate-fade-in pb-16">
        <!-- Profile Header Banner -->
        <div class="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
          <!-- Cover Graphic -->
          <div class="h-44 sm:h-52 w-full bg-gradient-to-r from-cyan-900/40 via-indigo-900/40 to-purple-900/40 relative">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,217,255,0.15),transparent_60%)]"></div>
            <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
          </div>

          <!-- Profile Info Container -->
          <div class="px-6 pb-6 pt-0 relative">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-16 sm:-mt-20">
              <!-- Avatar & Identity -->
              <div class="flex items-end gap-4">
                <div class="relative">
                  <img src="${dev.avatar}" alt="${dev.name}"
                       class="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-slate-900 shadow-2xl bg-slate-800" />
                  <span class="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-slate-900 status-beacon-online"></span>
                </div>

                <div class="mb-2">
                  <div class="flex items-center gap-2 flex-wrap">
                    <h1 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight">${dev.name}</h1>
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                      <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
                      <span>Verified Dev</span>
                    </span>
                  </div>

                  <div class="text-xs sm:text-sm text-slate-400 mt-0.5">
                    @${dev.username} · <span class="text-slate-200 font-medium">${dev.role}</span> at <span class="text-cyan-400">${dev.company || 'Open Source'}</span>
                  </div>

                  <div class="flex items-center gap-3 text-xs text-slate-400 mt-2 flex-wrap">
                    <span class="flex items-center gap-1">
                      <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-500"></i>
                      <span>${dev.location}</span>
                    </span>
                    <span class="flex items-center gap-1">
                      <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-500"></i>
                      <span>${dev.timezone || 'UTC'}</span>
                    </span>
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800/80 text-xs font-medium text-slate-300">
                      <span class="w-2 h-2 rounded-full ${availDot}"></span>
                      <span>${availText}</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-wrap items-center gap-2.5 mb-2">
                ${!isOwnProfile ? `
                  <button onclick="
                    const chat = store.state.conversations.find(c => c.participantId === '${dev.id}') || { id: 'chat-${dev.id}', participantId: '${dev.id}', participantName: '${dev.name}', avatar: '${dev.avatar}', role: '${dev.role}', isOnline: true, unreadCount: 0, messages: [] };
                    if (!store.state.conversations.some(c => c.id === chat.id)) { store.state.conversations.push(chat); }
                    store.navigate('chats', { chatId: chat.id });
                  " class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 border border-slate-700">
                    <i data-lucide="message-square" class="w-4 h-4 text-cyan-400"></i>
                    <span>Message</span>
                  </button>

                  <button onclick="store.startVoiceCall('${dev.id}')"
                          class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-400 text-slate-100 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 border border-slate-700">
                    <i data-lucide="phone-call" class="w-4 h-4 text-emerald-400"></i>
                    <span>Voice Chat</span>
                  </button>

                  <button onclick="store.toggleConnection('${dev.id}')"
                          class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                            isConnected 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                              : isPending 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                          }">
                    <i data-lucide="${isConnected ? 'user-check' : isPending ? 'clock' : 'user-plus'}" class="w-4 h-4"></i>
                    <span>${isConnected ? 'Connected' : isPending ? 'Pending' : 'Connect'}</span>
                  </button>

                  <button onclick="store.state.selectedDevId = '${dev.id}'; store.state.modals.inviteToProject = true; store.notify();"
                          class="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-cyan-500/20 flex items-center gap-1.5">
                    <i data-lucide="folder-plus" class="w-4 h-4"></i>
                    <span>Invite to Project</span>
                  </button>
                ` : `
                  <button onclick="store.navigate('settings')"
                          class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 flex items-center gap-2">
                    <i data-lucide="edit-3" class="w-4 h-4 text-cyan-400"></i>
                    <span>Edit Profile & Settings</span>
                  </button>
                `}
              </div>
            </div>

            <!-- Profile Nav Tabs -->
            <div class="flex items-center gap-6 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto text-xs sm:text-sm font-medium">
              ${[
                { id: 'overview', label: 'Overview & Bio' },
                { id: 'projects', label: 'Projects & Repos' },
                { id: 'activity', label: 'Activity Heatmap' },
                { id: 'reviews', label: 'Peer Reviews & History' }
              ].map(tab => `
                <button onclick="ProfileView.activeTab = '${tab.id}'; store.notify();"
                        class="pb-2 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                          ProfileView.activeTab === tab.id 
                            ? 'text-cyan-400 border-cyan-400 font-bold' 
                            : 'text-slate-400 border-transparent hover:text-slate-200'
                        }">
                  <span>${tab.label}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Tab Content Sections -->
        ${ProfileView.activeTab === 'overview' ? this.renderOverviewTab(dev) :
          ProfileView.activeTab === 'projects' ? this.renderProjectsTab(dev) :
          ProfileView.activeTab === 'activity' ? this.renderActivityTab(dev) :
          this.renderReviewsTab(dev)}
      </div>
    `;
  },

  renderOverviewTab(dev) {
    return `
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left: Bio, Experience, Interests (2 cols) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- About Section -->
          <div class="glass-card p-6 rounded-2xl border border-slate-800">
            <h2 class="text-base font-bold text-white mb-2 flex items-center gap-2">
              <i data-lucide="user-check" class="w-4 h-4 text-cyan-400"></i>
              <span>About Developer</span>
            </h2>
            <p class="text-sm text-slate-300 leading-relaxed">${dev.bio}</p>

            <!-- Preferred Collaboration Types -->
            <div class="mt-4 pt-4 border-t border-slate-800">
              <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Collaboration Preferences</div>
              <div class="flex flex-wrap gap-2">
                ${(dev.collaborationTypes || ['Open Source', 'Side Projects', 'Hackathons']).map(type => `
                  <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    🤝 ${type}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Professional Experience Timeline -->
          <div class="glass-card p-6 rounded-2xl border border-slate-800">
            <h2 class="text-base font-bold text-white mb-4 flex items-center gap-2">
              <i data-lucide="briefcase" class="w-4 h-4 text-cyan-400"></i>
              <span>Experience & Career Timeline</span>
            </h2>

            <div class="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              ${(dev.experienceTimeline || [
                { role: dev.role, company: dev.company, period: "2022 - Present", description: "Architecting cloud-native solutions, real-time collaboration engines and UI components." }
              ]).map(exp => `
                <div class="relative group">
                  <div class="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-slate-900 group-hover:scale-125 transition-transform"></div>
                  <div>
                    <div class="text-sm font-bold text-white">${exp.role}</div>
                    <div class="text-xs text-cyan-400 font-medium">${exp.company} · <span class="text-slate-400 font-normal">${exp.period}</span></div>
                    <p class="text-xs text-slate-300 mt-1.5 leading-normal">${exp.description}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right Column: Skills Badges, Socials, Match Score Card (1 col) -->
        <div class="space-y-6">
          <!-- Match Score Explanation Card -->
          <div class="glass-card p-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-indigo-950/40">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Collaboration Match</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono match-score-badge text-cyan-300">
                ${dev.matchScore}% Synergy
              </span>
            </div>
            <p class="text-xs text-slate-300 leading-normal italic">
              "${dev.matchReason || 'Strong skill synergy across web frameworks and collaboration preferences.'}"
            </p>
          </div>

          <!-- Skills Badges -->
          <div class="glass-card p-6 rounded-2xl border border-slate-800">
            <h2 class="text-base font-bold text-white mb-3 flex items-center gap-2">
              <i data-lucide="code-2" class="w-4 h-4 text-cyan-400"></i>
              <span>Skills & Technologies</span>
            </h2>
            <div class="flex flex-wrap gap-2">
              ${dev.skills.map(skill => `
                <span class="px-3 py-1 rounded-xl text-xs font-medium glow-tag">
                  ${skill}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- External Links -->
          <div class="glass-card p-6 rounded-2xl border border-slate-800">
            <h2 class="text-base font-bold text-white mb-3">External Links</h2>
            <div class="space-y-2.5">
              ${dev.github ? `
                <a href="${dev.github}" target="_blank" class="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors group">
                  <div class="flex items-center gap-2.5">
                    <i data-lucide="github" class="w-4 h-4 text-slate-400 group-hover:text-cyan-400"></i>
                    <span>GitHub Profile</span>
                  </div>
                  <i data-lucide="external-link" class="w-3.5 h-3.5 text-slate-500"></i>
                </a>
              ` : ''}

              ${dev.linkedin ? `
                <a href="${dev.linkedin}" target="_blank" class="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors group">
                  <div class="flex items-center gap-2.5">
                    <i data-lucide="linkedin" class="w-4 h-4 text-cyan-400"></i>
                    <span>LinkedIn</span>
                  </div>
                  <i data-lucide="external-link" class="w-3.5 h-3.5 text-slate-500"></i>
                </a>
              ` : ''}

              ${dev.portfolio ? `
                <a href="${dev.portfolio}" target="_blank" class="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors group">
                  <div class="flex items-center gap-2.5">
                    <i data-lucide="globe" class="w-4 h-4 text-indigo-400"></i>
                    <span>Portfolio Website</span>
                  </div>
                  <i data-lucide="external-link" class="w-3.5 h-3.5 text-slate-500"></i>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderProjectsTab(dev) {
    const projects = dev.projects || [];
    return `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-white">Featured Projects & Repositories (${projects.length})</h2>
        </div>

        ${projects.length === 0 ? `
          <div class="glass-card p-8 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
            No external repositories listed yet.
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${projects.map(p => `
              <div class="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between group">
                <div>
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                      <i data-lucide="folder-git-2" class="w-4 h-4 text-cyan-400"></i>
                      <span>${p.name}</span>
                    </h3>
                    <div class="flex items-center gap-1 text-xs text-amber-400 font-mono">
                      <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>
                      <span>${p.stars || 120}</span>
                    </div>
                  </div>
                  <p class="text-xs text-slate-300 mt-2 leading-relaxed">${p.description}</p>

                  <div class="flex flex-wrap gap-1.5 mt-3">
                    ${(p.technologies || []).map(t => `
                      <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        ${t}
                      </span>
                    `).join('')}
                  </div>
                </div>

                <div class="flex items-center gap-3 mt-4 pt-3 border-t border-slate-800/80">
                  ${p.github ? `
                    <a href="${p.github}" target="_blank" class="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                      <i data-lucide="github" class="w-3.5 h-3.5"></i>
                      <span>Source Code</span>
                    </a>
                  ` : ''}
                  ${p.demo ? `
                    <a href="${p.demo}" target="_blank" class="text-xs text-indigo-400 hover:underline flex items-center gap-1 ml-auto">
                      <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                      <span>Live Demo</span>
                    </a>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  },

  renderActivityTab(dev) {
    // Generate simulated 52-week contribution heatmap
    const weeks = 52;
    const days = 7;
    const contributionLevels = [
      'bg-slate-800/60',
      'bg-cyan-950 border border-cyan-800',
      'bg-cyan-700',
      'bg-cyan-500',
      'bg-cyan-400 shadow-sm shadow-cyan-400'
    ];

    return `
      <div class="space-y-6">
        <div class="glass-card p-6 rounded-2xl border border-slate-800">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-base font-bold text-white flex items-center gap-2">
                <i data-lucide="activity" class="w-4 h-4 text-cyan-400"></i>
                <span>Open Source Contribution Activity</span>
              </h2>
              <p class="text-xs text-slate-400">1,248 commits & pull requests in the last 12 months</p>
            </div>

            <!-- Heatmap legend -->
            <div class="flex items-center gap-1 text-[11px] text-slate-500">
              <span>Less</span>
              <div class="w-2.5 h-2.5 rounded-sm bg-slate-800"></div>
              <div class="w-2.5 h-2.5 rounded-sm bg-cyan-900"></div>
              <div class="w-2.5 h-2.5 rounded-sm bg-cyan-700"></div>
              <div class="w-2.5 h-2.5 rounded-sm bg-cyan-400"></div>
              <span>More</span>
            </div>
          </div>

          <!-- Heatmap Matrix -->
          <div class="overflow-x-auto pb-2">
            <div class="inline-grid grid-rows-7 grid-flow-col gap-1">
              ${Array.from({ length: weeks * days }).map((_, i) => {
                const intensity = (i * 7 + (i % 3)) % 5;
                const cls = contributionLevels[intensity];
                return `<div class="heatmap-cell ${cls}" title="${intensity * 3} contributions on week ${Math.floor(i / 7) + 1}"></div>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderReviewsTab(dev) {
    const reviews = dev.reviews || [];
    return `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-white">Collaboration Reviews & Trust Score (${reviews.length})</h2>
            <p class="text-xs text-slate-400">Verified feedback from previous pair programming sessions and projects.</p>
          </div>
        </div>

        ${reviews.length === 0 ? `
          <div class="glass-card p-8 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
            No collaboration reviews yet. Be the first to collaborate with ${dev.name}!
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${reviews.map(r => `
              <div class="glass-card p-5 rounded-2xl border border-slate-800">
                <div class="flex items-center justify-between">
                  <div class="text-sm font-bold text-white">${r.author}</div>
                  <div class="flex items-center gap-1 text-amber-400">
                    ${Array.from({ length: r.rating }).map(() => '<i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>').join('')}
                  </div>
                </div>
                <div class="text-[11px] text-slate-500 mb-2">${r.date}</div>
                <p class="text-xs text-slate-300 italic">"${r.comment}"</p>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }
};

window.ProfileView = ProfileView;
