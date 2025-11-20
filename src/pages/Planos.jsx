import { Link, useNavigate } from 'react-router-dom';
import './Planos.css';
import imagemPlanos from '../assets/imagemPlanos.png';
import check from '../assets/check.png';
import X from '../assets/X.png';

const Planos = () => {
  const navigate = useNavigate();

  const handleAssinarPlano = (planoNome, preco) => {
    // Redirecionar para página de finalização de pagamento
    // Você pode passar os dados do plano via state ou localStorage
    navigate('/finalizar-pagamento', {
      state: {
        plano: planoNome,
        preco: preco
      }
    });
  };

  return (
    <>
      <section className="planos-hero">
        <div className="planos-hero-container">
          <div className="planos-hero-content">
            <h1 className="planos-titulo-principal">PLANOS DE ASSINATURA</h1>
            <p className="planos-subtitulo">Escolha o plano ideal para cuidar do seu pet</p>
          </div>
          <div className="planos-hero-imagem">
            <img src={imagemPlanos} alt="Ilustração de planos" />
          </div>
        </div>
      </section>

      <section className="secao-planos">
        <div className="planos-container">
          <div className="card-plano card-plano--orange">
            <div className="card-plano-header">
              <h3>Primeiro Cuidado</h3>
              <div className="preco">
                <span className="preco-valor">Grátis</span>
                <span className="preco-mes">/Mês</span>
              </div>
            </div>
            <div className="card-plano-body">
              <ul className="lista-beneficios">
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Acesso ao mapa de clínicas e hospitais veterinários 24h</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Artigos e dicas básicas de cuidados e prevenção para pets</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Checklist digital de primeiros socorros</p>
                </li>
                <li className="beneficio-inativo">
                  <img className="simbolosBeneficios" src={X} alt="X" />
                  <p>Acesso a nossa IA</p>
                </li>
                <li className="beneficio-inativo">
                  <img className="simbolosBeneficios" src={X} alt="X" />
                  <p>Consultas online com veterinários</p>
                </li>
              </ul>
              <button 
                className="btn-assinar btn-assinar--orange"
                onClick={() => handleAssinarPlano('Primeiro Cuidado', 0)}
              >
                Assinar Plano
              </button>
            </div>
          </div>

          <div className="card-plano card-plano--purple card-plano--popular">
            <div className="popular-tag">POPULAR</div>
            <div className="card-plano-header">
              <h3>Cuidado Completo</h3>
              <div className="preco">
                <span className="preco-valor">R$ 100,00</span>
                <span className="preco-mes">/Mês</span>
              </div>
            </div>
            <div className="card-plano-body">
              <ul className="lista-beneficios">
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Acesso ao mapa de clínicas e hospitais veterinários 24h</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Artigos e dicas básicas de cuidados e prevenção para pets</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Checklist digital de primeiros socorros</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Acesso a nossa IA</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Consultas online com veterinários</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Descontos nos serviços de ambulância</p>
                </li>
              </ul>
              <button 
                className="btn-assinar btn-assinar--purple"
                onClick={() => handleAssinarPlano('Cuidado Completo', 100.00)}
              >
                Assinar Plano
              </button>
            </div>
          </div>

          <div className="card-plano card-plano--orange">
            <div className="card-plano-header">
              <h3>Cuidado Master</h3>
              <div className="preco">
                <span className="preco-valor">R$ 200,00</span>
                <span className="preco-mes">/Mês</span>
              </div>
            </div>
            <div className="card-plano-body">
              <ul className="lista-beneficios">
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Acesso ao mapa de clínicas e hospitais veterinários 24h</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Artigos e Dicas Premium de Cuidados e Prevenção</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Checklist digital de primeiros socorros</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Acesso a nossa IA</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Consultas online com veterinários</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Acesso a serviço de ambulância</p>
                </li>
              </ul>
              <button 
                className="btn-assinar btn-assinar--orange"
                onClick={() => handleAssinarPlano('Cuidado Master', 200.00)}
              >
                Assinar Plano
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Planos;

