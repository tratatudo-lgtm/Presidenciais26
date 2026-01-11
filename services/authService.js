
/**
 * SERVIÇO DE AUTENTICAÇÃO LOCAL (PROTOCOL 2026)
 * Substitui o GitHub API para evitar erros de rede e garantir privacidade total.
 */
const DB_KEY = 'portugal_2026_local_db';

export const authService = {
  /**
   * Obtém todos os utilizadores guardados no browser
   */
  getUsers() {
    try {
      const data = localStorage.getItem(DB_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Falha ao ler DB local:", e);
      return [];
    }
  },

  /**
   * Regista um novo utilizador localmente
   */
  async saveUser(newUser) {
    // Simula processamento do terminal
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      const users = this.getUsers();
      
      if (users.find(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
        return { success: false, message: "Este email já está registado neste terminal." };
      }

      users.push(newUser);
      localStorage.setItem(DB_KEY, JSON.stringify(users));
      
      return { success: true, message: "Utilizador autenticado com sucesso." };
    } catch (e) {
      return { success: false, message: "Erro de armazenamento local." };
    }
  },

  /**
   * Valida credenciais na base de dados local
   */
  async authenticate(email, pass) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const users = this.getUsers();
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === pass
    );

    if (user) {
      // Retorna cópia sem password
      const { password, ...safeUser } = user;
      return safeUser;
    }
    return null;
  }
};
