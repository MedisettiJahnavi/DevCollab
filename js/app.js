/**
 * DevCollab Application Orchestrator & Main Router
 */

function renderApp() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const state = store.state;

  // 1. If unauthenticated, show Authentication Flow (Login, Signup, Forgot, Onboarding)
  if (!state.isAuthenticated) {
    root.innerHTML = AuthView.render(state);
    if (window.lucide) lucide.createIcons();
    return;
  }

  // 2. Select main content view
  let mainContent = '';
  switch (state.currentView) {
    case 'dashboard':
      mainContent = DashboardView.render(state);
      break;
    case 'discover':
      mainContent = DiscoverView.render(state);
      break;
    case 'profile':
      mainContent = ProfileView.render(state);
      break;
    case 'chats':
      mainContent = ChatView.render(state);
      break;
    case 'voice':
      mainContent = VoiceView.render(state);
      break;
    case 'projects':
      mainContent = ProjectsView.render(state);
      break;
    case 'notifications':
      mainContent = NotificationsView.render(state);
      break;
    case 'settings':
      mainContent = SettingsView.render(state);
      break;
    default:
      mainContent = DashboardView.render(state);
  }

  // 3. Assemble full desktop and mobile responsive layout
  root.innerHTML = `
    <div class="min-h-screen flex w-full bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 relative">
      <!-- Desktop Persistent Sidebar -->
      ${DevComponents.renderSidebar(state)}

      <!-- Main Workspace (Header + Scrollable Main Content + Modals) -->
      <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <!-- Top Sticky Header -->
        ${DevComponents.renderHeader(state)}

        <!-- Main Dynamic View Container -->
        <main class="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-8">
          ${mainContent}
        </main>
      </div>

      <!-- Mobile Bottom Navigation Bar -->
      ${DevComponents.renderBottomNav(state)}

      <!-- Modals and Popovers Layer -->
      ${DevComponents.renderCommandSearchModal(state)}
      ${DevComponents.renderCreateProjectModal(state)}
      ${DevComponents.renderInviteModal(state)}

      <!-- Global Toast Alerts Layer -->
      ${DevComponents.renderToasts(state.toasts)}
    </div>
  `;

  // 4. Initialize icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Global Keyboard Shortcuts
window.addEventListener('keydown', (e) => {
  // Ctrl + K or Cmd + K: Command Palette
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    store.state.modals.commandSearch = !store.state.modals.commandSearch;
    store.notify();
    setTimeout(() => {
      const input = document.getElementById('command-search-input');
      if (input) input.focus();
    }, 50);
  }

  // Escape key: close all modals
  if (e.key === 'Escape') {
    let changed = false;
    Object.keys(store.state.modals).forEach(k => {
      if (store.state.modals[k]) {
        store.state.modals[k] = false;
        changed = true;
      }
    });
    if (changed) store.notify();
  }
});

// Subscribe application renderer to central reactive state
store.subscribe(() => {
  renderApp();
});

// Initial boot on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
