
import { User } from '../types';

const DB_KEY = 'portugal_2026_users_db';

/**
 * SERVIÇO DE AUTENTICAÇÃO LOCAL
 * Gere a base de utilizadores no armazenamento do navegador para evitar erros de rede.
 */
export const authService = {
  /**
   * Obtém a lista de utilizadores do LocalStorage
   */
  getUsers(): User[] {
    const data = localStorage.getItem(DB_KEY);
    try {
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Erro ao ler base de dados local:", e);
      return [];
    }
  },

  /**
   * Regista um novo utilizador localmente
   */
  async saveUser(newUser: User): Promise<{ success: boolean; message: string }> {
    // Simulamos uma pequena latência para manter o feeling de "sincronização"
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = this.getUsers();
    
    if (users.find(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
      return { success: false, message: "Este email já se encontra registado no terminal." };
    }

    const updatedUsers = [...users, newUser];
    localStorage.setItem(DB_KEY, JSON.stringify(updatedUsers));
    
    return { success: true, message: "Utilizador registado com sucesso no terminal local." };
  },

  /**
   * Autentica utilizador comparando dados locais
   */
  async authenticate(email: string, pass: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = this.getUsers();
    const found = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === pass
    );
    
    if (found) {
      // Retorna o utilizador sem a password por segurança
      const { password, ...safeUser } = found;
      return safeUser as User;
    }
    return null;
  }
};
