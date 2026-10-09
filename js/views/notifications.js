/**
 * DevCollab Notification Center View
 */

const NotificationsView = {
  currentFilter: 'all', // 'all', 'unread', 'messages', 'connections', 'projects'

  render(state) {
    const filter = this.currentFilter;
    let list = [...state.notifications];

    if (filter === 'unread') {
      list = list.filter(n => !n.read);
    } else if (filter === 'messages') {
      list = list.filter(n => n.type === 'message');
    } else if (filter === 'connections') {
      list = list.filter(n => n.type === 'connection_request');
    } else if (filter === 'projects') {
      list = list.filter(n => n.type === 'project_invite' || n.type === 'task');
    }

    const unreadCount = state.notifications.filter(n => !n.read).length;

    return `
      <div class="space-y-6 animate-fade-in pb-16 max-w-4xl mx-auto">
        <!-- Notifications Header -->
        <div class="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-extrabold text-white tracking-tight">Notification Center</h1>
              ${unreadCount > 0 ? `
                <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-500 text-slate-950 font-mono">
                  ${unreadCount} new
                </span>
              ` : ''}
            </div>
            <p class="text-xs text-slate-400 mt-1">
              Stay updated with messages, connection requests, project invites, and team mentions.
            </p>
          </div>

          <div class="flex items-center gap-2">
            ${unreadCount > 0 ? `
              <button onclick="store.markAllNotificationsRead()"
                      class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5">
                <i data-lucide="check-check" class="w-3.5 h-3.5 text-cyan-400"></i>
                <span>Mark All as Read</span>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Filter Pill Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          ${[
            { id: 'all', label: 'All Notifications' },
            { id: 'unread', label: `Unread (${unreadCount})` },
            { id: 'messages', label: 'Messages' },
            { id: 'connections', label: 'Connection Requests' },
            { id: 'projects', label: 'Projects & Tasks' }
          ].map(tab => `
            <button onclick="NotificationsView.currentFilter = '${tab.id}'; store.notify();"
                    class="px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                      filter === tab.id 
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' 
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }">
              ${tab.label}
            </button>
          `).join('')}
        </div>

        <!-- Notification Items Stream -->
        <div class="space-y-3">
          ${list.length === 0 ? `
            <div class="glass-panel rounded-3xl p-12 text-center border border-slate-800">
              <div class="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-3">
                <i data-lucide="bell-off" class="w-8 h-8"></i>
              </div>
              <h3 class="text-base font-bold text-white">No notifications in this view</h3>
              <p class="text-xs text-slate-400 mt-1">You are all caught up with your network!</p>
            </div>
          ` : list.map(item => this.renderNotificationCard(item, state)).join('')}
        </div>
      </div>
    `;
  },

  renderNotificationCard(item, state) {
    let icon = 'bell';
    let iconBg = 'bg-slate-800 text-cyan-400';

    if (item.type === 'message') {
      icon = 'message-square';
      iconBg = 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
    } else if (item.type === 'connection_request') {
      icon = 'user-plus';
      iconBg = 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
    } else if (item.type === 'project_invite') {
      icon = 'folder-plus';
      iconBg = 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
    } else if (item.type === 'recommendation') {
      icon = 'sparkles';
      iconBg = 'bg-pink-500/10 text-pink-400 border border-pink-500/20';
    } else if (item.type === 'task') {
      icon = 'check-square';
      iconBg = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    }

    return `
      <div onclick="store.markNotificationRead('${item.id}')"
           class="glass-card p-4 sm:p-5 rounded-2xl border transition-all ${
             item.read ? 'border-slate-800/80 bg-slate-950/40' : 'border-cyan-500/40 bg-slate-900/90 shadow-md shadow-cyan-950/20'
           } flex items-start gap-4 cursor-pointer group">
        <!-- Avatar / Icon -->
        <div class="relative flex-shrink-0">
          ${item.avatar ? `
            <img src="${item.avatar}" alt="" class="w-11 h-11 rounded-2xl object-cover ring-2 ring-slate-800" />
            <div class="absolute -bottom-1 -right-1 p-1 rounded-full ${iconBg} shadow-sm">
              <i data-lucide="${icon}" class="w-3 h-3"></i>
            </div>
          ` : `
            <div class="w-11 h-11 rounded-2xl ${iconBg} flex items-center justify-center">
              <i data-lucide="${icon}" class="w-5 h-5"></i>
            </div>
          `}
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2">
            <h3 class="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
              ${item.title}
            </h3>
            <span class="text-[10px] text-slate-500 whitespace-nowrap">${item.time}</span>
          </div>

          <p class="text-xs text-slate-300 mt-1 leading-relaxed">${item.content}</p>

          <!-- Action buttons for connection requests -->
          ${item.type === 'connection_request' ? `
            <div class="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800/60" onclick="event.stopPropagation();">
              <button onclick="store.handleConnectionRequest('${item.id}', '${item.actionId}', true)"
                      class="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>Accept Connection</span>
              </button>
              <button onclick="store.handleConnectionRequest('${item.id}', '${item.actionId}', false)"
                      class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors">
                Decline
              </button>
            </div>
          ` : item.type === 'project_invite' ? `
            <div class="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800/60" onclick="event.stopPropagation();">
              <button onclick="store.navigate('projects', { projectId: '${item.actionId}' }); store.markNotificationRead('${item.id}');"
                      class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5">
                <i data-lucide="folder-git-2" class="w-3.5 h-3.5"></i>
                <span>View & Join Project</span>
              </button>
            </div>
          ` : item.type === 'message' ? `
            <div class="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800/60" onclick="event.stopPropagation();">
              <button onclick="store.navigate('chats', { chatId: '${item.actionId}' }); store.markNotificationRead('${item.id}');"
                      class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold flex items-center gap-1.5">
                <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
                <span>Reply in Chat</span>
              </button>
            </div>
          ` : ''}
        </div>

        ${!item.read ? `
          <div class="w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-slate-900 flex-shrink-0 mt-1"></div>
        ` : ''}
      </div>
    `;
  }
};

window.NotificationsView = NotificationsView;
