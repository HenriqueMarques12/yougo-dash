/**
 * Verifica se o usuário está autenticado.
 * @returns {boolean} Retorna true se o userId estiver salvo no localStorage, false caso contrário.
 */
export const checkUserAuthenticated = (): boolean => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
       if (userId!="" && userId != null && userId != undefined) return true; // Retorna true se userId for uma string válida, false caso contrário
    }
    return false; // Caso seja executado no servidor, retorna false
  };
  