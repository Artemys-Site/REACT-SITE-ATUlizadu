import { Link, useNavigate, useLocation } from 'react-router-dom';
import './PagamentoAprovado.css';

const PagamentoAprovado = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pagamentoData = location.state || {};

  // Dados do pagamento (em produção, veream da API)
  const valorPago = pagamentoData.preco || 1230.00;
  const data = new Date().toLocaleDateString('pt-BR');
  const metodo = pagamentoData.metodo || 'PIX';

  const handleVerAgendamento = () => {
    navigate('/agendamento-tutor');
  };

  return (
    <>
      <section className="pagamento-aprovado-page">
        <div className="pagamento-aprovado-container">
          <Link to="/agendamento-tutor" className="btn-voltar-aprovado">
            <i className="bi bi-arrow-left"></i>
            VOLTAR
          </Link>

          <div className="aprovado-content-card">
            <div className="aprovado-icon-wrapper">
              <div className="aprovado-icon-circle">
                <i className="bi bi-check-lg"></i>
              </div>
            </div>

            <h1 className="aprovado-titulo">PAGAMENTO CONFIRMADO!</h1>
            <p className="aprovado-subtitulo">
              SEU PAGAMENTO FOI PROCESSADO COM SUCESSO
            </p>

            <div className="aprovado-detalhes-box">
              <div className="detalhe-item">
                <div className="detalhe-label">
                  <i className="bi bi-currency-dollar"></i>
                  <span>VALOR PAGO:</span>
                </div>
                <strong className="detalhe-valor">R$ {valorPago.toFixed(2).replace('.', ',')}</strong>
              </div>
              <div className="detalhe-item">
                <div className="detalhe-label">
                  <i className="bi bi-calendar-check"></i>
                  <span>DATA:</span>
                </div>
                <strong className="detalhe-valor">{data}</strong>
              </div>
              <div className="detalhe-item">
                <div className="detalhe-label">
                  {metodo === 'PIX' ? (
                    <i className="bi bi-qr-code"></i>
                  ) : (
                    <i className="bi bi-credit-card-2-front-fill"></i>
                  )}
                  <span>MÉTODO:</span>
                </div>
                <strong className="detalhe-valor">{metodo}</strong>
              </div>
            </div>

            <div className="aprovado-info-text">
              <i className="bi bi-envelope-check"></i>
              <p>
                UM COMPROVANTE FOI ENVIADO PARA O SEU E-MAIL. VOCÊ PODE ACOMPANHAR SEU AGENDAMENTO NO PAINEL.
              </p>
            </div>

            <button className="btn-ver-agendamento" onClick={handleVerAgendamento}>
              <i className="bi bi-calendar-event"></i>
              VER AGENDAMENTO
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PagamentoAprovado;

