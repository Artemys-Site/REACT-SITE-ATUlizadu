import { Link, useLocation } from 'react-router-dom';
import './Artigos.css';
import ImagemEngasgo from '../assets/ImagemEngasgo.png';
import imagemQueimadura from '../assets/imagemQueimadura.jpg';
import intoxicacaoAnimais from '../assets/intoxicacaoAnimais.jpg';
import imagemFebre from '../assets/imagemFebre.jpg';
import iconePrimeirosSocorros from '../assets/iconePrimeirosSocorros.png';
import iconeFavpreto from '../assets/iconeFavpreto.png';
import iconeGato from '../assets/iconeGato.png';
import iconePatapreta from '../assets/iconePatapreta.png';

const GuiasPrimeirosSocorros = () => {
  const location = useLocation();
  const isArtigosPage = location.pathname === '/artigos';
  const isGuiasPage = location.pathname === '/guias-primeiros-socorros';

  const guias = [
    {
      id: 1,
      titulo: "EMGASGOS EM CÃES E GATOS: OQUE FAZER IMADIATAMENTE",
      descricao: "PASSOS SIMPLES PARA DESOBISTRUÇÃO, QUANDO PARAR E IR AO VETERINARIO",
      imagem: ImagemEngasgo,
      categoria: "PRIMEIROS SOCORROS",
      tempoLeitura: "LEITURA: 7 MIN",
      iconeCategoria: iconePrimeirosSocorros
    },
    {
      id: 2,
      titulo: "QUEIMADURAS EM CÃES E GATOS: AÇÃO IMEDIATA",
      descricao: "O QUE FAZER ANTES DE LEVAR AO VETERINÁRIO, COMO ALIVIAR A DOR E PREVENIR INFECÇÕES",
      imagem: imagemQueimadura,
      categoria: "PRIMEIROS SOCORROS",
      tempoLeitura: "LEITURA: 5 MIN",
      iconeCategoria: iconePrimeirosSocorros
    },
    {
      id: 3,
      titulo: "INTOXICAÇÃO EM ANIMAIS: LISTA DE PLANTAS VENENOSAS",
      descricao: "RECONHEÇA OS SINTOMAS URGENTES, O QUE FAZER EM CASA E A IMPORTÂNCIA DO ATENDIMENTO VETERINÁRIO RÁPIDO",
      imagem: intoxicacaoAnimais,
      categoria: "PRIMEIROS SOCORROS",
      tempoLeitura: "LEITURA: 8 MIN",
      iconeCategoria: iconePrimeirosSocorros
    },
    {
      id: 4,
      titulo: "INSOLAÇÃO EM CÃES E GATOS: COMO RECONHECER E RESFRIAR",
      descricao: "SINAIS DE ALERTA DE HIPERTERMIA, PASSOS DE RESFRIAMENTO E QUANDO A EMERGÊNCIA É CRÍTICA",
      imagem: imagemFebre,
      categoria: "PRIMEIROS SOCORROS",
      tempoLeitura: "LEITURA: 6 MIN",
      iconeCategoria: iconePrimeirosSocorros
    }
  ];

  return (
    <section className="artigos-page">
      {/* Botões de navegação ARTIGOS / GUIAS */}
      <div className="artigos-navegacao">
        <Link 
          to="/artigos" 
          className={`nav-botao ${isArtigosPage ? 'nav-botao-ativo' : ''}`}
        >
          ARTIGOS
        </Link>
        <Link 
          to="/guias-primeiros-socorros" 
          className={`nav-botao ${isGuiasPage ? 'nav-botao-ativo' : ''}`}
        >
          GUIAS DE PRIMEIROS SOCORROS
        </Link>
      </div>

      <div className="guias-container">
        <h1 className="guias-titulo">GUIAS DE PRIMEIROS SOCORROS</h1>
        <p className="guias-subtitulo">APRENDA A AGIR COM SEGURANÇA E CARINHO</p>

        {/* Botões de filtro */}
        <div className="guias-filtros">
          <button className="filtro-botao">
            <img src={iconePrimeirosSocorros} alt="Primeiros Socorros" />
            PRIMEIROS SOCORROS
          </button>
          <button className="filtro-botao">
            <img src={iconePrimeirosSocorros} alt="Adestramento" />
            ADESTRAMENTO
          </button>
          <button className="filtro-botao">
            <img src={iconePrimeirosSocorros} alt="Bem-estar" />
            BEM-ESTAR
          </button>
          <button className="filtro-botao">
            <img src={iconePatapreta} alt="Cães" />
            CÃES
          </button>
          <button className="filtro-botao">
            <img src={iconeGato} alt="Gatos" />
            GATOS
          </button>
        </div>

        {/* Lista de guias */}
        <div className="guias-lista">
          {guias.map((guia) => (
            <div key={guia.id} className="guia-card">
              <div className="guia-card-conteudo">
                <div className="guia-card-header">
                  <div className="guia-categoria-info">
                    <img src={guia.iconeCategoria} alt={guia.categoria} className="guia-icone-categoria" />
                    <span className="guia-categoria">{guia.categoria}</span>
                    <span className="guia-tempo">{guia.tempoLeitura}</span>
                  </div>
                </div>
                <h2 className="guia-titulo">{guia.titulo}</h2>
                <p className="guia-descricao">{guia.descricao}</p>
                <div className="guia-botoes">
                  <button className="btn-adicionar-lista">
                    <img src={iconeFavpreto} alt="Favoritar" />
                    + LISTA
                  </button>
                  <Link to="/artigos" className="btn-ler-guia">LER</Link>
                </div>
              </div>
              <div className="guia-card-imagem">
                <img src={guia.imagem} alt={guia.titulo} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuiasPrimeirosSocorros;

