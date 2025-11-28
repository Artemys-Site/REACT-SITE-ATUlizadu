import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  Clock,
  Users,
  Calendar,
  BarChart2,
  Briefcase,
  ArrowUpCircle,
  ChevronRight,
  MessageSquare,
  PlusCircle
} from 'lucide-react';
import './painelVeterinario.css';

/* ------------------ HOOK E DADOS (MANTIDOS) ------------------ */
const useMetricData = () => {
  const [metricData, setMetricData] = useState({
    consultasHoje: {
      valor: 4,
      detalhes: '2 confirmadas',
      comparacao: '+2% ',
      comparacaoLabel: 'vs. ontem',
      isPositive: true,
      colorKey: 'purple',
      icon: Calendar
    },
    pacientesAtivos: {
      valor: 87,
      detalhes: 'Sob seus cuidados',
      comparacao: '+5% ',
      comparacaoLabel: 'vs. mês passado',
      isPositive: true,
      colorKey: 'orange',
      icon: Users
    },
    taxaPresenca: {
      valor: '96%',
      detalhes: 'Últimos 30 dias',
      comparacao: '-3% ',
      comparacaoLabel: 'vs. média anterior',
      isPositive: false,
      colorKey: 'green',
      icon: BarChart2
    }
  });

  useEffect(() => {}, []);
  return metricData;
};

const APPOINTMENTS = [
  { time: "10:00", patient: "Bob", type: "Consulta", tutor: "João Victor Lima", status: "Confirmado" },
  { time: "11:30", patient: "Max", type: "Online", tutor: "Maria Silva", status: "Confirmado" },
  { time: "14:00", patient: "Luna", type: "Consulta", tutor: "Pedro Costa", status: "Agendado" },
  { time: "16:00", patient: "Rex", type: "Consulta", tutor: "Ana Paula", status: "Agendado" }
];

const RECENT = [
  { name: "Bob", type: "Canino", time: "Ontem" },
  { name: "Luna", type: "Felino", time: "3 Dias Atrás" },
  { name: "Max", type: "Canino", time: "1 Semana" },
  { name: "Nina", type: "Felino", time: "1 Semana" }
];

const SUMMARY = [
  { label: "Consultas", value: 18 },
  { label: "Telemedicina", value: 7 },
  { label: "Novos Pacientes", value: 3 }
];

/* ============================================================
  =============== INÍCIO DO COMPONENTE =====================
  ============================================================ */

const PainelVeterinario = () => {
  const metricData = useMetricData();

  /* ----------- RENDERIZAÇÃO DOS CARDS DE MÉTRICAS ----------- */
  const renderMetricCard = (data, title, key) => {
    const IconComponent = data.icon;
    const comparisonClass = data.isPositive ? 'positive' : 'negative';

    // A classe `metric-strip` não é mais necessária no JSX;
    // a cor da borda superior será definida pelo CSS com base em .metric-card:nth-child(n)

    return (
      // Classe `metric-card` usa a cor principal de referência para o CSS: metric-card--[colorKey]
      <div key={key} className={`metric-card metric-card--${data.colorKey}`}>
        <div className="metric-card-top">
          <div className="metric-text">
            <p className="metric-title">{title}</p>
            <h2 className="metric-value">{data.valor}</h2>
            <p className="metric-details">{data.detalhes}</p>
          </div>

          <div className={`metric-icon ${data.colorKey}`}>
            <IconComponent className="icon" />
          </div>
        </div>

        <div className={`metric-comparison ${comparisonClass}`}>
    <i 
        className={`bi bi-arrow-${data.isPositive ? 'up' : 'down'}-circle-fill trend-icon`} 
    ></i>
    {data.comparacao}
    <span className="comparison-label">{data.comparacaoLabel}</span>
</div>
      </div>
    );
  };

  return (
    <main className="painel-container">

      {/* CABEÇALHO */}
      <header className="painel-header">
        <h1>OLÁ, DRA. LAURA! 👋</h1>
        <p>Acompanhe as métricas e atividades em tempo real.</p>
      </header>
      

      {/* MÉTRICAS */}
      <section className="metrics-wrapper">
        {Object.entries(metricData).map(([key, data]) =>
          renderMetricCard(
            data,
            // Mantém a formatação original do título
            key.replace(/([A-Z])/g, ' $1').toUpperCase(),
            key
          )
        )}
      </section>

      {/* MAIN GRID */}
      <div className="main-grid">

        {/* -------------------- AGENDA -------------------- */}
        {/* Uso de 'card' para estilos base e remoção de classes '2' redundantes */}
        <section className="agenda-card card">
          {/* Top Bar removida e será simulada com :before no CSS */}

          <div className="agenda-header">
            <h3 className="agenda-title">Agenda de Hoje</h3>
             <Link to="/agendaVeterinario" className="agenda-btn">
              <Calendar /> Ver Agenda Completa </Link>
          </div>

          <p className="agenda-date">Terça-feira, 25 de Outubro de 2025</p>

          <ul className="agenda-list">
            {APPOINTMENTS.map((item, i) => (
              <li key={i} className={`agenda-item agenda-item--${item.type.toLowerCase()}`}>
                <time className="item-time">{item.time}</time>

                <div className="item-info">
                  <div className="line1">
                    <span className="pet-name">{item.patient}</span>
                    <span className={`tag tag--${item.type.toLowerCase()}`}>{item.type}</span>
                  </div>
                  <p className="tutor">Tutor: {item.tutor}</p>
                </div>

                <span className={`status status--${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------- SIDE CARDS -------------------- */}
        <aside className="side-panels">

          {/* PACIENTES RECENTES */}
          <section className="side-card card side-card--orange">
            <h4 className="side-title">Pacientes Recentes</h4>

            <ul className="recent-list">
              {RECENT.map((item, i) => (
                <li key={i} className="recent-line">
                  <div>
                    <p className="recent-name">{item.name}</p>
                    <p className="recent-type">{item.type}</p>
                  </div>
                  <time className="recent-time">{item.time}</time>
                </li>
              ))}
            </ul>
          </section>

          {/* RESUMO DA SEMANA */}
          <section className="side-card card side-card--green">
            <h4 className="side-title">Resumo da Semana</h4>

            <ul className="summary-list">
              {SUMMARY.map((item, i) => (
                <li key={i} className="summary-line">
                  <span className="summary-label">{item.label}</span>
                  <span className="summary-value">{item.value}</span>
                </li>
              ))}
            </ul>
          </section>

        </aside>

      </div>

    </main>
  );
};

export default PainelVeterinario;