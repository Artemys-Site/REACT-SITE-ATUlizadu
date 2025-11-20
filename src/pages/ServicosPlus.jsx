import { Link } from 'react-router-dom';
import './ServicosPlus.css';
import drAnaPaula from '../assets/drAnaPaula.png';

const ServicosPlus = () => {
  return (
    <>
      <section className="section-back-link">
        <div className="container">
          <Link to="/servicos" className="back-link">&larr; Voltar para a Lista</Link>
        </div>
      </section>

      <section className="section-profile-header">
        <div className="profile-container">
          <div className="profile-image-wrapper">
            <img src={drAnaPaula} alt="Dra. Ana Paula Silva" />
          </div>
          <div className="profile-info-content">
            <h1>Dr. Ana Paula Silva</h1>
            <span className="specialty-tag">Clínica Geral</span>

            <div className="rating-box">
              <span className="rating-score">4.8 ★</span>
              <span className="rating-reviews">127 Avaliações</span>
            </div>

            <p className="bio">
              Veterinária apaixonada por animais desde criança. Formada pela USP com especialização
              em clínica geral e bem-estar animal. Atendimento humanizado e focado na saúde
              integral do seu pet.
            </p>

            <div className="info-grid">
              <div className="info-item">
                <span>São Paulo - SP</span>
              </div>
              <div className="info-item">
                <span>8 Anos de Experiência</span>
              </div>
              <div className="info-item">
                <span>Seg-Sex: 9H-18H</span>
              </div>
              <div className="info-item">
                <span className="price">Consulta a partir de R$ 150</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-profile-details">
        <div className="details-container">
          <div className="detail-block">
            <h2>Formação Acadêmica</h2>
            <ul className="detail-list">
              <li>Medicina Veterinária - USP</li>
              <li>Especialização em Clínica Geral - ANCLIVEPA</li>
            </ul>
          </div>

          <div className="detail-block">
            <h2>Certificações</h2>
            <div className="tags-list">
              <span className="tag">CRMV-SP 12345</span>
              <span className="tag">Certificação em Acupuntura Veterinária</span>
            </div>
          </div>

          <div className="detail-block">
            <h2>Serviços Oferecidos</h2>
            <div className="tags-list">
              <span className="tag">Consultas</span>
              <span className="tag">Vacinação</span>
              <span className="tag">Check-up</span>
            </div>
          </div>

          <div className="detail-block">
            <h2>Depoimentos</h2>

            <div className="testimonial-card">
              <div className="testimonial-header">
                <span className="testimonial-user">Maria Santos</span>
                <span className="testimonial-date">HÁ 1 MÊS</span>
              </div>
              <div className="testimonial-rating">★★★★☆</div>
              <p>Excelente profissional! Muito atenciosa com meu cachorro.</p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-header">
                <span className="testimonial-user">João Silva</span>
                <span className="testimonial-date">HÁ 2 MESES</span>
              </div>
              <div className="testimonial-rating">★★★★★</div>
              <p>Salvou a vida do meu gato. Super recomendo!</p>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-bar">
        <button className="btn btn-phone">Ligar: (11) 98765-4321</button>
        <button className="btn btn-website">ana.silvavet.com</button>
        <button className="btn btn-agenda">Agendar Consulta</button>
      </div>
    </>
  );
};

export default ServicosPlus;

