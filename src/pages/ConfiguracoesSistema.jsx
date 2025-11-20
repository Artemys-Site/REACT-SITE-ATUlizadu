import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ConfiguracoesSistema.css';

const ConfiguracoesSistema = () => {
  const [activeTab, setActiveTab] = useState('modulos');
  const [activeSubTab, setActiveSubTab] = useState('principais');
  
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
      icone: 'bi-ambulance',
      descricao: 'GESTÃO DE TRANSPORTE EMERGENCIAL',
      rota: '/ambulancia',
      ativa: false
    }
  ]);

  const [paginasCustomizadas] = useState([]);

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
            <i className="bi bi-building-lock"></i>
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
            <button className="btn-criar-pagina">
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
                            <i className={`bi ${pagina.icone}`}></i>
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
                            <i className={`bi ${pagina.icone}`}></i>
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

        {/* Conteúdo das outras tabs (placeholder) */}
        {activeTab === 'dados' && (
          <div className="tab-content-placeholder">
            <p>Funcionalidade de Dados da Clínica será implementada</p>
          </div>
        )}

        {activeTab === 'permissoes' && (
          <div className="tab-content-placeholder">
            <p>Funcionalidade de Permissões será implementada</p>
          </div>
        )}

        {activeTab === 'financeiro' && (
          <div className="tab-content-placeholder">
            <p>Funcionalidade Financeiro será implementada</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConfiguracoesSistema;

