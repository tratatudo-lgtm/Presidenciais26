
import React, { useState, useEffect } from 'react';
import { CANDIDATES } from './constants';
import CandidateCard from './components/CandidateCard';
import ChatInterface from './components/ChatInterface';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import TransparencyPage from './components/TransparencyPage';
import SupportPage from './components/SupportPage';
import RegistrationPage from './components/RegistrationPage';

const POLLS_BASE = [
  { name: "Gouveia e Melo", value: 33.2, trend: "+1.1%", color: "#10b981" },
  { name: "Marques Mendes", value: 24.8, trend: "+0.7%", color: "#3b82f6" },
  { name: "André Ventura", value: 19.4, trend: "-1.2%", color: "#ef4444" },
  { name: "Santos Silva", value: 13.9, trend: "+0.4%", color: "#ec4899" },
  { name: "Tiago Mayan", value: 7.1, trend: "+0.5%", color: "#f59e0b" },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'terms' | 'privacy' | 'transparency' | 'support' | 'registration'>('registration');
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('portugal_2026_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleRegistration = (userData: { name: string; email: string; phone: string }) => {
    localStorage.setItem('portugal_2026_user', JSON.stringify(userData));
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('portugal_2026_user');
    setUser(null);
    setCurrentPage('registration');
  };

  const renderDashboard = () => (
    <div className="space-y-24 pb-40 animate-in fade-in duration-1000">
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 italic">Auditando: Janeiro de 2026</span>
        </div>
        <h1 className="text-7xl sm:text-9xl font-black text-white tracking-tighter leading-none italic mb-8">
          REALIDADE <br/><span className="text-emerald-500">ELEITORAL.</span>
        </h1>
        <p className="text-slate-400 text-lg sm:text-2xl max-w-3xl mx-auto font-medium leading-relaxed italic">
          Olá, <span className="text-white font-black">{user?.name.split(' ')[0]}</span>. O Investigador está pronto para purgar alucinações políticas.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-900/60 border border-white/5 rounded-[2.5rem] p-8 sm:p-12 overflow-hidden relative shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Sincronização Jan 2026</h3>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fonte: Portais Oficiais</div>
          </div>
          <div className="space-y-4">
            {[
              { time: "11:45", text: "Gouveia e Melo reforça vantagem nas sondagens de Beja e Évora.", tag: "SONDAGEM" },
              { time: "09:20", text: "Marques Mendes reúne com autarcas do PSD para consolidar apoio no Norte.", tag: "OFICIAL" },
              { time: "Ontem", text: "André Ventura ataca 'estatalização das presidenciais' em comício em Viseu.", tag: "CAMPANHA" },
            ].map((news, i) => (
              <div key={i} className="flex gap-6 p-5 rounded-2xl bg-white/5 border border-white/5 items-center hover:bg-white/[0.08] transition-all">
                <span className="text-[10px] font-mono text-emerald-500 font-black">{news.time}</span>
                <span className="text-[9px] px-2 py-0.5 bg-slate-800 rounded text-slate-400 font-black border border-white/5">{news.tag}</span>
                <p className="text-xs text-slate-300 font-semibold">{news.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-10 space-y-10 shadow-xl">
          <h3 className="text-3xl font-black text-white uppercase italic">Barómetro Semanal 2026.</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {POLLS_BASE.map((p, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 group hover:border-emerald-500/30 transition-all">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{p.name}</span>
                  <span className={`text-[10px] font-black ${p.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{p.trend}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white">{p.value}</span>
                  <span className="text-slate-600 font-bold text-xl">%</span>
                </div>
                <div className="mt-6 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full transition-all duration-1000 ease-in-out" style={{ width: `${p.value}%`, backgroundColor: p.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 bg-emerald-600 rounded-[2.5rem] p-12 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
           <div className="space-y-8 relative z-10">
              <h4 className="text-4xl font-black uppercase italic leading-none tracking-tighter">Auditoria Ativa.</h4>
              <p className="text-base font-medium italic opacity-95 leading-relaxed bg-emerald-700/40 p-6 rounded-2xl border border-white/10">
                Limpamos alucinações de 2021. Apenas candidatos confirmados pelo Tribunal Constitucional para 2026 entram aqui.
              </p>
           </div>
           <button onClick={() => setCurrentPage('support')} className="w-full bg-slate-950 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl">Apoiar Independência</button>
        </div>
      </section>

      <section id="candidates-grid" className="max-w-7xl mx-auto px-6 space-y-16">
        <h3 className="text-5xl sm:text-7xl font-black text-white uppercase italic tracking-tighter">Dossiers 2026.</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {CANDIDATES.map((c, i) => (
            <CandidateCard key={i} candidate={c} />
          ))}
        </div>
      </section>
      
      <footer className="max-w-7xl mx-auto px-6 pt-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between gap-12 text-slate-500">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-slate-950 font-black italic">26</div>
              <span className="font-black text-xs uppercase tracking-widest text-white">PORTUGAL 2026</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest leading-loose max-w-xs">
              Projecto independente de auditoria política neural. Transparência acima de tudo.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h4 className="text-white font-black text-[10px] uppercase tracking-widest">Protocolos</h4>
              <ul className="space-y-2 text-[9px] font-bold uppercase tracking-widest">
                <li><button onClick={() => setCurrentPage('terms')} className="hover:text-emerald-500 transition-colors">Termos</button></li>
                <li><button onClick={() => setCurrentPage('privacy')} className="hover:text-emerald-500 transition-colors">Privacidade</button></li>
                <li><button onClick={() => setCurrentPage('transparency')} className="hover:text-emerald-500 transition-colors">Transparência</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-black text-[10px] uppercase tracking-widest">Sistema</h4>
              <ul className="space-y-2 text-[9px] font-bold uppercase tracking-widest">
                <li><button onClick={() => setCurrentPage('support')} className="hover:text-emerald-500 transition-colors">Apoiar</button></li>
                <li><button onClick={handleLogout} className="hover:text-rose-500 transition-colors">Terminar Sessão</button></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  if (currentPage === 'registration' && !user) return <RegistrationPage onComplete={handleRegistration} />;

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0c10]">
      <header className="fixed top-0 left-0 w-full z-[200] border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <button onClick={() => setCurrentPage('dashboard')} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-slate-950 font-black text-lg italic">26</div>
            <span className="font-black text-xs uppercase tracking-widest text-white">PORTUGAL 2026</span>
          </button>
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setCurrentPage('support')} 
              className="bg-emerald-500 text-slate-950 px-4 sm:px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg"
            >
              Apoiar
            </button>
            <button 
              onClick={handleLogout} 
              className="hidden sm:block text-slate-500 hover:text-rose-500 px-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Sair
            </button>
          </div>
        </nav>
      </header>
      <main className="flex-1 pt-20">
        {currentPage === 'dashboard' && renderDashboard()}
        {currentPage === 'terms' && <TermsPage onBack={() => setCurrentPage('dashboard')} />}
        {currentPage === 'privacy' && <PrivacyPage onBack={() => setCurrentPage('dashboard')} />}
        {currentPage === 'transparency' && <TransparencyPage onBack={() => setCurrentPage('dashboard')} />}
        {currentPage === 'support' && <SupportPage onBack={() => setCurrentPage('dashboard')} />}
      </main>
      <ChatInterface isPremium={false} onPremiumUnlocked={() => {}} />
    </div>
  );
};

export default App;
