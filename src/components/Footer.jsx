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
            <p className="nomeProjetoRodape">ARTEMYS</p>
            <p className="sloganProjetoRodape">CONECTANDO QUEM AMA A QUEM CUIDA</p>
          </div>
        </div>
        <ul className="listaRedesSociais">
          <li>
            <a href="https://github.com/Artemys-Site" target="_blank" rel="noopener noreferrer">
              <img src={GitHub} alt="logo do site github" />
              GITHUB
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/artemys.pet" target="_blank" rel="noopener noreferrer">
              <img src={iconeInstagram} alt="logo da rede social instagram" />
              INSTAGRAM
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/seu-usuario" target="_blank" rel="noopener noreferrer">
              <img src={LinkedIn} alt="logo da rede social Linkedin" />
              LINKEDIN
            </a>
          </li>
        </ul>
      </div>
      <div className="diferenciais">
        <ul className="listaDiferenciais">
          <li>
            <img src={iconeRelogio} alt="icone de um relogio" />
            ATENDIMENTO RÁPIDO
          </li>
          <li>
            <img src={iconeEscudoDiferencial} alt="icone de um escudo com um check dentro" />
            PROCEDIMENTOS EFICAZES
          </li>
          <li>
            <img src={logoBrasil} alt="icone do mapa do Brasil" />
            SUPORTE EM TODO BRASIL
          </li>
          <li>
            <Link to="/faq" className="link-fale-conosco">
              <i className="bi bi-chat-dots"></i>
              FALE CONOSCO
            </Link>
          </li>
        </ul>
      </div>
      <div className="direitosAutorias">
        <img className="logoDireitosAutorais" src={iconeDireitosAutorais} alt="icone de direitos autorais" />
        <p className="conteudoDireitosAutorais">2025 ARTEMYS. TODOS OS DIREITOS RESERVADOS</p>
      </div>
    </footer>
  );
};

export default Footer;

