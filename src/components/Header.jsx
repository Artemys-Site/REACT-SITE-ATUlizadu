import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import logo from '../assets/logo.svg';
import iconeNotificacao from '../assets/iconeNotificacao.png';
import perfilLogado from '../assets/perfilLogado.svg';

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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profilePicRef = useRef(null);
  const notificationRef = useRef(null);
  const notificationIconRef = useRef(null);

  // Dados de Notificação Falsos para demonstração
  const DUMMY_NOTIFICATIONS = [
    { id: 1, message: 'Nova consulta agendada para hoje.', time: '5 minutos atrás', unread: true },
    { id: 2, message: 'Profissional confirmou disponibilidade.', time: '1 hora atrás', unread: true },
    { id: 3, message: 'Relatório mensal disponível.', time: '2 dias atrás', unread: false },
    { id: 4, message: 'Lembrete: Reunião de equipe amanhã.', time: '1 semana atrás', unread: false },
  ];

  const [notificationsData, setNotificationsData] = useState(DUMMY_NOTIFICATIONS);
  const unreadCount = notificationsData.filter(n => n.unread).length;
  
  // Estado para foto do perfil
  const [profilePhoto, setProfilePhoto] = useState(() => {
    // Buscar foto do localStorage ou do contexto
    const fotoFromStorage = localStorage.getItem('userFoto');
    const fotoFromUser = user?.foto;
    return fotoFromStorage || fotoFromUser || perfilLogado;
  });
  
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

  // Atualizar foto do perfil quando houver mudanças
  useEffect(() => {
    // Função para atualizar a foto do perfil
    const updateProfilePhoto = () => {
      const fotoFromStorage = localStorage.getItem('userFoto');
      const fotoFromUser = user?.foto || user?.fotoTutor || user?.fotoClinica || user?.fotoVeterinario || user?.fotoAmbulancia;
      let fotoToUse = fotoFromStorage || fotoFromUser;
      
      // Se a foto do usuário não tem prefixo data:, adicionar
      if (fotoToUse && !fotoToUse.startsWith('data:') && !fotoToUse.startsWith('http') && fotoToUse.length > 0) {
        // Verificar se é base64 válido
        const base64String = fotoToUse.replace(/\s/g, '');
        const base64Regex = /^[A-Za-z0-9+/=]+$/;
        if (base64String.length > 0 && base64Regex.test(base64String)) {
          fotoToUse = `data:image/jpeg;base64,${base64String}`;
        }
      }
      
      if (fotoToUse && fotoToUse !== perfilLogado && fotoToUse.length > 0) {
        setProfilePhoto(fotoToUse);
      } else if (!fotoToUse || fotoToUse.length === 0) {
        // Se não houver foto, usar a padrão
        setProfilePhoto(perfilLogado);
      }
    };

    // Atualizar imediatamente quando o componente monta ou quando user/isLoggedIn muda
    updateProfilePhoto();

    // Escutar eventos de atualização de usuário
    const handleUserUpdate = (event) => {
      const foto = event.detail?.foto;
      if (foto) {
        setProfilePhoto(foto);
        localStorage.setItem('userFoto', foto);
      } else {
        // Se não houver foto no evento, buscar do localStorage
        updateProfilePhoto();
      }
    };

    // Escutar evento de login
    const handleUserLogin = (event) => {
      // Quando o usuário faz login, buscar foto do evento ou do localStorage
      const fotoFromEvent = event.detail?.foto;
      if (fotoFromEvent) {
        setProfilePhoto(fotoFromEvent);
        localStorage.setItem('userFoto', fotoFromEvent);
      } else {
        // Se não houver foto no evento, buscar do localStorage após um pequeno delay
        // para garantir que o localStorage foi atualizado
        setTimeout(() => {
          updateProfilePhoto();
        }, 100);
      }
    };

    // Escutar mudanças no localStorage (quando a foto é atualizada em outra aba)
    const handleStorageChange = (e) => {
      if (e.key === 'userFoto') {
        if (e.newValue) {
          setProfilePhoto(e.newValue);
        } else {
          setProfilePhoto(perfilLogado);
        }
      }
    };

    window.addEventListener('userUpdated', handleUserUpdate);
    window.addEventListener('userLogin', handleUserLogin);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
      window.removeEventListener('userLogin', handleUserLogin);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user, isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickOutsideProfile = 
        isDropdownOpen &&
        dropdownRef.current &&
        profilePicRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !profilePicRef.current.contains(event.target);
        
      if (isClickOutsideProfile) {
        setIsDropdownOpen(false);
      }

      const isClickOutsideNotification = 
        isNotificationOpen &&
        notificationRef.current &&
        notificationIconRef.current &&
        !notificationRef.current.contains(event.target) &&
        !notificationIconRef.current.contains(event.target);
        
      if (isClickOutsideNotification) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen, isNotificationOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (!isDropdownOpen) setIsNotificationOpen(false);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotification = (e) => {
    e.stopPropagation();
    if (!isNotificationOpen) setIsDropdownOpen(false);
    setIsNotificationOpen(!isNotificationOpen);

    // Marca todas como lidas ao abrir o painel
    if (!isNotificationOpen) {
      setNotificationsData(notificationsData.map(n => ({ ...n, unread: false })));
    }
  };

  const handleClearNotifications = () => {
    setNotificationsData([]);
    setIsNotificationOpen(false);
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
            <img src={logo} alt="Logo Artemys" />
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
                  INÍCIO
                </Link>
              </li>
              <li>
                <Link to="/guias-primeiros-socorros" className={isActive('/guias-primeiros-socorros')} onClick={closeMenu}>
                  ARTIGOS
                </Link>
              </li>
              <li>
                <Link to="/planos" className={isActive('/planos')} onClick={closeMenu}>
                  PLANOS DE ASSINATURA
                </Link>
              </li>
              <li>
                <Link to="/agendamento-tutor" className={isActive('/agendamento-tutor')} onClick={closeMenu}>
                  AGENDAMENTOS
                </Link>
              </li>
              <li>
                <Link to="/servicos" className={isActive('/servicos')} onClick={closeMenu}>
                  SERVIÇOS
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className={isActive('/')} onClick={closeMenu}>
                  INÍCIO
                </Link>
              </li>
              <li>
                <Link to="/guias-primeiros-socorros" className={isActive('/guias-primeiros-socorros')} onClick={closeMenu}>
                  ARTIGOS
                </Link>
              </li>
              <li>
                <Link to="/planos" className={isActive('/planos')} onClick={closeMenu}>
                  PLANOS DE ASSINATURA
                </Link>
              </li>
              <li>
                <Link to="/sobre" className={isActive('/sobre')} onClick={closeMenu}>
                  SOBRE NÓS
                </Link>
              </li>
              <li>
                <Link to="/servicos" className={isActive('/servicos')} onClick={closeMenu}>
                  SERVIÇOS
                </Link>
              </li>
            </>
          )}
        </ul>

        {!shouldShowLoggedInHeader ? (
          <div className="nav-buttons">
            <Link to="/login" className="btn-login">ENTRAR</Link>
            <Link to="/cadastro" className="btn-signup">CADASTRAR</Link>
          </div>
        ) : (
          <div className="nav-user-actions">
            {isClinica ? (
              <>
                <Link to="/configuracoes-sistema" className="action-icon action-icon-config desktop-only">
                  <i className="bi bi-gear"></i>
                </Link>
                <div className="action-icon-container desktop-only">
                  <img 
                    ref={notificationIconRef}
                    src={iconeNotificacao} 
                    alt="Notificações" 
                    className="action-icon-img"
                    onClick={toggleNotification}
                  />
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}

                  {/* Painel de Notificações */}
                  <div 
                    ref={notificationRef}
                    className={`notification-panel ${isNotificationOpen ? 'show' : ''}`}
                  >
                    <h3>Notificações ({notificationsData.length})</h3>
                    <div className="notification-list">
                      {notificationsData.map(notification => (
                        <div key={notification.id} className={`notification-item ${notification.unread ? 'unread' : ''}`}>
                          <p>{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                      ))}
                      {notificationsData.length === 0 && (
                        <p className="no-notifications">Nenhuma notificação nova.</p>
                      )}
                    </div>
                    
                    {notificationsData.length > 0 && (
                      <button 
                        className="clear-notifications-btn"
                        onClick={handleClearNotifications}
                      >
                        Limpar Notificações
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : null}
            <div className="profile-container">
              <img
                ref={profilePicRef}
                src={profilePhoto}
                alt="Perfil"
                className="profile-pic"
                id="profile-pic-btn"
                onClick={toggleDropdown}
                onError={(e) => {
                  // Se a imagem falhar ao carregar, usar a imagem padrão
                  e.target.src = perfilLogado;
                }}
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
                      MEU PERFIL
                    </Link>
                    <Link to="/agendamento-tutor" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <i className="bi bi-calendar-check"></i>
                      AGENDAMENTOS
                    </Link>
                    <Link to="/perfil#pagamento" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <i className="bi bi-credit-card"></i>
                      PAGAMENTO
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
                      SAIR
                    </Link>
                  </>
                ) : isClinica ? (
                  <>
                    <Link to="/painel-clinica" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <i className="bi bi-speedometer2"></i>
                      PAINEL
                    </Link>
                    <Link to="/agendamento-clinica" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <i className="bi bi-calendar-check"></i>
                      AGENDAMENTOS
                    </Link>
                    <Link to="/relatorios" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <i className="bi bi-file-earmark-text"></i>
                      RELATÓRIOS
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
                      SAIR
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/perfil" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>MEU PERFIL</Link>
                    <Link to="/agendamento-tutor" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>AGENDAMENTOS</Link>
                    <Link to="/perfil#pagamento" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>PAGAMENTO</Link>
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
                      SAIR
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

