
import { authService } from './services/authService.js';
// Removed POLLS_BASE as it's not exported from constants.js and not used in this file
import { CANDIDATES } from './constants.js';
import { getAssistantResponse } from './services/gemini.js';
import { Message, User } from './types';

// ESTADO GLOBAL DA APP
interface AppState {
  user: any;
  currentPage: string;
  isLoginMode: boolean;
  messages: Message[];
  isLoading: boolean;
  questionsUsed: number;
  chatOpen: boolean;
}

const state: AppState = {
  user: JSON.parse(localStorage.getItem('portugal_2026_current_user') || 'null'),
  currentPage: 'registration',
  // Added missing isLoginMode property
  isLoginMode: true,
  // Added type assertion for Message role to match "assistant" | "user"
  messages: [{ role: 'assistant' as const, content: "Sistema Ativo. Sou o Investigador. Como posso auditar o cenário político para si hoje?" }],
  isLoading: false,
  questionsUsed: 0,
  chatOpen: false
};

// UTILITÁRIOS DE RENDERIZAÇÃO
const root = document.getElementById('root');
const chatContainer = document.getElementById('chat-container');

function navigate(page: string) {
  state.currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

// VISTAS (VIEWS)
const Views = {
  registration: () => `
    <div class="min-h-screen bg-[#0a0c10] flex items-center justify-center p-6 animate-fade-in">
      <div class="w-full max-w-[420px]">
        <div class="text-center mb-12">
          <div class="inline-flex w-14 h-14 bg-emerald-500 rounded-2xl items-center justify-center text-slate-950 font-black text-2xl italic mb-6 shadow-2xl">26</div>
          <h2 class="text-4xl font-black text-white uppercase tracking-tighter italic leading-tight">Painel de <br/> Autenticação</h2>
        </div>
        <div class="glass-3d rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div class="mb-10 flex p-1 bg-white/5 rounded-xl border border-white/5">
            <button id="tab-login" class="flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${state.isLoginMode !== false ? 'bg-emerald-500 text-slate-950' : 'text-slate-500'}">Aceder</button>
            <button id="tab-register" class="flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${state.isLoginMode === false ? 'bg-emerald-500 text-slate-950' : 'text-slate-500'}">Registar</button>
          </div>
          <form id="auth-form" class="space-y-6">
            ${state.isLoginMode === false ? `
            <div class="group">
              <label class="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Nome de Auditor</label>
              <input type="text" id="input_nome" required placeholder="Seu nome" class="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-emerald-500/50">
            </div>` : ''}
            <div class="group">
              <label class="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Email</label>
              <input type="email" id="input_email" required placeholder="auditoria@terminal.pt" class="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-emerald-500/50">
            </div>
            <div class="group">
              <label class="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Palavra-passe</label>
              <input type="password" id="input_password" required placeholder="••••••••" class="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-emerald-500/50">
            </div>
            <div id="auth-status" class="hidden p-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-center"></div>
            <button type="submit" id="auth-submit" class="w-full bg-white text-slate-950 py-5 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-all shadow-xl">
              ${state.isLoginMode === false ? 'Confirmar Registo' : 'Iniciar Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,

  dashboard: () => `
    <header class="fixed top-0 left-0 w-full z-[200] border-b border-white/5 bg-slate-950/80 backdrop-blur-2xl">
      <nav class="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl italic">26</div>
          <span class="font-black text-sm uppercase tracking-[0.3em] text-white">Portugal 2026</span>
        </div>
        <div class="flex items-center gap-8">
          <div class="hidden lg:flex flex-col items-end">
            <span class="text-[9px] font-black uppercase text-emerald-500 tracking-[0.2em]">Auditor Ativo</span>
            <span class="text-[11px] font-bold text-white tracking-tight">${state.user.name}</span>
          </div>
          <button id="logout-btn" class="text-rose-500 text-[10px] font-black uppercase tracking-[0.3em] px-6 py-3 border border-rose-500/20 hover:bg-rose-500 hover:text-white rounded-xl transition-all">Sair</button>
        </div>
      </nav>
    </header>

    <main class="pt-32 space-y-24 pb-40 animate-fade-in">
      <section class="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 class="text-6xl sm:text-9xl font-black text-white tracking-tighter italic mb-10">BEM-VINDO, <br/><span class="text-emerald-500">${state.user.name.split(' ')[0].toUpperCase()}.</span></h1>
        <p class="text-slate-400 text-xl max-w-2xl mx-auto font-medium leading-relaxed italic border-l-4 border-emerald-500/20 pl-8">O seu terminal de auditoria está operacional. Investigue os dossiers com o auxílio do nosso núcleo neural.</p>
      </section>

      <section class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        ${CANDIDATES.map(c => `
          <div class="relative h-[550px] rounded-[2rem] bg-slate-900/30 border border-white/5 overflow-hidden flex flex-col group transition-all hover:border-emerald-500/20 shadow-xl">
            <div class="h-[40%] overflow-hidden relative">
              <img src="${c.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700">
              <div class="absolute bottom-4 left-6">
                <div class="px-2 py-0.5 bg-white/10 rounded text-[8px] font-black text-white uppercase">${c.partido}</div>
                <h4 class="text-xl font-black text-white uppercase italic">${c.nome}</h4>
              </div>
            </div>
            <div class="p-8 flex-1 flex flex-col justify-between">
              <div class="space-y-4">
                <div class="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Status: ${c.status}</div>
                <p class="text-[11px] text-slate-400 leading-relaxed font-medium italic">"${c.proposta.substring(0, 100)}..."</p>
              </div>
              <button class="w-full py-4 rounded-xl text-[10px] font-black uppercase bg-white text-slate-950 hover:bg-emerald-500 hover:text-white transition-all">Ver Dossier Completo</button>
            </div>
          </div>
        `).join('')}
      </section>
    </main>
  `
};

// LÓGICA DE EVENTOS E RENDERIZAÇÃO
async function render() {
  if (state.currentPage === 'registration' && !state.user) {
    if (root) root.innerHTML = Views.registration();
    attachAuthEvents();
  } else {
    if (root) root.innerHTML = Views.dashboard();
    attachDashboardEvents();
  }
  renderChat();
}

function attachAuthEvents() {
  const form = document.getElementById('auth-form') as HTMLFormElement | null;
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const status = document.getElementById('auth-status');

  if (tabLogin) tabLogin.onclick = () => { state.isLoginMode = true; render(); };
  if (tabRegister) tabRegister.onclick = () => { state.isLoginMode = false; render(); };

  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      // Type cast to HTMLButtonElement to access 'disabled'
      const btn = document.getElementById('auth-submit') as HTMLButtonElement;
      btn.disabled = true;
      btn.innerText = "A Sincronizar...";
      if (status) status.className = "hidden";

      // Type cast inputs to HTMLInputElement to access 'value'
      const emailInput = document.getElementById('input_email') as HTMLInputElement;
      const passInput = document.getElementById('input_password') as HTMLInputElement;
      const email = emailInput.value;
      const pass = passInput.value;

      try {
        if (state.isLoginMode !== false) {
          const user = await authService.authenticate(email, pass);
          if (user) {
            state.user = user;
            localStorage.setItem('portugal_2026_current_user', JSON.stringify(user));
            navigate('dashboard');
          } else {
            if (status) {
              status.innerText = "Credenciais Inválidas.";
              status.className = "p-4 rounded-xl text-[10px] font-black uppercase bg-rose-500/10 text-rose-500 border border-rose-500/20";
            }
          }
        } else {
          const nomeInput = document.getElementById('input_nome') as HTMLInputElement;
          const nome = nomeInput.value;
          // Added missing 'phone' property to satisfy User interface
          const newUser: User = { 
            id: crypto.randomUUID(), 
            name: nome, 
            email, 
            password: pass, 
            phone: 'N/A',
            createdAt: new Date().toISOString() 
          };
          const result = await authService.saveUser(newUser);
          if (result.success) {
            state.user = newUser;
            localStorage.setItem('portugal_2026_current_user', JSON.stringify(newUser));
            navigate('dashboard');
          } else {
            if (status) {
              status.innerText = result.message;
              status.className = "p-4 rounded-xl text-[10px] font-black uppercase bg-rose-500/10 text-rose-500 border border-rose-500/20";
            }
          }
        }
      } catch (err) {
        if (status) {
          status.innerText = "Erro Crítico de Rede.";
          status.className = "p-4 rounded-xl text-[10px] font-black uppercase bg-rose-500/10 text-rose-500 border border-rose-500/20";
        }
      } finally {
        // Type cast to HTMLButtonElement to access 'disabled'
        btn.disabled = false;
        btn.innerText = state.isLoginMode === false ? 'Confirmar Registo' : 'Iniciar Login';
      }
    };
  }
}

function attachDashboardEvents() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.removeItem('portugal_2026_current_user');
      state.user = null;
      navigate('registration');
    };
  }
}

// CHAT VANILLA
function renderChat() {
  if (!state.user || !chatContainer) { if (chatContainer) chatContainer.innerHTML = ''; return; }
  
  chatContainer.innerHTML = `
    <div class="fixed bottom-8 right-8 z-[1000]">
      <button id="chat-toggle" class="w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden hover:scale-110 transition-all">
        ${state.chatOpen ? '<span class="text-white text-xl">✕</span>' : '<div class="w-full h-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">IA</div>'}
      </button>
    </div>
    <div id="chat-panel" class="fixed bottom-28 right-8 w-full sm:w-[420px] h-[550px] z-[999] bg-slate-950/95 sm:rounded-3xl border border-white/10 shadow-2xl flex flex-col backdrop-blur-xl ${state.chatOpen ? 'opacity-100' : 'opacity-0 pointer-events-none translate-y-10'} transition-all duration-300">
      <div class="p-6 border-b border-white/5 flex justify-between items-center bg-slate-900/50 rounded-t-3xl">
        <span class="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Investigador v3.1</span>
      </div>
      <div id="chat-history" class="flex-1 p-6 overflow-y-auto space-y-4">
        ${state.messages.map(m => `
          <div class="flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}">
            <div class="max-w-[85%] p-4 rounded-xl text-[12px] ${m.role === 'user' ? 'bg-emerald-500 text-slate-900 font-bold' : 'bg-white/5 text-slate-300 border border-white/5'}">
              ${m.content}
            </div>
          </div>
        `).join('')}
      </div>
      <div class="p-6 border-t border-white/5 flex gap-2">
        <input type="text" id="chat-input" placeholder="Consultar o Investigador..." class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none">
        <button id="chat-send" class="w-12 h-12 bg-white text-slate-950 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">➔</button>
      </div>
    </div>
  `;

  const toggleBtn = document.getElementById('chat-toggle');
  if (toggleBtn) toggleBtn.onclick = () => { state.chatOpen = !state.chatOpen; renderChat(); };
  
  const sendBtn = document.getElementById('chat-send');
  // Type cast to HTMLInputElement to access 'value'
  const input = document.getElementById('chat-input') as HTMLInputElement | null;
  
  const handleSend = async () => {
    if (!input || !input.value.trim() || state.isLoading) return;
    const text = input.value.trim();
    
    // state.messages correctly uses Message[] interface
    state.messages.push({ role: 'user' as const, content: text });
    state.isLoading = true;
    renderChat();
    
    const response = await getAssistantResponse(state.messages);
    state.messages.push({ role: 'assistant' as const, content: response.text });
    state.isLoading = false;
    renderChat();
    
    const history = document.getElementById('chat-history');
    if (history) history.scrollTop = history.scrollHeight;
  };

  if(sendBtn) sendBtn.onclick = handleSend;
  if(input) input.onkeydown = (e) => e.key === 'Enter' && handleSend();
}

// INÍCIO
render();
