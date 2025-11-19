import './Sobre.css';

const Sobre = () => {
  const teamMembers = [
    {
      name: "JOÃO VICTOR",
      roles: ["PRODUCT OWNER", "BACK-END", "FINANCEIRO"],
      image: "/joaoimagem.jpeg",
      github: "https://github.com/JoaoVictorLSM",
      linkedin: "https://www.linkedin.com/in/joaovictorlimadossantos/"
    },
    {
      name: "ISMAEL DA SILVA",
      roles: ["SCRUM MASTER", "UI/UX", "DESENVOLVEDOR FULL-STACK"],
      image: "/ismaelimagem.jpeg",
      github: "https://github.com/IsmaelCoder",
      linkedin: "https://www.linkedin.com/in/ismaelsilva2/"
    },
    {
      name: "IZADORA GIROTTO",
      roles: ["UI/UX", "DESENVOLVEDORA FULL-STACK"],
      image: "/izadoraimagem.jpeg",
      github: "https://github.com/izadoraagirotto",
      linkedin: "https://www.linkedin.com/in/izadora-amaral-girotto-b26170215"
    },
    {
      name: "MIGUEL OLIVEIRA",
      roles: ["DESENVOLVEDOR FULL-STACK"],
      image: "/miguelimagem.jpeg",
      github: "https://github.com/migueLLIDO",
      linkedin: "https://www.linkedin.com/in/miguel-oliveira-a2b8b930b/"
    },
    {
      name: "TIAGO CASTILHO",
      roles: ["DESENVOLVEDOR FULL-STACK", "MARKETING"],
      image: "/tiagoimagem.jpeg",
      github: "#",
      linkedin: "#"
    },
    {
      name: "JULIA DUARTE",
      roles: ["DESENVOLVEDORA FULL-STACK"],
      image: "/juliaimagem.jpeg",
      github: "https://github.com/julia241005",
      linkedin: "https://www.linkedin.com/in/j%C3%BAlia-duarte-809857243/"
    },
    {
      name: "GUILHERME COSTA",
      roles: ["DESENVOLVEDORA FULL-STACK"],
      image: "/guilhermeimagem.jpeg",
      github: "https://github.com/GuiCF-Dev",
      linkedin: "https://www.linkedin.com/in/guicostaf/"
    }
  ];

  return (
    <>
      <section className="section-mvv">
        <h1 className="section-title">SOBRE O SITE ARTEMYS</h1>
        <div className="container mvv-grid">
          <div className="mvv-card">
            <div className="mvv-image-top">
              <img src="/misao.png" alt="Ícone de Missão" className="mvv-img" />
              <h2>MISSÃO</h2>
            </div>
            <p>PROMOVER SAÚDE, BEM-ESTAR E ACESSO A ATENDIMENTO EMERGENCIAL PARA PETS, COM INFORMAÇÃO DE QUALIDADE</p>
          </div>
          
          <div className="mvv-card">
            <div className="mvv-image-top">
              <img src="/visao.png" alt="Ícone de Visão" className="mvv-img" />
              <h2>VISÃO</h2>
            </div>
            <p>SER A PRINCIPAL EM SUPORTE IMEDIATO E EDUCAÇÃO PET NA AMÉRICA LATINA</p>
          </div>
          
          <div className="mvv-card">
            <div className="mvv-image-top">
              <img src="/valores (2).png" alt="Ícone de Valores" className="mvv-img" />
              <h2>VALORES</h2>
            </div>
            <ul className="valores-list">
              <li>CUIDADO</li>
              <li>INCLUSÃO</li>
              <li>RESPONSABILIDADE</li>
              <li>TRANSPARÊNCIA</li>
              <li>INOVAÇÃO</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-impact">
        <div className="container">
          <h2 className="section-title impact-title">IMPACTO SOCIAL E SUSTENTABILIDADE</h2>
          <p className="impact-text">
            TRABALHAMOS PARA DEMOCRATIZAR O ACESSO A CUIDADOS VETERINÁRIOS, TORNANDO-OS FÁCEIS E ACESSÍVEIS PARA TODOS. 
            SIMULTANEAMENTE, IMPULSIONAMOS O CRESCIMENTO DOS PROFISSIONAIS, DANDO-LHES A VISIBILIDADE & AS OPORTUNIDADES 
            NECESSÁRIAS PARA PROSPERAR NESTE MERCADO EM PLENA ASCENSÃO, ALINHADO COM OS OBJETIVOS DE DESENVOLVIMENTO SUSTENTÁVEL!
          </p>

          <div className="ods-container">
            <div className="ods-card ods-3">
              <img src="/ODS-3.jpg" alt="ODS 3 - Saúde e Bem-estar" className="ods-img" />
            </div>
            <div className="ods-card ods-17">
              <img src="/ODS-17.jpg" alt="ODS 17 - Parcerias e Meios de Implementação" className="ods-img" />
            </div>
            <div className="ods-card ods-18">
              <img src="/ODS-18.png" alt="ODS 18 - Igualdade Étnico-racial" className="ods-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-team">
        <div className="container">
          <h2 className="section-title team-title">MEMBROS DA ARTEMYS</h2>
          <p className="team-subtitle">CONHEÇA A EQUIPE APAIXONADA POR TECNOLOGIA E CUIDADO ANIMAL</p>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`member-card ${index === teamMembers.length - 1 ? 'last-member' : ''}`}
              >
                <div className="member-photo-circle">
                  <img src={member.image} alt={`Foto de ${member.name}`} className="member-img" />
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  {member.roles.map((role, roleIndex) => (
                    <p key={roleIndex} className="member-role">{role}</p>
                  ))}
                </div>
                <div className="member-social">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label={`Github de ${member.name}`}>
                    <i className="fab fa-github social-icon"></i>
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${member.name}`}>
                    <i className="fab fa-linkedin-in social-icon"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Sobre;

