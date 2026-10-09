/**
 * DevCollab Developer Search & Discovery View
 * 
 * Intelligent search engine parsing natural language queries, multi-attribute filtering,
 * dynamic match score calculation, and interactive developer cards.
 */

const DiscoverView = {
  render(state) {
    const filters = state.discoverFilters;
    const filteredDevs = this.filterAndScoreDevelopers(state.developers, filters, state.currentUser);

    return `
      <div class="space-y-6 animate-fade-in pb-16">
        <!-- Header & Intelligent Search Hero -->
        <div class="glass-panel rounded-3xl p-6 border border-slate-800">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-2xl font-extrabold text-white tracking-tight">Discover Developers</h1>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  ${filteredDevs.length} matches
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-1">
                Search developers by natural language, tech stack, experience, role, or collaboration interests.
              </p>
            </div>

            <!-- View Mode & Reset -->
            <div class="flex items-center gap-2 self-start lg:self-auto">
              <div class="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                <button onclick="store.setDiscoverFilter('viewMode', 'grid')"
                        class="p-1.5 rounded-lg text-xs transition-colors ${filters.viewMode === 'grid' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}"
                        title="Grid View">
                  <i data-lucide="grid" class="w-4 h-4"></i>
                </button>
                <button onclick="store.setDiscoverFilter('viewMode', 'list')"
                        class="p-1.5 rounded-lg text-xs transition-colors ${filters.viewMode === 'list' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}"
                        title="List View">
                  <i data-lucide="list" class="w-4 h-4"></i>
                </button>
              </div>

              <button onclick="store.resetDiscoverFilters()"
                      class="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1.5">
                <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
                <span>Reset Filters</span>
              </button>
            </div>
          </div>

          <!-- Natural Language Search Input -->
          <div class="mt-5 relative">
            <div class="relative flex items-center">
              <i data-lucide="search" class="w-5 h-5 text-cyan-400 absolute left-4"></i>
              <input type="text" id="discover-search-input" value="${filters.query}"
                     placeholder="Try: 'React developers with 3+ years experience' or 'Python developers interested in AI'..."
                     oninput="store.setDiscoverFilter('query', this.value)"
                     class="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 shadow-inner" />
              ${filters.query ? `
                <button onclick="store.setDiscoverFilter('query', '')" class="absolute right-4 text-slate-500 hover:text-slate-300">
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              ` : ''}
            </div>

            <!-- Intelligent Query Pills -->
            <div class="flex flex-wrap items-center gap-2 mt-3 text-xs">
              <span class="text-slate-500 font-medium">Quick Prompts:</span>
              ${[
                "React developers",
                "Frontend developers",
                "Python developers with AI/ML",
                "Backend developers with Node.js",
                "Available for collaboration"
              ].map(q => `
                <button onclick="store.setDiscoverFilter('query', '${q}')"
                        class="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-cyan-500/10 hover:text-cyan-400 border border-slate-800 text-slate-400 transition-colors">
                  ${q}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Filter Controls Bar & Sorting -->
        <div class="glass-card p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <!-- Role Filter -->
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-slate-400">Role:</span>
            <select onchange="store.setDiscoverFilter('role', this.value)"
                    class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400">
              <option value="all" ${filters.role === 'all' ? 'selected' : ''}>All Roles</option>
              <option value="Frontend Developer" ${filters.role === 'Frontend Developer' ? 'selected' : ''}>Frontend</option>
              <option value="Backend" ${filters.role === 'Backend' ? 'selected' : ''}>Backend / Distributed</option>
              <option value="Fullstack" ${filters.role === 'Fullstack' ? 'selected' : ''}>Fullstack</option>
              <option value="AI/ML" ${filters.role === 'AI/ML' ? 'selected' : ''}>AI / Machine Learning</option>
              <option value="DevOps" ${filters.role === 'DevOps' ? 'selected' : ''}>DevOps & Cloud</option>
              <option value="Systems" ${filters.role === 'Systems' ? 'selected' : ''}>Systems & Rust</option>
              <option value="Mobile" ${filters.role === 'Mobile' ? 'selected' : ''}>Mobile Developer</option>
              <option value="UI/UX" ${filters.role === 'UI/UX' ? 'selected' : ''}>UI/UX Engineer</option>
            </select>
          </div>

          <!-- Experience Filter -->
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-slate-400">Experience:</span>
            <select onchange="store.setDiscoverFilter('experienceLevel', this.value)"
                    class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400">
              <option value="all" ${filters.experienceLevel === 'all' ? 'selected' : ''}>Any Experience</option>
              <option value="junior" ${filters.experienceLevel === 'junior' ? 'selected' : ''}>Junior (0-2 yrs)</option>
              <option value="mid" ${filters.experienceLevel === 'mid' ? 'selected' : ''}>Mid-Level (3-5 yrs)</option>
              <option value="senior" ${filters.experienceLevel === 'senior' ? 'selected' : ''}>Senior (5-8 yrs)</option>
              <option value="lead" ${filters.experienceLevel === 'lead' ? 'selected' : ''}>Lead / Staff (8+ yrs)</option>
            </select>
          </div>

          <!-- Availability Filter -->
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-slate-400">Status:</span>
            <select onchange="store.setDiscoverFilter('availability', this.value)"
                    class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400">
              <option value="all" ${filters.availability === 'all' ? 'selected' : ''}>All Availability</option>
              <option value="Available" ${filters.availability === 'Available' ? 'selected' : ''}>🟢 Available</option>
              <option value="Part-time" ${filters.availability === 'Part-time' ? 'selected' : ''}>🟡 Part-time</option>
              <option value="Busy" ${filters.availability === 'Busy' ? 'selected' : ''}>🔴 In a Project</option>
            </select>
          </div>

          <!-- Remote Only Checkbox -->
          <label class="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input type="checkbox" ${filters.remoteOnly ? 'checked' : ''}
                   onchange="store.setDiscoverFilter('remoteOnly', this.checked)"
                   class="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0" />
            <span>Remote Only</span>
          </label>

          <!-- Sorting dropdown -->
          <div class="flex items-center gap-2 ml-auto">
            <span class="text-xs font-semibold text-slate-400">Sort by:</span>
            <select onchange="store.setDiscoverFilter('sortBy', this.value)"
                    class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-cyan-400 font-semibold focus:outline-none focus:border-cyan-400">
              <option value="best-match" ${filters.sortBy === 'best-match' ? 'selected' : ''}>Best Match (AI Score)</option>
              <option value="experience" ${filters.sortBy === 'experience' ? 'selected' : ''}>Most Experienced</option>
              <option value="recent" ${filters.sortBy === 'recent' ? 'selected' : ''}>Recently Active</option>
              <option value="newest" ${filters.sortBy === 'newest' ? 'selected' : ''}>New Developers</option>
            </select>
          </div>
        </div>

        <!-- Skills Filter Tag Cloud (Interactive) -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Filter by Tech Stack / Skills</div>
            ${filters.skills.length > 0 ? `
              <button onclick="store.setDiscoverFilter('skills', [])" class="text-xs text-cyan-400 hover:underline">
                Clear skills (${filters.skills.length})
              </button>
            ` : ''}
          </div>
          <div class="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-slate-900/60 rounded-xl border border-slate-800">
            ${DevData.availableSkills.slice(0, 24).map(skill => {
              const active = filters.skills.includes(skill);
              return `
                <button onclick="store.toggleDiscoverSkill('${skill}')"
                        class="px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          active 
                            ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/40' 
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                        }">
                  ${skill}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Developer Results Cards Container -->
        ${filteredDevs.length === 0 ? this.renderEmptyState() : `
          <div class="${filters.viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-4'}">
            ${filteredDevs.map(dev => filters.viewMode === 'grid' ? DashboardView.renderDeveloperCard(dev, state) : this.renderListViewCard(dev, state)).join('')}
          </div>
        `}
      </div>
    `;
  },

  /**
   * List view card variant
   */
  renderListViewCard(dev, state) {
    const isConnected = dev.connectionStatus === 'connected';
    const isPending = dev.connectionStatus === 'pending';

    return `
      <div class="glass-card p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group">
        <div class="flex items-start gap-4">
          <div class="relative cursor-pointer flex-shrink-0" onclick="store.navigate('profile', { devId: '${dev.id}' })">
            <img src="${dev.avatar}" alt="${dev.name}" class="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-800 group-hover:ring-cyan-500/50" />
            ${dev.isOnline ? `
              <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 status-beacon-online"></span>
            ` : ''}
          </div>

          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 onclick="store.navigate('profile', { devId: '${dev.id}' })"
                  class="text-base font-bold text-white group-hover:text-cyan-400 cursor-pointer transition-colors">
                ${dev.name}
              </h3>
              ${dev.verified ? '<i data-lucide="check-circle" class="w-4 h-4 text-cyan-400"></i>' : ''}
              <span class="text-xs text-slate-400">@${dev.username}</span>
              <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-300">
                ${dev.experienceYears} yrs · ${dev.experienceLevel}
              </span>
            </div>

            <div class="text-xs text-cyan-300 font-medium">${dev.role} at ${dev.company} · ${dev.location}</div>
            <p class="text-xs text-slate-400 max-w-2xl line-clamp-2">${dev.bio}</p>

            <div class="flex flex-wrap gap-1.5 pt-1">
              ${dev.skills.map(s => `<span class="px-2 py-0.5 rounded text-[10px] font-medium glow-tag">${s}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Right: Match Score & Action Buttons -->
        <div class="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 flex-shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
          <div class="text-right">
            <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full match-score-badge text-cyan-300 text-sm font-bold font-mono">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-cyan-400"></i>
              <span>${dev.matchScore}% Match</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-1 max-w-[180px] text-right truncate">
              ${dev.matchReason}
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="store.navigate('profile', { devId: '${dev.id}' })"
                    class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200">
              Profile
            </button>
            <button onclick="
              const chat = store.state.conversations.find(c => c.participantId === '${dev.id}') || { id: 'chat-${dev.id}', participantId: '${dev.id}', participantName: '${dev.name}', avatar: '${dev.avatar}', role: '${dev.role}', isOnline: true, unreadCount: 0, messages: [] };
              if (!store.state.conversations.some(c => c.id === chat.id)) { store.state.conversations.push(chat); }
              store.navigate('chats', { chatId: chat.id });
            " class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-500/10 hover:text-cyan-400 text-xs text-slate-200">
              Message
            </button>
            <button onclick="store.startVoiceCall('${dev.id}')"
                    class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-500/10 hover:text-emerald-400 text-xs text-slate-200">
              Voice
            </button>
            <button onclick="store.toggleConnection('${dev.id}')"
                    class="px-3.5 py-1.5 rounded-xl text-xs font-semibold ${
                      isConnected 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                        : isPending 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                        : 'bg-cyan-500 text-slate-950 font-bold'
                    }">
              ${isConnected ? 'Connected' : isPending ? 'Pending' : 'Connect'}
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Useful Empty State
   */
  renderEmptyState() {
    return `
      <div class="glass-panel rounded-3xl p-12 text-center border border-slate-800 max-w-lg mx-auto">
        <div class="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400 mb-4 shadow-xl">
          <i data-lucide="search-x" class="w-8 h-8"></i>
        </div>
        <h3 class="text-lg font-bold text-white">No developers match your current filters</h3>
        <p class="text-xs text-slate-400 mt-2">
          Try loosening your search query, clearing specific skill tags, or switching to "All Roles" to discover more developers.
        </p>
        <button onclick="store.resetDiscoverFilters()"
                class="mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20">
          Reset All Filters & View All
        </button>
      </div>
    `;
  },

  /**
   * Filter and calculate Match Score with natural language understanding
   */
  filterAndScoreDevelopers(developers, filters, currentUser) {
    let results = [...developers];

    // 1. Natural Language Query Analysis
    if (filters.query && filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();

      // Check for years of experience intent (e.g. "3+ years", "5 years")
      const yearsMatch = q.match(/(\d+)\+?\s*years?/);
      const minYears = yearsMatch ? parseInt(yearsMatch[1]) : null;

      results = results.filter(dev => {
        // Text match in name, username, bio, role, location, company
        const inName = dev.name.toLowerCase().includes(q);
        const inUser = dev.username.toLowerCase().includes(q);
        const inRole = dev.role.toLowerCase().includes(q);
        const inBio = dev.bio.toLowerCase().includes(q);
        const inLoc = dev.location.toLowerCase().includes(q);

        // Skills match
        const inSkills = dev.skills.some(s => q.includes(s.toLowerCase()) || s.toLowerCase().includes(q));

        // Experience match
        const meetsYears = minYears !== null ? dev.experienceYears >= minYears : true;

        // Availability match
        const matchesAvail = (q.includes('avail') || q.includes('collab')) ? dev.availability === 'Available' : true;

        return (inName || inUser || inRole || inBio || inLoc || inSkills) && meetsYears && matchesAvail;
      });
    }

    // 2. Role Filter
    if (filters.role && filters.role !== 'all') {
      results = results.filter(dev => dev.role.toLowerCase().includes(filters.role.toLowerCase()));
    }

    // 3. Skills Filter (must match all selected skills)
    if (filters.skills && filters.skills.length > 0) {
      results = results.filter(dev => {
        return filters.skills.every(requiredSkill => dev.skills.includes(requiredSkill));
      });
    }

    // 4. Experience Level Filter
    if (filters.experienceLevel && filters.experienceLevel !== 'all') {
      if (filters.experienceLevel === 'junior') results = results.filter(dev => dev.experienceYears <= 2);
      if (filters.experienceLevel === 'mid') results = results.filter(dev => dev.experienceYears >= 3 && dev.experienceYears <= 5);
      if (filters.experienceLevel === 'senior') results = results.filter(dev => dev.experienceYears >= 5 && dev.experienceYears <= 8);
      if (filters.experienceLevel === 'lead') results = results.filter(dev => dev.experienceYears > 8);
    }

    // 5. Availability Filter
    if (filters.availability && filters.availability !== 'all') {
      results = results.filter(dev => dev.availability === filters.availability);
    }

    // 6. Remote Only Filter
    if (filters.remoteOnly) {
      results = results.filter(dev => dev.location.toLowerCase().includes('remote'));
    }

    // 7. Dynamic Match Score recalculation based on query / user synergy
    results = results.map(dev => {
      let score = dev.matchScore;
      let reason = dev.matchReason;

      if (filters.query) {
        // Boost score if matches query terms specifically
        score = Math.min(99, score + 2);
        reason = `Matches query "${filters.query}" with strong skills overlap.`;
      }

      return {
        ...dev,
        matchScore: score,
        matchReason: reason
      };
    });

    // 8. Sorting
    if (filters.sortBy === 'best-match') {
      results.sort((a, b) => b.matchScore - a.matchScore);
    } else if (filters.sortBy === 'experience') {
      results.sort((a, b) => b.experienceYears - a.experienceYears);
    } else if (filters.sortBy === 'recent') {
      results.sort((a, b) => (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0));
    } else if (filters.sortBy === 'newest') {
      results.reverse();
    }

    return results;
  }
};

window.DiscoverView = DiscoverView;
