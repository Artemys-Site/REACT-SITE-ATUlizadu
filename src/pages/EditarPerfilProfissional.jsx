import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './EditarPerfilProfissional.css';

const EditarPerfilProfissional = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // dados iniciais - depois vem do backend
  const [formData, setFormData] = useState({
    nomeCompleto: 'LAURA CARVALHO',
    tituloProfissional: 'Dr',
    email: 'LAURA.CARVALHO@ARTEMYS.COM',
    telefone: '(11) 98765-4321',
    especialidade: 'CARDIOLOGIA VETERINÁRIA',
    crmv: 'CRMV-SP 12345',
    especies: ['CANINOS', 'FELINOS'],
    anosExperiencia: '8',
    localizacao: 'CONSULTÓRIO 2 - ARTEMYS',
    sobre: '',
    statusAtivo: true,
    fotoPerfil: '/drAnaPaula.png',
    horarios: {
      segunda: { ativo: true, inicio: '', fim: '' },
      terca: { ativo: true, inicio: '', fim: '' },
      quarta: { ativo: true, inicio: '', fim: '' },
      quinta: { ativo: true, inicio: '', fim: '' },
      sexta: { ativo: true, inicio: '', fim: '' },
      sabado: { ativo: false, inicio: '', fim: '' },
      domingo: { ativo: false, inicio: '', fim: '' }
    },
    formacao: [
      { tipo: 'GRADUAÇÃO EM MEDICINA VETERINÁRIA', ano: '2015', instituicao: 'UFMV' },
      { tipo: 'PÓS-GRADUAÇÃO EM CARDIOLOGIA VETERINÁRIA', ano: '2017', instituicao: 'ANCLIVEPA' },
      { tipo: 'ESPECIALIZAÇÃO EM ECOCARDIOGRAFIA', ano: '2019', instituicao: 'INSTITUTO VETCARDIO' }
    ],
    certificacoes: ['CRMV-SP 12345', 'ECOCARDIOGRAFIA', 'CARDIOLOGIA CERTIFICADA', 'EMERGÊNCIAS CARDÍACAS']
  });

  const [novaCertificacao, setNovaCertificacao] = useState('');
  const [novaFormacao, setNovaFormacao] = useState({ tipo: '', ano: '', instituicao: '' });

  const especiesOptions = ['CANINOS', 'FELINOS', 'AVES', 'ANIMAIS EXÓTICOS'];
  const titulosOptions = ['Dr', 'Dra', 'Drª', 'Prof', 'Profa'];
  const especialidadesOptions = ['CARDIOLOGIA VETERINÁRIA', 'DERMATOLOGIA', 'ORTOPEDIA', 'ONCOLOGIA', 'CIRURGIA', 'NEUROLOGIA', 'OFTALMOLOGIA', 'GERAL'];
  const diasSemana = [
    { key: 'segunda', label: 'SEGUNDA-FEIRA' },
    { key: 'terca', label: 'TERÇA-FEIRA' },
    { key: 'quarta', label: 'QUARTA-FEIRA' },
    { key: 'quinta', label: 'QUINTA-FEIRA' },
    { key: 'sexta', label: 'SEXTA-FEIRA' },
    { key: 'sabado', label: 'SÁBADO' },
    { key: 'domingo', label: 'DOMINGO' }
  ];

  useEffect(() => {
    // TODO: buscar dados do profissional pelo ID do backend
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEspeciesToggle = (especie) => {
    setFormData(prev => {
      const especies = prev.especies.includes(especie)
        ? prev.especies.filter(e => e !== especie)
        : [...prev.especies, especie];
      return { ...prev, especies };
    });
  };

  const handleStatusToggle = () => {
    setFormData(prev => ({ ...prev, statusAtivo: !prev.statusAtivo }));
  };

  const handleHorarioToggle = (dia) => {
    setFormData(prev => ({
      ...prev,
      horarios: {
        ...prev.horarios,
        [dia]: {
          ...prev.horarios[dia],
          ativo: !prev.horarios[dia].ativo
        }
      }
    }));
  };

  const handleHorarioChange = (dia, campo, valor) => {
    setFormData(prev => ({
      ...prev,
      horarios: {
        ...prev.horarios,
        [dia]: {
          ...prev.horarios[dia],
          [campo]: valor
        }
      }
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, fotoPerfil: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFoto = () => {
    setFormData(prev => ({ ...prev, fotoPerfil: null }));
  };

  const handleAddFormacao = () => {
    if (novaFormacao.tipo && novaFormacao.ano && novaFormacao.instituicao) {
      setFormData(prev => ({
        ...prev,
        formacao: [...prev.formacao, novaFormacao]
      }));
      setNovaFormacao({ tipo: '', ano: '', instituicao: '' });
    }
  };

  const handleRemoveFormacao = (index) => {
    setFormData(prev => ({
      ...prev,
      formacao: prev.formacao.filter((_, i) => i !== index)
    }));
  };

  const handleAddCertificacao = () => {
    if (novaCertificacao.trim()) {
      setFormData(prev => ({
        ...prev,
        certificacoes: [...prev.certificacoes, novaCertificacao.trim()]
      }));
      setNovaCertificacao('');
    }
  };

  const handleRemoveCertificacao = (index) => {
    setFormData(prev => ({
      ...prev,
      certificacoes: prev.certificacoes.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.especies.length === 0) {
      alert('Selecione pelo menos uma espécie atendida');
      return;
    }

    try {
      // TODO: implementar chamada à API de atualização do profissional
      console.log('Dados atualizados:', formData);
      alert('Alterações salvas com sucesso!');
      navigate(`/perfil-profissional/${id}`);
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      alert('Erro ao salvar alterações. Tente novamente.');
    }
  };

  const handleCancel = () => {
    if (window.confirm('Tem certeza que deseja cancelar? As alterações não salvas serão perdidas.')) {
      navigate(`/perfil-profissional/${id}`);
    }
  };

  return (
    <section className="editar-perfil-profissional-page">
      {/* header fixo com botões */}
      <div className="editar-perfil-header-bar">
        <Link to={`/perfil-profissional/${id}`} className="btn-voltar-editar">
          <i className="bi bi-arrow-left"></i>
          VOLTAR
        </Link>
        <div className="editar-perfil-header-actions">
          <button className="btn-cancelar-editar" onClick={handleCancel}>
            <i className="bi bi-x-circle"></i>
            CANCELAR
          </button>
          <button className="btn-salvar-editar" onClick={handleSubmit}>
            <i className="bi bi-check-circle"></i>
            SALVAR ALTERAÇÕES
          </button>
        </div>
      </div>

      <div className="editar-perfil-container">
        <div className="editar-perfil-header">
          <h1 className="editar-perfil-titulo">EDITAR PERFIL DO PROFISSIONAL</h1>
          <p className="editar-perfil-subtitulo">GERENCIE AS INFORMAÇÕES DO VETERINÁRIO</p>
        </div>

        {/* alerta informativo */}
        <div className="editar-perfil-alert">
          <i className="bi bi-exclamation-circle"></i>
          <div>
            <strong>CONTROLE ADMINISTRATIVO DA CLÍNICA.</strong> ESTA ÁREA É DE USO EXCLUSIVO DA ADMINISTRAÇÃO DA CLÍNICA. 
            TODAS AS ALTERAÇÕES FEITAS AQUI SERÃO REFLETIDAS NO PERFIL DO PROFISSIONAL.
          </div>
        </div>

        {/* conteúdo principal - duas colunas */}
        <form onSubmit={handleSubmit} className="editar-perfil-form">
          <div className="editar-perfil-grid">
            {/* coluna esquerda */}
            <div className="editar-perfil-coluna-esquerda">
              {/* informações básicas */}
              <div className="editar-perfil-secao">
                <div className="secao-header-editar">
                  <i className="bi bi-person"></i>
                  <h3 className="secao-titulo-editar">INFORMAÇÕES BÁSICAS</h3>
                </div>
                <p className="secao-subtitulo-editar">DADOS PESSOAIS E PROFISSIONAIS DO VETERINÁRIO</p>

                <div className="form-group-editar">
                  <label htmlFor="nome-completo">Nome Completo *</label>
                  <input
                    type="text"
                    id="nome-completo"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-editar">
                  <label htmlFor="titulo-profissional">Título Profissional</label>
                  <select
                    id="titulo-profissional"
                    name="tituloProfissional"
                    value={formData.tituloProfissional}
                    onChange={handleInputChange}
                  >
                    {titulosOptions.map(titulo => (
                      <option key={titulo} value={titulo}>{titulo}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group-editar">
                  <label htmlFor="email">Email Profissional *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-editar">
                  <label htmlFor="telefone">Telefone *</label>
                  <input
                    type="text"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-editar">
                  <label htmlFor="especialidade">Especialidade</label>
                  <select
                    id="especialidade"
                    name="especialidade"
                    value={formData.especialidade}
                    onChange={handleInputChange}
                  >
                    {especialidadesOptions.map(esp => (
                      <option key={esp} value={esp}>{esp}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group-editar">
                  <label htmlFor="crmv">CRMV *</label>
                  <input
                    type="text"
                    id="crmv"
                    name="crmv"
                    value={formData.crmv}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-editar">
                  <label>Espécies Atendidas *</label>
                  <div className="especies-toggle-group">
                    {especiesOptions.map(especie => (
                      <label key={especie} className="toggle-especie-label">
                        <span className="toggle-especie-name">{especie}</span>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={formData.especies.includes(especie)}
                            onChange={() => handleEspeciesToggle(especie)}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group-editar">
                  <label htmlFor="anos-experiencia">Anos de Experiência</label>
                  <input
                    type="number"
                    id="anos-experiencia"
                    name="anosExperiencia"
                    value={formData.anosExperiencia}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                <div className="form-group-editar">
                  <label htmlFor="localizacao">Localização</label>
                  <input
                    type="text"
                    id="localizacao"
                    name="localizacao"
                    value={formData.localizacao}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* horários de trabalho */}
              <div className="editar-perfil-secao">
                <div className="secao-header-editar">
                  <i className="bi bi-clock"></i>
                  <h3 className="secao-titulo-editar">HORÁRIOS DE TRABALHO</h3>
                </div>
                <p className="secao-subtitulo-editar">CONFIGURE OS DIAS E HORÁRIOS DE ATENDIMENTO</p>

                <div className="horarios-lista">
                  {diasSemana.map(dia => (
                    <div key={dia.key} className="horario-item">
                      <label className="toggle-horario-label">
                        <span className="toggle-horario-name">{dia.label}</span>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={formData.horarios[dia.key].ativo}
                            onChange={() => handleHorarioToggle(dia.key)}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </label>
                      {formData.horarios[dia.key].ativo && (
                        <div className="horario-inputs">
                          <input
                            type="text"
                            placeholder="09:00"
                            value={formData.horarios[dia.key].inicio}
                            onChange={(e) => handleHorarioChange(dia.key, 'inicio', e.target.value)}
                            className="horario-input"
                          />
                          <span className="horario-separator">ATÉ</span>
                          <input
                            type="text"
                            placeholder="17:00"
                            value={formData.horarios[dia.key].fim}
                            onChange={(e) => handleHorarioChange(dia.key, 'fim', e.target.value)}
                            className="horario-input"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* sobre o profissional */}
              <div className="editar-perfil-secao">
                <div className="secao-header-editar">
                  <i className="bi bi-heart-pulse"></i>
                  <h3 className="secao-titulo-editar">SOBRE O PROFISSIONAL</h3>
                </div>
                <p className="secao-subtitulo-editar">BIOGRAFIA E APRESENTAÇÃO DO VETERINÁRIO</p>

                <div className="form-group-editar">
                  <label htmlFor="sobre">BIOGRAFIA</label>
                  <textarea
                    id="sobre"
                    name="sobre"
                    value={formData.sobre}
                    onChange={handleInputChange}
                    rows="8"
                    placeholder="DESCREVA A EXPERIÊNCIA E QUALIFICAÇÕES DO PROFISSIONAL..."
                  ></textarea>
                </div>
              </div>

              {/* formação acadêmica */}
              <div className="editar-perfil-secao">
                <div className="secao-header-editar">
                  <i className="bi bi-mortarboard"></i>
                  <h3 className="secao-titulo-editar">FORMAÇÃO ACADÊMICA</h3>
                </div>
                <p className="secao-subtitulo-editar">ADICIONE CURSOS, GRADUAÇÕES E ESPECIALIZAÇÕES</p>

                <div className="formacao-lista-editar">
                  {formData.formacao.map((item, index) => (
                    <div key={index} className="formacao-item-editar">
                      <div className="formacao-info">
                        <div className="formacao-tipo-editar">{item.tipo}</div>
                        <div className="formacao-detalhes-editar">
                          <span className="formacao-ano-editar">{item.ano}</span>
                          <span className="formacao-instituicao-editar">{item.instituicao}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-remover-formacao"
                        onClick={() => handleRemoveFormacao(index)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="form-group-editar formacao-nova">
                  <div className="formacao-nova-grid">
                    <input
                      type="text"
                      placeholder="CURSO/GRAU"
                      value={novaFormacao.tipo}
                      onChange={(e) => setNovaFormacao({ ...novaFormacao, tipo: e.target.value })}
                      className="formacao-input"
                    />
                    <input
                      type="text"
                      placeholder="ANO"
                      value={novaFormacao.ano}
                      onChange={(e) => setNovaFormacao({ ...novaFormacao, ano: e.target.value })}
                      className="formacao-input"
                    />
                    <input
                      type="text"
                      placeholder="INSTITUIÇÃO"
                      value={novaFormacao.instituicao}
                      onChange={(e) => setNovaFormacao({ ...novaFormacao, instituicao: e.target.value })}
                      className="formacao-input"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn-adicionar-formacao"
                    onClick={handleAddFormacao}
                  >
                    <i className="bi bi-plus-circle"></i>
                    ADICIONAR FORMAÇÃO
                  </button>
                </div>
              </div>
            </div>

            {/* coluna direita */}
            <div className="editar-perfil-coluna-direita">
              {/* foto do perfil */}
              <div className="editar-perfil-secao">
                <h3 className="secao-titulo-editar">FOTO DO PERFIL</h3>
                <div className="foto-perfil-wrapper">
                  {formData.fotoPerfil && (
                    <img src={formData.fotoPerfil} alt="Foto do perfil" className="foto-perfil-preview" />
                  )}
                  <div className="foto-perfil-actions">
                    <label className="btn-alterar-foto">
                      <i className="bi bi-upload"></i>
                      ALTERAR FOTO
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <button
                      type="button"
                      className="btn-remover-foto"
                      onClick={handleRemoveFoto}
                    >
                      <i className="bi bi-trash"></i>
                      REMOVER FOTO
                    </button>
                  </div>
                  <p className="foto-perfil-info">RECOMENDADO: IMAGEM QUADRADA COM NO MÍNIMO 400X400 PIXELS</p>
                </div>
              </div>

              {/* status do profissional */}
              <div className="editar-perfil-secao">
                <h3 className="secao-titulo-editar">STATUS DO PROFISSIONAL</h3>
                <div className="status-profissional-wrapper">
                  <div className="status-profissional-info">
                    <span className={`status-badge ${formData.statusAtivo ? 'status-ativo' : 'status-inativo'}`}>
                      <i className={`bi bi-${formData.statusAtivo ? 'check-circle' : 'x-circle'}`}></i>
                      {formData.statusAtivo ? 'PROFISSIONAL ATIVO' : 'PROFISSIONAL INATIVO'}
                    </span>
                    <p className="status-subtitulo">DISPONÍVEL PARA AGENDAMENTOS</p>
                  </div>
                  <label className="toggle-switch toggle-status">
                    <input
                      type="checkbox"
                      checked={formData.statusAtivo}
                      onChange={handleStatusToggle}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              {/* estatísticas */}
              <div className="editar-perfil-secao">
                <h3 className="secao-titulo-editar">ESTATÍSTICAS</h3>
                <div className="estatisticas-grid">
                  <div className="estatistica-item">
                    <span className="estatistica-label">PACIENTES ATIVOS</span>
                    <span className="estatistica-value estatistica-purple">342</span>
                  </div>
                  <div className="estatistica-item">
                    <span className="estatistica-label">CONSULTAS/MÊS</span>
                    <span className="estatistica-value estatistica-orange">48</span>
                  </div>
                  <div className="estatistica-item">
                    <span className="estatistica-label">AVALIAÇÃO</span>
                    <span className="estatistica-value estatistica-yellow">
                      <i className="bi bi-star-fill"></i>
                      5.0
                    </span>
                  </div>
                </div>
              </div>

              {/* zona de perigo */}
              <div className="editar-perfil-secao zona-perigo">
                <h3 className="secao-titulo-editar">ZONA DE PERIGO</h3>
                <p className="secao-subtitulo-editar">AÇÕES PERMANENTES QUE NÃO PODEM SER DESFEITAS</p>
                <button
                  type="button"
                  className="btn-excluir-profissional"
                  onClick={() => {
                    if (window.confirm('Tem certeza que deseja excluir este profissional? Esta ação não pode ser desfeita.')) {
                      // TODO: implementar exclusão
                      navigate('/profissionais-clinica');
                    }
                  }}
                >
                  <i className="bi bi-trash"></i>
                  EXCLUIR PROFISSIONAL
                </button>
              </div>

              {/* certificações */}
              <div className="editar-perfil-secao">
                <div className="secao-header-editar">
                  <i className="bi bi-award"></i>
                  <h3 className="secao-titulo-editar">CERTIFICAÇÕES E QUALIFICAÇÕES</h3>
                </div>
                <p className="secao-subtitulo-editar">CERTIFICADOS, CURSOS E QUALIFICAÇÕES ADICIONAIS</p>

                <div className="certificacoes-tags-editar">
                  {formData.certificacoes.map((cert, index) => (
                    <span key={index} className="certificacao-tag-editar">
                      {cert}
                      <button
                        type="button"
                        className="certificacao-remove"
                        onClick={() => handleRemoveCertificacao(index)}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </span>
                  ))}
                </div>

                <div className="form-group-editar certificacao-nova">
                  <input
                    type="text"
                    placeholder="DIGITE UMA NOVA CERTIFICAÇÃO..."
                    value={novaCertificacao}
                    onChange={(e) => setNovaCertificacao(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCertificacao();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn-adicionar-certificacao"
                    onClick={handleAddCertificacao}
                  >
                    <i className="bi bi-plus-circle"></i>
                    ADICIONAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* barra inferior fixa */}
      <div className="editar-perfil-bottom-bar">
        <p className="bottom-bar-text">LEMBRE-SE DE SALVAR AS ALTERAÇÕES ANTES DE SAIR</p>
        <div className="bottom-bar-actions">
          <button className="btn-cancelar-bottom" onClick={handleCancel}>
            <i className="bi bi-x-circle"></i>
            CANCELAR
          </button>
          <button className="btn-salvar-bottom" onClick={handleSubmit}>
            <i className="bi bi-check-circle"></i>
            SALVAR TODAS AS ALTERAÇÕES
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditarPerfilProfissional;

