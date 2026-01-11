
import { User } from '../types';

const DB_KEY = 'portugal_2026_local_db';

/**
 * SERVIÇO DE AUTENTICAÇÃO LOCAL (PROTOCOL 2026)
 * Gere utilizadores e sessões no armazenamento local do navegador.
 * Elimina dependência do GitHub para evitar erros de rede e tokens revogados.
 */
export const authService = {
  /**
   * Obtém a lista de utilizadores registados neste terminal
   */
  getUsers(): User[] {
    const data = localStorage.getItem(DB_KEY);
    try {
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Falha na integridade da base de dados local:", e);
      return [];
    }
  },

  /**
   * Regista um novo auditor localmente
   */
  async saveUser(newUser: User): Promise<{ success: boolean; message: string }> {
    // Simula processamento de segurança
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const users = this.getUsers();
      
      if (users.find(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
        return { success: false, message: "Este email já se encontra registado neste terminal." };
      }

      const updatedUsers = [...users, newUser];
      localStorage.setItem(DB_KEY, JSON.stringify(updatedUsers));
      
      return { success: true, message: "Auditor registado com sucesso no protocolo local." };
    } catch (e) {
      return { success: false, message: "Erro crítico no armazenamento do terminal." };
    }
  },

  /**
   * Autentica auditor comparando dados locais
   */
  async authenticate(email: string, pass: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const users = this.getUsers();
    const found = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === pass
    );
    
    if (found) {
      // Retorna o utilizador sem a password por segurança na sessão
      const { password, ...safeUser } = found;
      return safeUser as User;
    }
    return null;
  }
};
