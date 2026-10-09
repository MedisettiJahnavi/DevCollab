/**
 * DevCollab Authentication & Onboarding View
 */

const AuthView = {
  // Local state for auth form toggles
  showPassword: false,
  onboardingStep: 1,

  render(state) {
    const mode = state.authView || 'login';

    if (mode === 'onboarding') {
      return this.renderOnboarding(state);
    }

    return `
      <div class="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-slate-950 text-slate-100 relative overflow-hidden">
        <!-- Ambient Background Glows -->
        <div class="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div class="w-full max-w-md relative z-10 animate-fade-in">
          <!-- Logo Brand Header -->
          <div class="flex flex-col items-center justify-center mb-6 text-center">
            ${DevLogo.renderAppIcon(64)}
            <div class="mt-3">
              ${DevLogo.renderFull(34, true)}
            </div>
          </div>

          <!-- Auth Box Card -->
          <div class="glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-800">
            ${mode === 'login' ? this.renderLogin() : mode === 'signup' ? this.renderSignup() : this.renderForgot()}
          </div>

          <!-- Quick Demo One-Click Login Bar for Ease of Testing -->
          <div class="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-center">
            <span class="text-xs text-slate-400">Quick Demo Testing:</span>
            <button onclick="store.login('demo@devcollab.io', 'password123')"
                    class="ml-2 px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors">
              ⚡ Instant 1-Click Demo Login
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderLogin() {
    return `
      <div>
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-white tracking-tight">Welcome back to DevCollab</h2>
          <p class="text-xs text-slate-400 mt-1">Connect, collaborate, and build with developers.</p>
        </div>

        <!-- Social Logins -->
        <div class="grid grid-cols-2 gap-3 mb-5">
          <button onclick="store.login('github@devcollab.io', 'pass')"
                  class="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 transition-all hover:border-slate-600">
            <i data-lucide="github" class="w-4 h-4"></i>
            <span>GitHub</span>
          </button>
          <button onclick="store.login('google@devcollab.io', 'pass')"
                  class="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 transition-all hover:border-slate-600">
            <i data-lucide="chrome" class="w-4 h-4 text-cyan-400"></i>
            <span>Google</span>
          </button>
        </div>

        <div class="relative flex py-2 items-center mb-5">
          <div class="flex-grow border-t border-slate-800"></div>
          <span class="flex-shrink mx-3 text-xs text-slate-500 font-medium">Or continue with email</span>
          <div class="flex-grow border-t border-slate-800"></div>
        </div>

        <form onsubmit="event.preventDefault(); AuthView.handleLoginSubmit();" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Email address</label>
            <div class="relative">
              <i data-lucide="mail" class="w-4 h-4 text-slate-500 absolute left-3.5 top-3"></i>
              <input type="email" id="auth-email" required value="jordan.lee@devcollab.io"
                     class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-850 bg-slate-900/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400"
                     placeholder="developer@example.com" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-semibold text-slate-300">Password</label>
              <button type="button" onclick="store.state.authView = 'forgot'; store.notify();" class="text-xs text-cyan-400 hover:underline">
                Forgot password?
              </button>
            </div>
            <div class="relative">
              <i data-lucide="lock" class="w-4 h-4 text-slate-500 absolute left-3.5 top-3"></i>
              <input type="${AuthView.showPassword ? 'text' : 'password'}" id="auth-password" required value="••••••••••••"
                     class="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400"
                     placeholder="Enter your password" />
              <button type="button" onclick="AuthView.showPassword = !AuthView.showPassword; store.notify();"
                      class="absolute right-3 top-3 text-slate-500 hover:text-slate-300">
                <i data-lucide="${AuthView.showPassword ? 'eye-off' : 'eye'}" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-400">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0" />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          <button type="submit"
                  class="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all transform active:scale-98">
            Sign In to DevCollab
          </button>
        </form>

        <p class="text-center text-xs text-slate-400 mt-6">
          Don't have an account yet?
          <button onclick="store.state.authView = 'signup'; store.notify();" class="text-cyan-400 font-semibold hover:underline ml-1">
            Sign up now
          </button>
        </p>
      </div>
    `;
  },

  handleLoginSubmit() {
    const email = document.getElementById('auth-email').value;
    const pass = document.getElementById('auth-password').value;
    store.login(email, pass);
  },

  renderSignup() {
    return `
      <div>
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-white tracking-tight">Join DevCollab</h2>
          <p class="text-xs text-slate-400 mt-1">Connect, collaborate, and build with developers.</p>
        </div>

        <form onsubmit="event.preventDefault(); AuthView.handleSignupSubmit();" class="space-y-3.5">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input type="text" id="reg-name" required placeholder="Alex Turner"
                     class="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Username</label>
              <input type="text" id="reg-username" required placeholder="alex_dev"
                     class="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Email address</label>
            <input type="email" id="reg-email" required placeholder="alex@domain.com"
                   class="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Developer Role</label>
              <select id="reg-role" class="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400">
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Fullstack Engineer">Fullstack Engineer</option>
                <option value="AI/ML Engineer">AI/ML Engineer</option>
                <option value="Mobile Developer">Mobile Developer</option>
                <option value="DevOps / Cloud">DevOps / Cloud</option>
                <option value="UI/UX Engineer">UI/UX Engineer</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Experience Level</label>
              <select id="reg-exp" class="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400">
                <option value="Junior (0-2 yrs)">Junior (0-2 yrs)</option>
                <option value="Mid-Level (3-5 yrs)" selected>Mid-Level (3-5 yrs)</option>
                <option value="Senior (5-8 yrs)">Senior (5-8 yrs)</option>
                <option value="Lead / Architect (8+ yrs)">Lead / Architect (8+ yrs)</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <input type="password" id="reg-password" required placeholder="At least 8 characters"
                   class="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Confirm Password</label>
            <input type="password" id="reg-confirm" required placeholder="Repeat password"
                   class="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
          </div>

          <button type="submit"
                  class="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all">
            Create DevCollab Account
          </button>
        </form>

        <p class="text-center text-xs text-slate-400 mt-5">
          Already registered?
          <button onclick="store.state.authView = 'login'; store.notify();" class="text-cyan-400 font-semibold hover:underline ml-1">
            Sign in
          </button>
        </p>
      </div>
    `;
  },

  handleSignupSubmit() {
    const name = document.getElementById('reg-name').value;
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const role = document.getElementById('reg-role').value;
    const exp = document.getElementById('reg-exp').value;

    store.signup({
      name,
      username,
      email,
      role,
      experienceLevel: exp
    });
  },

  renderForgot() {
    return `
      <div>
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-white tracking-tight">Reset Password</h2>
          <p class="text-xs text-slate-400 mt-1">Enter your registered email and we'll send a password reset link.</p>
        </div>

        <form onsubmit="event.preventDefault(); store.showToast('Password reset link sent to email!', 'success'); store.state.authView = 'login'; store.notify();" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Email address</label>
            <input type="email" required placeholder="developer@example.com"
                   class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400" />
          </div>

          <button type="submit"
                  class="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all">
            Send Reset Instructions
          </button>

          <button type="button" onclick="store.state.authView = 'login'; store.notify();"
                  class="w-full py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-colors">
            Back to Sign In
          </button>
        </form>
      </div>
    `;
  },

  /**
   * Onboarding Flow (4 Steps)
   */
  renderOnboarding(state) {
    const step = this.onboardingStep;
    const user = state.currentUser;

    return `
      <div class="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-slate-950 text-slate-100">
        <div class="w-full max-w-2xl glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-800 animate-fade-in">
          <!-- Step indicator -->
          <div class="flex items-center justify-between pb-6 border-b border-slate-800">
            <div>
              <span class="text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">Step ${step} of 4</span>
              <h2 class="text-xl font-bold text-white mt-0.5">
                ${step === 1 ? 'Basic Information' : step === 2 ? 'Professional Role & Availability' : step === 3 ? 'Skills & Tech Stack' : 'Collaboration & Portfolio'}
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              ${[1, 2, 3, 4].map(s => `
                <div class="w-8 h-1.5 rounded-full ${s <= step ? 'bg-gradient-to-r from-cyan-400 to-indigo-500' : 'bg-slate-800'}"></div>
              `).join('')}
            </div>
          </div>

          <div class="py-6">
            ${step === 1 ? this.renderOnboardingStep1(user) : 
              step === 2 ? this.renderOnboardingStep2(user) : 
              step === 3 ? this.renderOnboardingStep3(user) : 
              this.renderOnboardingStep4(user)}
          </div>

          <!-- Bottom navigation buttons -->
          <div class="flex items-center justify-between pt-6 border-t border-slate-800">
            ${step > 1 ? `
              <button onclick="AuthView.onboardingStep--; store.notify();"
                      class="px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 hover:text-white transition-colors">
                Back
              </button>
            ` : '<div></div>'}

            <div class="flex items-center gap-3">
              <button onclick="store.navigate('dashboard')" class="text-xs text-slate-500 hover:text-slate-300">
                Skip for now
              </button>

              ${step < 4 ? `
                <button onclick="AuthView.onboardingStep++; store.notify();"
                        class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all">
                  Next Step →
                </button>
              ` : `
                <button onclick="store.showToast('Profile setup complete! Welcome to DevCollab 🚀', 'success'); store.navigate('dashboard');"
                        class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/30 transition-all">
                  Complete Profile & Launch Platform ✨
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderOnboardingStep1(user) {
    return `
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <img src="${user.avatar}" alt="Avatar" class="w-16 h-16 rounded-full object-cover ring-2 ring-cyan-400/40" />
          <div>
            <div class="text-sm font-semibold text-white">Profile Photo</div>
            <p class="text-xs text-slate-400">Choose a high-resolution photo or developer avatar.</p>
            <div class="flex gap-2 mt-2">
              <button onclick="store.updateCurrentUser({ avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' })" class="text-[11px] px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300 hover:text-cyan-400">Avatar 1</button>
              <button onclick="store.updateCurrentUser({ avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' })" class="text-[11px] px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300 hover:text-cyan-400">Avatar 2</button>
              <button onclick="store.updateCurrentUser({ avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80' })" class="text-[11px] px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300 hover:text-cyan-400">Avatar 3</button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input type="text" value="${user.name}" onchange="store.updateCurrentUser({ name: this.value })"
                   class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Username</label>
            <input type="text" value="${user.username}" onchange="store.updateCurrentUser({ username: this.value })"
                   class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Location</label>
          <input type="text" value="${user.location}" onchange="store.updateCurrentUser({ location: this.value })"
                 class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Short Bio</label>
          <textarea rows="3" onchange="store.updateCurrentUser({ bio: this.value })"
                    class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400">${user.bio}</textarea>
        </div>
      </div>
    `;
  },

  renderOnboardingStep2(user) {
    return `
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Developer Role</label>
            <input type="text" value="${user.role}" onchange="store.updateCurrentUser({ role: this.value })"
                   class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Current Company</label>
            <input type="text" value="${user.company}" onchange="store.updateCurrentUser({ company: this.value })"
                   class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-2">Collaboration Availability</label>
          <div class="grid grid-cols-3 gap-3">
            ${[
              { val: 'Available', label: '🟢 Available', desc: 'Ready for new projects & hackathons' },
              { val: 'Part-time', label: '🟡 Part-time', desc: 'Few hours/week or mentoring' },
              { val: 'Busy', label: '🔴 Busy', desc: 'Currently occupied in active project' }
            ].map(item => `
              <div onclick="store.updateCurrentUser({ availability: '${item.val}' })"
                   class="p-3 rounded-xl border cursor-pointer transition-all ${
                     user.availability === item.val 
                       ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-md shadow-cyan-500/10' 
                       : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                   }">
                <div class="text-xs font-bold">${item.label}</div>
                <div class="text-[11px] text-slate-400 mt-1">${item.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderOnboardingStep3(user) {
    return `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Select Your Primary Skills</label>
          <p class="text-xs text-slate-400 mb-3">Click to add/remove your core programming languages and frameworks:</p>
          <div class="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-2 bg-slate-900/50 rounded-xl border border-slate-800">
            ${DevData.availableSkills.map(skill => {
              const selected = user.skills.includes(skill);
              return `
                <button type="button"
                  onclick="
                    const sk = [...store.state.currentUser.skills];
                    const idx = sk.indexOf('${skill}');
                    if (idx > -1) sk.splice(idx, 1); else sk.push('${skill}');
                    store.updateCurrentUser({ skills: sk });
                  "
                  class="px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selected 
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/40' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                  }">
                  ${skill}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Add Custom Skill</label>
          <div class="flex gap-2">
            <input type="text" id="custom-skill-input" placeholder="e.g. Bun, Solidity, Prisma..."
                   class="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
            <button type="button" onclick="
              const val = document.getElementById('custom-skill-input').value.trim();
              if (val) {
                const sk = [...store.state.currentUser.skills, val];
                store.updateCurrentUser({ skills: sk });
                document.getElementById('custom-skill-input').value = '';
              }
            " class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold border border-slate-700">
              Add Skill
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderOnboardingStep4(user) {
    return `
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">GitHub Profile</label>
            <input type="url" value="${user.github}" onchange="store.updateCurrentUser({ github: this.value })"
                   class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">LinkedIn</label>
            <input type="url" value="${user.linkedin}" onchange="store.updateCurrentUser({ linkedin: this.value })"
                   class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Portfolio Website</label>
            <input type="url" value="${user.portfolio}" onchange="store.updateCurrentUser({ portfolio: this.value })"
                   class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400" />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-2">Preferred Collaboration Types</label>
          <div class="flex flex-wrap gap-2">
            ${['Hackathons', 'Side Projects', 'Open Source', 'Co-founder', 'Full-time'].map(type => {
              const selected = user.collaborationTypes.includes(type);
              return `
                <button type="button"
                  onclick="
                    const types = [...store.state.currentUser.collaborationTypes];
                    const idx = types.indexOf('${type}');
                    if (idx > -1) types.splice(idx, 1); else types.push('${type}');
                    store.updateCurrentUser({ collaborationTypes: types });
                  "
                  class="px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selected ? 'bg-indigo-600 text-white border border-indigo-400' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }">
                  ${type}
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }
};

window.AuthView = AuthView;
