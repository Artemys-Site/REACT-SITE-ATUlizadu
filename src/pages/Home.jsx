import { Link } from 'react-router-dom';
import './Home.css';
import iconePatapreta from '../assets/iconePatapreta.png';
import Vetorizado from '../assets/Vetorizado.svg';
import iconePlanosplataforma from '../assets/iconePlanosplataforma.png';
import iconeChamarambulancia from '../assets/iconeChamarambulancia.png';
import ImagemMain1 from '../assets/ImagemMain1.png';
import imagemArty from '../assets/imagemArty.png';
import Book from '../assets/Book.png';
import Siren from '../assets/Siren.png';
import Nurse from '../assets/Nurse.png';
import check from '../assets/check.png';
import X from '../assets/X.png';
import rotinaImagem from '../assets/rotinaImagem.jpeg';
import iconeEtiquetafav from '../assets/iconeEtiquetafav.png';
import imagemGuia2 from '../assets/imagemGuia2.png';
import iconePrimeirosSocorros from '../assets/iconePrimeirosSocorros.png';
import imagemFebre from '../assets/imagemFebre.jpg';
import iconeCoracao from '../assets/iconeCoracao.png';
import imagemParceria from '../assets/imagemParceria.png';
import nomeAumaGemea from '../assets/nomeAumaGemea.png';
import iconeBeneficios from '../assets/iconeBeneficios.png';
import pataRoxa from '../assets/pataRoxa.png';

const Home = () => {
  return (
    <>
      <section className="home">
        <div className="home-container">
          <div className="home-content">
            <div className="home-tag">
              <img src={iconePatapreta} alt="ícone de pata" />
              <span>Primeiros Socorros e Bem-Estar Pet</span>
            </div>

            <div className="home-brand">
              <img className="imagem-logo" src={Vetorizado} alt="Logo Artemys" />
              <div className="brand-text">
                <h2>ARTEMYS</h2>
                <h3>CONECTANDO QUEM AMA A QUEM CUIDA</h3>
              </div>
            </div>

            <p className="home-description">
              Ambulância veterinária, artigos educativos e planos com telemedicina e parcerias.
            </p>

            <div className="home-botoes">
              <Link to="/planos" className="btn btn-laranja">
                <img src={iconePlanosplataforma} alt="ícone planos" />
                <span>Veja nossos Planos</span>
              </Link>
              <Link to="/ambulancia" className="btn btn-roxo">
                <img src={iconeChamarambulancia} alt="ícone ambulância" />
                <span>Acionar Ambulância</span>
              </Link>
              <Link to="/servicos" className="btn btn-laranja">
                <span>Explorar Serviços</span>
              </Link>
            </div>
          </div>
          <div className="home-image-wrapper">
            <img className="home-image" src={ImagemMain1} alt="Homem dando carinho para um cachorro" />
          </div>
        </div>
      </section>

      <section className="secao-servicos">
        <div className="servicos-container">
          <img className="servicos-bg-image" src={imagemArty} alt="Mascote Arty cuidando de um filhote" />
          <div className="servicos-conteudo-overlay">
            <h2>NOSSOS SERVIÇOS</h2>
            <ul className="servicos-lista">
              <li>
                <img src={Book} alt="ícone de um livro" />
                <p>GUIAS E ARTIGOS PARA A SAÚDE E BEM-ESTAR DO SEU PET</p>
              </li>
              <li>
                <img src={Siren} alt="ícone de sirene" />
                <p>SERVIÇOS DE AMBULÂNCIA EM CASOS DE EMERGÊNCIA</p>
              </li>
              <li>
                <img src={Nurse} alt="ícone de saúde" />
                <p>CONSULTAS VETERINÁRIAS DO MELHORES PROFISSIONAIS</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="secao-planos">
        <h2>Planos de Assinatura</h2>
        <p className="subtitulo-planos">Escolha o plano ideal para cuidar do seu pet</p>

        <div className="planos-container">
          <div className="card-plano card-plano--orange">
            <div className="card-plano-header">
              <h3>Primeiro Cuidado</h3>
              <div className="preco">
                <span className="preco-valor">Grátis</span>
                <span className="preco-mes">/Mês</span>
              </div>
            </div>
            <div className="card-plano-body">
              <ul className="lista-beneficios">
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Acesso ao mapa de clínicas e hospitais veterinários 24h</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Artigos e dicas básicas de cuidados e prevenção para pets</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Checklist digital de primeiros socorros</p>
                </li>
                <li className="beneficio-inativo">
                  <img className="simbolosBeneficios" src={X} alt="X" />
                  <p>Acesso a nossa IA</p>
                </li>
                <li className="beneficio-inativo">
                  <img className="simbolosBeneficios" src={X} alt="X" />
                  <p>Consultas online com veterinários</p>
                </li>
              </ul>
              <Link to="/planos" className="btn-assinar btn-assinar--orange">Assinar Plano</Link>
            </div>
          </div>

          <div className="card-plano card-plano--purple card-plano--popular">
            <div className="popular-tag">POPULAR</div>
            <div className="card-plano-header">
              <h3>Cuidado Completo</h3>
              <div className="preco">
                <span className="preco-valor">R$ 100,00</span>
                <span className="preco-mes">/Mês</span>
              </div>
            </div>
            <div className="card-plano-body">
              <ul className="lista-beneficios">
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Acesso ao mapa de clínicas e hospitais veterinários 24h</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Artigos e dicas básicas de cuidados e prevenção para pets</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Checklist digital de primeiros socorros</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Acesso a nossa IA</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Consultas online com veterinários</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Descontos nos serviços de ambulância</p>
                </li>
              </ul>
              <Link to="/planos" className="btn-assinar btn-assinar--purple">Assinar Plano</Link>
            </div>
          </div>

          <div className="card-plano card-plano--orange">
            <div className="card-plano-header">
              <h3>Cuidado Master</h3>
              <div className="preco">
                <span className="preco-valor">R$ 200,00</span>
                <span className="preco-mes">/Mês</span>
              </div>
            </div>
            <div className="card-plano-body">
              <ul className="lista-beneficios">
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Acesso ao mapa de clínicas e hospitais veterinários 24h</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Artigos e Dicas Premium de Cuidados e Prevenção</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Checklist digital de primeiros socorros</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Acesso a nossa IA</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Consultas online com veterinários</p>
                </li>
                <li>
                  <img className="simbolosBeneficios" src={check} alt="check" />
                  <p>Acesso a serviço de ambulância</p>
                </li>
              </ul>
              <Link to="/planos" className="btn-assinar btn-assinar--orange">Assinar Plano</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="GuiasEmDestaque">
        <h2>Artigos em Destaque</h2>
        <p className="subtitulo-guias">Conteúdo confiável para agir com segurança e promover o bem-estar</p>

        <div className="cardArtigos">
          <div className="card-artigo">
            <div className="card-artigo-imagem-wrapper">
              <img src={rotinaImagem} alt="Rotina de cuidado com pet" />
            </div>
            <div className="card-artigo-conteudo">
              <div className="card-artigo-categoria">
                <img className="iconeGeneroGuias" src={iconeEtiquetafav} alt="ícone de dicas" />
                <p className="nomeGeneroGuia">Dicas Gerais</p>
              </div>
              <p className="tituloGuia">Rotina de Cuidado e Prevenção</p>
              <p className="descricaoGuia">Alimentação, Vacinas e Check-ups sem Mistérios</p>
              <Link to="/artigos" className="btn-saiba-mais">Saiba Mais</Link>
            </div>
          </div>

          <div className="card-artigo">
            <div className="card-artigo-imagem-wrapper">
              <img src={imagemGuia2} alt="Ilustração de um cachorro com engasgo" />
            </div>
            <div className="card-artigo-conteudo">
              <div className="card-artigo-categoria">
                <img className="iconeGeneroGuias" src={iconePrimeirosSocorros} alt="ícone de primeiros socorros" />
                <p className="nomeGeneroGuia">Primeiros Socorros</p>
              </div>
              <p className="tituloGuia">Como agir em engasgos e intoxicações</p>
              <p className="descricaoGuia">Passo a Passo Para Situação de Emergência Até Chegar ao Atendimento</p>
              <Link to="/artigos" className="btn-saiba-mais">Saiba Mais</Link>
            </div>
          </div>

          <div className="card-artigo">
            <div className="card-artigo-imagem-wrapper">
              <img src={imagemFebre} alt="Cachorro doente com bolsa de gelo na cabeça" />
            </div>
            <div className="card-artigo-conteudo">
              <div className="card-artigo-categoria">
                <img className="iconeGeneroGuias" src={iconeCoracao} alt="ícone de primeiros socorros" />
                <p className="nomeGeneroGuia">Primeiros Socorros</p>
              </div>
              <p className="tituloGuia">Como tratar a febre do seu pet</p>
              <p className="descricaoGuia">Passo a Passo Para Tratar Seu Pet em Casos de Febre</p>
              <Link to="/artigos" className="btn-saiba-mais">Saiba Mais</Link>
            </div>
          </div>
        </div>
        <Link to="/artigos" className="btn-ver-mais">Ver Todos os Guias</Link>
      </section>

      <section className="parcerias">
        <h2>Parcerias</h2>

        <div className="parceria-container">
          <div className="parceria-imagem">
            <img className="imagemParce" src={imagemParceria} alt="Mascote Artemys e mascote Auma Gêmea" />
          </div>
          <div className="parceria-conteudo">
            <img className="parceria-logo-nome" src={nomeAumaGemea} alt="Nome Do projeto AumaGêmea" />
            <p className="parceria-slogan">Encontre seu novo melhor amigo!</p>
            <p className="parceria-descricao">
              A AumaGêmea conecta pets que precisam de um lar com pessoas que querem adotar.
            </p>

            <div className="parceria-beneficios-header">
              <img className="iconeBeneficios" src={iconeBeneficios} alt="icone de uma medalha" />
              <p className="tituloBeneficios">Benefícios</p>
            </div>

            <ul className="parceria-beneficios-lista">
              <li>
                <img src={pataRoxa} alt="icone de uma pata roxa" />
                <p>Desconto de 20% off na primeira consulta em telemedicina veterinária</p>
              </li>
              <li>
                <img src={pataRoxa} alt="icone de uma pata roxa" />
                <p>Primeiro mês grátis em artigos premium</p>
              </li>
            </ul>
            <button className="parceria-botao">Saiba Mais</button>
          </div>
        </div>
      </section>

      <section className="mobile-auth-section mobile-only">
        <div className="mobile-auth-buttons-container">
          <Link to="/login" className="mobile-btn-entrar-full">Entrar</Link>
          <Link to="/cadastro" className="mobile-btn-cadastrar-full">Cadastrar</Link>
        </div>
      </section>
    </>
  );
};

export default Home;

