import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../assets/logo.svg';
import GitHub from '../assets/GitHub.png';
import iconeInstagram from '../assets/iconeInstagram.png';
import LinkedIn from '../assets/LinkedIn.png';
import iconeRelogio from '../assets/iconeRelogio.png';
import iconeEscudoDiferencial from '../assets/iconeEscudoDiferencial.png';
import logoBrasil from '../assets/logoBrasil.png';
import iconeDireitosAutorais from '../assets/iconeDireitosAutorais.png';

const Footer = () => {
  return (
    <footer>
      <div className="logoERedesRodape">
        <div className="brand-wrapper">
          <img className="logoRodape" src={logo} alt="Logo Artemys" />
          <div className="nomeESloganRodape">
            <p className="nomeProjetoRodape">Artemys</p>
            <p className="sloganProjetoRodape">Conectando Quem Ama a Quem Cuida</p>
          </div>
        </div>
        <ul className="listaRedesSociais">
          <li>
            <a href="https://github.com/Artemys-Site" target="_blank" rel="noopener noreferrer">
              <img src={GitHub} alt="logo do site github" />
              Github
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/artemys.pet" target="_blank" rel="noopener noreferrer">
              <img src={iconeInstagram} alt="logo da rede social instagram" />
              Instagram
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/seu-usuario" target="_blank" rel="noopener noreferrer">
              <img src={LinkedIn} alt="logo da rede social Linkedin" />
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <div className="diferenciais">
        <ul className="listaDiferenciais">
          <li>
            <img src={iconeRelogio} alt="icone de um relogio" />
            Atendimento Rápido
          </li>
          <li>
            <img src={iconeEscudoDiferencial} alt="icone de um escudo com um check dentro" />
            Procedimentos Eficazes
          </li>
          <li>
            <img src={logoBrasil} alt="icone do mapa do Brasil" />
            Suporte em todo Brasil
          </li>
          <li>
            <Link to="/faq" className="link-fale-conosco">
              <i className="bi bi-chat-dots"></i>
              Fale conosco
            </Link>
          </li>
        </ul>
      </div>
      <div className="direitosAutorias">
        <img className="logoDireitosAutorais" src={iconeDireitosAutorais} alt="icone de direitos autorais" />
        <p className="conteudoDireitosAutorais">2025 Artemys. Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;

