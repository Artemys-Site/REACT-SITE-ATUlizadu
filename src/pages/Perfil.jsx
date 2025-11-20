import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Perfil.css';
import fotoBob from '../assets/fotoBob.jpeg';
import fotoMila from '../assets/fotoMila.jpg';
import iconePerfilAvalia from '../assets/iconePerfilAvalia.png';
import iconeCalendarioPreto from '../assets/iconeCalendarioPreto.png';
import iconeNotificacao from '../assets/iconeNotificacao.png';
import perfilLogado from '../assets/perfilLogado.png';
import iconeConfirmar from '../assets/iconeConfirmar.png';

const Perfil = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('perfil');

  const [notificacoes, setNotificacoes] = useState({
    emailAgendamento: true,
    smsLembrete: true,
    pushEmergencia: true,
    whatsappConfirmacao: true,
    emailsPromocionais: false
  });

  useEffect(() => {
    // Verifica se tem # na URL para ativar a aba correta
    if (location.hash === '#pagamento') {
      setActiveTab('pagamento');
    }
  }, [location]);

  const pets = [
    {
      id: 1,
      nome: 'Bob',
      tipo: 'Cão - Golden Retriever',
      foto: fotoBob,
      dataNascimento: '12/05/2020',
      microchip: '123.456.789',
      raca: 'Golden Retriever',
      sexo: 'Macho',
      porte: 'Grande',
      peso: '14 Kg',
      cor: 'Laranja'
    },
    {
      id: 2,
      nome: 'Mila',
      tipo: 'Gato - SRD',
      foto: fotoMila,
      dataNascimento: '12/05/2020',
      microchip: '123.456.789',
      raca: 'SRD',
      sexo: 'Fêmea',
      porte: 'Pequeno',
      peso: '5 Kg',
      cor: 'Laranja'
    }
  ];

  const historico = [
    {
      id: 1,
      servico: 'Consulta Veterinária',
      detalhes: '08/11/2025 • REX',
      veterinario: 'DR(A). CARLOS MENDES',
      status: 'concluido',
      preco: 'R$ 180,00'
    },
    {
      id: 2,
      servico: 'Vacinação',
      detalhes: '15/11/2025 • LUNA',
      veterinario: 'DR(A). ANA SANTOS',
      status: 'agendado',
      preco: 'R$ 120,00'
    }
  ];

  const handleToggleNotificacao = (key) => {
    setNotificacoes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section className="configuracoes-page">
      <div className="configuracoes-container">
        <div className="configuracoes-header">
          <h1 className="configuracoes-titulo">CONFIGURAÇÕES</h1>
          <p className="configuracoes-subtitulo">GERENCIE SUAS INFORMAÇÕES PESSOAIS E PREFERÊNCIAS</p>
        </div>

        <div className="configuracoes-tabs">
          <button
            className={`config-tab ${activeTab === 'perfil' ? 'active' : ''}`}
            onClick={() => setActiveTab('perfil')}
            data-tab="perfil"
          >
            <img src={iconePerfilAvalia} alt="Perfil" />
            <span>PERFIL</span>
          </button>
          <button
            className={`config-tab ${activeTab === 'historico' ? 'active' : ''}`}
            onClick={() => setActiveTab('historico')}
            data-tab="historico"
          >
            <img src={iconeCalendarioPreto} alt="Histórico" />
            <span>HISTÓRICO</span>
          </button>
          <button
            className={`config-tab ${activeTab === 'pagamento' ? 'active' : ''}`}
            onClick={() => setActiveTab('pagamento')}
            data-tab="pagamento"
          >
            <i className="bi bi-credit-card-2-front-fill"></i>
            <span>PAGAMENTO</span>
          </button>
          <button
            className={`config-tab ${activeTab === 'notificacoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notificacoes')}
            data-tab="notificacoes"
          >
            <img src={iconeNotificacao} alt="Notificações" />
            <span>NOTIFICAÇÕES</span>
          </button>
        </div>

        {/* Conteúdo Perfil */}
        {activeTab === 'perfil' && (
          <div id="perfil-content" className="config-content active">
            <div className="perfil-card">
              <div className="perfil-card-header">
                <div className="perfil-info">
                  <img src={perfilLogado} alt="João Victor" className="perfil-foto" />
                  <div>
                    <h2 className="perfil-nome">João Victor</h2>
                    <p className="perfil-tipo">Tutor</p>
                  </div>
                </div>
                <button className="btn-editar-perfil">
                  <img src={iconeConfirmar} alt="Editar" />
                  <span>Editar Perfil</span>
                </button>
              </div>
              <div className="perfil-card-body">
                <div className="perfil-grid">
                  <div className="perfil-campo">
                    <label>Nome Completo</label>
                    <input type="text" value="João Victor Lima Dos Santos Nevaça" readOnly />
                  </div>
                  <div className="perfil-campo">
                    <label>Gênero</label>
                    <select disabled>
                      <option selected>Masculino</option>
                      <option>Feminino</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div className="perfil-campo">
                    <label>CPF</label>
                    <input type="text" value="123.456.789-00" readOnly />
                  </div>
                  <div className="perfil-campo">
                    <label>Email</label>
                    <input type="email" value="joao.victor@email.com" readOnly />
                  </div>
                  <div className="perfil-campo">
                    <label>Data de Nascimento</label>
                    <input type="text" value="15/03/1995" readOnly />
                  </div>
                </div>
              </div>
            </div>

            <div className="pets-section">
              <div className="pets-section-header">
                <div>
                  <h2 className="pets-section-titulo">MEU(S) PET(S)</h2>
                  <p className="pets-section-subtitulo">GERENCIE AS INFORMAÇÕES DOS SEUS COMPANHEIROS</p>
                </div>
                <Link to="/cadastro-pet" className="btn-cadastrar-pet" style={{textDecoration: 'none', display: 'inline-flex'}}>
                  <span>+</span>
                  <span>Cadastrar Pet</span>
                </Link>
              </div>

              <div className="pets-grid">
                {pets.map(pet => (
                  <div key={pet.id} className="pet-card">
                    <div className="pet-card-header">
                      <div className="pet-info">
                        <img src={pet.foto} alt={pet.nome} className="pet-foto" />
                        <div>
                          <h3 className="pet-nome">{pet.nome}</h3>
                          <p className="pet-tipo">{pet.tipo}</p>
                        </div>
                      </div>
                      <button className="btn-editar-pet">
                        <img src={iconeConfirmar} alt="Editar" />
                      </button>
                    </div>
                    <div className="pet-card-body">
                      <div className="pet-detalhes">
                        <div className="pet-detalhe-item">
                          <strong>Data de Nascimento:</strong> {pet.dataNascimento}
                        </div>
                        <div className="pet-detalhe-item">
                          <strong>Microchip:</strong> {pet.microchip}
                        </div>
                        <div className="pet-detalhe-item">
                          <strong>Raça:</strong> {pet.raca}
                        </div>
                        <div className="pet-detalhe-item">
                          <strong>Sexo:</strong> {pet.sexo}
                        </div>
                        <div className="pet-detalhe-item">
                          <strong>Porte:</strong> {pet.porte}
                        </div>
                        <div className="pet-detalhe-item">
                          <strong>Peso:</strong> {pet.peso}
                        </div>
                        <div className="pet-detalhe-item">
                          <strong>Cor:</strong> {pet.cor}
                        </div>
                      </div>
                      <button className="btn-mais-detalhes">Mais Detalhes &gt;</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Conteúdo Histórico */}
        {activeTab === 'historico' && (
          <div id="historico-content" className="config-content active">
            <div className="historico-card">
              <h2 className="historico-titulo">HISTÓRICO DE SERVIÇOS</h2>
              
              {historico.map(item => (
                <div key={item.id} className="historico-item">
                  <div className="historico-info">
                    <div className="historico-servico">{item.servico}</div>
                    <div className="historico-detalhes">{item.detalhes}</div>
                    <div className="historico-veterinario">{item.veterinario}</div>
                  </div>
                  <div className="historico-status">
                    <span className={`status-badge status-${item.status}`}>
                      {item.status === 'concluido' ? 'CONCLUÍDO' : 'AGENDADO'}
                    </span>
                    <span className="historico-preco">{item.preco}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conteúdo Pagamento */}
        {activeTab === 'pagamento' && (
          <div id="pagamento-content" className="config-content active">
            <h2 className="pagamento-titulo">MÉTODOS DE PAGAMENTO</h2>
            
            <div className="pagamento-layout">
              <div className="pagamento-principal-card">
                <div className="cartao-principal-header">
                  <span className="cartao-principal-label">CARTÃO PRINCIPAL</span>
                </div>
                <div className="cartao-principal-numero">**** **** **** 4532</div>
                <div className="cartao-principal-info">
                  <div className="cartao-info-item">
                    <span className="cartao-info-label">TITULAR</span>
                    <span className="cartao-info-value">MARIA SILVA</span>
                  </div>
                  <div className="cartao-info-item">
                    <span className="cartao-info-label">VALIDADE</span>
                    <span className="cartao-info-value">12/26</span>
                  </div>
                </div>
                <div className="cartao-principal-actions">
                  <button className="btn-padrao">
                    Padrão
                  </button>
                  <button className="btn-deletar-cartao">
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>

              <div className="pagamento-sidebar">
                <div className="formas-pagamento-section">
                  <h3 className="formas-pagamento-titulo">FORMAS DE PAGAMENTO</h3>
                  <div className="forma-pagamento-item">
                    <i className="bi bi-credit-card-2-front-fill"></i>
                    <span>CARTÃO CRÉDITO/DÉBITO</span>
                  </div>
                  <div className="forma-pagamento-item">
                    <i className="bi bi-qr-code"></i>
                    <span>PIX</span>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/metodo-pagamento" className="btn-adicionar-pagamento">
              <i className="bi bi-plus-circle-fill"></i>
              <span>ADICIONAR MÉTODO DE PAGAMENTO</span>
            </Link>
          </div>
        )}

        {/* Conteúdo Notificações */}
        {activeTab === 'notificacoes' && (
          <div id="notificacoes-content" className="config-content active">
            <div className="notificacoes-card">
              <h2 className="notificacoes-titulo">PREFERÊNCIAS DE NOTIFICAÇÃO</h2>
              
              <div className="notificacao-item">
                <div className="notificacao-info">
                  <div className="notificacao-titulo">E-MAIL DE AGENDAMENTO</div>
                  <div className="notificacao-descricao">RECEBA CONFIRMAÇÕES DE CONSULTAS POR E-MAIL</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notificacoes.emailAgendamento}
                    onChange={() => handleToggleNotificacao('emailAgendamento')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notificacao-item">
                <div className="notificacao-info">
                  <div className="notificacao-titulo">SMS DE LEMBRETE</div>
                  <div className="notificacao-descricao">LEMBRETES DE CONSULTAS 24H ANTES</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notificacoes.smsLembrete}
                    onChange={() => handleToggleNotificacao('smsLembrete')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notificacao-item">
                <div className="notificacao-info">
                  <div className="notificacao-titulo">PUSH DE EMERGÊNCIA</div>
                  <div className="notificacao-descricao">NOTIFICAÇÕES URGENTES SOBRE SEUS PETS</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notificacoes.pushEmergencia}
                    onChange={() => handleToggleNotificacao('pushEmergencia')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notificacao-item">
                <div className="notificacao-info">
                  <div className="notificacao-titulo">WHATSAPP CONFIRMAÇÃO</div>
                  <div className="notificacao-descricao">CONFIRMAÇÕES VIA WHATSAPP</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notificacoes.whatsappConfirmacao}
                    onChange={() => handleToggleNotificacao('whatsappConfirmacao')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notificacao-item">
                <div className="notificacao-info">
                  <div className="notificacao-titulo">E-MAILS PROMOCIONAIS</div>
                  <div className="notificacao-descricao">OFERTAS E NOVIDADES SOBRE SERVIÇOS</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notificacoes.emailsPromocionais}
                    onChange={() => handleToggleNotificacao('emailsPromocionais')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Perfil;

