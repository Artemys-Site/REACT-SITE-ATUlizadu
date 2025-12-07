import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./AmbulanciaConfiguracaoVeiculo.css";

export default function AmbulanciaConfiguracaoVeiculo() {

  const [equipamentos, setEquipamentos] = useState({
    uti: false,
    desfibrilador: false,
    maca: false,
    oxigenio: false,
    medicamentos: false,
    ar: false,
  });

  const toggleEquip = (item) => {
    setEquipamentos((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <>
      <div className="config-container">

        <h2 className="title">CONFIGURAÇÕES DO SISTEMA</h2>
        <p className="subtitle">Gerencie as configurações da sua ambulância</p>

        {/* Botão superior */}
        <button className="save-top-btn">SALVAR ALTERAÇÕES</button>

        {/* Navegação interna */}
        <div className="settings-nav">

          <NavLink
            to="/ambulancia/configuracao/veiculo"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Perfil do Veículo
          </NavLink>

          <NavLink
            to="/ambulancia/configuracao/notificacao"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Notificações
          </NavLink>

          <NavLink
            to="/ambulancia/configuracao/seguranca"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Segurança
          </NavLink>

          <NavLink
            to="/ambulancia/configuracao/financeiro"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Financeiro
          </NavLink>

        </div>

        {/* Card central */}
        <div className="settings-card">

          <div className="status-dot"></div>
          <h3>Informações Do Veículo</h3>

          <div className="form-group">
            <label>Placa</label>
            <input placeholder="ABC-1234" />
          </div>

          <div className="form-group">
            <label>Modelo</label>
            <input placeholder="Fiat Ducato" />
          </div>

          <div className="form-group">
            <label>Ano</label>
            <input placeholder="2020" />
          </div>

          <div className="form-group">
            <label>Número do CRB</label>
            <input placeholder="00000050" />
          </div>

          <div className="form-group">
            <label>Cor</label>
            <input placeholder="Branca" />
          </div>

          <h3 className="equip-title">Equipamentos Disponíveis</h3>

          <div className="toggle-row" onClick={() => toggleEquip("uti")}>
            <span>UTI Móvel</span>
            <div className={equipamentos.uti ? "toggle active" : "toggle"}></div>
          </div>

          <div className="toggle-row" onClick={() => toggleEquip("desfibrilador")}>
            <span>Desfibrilador</span>
            <div className={equipamentos.desfibrilador ? "toggle active" : "toggle"}></div>
          </div>

          <div className="toggle-row" onClick={() => toggleEquip("maca")}>
            <span>Maca Veterinária</span>
            <div className={equipamentos.maca ? "toggle active" : "toggle"}></div>
          </div>

          <div className="toggle-row" onClick={() => toggleEquip("oxigenio")}>
            <span>Oxigênio</span>
            <div className={equipamentos.oxigenio ? "toggle active" : "toggle"}></div>
          </div>

          <div className="toggle-row" onClick={() => toggleEquip("medicamentos")}>
            <span>Medicamentos de Emergência</span>
            <div className={equipamentos.medicamentos ? "toggle active" : "toggle"}></div>
          </div>

          <div className="toggle-row" onClick={() => toggleEquip("ar")}>
            <span>Ar-Condicionado</span>
            <div className={equipamentos.ar ? "toggle active" : "toggle"}></div>
          </div>

          <div className="buttons-bottom">
            <button className="cancel-btn">Cancelar</button>
            <button className="save-btn">Salvar Alterações</button>
          </div>

        </div>
      </div>
    </>
  );
}
