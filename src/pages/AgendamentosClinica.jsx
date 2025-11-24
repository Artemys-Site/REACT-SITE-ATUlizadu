import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AgendamentosClinica.css';

const AgendamentosClinica = () => {
  const navigate = useNavigate();
  
  // Tratar erro do useAuth caso não esteja disponível
  let user = null;
  try {
    const auth = useAuth();
    user = auth.user;
  } catch (e) {
    // Se não tiver contexto, ignora - funciona em modo dev
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [tipoFilter, setTipoFilter] = useState('TODOS');

  // métricas
  const metrics = {
    total: 8,
    confirmadas: 5,
    pendentes: 2,
    canceladas: 1
  };

  // agendamentos - depois vem do backend
  const agendamentos = [
    {
      id: 1,
      paciente: 'BOB',
      tutor: 'MARCIA CAVALCANTE',
      profissional: 'CAMILA SILVA MENDONÇA',
      dataHora: '17/07 - 13H30',
      tipo: 'CONSULTA',
      status: 'CONFIRMADA'
    },
    {
      id: 2,
      paciente: 'LUNA',
      tutor: 'PEDRO SANTOS',
      profissional: 'CAMILA SILVA MENDONÇA',
      dataHora: '17/07 - 14H00',
      tipo: 'CONSULTA',
      status: 'CONFIRMADA'
    },
    {
      id: 3,
      paciente: 'MAX',
      tutor: 'ANA SILVA',
      profissional: 'ROBERTO ALVES',
      dataHora: '18/07 - 09H00',
      tipo: 'VACINA',
      status: 'PENDENTE'
    },
    {
      id: 4,
      paciente: 'MEL',
      tutor: 'CARLOS FERREIRA',
      profissional: 'CAMILA SILVA MENDONÇA',
      dataHora: '18/07 - 10H30',
      tipo: 'CONSULTA',
      status: 'CONFIRMADA'
    },
    {
      id: 5,
      paciente: 'THOR',
      tutor: 'JULIA MENDES',
      profissional: 'ROBERTO ALVES',
      dataHora: '18/07 - 11H00',
      tipo: 'CIRURGIA',
      status: 'CONFIRMADA'
    },
    {
      id: 6,
      paciente: 'NINA',
      tutor: 'RICARDO LIMA',
      profissional: 'PATRICIA COSTA',
      dataHora: '19/07 - 08H30',
      tipo: 'CONSULTA',
      status: 'PENDENTE'
    },
    {
      id: 7,
      paciente: 'PANDORA',
      tutor: 'MARIANA SOUZA',
      profissional: 'CAMILA SILVA MENDONÇA',
      dataHora: '19/07 - 14H30',
      tipo: 'RETORNO',
      status: 'CONFIRMADA'
    },
    {
      id: 8,
      paciente: 'ZEUS',
      tutor: 'FERNANDO OLIVEIRA',
      profissional: 'ROBERTO ALVES',
      dataHora: '20/07 - 09H30',
      tipo: 'CONSULTA',
      status: 'CANCELADA'
    }
  ];

  const tiposOptions = ['TODOS', 'CONSULTA', 'VACINA', 'CIRURGIA', 'RETORNO', 'EXAME'];
  const statusOptions = ['TODOS', 'CONFIRMADA', 'PENDENTE', 'CANCELADA'];

  // filtrar agendamentos
  const filteredAgendamentos = agendamentos.filter(ag => { //esse filteredAgendamentos filtra o que está no react, quando tiver banco de dados mude para o banco de dados
    const matchSearch = !searchTerm || 
      ag.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ag.tutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ag.profissional.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = statusFilter === 'TODOS' || ag.status === statusFilter;
    const matchTipo = tipoFilter === 'TODOS' || ag.tipo === tipoFilter;

    return matchSearch && matchStatus && matchTipo;
  });

  const getStatusClass = (status) => {
    switch(status) {
      case 'CONFIRMADA':
        return 'status-confirmada';
      case 'PENDENTE':
        return 'status-pendente';
      case 'CANCELADA':
        return 'status-cancelada';
      default:
        return '';
    }
  };

  return (
    <section className="agendamentos-clinica-page">
      <div className="agendamentos-clinica-container">
        {/* header */}
        <div className="agendamentos-clinica-header">
          <div>
            <h1 className="agendamentos-clinica-titulo">AGENDAMENTOS</h1>
            <p className="agendamentos-clinica-subtitulo">
              GERENCIE TODAS AS CONSULTAS E PROCEDIMENTOS
            </p>
          </div>
        </div>

        {/* cards de métricas */}
        <div className="agendamentos-metrics-grid">
          <div className="metric-card-agendamentos metric-purple">
            <div className="metric-icon-wrapper">
              <i className="bi bi-calendar-check"></i>
            </div>
            <div className="metric-content">
              <div className="metric-value-agendamentos">{metrics.total}</div>
              <div className="metric-label-agendamentos">TOTAL DE AGENDAMENTOS</div>
            </div>
          </div>

          <div className="metric-card-agendamentos metric-green">
            <div className="metric-icon-wrapper">
              <i className="bi bi-check-circle"></i>
            </div>
            <div className="metric-content">
              <div className="metric-value-agendamentos">{metrics.confirmadas}</div>
              <div className="metric-label-agendamentos">CONFIRMADAS</div>
            </div>
          </div>

          <div className="metric-card-agendamentos metric-orange">
            <div className="metric-icon-wrapper">
              <i className="bi bi-clock-history"></i>
            </div>
            <div className="metric-content">
              <div className="metric-value-agendamentos">{metrics.pendentes}</div>
              <div className="metric-label-agendamentos">PENDENTES</div>
            </div>
          </div>

          <div className="metric-card-agendamentos metric-red">
            <div className="metric-icon-wrapper">
              <i className="bi bi-x-circle"></i>
            </div>
            <div className="metric-content">
              <div className="metric-value-agendamentos">{metrics.canceladas}</div>
              <div className="metric-label-agendamentos">CANCELADAS</div>
            </div>
          </div>
        </div>

        {/* barra de busca e filtros */}
        <div className="agendamentos-filters-bar">
          <div className="search-input-wrapper">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              className="search-input"
              placeholder="BUSCAR POR PACIENTE, TUTOR OU PROFISSIONAL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            className="filter-select"
            value={tipoFilter}
            onChange={(e) => setTipoFilter(e.target.value)}
          >
            {tiposOptions.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>

          <Link 
            to="/novo-agendamento"
            className="btn-novo-agendamento"
          >
            <i className="bi bi-plus-circle"></i>
            + NOVO AGENDAMENTO
          </Link>
        </div>

        {/* tabela de agendamentos */}
        <div className="agendamentos-table-wrapper">
          <table className="agendamentos-table">
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
              {filteredAgendamentos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-results">
                    Nenhum agendamento encontrado
                  </td>
                </tr>
              ) : (
                filteredAgendamentos.map(ag => (
                  <tr key={ag.id}>
                    <td className="table-cell-paciente">{ag.paciente}</td>
                    <td className="table-cell-tutor">{ag.tutor}</td>
                    <td className="table-cell-profissional">{ag.profissional}</td>
                    <td className="table-cell-data">{ag.dataHora}</td>
                    <td>
                      <span className="badge-tipo">{ag.tipo}</span>
                    </td>
                    <td>
                      <span className={`badge-status ${getStatusClass(ag.status)}`}>
                        {ag.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AgendamentosClinica;

