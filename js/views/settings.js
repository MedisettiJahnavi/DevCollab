/**
 * DevCollab Complete Settings System
 */

const SettingsView = {
  currentTab: 'personal', // 'personal', 'account', 'theme', 'notifications', 'privacy', 'history', 'security'

  render(state) {
    const tab = this.currentTab;
    const user = state.currentUser;

    const navTabs = [
      { id: 'personal', label: 'Personal Details', icon: 'user' },
      { id: 'account', label: 'Account & Credentials', icon: 'shield' },
      { id: 'theme', label: 'Theme & Accents', icon: 'palette' },
      { id: 'notifications', label: 'Notification Preferences', icon: 'bell' },
      { id: 'privacy', label: 'Privacy & Visibility', icon: 'lock' },
      { id: 'history', label: 'Activity & Logs History', icon: 'clock' },
      { id: 'security', label: 'Security & Sessions', icon: 'key' }
    ];

    return `
      <div class="space-y-6 animate-fade-in pb-16 max-w-5xl mx-auto">
        <!-- Settings Header -->
        <div class="glass-panel rounded-3xl p-6 border border-slate-800">
          <h1 class="text-2xl font-extrabold text-white tracking-tight">Platform Settings</h1>
          <p class="text-xs text-slate-400 mt-1">Manage your developer profile, security credentials, appearance, and platform preferences.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <!-- Left Navigation Menu (1 Col) -->
          <div class="md:col-span-1 space-y-1">
            ${navTabs.map(t => {
              const isActive = tab === t.id;
              return `
                <button onclick="SettingsView.currentTab = '${t.id}'; store.notify();"
                        class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                          isActive 
                            ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-semibold shadow-sm' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }">
                  <i data-lucide="${t.icon}" class="w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}"></i>
                  <span>${t.label}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Right Content Area (3 Cols) -->
          <div class="md:col-span-3">
            <div class="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              ${tab === 'personal' ? this.renderPersonalDetails(user, state) :
                tab === 'account' ? this.renderAccount(user) :
                tab === 'theme' ? this.renderTheme(state) :
                tab === 'notifications' ? this.renderNotificationsPref() :
                tab === 'privacy' ? this.renderPrivacy() :
                tab === 'history' ? this.renderHistory(state) :
                this.renderSecurity(user)}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderPersonalDetails(user, state) {
    return `
      <div class="space-y-5">
        <div>
          <h2 class="text-lg font-bold text-white">Personal & Developer Information</h2>
          <p class="text-xs text-slate-400">This information will be displayed on your public DevCollab profile.</p>
        </div>

        <!-- Avatar Change -->
        <div class="flex items-center gap-4 pt-2">
          <img src="${user.avatar}" alt="" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-500/40" />
          <div class="space-y-1">
            <div class="text-xs font-semibold text-white">Profile Photo</div>
            <div class="flex items-center gap-2">
              <button onclick="store.showToast('Select an image from local machine', 'info')"
                      class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700">
                Change Photo
              </button>
              <button onclick="store.updateCurrentUser({ avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' })"
                      class="text-xs text-slate-500 hover:text-slate-300">
                Reset
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input type="text" id="set-name" value="${user.name}"
                   class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Username</label>
            <input type="text" id="set-username" value="${user.username}"
                   class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Job Position / Title</label>
            <input type="text" id="set-role" value="${user.role}"
                   class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Current Company</label>
            <input type="text" id="set-company" value="${user.company}"
                   class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400" />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Bio</label>
          <textarea id="set-bio" rows="3"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400">${user.bio}</textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">GitHub URL</label>
            <input type="url" id="set-github" value="${user.github}"
                   class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">LinkedIn URL</label>
            <input type="url" id="set-linkedin" value="${user.linkedin}"
                   class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Portfolio</label>
            <input type="url" id="set-portfolio" value="${user.portfolio}"
                   class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white" />
          </div>
        </div>

        <div class="pt-3 border-t border-slate-800 flex justify-end">
          <button onclick="
            store.updateCurrentUser({
              name: document.getElementById('set-name').value,
              username: document.getElementById('set-username').value,
              role: document.getElementById('set-role').value,
              company: document.getElementById('set-company').value,
              bio: document.getElementById('set-bio').value,
              github: document.getElementById('set-github').value,
              linkedin: document.getElementById('set-linkedin').value,
              portfolio: document.getElementById('set-portfolio').value
            });
          " class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-md">
            Save Profile Changes
          </button>
        </div>
      </div>
    `;
  },

  renderAccount(user) {
    return `
      <div class="space-y-5">
        <div>
          <h2 class="text-lg font-bold text-white">Account & Login Credentials</h2>
          <p class="text-xs text-slate-400">Update your email, password, and authentication methods.</p>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
          <input type="email" value="${user.email}" disabled
                 class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 cursor-not-allowed" />
          <span class="text-[11px] text-emerald-400 mt-1 inline-flex items-center gap-1">
            <i data-lucide="check" class="w-3 h-3"></i>
            <span>Verified email address</span>
          </span>
        </div>

        <div class="pt-4 border-t border-slate-800">
          <h3 class="text-sm font-bold text-white mb-2">Change Password</h3>
          <div class="space-y-3 max-w-md">
            <input type="password" placeholder="Current password" class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white" />
            <input type="password" placeholder="New password" class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white" />
            <button onclick="store.showToast('Password changed successfully!', 'success')"
                    class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700">
              Update Password
            </button>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="pt-6 border-t border-rose-900/40">
          <h3 class="text-sm font-bold text-rose-400">Danger Zone</h3>
          <p class="text-xs text-slate-400 mt-1">Permanently remove your account, repositories, and data.</p>
          <button onclick="store.showToast('Account deletion simulation protected', 'error')"
                  class="mt-3 px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/40 text-xs font-semibold">
            Delete DevCollab Account
          </button>
        </div>
      </div>
    `;
  },

  renderTheme(state) {
    return `
      <div class="space-y-6">
        <div>
          <h2 class="text-lg font-bold text-white">Appearance & Theme Settings</h2>
          <p class="text-xs text-slate-400">Choose between dark technology mode, clean light mode, or system preferences.</p>
        </div>

        <!-- Theme Mode Selection -->
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-3">Color Mode</label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${[
              { id: 'dark', label: 'Dark Mode (Default)', icon: 'moon', desc: 'Deep navy & cyber technology aesthetic' },
              { id: 'light', label: 'Light Mode', icon: 'sun', desc: 'Clean, high-contrast crisp white layout' },
              { id: 'system', label: 'System Default', icon: 'monitor', desc: 'Follows your operating system preference' }
            ].map(m => `
              <div onclick="store.setTheme('${m.id}')"
                   class="p-4 rounded-2xl border cursor-pointer transition-all ${
                     state.theme === m.id 
                       ? 'bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10' 
                       : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                   }">
                <div class="flex items-center gap-2 font-bold text-xs text-white">
                  <i data-lucide="${m.icon}" class="w-4 h-4 text-cyan-400"></i>
                  <span>${m.label}</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-1.5">${m.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Neon Accent Customization -->
        <div class="pt-4 border-t border-slate-800">
          <label class="block text-xs font-semibold text-slate-300 mb-3">Neon Accent Color</label>
          <div class="flex flex-wrap gap-3">
            ${[
              { id: 'cyan', name: 'Electric Cyan', color: '#00d9ff' },
              { id: 'purple', name: 'Neon Violet', color: '#a855f7' },
              { id: 'emerald', name: 'Emerald Cyber', color: '#10b981' },
              { id: 'amber', name: 'Amber Blaze', color: '#f59e0b' }
            ].map(acc => `
              <button onclick="store.setAccentColor('${acc.id}')"
                      class="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                        state.accentColor === acc.id ? 'bg-slate-800 border-white text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }">
                <span class="w-3.5 h-3.5 rounded-full" style="background-color: ${acc.color}; box-shadow: 0 0 8px ${acc.color}"></span>
                <span>${acc.name}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderNotificationsPref() {
    return `
      <div class="space-y-5">
        <div>
          <h2 class="text-lg font-bold text-white">Notification Preferences</h2>
          <p class="text-xs text-slate-400">Control what alerts trigger notifications and sounds.</p>
        </div>

        <div class="space-y-3">
          ${[
            { title: "Direct Chat Messages", desc: "Push notification when a developer sends a message", checked: true },
            { title: "Voice Call Requests", desc: "Incoming call audio ring and modal prompt", checked: true },
            { title: "Project Invitations & Tasks", desc: "Notify when you are invited to a project or assigned a task", checked: true },
            { title: "AI Developer Recommendations", desc: "Weekly digests of developers matching your stack", checked: true },
            { title: "Marketing & Platform Updates", desc: "Occasional product releases and developer surveys", checked: false }
          ].map(item => `
            <div class="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <div class="text-xs font-bold text-white">${item.title}</div>
                <div class="text-[11px] text-slate-400">${item.desc}</div>
              </div>
              <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="store.showToast('Notification preference saved', 'info')"
                     class="rounded border-slate-700 bg-slate-800 text-cyan-400 focus:ring-0 w-4 h-4 cursor-pointer" />
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderPrivacy() {
    return `
      <div class="space-y-5">
        <div>
          <h2 class="text-lg font-bold text-white">Privacy & Visibility</h2>
          <p class="text-xs text-slate-400">Manage who can discover you and send you messages.</p>
        </div>

        <div class="space-y-3">
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-white">Profile Visibility</div>
              <div class="text-[11px] text-slate-400">Allow public indexing on the Developer Discovery search page</div>
            </div>
            <select class="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white">
              <option value="public">Public (Everyone)</option>
              <option value="connections">Connections Only</option>
            </select>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-white">Online Status Indicator</div>
              <div class="text-[11px] text-slate-400">Display green beacon when you are active on the site</div>
            </div>
            <input type="checkbox" checked class="w-4 h-4 text-cyan-400 rounded bg-slate-800" />
          </div>

          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-white">Who Can Message Me</div>
              <div class="text-[11px] text-slate-400">Direct message restrictions</div>
            </div>
            <select class="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white">
              <option value="all">Any Developer</option>
              <option value="connected">Connected Collaborators Only</option>
            </select>
          </div>
        </div>
      </div>
    `;
  },

  renderHistory(state) {
    return `
      <div class="space-y-6">
        <div>
          <h2 class="text-lg font-bold text-white">Activity & Logs History</h2>
          <p class="text-xs text-slate-400">View recent searches, voice calls, and platform interactions with option to clear.</p>
        </div>

        <!-- Search History -->
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-bold text-white uppercase tracking-wider">Search History</h3>
            <button onclick="store.clearSearchHistory()" class="text-xs text-rose-400 hover:underline">
              Clear Search History
            </button>
          </div>
          <div class="space-y-1.5">
            ${state.activityHistory.filter(h => h.type === 'search').map(item => `
              <div class="flex items-center justify-between p-2 rounded-xl bg-slate-900 text-xs">
                <div class="flex items-center gap-2 text-slate-300">
                  <i data-lucide="search" class="w-3.5 h-3.5 text-cyan-400"></i>
                  <span>${item.query}</span>
                </div>
                <span class="text-[10px] text-slate-500">${item.time}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Voice Call History Summary -->
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-bold text-white uppercase tracking-wider">Voice Call Logs</h3>
            <button onclick="store.clearCallHistory()" class="text-xs text-rose-400 hover:underline">
              Clear Call Logs
            </button>
          </div>
          <div class="space-y-1.5">
            ${state.callHistory.map(call => `
              <div class="flex items-center justify-between p-2 rounded-xl bg-slate-900 text-xs">
                <div class="flex items-center gap-2 text-slate-300">
                  <i data-lucide="phone" class="w-3.5 h-3.5 text-emerald-400"></i>
                  <span>${call.participantName} (${call.duration})</span>
                </div>
                <span class="text-[10px] text-slate-500">${call.timestamp}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderSecurity(user) {
    return `
      <div class="space-y-6">
        <div>
          <h2 class="text-lg font-bold text-white">Security & Active Sessions</h2>
          <p class="text-xs text-slate-400">Manage two-factor authentication and inspect active devices.</p>
        </div>

        <!-- Two-Factor Authentication -->
        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white flex items-center gap-2">
              <span>Two-Factor Authentication (2FA)</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${user.twoFactorEnabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}">
                ${user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div class="text-[11px] text-slate-400 mt-0.5">Secure your login with TOTP authenticator apps (Google Authenticator, 1Password)</div>
          </div>
          <button onclick="store.updateCurrentUser({ twoFactorEnabled: !store.state.currentUser.twoFactorEnabled }); store.showToast('2FA status updated', 'info');"
                  class="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-cyan-400 font-semibold border border-slate-700">
            ${user.twoFactorEnabled ? 'Disable' : 'Enable 2FA'}
          </button>
        </div>

        <!-- Active Sessions -->
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 class="text-xs font-bold text-white uppercase tracking-wider">Active Device Sessions</h3>
          <div class="space-y-2">
            <div class="p-3 rounded-xl bg-slate-900 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <i data-lucide="laptop" class="w-5 h-5 text-cyan-400"></i>
                <div>
                  <div class="text-xs font-bold text-white">Windows 11 · Chrome 128 (Current Session)</div>
                  <div class="text-[10px] text-slate-500">IP: 192.168.1.42 · Austin, US</div>
                </div>
              </div>
              <span class="text-[10px] text-emerald-400 font-bold">Active Now</span>
            </div>

            <div class="p-3 rounded-xl bg-slate-900 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <i data-lucide="smartphone" class="w-5 h-5 text-slate-400"></i>
                <div>
                  <div class="text-xs font-bold text-white">iPhone 15 Pro · Mobile Safari</div>
                  <div class="text-[10px] text-slate-500">Last active 2 days ago</div>
                </div>
              </div>
              <button onclick="store.showToast('Revoked iPhone session', 'info')" class="text-xs text-rose-400 hover:underline">Revoke</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

window.SettingsView = SettingsView;
