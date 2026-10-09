/**
 * DevCollab Real-Time Developer Messaging & Chat System
 */

const ChatView = {
  replyingToMessage: null,
  showCodeModal: false,
  showEmojiPicker: false,
  isRecordingVoice: false,
  voiceRecordSeconds: 0,
  voiceInterval: null,

  render(state) {
    const activeChat = state.conversations.find(c => c.id === state.activeChatId) || state.conversations[0];
    const isTyping = activeChat && state.typingUsers[activeChat.participantId];

    return `
      <div class="h-[calc(100vh-6rem)] sm:h-[calc(100vh-5.5rem)] flex flex-col md:flex-row rounded-3xl overflow-hidden glass-panel border border-slate-800 shadow-2xl animate-fade-in relative">
        <!-- Left Sidebar: Conversations & Online Devs (1/3 width on desktop) -->
        <div class="w-full md:w-80 lg:w-96 border-r border-slate-800/80 flex flex-col bg-slate-950/60 flex-shrink-0">
          <!-- Top Chat Header & Search -->
          <div class="p-4 border-b border-slate-800/80 space-y-3">
            <div class="flex items-center justify-between">
              <h2 class="text-base font-bold text-white flex items-center gap-2">
                <i data-lucide="message-square" class="w-4 h-4 text-cyan-400"></i>
                <span>Direct Messages</span>
              </h2>
              <span class="text-xs text-slate-500 font-mono">${state.conversations.length} chats</span>
            </div>

            <!-- Search chats -->
            <div class="relative">
              <i data-lucide="search" class="w-4 h-4 text-slate-500 absolute left-3 top-2.5"></i>
              <input type="text" id="chat-filter-input" placeholder="Search chats by name..."
                     oninput="ChatView.filterConversations(this.value)"
                     class="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400" />
            </div>
          </div>

          <!-- Online Developers Horizontal Row -->
          <div class="p-3 border-b border-slate-800/60 bg-slate-900/30 overflow-x-auto">
            <div class="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Online Developers</div>
            <div class="flex items-center gap-3">
              ${state.developers.filter(d => d.isOnline).map(dev => `
                <div onclick="
                  const c = store.state.conversations.find(conv => conv.participantId === '${dev.id}') || { id: 'chat-${dev.id}', participantId: '${dev.id}', participantName: '${dev.name}', avatar: '${dev.avatar}', role: '${dev.role}', isOnline: true, unreadCount: 0, messages: [] };
                  if (!store.state.conversations.some(x => x.id === c.id)) store.state.conversations.push(c);
                  store.setActiveChat(c.id);
                " class="flex flex-col items-center flex-shrink-0 cursor-pointer group" title="${dev.name}">
                  <div class="relative">
                    <img src="${dev.avatar}" alt="${dev.name}" class="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-cyan-400 transition-all" />
                    <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 status-beacon-online"></span>
                  </div>
                  <span class="text-[10px] text-slate-300 mt-1 max-w-[50px] truncate">${dev.name.split(' ')[0]}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Conversations List -->
          <div id="conversations-list-container" class="flex-1 overflow-y-auto divide-y divide-slate-800/40 p-2 space-y-1">
            ${state.conversations.map(chat => {
              const isActive = activeChat && activeChat.id === chat.id;
              const lastMsg = chat.messages[chat.messages.length - 1];
              return `
                <div onclick="store.setActiveChat('${chat.id}')"
                     class="flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                       isActive 
                         ? 'bg-slate-800/90 border border-cyan-500/30 shadow-md' 
                         : 'hover:bg-slate-900/80 border border-transparent'
                     }">
                  <div class="relative flex-shrink-0">
                    <img src="${chat.avatar}" alt="${chat.participantName}" class="w-11 h-11 rounded-2xl object-cover" />
                    ${chat.isOnline ? `
                      <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-950"></span>
                    ` : ''}
                  </div>

                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <div class="text-xs font-bold text-white truncate ${isActive ? 'text-cyan-400' : ''}">${chat.participantName}</div>
                      <span class="text-[10px] text-slate-500">${chat.lastMessageTime || ''}</span>
                    </div>
                    <div class="text-[11px] text-slate-400 truncate mt-0.5">
                      ${lastMsg ? (lastMsg.type === 'code' ? '💻 [Code Snippet]' : lastMsg.content) : 'No messages yet'}
                    </div>
                  </div>

                  ${chat.unreadCount && chat.unreadCount > 0 ? `
                    <span class="px-1.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold">
                      ${chat.unreadCount}
                    </span>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Main Chat Area -->
        ${!activeChat ? this.renderEmptyChatState() : `
          <div class="flex-1 flex flex-col h-full bg-slate-900/40">
            <!-- Active Conversation Top Bar -->
            <div class="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40 backdrop-blur-md">
              <div class="flex items-center gap-3 cursor-pointer" onclick="store.navigate('profile', { devId: '${activeChat.participantId}' })">
                <div class="relative">
                  <img src="${activeChat.avatar}" alt="${activeChat.participantName}" class="w-10 h-10 rounded-2xl object-cover" />
                  <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${activeChat.isOnline ? 'bg-emerald-400' : 'bg-slate-500'} ring-2 ring-slate-900"></span>
                </div>
                <div>
                  <div class="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>${activeChat.participantName}</span>
                    <i data-lucide="check-circle" class="w-3.5 h-3.5 text-cyan-400"></i>
                  </div>
                  <div class="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span>${activeChat.role}</span>
                    <span>·</span>
                    <span class="text-emerald-400 font-medium">${activeChat.isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>

              <!-- Header Action Controls -->
              <div class="flex items-center gap-2">
                <button onclick="store.startVoiceCall('${activeChat.participantId}')"
                        class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-400 text-slate-200 text-xs font-semibold transition-all border border-slate-700 flex items-center gap-1.5">
                  <i data-lucide="phone-call" class="w-4 h-4 text-emerald-400"></i>
                  <span class="hidden sm:inline">Voice Call</span>
                </button>

                <button onclick="store.navigate('profile', { devId: '${activeChat.participantId}' })"
                        class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                        title="View Profile">
                  <i data-lucide="user" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <!-- Messages Stream -->
            <div id="messages-container" class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <!-- Security & Encryption Badge -->
              <div class="text-center">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-[11px] text-slate-400 border border-slate-800">
                  <i data-lucide="lock" class="w-3 h-3 text-cyan-400"></i>
                  <span>End-to-end encrypted developer channel</span>
                </span>
              </div>

              <!-- Messages List -->
              ${activeChat.messages.map(msg => this.renderMessageBubble(msg, state)).join('')}

              <!-- Typing Indicator -->
              ${isTyping ? `
                <div class="flex items-center gap-2 text-xs text-slate-400 italic animate-pulse">
                  <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>${activeChat.participantName} is typing...</span>
                </div>
              ` : ''}
            </div>

            <!-- Reply Preview Banner (if active) -->
            ${this.replyingToMessage ? `
              <div class="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div class="flex items-center gap-2 truncate">
                  <i data-lucide="reply" class="w-4 h-4 text-cyan-400"></i>
                  <span>Replying to <strong>${this.replyingToMessage.senderName}</strong>:</span>
                  <span class="text-slate-400 truncate italic">"${this.replyingToMessage.content.substring(0, 40)}..."</span>
                </div>
                <button onclick="ChatView.replyingToMessage = null; store.notify();" class="text-slate-500 hover:text-white">
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              </div>
            ` : ''}

            <!-- Voice Recording Status Banner (if recording simulated note) -->
            ${this.isRecordingVoice ? `
              <div class="px-4 py-3 bg-rose-950/40 border-t border-rose-800/60 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
                  <span class="text-xs font-semibold text-rose-300 font-mono">Recording Voice Note (${this.voiceRecordSeconds}s)...</span>
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="ChatView.cancelVoiceRecording()" class="px-2.5 py-1 text-xs text-slate-400 hover:text-white">Cancel</button>
                  <button onclick="ChatView.finishVoiceRecording()" class="px-3 py-1 rounded-lg bg-rose-500 text-white text-xs font-semibold">Send Voice</button>
                </div>
              </div>
            ` : ''}

            <!-- Message Composer Box -->
            <div class="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/60">
              <form onsubmit="event.preventDefault(); ChatView.handleSendMessage();" class="flex items-center gap-2">
                <!-- Emoji Button -->
                <button type="button" onclick="ChatView.toggleEmojiPicker()"
                        class="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                        title="Add Emoji">
                  <i data-lucide="smile" class="w-5 h-5"></i>
                </button>

                <!-- Code Snippet Button -->
                <button type="button" onclick="ChatView.openCodeModal()"
                        class="p-2 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                        title="Insert Code Snippet">
                  <i data-lucide="code" class="w-5 h-5"></i>
                </button>

                <!-- Attach Mock File -->
                <button type="button" onclick="store.showToast('Attachment upload simulated: dev-spec-v1.json ready', 'info')"
                        class="p-2 rounded-xl text-slate-400 hover:text-purple-400 hover:bg-slate-800 transition-colors"
                        title="Attach File">
                  <i data-lucide="paperclip" class="w-5 h-5"></i>
                </button>

                <!-- Voice Note Recorder Button -->
                <button type="button" onclick="ChatView.toggleVoiceRecorder()"
                        class="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        title="Send Voice Message">
                  <i data-lucide="mic" class="w-5 h-5"></i>
                </button>

                <!-- Text Input Field -->
                <input type="text" id="chat-message-input" autocomplete="off"
                       placeholder="Message ${activeChat.participantName}... (Press Enter to send)"
                       class="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400" />

                <!-- Send Button -->
                <button type="submit"
                        class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 flex-shrink-0">
                  <i data-lucide="send" class="w-4 h-4"></i>
                  <span class="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          </div>
        `}

        <!-- Code Snippet Modal Popover -->
        ${this.showCodeModal ? this.renderCodeModal() : ''}
      </div>
    `;
  },

  renderMessageBubble(msg, state) {
    const isMine = msg.senderId === state.currentUser.id;

    return `
      <div class="flex flex-col ${isMine ? 'items-end' : 'items-start'} group">
        <div class="flex items-end gap-2 max-w-[85%] sm:max-w-[75%]">
          ${!isMine ? `
            <img src="${state.conversations.find(c => c.id === state.activeChatId).avatar}" alt="" class="w-6 h-6 rounded-full object-cover mb-1 flex-shrink-0" />
          ` : ''}

          <div class="relative rounded-2xl p-3.5 transition-all ${
            isMine 
              ? 'bg-gradient-to-br from-indigo-600 to-cyan-700 text-white rounded-br-none shadow-md shadow-cyan-900/20' 
              : 'bg-slate-800/90 text-slate-100 rounded-bl-none border border-slate-700/60'
          }">
            <!-- Sender & Time -->
            <div class="flex items-center justify-between gap-4 text-[10px] text-slate-300/80 mb-1">
              <span class="font-semibold">${isMine ? 'You' : msg.senderName}</span>
              <span>${msg.time}</span>
            </div>

            <!-- Content -->
            ${msg.type === 'code' ? `
              <div class="code-container my-1">
                <div class="flex items-center justify-between text-[11px] text-cyan-400 pb-1.5 mb-1.5 border-b border-slate-800 font-mono">
                  <span>${msg.language || 'code'}</span>
                  <button onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent); store.showToast('Code copied to clipboard!', 'info');"
                          class="hover:text-white flex items-center gap-1">
                    <i data-lucide="copy" class="w-3 h-3"></i>
                    <span>Copy</span>
                  </button>
                </div>
                <pre class="text-xs text-slate-200 overflow-x-auto"><code>${msg.content}</code></pre>
              </div>
            ` : msg.type === 'voice' ? `
              <div class="flex items-center gap-3 p-2 bg-slate-900/60 rounded-xl my-1 border border-slate-700/60">
                <button onclick="store.showToast('Playing voice snippet...', 'info')" class="p-2 rounded-full bg-cyan-500 text-slate-950">
                  <i data-lucide="play" class="w-3.5 h-3.5 fill-slate-950"></i>
                </button>
                <div class="flex-1">
                  <div class="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div class="w-2/3 h-full bg-cyan-400 rounded-full"></div>
                  </div>
                  <div class="text-[10px] text-slate-400 mt-1">Voice note (${msg.content})</div>
                </div>
              </div>
            ` : `
              <p class="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">${msg.content}</p>
            `}

            <!-- Read receipts for current user -->
            ${isMine ? `
              <div class="flex justify-end text-[10px] text-cyan-200 mt-1">
                <i data-lucide="check-check" class="w-3.5 h-3.5" title="Delivered and read"></i>
              </div>
            ` : ''}

            <!-- Reactions Row -->
            ${msg.reactions && msg.reactions.length > 0 ? `
              <div class="flex flex-wrap gap-1 mt-2">
                ${msg.reactions.map(r => `
                  <button onclick="store.toggleMessageReaction('${msg.id}', '${r.emoji}')"
                          class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                            r.reacted ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900/60 text-slate-300'
                          }">
                    <span>${r.emoji}</span>
                    <span>${r.count}</span>
                  </button>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Hover Action Toolbar (Reactions, Reply, Delete) -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-1 text-slate-400 text-xs px-2">
          ${['👍', '❤️', '🚀', '🔥', '💻'].map(em => `
            <button onclick="store.toggleMessageReaction('${msg.id}', '${em}')" class="hover:scale-125 transition-transform">
              ${em}
            </button>
          `).join('')}
          <span class="mx-1 text-slate-600">·</span>
          <button onclick="ChatView.replyingToMessage = ${JSON.stringify(msg).replace(/"/g, '&quot;')}; store.notify();"
                  class="hover:text-cyan-400 flex items-center gap-0.5" title="Reply">
            <i data-lucide="reply" class="w-3 h-3"></i>
            <span>Reply</span>
          </button>
          ${isMine ? `
            <button onclick="store.deleteMessage('${msg.id}')" class="hover:text-rose-400 ml-1" title="Delete">
              <i data-lucide="trash-2" class="w-3 h-3"></i>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  },

  handleSendMessage() {
    const input = document.getElementById('chat-message-input');
    if (!input || !input.value.trim()) return;

    store.sendMessage(input.value.trim(), 'text');
    input.value = '';
    this.replyingToMessage = null;

    // Scroll to bottom
    setTimeout(() => {
      const container = document.getElementById('messages-container');
      if (container) container.scrollTop = container.scrollHeight;
    }, 50);
  },

  openCodeModal() {
    this.showCodeModal = true;
    store.notify();
  },

  renderCodeModal() {
    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
           onclick="if(event.target === this) { ChatView.showCodeModal = false; store.notify(); }">
        <div class="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 animate-scale-up">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 class="text-sm font-bold text-white flex items-center gap-2">
              <i data-lucide="code" class="w-4 h-4 text-cyan-400"></i>
              <span>Share Code Snippet</span>
            </h3>
            <button onclick="ChatView.showCodeModal = false; store.notify();" class="text-slate-400 hover:text-white">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="mt-4 space-y-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Language</label>
              <select id="code-snippet-lang" class="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white">
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="rust">Rust</option>
                <option value="go">Go</option>
                <option value="sql">SQL / Postgres</option>
                <option value="json">JSON</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Code Content</label>
              <textarea id="code-snippet-text" rows="6" placeholder="// Paste your snippet here..."
                        class="w-full px-3 py-2 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-700 focus:outline-none focus:border-cyan-400"></textarea>
            </div>

            <div class="flex justify-end gap-2 pt-2">
              <button onclick="ChatView.showCodeModal = false; store.notify();" class="px-3 py-1.5 rounded-xl text-xs text-slate-400">Cancel</button>
              <button onclick="
                const lang = document.getElementById('code-snippet-lang').value;
                const text = document.getElementById('code-snippet-text').value;
                if (text.trim()) {
                  store.sendMessage(text.trim(), 'code', { language: lang });
                  ChatView.showCodeModal = false;
                }
              " class="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-md">
                Insert & Send
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  toggleVoiceRecorder() {
    if (this.isRecordingVoice) {
      this.finishVoiceRecording();
    } else {
      this.isRecordingVoice = true;
      this.voiceRecordSeconds = 0;
      this.voiceInterval = setInterval(() => {
        this.voiceRecordSeconds++;
        store.notify();
      }, 1000);
      store.notify();
    }
  },

  cancelVoiceRecording() {
    this.isRecordingVoice = false;
    if (this.voiceInterval) clearInterval(this.voiceInterval);
    store.notify();
  },

  finishVoiceRecording() {
    this.isRecordingVoice = false;
    if (this.voiceInterval) clearInterval(this.voiceInterval);
    const secs = this.voiceRecordSeconds || 5;
    store.sendMessage(`${secs}s audio message`, 'voice');
  },

  toggleEmojiPicker() {
    const emojis = ["🚀", "🔥", "💡", "💻", "✨", "🎉", "👍", "🤝"];
    const input = document.getElementById('chat-message-input');
    if (input) {
      input.value += " " + emojis[Math.floor(Math.random() * emojis.length)];
      input.focus();
    }
  },

  filterConversations(query) {
    const q = query.toLowerCase().trim();
    const items = document.querySelectorAll('#conversations-list-container > div');
    items.forEach(el => {
      const text = el.textContent.toLowerCase();
      el.style.display = text.includes(q) ? 'flex' : 'none';
    });
  },

  renderEmptyChatState() {
    return `
      <div class="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div class="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-4 shadow-xl">
          <i data-lucide="message-square-dashed" class="w-8 h-8"></i>
        </div>
        <h3 class="text-lg font-bold text-white">No chats yet</h3>
        <p class="text-xs text-slate-400 max-w-sm mt-1">
          Connect with developers and start collaborating on code, architectures, and side projects.
        </p>
        <button onclick="store.navigate('discover')"
                class="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20">
          Discover Developers
        </button>
      </div>
    `;
  }
};

window.ChatView = ChatView;
