import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './ProfissionaisClinica.css';

const ProfissionaisClinica = () => {
  const navigate = useNavigate();

  // Marcar contexto de clínica ao entrar nesta página
  useEffect(() => {
    sessionStorage.setItem('contexto_clinica', 'true');
  }, []);

  const profissionais = [
    {
      id: 1,
      nome: 'DR. LAURA CARVALHO',
      especialidade: 'CARDIOLOGIA',
      especies: 'FELINOS E CANINOS',
      horarios: '9H - 15H59',
      foto: '/drAnaPaula.png', // placeholder - trocar depois pela foto correta
      cor: 'purple'
    },
    {
      id: 2,
      nome: 'DR. CARLOS EDUARDO SANTOS',
      especialidade: 'GERAL',
      especies: 'FELINOS E CANINOS',
      horarios: '7H - 17H',
      foto: '/drCarlos.png', // placeholder - trocar depois pela foto correta
      cor: 'orange'
    }
  ];

  const metrics = {
    total: 2,
    especialidades: 2,
    horas: '16H'
  };

  return (
    <section className="profissionais-clinica-page">
      <div className="profissionais-clinica-container">
        {/* header */}
        <div className="profissionais-header">
          <div>
            <h1 className="profissionais-titulo">NOSSOS PROFISSIONAIS</h1>
            <p className="profissionais-subtitulo">
              CONHEÇA NOSSA EQUIPE DE ESPECIALISTAS DEDICADOS AO CUIDADO ANIMAL
            </p>
          </div>
        </div>

        {/* cards de metricas */}
        <div className="profissionais-metrics-grid">
          <div className="metric-card-profissionais metric-purple">
            <div className="metric-icon-wrapper">
              <i className="bi bi-heart-pulse"></i>
            </div>
            <div className="metric-content">
              <div className="metric-value-profissionais">{metrics.total}</div>
              <div className="metric-label-profissionais">TOTAL DE PROFISSIONAIS</div>
            </div>
          </div>

          <div className="metric-card-profissionais metric-orange">
            <div className="metric-icon-wrapper">
              <i className="bi bi-heart"></i>
            </div>
            <div className="metric-content">
              <div className="metric-value-profissionais">{metrics.especialidades}</div>
              <div className="metric-label-profissionais">ESPECIALIDADES</div>
            </div>
          </div>

          <div className="metric-card-profissionais metric-green">
            <div className="metric-icon-wrapper">
              <i className="bi bi-clock"></i>
            </div>
            <div className="metric-content">
              <div className="metric-value-profissionais">{metrics.horas}</div>
              <div className="metric-label-profissionais">HORAS DISPONÍVEIS</div>
            </div>
          </div>
        </div>

        {/* cards de profissionais */}
        <div className="profissionais-grid">
          {profissionais.map(prof => (
            <div key={prof.id} className={`profissional-card profissional-${prof.cor}`}>
              <div className="profissional-foto-wrapper">
                <img src={prof.foto} alt={prof.nome} className="profissional-foto" />
              </div>
              <h3 className="profissional-nome">{prof.nome}</h3>
              <button className={`badge-especialidade badge-${prof.cor}`}>
                <i className="bi bi-heart-pulse"></i>
                {prof.especialidade}
              </button>
              
              <div className="profissional-info">
                <div className={`info-item info-${prof.cor}`}>
                  <i className="bi bi-paw-fill"></i>
                  <div>
                    <span className="info-label">ESPÉCIES</span>
                    <span className="info-value">{prof.especies}</span>
                  </div>
                </div>
                
                <div className={`info-item info-${prof.cor}`}>
                  <i className="bi bi-clock"></i>
                  <div>
                    <span className="info-label">HORÁRIOS</span>
                    <span className="info-value">{prof.horarios}</span>
                  </div>
                </div>
              </div>

              <Link to={`/perfil-profissional/${prof.id}`} className={`btn-perfil btn-perfil-${prof.cor}`}>
                <i className="bi bi-file-earmark-text"></i>
                PERFIL
              </Link>
            </div>
          ))}
        </div>

        {/* secao de expandir equipe */}
        <div className="expandir-equipe-section">
          <div className="expandir-equipe-content">
            <div className="expandir-equipe-icon">
              <i className="bi bi-heart-pulse"></i>
            </div>
            <div className="expandir-equipe-text">
              <h3 className="expandir-equipe-titulo">AMPLIE SUA EQUIPE DE ESPECIALISTAS</h3>
              <p className="expandir-equipe-descricao">
                ADICIONE NOVOS PROFISSIONAIS E ESPECIALIDADES PARA MELHOR ATENDER SEUS PACIENTES
              </p>
            </div>
            <button 
              className="btn-adicionar-profissionais"
              onClick={() => navigate('/cadastrar-profissional')}
            >
              <i className="bi bi-person-plus"></i>
              + ADICIONAR PROFISSIONAIS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfissionaisClinica;

