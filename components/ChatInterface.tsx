
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getAssistantResponse } from '../services/gemini';

interface Props {
  isPremium: boolean;
  onPremiumUnlocked: () => void;
  onNavigateToSupport?: () => void;
}

const DAILY_LIMIT = 2; 
const BOT_NAME = "Investigador";

const ChatInterface: React.FC<Props> = ({ isPremium, onPremiumUnlocked, onNavigateToSupport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const AVATAR_URL = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=150&h=150";

  useEffect(() => {
    const storedInteractions = localStorage.getItem('portugal_2026_interactions');
    if (storedInteractions) {
      setQuestionsUsed(parseInt(storedInteractions));
    }

    setMessages([{ 
      role: 'assistant', 
      content: `Terminal Local Ativo. Sou o ${BOT_NAME}. Como posso auditar o cenário político para si hoje?` 
    }]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    if (!isPremium && questionsUsed >= DAILY_LIMIT) {
      setIsOpen(false);
      onNavigateToSupport?.();
      return;
    }

    const text = input;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAssistantResponse([...messages, { role: 'user', content: text }]);
      setMessages(prev => [...prev, { role: 'assistant', content: response.text, sources: response.sources }]);
      
      if (!isPremium) {
        const newCount = questionsUsed + 1;
        setQuestionsUsed(newCount);
        localStorage.setItem('portugal_2026_interactions', newCount.toString());
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Falha na ligação ao Investigador. Verifique a sua conexão." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isLimitReached = !isPremium && questionsUsed >= DAILY_LIMIT;

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[1000] pointer-events-none">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto relative w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors"></div>
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          ) : (
            <div className="relative">
              <img src={AVATAR_URL} className="w-16 h-16 object-cover grayscale brightness-110" alt="Investigador" />
              {!isPremium && !isLimitReached && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full text-[9px] font-black flex items-center justify-center text-slate-950 border-2 border-slate-900">
                  {DAILY_LIMIT - questionsUsed}
                </div>
              )}
            </div>
          )}
        </button>
      </div>

      <div 
        className={`fixed inset-0 sm:inset-auto sm:bottom-28 sm:right-8 w-full sm:w-[480px] h-[100dvh] sm:h-[650px] z-[999] transition-all duration-500 ease-out ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full bg-slate-950/95 sm:rounded-3xl border border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden">
          
          <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-slate-900/40">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-emerald-500/20">
                <img src={AVATAR_URL} className="w-full h-full object-cover grayscale" alt="Investigador" />
              </div>
              <div>
                <h3 className="text-white text-lg font-black tracking-tight uppercase leading-none">{BOT_NAME}</h3>
                <div className="text-[9px] font-bold uppercase text-emerald-400 tracking-widest mt-1 opacity-80">
                  {isPremium ? 'Núcleo Neural Pro' : 'Núcleo Local'}
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-8 hide-scrollbar bg-gradient-to-b from-transparent to-black/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-500`}>
                <div className={`max-w-[85%] p-6 rounded-2xl text-sm leading-relaxed font-medium ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-slate-950 rounded-tr-none font-bold' 
                    : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 p-4 bg-white/5 rounded-2xl w-24 border border-white/5">
                {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: `${i*0.2}s`}}></div>)}
              </div>
            )}
            
            {isLimitReached && (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-4 animate-in zoom-in-95">
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Acesso Gratuito Excedido</p>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateToSupport?.();
                  }}
                  className="w-full py-4 bg-emerald-500 text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl"
                >
                  Desbloquear Auditoria Ilimitada
                </button>
              </div>
            )}
          </div>

          <div className="p-8 bg-slate-900/40 border-t border-white/5">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                disabled={isLimitReached || isLoading}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isLimitReached ? "Terminal Bloqueado" : "Consultar o Investigador..."}
                className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl px-5 py-4 outline-none focus:border-emerald-500/40 transition-all text-sm font-medium placeholder:text-slate-700 disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={isLimitReached || isLoading}
                className="w-14 h-14 bg-white text-slate-950 rounded-xl flex items-center justify-center transition-all hover:bg-emerald-500 hover:text-white disabled:opacity-50"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
