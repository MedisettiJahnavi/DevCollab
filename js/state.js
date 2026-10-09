/**
 * DevCollab Central Reactive State Management & Store
 */

class DevCollabStore {
  constructor() {
    this.listeners = [];
    this.init();
  }

  init() {
    // Load persisted state if exists, else load defaults from DevData
    const savedUser = localStorage.getItem('devcollab_user');
    const savedTheme = localStorage.getItem('devcollab_theme') || 'dark';
    const savedAccent = localStorage.getItem('devcollab_accent') || 'cyan';
    const savedAuth = localStorage.getItem('devcollab_auth');

    this.state = {
      // Auth state
      isAuthenticated: savedAuth === 'true' || true, // default to authenticated for instant preview, can log out anytime
      authView: 'login', // 'login', 'signup', 'forgot', 'onboarding'
      currentUser: savedUser ? JSON.parse(savedUser) : { ...DevData.currentUser },
      
      // Navigation & View
      currentView: 'dashboard', // 'dashboard', 'discover', 'profile', 'chats', 'voice', 'projects', 'notifications', 'settings'
      viewHistory: ['dashboard'],
      selectedDevId: null, // when viewing a profile
      selectedProjectId: null, // when viewing a project detail
      
      // Theme & Appearance
      theme: savedTheme,
      accentColor: savedAccent,
      
      // Developers & Discover
      developers: [...DevData.developers],
      discoverFilters: {
        query: '',
        role: 'all',
        skills: [],
        experienceLevel: 'all',
        availability: 'all',
        remoteOnly: false,
        sortBy: 'best-match', // 'best-match', 'experience', 'recent', 'newest'
        viewMode: 'grid' // 'grid' or 'list'
      },
      
      // Projects
      projects: [...DevData.projects],
      
      // Chats
      conversations: [...DevData.conversations],
      activeChatId: 'chat-alex',
      typingUsers: {}, // devId -> boolean
      
      // Voice Calls
      callHistory: [...DevData.callHistory],
      activeCall: null, // { devId, name, avatar, status: 'calling'|'connected', seconds: 0, isMuted: false, isSpeaker: true }
      callTimerInterval: null,
      
      // Notifications
      notifications: [...DevData.notifications],
      unreadNotifCount: DevData.notifications.filter(n => !n.read).length,
      
      // Activity & Search History
      activityHistory: [...DevData.activityHistory],
      
      // UI Modals & Popovers
      modals: {
        createProject: false,
        commandSearch: false,
        onboarding: false,
        inviteToProject: false,
        voiceCallModal: false
      },
      
      // Toast notification stack
      toasts: []
    };

    // Apply theme to document
    this.applyTheme();
  }

  // Subscribe to state changes
  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  notify(eventKey = null) {
    this.listeners.forEach(fn => fn(this.state, eventKey));
  }

  // Set theme & accent
  setTheme(themeName) {
    this.state.theme = themeName;
    localStorage.setItem('devcollab_theme', themeName);
    this.applyTheme();
    this.notify('theme');
  }

  setAccentColor(color) {
    this.state.accentColor = color;
    localStorage.setItem('devcollab_accent', color);
    this.applyTheme();
    this.notify('theme');
  }

  applyTheme() {
    const root = document.documentElement;
    if (this.state.theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }

    // Set accent CSS variable
    let hex = '#00d9ff';
    if (this.state.accentColor === 'purple') hex = '#a855f7';
    if (this.state.accentColor === 'emerald') hex = '#10b981';
    if (this.state.accentColor === 'amber') hex = '#f59e0b';
    root.style.setProperty('--accent-color', hex);
  }

  // Navigation router
  navigate(viewName, params = {}) {
    if (params.devId) this.state.selectedDevId = params.devId;
    if (params.projectId) this.state.selectedProjectId = params.projectId;
    if (params.chatId) {
      this.state.activeChatId = params.chatId;
      this.markChatRead(params.chatId);
    }
    
    this.state.currentView = viewName;
    this.state.viewHistory.push(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.notify('navigation');
  }

  // Auth management
  login(email, password) {
    this.state.isAuthenticated = true;
    localStorage.setItem('devcollab_auth', 'true');
    this.showToast('Welcome back to DevCollab!', 'success');
    this.navigate('dashboard');
  }

  signup(userData) {
    this.state.currentUser = {
      ...this.state.currentUser,
      ...userData
    };
    localStorage.setItem('devcollab_user', JSON.stringify(this.state.currentUser));
    this.state.isAuthenticated = true;
    localStorage.setItem('devcollab_auth', 'true');
    this.showToast('Account created successfully!', 'success');
    // Offer onboarding wizard
    this.state.authView = 'onboarding';
    this.notify('auth');
  }

  logout() {
    this.state.isAuthenticated = false;
    localStorage.setItem('devcollab_auth', 'false');
    this.state.authView = 'login';
    this.showToast('You have been signed out.', 'info');
    this.notify('auth');
  }

  updateCurrentUser(updates) {
    this.state.currentUser = { ...this.state.currentUser, ...updates };
    localStorage.setItem('devcollab_user', JSON.stringify(this.state.currentUser));
    this.showToast('Profile updated successfully!', 'success');
    this.notify('user');
  }

  // Developer Discover Filter methods
  setDiscoverFilter(key, value) {
    this.state.discoverFilters[key] = value;
    // Log search history if it's a non-empty query
    if (key === 'query' && value.trim().length > 3) {
      this.addSearchHistory(value.trim());
    }
    this.notify('discover_filters');
  }

  toggleDiscoverSkill(skill) {
    const skills = [...this.state.discoverFilters.skills];
    const index = skills.indexOf(skill);
    if (index > -1) {
      skills.splice(index, 1);
    } else {
      skills.push(skill);
    }
    this.state.discoverFilters.skills = skills;
    this.notify('discover_filters');
  }

  resetDiscoverFilters() {
    this.state.discoverFilters = {
      query: '',
      role: 'all',
      skills: [],
      experienceLevel: 'all',
      availability: 'all',
      remoteOnly: false,
      sortBy: 'best-match',
      viewMode: 'grid'
    };
    this.notify('discover_filters');
  }

  // Connect with developer
  toggleConnection(devId) {
    const dev = this.state.developers.find(d => d.id === devId);
    if (!dev) return;

    if (dev.connectionStatus === 'connected') {
      dev.connectionStatus = 'none';
      this.showToast(`Removed connection with ${dev.name}`, 'info');
    } else if (dev.connectionStatus === 'pending') {
      dev.connectionStatus = 'none';
      this.showToast(`Canceled connection request to ${dev.name}`, 'info');
    } else {
      dev.connectionStatus = 'pending';
      this.showToast(`Connection request sent to ${dev.name}!`, 'success');
    }
    this.notify('developers');
  }

  // Chat methods
  setActiveChat(chatId) {
    this.state.activeChatId = chatId;
    this.markChatRead(chatId);
    this.notify('chat');
  }

  markChatRead(chatId) {
    const chat = this.state.conversations.find(c => c.id === chatId);
    if (chat && chat.unreadCount > 0) {
      chat.unreadCount = 0;
      this.notify('chat');
    }
  }

  sendMessage(text, type = 'text', extra = {}) {
    const chat = this.state.conversations.find(c => c.id === this.state.activeChatId);
    if (!chat || !text.trim()) return;

    const newMsg = {
      id: 'm-' + Date.now(),
      senderId: this.state.currentUser.id,
      senderName: this.state.currentUser.name,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: type,
      content: text,
      language: extra.language || null,
      reactions: []
    };

    chat.messages.push(newMsg);
    chat.lastMessageTime = 'Just now';
    this.notify('chat');

    // Simulate intelligent developer auto-reply after 2 seconds
    this.simulateDevReply(chat);
  }

  simulateDevReply(chat) {
    const devId = chat.participantId;
    this.state.typingUsers[devId] = true;
    this.notify('chat');

    setTimeout(() => {
      this.state.typingUsers[devId] = false;
      const replies = [
        "Sounds awesome! Let me check the branch and pull the latest changes right now. 👍",
        "Totally agreed. Let's schedule a quick voice chat sync to align on the technical specs.",
        "Great catch! I just updated the Docker container configs and verified the logs.",
        "That looks clean! I will review and merge it into staging shortly.",
        "I love this architecture. The WebAssembly integration should easily double the performance."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      chat.messages.push({
        id: 'm-' + Date.now(),
        senderId: devId,
        senderName: chat.participantName,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        content: randomReply,
        reactions: []
      });
      chat.lastMessageTime = 'Just now';
      this.notify('chat');
    }, 2200);
  }

  toggleMessageReaction(messageId, emoji) {
    const chat = this.state.conversations.find(c => c.id === this.state.activeChatId);
    if (!chat) return;
    const msg = chat.messages.find(m => m.id === messageId);
    if (!msg) return;

    const existing = msg.reactions.find(r => r.emoji === emoji);
    if (existing) {
      if (existing.reacted) {
        existing.count--;
        existing.reacted = false;
        if (existing.count <= 0) {
          msg.reactions = msg.reactions.filter(r => r.emoji !== emoji);
        }
      } else {
        existing.count++;
        existing.reacted = true;
      }
    } else {
      msg.reactions.push({ emoji, count: 1, reacted: true });
    }
    this.notify('chat');
  }

  deleteMessage(messageId) {
    const chat = this.state.conversations.find(c => c.id === this.state.activeChatId);
    if (!chat) return;
    chat.messages = chat.messages.filter(m => m.id !== messageId);
    this.showToast('Message deleted', 'info');
    this.notify('chat');
  }

  // Voice Call methods
  startVoiceCall(devId) {
    const dev = this.state.developers.find(d => d.id === devId) || {
      id: devId,
      name: "Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      role: "Collaborator"
    };

    if (this.state.activeCall) {
      this.endVoiceCall();
    }

    this.state.activeCall = {
      devId: dev.id,
      name: dev.name,
      avatar: dev.avatar,
      role: dev.role,
      status: 'calling', // 'calling' -> 'connected'
      seconds: 0,
      isMuted: false,
      isSpeaker: true,
      isMicStopped: false
    };

    this.state.modals.voiceCallModal = true;
    this.notify('voice');

    // Simulate answer after 2.5 seconds
    setTimeout(() => {
      if (this.state.activeCall && this.state.activeCall.status === 'calling') {
        this.state.activeCall.status = 'connected';
        this.startCallTimer();
        this.showToast(`Connected with ${dev.name} (HD Voice)`, 'success');
        this.notify('voice');
      }
    }, 2500);
  }

  startCallTimer() {
    if (this.state.callTimerInterval) clearInterval(this.state.callTimerInterval);
    this.state.callTimerInterval = setInterval(() => {
      if (this.state.activeCall && this.state.activeCall.status === 'connected') {
        this.state.activeCall.seconds++;
        this.notify('voice_timer');
      }
    }, 1000);
  }

  toggleCallMute() {
    if (!this.state.activeCall) return;
    this.state.activeCall.isMuted = !this.state.activeCall.isMuted;
    this.showToast(this.state.activeCall.isMuted ? 'Microphone muted' : 'Microphone unmuted', 'info');
    this.notify('voice');
  }

  toggleCallSpeaker() {
    if (!this.state.activeCall) return;
    this.state.activeCall.isSpeaker = !this.state.activeCall.isSpeaker;
    this.showToast(this.state.activeCall.isSpeaker ? 'Audio output: Speaker' : 'Audio output: Headphones', 'info');
    this.notify('voice');
  }

  endVoiceCall() {
    if (!this.state.activeCall) return;
    
    // Log in call history
    const durationMins = Math.floor(this.state.activeCall.seconds / 60);
    const durationSecs = this.state.activeCall.seconds % 60;
    const durationStr = `${durationMins.toString().padStart(2, '0')}m ${durationSecs.toString().padStart(2, '0')}s`;

    this.state.callHistory.unshift({
      id: 'call-' + Date.now(),
      participantId: this.state.activeCall.devId,
      participantName: this.state.activeCall.name,
      avatar: this.state.activeCall.avatar,
      type: 'outgoing',
      status: this.state.activeCall.status === 'connected' ? 'completed' : 'cancelled',
      duration: durationStr,
      timestamp: 'Just now',
      quality: 'HD Audio'
    });

    if (this.state.callTimerInterval) {
      clearInterval(this.state.callTimerInterval);
      this.state.callTimerInterval = null;
    }

    this.showToast(`Call ended (${durationStr})`, 'info');
    this.state.activeCall = null;
    this.state.modals.voiceCallModal = false;
    this.notify('voice');
  }

  // Project methods
  createProject(projectData) {
    const newProj = {
      id: 'proj-' + Date.now(),
      title: projectData.title,
      tagline: projectData.tagline || projectData.description.substring(0, 70) + '...',
      description: projectData.description,
      requiredSkills: projectData.requiredSkills || [],
      projectType: projectData.projectType || 'Side Project',
      visibility: projectData.visibility || 'Public',
      teamSize: 1,
      maxTeamSize: parseInt(projectData.maxTeamSize) || 4,
      progress: 0,
      deadline: projectData.deadline || 'Dec 2026',
      owner: this.state.currentUser.id,
      members: [
        {
          id: this.state.currentUser.id,
          name: this.state.currentUser.name,
          role: 'Project Creator',
          avatar: this.state.currentUser.avatar
        }
      ],
      openRoles: projectData.openRoles || ['Core Contributor'],
      tasks: [
        { id: 't-' + Date.now(), title: 'Initialize project repository & architecture', status: 'todo', priority: 'high', assignee: this.state.currentUser.name }
      ],
      discussions: [],
      files: [],
      activity: [
        { user: this.state.currentUser.name, action: 'created the project', time: 'Just now' }
      ]
    };

    this.state.projects.unshift(newProj);
    this.state.modals.createProject = false;
    this.showToast(`Project "${newProj.title}" created successfully!`, 'success');
    this.navigate('projects', { projectId: newProj.id });
  }

  updateTaskStatus(projectId, taskId, newStatus) {
    const project = this.state.projects.find(p => p.id === projectId);
    if (!project) return;
    const task = project.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.status = newStatus;
    // Calculate new progress
    const total = project.tasks.length;
    const completed = project.tasks.filter(t => t.status === 'completed').length;
    project.progress = Math.round((completed / total) * 100);

    project.activity.unshift({
      user: this.state.currentUser.name,
      action: `moved task "${task.title}" to ${newStatus}`,
      time: 'Just now'
    });

    this.notify('projects');
  }

  addProjectTask(projectId, taskData) {
    const project = this.state.projects.find(p => p.id === projectId);
    if (!project) return;

    const newTask = {
      id: 't-' + Date.now(),
      title: taskData.title,
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      assignee: taskData.assignee || 'Unassigned'
    };

    project.tasks.push(newTask);
    project.activity.unshift({
      user: this.state.currentUser.name,
      action: `added task "${newTask.title}"`,
      time: 'Just now'
    });

    this.showToast('Task added to project!', 'success');
    this.notify('projects');
  }

  addProjectDiscussion(projectId, content) {
    const project = this.state.projects.find(p => p.id === projectId);
    if (!project || !content.trim()) return;

    project.discussions.unshift({
      id: 'd-' + Date.now(),
      author: this.state.currentUser.name,
      avatar: this.state.currentUser.avatar,
      time: 'Just now',
      content: content,
      likes: 0
    });

    this.showToast('Comment posted', 'success');
    this.notify('projects');
  }

  inviteDevToProject(devId, projectId) {
    const dev = this.state.developers.find(d => d.id === devId);
    const project = this.state.projects.find(p => p.id === projectId);
    if (!dev || !project) return;

    // Check if already member
    if (project.members.some(m => m.id === dev.id)) {
      this.showToast(`${dev.name} is already a member of this project!`, 'info');
      return;
    }

    project.members.push({
      id: dev.id,
      name: dev.name,
      role: dev.role,
      avatar: dev.avatar
    });
    project.teamSize = project.members.length;

    project.activity.unshift({
      user: this.state.currentUser.name,
      action: `invited ${dev.name} to the team`,
      time: 'Just now'
    });

    this.showToast(`Invited ${dev.name} to "${project.title}"!`, 'success');
    this.state.modals.inviteToProject = false;
    this.notify('projects');
  }

  // Notifications
  markNotificationRead(id) {
    const notif = this.state.notifications.find(n => n.id === id);
    if (notif && !notif.read) {
      notif.read = true;
      this.state.unreadNotifCount = Math.max(0, this.state.unreadNotifCount - 1);
      this.notify('notifications');
    }
  }

  markAllNotificationsRead() {
    this.state.notifications.forEach(n => n.read = true);
    this.state.unreadNotifCount = 0;
    this.showToast('All notifications marked as read', 'info');
    this.notify('notifications');
  }

  handleConnectionRequest(notifId, devId, accept = true) {
    this.markNotificationRead(notifId);
    const dev = this.state.developers.find(d => d.id === devId);
    if (dev) {
      dev.connectionStatus = accept ? 'connected' : 'none';
      this.showToast(accept ? `Connected with ${dev.name}!` : `Connection declined.`, accept ? 'success' : 'info');
      this.notify('developers');
    }
  }

  // History management
  addSearchHistory(query) {
    if (!query) return;
    // Don't duplicate top query
    if (this.state.activityHistory.length > 0 && this.state.activityHistory[0].query === query) return;
    this.state.activityHistory.unshift({
      type: 'search',
      query: query,
      time: 'Just now'
    });
  }

  clearSearchHistory() {
    this.state.activityHistory = this.state.activityHistory.filter(h => h.type !== 'search');
    this.showToast('Search history cleared', 'info');
    this.notify('history');
  }

  clearCallHistory() {
    this.state.callHistory = [];
    this.showToast('Call history cleared', 'info');
    this.notify('voice');
  }

  // Toast UI notification system
  showToast(message, type = 'info') {
    const id = 'toast-' + Date.now() + Math.random();
    this.state.toasts.push({ id, message, type });
    this.notify('toast');

    setTimeout(() => {
      this.state.toasts = this.state.toasts.filter(t => t.id !== id);
      this.notify('toast');
    }, 3800);
  }
}

window.store = new DevCollabStore();
