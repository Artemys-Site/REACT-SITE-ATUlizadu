import React from "react";
import "./chamadospendentes.css";
import HeaderAmbulancia from "../components/HeaderAmbulancia";

export default function ChamadosPendentes() {
  return (
    <>
      <HeaderAmbulancia />
      <div className="chamados-container" style={{ marginTop: '80px' }}>

      {/* Títulos */}
      <h2 className="titulo-principal">CHAMADOS DE EMERGÊNCIA</h2>
      <p className="subtitulo">
        GERENCIE SOLICITAÇÕES E ACEITE NOVOS ATENDIMENTOS
      </p>

      {/* Cards de Status */}
      <div className="status-cards">
        <div className="status-card azul">
          <span className="status-numero">5</span>
          <p>Aceitos</p>
        </div>

        <div className="status-card roxo">
          <span className="status-numero">1</span>
          <p>Pendentes</p>
        </div>

        <div className="status-card laranja">
          <span className="status-numero">0</span>
          <p>Concluídos Hoje</p>
        </div>

        <div className="status-card verde">
          <span className="status-numero">2</span>
          <p>Alta Prioridade</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros">
        <button className="filtro ativo">Pendentes</button>
        <button className="filtro">Em andamento</button>
        <button className="filtro">Finalizados</button>
        <input
          type="text"
          className="buscar"
          placeholder="Buscar por paciente, clínica ou descrição..."
        />
        <button className="filtro">Filtros</button>
      </div>

      {/* ITEM 1 - REX */}
      <div className="card-chamado">
        <div className="col-esq">
          <div className="avatar">R</div>
          <div>
            <h3 className="nome-pet">Rex</h3>
            <span className="prioridade media">Média Prioridade</span>
            <p className="tempo">Há 1h · 3,3 km</p>
          </div>
        </div>

        <div className="col-centro">
          <p className="titulo-info">Tipo de Emergência</p>
          <span className="info destaque laranja2">Convulsão</span>

          <p className="descricao">
            Cão de porte grande.<br />
            Histórico de epilepsia.
          </p>
        </div>

        <div className="col-dir">
          <p className="titulo-info">Clínica Solicitante</p>
          <span className="info">VetLife</span>

          <p className="titulo-info">Endereço</p>
          <p className="endereco">
            Rua Araújo, 300 – Consolação, São Paulo – SP
          </p>

          <p className="telefone"> (11) 97543-3210</p>

          <div className="acoes">
            <button className="btn-aceitar">Aceitar Chamado</button>
            <button className="btn-recusar">Recusar</button>
          </div>
        </div>
      </div>

      {/* ITEM 2 - TATI */}
      <div className="card-chamado">
        <div className="col-esq">
          <div className="avatar">T</div>
          <div>
            <h3 className="nome-pet">Tati</h3>
            <span className="prioridade alta">Alta Prioridade</span>
            <p className="tempo">Há 32 min · 5,8 km</p>
          </div>
        </div>

        <div className="col-centro">
          <p className="titulo-info">Tipo de Emergência</p>
          <span className="info destaque vermelho">Crise Respiratória</span>

          <p className="descricao">
            Gata persa.<br />
            Dificuldade para respirar repentina.
          </p>
        </div>

        <div className="col-dir">
          <p className="titulo-info">Clínica Solicitante</p>
          <span className="info">Pet Care Centro</span>

          <p className="titulo-info">Endereço</p>
          <p className="endereco">
            Av. Paulista, 1000 – Bela Vista, São Paulo – SP
          </p>

          <p className="telefone"> (11) 98763-4321</p>

          <div className="acoes">
            <button className="btn-aceitar">Aceitar Chamado</button>
            <button className="btn-recusar">Recusar</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
