
import React, { useState } from 'react';
import { ExtendedCandidate } from '../constants';

interface Props {
  candidate: ExtendedCandidate;
}

const CandidateCard: React.FC<Props> = ({ candidate }) => {
  const [showMore, setShowMore] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Confirmado': return 'bg-emerald-500 text-slate-950';
      case 'Especulação Alta': return 'bg-amber-500 text-slate-950';
      default: return 'bg-blue-500 text-white';
    }
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[680px] rounded-[2rem] bg-slate-900/30 border border-white/5 overflow-hidden flex flex-col group transition-all duration-500 hover:border-emerald-500/20 shadow-xl"
    >
      {/* Header Image Area */}
      <div className="relative h-[38%] overflow-hidden shrink-0">
        <img 
          src={candidate.image} 
          alt={candidate.nome} 
          className={`w-full h-full object-cover transition-all duration-[2s] ease-out ${
            isHovered ? 'scale-105 grayscale-0' : 'scale-100 grayscale'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded border border-emerald-500/30">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Dossier Verificado</span>
          </div>
          <div className={`px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest shadow-lg ${getStatusColor(candidate.status)}`}>
             {candidate.status}
          </div>
        </div>

        <div className="absolute bottom-6 left-8 right-8">
          <div className="inline-block px-2 py-0.5 bg-white/10 border border-white/10 rounded text-[9px] font-black uppercase tracking-widest text-white mb-2 backdrop-blur-md">
            {candidate.partido}
          </div>
          <h3 className="text-3xl font-black text-white tracking-tight uppercase leading-none">{candidate.nome}</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{candidate.ideologia}</p>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-8 flex-1 flex flex-col justify-between bg-slate-900/40">
        {!showMore ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="space-y-1">
              <h4 className="text-[9px] font-black uppercase text-emerald-500 tracking-widest flex items-center gap-2">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6 9 17l-5-5"/></svg>
                Estado CNE (Ref. 2026)
              </h4>
              <p className="text-[11px] text-slate-300 font-bold italic">{candidate.cneStatus}</p>
            </div>

            <div className="space-y-4 pt-2">
              {[
                { label: 'Experiência Executiva', value: candidate.stats.experiencia, color: 'bg-emerald-500' },
                { label: 'Capital Político', value: candidate.stats.popularidade, color: 'bg-blue-500' },
                { label: 'Projeção Mediática', value: candidate.stats.carisma, color: 'bg-rose-500' }
              ].map((stat, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    <span>{stat.label}</span>
                    <span className="text-white">{stat.value}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-[1.5s] ease-out ${stat.color}`}
                      style={{ width: isHovered ? `${stat.value}%` : '5%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-[11px] text-slate-400 leading-relaxed italic font-medium">
              <span className="text-emerald-500 font-black mr-2">VERIFICAÇÃO:</span>
              "{candidate.campanhaDiaria}"
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500 overflow-y-auto hide-scrollbar h-full pr-2 pb-4">
            <div className="space-y-2">
               <h4 className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Análise do Investigador</h4>
               <p className="text-[13px] text-slate-300 leading-relaxed font-medium">{candidate.perfilCompleto}</p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
               <div>
                 <h4 className="text-[10px] font-black uppercase text-emerald-400 tracking-widest mb-2">Vantagens Verificadas</h4>
                 <div className="space-y-1">
                   {candidate.pontosFortes.map((p, i) => <div key={i} className="text-[11px] text-slate-400 font-medium flex gap-2"><span>•</span> {p}</div>)}
                 </div>
               </div>
               <div>
                 <h4 className="text-[10px] font-black uppercase text-blue-400 tracking-widest mb-2">Referências Institucionais</h4>
                 <div className="flex flex-wrap gap-2">
                   <a href="https://www.cne.pt" target="_blank" rel="noreferrer" className="text-[9px] px-2 py-1 bg-emerald-500/10 rounded border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-slate-950 transition-all">PORTAL CNE.PT</a>
                   <a href="https://www.tribunalconstitucional.pt" target="_blank" rel="noreferrer" className="text-[9px] px-2 py-1 bg-white/5 rounded border border-white/5 text-slate-500 hover:text-white transition-colors">TRIB. CONSTITUCIONAL</a>
                 </div>
               </div>
            </div>
          </div>
        )}

        <button 
          onClick={(e) => { e.stopPropagation(); setShowMore(!showMore); }}
          className="mt-6 w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-white text-slate-950 hover:bg-emerald-500 hover:text-white active:scale-95 flex items-center justify-center gap-2 shadow-xl"
        >
          {showMore ? 'Fechar Dossier' : 'Aprofundar Investigação'}
          <svg className={`transition-transform duration-500 ${showMore ? 'rotate-180' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
