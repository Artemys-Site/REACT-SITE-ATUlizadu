import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAccountTypeSelect = (type) => {
    setAccountType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!accountType) {
      alert('Por favor, selecione um tipo de conta');
      return;
    }
    
    // TODO: Integração com backend será implementada
    // Por enquanto, apenas simula login
    const mockUser = {
      id: 1,
      email: email,
      accountType: accountType
    };
    
    login(mockUser);
    
    // Redirecionar baseado no tipo de conta
    if (accountType === 'clinica') {
      navigate('/painel-clinica');
    } else if (accountType === 'ambulancia') {
      navigate('/painel-ambulancia');
    } else if (accountType === 'veterinario') {
      navigate('/painel-veterinario');
    } else {
      navigate('/painel-tutor');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-page-title">FAÇA SEU LOGIN</h1>
      
      <div className="login-card">
        <main className="login-content">
          <div className="account-type-section">
            <h2>TIPO DE CONTA</h2>
            <div className="account-options">
              <div 
                className={`account-option ${accountType === 'tutor' ? 'selected' : ''}`}
                onClick={() => handleAccountTypeSelect('tutor')}
              >
                <span className="option-bullet"></span>
                <span className="option-text">TUTOR</span>
              </div>
              <div 
                className={`account-option ${accountType === 'clinica' ? 'selected' : ''}`}
                onClick={() => handleAccountTypeSelect('clinica')}
              >
                <span className="option-bullet"></span>
                <span className="option-text">CLÍNICA</span>
              </div>
              <div 
                className={`account-option ${accountType === 'veterinario' ? 'selected' : ''}`}
                onClick={() => handleAccountTypeSelect('veterinario')}
              >
                <span className="option-bullet"></span>
                <span className="option-text">VETERINÁRIO</span>
              </div>
              <div 
                className={`account-option ${accountType === 'ambulancia' ? 'selected' : ''}`}
                onClick={() => handleAccountTypeSelect('ambulancia')}
              >
                <span className="option-bullet"></span>
                <span className="option-text">AMBULÂNCIA</span>
              </div>
            </div>
          </div>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">SENHA</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                required 
              />
            </div>
            
            <div className="forgot-password-section">
              <a href="/recuperar-senha" className="forgot-link">ESQUECEU A SENHA?</a>
            </div>
            
            <button type="submit" className="login-button">ENTRAR</button>
          </form>
          
          <div className="register-section">
            <p>NÃO TEM UMA CONTA? <a href="/cadastro" className="register-link">CADASTRE-SE AQUI</a></p>
            <p className="clinica-register-link">
              <a href="/cadastro-clinica" className="register-link">CADASTRO DE CLÍNICA</a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;

