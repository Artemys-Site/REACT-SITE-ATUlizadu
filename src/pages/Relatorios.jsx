import { useState } from 'react';
import { useEffect } from 'react';
import './Relatorios.css';

const Relatorios = () => {
  const [activeTab, setActiveTab] = useState('visao-geral');
  const [periodoFilter, setPeriodoFilter] = useState('ESTE MÊS');

  useEffect(() => {
    sessionStorage.setItem('contexto_clinica', 'true');
  }, []);

  const metrics = {
    faturamento: {
      value: 'R$ 378,5K',
      label: 'FATURAMENTO TOTAL',
      trend: '+28.5% VS MÊS ANTERIOR',
      color: 'purple',
      icon: 'currency-dollar'
    },
    atendimentos: {
      value: '827',
      label: 'ATENDIMENTOS',
      trend: '+22.4% VS MÊS ANTERIOR',
      color: 'orange',
      icon: 'heart-pulse'
    },
    pacientes: {
      value: '2,847',
      label: 'PACIENTES ATIVOS',
      trend: '+18.9% VS MÊS ANTERIOR',
      color: 'green',
      icon: 'people'
    },
    satisfacao: {
      value: '97.1%',
      label: 'SATISFAÇÃO MÉDIA',
      trend: '+4.2% VS MÊS ANTERIOR',
      color: 'purple',
      icon: 'heart'
    }
  };

  const topProcedimentos = [
    { id: 1, nome: 'CASTRAÇÃO', realizados: 189, duracao: '45MIN', receita: 'R$ 94.500' },
    { id: 2, nome: 'CONSULTA CARDIOLÓGICA', realizados: 234, duracao: '30MIN', receita: 'R$ 70.200' },
    { id: 3, nome: 'CIRURGIA ORTOPÉDICA', realizados: 78, duracao: '120MIN', receita: 'R$ 156.000' },
    { id: 4, nome: 'EXAME DERMATOLÓGICO', realizados: 156, duracao: '25MIN', receita: 'R$ 46.800' },
    { id: 5, nome: 'ULTRASSOM', realizados: 145, duracao: '40MIN', receita: 'R$ 58.000' },
    { id: 6, nome: 'VACINAÇÃO MÚLTIPLA', realizados: 567, duracao: '15MIN', receita: 'R$ 85.050' }
  ];

  const especies = [
    { nome: 'CÃES', percentual: 64.8, color: '#7A2FF5' },
    { nome: 'GATOS', percentual: 26.6, color: '#FF6B35' },
    { nome: 'AVES', percentual: 5.5, color: '#28A745' },
    { nome: 'OUTROS', percentual: 3.1, color: '#9D5FF5' }
  ];

  return (
    <section className="relatorios-page">
      <div className="relatorios-container">
        {/* Header */}
        <div className="relatorios-header">
          <div className="relatorios-header-content">
            <div>
              <h1 className="relatorios-titulo">RELATÓRIOS E ANÁLISES</h1>
              <p className="relatorios-subtitulo">
                DESEMPENHO COMPLETO DA CLÍNICA E INSIGHTS ESTRATÉGICOS
              </p>
            </div>
            <div className="relatorios-filters">
              <select
                className="relatorios-periodo-select"
                value={periodoFilter}
                onChange={(e) => setPeriodoFilter(e.target.value)}
              >
                <option value="ESTE MÊS">ESTE MÊS</option>
                <option value="ÚLTIMO MÊS">ÚLTIMO MÊS</option>
                <option value="ÚLTIMOS 3 MESES">ÚLTIMOS 3 MESES</option>
                <option value="ÚLTIMOS 6 MESES">ÚLTIMOS 6 MESES</option>
                <option value="ESTE ANO">ESTE ANO</option>
              </select>
              <button className="btn-exportar-relatorio">
                <i className="bi bi-download"></i>
                EXPORTAR
              </button>
            </div>
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="relatorios-metrics-grid">
          <div className={`relatorio-metric-card metric-${metrics.faturamento.color}`}>
            <div className="relatorio-metric-icon-wrapper">
              <i className="bi bi-currency-dollar"></i>
            </div>
            <div className="relatorio-metric-content">
              <div className="relatorio-metric-label">{metrics.faturamento.label}</div>
              <div className="relatorio-metric-value">{metrics.faturamento.value}</div>
              <div className="relatorio-metric-trend">
                <i className="bi bi-arrow-up-circle-fill"></i>
                {metrics.faturamento.trend}
              </div>
            </div>
          </div>

          <div className={`relatorio-metric-card metric-${metrics.atendimentos.color}`}>
            <div className="relatorio-metric-icon-wrapper">
              <i className="bi bi-heart-pulse"></i>
            </div>
            <div className="relatorio-metric-content">
              <div className="relatorio-metric-label">{metrics.atendimentos.label}</div>
              <div className="relatorio-metric-value">{metrics.atendimentos.value}</div>
              <div className="relatorio-metric-trend">
                <i className="bi bi-arrow-up-circle-fill"></i>
                {metrics.atendimentos.trend}
              </div>
            </div>
          </div>

          <div className={`relatorio-metric-card metric-${metrics.pacientes.color}`}>
            <div className="relatorio-metric-icon-wrapper">
              <i className="bi bi-people"></i>
            </div>
            <div className="relatorio-metric-content">
              <div className="relatorio-metric-label">{metrics.pacientes.label}</div>
              <div className="relatorio-metric-value">{metrics.pacientes.value}</div>
              <div className="relatorio-metric-trend">
                <i className="bi bi-arrow-up-circle-fill"></i>
                {metrics.pacientes.trend}
              </div>
            </div>
          </div>

          <div className={`relatorio-metric-card metric-${metrics.satisfacao.color}`}>
            <div className="relatorio-metric-icon-wrapper">
              <i className="bi bi-heart"></i>
            </div>
            <div className="relatorio-metric-content">
              <div className="relatorio-metric-label">{metrics.satisfacao.label}</div>
              <div className="relatorio-metric-value">{metrics.satisfacao.value}</div>
              <div className="relatorio-metric-trend">
                <i className="bi bi-arrow-up-circle-fill"></i>
                {metrics.satisfacao.trend}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de Navegação */}
        <div className="relatorios-tabs">
          <button
            className={`relatorio-tab ${activeTab === 'visao-geral' ? 'active' : ''}`}
            onClick={() => setActiveTab('visao-geral')}
          >
            VISÃO GERAL
          </button>
          <button
            className={`relatorio-tab ${activeTab === 'financeiro' ? 'active' : ''}`}
            onClick={() => setActiveTab('financeiro')}
          >
            $ FINANCEIRO
          </button>
          <button
            className={`relatorio-tab ${activeTab === 'equipe' ? 'active' : ''}`}
            onClick={() => setActiveTab('equipe')}
          >
            EQUIPE
          </button>
          <button
            className={`relatorio-tab ${activeTab === 'operacional' ? 'active' : ''}`}
            onClick={() => setActiveTab('operacional')}
          >
            OPERACIONAL
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'visao-geral' && (
          <div className="relatorios-content">
            {/* Performance Financeira */}
            <div className="relatorio-section-card">
              <h3 className="relatorio-section-title">
                PERFORMANCE FINANCEIRA
              </h3>
              <p className="relatorio-section-subtitle">
                FATURAMENTO, DESPESAS E LUCRO NOS ÚLTIMOS 6 MESES
              </p>
              <div className="chart-placeholder">
                <p>Gráfico de linhas </p>
              </div>
            </div>

            {/* Grid com 3 colunas */}
            <div className="relatorios-grid-3">
              {/* Distribuição de Pacientes */}
              <div className="relatorio-section-card">
                <h3 className="relatorio-section-title">
                  DISTRIBUIÇÃO DE PACIENTES
                </h3>
                <p className="relatorio-section-subtitle">
                  POR ESPÉCIE ANIMAL
                </p>
                <div className="especies-list">
                  {especies.map((especie, index) => (
                    <div key={index} className="especie-item">
                      <div className="especie-color-bar" style={{ backgroundColor: especie.color }}></div>
                      <div className="especie-info">
                        <span className="especie-nome">{especie.nome}</span>
                        <span className="especie-percentual">{especie.percentual}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chart-placeholder-small">
                  <p>Gráfico de Pizza</p>
                </div>
              </div>

              {/* Ocupação por Horário */}
              <div className="relatorio-section-card">
                <h3 className="relatorio-section-title">
                  OCUPAÇÃO POR HORÁRIO
                </h3>
                <p className="relatorio-section-subtitle">
                  DISTRIBUIÇÃO AO LONGO DO DIA
                </p>
                <div className="chart-placeholder-small">
                  <p>Gráfico de Linha</p>
                </div>
              </div>

              {/* Top Procedimentos */}
              <div className="relatorio-section-card">
                <h3 className="relatorio-section-title">
                  TOP PROCEDIMENTOS
                </h3>
                <p className="relatorio-section-subtitle">
                  MAIS REALIZADOS NO MÊS
                </p>
                <div className="procedimentos-list">
                  {topProcedimentos.map(proc => (
                    <div key={proc.id} className="procedimento-item">
                      <div className="procedimento-numero">{proc.id}</div>
                      <div className="procedimento-info">
                        <div className="procedimento-nome">{proc.nome}</div>
                        <div className="procedimento-detalhes">
                          {proc.realizados} REALIZADOS • {proc.duracao} • {proc.receita}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'financeiro' && (
          <div className="relatorios-content">
            <div className="relatorio-section-card">
              <h3 className="relatorio-section-title">ANÁLISE FINANCEIRA DETALHADA</h3>
              <p className="relatorio-section-subtitle">Conteúdo da aba financeiro será implementado</p>
            </div>
          </div>
        )}

        {activeTab === 'equipe' && (
          <div className="relatorios-content">
            <div className="relatorio-section-card">
              <h3 className="relatorio-section-title">ANÁLISE DE EQUIPE</h3>
              <p className="relatorio-section-subtitle">Conteúdo da aba equipe será implementado</p>
            </div>
          </div>
        )}

        {activeTab === 'operacional' && (
          <div className="relatorios-content">
            <div className="relatorio-section-card">
              <h3 className="relatorio-section-title">ANÁLISE OPERACIONAL</h3>
              <p className="relatorio-section-subtitle">Conteúdo da aba operacional será implementado</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Relatorios;
