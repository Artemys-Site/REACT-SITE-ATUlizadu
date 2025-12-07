import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CadastroAuxiliar.css';
import artySegurandogato from '../assets/artySegurandogato.webp';

const CadastroAuxiliar = () => {
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
    celular: '',
    email: '',
    certificadoAuxiliarVeterinario: null,
    atestadoSaudeOcupacionalASO: null,
    certificadoTransporteContencao: null,
    declaracaoVinculo: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cep') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'celular') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').slice(0, 15);
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
      // TODO: Implementar chamada à API de cadastro do auxiliar quando backend estiver pronto
      console.log('Dados do auxiliar:', formData);
      // Navega para o cadastro do auxiliar/técnica
      navigate('/cadastro-auxiliar-tecnica');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <>
      <section className="cadastro-auxiliar-page">
        <div className="cadastro-auxiliar-container">
          <div className="cadastro-auxiliar-content">
            <div className="auxiliar-mascot">
              <img src={artySegurandogato} alt="Mascote" className="mascot-image" />
            </div>

            <div className="auxiliar-form-wrapper">
              <h1 className="auxiliar-titulo">CADASTRO DA AMBULÂNCIA</h1>
              
              <form onSubmit={handleSubmit} className="auxiliar-form">
                {/* Seção AUXILIAR */}
                <div className="form-section-auxiliar">
                  <div className="section-header-auxiliar">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    <label>AUXILIAR</label>
                  </div>

                  <div className="form-group-auxiliar">
                    <label htmlFor="nomeCompleto">NOME COMPLETO</label>
                    <input
                      type="text"
                      id="nomeCompleto"
                      name="nomeCompleto"
                      placeholder="DIGITE O NOME COMPLETO"
                      value={formData.nomeCompleto}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row-auxiliar">
                    <div className="form-group-auxiliar">
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
                    <div className="form-group-auxiliar">
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
                        <label className="btn-upload-auxiliar">
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

                  <div className="form-row-auxiliar">
                    <div className="form-group-auxiliar">
                      <label htmlFor="dataNascimento">DATA DE NASCIMENTO</label>
                      <input
                        type="date"
                        id="dataNascimento"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-auxiliar">
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

                  <div className="form-group-auxiliar">
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

                  <div className="form-row-auxiliar">
                    <div className="form-group-auxiliar">
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
                    <div className="form-group-auxiliar">
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

                  <div className="form-group-auxiliar">
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

                  <div className="form-group-auxiliar">
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

                  <div className="form-row-auxiliar">
                    <div className="form-group-auxiliar">
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
                    <div className="form-group-auxiliar">
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

                  <div className="form-row-auxiliar">
                    <div className="form-group-auxiliar">
                      <label htmlFor="celular">CELULAR</label>
                      <input
                        type="text"
                        id="celular"
                        name="celular"
                        placeholder="(00) 00000-0000"
                        value={formData.celular}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-auxiliar">
                      <label htmlFor="email">EMAIL</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="DIGITE O EMAIL"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Uploads de Documentos */}
                <div className="form-group-auxiliar">
                  <label>CERTIFICADO DE AUXILIAR VETERINÁRIO</label>
                  <label className="btn-upload-auxiliar-full">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    ENVIAR DOCUMENTO
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'certificadoAuxiliarVeterinario')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                <div className="form-group-auxiliar">
                  <label>ATESTADO DE SAÚDE OCUPACIONAL (ASO)</label>
                  <label className="btn-upload-auxiliar-full">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    ENVIAR DOCUMENTO
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'atestadoSaudeOcupacionalASO')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                <div className="form-group-auxiliar">
                  <label>CERTIFICADO DE TRANSPORTE E CONTENÇÃO</label>
                  <label className="btn-upload-auxiliar-full">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    ENVIAR DOCUMENTO
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'certificadoTransporteContencao')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                <div className="form-group-auxiliar">
                  <label>DECLARAÇÃO DE VÍNCULO</label>
                  <label className="btn-upload-auxiliar-full">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    ENVIAR DOCUMENTO
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'declaracaoVinculo')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                {/* Botões de Ação */}
                <div className="auxiliar-form-actions">
                  <button type="submit" className="btn-proximo-auxiliar">
                    PRÓXIMO
                  </button>
                  <Link to="/login" className="btn-ja-tem-conta-auxiliar">
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

export default CadastroAuxiliar;

