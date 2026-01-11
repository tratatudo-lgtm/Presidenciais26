
import React, { useState } from 'react';
import { authService } from '../services/authService';
import { User } from '../types';

interface Props {
  onComplete: (user: User) => void;
}

const RegistrationPage: React.FC<Props> = ({ onComplete }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | 'success', msg: string } | null>(null);
  
  const [formData, setFormData] = useState({
    input_nome: '',
    input_email: '',
    input_password: '',
  });

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      if (isLogin) {
        const user = await authService.authenticate(formData.input_email, formData.input_password);
        if (user) {
          setStatus({ type: 'success', msg: "Acesso autorizado. A iniciar terminal..." });
          setTimeout(() => onComplete(user), 800);
        } else {
          setStatus({ type: 'error', msg: "Credenciais inválidas. Verifique os dados." });
        }
      } else {
        const newUser: User = {
          id: crypto.randomUUID(),
          name: formData.input_nome || 'Auditor',
          email: formData.input_email,
          password: formData.input_password,
          phone: 'N/A',
          createdAt: new Date().toISOString()
        };

        const result = await authService.saveUser(newUser);
        if (result.success) {
          setStatus({ type: 'success', msg: result.message });
          setTimeout(() => onComplete(newUser), 1000);
        } else {
          setStatus({ type: 'error', msg: result.message });
        }
      }
    } catch (err) {
      setStatus({ type: 'error', msg: "Falha técnica no armazenamento local." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-6 selection:bg-emerald-500 selection:text-slate-950">
      <div className="w-full max-w-[420px] animate-fade-in">
        
        <div className="text-center mb-12">
          <div className="inline-flex w-14 h-14 bg-emerald-500 rounded-2xl items-center justify-center text-slate-950 font-black text-2xl italic mb-6 shadow-2xl">26</div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-tight">Painel de <br/> Autenticação</h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-3">Protocolo 2026 • Terminal Seguro</p>
        </div>

        <div className="glass-3d rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0"></div>
          
          <div className="mb-10 flex p-1 bg-white/5 rounded-xl border border-white/5">
            <button 
              onClick={() => { setIsLogin(true); setStatus(null); }}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${isLogin ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              Aceder
            </button>
            <button 
              onClick={() => { setIsLogin(false); setStatus(null); }}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${!isLogin ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              Registar
            </button>
          </div>

          <form onSubmit={handleAction} className="space-y-6">
            {!isLogin && (
              <div className="group">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2 block ml-1">Nome de Auditor</label>
                <input 
                  type="text" 
                  required
                  placeholder="Seu nome"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-emerald-500/50 transition-all font-medium"
                  value={formData.input_nome}
                  onChange={e => setFormData({...formData, input_nome: e.target.value})}
                />
              </div>
            )}

            <div className="group">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2 block ml-1">Endereço de Email</label>
              <input 
                type="email" 
                required
                placeholder="auditoria@terminal.pt"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-emerald-500/50 transition-all font-medium"
                value={formData.input_email}
                onChange={e => setFormData({...formData, input_email: e.target.value})}
              />
            </div>

            <div className="group">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2 block ml-1">Palavra-passe</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-emerald-500/50 transition-all font-medium"
                value={formData.input_password}
                onChange={e => setFormData({...formData, input_password: e.target.value})}
              />
            </div>

            {status && (
              <div className={`p-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-center ${status.type === 'error' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                {status.msg}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-slate-950 py-5 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading && <div className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>}
              {isLogin ? 'Iniciar Login' : 'Confirmar Registo'}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center text-[9px] text-slate-700 font-bold uppercase tracking-[0.3em] italic">
          Portugal 2026 • Auditoria Independente • Dados Encriptados Localmente
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
