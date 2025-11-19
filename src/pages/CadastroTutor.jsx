import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CadastroTutor.css';

const CadastroTutor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    diaNascimento: '',
    mesNascimento: '',
    anoNascimento: '',
    genero: '',
    cpf: '',
    fotoDocumento: null,
    celular: '',
    telefone: '',
    ruaAvenida: '',
    cep: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    email: '',
    confirmacaoEmail: '',
    senha: '',
    confirmacaoSenha: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
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
    
    // Validações
    if (formData.email !== formData.confirmacaoEmail) {
      alert('Os emails não coincidem!');
      return;
    }
    
    if (formData.senha !== formData.confirmacaoSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    
    try {
      // TODO: Implementar chamada à API de cadastro
      // const response = await api.registerTutor(formData);
      // 
      // Se o backend retornar dados do usuário após cadastro:
      // const userData = response.data;
      // login(userData);
      // navigate('/');
      // 
      // Ou redirecionar para login:
      // navigate('/login');
      
      // Placeholder: remover quando backend estiver pronto
      console.log('Dados do tutor:', formData);
      alert('Cadastro será implementado pelo backend');
      navigate('/login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <>
      <section className="cadastro-tutor-page">
        <div className="cadastro-tutor-container">
          <div className="cadastro-tutor-content">
            <div className="tutor-mascot">
              <img src="/artySegurandogato.webp" alt="Mascote" className="mascot-image" />
            </div>

            <div className="tutor-form-wrapper">
              <h1 className="tutor-titulo">CADASTRO DO TUTOR</h1>
              
              <form onSubmit={handleSubmit} className="tutor-form">
                <div className="form-group-tutor">
                  <label htmlFor="nome-completo">NOME COMPLETO *</label>
                  <input
                    type="text"
                    id="nome-completo"
                    name="nomeCompleto"
                    placeholder="DIGITE SEU NOME COMPLETO"
                    value={formData.nomeCompleto}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-tutor">
                  <label>
                    <i className="bi bi-exclamation-circle"></i>
                    DATA DE NASCIMENTO *
                  </label>
                  <div className="form-row-tutor">
                    <div className="form-group-tutor">
                      <input
                        type="text"
                        name="diaNascimento"
                        placeholder="DIA"
                        maxLength="2"
                        value={formData.diaNascimento}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group-tutor">
                      <input
                        type="text"
                        name="mesNascimento"
                        placeholder="MÊS"
                        maxLength="2"
                        value={formData.mesNascimento}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group-tutor">
                      <input
                        type="text"
                        name="anoNascimento"
                        placeholder="ANO"
                        maxLength="4"
                        value={formData.anoNascimento}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group-tutor">
                  <label>
                    <i className="bi bi-exclamation-circle"></i>
                    GÊNERO *
                  </label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="genero"
                        value="masculino"
                        checked={formData.genero === 'masculino'}
                        onChange={handleInputChange}
                        required
                      />
                      <span>O MASCULINO</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="genero"
                        value="feminino"
                        checked={formData.genero === 'feminino'}
                        onChange={handleInputChange}
                      />
                      <span>O FEMININO</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="genero"
                        value="outro"
                        checked={formData.genero === 'outro'}
                        onChange={handleInputChange}
                      />
                      <span>O OUTRO</span>
                    </label>
                  </div>
                </div>

                <div className="form-group-tutor">
                  <label htmlFor="cpf">CPF *</label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="btn-upload">
                      <i className="bi bi-arrow-up-circle-fill"></i>
                      FOTO DO DOCUMENTO
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'fotoDocumento')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>

                <div className="form-row-tutor two-columns">
                  <div className="form-group-tutor">
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
                  <div className="form-group-tutor">
                    <label htmlFor="telefone">TELEFONE (OPICIONAL)</label>
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

                <div className="form-group-tutor">
                  <label htmlFor="rua-avenida">RUA/AVENIDA *</label>
                  <input
                    type="text"
                    id="rua-avenida"
                    name="ruaAvenida"
                    placeholder="DIGITE A RUA OU AVENIDA"
                    value={formData.ruaAvenida}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row-tutor two-columns">
                  <div className="form-group-tutor">
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
                  <div className="form-group-tutor">
                    <label htmlFor="numero">NÚMERO *</label>
                    <input
                      type="text"
                      id="numero"
                      name="numero"
                      placeholder="000"
                      value={formData.numero}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-tutor">
                  <label htmlFor="complemento">COMPLEMENTO (EX: APTO 101,BLOCO B, CASA 2)</label>
                  <input
                    type="text"
                    id="complemento"
                    name="complemento"
                    placeholder="DIGITE O COMPLEMENTO"
                    value={formData.complemento}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group-tutor">
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

                <div className="form-row-tutor two-columns">
                  <div className="form-group-tutor">
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
                  <div className="form-group-tutor">
                    <label htmlFor="estado">ESTADO (UF) *</label>
                    <input
                      type="text"
                      id="estado"
                      name="estado"
                      placeholder="UF"
                      maxLength="2"
                      value={formData.estado}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-tutor">
                  <label htmlFor="email">EMAIL *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="DIGITE SEU EMAIL"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-tutor">
                  <label htmlFor="confirmacao-email">CONFIRMAÇÃO DE EMAIL *</label>
                  <input
                    type="email"
                    id="confirmacao-email"
                    name="confirmacaoEmail"
                    placeholder="CONFIRME SEU EMAIL"
                    value={formData.confirmacaoEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row-tutor two-columns">
                  <div className="form-group-tutor">
                    <label htmlFor="senha">SENHA *</label>
                    <input
                      type="password"
                      id="senha"
                      name="senha"
                      placeholder="DIGITE SUA SENHA"
                      value={formData.senha}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-tutor">
                    <label htmlFor="confirmacao-senha">CONFIRMAÇÃO DE SENHA *</label>
                    <input
                      type="password"
                      id="confirmacao-senha"
                      name="confirmacaoSenha"
                      placeholder="CONFIRME SUA SENHA"
                      value={formData.confirmacaoSenha}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="tutor-form-actions">
                  <button type="submit" className="btn-cadastrar">
                    CADASTRAR
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

export default CadastroTutor;

