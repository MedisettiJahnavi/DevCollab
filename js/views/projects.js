/**
 * DevCollab Project Collaboration System & Kanban Dashboard
 */

const ProjectsView = {
  activeTab: 'tasks', // 'tasks', 'team', 'discussions', 'files', 'activity'

  render(state) {
    const selectedProjectId = state.selectedProjectId;
    const selectedProject = state.projects.find(p => p.id === selectedProjectId);

    if (selectedProject) {
      return this.renderProjectDashboard(selectedProject, state);
    }

    return this.renderProjectsList(state);
  },

  /**
   * Projects Catalog / Grid View
   */
  renderProjectsList(state) {
    return `
      <div class="space-y-6 animate-fade-in pb-16">
        <!-- Projects Top Hero -->
        <div class="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-extrabold text-white tracking-tight">Collaboration Projects</h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                ${state.projects.length} Active
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-1">
              Join open-source projects, startup MVPs, or form hackathon teams based on required skills.
            </p>
          </div>

          <button onclick="store.state.modals.createProject = true; store.notify();"
                  class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Create New Project</span>
          </button>
        </div>

        <!-- Projects Cards Grid -->
        ${state.projects.length === 0 ? this.renderEmptyProjectsState() : `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${state.projects.map(proj => this.renderProjectCard(proj, state)).join('')}
          </div>
        `}
      </div>
    `;
  },

  renderProjectCard(proj, state) {
    return `
      <div onclick="store.navigate('projects', { projectId: '${proj.id}' })"
           class="glass-card p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex flex-col justify-between group">
        <div>
          <!-- Top Tag & Progress -->
          <div class="flex items-center justify-between">
            <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              ${proj.projectType}
            </span>
            <div class="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
              <span class="font-bold text-white">${proj.progress}%</span>
              <span class="text-[10px] text-slate-500">done</span>
            </div>
          </div>

          <h3 class="text-base font-bold text-white group-hover:text-cyan-400 transition-colors mt-3">
            ${proj.title}
          </h3>
          <p class="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">${proj.description}</p>

          <!-- Progress Bar -->
          <div class="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full" style="width: ${proj.progress}%"></div>
          </div>

          <!-- Required Skills -->
          <div class="flex flex-wrap gap-1.5 mt-4">
            ${proj.requiredSkills.map(skill => `
              <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800/90 text-slate-300 border border-slate-700/60">
                ${skill}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Footer Members & Open Roles -->
        <div class="flex items-center justify-between mt-5 pt-3 border-t border-slate-800/80">
          <div class="flex items-center -space-x-2">
            ${proj.members.slice(0, 4).map(m => `
              <img src="${m.avatar}" alt="${m.name}" title="${m.name} (${m.role})" class="w-6 h-6 rounded-full object-cover ring-2 ring-slate-900" />
            `).join('')}
            <span class="text-xs text-slate-400 ml-3">${proj.members.length} / ${proj.maxTeamSize}</span>
          </div>

          <div class="text-[11px] text-cyan-400 flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Manage Dashboard</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Detailed Project Workspace / Dashboard
   */
  renderProjectDashboard(proj, state) {
    return `
      <div class="space-y-6 animate-fade-in pb-16">
        <!-- Back Navigation & Project Hero -->
        <div class="glass-panel rounded-3xl p-6 border border-slate-800">
          <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
            <button onclick="store.navigate('projects', { projectId: null })"
                    class="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
              <span>Back to All Projects</span>
            </button>

            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ● Live Collaboration
              </span>
              <button onclick="store.state.selectedDevId = null; store.state.modals.inviteToProject = true; store.notify();"
                      class="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5">
                <i data-lucide="user-plus" class="w-3.5 h-3.5"></i>
                <span>Invite Dev</span>
              </button>
            </div>
          </div>

          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  ${proj.projectType}
                </span>
                <span class="text-xs text-slate-400">Target Deadline: <strong>${proj.deadline}</strong></span>
              </div>
              <h1 class="text-2xl font-extrabold text-white mt-1.5 tracking-tight">${proj.title}</h1>
              <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">${proj.description}</p>
            </div>

            <!-- Progress Metric -->
            <div class="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-4 flex-shrink-0">
              <div class="text-right">
                <div class="text-2xl font-mono font-bold text-cyan-400">${proj.progress}%</div>
                <div class="text-[10px] text-slate-500 uppercase tracking-wider">Milestone Progress</div>
              </div>
              <div class="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-cyan-400 rounded-full" style="width: ${proj.progress}%"></div>
              </div>
            </div>
          </div>

          <!-- Project Sub-Tabs -->
          <div class="flex items-center gap-6 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto text-xs sm:text-sm font-medium">
            ${[
              { id: 'tasks', label: 'Tasks & Kanban', count: proj.tasks.length },
              { id: 'team', label: 'Team Members', count: proj.members.length },
              { id: 'discussions', label: 'Discussions', count: proj.discussions.length },
              { id: 'files', label: 'Files & Resources', count: proj.files.length },
              { id: 'activity', label: 'Activity Log' }
            ].map(tab => `
              <button onclick="ProjectsView.activeTab = '${tab.id}'; store.notify();"
                      class="pb-2 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        ProjectsView.activeTab === tab.id 
                          ? 'text-cyan-400 border-cyan-400 font-bold' 
                          : 'text-slate-400 border-transparent hover:text-slate-200'
                      }">
                <span>${tab.label}</span>
                ${tab.count !== undefined ? `
                  <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 font-mono">${tab.count}</span>
                ` : ''}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Project Tab Sections -->
        ${ProjectsView.activeTab === 'tasks' ? this.renderTasksTab(proj) :
          ProjectsView.activeTab === 'team' ? this.renderTeamTab(proj) :
          ProjectsView.activeTab === 'discussions' ? this.renderDiscussionsTab(proj) :
          ProjectsView.activeTab === 'files' ? this.renderFilesTab(proj) :
          this.renderProjectActivityTab(proj)}
      </div>
    `;
  },

  /**
   * Tasks / Kanban Board Tab
   */
  renderTasksTab(proj) {
    const todoTasks = proj.tasks.filter(t => t.status === 'todo');
    const inProgressTasks = proj.tasks.filter(t => t.status === 'in-progress');
    const completedTasks = proj.tasks.filter(t => t.status === 'completed');

    return `
      <div class="space-y-6">
        <!-- Add Task Quick Bar -->
        <div class="glass-card p-4 rounded-2xl border border-slate-800">
          <form onsubmit="event.preventDefault(); ProjectsView.handleAddTask('${proj.id}');" class="flex flex-col sm:flex-row items-center gap-3">
            <input type="text" id="new-task-title" required placeholder="Add a new project task or issue..."
                   class="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-full" />
            <select id="new-task-priority" class="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white">
              <option value="high">High Priority</option>
              <option value="medium" selected>Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <button type="submit"
                    class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all whitespace-nowrap">
              + Add Task
            </button>
          </form>
        </div>

        <!-- Kanban Columns -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Column: To Do -->
          <div class="glass-card p-4 rounded-2xl border border-slate-800 space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
              <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">To Do (${todoTasks.length})</span>
              <span class="w-2 h-2 rounded-full bg-slate-400"></span>
            </div>
            <div class="space-y-2.5">
              ${todoTasks.map(task => this.renderTaskItem(task, proj.id)).join('')}
            </div>
          </div>

          <!-- Column: In Progress -->
          <div class="glass-card p-4 rounded-2xl border border-slate-800 space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
              <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider">In Progress (${inProgressTasks.length})</span>
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            </div>
            <div class="space-y-2.5">
              ${inProgressTasks.map(task => this.renderTaskItem(task, proj.id)).join('')}
            </div>
          </div>

          <!-- Column: Completed -->
          <div class="glass-card p-4 rounded-2xl border border-slate-800 space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
              <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Completed (${completedTasks.length})</span>
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <div class="space-y-2.5">
              ${completedTasks.map(task => this.renderTaskItem(task, proj.id)).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderTaskItem(task, projId) {
    let priColor = 'text-slate-400 bg-slate-800';
    if (task.priority === 'high') priColor = 'text-rose-400 bg-rose-500/10 border border-rose-500/30';
    if (task.priority === 'medium') priColor = 'text-amber-400 bg-amber-500/10 border border-amber-500/30';

    return `
      <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-2 group">
        <div class="text-xs font-medium text-white group-hover:text-cyan-300 transition-colors">${task.title}</div>
        
        <div class="flex items-center justify-between text-[10px]">
          <span class="px-2 py-0.5 rounded-md font-semibold ${priColor} capitalize">
            ${task.priority}
          </span>
          <span class="text-slate-400 truncate max-w-[120px]">
            👤 ${task.assignee}
          </span>
        </div>

        <!-- Task Move Status Actions -->
        <div class="pt-2 border-t border-slate-800/60 flex items-center justify-end gap-1 text-[10px]">
          ${task.status !== 'todo' ? `
            <button onclick="store.updateTaskStatus('${projId}', '${task.id}', 'todo')" class="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white">To Do</button>
          ` : ''}
          ${task.status !== 'in-progress' ? `
            <button onclick="store.updateTaskStatus('${projId}', '${task.id}', 'in-progress')" class="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30">In Progress</button>
          ` : ''}
          ${task.status !== 'completed' ? `
            <button onclick="store.updateTaskStatus('${projId}', '${task.id}', 'completed')" class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30">Done</button>
          ` : ''}
        </div>
      </div>
    `;
  },

  handleAddTask(projId) {
    const input = document.getElementById('new-task-title');
    const pri = document.getElementById('new-task-priority').value;
    if (!input || !input.value.trim()) return;

    store.addProjectTask(projId, {
      title: input.value.trim(),
      priority: pri,
      status: 'todo'
    });
    input.value = '';
  },

  /**
   * Team Members Tab
   */
  renderTeamTab(proj) {
    return `
      <div class="space-y-6">
        <div class="glass-card p-6 rounded-2xl border border-slate-800">
          <h2 class="text-base font-bold text-white mb-4">Current Team (${proj.members.length} / ${proj.maxTeamSize})</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${proj.members.map(m => `
              <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <img src="${m.avatar}" alt="${m.name}" class="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-800" />
                <div class="min-w-0">
                  <div class="text-xs font-bold text-white truncate">${m.name}</div>
                  <div class="text-[11px] text-cyan-400">${m.role}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Open Roles needed -->
        <div class="glass-card p-6 rounded-2xl border border-slate-800">
          <h2 class="text-base font-bold text-white mb-2">Open Roles Needed</h2>
          <p class="text-xs text-slate-400 mb-4">Click "Find Developer" to search developers with matching skills.</p>
          <div class="space-y-2.5">
            ${(proj.openRoles || ['Core Contributor']).map(role => `
              <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div class="text-xs font-semibold text-white">Looking for: ${role}</div>
                  <div class="text-[11px] text-slate-500">Required: ${proj.requiredSkills.join(', ')}</div>
                </div>
                <button onclick="store.setDiscoverFilter('query', '${proj.requiredSkills[0] || ''}'); store.navigate('discover');"
                        class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-400 text-xs text-slate-200 transition-colors">
                  Find Developer →
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Discussions Feed Tab
   */
  renderDiscussionsTab(proj) {
    return `
      <div class="space-y-6">
        <!-- Post discussion -->
        <div class="glass-card p-4 rounded-2xl border border-slate-800">
          <form onsubmit="event.preventDefault(); const t = document.getElementById('disc-content'); store.addProjectDiscussion('${proj.id}', t.value); t.value = '';">
            <textarea id="disc-content" rows="3" required placeholder="Share an architectural idea, PR link, or milestone question with the team..."
                      class="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"></textarea>
            <div class="flex justify-end mt-2">
              <button type="submit" class="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-md">
                Post Discussion
              </button>
            </div>
          </form>
        </div>

        <!-- Discussion list -->
        <div class="space-y-3">
          ${proj.discussions.length === 0 ? `
            <div class="glass-card p-6 text-center text-xs text-slate-500 rounded-2xl">
              No discussions posted yet. Start the conversation!
            </div>
          ` : proj.discussions.map(d => `
            <div class="glass-card p-4 rounded-2xl border border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <img src="${d.avatar}" alt="" class="w-7 h-7 rounded-full object-cover" />
                  <span class="text-xs font-bold text-white">${d.author}</span>
                </div>
                <span class="text-[10px] text-slate-500">${d.time}</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">${d.content}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderFilesTab(proj) {
    const files = proj.files || [];
    return `
      <div class="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-white">Project Files & Attachments</h2>
          <button onclick="store.showToast('File upload simulated', 'info')" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-cyan-400 border border-slate-700">
            Upload File
          </button>
        </div>

        ${files.length === 0 ? `
          <div class="p-6 text-center text-xs text-slate-500">No project files shared yet.</div>
        ` : `
          <div class="space-y-2">
            ${files.map(f => `
              <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="p-2 rounded-xl bg-slate-800 text-cyan-400">
                    <i data-lucide="file-text" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="text-xs font-semibold text-white">${f.name}</div>
                    <div class="text-[10px] text-slate-500">${f.size} · ${f.type} · ${f.date}</div>
                  </div>
                </div>
                <button onclick="store.showToast('Downloaded ' + '${f.name}', 'success')" class="text-xs text-cyan-400 hover:underline">Download</button>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  },

  renderProjectActivityTab(proj) {
    const act = proj.activity || [];
    return `
      <div class="glass-card p-6 rounded-2xl border border-slate-800">
        <h2 class="text-base font-bold text-white mb-4">Project Activity Log</h2>
        <div class="space-y-3">
          ${act.map(a => `
            <div class="flex items-start gap-3 text-xs border-b border-slate-800/60 pb-3">
              <div class="w-2 h-2 rounded-full bg-cyan-400 mt-1.5"></div>
              <div>
                <span class="text-white font-semibold">${a.user}</span>
                <span class="text-slate-300"> ${a.action}</span>
                <div class="text-[10px] text-slate-500 mt-0.5">${a.time}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderEmptyProjectsState() {
    return `
      <div class="glass-panel rounded-3xl p-12 text-center border border-slate-800 max-w-lg mx-auto">
        <div class="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-4 mx-auto shadow-xl">
          <i data-lucide="folder-plus" class="w-8 h-8"></i>
        </div>
        <h3 class="text-lg font-bold text-white">No projects yet</h3>
        <p class="text-xs text-slate-400 mt-2">
          Create your first project and build your team with developers across skills, roles, and timezones.
        </p>
        <button onclick="store.state.modals.createProject = true; store.notify();"
                class="mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20">
          Create Project
        </button>
      </div>
    `;
  }
};

window.ProjectsView = ProjectsView;
