import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';
import iconeNotificacao from '../assets/iconeNotificacao.png';
import veterinariaLauraimg from '../assets/veterinariaLauraimg.jpg';
import './HeaderAmbulancia.css';

// Dados de Notificação Falsos para demonstração
const DUMMY_NOTIFICATIONS = [
  { id: 1, message: 'Novo chamado de emergência recebido.', time: '5 minutos atrás', unread: true },
  { id: 2, message: 'Chamado aceito com sucesso.', time: '1 hora atrás', unread: true },
  { id: 3, message: 'Relatório mensal disponível.', time: '2 dias atrás', unread: false },
  { id: 4, message: 'Lembrete: Manutenção do veículo.', time: '1 semana atrás', unread: false },
];

const HeaderAmbulancia = () => {
  // --- Lógica de Auth ---
  let logout = () => {};
  try {
    const auth = useAuth();
    logout = auth.logout;
  } catch (e) {
    console.error("AuthContext não disponível, a função de 'sair' não funcionará.", e);
  }
  
  const navigate = useNavigate();
  const location = useLocation();

  // --- ESTADOS ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationsData, setNotificationsData] = useState(DUMMY_NOTIFICATIONS);

  // Calcula itens não lidos
  const unreadCount = notificationsData.filter(n => n.unread).length;

  // --- REFERÊNCIAS ---
  const dropdownRef = useRef(null);
  const profilePicRef = useRef(null);
  const notificationRef = useRef(null);
  const notificationIconRef = useRef(null);

  // --- HANDLERS ---
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
    if (path === '/painel-ambulancia' && location.pathname === '/painel-ambulancia') return 'active';
    if (path === '/chamados' && (location.pathname.startsWith('/chamados') || location.pathname === '/chamados/pendentes' || location.pathname === '/chamados/finalizados')) return 'active';
    if (path === '/historico' && location.pathname === '/historico') return 'active';
    if (path === '/ambulancia/relatorios' && location.pathname === '/ambulancia/relatorios') return 'active';
    return location.pathname === path ? 'active' : '';
  };

  // --- EFEITOS DE FECHAMENTO ---
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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

  return (
    <header className="main-header-ambulancia">
      <nav className="navbar-ambulancia">
        <div className="nav-logo-ambulancia">
          <Link to="/painel-ambulancia">
            <img src={logo} alt="Logo Artemys" />
          </Link>
          <div className="nav-logo-text-ambulancia">
            <span className="brand-name-ambulancia">ARTEMYS</span>
            <span className="brand-slogan-ambulancia">ONDE O AMOR ENCONTRA SEGURANÇA</span>
          </div>
        </div>

        <button 
          className={`menu-toggle-ambulancia mobile-only ${isMenuOpen ? 'active' : ''}`}
          id="menu-toggle-ambulancia"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links-ambulancia ${isMenuOpen ? 'active' : ''}`} id="nav-links-ambulancia">
          <li>
            <Link to="/painel-ambulancia" className={isActive('/painel-ambulancia')} onClick={closeMenu}>
              PAINEL
            </Link>
          </li>
          <li>
            <Link to="/chamados/pendentes" className={isActive('/chamados')} onClick={closeMenu}>
              CHAMADOS
            </Link>
          </li>
          <li>
            <Link to="/historico" className={isActive('/historico')} onClick={closeMenu}>
              HISTÓRICO
            </Link>
          </li>
          <li>
            <Link to="/ambulancia/relatorios" className={isActive('/ambulancia/relatorios')} onClick={closeMenu}>
              RELATÓRIOS
            </Link>
          </li>
        </ul>

        {/* Ações do usuário Logado */}
        <div className="nav-user-actions-ambulancia">
          {/* Ícone de Configurações */}
          <Link to="/ambulancia/perfil" className="action-icon-ambulancia action-icon-config-ambulancia">
            <i className="bi bi-gear"></i>
          </Link>

          {/* Container de Notificação (Sino) */}
          <div className="action-icon-container-ambulancia">
            <img 
              ref={notificationIconRef}
              src={iconeNotificacao} 
              alt="Notificações" 
              className="action-icon-img-ambulancia"
              onClick={toggleNotification}
            />
            {unreadCount > 0 && (
              <span className="notification-badge-ambulancia">{unreadCount}</span>
            )}

            {/* Painel de Notificações */}
            <div 
              ref={notificationRef}
              className={`notification-panel-ambulancia ${isNotificationOpen ? 'show' : ''}`}
            >
              <h3>Notificações ({notificationsData.length})</h3>
              <div className="notification-list-ambulancia">
                {notificationsData.map(notification => (
                  <div key={notification.id} className={`notification-item-ambulancia ${notification.unread ? 'unread' : ''}`}>
                    <p>{notification.message}</p>
                    <span className="notification-time-ambulancia">{notification.time}</span>
                  </div>
                ))}
                {notificationsData.length === 0 && (
                  <p className="no-notifications-ambulancia">Nenhuma notificação nova.</p>
                )}
              </div>
              
              {notificationsData.length > 0 && (
                <button 
                  className="clear-notifications-btn-ambulancia"
                  onClick={handleClearNotifications}
                >
                  Limpar Notificações
                </button>
              )}
            </div>
          </div>

          {/* Container de Perfil */}
          <div className="profile-container-ambulancia">
            <img
              ref={profilePicRef}
              src={veterinariaLauraimg}
              alt="Perfil"
              className="profile-pic-ambulancia"
              id="profile-pic-btn-ambulancia"
              onClick={toggleDropdown}
            />
            <div 
              ref={dropdownRef}
              className={`profile-dropdown-ambulancia ${isDropdownOpen ? 'show' : ''}`}
              id="profile-dropdown-ambulancia"
            >
              <Link to="/ambulancia/perfil" className="dropdown-item-ambulancia" onClick={() => setIsDropdownOpen(false)}>
                <i className="bi bi-person"></i>
                PERFIL
              </Link>
              <Link to="/ambulancia/configuracao/veiculo" className="dropdown-item-ambulancia" onClick={() => setIsDropdownOpen(false)}>
                <i className="bi bi-gear"></i>
                CONFIGURAÇÕES
              </Link>
              <div className="dropdown-divider-ambulancia"></div>
              <Link 
                to="/" 
                className="dropdown-item-ambulancia" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(false);
                  logout();
                  navigate('/');
                }}
              >
                SAIR
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAmbulancia;

