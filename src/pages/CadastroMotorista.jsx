import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CadastroMotorista.css';
import artySegurandogato from '../assets/artySegurandogato.webp';

const CadastroMotorista = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpf: '',
    rgCni: '',
    fotoRgCni: null,
    dataNascimento: '',
    nacionalidade: '',
    ruaAvenida: '',
    cep: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cnh: '',
    validadeCnh: '',
    categoriaCnh: '',
    declaracaoVinculoRT: null,
    certificadoCursoEmergencia: null,
    saudeOcupacionalASO: null,
    certificadoTreinamentoTransporte: null,
    declaracaoVinculoEmpresa: null,
    contratoTrabalho: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cep') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cnh') {
      const formatted = value.replace(/\D/g, '').slice(0, 11);
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
      // TODO: Implementar chamada à API de cadastro do motorista
      console.log('Dados do motorista:', formData);
      // Navega para o cadastro da empresa
      navigate('/cadastro-empresa');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <>
      <section className="cadastro-motorista-page">
        <div className="cadastro-motorista-container">
          <div className="cadastro-motorista-content">
            <div className="motorista-mascot">
              <img src={artySegurandogato} alt="Mascote" className="mascot-image" />
            </div>

            <div className="motorista-form-wrapper">
              <h1 className="motorista-titulo">CADASTRO DA AMBULÂNCIA</h1>
              
              <form onSubmit={handleSubmit} className="motorista-form">
                {/* DADOS DO MOTORISTA */}
                <div className="form-section-motorista">
                  <div className="section-header-motorista">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    <label>DADOS DO MOTORISTA</label>
                  </div>

                  <div className="form-group-motorista">
                    <label htmlFor="nomeCompleto">NOME COMPLETO DO MOTORISTA</label>
                    <input
                      type="text"
                      id="nomeCompleto"
                      name="nomeCompleto"
                      placeholder="DIGITE O NOME COMPLETO"
                      value={formData.nomeCompleto}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row-motorista">
                    <div className="form-group-motorista">
                      <label htmlFor="cpf">CPF</label>
                      <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        placeholder="000.000.000-00"
                        maxLength="14"
                        value={formData.cpf}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-motorista">
                      <label htmlFor="rgCni">RG OU CNI</label>
                      <div className="input-with-upload">
                        <input
                          type="text"
                          id="rgCni"
                          name="rgCni"
                          placeholder="DIGITE O RG OU CNI"
                          value={formData.rgCni}
                          onChange={handleInputChange}
                        />
                        <label className="btn-upload-motorista">
                          <i className="bi bi-arrow-up-circle-fill"></i>
                          ENVIAR
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange(e, 'fotoRgCni')}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-row-motorista">
                    <div className="form-group-motorista">
                      <label htmlFor="dataNascimento">DATA DE NASCIMENTO</label>
                      <input
                        type="date"
                        id="dataNascimento"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-motorista">
                      <label htmlFor="nacionalidade">NACIONALIDADE</label>
                      <input
                        type="text"
                        id="nacionalidade"
                        name="nacionalidade"
                        placeholder="DIGITE A NACIONALIDADE"
                        value={formData.nacionalidade}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group-motorista">
                    <label htmlFor="ruaAvenida">RUA/AVENIDA</label>
                    <input
                      type="text"
                      id="ruaAvenida"
                      name="ruaAvenida"
                      placeholder="DIGITE A RUA OU AVENIDA"
                      value={formData.ruaAvenida}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row-motorista">
                    <div className="form-group-motorista">
                      <label htmlFor="cep">CEP</label>
                      <input
                        type="text"
                        id="cep"
                        name="cep"
                        placeholder="00000-000"
                        maxLength="9"
                        value={formData.cep}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-motorista">
                      <label htmlFor="numero">NÚMERO</label>
                      <input
                        type="text"
                        id="numero"
                        name="numero"
                        placeholder="DIGITE O NÚMERO"
                        value={formData.numero}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group-motorista">
                    <label htmlFor="complemento">COMPLEMENTO (EX: APTO 101, BLOCO B, CASA 2)</label>
                    <input
                      type="text"
                      id="complemento"
                      name="complemento"
                      placeholder="DIGITE O COMPLEMENTO"
                      value={formData.complemento}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group-motorista">
                    <label htmlFor="bairro">BAIRRO</label>
                    <input
                      type="text"
                      id="bairro"
                      name="bairro"
                      placeholder="DIGITE O BAIRRO"
                      value={formData.bairro}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row-motorista">
                    <div className="form-group-motorista">
                      <label htmlFor="cidade">CIDADE</label>
                      <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        placeholder="DIGITE A CIDADE"
                        value={formData.cidade}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-motorista">
                      <label htmlFor="estado">ESTADO (UF)</label>
                      <select
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                      >
                        <option value="">SELECIONE</option>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row-motorista">
                    <div className="form-group-motorista">
                      <label htmlFor="cnh">CNH</label>
                      <input
                        type="text"
                        id="cnh"
                        name="cnh"
                        placeholder="DIGITE O NÚMERO DA CNH"
                        maxLength="11"
                        value={formData.cnh}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-motorista">
                      <label htmlFor="validadeCnh">VALIDADE DA CNH</label>
                      <input
                        type="date"
                        id="validadeCnh"
                        name="validadeCnh"
                        value={formData.validadeCnh}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* CATEGORIA DA CNH */}
                <div className="form-section-motorista">
                  <div className="section-header-motorista">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    <label>CATEGORIA DA CNH</label>
                  </div>
                  <div className="radio-group-motorista">
                    <label className="radio-option-motorista">
                      <input
                        type="radio"
                        name="categoriaCnh"
                        value="B"
                        checked={formData.categoriaCnh === 'B'}
                        onChange={handleInputChange}
                      />
                      <span>B</span>
                    </label>
                    <label className="radio-option-motorista">
                      <input
                        type="radio"
                        name="categoriaCnh"
                        value="C"
                        checked={formData.categoriaCnh === 'C'}
                        onChange={handleInputChange}
                      />
                      <span>C</span>
                    </label>
                    <label className="radio-option-motorista">
                      <input
                        type="radio"
                        name="categoriaCnh"
                        value="D"
                        checked={formData.categoriaCnh === 'D'}
                        onChange={handleInputChange}
                      />
                      <span>D</span>
                    </label>
                  </div>
                </div>

                {/* ANEXAR DOCUMENTOS */}
                <div className="form-section-motorista">
                  <div className="section-header-motorista">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    <label>ANEXAR DOCUMENTOS</label>
                  </div>

                  <div className="form-group-motorista">
                    <label>DECLARAÇÃO DE VÍNCULO COM RT</label>
                    <label className="btn-upload-motorista-full">
                      <i className="bi bi-arrow-up-circle-fill"></i>
                      ENVIAR DOCUMENTO
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'declaracaoVinculoRT')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  <div className="form-group-motorista">
                    <label>CERTIFICADO DO CURSO TRANSPORTE DE EMERGÊNCIA</label>
                    <label className="btn-upload-motorista-full">
                      <i className="bi bi-arrow-up-circle-fill"></i>
                      ENVIAR DOCUMENTO
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'certificadoCursoEmergencia')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  <div className="form-group-motorista">
                    <label>SAÚDE OCUPACIONAL (ASO)</label>
                    <label className="btn-upload-motorista-full">
                      <i className="bi bi-arrow-up-circle-fill"></i>
                      ENVIAR DOCUMENTO
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'saudeOcupacionalASO')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  <div className="form-group-motorista">
                    <label>CERTIFICADO DE TREINAMENTO EM TRANSPORTE</label>
                    <label className="btn-upload-motorista-full">
                      <i className="bi bi-arrow-up-circle-fill"></i>
                      ENVIAR DOCUMENTO
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'certificadoTreinamentoTransporte')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  <div className="form-group-motorista">
                    <label>DECLARAÇÃO DE VÍNCULO COM EMPRESA</label>
                    <label className="btn-upload-motorista-full">
                      <i className="bi bi-arrow-up-circle-fill"></i>
                      ENVIAR DOCUMENTO
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'declaracaoVinculoEmpresa')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  <div className="form-group-motorista">
                    <label>CONTRATO DE TRABALHO</label>
                    <label className="btn-upload-motorista-full">
                      <i className="bi bi-arrow-up-circle-fill"></i>
                      ENVIAR DOCUMENTO
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'contratoTrabalho')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="motorista-form-actions">
                  <button type="submit" className="btn-proximo-motorista">
                    PRÓXIMO
                  </button>
                  <Link to="/login" className="btn-ja-tem-conta-motorista">
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

export default CadastroMotorista;

