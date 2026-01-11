import { GoogleGenAI } from "@google/genai";

// CONFIGURAÇÕES E ESTADO
const state = {
    isPremium: localStorage.getItem('tuga_premium') === 'true',
    interactions: parseInt(localStorage.getItem('tuga_interactions') || '0'),
    currentPage: 'dashboard', // dashboard, support
    chatOpen: false,
    messages: [{ role: 'assistant', content: 'Protocolo Tuga Ativo. Aguardo dados ou comprovativo de apoio (min. 5€).' }],
    isLoading: false,
    selectedImage: null
};

const INTERACTION_LIMIT = 2;

// COMPONENTES DE INTERFACE
const UI = {
    renderDashboard: () => {
        const sortedCandidates = [...CANDIDATES].sort((a, b) => (b.sondagem || 0) - (a.sondagem || 0));
        return `
            <div class="animate-fade-in max-w-7xl mx-auto px-6 pt-32 pb-40 space-y-24">
                <section class="text-center py-20">
                    <h1 class="text-6xl sm:text-9xl font-black text-white uppercase italic tracking-tighter leading-tight mb-8">
                        Audit <br/><span class="text-emerald-500">2026.</span>
                    </h1>
                    <div class="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-lg mx-auto">
                        <p class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 italic">Acesso ao Terminal</p>
                        <div class="flex items-center justify-between gap-4">
                            <span class="text-white text-[10px] font-black">${state.isPremium ? 'ILIMITADO' : `${state.interactions} / ${INTERACTION_LIMIT}`}</span>
                            <div class="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                <div class="h-full bg-emerald-500 transition-all duration-1000" style="width: ${state.isPremium ? '100' : (state.interactions/INTERACTION_LIMIT)*100}%"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    ${CANDIDATES.map((c, i) => `
                        <div class="glass-3d rounded-[2rem] border border-white/5 overflow-hidden flex flex-col h-[550px] group hover:border-emerald-500/30 transition-all">
                            <div class="h-48 bg-slate-800 flex items-center justify-center relative">
                                <span class="text-6xl font-black text-white/5 italic">${c.nome.split(' ').map(n=>n[0]).join('')}</span>
                                <div class="absolute bottom-4 left-6">
                                    <span class="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-emerald-500 text-slate-950 rounded mb-2 inline-block">${c.partido}</span>
                                    <h3 class="text-xl font-black text-white uppercase italic">${c.nome}</h3>
                                </div>
                            </div>
                            <div class="p-8 flex-1 flex flex-col justify-between">
                                <div class="space-y-4">
                                    <p class="text-[11px] text-slate-400 italic leading-relaxed">"${c.proposta}"</p>
                                    <div class="flex justify-between items-center text-[10px] font-black text-emerald-500 italic">
                                        <span>INTENÇÃO DE VOTO</span>
                                        <span class="text-white">${c.sondagem}%</span>
                                    </div>
                                </div>
                                <button onclick="window.app.handleCandidateClick(${i})" class="w-full py-4 bg-white text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Análise Detalhada</button>
                            </div>
                        </div>
                    `).join('')}
                </section>
            </div>
        `;
    },

    renderSupport: () => {
        return `
            <div class="animate-fade-in min-h-screen flex items-center justify-center p-6">
                <div class="max-w-xl w-full text-center space-y-12">
                    <button onclick="window.app.navigate('dashboard')" class="text-emerald-500 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        Voltar
                    </button>
                    <div class="glass-3d rounded-[3rem] p-12 border border-emerald-500/20 space-y-10">
                        <h2 class="text-5xl font-black text-white italic uppercase tracking-tighter">Ativação <br/><span class="text-emerald-500">Premium.</span></h2>
                        <div class="space-y-6 text-slate-400 text-xs font-medium leading-relaxed italic">
                            <p>O acesso gratuito foi esgotado. Para continuar a auditoria ilimitada:</p>
                            <div class="grid grid-cols-2 gap-4 text-left not-italic">
                                <div class="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <span class="text-emerald-500 font-black block mb-1">1. APOIO</span>
                                    <p class="text-[9px] uppercase tracking-tighter">Envia 5€ ou mais via MB WAY.</p>
                                </div>
                                <div class="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <span class="text-emerald-500 font-black block mb-1">2. CHAT</span>
                                    <p class="text-[9px] uppercase tracking-tighter">Envia o comprovativo no chat.</p>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <div class="text-5xl font-black text-white tracking-widest tabular-nums">923 364 360</div>
                            <button onclick="window.app.copyNumber()" class="text-[9px] font-black uppercase tracking-widest text-emerald-500 hover:text-white transition-colors">Copiar Número</button>
                        </div>
                        <p class="text-[8px] font-black uppercase text-slate-600 tracking-widest">A IA libertará o acesso instantaneamente após o upload.</p>
                    </div>
                </div>
            </div>
        `;
    },

    renderChat: () => {
        return `
            <div class="fixed bottom-6 right-6 z-[1000]">
                <button onclick="window.app.toggleChat()" class="w-14 h-14 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
                    <span class="text-emerald-500 font-black italic">IA</span>
                </button>
            </div>
            <div id="chat-panel" class="fixed bottom-24 right-6 w-full sm:w-[400px] h-[550px] z-[999] glass-3d rounded-3xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 ${state.chatOpen ? 'opacity-100' : 'opacity-0 pointer-events-none translate-y-10'}">
                <div class="p-5 border-b border-white/5 bg-slate-900/50 flex justify-between items-center">
                    <span class="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Tuga Auditor v6</span>
                    ${state.isPremium ? '<span class="text-[7px] font-black bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">MODO PRO</span>' : ''}
                </div>
                <div id="chat-messages" class="flex-1 p-6 overflow-y-auto space-y-4 text-[12px] hide-scrollbar">
                    ${state.messages.map(m => `
                        <div class="flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}">
                            <div class="max-w-[85%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-emerald-600 text-slate-950 font-bold' : 'bg-white/5 text-slate-200 border border-white/5'}">
                                ${m.image ? `<img src="${m.image}" class="w-full rounded-lg mb-2 border border-white/10">` : ''}
                                ${m.content}
                            </div>
                        </div>
                    `).join('')}
                    ${state.isLoading ? '<div class="w-4 h-4 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>' : ''}
                </div>
                <div class="p-5 border-t border-white/5 space-y-3">
                    <div class="flex gap-2">
                        <button onclick="document.getElementById('file-upload').click()" class="w-10 h-10 shrink-0 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-slate-500 hover:text-emerald-500 transition-colors">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                        </button>
                        <input type="file" id="file-upload" hidden accept="image/*" onchange="window.app.handleFile(this)">
                        <input type="text" id="chat-input" placeholder="Analisar ou enviar comprovativo..." class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-emerald-500/50">
                        <button onclick="window.app.sendMessage()" class="w-10 h-10 bg-white text-slate-950 rounded-xl flex items-center justify-center hover:bg-emerald-500 transition-all">➔</button>
                    </div>
                </div>
            </div>
        `;
    }
};

// LÓGICA DA APLICAÇÃO
const app = {
    init: () => {
        app.render();
    },

    render: () => {
        const root = document.getElementById('app-root');
        let content = '';

        if (state.currentPage === 'dashboard') content = UI.renderDashboard();
        else if (state.currentPage === 'support') content = UI.renderSupport();

        root.innerHTML = content + UI.renderChat();
        
        // Auto-scroll chat
        const chatMsgs = document.getElementById('chat-messages');
        if (chatMsgs) chatMsgs.scrollTop = chatMsgs.scrollHeight;
    },

    navigate: (page) => {
        state.currentPage = page;
        app.render();
    },

    toggleChat: () => {
        state.chatOpen = !state.chatOpen;
        app.render();
    },

    handleCandidateClick: (index) => {
        if (!state.isPremium && state.interactions >= INTERACTION_LIMIT) {
            app.navigate('support');
            return;
        }
        
        if (!state.isPremium) {
            state.interactions++;
            localStorage.setItem('tuga_interactions', state.interactions);
        }
        
        state.chatOpen = true;
        state.messages.push({ role: 'assistant', content: `A analisar dossier de ${CANDIDATES[index].nome}... Que dados precisas sobre este candidato?` });
        app.render();
    },

    handleFile: (input) => {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                state.selectedImage = e.target.result;
                app.sendMessage("Envio de comprovativo para auditoria.");
            };
            reader.readAsDataURL(file);
        }
    },

    sendMessage: async (forcedContent = null) => {
        const input = document.getElementById('chat-input');
        const content = forcedContent || input.value;
        if (!content && !state.selectedImage) return;

        state.messages.push({ role: 'user', content, image: state.selectedImage });
        const currentImg = state.selectedImage;
        
        input.value = '';
        state.selectedImage = null;
        state.isLoading = true;
        app.render();

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const parts = [{ text: content }];
            if (currentImg) {
                parts.push({ inlineData: { mimeType: "image/jpeg", data: currentImg.split(',')[1] } });
            }

            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: [{ role: 'user', parts }],
                config: {
                    systemInstruction: `És o TUGA Auditor. Se receberes um comprovativo MB WAY ou Bancário com valor igual ou superior a 5€ (Cinco Euros), deves ativar o PREMIUM. Responde confirmando o desbloqueio se o valor estiver lá.`,
                    tools: [{ 
                        functionDeclarations: [{
                            name: "unlock_premium",
                            parameters: {
                                type: "OBJECT",
                                properties: { valor: { type: "NUMBER" } },
                                required: ["valor"]
                            }
                        }]
                    }]
                }
            });

            let responseText = response.text || "Dados processados.";
            
            // Verificar Function Call
            const calls = response.candidates?.[0]?.content?.parts?.filter(p => p.functionCall);
            if (calls && calls.length > 0) {
                const call = calls[0].functionCall;
                if (call.name === 'unlock_premium') {
                    const valor = call.args.valor;
                    if (valor >= 5) {
                        state.isPremium = true;
                        localStorage.setItem('tuga_premium', 'true');
                        responseText = `✅ COMPROVATIVO DE ${valor}€ VALIDADO. PROTOCOLO PREMIUM ATIVADO COM SUCESSO. TERMINAL DESBLOQUEADO.`;
                    } else {
                        responseText = `⚠️ Valor de ${valor}€ detetado. O mínimo para manutenção do Terminal Pro são 5€.`;
                    }
                }
            }

            state.messages.push({ role: 'assistant', content: responseText });
        } catch (err) {
            state.messages.push({ role: 'assistant', content: "Erro de comunicação neural. Tenta novamente." });
        } finally {
            state.isLoading = false;
            app.render();
        }
    },

    copyNumber: () => {
        navigator.clipboard.writeText("923364360");
        alert("Número copiado para o MB WAY.");
    }
};

// DADOS DOS CANDIDATOS
const CANDIDATES = [
    { nome: "André Ventura", partido: "Chega", proposta: "IV República e Segurança.", sondagem: 22.4 },
    { nome: "Gouveia e Melo", partido: "Indep.", proposta: "Eficácia e Ordem.", sondagem: 32.1 },
    { nome: "Marques Mendes", partido: "PSD", proposta: "Estabilidade Institucional.", sondagem: 24.5 },
    { nome: "António José Seguro", partido: "PS", proposta: "Ética e Unidade.", sondagem: 16.2 },
    { nome: "João Cotrim Figueiredo", partido: "IL", proposta: "Choque Fiscal.", sondagem: 8.4 },
    { nome: "Catarina Martins", partido: "BE", proposta: "Justiça Social.", sondagem: 6.5 },
    { nome: "António Filipe", partido: "PCP", proposta: "Soberania Nacional.", sondagem: 4.8 },
    { nome: "Jorge Pinto", partido: "Livre", proposta: "Ecossocialismo.", sondagem: 4.2 },
    { nome: "Manuel João Vieira", partido: "Indep.", proposta: "Crítica Satírica.", sondagem: 1.5 },
    { nome: "André Pestana", partido: "STOP", proposta: "Voz dos Professores.", sondagem: 2.1 },
    { nome: "Humberto Correia", partido: "Cívico", proposta: "Democracia Digital.", sondagem: 0.8 }
];

// EXPOR PARA WINDOW
window.app = app;
app.init();