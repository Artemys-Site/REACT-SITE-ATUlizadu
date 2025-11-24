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

  const financialMetrics = {
    receita: {
      value: 'R$ 378,5K',
      label: 'RECEITA TOTAL',
      trend: '+28.5% VS MÊS ANTERIOR',
      color: 'green',
      icon: 'graph-up-arrow'
    },
    despesas: {
      value: 'R$ 168K',
      label: 'DESPESAS TOTAIS',
      trend: '+6.3% VS MÊS ANTERIOR',
      color: 'orange',
      icon: 'graph-down-arrow'
    },
    lucro: {
      value: 'R$ 210,5K',
      label: 'LUCRO LÍQUIDO',
      trend: '+43.8% VS MÊS ANTERIOR',
      color: 'purple',
      icon: 'lightning-charge'
    }
  };

  const receitaEspecialidades = [
    { nome: 'CIRURGIA GERAL', valor: 150000 },
    { nome: 'CARDIOLOGIA', valor: 120000 },
    { nome: 'ORTOPEDIA', valor: 80000 },
    { nome: 'DERMATOLOGIA', valor: 60000 },
    { nome: 'CLÍNICA GERAL', valor: 50000 }
  ];

  const maxReceita = Math.max(...receitaEspecialidades.map(e => e.valor));

  // Dados para análise de equipe
  const veterinarios = [
    {
      nome: 'DR. CARLOS',
      atendimentos: 85,
      satisfacao: 95,
      receita: 90,
      taxaRetorno: 75,
      color: '#7A2FF5'
    },
    {
      nome: 'DR. PEDRO',
      atendimentos: 70,
      satisfacao: 88,
      receita: 75,
      taxaRetorno: 80,
      color: '#28A745'
    },
    {
      nome: 'DRA. ANA',
      atendimentos: 95,
      satisfacao: 92,
      receita: 85,
      taxaRetorno: 88,
      color: '#FF6B35'
    }
  ];

  const atendimentosEspecialidades = [
    { nome: 'CIRURGIA GERAL', valor: 180 },
    { nome: 'CARDIOLOGIA', valor: 150 },
    { nome: 'ORTOPEDIA', valor: 120 },
    { nome: 'DERMATOLOGIA', valor: 100 },
    { nome: 'CLÍNICA GERAL', valor: 90 }
  ];

  const maxAtendimentos = Math.max(...atendimentosEspecialidades.map(e => e.valor));

  // Dados para Performance Financeira (6 meses)
  const performanceFinanceira = [
    { mes: 'JAN', faturamento: 280000, despesas: 140000, lucro: 140000, meta: 300000 },
    { mes: 'FEV', faturamento: 295000, despesas: 145000, lucro: 150000, meta: 300000 },
    { mes: 'MAR', faturamento: 310000, despesas: 150000, lucro: 160000, meta: 320000 },
    { mes: 'ABR', faturamento: 330000, despesas: 155000, lucro: 175000, meta: 330000 },
    { mes: 'MAI', faturamento: 350000, despesas: 160000, lucro: 190000, meta: 350000 },
    { mes: 'JUN', faturamento: 378500, despesas: 168000, lucro: 210500, meta: 380000 }
  ];

  const maxFinanceiro = Math.max(...performanceFinanceira.map(p => p.faturamento), ...performanceFinanceira.map(p => p.meta));

  // Dados para Ocupação por Horário
  const ocupacaoHorario = [
    { hora: '08:00', ocupacao: 25 },
    { hora: '09:00', ocupacao: 40 },
    { hora: '10:00', ocupacao: 60 },
    { hora: '11:00', ocupacao: 85 },
    { hora: '12:00', ocupacao: 30 },
    { hora: '14:00', ocupacao: 70 },
    { hora: '15:00', ocupacao: 90 },
    { hora: '16:00', ocupacao: 75 },
    { hora: '17:00', ocupacao: 50 },
    { hora: '18:00', ocupacao: 30 }
  ];

  const maxOcupacao = Math.max(...ocupacaoHorario.map(o => o.ocupacao));

  // Dados para Performance por Departamento
  const departamentos = [
    {
      nome: 'CIRURGIA',
      profissionais: 3,
      atendimentos: 245,
      receita: 185000,
      satisfacao: 97.8
    },
    {
      nome: 'CLÍNICA',
      profissionais: 4,
      atendimentos: 412,
      receita: 165000,
      satisfacao: 96.2
    },
    {
      nome: 'DIAGNÓSTICO',
      profissionais: 2,
      atendimentos: 178,
      receita: 98000,
      satisfacao: 98.5
    },
    {
      nome: 'EMERGÊNCIA',
      profissionais: 5,
      atendimentos: 567,
      receita: 245000,
      satisfacao: 94.8
    }
  ];

  // Métricas operacionais
  const metricasOperacionais = {
    tempoMedio: {
      value: '38MIN',
      label: 'TEMPO MÉDIO DE ATENDIMENTO',
      trend: '-7MIN VS MÊS ANTERIOR',
      color: 'orange',
      icon: 'clock'
    },
    taxaOcupacao: {
      value: '84.5%',
      label: 'OCUPAÇÃO MÉDIA',
      trend: '+7.3% VS MÊS ANTERIOR',
      color: 'purple',
      icon: 'target'
    },
    taxaSucesso: {
      value: '97.1%',
      label: 'TAXA DE SUCESSO',
      trend: '+4.2% VS MÊS ANTERIOR',
      color: 'green',
      icon: 'check-circle'
    },
    totalAtendimentos: {
      value: '827',
      label: 'TOTAL ATENDIMENTOS',
      trend: '+22.4% VS MÊS ANTERIOR',
      color: 'purple',
      icon: 'calendar-check'
    }
  };

  // Função auxiliar para calcular pontos do radar chart
  const calcularPontosRadar = (vet) => {
    const pontos = [
      { angle: -90, value: vet.atendimentos }, // Topo - ATENDIMENTOS
      { angle: 0, value: vet.receita }, // Direita - RECEITA
      { angle: 90, value: vet.taxaRetorno }, // Baixo - TAXA RETORNO
      { angle: 180, value: vet.satisfacao } // Esquerda - SATISFAÇÃO
    ];
    return pontos.map(p => {
      const rad = (p.angle * Math.PI) / 180;
      const radius = (p.value / 100) * 150;
      return `${200 + radius * Math.cos(rad)},${200 + radius * Math.sin(rad)}`;
    }).join(' ');
  };

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
            <i className="bi bi-bar-chart"></i>
            VISÃO GERAL
          </button>
          <button
            className={`relatorio-tab ${activeTab === 'financeiro' ? 'active' : ''}`}
            onClick={() => setActiveTab('financeiro')}
          >
            <i className="bi bi-currency-dollar"></i>
            FINANCEIRO
          </button>
          <button
            className={`relatorio-tab ${activeTab === 'equipe' ? 'active' : ''}`}
            onClick={() => setActiveTab('equipe')}
          >
            <i className="bi bi-people"></i>
            EQUIPE
          </button>
          <button
            className={`relatorio-tab ${activeTab === 'operacional' ? 'active' : ''}`}
            onClick={() => setActiveTab('operacional')}
          >
            <i className="bi bi-graph-up"></i>
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
              <div className="performance-financeira-chart">
                <svg viewBox="0 0 800 350" className="financeira-svg">
                  {/* Grade de fundo */}
                  {[0, 25, 50, 75, 100].map((val, i) => (
                    <g key={i}>
                      <line
                        x1="60"
                        y1={50 + (val / 100) * 250}
                        x2="760"
                        y2={50 + (val / 100) * 250}
                        stroke="#E6DFFF"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                      <text
                        x="50"
                        y={50 + (val / 100) * 250 + 5}
                        fontSize="10"
                        fill="#999"
                        textAnchor="end"
                      >
                        {Math.round((maxFinanceiro * val) / 100000)}
                      </text>
                    </g>
                  ))}

                  {/* Barras de Despesas */}
                  {performanceFinanceira.map((item, index) => {
                    const x = 100 + (index * 110);
                    const alturaDespesas = (item.despesas / maxFinanceiro) * 250;
                    return (
                      <g key={`despesas-${index}`}>
                        <rect
                          x={x - 15}
                          y={300 - alturaDespesas}
                          width="30"
                          height={alturaDespesas}
                          fill="#DC3545"
                          rx="4"
                        />
                      </g>
                    );
                  })}

                  {/* Área de Faturamento */}
                  <path
                    d={`M ${performanceFinanceira.map((item, index) => {
                      const x = 100 + (index * 110);
                      const y = 300 - (item.faturamento / maxFinanceiro) * 250;
                      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')} L ${100 + ((performanceFinanceira.length - 1) * 110)} 300 L 100 300 Z`}
                    fill="#7A2FF5"
                    fillOpacity="0.2"
                  />

                  {/* Linha de Faturamento */}
                  <polyline
                    points={performanceFinanceira.map((item, index) => {
                      const x = 100 + (index * 110);
                      const y = 300 - (item.faturamento / maxFinanceiro) * 250;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#7A2FF5"
                    strokeWidth="3"
                  />

                  {/* Pontos de Faturamento */}
                  {performanceFinanceira.map((item, index) => {
                    const x = 100 + (index * 110);
                    const y = 300 - (item.faturamento / maxFinanceiro) * 250;
                    return (
                      <circle
                        key={`faturamento-${index}`}
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#FF6B35"
                      />
                    );
                  })}

                  {/* Área de Lucro */}
                  <path
                    d={`M ${performanceFinanceira.map((item, index) => {
                      const x = 100 + (index * 110);
                      const y = 300 - (item.lucro / maxFinanceiro) * 250;
                      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')} L ${100 + ((performanceFinanceira.length - 1) * 110)} 300 L 100 300 Z`}
                    fill="#28A745"
                    fillOpacity="0.2"
                  />

                  {/* Linha de Lucro */}
                  <polyline
                    points={performanceFinanceira.map((item, index) => {
                      const x = 100 + (index * 110);
                      const y = 300 - (item.lucro / maxFinanceiro) * 250;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#28A745"
                    strokeWidth="3"
                  />

                  {/* Linha pontilhada de Meta */}
                  <polyline
                    points={performanceFinanceira.map((item, index) => {
                      const x = 100 + (index * 110);
                      const y = 300 - (item.meta / maxFinanceiro) * 250;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#FF6B35"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />

                  {/* Labels dos meses */}
                  {performanceFinanceira.map((item, index) => {
                    const x = 100 + (index * 110);
                    return (
                      <text
                        key={`mes-${index}`}
                        x={x}
                        y={330}
                        fontSize="12"
                        fill="#666"
                        textAnchor="middle"
                        fontWeight="600"
                      >
                        {item.mes}
                      </text>
                    );
                  })}

                  {/* Legenda */}
                  <g transform="translate(620, 20)">
                    <rect x="0" y="0" width="15" height="15" fill="#7A2FF5" rx="2"/>
                    <text x="20" y="12" fontSize="11" fill="#666">Faturamento</text>
                    
                    <rect x="0" y="25" width="15" height="15" fill="#28A745" rx="2"/>
                    <text x="20" y="37" fontSize="11" fill="#666">Lucro</text>
                    
                    <rect x="0" y="50" width="15" height="15" fill="#DC3545" rx="2"/>
                    <text x="20" y="62" fontSize="11" fill="#666">Despesas</text>
                    
                    <line x1="0" y1="72" x2="15" y2="72" stroke="#FF6B35" strokeWidth="2" strokeDasharray="3,3"/>
                    <text x="20" y="77" fontSize="11" fill="#666">Meta</text>
                  </g>
                </svg>
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
                <div className="pie-chart-container">
                  <svg viewBox="0 0 200 200" className="pie-chart-svg">
                    <defs>
                      {especies.map((esp, i) => (
                        <filter key={i} id={`shadow-${i}`}>
                          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                        </filter>
                      ))}
                    </defs>
                    
                    {(() => {
                      let currentAngle = -90;
                      const centerX = 100;
                      const centerY = 100;
                      const radius = 80;
                      
                      return especies.map((especie, index) => {
                        const angle = (especie.percentual / 100) * 360;
                        const startAngle = currentAngle;
                        const endAngle = currentAngle + angle;
                        
                        const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
                        const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
                        const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
                        const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
                        
                        const largeArc = angle > 180 ? 1 : 0;
                        
                        const pathData = [
                          `M ${centerX} ${centerY}`,
                          `L ${x1} ${y1}`,
                          `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                          'Z'
                        ].join(' ');
                        
                        currentAngle += angle;
                        
                        return (
                          <path
                            key={index}
                            d={pathData}
                            fill={especie.color}
                            filter={`url(#shadow-${index})`}
                            stroke="#FFFFFF"
                            strokeWidth="2"
                          />
                        );
                      });
                    })()}
                    
                    {/* Texto central com total */}
                    <circle cx="100" cy="100" r="50" fill="#FFFFFF"/>
                    <text x="100" y="95" textAnchor="middle" fontSize="16" fontWeight="700" fill="#3B2561" fontFamily="Ysabeau SC">
                      TOTAL
                    </text>
                    <text x="100" y="115" textAnchor="middle" fontSize="14" fontWeight="600" fill="#666">
                      {especies.reduce((sum, e) => sum + e.percentual, 0).toFixed(1)}%
                    </text>
                  </svg>
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
                <div className="ocupacao-chart-container">
                  <svg viewBox="0 0 600 200" className="ocupacao-chart-svg">
                    {/* Grade horizontal */}
                    {[0, 25, 50, 75, 100].map((val, i) => (
                      <g key={i}>
                        <line
                          x1="50"
                          y1={20 + (val / 100) * 140}
                          x2="550"
                          y2={20 + (val / 100) * 140}
                          stroke="#E6DFFF"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                        />
                        <text
                          x="45"
                          y={20 + (val / 100) * 140 + 4}
                          fontSize="10"
                          fill="#999"
                          textAnchor="end"
                        >
                          {val}%
                        </text>
                      </g>
                    ))}

                    {/* Área preenchida */}
                    <path
                      d={`M ${ocupacaoHorario.map((item, index) => {
                        const x = 70 + (index * 50);
                        const y = 160 - (item.ocupacao / maxOcupacao) * 140;
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')} L ${70 + ((ocupacaoHorario.length - 1) * 50)} 160 L 70 160 Z`}
                      fill="url(#gradient-ocupacao)"
                      opacity="0.3"
                    />

                    {/* Linha */}
                    <polyline
                      points={ocupacaoHorario.map((item, index) => {
                        const x = 70 + (index * 50);
                        const y = 160 - (item.ocupacao / maxOcupacao) * 140;
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#28A745"
                      strokeWidth="3"
                    />

                    {/* Pontos */}
                    {ocupacaoHorario.map((item, index) => {
                      const x = 70 + (index * 50);
                      const y = 160 - (item.ocupacao / maxOcupacao) * 140;
                      return (
                        <g key={index}>
                          <circle
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#FFFFFF"
                            stroke="#28A745"
                            strokeWidth="2"
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r="2"
                            fill="#28A745"
                          />
                        </g>
                      );
                    })}

                    {/* Labels das horas */}
                    {ocupacaoHorario.map((item, index) => {
                      const x = 70 + (index * 50);
                      return (
                        <text
                          key={`hora-${index}`}
                          x={x}
                          y={185}
                          fontSize="10"
                          fill="#666"
                          textAnchor="middle"
                          fontWeight="600"
                        >
                          {item.hora}
                        </text>
                      );
                    })}

                    {/* Gradiente */}
                    <defs>
                      <linearGradient id="gradient-ocupacao" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#28A745" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#28A745" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                  </svg>
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
            {/* Cards de KPIs Financeiros */}
            <div className="relatorios-metrics-grid financeiro-metrics-grid">
              <div className={`relatorio-metric-card metric-${financialMetrics.receita.color}`}>
                <div className="relatorio-metric-icon-wrapper">
                  <i className="bi bi-graph-up"></i>
                </div>
                <div className="relatorio-metric-content">
                  <div className="relatorio-metric-label">{financialMetrics.receita.label}</div>
                  <div className="relatorio-metric-value">{financialMetrics.receita.value}</div>
                  <div className="relatorio-metric-trend">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    {financialMetrics.receita.trend}
                  </div>
                </div>
              </div>

              <div className={`relatorio-metric-card metric-${financialMetrics.despesas.color}`}>
                <div className="relatorio-metric-icon-wrapper">
                  <i className="bi bi-graph-down"></i>
                </div>
                <div className="relatorio-metric-content">
                  <div className="relatorio-metric-label">{financialMetrics.despesas.label}</div>
                  <div className="relatorio-metric-value">{financialMetrics.despesas.value}</div>
                  <div className="relatorio-metric-trend" style={{ color: '#FF6B35' }}>
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    {financialMetrics.despesas.trend}
                  </div>
                </div>
              </div>

              <div className={`relatorio-metric-card metric-${financialMetrics.lucro.color}`}>
                <div className="relatorio-metric-icon-wrapper">
                  <i className="bi bi-lightning-fill"></i>
                </div>
                <div className="relatorio-metric-content">
                  <div className="relatorio-metric-label">{financialMetrics.lucro.label}</div>
                  <div className="relatorio-metric-value">{financialMetrics.lucro.value}</div>
                  <div className="relatorio-metric-trend">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    {financialMetrics.lucro.trend}
                  </div>
                </div>
              </div>
            </div>

            {/* Gráfico de Receita por Especialidade */}
            <div className="relatorio-section-card">
              <div className="relatorio-chart-header">
                <div>
                  <h3 className="relatorio-section-title">
                    <i className="bi bi-heart-pulse"></i>
                    RECEITA POR ESPECIALIDADE
                  </h3>
                  <p className="relatorio-section-subtitle">
                    COMPARATIVO ENTRE ÁREAS DA CLÍNICA
                  </p>
                </div>
              </div>
              <div className="especialidades-chart">
                {receitaEspecialidades.map((especialidade, index) => {
                  const percentual = (especialidade.valor / maxReceita) * 100;
                  const valorFormatado = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    maximumFractionDigits: 0
                  }).format(especialidade.valor);
                  
                  return (
                    <div key={index} className="especialidade-bar-item">
                      <div className="especialidade-label">{especialidade.nome}</div>
                      <div className="especialidade-bar-container">
                        <div 
                          className="especialidade-bar" 
                          style={{ width: `${percentual}%` }}
                        ></div>
                      </div>
                      <div className="especialidade-value">{valorFormatado}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'equipe' && (
          <div className="relatorios-content">
            {/* Análise Comparativa de Performance */}
            <div className="relatorio-section-card">
              <h3 className="relatorio-section-title">
                ANÁLISE COMPARATIVA DE PERFORMANCE
              </h3>
              <p className="relatorio-section-subtitle">
                COMPARAÇÃO MULTIDIMENSIONAL ENTRE VETERINÁRIOS
              </p>
              <div className="radar-chart-container">
                <svg className="radar-chart" viewBox="0 0 400 400">
                  {/* Círculos concêntricos */}
                  <circle cx="200" cy="200" r="150" fill="none" stroke="#E6DFFF" strokeWidth="1"/>
                  <circle cx="200" cy="200" r="112.5" fill="none" stroke="#E6DFFF" strokeWidth="1"/>
                  <circle cx="200" cy="200" r="75" fill="none" stroke="#E6DFFF" strokeWidth="1"/>
                  <circle cx="200" cy="200" r="37.5" fill="none" stroke="#E6DFFF" strokeWidth="1"/>
                  
                  {/* Linhas dos eixos */}
                  <line x1="200" y1="50" x2="200" y2="350" stroke="#E6DFFF" strokeWidth="1"/>
                  <line x1="50" y1="200" x2="350" y2="200" stroke="#E6DFFF" strokeWidth="1"/>
                  <line x1="200" y1="50" x2="125" y2="300" stroke="#E6DFFF" strokeWidth="1"/>
                  <line x1="200" y1="50" x2="275" y2="300" stroke="#E6DFFF" strokeWidth="1"/>
                  
                  {/* Labels dos eixos */}
                  <text x="200" y="35" textAnchor="middle" fontSize="12" fill="#666" fontWeight="600">ATENDIMENTOS</text>
                  <text x="200" y="375" textAnchor="middle" fontSize="12" fill="#666" fontWeight="600">TAXA RETORNO</text>
                  <text x="35" y="205" textAnchor="middle" fontSize="12" fill="#666" fontWeight="600">SATISFAÇÃO</text>
                  <text x="365" y="205" textAnchor="middle" fontSize="12" fill="#666" fontWeight="600">RECEITA</text>
                  
                  {/* Valores nos círculos */}
                  <text x="200" y="55" textAnchor="middle" fontSize="10" fill="#999">100</text>
                  <text x="200" y="120" textAnchor="middle" fontSize="10" fill="#999">75</text>
                  <text x="200" y="170" textAnchor="middle" fontSize="10" fill="#999">50</text>
                  <text x="200" y="225" textAnchor="middle" fontSize="10" fill="#999">25</text>
                  <text x="200" y="265" textAnchor="middle" fontSize="10" fill="#999">0</text>
                  
                  {/* Gráficos dos Veterinários */}
                  {veterinarios.map((vet, index) => (
                    <polygon
                      key={index}
                      points={calcularPontosRadar(vet)}
                      fill={vet.color}
                      fillOpacity="0.2"
                      stroke={vet.color}
                      strokeWidth="2"
                    />
                  ))}
                </svg>
                
                {/* Legenda */}
                <div className="radar-legend">
                  {veterinarios.map((vet, index) => (
                    <div key={index} className="radar-legend-item">
                      <div className="radar-legend-color" style={{ backgroundColor: vet.color }}></div>
                      <span className="radar-legend-name">{vet.nome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Atendimentos por Especialidade */}
            <div className="relatorio-section-card">
              <h3 className="relatorio-section-title">
                ATENDIMENTOS POR ESPECIALIDADE
              </h3>
              <p className="relatorio-section-subtitle">
                VOLUME DE ATENDIMENTOS POR ÁREA
              </p>
              <div className="atendimentos-chart">
                <div className="atendimentos-chart-bars">
                  {atendimentosEspecialidades.map((especialidade, index) => {
                    const alturaPercentual = (especialidade.valor / maxAtendimentos) * 100;
                    return (
                      <div key={index} className="atendimento-bar-item">
                        <div className="atendimento-bar-wrapper">
                          <div 
                            className="atendimento-bar" 
                            style={{ height: `${alturaPercentual}%` }}
                          >
                            <span className="atendimento-bar-value">{especialidade.valor}</span>
                          </div>
                        </div>
                        <div className="atendimento-bar-label">{especialidade.nome}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="atendimentos-chart-axis">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                  <span>150</span>
                  <span>200</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'operacional' && (
          <div className="relatorios-content">
            {/* Performance por Departamento */}
            <div className="relatorio-section-card">
              <h3 className="relatorio-section-title">
                PERFORMANCE POR DEPARTAMENTO
              </h3>
              <p className="relatorio-section-subtitle">
                ANÁLISE DETALHADA DE CADA ÁREA DA CLÍNICA
              </p>
              <div className="departamentos-table">
                <table className="operacional-table">
                  <thead>
                    <tr>
                      <th>DEPARTAMENTO</th>
                      <th>PROFISSIONAIS</th>
                      <th>ATENDIMENTOS</th>
                      <th>RECEITA</th>
                      <th>SATISFAÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departamentos.map((dept, index) => (
                      <tr key={index}>
                        <td>
                          <div className="departamento-cell">
                            <div className="departamento-icon">
                              <i className="bi bi-building"></i>
                            </div>
                            <span className="departamento-nome">{dept.nome}</span>
                          </div>
                        </td>
                        <td className="departamento-value">{dept.profissionais} PROFISSIONAIS</td>
                        <td className="departamento-value">{dept.atendimentos} ATENDIMENTOS</td>
                        <td className="departamento-value">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            maximumFractionDigits: 0
                          }).format(dept.receita)}
                        </td>
                        <td>
                          <div className="satisfacao-cell">
                            <span className="satisfacao-value">{dept.satisfacao}%</span>
                            <div className="satisfacao-bar">
                              <div 
                                className="satisfacao-bar-fill" 
                                style={{ width: `${dept.satisfacao}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cards de Métricas Operacionais */}
            <div className="relatorios-metrics-grid operacional-metrics-grid">
              <div className={`relatorio-metric-card metric-${metricasOperacionais.totalAtendimentos.color}`}>
                <div className="relatorio-metric-icon-wrapper">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <div className="relatorio-metric-content">
                  <div className="relatorio-metric-label">{metricasOperacionais.totalAtendimentos.label}</div>
                  <div className="relatorio-metric-value">{metricasOperacionais.totalAtendimentos.value}</div>
                  <div className="relatorio-metric-trend">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    {metricasOperacionais.totalAtendimentos.trend}
                  </div>
                </div>
              </div>

              <div className={`relatorio-metric-card metric-${metricasOperacionais.tempoMedio.color}`}>
                <div className="relatorio-metric-icon-wrapper">
                  <i className="bi bi-clock"></i>
                </div>
                <div className="relatorio-metric-content">
                  <div className="relatorio-metric-label">{metricasOperacionais.tempoMedio.label}</div>
                  <div className="relatorio-metric-value">{metricasOperacionais.tempoMedio.value}</div>
                  <div className="relatorio-metric-trend" style={{ color: '#DC3545' }}>
                    <i className="bi bi-arrow-down-circle-fill"></i>
                    {metricasOperacionais.tempoMedio.trend}
                  </div>
                </div>
              </div>

              <div className={`relatorio-metric-card metric-${metricasOperacionais.taxaSucesso.color}`}>
                <div className="relatorio-metric-icon-wrapper">
                  <i className="bi bi-check-circle"></i>
                </div>
                <div className="relatorio-metric-content">
                  <div className="relatorio-metric-label">{metricasOperacionais.taxaSucesso.label}</div>
                  <div className="relatorio-metric-value">{metricasOperacionais.taxaSucesso.value}</div>
                  <div className="relatorio-metric-trend">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    {metricasOperacionais.taxaSucesso.trend}
                  </div>
                </div>
              </div>

              <div className={`relatorio-metric-card metric-${metricasOperacionais.taxaOcupacao.color}`}>
                <div className="relatorio-metric-icon-wrapper">
                  <i className="bi bi-bullseye"></i>
                </div>
                <div className="relatorio-metric-content">
                  <div className="relatorio-metric-label">{metricasOperacionais.taxaOcupacao.label}</div>
                  <div className="relatorio-metric-value">{metricasOperacionais.taxaOcupacao.value}</div>
                  <div className="relatorio-metric-trend">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    {metricasOperacionais.taxaOcupacao.trend}
                  </div>
                </div>
              </div>
            </div>

            {/* Gráfico de Eficiência Operacional */}
            <div className="relatorio-section-card">
              <h3 className="relatorio-section-title">
                EFICIÊNCIA OPERACIONAL
              </h3>
              <p className="relatorio-section-subtitle">
                ANÁLISE DE DESEMPENHO E PRODUTIVIDADE
              </p>
              <div className="eficiencia-chart-container">
                <svg viewBox="0 0 800 300" className="eficiencia-chart-svg">
                  {/* Grade */}
                  {[0, 25, 50, 75, 100].map((val, i) => (
                    <g key={i}>
                      <line
                        x1="60"
                        y1={40 + (val / 100) * 220}
                        x2="760"
                        y2={40 + (val / 100) * 220}
                        stroke="#E6DFFF"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                      <text
                        x="50"
                        y={40 + (val / 100) * 220 + 5}
                        fontSize="10"
                        fill="#999"
                        textAnchor="end"
                      >
                        {val}%
                      </text>
                    </g>
                  ))}

                  {/* Barras de eficiência por departamento */}
                  {departamentos.map((dept, index) => {
                    const x = 100 + (index * 150);
                    const eficiencia = dept.satisfacao; // Usando satisfação como métrica de eficiência
                    const altura = (eficiencia / 100) * 220;
                    const larguraBarra = 80;
                    
                    return (
                      <g key={index}>
                        {/* Barra */}
                        <rect
                          x={x - larguraBarra / 2}
                          y={260 - altura}
                          width={larguraBarra}
                          height={altura}
                          fill={`url(#gradient-${index})`}
                          rx="4"
                        />
                        
                        {/* Valor no topo */}
                        <text
                          x={x}
                          y={260 - altura - 10}
                          fontSize="14"
                          fontWeight="700"
                          fill="#3B2561"
                          textAnchor="middle"
                          fontFamily="Ysabeau SC"
                        >
                          {eficiencia}%
                        </text>
                        
                        {/* Label do departamento */}
                        <text
                          x={x}
                          y={280}
                          fontSize="11"
                          fill="#666"
                          textAnchor="middle"
                          fontWeight="600"
                          fontFamily="Arial, sans-serif"
                        >
                          {dept.nome}
                        </text>
                      </g>
                    );
                  })}

                  {/* Gradientes */}
                  <defs>
                    {departamentos.map((_, index) => (
                      <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#7A2FF5" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#9D5FF5" stopOpacity="0.7" />
                      </linearGradient>
                    ))}
                  </defs>
                </svg>
              </div>
            </div>

            {/* Comparativo de Volume de Atendimentos */}
            <div className="relatorio-section-card">
              <h3 className="relatorio-section-title">
                COMPARATIVO DE VOLUME DE ATENDIMENTOS
              </h3>
              <p className="relatorio-section-subtitle">
                DISTRIBUIÇÃO POR DEPARTAMENTO
              </p>
              <div className="atendimentos-comparativo-chart">
                {departamentos.map((dept, index) => {
                  const maxAtendimentosDept = Math.max(...departamentos.map(d => d.atendimentos));
                  const percentual = (dept.atendimentos / maxAtendimentosDept) * 100;
                  
                  return (
                    <div key={index} className="atendimento-comparativo-item">
                      <div className="atendimento-comparativo-header">
                        <span className="atendimento-comparativo-nome">{dept.nome}</span>
                        <span className="atendimento-comparativo-valor">{dept.atendimentos}</span>
                      </div>
                      <div className="atendimento-comparativo-bar-container">
                        <div 
                          className="atendimento-comparativo-bar" 
                          style={{ width: `${percentual}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Relatorios;
