import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Artigos.css';
import rotinaImagem from '../assets/rotinaImagem.jpeg';
import iconeEtiquetafav from '../assets/iconeEtiquetafav.png';
import imagemGuia2 from '../assets/imagemGuia2.png';
import iconePrimeirosSocorros from '../assets/iconePrimeirosSocorros.png';
import imagemFebre from '../assets/imagemFebre.jpg';
import iconeCoracao from '../assets/iconeCoracao.png';
import ImagemEngasgo from '../assets/ImagemEngasgo.png';
import draMarina from '../assets/draMarina.png';
import imagemQueimadura from '../assets/imagemQueimadura.jpg';
import intoxicacaoAnimais from '../assets/intoxicacaoAnimais.jpg';
import Book from '../assets/Book.png';
import iconeAlerta from '../assets/iconeAlerta.png';
import iconeVoltar from '../assets/iconeVoltar.png';
import iconeCapelo from '../assets/iconeCapelo.png';
import iconeEscudoPreto from '../assets/iconeEscudoPreto.png';
import iconeFavpreto from '../assets/iconeFavpreto.png';
import iconePatapreta from '../assets/iconePatapreta.png';
import iconeGato from '../assets/iconeGato.png';
import iconSearch from '../assets/iconSearch.png';

const Artigos = () => {
  const [tipoConteudo, setTipoConteudo] = useState('artigos');
  const [artigoSelecionado, setArtigoSelecionado] = useState(null);

  const artigos = [
    {
      id: 1,
      titulo: "Rotina de Cuidado e Prevenção",
      descricao: "Alimentação, Vacinas e Check-ups sem Mistérios",
      imagem: rotinaImagem,
      categoria: "Dicas Gerais",
      iconeCategoria: iconeEtiquetafav
    },
    {
      id: 2,
      titulo: "Como agir em engasgos e intoxicações",
      descricao: "Passo a Passo Para Situação de Emergência Até Chegar ao Atendimento",
      imagem: "/imagemGuia2.png",
      categoria: "Primeiros Socorros",
      iconeCategoria: "/iconePrimeirosSocorros.png"
    },
    {
      id: 3,
      titulo: "Como tratar a febre do seu pet",
      descricao: "Passo a Passo Para Tratar Seu Pet em Casos de Febre",
      imagem: imagemFebre,
      categoria: "Primeiros Socorros",
      iconeCategoria: iconeCoracao
    }
  ];

  const guias = [
    {
      id: 1,
      titulo: "ENGASGOS EM CÃES E GATOS: O QUE FAZER IMEDIATAMENTE",
      descricao: "Saiba como identificar os sintomas, como agir em caso de emergência e prevenir engasgos.",
      imagem: ImagemEngasgo,
      categoria: "Primeiros Socorros",
      iconeCategoria: iconePrimeirosSocorros,
      conteudoCompleto: {
        tempoLeitura: "7 MINUTOS DE LEITURA",
        autor: "DRA. SOFIA MENENZES",
        dataAtualizacao: "ATUALIZADO HÁ 2 MESES",
        autorFoto: draMarina,
        imagemPrincipal: imagemGuia2,
        alerta: "MANTENHA A CALMA. SE O PET NÃO CONSEGUE RESPIRAR, NÃO PERCA TEMPO: INICIE AS MANOBRAS E PROCURE ASSISTÊNCIA VETERINÁRIA O QUANTO ANTES.",
        secoes: [
          {
            titulo: "SINAIS DE ALERTA",
            conteudo: "TOSSE PERSISTENTE, BOCA ABERTA COM TENTATIVA DE RESPIRAR, GENGIVAS ARROXADAS, SALIVAÇÃO EXCESSIVA, PATAS NA BOCA, DESMAIO."
          },
          {
            titulo: "SEGURANÇA PRIMEIRO",
            conteudo: "NUNCA COLOQUE OS DEDOS CEGAMENTE NA BOCA DO ANIMAL. SE ENTERRAR O OBJETO, TENTE REMOVER COM CUIDADO USANDO UMA PINÇA. EVITE CAUSAR LESÕES."
          },
          {
            titulo: "PASSO A PASSO",
            passos: [
              {
                numero: 1,
                titulo: "AVALIE A RESPIRAÇÃO",
                texto: "OBSERVE TÓRAX E FLUXO DE AR PELO NARIZ. SE NÃO RESPIRAR E NÃO HOUVER PULSO, PRIORIZE RCP."
              },
              {
                numero: 2,
                titulo: "REMOÇÃO VISÍVEL",
                texto: "ABRA A BOCA COM CUIDADO E, SE O OBJETO ESTIVER EVIDENTE, RETIRE-O COM PINÇA OU COM OS DEDOS EM PINÇA."
              },
              {
                numero: 3,
                titulo: "GOLPES INTERESCAPULARES",
                texto: "COM O PET DE LADO, APLIQUE 5 GOLPES FIRMES ENTRE AS ESCÁPULAS COM A PALMA DA MÃO."
              },
              {
                numero: 4,
                titulo: "MANOBRAS DE HEIMLICH ADAPTADA",
                texto: "PARA CÃES MÉDIOS/GRANDES: ABRAÇE A CAIXA TORÁCICA ABAIXO DAS COSTELAS E PRESSIONE PARA CIMA E PARA FRENTE 3-5 VEZES. PARA CÃES PEQUENOS E GATOS: COMPRESSÕES SUAVES NO ABDÔMEN."
              },
              {
                numero: 5,
                titulo: "REAVALIE E REPITA",
                texto: "VERIFIQUE SE O OBJETO SAIU. REPITA GOLPES/COMPRESSÕES SE NECESSÁRIO E MANTENHA O PET ENCAMINHADO AO VETERINÁRIO."
              }
            ]
          },
          {
            titulo: "APÓS O EPISÓDIO",
            conteudo: "MESMO QUE O OBJETO SEJA EXPELIDO, LEVE O ANIMAL AO VETERINÁRIO PARA CHECAR POSSÍVEIS LESÕES EM GARGANTA E PULMÕES."
          },
          {
            titulo: "PREVENÇÃO",
            conteudo: "OFEREÇA BRINQUEDOS DO TAMANHO ADEQUADO, EVITE OSSOS QUEBRADIÇOS E MANTENHA ITENS PEQUENOS FORA DO ALCANCE."
          }
        ]
      }
    },
    {
      id: 2,
      titulo: "QUEIMADURAS EM CÃES E GATOS: AÇÃO IMEDIATA",
      descricao: "Descubra os tipos de queimaduras, como prestar os primeiros socorros e quando procurar um veterinário.",
      imagem: imagemQueimadura,
      categoria: "Primeiros Socorros",
      iconeCategoria: iconePrimeirosSocorros
    },
    {
      id: 3,
      titulo: "INTOXICAÇÃO EM ANIMAIS: LISTA DE PLANTAS VENENOSAS",
      descricao: "Conheça as plantas comuns que são tóxicas para cães e gatos, sintomas de intoxicação e o que fazer.",
      imagem: intoxicacaoAnimais,
      categoria: "Primeiros Socorros",
      iconeCategoria: iconePrimeirosSocorros
    },
    {
      id: 4,
      titulo: "INSOLAÇÃO EM CÃES E GATOS: COMO RECONHECER E RESFRIAR",
      descricao: "Aprenda a identificar os sinais de insolação, as medidas de primeiros socorros e a prevenção em dias quentes.",
      imagem: "/imagemGuia2.png",
      categoria: "Primeiros Socorros",
      iconeCategoria: "/iconePrimeirosSocorros.png"
    }
  ];

  const handleLerArtigo = (item) => {
    if (item.conteudoCompleto) {
      setArtigoSelecionado(item);
    }
  };

  const voltarParaLista = () => {
    setArtigoSelecionado(null);
  };

  if (artigoSelecionado && artigoSelecionado.conteudoCompleto) {
    const conteudo = artigoSelecionado.conteudoCompleto;
    return (
      <section className="artigo-completo active">
        <div className="artigo-completo-container">
          <div className="artigo-completo-main">
            <div className="artigo-meta">
              <div className="artigo-tempo-leitura">
                <img src={Book} alt="Livro" />
                <span>{conteudo.tempoLeitura}</span>
              </div>
              <button className="btn-ler-complemento">LER COMPLEMENTO</button>
              <button className="btn-salvar-conteudo">
                <span>+</span>
                <span>SALVAR CONTEÚDO</span>
              </button>
            </div>

            <div className="artigo-autor-info">
              <img src={conteudo.autorFoto} alt={conteudo.autor} className="artigo-autor-foto" />
              <p className="artigo-autor-texto">POR {conteudo.autor} • {conteudo.dataAtualizacao}</p>
            </div>

            <h1 className="artigo-titulo-completo">{artigoSelecionado.titulo}</h1>

            <img src={conteudo.imagemPrincipal} alt={artigoSelecionado.titulo} className="artigo-imagem-principal" />

            <div className="artigo-alerta">
              <img src={iconeAlerta} alt="Alerta" />
              <p className="artigo-alerta-texto">{conteudo.alerta}</p>
            </div>

            {conteudo.secoes.map((secao, index) => (
              <div key={index} className="artigo-secao">
                <h2 className="artigo-secao-titulo">{secao.titulo}</h2>
                {secao.conteudo && (
                  <p className="artigo-secao-conteudo">{secao.conteudo}</p>
                )}
                {secao.passos && (
                  <>
                    {secao.passos.map((passo, passoIndex) => (
                      <div key={passoIndex} className="artigo-passo">
                        <div className="artigo-passo-numero">{passo.numero}</div>
                        <div className="artigo-passo-conteudo">
                          <h3 className="artigo-passo-titulo">{passo.titulo}</h3>
                          <p className="artigo-passo-texto">{passo.texto}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}

            <div className="artigo-botoes-acoes">
              <button className="btn-voltar" onClick={voltarParaLista}>
                <img src={iconeVoltar} alt="Voltar" />
                <span>VOLTAR</span>
              </button>
              <Link to="/ambulancia" className="btn-chamar-ambulancia-footer">CHAMAR AMBULÂNCIA</Link>
            </div>
          </div>

          <div className="artigo-sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-card-titulo">NESTE GUIA</h3>
              <ul className="sidebar-lista">
                {conteudo.secoes.map((secao, index) => (
                  <li key={index}>
                    <a href={`#${secao.titulo.toLowerCase().replace(/\s+/g, '-')}`} className={index === 0 ? 'active' : ''}>
                      {secao.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-card sidebar-emergencia">
              <h3 className="sidebar-card-titulo">EM EMERGÊNCIA?</h3>
              <p className="sidebar-emergencia-texto">
                SE O PET ESTÁ COM PROBLEMAS SEVEROS, INICIE RCP E SE DIRIJA-SE À CLÍNICA MAIS PRÓXIMA.
              </p>
              <p className="sidebar-emergencia-texto">
                CASO TENHA SEU PLANO, INICIE O CHAMADO PARA CONTATAR UMA AMBULANCIA DE EMERGÊNCIA
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                <img src={draMarina} alt="Dra. Sofia" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <Link to="/ambulancia" className="btn-chamar-ambulancia">ENTRAR EM CHAMADO</Link>
              </div>
            </div>

            <div className="sidebar-card">
              <h3 className="sidebar-card-titulo">AUTOR</h3>
              <div className="sidebar-autor">
                <div className="sidebar-autor-icon">
                  <img src={iconeCapelo} alt="Ícone" style={{ width: '24px', height: '24px' }} />
                </div>
                <p className="sidebar-autor-texto">{conteudo.autor} | CRMV 12345</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="artigos-page" id="artigos-lista">
      <div className="artigos-container">
        <div className="artigos-nav">
          <button
            className={`artigos-nav-btn ${tipoConteudo === 'artigos' ? 'active' : ''}`}
            onClick={() => setTipoConteudo('artigos')}
            data-tipo="artigos"
          >
            Artigos
          </button>
          <button
            className={`artigos-nav-btn ${tipoConteudo === 'guias' ? 'active' : ''}`}
            onClick={() => setTipoConteudo('guias')}
            data-tipo="guias"
          >
            Guias de Primeiros Socorros
          </button>
        </div>

        {tipoConteudo === 'artigos' && (
          <div id="conteudo-artigos">
            <h1 className="artigos-titulo">ARTIGOS</h1>
            <p className="artigos-subtitulo">Conteúdo educativo para o cuidado do seu pet</p>

            <div className="filtros-container">
              <button className="filtro-btn">
                <img src={iconeEscudoPreto} alt="Primeiros Socorros" />
                <span>Primeiros Socorros</span>
              </button>
              <button className="filtro-btn">
                <img src={iconeFavpreto} alt="Prevenção" />
                <span>Prevenção</span>
              </button>
              <button className="filtro-btn">
                <img src={iconePatapreta} alt="Cão" />
                <span>Cão</span>
              </button>
              <button className="filtro-btn">
                <img src={iconeGato} alt="Gato" />
                <span>Gato</span>
              </button>
            </div>

            <div className="artigos-grid" id="grid-artigos">
              {artigos.map(artigo => (
                <div key={artigo.id} className="artigo-card">
                  <img src={artigo.imagem} alt={artigo.titulo} className="artigo-card-imagem" />
                  <div className="artigo-card-conteudo">
                    <div className="artigo-card-tag">
                      <img src={artigo.iconeCategoria} alt={artigo.categoria} />
                      <span>{artigo.categoria}</span>
                    </div>
                    <h3 className="artigo-card-titulo">{artigo.titulo}</h3>
                    <p className="artigo-card-descricao">{artigo.descricao}</p>
                    <div className="artigo-card-botoes">
                      <button className="btn-saiba-mais-artigo">
                        <img src={iconSearch} alt="Buscar" />
                        <span>Saiba Mais</span>
                      </button>
                      <button className="btn-ler-artigo">Ler</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tipoConteudo === 'guias' && (
          <div id="conteudo-guias">
            <h1 className="artigos-titulo">GUIAS DE PRIMEIROS SOCORROS</h1>
            <p className="artigos-subtitulo">Aprenda a agir com segurança e carinho</p>

            <div className="filtros-container">
              <button className="filtro-btn">
                <img src={iconeEscudoPreto} alt="Primeiros Socorros" />
                <span>Primeiros Socorros</span>
              </button>
              <button className="filtro-btn">
                <img src={iconeFavpreto} alt="Prevenção" />
                <span>Prevenção</span>
              </button>
              <button className="filtro-btn">
                <img src={iconePatapreta} alt="Cão" />
                <span>Cão</span>
              </button>
              <button className="filtro-btn">
                <img src={iconeGato} alt="Gato" />
                <span>Gato</span>
              </button>
            </div>

            <div className="artigos-grid" id="grid-guias">
              {guias.map(guia => (
                <div key={guia.id} className="artigo-card">
                  <img src={guia.imagem} alt={guia.titulo} className="artigo-card-imagem" />
                  <div className="artigo-card-conteudo">
                    <div className="artigo-card-tag">
                      <img src={guia.iconeCategoria} alt={guia.categoria} />
                      <span>{guia.categoria}</span>
                    </div>
                    <h3 className="artigo-card-titulo">{guia.titulo}</h3>
                    <p className="artigo-card-descricao">{guia.descricao}</p>
                    <div className="artigo-card-botoes">
                      <button 
                        className="btn-saiba-mais-artigo"
                        onClick={() => handleLerArtigo(guia)}
                      >
                        <img src={iconSearch} alt="Buscar" />
                        <span>Saiba Mais</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Artigos;
