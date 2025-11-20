import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Agendamentos.css';
import iconeVoltar from '../assets/iconeVoltar.png';
import iconeCalendario from '../assets/iconeCalendario.png';
import iconCloack from '../assets/iconCloack.png';
import check from '../assets/check.png';
import X from '../assets/X.png';
import Nurse from '../assets/Nurse.png';
import iconeCalendarioPreto from '../assets/iconeCalendarioPreto.png';
import iconeCoracaoPreto from '../assets/iconeCoracaoPreto.png';
import iconSearch from '../assets/iconSearch.png';
import Book from '../assets/Book.png';

const Agendamentos = () => {
  const [activeTab, setActiveTab] = useState('proximos');

  const agendamentos = {
    proximos: [
      {
        id: 1,
        veterinario: 'Dr. Ana Paula Silva',
        especialidade: 'Clínica Geral',
        hora: '14:00',
        data: '27 de outubro de 2025',
        pet: 'Rex (Cachorro)',
        tipo: 'Consulta Geral',
        preco: 'R$ 150',
        status: 'agendado',
        tags: ['Agendado', 'Teleatendimento']
      }
    ],
    concluidos: [
      {
        id: 2,
        veterinario: 'Dr. Ana Paula Silva',
        especialidade: 'Clínica Geral',
        hora: '14:30',
        data: '23 de outubro de 2025',
        pet: 'Rex (Cachorro)',
        tipo: 'Consulta Geral',
        preco: 'R$ 150',
        status: 'concluido',
        tags: ['Concluído', 'Teleatendimento']
      }
    ],
    cancelados: [
      {
        id: 3,
        veterinario: 'Dr. Ana Paula Silva',
        especialidade: 'Clínica Geral',
        hora: '11:30',
        data: '27 de outubro de 2025',
        pet: 'Rex (Cachorro)',
        tipo: 'Consulta Geral',
        preco: 'R$ 150',
        status: 'cancelado',
        tags: ['Cancelado', 'Teleatendimento']
      }
    ]
  };

  const getAgendamentosAtivos = () => {
    return agendamentos[activeTab] || [];
  };

  return (
    <section className="agendamentos-page">
      <div className="agendamentos-container">
        <Link to="/perfil" className="btn-voltar-agendamentos">
          <img src={iconeVoltar} alt="Voltar" />
          <span>VOLTAR</span>
        </Link>

        <div className="agendamentos-header">
          <div className="agendamentos-title-wrapper">
            <img src={iconeCalendario} alt="Calendário" className="agendamentos-icon" />
            <div>
              <h1 className="agendamentos-title">Meus Agendamentos</h1>
              <p className="agendamentos-subtitle">Acompanhe todas as suas consultas veterinárias</p>
            </div>
          </div>
        </div>

        <div className="agendamentos-tabs">
          <button
            className={`agendamento-tab ${activeTab === 'proximos' ? 'active' : ''}`}
            onClick={() => setActiveTab('proximos')}
            data-tab="proximos"
          >
            <div className="tab-content">
              <span className="tab-label">Próximos</span>
              <span className="tab-count">{agendamentos.proximos.length}</span>
            </div>
            <div className="tab-icon proximos-icon">
              <img src={iconCloack} alt="Relógio" />
            </div>
          </button>
          <button
            className={`agendamento-tab ${activeTab === 'concluidos' ? 'active' : ''}`}
            onClick={() => setActiveTab('concluidos')}
            data-tab="concluidos"
          >
            <div className="tab-content">
              <span className="tab-label">Concluídos</span>
              <span className="tab-count">{agendamentos.concluidos.length}</span>
            </div>
            <div className="tab-icon concluidos-icon">
              <img src={check} alt="Check" />
            </div>
          </button>
          <button
            className={`agendamento-tab ${activeTab === 'cancelados' ? 'active' : ''}`}
            onClick={() => setActiveTab('cancelados')}
            data-tab="cancelados"
          >
            <div className="tab-content">
              <span className="tab-label">Cancelados</span>
              <span className="tab-count">{agendamentos.cancelados.length}</span>
            </div>
            <div className="tab-icon cancelados-icon">
              <img src={X} alt="X" />
            </div>
          </button>
        </div>

        <div className="agendamentos-list">
          {getAgendamentosAtivos().map(agendamento => (
            <div key={agendamento.id} className={`agendamento-card ${agendamento.status}`} data-status={activeTab}>
              <div className="agendamento-icon-left">
                <img src={Nurse} alt="Estetoscópio" />
              </div>
              <div className="agendamento-content">
                <div className="agendamento-header">
                  <div className="agendamento-info">
                    <h3 className="agendamento-veterinario">{agendamento.veterinario}</h3>
                    <p className="agendamento-especialidade">{agendamento.especialidade}</p>
                  </div>
                  <div className="agendamento-hora">
                    <img src={iconCloack} alt="Horário" />
                    <span>{agendamento.hora}</span>
                  </div>
                </div>
                <div className="agendamento-details">
                  <div className="agendamento-detail-item">
                    <img src={iconeCalendarioPreto} alt="Data" />
                    <span>{agendamento.data}</span>
                  </div>
                  <div className="agendamento-detail-item">
                    <img src={iconeCoracaoPreto} alt="Pet" />
                    <span>{agendamento.pet}</span>
                  </div>
                  <div className="agendamento-detail-item">
                    <span className="agendamento-tipo">{agendamento.tipo}</span>
                    <span className="agendamento-preco">• {agendamento.preco}</span>
                  </div>
                </div>
                <div className="agendamento-tags-wrapper">
                  <div className="agendamento-tags">
                    {agendamento.tags.map((tag, index) => (
                      <span key={index} className={`tag-${tag.toLowerCase().replace('í', 'i')}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="agendamento-actions">
                    {agendamento.status === 'agendado' && (
                      <button className="btn-entrar">
                        <img src={iconSearch} alt="Entrar" />
                        <span>Entrar</span>
                      </button>
                    )}
                    <button className="btn-detalhes">
                      <img src={Book} alt="Detalhes" />
                      <span>Detalhes</span>
                    </button>
                    <button className="btn-menu-options">
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Agendamentos;

