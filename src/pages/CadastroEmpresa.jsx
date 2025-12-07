import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CadastroEmpresa.css';
import artySegurandogato from '../assets/artySegurandogato.webp';

const CadastroEmpresa = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Dados da Empresa
    nomeEmpresa: '',
    nomeFantasia: '',
    cnpj: '',
    inscricaoEstadualMunicipal: '',
    numeroCRMV: '',
    fotoCRMV: null,
    endereco: '',
    cep: '',
    bairro: '',
    cidade: '',
    estado: '',
    celular: '',
    telefone: '',
    // Informações do Dono ou Representante Legal
    nomeCompleto: '',
    cpf: '',
    rgCni: '',
    fotoRgCni: null,
    dataNascimento: '',
    nacionalidade: '',
    ruaAvenida: '',
    cepRepresentante: '',
    numero: '',
    complemento: '',
    bairroRepresentante: '',
    cidadeRepresentante: '',
    estadoRepresentante: '',
    celularRepresentante: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cnpj') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5').slice(0, 18);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cep' || name === 'cepRepresentante') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'celular' || name === 'telefone' || name === 'celularRepresentante') {
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
      // TODO: Implementar chamada à API de cadastro da empresa
      console.log('Dados da empresa:', formData);
      // Navega para o cadastro do responsável técnico
      navigate('/cadastro-responsavel-tecnico');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <>
      <section className="cadastro-empresa-page">
        <div className="cadastro-empresa-container">
          <div className="cadastro-empresa-content">
            <div className="empresa-mascot">
              <img src={artySegurandogato} alt="Mascote" className="mascot-image" />
            </div>

            <div className="empresa-form-wrapper">
              <h1 className="empresa-titulo">CADASTRO DA AMBULÂNCIA</h1>
              
              <form onSubmit={handleSubmit} className="empresa-form">
                {/* DADOS DO EMPRESA */}
                <div className="form-section-empresa">
                  <div className="section-header-empresa">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    <label>DADOS DO EMPRESA</label>
                  </div>

                  <div className="form-group-empresa">
                    <label htmlFor="nomeEmpresa">NOME DA EMPRESA</label>
                    <input
                      type="text"
                      id="nomeEmpresa"
                      name="nomeEmpresa"
                      placeholder="DIGITE O NOME DA EMPRESA"
                      value={formData.nomeEmpresa}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group-empresa">
                    <label htmlFor="nomeFantasia">NOME FANTASIA DA EMPRESA (OPCIONAL)</label>
                    <input
                      type="text"
                      id="nomeFantasia"
                      name="nomeFantasia"
                      placeholder="DIGITE O NOME FANTASIA"
                      value={formData.nomeFantasia}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row-empresa">
                    <div className="form-group-empresa">
                      <label htmlFor="cnpj">CNPJ</label>
                      <input
                        type="text"
                        id="cnpj"
                        name="cnpj"
                        placeholder="00.000.000/0000-00"
                        maxLength="18"
                        value={formData.cnpj}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-empresa">
                      <label htmlFor="inscricaoEstadualMunicipal">INSCRIÇÃO ESTADUAL OU MUNICIPAL</label>
                      <input
                        type="text"
                        id="inscricaoEstadualMunicipal"
                        name="inscricaoEstadualMunicipal"
                        placeholder="DIGITE A INSCRIÇÃO"
                        value={formData.inscricaoEstadualMunicipal}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group-empresa">
                    <label htmlFor="numeroCRMV">NUMERO DO CRMV</label>
                    <div className="input-with-upload">
                      <input
                        type="text"
                        id="numeroCRMV"
                        name="numeroCRMV"
                        placeholder="DIGITE O NUMERO DO CRMV"
                        value={formData.numeroCRMV}
                        onChange={handleInputChange}
                      />
                      <label className="btn-upload-empresa">
                        <i className="bi bi-arrow-up-circle-fill"></i>
                        ANEXAR DOCUMENTO
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange(e, 'fotoCRMV')}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="form-group-empresa">
                    <label htmlFor="endereco">ENDEREÇO</label>
                    <input
                      type="text"
                      id="endereco"
                      name="endereco"
                      placeholder="DIGITE O ENDEREÇO"
                      value={formData.endereco}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row-empresa">
                    <div className="form-group-empresa">
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
                    <div className="form-group-empresa">
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
                  </div>

                  <div className="form-row-empresa">
                    <div className="form-group-empresa">
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
                    <div className="form-group-empresa">
                      <label htmlFor="estado">ESTADO</label>
                      <select
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                      >
                        <option value="">SELECIONE</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row-empresa">
                    <div className="form-group-empresa">
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
                    <div className="form-group-empresa">
                      <label htmlFor="telefone">TELEFONE</label>
                      <input
                        type="text"
                        id="telefone"
                        name="telefone"
                        placeholder="(00) 0000-0000"
                        value={formData.telefone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* INFORMAÇÕES DO DONO OU REPRESENTANTE LEGAL */}
                <div className="form-section-empresa">
                  <div className="section-header-empresa">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    <label>INFORMAÇÕES DO DONO OU REPRESENTANTE LEGAL</label>
                  </div>

                  <div className="form-group-empresa">
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

                  <div className="form-row-empresa">
                    <div className="form-group-empresa">
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
                    <div className="form-group-empresa">
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
                        <label className="btn-upload-empresa">
                          <i className="bi bi-arrow-up-circle-fill"></i>
                          RG OU CNI
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

                  <div className="form-row-empresa">
                    <div className="form-group-empresa">
                      <label htmlFor="dataNascimento">DATA DE NASCIMENTO</label>
                      <input
                        type="date"
                        id="dataNascimento"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-empresa">
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

                  <div className="form-group-empresa">
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

                  <div className="form-row-empresa">
                    <div className="form-group-empresa">
                      <label htmlFor="cepRepresentante">CEP</label>
                      <input
                        type="text"
                        id="cepRepresentante"
                        name="cepRepresentante"
                        placeholder="00000-000"
                        maxLength="9"
                        value={formData.cepRepresentante}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-empresa">
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

                  <div className="form-group-empresa">
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

                  <div className="form-group-empresa">
                    <label htmlFor="bairroRepresentante">BAIRRO</label>
                    <input
                      type="text"
                      id="bairroRepresentante"
                      name="bairroRepresentante"
                      placeholder="DIGITE O BAIRRO"
                      value={formData.bairroRepresentante}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row-empresa">
                    <div className="form-group-empresa">
                      <label htmlFor="cidadeRepresentante">CIDADE</label>
                      <input
                        type="text"
                        id="cidadeRepresentante"
                        name="cidadeRepresentante"
                        placeholder="DIGITE A CIDADE"
                        value={formData.cidadeRepresentante}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-empresa">
                      <label htmlFor="estadoRepresentante">ESTADO (UF)</label>
                      <select
                        id="estadoRepresentante"
                        name="estadoRepresentante"
                        value={formData.estadoRepresentante}
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

                  <div className="form-row-empresa">
                    <div className="form-group-empresa">
                      <label htmlFor="celularRepresentante">CELULAR</label>
                      <input
                        type="text"
                        id="celularRepresentante"
                        name="celularRepresentante"
                        placeholder="(00) 00000-0000"
                        value={formData.celularRepresentante}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-empresa">
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

                {/* Botões de Ação */}
                <div className="empresa-form-actions">
                  <button type="submit" className="btn-proximo-empresa">
                    PRÓXIMO
                  </button>
                  <Link to="/login" className="btn-ja-tem-conta-empresa">
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

export default CadastroEmpresa;

