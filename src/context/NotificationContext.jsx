import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const showNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration
    };

    setNotifications(prev => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  });

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  });

  const showConfirm = useCallback((message, onConfirm, onCancel) => {
    setConfirmDialog({
      message,
      onConfirm: () => {
        setConfirmDialog(null);
        if (onConfirm) onConfirm();
      },
      onCancel: () => {
        setConfirmDialog(null);
        if (onCancel) onCancel();
      }
    });
  });

  // Funções de conveniência
  const showSuccess = useCallback((message, duration) => {
    return showNotification(message, 'success', duration);
  });

  const showError = useCallback((message, duration) => {
    return showNotification(message, 'error', duration);
  });

  const showWarning = useCallback((message, duration) => {
    return showNotification(message, 'warning', duration);
  });

  const showInfo = useCallback((message, duration) => {
    return showNotification(message, 'info', duration);
  });

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        confirmDialog,
        showNotification,
        removeNotification,
        showConfirm,
        showSuccess,
        showError,
        showWarning,
        showInfo
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

