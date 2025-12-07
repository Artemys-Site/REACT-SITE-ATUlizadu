import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './cadastroVeterinario.css';
import artySegurandogato from '../assets/artySegurandogato.webp';

const CadastroVeterinario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    nascimentoDia: '',
    nascimentoMes: '',
    nascimentoAno: '',
    genero: '',
    rgCpf: '',
    fotoRgCpf: null,
    numeroCRMV: '',
    fotoCRMV: null,
    celular: '',
    telefone: '',
    cnpj: '',
    rruaAvenida: '',
    cep: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'rgCpf') {
      // Formata como CPF ou CNPJ dependendo do tamanho
      const cleaned = value.replace(/\D/g, '');
      let formatted = '';
      if (cleaned.length <= 11) {
        formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
      } else {
        formatted = cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5').slice(0, 18);
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cnpj') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5').slice(0, 18);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cep') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'celular') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').slice(0, 15);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'telefone') {
      const cleaned = value.replace(/\D/g, '');
      let formatted = '';
      if (cleaned.length <= 10) {
        formatted = cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3').slice(0, 14);
      } else {
        formatted = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').slice(0, 15);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Integração com backend será implementada
    alert('Cadastro realizado com sucesso!');
    sessionStorage.removeItem('cadastro_ambulancia_fluxo');
    navigate('/login');
  };

  return (
    <>
      <section className="cadastro-veterinario-page">
        <div className="cadastro-veterinario-container">
          <div className="cadastro-veterinario-content">
            <div className="veterinario-mascot">
              <img src={artySegurandogato} alt="Mascote" className="mascot-image" />
            </div>

            <div className="veterinario-form-wrapper">
              <h1 className="veterinario-titulo">CADASTRO DO VETERINÁRIO</h1>
              
              <form onSubmit={handleSubmit} className="veterinario-form">
                <div className="form-group-veterinario">
                  <label htmlFor="nome-veterinario">NOME COMPLETO *</label>
                  <input
                    type="text"
                    id="nome-veterinario"
                    name="nome"
                    placeholder="DIGITE O NOME COMPLETO"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row-veterinario">
                  <div className="form-group-veterinario">
                    <label htmlFor="nascimentoDia">DATA DE NASCIMENTO (DIA) *</label>
                    <input
                      type="text"
                      id="nascimentoDia"
                      name="nascimentoDia"
                      placeholder="DD"
                      maxLength="2"
                      value={formData.nascimentoDia}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-veterinario">
                    <label htmlFor="nascimentoMes">MÊS *</label>
                    <input
                      type="text"
                      id="nascimentoMes"
                      name="nascimentoMes"
                      placeholder="MM"
                      maxLength="2"
                      value={formData.nascimentoMes}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-veterinario">
                    <label htmlFor="nascimentoAno">ANO *</label>
                    <input
                      type="text"
                      id="nascimentoAno"
                      name="nascimentoAno"
                      placeholder="AAAA"
                      maxLength="4"
                      value={formData.nascimentoAno}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-veterinario">
                  <label>GÊNERO *</label>
                  <div className="radio-group-veterinario">
                    <label className="radio-option-veterinario">
                      <input
                        type="radio"
                        name="genero"
                        value="Masculino"
                        checked={formData.genero === "Masculino"}
                        onChange={handleInputChange}
                        required
                      />
                      <span>MASCULINO</span>
                    </label>
                    <label className="radio-option-veterinario">
                      <input
                        type="radio"
                        name="genero"
                        value="Feminino"
                        checked={formData.genero === "Feminino"}
                        onChange={handleInputChange}
                      />
                      <span>FEMININO</span>
                    </label>
                    <label className="radio-option-veterinario">
                      <input
                        type="radio"
                        name="genero"
                        value="Outro"
                        checked={formData.genero === "Outro"}
                        onChange={handleInputChange}
                      />
                      <span>OUTRO</span>
                    </label>
                  </div>
                </div>

                <div className="form-group-veterinario">
                  <label htmlFor="rgCpf">RG/CPF *</label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      id="rgCpf"
                      name="rgCpf"
                      placeholder="000.000.000-00"
                      maxLength="18"
                      value={formData.rgCpf}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="btn-upload">
                      <i className="bi bi-arrow-up-circle-fill"></i>
                      FOTO DO DOCUMENTO
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'fotoRgCpf')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>

                <div className="form-group-veterinario">
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

                <div className="form-row-veterinario two-columns">
                  <div className="form-group-veterinario">
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
                  <div className="form-group-veterinario">
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

                <div className="form-group-veterinario">
                  <label htmlFor="cnpj">CNPJ (OPCIONAL)</label>
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

                <div className="form-group-veterinario">
                  <label htmlFor="rruaAvenida">RUA/AVENIDA *</label>
                  <input
                    type="text"
                    id="rruaAvenida"
                    name="rruaAvenida"
                    placeholder="DIGITE A RUA OU AVENIDA"
                    value={formData.rruaAvenida}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row-veterinario two-columns">
                  <div className="form-group-veterinario">
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
                  <div className="form-group-veterinario">
                    <label htmlFor="numero">NÚMERO *</label>
                    <input
                      type="text"
                      id="numero"
                      name="numero"
                      placeholder="DIGITE O NÚMERO"
                      value={formData.numero}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-veterinario">
                  <label htmlFor="complemento">COMPLEMENTO *</label>
                  <input
                    type="text"
                    id="complemento"
                    name="complemento"
                    placeholder="DIGITE O COMPLEMENTO"
                    value={formData.complemento}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-veterinario">
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

                <div className="form-row-veterinario two-columns">
                  <div className="form-group-veterinario">
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
                  <div className="form-group-veterinario">
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


                <div className="veterinario-form-actions">
                  <button type="submit" className="btn-proximo-veterinario">
                    PRÓXIMO
                  </button>
                  <Link to="/login" className="btn-ja-tem-conta-veterinario">
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

export default CadastroVeterinario;

