
import React, { useState } from 'react';
import { ExtendedCandidate } from '../constants';

interface Props {
  candidate: ExtendedCandidate;
}

const CandidateCard: React.FC<Props> = ({ candidate }) => {
  const [showMore, setShowMore] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasBeenHovered, setHasBeenHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Candidatura Formalizada': return 'bg-emerald-500 text-slate-950';
      case 'Em Validação': return 'bg-amber-500 text-slate-950';
      default: return 'bg-blue-500 text-white';
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!hasBeenHovered) setHasBeenHovered(true);
  };

  const initials = candidate.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-[500px] sm:min-h-[580px] rounded-[2rem] bg-slate-900/40 border border-white/5 overflow-hidden flex flex-col group transition-all duration-500 hover:border-emerald-500/20 shadow-2xl"
    >
      {/* Visual Placeholder (Initials) */}
      <div className="relative h-48 sm:h-56 shrink-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950">
        <div className={`text-6xl sm:text-8xl font-black italic tracking-tighter opacity-10 transition-all duration-700 ${isHovered ? 'scale-110 opacity-20' : ''}`}>
          {initials}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded border border-emerald-500/30">
             <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-emerald-500">Perfil Tuga v4</span>
          </div>
          <div className={`px-2 py-1 rounded text-[7px] sm:text-[8px] font-black uppercase tracking-widest shadow-lg ${getStatusColor(candidate.status)}`}>
             {candidate.status}
          </div>
        </div>

        <div className="absolute bottom-4 left-6 right-6 sm:bottom-6 sm:left-8 sm:right-8">
          <div className="inline-block px-2 py-0.5 bg-white/10 border border-white/10 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white mb-1 sm:mb-2 backdrop-blur-md">
            {candidate.partido}
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase leading-none">{candidate.nome}</h3>
          <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 sm:mt-2">{candidate.ideologia}</p>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-slate-900/40">
        {!showMore ? (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
            <div className="space-y-1">
              <h4 className="text-[8px] sm:text-[9px] font-black uppercase text-emerald-500 tracking-widest flex items-center gap-2">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6 9 17l-5-5"/></svg>
                Tipo de Auditoria
              </h4>
              <p className="text-[10px] sm:text-[11px] text-slate-300 font-bold italic">{candidate.tipo}</p>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
              {[
                { label: 'Experiência', value: candidate.stats.experiencia, color: 'bg-emerald-500' },
                { label: 'Popularidade', value: candidate.stats.popularidade, color: 'bg-blue-500' },
                { label: 'Carisma', value: candidate.stats.carisma, color: 'bg-rose-500' }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    <span>{stat.label}</span>
                    <span className="text-white">{stat.value}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-[1.5s] ease-out ${stat.color}`}
                      style={{ width: (hasBeenHovered || isHovered) ? `${stat.value}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 sm:p-4 bg-white/5 rounded-xl border border-white/5 text-[10px] sm:text-[11px] text-slate-400 leading-relaxed italic font-medium">
              <span className="text-emerald-500 font-black mr-2">Dossier:</span>
              "{candidate.proposta}"
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-2 duration-500 overflow-y-auto hide-scrollbar h-full pr-2 pb-4">
            <div className="space-y-2">
               <h4 className="text-[9px] sm:text-[10px] font-black uppercase text-emerald-500 tracking-widest">Parecer do Tuga</h4>
               <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-medium">{candidate.perfilCompleto}</p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
               <div>
                 <h4 className="text-[9px] sm:text-[10px] font-black uppercase text-emerald-400 tracking-widest mb-2">Vantagens Verificadas</h4>
                 <div className="space-y-1">
                   {candidate.pontosFortes.map((p, i) => <div key={i} className="text-[10px] sm:text-[11px] text-slate-400 font-medium flex gap-2"><span>•</span> {p}</div>)}
                 </div>
               </div>
               <div className="flex flex-wrap gap-2 pt-2">
                 <a href="https://www.cne.pt" target="_blank" rel="noreferrer" className="text-[8px] px-2 py-1 bg-emerald-500/10 rounded border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-slate-950 transition-all font-black">REGISTO CNE</a>
               </div>
            </div>
          </div>
        )}

        <button 
          onClick={(e) => { e.stopPropagation(); setShowMore(!showMore); }}
          className="mt-4 sm:mt-6 w-full py-4 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all bg-white text-slate-950 hover:bg-emerald-500 hover:text-white active:scale-95 flex items-center justify-center gap-2 shadow-xl"
        >
          {showMore ? 'Resumo' : 'Aprofundar'}
          <svg className={`transition-transform duration-500 ${showMore ? 'rotate-180' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
