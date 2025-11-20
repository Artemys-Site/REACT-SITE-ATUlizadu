import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CadastrarProfissional.css';
import artySegurandogato from '../assets/artySegurandogato.webp';

const CadastrarProfissional = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    especialidade: '',
    crmv: '',
    fotoCRMV: null,
    email: '',
    celular: '',
    telefone: '',
    especies: [],
    horariosDisponiveis: '',
    inicioAtuacao: '',
    fotoPerfil: null,
    observacoes: ''
  });

  const especiesOptions = ['FELINOS', 'CANINOS', 'AVES', 'PEQUENOS ROEDORES', 'REPTEIS', 'OUTROS'];
  const especialidadesOptions = ['GERAL', 'CARDIOLOGIA', 'DERMATOLOGIA', 'ORTOPEDIA', 'ONCOLOGIA', 'CIRURGIA', 'NEUROLOGIA', 'OFTALMOLOGIA', 'OUTRA'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'celular' || name === 'telefone') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').slice(0, 15);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'crmv') {
      const formatted = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEspeciesChange = (especie) => {
    setFormData(prev => {
      const especies = prev.especies.includes(especie)
        ? prev.especies.filter(e => e !== especie)
        : [...prev.especies, especie];
      return { ...prev, especies };
    });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.especies.length === 0) {
      alert('Selecione pelo menos uma espécie atendida');
      return;
    }
    
    try {
      // TODO: implementar chamada à API de cadastro do profissional
      // const response = await api.cadastrar. (isso se usar api né)
      // if (response.success) {
      //   navigate('/profissionais-clinica');
      // }
      //else
      // tela foda de erro que eu fiz (acesso negado)
      
      console.log('Dados do profissional:', formData);
      alert('Cadastro será implementado pelo backend');
      navigate('/profissionais-clinica');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <section className="cadastrar-profissional-page">
      <div className="cadastrar-profissional-container">
        <div className="cadastrar-profissional-content">
          <div className="profissional-mascot">
            <img src={artySegurandogato} alt="Mascote" className="mascot-image" />
          </div>

          <div className="profissional-form-wrapper">
            <Link to="/profissionais-clinica" className="btn-voltar-profissional">
              <i className="bi bi-arrow-left"></i>
              VOLTAR
            </Link>
            
            <h1 className="profissional-titulo">ADICIONAR PROFISSIONAL</h1>
            
            <form onSubmit={handleSubmit} className="profissional-form">
              {/* dados pessoais */}
              <div className="form-section-profissional">
                <h3 className="section-titulo">DADOS PESSOAIS</h3>
                
                <div className="form-group-profissional">
                  <label htmlFor="nome-completo">NOME COMPLETO *</label>
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

                <div className="form-row-profissional">
                  <div className="form-group-profissional">
                    <label htmlFor="email">E-MAIL *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email@exemplo.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-profissional">
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
                </div>

                <div className="form-group-profissional">
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

                <div className="form-group-profissional">
                  <label className="btn-upload-profissional btn-upload-large">
                    <i className="bi bi-camera"></i>
                    UPLOAD FOTO DE PERFIL
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'fotoPerfil')}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.fotoPerfil && (
                    <span className="file-name">{formData.fotoPerfil.name}</span>
                  )}
                </div>
              </div>

              {/* dados profissionais */}
              <div className="form-section-profissional">
                <h3 className="section-titulo">DADOS PROFISSIONAIS</h3>
                
                <div className="form-group-profissional">
                  <label htmlFor="especialidade">ESPECIALIDADE *</label>
                  <select
                    id="especialidade"
                    name="especialidade"
                    value={formData.especialidade}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">SELECIONE A ESPECIALIDADE</option>
                    {especialidadesOptions.map(esp => (
                      <option key={esp} value={esp}>{esp}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group-profissional">
                  <label htmlFor="crmv">NUMERO DO CRMV *</label>
                  <div className="input-with-button-profissional">
                    <input
                      type="text"
                      id="crmv"
                      name="crmv"
                      placeholder="DIGITE O NUMERO DO CRMV"
                      value={formData.crmv}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="btn-upload-profissional">
                      <i className="bi bi-arrow-up-circle-fill"></i>
                      FOTO DO CRMV
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'fotoCRMV')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  {formData.fotoCRMV && (
                    <span className="file-name">{formData.fotoCRMV.name}</span>
                  )}
                </div>

                <div className="form-group-profissional">
                  <label>ESPÉCIES ATENDIDAS *</label>
                  <div className="checkbox-group">
                    {especiesOptions.map(especie => (
                      <label key={especie} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.especies.includes(especie)}
                          onChange={() => handleEspeciesChange(especie)}
                        />
                        <span>{especie}</span>
                      </label>
                    ))}
                  </div>
                  {formData.especies.length === 0 && (
                    <span className="error-message">* Selecione pelo menos uma espécie</span>
                  )}
                </div>

                <div className="form-row-profissional">
                  <div className="form-group-profissional">
                    <label htmlFor="inicio-atuacao">INICIO DE ATUAÇÃO *</label>
                    <input
                      type="date"
                      id="inicio-atuacao"
                      name="inicioAtuacao"
                      value={formData.inicioAtuacao}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-profissional">
                    <label htmlFor="horarios">HORÁRIOS DISPONÍVEIS *</label>
                    <input
                      type="text"
                      id="horarios"
                      name="horariosDisponiveis"
                      placeholder="EX: 9H - 15H59"
                      value={formData.horariosDisponiveis}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* observacoes */}
              <div className="form-section-profissional">
                <h3 className="section-titulo">OBSERVAÇÕES</h3>
                
                <div className="form-group-profissional">
                  <label htmlFor="observacoes">OBSERVAÇÕES ADICIONAIS</label>
                  <textarea
                    id="observacoes"
                    name="observacoes"
                    placeholder="Adicione observações ou informações adicionais sobre o profissional..."
                    value={formData.observacoes}
                    onChange={handleInputChange}
                    rows="5"
                  ></textarea>
                </div>
              </div>

              {/* botoes */}
              <div className="profissional-form-actions">
                <button type="submit" className="btn-cadastrar-profissional">
                  <i className="bi bi-check-circle"></i>
                  CADASTRAR PROFISSIONAL
                </button>
                <Link to="/profissionais-clinica" className="btn-cancelar-profissional">
                  CANCELAR
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CadastrarProfissional;

