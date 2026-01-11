
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getAssistantResponse } from '../services/gemini';

interface Props {
  isPremium: boolean;
  onPremiumUnlocked: () => void;
  onNavigateToSupport?: () => void;
}

const DAILY_LIMIT = 2; 
const BOT_NAME = "Tuga";

const ChatInterface: React.FC<Props> = ({ isPremium, onPremiumUnlocked, onNavigateToSupport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const AVATAR_URL = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=150&h=150";

  useEffect(() => {
    const storedInteractions = localStorage.getItem('portugal_2026_interactions');
    if (storedInteractions) {
      setQuestionsUsed(parseInt(storedInteractions));
    }

    setMessages([{ 
      role: 'assistant', 
      content: `O Tuga está presente. Auditoria local sincronizada. O que pretendes investigar hoje sobre 2026?` 
    }]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  // Fix: Focar o input ao abrir o chat em dispositivos maiores
  useEffect(() => {
    if (isOpen && window.innerWidth > 640) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;
    
    if (!isPremium && questionsUsed >= DAILY_LIMIT) {
      setIsOpen(false);
      onNavigateToSupport?.();
      return;
    }

    const newUserMessage: Message = { role: 'user', content: trimmedInput };
    setMessages(prev => [...prev, newUserMessage]);
    setInput(''); // Limpa o estado local
    setIsLoading(true);

    try {
      const response = await getAssistantResponse([...messages, newUserMessage]);
      setMessages(prev => [...prev, { role: 'assistant', content: response.text, sources: response.sources }]);
      
      if (!isPremium) {
        const newCount = questionsUsed + 1;
        setQuestionsUsed(newCount);
        localStorage.setItem('portugal_2026_interactions', newCount.toString());
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "O Tuga perdeu o sinal. Verifica o terminal." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isLimitReached = !isPremium && questionsUsed >= DAILY_LIMIT;

  return (
    <>
      {/* Botão Flutuante */}
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[1000] pointer-events-none">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors"></div>
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          ) : (
            <div className="relative">
              <img src={AVATAR_URL} className="w-14 h-14 sm:w-16 sm:h-16 object-cover grayscale brightness-110" alt="Tuga" />
              {!isPremium && !isLimitReached && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full text-[9px] font-black flex items-center justify-center text-slate-950 border-2 border-slate-900">
                  {DAILY_LIMIT - questionsUsed}
                </div>
              )}
            </div>
          )}
        </button>
      </div>

      {/* Painel do Chat */}
      <div 
        className={`fixed inset-0 sm:inset-auto sm:bottom-28 sm:right-8 w-full sm:w-[420px] md:w-[480px] h-full sm:h-[600px] md:h-[650px] z-[999] transition-all duration-500 ease-out flex flex-col ${
          isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 pointer-events-none scale-95'
        }`}
      >
        <div className="flex flex-col h-full bg-slate-950 sm:rounded-3xl border border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden">
          
          <div className="px-6 py-4 sm:px-8 sm:py-6 border-b border-white/5 flex items-center justify-between bg-slate-900/40">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-emerald-500/20">
                <img src={AVATAR_URL} className="w-full h-full object-cover grayscale" alt="Tuga" />
              </div>
              <div>
                <h3 className="text-white text-base sm:text-lg font-black tracking-tight uppercase leading-none">{BOT_NAME}</h3>
                <div className="text-[9px] font-bold uppercase text-emerald-400 tracking-widest mt-1 opacity-80">
                  {isPremium ? 'Núcleo Neural Pro' : 'Protocolo Local'}
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 hide-scrollbar bg-gradient-to-b from-transparent to-black/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-500`}>
                <div className={`max-w-[90%] sm:max-w-[85%] p-4 sm:p-6 rounded-2xl text-xs sm:text-sm leading-relaxed font-medium ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-slate-950 rounded-tr-none font-bold shadow-lg shadow-emerald-900/10' 
                    : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5'
                }`}>
                  {msg.content}
                  {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest mb-2">Fontes Verificadas:</p>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((source, idx) => (
                          <a 
                            key={idx} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/10 rounded px-2 py-1 transition-colors truncate max-w-full"
                          >
                            {source.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
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
                <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Acesso Local Esgotado</p>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateToSupport?.();
                  }}
                  className="w-full py-4 bg-emerald-500 text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl"
                >
                  Desbloquear Dossiers Ilimitados
                </button>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 bg-slate-900/40 border-t border-white/5">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                autoComplete="off"
                value={input}
                disabled={isLimitReached || isLoading}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={isLimitReached ? "Terminal Bloqueado" : "Fala com o Tuga..."}
                className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 sm:px-5 sm:py-4 outline-none focus:border-emerald-500/40 transition-all text-sm font-medium placeholder:text-slate-700 disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={isLimitReached || isLoading}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-slate-950 rounded-xl flex items-center justify-center transition-all hover:bg-emerald-500 hover:text-white disabled:opacity-50 active:scale-90"
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
