import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CadastroClinica.css';
import artySegurandogato from '../assets/artySegurandogato.webp';

const CadastroClinica = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeClinica: '',
    nomeFantasia: '',
    cnpj: '',
    email: '',
    numeroCRMV: '',
    fotoCRMV: null,
    endereco: '',
    cep: '',
    bairro: '',
    cidade: '',
    estado: '',
    celular: '',
    telefone: '',
    numeroAlvara: '',
    fotoAlvara: null,
    validadeAlvaraDe: '',
    validadeAlvaraAte: '',
    numeroVigilancia: '',
    fotoVigilancia: null,
    validadeVigilanciaDe: '',
    validadeVigilanciaAte: '',
    numeroAVCB: '',
    fotoAVCB: null,
    validadeAVCBDe: '',
    validadeAVCBAte: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cnpj') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5').slice(0, 18);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cep') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'celular' || name === 'telefone') {
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
      // TODO: Implementar chamada à API de cadastro da clínica
      // const response = await api.registerClinica(formData);
      // 
      // Se o backend retornar um ID ou token temporário para continuar o cadastro:
      // const tempToken = response.data.tempToken;
      // localStorage.setItem('clinica_temp_token', tempToken);
      // navigate('/cadastro-responsavel-tecnico');
      // 
      // Ou se o backend gerenciar a sessão de cadastro:
      // navigate('/cadastro-responsavel-tecnico');
      
      // Placeholder: remover quando backend estiver pronto
      console.log('Dados da clínica:', formData);
      alert('Cadastro será implementado pelo backend');
      navigate('/cadastro-responsavel-tecnico');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <>
      <section className="cadastro-clinica-page">
        <div className="cadastro-clinica-container">
          <div className="cadastro-clinica-content">
            <div className="clinica-mascot">
              <img src={artySegurandogato} alt="Mascote" className="mascot-image" />
            </div>

            <div className="clinica-form-wrapper">
              <h1 className="clinica-titulo">CADASTRO DA CLINICA</h1>
              
              <form onSubmit={handleSubmit} className="clinica-form">
                <div className="form-group-clinica">
                  <label htmlFor="nome-clinica">NOME DA CLINICA *</label>
                  <input
                    type="text"
                    id="nome-clinica"
                    name="nomeClinica"
                    placeholder="DIGITE O NOME DA CLINICA"
                    value={formData.nomeClinica}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-clinica">
                  <label htmlFor="nome-fantasia">NOME FANTASIA DA CLINICA (OPCIONAL)</label>
                  <input
                    type="text"
                    id="nome-fantasia"
                    name="nomeFantasia"
                    placeholder="DIGITE O NOME FANTASIA"
                    value={formData.nomeFantasia}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group-clinica">
                  <label htmlFor="cnpj">CNPJ *</label>
                  <input
                    type="text"
                    id="cnpj"
                    name="cnpj"
                    placeholder="00.000.000/0000-00"
                    maxLength="18"
                    value={formData.cnpj}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-clinica">
                  <label htmlFor="numero-crmv">NUMERO DO CRMV *</label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      id="numero-crmv"
                      name="numeroCRMV"
                      placeholder="DIGITE O NUMERO DO CRMV"
                      value={formData.numeroCRMV}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="btn-upload">
                      <i className="bi bi-arrow-up-circle-fill"></i>
                      FOTO DO DOCUMENTO
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'fotoCRMV')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>

                <div className="form-group-clinica">
                  <label htmlFor="endereco">ENDEREÇO *</label>
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    placeholder="DIGITE O ENDEREÇO"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row-clinica">
                  <div className="form-group-clinica">
                    <label htmlFor="cep">CEP *</label>
                    <input
                      type="text"
                      id="cep"
                      name="cep"
                      placeholder="00000-000"
                      maxLength="9"
                      value={formData.cep}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-clinica">
                    <label htmlFor="bairro">BAIRRO *</label>
                    <input
                      type="text"
                      id="bairro"
                      name="bairro"
                      placeholder="DIGITE O BAIRRO"
                      value={formData.bairro}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-clinica">
                  <div className="form-group-clinica">
                    <label htmlFor="cidade">CIDADE *</label>
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      placeholder="DIGITE A CIDADE"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-clinica">
                    <label htmlFor="estado">ESTADO *</label>
                    <select
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                      required
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

                <div className="form-row-clinica">
                  <div className="form-group-clinica">
                    <label htmlFor="celular">CELULAR *</label>
                    <input
                      type="text"
                      id="celular"
                      name="celular"
                      placeholder="(00) 00000-0000"
                      value={formData.celular}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-clinica">
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

                <div className="form-group-clinica">
                  <label htmlFor="email">EMAIL *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="DIGITE O EMAIL DA CLÍNICA"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-clinica">
                  <label htmlFor="numero-alvara">N° ALVARA FUNCIONAM. *</label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      id="numero-alvara"
                      name="numeroAlvara"
                      placeholder="DIGITE O NUMERO DO ALVARA"
                      value={formData.numeroAlvara}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="btn-upload">
                      <i className="bi bi-upload"></i>
                      FOTO DO DOCUMENTO
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'fotoAlvara')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>

                <div className="form-row-clinica">
                  <div className="form-group-clinica">
                    <label htmlFor="validade-alvara-de">VALIDADE DE: *</label>
                    <input
                      type="date"
                      id="validade-alvara-de"
                      name="validadeAlvaraDe"
                      value={formData.validadeAlvaraDe}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-clinica">
                    <label htmlFor="validade-alvara-ate">ATÉ: *</label>
                    <input
                      type="date"
                      id="validade-alvara-ate"
                      name="validadeAlvaraAte"
                      value={formData.validadeAlvaraAte}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-clinica">
                  <label htmlFor="numero-vigilancia">Nº VIGILÂNCIA SANITAR. *</label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      id="numero-vigilancia"
                      name="numeroVigilancia"
                      placeholder="DIGITE O NUMERO DA VIGILANCIA"
                      value={formData.numeroVigilancia}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="btn-upload">
                      <i className="bi bi-upload"></i>
                      FOTO DO DOCUMENTO
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'fotoVigilancia')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>

                <div className="form-row-clinica">
                  <div className="form-group-clinica">
                    <label htmlFor="validade-vigilancia-de">VALIDADE DE: *</label>
                    <input
                      type="date"
                      id="validade-vigilancia-de"
                      name="validadeVigilanciaDe"
                      value={formData.validadeVigilanciaDe}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-clinica">
                    <label htmlFor="validade-vigilancia-ate">ATÉ: *</label>
                    <input
                      type="date"
                      id="validade-vigilancia-ate"
                      name="validadeVigilanciaAte"
                      value={formData.validadeVigilanciaAte}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-clinica">
                  <label htmlFor="numero-avcb">N° AVCB *</label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      id="numero-avcb"
                      name="numeroAVCB"
                      placeholder="DIGITE O NUMERO DO AVCB"
                      value={formData.numeroAVCB}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="btn-upload">
                      <i className="bi bi-upload"></i>
                      FOTO DO DOCUMENTO
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'fotoAVCB')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>

                <div className="form-row-clinica">
                  <div className="form-group-clinica">
                    <label htmlFor="validade-avcb-de">VALIDADE DE: *</label>
                    <input
                      type="date"
                      id="validade-avcb-de"
                      name="validadeAVCBDe"
                      value={formData.validadeAVCBDe}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-clinica">
                    <label htmlFor="validade-avcb-ate">ATÉ: *</label>
                    <input
                      type="date"
                      id="validade-avcb-ate"
                      name="validadeAVCBAte"
                      value={formData.validadeAVCBAte}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="clinica-form-actions">
                  <button type="submit" className="btn-proximo">
                    PROXIMO
                  </button>
                  <Link to="/login" className="btn-ja-tem-conta">
                    JA TEM CONTA?
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

export default CadastroClinica;

