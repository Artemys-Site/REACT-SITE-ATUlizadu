import './Sobre.css';
import joaoimagem from '../assets/joaoimagem.jpeg';
import ismaelimagem from '../assets/ismaelimagem.jpeg';
import izadoraimagem from '../assets/izadoraimagem.jpeg';
import miguelimagem from '../assets/miguelimagem.jpeg';
import tiagoimagem from '../assets/tiagoimagem.jpeg';
import juliaimagem from '../assets/juliaimagem.jpeg';
import guilhermeimagem from '../assets/guilhermeimagem.jpeg';
import misao from '../assets/misao.png';
import visao from '../assets/visao.png';
import valores from '../assets/valores (2).png';
import ODS3 from '../assets/ODS-3.jpg';
import ODS17 from '../assets/ODS-17.jpg';
import ODS18 from '../assets/ODS-18.png';

const Sobre = () => {
  const teamMembers = [
    {
      name: "JOÃO VICTOR",
      roles: ["PRODUCT OWNER", "BACK-END", "FINANCEIRO"],
      image: joaoimagem,
      github: "https://github.com/JoaoVictorLSM",
      linkedin: "https://www.linkedin.com/in/joaovictorlimadossantos/"
    },
    {
      name: "ISMAEL DA SILVA",
      roles: ["SCRUM MASTER", "UI/UX", "DESENVOLVEDOR FULL-STACK"],
      image: ismaelimagem,
      github: "https://github.com/IsmaelCoder",
      linkedin: "https://www.linkedin.com/in/ismaelsilva2/"
    },
    {
      name: "IZADORA GIROTTO",
      roles: ["UI/UX", "DESENVOLVEDORA FULL-STACK"],
      image: izadoraimagem,
      github: "https://github.com/izadoraagirotto",
      linkedin: "https://www.linkedin.com/in/izadora-amaral-girotto-b26170215"
    },
    {
      name: "MIGUEL OLIVEIRA",
      roles: ["DESENVOLVEDOR FULL-STACK"],
      image: miguelimagem,
      github: "https://github.com/migueLLIDO",
      linkedin: "https://www.linkedin.com/in/miguel-oliveira-a2b8b930b/"
    },
    {
      name: "TIAGO CASTILHO",
      roles: ["DESENVOLVEDOR FULL-STACK", "MARKETING"],
      image: tiagoimagem,
      github: "#",
      linkedin: "#"
    },
    {
      name: "JULIA DUARTE",
      roles: ["DESENVOLVEDORA FULL-STACK"],
      image: juliaimagem,
      github: "https://github.com/julia241005",
      linkedin: "https://www.linkedin.com/in/j%C3%BAlia-duarte-809857243/"
    },
    {
      name: "GUILHERME COSTA",
      roles: ["DESENVOLVEDORA FULL-STACK"],
      image: guilhermeimagem,
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
              <img src={misao} alt="Ícone de Missão" className="mvv-img" />
              <h2>MISSÃO</h2>
            </div>
            <p>PROMOVER SAÚDE, BEM-ESTAR E ACESSO A ATENDIMENTO EMERGENCIAL PARA PETS, COM INFORMAÇÃO DE QUALIDADE</p>
          </div>
          
          <div className="mvv-card">
            <div className="mvv-image-top">
              <img src={visao} alt="Ícone de Visão" className="mvv-img" />
              <h2>VISÃO</h2>
            </div>
            <p>SER A PRINCIPAL EM SUPORTE IMEDIATO E EDUCAÇÃO PET NA AMÉRICA LATINA</p>
          </div>
          
          <div className="mvv-card">
            <div className="mvv-image-top">
              <img src={valores} alt="Ícone de Valores" className="mvv-img" />
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
              <img src={ODS3} alt="ODS 3 - Saúde e Bem-estar" className="ods-img" />
            </div>
            <div className="ods-card ods-17">
              <img src={ODS17} alt="ODS 17 - Parcerias e Meios de Implementação" className="ods-img" />
            </div>
            <div className="ods-card ods-18">
              <img src={ODS18} alt="ODS 18 - Igualdade Étnico-racial" className="ods-img" />
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

