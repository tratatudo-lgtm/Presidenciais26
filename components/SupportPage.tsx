
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onPremiumUnlocked?: () => void;
}

const SupportPage: React.FC<Props> = ({ onBack }) => {
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("923364360");
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 sm:p-12 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto space-y-12 pb-20">
        <button onClick={onBack} className="text-emerald-500 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Terminal Principal
        </button>

        <div className="glass-3d rounded-[3rem] p-10 sm:p-20 border border-emerald-500/20 text-center space-y-12">
          <h1 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter text-white">MODO PRO <br/> <span className="text-emerald-500">LIBERTAÇÃO.</span></h1>
          
          <div className="max-w-xl mx-auto space-y-6 text-slate-400 font-medium italic">
            <p>O Premium agora é desbloqueado pela nossa IA. Segue o protocolo:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left not-italic">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-emerald-500 font-black block mb-2">1. APOIO</span>
                <p className="text-[10px] uppercase tracking-widest leading-relaxed">Envia 5€ ou mais via MB WAY para o número em baixo.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-emerald-500 font-black block mb-2">2. CHAT</span>
                <p className="text-[10px] uppercase tracking-widest leading-relaxed">Tira screenshot e envia no chat para o Tuga validar.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-5xl sm:text-7xl font-black tracking-widest text-emerald-500 italic">923 364 360</div>
            <button 
              onClick={handleCopy}
              className={`px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${copyFeedback ? 'bg-emerald-500 text-slate-950' : 'bg-white text-slate-950 hover:bg-emerald-500 hover:text-white'}`}
            >
              {copyFeedback ? 'NÚMERO COPIADO' : 'COPIAR NÚMERO MB WAY'}
            </button>
          </div>

          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 italic">O desbloqueio é instantâneo após o envio do comprovativo no chat.</p>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
