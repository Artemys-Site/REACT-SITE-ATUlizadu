import React from "react";
import { Link } from "react-router-dom";
import "./painelambulancia.css";

export default function PainelAmbulancia() {
  return (
    <>

      <div className="painel-container" style={{ marginTop: '80px' }}>

        <main className="main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h1 className="main-title">PAINEL DE AMBULÂNCIA</h1>
              <p className="main-desc">Resumo rápido das operações e status das ambulâncias</p>
            </div>
            <Link to="/cadastro-ambulancia" className="btn-cadastrar-ambulancia">
              <i className="bi bi-plus-circle"></i>
              CADASTRAR AMBULÂNCIA
            </Link>
          </div>

          {/* CARDS */}
          <div className="cards">
            <div className="card">
              <div className="card-bar indigo"></div>
              <div className="card-content">
                <div>
                  <div className="card-label">Ambulâncias em Rota</div>
                  <div className="card-number">1</div>
                  <div className="card-sub">Em atendimento</div>
                </div>
                <div className="card-icon indigo-bg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h16" stroke="#5B21B6" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8 6v12" stroke="#5B21B6" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-bar orange"></div>
              <div className="card-content">
                <div>
                  <div className="card-label">Chamados Ativos</div>
                  <div className="card-number">3</div>
                  <div className="card-sub">Aguardando atendimento</div>
                </div>
                <div className="card-icon orange-bg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v6" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M6 10h12" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-bar green"></div>
              <div className="card-content">
                <div>
                  <div className="card-label">Atendimento Hoje</div>
                  <div className="card-number">8</div>
                  <div className="card-sub">Casos com sucesso</div>
                </div>
                <div className="card-icon green-bg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* GRÁFICOS */}
          <div className="charts">
            <div className="chart-box">
              <div className="chart-title orange-text">Atendimentos Mensais</div>
              <div className="chart-placeholder">[gráfico de barras]</div>
            </div>
            <div className="chart-box">
              <div className="chart-title orange-text">Distribuição por Tipo</div>
              <div className="chart-placeholder">[gráfico pizza]</div>
            </div>
          </div>

          {/* TABELA */}
          <div className="table-box">
            <div className="table-header">
              <div className="table-title orange-text">Chamados Recentes</div>
            </div>

            <div className="table-body">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Paciente</th>
                    <th>Cliente</th>
                    <th>Endereço</th>
                    <th>Responsável</th>
                    <th>Status</th>
                    <th>Distância</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Thor</td>
                    <td>Clínica Amigo Pet</td>
                    <td>Rua dos Jacarandás, 452 — Santo Amaro</td>
                    <td>Dr. Marcos Vieira</td>
                    <td><span className="status-badge">Em Atendimento</span></td>
                    <td>2,1 km</td>
                  </tr>

                  <tr>
                    <td>2.</td>
                    <td>Luna</td>
                    <td>Pet House Vila Olímpia</td>
                    <td>Av. Nova Independência, 1012 — Vila Olímpia</td>
                    <td>Dra. Camila Andrade</td>
                    <td><span className="status-badge">A Caminho</span></td>
                    <td>3,8 km</td>
                  </tr>

                  <tr>
                    <td>3.</td>
                    <td>Rex</td>
                    <td>Casa Animal Morumbi</td>
                    <td>Rua Marechal Hastinfilo, 89 — Morumbi</td>
                    <td>Dr. Felipe Monteiro</td>
                    <td><span className="status-badge">Aguardando</span></td>
                    <td>5,4 km</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="table-buttons">
              <button className="btn orange">Pegar Chamado</button>
              <button className="btn indigo">Ver Histórico</button>
              <button className="btn indigo-light">Gerar Relatório</button>
            </div>
          </div>

        </main>

      </div>
    </>
  );
}

