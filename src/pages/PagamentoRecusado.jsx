import { Link, useNavigate, useLocation } from 'react-router-dom';
import './PagamentoRecusado.css';

const PagamentoRecusado = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pagamentoData = location.state || {};

  const handleTentarNovamente = () => {
    navigate('/finalizar-pagamento', {
      state: pagamentoData
    });
  };

  return (
    <>
      <section className="pagamento-recusado-page">
        <div className="pagamento-recusado-container">
          <Link to="/finalizar-pagamento" className="btn-voltar-recusado">
            <i className="bi bi-arrow-left"></i>
            VOLTAR
          </Link>

          <div className="recusado-content-card">
            <div className="recusado-icon-wrapper">
              <div className="recusado-icon-circle">
                <i className="bi bi-x-lg"></i>
              </div>
            </div>

            <h1 className="recusado-titulo">PAGAMENTO NÃO CONCLUÍDO</h1>
            <p className="recusado-subtitulo">
              NÃO FOI POSSÍVEL PROCESSAR SEU PAGAMENTO
            </p>

            <div className="recusado-motivos-box">
              <div className="motivos-header">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <strong>POSSÍVEIS MOTIVOS:</strong>
              </div>
              <ul className="motivos-lista">
                <li>
                  <i className="bi bi-clock-fill"></i>
                  <span>TEMPO DE PAGAMENTO EXPIRADO</span>
                </li>
                <li>
                  <i className="bi bi-wallet2"></i>
                  <span>SALDO INSUFICIENTE NA CONTA</span>
                </li>
                <li>
                  <i className="bi bi-wifi-off"></i>
                  <span>FALHA NA COMUNICAÇÃO COM O BANCO</span>
                </li>
                <li>
                  <i className="bi bi-x-circle-fill"></i>
                  <span>PAGAMENTO CANCELADO PELO USUÁRIO</span>
                </li>
              </ul>
            </div>

            <div className="recusado-info-box">
              <i className="bi bi-info-circle-fill"></i>
              <p>
                NENHUM VALOR FOI DEBITADO DA SUA CONTA. VOCÊ PODE TENTAR NOVAMENTE OU ESCOLHER OUTRO MÉTODO DE PAGAMENTO.
              </p>
            </div>

            <button className="btn-tentar-novamente" onClick={handleTentarNovamente}>
              <i className="bi bi-arrow-clockwise"></i>
              TENTAR NOVAMENTE
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PagamentoRecusado;

