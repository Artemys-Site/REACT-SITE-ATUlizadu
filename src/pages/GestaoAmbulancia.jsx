import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GestaoAmbulancia.css';

const GestaoAmbulancia = () => {
  const [activeTab, setActiveTab] = useState('chamados');
  const navigate = useNavigate();
  
  useEffect(() => {
    sessionStorage.setItem('contexto_clinica', 'true');
  }, []);

  // Métricas do serviço
  const metrics = {
    chamadosAtivos: {
      value: 2,
      label: 'CHAMADOS ATIVOS',
      color: 'orange',
      tag: 'ATIVOS',
      icon: 'bell'
    },
    veiculosLivres: {
      value: 1,
      label: 'VEÍCULOS LIVRES',
      color: 'green',
      tag: 'DISPONÍVEL',
      icon: 'ambulance'
    },
    emServico: {
      value: 1,
      label: 'EM SERVIÇO',
      color: 'orange',
      icon: 'route'
    },
    tempoResposta: {
      value: '12MIN',
      label: 'TEMPO RESPOSTA',
      color: 'purple',
      tag: 'MÉDIA',
      icon: 'stopwatch'
    }
  };

  // Chamados ativos
  const chamadosAtivos = [
    {
      id: 1,
      paciente: 'REX',
      tutor: 'JOÃO SILVA',
      telefone: '(11) 98765-4321',
      endereco: 'RUA DAS FLORES, 123 - CENTRO',
      emergencia: 'ATROPELAMENTO',
      horaEmergencia: '14:32',
      status: 'EM ROTA',
      prioridade: 'ALTA PRIORIDADE',
      tempo: '8 MIN',
      veiculo: 'AMB-001 CARLOS EDUARDO'
    },
    {
      id: 2,
      paciente: 'LUNA',
      tutor: 'MARIA SANTOS',
      telefone: '(11) 91234-5678',
      endereco: 'AV. PAULISTA, 1000 - BELA VISTA',
      emergencia: 'DIFICULDADE RESPIRATÓRIA',
      horaEmergencia: '14:45',
      status: 'AGUARDANDO',
      prioridade: 'ALTA PRIORIDADE',
      tempo: '15 MIN',
      veiculo: 'NÃO DESIGNADO'
    },
    {
      id: 3,
      paciente: 'BOB',
      tutor: 'PEDRO COSTA',
      telefone: '(11) 99876-5432',
      endereco: 'RUA AUGUSTA, 500 - CONSOLAÇÃO',
      emergencia: 'CONSULTA AGENDADA',
      horaEmergencia: '13:15',
      status: 'CONCLUÍDO',
      prioridade: null,
      tempo: '15 MIN',
      veiculo: 'AMB-002 ANA PAULA'
    }
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'EM ROTA':
        return 'badge-em-rota';
      case 'AGUARDANDO':
        return 'badge-aguardando';
      case 'CONCLUÍDO':
        return 'badge-concluido';
      default:
        return 'badge-padrao';
    }
  };

  const handleLigar = (telefone) => {
    window.location.href = `tel:${telefone.replace(/\D/g, '')}`;
  };

  // Dados dos veículos
  const veiculos = [
    {
      id: 1,
      codigo: 'AMB-001',
      modelo: 'Fiat Ducato',
      placa: 'ABC-1234',
      motorista: 'CARLOS EDUARDO',
      status: 'EM SERVIÇO',
      ultimaManutencao: '04/01/2025',
      equipamentos: ['OXIGÊNIO', 'MACA', 'KIT EMERGÊNCIA']
    },
    {
      id: 2,
      codigo: 'AMB-002',
      modelo: 'Renault Master',
      placa: 'XYZ-5678',
      motorista: 'ANA PAULA',
      status: 'DISPONÍVEL',
      ultimaManutencao: '02/01/2025',
      equipamentos: ['OXIGÊNIO', 'MACA', 'DESFIBRILADOR']
    },
    {
      id: 3,
      codigo: 'AMB-003',
      modelo: 'Mercedes Sprinter',
      placa: 'DEF-9012',
      motorista: 'NÃO DESIGNADO',
      status: 'MANUTENÇÃO',
      ultimaManutencao: '07/01/2025',
      equipamentos: ['OXIGÊNIO', 'MACA', 'KIT EMERGÊNCIA', 'UTI MÓVEL']
    }
  ];

  const getVeiculoStatusClass = (status) => {
    switch (status) {
      case 'EM SERVIÇO':
        return 'status-em-servico';
      case 'DISPONÍVEL':
        return 'status-disponivel';
      case 'MANUTENÇÃO':
        return 'status-manutencao';
      default:
        return 'status-padrao';
    }
  };

  const getVeiculoHeaderColor = (status) => {
    switch (status) {
      case 'EM SERVIÇO':
        return 'header-orange';
      case 'DISPONÍVEL':
        return 'header-green';
      case 'MANUTENÇÃO':
        return 'header-purple';
      default:
        return 'header-gray';
    }
  };

  const getAcaoButton = (status) => {
    switch (status) {
      case 'EM SERVIÇO':
        return { text: 'EM ATENDIMENTO', icon: 'bi-shield-check', class: 'btn-em-atendimento' };
      case 'DISPONÍVEL':
        return { text: 'DESIGNAR PARA CHAMADO', icon: 'bi-send', class: 'btn-designar' };
      case 'MANUTENÇÃO':
        return { text: 'EM MANUTENÇÃO', icon: 'bi-shield-check', class: 'btn-em-manutencao' };
      default:
        return { text: 'AÇÃO', icon: 'bi-three-dots', class: 'btn-acao' };
    }
  };

  return (
    <section className="gestao-ambulancia-page">
      <div className="gestao-ambulancia-container">
        {/* Header */}
        <div className="gestao-ambulancia-header">
          <Link to="/painel-clinica" className="btn-voltar-gestao">
            <i className="bi bi-arrow-left"></i>
            VOLTAR
          </Link>
          <div className="gestao-ambulancia-title-section">
            <h1 className="gestao-ambulancia-titulo">SERVIÇO DE AMBULÂNCIA</h1>
            <p className="gestao-ambulancia-subtitulo">
              GESTÃO DE TRANSPORTE EMERGENCIAL E AGENDADO PARA ANIMAIS
            </p>
          </div>
          <button 
            className="btn-nova-emergencia"
            onClick={() => navigate('/registro-ocorrencia')}
          >
            <i className="bi bi-bell"></i>
            NOVA EMERGÊNCIA
          </button>
        </div>

        {/* Cards de Métricas */}
        <div className="gestao-metrics-grid">
          <div className={`gestao-metric-card metric-${metrics.chamadosAtivos.color}`}>
            <div className="gestao-metric-header">
              <div className="gestao-metric-icon-wrapper">
                <i className="bi bi-bell"></i>
              </div>
              <span className="gestao-metric-tag">{metrics.chamadosAtivos.tag}</span>
            </div>
            <div className="gestao-metric-content">
              <div className="gestao-metric-label">{metrics.chamadosAtivos.label}</div>
              <div className="gestao-metric-value">{metrics.chamadosAtivos.value}</div>
            </div>
          </div>

          <div className={`gestao-metric-card metric-${metrics.veiculosLivres.color}`}>
            <div className="gestao-metric-header">
              <div className="gestao-metric-icon-wrapper">
                <i className="fa fa-ambulance" aria-hidden="true"></i>
              </div>
              <span className="gestao-metric-tag">{metrics.veiculosLivres.tag}</span>
            </div>
            <div className="gestao-metric-content">
              <div className="gestao-metric-label">{metrics.veiculosLivres.label}</div>
              <div className="gestao-metric-value">{metrics.veiculosLivres.value}</div>
            </div>
          </div>

          <div className={`gestao-metric-card metric-${metrics.emServico.color}`}>
            <div className="gestao-metric-header">
              <div className="gestao-metric-icon-wrapper">
                <i className="bi bi-diagram-3"></i>
              </div>
            </div>
            <div className="gestao-metric-content">
              <div className="gestao-metric-label">{metrics.emServico.label}</div>
              <div className="gestao-metric-value">{metrics.emServico.value}</div>
            </div>
          </div>

          <div className={`gestao-metric-card metric-${metrics.tempoResposta.color}`}>
            <div className="gestao-metric-header">
              <div className="gestao-metric-icon-wrapper">
                <i className="bi bi-stopwatch"></i>
              </div>
              <span className="gestao-metric-tag">{metrics.tempoResposta.tag}</span>
            </div>
            <div className="gestao-metric-content">
              <div className="gestao-metric-label">{metrics.tempoResposta.label}</div>
              <div className="gestao-metric-value">{metrics.tempoResposta.value}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="gestao-tabs">
          <button
            className={`gestao-tab ${activeTab === 'chamados' ? 'active' : ''}`}
            onClick={() => setActiveTab('chamados')}
          >
            <i className="bi bi-bell"></i>
            CHAMADOS
          </button>
          <button
            className={`gestao-tab ${activeTab === 'veiculos' ? 'active' : ''}`}
            onClick={() => setActiveTab('veiculos')}
          >
            <i className="fa fa-ambulance" aria-hidden="true"></i>
            VEÍCULOS
          </button>
          <button
            className={`gestao-tab ${activeTab === 'historicos' ? 'active' : ''}`}
            onClick={() => setActiveTab('historicos')}
          >
            <i className="bi bi-file-earmark-text"></i>
            HISTÓRICOS
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'chamados' && (
          <div className="chamados-ativos-section">
            <div className="chamados-ativos-header">
              <div>
                <h3 className="chamados-ativos-titulo">
                  <i className="bi bi-bell"></i>
                  CHAMADOS ATIVOS
                </h3>
                <p className="chamados-ativos-subtitulo">
                  ACOMPANHE SOLICITAÇÕES EM TEMPO REAL
                </p>
              </div>
              <div className="tempo-real-indicator">
                <span className="tempo-real-dot"></span>
                ATUALIZANDO EM TEMPO REAL
              </div>
            </div>

            <div className="chamados-table-wrapper">
              <table className="chamados-table">
                <thead>
                  <tr>
                    <th>PACIENTE</th>
                    <th>TUTOR</th>
                    <th>ENDEREÇO</th>
                    <th>EMERGÊNCIA</th>
                    <th>STATUS</th>
                    <th>TEMPO</th>
                    <th>VEÍCULO</th>
                    <th>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {chamadosAtivos.map(chamado => (
                    <tr key={chamado.id}>
                      <td>
                        <div className="paciente-cell">
                          <strong>{chamado.paciente}</strong>
                        </div>
                      </td>
                      <td>
                        <div className="tutor-cell">
                          <div>{chamado.tutor}</div>
                          <div className="tutor-telefone">{chamado.telefone}</div>
                        </div>
                      </td>
                      <td>
                        <div className="endereco-cell">
                          <i className="bi bi-geo-alt"></i>
                          {chamado.endereco}
                        </div>
                      </td>
                      <td>
                        <div className="emergencia-cell">
                          <div className="emergencia-tipo">{chamado.emergencia}</div>
                          <div className="emergencia-hora">
                            <i className="bi bi-clock"></i>
                            {chamado.horaEmergencia}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="status-cell">
                          <span className={`status-badge ${getStatusBadgeClass(chamado.status)}`}>
                            {chamado.status === 'EM ROTA' && <i className="bi bi-diagram-3"></i>}
                            {chamado.status === 'AGUARDANDO' && <i className="bi bi-clock"></i>}
                            {chamado.status === 'CONCLUÍDO' && <i className="bi bi-check-circle"></i>}
                            {chamado.status}
                          </span>
                          {chamado.prioridade && (
                            <span className="prioridade-badge">
                              <i className="bi bi-lightning-fill"></i>
                              {chamado.prioridade}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="tempo-cell">
                          <i className="bi bi-clock"></i>
                          {chamado.tempo}
                        </div>
                      </td>
                      <td>
                        <div className="veiculo-cell">{chamado.veiculo}</div>
                      </td>
                      <td>
                        <div className="acoes-cell">
                          <Link to="/rastreamento-ambulancia" className="btn-rastrear">
                            <i className="bi bi-send"></i>
                            RASTREAR
                          </Link>
                          <button
                            className="btn-ligar"
                            onClick={() => handleLigar(chamado.telefone)}
                            title="Ligar para tutor"
                          >
                            <i className="bi bi-telephone"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'veiculos' && (
          <div className="veiculos-section">
            <div className="veiculos-grid">
              {veiculos.map(veiculo => {
                const acao = getAcaoButton(veiculo.status);
                return (
                  <div key={veiculo.id} className={`veiculo-card ${getVeiculoHeaderColor(veiculo.status)}`}>
                    <div className="veiculo-card-header">
                      <div className="veiculo-header-left">
                        <i className="fa fa-ambulance" aria-hidden="true"></i>
                        <div className="veiculo-identificacao">
                          <span className="veiculo-codigo">{veiculo.codigo}</span>
                          <span className="veiculo-modelo">{veiculo.modelo}</span>
                        </div>
                      </div>
                      <span className={`veiculo-status-badge ${getVeiculoStatusClass(veiculo.status)}`}>
                        {veiculo.status}
                      </span>
                    </div>
                    
                    <div className="veiculo-card-body">
                      <div className="veiculo-info-row">
                        <div className="veiculo-info-item">
                          <span className="veiculo-info-label">PLACA</span>
                          <span className="veiculo-info-value">{veiculo.placa}</span>
                        </div>
                        <div className="veiculo-info-item">
                          <span className="veiculo-info-label">MOTORISTA</span>
                          <span className="veiculo-info-value">{veiculo.motorista}</span>
                        </div>
                      </div>

                      <div className="veiculo-equipamentos">
                        <span className="veiculo-info-label">EQUIPAMENTOS</span>
                        <div className="equipamentos-list">
                          {veiculo.equipamentos.map((equipamento, index) => (
                            <div key={index} className="equipamento-item">
                              <i className="bi bi-check-circle-fill"></i>
                              <span>{equipamento}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="veiculo-manutencao">
                        <span className="veiculo-info-label">ÚLTIMA MANUTENÇÃO</span>
                        <span className="veiculo-info-value">{veiculo.ultimaManutencao}</span>
                      </div>
                    </div>

                    <div className="veiculo-card-footer">
                      <button className={`veiculo-acao-btn ${acao.class}`}>
                        <i className={`bi ${acao.icon}`}></i>
                        {acao.text}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'historicos' && (
          <div className="historicos-section">
            <div className="historicos-header">
              <div>
                <h3 className="historicos-titulo">
                  <i className="bi bi-file-earmark-text"></i>
                  HISTÓRICO DE ATENDIMENTOS
                </h3>
                <p className="historicos-subtitulo">
                  REGISTRO COMPLETO DE CHAMADOS ANTERIORES
                </p>
              </div>
            </div>

            <div className="historicos-content">
              <div className="historicos-placeholder">
                <i className="bi bi-file-earmark-text historicos-placeholder-icon"></i>
                <p className="historicos-placeholder-text">
                  HISTÓRICO DE ATENDIMENTOS SERÁ EXIBIDO AQUI
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GestaoAmbulancia;

