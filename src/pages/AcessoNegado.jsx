import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AcessoNegado.css';

const AcessoNegado = () => {
  const { isLoggedIn, user } = useAuth();
  
  const userRole = user?.accountType || (user?.tipo === 'Tutor' ? 'tutor' : user?.tipo === 'Clínica' ? 'clinica' : null);

  const getRedirectPath = () => {
    if (!isLoggedIn) return '/login';
    if (userRole === 'tutor') return '/';
    if (userRole === 'clinica') return '/painel-clinica';
    return '/';
  };

  return (
    <section className="acesso-negado-page">
      <div className="acesso-negado-container">
        <div className="acesso-negado-content">
          <div className="acesso-negado-icon">
            <i className="bi bi-shield-exclamation"></i>
          </div>
          <h1 className="acesso-negado-titulo">ACESSO NEGADO</h1>
          <p className="acesso-negado-mensagem">
            Você não tem permissão para acessar esta página.
          </p>
          <p className="acesso-negado-detalhes">
            {!isLoggedIn 
              ? 'Por favor, faça login para continuar.'
              : `Seu tipo de conta (${userRole === 'tutor' ? 'Tutor' : userRole === 'clinica' ? 'Clínica' : 'Desconhecido'}) não tem acesso a este recurso.`
            }
          </p>
          <div className="acesso-negado-actions">
            {isLoggedIn ? (
              <Link to={getRedirectPath()} className="btn-voltar-painel">
                Voltar ao Painel
              </Link>
            ) : (
              <Link to="/login" className="btn-fazer-login">
                Fazer Login
              </Link>
            )}
            <Link to="/" className="btn-voltar-home">
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcessoNegado;

