import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "./chamados.css";

export default function ChamadosEmAndamento() {
  return (
    <div className="container">
      <header className="top-nav">
        
        <nav>
          <Link to="/"><a className="active">Painel</a></Link>
          <Link to="/pendentes"><a className="active-section">Chamados</a></Link>
          <a>Histórico</a>
          <a>Relatórios</a>
        </nav>
       
      </header>

      <h2 className="title">CHAMADOS DE EMERGÊNCIA</h2>
      <p className="subtitle">GERENCIE SOLICITAÇÕES E ACEITE NOVOS ATENDIMENTOS</p>

      <div className="cards-row">
        <div className="card blue">
          <h3>Aceitos</h3>
          <span className="number">5</span>
        </div>
        <div className="card orange">
          <h3>Pendentes</h3>
          <span className="number">1</span>
        </div>
        <div className="card green">
          <h3>Concluídos Hoje</h3>
          <span className="number">0</span>
        </div>
        <div className="card purple">
          <h3>Alta Prioridade</h3>
          <span className="number">2</span>
        </div>
      </div>

      <div className="status-bar">
        <Link to="/pendentes">
          <button>Pendentes (4)</button>
        </Link>

        <Link to="/andamento">
          <button className="active-status">Em Andamento (1)</button>
        </Link>

        <Link to="/finalizados">
          <button>Finalizados (0)</button>
        </Link>
      </div>

      <div className="search-filter">
        <input placeholder="Buscar por paciente, clínica ou endereço..." />
        <button className="filter-btn">Filtros</button>
      </div>

      <div className="emergency-card">
        <div className="left">
          <div className="avatar">M</div>
          <div>
            <h3>Mia</h3>
            <span className="priority">Alta Prioridade</span>
            <p className="time">Há 12 min • 5.8 km</p>
          </div>
        </div>

        <div className="middle">
          <h4>Tipo de Emergência</h4>
          <span className="warning">Parto Complicado</span>
          <p className="details">Cadela Bulldog, distocia fetal</p>
        </div>

        <div className="right">
          <h4>Clínica Solicitante</h4>
          <p>Pet Care Centro</p>

          <h4>Endereço</h4>
          <p>Av. Paulista, 1520 – Bela Vista, São Paulo – SP</p>
          <p>(11) 98765-4321</p>

          <div className="actions">
            <button className="route-btn">Iniciar Rota</button>
            <button className="register-btn">Registro</button>
            <button className="contact-btn">Contatar Clínica</button>
          </div>
        </div>
      </div>
    </div>
  );
}
