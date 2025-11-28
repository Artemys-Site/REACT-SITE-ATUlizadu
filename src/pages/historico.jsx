import React from "react";
import "./chamados.css";
import HeaderAmbulancia from "../components/HeaderAmbulancia";

export default function Historico() {
  return (
    <>
      <HeaderAmbulancia />
      <div className="container" style={{ marginTop: '80px' }}>

      <h2 className="title">HISTÓRICO DE ATENDIMENTOS</h2>
      <p className="subtitle">ACOMPANHE TODOS OS SEUS ATENDIMENTOS REALIZADOS</p>

      <div className="cards-row">
        <div className="card blue">
          <h3>Taxa de Conclusão</h3>
          <span className="number big">88%</span>
          <p>1 Cancelamento</p>
        </div>

        <div className="card orange">
          <h3>Avaliação Média</h3>
          <span className="number big">4.9</span>
          <p>Baseado em 7 avaliações</p>
        </div>

        <div className="card green">
          <h3>Total de Atendimentos</h3>
          <span className="number big">7</span>
          <p>+15% vs. mês anterior</p>
        </div>
      </div>

      <div className="search-filter">
        <input placeholder="Buscar por paciente, clínica ou emergência..." />
        <select>
          <option>Todos os períodos</option>
        </select>
        <select>
          <option>Todos os status</option>
        </select>
        <button className="export-btn">Exportar</button>
      </div>

      <div className="history-item">
        <p className="date">25/10/2025 • 14:30</p>
        <div className="avatar red">R</div>
        <div className="info">
          <h3>Rex</h3>
          <span className="priority yellow">Atropelamento</span>
          <p className="clinic">Clínica PetCare</p>
          <p>Rua das Flores, 123</p>
        </div>
        <div className="distance">
          <p>2.3 km</p>
          <p>15 min</p>
        </div>
        <div className="rating">★★★★★</div>
      </div>

      <footer className="footer">
        <div className="left">
          <p>Artemys — Cuidando de quem não se pode cuidar</p>
          <div className="footer-links">
            <span>Atendimento Rápido</span>
            <span>Procedimentos Eficazes</span>
            <span>Suporte em todo Brasil</span>
            <span>Contate-nos</span>
          </div>
        </div>

        <div className="social">
          <a>Github</a>
          <a>Instagram</a>
          <a>LinkedIn</a>
        </div>
      </footer>
    </div>
    </>
  );
}

