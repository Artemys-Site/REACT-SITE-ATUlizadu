import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './PerfilProfissional.css';

const PerfilProfissional = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Marcar contexto de clínica ao entrar nesta página
  useEffect(() => {
    sessionStorage.setItem('contexto_clinica', 'true');
  }, []);

  // dados do profissional - depois vem do backend
  const profissional = {
    id: id || '1',
    nome: 'DR. LAURA CARVALHO',
    especialidade: 'CARDIOLOGIA',
    status: 'ATIVA',
    foto: '/drAnaPaula.png',
    especies: 'FELINOS E CANINOS',
    horarios: '9H - 15H59',
    experiencia: '8 ANOS',
    pacientes: '342 ATIVOS',
    email: 'LAURA.CARVALHO@ARTEMYS.COM',
    telefone: '(11) 98765-4321',
    localizacao: 'CONSULTÓRIO 2 - ARTEMYS',
    sobre: 'Especialista em cardiologia veterinária com 8 anos de experiência no atendimento de felinos e caninos. Graduada pela Universidade Federal de Medicina Veterinária, com pós-graduação em Cardiologia Veterinária pela ANCLIVEPA e especialização em Ecocardiografia pelo Instituto VetCardio.',
    formacao: [
      { tipo: 'Graduação', curso: 'Medicina Veterinária', instituicao: 'UFMV', ano: '2015' },
      { tipo: 'Pós-graduação', curso: 'Cardiologia Veterinária', instituicao: 'ANCLIVEPA', ano: '2017' },
      { tipo: 'Especialização', curso: 'Ecocardiografia', instituicao: 'Instituto VetCardio', ano: '2019' }
    ],
    certificacoes: ['CRMV-SP 12345', 'CARDIOLOGIA CERTIFICADA', 'ECOCARDIOGRAFIA', 'EMERGÊNCIAS CARDÍACAS'],
    agenda: {
      segunda: '9H - 15H59',
      terca: '9H - 15H59',
      quarta: '9H - 15H59',
      quinta: '9H - 15H59',
      sexta: '9H - 13H',
      sabado: 'NÃO DISPONÍVEL',
      domingo: 'NÃO DISPONÍVEL'
    },
    metricas: {
      consultasMes: 48,
      consultasOnline: 16,
      horasTrabalhadas: '124 HORAS',
      mediaSemanal: 'MÉDIA DE 31H/SEMANA',
      taxaSatisfacao: 98
    },
    consultasRecentes: [
      {
        id: 1,
        paciente: 'BOB',
        tutor: 'JOÃO VICTOR LIMA',
        dataHora: '10/8 ÀS 10H',
        tipo: 'CONSULTA',
        status: 'CONFIRMADO'
      },
      {
        id: 2,
        paciente: 'NINA',
        tutor: 'PEDRO SANTOS COSTA',
        dataHora: '09/8 ÀS 11H',
        tipo: 'ONLINE',
        status: 'CONFIRMADO'
      },
      {
        id: 3,
        paciente: 'BOB',
        tutor: 'JOÃO VICTOR LIMA',
        dataHora: '10/8 ÀS 10H',
        tipo: 'CONSULTA',
        status: 'CONFIRMADO'
      },
      {
        id: 4,
        paciente: 'NINA',
        tutor: 'PEDRO SANTOS COSTA',
        dataHora: '09/8 ÀS 11H',
        tipo: 'ONLINE',
        status: 'CONFIRMADO'
      }
    ]
  };

  return (
    <section className="perfil-profissional-page">
      <div className="perfil-profissional-container">
        {/* header do perfil */}
        <div className="perfil-header-banner">
          <div className="perfil-header-content">
            <div className="perfil-foto-grande-wrapper">
              <img src={profissional.foto} alt={profissional.nome} className="perfil-foto-grande" />
            </div>
            <div className="perfil-header-info">
              <h1 className="perfil-nome-grande">{profissional.nome}</h1>
              <div className="perfil-badges">
                <span className="badge-especialidade-header">
                  <i className="bi bi-heart-pulse"></i>
                  {profissional.especialidade}
                </span>
                <span className="badge-status-header">
                  {profissional.status}
                </span>
              </div>
              <button 
                className="btn-editar-perfil"
                onClick={() => navigate(`/editar-perfil-profissional/${id}`)}
              >
                <i className="bi bi-pencil"></i>
                EDITAR PERFIL
              </button>
            </div>
          </div>
        </div>

        {/* cards de info rapida */}
        <div className="perfil-info-rapida-grid">
          <div className="info-card-rapida info-purple">
            <i className="bi bi-paw-fill"></i>
            <div>
              <span className="info-rapida-label">ESPÉCIES</span>
              <span className="info-rapida-value">{profissional.especies}</span>
            </div>
          </div>
          <div className="info-card-rapida info-orange">
            <i className="bi bi-calendar3"></i>
            <div>
              <span className="info-rapida-label">HORÁRIOS</span>
              <span className="info-rapida-value">{profissional.horarios}</span>
            </div>
          </div>
          <div className="info-card-rapida info-purple">
            <i className="bi bi-building"></i>
            <div>
              <span className="info-rapida-label">EXPERIÊNCIA</span>
              <span className="info-rapida-value">{profissional.experiencia}</span>
            </div>
          </div>
          <div className="info-card-rapida info-green">
            <i className="bi bi-people"></i>
            <div>
              <span className="info-rapida-label">PACIENTES</span>
              <span className="info-rapida-value">{profissional.pacientes}</span>
            </div>
          </div>
        </div>

        {/* cards de metricas */}
        <div className="perfil-metricas-grid">
          <div className="metrica-card-perfil metrica-purple">
            <div className="metrica-icon-wrapper">
              <i className="bi bi-calendar-check"></i>
            </div>
            <div className="metrica-content">
              <div className="metrica-value-perfil">{profissional.metricas.consultasMes}</div>
              <div className="metrica-label-perfil">CONSULTAS ESSE MÊS</div>
              <div className="metrica-trend">+12% VS. SEMANA PASSADA</div>
            </div>
          </div>
          <div className="metrica-card-perfil metrica-orange">
            <div className="metrica-icon-wrapper">
              <i className="bi bi-camera-video"></i>
            </div>
            <div className="metrica-content">
              <div className="metrica-value-perfil">{profissional.metricas.consultasOnline}</div>
              <div className="metrica-label-perfil">CONSULTAS ONLINE</div>
              <div className="metrica-trend">+8% VS. SEMANA PASSADA</div>
            </div>
          </div>
          <div className="metrica-card-perfil metrica-purple">
            <div className="metrica-icon-wrapper">
              <i className="bi bi-clock"></i>
            </div>
            <div className="metrica-content">
              <div className="metrica-value-perfil">{profissional.metricas.horasTrabalhadas}</div>
              <div className="metrica-label-perfil">HORAS TRABALHADAS</div>
              <div className="metrica-description">{profissional.metricas.mediaSemanal}</div>
            </div>
          </div>
          <div className="metrica-card-perfil metrica-green">
            <div className="metrica-icon-wrapper">
              <i className="bi bi-heart-fill"></i>
            </div>
            <div className="metrica-content">
              <div className="metrica-value-perfil">{profissional.metricas.taxaSatisfacao}%</div>
              <div className="metrica-label-perfil">TAXA DE SATISFAÇÃO</div>
            </div>
          </div>
        </div>

        {/* conteudo principal - duas colunas */}
        <div className="perfil-conteudo-grid">
          {/* coluna esquerda */}
          <div className="perfil-coluna-esquerda">
            {/* sobre o profissional */}
            <div className="perfil-secao">
              <div className="secao-header">
                <i className="bi bi-book"></i>
                <h3 className="secao-titulo">SOBRE O PROFISSIONAL</h3>
              </div>
              <p className="secao-texto">{profissional.sobre}</p>
            </div>

            {/* formacao academica */}
            <div className="perfil-secao">
              <div className="secao-header">
                <i className="bi bi-mortarboard"></i>
                <h3 className="secao-titulo">FORMAÇÃO ACADÊMICA</h3>
              </div>
              <div className="formacao-lista">
                {profissional.formacao.map((item, index) => (
                  <div key={index} className="formacao-item">
                    <div className="formacao-tipo">{item.tipo}</div>
                    <div className="formacao-curso">{item.curso} - {item.instituicao}</div>
                    <div className="formacao-ano">{item.ano}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* certificacoes */}
            <div className="perfil-secao">
              <div className="secao-header">
                <i className="bi bi-award"></i>
                <h3 className="secao-titulo">CERTIFICAÇÕES</h3>
              </div>
              <div className="certificacoes-tags">
                {profissional.certificacoes.map((cert, index) => (
                  <span key={index} className="certificacao-tag">{cert}</span>
                ))}
              </div>
            </div>

            {/* consultas recentes */}
            <div className="perfil-secao">
              <div className="secao-header">
                <i className="bi bi-calendar3"></i>
                <h3 className="secao-titulo">CONSULTAS RECENTES</h3>
                <Link to="/agendamento-clinica" className="btn-ver-todas">VER TODAS</Link>
              </div>
              <div className="consultas-lista">
                {profissional.consultasRecentes.map(consulta => (
                  <div key={consulta.id} className="consulta-item">
                    <div className="consulta-paciente">{consulta.paciente}</div>
                    <div className="consulta-tutor">Tutor: {consulta.tutor}</div>
                    <div className="consulta-detalhes">
                      <span className="consulta-data">{consulta.dataHora}</span>
                      <span className={`badge-consulta badge-${consulta.tipo.toLowerCase()}`}>
                        {consulta.tipo}
                      </span>
                      <span className="badge-status-consulta badge-confirmado">
                        {consulta.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* coluna direita */}
          <div className="perfil-coluna-direita">
            {/* informacoes de contato */}
            <div className="perfil-secao">
              <div className="secao-header">
                <h3 className="secao-titulo">INFORMAÇÕES DE CONTATO</h3>
              </div>
              <div className="contato-info">
                <div className="contato-item">
                  <span className="contato-label">EMAIL:</span>
                  <span className="contato-value">{profissional.email}</span>
                </div>
                <div className="contato-item">
                  <span className="contato-label">TELEFONE:</span>
                  <span className="contato-value">{profissional.telefone}</span>
                </div>
                <div className="contato-item">
                  <span className="contato-label">LOCALIZAÇÃO:</span>
                  <span className="contato-value">{profissional.localizacao}</span>
                </div>
              </div>
            </div>

            {/* agenda semanal */}
            <div className="perfil-secao">
              <div className="secao-header">
                <h3 className="secao-titulo">AGENDA SEMANAL</h3>
              </div>
              <div className="agenda-lista">
                {Object.entries(profissional.agenda).map(([dia, horario]) => (
                  <div key={dia} className="agenda-item">
                    <span className="agenda-dia">{dia.toUpperCase()}:</span>
                    <span className="agenda-horario">{horario}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* acoes rapidas */}
            <div className="perfil-secao">
              <div className="secao-header">
                <h3 className="secao-titulo">AÇÕES RÁPIDAS</h3>
              </div>
              <div className="acoes-rapidas">
                <button className="btn-acao-rapida btn-purple">
                  <i className="bi bi-calendar-check"></i>
                  VER AGENDA COMPLETA
                </button>
                <button className="btn-acao-rapida btn-orange">
                  <i className="bi bi-star"></i>
                  VER AVALIAÇÕES
                </button>
                <button className="btn-acao-rapida btn-default">
                  <i className="bi bi-graph-up"></i>
                  RELATÓRIO DE DESEMPENHO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilProfissional;

