import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './cadastroVeterinario.css';
import mascoteCadastro from '../assets/imagemArty.png';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica de cadastro
    console.log('Dados do veterinário:', formData);
    alert('Cadastro iniciado com sucesso!');
    // Redirecionar para próxima etapa ou página de sucesso
  };

  return (
    <>
      <section className="cadastro-veterinario-page">
        <div className="cadastro-veterinario-container">
          <div className="cadastro-veterinario-content">
            <div className="veterinario-mascot">
              <img src={mascoteCadastro} alt="Mascote" className="mascot-image" />
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
                    <label className="label-title">Data de Nascimento</label>
                    <div className="dob-container">
                        <input
                        type="text"
                        maxLength="2"
                        placeholder="Dia"
                        name="nascimentoDia"
                        value={formData.nascimentoDia}
                        onChange={handleInputChange}
                        required
                        />
                        <input
                        type="text"
                        maxLength="2"
                        placeholder="Mês"
                        name="nascimentoMes"
                        value={formData.nascimentoMes}
                        onChange={handleInputChange}
                        required
                        />
                        <input
                        type="text"
                        maxLength="4"
                        placeholder="Ano"
                        name="nascimentoAno"
                        value={formData.nascimentoAno}
                        onChange={handleInputChange}
                        required
                        />
                        </div>
                    </div>


                <div className="form-row-veterinario">
                    <label className="label-title">Gênero</label>
                    <div className="genero-container">
                        <label className="genero-option">
                            <input
                            type="radio"
                            name="genero"
                            value="Masculino"
                            checked={formData.genero === "Masculino"}
                            onChange={handleInputChange}
                            /> Masculino
                            </label>
                            <label className="genero-option">
                                <input
                                type="radio"
                                name="genero"
                                value="Feminino"
                                checked={formData.genero === "Feminino"}
                                onChange={handleInputChange}
                                /> Feminino
                                </label>
                                <label className="genero-option">
                                    <input
                                    type="radio"
                                    name="genero"
                                    value="Outro"
                                    checked={formData.genero === "Outro"}
                                    onChange={handleInputChange}
                                    />
                                     Outro
                                     </label>
                                    </div>
                                </div>

                <div className="form-group-veterinario">
                  <label htmlFor="rgCpf"> RG/CPF*</label>
                  <div className="input-with-button">
                  <input
                    type="text"
                    id="rgCpf"
                    name="rgCpf"
                    placeholder="000.000.000-00"
                    maxLength="11"
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

                 <div className="form-veterinario">
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
                    <label htmlFor="telefone">TELEFONE*</label>
                    <input
                      type="text"
                      id="telefone"
                      name="telefone"
                      placeholder="0000-0000"
                      value={formData.telefone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group-veterinario">
                  <label htmlFor="cnpj">CNPJ (Opicional)</label>
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
                

                <div className="form-group-veterinario">
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

                <div className="form-veterinario">
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
                    <label htmlFor="numero">NUMERO *</label>
                    <input
                      type="text"
                      id="numero"
                      name="numero"
                      placeholder="0000000"
                      maxLength="7"
                      value={formData.numero}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  </div>

                   <div className="form-veterinario">
                   <div className="form-group-veterinario">
                    <label htmlFor="complemento">Complemento *</label>
                    <input
                      type="text"
                      id="complemento"
                      name="complemento"
                      placeholder="DIGITE O BAIRRO"
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
                </div>

                <div className="form-veterinario">
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

export default CadastroVeterinario;

