import React, { useState, useEffect, useCallback } from 'react';
import './agendaVeterinario.css'; 
import {  Calendar as CalendarIcon, Clock, Users, Video, CheckCircle, MoreVertical, ArrowLeft, ArrowRight, Menu, Plus, Loader2 } from 'lucide-react';



const mockMetrics = [
    { title: "CONSULTAS HOJE", value: 5, icon: CalendarIcon, colorClass: "metric-purple" },
    { title: "PENDENTES", value: 2, icon: Clock, colorClass: "metric-orange" },
    { title: "PACIENTES ATIVOS", value: 3, icon: CheckCircle, colorClass: "metric-green" },
    { title: "TELEMEDICINA", value: 3, icon: Video, colorClass: "metric-purple-soft" },
];

// Mock de Consultas de Hoje (Ajustado para o último layout)
const mockConsultas = [
    {
        id: 'c1', time: '09:00', pet: 'Bob', tutor: 'João Victor Lima', 
        status: 'Confirmado', type: 'Consulta', location: 'Física', 
        notes: 'Consulta de Rotina - Vacina Antirrábica'
    },
    {
        id: 'c2', time: '10:30', pet: 'Luna', tutor: 'Maria Silva', 
        status: 'Confirmado', type: 'Telemedicina', location: 'Online', 
        notes: 'Telemedicina - Acompanhamento Pós-Cirurgia'
    },
    {
        id: 'c3', time: '11:00', pet: 'Max', tutor: 'Pedro', 
        status: 'Pendente', type: 'Consulta', location: 'Física', 
        notes: 'Primeira Consulta - Check-up geral'
    },
    {
        id: 'c4', time: '14:00', pet: 'Rex', tutor: 'Ana', 
        status: 'Confirmado', type: 'Consulta', location: 'Física', 
        notes: 'Retorno - Problema Dermatológico'
    },
    {
        id: 'c5', time: '15:30', pet: 'Nina', tutor: 'Carlos', 
        status: 'Pendente', type: 'Consulta', location: 'Online', 
        notes: 'Orientação Nutricional'
    },
];

// -----------------------------------------------------------------------------
// NOVO COMPONENTE: Menu de Ações no Ícone de 3 Pontos (Deve ser salvo separadamente ou dentro deste arquivo)
// -----------------------------------------------------------------------------
const MoreVerticalMenu = ({ id, onClose, onAction }) => {
    return (
        <div className="vertical-menu-dropdown">
            <button className="menu-option" onClick={() => onAction(id, 'Reagendar')}>
                Reagendar
            </button>
            <button className="menu-option menu-danger" onClick={() => onAction(id, 'Cancelar')}>
                Cancelar consulta
            </button>
        </div>
    );
};


// -----------------------------------------------------------------------------
// Componente de Card de Métrica (Topo)
// -----------------------------------------------------------------------------
const MetricCard = ({ metric }) => {
    const Icon = metric.icon;
    return (
        <div className={`metric-veterinario-card ${metric.colorClass}`}>
            <div className="metric-veterinario-text">
                <p className="metric-veterinario-title">{metric.title}</p>
                <span className="metric-veterinario-value">{metric.value}</span>
            </div>
            <div className={`metric-icon-box ${metric.colorClass}`}>
                <Icon className="metric-icon-svg" />
            </div>
        </div>
    );
};

// -----------------------------------------------------------------------------
// Componente de Item de Consulta
// -----------------------------------------------------------------------------
const ConsultaItem = ({ consulta }) => {
    const isOnline = consulta.location === 'Online';
    const statusLower = consulta.status.toLowerCase();

    // Lógica dos Botões baseada na imagem:
    const showConfirm = statusLower === 'pendente';
    const showContact = statusLower !== 'presente'; 
    const showStartConsult = statusLower === 'confirmado' && isOnline;

    // Estado para controlar a visibilidade do menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Função fictícia de ação (apenas para demonstração)
    const handleAction = (id, action) => {
        // Aqui você faria a chamada à API para Cancelar ou Reagendar
        alert(`Ação: ${action} na consulta ${id}`);
        setIsMenuOpen(false); 
    };

    return (
        <div className="consulta-item">
            <div className="consulta-time-block">
                <Clock className="consulta-clock-icon" />
                <span className="consulta-time">{consulta.time}</span>
            </div>

            <div className="consulta-details">
                <div className="consulta-header">
                    <h4 className="pet-name">{consulta.pet}</h4>
                </div>
                <p className="tutor-name">Tutor: {consulta.tutor}</p> 
                
                <div className="consulta-badges">
                    <span className={`consulta-status status-${statusLower}`}>
                        {consulta.status.toUpperCase()}
                    </span>
                    
                    {isOnline ? (
                         <span className="consulta-location location-online">ONLINE</span>
                    ) : (
                        <span className="consulta-location location-fisica">CONSULTA</span>
                    )}
                </div>

                <div className="consulta-notes-wrapper">
                    <p className="consulta-notes">{consulta.notes}</p>
                </div>

                <div className="consulta-actions">
                    
                    {showStartConsult && (
                        <button className="btn-action btn-start-call">
                            INICIAR CONSULTA
                        </button>
                    )}
                    
                    {showConfirm && (
                        <button className="btn-action btn-confirm">
                            CONFIRMAR
                        </button>
                    )}
                    
                    {showContact && (
                        <button className="btn-action btn-contact">
                            CONTATAR
                        </button>
                    )}
                </div>
            </div>
            
            {/* Ícone de Menu e Lógica de Exibição */}
            <div className="consulta-menu-wrapper">
                 <MoreVertical 
                    className="consulta-menu" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
                {isMenuOpen && (
                    <MoreVerticalMenu 
                        id={consulta.id} 
                        onClose={() => setIsMenuOpen(false)}
                        onAction={handleAction}
                    />
                )}
            </div>
        </div>
    );
};

// -----------------------------------------------------------------------------
// Componente Principal da Agenda
// -----------------------------------------------------------------------------

const AgendaVeterinario = () => {
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    // Função de renderização do calendário
    const renderCalendar = () => {
        const daysOfWeek = ['Do', 'Seg', 'Te', 'Qua', 'Qui', 'Sex', 'Sáb']; 
        const days = [
            null, null, 1, 2, 3, 4, 5,
            6, 7, 8, 9, 10, 11, 12, 
            13, 14, 15, 16, 17, 18, 19, 
            20, 21, 22, 23, 24, 25, 26, 
            27, 28, 29, 30, 31, null, null
        ];

        return (
            <div className="calendar-grid">
                {daysOfWeek.map(day => <div key={day} className="calendar-day-header">{day}</div>)}
                {days.map((day, index) => (
                    <div 
                        key={`day-${index}-${day}`} 
                        className={`calendar-day ${day === 24 ? 'day-selected' : ''} ${day ? 'day-active' : 'day-inactive'}`}
                    >
                        {day}
                    </div>
                ))}
            </div>
        );
    };


    return (
        <div className="agenda-container app-layout">
            
            {/* TOPO DA APLICAÇÃO (Título e Descrição) */}
            <div className="agenda-topo">
                <div className="topo-content">
                    <h1 className="topo-title">MINHA AGENDA</h1>
                    <p className="topo-subtitle">GERENCIE TODAS AS SUAS CONSULTAS E COMPROMISSOS</p>
                </div>
            </div>

            {/* DASHBOARD DE MÉTRICAS */}
            <div className="metrics-dashboard">
                {mockMetrics.map((metric, index) => (
                    <MetricCard key={metric.title} metric={metric} /> 
                ))}
            </div>

            {/* LAYOUT PRINCIPAL (CALENDÁRIO + CONSULTAS) */}
            <div className="main-content-wrapper">
                
                {/* PAINEL LATERAL ESQUERDO */}
                <div className="sidebar-panel">
                    
                    {/* CALENDÁRIO */}
                    <div className="calendar-box">
                        <div className="calendar-header-box">
                            <h3 className="calendar-month-title">
                                Outubro 2025
                            </h3>
                        </div>
                        {renderCalendar()}
                    </div>

                    {/* OPÇÕES DE VISUALIZAÇÃO */}
                    <div className="visualization-box">
                        <p className="visualization-title">VISUALIZAÇÃO</p>
                        <div className="visualization-options">
                            <div className="option-item option-selected">
                                <Clock className="option-icon" />
                                <span>Dia</span>
                            </div>
                            <div className="option-item">
                                <Menu className="option-icon" />
                                <span>Semana</span>
                            </div>
                            <div className="option-item">
                                <CalendarIcon className="option-icon" />
                                <span>Mês</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONSULTAS DE HOJE (LISTA PRINCIPAL) */}
                <div className="consultas-list-wrapper">
                    <div className="consultas-list-header">
                        <h2 className="consultas-title">CONSULTAS DE HOJE</h2>
                        <span className="consultas-date">SEXTA-FEIRA, 24 DE OUTUBRO DE 2025</span>
                        <div className="consultas-nav">
                            <ArrowLeft className="nav-icon" />
                            <ArrowRight className="nav-icon" />
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <Loader2 className="loading-icon icon-spin" /> 
                            <p className="loading-text">Carregando Consultas...</p>
                        </div>
                    ) : (
                        <div className="consultas-list">
                            {mockConsultas.map(consulta => (
                                <ConsultaItem key={consulta.id} consulta={consulta} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AgendaVeterinario;