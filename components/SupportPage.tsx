
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onPremiumUnlocked?: () => void;
}

const SupportPage: React.FC<Props> = ({ onBack, onPremiumUnlocked }) => {
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("923364360");
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleSimulateConfirmation = () => {
    setIsConfirming(true);
    // Simula uma pequena latência de rede/processamento
    setTimeout(() => {
      onPremiumUnlocked?.();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950/50 backdrop-blur-3xl p-4 sm:p-12 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto space-y-12 pb-20">
        <button 
          onClick={onBack}
          className="flex items-center gap-4 text-emerald-500 font-black text-xs uppercase tracking-widest hover:gap-6 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Regressar ao Terminal
        </button>

        <div className="glass-3d rounded-[3rem] sm:rounded-[5rem] p-10 md:p-24 border border-emerald-500/20 relative overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.05)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 space-y-16">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center border border-emerald-500/30 mx-auto shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h1 className="text-4xl sm:text-7xl font-black italic uppercase tracking-tighter leading-none text-white">Missão <br/> Independência.</h1>
              <p className="text-slate-400 text-sm sm:text-xl font-medium leading-relaxed italic max-w-2xl mx-auto">
                Este projeto é mantido por cidadãos para cidadãos. Para garantirmos a neutralidade e o processamento neural, dependemos da tua <span className="text-emerald-400 font-black">doação voluntária</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h3 className="text-2xl font-black italic uppercase text-white tracking-tight">Como Apoiar:</h3>
                <div className="space-y-6">
                  {[
                    { step: "1", title: "Acede ao MB WAY", desc: "No teu smartphone, inicia a aplicação bancária ou MB WAY." },
                    { step: "2", title: "Selecionar 'Enviar Dinheiro'", desc: "Escolhe a opção de envio imediato." },
                    { step: "3", title: "Introduzir Número", desc: "Revele o identificador de transmissão em baixo." },
                    { step: "4", title: "Confirmar Apoio", desc: "Clique no botão de confirmação após o envio para desbloquear o acesso PRO." }
                  ].map((s, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="w-10 h-10 shrink-0 bg-white/5 rounded-xl flex items-center justify-center text-emerald-500 font-black text-sm border border-white/10 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                        {s.step}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-white font-black uppercase text-xs tracking-widest">{s.title}</h4>
                        <p className="text-slate-500 text-xs italic font-medium">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 sm:p-16 rounded-[3rem] bg-slate-900/80 border border-emerald-500/20 text-center space-y-8 shadow-2xl relative overflow-hidden group min-h-[400px] flex flex-col justify-center">
                {!isRevealed ? (
                  <div className="space-y-8 animate-in zoom-in-95 duration-500">
                    <div className="space-y-2">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Dossier de Apoio</span>
                       <h4 className="text-xl font-black text-white uppercase italic tracking-tight">Clique para revelar o número</h4>
                    </div>
                    <button 
                      onClick={() => setIsRevealed(true)}
                      className="w-full py-8 bg-emerald-500 text-slate-950 rounded-[2rem] font-black uppercase tracking-widest text-[11px] hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 active:scale-95"
                    >
                      Revelar Protocolo MB WAY
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 relative z-10">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.5em] font-black">Canal de Transmissão MB WAY</span>
                      <div className="text-4xl sm:text-6xl font-black tracking-widest text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)] italic">
                        923 364 360
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button 
                        onClick={handleCopy}
                        className={`w-full py-6 rounded-[2rem] font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${
                          copyFeedback 
                          ? 'bg-emerald-500 text-slate-950' 
                          : 'bg-white text-slate-950 hover:bg-emerald-500 hover:text-white'
                        }`}
                      >
                        {copyFeedback ? (
                          <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6 9 17l-5-5"/></svg>
                            Número Copiado
                          </>
                        ) : (
                          <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                            Copiar Número
                          </>
                        )}
                      </button>

                      <button 
                        onClick={handleSimulateConfirmation}
                        disabled={isConfirming}
                        className="w-full py-6 rounded-[2rem] bg-emerald-600 text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] hover:bg-emerald-500 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                      >
                        {isConfirming ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            A Validar Transmissão...
                          </>
                        ) : (
                          <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 5 5L20 7"/></svg>
                            Já enviei o apoio
                          </>
                        )}
                      </button>
                    </div>
                    
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-60 italic pt-4">ID Beneficiário: J. Pedro S.</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-emerald-500/[0.02] pointer-events-none"></div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
              <div className="flex gap-4 items-center">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 italic">Transmissão Segura • Validação via MB WAY</span>
              </div>
              <button 
                onClick={onBack}
                className="text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-white transition-colors"
              >
                Voltar ao Dossier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
