
const API_KEY = "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";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

let currentUser = null;
let candidates = [];
let chatHistory = [];

const SYSTEM_PROMPT = `És o "INVESTIGADOR", um assistente especializado exclusivamente nas eleições presidenciais portuguesas de 2026. DATA DO SISTEMA: 10 de Janeiro de 2026. REGRAS: 1. Nome: Investigador. 2. Escopo: Apenas presidenciais 2026 Portugal. 3. Recusa: Se não for sobre o tema, diz exatamente: "Desculpa, só posso responder a perguntas sobre as eleições presidenciais de 2026 em Portugal."`;

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', async () => {
    checkAuth();
    await loadCandidates();
    setupEventListeners();
});

function checkAuth() {
    const stored = localStorage.getItem('portugal_2026_user');
    if (stored) {
        currentUser = JSON.parse(stored);
        showPage('dashboard');
        updateUserUI();
    } else {
        showPage('registration');
    }
}

async function loadCandidates() {
    try {
        const response = await fetch('./candidatos.json');
        candidates = await response.json();
        renderCandidates();
    } catch (e) {
        console.error("Erro a carregar candidatos", e);
    }
}

// --- Navegação ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(`section-${pageId}`);
    if (target) {
        target.classList.remove('hidden');
        window.scrollTo(0, 0);
    }
    
    // Header visibility
    const header = document.getElementById('main-header');
    if (pageId === 'registration') header.classList.add('hidden');
    else header.classList.remove('hidden');
}

// --- UI Rendering ---
function updateUserUI() {
    if (currentUser) {
        document.getElementById('user-welcome-name').textContent = currentUser.name.split(' ')[0];
    }
}

function renderCandidates() {
    const grid = document.getElementById('candidates-grid');
    grid.innerHTML = '';
    
    candidates.forEach(c => {
        const card = document.createElement('div');
        card.className = 'glass-3d rounded-[2rem] overflow-hidden flex flex-col group animate-fade-in h-[620px]';
        card.innerHTML = `
            <div class="relative h-48 shrink-0 overflow-hidden">
                <img src="${c.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                <div class="absolute bottom-4 left-6">
                    <span class="text-[9px] font-black bg-white/10 px-2 py-1 rounded text-white uppercase">${c.partido}</span>
                    <h3 class="text-2xl font-black text-white uppercase mt-1">${c.nome}</h3>
                </div>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between">
                <div class="space-y-4">
                    <p class="text-[10px] text-emerald-500 font-black uppercase tracking-widest">${c.ideologia}</p>
                    <p class="text-xs text-slate-400 leading-relaxed italic line-clamp-3">"${c.proposta}"</p>
                    
                    <div class="space-y-3 pt-2">
                        ${renderStat('Experiência', c.stats.experiencia, 'emerald')}
                        ${renderStat('Popularidade', c.stats.popularidade, 'blue')}
                    </div>
                </div>
                <button onclick="openCandidateDetail('${c.nome}')" class="w-full py-4 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                    Aprofundar Auditoria
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderStat(label, value, color) {
    return `
        <div class="space-y-1">
            <div class="flex justify-between text-[9px] font-bold text-slate-500 uppercase">
                <span>${label}</span>
                <span class="text-white">${value}%</span>
            </div>
            <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div class="h-full bg-${color}-500 poll-bar" style="width: ${value}%"></div>
            </div>
        </div>
    `;
}

// --- Detalhe Candidato ---
window.openCandidateDetail = (nome) => {
    const c = candidates.find(x => x.nome === nome);
    const modal = document.getElementById('candidate-modal');
    document.getElementById('modal-content').innerHTML = `
        <div class="flex flex-col md:flex-row gap-10">
            <div class="w-full md:w-1/3">
                <img src="${c.image}" class="w-full rounded-3xl shadow-2xl">
                <div class="mt-6 p-6 bg-white/5 rounded-2xl border border-white/5">
                    <h4 class="text-[10px] font-black text-emerald-500 uppercase mb-4">Verificação Biográfica</h4>
                    <p class="text-xs text-slate-400"><strong>Formação:</strong> ${c.formacao}</p>
                    <p class="text-xs text-slate-400 mt-2"><strong>Experiência:</strong> ${c.experiencia}</p>
                </div>
            </div>
            <div class="flex-1 space-y-8">
                <div>
                    <h2 class="text-4xl font-black text-white italic uppercase">${c.nome}</h2>
                    <p class="text-emerald-500 font-bold uppercase text-xs tracking-widest mt-2">${c.status}</p>
                </div>
                <div class="space-y-4">
                    <h4 class="text-sm font-black text-white uppercase">Análise do Investigador</h4>
                    <p class="text-slate-300 leading-relaxed text-sm">${c.perfilCompleto}</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-4 bg-white/5 rounded-xl border border-white/5">
                        <span class="text-[9px] font-black text-emerald-400 uppercase">Pontos Fortes</span>
                        <ul class="text-[11px] text-slate-400 mt-2 space-y-1">
                            ${c.pontosFortes.map(p => `<li>• ${p}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

window.closeModal = () => {
    document.getElementById('candidate-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
};

// --- Sistema de Chat ---
const toggleChat = () => {
    const panel = document.getElementById('chat-panel');
    panel.classList.toggle('hidden');
};

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    appendMessage('user', text);
    input.value = '';
    
    const loadingId = appendMessage('bot', '...', true);

    try {
        const response = await fetch(OPENROUTER_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Portugal 2026 Auditoria'
            },
            body: JSON.stringify({
                model: "mistralai/mistral-7b-instruct",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: text }
                ]
            })
        });

        const data = await response.json();
        const content = data.choices[0].message.content;
        updateMessage(loadingId, content);
    } catch (e) {
        updateMessage(loadingId, "Falha de ligação ao Investigador.");
    }
}

function appendMessage(role, content, isLoading = false) {
    const container = document.getElementById('chat-messages');
    const id = Date.now();
    const div = document.createElement('div');
    div.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`;
    div.id = `msg-${id}`;
    div.innerHTML = `
        <div class="max-w-[85%] p-4 rounded-2xl text-sm ${role === 'user' ? 'chat-bubble-user font-bold' : 'chat-bubble-bot text-slate-200'}">
            ${content}
        </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
}

function updateMessage(id, content) {
    const msg = document.getElementById(`msg-${id}`);
    if (msg) {
        msg.querySelector('div').textContent = content;
        const container = document.getElementById('chat-messages');
        container.scrollTop = container.scrollHeight;
    }
}

// --- Autenticação ---
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    const user = { name, email };
    localStorage.setItem('portugal_2026_user', JSON.stringify(user));
    
    // Simulação de DB
    const db = JSON.parse(localStorage.getItem('portugal_2026_db') || '[]');
    db.push({ ...user, pass });
    localStorage.setItem('portugal_2026_db', JSON.stringify(db));

    currentUser = user;
    updateUserUI();
    showPage('dashboard');
}

function handleLogout() {
    localStorage.removeItem('portugal_2026_user');
    currentUser = null;
    showPage('registration');
}

// --- Event Listeners ---
function setupEventListeners() {
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// Expondo funções para o HTML
window.showPage = showPage;
window.handleLogout = handleLogout;
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
