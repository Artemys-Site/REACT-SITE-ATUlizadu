import React, { useState } from 'react';
import { ChevronLeft, FileText, UploadCloud, CheckCircle, XCircle } from 'lucide-react';
import './edicaoArtigosVeterinario.css';

// Componente auxiliar para Input de Texto
const LabelInput = ({ label, placeholder, type = 'text', name, value, onChange }) => (
  <div className="input-group">
    <label className="input-label">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="input-field"
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

// Componente auxiliar para Textarea
const LabelTextarea = ({ label, placeholder, rows = 3, name, value, onChange }) => (
  <div className="input-group">
    <label className="input-label">
      {label}
    </label>
    <textarea
      rows={rows}
      placeholder={placeholder}
      className="input-field textarea-field"
      name={name}
      value={value}
      onChange={onChange}
    ></textarea>
  </div>
);

const EditarArtigoVeterinario = () => {
  // 1. ESTADO DO COMPONENTE
  const [formData, setFormData] = useState({
    tipo: '',
    titulo: '',
    descricao: '',
    tempoLeitura: 7,
    conteudo: '',
    // Adicionar mais campos conforme necessário (ex: imagemCapa)
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  // 2. FUNÇÃO GENÉRICA PARA ATUALIZAR O ESTADO
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Converte para número se for campo 'number'
    const finalValue = type === 'number' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
    // Limpa a mensagem de status ao começar a digitar
    setStatusMessage({ text: '', type: '' });
  };

  // 3. FUNÇÃO PARA SIMULAR AÇÃO (SALVAR OU PUBLICAR)
  const performAction = (actionType) => {
    setLoading(true);
    setStatusMessage({ text: '', type: '' });

    // Simulação de chamada de API com atraso de 1,5 segundos
    setTimeout(() => {
      setLoading(false);

      if (actionType === 'publish' && (!formData.titulo || !formData.conteudo)) {
        // Exemplo de regra de validação
        setStatusMessage({ 
          text: 'Erro: O título e o conteúdo são obrigatórios para publicar!', 
          type: 'error' 
        });
        return;
      }

      if (actionType === 'draft') {
        setStatusMessage({ 
          text: 'Rascunho salvo com sucesso!', 
          type: 'success' 
        });
        console.log('Dados salvos (rascunho):', formData);
      } else if (actionType === 'publish') {
        setStatusMessage({ 
          text: 'Artigo publicado com sucesso!', 
          type: 'success' 
        });
        console.log('Dados publicados:', formData);
        // Aqui você faria o reset do formulário ou redirecionamento
      }
    }, 1500);
  };

  const handleSaveDraft = () => performAction('draft');
  const handlePublish = () => performAction('publish');

  // Variáveis para Títulos
  const tituloFormulario = "Criar Novo Artigo Veterinário";
  const subtituloFormulario = "Preencha as informações abaixo para publicar um artigo.";

  // 4. COMPONENTE DE MENSAGEM DE STATUS
  const StatusMessage = ({ message }) => {
    if (!message.text) return null;
    
    const isSuccess = message.type === 'success';
    const bgColor = isSuccess ? '#ecfdf5' : '#fef2f2'; // Verde claro ou vermelho claro
    const textColor = isSuccess ? '#065f46' : '#991b1b'; // Verde escuro ou vermelho escuro
    const Icon = isSuccess ? CheckCircle : XCircle;

    return (
      <div 
        className="status-message" 
        style={{ backgroundColor: bgColor, color: textColor, borderColor: textColor }}
      >
        <Icon size={18} className="message-icon" />
        <span>{message.text}</span>
      </div>
    );
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="header-voltar">
        <button className="btn-voltar">
          <ChevronLeft size={16} className="icon-voltar" />
          Voltar
        </button>
      </div>

      {/* Título Principal */}
      <div className="titulo-principal-container">
        <div className="icon-wrapper">
          <FileText size={32} className="icon-principal" />
        </div>
        <h1 className="titulo-principal-h1">{tituloFormulario}</h1>
        <p className="titulo-principal-p">{subtituloFormulario}</p>
      </div>

      {/* Navegação por Abas (Steps) */}
      <div className="abas-container">
        <span className="aba-ativa">
          Informações Básicas
        </span>
        <span className="aba-inativa">
          Conteúdo
        </span>
        <span className="aba-inativa">
          Promo
        </span>
      </div>

      {/* MENSAGEM DE STATUS (Exibida acima do layout de colunas) */}
      <div style={{ maxWidth: 1200, margin: '2rem' }}>
        <StatusMessage message={statusMessage} />
      </div>

      {/* --- Layout Principal: Colunas --- */}
      <div className="layout-colunas">
        
        {/* Coluna Esquerda: Formulário de Conteúdo (2/3) */}
        <div className="coluna-esquerda form-content-area">
          
          {/* Card: 01 - Informações Básicas */}
          <div className="card">
            <div className="card-header purple">
              <span className="numero-icone purple-bg">01</span>
              <h2 className="card-titulo">Informações Básicas</h2>
            </div>

            <div className="card-body">
              <LabelInput
                label="Tipo de Artigo"
                placeholder="Ex: Doença Infecciosa, Comportamento, Nutrição, etc."
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
              />
              <LabelInput
                label="Título do Artigo"
                placeholder="Ex: O uso correto de antibióticos em casos leves"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
              />
              <LabelTextarea
                label="Descrição Breve"
                placeholder="Resumo que aparecerá na prévia do artigo"
                rows={3}
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
              />

              <div className="input-group tempo-leitura-group">
                <label className="input-label">
                  Tempo de Leitura
                </label>
                <div className="tempo-leitura-wrapper">
                  <input
                    type="number"
                    defaultValue="7"
                    className="input-field tempo-leitura-input"
                    name="tempoLeitura"
                    value={formData.tempoLeitura}
                    onChange={handleChange}
                  />
                  <span className="tempo-leitura-unidade">minutos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: 02 - Imagem de Capa */}
          <div className="card">
            <div className="card-header orange">
              <span className="numero-icone orange-bg">02</span>
              <h2 className="card-titulo">Imagem de Capa</h2>
            </div>
            <div className="upload-area">
              <UploadCloud size={40} className="upload-icon" />
              <p className="upload-text">
                Arraste suas imagens aqui <br /> ou clique para selecionar
              </p>
              {/* NOTE: O input file é mais complexo, aqui é apenas um botão de estilo */}
              <button className="btn btn-upload">
                Escolher Arquivo
              </button>
            </div>
          </div>

          {/* Card: 03 - Conteúdo do Artigo */}
          <div className="card">
            <div className="card-header purple">
              <span className="numero-icone purple-bg">03</span>
              <h2 className="card-titulo">Conteúdo do Artigo</h2>
            </div>
            <div className="card-body">
              <LabelTextarea
                label="Preencha o conteúdo completo do artigo aqui..."
                rows={10}
                name="conteudo"
                value={formData.conteudo}
                onChange={handleChange}
              />
              <div className="conteudo-guia-info">
                <p className="conteudo-guia-p">Inclui:</p>
                <ul className="conteudo-guia-lista">
                  <li>Introdução e contexto</li>
                  <li>Evidências científicas</li>
                  <li>Recomendações e casos de estudo</li>
                  <li>Conclusão e referências</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Ações e Prévia (1/3) */}
        <div className="coluna-direita">
          <div className="card-preview">
            <h3 className="card-preview-titulo">Prévia do Artigo</h3>
            <p className="card-preview-subtitulo">
              **Título:** {formData.titulo || "Título do Artigo (Exemplo)"}
              <br/>
              **Tipo:** {formData.tipo || "Tipo (Exemplo)"}
            </p>

            {/* Botão Salvar Rascunho */}
            <button 
              className="btn btn-rascunho"
              onClick={handleSaveDraft}
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar Rascunho'}
            </button>
            
            {/* Botão Publicar Guia */}
            <button 
              className="btn btn-publicar"
              onClick={handlePublish}
              disabled={loading}
            >
              {loading ? 'Publicando...' : 'Publicar Artigo'}
            </button>
            
            <p className="card-preview-aviso">
              Preencha todos os campos para publicar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarArtigoVeterinario;