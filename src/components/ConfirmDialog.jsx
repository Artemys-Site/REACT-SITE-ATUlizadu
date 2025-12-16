import { useNotification } from '../context/NotificationContext';
import './ConfirmDialog.css';

const ConfirmDialog = () => {
  const { confirmDialog } = useNotification();

  if (!confirmDialog) return null;

  return (
    <div className="confirm-dialog-overlay" onClick={confirmDialog.onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-dialog-header">
          <h3>Confirmar Ação</h3>
        </div>
        <div className="confirm-dialog-body">
          <p>{confirmDialog.message}</p>
        </div>
        <div className="confirm-dialog-footer">
          <button
            className="confirm-btn-cancel"
            onClick={confirmDialog.onCancel}
          >
            Cancelar
          </button>
          <button
            className="confirm-btn-confirm"
            onClick={confirmDialog.onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;


