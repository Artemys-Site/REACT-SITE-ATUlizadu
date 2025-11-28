import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';
import iconeNotificacao from '../assets/iconeNotificacao.png';
import veterinariaLauraimg from '../assets/veterinariaLauraimg.jpg';
import './HeaderVeterinario.css';

// Dados de Notificação Falsos para demonstração
const DUMMY_NOTIFICATIONS = [
  { id: 1, message: 'Nova consulta agendada para Tobby.', time: '5 minutos atrás', unread: true },
  { id: 2, message: 'Dr. João comentou no seu artigo sobre pulgas.', time: '1 hora atrás', unread: true },
  { id: 3, message: 'O relatório da semana passada está pronto.', time: '2 dias atrás', unread: false },
  { id: 4, message: 'Lembrete: Vacinação de Rex amanhã.', time: '1 semana atrás', unread: false },
];

const HeaderVeterinario = () => {
  // --- Lógica de Auth (Mantida) ---
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
  // Use a simulação de notificações no estado
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

    // Marca todas como lidas ao abrir o painel (simulação)
    if (!isNotificationOpen) {
      setNotificationsData(notificationsData.map(n => ({ ...n, unread: false })));
    }
  };
  
  // --- NOVO HANDLER: LIMPAR NOTIFICAÇÕES ---
  const handleClearNotifications = () => {
    // Simula a limpeza: define o array como vazio
    setNotificationsData([]); 
    // Fecha o painel após a ação
    setIsNotificationOpen(false);
  };

  const isActive = (path) => {
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
    <header className="main-header-veterinario">
      <nav className="navbar-veterinario">
        <div className="nav-logo-veterinario">
          <Link to="/painel-veterinario">
            <img src={logo} alt="Logo Artemys" />
          </Link>
          <div className="nav-logo-text-veterinario">
            <span className="brand-name-veterinario">ARTEMYS</span>
            <span className="brand-slogan-veterinario">CONECTANDO QUEM AMA A QUEM CUIDA</span>
          </div>
        </div>

        <button 
          className={`menu-toggle-veterinario mobile-only ${isMenuOpen ? 'active' : ''}`}
          id="menu-toggle-veterinario"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links-veterinario ${isMenuOpen ? 'active' : ''}`} id="nav-links-veterinario">
          <li>
            <Link to="/painel-veterinario" className={isActive('/painel-veterinario')} onClick={closeMenu}>
              Painel
            </Link>
          </li>
          <li>
            <Link to="/pacientesVeterinario" className={isActive('/pacientesVeterinario')} onClick={closeMenu}>
              Pacientes
            </Link>
          </li>
          <li>
            <Link to="/agendaVeterinario" className={isActive('/agendaVeterinario')} onClick={closeMenu}>
              Agenda
            </Link>
          </li>
          <li>
            <Link to="/relatorioVeterinario" className={isActive('/relatorioVeterinario')} onClick={closeMenu}>
              Relatório
            </Link>
          </li>
        </ul>

        {/* Ações do usuário Logado - SEMPRE RENDERIZADAS */}
        <div className="nav-user-actions-veterinario">
          
          {/* CONTAINER DE NOTIFICAÇÃO (SINO) */}
          <div className="action-icon-container-veterinario">
            <img 
              ref={notificationIconRef}
              src={iconeNotificacao} 
              alt="Notificações" 
              className="action-icon-veterinario"
              onClick={toggleNotification}
            />
            {unreadCount > 0 && (
              <span className="notification-badge-veterinario">{unreadCount}</span>
            )}

            {/* PAINEL DE NOTIFICAÇÕES */}
            <div 
              ref={notificationRef}
              className={`notification-panel-veterinario ${isNotificationOpen ? 'show' : ''}`}
            >
              <h3>Notificações ({notificationsData.length})</h3>
              <div className="notification-list-veterinario">
                {notificationsData.map(notification => (
                  <div key={notification.id} className={`notification-item-veterinario ${notification.unread ? 'unread' : ''}`}>
                    <p>{notification.message}</p>
                    <span className="notification-time-veterinario">{notification.time}</span>
                  </div>
                ))}
                {notificationsData.length === 0 && (
                  <p className="no-notifications-veterinario">Nenhuma notificação nova.</p>
                )}
              </div>
              
              {/* NOVO ELEMENTO: Botão Limpar Notificações */}
              {notificationsData.length > 0 && (
                <button 
                  className="clear-notifications-btn-veterinario"
                  onClick={handleClearNotifications}
                >
                  Limpar Notificações
                </button>
              )}
              
            </div>
          </div>
          
          {/* CONTAINER DE PERFIL (MANTIDO) */}
          <div className="profile-container-veterinario">
            <img
              ref={profilePicRef}
              src={veterinariaLauraimg}
              alt="Perfil"
              className="profile-pic-veterinario"
              id="profile-pic-btn-veterinario"
              onClick={toggleDropdown}
            />
            <div 
              ref={dropdownRef}
              className={`profile-dropdown-veterinario ${isDropdownOpen ? 'show' : ''}`}
              id="profile-dropdown-veterinario"
            >
              <Link to="/configuracaoVeterinario" className="dropdown-item-veterinario" onClick={() => setIsDropdownOpen(false)}>Configurações</Link>
              <Link to="/artigosVeterinario" className="dropdown-item-veterinario" onClick={() => setIsDropdownOpen(false)}>Artigos</Link>
              <Link 
                to="/" 
                className="dropdown-item-veterinario" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(false);
                  logout(); 
                  navigate('/');
                }}
              >
                Sair
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderVeterinario;

