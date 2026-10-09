/**
 * DevCollab Dedicated Voice Communication System
 * 
 * Features:
 * - Live HD voice room simulator
 * - Glowing audio-wave visualization powered by AudioWaveVisualizer
 * - Real-time call duration timer
 * - Audio controls (Mute, Speaker, Mic Toggle, End Call, Group Invite)
 * - Complete call history with Incoming/Outgoing/Missed/Completed statuses
 */

const VoiceView = {
  visualizer: null,

  render(state) {
    const isCalling = !!state.activeCall;

    return `
      <div class="space-y-6 animate-fade-in pb-16">
        <!-- Voice Hub Header -->
        <div class="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-extrabold text-white tracking-tight">Voice Communication & Rooms</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                WebRTC HD Audio
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-1">
              Low-latency developer voice rooms for pair programming, architectural syncs, and hackathon standups.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="store.startVoiceCall('dev-1')"
                    class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2">
              <i data-lucide="phone-outgoing" class="w-4 h-4"></i>
              <span>Quick Test Call (Alex Johnson)</span>
            </button>
          </div>
        </div>

        <!-- Main Layout: Active Call Stage + Call History -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left: Active Voice Call Stage / Room (2 Cols) -->
          <div class="lg:col-span-2">
            ${isCalling ? this.renderActiveCallScreen(state) : this.renderNoActiveCallScreen(state)}
          </div>

          <!-- Right: Voice Call Logs & History (1 Col) -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-base font-bold text-white flex items-center gap-2">
                <i data-lucide="history" class="w-4 h-4 text-cyan-400"></i>
                <span>Call History</span>
              </h2>
              ${state.callHistory.length > 0 ? `
                <button onclick="store.clearCallHistory()" class="text-xs text-slate-400 hover:text-rose-400 transition-colors">
                  Clear Logs
                </button>
              ` : ''}
            </div>

            <div class="glass-card p-4 rounded-2xl border border-slate-800 space-y-3">
              ${state.callHistory.length === 0 ? `
                <div class="p-6 text-center text-xs text-slate-500">
                  No call logs recorded yet.
                </div>
              ` : state.callHistory.map(call => this.renderCallHistoryItem(call)).join('')}
            </div>

            <!-- Voice Latency & Codec Stats Info -->
            <div class="glass-card p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
              <div class="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">Audio Engine Specs</div>
              <div class="flex justify-between text-slate-400">
                <span>Audio Codec:</span>
                <span class="text-cyan-400 font-mono">Opus 48kHz Stereo</span>
              </div>
              <div class="flex justify-between text-slate-400">
                <span>Latency:</span>
                <span class="text-emerald-400 font-mono">18ms (Peer-to-Peer)</span>
              </div>
              <div class="flex justify-between text-slate-400">
                <span>Echo Cancellation:</span>
                <span class="text-slate-300 font-mono">DSP Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Screen when a call is actively ringing or connected
   */
  renderActiveCallScreen(state) {
    const call = state.activeCall;
    const isConnected = call.status === 'connected';

    const mins = Math.floor(call.seconds / 60);
    const secs = (call.seconds % 60).toString().padStart(2, '0');
    const timerStr = `${mins}:${secs}`;

    // Initialize and attach visualizer on next animation frame
    setTimeout(() => {
      const canvas = document.getElementById('voice-canvas');
      if (canvas) {
        if (!this.visualizer) {
          this.visualizer = new AudioWaveVisualizer();
        }
        this.visualizer.attach(canvas);
        this.visualizer.start(call.isMuted);
      }
    }, 50);

    return `
      <div class="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-slate-900 border border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center">
        <!-- Ambient pulsating aura rings -->
        <div class="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Connection Status Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full ${
          isConnected ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' : 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400'
        } border text-xs font-semibold mb-6">
          <span class="w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 status-beacon-online' : 'bg-cyan-400 animate-ping'}"></span>
          <span>${isConnected ? 'Connected · HD Voice' : 'Connecting to peer...'}</span>
        </div>

        <!-- Avatar with pulsing rings -->
        <div class="relative my-2">
          <div class="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse"></div>
          <img src="${call.avatar}" alt="${call.name}"
               class="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-cyan-500/40 shadow-2xl relative z-10" />
        </div>

        <!-- Developer Info -->
        <h2 class="text-xl sm:text-2xl font-bold text-white mt-4 tracking-tight">${call.name}</h2>
        <p class="text-xs text-slate-400 mt-0.5">${call.role || 'Collaborator'}</p>

        <!-- Live Duration Timer -->
        <div class="text-xl sm:text-2xl font-mono font-bold text-cyan-300 mt-2">
          ${isConnected ? timerStr : 'Ringing...'}
        </div>

        <!-- Canvas Audio Waveform Visualizer -->
        <div class="w-full max-w-lg my-6 bg-slate-950/70 rounded-2xl p-4 border border-slate-800/80 shadow-inner">
          <div class="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-2">Live Harmonic Frequency Spectrum</div>
          <canvas id="voice-canvas" class="w-full h-24 audio-visualizer-canvas"></canvas>
        </div>

        <!-- Call Action Controls Toolbar -->
        <div class="flex items-center justify-center gap-3 sm:gap-4 flex-wrap mt-2">
          <!-- Mute/Unmute -->
          <button onclick="store.toggleCallMute(); if(VoiceView.visualizer) VoiceView.visualizer.setMuted(store.state.activeCall.isMuted);"
                  class="p-4 rounded-2xl border transition-all ${
                    call.isMuted 
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                  }"
                  title="${call.isMuted ? 'Unmute' : 'Mute'}">
            <i data-lucide="${call.isMuted ? 'mic-off' : 'mic'}" class="w-5 h-5"></i>
          </button>

          <!-- Speaker / Output -->
          <button onclick="store.toggleCallSpeaker()"
                  class="p-4 rounded-2xl border bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700 transition-all"
                  title="Audio Output">
            <i data-lucide="${call.isSpeaker ? 'volume-2' : 'headphones'}" class="w-5 h-5"></i>
          </button>

          <!-- Enable Real Mic option -->
          <button onclick="if(VoiceView.visualizer) { VoiceView.visualizer.enableRealMic(); store.showToast('Microphone input connected!', 'success'); }"
                  class="p-4 rounded-2xl border bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/40 text-slate-200 border-slate-700 transition-all"
                  title="Connect Live Microphone Hardware">
            <i data-lucide="radio" class="w-5 h-5 text-cyan-400"></i>
          </button>

          <!-- Invite Another Developer -->
          <button onclick="store.state.modals.inviteToProject = true; store.notify();"
                  class="p-4 rounded-2xl border bg-slate-800/80 hover:bg-indigo-500/20 hover:text-indigo-400 text-slate-200 border-slate-700 transition-all"
                  title="Invite Developer to Group Room">
            <i data-lucide="user-plus" class="w-5 h-5 text-indigo-400"></i>
          </button>

          <!-- End Call Button (Big Red Button) -->
          <button onclick="store.endVoiceCall(); if(VoiceView.visualizer) VoiceView.visualizer.stop();"
                  class="px-6 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all flex items-center gap-2">
            <i data-lucide="phone-off" class="w-5 h-5"></i>
            <span>End Call</span>
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Screen when idle (no active call)
   */
  renderNoActiveCallScreen(state) {
    return `
      <div class="glass-panel rounded-3xl p-8 sm:p-12 text-center border border-slate-800 flex flex-col items-center justify-center">
        <div class="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-5 shadow-2xl">
          <i data-lucide="phone-call" class="w-10 h-10"></i>
        </div>
        <h2 class="text-xl font-bold text-white">No active voice session</h2>
        <p class="text-xs text-slate-400 max-w-md mt-2 leading-relaxed">
          Start a voice call directly from any developer's profile card, your direct message threads, or launch an instant room with one of your connected collaborators below.
        </p>

        <!-- Connected Devs Quick Call Row -->
        <div class="mt-8 w-full max-w-lg">
          <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-left">Quick Call Collaborators</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${state.developers.slice(0, 4).map(dev => `
              <div onclick="store.startVoiceCall('${dev.id}')"
                   class="p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all flex items-center justify-between group">
                <div class="flex items-center gap-2.5">
                  <div class="relative">
                    <img src="${dev.avatar}" alt="${dev.name}" class="w-9 h-9 rounded-xl object-cover" />
                    ${dev.isOnline ? '<span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900"></span>' : ''}
                  </div>
                  <div class="text-left">
                    <div class="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">${dev.name}</div>
                    <div class="text-[10px] text-slate-500 truncate max-w-[100px]">${dev.role}</div>
                  </div>
                </div>
                <div class="p-2 rounded-xl bg-slate-800 group-hover:bg-cyan-500/20 text-slate-400 group-hover:text-cyan-400">
                  <i data-lucide="phone" class="w-3.5 h-3.5"></i>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Single Call History Row
   */
  renderCallHistoryItem(call) {
    let icon = 'phone-incoming';
    let iconColor = 'text-cyan-400';
    let statusText = 'Incoming';

    if (call.type === 'outgoing') {
      icon = 'phone-outgoing';
      iconColor = 'text-indigo-400';
      statusText = 'Outgoing';
    } else if (call.status === 'missed') {
      icon = 'phone-missed';
      iconColor = 'text-rose-400';
      statusText = 'Missed';
    }

    return `
      <div class="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 transition-colors">
        <div class="flex items-center gap-3 min-w-0">
          <div class="p-2 rounded-xl bg-slate-800/80 ${iconColor} flex-shrink-0">
            <i data-lucide="${icon}" class="w-4 h-4"></i>
          </div>
          <div class="truncate">
            <div class="text-xs font-bold text-white truncate">${call.participantName}</div>
            <div class="text-[10px] text-slate-500">
              ${statusText} · ${call.duration} · ${call.timestamp}
            </div>
          </div>
        </div>

        <button onclick="store.startVoiceCall('${call.participantId}')"
                class="p-2 rounded-xl bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-400 text-slate-400 transition-colors flex-shrink-0 ml-2"
                title="Call Back">
          <i data-lucide="phone-call" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;
  }
};

window.VoiceView = VoiceView;
