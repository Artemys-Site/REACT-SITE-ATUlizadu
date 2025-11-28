import { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";   // ← ADICIONADO
import Footer from "../components/Footer";   // ← ADICIONADO
import "./AmbulanciaConfiguracaoNotificacoes.css";

export default function AmbulanciaConfiguracaoNotificacao() {
  const [settings, setSettings] = useState({
    novasSolicitacoes: true,
    chamadoAtualizado: false,
    alertasSonoros: true,
    relatorioDiario: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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

        {/* CARD PRINCIPAL */}
        <div className="settings-card">
          <div className="status-dot"></div>
          <h3>Configurações de Notificações</h3>

          {/* Toggle items */}
          <div className="toggle-row" onClick={() => toggle("novasSolicitacoes")}>
            <span>Notificar novas solicitações de resgate</span>
            <div className={settings.novasSolicitacoes ? "toggle active" : "toggle"}></div>
          </div>

          <div className="toggle-row" onClick={() => toggle("chamadoAtualizado")}>
            <span>Notificar quando um chamado for atualizado</span>
            <div className={settings.chamadoAtualizado ? "toggle active" : "toggle"}></div>
          </div>

          <div className="toggle-row" onClick={() => toggle("alertasSonoros")}>
            <span>Alertas sonoros</span>
            <div className={settings.alertasSonoros ? "toggle active" : "toggle"}></div>
          </div>

          <div className="toggle-row" onClick={() => toggle("relatorioDiario")}>
            <span>Enviar relatório diário por e-mail</span>
            <div className={settings.relatorioDiario ? "toggle active" : "toggle"}></div>
          </div>

          {/* Botões inferiores */}
          <div className="buttons-bottom">
            <button className="cancel-btn">Cancelar</button>
            <button className="save-btn">Salvar Alterações</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
