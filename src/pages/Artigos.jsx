//SIM PRR EU PEDI PRA IA COMENTAR O CODIGO PQ TAVA FODA DE ENTENDER

import { Link, useLocation } from 'react-router-dom';
import './Artigos.css';
import Book from '../assets/Book.png';
import draMarina from '../assets/draMarina.png';
import imagemCachorro from '../assets/cachorroolhandodedo.png';
import iconeCapelo from '../assets/iconeCapelo.png';
import iconeVoltar from '../assets/iconeVoltar.png';

const Artigos = () => {
  const location = useLocation();
  const isArtigosPage = location.pathname === '/artigos';
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
      
      <div className="artigos-container">
        {/* Retângulo roxo principal à esquerda */}
        <div className="artigo-retangulo-esquerdo">
          {/* Metadados do artigo */}
          <div className="artigo-meta">
            <div className="artigo-tempo-leitura">
              <img src={Book} alt="Livro" />
              <span>7 MINUTOS DE LEITURA</span>
            </div>
            <div className="artigo-meta-botoes">
              <button className="btn-ler-complemento">LER COMPLEMENTO</button>
              <button className="btn-salvar-conteudo">
                <span>+</span>
                <span>SALVAR CONTEÚDO</span>
              </button>
            </div>
          </div>

          {/* Informações do autor */}
          <div className="artigo-autor-info">
            <img src={draMarina} alt="Dra. Sofia Menezes" className="artigo-autor-foto" />
            <p className="artigo-autor-texto">POR DRA. SOFIA MENENZES • ATUALIZADO HÁ 2 MESES</p>
          </div>

          {/* Título principal do artigo */}
          <h1 className="artigo-titulo-completo">EMGASGOS EM CÃOS E GATOS: OQUE FAZER IMADIATAMENTE</h1>

          {/* Imagem principal do artigo */}
          <img src={imagemCachorro} alt="Cachorro" className="artigo-imagem-principal" />

          {/* Box de alerta */}
          <div className="artigo-alerta">
            <p className="artigo-alerta-texto">MANTENHA A CALMA. SE O PET NÃO CONSEGUE RESPIRAR, NÃO PERCA TEMPO: INICIE AS MANOBRAS E PROCURE ASSISTÊNCIA VETERINÁRIA O QUANTO ANTES.</p>
          </div>

          {/* Seção: SINAIS DE ALERTA */}
          <div className="artigo-secao">
            <h2 className="artigo-secao-titulo">SINAIS DE ALERTA</h2>
            <p className="artigo-secao-conteudo">TOSSE PERSISTENTE, BOCA ABERTA COM TENTATIVA DE RESPIRAR, GENGIVAS ARROXADAS, SALIVAÇÃO EXCESSIVA, PATAS NA BOCA, DESMAIO.</p>
          </div>

          {/* Seção: SEGURANÇA PRIMEIRO */}
          <div className="artigo-secao">
            <h2 className="artigo-secao-titulo">SEGURANÇA PRIMEIRO</h2>
            <p className="artigo-secao-conteudo">NUNCA COLOQUE OS DEDOS CEGAMENTE NA BOCA DO ANIMAL. SE ENXERGAR O OBJETO, TENTE REMOVER COM CUIDADO USADO UMA PINÇA. EVITE CAUSAR LESÕES.</p>
          </div>

          {/* Seção: PASSO A PASSO */}
          <div className="artigo-secao">
            <h2 className="artigo-secao-titulo">PASSO A PASSO</h2>
            
            <div className="artigo-passo">
              <div className="artigo-passo-numero">1</div>
              <div className="artigo-passo-conteudo">
                <h3 className="artigo-passo-titulo">AVALIE A RESPIRAÇÃO</h3>
                <p className="artigo-passo-texto">OBSERVE TORAX E FLUXO DE AR PELO NARIZ. SE NÃO RESPIRAR E NÃO HOUVER PULSO, PRIORIZE RCP.</p>
              </div>
            </div>

            <div className="artigo-passo">
              <div className="artigo-passo-numero">2</div>
              <div className="artigo-passo-conteudo">
                <h3 className="artigo-passo-titulo">REMOÇÃO VISÍVEL</h3>
                <p className="artigo-passo-texto">ABRA A BOCA COM CUIDADO E, SE O OBJETO ESTIVER EVIDENTE, RETIRE-O COM PINÇA OU COM OS DEDOS EM PINÇA.</p>
              </div>
            </div>

            <div className="artigo-passo">
              <div className="artigo-passo-numero">3</div>
              <div className="artigo-passo-conteudo">
                <h3 className="artigo-passo-titulo">GOLPES INTERSCAPULARES</h3>
                <p className="artigo-passo-texto">COM O PET DE LADO, APLIQUE 5 GOLPES FIRMES ENTRE AS ESCAPULAS COM A PALMA DA MÃO.</p>
              </div>
            </div>

            <div className="artigo-passo">
              <div className="artigo-passo-numero">4</div>
              <div className="artigo-passo-conteudo">
                <h3 className="artigo-passo-titulo">MANOBRAS DE HEIMLICH ADAPTADA</h3>
                <p className="artigo-passo-texto">PARA CÃES MÉDIOS / GRANDES: ABRACE A CAIXA TORÁCICA ABAIXO DAS COSTELAS E PRESSIONE PARA CIMA E PARA FRENTE 3 - 5 VEZES. PARA CÃES PEQUENOS E GATOS: COMPRESSÕES SUAVES NO ABDOMEN.</p>
              </div>
            </div>

            <div className="artigo-passo">
              <div className="artigo-passo-numero">5</div>
              <div className="artigo-passo-conteudo">
                <h3 className="artigo-passo-titulo">REAVALIE E REPITA</h3>
                <p className="artigo-passo-texto">VERIFIQUE SE O OBJETO SAIU. REPITA GOLPES/COMPRESSÕES SE NECESSÁRIO E MANTENHA O PET ENCAMINHADO AO VETERINÁRIO.</p>
              </div>
            </div>
          </div>

          {/* Seção: APÓS O EPISÓDIO */}
          <div className="artigo-secao">
            <h2 className="artigo-secao-titulo">APÓS O EPISÓDIO</h2>
            <p className="artigo-secao-conteudo">MESMO QUE O OBJETO SEJA EXPELIDO, LEVE O ANIMAL AO VETERINÁRIO PARA CHECAR POSSÍVEIS LESÕES EM GARGANTA E PULMÕES.</p>
          </div>

          {/* Seção: PREVENÇÃO */}
          <div className="artigo-secao">
            <h2 className="artigo-secao-titulo">PREVENÇÃO</h2>
            <p className="artigo-secao-conteudo">OFEREÇA BRINQUEDOS DO TAMANHO ADEQUADO, EVITE OSSOS QUEBRADIÇOS E MANTENHA ITENS PEQUENOS FORA DO ALCANCE.</p>
          </div>

          {/* Botões de ação */}
          <div className="artigo-botoes-acoes">
            <button className="btn-voltar">
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
              <li>
                <a href="#sinais-de-alerta" className="active">SINAIS DE ALERTA</a>
              </li>
              <li>
                <a href="#seguranca-primeiro">SEGURANÇA PRIMEIRO</a>
              </li>
              <li>
                <a href="#passo-a-passo">PASSO A PASSO</a>
              </li>
              <li>
                <a href="#apos-o-episodio">APÓS O EPISÓDIO</a>
              </li>
              <li>
                <a href="#prevencao">PREVENÇÃO</a>
              </li>
            </ul>
          </div>

          {/* Card 2: EM EMERGÊNCIA? */}
          <div className="sidebar-card sidebar-emergencia">
            <h3 className="sidebar-card-titulo">EM EMERGÊNCIA?</h3>
            <p className="sidebar-emergencia-texto">
              SE O PET ESTÁ COM PROBLEMAS SEVEROS, INICIE RCP E SE DIRIJA-SE À CLÍNICA MAIS PRÓXIMA.
            </p>
            <p className="sidebar-emergencia-texto">
              CASO TENHA SEU PLANO, INICIE O CHAMADO PARA CONTATAR UMA AMBULANCIA DE EMERGÊNCIA
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
              <p className="sidebar-autor-texto">DRA. SOFIA MENENZES | CRMV 12345</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Artigos;
