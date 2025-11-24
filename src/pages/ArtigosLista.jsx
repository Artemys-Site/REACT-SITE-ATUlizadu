import { Link, useLocation } from 'react-router-dom';
import './Artigos.css';

const ArtigosLista = () => {
  const location = useLocation();
  const isArtigosPage = location.pathname === '/artigos-lista';
  const isGuiasPage = location.pathname === '/guias-primeiros-socorros';
  
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
      
      <div className="artigos-lista-container">
        <h1 className="artigos-lista-titulo">ARTIGOS</h1>
        <p className="artigos-lista-subtitulo">Lista de artigos disponíveis</p>
        {/* Aqui você pode adicionar os cards de artigos */}
      </div>
    </section>
  );
};

export default ArtigosLista;

