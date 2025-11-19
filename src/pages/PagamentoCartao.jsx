import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './PagamentoCartao.css';

const PagamentoCartao = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pagamentoData = location.state || {};
  
  const [processando, setProcessando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  
  // Dados do pagamento
  const valor = pagamentoData.preco || 230.00;
  const metodo = pagamentoData.metodo || 'CARTÃO DE CRÉDITO';
  const formData = pagamentoData.formData || {};

  useEffect(() => {
    if (processando) {
      const interval = setInterval(() => {
        setProgresso(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [processando]);

  const handleProcessarPagamento = () => {
    setProcessando(true);
    setProgresso(0);

    // Simular processamento do pagamento
    setTimeout(() => {
      const pagamentoSucesso = true; // Em produção, viria da API
      
      if (pagamentoSucesso) {
        navigate('/pagamento-aprovado', {
          state: {
            plano: pagamentoData.plano,
            preco: valor,
            metodo: metodo,
            formData: formData
          }
        });
      } else {
        navigate('/pagamento-recusado', {
          state: {
            plano: pagamentoData.plano,
            preco: valor,
            motivo: 'FALHA NA COMUNICAÇÃO COM O BANCO'
          }
        });
      }
    }, 3000);
  };

  const handleCancelar = () => {
    navigate('/pagamento-recusado', {
      state: {
        plano: pagamentoData.plano,
        preco: valor,
        motivo: 'PAGAMENTO CANCELADO PELO USUÁRIO'
      }
    });
  };

  // Mascarar número do cartão
  const mascararCartao = (numero) => {
    if (!numero) return '**** **** **** ****';
    const limpo = numero.replace(/\s/g, '');
    const ultimos4 = limpo.slice(-4);
    return `**** **** **** ${ultimos4}`;
  };

  return (
    <>
      <section className="pagamento-cartao-page">
        <div className="pagamento-cartao-container">
          <Link to="/finalizar-pagamento" className="btn-voltar-cartao">
            <i className="bi bi-arrow-left"></i>
            VOLTAR
          </Link>

          <div className="cartao-content-card">
            <div className="cartao-header">
              <div className="cartao-icon-header">
                <i className="bi bi-credit-card-2-front-fill"></i>
              </div>
              <h1 className="cartao-titulo">PAGAMENTO COM CARTÃO</h1>
              <p className="cartao-subtitulo">Processamento seguro e rápido</p>
            </div>

            {!processando ? (
              <>
                <div className="cartao-dados-section">
                  <div className="cartao-dados-header">
                    <i className="bi bi-shield-lock-fill"></i>
                    <span>DADOS DO CARTÃO</span>
                  </div>
                  
                  <div className="cartao-visual">
                    <div className="cartao-chip">
                      <i className="bi bi-cpu-fill"></i>
                    </div>
                    <div className="cartao-numero">
                      {mascararCartao(formData.numeroCartao)}
                    </div>
                    <div className="cartao-info-row">
                      <div className="cartao-nome">
                        <span className="cartao-label">TITULAR</span>
                        <span className="cartao-value">{formData.nomeTitular || 'NOME DO TITULAR'}</span>
                      </div>
                      <div className="cartao-validade">
                        <span className="cartao-label">VÁLIDO ATÉ</span>
                        <span className="cartao-value">{formData.validade || 'MM/AA'}</span>
                      </div>
                    </div>
                    <div className="cartao-bandeira">
                      {formData.numeroCartao && formData.numeroCartao.replace(/\s/g, '').startsWith('4') && (
                        <i className="bi bi-credit-card-2-front-fill" title="Visa"></i>
                      )}
                      {formData.numeroCartao && formData.numeroCartao.replace(/\s/g, '').startsWith('5') && (
                        <i className="bi bi-credit-card-2-front-fill" title="Mastercard"></i>
                      )}
                      {formData.numeroCartao && !formData.numeroCartao.replace(/\s/g, '').startsWith('4') && !formData.numeroCartao.replace(/\s/g, '').startsWith('5') && formData.numeroCartao.length > 0 && (
                        <i className="bi bi-credit-card-2-front-fill" title="Cartão"></i>
                      )}
                    </div>
                  </div>
                </div>

                <div className="cartao-valor-section">
                  <div className="cartao-valor-item">
                    <i className="bi bi-currency-dollar"></i>
                    <span>VALOR:</span>
                    <strong>R$ {valor.toFixed(2).replace('.', ',')}</strong>
                  </div>
                </div>

                <div className="cartao-info-section">
                  <div className="cartao-info-item">
                    <i className="bi bi-lock-fill"></i>
                    <div>
                      <strong>Pagamento Seguro</strong>
                      <p>Seus dados são criptografados e protegidos</p>
                    </div>
                  </div>
                  <div className="cartao-info-item">
                    <i className="bi bi-shield-check-fill"></i>
                    <div>
                      <strong>Proteção SSL</strong>
                      <p>Conexão segura com certificado digital</p>
                    </div>
                  </div>
                  <div className="cartao-info-item">
                    <i className="bi bi-clock-history"></i>
                    <div>
                      <strong>Processamento Rápido</strong>
                      <p>Aprovação em até 30 segundos</p>
                    </div>
                  </div>
                </div>

                <div className="cartao-actions">
                  <button className="btn-processar-cartao" onClick={handleProcessarPagamento}>
                    <i className="bi bi-check-circle-fill"></i>
                    PROCESSAR PAGAMENTO
                  </button>
                  <button className="btn-cancelar-cartao" onClick={handleCancelar}>
                    <i className="bi bi-x-circle-fill"></i>
                    CANCELAR
                  </button>
                </div>
              </>
            ) : (
              <div className="cartao-processando">
                <div className="processando-icon">
                  <i className="bi bi-arrow-repeat"></i>
                </div>
                <h2 className="processando-titulo">PROCESSANDO PAGAMENTO...</h2>
                <p className="processando-subtitulo">Aguarde enquanto processamos sua transação</p>
                
                <div className="progresso-bar-container">
                  <div className="progresso-bar">
                    <div 
                      className="progresso-fill" 
                      style={{ width: `${progresso}%` }}
                    ></div>
                  </div>
                  <span className="progresso-texto">{progresso}%</span>
                </div>

                <div className="processando-info">
                  <i className="bi bi-info-circle-fill"></i>
                  <p>Não feche esta página durante o processamento</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PagamentoCartao;

