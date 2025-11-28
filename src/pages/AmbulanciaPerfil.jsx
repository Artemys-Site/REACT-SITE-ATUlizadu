import React from "react";
import "./AmbulanciaPerfil.css";
import infoIcon from "../assets/iconeConfiguracao.png";
import responsavelIcon from "../assets/iconePerfilAvalia.png";
import equipeIcon from "../assets/iconeCoracao.png";
import horariosIcon from "../assets/iconeRelogio.png";
import valoresIcon from "../assets/iconeDinheiro.png";
import drCarlos from "../assets/drCarlos.png";
import draMarina from "../assets/draMarina.png";
import joaoImagem from "../assets/joaoimagem.jpeg";

export default function Configuracoes() {
  const equipe = [
    { nome: "Dr. Carlos Mendes", tag: "Titular", tagClass: "purple", foto: drCarlos },
    { nome: "Maria Silva", tag: "Auxiliar", tagClass: "blue", foto: draMarina },
    { nome: "João Santos", tag: "Operacional", tagClass: "orange", foto: joaoImagem },
  ];

  return (
    <div className="config-wrapper">
      <h1 className="config-title">CONFIGURAÇÕES DO SISTEMA</h1>
      <p className="config-subtitle">
        Gerencie as configurações da sua ambulância veterinária
      </p>

      <div className="config-tabs">
        <button className="tab active">Perfil</button>
        <button className="tab">Veículo</button>
        <button className="tab">Notificações</button>
        <button className="tab">Segurança</button>
      </div>

      <div className="config-card">
        <div className="card-header purple-header">
          <img src={infoIcon} className="icon-placeholder" alt="Informações Gerais" />
          <h2>Informações Empresa</h2>
          <button className="btn-save">Salvar Alterações</button>
        </div>

        <div className="card-body">
          <div className="column">
            <label>Nome Empresa</label>
            <input placeholder="" />

            <label>Nome Fantasia</label>
            <input placeholder="" />

            <label>CPF/CNPJ</label>
            <input placeholder="" />

            <label>Inscrição Estadual ou Municipal</label>
            <input placeholder="" />
          </div>

          <div className="column">
            <label>CRMV</label>
            <input placeholder="" />

            <label>Telefone</label>
            <input placeholder="" />

            <label>E-mail</label>
            <input placeholder="" />
          </div>
        </div>

        <div className="address-section">
          <label>Endereço Base Completo</label>
          <input placeholder="" />

          <div className="address-grid">
            <input placeholder="Bairro" />
            <input placeholder="Cidade" />
            <input placeholder="Estado" />
          </div>

          <label>Raio de Atendimento (KM)</label>
          <input placeholder="" />

          <label>Descrição do Serviço</label>
          <textarea placeholder=""></textarea>
        </div>
      </div>

      <div className="config-card">
        <div className="card-header purple-header">
          <img src={responsavelIcon} className="icon-placeholder" alt="Responsável Técnico" />
          <h2>Informações Responsável Técnico</h2>
        </div>

        <div className="card-body">
          <div className="column">
            <label>CRMV</label>
            <input placeholder="CRMV-SP" />

            <label>Certificações e Cursos</label>
            <div className="cert-box">
              <p>Suporte Avançado de Vida Veterinária (SAVV)</p>
              <span className="status-green">Ativo</span>
            </div>

            <div className="cert-box">
              <p>Transporte de Animais em Situação de Emergência</p>
              <span className="status-green">Ativo</span>
            </div>

            <button className="btn-add">Adicionar Certificação</button>
          </div>

          <div className="column">
            <label>Especialização</label>
            <input placeholder="Emergências Veterinárias" />

            <label>Anos de Experiência</label>
            <input placeholder="12" />
          </div>
        </div>
      </div>

      <div className="config-row">
        <div className="config-card half">
          <div className="card-header orange-header">
            <img src={equipeIcon} className="icon-placeholder" alt="Equipe" />
            <h2>Equipe</h2>
          </div>

          {equipe.map((membro) => (
            <div className="team-member" key={membro.nome}>
              <img src={membro.foto} className="avatar-img" alt={membro.nome} />
              <div className="team-info">
                <h3>{membro.nome}</h3>
                <span className={`tag ${membro.tagClass}`}>{membro.tag}</span>
              </div>
            </div>
          ))}

          <button className="btn-add">Adicionar Membro</button>
        </div>

        <div className="config-card half">
          <div className="card-header green-header">
            <img src={horariosIcon} className="icon-placeholder" alt="Horários" />
            <h2>Horários</h2>
          </div>

          <table className="schedule-table">
            <tbody>
              <tr><td>Segunda à Sexta</td><td>00:00 - 23:59</td></tr>
              <tr><td>Sábado</td><td>00:00 - 23:59</td></tr>
              <tr><td>Domingo</td><td>00:00 - 23:59</td></tr>
              <tr><td>Feriados</td><td>00:00 - 23:59</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="config-card">
        <div className="card-header yellow-header">
          <img src={valoresIcon} className="icon-placeholder" alt="Valores" />
          <h2>Valores e Taxas de Atendimento</h2>
        </div>

        <div className="pricing-grid">
          <div className="pricing-item">
            <label>Taxa Base (até 10km)</label>
            <input placeholder="R$ 250,00" />
          </div>

          <div className="pricing-item">
            <label>Taxa por KM Adicional</label>
            <input placeholder="R$ 6,00" />
          </div>

          <div className="pricing-item">
            <label>Taxa Noturna (20h–6h)</label>
            <input placeholder="R$ 350,00" />
          </div>

          <div className="pricing-item">
            <label>Taxa Finais de Semana/Feriados</label>
            <input placeholder="R$ 600,00" />
          </div>
        </div>

        <div className="bottom-buttons">
          <button className="btn-cancel">Cancelar</button>
          <button className="btn-save blue">Salvar Todas as Alterações</button>
        </div>
      </div>
    </div>
  );
}
