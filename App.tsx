
import React, { useState, useEffect } from 'react';
import { CANDIDATES } from './constants';
import { User } from './types';
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
  { name: "António José Seguro", value: 13.9, trend: "+0.4%", color: "#ec4899" },
  { name: "Tiago Mayan", value: 7.1, trend: "+0.5%", color: "#f59e0b" },
];

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
    
    if (storedPremium === 'active') {
      setIsPremium(true);
    }

    if (storedInteractions) {
      setInteractions(parseInt(storedInteractions));
    }
    
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

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-[3px] border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-emerald-500 animate-pulse">Sincronizando Terminal Local...</span>
        </div>
      </div>
    );
  }

  if (currentPage === 'registration' || !user) {
    return <RegistrationPage onComplete={handleLogin} />;
  }

  const renderDashboard = () => (
    <div className="space-y-24 pb-40 animate-fade-in">
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-500/5 blur-[160px] rounded-full -z-10"></div>
        
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-12">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-400 italic">
            {isPremium ? 'Acesso Premium Ilimitado' : `Interações: ${interactions}/2`}
          </span>
        </div>

        <div className="max-w-5xl">
          <h1 className="text-6xl sm:text-[11rem] font-black text-white tracking-tighter leading-[0.8] italic font-heading mb-10">
            OLÁ, <br/>
            <span className="text-emerald-500">${user.name.split(' ')[0].toUpperCase()}.</span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-2xl max-w-3xl mx-auto font-medium leading-relaxed italic border-l-4 border-emerald-500/20 pl-10 py-4 text-left">
            Terminal local operacional. <br/>
            Sem dependências de nuvem para maior segurança. <br/>
            Investigue os dossiers presidenciais de 2026.
          </p>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-8">
          <button 
            onClick={() => document.getElementById('candidates-grid')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-6 bg-white text-slate-950 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] hover:bg-emerald-500 hover:text-white transition-all shadow-2xl active:scale-95"
          >
            Iniciar Auditoria
          </button>
          {!isPremium && (
            <button 
              onClick={() => setCurrentPage('support')}
              className="px-12 py-6 bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] hover:bg-emerald-600 hover:text-white transition-all backdrop-blur-md active:scale-95"
            >
              Desbloquear Ilimitado
            </button>
          )}
        </div>
      </section>

      <section id="candidates-grid" className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 border-b border-white/5 pb-10">
          <h3 className="text-5xl sm:text-8xl font-black text-white uppercase italic tracking-tighter">Dossiers.</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.4em] italic text-right">Verificação Neural 2026</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {CANDIDATES.map((c, i) => (
            <div key={i} onClick={() => {
              if (!incrementInteractions()) setCurrentPage('support');
            }}>
              <CandidateCard candidate={c} />
            </div>
          ))}
        </div>
      </section>
      
      <footer className="max-w-7xl mx-auto px-6 pt-32 pb-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between gap-20 text-slate-500">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black italic text-xl">26</div>
              <span className="font-black text-sm uppercase tracking-[0.3em] text-white">Portugal 2026</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] leading-loose max-w-sm italic opacity-60">
              Protocolo de Auditoria Local. Os seus dados não saem deste terminal.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-6">
              <h4 className="text-white font-black text-[11px] uppercase tracking-widest border-b border-white/10 pb-2">Sistema</h4>
              <ul className="space-y-3 text-[10px] font-bold uppercase tracking-widest">
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
        <nav className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
          <button onClick={() => setCurrentPage('dashboard')} className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl italic group-hover:rotate-6 transition-transform">26</div>
            <span className="font-black text-sm uppercase tracking-[0.3em] text-white">Portugal 2026</span>
          </button>
          
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex flex-col items-end">
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isPremium ? 'text-blue-400' : 'text-emerald-500'}`}>
                {isPremium ? 'Auditor Pro' : 'Auditor Local'}
              </span>
              <span className="text-[11px] font-bold text-white tracking-tight">{user?.name}</span>
            </div>
            <button 
              onClick={handleLogout} 
              className="text-rose-500 text-[10px] font-black uppercase tracking-[0.3em] px-6 py-3 border border-rose-500/20 hover:bg-rose-500 hover:text-white rounded-xl transition-all active:scale-95"
            >
              Sair
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1 pt-24">
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
