import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CadastroTutor.css';
import artySegurandogato from '../assets/artySegurandogato.webp';

const CadastroTutor = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Dados da tabela Tutor
    ncTutor: '',
    dnTutor: '',
    gTutor: '',
    cpfTutor: '',
    fcpfTutor: null,
    emailTutor: '',
    senhaTutor: '',
    
    // Campos auxiliares para o formulário
    confirmacaoEmail: '',
    confirmacaoSenha: '',
    diaNascimento: '',
    mesNascimento: '',
    anoNascimento: '',

    // Dados da tabela endTutor
    fkEndTutorEndTutorPkNavigation: {
      cepTutor: '',
      ruaTutor: '',
      numeroRuaTutor: '',
      bairroTutor: '',
      cidadeTutor: '',
      estadoTutor: '',
      complemento: ''
    },

    // Dados da tabela numCTutor
    fkNumCtutorNumCtutorPkNavigation: {
      numCtutor1: ''
    },

    // Dados da tabela numTTutor
    fkNumTtutorNumTtutorPkNavigation: {
      numTtutor1: ''
    }
  });

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      fcpfTutor: e.target.files[0]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;

    // SEMPRE remove letras primeiro
    const numbersOnly = value.replace(/\D/g, '');

    // Aplica formatações específicas
    switch (name) {
      case 'cpfTutor':
        formattedValue = numbersOnly.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
        break;
      
      case 'endTutor.cepTutor':
        formattedValue = numbersOnly.replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
        break;
      
      case 'numCTutor.numCtutor1':
      case 'numTTutor.numTtutor1':
        if (numbersOnly.length === 11) {
          formattedValue = numbersOnly.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (numbersOnly.length === 10) {
          formattedValue = numbersOnly.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
          formattedValue = numbersOnly;
        }
        break;
      
      case 'diaNascimento':
      case 'mesNascimento': 
      case 'anoNascimento':
      case 'endTutor.numeroRuaTutor':
        formattedValue = numbersOnly; // Só números
        break;
      
      default:
        formattedValue = value; // Mantém original para outros campos
    }

    // Resto do código (atualização do state) permanece igual...
    if (name.startsWith('endTutor.')) {
      const field = name.split('.')[1];
      setFormData(prevData => ({
        ...prevData,
        fkEndTutorEndTutorPkNavigation: {
          ...prevData.fkEndTutorEndTutorPkNavigation,
          [field]: formattedValue
        }
      }));
    }
    else if (name.startsWith('numCTutor.')) {
      const field = name.split('.')[1];
      setFormData(prevData => ({
        ...prevData,
        fkNumCtutorNumCtutorPkNavigation: {
          ...prevData.fkNumCtutorNumCtutorPkNavigation,
          [field]: formattedValue
        }
      }));
    }
    else if (name.startsWith('numTTutor.')) {
      const field = name.split('.')[1];
      setFormData(prevData => ({
        ...prevData,
        fkNumTtutorNumTtutorPkNavigation: {
          ...prevData.fkNumTtutorNumTtutorPkNavigation,
          [field]: formattedValue
        }
      }));
    }
    else {
      setFormData(prevData => ({
        ...prevData,
        [name]: formattedValue
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validações
    if (formData.emailTutor !== formData.confirmacaoEmail) {
      alert('Erro: O campo E-mail e Confirmação de E-mail não coincidem.');
      setIsLoading(false);
      return;
    }
    if (formData.senhaTutor !== formData.confirmacaoSenha) {
      alert('Erro: O campo Senha e Confirmação de Senha não coincidem.');
      setIsLoading(false);
      return;
    }

    // Formatar data de nascimento
    const dnTutor = `${formData.anoNascimento}-${formData.mesNascimento.padStart(2, '0')}-${formData.diaNascimento.padStart(2, '0')}`;

    // Preparar dados para a API
    const tutorData = {
      ncTutor: formData.ncTutor,
      dnTutor: dnTutor,
      gTutor: formData.gTutor,
      cpfTutor: formData.cpfTutor.replace(/\D/g, ''),
      fcpfTutor: formData.fcpfTutor ? "caminho/temporario" : null,
      emailTutor: formData.emailTutor,
      senhaTutor: formData.senhaTutor,
      
      fkEndTutorEndTutorPkNavigation: {
        cepTutor: formData.fkEndTutorEndTutorPkNavigation.cepTutor.replace(/\D/g, ''),
        ruaTutor: formData.fkEndTutorEndTutorPkNavigation.ruaTutor,
        numeroRuaTutor: formData.fkEndTutorEndTutorPkNavigation.numeroRuaTutor,
        bairroTutor: formData.fkEndTutorEndTutorPkNavigation.bairroTutor,
        cidadeTutor: formData.fkEndTutorEndTutorPkNavigation.cidadeTutor,
        estadoTutor: formData.fkEndTutorEndTutorPkNavigation.estadoTutor
        // Nota: compTutor não é enviado no cadastro inicial pois a coluna não existe no banco
        // O complemento pode ser adicionado posteriormente via edição do perfil
      },
      
      fkNumCtutorNumCtutorPkNavigation: {
        numCtutor1: formData.fkNumCtutorNumCtutorPkNavigation.numCtutor1.replace(/\D/g, '')
      },
      
      fkNumTtutorNumTtutorPkNavigation: formData.fkNumTtutorNumTtutorPkNavigation.numTtutor1 ? {
        numTtutor1: formData.fkNumTtutorNumTtutorPkNavigation.numTtutor1.replace(/\D/g, '')
      } : null
    };

    try {
      const response = await axios.post('/api/Tutors', tutorData);

      if (response.status === 201) {
        alert('Tutor cadastrado com sucesso!');
        const novoTutorId = response.data.idTutor;
        navigate(`/cadastro-pet?tutorId=${novoTutorId}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar Tutor:', error.response ? error.response.data : error.message);
      alert('Erro no cadastro. Verifique os dados e o console do navegador.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="cadastro-tutor-page">
        <div className="cadastro-tutor-container">
          <div className="cadastro-tutor-content">
            <div className="tutor-mascot">
              <img src={artySegurandogato} alt="Mascote" className="mascot-image" />
            </div>

            <div className="tutor-form-wrapper">
              <h1 className="tutor-titulo">CADASTRO DO TUTOR</h1>
              
              <form onSubmit={handleSubmit} className="tutor-form">
                {/* Nome Completo */}
                <div className="form-group-tutor">
                  <label htmlFor="ncTutor">NOME COMPLETO *</label>
                  <input
                    type="text"
                    id="ncTutor"
                    name="ncTutor"
                    placeholder="DIGITE SEU NOME COMPLETO"
                    value={formData.ncTutor}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        name="gTutor"
                        value="Masculino"
                        checked={formData.gTutor === 'Masculino'}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                      />
                      <span>O MASCULINO</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gTutor"
                        value="Feminino"
                        checked={formData.gTutor === 'Feminino'}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                      <span>O FEMININO</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gTutor"
                        value="Outro"
                        checked={formData.gTutor === 'Outro'}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                      <span>O OUTRO</span>
                    </label>
                  </div>
                </div>

                {/* CPF */}
                <div className="form-group-tutor">
                  <label htmlFor="cpfTutor">CPF *</label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      id="cpfTutor"
                      name="cpfTutor"
                      placeholder="000.000.000-00"
                      value={formData.cpfTutor}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                    <label className="btn-upload">
                      <i className="bi bi-arrow-up-circle-fill"></i>
                      FOTO DO DOCUMENTO
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        disabled={isLoading}
                      />
                    </label>
                  </div>
                </div>

                {/* Contatos */}
                <div className="form-row-tutor two-columns">
                  <div className="form-group-tutor">
                    <label htmlFor="numCtutor1">CELULAR *</label>
                    <input
                      type="text"
                      id="numCtutor1"
                      name="numCTutor.numCtutor1"
                      placeholder="(00) 00000-0000"
                      value={formData.fkNumCtutorNumCtutorPkNavigation.numCtutor1}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group-tutor">
                    <label htmlFor="numTtutor1">TELEFONE (OPCIONAL)</label>
                    <input
                      type="text"
                      id="numTtutor1"
                      name="numTTutor.numTtutor1"
                      placeholder="(00) 0000-0000"
                      value={formData.fkNumTtutorNumTtutorPkNavigation.numTtutor1}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Endereço */}
                <div className="form-group-tutor">
                  <label htmlFor="ruaTutor">RUA/AVENIDA *</label>
                  <input
                    type="text"
                    id="ruaTutor"
                    name="endTutor.ruaTutor"
                    placeholder="DIGITE A RUA OU AVENIDA"
                    value={formData.fkEndTutorEndTutorPkNavigation.ruaTutor}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-row-tutor two-columns">
                  <div className="form-group-tutor">
                    <label htmlFor="cepTutor">CEP *</label>
                    <input
                      type="text"
                      id="cepTutor"
                      name="endTutor.cepTutor"
                      placeholder="00000-000"
                      maxLength="9"
                      value={formData.fkEndTutorEndTutorPkNavigation.cepTutor}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group-tutor">
                    <label htmlFor="numeroRuaTutor">NÚMERO *</label>
                    <input
                      type="text"
                      id="numeroRuaTutor"
                      name="endTutor.numeroRuaTutor"
                      placeholder="000"
                      value={formData.fkEndTutorEndTutorPkNavigation.numeroRuaTutor}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="form-group-tutor">
                  <label htmlFor="complemento">COMPLEMENTO (EX: APTO 101, BLOCO B, CASA 2)</label>
                  <input
                    type="text"
                    id="complemento"
                    name="endTutor.complemento"
                    placeholder="DIGITE O COMPLEMENTO"
                    value={formData.fkEndTutorEndTutorPkNavigation.complemento}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group-tutor">
                  <label htmlFor="bairroTutor">BAIRRO *</label>
                  <input
                    type="text"
                    id="bairroTutor"
                    name="endTutor.bairroTutor"
                    placeholder="DIGITE O BAIRRO"
                    value={formData.fkEndTutorEndTutorPkNavigation.bairroTutor}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-row-tutor two-columns">
                  <div className="form-group-tutor">
                    <label htmlFor="cidadeTutor">CIDADE *</label>
                    <input
                      type="text"
                      id="cidadeTutor"
                      name="endTutor.cidadeTutor"
                      placeholder="DIGITE A CIDADE"
                      value={formData.fkEndTutorEndTutorPkNavigation.cidadeTutor}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group-tutor">
                    <label htmlFor="estadoTutor">ESTADO (UF) *</label>
                    <input
                      type="text"
                      id="estadoTutor"
                      name="endTutor.estadoTutor"
                      placeholder="UF"
                      maxLength="2"
                      value={formData.fkEndTutorEndTutorPkNavigation.estadoTutor}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Email e Senha */}
                <div className="form-group-tutor">
                  <label htmlFor="emailTutor">EMAIL *</label>
                  <input
                    type="email"
                    id="emailTutor"
                    name="emailTutor"
                    placeholder="DIGITE SEU EMAIL"
                    value={formData.emailTutor}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group-tutor">
                  <label htmlFor="confirmacaoEmail">CONFIRMAÇÃO DE EMAIL *</label>
                  <input
                    type="email"
                    id="confirmacaoEmail"
                    name="confirmacaoEmail"
                    placeholder="CONFIRME SEU EMAIL"
                    value={formData.confirmacaoEmail}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-row-tutor two-columns">
                  <div className="form-group-tutor">
                    <label htmlFor="senhaTutor">SENHA *</label>
                    <input
                      type="password"
                      id="senhaTutor"
                      name="senhaTutor"
                      placeholder="DIGITE SUA SENHA"
                      value={formData.senhaTutor}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group-tutor">
                    <label htmlFor="confirmacaoSenha">CONFIRMAÇÃO DE SENHA *</label>
                    <input
                      type="password"
                      id="confirmacaoSenha"
                      name="confirmacaoSenha"
                      placeholder="CONFIRME SUA SENHA"
                      value={formData.confirmacaoSenha}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="tutor-form-actions">
                  <button 
                    type="submit" 
                    className="btn-cadastrar"
                    disabled={isLoading}
                  >
                    {isLoading ? 'CADASTRANDO...' : 'CADASTRAR'}
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

