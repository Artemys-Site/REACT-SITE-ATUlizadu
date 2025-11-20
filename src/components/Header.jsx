import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import Vetorizado from '../assets/Vetorizado.svg';
import iconeNotificacao from '../assets/iconeNotificacao.png';
import perfilLogado from '../assets/perfilLogado.png';

const Header = ({ isLoggedIn: propIsLoggedIn }) => {
  let contextIsLoggedIn = false;
  let logout = () => {};
  let user = null;
  
  try {
    const auth = useAuth();
    contextIsLoggedIn = auth.isLoggedIn;
    logout = auth.logout;
    user = auth.user;
  } catch (e) {
    // Contexto não disponível, usar prop
  }
  
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : contextIsLoggedIn;
  
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profilePicRef = useRef(null);
  
  // Verificação simples de tipo de usuário
  const isTutor = user?.accountType === 'tutor' || user?.tipo === 'Tutor';
  // Verificar se é clínica pelo usuário ou pela rota
  const rotasClinica = ['/painel-clinica', '/agendamento-clinica', '/relatorios', '/profissionais-clinica'];
  const isClinica = (user?.accountType === 'clinica' || user?.tipo === 'Clínica') ||
                    rotasClinica.includes(location.pathname) ||
                    location.pathname.startsWith('/perfil-profissional');
  
  // Rotas que requerem header logado
  const rotasLogadas = ['/home-logado', '/painel-clinica', '/agendamento-tutor', '/agendamento-clinica', '/relatorios', '/profissionais-clinica', '/perfil', '/servicos-plus'];
  // Se estiver logado ou em uma rota que requer login, mostrar header logado
  const shouldShowLoggedInHeader = isLoggedIn || rotasLogadas.includes(location.pathname);
  
  // Se estiver em /home-logado e não for clínica, tratar como tutor
  const effectiveIsTutor = isTutor || (location.pathname === '/home-logado' && !isClinica);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        profilePicRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !profilePicRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isActive = (path) => {
    // Verificar se a rota atual corresponde ao path ou se é uma rota relacionada
    if (path === '/agendamento-clinica' && location.pathname === '/agendamento-clinica') return 'active';
    if (path === '/agendamento-tutor' && location.pathname === '/agendamento-tutor') return 'active';
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className={`main-header ${isClinica ? 'header-clinica' : ''}`}>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to={shouldShowLoggedInHeader && isClinica ? '/painel-clinica' : shouldShowLoggedInHeader ? '/home-logado' : '/'}>
            <img src={Vetorizado} alt="Logo Artemys" />
          </Link>
          <div className="nav-logo-text">
            <span className="brand-name">ARTEMYS</span>
            <span className="brand-slogan">CONECTANDO QUEM AMA A QUEM CUIDA</span>
          </div>
        </div>

        <button 
          className={`menu-toggle mobile-only ${isMenuOpen ? 'active' : ''}`}
          id="menu-toggle"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="nav-links">
          {shouldShowLoggedInHeader && isClinica ? (
            <>
              <li>
                <Link to="/painel-clinica" className={isActive('/painel-clinica')} onClick={closeMenu}>
                  PAINEL
                </Link>
              </li>
              <li>
                <Link to="/profissionais-clinica" className={isActive('/profissionais-clinica')} onClick={closeMenu}>
                  PROFISSIONAIS
                </Link>
              </li>
              <li>
                <Link to="/agendamento-clinica" className={isActive('/agendamento-clinica')} onClick={closeMenu}>
                  AGENDAMENTOS
                </Link>
              </li>
              <li>
                <Link to="/relatorios" className={isActive('/relatorios')} onClick={closeMenu}>
                  RELATÓRIOS
                </Link>
              </li>
            </>
          ) : shouldShowLoggedInHeader ? (
            <>
              <li>
                <Link to="/home-logado" className={isActive('/home-logado')} onClick={closeMenu}>
                  Início
                </Link>
              </li>
              <li>
                <Link to="/artigos" className={isActive('/artigos')} onClick={closeMenu}>
                  Artigos
                </Link>
              </li>
              <li>
                <Link to="/planos" className={isActive('/planos')} onClick={closeMenu}>
                  Planos de Assinatura
                </Link>
              </li>
              <li>
                <Link to="/agendamento-tutor" className={isActive('/agendamento-tutor')} onClick={closeMenu}>
                  Agendamentos
                </Link>
              </li>
              <li>
                <Link to="/servicos" className={isActive('/servicos')} onClick={closeMenu}>
                  Serviços
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className={isActive('/')} onClick={closeMenu}>
                  Início
                </Link>
              </li>
              <li>
                <Link to="/artigos" className={isActive('/artigos')} onClick={closeMenu}>
                  Artigos
                </Link>
              </li>
              <li>
                <Link to="/planos" className={isActive('/planos')} onClick={closeMenu}>
                  Planos de Assinatura
                </Link>
              </li>
              <li>
                <Link to="/sobre" className={isActive('/sobre')} onClick={closeMenu}>
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/servicos" className={isActive('/servicos')} onClick={closeMenu}>
                  Serviços
                </Link>
              </li>
            </>
          )}
        </ul>

        {!shouldShowLoggedInHeader ? (
          <div className="nav-buttons">
            <Link to="/login" className="btn-login">Entrar</Link>
            <Link to="/cadastro" className="btn-signup">Cadastrar</Link>
          </div>
        ) : (
          <div className="nav-user-actions">
            {isClinica ? (
              <Link to="/configuracoes-sistema" className="action-icon action-icon-config">
                <i className="bi bi-gear"></i>
              </Link>
            ) : (
              <div className="action-icon">
                <img src={iconeNotificacao} alt="Notificações" />
              </div>
            )}
            <div className="profile-container">
              <img
                ref={profilePicRef}
                src={perfilLogado}
                alt="Perfil"
                className="profile-pic"
                id="profile-pic-btn"
                onClick={toggleDropdown}
              />
              <div 
                ref={dropdownRef}
                className={`profile-dropdown ${isDropdownOpen ? 'show' : ''}`}
                id="profile-dropdown"
              >
                {effectiveIsTutor ? (
                  <>
                    <Link to="/perfil" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <i className="bi bi-person"></i>
                      Meu Perfil
                    </Link>
                    <Link to="/agendamento-tutor" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <i className="bi bi-calendar-check"></i>
                      Agendamentos
                    </Link>
                    <Link to="/perfil#pagamento" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <i className="bi bi-credit-card"></i>
                      Pagamento
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link 
                      to="/" 
                      className="dropdown-item" 
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                    >
                      Sair
                    </Link>
                  </>
                ) : isClinica ? (
                  <>
                    <Link to="/painel-clinica" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <i className="bi bi-speedometer2"></i>
                      Painel
                    </Link>
                    <Link to="/agendamento-clinica" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <i className="bi bi-calendar-check"></i>
                      Agendamentos
                    </Link>
                    <Link to="/relatorios" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <i className="bi bi-file-earmark-text"></i>
                      Relatórios
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link 
                      to="/" 
                      className="dropdown-item" 
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                    >
                      Sair
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/perfil" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>Meu Perfil</Link>
                    <Link to="/agendamento-tutor" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>Agendamentos</Link>
                    <Link to="/perfil#pagamento" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>Pagamento</Link>
                    <Link 
                      to="/" 
                      className="dropdown-item" 
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                    >
                      Sair
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

