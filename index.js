
import { authService } from './services/authService.js';
import { CANDIDATES, SYSTEM_PROMPT } from './constants.js';
import { getAssistantResponse } from './services/gemini.js';

// ESTADO GLOBAL DA APLICAÇÃO
const state = {
  user: JSON.parse(localStorage.getItem('portugal_2026_current_user') || 'null'),
  currentPage: 'dashboard',
  isLoginMode: true,
  isPremium: localStorage.getItem('portugal_2026_premium') === 'true',
  interactions: parseInt(localStorage.getItem('portugal_2026_interactions') || '0'),
  messages: [{ 
    role: 'assistant', 
    content: "Sistema Ativo. Sou o Investigador. O terminal local está sincronizado. Como posso ajudar?" 
  }],
  isLoading: false,
  chatOpen: false,
  selectedCandidate: null
};

const root = document.getElementById('root');
const chatContainer = document.getElementById('chat-container');

const INTERACTION_LIMIT = 2;

/**
 * Utilitários de Navegação
 */
function navigate(page, params = null) {
  state.currentPage = page;
  if (params) state.selectedCandidate = params;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

function incrementInteraction() {
  if (state.isPremium) return true;
  if (state.interactions >= INTERACTION_LIMIT) return false;
  
  state.interactions++;
  localStorage.setItem('portugal_2026_interactions', state.interactions.toString());
  return true;
}

window.openDossier = (index) => {
  if (!state.isPremium && state.interactions >= INTERACTION_LIMIT) {
    navigate('support');
    return;
  }
  incrementInteraction();
  navigate('dossier', CANDIDATES[index]);
};

window.unlockPremium = () => {
  const btn = document.getElementById('btn-unlock-premium');
  if (btn) {
    btn.innerText = "Sincronizando Protocolo...";
    btn.disabled = true;
  }
  
  setTimeout(() => {
    state.isPremium = true;
    localStorage.setItem('portugal_2026_premium', 'true');
    navigate('dashboard');
  }, 1000);
};

/**
 * Renderização Principal
 */
async function render() {
  if (!state.user) {
    state.currentPage = 'registration';
    root.innerHTML = renderRegistration();
    attachAuthEvents();
  } else {
    if (state.currentPage === 'registration') state.currentPage = 'dashboard';
    
    if (state.currentPage === 'dashboard') {
      root.innerHTML = renderDashboard();
      attachDashboardEvents();
    } else if (state.currentPage === 'support') {
      root.innerHTML = renderSupport();
      attachSupportEvents();
    } else if (state.currentPage === 'dossier') {
      root.innerHTML = renderDossier(state.selectedCandidate);
      attachDossierEvents();
    }
  }
  renderChat();
}

function renderRegistration() {
  return `
    <div class="min-h-screen flex items-center justify-center p-6 animate-fade-in">
      <div class="w-full max-w-[420px]">
        <div class="text-center mb-12">
          <div class="inline-flex w-14 h-14 bg-emerald-500 rounded-2xl items-center justify-center text-slate-950 font-black text-2xl italic mb-6 shadow-2xl">26</div>
          <h2 class="text-4xl font-black text-white uppercase tracking-tighter italic leading-tight">Painel de <br/> Autenticação</h2>
        </div>
        <div class="glass-3d rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div class="mb-10 flex p-1 bg-white/5 rounded-xl border border-white/5">
            <button id="btn-tab-login" class="flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${state.isLoginMode ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500'}">Aceder</button>
            <button id="btn-tab-register" class="flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${!state.isLoginMode ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500'}">Registar</button>
          </div>
          <form id="auth-form" class="space-y-6">
            ${!state.isLoginMode ? `<input type="text" id="input_nome" required placeholder="Nome Auditor" class="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-emerald-500/50">` : ''}
            <input type="email" id="input_email" required placeholder="Email" class="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-emerald-500/50">
            <input type="password" id="input_password" required placeholder="Password" class="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-emerald-500/50">
            <div id="auth-status" class="hidden p-4 rounded-xl text-[10px] font-black uppercase text-center"></div>
            <button type="submit" id="btn-submit" class="w-full bg-white text-slate-950 py-5 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-all shadow-xl active:scale-95">
              ${state.isLoginMode ? 'Iniciar Login' : 'Confirmar Registo'}
            </button>
          </form>
        </div>
        <p class="mt-8 text-center text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em] italic">Protocolo de Segurança Local Ativo</p>
      </div>
    </div>
  `;
}

function renderDashboard() {
  const isLimited = !state.isPremium && state.interactions >= INTERACTION_LIMIT;
  return `
    <header class="fixed top-0 left-0 w-full z-[200] border-b border-white/5 bg-slate-950/80 backdrop-blur-2xl">
      <nav class="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
        <button onclick="window.location.reload()" class="flex items-center gap-4">
          <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl italic">26</div>
          <span class="font-black text-sm uppercase tracking-[0.3em] text-white">Portugal 2026</span>
        </button>
        <div class="flex items-center gap-4">
          ${!state.isPremium ? `
            <button id="btn-go-support" class="bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-blue-500 transition-all">Ativar Premium</button>
          ` : `
            <span class="text-blue-400 text-[9px] font-black uppercase tracking-widest px-4 py-2 bg-blue-400/10 rounded-lg border border-blue-400/20">Protocolo Premium Ativo</span>
          `}
          <button id="btn-logout" class="text-rose-500 text-[10px] font-black uppercase tracking-[0.3em] px-6 py-3 border border-rose-500/20 hover:bg-rose-500 hover:text-white rounded-xl transition-all">Sair</button>
        </div>
      </nav>
    </header>
    <main class="pt-32 space-y-24 pb-40 animate-fade-in">
      <section class="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 class="text-6xl sm:text-9xl font-black text-white tracking-tighter italic leading-tight mb-10">AUDITORIA <br/><span class="text-emerald-500">TERMINAL.</span></h1>
        <div class="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-xl">
           <p class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Quota do Investigador</p>
           <div class="flex items-center justify-between gap-4">
              <span class="text-white text-xs font-bold">${state.isPremium ? 'ILIMITADO' : `INTERAÇÕES: ${state.interactions} / ${INTERACTION_LIMIT}`}</span>
              <div class="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 transition-all duration-1000" style="width: ${state.isPremium ? '100%' : (state.interactions / INTERACTION_LIMIT * 100) + '%'}"></div>
              </div>
           </div>
           ${isLimited ? `<p class="mt-4 text-[9px] font-black text-rose-500 uppercase tracking-widest animate-pulse">Quota Excedida. Ative o modo Premium.</p>` : ''}
        </div>
      </section>
      <section class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        ${CANDIDATES.map((c, index) => `
          <div class="relative h-[600px] rounded-[2rem] bg-slate-900/30 border border-white/5 overflow-hidden flex flex-col group transition-all hover:border-emerald-500/20 shadow-xl">
            <div class="h-[40%] overflow-hidden relative">
              <img src="${c.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700">
              <div class="absolute bottom-4 left-6">
                <div class="px-2 py-0.5 bg-white/10 rounded text-[8px] font-black text-white uppercase">${c.partido}</div>
                <h4 class="text-xl font-black text-white uppercase italic">${c.nome}</h4>
              </div>
            </div>
            <div class="p-8 flex-1 flex flex-col justify-between">
              <div class="space-y-4">
                <div class="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Status: Formalizada</div>
                <p class="text-[11px] text-slate-400 leading-relaxed font-medium italic">"${c.proposta}"</p>
              </div>
              <button 
                onclick="window.openDossier(${index})"
                class="w-full py-4 rounded-xl text-[10px] font-black uppercase ${isLimited ? 'bg-slate-800 text-slate-500 border border-white/5' : 'bg-white text-slate-950 hover:bg-emerald-500 hover:text-white'} transition-all shadow-xl active:scale-95"
              >
                ${isLimited ? 'Acesso Limitado' : 'Consultar Dossier'}
              </button>
            </div>
          </div>
        `).join('')}
      </section>
    </main>
  `;
}

function renderDossier(candidate) {
  return `
    <div class="min-h-screen bg-slate-950 pt-32 pb-20 animate-fade-in">
      <div class="max-w-4xl mx-auto px-6">
        <button id="btn-back-dashboard" class="mb-12 flex items-center gap-3 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
           Regressar ao Terminal
        </button>
        <div class="glass-3d rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
          <div class="h-96 relative">
            <img src="${candidate.image}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            <div class="absolute bottom-10 left-12">
               <span class="px-4 py-2 bg-emerald-500 text-slate-950 font-black text-[10px] uppercase rounded-lg">${candidate.partido}</span>
               <h1 class="text-6xl font-black text-white italic uppercase tracking-tighter mt-4">${candidate.nome}</h1>
            </div>
          </div>
          <div class="p-12 space-y-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div class="space-y-4">
                  <h4 class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Proposta Central</h4>
                  <p class="text-slate-300 font-medium italic">"${candidate.proposta}"</p>
               </div>
               <div class="space-y-4">
                  <h4 class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Análise do Investigador</h4>
                  <p class="text-slate-400 text-sm leading-relaxed">Dossier analisado pelo núcleo neural local. Foco absoluto na integridade eleitoral e verificação de factos.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSupport() {
  return `
    <div class="min-h-screen flex items-center justify-center p-6 animate-fade-in">
      <div class="max-w-2xl w-full text-center space-y-10">
        <div class="w-20 h-20 bg-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto text-white shadow-2xl">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div class="space-y-4">
          <h2 class="text-5xl font-black text-white italic uppercase tracking-tighter">Acesso Esgotado.</h2>
          <p class="text-slate-400 text-lg font-medium italic">O terminal gratuito atingiu o limite de auditorias. Desbloqueie o acesso ilimitado para continuar a investigação.</p>
        </div>
        <div class="bg-slate-900/50 border border-white/10 rounded-[2rem] p-10 space-y-8">
           <div class="space-y-2">
             <span class="text-[10px] font-black text-blue-400 uppercase tracking-widest">Protocolo MB WAY</span>
             <h3 class="text-4xl font-black text-white tracking-widest">923 364 360</h3>
           </div>
           <button id="btn-unlock-premium" onclick="window.unlockPremium()" class="w-full py-6 bg-white text-slate-950 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
             Já Apoiei • Ativar Premium
           </button>
           <button id="btn-cancel-support" class="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Voltar Depois</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Eventos da Autenticação
 */
function attachAuthEvents() {
  const form = document.getElementById('auth-form');
  const tabLogin = document.getElementById('btn-tab-login');
  const tabRegister = document.getElementById('btn-tab-register');
  const status = document.getElementById('auth-status');

  tabLogin.onclick = () => { state.isLoginMode = true; render(); };
  tabRegister.onclick = () => { state.isLoginMode = false; render(); };

  form.onsubmit = async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-submit');
    btn.disabled = true;
    btn.innerText = "Autenticando...";
    status.className = "hidden";

    const email = document.getElementById('input_email').value;
    const pass = document.getElementById('input_password').value;

    if (state.isLoginMode) {
      const user = await authService.authenticate(email, pass);
      if (user) {
        state.user = user;
        localStorage.setItem('portugal_2026_current_user', JSON.stringify(user));
        render();
      } else {
        showStatus("Acesso negado. Credenciais incorretas.", "error");
        btn.disabled = false;
        btn.innerText = 'Iniciar Login';
      }
    } else {
      const nomeInput = document.getElementById('input_nome');
      const nome = nomeInput ? nomeInput.value : 'Auditor';
      const newUser = { id: crypto.randomUUID(), name: nome, email, password: pass, createdAt: new Date().toISOString() };
      
      const result = await authService.saveUser(newUser);
      if (result.success) {
        state.user = newUser;
        localStorage.setItem('portugal_2026_current_user', JSON.stringify(newUser));
        render();
      } else {
        showStatus(result.message, "error");
        btn.disabled = false;
        btn.innerText = 'Confirmar Registo';
      }
    }
  };

  function showStatus(msg, type) {
    status.innerText = msg;
    status.className = `p-4 rounded-xl text-[10px] font-black uppercase text-center block ${type === 'error' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500'}`;
  }
}

/**
 * Chat Vanilla
 */
function renderChat() {
  if (!state.user || !chatContainer) return;
  const isLimited = !state.isPremium && state.interactions >= INTERACTION_LIMIT;

  chatContainer.innerHTML = `
    <div class="fixed bottom-8 right-8 z-[1000]">
      <button id="chat-toggle" class="w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden hover:scale-110 transition-all">
        ${state.chatOpen ? '<span class="text-white text-xl">✕</span>' : '<div class="w-full h-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">IA</div>'}
      </button>
    </div>
    <div id="chat-panel" class="fixed bottom-28 right-8 w-full sm:w-[420px] h-[550px] z-[999] bg-slate-950/95 sm:rounded-3xl border border-white/10 shadow-2xl flex flex-col backdrop-blur-xl ${state.chatOpen ? 'opacity-100' : 'opacity-0 pointer-events-none translate-y-10'} transition-all duration-300">
      <div class="p-6 border-b border-white/5 flex justify-between items-center bg-slate-900/50 rounded-t-3xl">
        <span class="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Investigador v3.1</span>
        ${!state.isPremium ? `<span class="text-[8px] font-bold text-slate-500 uppercase tracking-widest">${state.interactions}/${INTERACTION_LIMIT} Auditorias</span>` : ''}
      </div>
      <div id="chat-history" class="flex-1 p-6 overflow-y-auto space-y-4">
        ${state.messages.map(m => `
          <div class="flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}">
            <div class="max-w-[85%] p-4 rounded-xl text-[12px] ${m.role === 'user' ? 'bg-emerald-500 text-slate-900 font-bold' : 'bg-white/5 text-slate-300 border border-white/5'}">
              ${m.content}
              <!-- Fix: Display sources in vanilla JS chat -->
              ${m.role === 'assistant' && m.sources && m.sources.length > 0 ? `
                <div class="mt-3 pt-3 border-t border-white/10 text-[10px]">
                  <p class="text-emerald-500 font-bold uppercase mb-1">Fontes Verificadas:</p>
                  <div class="flex flex-wrap gap-2">
                    ${m.sources.map(s => `<a href="${s.uri}" target="_blank" class="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-slate-400 hover:text-white truncate max-w-full transition-colors">${s.title}</a>`).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
      <div class="p-6 border-t border-white/5 space-y-3">
        ${isLimited ? `
          <div class="p-4 bg-blue-600/10 rounded-xl text-center space-y-2">
            <p class="text-[9px] text-blue-400 font-black uppercase tracking-widest">Limite Gratuito Atingido</p>
            <button id="chat-upgrade" class="w-full py-2 bg-blue-600 text-white text-[9px] font-black uppercase rounded-lg">Fazer Upgrade</button>
          </div>
        ` : `
          <div class="flex gap-2">
            <input type="text" id="chat-input" placeholder="Consultar Investigador..." class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none">
            <button id="chat-send" class="w-12 h-12 bg-white text-slate-950 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">➔</button>
          </div>
        `}
      </div>
    </div>
  `;

  document.getElementById('chat-toggle').onclick = () => { state.chatOpen = !state.chatOpen; renderChat(); };
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const upgradeBtn = document.getElementById('chat-upgrade');

  if (upgradeBtn) upgradeBtn.onclick = () => navigate('support');

  const handleSend = async () => {
    if (!input.value.trim() || state.isLoading) return;
    if (!incrementInteraction()) { navigate('support'); return; }

    const text = input.value.trim();
    state.messages.push({ role: 'user', content: text });
    input.value = '';
    state.isLoading = true;
    renderChat();

    const response = await getAssistantResponse(state.messages);
    // Fix: Save sources in message object for rendering
    state.messages.push({ role: 'assistant', content: response.text, sources: response.sources });
    state.isLoading = false;
    renderChat();
    const history = document.getElementById('chat-history');
    if (history) history.scrollTop = history.scrollHeight;
  };

  if (sendBtn) sendBtn.onclick = handleSend;
  if (input) input.onkeydown = (e) => e.key === 'Enter' && handleSend();
}

/**
 * Eventos Dashboard
 */
function attachDashboardEvents() {
  document.getElementById('btn-logout').onclick = () => {
    localStorage.removeItem('portugal_2026_current_user');
    state.user = null;
    render();
  };
  const supportBtn = document.getElementById('btn-go-support');
  if (supportBtn) supportBtn.onclick = () => navigate('support');
}

function attachSupportEvents() {
  const cancelBtn = document.getElementById('btn-cancel-support');
  if (cancelBtn) cancelBtn.onclick = () => navigate('dashboard');
}

function attachDossierEvents() {
  const backBtn = document.getElementById('btn-back-dashboard');
  if (backBtn) backBtn.onclick = () => navigate('dashboard');
}

render();
