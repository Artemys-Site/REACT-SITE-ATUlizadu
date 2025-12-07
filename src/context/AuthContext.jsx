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
    
    // Token já foi salvo pelo authService
  };

  const updateUser = (userData) => {
    // Normalizar dados do usuário recebidos do backend
    const normalizedUserData = {
      ...user,
      ...userData,
      accountType: userData.accountType || user?.accountType || 
                   (userData.tipo === 'Tutor' ? 'tutor' : 
                    userData.tipo === 'Clínica' ? 'clinica' : 
                    userData.tipo === 'Motorista de Ambulância' ? 'motorista-ambulancia' :
                    user?.accountType),
      tipo: userData.tipo || user?.tipo || 
            (userData.accountType === 'tutor' ? 'Tutor' : 
             userData.accountType === 'clinica' ? 'Clínica' : 
             userData.accountType === 'motorista-ambulancia' ? 'Motorista de Ambulância' :
             user?.tipo)
    };
    
    setUser(normalizedUserData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    
    // Remover token de autenticação
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

