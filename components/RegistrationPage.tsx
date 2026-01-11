
import React, { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface Props {
  onComplete: (userData: { name: string; email: string; phone: string }) => void;
}

type AuthMode = 'login' | 'register' | 'recover';

const RegistrationPage: React.FC<Props> = ({ onComplete }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Simulação de Base de Dados Local
  const getDB = (): User[] => JSON.parse(localStorage.getItem('portugal_2026_db') || '[]');
  const saveToDB = (users: User[]) => localStorage.setItem('portugal_2026_db', JSON.stringify(users));

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const db = getDB();

    if (mode === 'register') {
      if (!formData.name || !formData.email || !formData.password || !formData.phone) {
        setError('Todos os campos são obrigatórios.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('As palavras-passe não coincidem.');
        return;
      }
      if (db.find(u => u.email === formData.email)) {
        setError('Este email já está registado no sistema.');
        return;
      }

      const newUser: User = { 
        name: formData.name, 
        email: formData.email, 
        phone: formData.phone, 
        password: formData.password 
      };
      saveToDB([...db, newUser]);
      setSuccess('Conta criada com sucesso! Faça login.');
      setMode('login');
      setFormData({ ...formData, password: '', confirmPassword: '' });
    } 
    
    else if (mode === 'login') {
      const user = db.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        onComplete({ name: user.name, email: user.email, phone: user.phone });
      } else {
        setError('Credenciais inválidas. Verifique o email e a password.');
      }
    }

    else if (mode === 'recover') {
      const user = db.find(u => u.email === formData.email);
      if (user) {
        setSuccess('Instruções de recuperação enviadas para o email associado.');
      } else {
        setError('Email não encontrado na base de dados 2026.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0c10] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-lg relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-10 space-y-4">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-slate-950 font-black text-2xl mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">26</div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            {mode === 'login' && 'Acesso ao Terminal'}
            {mode === 'register' && 'Novo Auditor'}
            {mode === 'recover' && 'Recuperar Acesso'}
          </h1>
          <p className="text-slate-400 text-sm font-medium tracking-tight px-10">
            {mode === 'login' && 'Introduza as suas credenciais para monitorizar as presidenciais.'}
            {mode === 'register' && 'Crie o seu perfil para desbloquear auditorias personalizadas.'}
            {mode === 'recover' && 'Indique o seu email para resetar o protocolo de segurança.'}
          </p>
        </div>

        <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 backdrop-blur-3xl shadow-2xl">
          <form onSubmit={handleAuth} className="space-y-6">
            
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white outline-none focus:border-emerald-500/50 transition-all text-sm"
                  placeholder="Nome do Auditor"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Email Institucional</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white outline-none focus:border-emerald-500/50 transition-all text-sm"
                placeholder="auditor@exemplo.com"
              />
            </div>

            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Telemóvel</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white outline-none focus:border-emerald-500/50 transition-all text-sm"
                  placeholder="9xx xxx xxx"
                />
              </div>
            )}

            {mode !== 'recover' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Palavra-Passe</label>
                  {mode === 'login' && (
                    <button 
                      type="button"
                      onClick={() => setMode('recover')}
                      className="text-[9px] font-bold text-emerald-500 uppercase hover:text-emerald-400"
                    >
                      Esqueceu-se?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white outline-none focus:border-emerald-500/50 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            )}

            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Confirmar Password</label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white outline-none focus:border-emerald-500/50 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            )}

            {error && <p className="text-rose-500 text-[10px] font-black uppercase text-center tracking-widest animate-pulse">{error}</p>}
            {success && <p className="text-emerald-500 text-[10px] font-black uppercase text-center tracking-widest">{success}</p>}

            <button
              type="submit"
              className="w-full bg-white text-slate-950 py-4.5 rounded-xl font-black text-[11px] uppercase tracking-[0.25em] hover:bg-emerald-500 hover:text-white transition-all shadow-xl active:scale-95"
            >
              {mode === 'login' && 'Autenticar'}
              {mode === 'register' && 'Confirmar Registo'}
              {mode === 'recover' && 'Enviar Reset'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            {mode === 'login' ? (
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                Não tem conta? {' '}
                <button onClick={() => setMode('register')} className="text-emerald-500 hover:text-white underline underline-offset-4">Criar Novo Perfil</button>
              </p>
            ) : (
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                Já é auditor? {' '}
                <button onClick={() => setMode('login')} className="text-emerald-500 hover:text-white underline underline-offset-4">Fazer Login</button>
              </p>
            )}
          </div>
        </div>

        <p className="text-[9px] text-slate-700 text-center mt-12 font-medium uppercase tracking-[0.3em] leading-loose max-w-sm mx-auto">
          Portugal 2026 • Sistema de Inteligência Política Independente • Versão 3.1
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
