/**
 * DevCollab Core Layout & UI Components
 */

const DevComponents = {
  /**
   * Renders Persistent Desktop Sidebar
   */
  renderSidebar(state) {
    const active = state.currentView;
    const unreadChats = state.conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
    const unreadNotifs = state.notifications.filter(n => !n.read).length;
    const isCalling = !!state.activeCall;

    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
      { id: 'discover', label: 'Discover Developers', icon: 'compass', highlight: true },
      { id: 'chats', label: 'Chats', icon: 'message-square', badge: unreadChats },
      { id: 'voice', label: 'Voice Rooms', icon: 'phone-call', isPulse: isCalling },
      { id: 'projects', label: 'Projects', icon: 'folder-git-2', count: state.projects.length },
      { id: 'notifications', label: 'Notifications', icon: 'bell', badge: unreadNotifs },
      { id: 'profile', label: 'My Profile', icon: 'user' },
      { id: 'settings', label: 'Settings', icon: 'settings' }
    ];

    return `
      <aside class="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-slate-900/90 dark:bg-slate-950/95 border-r border-slate-800/80 backdrop-blur-xl z-30 select-none flex-shrink-0">
        <!-- Logo Area -->
        <div class="p-5 border-b border-slate-800/70 flex items-center justify-between">
          <div onclick="store.navigate('dashboard')">
            ${DevLogo.renderFull(34, true)}
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div class="text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 px-3 mb-2">Platform</div>
          ${navItems.map(item => {
            const isActive = active === item.id;
            return `
              <button onclick="store.navigate('${item.id}')"
                class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive 
                    ? 'bg-gradient-to-r from-cyan-500/15 via-indigo-500/10 to-transparent text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }">
                <div class="flex items-center gap-3">
                  <i data-lucide="${item.icon}" class="w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}"></i>
                  <span>${item.label}</span>
                </div>
                
                <div class="flex items-center gap-1.5">
                  ${item.badge && item.badge > 0 ? `
                    <span class="px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/40">
                      ${item.badge}
                    </span>
                  ` : ''}
                  ${item.isPulse ? `
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  ` : ''}
                  ${item.count !== undefined ? `
                    <span class="text-xs text-slate-500 group-hover:text-slate-400 font-mono">${item.count}</span>
                  ` : ''}
                </div>
              </button>
            `;
          }).join('')}

          <div class="pt-4 mt-4 border-t border-slate-800/60">
            <div class="text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 px-3 mb-2">Shortcuts</div>
            <button onclick="store.state.modals.createProject = true; store.notify();" 
              class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-dashed border-slate-700/80 transition-all hover:border-cyan-500/50">
              <i data-lucide="plus-circle" class="w-4 h-4 text-cyan-400"></i>
              <span>Post New Project</span>
            </button>
          </div>
        </nav>

        <!-- Current User Profile Footer -->
        <div class="p-3 border-t border-slate-800/80 bg-slate-950/40">
          <div class="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/60 transition-colors cursor-pointer group"
               onclick="store.navigate('profile')">
            <div class="flex items-center gap-3 min-w-0">
              <div class="relative flex-shrink-0">
                <img src="${state.currentUser.avatar}" alt="${state.currentUser.name}" class="w-9 h-9 rounded-full object-cover ring-2 ring-cyan-500/30" />
                <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 status-beacon-online"></span>
              </div>
              <div class="truncate text-left">
                <div class="text-xs font-semibold text-white truncate flex items-center gap-1">
                  ${state.currentUser.name}
                  <i data-lucide="shield-check" class="w-3 h-3 text-cyan-400"></i>
                </div>
                <div class="text-[11px] text-slate-400 truncate">@${state.currentUser.username}</div>
              </div>
            </div>
            
            <button onclick="event.stopPropagation(); store.logout();" title="Sign out" class="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors">
              <i data-lucide="log-out" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </aside>
    `;
  },

  /**
   * Renders Mobile Bottom Navigation Bar
   */
  renderBottomNav(state) {
    const active = state.currentView;
    const unreadChats = state.conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
    const isCalling = !!state.activeCall;

    const items = [
      { id: 'dashboard', label: 'Home', icon: 'layout-dashboard' },
      { id: 'discover', label: 'Discover', icon: 'compass' },
      { id: 'chats', label: 'Chats', icon: 'message-square', badge: unreadChats },
      { id: 'voice', label: 'Voice', icon: 'phone-call', isPulse: isCalling },
      { id: 'projects', label: 'Projects', icon: 'folder-git-2' },
      { id: 'profile', label: 'Profile', icon: 'user' }
    ];

    return `
      <div class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 dark:bg-slate-950/95 border-t border-slate-800 backdrop-blur-xl px-2 py-1.5 flex items-center justify-around shadow-2xl safe-bottom">
        ${items.map(item => {
          const isActive = active === item.id;
          return `
            <button onclick="store.navigate('${item.id}')"
              class="relative flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }">
              <div class="relative">
                <i data-lucide="${item.icon}" class="w-5 h-5"></i>
                ${item.badge && item.badge > 0 ? `
                  <span class="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                    ${item.badge}
                  </span>
                ` : ''}
                ${item.isPulse ? `
                  <span class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                ` : ''}
              </div>
              <span class="text-[10px] font-medium mt-1">${item.label}</span>
              ${isActive ? '<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-0.5 shadow-sm shadow-cyan-400"></span>' : ''}
            </button>
          `;
        }).join('')}
      </div>
    `;
  },

  /**
   * Renders Top Header with Global Search and Controls
   */
  renderHeader(state) {
    const unreadNotifs = state.notifications.filter(n => !n.read).length;
    const isCalling = !!state.activeCall;

    return `
      <header class="sticky top-0 z-20 w-full h-16 bg-slate-900/80 dark:bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8">
        <!-- Left: Mobile Brand or Page Title -->
        <div class="flex items-center gap-3">
          <div class="md:hidden">
            ${DevLogo.renderIcon(30, true)}
          </div>
          <div class="hidden sm:block">
            <span class="text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">DevCollab Platform</span>
          </div>
        </div>

        <!-- Center: Intelligent Global Search Quick Bar -->
        <div class="flex-1 max-w-xl mx-4">
          <div onclick="store.state.modals.commandSearch = true; store.notify();"
            class="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/60 hover:border-cyan-500/40 cursor-pointer transition-all text-slate-400 text-xs sm:text-sm shadow-inner group">
            <div class="flex items-center gap-2.5 truncate">
              <i data-lucide="search" class="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors"></i>
              <span class="truncate">Search developers, skills, roles, or projects...</span>
            </div>
            <kbd class="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900/70 border border-slate-700/80 rounded">
              Ctrl K
            </kbd>
          </div>
        </div>

        <!-- Right Controls: Active Call Pill, Notifications, Theme, User Avatar -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Active Call Floating Pill -->
          ${isCalling ? `
            <button onclick="store.navigate('voice')"
              class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/30 transition-all animate-pulse">
              <i data-lucide="phone-call" class="w-3.5 h-3.5"></i>
              <span class="hidden sm:inline">Active Call (${Math.floor(state.activeCall.seconds / 60)}:${(state.activeCall.seconds % 60).toString().padStart(2, '0')})</span>
            </button>
          ` : ''}

          <!-- Notifications Bell -->
          <div class="relative">
            <button onclick="store.navigate('notifications')"
              class="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all">
              <i data-lucide="bell" class="w-4 h-4 sm:w-5 sm:h-5"></i>
              ${unreadNotifs > 0 ? `
                <span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-slate-900"></span>
              ` : ''}
            </button>
          </div>

          <!-- Theme Toggle (Dark / Light) -->
          <button onclick="store.setTheme(store.state.theme === 'dark' ? 'light' : 'dark')"
            title="Toggle theme"
            class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all">
            <i data-lucide="${state.theme === 'dark' ? 'sun' : 'moon'}" class="w-4 h-4 sm:w-5 sm:h-5"></i>
          </button>

          <!-- Settings Shortcut -->
          <button onclick="store.navigate('settings')"
            title="Settings"
            class="hidden sm:flex p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all">
            <i data-lucide="settings" class="w-4 h-4 sm:w-5 sm:h-5"></i>
          </button>

          <!-- User Avatar Small -->
          <button onclick="store.navigate('profile')" class="relative flex-shrink-0">
            <img src="${state.currentUser.avatar}" alt="${state.currentUser.name}" class="w-8 h-8 rounded-full object-cover ring-2 ring-slate-700 hover:ring-cyan-400 transition-all" />
          </button>
        </div>
      </header>
    `;
  },

  /**
   * Renders Global Toast Notification Popups
   */
  renderToasts(toasts) {
    if (!toasts || toasts.length === 0) return '';
    return `
      <div class="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        ${toasts.map(t => {
          let icon = 'info';
          let border = 'border-cyan-500/40 text-cyan-400 bg-slate-900/95';
          if (t.type === 'success') {
            icon = 'check-circle';
            border = 'border-emerald-500/40 text-emerald-400 bg-slate-900/95';
          } else if (t.type === 'error') {
            icon = 'alert-triangle';
            border = 'border-rose-500/40 text-rose-400 bg-slate-900/95';
          }
          return `
            <div class="pointer-events-auto flex items-center gap-3 p-3.5 rounded-xl border ${border} shadow-2xl backdrop-blur-xl animate-bounce-in">
              <i data-lucide="${icon}" class="w-5 h-5 flex-shrink-0"></i>
              <span class="text-sm text-slate-100 font-medium">${t.message}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  /**
   * Command Palette / Quick Search Modal (Ctrl + K)
   */
  renderCommandSearchModal(state) {
    if (!state.modals.commandSearch) return '';

    return `
      <div class="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md"
           onclick="if(event.target === this) { store.state.modals.commandSearch = false; store.notify(); }">
        <div class="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
          <!-- Search Input -->
          <div class="p-4 border-b border-slate-800 flex items-center gap-3">
            <i data-lucide="search" class="w-5 h-5 text-cyan-400"></i>
            <input type="text" id="command-search-input" autofocus
                   placeholder="Type a skill, developer name, role (e.g. 'React with 3+ years', 'Sarah Williams')..."
                   class="w-full bg-transparent text-white placeholder-slate-500 text-base focus:outline-none"
                   onkeydown="if(event.key === 'Enter') { 
                     store.setDiscoverFilter('query', this.value); 
                     store.state.modals.commandSearch = false; 
                     store.navigate('discover'); 
                   }" />
            <button onclick="store.state.modals.commandSearch = false; store.notify();" class="text-slate-400 hover:text-white">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Suggested Quick Queries -->
          <div class="p-4 border-b border-slate-800/60 bg-slate-950/40">
            <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Example Intelligent Searches</div>
            <div class="flex flex-wrap gap-2">
              ${[
                "React developers with 3+ years experience",
                "Python developers interested in AI",
                "Frontend developers",
                "Backend developers with Node.js",
                "Rust and WebAssembly developers"
              ].map(q => `
                <button onclick="store.setDiscoverFilter('query', '${q}'); store.state.modals.commandSearch = false; store.navigate('discover');"
                        class="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 border border-slate-700/60 text-slate-300 transition-all flex items-center gap-1.5">
                  <i data-lucide="sparkles" class="w-3 h-3 text-cyan-400"></i>
                  ${q}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Quick Navigation Actions -->
          <div class="p-2 space-y-1">
            <div class="text-[11px] font-semibold text-slate-500 uppercase px-3 py-1">Quick Links</div>
            <div onclick="store.state.modals.commandSearch = false; store.navigate('discover');"
                 class="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-800/80 cursor-pointer text-slate-300 hover:text-white text-sm">
              <div class="flex items-center gap-3">
                <i data-lucide="compass" class="w-4 h-4 text-cyan-400"></i>
                <span>Open Developer Discovery Page</span>
              </div>
              <span class="text-xs text-slate-500 font-mono">Jump</span>
            </div>
            <div onclick="store.state.modals.commandSearch = false; store.navigate('chats');"
                 class="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-800/80 cursor-pointer text-slate-300 hover:text-white text-sm">
              <div class="flex items-center gap-3">
                <i data-lucide="message-square" class="w-4 h-4 text-indigo-400"></i>
                <span>Open Direct Messages</span>
              </div>
              <span class="text-xs text-slate-500 font-mono">Jump</span>
            </div>
            <div onclick="store.state.modals.commandSearch = false; store.navigate('projects');"
                 class="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-800/80 cursor-pointer text-slate-300 hover:text-white text-sm">
              <div class="flex items-center gap-3">
                <i data-lucide="folder-git-2" class="w-4 h-4 text-purple-400"></i>
                <span>View Collaboration Projects</span>
              </div>
              <span class="text-xs text-slate-500 font-mono">Jump</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Create New Project Modal
   */
  renderCreateProjectModal(state) {
    if (!state.modals.createProject) return '';

    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
           onclick="if(event.target === this) { store.state.modals.createProject = false; store.notify(); }">
        <div class="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 animate-scale-up">
          <div class="flex items-center justify-between pb-4 border-b border-slate-800">
            <div class="flex items-center gap-2.5">
              <div class="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <i data-lucide="folder-plus" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">Create Collaboration Project</h3>
                <p class="text-xs text-slate-400">Assemble a team of developers based on required skills</p>
              </div>
            </div>
            <button onclick="store.state.modals.createProject = false; store.notify();" class="text-slate-400 hover:text-white">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="create-project-form" onsubmit="event.preventDefault(); DevComponents.handleProjectSubmit();" class="mt-4 space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Project Name *</label>
              <input type="text" id="new-proj-title" required placeholder="e.g. AI Developer Collaboration Platform"
                     class="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
              <textarea id="new-proj-desc" rows="3" required placeholder="What are you building, tech architecture, and what developers are you looking for?"
                        class="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Project Type</label>
                <select id="new-proj-type" class="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400">
                  <option value="Startup MVP">Startup MVP</option>
                  <option value="Open Source">Open Source</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Side Project">Side Project</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Team Size</label>
                <input type="number" id="new-proj-size" value="4" min="2" max="10"
                       class="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Required Skills (Comma separated)</label>
              <input type="text" id="new-proj-skills" placeholder="React, Node.js, Python, AI/ML"
                     class="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400" />
            </div>

            <div class="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button type="button" onclick="store.state.modals.createProject = false; store.notify();"
                      class="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm font-medium">
                Cancel
              </button>
              <button type="submit"
                      class="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/20 transition-all">
                Publish Project
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  handleProjectSubmit() {
    const title = document.getElementById('new-proj-title').value;
    const desc = document.getElementById('new-proj-desc').value;
    const type = document.getElementById('new-proj-type').value;
    const size = document.getElementById('new-proj-size').value;
    const skillsRaw = document.getElementById('new-proj-skills').value;
    const skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);

    store.createProject({
      title,
      description: desc,
      projectType: type,
      maxTeamSize: size,
      requiredSkills: skills.length > 0 ? skills : ["React", "TypeScript", "Node.js"]
    });
  },

  /**
   * Invite Developer to Project Modal
   */
  renderInviteModal(state) {
    if (!state.modals.inviteToProject || !state.selectedDevId) return '';
    const dev = state.developers.find(d => d.id === state.selectedDevId);
    if (!dev) return '';

    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
           onclick="if(event.target === this) { store.state.modals.inviteToProject = false; store.notify(); }">
        <div class="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 animate-scale-up">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 class="text-base font-bold text-white">Invite ${dev.name} to Project</h3>
            <button onclick="store.state.modals.inviteToProject = false; store.notify();" class="text-slate-400 hover:text-white">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>
          <p class="text-xs text-slate-400 my-3">Select one of your collaboration projects to invite this developer:</p>

          <div class="space-y-2 max-h-60 overflow-y-auto">
            ${state.projects.map(proj => `
              <div onclick="store.inviteDevToProject('${dev.id}', '${proj.id}')"
                   class="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/50 cursor-pointer transition-all flex items-center justify-between group">
                <div>
                  <div class="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">${proj.title}</div>
                  <div class="text-xs text-slate-400">${proj.projectType} · ${proj.teamSize}/${proj.maxTeamSize} members</div>
                </div>
                <i data-lucide="user-plus" class="w-4 h-4 text-slate-400 group-hover:text-cyan-400"></i>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
};

window.DevComponents = DevComponents;
