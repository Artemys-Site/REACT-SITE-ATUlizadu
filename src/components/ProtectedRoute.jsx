import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// TODO: Remover quando backend estiver pronto
// Flag temporária para permitir acesso durante desenvolvimento sem backend
const DEV_MODE = true; // Mudar para false quando backend estiver implementado

const ProtectedRoute = ({ 
  children, 
  allowedRoles, 
  requireAuth = true,
  redirectTo = '/acesso-negado',
  loginRedirect = '/login'
}) => {
  const { isLoggedIn, user } = useAuth();

  // Modo de desenvolvimento: permite acesso direto sem autenticação
  // TODO: Remover quando backend estiver pronto
  if (DEV_MODE && requireAuth && !isLoggedIn) {
    // Simula usuário logado com role baseado na rota
    // Isso permite testar as páginas durante desenvolvimento
    const simulatedUser = {
      accountType: allowedRoles === 'clinica' ? 'clinica' : 
                   allowedRoles === 'tutor' ? 'tutor' : 
                   Array.isArray(allowedRoles) ? allowedRoles[0] : 'clinica',
      tipo: allowedRoles === 'clinica' ? 'Clínica' : 
            allowedRoles === 'tutor' ? 'Tutor' : 'Clínica'
    };
    
    // Permite acesso direto em modo de desenvolvimento
    return children;
  }

  // Se requer autenticação e usuário não está logado
  if (requireAuth && !isLoggedIn) {
    return <Navigate to={loginRedirect} replace />;
  }

  // Se não requer autenticação, permite acesso
  if (!requireAuth) {
    return children;
  }

  // Obter role do usuário
  const userRole = user?.accountType || (user?.tipo === 'Tutor' ? 'tutor' : user?.tipo === 'Clínica' ? 'clinica' : null);

  // Se usuário não tem role definido
  if (!userRole) {
    return <Navigate to={redirectTo} replace />;
  }

  // Se allowedRoles é um array, verifica se tem algum dos roles
  if (Array.isArray(allowedRoles)) {
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to={redirectTo} replace />;
    }
  } 
  // Se allowedRoles é uma string, verifica se tem o role específico
  else if (allowedRoles) {
    if (userRole !== allowedRoles) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

