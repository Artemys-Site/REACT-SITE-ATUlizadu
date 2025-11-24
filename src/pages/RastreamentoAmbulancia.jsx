import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RastreamentoAmbulancia.css';
import check from '../assets/check.png';
import imagemMaps from '../assets/imagemMaps.jpeg';
import iconeRelogio from '../assets/iconeRelogio.png';
import iconLocation from '../assets/iconLocation.png';
import iconeChamarambulancia from '../assets/iconeChamarambulancia.png';
import iconePerfilPreto from '../assets/iconePerfilPreto.png';
import drCarlos from '../assets/drCarlos.png';
import iconAvaliacao from '../assets/iconAvaliacao.png';
import iconTelefone from '../assets/iconTelefone.png';
import iconeEmail from '../assets/iconeEmail.png';
import drAnaPaula from '../assets/drAnaPaula.png';
import iconeAlerta from '../assets/iconeAlerta.png';

const RastreamentoAmbulancia = () => {
  const [tempoRestante, setTempoRestante] = useState(9);
  const [progresso, setProgresso] = useState(35);
  const [distanciaRestante, setDistanciaRestante] = useState(5.5);

  useEffect(() => {
    // Simulação de atualização em tempo real
    const interval = setInterval(() => {
      setTempoRestante(prev => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
      setProgresso(prev => {
        if (prev < 100) {
          return prev + 1;
        }
        return 100;
      });
      setDistanciaRestante(prev => {
        if (prev > 0) {
          return (prev - 0.1).toFixed(1);
        }
        return 0;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLigar = (numero) => {
    window.location.href = `tel:${numero}`;
  };

  const handleChat = (nome) => {
    alert(`Iniciando chat com ${nome}`);
  };

  const handleAbrirMaps = () => {
    const endereco = encodeURIComponent('Av. Salim Farah Maluf, 3400');
    window.open(`https://www.google.com/maps/search/?api=1&query=${endereco}`, '_blank');
  };

  return (
    <>
      <section className="rastreamento-banner">
        <div className="rastreamento-banner-content">
          <div className="status-wrapper">
            <div className="status-tag">
              <img src={check} alt="Check" className="check-icon" />
              <span>AMBULÂNCIA A CAMINHO</span>
            </div>
            <h1 className="tempo-chegada">CHEGADA EM {tempoRestante} MIN</h1>
            <p className="subtitulo-rastreamento">Acompanhe em tempo real a localização da ambulância</p>
          </div>
          <div className="progresso-wrapper">
            <div className="progresso-header">
              <span className="progresso-label">PROGRESSO DA VIAGEM</span>
              <span className="progresso-percentual">{progresso}%</span>
            </div>
            <div className="progresso-bar">
              <div className="progresso-fill" style={{ width: `${progresso}%` }}></div>
            </div>
            <div className="progresso-labels">
              <span>Saída</span>
              <span>Chegada</span>
            </div>
          </div>
        </div>
      </section>

      <section className="rastreamento-page">
        <div className="rastreamento-container">
          <div className="rastreamento-content">
            <div className="rastreamento-left-column">
              <div className="mapa-section">
                <div className="mapa-header">
                  <span className="tag-ao-vivo">Ao Vivo</span>
                </div>
                <div className="mapa-wrapper">
                  <img src={imagemMaps} alt="Mapa" className="mapa-rastreamento" />
                  <div className="mapa-overlay">
                    <div className="rota-info-box">
                      <div className="rota-item">
                        <img src={iconeRelogio} alt="Carro" className="rota-icon" />
                        <div>
                          <span className="rota-tempo">11 min</span>
                          <span className="rota-distancia">5,5 km</span>
                        </div>
                      </div>
                      <div className="rota-item">
                        <img src={iconeRelogio} alt="Bicicleta" className="rota-icon" />
                        <div>
                          <span className="rota-tempo">9 min</span>
                          <span className="rota-distancia">5,5 km</span>
                        </div>
                      </div>
                      <div className="rota-item">
                        <img src={iconeRelogio} alt="Carro" className="rota-icon" />
                        <div>
                          <span className="rota-tempo">10 min</span>
                          <span className="rota-distancia">4,6 km</span>
                        </div>
                      </div>
                    </div>
                    <div className="distancia-restante-box">
                      DISTÂNCIA RESTANTE {distanciaRestante} KM
                    </div>
                  </div>
                </div>
              </div>

              <div className="destino-card">
                <div className="destino-header">
                  <img src={iconLocation} alt="Localização" className="destino-icon" />
                  <div className="destino-info">
                    <h3 className="destino-titulo">DESTINO</h3>
                    <p className="destino-endereco">Av. Salim Farah Maluf, 3400</p>
                  </div>
                </div>
                <button className="btn-abrir-maps" onClick={handleAbrirMaps}>
                  <img src={iconeChamarambulancia} alt="Maps" className="maps-icon" />
                  Abrir no Maps
                </button>
              </div>

              <div className="timeline-card">
                <h3 className="timeline-titulo">LINHA DO TEMPO</h3>
                <div className="timeline">
                  <div className="timeline-item completed">
                    <div className="timeline-icon">
                      <img src={check} alt="Check" />
                    </div>
                    <div className="timeline-content">
                      <h4 className="timeline-titulo-item">CHAMADO CONFIRMADO</h4>
                      <p className="timeline-tempo">Há 2 minutos</p>
                    </div>
                  </div>
                  <div className="timeline-item completed">
                    <div className="timeline-icon">
                      <img src={check} alt="Check" />
                    </div>
                    <div className="timeline-content">
                      <h4 className="timeline-titulo-item">AMBULÂNCIA DESPACHADA</h4>
                      <p className="timeline-tempo">Há 1 minuto</p>
                    </div>
                  </div>
                  <div className="timeline-item active">
                    <div className="timeline-icon purple">
                      <img src={iconeRelogio} alt="Relógio" />
                    </div>
                    <div className="timeline-content">
                      <h4 className="timeline-titulo-item">A CAMINHO DA SUA LOCALIZAÇÃO</h4>
                      <p className="timeline-tempo">Agora • {tempoRestante} min restantes</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon grey">
                      <img src={iconLocation} alt="Localização" />
                    </div>
                    <div className="timeline-content">
                      <h4 className="timeline-titulo-item">CHEGADA NO DESTINO</h4>
                      <p className="timeline-tempo">Em breve</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rastreamento-right-column">
              <div className="ambulancia-info-card">
                <div className="ambulancia-header-card">
                  <img src={iconeChamarambulancia} alt="Ambulância" className="ambulancia-icon-card" />
                  <div>
                    <h3 className="ambulancia-placa">ABC-1234</h3>
                    <p className="ambulancia-modelo">Renault Master</p>
                  </div>
                </div>
                <div className="ambulancia-detalhes">
                  <div className="detalhe-item">
                    <span className="detalhe-label">Status</span>
                    <div className="status-indicator">
                      <span className="status-dot green"></span>
                      <span className="status-texto">Em movimento</span>
                    </div>
                  </div>
                  <div className="detalhe-item">
                    <span className="detalhe-label">Velocidade</span>
                    <span className="detalhe-valor">60 km/h</span>
                  </div>
                </div>
              </div>

              <div className="motorista-card purple">
                <div className="pessoa-header">
                  <div className="pessoa-avatar-wrapper">
                    <img src={iconePerfilPreto} alt="Ícone" className="pessoa-icon" />
                    <img src={drCarlos} alt="Carlos Silva" className="pessoa-foto" />
                  </div>
                  <div className="pessoa-info">
                    <h3 className="pessoa-nome">CARLOS SILVA</h3>
                    <div className="pessoa-avaliacao">
                      <img src={iconAvaliacao} alt="Estrela" className="estrela-icon" />
                      <span>4.9 • 280 viagens</span>
                    </div>
                  </div>
                </div>
                <div className="pessoa-botoes">
                  <button className="btn-pessoa" onClick={() => handleLigar('11914886511')}>
                    <img src={iconTelefone} alt="Telefone" />
                    Ligar
                  </button>
                  <button className="btn-pessoa" onClick={() => handleChat('Carlos Silva')}>
                    <img src={iconeEmail} alt="Chat" />
                    Chat
                  </button>
                </div>
              </div>

              <div className="veterinario-card orange">
                <div className="pessoa-header">
                  <div className="pessoa-avatar-wrapper">
                    <img src={iconePerfilPreto} alt="Ícone" className="pessoa-icon" />
                    <img src={drAnaPaula} alt="Ana Paula Ribeiro" className="pessoa-foto" />
                  </div>
                  <div className="pessoa-info">
                    <h3 className="pessoa-nome">ANA PAULA RIBEIRO</h3>
                    <div className="pessoa-avaliacao">
                      <img src={iconAvaliacao} alt="Estrela" className="estrela-icon" />
                      <span>5.0 • CRMV 12345</span>
                    </div>
                  </div>
                </div>
                <div className="pessoa-botoes">
                  <button className="btn-pessoa" onClick={() => handleLigar('11914886511')}>
                    <img src={iconTelefone} alt="Telefone" />
                    Ligar
                  </button>
                  <button className="btn-pessoa" onClick={() => handleChat('Ana Paula Ribeiro')}>
                    <img src={iconeEmail} alt="Chat" />
                    Chat
                  </button>
                </div>
              </div>

              <div className="importante-card blue">
                <div className="importante-header">
                  <img src={iconeAlerta} alt="Alerta" className="alerta-icon" />
                  <h3 className="importante-titulo">IMPORTANTE</h3>
                </div>
                <ul className="importante-lista">
                  <li>
                    <img src={check} alt="Check" />
                    <span>Mantenha seu pet calmo</span>
                  </li>
                  <li>
                    <img src={check} alt="Check" />
                    <span>Prepare documentos médicos</span>
                  </li>
                  <li>
                    <img src={check} alt="Check" />
                    <span>Deixe alguém na porta</span>
                  </li>
                  <li>
                    <img src={check} alt="Check" />
                    <span>Tenha uma toalha pronta</span>
                  </li>
                </ul>
              </div>

              <button className="btn-emergencia" onClick={() => handleLigar('11914886511')}>
                <img src={iconTelefone} alt="Telefone" className="emergencia-icon" />
                EMERGÊNCIA: (11) 91488-6511
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RastreamentoAmbulancia;

