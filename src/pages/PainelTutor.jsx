import { Link } from 'react-router-dom';
import './PainelTutor.css';
//CUIDADO ao mexer aq, ele é usado na home e no painel clinica

const PainelTutor = () => {

  const metrics = {
    agendamentos: {
      value: 5,
      label: 'AGENDAMENTOS DO DIA',
      description: 'TOTAL DE CONSULTAS AGENDADAS',
      trend: '+12%',
      trendLabel: 'VS. SEMANA PASSADA',
      color: 'purple',
      icon: 'calendar'
    },
    consultasOnline: {
      value: 3,
      label: 'CONSULTAS ONLINE',
      description: 'TELEMEDICINA AGENDADA',
      trend: '+8%',
      trendLabel: 'VS. SEMANA PASSADA',
      color: 'orange',
      icon: 'video'
    },
    profissionais: {
      value: 8,
      label: 'PROFISSIONAIS',
      description: 'DISPONÍVEIS HOJE',
      trend: '100%',
      trendLabel: 'DA EQUIPE TOTAL',
      color: 'green',
      icon: 'people'
    }
  };

  const recentAppointments = [
    {
      id: 1,
      paciente: 'BOB',
      tutor: 'JOÃO VICTOR',
      profissional: 'CAMILA SILVA MENDONÇA',
      dataHora: '17/07 - 13H30',
      tipo: 'CONSULTA',
      status: 'CONFIRMADA'
    },
    {
      id: 2,
      paciente: 'MILA',
      tutor: 'JOÃO VICTOR',
      profissional: 'DR. CARLOS MENDES',
      dataHora: '18/07 - 10H00',
      tipo: 'VACINAÇÃO',
      status: 'AGENDADA'
    },
    {
      id: 3,
      paciente: 'REX',
      tutor: 'JOÃO VICTOR',
      profissional: 'DR. ANA SANTOS',
      dataHora: '19/07 - 15H30',
      tipo: 'CONSULTA',
      status: 'CONFIRMADA'
    },
    {
      id: 4,
      paciente: 'LUNA',
      tutor: 'JOÃO VICTOR',
      profissional: 'CAMILA SILVA MENDONÇA',
      dataHora: '20/07 - 09H00',
      tipo: 'CHECK-UP',
      status: 'PENDENTE'
    }
  ];

  return (
    <section className="painel-tutor-page">
      <div className="painel-tutor-container">
        <div className="painel-tutor-header">
          <div>
            <h1 className="painel-tutor-titulo">PAINEL DO TUTOR</h1>
            <p className="painel-tutor-subtitulo">ACOMPANHE AS MÉTRICAS E ATIVIDADES EM TEMPO REAL</p>
          </div>
          <Link to="/ambulancia" className="btn-ambulancia">
            <i className="fa fa-ambulance" aria-hidden="true"></i>
            AMBULÂNCIA
          </Link>
        </div>

        {/* Cards de Métricas */}
        <div className="metrics-grid">
          <div className={`metric-card metric-${metrics.agendamentos.color}`}>
            <div className="metric-header">
              <h3 className="metric-label">{metrics.agendamentos.label}</h3>
              <div className={`metric-icon metric-icon-${metrics.agendamentos.color}`}>
                <i className="bi bi-calendar-check"></i>
              </div>
            </div>
            <div className="metric-value">{metrics.agendamentos.value}</div>
            <div className="metric-description">{metrics.agendamentos.description}</div>
            <div className="metric-trend">
              <i className="bi bi-arrow-up-circle-fill trend-up"></i>
              <span className="trend-value">{metrics.agendamentos.trend}</span>
              <span className="trend-label">{metrics.agendamentos.trendLabel}</span>
            </div>
          </div>

          <div className={`metric-card metric-${metrics.consultasOnline.color}`}>
            <div className="metric-header">
              <h3 className="metric-label">{metrics.consultasOnline.label}</h3>
              <div className={`metric-icon metric-icon-${metrics.consultasOnline.color}`}>
                <i className="bi bi-camera-video"></i>
              </div>
            </div>
            <div className="metric-value">{metrics.consultasOnline.value}</div>
            <div className="metric-description">{metrics.consultasOnline.description}</div>
            <div className="metric-trend">
              <i className="bi bi-arrow-up-circle-fill trend-up"></i>
              <span className="trend-value">{metrics.consultasOnline.trend}</span>
              <span className="trend-label">{metrics.consultasOnline.trendLabel}</span>
            </div>
          </div>

          <div className={`metric-card metric-${metrics.profissionais.color}`}>
            <div className="metric-header">
              <h3 className="metric-label">{metrics.profissionais.label}</h3>
              <div className={`metric-icon metric-icon-${metrics.profissionais.color}`}>
                <i className="bi bi-people"></i>
              </div>
            </div>
            <div className="metric-value">{metrics.profissionais.value}</div>
            <div className="metric-description">{metrics.profissionais.description}</div>
            <div className="metric-trend">
              <i className="bi bi-arrow-up-circle-fill trend-up"></i>
              <span className="trend-value">{metrics.profissionais.trend}</span>
              <span className="trend-label">{metrics.profissionais.trendLabel}</span>
            </div>
          </div>
        </div>

        {/* Cards de Análise */}
        <div className="analysis-grid">
          <div className="analysis-card analysis-purple">
            <div className="analysis-header">
              <h3 className="analysis-title">CONSULTAS MENSAIS</h3>
              <p className="analysis-subtitle">ÚLTIMOS 6 MESES</p>
            </div>
            <div className="analysis-icon">
              <i className="bi bi-bar-chart-fill"></i>
            </div>
            <p className="analysis-description">ANÁLISE DE CONSULTAS REALIZADAS</p>
          </div>

          <div className="analysis-card analysis-orange">
            <div className="analysis-header">
              <h3 className="analysis-title">DISTRIBUIÇÃO POR PROFISSIONAL</h3>
              <p className="analysis-subtitle">ESPECIALIDADES ATIVAS</p>
            </div>
            <div className="analysis-icon">
              <i className="bi bi-pie-chart-fill"></i>
            </div>
            <p className="analysis-description">DISTRIBUIÇÃO DE ATENDIMENTO</p>
          </div>
        </div>

        {/* Tabela de Agendamentos Recentes */}
        <div className="appointments-card">
          <div className="appointments-header">
            <div className="appointments-title-section">
              <i className="bi bi-calendar3 appointments-title-icon"></i>
              <div>
                <h3 className="appointments-title">AGENDAMENTOS RECENTES</h3>
                <p className="appointments-subtitle">ÚLTIMAS CONSULTAS AGENDADAS NO SISTEMA</p>
              </div>
            </div>
            <Link to="/agendamento-tutor" className="btn-ver-todos">
              VER TODOS
            </Link>
          </div>

          <div className="appointments-table">
            <table>
              <thead>
                <tr>
                  <th>PACIENTE</th>
                  <th>TUTOR</th>
                  <th>PROFISSIONAL</th>
                  <th>DATA/HORA</th>
                  <th>TIPO</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{appointment.paciente}</td>
                    <td>{appointment.tutor}</td>
                    <td>{appointment.profissional}</td>
                    <td>{appointment.dataHora}</td>
                    <td>
                      <span className="badge badge-tipo">{appointment.tipo}</span>
                    </td>
                    <td>
                      <span className={`badge badge-status badge-${appointment.status.toLowerCase()}`}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="action-buttons">
          <Link to="/servicos" className="btn-action">
            <i className="bi bi-person-plus"></i>
            BUSCAR PROFISSIONAIS
          </Link>
          <Link to="/agendamento-tutor" className="btn-action">
            <i className="bi bi-calendar-check"></i>
            VER AGENDA COMPLETA
          </Link>
          <button className="btn-action">
            <i className="bi bi-file-earmark-text"></i>
            GERAR RELATÓRIO
          </button>
        </div>
      </div>
    </section>
  );
};

export default PainelTutor;

