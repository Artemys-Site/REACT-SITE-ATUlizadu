import React, { useState } from 'react';
import { User, Activity, CheckCircle, Settings, DollarSign } from 'lucide-react';
import './relatorioVeterinario.css'; 

// Mapeamento de nomes de ícones (string) para componentes Lucide (React)
const IconMap = {
    Activity: Activity,
    User: User,
    CheckCircle: CheckCircle,
    DollarSign: DollarSign,
};

// ====================================================================
// --- DADOS ESTÁTICOS DO DASHBOARD ---
// ====================================================================
const STATIC_DASHBOARD_DATA = {
    cards: [
        { 
            id: 1, 
            title: "Total de Consultas", 
            value: "1.240", 
            iconName: "Activity", 
            colorKey: "purple", 
            trend: "+12%", 
            trendDetail: "Comparado ao mês anterior" 
        },
        { 
            id: 2, 
            title: "Pacientes Atendidos", 
            value: "753", 
            iconName: "User", 
            colorKey: "orange", 
            trend: "+5%", 
            trendDetail: "Novos registros este mês" 
        },
        { 
            id: 3, 
            title: "Taxa de Sucesso", 
            value: "94.5%", 
            iconName: "CheckCircle", 
            colorKey: "green", 
            trend: "-0.5%", 
            trendDetail: "Variação anual" 
        },
    ],
    consultasPorDia: [
        { dia: "Seg", online: 15, presencial: 35 },
        { dia: "Ter", online: 10, presencial: 45 },
        { dia: "Qua", online: 25, presencial: 20 },
        { dia: "Qui", online: 18, presencial: 40 },
        { dia: "Sex", online: 5, presencial: 50 },
        { dia: "Sáb", online: 30, presencial: 15 },
        { dia: "Dom", online: 5, presencial: 5 },
    ],
    tiposDeConsulta: [
        { status: "Vacinação", value: 450, color: "#6b46c1" }, 
        { status: "Emergência", value: 150, color: "#df7824ff" }, 
        { status: "Exames", value: 300, color: "#a183b4ff" },  
        { status: "Cirurgia", value: 100, color: "#4CAF50" },   
        { status: "Rotina", value: 240, color: "#f79f4dff" },    
    ],
    especiesAtendidas: [
        { status: "Cães", value: 600, color: "#4CAF50" },   
        { status: "Gatos", value: 400, color: "#f5a665ff" }, 
        { status: "Outros", value: 90, color: "#9C27B0" },     
    ],
    procedimentos: [
        { nome: "Hemograma Completo", quantidade: 180, cor: "#6b46c1" },
        { nome: "Ultrassonografia", quantidade: 150, cor: "#ee9e43ff" },
        { nome: "Castração", quantidade: 135, cor: "#c200d4ff" },
        { nome: "Aplicação de Vacinas", quantidade: 110, cor: "#4CAF50" },
        { nome: "Limpeza Dentária", quantidade: 95, cor: "#6e5086ff" },
    ]
};

const getStaticDataWithIcons = () => {
    return {
        ...STATIC_DASHBOARD_DATA,
        cards: STATIC_DASHBOARD_DATA.cards.map(card => ({
            ...card,
            icon: IconMap[card.iconName],
        }))
    };
};


// ====================================================================
// --- COMPONENTES VISUAIS ---
// ====================================================================

// Componente para o Card de Resumo
const DashboardCard = ({ title, value, icon: Icon, colorKey, trend, trendDetail }) => (
    <div className={`card-resumo border-t-4 card-color-${colorKey}`}>
        <div className="card-header-flex">
            <p className="card-title">{title}</p>
            <div className={`card-icon-box icon-bg-${colorKey}`}>
                <Icon className="card-icon" />
            </div>
        </div>
        <p className="card-value">
            {value}
        </p>
        <div className="card-footer-flex">
            <span className={`card-trend ${trend && trend.startsWith('+') ? 'trend-up' : 'trend-down'}`}>
                {trend}
            </span>
            <span className="card-trend-detail">
                {trendDetail}
            </span>
        </div>
    </div>
);


// Componente para desenhar o Gráfico de Rosca (Doughnut Chart) com SVG e Legenda
const DoughnutChart = ({ title, subtitle, data }) => {
    if (!data || data.length === 0) return null;

    const total = data.reduce((sum, item) => item.value + sum, 0);
    let cumulativePercent = 0;
    
    // Array para armazenar os dados dos rótulos (mantido, mas não será renderizado)
    const labelData = []; 

    return (
        <div className="chart-box full-height chart-doughnut-base">
            <h2 className="chart-title">{title}</h2>
            <p className="chart-subtitle">{subtitle}</p>
            
            <div className="doughnut-content-flex">
                
                {/* Container do SVG */}
                <div className="doughnut-svg-container">
                    <svg viewBox="0 0 100 100" className="doughnut-svg">
                        {/* Círculo de fundo */}
                        <circle
                        cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="15"
                        />
                        
                        {/* 1. Primeira Passagem: Desenha as Fatias (Círculos) */}
                        {data.map((item, index) => {
                            const percent = (item.value / total) * 100;
                            const offset = cumulativePercent;
                            const circumference = 2 * Math.PI * 40;
                            const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
                            const strokeDashoffset = (-offset / 100) * circumference;

                            const midAngle = (offset + percent / 2) * 3.6; 
                            const rad = (midAngle - 90) * (Math.PI / 180); 
                            const labelX = 50 + 65 * Math.cos(rad); 
                            const labelY = 50 + 65 * Math.sin(rad); 

                            // NOTA: Os dados do rótulo NÃO são mais empurrados para o labelData, 
                            // pois a segunda passagem de desenho foi removida.

                            cumulativePercent += percent;

                            return (
                                <circle
                                    key={index}
                                    cx="50" cy="50" r="40" fill="transparent" stroke={item.color} strokeWidth="15"
                                    strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="butt" transform="rotate(-90 50 50)"
                                />
                            );
                        })}
                        
                        {/* 2. A SEGUNDA PASSAGEM DE DESENHO (QUE CONTINHA O TEXTO) FOI REMOVIDA DAQUI. */}
                    </svg>
                </div>
                
                {/* Legenda (Mantida) */}
                <div className="doughnut-legend-grid">
                    {data.map((item, index) => (
                        <div key={index} className="legend-item">
                            <span className="legend-color-box" style={{ backgroundColor: item.color }}></span>
                            <span className="legend-text">{item.status} ({Math.round(item.value / total * 100)}%)</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
// Componente para o Gráfico de Barras (Consultas por Dia da Semana)
const BarChartConsultas = ({ data }) => {
    if (!data || data.length === 0) return null;

    const maxTotal = data.reduce((max, item) => Math.max(max, item.online + item.presencial), 0);
    const maxAxis = Math.ceil(maxTotal / 10) * 10 || 60; 

    const yAxisLines = Array.from({ length: maxAxis / 10 + 1 }, (_, i) => maxAxis - i * 10); 

    return (
        <div className="chart-box full-height chart-bar-base">
            <h2 className="chart-title">CONSULTAS POR DIA DA SEMANA</h2>
            <p className="chart-subtitle">Distribuição de consultas presenciais e online</p>

            <div className="bar-chart-area">
                
                {/* Eixo Y e Linhas de Grade */}
                <div className="bar-chart-y-axis">
                    {yAxisLines.map((value, index) => (
                        <div key={value} className="y-axis-line">
                            <span className="y-axis-label">{value > 0 ? value : 0}</span>
                        </div>
                    ))}
                </div>

                {/* Barras do Gráfico */}
                <div className="bar-chart-bars-container">
                    {data.map((item, index) => {
                        const total = item.online + item.presencial;
                        const totalHeight = total / maxAxis * 100;
                        const onlineHeight = item.online / (total || 1) * totalHeight;
                        const presencialHeight = totalHeight - onlineHeight;
                        const barWidthClass = 'bar-width-small';

                        return (
                            <div key={index} className={`bar-chart-bar-column ${barWidthClass}`}>
                                {/* Barras */}
                                <div className="bar-chart-stack" style={{ height: `${totalHeight}%` }}>
                                    {/* Parte Presencial (Laranja) */}
                                    <div 
                                        className="bar-presencial bar-segment" 
                                        style={{ height: `${presencialHeight}%` }} 
                                        title={`Presencial: ${item.presencial}`}
                                    />
                                    {/* Parte Online (Roxo) */}
                                    <div 
                                        className="bar-online bar-segment" 
                                        style={{ height: `${onlineHeight}%` }} 
                                        title={`Online: ${item.online}`}
                                    />
                                </div>
                                {/* Rótulo do Dia */}
                                <span className="bar-label">{item.dia}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Legenda */}
            <div className="bar-chart-legend">
                <div className="legend-item-inline">
                    <span className="legend-color-box bg-purple-color"></span> ONLINE
                </div>
                <div className="legend-item-inline">
                    <span className="legend-color-box bg-orange-color"></span> PRESENCIAL
                </div>
            </div>
        </div>
    );
};


// Componente para o Gráfico de Barras Horizontais (Top Procedimentos)
const TopProcedimentosChart = ({ data }) => {
    if (!data || data.procedimentos.length === 0) return null;

    const maxQty = data.procedimentos.reduce((max, item) => Math.max(max, item.quantidade), 0);
    const maxAxis = Math.ceil(maxQty / 50) * 50 || 200; 

    const axisLabels = [0, maxAxis * 0.25, maxAxis * 0.5, maxAxis * 0.75, maxAxis];

    return (
      <div className="chart-box full-width chart-horizontal-bar-base">
        <h2 className="chart-title flex-shrink-0">PROCEDIMENTOS MAIS REALIZADOS</h2>
        <p className="chart-subtitle-small">Top {data.procedimentos.length} procedimentos do período</p>
        
        <div className="horizontal-bar-list">
          {data.procedimentos.map((procedimento, index) => {
            const widthPercent = (procedimento.quantidade / maxAxis) * 100;
            return (
                <div key={index} className="horizontal-bar-item">
                    <p className="horizontal-bar-label">{procedimento.nome}</p>
                    <div className="horizontal-bar-track">
                        <div
                            className={`horizontal-bar-fill`}
                            style={{ width: `${widthPercent}%`, backgroundColor: procedimento.cor }}
                        />
                    </div>
                </div>
            )
          })}
        </div>
        
        {/* Eixo X - Escala */}
        <div className="horizontal-bar-x-axis">
            {axisLabels.map((label, index) => (
                <span key={index}>{Math.round(label)}</span>
            ))}
        </div>
      </div>
    );
};


// ====================================================================
// --- COMPONENTE PRINCIPAL ---
// ====================================================================

function RelatorioVeterinario() {
    const [data] = useState(getStaticDataWithIcons());

    return (
        <div className="main-app-container">
            
            <div className="content-padding-wrapper">
                
                {/* TÍTULO E SUBTÍTULO */}
                <header className="page-header">
                    <div>
                        <h1 className="page-title">RELATÓRIOS E ANÁLISES</h1>
                        <p className="page-subtitle">Dados estáticos de uma clínica veterinária de exemplo</p>
                    </div>
                </header>
                
                {data && (
                    <>
                        {/* ROW 1: Cards de Resumo (grid-3-cols) */}
                        <section className="grid-3-cols section-spacing">
                        {data.cards.map(card => (
                            <DashboardCard key={card.id} {...card} />
                        ))}
                        </section>

                        {/* ROW 2: Consultas por Dia da Semana (grid-1-col, largura total) */}
                        <section className="grid-1-col section-spacing">
                            {/* Gráfico de Barras ocupa a linha inteira */}
                            <BarChartConsultas data={data.consultasPorDia} />
                        </section>

                        {/* ROW 3: Gráficos de Rosca (Espécies e Tipos de Consulta) (grid-2-cols) */}
                        <section className="grid-2-cols section-spacing">
                            {/* Coluna 1: Espécies Atendidas */}
                            <DoughnutChart 
                                title="ESPÉCIES ATENDIDAS" 
                                subtitle="Distribuição de atendimentos por espécie" 
                                data={data.especiesAtendidas} 
                            />
                            
                            {/* Coluna 2: Tipos de Consulta */}
                            <DoughnutChart 
                                title="TIPOS DE CONSULTA" 
                                subtitle="Distribuição por tipo de procedimento" 
                                data={data.tiposDeConsulta} 
                            />
                        </section>
                        
                        {/* ROW 4: Procedimentos Mais Realizados (grid-1-col, largura total) */}
                        <section className="grid-1-col section-spacing">
                            <TopProcedimentosChart data={data} />
                        </section>
                    </>
                )}

            </div>
        </div>
    );
}

export default RelatorioVeterinario;