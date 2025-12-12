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
  const [modalDetalhes, setModalDetalhes] = useState(null);
  const [modalExcluir, setModalExcluir] = useState(null);

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
                    <button 
                      className="btn-detalhes"
                      onClick={() => setModalDetalhes(agendamento)}
                    >
                      <img src={Book} alt="Detalhes" />
                      <span>Detalhes</span>
                    </button>
                    {agendamento.status === 'agendado' && (
                      <button 
                        className="btn-cancelar"
                        onClick={() => setModalExcluir(agendamento)}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Detalhes da Consulta */}
      {modalDetalhes && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={() => setModalDetalhes(null)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              backgroundColor: '#7A2FF5',
              padding: '24px',
              borderRadius: '16px 16px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              zIndex: 1
            }}>
              <h2 style={{ color: 'white', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
                DETALHES DA CONSULTA
              </h2>
              <button
                onClick={() => setModalDetalhes(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '28px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ×
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', margin: '0 0 8px 0', color: '#1F2937' }}>
                  {modalDetalhes.veterinario}
                </h3>
                <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
                  {modalDetalhes.especialidade}
                </p>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Data</strong>
                  <p style={{ margin: 0, fontSize: '16px', color: '#1F2937' }}>{modalDetalhes.data}</p>
                </div>
                <div>
                  <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Horário</strong>
                  <p style={{ margin: 0, fontSize: '16px', color: '#1F2937' }}>{modalDetalhes.hora}</p>
                </div>
                <div>
                  <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Pet</strong>
                  <p style={{ margin: 0, fontSize: '16px', color: '#1F2937' }}>{modalDetalhes.pet}</p>
                </div>
                <div>
                  <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Tipo de Consulta</strong>
                  <p style={{ margin: 0, fontSize: '16px', color: '#1F2937' }}>{modalDetalhes.tipo}</p>
                </div>
                <div>
                  <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Valor</strong>
                  <p style={{ margin: 0, fontSize: '16px', color: '#1F2937' }}>{modalDetalhes.preco}</p>
                </div>
                <div>
                  <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Status</strong>
                  <p style={{ margin: 0, fontSize: '16px', color: '#1F2937', textTransform: 'capitalize' }}>{modalDetalhes.status}</p>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Tags</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {modalDetalhes.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: '#F8F6FD',
                        color: '#7A2FF5',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Excluir Consulta */}
      {modalExcluir && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={() => setModalExcluir(null)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '400px',
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
              padding: '24px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#1F2937' }}>
              Cancelar Consulta
            </h2>
            <p style={{ fontSize: '16px', color: '#6B7280', margin: '0 0 24px 0' }}>
              Tem certeza que deseja excluir a consulta com <strong>{modalExcluir.veterinario}</strong> agendada para <strong>{modalExcluir.data}</strong> às <strong>{modalExcluir.hora}</strong>?
            </p>
            <p style={{ fontSize: '14px', color: '#DC2626', margin: '0 0 24px 0', fontWeight: '500' }}>
              Esta ação não pode ser desfeita.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setModalExcluir(null)}
                style={{
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Aqui você pode adicionar a lógica para excluir a consulta
                  alert('Consulta excluída com sucesso!');
                  setModalExcluir(null);
                  // Recarregar lista de agendamentos
                }}
                style={{
                  backgroundColor: '#DC2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Agendamentos;

