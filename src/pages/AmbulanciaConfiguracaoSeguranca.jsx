import { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";   // ← ADICIONADO
import Footer from "../components/Footer";   // ← ADICIONADO
import "./AmbulanciaConfiguracaoSeguranca.css";

export default function AmbulanciaConfiguracaoSeguranca() {

  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    loginNotification: false,
    stayConnected: false,
  });

  const toggleSetting = (item) => {
    setSecuritySettings(prev => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <>
      <Header />

      <div className="config-container">

        <h2 className="title">CONFIGURAÇÕES DO SISTEMA</h2>
        <p className="subtitle">Gerencie a segurança da sua conta</p>

        {/* Botão superior */}
        <button className="save-top-btn">SALVAR ALTERAÇÕES</button>

        {/* Navegação interna */}
        <div className="settings-nav">
          <NavLink to="/ambulancia/configuracao/veiculo" className={({isActive}) => isActive ? "active" : ""}>
            Perfil do Veículo
          </NavLink>
          <NavLink to="/ambulancia/configuracao/notificacao" className={({isActive}) => isActive ? "active" : ""}>
            Notificações
          </NavLink>
          <NavLink to="/ambulancia/configuracao/seguranca" className={({isActive}) => isActive ? "active" : ""}>
            Segurança
          </NavLink>
          <NavLink to="/ambulancia/configuracao/financeiro" className={({isActive}) => isActive ? "active" : ""}>
            Financeiro
          </NavLink>
        </div>

        {/* CARD PRINCIPAL */}
        <div className="settings-card">

          <h3 className="card-title">Segurança da Conta</h3>

          <div className="form-group">
            <label>Senha Atual</label>
            <input type="password" placeholder="Digite sua senha atual" />
          </div>

          <div className="form-group">
            <label>Nova Senha</label>
            <input type="password" placeholder="Digite sua nova senha" />
          </div>

          <div className="form-group">
            <label>Confirmar Nova Senha</label>
            <input type="password" placeholder="Confirme sua nova senha" />
          </div>

          <h3 className="card-title">Configurações de Segurança</h3>

          <div className="toggle-row" onClick={() => toggleSetting("twoFactor")}>
            <span>Autenticação de Dois Fatores</span>
            <div className={securitySettings.twoFactor ? "toggle active" : "toggle"}></div>
          </div>

          <div className="toggle-row" onClick={() => toggleSetting("loginNotification")}>
            <span>Notificação de Login</span>
            <div className={securitySettings.loginNotification ? "toggle active" : "toggle"}></div>
          </div>

          <div className="toggle-row" onClick={() => toggleSetting("stayConnected")}>
            <span>Manter Conectado</span>
            <div className={securitySettings.stayConnected ? "toggle active" : "toggle"}></div>
          </div>

          <h3 className="card-title">Histórico de Login</h3>

          <div className="log-item">
            <p>10/11/2025 14:30</p>
            <p>Windows – Chrome – São Paulo, SP</p>
            <span className="status success">Sucesso</span>
          </div>

          <div className="log-item">
            <p>08/11/2025 18:45</p>
            <p>MacBook – Firefox – São Paulo, SP</p>
            <span className="status success">Sucesso</span>
          </div>

          <div className="log-item">
            <p>01/11/2025 22:10</p>
            <p>Android – Chrome – Campinas, SP</p>
            <span className="status failed">Falha</span>
          </div>

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

