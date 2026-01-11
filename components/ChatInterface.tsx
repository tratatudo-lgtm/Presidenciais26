
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getAssistantResponse } from '../services/gemini';

interface Props {
  isPremium: boolean;
  onPremiumUnlocked: () => void;
  onNavigateToSupport?: () => void;
}

const ChatInterface: React.FC<Props> = ({ isPremium, onPremiumUnlocked, onNavigateToSupport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([{ 
      role: 'assistant', 
      content: `O Tuga está presente. Investigas ou envias o comprovativo de apoio?` 
    }]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;
    
    const userMsg: Message = { 
      role: 'user', 
      content: input || "Envio de comprovativo para auditoria.",
      image: selectedImage || undefined 
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const result = await getAssistantResponse([...messages, userMsg]);
      
      if (result.shouldUnlock && !isPremium) {
        onPremiumUnlocked();
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: result.text, 
        sources: result.sources 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Erro na transmissão local." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[1000] pointer-events-none">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 group"
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          ) : (
            <div className="text-emerald-500 font-black text-xl italic">IA</div>
          )}
        </button>
      </div>

      <div className={`fixed inset-0 sm:inset-auto sm:bottom-28 sm:right-8 w-full sm:w-[450px] h-[100dvh] sm:h-[600px] z-[999] transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full bg-slate-950 sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          
          <div className="p-6 border-b border-white/5 bg-slate-900/40 flex justify-between items-center">
            <span className="text-xs font-black uppercase text-emerald-500 tracking-widest">Tuga v6 • Auditoria Vision</span>
            {isPremium && <span className="text-[8px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-black">MODO PRO</span>}
          </div>

          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 hide-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-emerald-600 text-slate-950 font-bold' : 'bg-white/5 text-slate-200 border border-white/5'}`}>
                  {msg.image && <img src={msg.image} className="w-full rounded-lg mb-3 border border-white/10" />}
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>}
          </div>

          <div className="p-6 bg-slate-900/40 border-t border-white/5 space-y-4">
            {selectedImage && (
              <div className="relative inline-block">
                <img src={selectedImage} className="w-16 h-16 object-cover rounded-lg border border-emerald-500" />
                <button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-rose-500 rounded-full p-1 text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
            )}
            
            <div className="flex gap-3">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-12 h-12 shrink-0 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors border border-white/5"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
              
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Falar ou enviar comprovativo..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/50"
              />
              <button onClick={handleSend} className="w-12 h-12 bg-white text-slate-950 rounded-xl flex items-center justify-center hover:bg-emerald-500 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m22 2-7 20-4-9-9-4Z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
