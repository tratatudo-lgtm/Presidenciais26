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
        setUser(JSON.parse(storedUser));
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
    localStorage.clear();
    setUser(null);
    setCurrentPage('registration');
  };

  const handleUnlockPremium = () => {
    setIsPremium(true);
    localStorage.setItem('portugal_2026_premium_status', 'active');
  };

  const incrementInteractions = () => {
    if (isPremium) return true;
    if (interactions >= 2) return false;
    const nextValue = interactions + 1;
    setInteractions(nextValue);
    localStorage.setItem('portugal_2026_interactions', nextValue.toString());
    return true;
  };

  const sortedByPoll = useMemo(() => [...CANDIDATES].sort((a, b) => b.sondagem - a.sondagem), []);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (currentPage === 'registration' || !user) {
    return <RegistrationPage onComplete={handleLogin} />;
  }

  const renderDashboard = () => (
    <div className="animate-fade-in space-y-24 sm:space-y-32 pb-40 px-6 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-white uppercase italic tracking-tighter leading-none mb-8">
          Audit <br/><span className="text-emerald-500">2026.</span>
        </h1>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 w-full max-w-lg">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Quota do Terminal</p>
           <div className="flex items-center justify-between gap-4">
              <span className="text-white text-xs font-bold">{isPremium ? 'ILIMITADO' : `${interactions} / 2`}</span>
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: isPremium ? '100%' : `${(interactions / 2) * 100}%` }}></div>
              </div>
           </div>
        </div>
      </section>

      {/* Sondagens */}
      <section>
        <div className="flex justify-between items-baseline mb-12 border-b border-white/5 pb-8">
          <h2 className="text-5xl sm:text-7xl font-black italic uppercase tracking-tighter text-white">Sondagens.</h2>
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Tempo Real</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/5 rounded-[2.5rem] p-10 border border-white/5">
          <div className="space-y-8">
            {sortedByPoll.slice(0, 6).map((c, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-black text-white uppercase italic">{c.nome}</span>
                  <span className="text-lg font-black text-emerald-500 italic">{c.sondagem}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${c.sondagem}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:flex flex-col justify-center items-center border-l border-white/5 pl-12 text-center space-y-6">
             <div className="text-7xl font-black text-white italic">11</div>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Candidatos Auditados no Sistema</p>
             <button onClick={() => setCurrentPage('support')} className="px-8 py-4 bg-emerald-500 text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Desbloquear Relatórios Pro</button>
          </div>
        </div>
      </section>

      {/* Candidatos */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {CANDIDATES.map((c, i) => (
          <div key={i} onClick={() => {
            if (!incrementInteractions()) setCurrentPage('support');
          }}>
            <CandidateCard candidate={c} />
          </div>
        ))}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0c10]">
      <header className="fixed top-0 left-0 w-full z-[200] border-b border-white/5 bg-slate-950/80 backdrop-blur-2xl px-6 h-20 flex justify-between items-center">
        <div onClick={() => setCurrentPage('dashboard')} className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl italic">26</div>
          <span className="hidden sm:block font-black text-sm uppercase tracking-widest text-white">Portugal 2026</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className={`text-[9px] font-black uppercase tracking-widest ${isPremium ? 'text-blue-400' : 'text-emerald-500'}`}>{isPremium ? 'PRO' : 'GUEST'}</p>
            <p className="text-[10px] text-white/50">{user.name}</p>
          </div>
          <button onClick={handleLogout} className="text-rose-500 font-black text-[10px] uppercase tracking-widest border border-rose-500/20 px-4 py-2 rounded-lg hover:bg-rose-500 hover:text-white transition-all">Sair</button>
        </div>
      </header>

      <main className="flex-1 pt-32">
        {currentPage === 'dashboard' && renderDashboard()}
        {currentPage === 'terms' && <TermsPage onBack={() => setCurrentPage('dashboard')} />}
        {currentPage === 'privacy' && <PrivacyPage onBack={() => setCurrentPage('dashboard')} />}
        {currentPage === 'transparency' && <TransparencyPage onBack={() => setCurrentPage('dashboard')} />}
        {currentPage === 'support' && <SupportPage onBack={() => setCurrentPage('dashboard')} onPremiumUnlocked={handleUnlockPremium} />}
      </main>

      <ChatInterface 
        isPremium={isPremium} 
        onPremiumUnlocked={handleUnlockPremium} 
        onNavigateToSupport={() => setCurrentPage('support')}
      />

      <footer className="py-12 px-6 border-t border-white/5 text-center text-[10px] text-slate-600 font-black uppercase tracking-widest space-x-8">
        <button onClick={() => setCurrentPage('terms')} className="hover:text-white">Termos</button>
        <button onClick={() => setCurrentPage('privacy')} className="hover:text-white">Privacidade</button>
        <button onClick={() => setCurrentPage('transparency')} className="hover:text-white">Transparência</button>
      </footer>
    </div>
  );
};

export default App;