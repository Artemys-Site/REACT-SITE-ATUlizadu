import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Artigos.css';
import ImagemEngasgo from '../assets/ImagemEngasgo.png';
import imagemQueimadura from '../assets/imagemQueimadura.jpg';
import intoxicacaoAnimais from '../assets/intoxicacaoAnimais.jpg';
import imagemFebre from '../assets/imagemFebre.jpg';
import iconePrimeirosSocorros from '../assets/iconePrimeirosSocorros.png';
import iconeFavpreto from '../assets/iconeFavpreto.png';
import iconeGato from '../assets/iconeGato.png';
import iconePatapreta from '../assets/iconePatapreta.png';
import { adicionarFavorito, removerFavorito, isFavoritado } from '../utils/favoritos';
import { useAuth } from '../context/AuthContext';

const GuiasPrimeirosSocorros = () => {
  const navigate = useNavigate();
  let isLoggedIn = false;
  try {
    const auth = useAuth();
    isLoggedIn = auth.isLoggedIn;
  } catch (e) {
    // Contexto não disponível, usuário não está logado
    isLoggedIn = false;
  }
  const [favoritos, setFavoritos] = useState({});
  const [filtroAtivo, setFiltroAtivo] = useState('todos');

  useEffect(() => {
    // Verificar quais guias estão favoritados
    const guias = [
      { id: 1, titulo: "ENGASGOS EM CÃES E GATOS: O QUE FAZER IMEDIATAMENTE" },
      { id: 2, titulo: "QUEIMADURAS EM CÃES E GATOS: AÇÃO IMEDIATA" },
      { id: 3, titulo: "INTOXICAÇÃO EM ANIMAIS: LISTA DE PLANTAS VENENOSAS" },
      { id: 4, titulo: "INSOLAÇÃO EM CÃES E GATOS: COMO RECONHECER E RESFRIAR" }
    ];
    
    const favoritosAtuais = {};
    guias.forEach(guia => {
      favoritosAtuais[guia.id] = isFavoritado(guia.id, 'guia');
    });
    setFavoritos(favoritosAtuais);
  }, []);

  const handleFavoritar = (guia) => {
    // Verificar se o usuário está logado
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const estaFavoritado = favoritos[guia.id];
    
    if (estaFavoritado) {
      removerFavorito(guia.id, 'guia');
      setFavoritos(prev => ({ ...prev, [guia.id]: false }));
    } else {
      adicionarFavorito({
        ...guia,
        tipo: 'guia'
      });
      setFavoritos(prev => ({ ...prev, [guia.id]: true }));
    }
  };

  const guias = [
    {
      id: 1,
      titulo: "ENGASGOS EM CÃES E GATOS: O QUE FAZER IMEDIATAMENTE",
      descricao: "PASSOS SIMPLES PARA DESOBSTRUÇÃO, QUANDO PARAR E IR AO VETERINÁRIO",
      imagem: ImagemEngasgo,
      categoria: "PRIMEIROS SOCORROS",
      tema: "primeiros-socorros",
      especie: "ambos",
      tempoLeitura: "LEITURA: 7 MIN",
      iconeCategoria: iconePrimeirosSocorros
    },
    {
      id: 2,
      titulo: "QUEIMADURAS EM CÃES E GATOS: AÇÃO IMEDIATA",
      descricao: "O QUE FAZER ANTES DE LEVAR AO VETERINÁRIO, COMO ALIVIAR A DOR E PREVENIR INFECÇÕES",
      imagem: imagemQueimadura,
      categoria: "PRIMEIROS SOCORROS",
      tema: "primeiros-socorros",
      especie: "ambos",
      tempoLeitura: "LEITURA: 5 MIN",
      iconeCategoria: iconePrimeirosSocorros
    },
    {
      id: 3,
      titulo: "INTOXICAÇÃO EM ANIMAIS: LISTA DE PLANTAS VENENOSAS",
      descricao: "RECONHEÇA OS SINTOMAS URGENTES, O QUE FAZER EM CASA E A IMPORTÂNCIA DO ATENDIMENTO VETERINÁRIO RÁPIDO",
      imagem: intoxicacaoAnimais,
      categoria: "PRIMEIROS SOCORROS",
      tema: "primeiros-socorros",
      especie: "ambos",
      tempoLeitura: "LEITURA: 8 MIN",
      iconeCategoria: iconePrimeirosSocorros
    },
    {
      id: 4,
      titulo: "INSOLAÇÃO EM CÃES E GATOS: COMO RECONHECER E RESFRIAR",
      descricao: "SINAIS DE ALERTA DE HIPERTERMIA, PASSOS DE RESFRIAMENTO E QUANDO A EMERGÊNCIA É CRÍTICA",
      imagem: imagemFebre,
      categoria: "PRIMEIROS SOCORROS",
      tema: "primeiros-socorros",
      especie: "ambos",
      tempoLeitura: "LEITURA: 6 MIN",
      iconeCategoria: iconePrimeirosSocorros
    }
  ];

  const filtrarGuias = () => {
    if (filtroAtivo === 'todos') {
      return guias;
    }
    
    return guias.filter(guia => {
      if (filtroAtivo === 'primeiros-socorros') {
        return guia.tema === 'primeiros-socorros';
      }
      if (filtroAtivo === 'adestramento') {
        return guia.tema === 'adestramento';
      }
      if (filtroAtivo === 'bem-estar') {
        return guia.tema === 'bem-estar';
      }
      if (filtroAtivo === 'caes') {
        return guia.especie === 'caes' || guia.especie === 'ambos';
      }
      if (filtroAtivo === 'gatos') {
        return guia.especie === 'gatos' || guia.especie === 'ambos';
      }
      return true;
    });
  };

  const guiasFiltrados = filtrarGuias();

  return (
    <section className="artigos-page">
      {/* Botões de navegação GUIAS / FAVORITOS */}
      <div className="artigos-navegacao">
        <button
          className="nav-botao nav-botao-ativo"
        >
          GUIAS DE PRIMEIROS SOCORROS
        </button>
        <button
          className="nav-botao"
          onClick={() => navigate('/artigos-lista?aba=favoritos')}
        >
          FAVORITOS {Object.keys(favoritos).filter(k => favoritos[k]).length > 0 && `(${Object.keys(favoritos).filter(k => favoritos[k]).length})`}
        </button>
      </div>

      <div className="guias-container">
        <h1 className="guias-titulo">GUIAS DE PRIMEIROS SOCORROS</h1>
        <p className="guias-subtitulo">APRENDA A AGIR COM SEGURANÇA E CARINHO</p>

        {/* Botões de filtro */}
        <div className="guias-filtros">
          <button 
            className={`filtro-botao ${filtroAtivo === 'todos' ? 'ativo' : ''}`}
            onClick={() => setFiltroAtivo('todos')}
          >
            TODOS
          </button>
          <button 
            className={`filtro-botao ${filtroAtivo === 'primeiros-socorros' ? 'ativo' : ''}`}
            onClick={() => setFiltroAtivo('primeiros-socorros')}
          >
            <img src={iconePrimeirosSocorros} alt="Primeiros Socorros" />
            PRIMEIROS SOCORROS
          </button>
          <button 
            className={`filtro-botao ${filtroAtivo === 'adestramento' ? 'ativo' : ''}`}
            onClick={() => setFiltroAtivo('adestramento')}
          >
            <img src={iconePrimeirosSocorros} alt="Adestramento" />
            ADESTRAMENTO
          </button>
          <button 
            className={`filtro-botao ${filtroAtivo === 'bem-estar' ? 'ativo' : ''}`}
            onClick={() => setFiltroAtivo('bem-estar')}
          >
            <img src={iconePrimeirosSocorros} alt="Bem-estar" />
            BEM-ESTAR
          </button>
          <button 
            className={`filtro-botao ${filtroAtivo === 'caes' ? 'ativo' : ''}`}
            onClick={() => setFiltroAtivo('caes')}
          >
            <img src={iconePatapreta} alt="Cães" />
            CÃES
          </button>
          <button 
            className={`filtro-botao ${filtroAtivo === 'gatos' ? 'ativo' : ''}`}
            onClick={() => setFiltroAtivo('gatos')}
          >
            <img src={iconeGato} alt="Gatos" />
            GATOS
          </button>
        </div>

        {/* Lista de guias */}
        <div className="guias-lista">
          {guiasFiltrados.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', color: '#6A4C9C' }}>
              Nenhum guia encontrado para este filtro.
            </p>
          ) : (
            guiasFiltrados.map((guia) => (
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
                  <button 
                    className={`btn-adicionar-lista ${favoritos[guia.id] ? 'favoritado' : ''}`}
                    onClick={() => handleFavoritar(guia)}
                  >
                    <img src={iconeFavpreto} alt="Favoritar" />
                    {favoritos[guia.id] ? 'REMOVER' : '+ LISTA'}
                  </button>
                  <Link to={`/artigos?guia=${guia.id}`} className="btn-ler-guia" state={{ guiaId: guia.id }}>LER</Link>
                </div>
              </div>
              <div className="guia-card-imagem">
                <img src={guia.imagem} alt={guia.titulo} />
              </div>
            </div>
          )))}
        </div>
      </div>
    </section>
  );
};

export default GuiasPrimeirosSocorros;

