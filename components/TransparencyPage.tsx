
import React, { useEffect } from 'react';

interface Props {
  onBack: () => void;
}

const TransparencyPage: React.FC<Props> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in duration-700">
      <button 
        onClick={onBack}
        className="flex items-center gap-4 text-emerald-500 font-black text-xs uppercase tracking-widest mb-12 hover:gap-6 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Voltar ao Dashboard
      </button>

      <div className="glass-3d rounded-[3rem] p-10 md:p-20 border border-white/10 shadow-2xl">
        <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4">Transparência Total.</h2>
        <p className="text-slate-400 mb-16 text-lg font-medium italic">Como garantimos a neutralidade e a veracidade da informação no núcleo neural.</p>
        
        <div className="space-y-20">
          {/* Section 1: Data Sourcing */}
          <section className="flex flex-col md:flex-row gap-8">
            <div className="w-16 h-16 shrink-0 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16"/><path d="M10 22V8a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v14"/><path d="M18 22V12a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v10"/><path d="M2 22h4"/><path d="M20 22h2"/><path d="M12 6V2"/><path d="M9 2h6"/></svg>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-4">Fontes Institucionais.</h3>
              <p className="text-slate-400 leading-relaxed mb-6 font-medium">
                O nosso compromisso é com o facto. Toda a informação base nos perfis dos candidatos é extraída de fontes primárias e verificáveis em tempo real:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono uppercase tracking-widest text-emerald-500/80 font-bold">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Diário da República (DRE)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Assembleia da República
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Tribunal Constitucional
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Comissão Nacional Eleições
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: AI Technology */}
          <section className="flex flex-col md:flex-row gap-8">
            <div className="w-16 h-16 shrink-0 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-4">Núcleo Gemini 3 Pro.</h3>
              <p className="text-slate-400 leading-relaxed font-medium mb-6">
                Utilizamos o modelo <strong className="text-white">Gemini 3 Pro</strong> com <em className="italic">Search Grounding</em> ativo. Isto significa que a IA valida cada declaração recente cruzando dados de jornalismo de referência e bases governamentais.
              </p>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 border-l-4 border-l-blue-500">
                <p className="text-xs text-slate-500 italic font-bold tracking-tight">
                  "A nossa matriz prioritiza domínios .gov.pt e instituições jornalísticas de referência, alertando o utilizador sobre o grau de confiança da fonte."
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Financing - Updated */}
          <section className="flex flex-col md:flex-row gap-8">
            <div className="w-16 h-16 shrink-0 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-4">Apoio e Independência.</h3>
              <p className="text-slate-400 leading-relaxed mb-8 font-medium">
                Este é um projeto independente, sem patrocínios corporativos ou agendas políticas. Para mantermos a infraestrutura ativa, dependemos de <strong className="text-white">doações voluntárias de qualquer valor</strong> via MB WAY.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 border border-white/5 rounded-2xl bg-white/5">
                  <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-3">Custos Operacionais</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-bold">Os fundos suportam as chamadas à API de IA, servidores de alta performance e manutenção da matriz de dados.</p>
                </div>
                <div className="p-6 border border-white/5 rounded-2xl bg-white/5">
                  <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-3">Valor Livre</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-bold">Acreditamos no apoio comunitário. Doe o valor que considerar justo para a qualidade da informação que recebe.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Neutrality Pledge */}
          <div className="bg-emerald-600 rounded-[3rem] p-10 sm:p-16 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/40">
            <div className="relative z-10">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Compromisso de Isenção.</h3>
              <p className="text-emerald-100 text-base leading-relaxed font-medium italic max-w-2xl">
                Não apoiamos candidatos. O nosso código está desenhado para apresentar dados comparativos lado a lado, sem juízos de valor. O utilizador é o único juiz da informação que consome no cockpit.
              </p>
            </div>
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <button 
            onClick={onBack}
            className="text-slate-500 hover:text-emerald-500 text-xs font-black uppercase tracking-[0.4em] transition-all"
          >
            Sair do Protocolo de Transparência
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransparencyPage;
