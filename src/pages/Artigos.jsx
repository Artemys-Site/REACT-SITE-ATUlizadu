//SIM PRR EU PEDI PRA IA COMENTAR O CODIGO PQ TAVA FODA DE ENTENDER

import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import './Artigos.css';
import Book from '../assets/Book.png';
import draMarina from '../assets/draMarina.png';
import imagemCachorro from '../assets/cachorroolhandodedo.png';
import ImagemEngasgo from '../assets/ImagemEngasgo.png';
import imagemQueimadura from '../assets/imagemQueimadura.jpg';
import intoxicacaoAnimais from '../assets/intoxicacaoAnimais.jpg';
import imagemFebre from '../assets/imagemFebre.jpg';
import iconeCapelo from '../assets/iconeCapelo.png';
import iconeVoltar from '../assets/iconeVoltar.png';
import { adicionarFavorito, removerFavorito, isFavoritado } from '../utils/favoritos';
import { conteudoGuias } from '../data/conteudoGuias';
import { useAuth } from '../context/AuthContext';

// Mapeamento de imagens
const imagensMap = {
  ImagemEngasgo: ImagemEngasgo,
  imagemQueimadura: imagemQueimadura,
  intoxicacaoAnimais: intoxicacaoAnimais,
  imagemFebre: imagemFebre
};

const Artigos = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let isLoggedIn = false;
  try {
    const auth = useAuth();
    isLoggedIn = auth.isLoggedIn;
  } catch (e) {
    // Contexto não disponível, usuário não está logado
    isLoggedIn = false;
  }
  const guiaId = searchParams.get('guia') ? parseInt(searchParams.get('guia')) : 1;
  const [favoritado, setFavoritado] = useState(false);
  
  const conteudo = conteudoGuias[guiaId] || conteudoGuias[1];
  const imagemAtual = imagensMap[conteudo.imagem] || imagemCachorro;

  useEffect(() => {
    setFavoritado(isFavoritado(conteudo.id, 'guia'));
  }, [guiaId, conteudo.id]);

  const handleFavoritar = () => {
    // Verificar se o usuário está logado
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (favoritado) {
      removerFavorito(conteudo.id, 'guia');
      setFavoritado(false);
    } else {
      adicionarFavorito({
        id: conteudo.id,
        titulo: conteudo.titulo,
        descricao: conteudo.secoes[0]?.conteudo || '',
        imagem: imagemAtual,
        categoria: "PRIMEIROS SOCORROS",
        tempoLeitura: conteudo.tempoLeitura,
        tipo: 'guia'
      });
      setFavoritado(true);
    }
  };

  const handleVoltar = () => {
    navigate('/guias-primeiros-socorros');
  };

  return (
    <section className="artigos-page">
      <div className="artigos-container">
        {/* Retângulo roxo principal à esquerda */}
        <div className="artigo-retangulo-esquerdo">
          {/* Metadados do artigo */}
          <div className="artigo-meta">
            <div className="artigo-tempo-leitura">
              <img src={Book} alt="Livro" />
              <span>{conteudo.tempoLeitura}</span>
            </div>
            <div className="artigo-meta-botoes">
              <button className="btn-ler-complemento">LER COMPLEMENTO</button>
              <button 
                className={`btn-salvar-conteudo ${favoritado ? 'favoritado' : ''}`}
                onClick={handleFavoritar}
              >
                <span>{favoritado ? '✓' : '+'}</span>
                <span>{favoritado ? 'SALVO' : 'SALVAR CONTEÚDO'}</span>
              </button>
            </div>
          </div>

          {/* Informações do autor */}
          <div className="artigo-autor-info">
            <img src={draMarina} alt={conteudo.autor} className="artigo-autor-foto" />
            <p className="artigo-autor-texto">POR {conteudo.autor} • {conteudo.dataAtualizacao}</p>
          </div>

          {/* Título principal do artigo */}
          <h1 className="artigo-titulo-completo">{conteudo.titulo}</h1>

          {/* Imagem principal do artigo */}
          <img src={imagemAtual} alt={conteudo.titulo} className="artigo-imagem-principal" />

          {/* Box de alerta */}
          <div className="artigo-alerta">
            <p className="artigo-alerta-texto">{conteudo.alerta}</p>
          </div>

          {/* Renderizar seções */}
          {conteudo.secoes.map((secao, index) => (
            <div key={index} className="artigo-secao" id={`secao-${index}`}>
              <h2 className="artigo-secao-titulo">{secao.titulo}</h2>
              
              {secao.conteudo && (
                <p className="artigo-secao-conteudo">{secao.conteudo}</p>
              )}

              {secao.passos && (
                <div>
                  {secao.passos.map((passo) => (
                    <div key={passo.numero} className="artigo-passo">
                      <div className="artigo-passo-numero">{passo.numero}</div>
                      <div className="artigo-passo-conteudo">
                        <h3 className="artigo-passo-titulo">{passo.titulo}</h3>
                        <p className="artigo-passo-texto">{passo.texto}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Botões de ação */}
          <div className="artigo-botoes-acoes">
            <button className="btn-voltar" onClick={handleVoltar}>
              <img src={iconeVoltar} alt="Voltar" />
              <span>VOLTAR</span>
            </button>
            <Link to="/ambulancia" className="btn-chamar-ambulancia-footer">CHAMAR AMBULÂNCIA</Link>
          </div>
        </div>

        {/* Sidebar com 3 cards à direita */}
        <div className="artigos-sidebar-direita">
          {/* Card 1: NESTE GUIA */}
          <div className="sidebar-card">
            <h3 className="sidebar-card-titulo">NESTE GUIA</h3>
            <ul className="sidebar-lista">
              {conteudo.secoes.map((secao, index) => (
                <li key={index}>
                  <a href={`#secao-${index}`} className={index === 0 ? 'active' : ''}>
                    {secao.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: EM EMERGÊNCIA? */}
          <div className="sidebar-card sidebar-emergencia">
            <h3 className="sidebar-card-titulo">EM EMERGÊNCIA?</h3>
            <p className="sidebar-emergencia-texto">
              SE O PET ESTÁ COM PROBLEMAS SEVEROS, INICIE OS PRIMEIROS SOCORROS E SE DIRIJA-SE À CLÍNICA MAIS PRÓXIMA.
            </p>
            <p className="sidebar-emergencia-texto">
              CASO TENHA SEU PLANO, INICIE O CHAMADO PARA CONTATAR UMA AMBULÂNCIA DE EMERGÊNCIA
            </p>
            <div className="sidebar-emergencia-acoes">
              <img src={draMarina} alt="Dra. Sofia" className="sidebar-emergencia-foto" />
              <Link to="/agendar-servico" className="btn-chamar-ambulancia">ENTRAR EM CHAMADO</Link>
            </div>
          </div>

          {/* Card 3: AUTOR */}
          <div className="sidebar-card">
            <h3 className="sidebar-card-titulo">AUTOR</h3>
            <div className="sidebar-autor">
              <div className="sidebar-autor-icon">
                <img src={iconeCapelo} alt="Ícone" className="sidebar-autor-icon-img" />
              </div>
              <p className="sidebar-autor-texto">{conteudo.autor} | CRMV 12345</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Artigos;
