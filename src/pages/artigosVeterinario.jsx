import React from 'react';
import { Link } from "react-router-dom";
import { 
  Plus, 
  ArrowRight, 
  FileText, 
  Trash2, 
  Edit2, 
  Eye, 
  CheckCircle, 
  Search,
  ChevronLeft 
} from 'lucide-react'; 
import './artigosVeterinario.css'; 

// URL base para simular a edição/criação de rascunhos
const EDIT_PATH = "/edicaoArtigosVeterinario"; 

// --- 1. Subcomponente para os Cartões de Estatísticas (StatCard) ---
const StatCard = ({ title, value, icon: Icon, colorClass, iconBgClass }) => (
  <div className={`stat-card ${colorClass}`}>
    <div className={`stat-card-icon ${iconBgClass}`}>
      <Icon size={24} />
    </div>
    <div className="stat-card-content">
      <p className="stat-card-title">{title}</p>
      <p className="stat-card-value">{value}</p>
    </div>
  </div>
);

// --- 2. Subcomponente para um Artigo na Lista Principal (ArticleItem) ---
const ArticleItem = ({ id, type, tagColor, title, description, time, views, imagePlaceholder, buttons, onDelete, onEdit }) => (
  <div className="article-item-card">
    <div className="article-info-wrapper">
      {/* Placeholder da Imagem/Capa */}
      <div className="article-cover-placeholder">
        {imagePlaceholder ? (
            <img src={imagePlaceholder} alt="Capa do Artigo" className="article-cover-img"/>
        ) : (
            <FileText size={24} className="placeholder-icon" />
        )}
      </div>
      <div className="article-details-content">
        <span className={`article-tag ${tagColor} tag-mr`}>
          {type}
        </span>
        <h3 className="article-title">{title}</h3>
        <p className="article-description">{description}</p>
        <div className="article-meta">
          <span>{time}</span>
          <span className="article-views">
            <Eye size={12} className="meta-icon" />
            {views}
          </span>
        </div>
      </div>
    </div>
    
    {/* Ações */}
    <div className="action-buttons-group">
        {buttons.map((ButtonIcon, index) => {
            
            if (ButtonIcon.type === 'edit') {
                return (
                    <Link
    key={ButtonIcon.type}
    to={onEdit || `${EDIT_PATH}/${id}`}
    title={ButtonIcon.title}
    className={`action-button ${ButtonIcon.class}`}>
    <ButtonIcon.icon size={18} />
</Link>
                );
            } 
            
            // Botões <button> para ações (Excluir)
            const handler = ButtonIcon.type === 'delete' ? () => onDelete(id) : () => {};

            return (
                <button
                    key={ButtonIcon.type}
                    title={ButtonIcon.title}
                    className={`action-button ${ButtonIcon.class}`}
                    onClick={handler}
                >
                    <ButtonIcon.icon size={18} />
                </button>
            );
        })}
    </div>
  </div>
);

// --- 3. Subcomponente para um Rascunho em Progresso (DraftItem) ---
const DraftItem = ({ id, title, subtitle, progress, editHours, tagColor, buttons, onDelete, onPost, onEdit }) => (
  <div className="draft-item-card">
    <div className="draft-header-content">
      <div className="draft-text-area">
        <span className={`article-tag ${tagColor} tag-mr`}>
          Rascunho
        </span>
        <h4 className="draft-title">{title}</h4>
        <p className="draft-subtitle">{subtitle}</p>
      </div>
      <div className="action-buttons-group">
        {buttons.map((ButtonIcon, index) => {
            
            if (ButtonIcon.type === 'edit') {
                // Link <a> para navegação de edição (USANDO O CAMINHO CORRETO)
                return (
                   <Link
    key={ButtonIcon.type}
    to={onEdit || `${EDIT_PATH}/${id}`}
    title={ButtonIcon.title}
    className={`action-button ${ButtonIcon.class}`}
>
    <ButtonIcon.icon size={18} />
</Link>
                );
            } 
            
            // Botões <button> para ações (Excluir, Postar)
            const handler = ButtonIcon.type === 'delete' 
              ? () => onDelete(id) 
              : (ButtonIcon.type === 'post' ? () => onPost(id) : () => {});

            return (
                <button
                    key={ButtonIcon.type}
                    title={ButtonIcon.title}
                    className={`action-button ${ButtonIcon.class}`}
                    onClick={handler}
                >
                    <ButtonIcon.icon size={18} />
                </button>
            );
        })}
      </div>
    </div>
    
    <div className="draft-progress-container">
      <p className="draft-progress-label">Progresso: {progress}</p>
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: progress }}
        ></div>
      </div>
      <p className="draft-edited-time">Editado: {editHours}</p>
    </div>
  </div>
);

// --- 4. Componente Principal (ArtigoVeterinario) ---
const ArtigosVeterinario = () => {
  
  // --- DADOS E ESTADO INICIAL ---
  const initialArticles = [
    { id: 101, type: 'Produtos Básicos', tagColor: 'tag-green', title: 'Engajamento de cães e gatos: Porque fazer tosquias?', description: 'Aprenda as manobras essenciais para salvar seu pet em caso de engasgo.', time: 'há 7 min', views: '1.2K visualizações', imagePlaceholder: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', published: true },
    { id: 102, type: 'Publicado', tagColor: 'tag-green', title: 'Prevenção de doenças dentárias em pets idosos', description: 'Saiba como manter a saúde bucal de cães e gatos idosos de estimação mais velhos.', time: 'há 6 dias', views: '852 visualizações', imagePlaceholder: 'https://images.unsplash.com/photo-1534361905380-496525916021?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', published: true },
    { id: 103, type: 'Emergência', tagColor: 'tag-red', title: 'Curiosidade: Intoxicação Alimentar', description: 'Sinais de alerta e primeiros socorros para casos de intoxicação.', time: 'há 1 semana', views: '2.8M visualizações', imagePlaceholder: 'https://images.unsplash.com/photo-1594953934575-b6d85915d027?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', published: true },
  ];

  const initialDrafts = [
    { id: 201, title: "Cardíaco: pós-cirúrgico em gatos", subtitle: "Orientações detalhadas para recuperação pós-operatória.", progress: "70%", editHours: "há 3 horas", tagColor: 'tag-purple-light' },
    { id: 202, title: "Produto: Horácio", subtitle: "Hidratação adequada para filhotes.", progress: "30%", editHours: "ontem", tagColor: 'tag-blue' },
  ];
  
  const [publishedArticles, setPublishedArticles] = React.useState(initialArticles);
  const [drafts, setDrafts] = React.useState(initialDrafts);
  const [activeTab, setActiveTab] = React.useState('Todos');
  
  // Botões de Ação Comuns e Tipos
  const actionButtons = {
      edit: { icon: Edit2, title: "Editar", class: "btn-edit", type: 'edit' },
      delete: { icon: Trash2, title: "Excluir", class: "btn-delete", type: 'delete' },
      post: { icon: CheckCircle, title: "Postar", class: "btn-post", type: 'post' }
  }

  // --- HANDLERS DE AÇÃO REAL (Estado Local) ---
  
  // Exclui um artigo, seja ele publicado ou rascunho.
  const handleDeleteReal = (id) => {
    // Tenta remover dos rascunhos
    const updatedDrafts = drafts.filter(draft => draft.id !== id);
    if (updatedDrafts.length < drafts.length) {
      setDrafts(updatedDrafts);
      return console.log(`Rascunho ID ${id} removido.`);
    }

    // Tenta remover dos artigos publicados
    const updatedArticles = publishedArticles.filter(article => article.id !== id);
    if (updatedArticles.length < publishedArticles.length) {
      setPublishedArticles(updatedArticles);
      return console.log(`Artigo ID ${id} removido.`);
    }
  };

  // Move um rascunho para a lista de artigos publicados
  const handlePostReal = (draftId) => {
    const draftToMove = drafts.find(draft => draft.id === draftId);
    
    if (draftToMove) {
      // 1. Remove dos rascunhos
      setDrafts(drafts.filter(draft => draft.id !== draftId));
      
      // 2. Adiciona à lista de artigos (com status 'Publicado' e novos botões)
      const newArticle = {
        id: draftToMove.id,
        type: 'Publicado',
        tagColor: 'tag-green',
        title: draftToMove.title,
        description: draftToMove.subtitle,
        time: 'agora',
        views: '0 visualizações',
        imagePlaceholder: null, // Pode ser adicionado um placeholder real aqui
        published: true
      };
      
      setPublishedArticles([newArticle, ...publishedArticles]);
      console.log(`Rascunho ID ${draftId} Publicado!`);
    }
  };


  // Lógica de contagem
  const getCount = (tabName) => {
    const totalPublished = publishedArticles.length;
    const totalDrafts = drafts.length;

    switch (tabName) {
        case 'Todos':
            return totalPublished + totalDrafts;
        case 'Publicados':
            // Simula o valor 6 visto na imagem para fins estéticos, mas o contador dinâmico é 'totalPublished'
            return totalPublished; 
        case 'Rascunhos':
            return totalDrafts;
        default:
            return 0;
    }
  };


  return (
    <div className="dashboard-page">
      
      {/* Botão Voltar */}
      <div className="back-button-container">
        <button className="back-button">
          <ChevronLeft size={18} className="meta-icon" />
          Voltar
        </button>
      </div>

      {/* 1. Título Interno da Página */}
      <div className="welcome-section">
        <h1 className="welcome-title">
          Bem-vinda, **Dra. Maria!** 👋
        </h1>
        <p className="welcome-subtitle">
          Gerencie seus posts, visualize e acompanhe o impacto dos seus artigos.
        </p>
      </div>

      {/* 2. Cartões de Estatísticas */}
      <div className="stats-grid-container">
        <StatCard 
          title="Drafts Publicados" 
          value={publishedArticles.length} // Valor Real
          icon={FileText} 
          colorClass="color-purple" 
          iconBgClass="bg-icon-purple"
        />
        <StatCard 
          title="Visualizações TOTAIS" 
          value="6.5k" 
          icon={Eye} 
          colorClass="color-orange" 
          iconBgClass="bg-icon-orange"
        />
        <StatCard 
          title="Em Revisão" 
          value={drafts.length} // Valor Real
          icon={CheckCircle} 
          colorClass="color-green" 
          iconBgClass="bg-icon-green"
        />
      </div>

      {/* 3. Botão Criar Novo Draft (Banner de Destaque) */}
      <div className="cta-banner">
        <div className="cta-content-wrapper">
          <div className="cta-icon-button"> 
            <Plus size={24} />
          </div>
          <div className="cta-text-area">
            <h2 className="cta-title">Criar Novo Draft Médico</h2>
            <p className="cta-subtitle">
              Publique um novo artigo para ajudar tutores de pets.
            </p>
          </div>
        </div>
        
        <Link to={EDIT_PATH} className="cta-action-button">
  Começar 
  <ArrowRight size={16} className='meta-icon-ml'/>
</Link>
      </div>

      {/* 4. Meus Artigos, Filtros e Lista */}
      <div>
        <h2 className="section-title">Meus Artigos</h2>
        
        {/* Abas e Busca */}
        <div className="filter-search-bar">
          <div className="tab-container">
            {['Todos', 'Publicados', 'Rascunhos'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button ${activeTab === tab ? 'tab-active' : ''}`}
              >
                {tab} ({getCount(tab)})
              </button>
            ))}
          </div>
          
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="Buscar artigo" 
              className="search-input" 
            />
            <Search size={18} className="search-icon" />
          </div>
        </div>

        {/* Lista de Artigos e Rascunhos */}
        <div className="list-items-container">
          {/* Renderiza Artigos Publicados */}
          {activeTab !== 'Rascunhos' && publishedArticles.map((article) => (
            <ArticleItem 
                key={article.id} 
                {...article} 
                buttons={[actionButtons.edit, actionButtons.delete]}
                onDelete={handleDeleteReal} // Passa o handler de exclusão
                onEdit={`${EDIT_PATH}/${article.id}`}
            />
          ))}
          
          {/* Renderiza Rascunhos em Progresso */}
          {activeTab !== 'Publicados' && (
            <div className='draft-list-group'>
                {drafts.map((draft) => (
                    <DraftItem 
                        key={draft.id} 
                        {...draft} 
                        buttons={[actionButtons.edit, actionButtons.post, actionButtons.delete]}
                        onDelete={handleDeleteReal} // Passa o handler de exclusão
                        onPost={handlePostReal} // Passa o handler de publicação
                        onEdit={`${EDIT_PATH}/${draft.id}`}
                    />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtigosVeterinario;