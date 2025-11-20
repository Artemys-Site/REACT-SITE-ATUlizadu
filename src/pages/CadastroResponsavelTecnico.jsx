import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CadastroResponsavelTecnico.css';
import artySegurandogato from '../assets/artySegurandogato.webp';

const CadastroResponsavelTecnico = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    diaNascimento: '',
    mesNascimento: '',
    anoNascimento: '',
    genero: 'masculino',
    rgCpf: '',
    fotoDocumento: null,
    celular: '',
    telefone: '',
    numeroCRMV: '',
    fotoCRMV: null,
    inicioResponsavelTecnico: '',
    horarioAtuacao: '',
    termoResponsabilidade: null,
    cadastrarAmbulancia: 'nao'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'celular' || name === 'telefone') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').slice(0, 15);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'rgCpf') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
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
      // TODO: Implementar chamada à API de cadastro do responsável técnico
      // const tempToken = localStorage.getItem('clinica_temp_token');
      // const response = await api.registerResponsavelTecnico(formData, tempToken);
      // 
      // Se o backend retornar dados do usuário após cadastro completo:
      // const userData = response.data;
      // login(userData);
      // localStorage.removeItem('clinica_temp_token');
      // navigate('/painel-clinica');
      // 
      // Ou redirecionar para login:
      // localStorage.removeItem('clinica_temp_token');
      // alert('Cadastro realizado com sucesso! Faça login para continuar.');
      // navigate('/login');
      
      // Placeholder: remover quando backend estiver pronto
      console.log('Dados do responsável técnico:', formData);
      alert('Cadastro será implementado pelo backend');
      navigate('/login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <>
      <section className="cadastro-responsavel-page">
        <div className="cadastro-responsavel-container">
          <div className="cadastro-responsavel-content">
            <div className="responsavel-mascot">
              <img src={artySegurandogato} alt="Mascote" className="mascot-image" />
            </div>

            <div className="responsavel-form-wrapper">
              <h1 className="responsavel-titulo">CADASTRO RESPONSAVEL TECNICO</h1>
              
              <form onSubmit={handleSubmit} className="responsavel-form">
                <div className="form-group-responsavel">
                  <label htmlFor="nome-completo">NOME COMPLETO DO RESPONSÁVEL TÉCNICO *</label>
                  <input
                    type="text"
                    id="nome-completo"
                    name="nomeCompleto"
                    placeholder="DIGITE O NOME COMPLETO"
                    value={formData.nomeCompleto}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-responsavel">
                  <label>Data de NASCIMENTO *</label>
                  <div className="form-row-responsavel">
                    <div className="form-group-responsavel">
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
                    <div className="form-group-responsavel">
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
                    <div className="form-group-responsavel">
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

                <div className="form-group-responsavel">
                  <label>GÊNERO *</label>
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
                      <span>MASCULINO</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="genero"
                        value="feminino"
                        checked={formData.genero === 'feminino'}
                        onChange={handleInputChange}
                      />
                      <span>FEMININO</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="genero"
                        value="outro"
                        checked={formData.genero === 'outro'}
                        onChange={handleInputChange}
                      />
                      <span>OUTRO</span>
                    </label>
                  </div>
                </div>

                <div className="form-group-responsavel">
                  <label htmlFor="rg-cpf">RG / CPF *</label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      id="rg-cpf"
                      name="rgCpf"
                      placeholder="000.000.000-00"
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
                        onChange={(e) => handleFileChange(e, 'fotoDocumento')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>

                <div className="form-row-responsavel two-columns">
                  <div className="form-group-responsavel">
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
                  <div className="form-group-responsavel">
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

                <div className="form-group-responsavel">
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

                <div className="form-group-responsavel">
                  <label htmlFor="inicio-responsavel">INICIO RESP. TÉCNICO *</label>
                  <input
                    type="date"
                    id="inicio-responsavel"
                    name="inicioResponsavelTecnico"
                    value={formData.inicioResponsavelTecnico}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-responsavel">
                  <label htmlFor="horario-atuacao">Horário de ATUAÇÃO *</label>
                  <input
                    type="text"
                    id="horario-atuacao"
                    name="horarioAtuacao"
                    placeholder="EX: 08:00 - 18:00"
                    value={formData.horarioAtuacao}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-responsavel">
                  <label className="btn-upload btn-upload-large">
                    <i className="bi bi-arrow-up-circle-fill"></i>
                    UPLOAD TERMO DE RESPONSABILIDADE (TRT)
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'termoResponsabilidade')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                <div className="form-group-responsavel">
                  <label>Quer Cadastrar sua AmBULÂNCIA *</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="cadastrarAmbulancia"
                        value="sim"
                        checked={formData.cadastrarAmbulancia === 'sim'}
                        onChange={handleInputChange}
                        required
                      />
                      <span>SIM</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="cadastrarAmbulancia"
                        value="nao"
                        checked={formData.cadastrarAmbulancia === 'nao'}
                        onChange={handleInputChange}
                      />
                      <span>NÃO</span>
                    </label>
                  </div>
                </div>

                <div className="responsavel-form-actions">
                  <button type="submit" className="btn-proximo">
                    PROXIMO
                  </button>
                  <button 
                    type="button" 
                    className="btn-voltar"
                    onClick={() => navigate('/cadastro-clinica')}
                  >
                    VOLTAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CadastroResponsavelTecnico;

