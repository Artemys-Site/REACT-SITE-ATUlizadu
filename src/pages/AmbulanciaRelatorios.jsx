import React from "react";
import "./relatoriosAmbulancia.css";
import HeaderAmbulancia from "../components/HeaderAmbulancia";

const weeklyAppointments = [
  { label: "SEG", value: 14 },
  { label: "TER", value: 18 },
  { label: "QUA", value: 20 },
  { label: "QUI", value: 24 },
  { label: "SEX", value: 30 },
  { label: "SÁB", value: 16 },
  { label: "DOM", value: 12 },
];

const emergencyTypes = [
  { label: "Traumas", value: 38, color: "#7A2FF5" },
  { label: "Respiratórias", value: 27, color: "#F58634" },
  { label: "Convulsões", value: 18, color: "#10B981" },
  { label: "Cardíacas", value: 17, color: "#3B2561" },
];

const responseTrend = [
  { label: "Jan", value: 22 },
  { label: "Fev", value: 21 },
  { label: "Mar", value: 19 },
  { label: "Abr", value: 18 },
  { label: "Mai", value: 17 },
  { label: "Jun", value: 18 },
];

const distanceCoverage = [
  { label: "Zona Norte", value: 82 },
  { label: "Zona Sul", value: 65 },
  { label: "Zona Leste", value: 90 },
  { label: "Zona Oeste", value: 58 },
];

export default function Relatorios() {
  const maxWeeklyValue = Math.max(...weeklyAppointments.map((item) => item.value));

  const pieGradient = emergencyTypes.reduce((acc, curr, index) => {
    const previousValue = emergencyTypes
      .slice(0, index)
      .reduce((sum, item) => sum + item.value, 0);
    const start = previousValue;
    const end = previousValue + curr.value;
    return `${acc}, ${curr.color} ${start}% ${end}%`;
  }, "").slice(2);

  const lineMax = Math.max(...responseTrend.map((item) => item.value));
  const linePoints = responseTrend
    .map((item, index) => {
      const x = (index / (responseTrend.length - 1)) * 100;
      const y = 100 - (item.value / lineMax) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <>
      <HeaderAmbulancia />
      <div className="container-relatorios" style={{ marginTop: "80px" }}>
        <h2 className="titulo">RELATÓRIOS E ANÁLISES</h2>
        <p className="subtitulo">ACOMPANHE O DESEMPENHO DA SUA AMBULÂNCIA</p>

        <div className="cards-topo">
          <div className="card">
            <p className="label">N° de Atendimentos</p>
            <h1 className="valor">93</h1>
            <p className="comparativo">vs. Período Anterior</p>
            <div className="barra azul"></div>
          </div>

          <div className="card">
            <p className="label">Tempo Médio de Resposta</p>
            <h1 className="valor">18 MIN</h1>
            <p className="comparativo">Melhoria</p>
            <div className="barra laranja"></div>
          </div>

          <div className="card">
            <p className="label">Distância Total</p>
            <h1 className="valor">580KM</h1>
            <p className="comparativo">vs. Mês Anterior</p>
            <div className="barra verde"></div>
          </div>

          <div className="card">
            <p className="label">Avaliação Média</p>
            <h1 className="valor">4.8 ⭐</h1>
            <p className="comparativo">68 Avaliações</p>
            <div className="barra roxa"></div>
          </div>
        </div>

        <div className="grid">
          <div className="box grafico">
            <div className="chart-mini-header">
              <h3>Atendimentos da Semana</h3>
              <span>Últimos 7 dias</span>
            </div>
            <div className="chart-bars-mini">
              {weeklyAppointments.map((item) => (
                <div className="chart-bars-mini__item" key={item.label}>
                  <div
                    className="chart-bars-mini__bar"
                    style={{ height: `${(item.value / maxWeeklyValue) * 100}%` }}
                  >
                    <span>{item.value}</span>
                  </div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="box grafico">
            <div className="chart-mini-header">
              <h3>Tipos de Emergência</h3>
              <span>Distribuição mensal</span>
            </div>
            <div className="chart-pie-mini">
              <div
                className="chart-pie-mini__visual"
                style={{ background: `conic-gradient(${pieGradient})` }}
              />
              <div className="chart-pie-mini__legend">
                {emergencyTypes.map((item) => (
                  <div key={item.label} className="chart-pie-mini__legend-item">
                    <span style={{ backgroundColor: item.color }}></span>
                    <p>{item.label}</p>
                    <strong>{item.value}%</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="box grafico">
            <div className="chart-mini-header">
              <h3>Tempo de Resposta</h3>
              <span>Média (min)</span>
            </div>
            <svg className="chart-line-mini" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#7A2FF5"
                strokeWidth="3"
                strokeLinecap="round"
                points={linePoints}
              />
              {responseTrend.map((point, index) => {
                const x = (index / (responseTrend.length - 1)) * 100;
                const y = 100 - (point.value / lineMax) * 100;
                return <circle key={point.label} cx={x} cy={y} r="2" fill="#F58634" />;
              })}
            </svg>
            <div className="chart-line-mini__labels">
              {responseTrend.map((item) => (
                <span key={item.label}>{item.label}</span>
              ))}
            </div>
          </div>

          <div className="box grafico">
            <div className="chart-mini-header">
              <h3>Distância Percorrida</h3>
              <span>Por região (km)</span>
            </div>
            <div className="chart-distance-mini">
              {distanceCoverage.map((item) => (
                <div key={item.label} className="chart-distance-mini__item">
                  <p>{item.label}</p>
                  <div className="chart-distance-mini__bar">
                    <div style={{ width: `${item.value}%` }}>
                      <span>{item.value}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="box resumo">
          <h3>Resumo de Performance</h3>
          <div className="resumo-grid">
            <div>
              <p className="titulo-resumo">Taxa de Conclusão</p>
              <h2 className="valor-resumo">96%</h2>
              <p className="status verde">Excelente</p>
            </div>
            <div>
              <p className="titulo-resumo">Chamados Prioritários</p>
              <h2 className="valor-resumo">23</h2>
            </div>
            <div>
              <p className="titulo-resumo">Tempo Médio de Atendimento</p>
              <h2 className="valor-resumo">6.2 ⏱</h2>
            </div>
            <div>
              <p className="titulo-resumo">Dias Operando</p>
              <h2 className="valor-resumo">30 📅</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}