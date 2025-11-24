import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ConfiguracoesSistema.css';

const ConfiguracoesSistema = () => {
  const [activeTab, setActiveTab] = useState('modulos');
  const [activeSubTab, setActiveSubTab] = useState('principais');
  const [showCriarPagina, setShowCriarPagina] = useState(false);
  const [showEditarPerfil, setShowEditarPerfil] = useState(false);
  const [showAdicionarPerfil, setShowAdicionarPerfil] = useState(false);
  const [perfilEditando, setPerfilEditando] = useState(null);
  const [novoPerfilNome, setNovoPerfilNome] = useState('');
  const [permissoesSelecionadas, setPermissoesSelecionadas] = useState({
    'ACESSO TOTAL': true,
    'APENAS VISUALIZAÇÃO': false,
    'AGENDAMENTOS': false,
    'CRIAR AGENDAMENTO': false,
    'EDITAR AGENDAMENTO': false,
    'CANCELAR AGENDAMENTO': false,
    'PACIENTES': false,
    'CADASTRAR PACIENTE': false,
    'EDITAR PACIENTE': false,
    'EXCLUIR PACIENTE': false,
    'VISUALIZAR PROFISSIONAIS': false,
    'GERENCIAR PROFISSIONAIS': false,
    'PRONTUÁRIOS': false,
    'CRIAR PRONTUÁRIO': false,
    'EDITAR PRONTUÁRIO': false,
    'RELATÓRIOS': true,
    'EXPORTAR RELATÓRIOS': false,
    'CONFIGURAÇÕES': true,
    'CADASTROS BÁSICOS': false,
    'GESTÃO DE USUÁRIOS': true
  });
  const [nomePerfil, setNomePerfil] = useState('');
  const [novaPagina, setNovaPagina] = useState({
    nome: '',
    icone: 'bi-file-earmark',
    descricao: '',
    rota: '/',
    tipo: 'customizada',
    ativa: true,
    tag: ''
  });
  
  useEffect(() => {
    sessionStorage.setItem('contexto_clinica', 'true');
  }, []);

  // Páginas principais
  const [paginasPrincipais, setPaginasPrincipais] = useState([
    {
      id: 1,
      nome: 'PAINEL PRINCIPAL',
      icone: 'bi-house',
      tag: 'ESSENCIAL',
      descricao: 'DASHBOARD COM MÉTRICAS E VISÃO GERAL DA CLÍNICA',
      rota: '/painel-clinica',
      ativa: true
    },
    {
      id: 2,
      nome: 'PROFISSIONAIS',
      icone: 'bi-people',
      tag: 'ESSENCIAL',
      descricao: 'GERENCIAMENTO DE VETERINÁRIOS E EQUIPE',
      rota: '/profissionais-clinica',
      ativa: true
    },
    {
      id: 3,
      nome: 'PACIENTES',
      icone: 'bi-heart-pulse',
      tag: 'ESSENCIAL',
      descricao: 'CADASTRO E HISTÓRICO DE PACIENTES',
      rota: '/pacientes',
      ativa: true
    },
    {
      id: 4,
      nome: 'AGENDA',
      icone: 'bi-calendar-check',
      tag: 'ESSENCIAL',
      descricao: 'AGENDAMENTO DE CONSULTAS E PROCEDIMENTOS',
      rota: '/agendamento-clinica',
      ativa: true
    },
    {
      id: 5,
      nome: 'RELATÓRIOS',
      icone: 'bi-bar-chart',
      descricao: 'RELATÓRIOS E ANÁLISES DE DESEMPENHO',
      rota: '/relatorios',
      ativa: true
    }
  ]);

  // Páginas adicionais
  const [paginasAdicionais, setPaginasAdicionais] = useState([
    {
      id: 6,
      nome: 'EXAMES',
      icone: 'bi-clipboard-data',
      descricao: 'CATÁLOGO DE EXAMES E RESULTADOS LABORATORIAIS',
      rota: '/exames',
      ativa: false
    },
    {
      id: 7,
      nome: 'ESTOQUE',
      icone: 'bi-box-seam',
      descricao: 'CONTROLE DE MEDICAMENTOS E MATERIAIS',
      rota: '/estoque',
      ativa: false
    },
    {
      id: 8,
      nome: 'FARMÁCIA',
      icone: 'bi-capsule',
      descricao: 'CONTROLE DE MEDICAMENTOS E RECEITAS',
      rota: '/farmacia',
      ativa: false
    },
    {
      id: 9,
      nome: 'TELEMEDICINA',
      icone: 'bi-camera-video',
      descricao: 'CONSULTAS ONLINE E VIDEOCONFERÊNCIAS',
      rota: '/telemedicina',
      ativa: true
    },
    {
      id: 10,
      nome: 'LOJA VIRTUAL',
      icone: 'bi-cart',
      descricao: 'E-COMMERCE DE PRODUTOS VETERINÁRIOS',
      rota: '/loja',
      ativa: false
    },
    {
      id: 11,
      nome: 'AMBULÂNCIA',
      icone: 'fa fa-ambulance',
      descricao: 'GESTÃO DE TRANSPORTE EMERGENCIAL',
      rota: '/ambulancia',
      ativa: false
    }
  ]);

  const [paginasCustomizadas] = useState([]);

  // Estado para dados da clínica
  const [dadosClinica, setDadosClinica] = useState({
    nome: 'CLÍNICA VETERINÁRIA CARINHOSOS',
    telefone: '(11) 98765-4321',
    endereco: 'RUA DAS FLORES, 123 - SÃO PAULO, SP',
    horario: 'SEGUNDA A SEXTA: 8H ÀS 18H',
    email: 'CONTATO@CARINHOSOS.VET.BR',
    website: 'WWW.CARINHOSOS.VET.BR'
  });

  // Estado para dados financeiros
  const [dadosFinanceiros, setDadosFinanceiros] = useState({
    banco: 'BANCO DO BRASIL',
    tipoConta: 'CONTA CORRENTE',
    agencia: '1234-5',
    conta: '12345678-9',
    chavePix: 'LAURA.CARVALHO@ARTEMYS.COM',
    contaVerificada: true,
    pixAtivo: true,
    transferenciaAtivo: false
  });

  // Estado para perfis de permissões
  const [perfisPermissoes, setPerfisPermissoes] = useState([
    {
      id: 1,
      nome: 'ADMINISTRADOR',
      usuarios: 2,
      permissoes: ['ACESSO TOTAL', 'CONFIGURAÇÕES', 'RELATÓRIOS', 'GESTÃO DE USUÁRIOS']
    },
    {
      id: 2,
      nome: 'VETERINÁRIO',
      usuarios: 5,
      permissoes: ['AGENDAMENTOS', 'PACIENTES', 'PRONTUÁRIOS']
    },
    {
      id: 3,
      nome: 'FUNCIONÁRIOS',
      usuarios: 3,
      permissoes: ['AGENDAMENTOS', 'CADASTROS BÁSICOS']
    }
  ]);

  const totalAtivas = [...paginasPrincipais, ...paginasAdicionais, ...paginasCustomizadas].filter(p => p.ativa).length;
  const totalPaginas = paginasPrincipais.length + paginasAdicionais.length + paginasCustomizadas.length;

  const handleToggle = (id, tipo) => {
    // TODO: implementar chamada à API para ativar/desativar página
    if (tipo === 'principal') {
      setPaginasPrincipais(prev => 
        prev.map(pagina => 
          pagina.id === id ? { ...pagina, ativa: !pagina.ativa } : pagina
        )
      );
    } else if (tipo === 'adicional') {
      setPaginasAdicionais(prev => 
        prev.map(pagina => 
          pagina.id === id ? { ...pagina, ativa: !pagina.ativa } : pagina
        )
      );
    }
    console.log(`Toggle página ${id} do tipo ${tipo}`);
  };

  const getPagesToDisplay = () => {
    if (activeSubTab === 'principais') return paginasPrincipais;
    if (activeSubTab === 'adicionais') return paginasAdicionais;
    return paginasCustomizadas;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNovaPagina(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Auto-gerar rota baseada no nome
    if (name === 'nome' && value) {
      const rotaGerada = '/' + value.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setNovaPagina(prev => ({ ...prev, rota: rotaGerada }));
    }
  };

  const handleCriarPagina = () => {
    // TODO: implementar chamada à API para criar página
    console.log('Nova página criada:', novaPagina);
    
    // Resetar formulário
    setNovaPagina({
      nome: '',
      icone: 'bi-file-earmark',
      descricao: '',
      rota: '/',
      tipo: 'customizada',
      ativa: true,
      tag: ''
    });
    
    setShowCriarPagina(false);
    // TODO: adicionar a nova página à lista de páginas customizadas
  };

  const handleDadosClinicaChange = (e) => {
    const { name, value } = e.target;
    setDadosClinica(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSalvarDadosClinica = (e) => {
    e.preventDefault();
    // TODO: implementar chamada à API para salvar dados
    console.log('Dados da clínica salvos:', dadosClinica);
    alert('Dados salvos com sucesso!');
  };

  const handleSalvarPermissoes = (e) => {
    e.preventDefault();
    // TODO: implementar chamada à API para salvar permissões
    console.log('Permissões salvas:', perfisPermissoes);
    alert('Permissões salvas com sucesso!');
  };

  const handleEditarPerfil = (id) => {
    const perfil = perfisPermissoes.find(p => p.id === id);
    if (perfil) {
      setPerfilEditando(perfil);
      setNomePerfil(perfil.nome);
      
      // Resetar permissões e marcar apenas as que o perfil tem
      const novasPermissoes = {};
      Object.keys(permissoesSelecionadas).forEach(key => {
        novasPermissoes[key] = perfil.permissoes.includes(key);
      });
      setPermissoesSelecionadas(novasPermissoes);
      
      setShowEditarPerfil(true);
    }
  };

  const handleTogglePermissao = (permissao) => {
    setPermissoesSelecionadas(prev => ({
      ...prev,
      [permissao]: !prev[permissao]
    }));
    
    // Se marcar "ACESSO TOTAL", desmarcar todas as outras
    if (permissao === 'ACESSO TOTAL' && !permissoesSelecionadas[permissao]) {
      const novasPermissoes = {};
      Object.keys(permissoesSelecionadas).forEach(key => {
        novasPermissoes[key] = key === 'ACESSO TOTAL';
      });
      setPermissoesSelecionadas(novasPermissoes);
    }
    // Se marcar qualquer outra, desmarcar "ACESSO TOTAL"
    else if (permissao !== 'ACESSO TOTAL') {
      setPermissoesSelecionadas(prev => ({
        ...prev,
        'ACESSO TOTAL': false,
        'APENAS VISUALIZAÇÃO': false
      }));
    }
  };

  const handleSalvarPerfil = (e) => {
    e.preventDefault();
    const permissoesAtivas = Object.keys(permissoesSelecionadas).filter(
      key => permissoesSelecionadas[key]
    );
    
    // Atualizar o perfil na lista
    setPerfisPermissoes(prev => 
      prev.map(perfil => 
        perfil.id === perfilEditando.id 
          ? { ...perfil, nome: nomePerfil, permissoes: permissoesAtivas }
          : perfil
      )
    );
    
    setShowEditarPerfil(false);
    // TODO: implementar chamada à API
  };

  const handleCancelarEdicao = () => {
    setShowEditarPerfil(false);
    setPerfilEditando(null);
  };

  const permissoesPorCategoria = [
    {
      categoria: 'ACESSO GERAL',
      permissoes: ['ACESSO TOTAL', 'APENAS VISUALIZAÇÃO']
    },
    {
      categoria: 'AGENDAMENTOS',
      permissoes: ['AGENDAMENTOS', 'CRIAR AGENDAMENTO', 'EDITAR AGENDAMENTO', 'CANCELAR AGENDAMENTO']
    },
    {
      categoria: 'PACIENTES',
      permissoes: ['PACIENTES', 'CADASTRAR PACIENTE', 'EDITAR PACIENTE', 'EXCLUIR PACIENTE']
    },
    {
      categoria: 'PROFISSIONAIS',
      permissoes: ['VISUALIZAR PROFISSIONAIS', 'GERENCIAR PROFISSIONAIS']
    },
    {
      categoria: 'PRONTUÁRIOS',
      permissoes: ['PRONTUÁRIOS', 'CRIAR PRONTUÁRIO', 'EDITAR PRONTUÁRIO']
    },
    {
      categoria: 'RELATÓRIOS',
      permissoes: ['RELATÓRIOS', 'EXPORTAR RELATÓRIOS']
    },
    {
      categoria: 'SISTEMA',
      permissoes: ['CONFIGURAÇÕES', 'CADASTROS BÁSICOS', 'GESTÃO DE USUÁRIOS']
    }
  ];

  const totalPermissoesSelecionadas = Object.values(permissoesSelecionadas).filter(Boolean).length;

  const handleAdicionarPerfil = () => {
    // Resetar estados
    setNovoPerfilNome('');
    const permissoesResetadas = {};
    Object.keys(permissoesSelecionadas).forEach(key => {
      permissoesResetadas[key] = false;
    });
    setPermissoesSelecionadas(permissoesResetadas);
    setShowAdicionarPerfil(true);
  };

  const handleSalvarNovoPerfil = (e) => {
    e.preventDefault();
    
    if (!novoPerfilNome.trim()) {
      alert('Por favor, informe o nome do perfil.');
      return;
    }

    const permissoesAtivas = Object.keys(permissoesSelecionadas).filter(
      key => permissoesSelecionadas[key]
    );

    if (permissoesAtivas.length === 0) {
      alert('Por favor, selecione pelo menos uma permissão.');
      return;
    }
    
    // Criar novo perfil
    const novoPerfil = {
      id: perfisPermissoes.length + 1,
      nome: novoPerfilNome.toUpperCase(),
      usuarios: 0,
      permissoes: permissoesAtivas
    };
    
    // Adicionar à lista de perfis
    setPerfisPermissoes(prev => [...prev, novoPerfil]);
    
    // Fechar modal e resetar
    setShowAdicionarPerfil(false);
    setNovoPerfilNome('');
    
    // TODO: implementar chamada à API
    console.log('Novo perfil criado:', novoPerfil);
  };

  const handleCancelarAdicionarPerfil = () => {
    setShowAdicionarPerfil(false);
    setNovoPerfilNome('');
    const permissoesResetadas = {};
    Object.keys(permissoesSelecionadas).forEach(key => {
      permissoesResetadas[key] = false;
    });
    setPermissoesSelecionadas(permissoesResetadas);
  };

  const iconesDisponiveis = [
    'bi-house', 'bi-people', 'bi-heart-pulse', 'bi-calendar-check', 'bi-bar-chart',
    'bi-clipboard-data', 'bi-box-seam', 'bi-capsule', 'bi-camera-video', 'bi-cart',
    'fa fa-ambulance', 'bi-file-earmark', 'bi-gear', 'bi-shield-check', 'bi-graph-up',
    'bi-building', 'bi-hospital', 'bi-stethoscope', 'bi-file-text', 'bi-list-check'
  ];

  const traducoesIcones = {
    'house': 'CASA',
    'people': 'PESSOAS',
    'heart-pulse': 'BATIMENTO CARDÍACO',
    'calendar-check': 'CALENDÁRIO',
    'bar-chart': 'GRÁFICO DE BARRAS',
    'clipboard-data': 'PRANCHETA',
    'box-seam': 'CAIXA',
    'capsule': 'CÁPSULA',
    'camera-video': 'VÍDEO',
    'cart': 'CARRINHO',
    'ambulance': 'AMBULÂNCIA',
    'file-earmark': 'ARQUIVO',
    'gear': 'ENGRENAGEM',
    'shield-check': 'ESCUDO',
    'graph-up': 'GRÁFICO',
    'building': 'PRÉDIO',
    'hospital': 'HOSPITAL',
    'stethoscope': 'ESTETOSCÓPIO',
    'file-text': 'DOCUMENTO',
    'list-check': 'LISTA'
  };

  const obterNomeTraduzido = (iconClass) => {
    // Verifica se é Font Awesome (fa fa-xxx)
    if (iconClass.startsWith('fa ')) {
      const nomeIcone = iconClass.replace('fa fa-', '');
      return traducoesIcones[nomeIcone] || nomeIcone.toUpperCase();
    }
    // Bootstrap Icons (bi-xxx)
    const nomeIcone = iconClass.replace('bi-', '');
    return traducoesIcones[nomeIcone] || nomeIcone.toUpperCase();
  };

  const renderizarIcone = (icone) => {
    // Verifica se é Font Awesome
    if (icone.startsWith('fa ')) {
      return <i className={icone} aria-hidden="true"></i>;
    }
    // Bootstrap Icons (adiciona 'bi' se não tiver)
    const classeIcone = icone.startsWith('bi-') ? `bi ${icone}` : `bi bi-${icone}`;
    return <i className={classeIcone}></i>;
  };

  return (
    <section className="configuracoes-sistema-page">
      <div className="configuracoes-sistema-container">
        {/* Header */}
        <div className="configuracoes-header">
          <div>
            <Link to="/painel-clinica" className="btn-voltar-configuracoes">
              <i className="bi bi-arrow-left"></i>
              VOLTAR
            </Link>
            <h1 className="configuracoes-titulo">CONFIGURAÇÕES DO SISTEMA</h1>
            <p className="configuracoes-subtitulo">
              GERENCIE MÓDULOS, PÁGINAS E CONFIGURAÇÕES DA CLÍNICA
            </p>
          </div>
        </div>

        {/* Tabs principais */}
        <div className="config-tabs-main">
          <button
            className={`config-tab-main ${activeTab === 'modulos' ? 'active' : ''}`}
            onClick={() => setActiveTab('modulos')}
          >
            <i className="bi bi-calendar-check"></i>
            MÓDULOS E PÁGINAS
          </button>
          <button
            className={`config-tab-main ${activeTab === 'dados' ? 'active' : ''}`}
            onClick={() => setActiveTab('dados')}
          >
            <i className="bi bi-file-earmark-text"></i>
            DADOS DA CLÍNICA
          </button>
          <button
            className={`config-tab-main ${activeTab === 'permissoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('permissoes')}
          >
            <i className="bi bi-lock"></i>
            PERMISSÕES
          </button>
          <button
            className={`config-tab-main ${activeTab === 'financeiro' ? 'active' : ''}`}
            onClick={() => setActiveTab('financeiro')}
          >
            <i className="bi bi-bag"></i>
            FINANCEIRO
          </button>
        </div>

        {/* Card de páginas ativas e botão criar */}
        {activeTab === 'modulos' && (
          <div className="config-actions-bar">
            <div className="paginas-ativas-card">
              <i className="bi bi-calendar-check"></i>
              <div>
                <div className="paginas-ativas-label">PÁGINAS ATIVAS</div>
                <div className="paginas-ativas-value">{totalAtivas}/{totalPaginas}</div>
              </div>
            </div>
            <button className="btn-criar-pagina" onClick={() => setShowCriarPagina(true)}>
              <i className="bi bi-plus-circle"></i>
              + CRIAR NOVA PÁGINA
            </button>
          </div>
        )}

        {/* Conteúdo da tab Módulos e Páginas */}
        {activeTab === 'modulos' && (
          <>
            {/* Sub-tabs */}
            <div className="config-sub-tabs">
              <button
                className={`config-sub-tab ${activeSubTab === 'principais' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('principais')}
              >
                5 PRINCIPAIS
              </button>
              <button
                className={`config-sub-tab ${activeSubTab === 'adicionais' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('adicionais')}
              >
                6 ADICIONAIS
              </button>
              <button
                className={`config-sub-tab ${activeSubTab === 'customizadas' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('customizadas')}
              >
                0 CUSTOMIZADAS
              </button>
            </div>

            {/* Seção de Páginas */}
            <div className="paginas-section">
              {activeSubTab === 'principais' && (
                <>
                  <div className="section-header">
                    <i className="bi bi-lightning-charge"></i>
                    <div>
                      <h3 className="section-titulo-config">PÁGINAS PRINCIPAIS</h3>
                      <p className="section-subtitulo-config">MÓDULOS ESSENCIAIS DO SISTEMA</p>
                    </div>
                  </div>
                  <div className="paginas-grid">
                    {paginasPrincipais.map(pagina => (
                      <div key={pagina.id} className="pagina-card">
                        <div className="pagina-header">
                          <div className="pagina-icon-wrapper">
                            {renderizarIcone(pagina.icone)}
                          </div>
                          <div className="pagina-info">
                            <div className="pagina-titulo-row">
                              <h4 className="pagina-titulo">{pagina.nome}</h4>
                              {pagina.tag && (
                                <span className="pagina-tag">{pagina.tag}</span>
                              )}
                            </div>
                            <p className="pagina-descricao">{pagina.descricao}</p>
                            <p className="pagina-rota">Rota: {pagina.rota}</p>
                          </div>
                        </div>
                        <div className="pagina-actions">
                          <label className="toggle-switch-config">
                            <input
                              type="checkbox"
                              checked={pagina.ativa}
                              onChange={() => handleToggle(pagina.id, 'principal')}
                            />
                            <span className="toggle-slider-config"></span>
                          </label>
                          <span className={`pagina-status ${pagina.ativa ? 'ativa' : 'inativa'}`}>
                            {pagina.ativa ? 'ATIVA' : 'INATIVA'}
                          </span>
                          <i className={`bi ${pagina.ativa ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeSubTab === 'adicionais' && (
                <>
                  <div className="section-header">
                    <i className="bi bi-box"></i>
                    <div>
                      <h3 className="section-titulo-config">PÁGINAS ADICIONAIS</h3>
                      <p className="section-subtitulo-config">MÓDULOS OPCIONAIS QUE PODEM SER ATIVADOS</p>
                    </div>
                  </div>
                  <div className="paginas-grid">
                    {paginasAdicionais.map(pagina => (
                      <div key={pagina.id} className="pagina-card">
                        <div className="pagina-header">
                          <div className="pagina-icon-wrapper">
                            {renderizarIcone(pagina.icone)}
                          </div>
                          <div className="pagina-info">
                            <div className="pagina-titulo-row">
                              <h4 className="pagina-titulo">{pagina.nome}</h4>
                            </div>
                            <p className="pagina-descricao">{pagina.descricao}</p>
                            <p className="pagina-rota">Rota: {pagina.rota}</p>
                          </div>
                        </div>
                        <div className="pagina-actions">
                          <label className="toggle-switch-config">
                            <input
                              type="checkbox"
                              checked={pagina.ativa}
                              onChange={() => handleToggle(pagina.id, 'adicional')}
                            />
                            <span className="toggle-slider-config"></span>
                          </label>
                          <span className={`pagina-status ${pagina.ativa ? 'ativa' : 'inativa'}`}>
                            {pagina.ativa ? 'ATIVA' : 'INATIVA'}
                          </span>
                          <i className={`bi ${pagina.ativa ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeSubTab === 'customizadas' && (
                <div className="paginas-empty">
                  <i className="bi bi-inbox"></i>
                  <p>NENHUMA PÁGINA CUSTOMIZADA</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Conteúdo da tab Dados da Clínica */}
        {activeTab === 'dados' && (
          <div className="dados-clinica-section">
            <div className="section-header">
              <i className="bi bi-file-earmark-text"></i>
              <div>
                <h3 className="section-titulo-config">INFORMAÇÕES DA CLÍNICA</h3>
                <p className="section-subtitulo-config">CONFIGURE OS DADOS E INFORMAÇÕES DE CONTATO</p>
              </div>
            </div>

            <form className="form-dados-clinica" onSubmit={handleSalvarDadosClinica}>
              <div className="dados-clinica-grid">
                {/* Coluna Esquerda */}
                <div className="dados-clinica-col">
                  <div className="form-group-dados">
                    <label htmlFor="nome-clinica">
                      <i className="bi bi-file-earmark-text"></i>
                      NOME DA CLÍNICA
                    </label>
                    <input
                      type="text"
                      id="nome-clinica"
                      name="nome"
                      value={dadosClinica.nome}
                      onChange={handleDadosClinicaChange}
                      placeholder="DIGITE O NOME DA CLÍNICA"
                    />
                  </div>

                  <div className="form-group-dados">
                    <label htmlFor="telefone">
                      <i className="bi bi-telephone"></i>
                      TELEFONE
                    </label>
                    <input
                      type="text"
                      id="telefone"
                      name="telefone"
                      value={dadosClinica.telefone}
                      onChange={handleDadosClinicaChange}
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div className="form-group-dados">
                    <label htmlFor="endereco">
                      <i className="bi bi-geo-alt"></i>
                      ENDEREÇO COMPLETO
                    </label>
                    <input
                      type="text"
                      id="endereco"
                      name="endereco"
                      value={dadosClinica.endereco}
                      onChange={handleDadosClinicaChange}
                      placeholder="RUA, NÚMERO - CIDADE, ESTADO"
                    />
                  </div>

                  <div className="form-group-dados">
                    <label htmlFor="horario">
                      <i className="bi bi-clock"></i>
                      HORÁRIO DE FUNCIONAMENTO
                    </label>
                    <input
                      type="text"
                      id="horario"
                      name="horario"
                      value={dadosClinica.horario}
                      onChange={handleDadosClinicaChange}
                      placeholder="SEGUNDA A SEXTA: 8H ÀS 18H"
                    />
                  </div>
                </div>

                {/* Coluna Direita */}
                <div className="dados-clinica-col">
                  <div className="form-group-dados">
                    <label htmlFor="email">
                      <i className="bi bi-envelope"></i>
                      E-MAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={dadosClinica.email}
                      onChange={handleDadosClinicaChange}
                      placeholder="CONTATO@CLINICA.COM.BR"
                    />
                  </div>

                  <div className="form-group-dados">
                    <label htmlFor="website">
                      <i className="bi bi-globe"></i>
                      WEBSITE
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={dadosClinica.website}
                      onChange={handleDadosClinicaChange}
                      placeholder="WWW.CLINICA.COM.BR"
                    />
                  </div>
                </div>
              </div>

              <div className="dados-clinica-actions">
                <button type="submit" className="btn-salvar-dados">
                  <i className="bi bi-floppy"></i>
                  SALVAR ALTERAÇÕES
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Conteúdo da tab Permissões */}
        {activeTab === 'permissoes' && (
          <div className="permissoes-section">
            <div className="section-header permissoes-header">
              <i className="bi bi-shield-check"></i>
              <div>
                <h3 className="section-titulo-config">CONTROLE DE PERMISSÕES</h3>
                <p className="section-subtitulo-config">GERENCIE PERFIS E ACESSOS DOS USUÁRIOS</p>
              </div>
            </div>

            <form className="form-permissoes" onSubmit={handleSalvarPermissoes}>
              <div className="perfis-grid">
                {perfisPermissoes.map(perfil => (
                  <div key={perfil.id} className="perfil-card">
                    <div className="perfil-header">
                      <div className="perfil-icon-wrapper">
                        <i className="bi bi-shield-check"></i>
                      </div>
                      <div className="perfil-info">
                        <h4 className="perfil-nome">{perfil.nome}</h4>
                        <p className="perfil-usuarios">{perfil.usuarios} USUÁRIOS</p>
                      </div>
                      <button
                        type="button"
                        className="btn-editar-perfil"
                        onClick={() => handleEditarPerfil(perfil.id)}
                      >
                        EDITAR
                      </button>
                    </div>
                    <div className="perfil-permissoes">
                      {perfil.permissoes.map((permissao, index) => (
                        <span key={index} className="permissao-badge">
                          {permissao}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="btn-adicionar-perfil"
                onClick={handleAdicionarPerfil}
              >
                <i className="bi bi-plus-circle"></i>
                ADICIONAR NOVO PERFIL
              </button>

              <div className="permissoes-actions">
                <button type="submit" className="btn-salvar-permissoes">
                  <i className="bi bi-floppy"></i>
                  SALVAR ALTERAÇÕES
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Conteúdo da tab Financeiro */}
        {activeTab === 'financeiro' && (
          <div className="financeiro-section">
            {/* Dados Bancários */}
            <div className="dados-bancarios-card">
              <div className="section-header dados-bancarios-header">
                <i className="bi bi-bank"></i>
                <div>
                  <h3 className="section-titulo-config dados-bancarios-titulo">DADOS BANCÁRIOS</h3>
                  <p className="section-subtitulo-config">CONFIGURE SUA CONTA PARA RECEBER PAGAMENTOS</p>
                </div>
              </div>

              <form className="form-dados-bancarios">
                <div className="dados-bancarios-grid">
                  <div className="form-group-financeiro">
                    <label htmlFor="banco">BANCO</label>
                    <select
                      id="banco"
                      name="banco"
                      value={dadosFinanceiros.banco}
                      onChange={(e) => setDadosFinanceiros(prev => ({ ...prev, banco: e.target.value }))}
                    >
                      <option value="BANCO DO BRASIL">BANCO DO BRASIL</option>
                      <option value="BANCO BRADESCO">BANCO BRADESCO</option>
                      <option value="BANCO ITAÚ">BANCO ITAÚ</option>
                      <option value="BANCO SANTANDER">BANCO SANTANDER</option>
                      <option value="CAIXA ECONÔMICA">CAIXA ECONÔMICA</option>
                    </select>
                  </div>

                  <div className="form-group-financeiro">
                    <label htmlFor="tipo-conta">TIPO DE CONTA</label>
                    <select
                      id="tipo-conta"
                      name="tipoConta"
                      value={dadosFinanceiros.tipoConta}
                      onChange={(e) => setDadosFinanceiros(prev => ({ ...prev, tipoConta: e.target.value }))}
                    >
                      <option value="CONTA CORRENTE">CONTA CORRENTE</option>
                      <option value="CONTA POUPANÇA">CONTA POUPANÇA</option>
                    </select>
                  </div>

                  <div className="form-group-financeiro">
                    <label htmlFor="agencia">AGÊNCIA</label>
                    <input
                      type="text"
                      id="agencia"
                      name="agencia"
                      value={dadosFinanceiros.agencia}
                      onChange={(e) => setDadosFinanceiros(prev => ({ ...prev, agencia: e.target.value }))}
                      placeholder="0000-0"
                    />
                  </div>

                  <div className="form-group-financeiro">
                    <label htmlFor="conta">CONTA</label>
                    <input
                      type="text"
                      id="conta"
                      name="conta"
                      value={dadosFinanceiros.conta}
                      onChange={(e) => setDadosFinanceiros(prev => ({ ...prev, conta: e.target.value }))}
                      placeholder="00000000-0"
                    />
                  </div>

                  <div className="form-group-financeiro form-group-full">
                    <label htmlFor="chave-pix">CHAVE PIX</label>
                    <input
                      type="text"
                      id="chave-pix"
                      name="chavePix"
                      value={dadosFinanceiros.chavePix}
                      onChange={(e) => setDadosFinanceiros(prev => ({ ...prev, chavePix: e.target.value }))}
                      placeholder="EMAIL OU CPF/CNPJ"
                    />
                  </div>
                </div>

                {dadosFinanceiros.contaVerificada && (
                  <div className="conta-verificada-box">
                    <i className="bi bi-check-circle-fill"></i>
                    <div>
                      <div className="conta-verificada-titulo">CONTA VERIFICADA</div>
                      <div className="conta-verificada-texto">SEUS DADOS BANCÁRIOS FORAM VALIDADOS COM SUCESSO</div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Métodos de Pagamento */}
            <div className="metodos-pagamento-card">
              <div className="section-header">
                <i className="bi bi-credit-card"></i>
                <div>
                  <h3 className="section-titulo-config metodos-pagamento-titulo">MÉTODOS DE PAGAMENTO</h3>
                  <p className="section-subtitulo-config">ESCOLHA COMO VOCÊ DESEJA RECEBER PAGAMENTOS</p>
                </div>
              </div>

              <div className="metodos-pagamento-list">
                {/* PIX */}
                <div className="metodo-pagamento-item">
                  <div className="metodo-pagamento-info">
                    <div className="metodo-pagamento-icon">
                      <i className="bi bi-currency-dollar"></i>
                    </div>
                    <div>
                      <h4 className="metodo-pagamento-nome">PIX</h4>
                      <p className="metodo-pagamento-descricao">RECEBA INSTANTANEAMENTE</p>
                    </div>
                  </div>
                  <label className="toggle-switch-financeiro">
                    <input
                      type="checkbox"
                      checked={dadosFinanceiros.pixAtivo}
                      onChange={(e) => setDadosFinanceiros(prev => ({ ...prev, pixAtivo: e.target.checked }))}
                    />
                    <span className="toggle-slider-financeiro"></span>
                  </label>
                </div>

                {/* Transferência */}
                <div className="metodo-pagamento-item">
                  <div className="metodo-pagamento-info">
                    <div className="metodo-pagamento-icon">
                      <i className="bi bi-file-earmark-text"></i>
                    </div>
                    <div>
                      <h4 className="metodo-pagamento-nome">TRANSFERÊNCIA</h4>
                      <p className="metodo-pagamento-descricao">TRANSFERÊNCIA BANCÁRIA</p>
                    </div>
                  </div>
                  <label className="toggle-switch-financeiro">
                    <input
                      type="checkbox"
                      checked={dadosFinanceiros.transferenciaAtivo}
                      onChange={(e) => setDadosFinanceiros(prev => ({ ...prev, transferenciaAtivo: e.target.checked }))}
                    />
                    <span className="toggle-slider-financeiro"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Criar Nova Página */}
        {showCriarPagina && (
          <div className="modal-overlay" onClick={() => setShowCriarPagina(false)}>
            <div className="modal-criar-pagina" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-titulo">CRIAR NOVA PÁGINA</h2>
                <button className="modal-close" onClick={() => setShowCriarPagina(false)}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <form className="form-criar-pagina" onSubmit={(e) => { e.preventDefault(); handleCriarPagina(); }}>
                <div className="form-row-criar">
                  <div className="form-group-criar">
                    <label htmlFor="nome">NOME DA PÁGINA *</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="EX: MEU MÓDULO"
                      value={novaPagina.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group-criar">
                    <label htmlFor="icone">ÍCONE</label>
                    <div className="icon-selector-wrapper">
                      <select
                        id="icone"
                        name="icone"
                        value={novaPagina.icone}
                        onChange={handleInputChange}
                        className="icon-selector"
                      >
                        {iconesDisponiveis.map(icon => (
                          <option key={icon} value={icon}>
                            {obterNomeTraduzido(icon)}
                          </option>
                        ))}
                      </select>
                      <div className="icon-preview">
                        {renderizarIcone(novaPagina.icone)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group-criar">
                  <label htmlFor="descricao">DESCRIÇÃO *</label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    placeholder="DESCRIÇÃO DO MÓDULO E SUA FUNCIONALIDADE"
                    value={novaPagina.descricao}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row-criar">
                  <div className="form-group-criar">
                    <label htmlFor="rota">ROTA *</label>
                    <input
                      type="text"
                      id="rota"
                      name="rota"
                      placeholder="/minha-pagina"
                      value={novaPagina.rota}
                      onChange={handleInputChange}
                      required
                    />
                    <p className="form-hint">A rota será gerada automaticamente baseada no nome</p>
                  </div>

                  <div className="form-group-criar">
                    <label htmlFor="tipo">TIPO DE PÁGINA</label>
                    <select
                      id="tipo"
                      name="tipo"
                      value={novaPagina.tipo}
                      onChange={handleInputChange}
                    >
                      <option value="customizada">CUSTOMIZADA</option>
                      <option value="principal">PRINCIPAL</option>
                      <option value="adicional">ADICIONAL</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-criar">
                  <label htmlFor="tag">TAG (OPCIONAL)</label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    placeholder="EX: ESSENCIAL, NOVO, BETA"
                    value={novaPagina.tag}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group-criar checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="ativa"
                      checked={novaPagina.ativa}
                      onChange={handleInputChange}
                    />
                    <span>ATIVAR PÁGINA APÓS CRIAÇÃO</span>
                  </label>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancelar-criar" onClick={() => setShowCriarPagina(false)}>
                    CANCELAR
                  </button>
                  <button type="submit" className="btn-salvar-criar">
                    <i className="bi bi-check-circle"></i>
                    CRIAR PÁGINA
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Editar Perfil de Permissão */}
        {showEditarPerfil && perfilEditando && (
          <div className="modal-overlay modal-editar-perfil-overlay" onClick={handleCancelarEdicao}>
            <div className="modal-editar-perfil" onClick={(e) => e.stopPropagation()}>
              {/* Header do Modal */}
              <div className="modal-editar-perfil-header">
                <Link to="#" className="btn-voltar-modal" onClick={(e) => { e.preventDefault(); handleCancelarEdicao(); }}>
                  <i className="bi bi-arrow-left"></i>
                  VOLTAR
                </Link>
                <h2 className="modal-editar-perfil-titulo">EDITAR PERFIL DE PERMISSÃO</h2>
                <p className="modal-editar-perfil-subtitulo">
                  CONFIGURE AS PERMISSÕES E ACESSOS DO PERFIL
                </p>
              </div>

              <form className="form-editar-perfil" onSubmit={handleSalvarPerfil}>
                {/* Nome do Perfil */}
                <div className="perfil-nome-section">
                  <label className="perfil-nome-label">NOME DO PERFIL</label>
                  <input
                    type="text"
                    className="perfil-nome-input"
                    value={nomePerfil}
                    onChange={(e) => setNomePerfil(e.target.value)}
                    placeholder="NOME DO PERFIL"
                  />
                  <p className="perfil-usuarios-info">
                    {perfilEditando.usuarios} USUÁRIOS COM ESTE PERFIL
                  </p>
                </div>

                {/* Permissões do Sistema */}
                <div className="permissoes-sistema-section">
                  <h3 className="permissoes-sistema-titulo">PERMISSÕES DO SISTEMA</h3>
                  <p className="permissoes-sistema-subtitulo">
                    SELECIONE AS PERMISSÕES QUE ESTE PERFIL TERÁ ACESSO
                  </p>

                  <div className="permissoes-categorias">
                    {permissoesPorCategoria.map((cat, catIndex) => (
                      <div key={catIndex} className="categoria-permissoes">
                        <div className="categoria-header">
                          <i className="bi bi-shield-check"></i>
                          <h4 className="categoria-nome">{cat.categoria}</h4>
                        </div>
                        <div className="categoria-checkboxes">
                          {cat.permissoes.map(permissao => (
                            <label key={permissao} className="checkbox-permissao-label">
                              <input
                                type="checkbox"
                                checked={permissoesSelecionadas[permissao] || false}
                                onChange={() => handleTogglePermissao(permissao)}
                              />
                              <span className="checkbox-permissao-text">{permissao}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resumo das Permissões */}
                <div className="resumo-permissoes-section">
                  <h3 className="resumo-permissoes-titulo">RESUMO DAS PERMISSÕES</h3>
                  <p className="resumo-permissoes-contador">
                    {totalPermissoesSelecionadas} PERMISSÕES SELECIONADAS
                  </p>
                  <div className="resumo-permissoes-badges">
                    {Object.keys(permissoesSelecionadas)
                      .filter(key => permissoesSelecionadas[key])
                      .map(permissao => (
                        <span key={permissao} className="resumo-permissao-badge">
                          {permissao}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="modal-editar-perfil-actions">
                  <button
                    type="button"
                    className="btn-cancelar-perfil"
                    onClick={handleCancelarEdicao}
                  >
                    <i className="bi bi-x-lg"></i>
                    CANCELAR
                  </button>
                  <button type="submit" className="btn-salvar-perfil">
                    <i className="bi bi-floppy"></i>
                    SALVAR ALTERAÇÕES
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Adicionar Novo Perfil */}
        {showAdicionarPerfil && (
          <div className="modal-overlay modal-editar-perfil-overlay" onClick={handleCancelarAdicionarPerfil}>
            <div className="modal-editar-perfil" onClick={(e) => e.stopPropagation()}>
              {/* Header do Modal */}
              <div className="modal-editar-perfil-header">
                <Link to="#" className="btn-voltar-modal" onClick={(e) => { e.preventDefault(); handleCancelarAdicionarPerfil(); }}>
                  <i className="bi bi-arrow-left"></i>
                  VOLTAR
                </Link>
                <h2 className="modal-editar-perfil-titulo">ADICIONAR NOVO PERFIL</h2>
                <p className="modal-editar-perfil-subtitulo">
                  CRIE UM NOVO PERFIL E CONFIGURE SUAS PERMISSÕES
                </p>
              </div>

              <form className="form-editar-perfil" onSubmit={handleSalvarNovoPerfil}>
                {/* Nome do Perfil */}
                <div className="perfil-nome-section">
                  <label className="perfil-nome-label">NOME DO PERFIL *</label>
                  <input
                    type="text"
                    className="perfil-nome-input"
                    value={novoPerfilNome}
                    onChange={(e) => setNovoPerfilNome(e.target.value)}
                    placeholder="EX: RECEPCIONISTA"
                    required
                  />
                  <p className="perfil-usuarios-info">
                    0 USUÁRIOS COM ESTE PERFIL
                  </p>
                </div>

                {/* Permissões do Sistema */}
                <div className="permissoes-sistema-section">
                  <h3 className="permissoes-sistema-titulo">PERMISSÕES DO SISTEMA</h3>
                  <p className="permissoes-sistema-subtitulo">
                    SELECIONE AS PERMISSÕES QUE ESTE PERFIL TERÁ ACESSO
                  </p>

                  <div className="permissoes-categorias">
                    {permissoesPorCategoria.map((cat, catIndex) => (
                      <div key={catIndex} className="categoria-permissoes">
                        <div className="categoria-header">
                          <i className="bi bi-shield-check"></i>
                          <h4 className="categoria-nome">{cat.categoria}</h4>
                        </div>
                        <div className="categoria-checkboxes">
                          {cat.permissoes.map(permissao => (
                            <label key={permissao} className="checkbox-permissao-label">
                              <input
                                type="checkbox"
                                checked={permissoesSelecionadas[permissao] || false}
                                onChange={() => handleTogglePermissao(permissao)}
                              />
                              <span className="checkbox-permissao-text">{permissao}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resumo das Permissões */}
                <div className="resumo-permissoes-section">
                  <h3 className="resumo-permissoes-titulo">RESUMO DAS PERMISSÕES</h3>
                  <p className="resumo-permissoes-contador">
                    {totalPermissoesSelecionadas} PERMISSÕES SELECIONADAS
                  </p>
                  {totalPermissoesSelecionadas > 0 ? (
                    <div className="resumo-permissoes-badges">
                      {Object.keys(permissoesSelecionadas)
                        .filter(key => permissoesSelecionadas[key])
                        .map(permissao => (
                          <span key={permissao} className="resumo-permissao-badge">
                            {permissao}
                          </span>
                        ))}
                    </div>
                  ) : (
                    <p className="resumo-permissoes-vazio">NENHUMA PERMISSÃO SELECIONADA</p>
                  )}
                </div>

                {/* Botões de Ação */}
                <div className="modal-editar-perfil-actions">
                  <button
                    type="button"
                    className="btn-cancelar-perfil"
                    onClick={handleCancelarAdicionarPerfil}
                  >
                    <i className="bi bi-x-lg"></i>
                    CANCELAR
                  </button>
                  <button type="submit" className="btn-salvar-perfil">
                    <i className="bi bi-check-circle"></i>
                    CRIAR PERFIL
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConfiguracoesSistema;

