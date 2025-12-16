import { useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';
import './Notification.css';
import check from '../assets/check.png';
import X from '../assets/X.png';
import iconeAlerta from '../assets/iconeAlerta.png';

const Notification = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification-toast notification-${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          <div className="notification-icon">
            {notification.type === 'success' && <img src={check} alt="Sucesso" />}
            {notification.type === 'error' && <img src={X} alt="Erro" />}
            {notification.type === 'warning' && <img src={iconeAlerta} alt="Aviso" />}
            {notification.type === 'info' && <i className="bi bi-info-circle"></i>}
          </div>
          <div className="notification-content">
            <p className="notification-message">{notification.message}</p>
          </div>
          <button
            className="notification-close"
            onClick={(e) => {
              e.stopPropagation();
              removeNotification(notification.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;


