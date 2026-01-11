
import React, { useState, useEffect, useMemo } from 'react';
import { CANDIDATES } from './constants';
import { User } from './types';
import CandidateCard from './components/CandidateCard';
import ChatInterface from './components/ChatInterface';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import TransparencyPage from './components/TransparencyPage';
import SupportPage from './components/SupportPage';
import RegistrationPage from './components/RegistrationPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'terms' | 'privacy' | 'transparency' | 'support' | 'registration'>('registration');
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [interactions, setInteractions] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('portugal_2026_current_user');
    const storedPremium = localStorage.getItem('portugal_2026_premium_status');
    const storedInteractions = localStorage.getItem('portugal_2026_interactions');
    
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setCurrentPage('dashboard');
      } catch (e) {
        localStorage.removeItem('portugal_2026_current_user');
      }
    }
    
    if (storedPremium === 'active') setIsPremium(true);
    if (storedInteractions) setInteractions(parseInt(storedInteractions));
    
    setIsInitializing(false);
  }, []);

  const handleLogin = (userData: User) => {
    localStorage.setItem('portugal_2026_current_user', JSON.stringify(userData));
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('portugal_2026_current_user');
    setUser(null);
    setCurrentPage('registration');
  };

  const handleUnlockPremium = () => {
    setIsPremium(true);
    localStorage.setItem('portugal_2026_premium_status', 'active');
    setCurrentPage('dashboard');
  };

  const incrementInteractions = () => {
    if (isPremium) return true;
    if (interactions >= 2) return false;
    
    const nextValue = interactions + 1;
    setInteractions(nextValue);
    localStorage.setItem('portugal_2026_interactions', nextValue.toString());
    return true;
  };

  // Ordenar candidatos para a sondagem
  const sortedByPoll = useMemo(() => {
    return [...CANDIDATES].sort((a, b) => b.sondagem - a.sondagem);
  }, []);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-[3px] border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 animate-pulse italic text-center">
            A Sincronizar Protocolo Tuga...
          </span>
        </div>
      </div>
    );
  }

  if (currentPage === 'registration' || !user) {
    return <RegistrationPage onComplete={handleLogin} />;
  }

  const renderDashboard = () => (
    <div className="space-y-12 sm:space-y-24 pb-40 animate-fade-in">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden pt-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] aspect-square bg-emerald-500/[0.03] blur-[150px] rounded-full -z-10"></div>
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-10 sm:mb-16">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 italic">
            {isPremium ? 'Acesso Premium Ilimitado' : `Terminal Local: ${interactions}/2 Auditorias`}
          </span>
        </div>
        <div className="max-w-6xl px-4">
          <h1 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black text-white tracking-tighter leading-[0.85] italic font-heading mb-8 sm:mb-12">
            SESSÃO, <br/>
            <span className="text-emerald-500">{user.name.split(' ')[0].toUpperCase()}.</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-xl lg:text-2xl max-w-4xl mx-auto font-medium leading-relaxed italic border-l-4 border-emerald-500/20 pl-6 sm:pl-12 py-4 sm:py-6 text-left">
            O terminal Tuga v5 está operacional. <br/>
            Inteligência estatística integrada. <br/>
            Responsivo em Tablet, Mobile e Desktop.
          </p>
        </div>
      </section>

      {/* Analytics Dashboard Section */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-white/5 pb-8 sm:pb-12">
          <h3 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white uppercase italic tracking-tighter">Stats Core.</h3>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] italic md:text-right">Amostragem Neural 2026</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Main Poll Bar Chart */}
          <div className="lg:col-span-2 glass-3d rounded-[2.5rem] p-8 sm:p-12 border border-white/5 flex flex-col justify-between min-h-[500px]">
            <div>
              <h4 className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.4em] mb-12">Intenção de Voto Direta (%)</h4>
              <div className="space-y-8">
                {sortedByPoll.map((c, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="flex justify-between items-end mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-500 italic">#0{i+1}</span>
                        <span className="text-sm font-black text-white uppercase tracking-tight group-hover:text-emerald-500 transition-colors">{c.nome}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {c.tendencia === 'up' && <span className="text-[10px] text-emerald-500 font-bold animate-pulse">▲</span>}
                        {c.tendencia === 'down' && <span className="text-[10px] text-rose-500 font-bold">▼</span>}
                        {c.tendencia === 'stable' && <span className="text-[10px] text-slate-600 font-bold">●</span>}
                        <span className="text-lg font-black text-white italic">{c.sondagem}%</span>
                      </div>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-[2s] ease-out`}
                        style={{ width: `${c.sondagem}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-12 text-[9px] font-black text-slate-600 uppercase tracking-widest italic text-center">Sondagem Simulada via Protocolo Tuga - Margem de Erro: 0.2%</p>
          </div>

          {/* Key Insights & Attributes Comparison */}
          <div className="space-y-8">
            <div className="glass-3d rounded-[2.5rem] p-8 border border-white/5 space-y-8">
              <h4 className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.4em]">Audit Matrix</h4>
              <div className="space-y-6">
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                  <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest block mb-2">Maior Experiência de Estado</span>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-black uppercase text-xs italic">H. Gouveia e Melo</span>
                    <span className="text-emerald-500 font-black italic">98%</span>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                  <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mb-2">Maior Carisma Mediático</span>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-black uppercase text-xs italic">André Ventura</span>
                    <span className="text-blue-400 font-black italic">96%</span>
                  </div>
                </div>
                <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                  <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest block mb-2">Consenso Institucional</span>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-black uppercase text-xs italic">Marques Mendes</span>
                    <span className="text-amber-500 font-black italic">92%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-500 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center space-y-4 shadow-2xl shadow-emerald-900/20">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0a0c10" strokeWidth="3"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
               <h5 className="text-slate-950 font-black text-xl italic uppercase tracking-tighter">Precisa de mais Auditorias?</h5>
               <button onClick={() => setCurrentPage('support')} className="px-6 py-3 bg-slate-950 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Desbloquear Ilimitado</button>
            </div>
          </div>
        </div>
      </section>

      {/* Candidates List Section */}
      <section id="candidates-grid" className="max-w-7xl mx-auto px-6 space-y-12 sm:space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-white/5 pb-8 sm:pb-12">
          <h3 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white uppercase italic tracking-tighter">Auditados.</h3>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] italic md:text-right">Dossiers Atualizados v5.0</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-12">
          {CANDIDATES.map((c, i) => (
            <div key={i} onClick={() => {
              if (!incrementInteractions()) setCurrentPage('support');
            }}>
              <CandidateCard candidate={c} />
            </div>
          ))}
        </div>
      </section>
      
      <footer className="max-w-7xl mx-auto px-6 pt-24 sm:pt-40 pb-16 sm:pb-24 border-t border-white/5">
        <div className="flex flex-col lg:flex-row justify-between gap-12 sm:gap-24 text-slate-500">
          <div className="space-y-8 sm:space-y-10">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black italic text-xl sm:text-2xl">26</div>
              <span className="font-black text-sm sm:text-base uppercase tracking-[0.4em] text-white">Portugal 2026</span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] leading-loose max-w-sm italic opacity-40">
              Protocolo Tuga Independente. <br/>
              Processamento 100% Local. <br/>
              Sondagens em Tempo Real.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 sm:gap-24">
            <div className="space-y-6 sm:space-y-8">
              <h4 className="text-white font-black text-[10px] sm:text-[11px] uppercase tracking-[0.4em] border-b border-white/10 pb-4">Menu</h4>
              <ul className="space-y-3 sm:space-y-4 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em]">
                <li><button onClick={() => setCurrentPage('terms')} className="hover:text-emerald-500 transition-colors">Protocolos</button></li>
                <li><button onClick={() => setCurrentPage('support')} className="hover:text-emerald-500 transition-colors">Apoiar</button></li>
                <li><button onClick={handleLogout} className="hover:text-rose-500 transition-colors">Sair</button></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0c10]">
      <header className="fixed top-0 left-0 w-full z-[200] border-b border-white/5 bg-slate-950/80 backdrop-blur-2xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-28 flex justify-between items-center">
          <button onClick={() => setCurrentPage('dashboard')} className="flex items-center gap-3 sm:gap-5 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl sm:text-2xl italic group-hover:rotate-12 transition-transform duration-500">26</div>
            <span className="hidden sm:inline font-black text-sm uppercase tracking-[0.4em] text-white group-hover:text-emerald-500 transition-colors">Portugal 2026</span>
          </button>
          
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="flex flex-col items-end">
              <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] ${isPremium ? 'text-blue-400' : 'text-emerald-500'}`}>
                {isPremium ? 'Auditor Pro' : 'Terminal Local'}
              </span>
              <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-tight opacity-70 truncate max-w-[100px] sm:max-w-none">
                {user?.name.split(' ')[0]}
              </span>
            </div>
            <button 
              onClick={handleLogout} 
              className="text-rose-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] px-4 py-2 sm:px-8 sm:py-4 border border-rose-500/20 hover:bg-rose-500 hover:text-white rounded-xl transition-all active:scale-95 shadow-md"
            >
              Sair
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1 pt-20 sm:pt-28">
        {currentPage === 'dashboard' && renderDashboard()}
        {currentPage === 'terms' && <TermsPage onBack={() => setCurrentPage('dashboard')} />}
        {currentPage === 'privacy' && <PrivacyPage onBack={() => setCurrentPage('dashboard')} />}
        {currentPage === 'transparency' && <TransparencyPage onBack={() => setCurrentPage('dashboard')} />}
        {currentPage === 'support' && <SupportPage onBack={() => setCurrentPage('dashboard')} onPremiumUnlocked={handleUnlockPremium} />}
      </main>

      <ChatInterface 
        isPremium={isPremium} 
        onPremiumUnlocked={() => {}} 
        onNavigateToSupport={() => setCurrentPage('support')}
      />
    </div>
  );
};

export default App;
