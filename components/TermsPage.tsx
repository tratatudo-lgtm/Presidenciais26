
import React, { useEffect } from 'react';

interface Props {
  onBack: () => void;
}

const TermsPage: React.FC<Props> = ({ onBack }) => {
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
        <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-12 border-b border-white/5 pb-8">Regras de Operação.</h2>
        
        <div className="space-y-12 text-slate-400 leading-relaxed font-medium">
          <section className="space-y-4">
            <h3 className="text-xl font-black text-white italic uppercase tracking-tight">1. Natureza do Serviço</h3>
            <p>
              O "Portugal 2026 - Investigador" é um terminal experimental informativo. Este projeto não possui ligação oficial com o Governo, a CNE ou partidos políticos.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-rose-500 italic uppercase tracking-tight">2. Isenção Total de Responsabilidade</h3>
            <p className="text-slate-300 font-bold">
              Ao operar este cockpit, o utilizador aceita que os desenvolvedores não assumem responsabilidade por:
            </p>
            <ul className="list-disc pl-6 space-y-3 italic text-sm">
              <li>Erros ou "alucinações" geradas pelo núcleo de IA;</li>
              <li>Interpretacões políticas subjetivas derivadas dos dados apresentados;</li>
              <li>Decisões de voto baseadas unicamente nesta plataforma;</li>
              <li>Quaisquer danos resultantes do uso da informação aqui contida.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-white italic uppercase tracking-tight">3. Apoios via MB WAY</h3>
            <p>
              Qualquer montante enviado via MB WAY é considerado uma <strong className="text-emerald-500">doação voluntária e liberal</strong> para a manutenção técnica do projeto. Não existe um valor fixo nem uma relação comercial de compra de serviços. As funcionalidades "Premium" são desbloqueadas como sinal de gratidão ao apoio da comunidade, podendo ser alteradas ou suspensas conforme a evolução técnica do núcleo neural.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-white italic uppercase tracking-tight">4. Atualização de Dados</h3>
            <p>
              Embora o núcleo IA utilize Search Grounding, existe sempre um delay entre o facto e a indexação. Consulte sempre fontes oficiais para decisões críticas.
            </p>
          </section>

          <div className="pt-12 border-t border-white/5 text-[10px] font-mono text-slate-600 uppercase tracking-widest italic">
            Última Sincronização: Dezembro de 2024. A navegação contínua implica aceitação total destes protocolos.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
