import React from "react";
import "./chamados.css";
import HeaderAmbulancia from "../components/HeaderAmbulancia";

export default function ChamadosFinalizados() {
  return (
    <>
      <HeaderAmbulancia />
      <div className="container" style={{ marginTop: '80px' }}>

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
        <button>Pendentes (4)</button>
        <button>Em Andamento (1)</button>
        <button className="active-status">Finalizados (0)</button>
      </div>

      <div className="empty">
        <span className="empty-icon">⚠️</span>
        <p>Nenhum chamado encontrado</p>
        <span className="empty-subtitle">Não há chamados finalizados no momento</span>
      </div>
    </div>
    </>
  );
}