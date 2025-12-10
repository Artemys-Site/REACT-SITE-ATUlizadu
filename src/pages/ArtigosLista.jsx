import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Artigos.css';
import { getFavoritos } from '../utils/favoritos';
import iconeFavpreto from '../assets/iconeFavpreto.png';
import iconeFavpretoAtivo from '../assets/iconeFavpreto.png'; // Usar mesmo ícone por enquanto

const ArtigosLista = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const abaInicial = searchParams.get('aba') || 'favoritos';
  const [abaAtiva, setAbaAtiva] = useState(abaInicial === 'artigos' ? 'favoritos' : abaInicial);
  const favoritos = getFavoritos();

  const renderFavoritos = () => {
    if (favoritos.length === 0) {
      return (
        <div className="artigos-lista-vazia">
          <p>Você ainda não favoritou nenhum artigo ou guia.</p>
          <p>Explore os artigos e guias e clique no botão de favoritar para salvar seus favoritos aqui!</p>
        </div>
      );
    }

    return (
      <div className="guias-lista">
        {favoritos.map((item) => (
          <div key={`${item.tipo}-${item.id}`} className="guia-card">
            <div className="guia-card-conteudo">
              <div className="guia-card-header">
                <div className="guia-categoria-info">
                  <span className="guia-categoria">{item.categoria || 'ARTIGO'}</span>
                  <span className="guia-tempo">{item.tempoLeitura || 'LEITURA: 5 MIN'}</span>
                </div>
              </div>
              <h2 className="guia-titulo">{item.titulo}</h2>
              <p className="guia-descricao">{item.descricao || ''}</p>
              <div className="guia-botoes">
                <Link 
                  to={item.tipo === 'guia' ? `/guias-primeiros-socorros` : `/artigos`} 
                  className="btn-ler-guia"
                >
                  LER
                </Link>
              </div>
            </div>
            {item.imagem && (
              <div className="guia-card-imagem">
                <img src={item.imagem} alt={item.titulo} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="artigos-page">
      {/* Botões de navegação GUIAS / FAVORITOS */}
      <div className="artigos-navegacao">
        <Link
          to="/guias-primeiros-socorros"
          className={`nav-botao ${abaAtiva === 'guias' ? 'nav-botao-ativo' : ''}`}
        >
          GUIAS DE PRIMEIROS SOCORROS
        </Link>
        <button
          className={`nav-botao ${abaAtiva === 'favoritos' ? 'nav-botao-ativo' : ''}`}
          onClick={() => setAbaAtiva('favoritos')}
        >
          FAVORITOS {favoritos.length > 0 && `(${favoritos.length})`}
        </button>
      </div>
      
      <div className="artigos-lista-container">
        {abaAtiva === 'guias' && (
          <>
            <h1 className="artigos-lista-titulo">GUIAS DE PRIMEIROS SOCORROS</h1>
            <p className="artigos-lista-subtitulo">Aprenda a agir com segurança e carinho</p>
            <Link to="/guias-primeiros-socorros" className="btn-ver-todos-guias">
              VER TODOS OS GUIAS
            </Link>
          </>
        )}
        
        {abaAtiva === 'favoritos' && (
          <>
            <h1 className="artigos-lista-titulo">MEUS FAVORITOS</h1>
            <p className="artigos-lista-subtitulo">
              {favoritos.length > 0 
                ? `${favoritos.length} ${favoritos.length === 1 ? 'artigo ou guia favoritado' : 'artigos e guias favoritados'}`
                : 'Nenhum favorito ainda'}
            </p>
            {renderFavoritos()}
          </>
        )}
      </div>
    </section>
  );
};

export default ArtigosLista;

