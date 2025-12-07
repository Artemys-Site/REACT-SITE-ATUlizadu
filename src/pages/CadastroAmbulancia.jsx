import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CadastroAmbulancia.css';
import artySegurandogato from '../assets/artySegurandogato.webp';

const CadastroAmbulancia = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    anoFabricacao: '',
    numeroChassi: '',
    placa: '',
    renavam: '',
    corPredominante: '',
    cnpjCpfProprietario: '',
    documentoVeiculo: null,
    apoliceSeguro: null,
    declaracaoHigiene: null,
    comprovanteVistoriaCRMV: null,
    alvaraVigilanciaSanitaria: null,
    vistoriaBombeiros: null,
    tipoCombustivel: '',
    quilometragem: '',
    ultimaRevisao: '',
    proximaRevisao: '',
    seguradora: '',
    numeroApolice: '',
    statusAmbulancia: '',
    tipoAmbulancia: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'placa') {
      const formatted = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'renavam') {
      const formatted = value.replace(/\D/g, '').slice(0, 11);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cnpjCpfProprietario') {
      const cleaned = value.replace(/\D/g, '');
      let formatted = '';
      if (cleaned.length <= 11) {
        formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      } else {
        formatted = cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // TODO: Implementar chamada à API de cadastro da ambulância
      console.log('Dados da ambulância:', formData);
      // Navega para o cadastro do motorista
      navigate('/cadastro-motorista');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <>
      <section className="cadastro-ambulancia-page">
        <div className="cadastro-ambulancia-container">
          <div className="cadastro-ambulancia-content">
            <div className="ambulancia-mascot">
              <img src={artySegurandogato} alt="Mascote" className="mascot-image" />
            </div>

            <div className="ambulancia-form-wrapper">
              <h1 className="ambulancia-titulo">CADASTRO DA AMBULÂNCIA</h1>
              
              <form onSubmit={handleSubmit} className="ambulancia-form">
                {/* Informações Básicas do Veículo */}
                <div className="form-row-ambulancia">
                  <div className="form-group-ambulancia">
                    <label htmlFor="marca">MARCA</label>
                    <input
                      type="text"
                      id="marca"
                      name="marca"
                      placeholder="DIGITE A MARCA"
                      value={formData.marca}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group-ambulancia">
                    <label htmlFor="modelo">MODELO</label>
                    <input
                      type="text"
                      id="modelo"
                      name="modelo"
                      placeholder="DIGITE O MODELO"
                      value={formData.modelo}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row-ambulancia">
                  <div className="form-group-ambulancia">
                    <label htmlFor="anoFabricacao">ANO FABRICAÇÃO</label>
                    <input
                      type="text"
                      id="anoFabricacao"
                      name="anoFabricacao"
                      placeholder="DIGITE O ANO"
                      value={formData.anoFabricacao}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group-ambulancia">
                    <label htmlFor="numeroChassi">Nº CHASSI</label>
                    <input
                      type="text"
                      id="numeroChassi"
                      name="numeroChassi"
                      placeholder="DIGITE O NÚMERO DO CHASSI"
                      value={formData.numeroChassi}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row-ambulancia">
                  <div className="form-group-ambulancia">
                    <label htmlFor="placa">PLACA</label>
                    <input
                      type="text"
                      id="placa"
                      name="placa"
                      placeholder="ABC1234"
                      value={formData.placa}
                      onChange={handleInputChange}
                      maxLength="7"
                    />
                  </div>
                  <div className="form-group-ambulancia">
                    <label htmlFor="renavam">RENAVAM</label>
                    <input
                      type="text"
                      id="renavam"
                      name="renavam"
                      placeholder="DIGITE O RENAVAM"
                      value={formData.renavam}
                      onChange={handleInputChange}
                      maxLength="11"
                    />
                  </div>
                </div>

                <div className="form-row-ambulancia">
                  <div className="form-group-ambulancia">
                    <label htmlFor="corPredominante">COR PREDOMINANTE</label>
                    <div className="input-with-upload">
                      <input
                        type="text"
                        id="corPredominante"
                        name="corPredominante"
                        placeholder="DIGITE A COR"
                        value={formData.corPredominante}
                        onChange={handleInputChange}
                      />
                      <label className="btn-upload-ambulancia">
                        <i className="bi bi-arrow-up-circle-fill"></i>
                        DOCUMENTO VEÍCULO
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange(e, 'documentoVeiculo')}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-group-ambulancia">
                    <label htmlFor="cnpjCpfProprietario">CNPJ OU CPF DO PROPRIETÁRIO</label>
                    <input
                      type="text"
                      id="cnpjCpfProprietario"
                      name="cnpjCpfProprietario"
                      placeholder="000.000.000-00 ou 00.000.000/0000-00"
                      value={formData.cnpjCpfProprietario}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Uploads de Documentos */}
                <div className="form-group-ambulancia">
                  <label>APÓLICE DE SEGURO DA AMBULÂNCIA</label>
                  <label className="btn-upload-ambulancia-full">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    ENVIAR DOCUMENTO
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'apoliceSeguro')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                <div className="form-group-ambulancia">
                  <label>DECLARAÇÃO CONDIÇÕES DE HIGIENE E CONS...</label>
                  <label className="btn-upload-ambulancia-full">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    ENVIAR DOCUMENTO
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'declaracaoHigiene')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                <div className="form-group-ambulancia">
                  <label>COMPROVANTE DE VISTORIA CRMV</label>
                  <label className="btn-upload-ambulancia-full">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    ENVIAR DOCUMENTO
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'comprovanteVistoriaCRMV')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                <div className="form-group-ambulancia">
                  <label>ALVARÁ DA VIGILÂNCIA SANITÁRIA</label>
                  <label className="btn-upload-ambulancia-full">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    ENVIAR DOCUMENTO
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'alvaraVigilanciaSanitaria')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                <div className="form-group-ambulancia">
                  <label>VISTORIA DO CORPO DE BOMBEIROS</label>
                  <label className="btn-upload-ambulancia-full">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    ENVIAR DOCUMENTO
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'vistoriaBombeiros')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                {/* Tipo de Combustível */}
                <div className="form-section-ambulancia">
                  <div className="section-header-ambulancia">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    <label>TIPO DE COMBUSTÍVEL</label>
                  </div>
                  <div className="radio-group-ambulancia">
                    <label className="radio-option-ambulancia">
                      <input
                        type="radio"
                        name="tipoCombustivel"
                        value="gasolina"
                        checked={formData.tipoCombustivel === 'gasolina'}
                        onChange={handleInputChange}
                      />
                      <span>GASOLINA</span>
                    </label>
                    <label className="radio-option-ambulancia">
                      <input
                        type="radio"
                        name="tipoCombustivel"
                        value="diesel"
                        checked={formData.tipoCombustivel === 'diesel'}
                        onChange={handleInputChange}
                      />
                      <span>DIESEL</span>
                    </label>
                    <label className="radio-option-ambulancia">
                      <input
                        type="radio"
                        name="tipoCombustivel"
                        value="flex"
                        checked={formData.tipoCombustivel === 'flex'}
                        onChange={handleInputChange}
                      />
                      <span>FLEX</span>
                    </label>
                    <label className="radio-option-ambulancia">
                      <input
                        type="radio"
                        name="tipoCombustivel"
                        value="eletrico"
                        checked={formData.tipoCombustivel === 'eletrico'}
                        onChange={handleInputChange}
                      />
                      <span>ELÉTRICO</span>
                    </label>
                  </div>
                </div>

                {/* Manutenção */}
                <div className="form-section-ambulancia">
                  <div className="section-header-ambulancia">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    <label>MANUTENÇÃO</label>
                  </div>
                  <div className="form-row-ambulancia">
                    <div className="form-group-ambulancia">
                      <label htmlFor="quilometragem">QUILOMETRAGEM</label>
                      <input
                        type="text"
                        id="quilometragem"
                        name="quilometragem"
                        placeholder="DIGITE A QUILOMETRAGEM"
                        value={formData.quilometragem}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-ambulancia">
                      <label htmlFor="ultimaRevisao">ÚLTIMA REVISÃO</label>
                      <input
                        type="date"
                        id="ultimaRevisao"
                        name="ultimaRevisao"
                        value={formData.ultimaRevisao}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-row-ambulancia">
                    <div className="form-group-ambulancia">
                      <label htmlFor="proximaRevisao">PRÓXIMA REVISÃO</label>
                      <input
                        type="date"
                        id="proximaRevisao"
                        name="proximaRevisao"
                        value={formData.proximaRevisao}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-ambulancia">
                      <label htmlFor="seguradora">SEGURADORA</label>
                      <input
                        type="text"
                        id="seguradora"
                        name="seguradora"
                        placeholder="DIGITE A SEGURADORA"
                        value={formData.seguradora}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group-ambulancia">
                    <label htmlFor="numeroApolice">NÚMERO DA APÓLICE</label>
                    <input
                      type="text"
                      id="numeroApolice"
                      name="numeroApolice"
                      placeholder="DIGITE O NÚMERO DA APÓLICE"
                      value={formData.numeroApolice}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Status da Ambulância */}
                <div className="form-section-ambulancia">
                  <div className="section-header-ambulancia">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    <label>STATUS DA AMBULÂNCIA</label>
                  </div>
                  <div className="radio-group-ambulancia">
                    <label className="radio-option-ambulancia">
                      <input
                        type="radio"
                        name="statusAmbulancia"
                        value="ativa"
                        checked={formData.statusAmbulancia === 'ativa'}
                        onChange={handleInputChange}
                      />
                      <span>ATIVA</span>
                    </label>
                    <label className="radio-option-ambulancia">
                      <input
                        type="radio"
                        name="statusAmbulancia"
                        value="inativa"
                        checked={formData.statusAmbulancia === 'inativa'}
                        onChange={handleInputChange}
                      />
                      <span>INATIVA</span>
                    </label>
                    <label className="radio-option-ambulancia">
                      <input
                        type="radio"
                        name="statusAmbulancia"
                        value="manutencao"
                        checked={formData.statusAmbulancia === 'manutencao'}
                        onChange={handleInputChange}
                      />
                      <span>MANUTENÇÃO</span>
                    </label>
                  </div>
                </div>

                {/* Tipo de Ambulância */}
                <div className="form-section-ambulancia">
                  <div className="section-header-ambulancia">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    <label>TIPO DE AMBULÂNCIA</label>
                  </div>
                  <div className="radio-group-ambulancia">
                    <label className="radio-option-ambulancia">
                      <input
                        type="radio"
                        name="tipoAmbulancia"
                        value="tipoA"
                        checked={formData.tipoAmbulancia === 'tipoA'}
                        onChange={handleInputChange}
                      />
                      <span>TIPO A</span>
                    </label>
                    <label className="radio-option-ambulancia">
                      <input
                        type="radio"
                        name="tipoAmbulancia"
                        value="tipoB"
                        checked={formData.tipoAmbulancia === 'tipoB'}
                        onChange={handleInputChange}
                      />
                      <span>TIPO B</span>
                    </label>
                    <label className="radio-option-ambulancia">
                      <input
                        type="radio"
                        name="tipoAmbulancia"
                        value="tipoC"
                        checked={formData.tipoAmbulancia === 'tipoC'}
                        onChange={handleInputChange}
                      />
                      <span>TIPO C</span>
                    </label>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="ambulancia-form-actions">
                  <button type="submit" className="btn-proximo-ambulancia">
                    PRÓXIMO
                  </button>
                  <Link to="/login" className="btn-ja-tem-conta-ambulancia">
                    JÁ TEM CONTA?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CadastroAmbulancia;

