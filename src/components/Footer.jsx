import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="logoERedesRodape">
        <div className="brand-wrapper">
          <img className="logoRodape" src="/logo.svg" alt="Logo Artemys" />
          <div className="nomeESloganRodape">
            <p className="nomeProjetoRodape">Artemys</p>
            <p className="sloganProjetoRodape">Conectando Quem Ama a Quem Cuida</p>
          </div>
        </div>
        <ul className="listaRedesSociais">
          <li>
            <a href="https://github.com/Artemys-Site" target="_blank" rel="noopener noreferrer">
              <img src="/GitHub.png" alt="logo do site github" />
              Github
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/artemys.pet" target="_blank" rel="noopener noreferrer">
              <img src="/iconeInstagram.png" alt="logo da rede social instagram" />
              Instagram
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/seu-usuario" target="_blank" rel="noopener noreferrer">
              <img src="/LinkedIn.png" alt="logo da rede social Linkedin" />
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <div className="diferenciais">
        <ul className="listaDiferenciais">
          <li>
            <img src="/iconeRelogio.png" alt="icone de um relogio" />
            Atendimento Rápido
          </li>
          <li>
            <img src="/iconeEscudoDiferencial.png" alt="icone de um escudo com um check dentro" />
            Procedimentos Eficazes
          </li>
          <li>
            <img src="/logoBrasil.png" alt="icone do mapa do Brasil" />
            Suporte em todo Brasil
          </li>
        </ul>
      </div>
      <div className="direitosAutorias">
        <img className="logoDireitosAutorais" src="/iconeDireitosAutorais.png" alt="icone de direitos autorais" />
        <p className="conteudoDireitosAutorais">2025 Artemys. Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;

