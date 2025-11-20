import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // TODO: Implementar verificação de sessão via backend
  // useEffect(() => {
  //   // Verificar token de autenticação com backend
  //   const token = localStorage.getItem('auth_token');
  //   if (token) {
  //     // Fazer chamada à API para validar token e obter dados do usuário
  //     // api.apidokrl.validaporra(token).finhe => arrey do krl 
  //   }
  // }, []);

  const login = (userData) => {
    // TODO: Substituir por chamada à API de login
    // const response = await api.login(email, password, accountType);
    // const userData = response.data;
    
    // Normalizar dados do usuário recebidos do backend
    const normalizedUserData = {
      ...userData,
      accountType: userData.accountType || 
                   (userData.tipo === 'Tutor' ? 'tutor' : 
                    userData.tipo === 'Clínica' ? 'clinica' : 
                    userData.tipo === 'Motorista de Ambulância' ? 'motorista-ambulancia' :
                    userData.accountType),
      tipo: userData.tipo || 
            (userData.accountType === 'tutor' ? 'Tutor' : 
             userData.accountType === 'clinica' ? 'Clínica' : 
             userData.accountType === 'motorista-ambulancia' ? 'Motorista de Ambulância' :
             userData.tipo)
    };
    
    setIsLoggedIn(true);
    setUser(normalizedUserData);
    
    // TODO: Salvar token de autenticação recebido do backend
    // localStorage.setItem('auth_token', response.token);
  };

  const logout = () => {
    // TODO: Fazer chamada à API para invalidar token
    // await api.logout();
    
    setIsLoggedIn(false);
    setUser(null);
    
    // TODO: Remover token de autenticação
    // localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

