import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";   // ← ADICIONADO
import Footer from "../components/Footer";   // ← ADICIONADO
import "./AmbulanciaFinanceiro.css";

export default function AmbulanciaFinanceiro() {
  return (
    <>
      <Header />

      <div className="config-container">

        {/* Título */}
        <h2 className="title">CONFIGURAÇÕES DO SISTEMA</h2>
        <p className="subtitle">Gerencie as configurações da sua ambulância</p>

        {/* Botão superior */}
        <button className="save-top-btn">SALVAR ALTERAÇÕES</button>

        {/* Navegação interna */}
        <div className="settings-nav">
          <NavLink
            to="/ambulancia/configuracao/veiculo"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Perfil do Veículo
          </NavLink>

          <NavLink
            to="/ambulancia/configuracao/notificacao"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Notificações
          </NavLink>

          <NavLink
            to="/ambulancia/configuracao/seguranca"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Segurança
          </NavLink>

          <NavLink
            to="/ambulancia/configuracao/financeiro"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Financeiro
          </NavLink>
        </div>

        {/* CARD PRINCIPAL FINANCEIRO */}
        <div className="financeiro-card">
          <div className="card-header">
            <div className="status-dot"></div>
            <h3>Dados Bancários</h3>
          </div>

          <p className="descricao-card">Configure sua conta para receber pagamentos</p>

          <div className="linha-inputs">
            <div className="input-bloco">
              <label>Banco</label>
              <input type="text" value="Banco do Brasil" readOnly />
            </div>

            <div className="input-bloco">
              <label>Tipo de Conta</label>
              <input type="text" value="Conta Corrente" readOnly />
            </div>
          </div>

          <div className="linha-inputs">
            <div className="input-bloco">
              <label>Agência</label>
              <input type="text" value="1234-5" readOnly />
            </div>

            <div className="input-bloco">
              <label>Conta</label>
              <input type="text" value="1234567-8" readOnly />
            </div>
          </div>

          <div className="linha-inputs">
            <div className="input-bloco">
              <label>Chave PIX</label>
              <input type="text" value="laura.carvalho@artemys.com.br" readOnly />
            </div>
          </div>

          <div className="status-verificado">
            <span className="icone-status"></span>
            Conta verificada – Seus dados bancários foram validados com sucesso
          </div>
        </div>

        {/* MÉTODOS DE PAGAMENTO */}
        <div className="financeiro-card">
          <div className="card-header azul">
            <div className="status-dot"></div>
            <h3>Métodos de Pagamento</h3>
          </div>

          <p className="descricao-card">Escolha como você deseja receber pagamentos</p>

          <div className="metodo-item">
            <div className="metodo-info">
              <div className="icone-metodo"></div>
              <span>PIX</span>
            </div>

            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>

          <div className="metodo-item">
            <div className="metodo-info">
              <div className="icone-metodo"></div>
              <span>Transferência</span>
            </div>

            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Botões inferior */}
        <div className="buttons-bottom">
          <button className="cancel-btn">Cancelar</button>
          <button className="save-btn">Salvar Alterações</button>
        </div>
      </div>

      <Footer />
    </>
  );
}
