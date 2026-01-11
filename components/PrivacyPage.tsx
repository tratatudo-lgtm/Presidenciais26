
import React, { useEffect } from 'react';

interface Props {
  onBack: () => void;
}

const PrivacyPage: React.FC<Props> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:gap-3 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Voltar ao Dashboard
      </button>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8 border-b pb-6">Política de Privacidade</h2>
        
        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-3">1. Compromisso com a Privacidade</h3>
            <p>
              O projeto "Portugal 2026" valoriza a transparência. Esta política explica como lidamos com os seus dados durante a navegação nesta plataforma informativa.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-3">2. Recolha de Dados</h3>
            <p>
              Não solicitamos nem armazenamos dados pessoais identificáveis (nome, email, morada) para o uso básico da plataforma. 
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong>Interações com a IA:</strong> As perguntas enviadas ao chat são processadas pela API do Google Gemini. Estas mensagens são anónimas do nosso lado, mas podem ser utilizadas pelo fornecedor do modelo para melhorar os seus serviços.</li>
              <li><strong>Cookies:</strong> Utilizamos apenas cookies técnicos essenciais para o funcionamento da aplicação (ex: manter o estado do chat ou o estado premium durante a sessão). Não utilizamos cookies de rastreio publicitário.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-3 text-red-600 uppercase tracking-tight">3. Isenção de Responsabilidade sobre Dados de Terceiros</h3>
            <p className="font-medium text-slate-900">
              Não temos acesso aos seus dados bancários ou detalhes do seu MB WAY.
            </p>
            <p className="mt-2">
              Qualquer transação financeira ou envio de comprovativo ocorre fora da nossa infraestrutura controlada. Não nos responsabilizamos pela segurança de plataformas externas de pagamento ou comunicação.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-3">4. Armazenamento e Segurança</h3>
            <p>
              Os dados de sessão são armazenados localmente no seu navegador (LocalStorage/SessionStorage). Ao limpar os dados do navegador, perderá o histórico de mensagens e o estado de acesso premium. Não mantemos bases de dados centrais com perfis de utilizadores.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-3">5. Direitos do Utilizador</h3>
            <p>
              Dado que não recolhemos dados pessoais, o direito ao esquecimento é exercido pelo próprio utilizador ao fechar o separador ou limpar o cache do navegador.
            </p>
          </section>

          <div className="pt-8 border-t text-sm text-slate-400 italic">
            Última atualização: Outubro de 2024. O uso continuado desta plataforma constitui aceitação desta política simplificada de privacidade.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
