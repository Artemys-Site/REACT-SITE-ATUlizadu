import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './PagamentoPix.css';

const PagamentoPix = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const planoData = location.state || { plano: null, preco: null };
  
  const [copiado, setCopiado] = useState(false);
  
  // Código PIX de exemplo (em produção, viria da API)
  const pixCode = "00020126580014br.gov.bcb.pix0136artemys@email.com52040000530398654041230.005802BR5925Artemys Clinica Veterina6009SAO PAUL062070503***6304";
  
  // Usar o preço do state ou valor padrão
  const valor = planoData.preco !== null && planoData.preco !== undefined ? planoData.preco : 230.00;

  const handleCopiarCodigo = () => {
    navigator.clipboard.writeText(pixCode);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  const handleCancelar = () => {
    navigate('/pagamento-recusado', {
      state: {
        plano: planoData.plano,
        preco: valor,
        motivo: 'PAGAMENTO CANCELADO PELO USUÁRIO'
      }
    });
  };

  const handleConfirmarPagamento = () => {
    // Simular processamento do pagamento
    // Em produção, isso seria uma chamada à API
    const pagamentoSucesso = true; // Simular sucesso (pode ser aleatório ou baseado em lógica real)
    
    if (pagamentoSucesso) {
      navigate('/pagamento-aprovado', {
        state: {
          plano: planoData.plano,
          preco: valor,
          metodo: 'PIX',
          formData: planoData.formData
        }
      });
    } else {
      navigate('/pagamento-recusado', {
        state: {
          plano: planoData.plano,
          preco: valor,
          motivo: 'FALHA NA COMUNICAÇÃO COM O BANCO'
        }
      });
    }
  };

  return (
    <>
      <section className="pagamento-pix-page">
        <div className="pagamento-pix-container">
          <Link to="/finalizar-pagamento" className="btn-voltar-pix">
            <i className="bi bi-arrow-left"></i>
            VOLTAR
          </Link>

          <div className="pix-content-card">
            <div className="pix-header">
              <div className="pix-icon-header">
                <i className="bi bi-qr-code"></i>
              </div>
              <h1 className="pix-titulo">PAGUE COM PIX</h1>
              <p className="pix-subtitulo">Pagamento instantâneo e seguro</p>
            </div>

            <div className="pix-qr-section">
              <div className="qr-code-wrapper">
                <div className="qr-code-container">
                  <svg className="qr-code-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    {/* QR Code estilizado - padrão de exemplo */}
                    <rect x="0" y="0" width="200" height="200" fill="#FFFFFF" />
                    {/* Canto superior esquerdo */}
                    <rect x="10" y="10" width="50" height="50" fill="#7A2FF5" />
                    <rect x="20" y="20" width="30" height="30" fill="#FFFFFF" />
                    <rect x="30" y="30" width="10" height="10" fill="#7A2FF5" />
                    {/* Canto superior direito */}
                    <rect x="140" y="10" width="50" height="50" fill="#7A2FF5" />
                    <rect x="150" y="20" width="30" height="30" fill="#FFFFFF" />
                    <rect x="160" y="30" width="10" height="10" fill="#7A2FF5" />
                    {/* Canto inferior esquerdo */}
                    <rect x="10" y="140" width="50" height="50" fill="#7A2FF5" />
                    <rect x="20" y="150" width="30" height="30" fill="#FFFFFF" />
                    <rect x="30" y="160" width="10" height="10" fill="#7A2FF5" />
                    {/* Padrões internos */}
                    <rect x="70" y="20" width="10" height="10" fill="#7A2FF5" />
                    <rect x="90" y="20" width="10" height="10" fill="#7A2FF5" />
                    <rect x="110" y="20" width="10" height="10" fill="#7A2FF5" />
                    <rect x="20" y="70" width="10" height="10" fill="#7A2FF5" />
                    <rect x="40" y="70" width="10" height="10" fill="#7A2FF5" />
                    <rect x="70" y="70" width="10" height="10" fill="#7A2FF5" />
                    <rect x="90" y="70" width="10" height="10" fill="#7A2FF5" />
                    <rect x="110" y="70" width="10" height="10" fill="#7A2FF5" />
                    <rect x="130" y="70" width="10" height="10" fill="#7A2FF5" />
                    <rect x="150" y="70" width="10" height="10" fill="#7A2FF5" />
                    <rect x="170" y="70" width="10" height="10" fill="#7A2FF5" />
                    <rect x="70" y="90" width="10" height="10" fill="#7A2FF5" />
                    <rect x="110" y="90" width="10" height="10" fill="#7A2FF5" />
                    <rect x="130" y="90" width="10" height="10" fill="#7A2FF5" />
                    <rect x="150" y="90" width="10" height="10" fill="#7A2FF5" />
                    <rect x="170" y="90" width="10" height="10" fill="#7A2FF5" />
                    <rect x="20" y="110" width="10" height="10" fill="#7A2FF5" />
                    <rect x="40" y="110" width="10" height="10" fill="#7A2FF5" />
                    <rect x="70" y="110" width="10" height="10" fill="#7A2FF5" />
                    <rect x="90" y="110" width="10" height="10" fill="#7A2FF5" />
                    <rect x="110" y="110" width="10" height="10" fill="#7A2FF5" />
                    <rect x="130" y="110" width="10" height="10" fill="#7A2FF5" />
                    <rect x="150" y="110" width="10" height="10" fill="#7A2FF5" />
                    <rect x="170" y="110" width="10" height="10" fill="#7A2FF5" />
                    <rect x="70" y="130" width="10" height="10" fill="#7A2FF5" />
                    <rect x="90" y="130" width="10" height="10" fill="#7A2FF5" />
                    <rect x="110" y="130" width="10" height="10" fill="#7A2FF5" />
                    <rect x="130" y="130" width="10" height="10" fill="#7A2FF5" />
                    <rect x="150" y="130" width="10" height="10" fill="#7A2FF5" />
                    <rect x="20" y="150" width="10" height="10" fill="#7A2FF5" />
                    <rect x="40" y="150" width="10" height="10" fill="#7A2FF5" />
                    <rect x="70" y="150" width="10" height="10" fill="#7A2FF5" />
                    <rect x="90" y="150" width="10" height="10" fill="#7A2FF5" />
                    <rect x="110" y="150" width="10" height="10" fill="#7A2FF5" />
                    <rect x="130" y="150" width="10" height="10" fill="#7A2FF5" />
                    <rect x="150" y="150" width="10" height="10" fill="#7A2FF5" />
                    <rect x="170" y="150" width="10" height="10" fill="#7A2FF5" />
                    <rect x="70" y="170" width="10" height="10" fill="#7A2FF5" />
                    <rect x="90" y="170" width="10" height="10" fill="#7A2FF5" />
                    <rect x="110" y="170" width="10" height="10" fill="#7A2FF5" />
                    <rect x="130" y="170" width="10" height="10" fill="#7A2FF5" />
                    <rect x="150" y="170" width="10" height="10" fill="#7A2FF5" />
                    <rect x="170" y="170" width="10" height="10" fill="#7A2FF5" />
                  </svg>
                </div>
                <div className="qr-code-overlay">
                  <i className="bi bi-shield-check-fill"></i>
                  <span>Pagamento Seguro</span>
                </div>
              </div>

              <p className="pix-instrucoes">
                <i className="bi bi-camera-fill"></i>
                ESCANEIE O QR CODE COM O APP DO SEU BANCO
              </p>
            </div>

            <div className="pix-code-section">
              <div className="pix-code-header">
                <i className="bi bi-qr-code-scan"></i>
                <span>CÓDIGO PIX</span>
              </div>
              <div className="pix-code-box">
                <code className="pix-code-text">{pixCode}</code>
              </div>
              <button 
                className={`btn-copiar-pix ${copiado ? 'copiado' : ''}`}
                onClick={handleCopiarCodigo}
              >
                {copiado ? (
                  <>
                    <i className="bi bi-check-circle-fill"></i>
                    CÓDIGO COPIADO!
                  </>
                ) : (
                  <>
                    <i className="bi bi-clipboard-fill"></i>
                    COPIAR CÓDIGO PIX
                  </>
                )}
              </button>
            </div>

            <div className="pix-info-section">
              <div className="pix-info-item">
                <i className="bi bi-lightning-charge-fill"></i>
                <div>
                  <strong>Aprovação Instantânea</strong>
                  <p>Seu pagamento é confirmado em segundos</p>
                </div>
              </div>
              <div className="pix-info-item">
                <i className="bi bi-lock-fill"></i>
                <div>
                  <strong>100% Seguro</strong>
                  <p>Transações protegidas e criptografadas</p>
                </div>
              </div>
              <div className="pix-info-item">
                <i className="bi bi-clock-fill"></i>
                <div>
                  <strong>Válido por 30 minutos</strong>
                  <p>Após esse período, gere um novo código</p>
                </div>
              </div>
            </div>

            <div className="pix-valor-section">
              <div className="pix-valor-item">
                <i className="bi bi-currency-dollar"></i>
                <span>VALOR:</span>
                <strong>R$ {valor.toFixed(2).replace('.', ',')}</strong>
              </div>
            </div>

            <div className="pix-actions">
              <button className="btn-confirmar-pix" onClick={handleConfirmarPagamento}>
                <i className="bi bi-check-circle-fill"></i>
                CONFIRMAR PAGAMENTO
              </button>
              <button className="btn-cancelar-pix" onClick={handleCancelar}>
                <i className="bi bi-x-circle-fill"></i>
                CANCELAR PAGAMENTO
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PagamentoPix;

