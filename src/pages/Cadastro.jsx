import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const [accountType, setAccountType] = useState('');
  const navigate = useNavigate();

  const handleAccountTypeSelect = (type) => {
    setAccountType(type);
  };

  const handleConfirm = () => {
    if (accountType) {
      if (accountType === 'tutor') {
        navigate('/cadastro-tutor');
      } else if (accountType === 'clinica') {
        navigate('/cadastro-clinica');
      } else {
        navigate(`/cadastro/${accountType}`);
      }
    } else {
      alert('Por favor, selecione um tipo de conta');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-page-title">FAÇA SEU CADASTRO</h1>
      
      <div className="login-card">
        <main className="login-content">
          <section className="account-type-section">
            <h2>TIPO DE CONTA</h2>
            <div className="account-options">
              <div 
                className={`account-option ${accountType === 'tutor' ? 'selected' : ''}`}
                onClick={() => handleAccountTypeSelect('tutor')}
                data-value="tutor"
              >
                <span className="option-bullet"></span>
                <span className="option-text">TUTOR</span>
              </div>
              <div 
                className={`account-option ${accountType === 'clinica' ? 'selected' : ''}`}
                onClick={() => handleAccountTypeSelect('clinica')}
                data-value="clinica"
              >
                <span className="option-bullet"></span>
                <span className="option-text">CLÍNICA</span>
              </div>
              <div 
                className={`account-option ${accountType === 'veterinario' ? 'selected' : ''}`}
                onClick={() => handleAccountTypeSelect('veterinario')}
                data-value="veterinario"
              >
                <span className="option-bullet"></span>
                <span className="option-text">VETERINÁRIO</span>
              </div>
              <div 
                className={`account-option ${accountType === 'ambulancia' ? 'selected' : ''}`}
                onClick={() => handleAccountTypeSelect('ambulancia')}
                data-value="ambulancia"
              >
                <span className="option-bullet"></span>
                <span className="option-text">AMBULÂNCIA</span>
              </div>
            </div>
          </section>

          <button 
            type="button" 
            className="login-button" 
            onClick={handleConfirm}
            disabled={!accountType}
          >
            CONFIRMAR
          </button>

          <div className="register-section">
            <p>JÁ TEM UMA CONTA? <Link to="/login" className="register-link">LOGIN</Link></p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Cadastro;

