import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    
    setIsLoading(true);
    
    try {
      const requestBody = {
        email: email.trim(),
        password: password,
        accountType: accountType
      };
      
      console.log('🔐 Iniciando login...', { 
        email: requestBody.email, 
        accountType: requestBody.accountType,
        hasPassword: !!requestBody.password
      });
      
      // Tentar primeiro com o proxy (/api), se falhar, tentar com URL completa
      let response;
      let loginUrl = '/api/auth/login';
      
      try {
        response = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
        
        // Se receber 401 e estiver usando proxy, tentar com URL completa
        if (response.status === 401 && loginUrl.startsWith('/api')) {
          console.log('⚠️ Proxy retornou 401, tentando com URL completa...');
          loginUrl = `${API_BASE_URL}/api/auth/login`;
          response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });
        }
      } catch (fetchError) {
        // Se o proxy falhar completamente, tentar com URL completa
        console.log('⚠️ Erro no proxy, tentando com URL completa...', fetchError);
        loginUrl = `${API_BASE_URL}/api/auth/login`;
        response = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
      }

      console.log('📡 Resposta recebida:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      // Verificar se a resposta é JSON antes de tentar fazer parse
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      if (!response.ok) {
        let errorMessage = `Erro no login (${response.status})`;
        let errorDetails = null;
        
        try {
          if (isJson) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorData.title || errorMessage;
            errorDetails = errorData;
            console.error('❌ Erro do servidor (JSON):', errorData);
          } else {
            // Se não for JSON, ler como texto
            const errorText = await response.text();
            console.error('❌ Erro do servidor (não-JSON):', errorText);
            
            // Tentar extrair mensagem de erro útil
            if (errorText && errorText.trim().length > 0) {
              if (errorText.includes('Erro') || errorText.includes('erro') || errorText.includes('Error')) {
                errorMessage = errorText.substring(0, 200); // Limitar tamanho
              } else {
                errorMessage = errorText.substring(0, 200);
              }
            } else {
              // Mensagens específicas por status code
              if (response.status === 401) {
                errorMessage = 'Email ou senha incorretos. Verifique suas credenciais e tente novamente.';
              } else if (response.status === 404) {
                errorMessage = 'Endpoint não encontrado. Verifique a configuração da API.';
              } else if (response.status === 500) {
                errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
              } else {
                errorMessage = `Erro no servidor (${response.status}). Tente novamente.`;
              }
            }
          }
        } catch (parseError) {
          console.error('❌ Erro ao processar resposta de erro:', parseError);
          if (response.status === 401) {
            errorMessage = 'Email ou senha incorretos. Verifique suas credenciais e tente novamente.';
          } else {
            errorMessage = `Erro no servidor (${response.status}). Tente novamente.`;
          }
        }
        
        console.error('❌ Detalhes completos do erro:', {
          status: response.status,
          statusText: response.statusText,
          url: loginUrl,
          errorMessage,
          errorDetails
        });
        
        throw new Error(errorMessage);
      }

      // Verificar se a resposta de sucesso é JSON
      if (!isJson) {
        const textResponse = await response.text();
        console.error('⚠️ Resposta de sucesso não é JSON:', textResponse);
        throw new Error('Resposta inválida do servidor. Tente novamente.');
      }

      const data = await response.json();
      console.log('✅ Login bem-sucedido:', { success: data.success, hasToken: !!data.token });
      
      if (data.success) {
        // Limpar dados do usuário anterior antes de salvar os novos
        localStorage.removeItem('userFoto');
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Salvar userId para o Header poder verificar
        const userId = data.user.idTutor || data.user.id;
        if (userId) {
          localStorage.setItem('userId', userId.toString());
        }
        
        // Processar e salvar foto se existir na resposta
        let fotoParaSalvar = null;
        if (data.user.foto || data.user.fotoTutor || data.user.fotoClinica || data.user.fotoVeterinario || data.user.fotoAmbulancia) {
          fotoParaSalvar = data.user.foto || data.user.fotoTutor || data.user.fotoClinica || data.user.fotoVeterinario || data.user.fotoAmbulancia;
          
          // Se a foto é base64 puro, adicionar prefixo
          if (fotoParaSalvar && !fotoParaSalvar.startsWith('data:') && !fotoParaSalvar.startsWith('http')) {
            const base64String = fotoParaSalvar.replace(/\s/g, '');
            const base64Regex = /^[A-Za-z0-9+/=]+$/;
            // Aceitar qualquer base64 válido, não apenas os maiores que 500 caracteres
            if (base64String.length > 0 && base64Regex.test(base64String)) {
              fotoParaSalvar = `data:image/jpeg;base64,${base64String}`;
            } else {
              // Se não for base64 válido, pode ser um caminho ou outro formato
              console.warn('Foto não é base64 válido, tentando usar como está:', fotoParaSalvar.substring(0, 50));
              // Tentar usar como está se parecer ser uma URL ou caminho
              if (fotoParaSalvar.startsWith('/') || fotoParaSalvar.startsWith('http')) {
                // Manter como está se for URL ou caminho
              } else {
                // Tentar adicionar prefixo mesmo assim
                fotoParaSalvar = `data:image/jpeg;base64,${base64String}`;
              }
            }
          }
          
          if (fotoParaSalvar) {
            localStorage.setItem('userFoto', fotoParaSalvar);
            // Incluir a foto no objeto user para o contexto
            data.user.foto = fotoParaSalvar;
            console.log('✅ Foto processada e salva no localStorage');
          }
        } else {
          console.log('⚠️ Nenhuma foto encontrada na resposta do login');
        }
        
        // Incluir a foto do localStorage no objeto user se não veio na resposta
        if (!fotoParaSalvar) {
          const fotoFromStorage = localStorage.getItem('userFoto');
          if (fotoFromStorage) {
            data.user.foto = fotoFromStorage;
          }
        }
        
        login(data.user);
        
        // Disparar evento para o Header atualizar a foto
        // Usar um pequeno delay para garantir que o localStorage foi atualizado
        setTimeout(() => {
          const fotoSalva = localStorage.getItem('userFoto');
          window.dispatchEvent(new CustomEvent('userLogin', { 
            detail: { userId: userId, foto: fotoSalva } 
          }));
        }, 50);
        
        switch (data.user.accountType) {
          case 'clinica':
            navigate('/painel-clinica');
            break;
          case 'ambulancia':
            navigate('/rastreamento-ambulancia');
            break;
          case 'veterinario':
            navigate('/painel-veterinario');
            break;
          case 'tutor':
          default:
            navigate('/');
            break;
        }
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert(error.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            
            <div className="forgot-password-section">
              <a href="/recuperar-senha" className="forgot-link">ESQUECEU A SENHA?</a>
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'ENTRANDO...' : 'ENTRAR'}
            </button>
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

