import { useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css';

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  const [enviado, setEnviado] = useState(false);

  const faqs = [
    {
      id: 1,
      pergunta: 'COMO FUNCIONA O SISTEMA DE AGENDAMENTOS?',
      resposta: 'Voce pode agendar consultas diretamente pela plataforma, escolhendo o profissional ou clinica desejada, data e horario disponivel. O agendamento e confirmado automaticamente.'
    },
    {
      id: 2,
      pergunta: 'POSSO AGENDAR CONSULTAS ONLINE?',
      resposta: 'Sim! A plataforma oferece opcao de telemedicina veterinaria. Voce pode realizar consultas online com profissionais qualificados, sem sair de casa.'
    },
    {
      id: 3,
      pergunta: 'COMO FUNCIONA O SERVIÇO DE AMBULÂNCIA?',
      resposta: 'O servico de ambulancia veterinaria esta disponivel para emergencias. Ao solicitar, um veiculo especializado sera enviado para atendimento imediato ao seu pet.'
    },
    {
      id: 4,
      pergunta: 'QUAIS FORMAS DE PAGAMENTO SÃO ACEITAS?',
      resposta: 'Aceitamos diversas formas de pagamento: cartao de credito, debito, PIX e transferencia bancaria. Os pagamentos sao processados de forma segura.'
    },
    {
      id: 5,
      pergunta: 'COMO CADASTRAR MINHA CLÍNICA NA PLATAFORMA?',
      resposta: 'Para cadastrar sua clinica, acesse a pagina de cadastro, preencha os dados da empresa e do responsavel tecnico. Aprovacao leva ate 48 horas.'
    },
    {
      id: 6,
      pergunta: 'POSSO CANCELAR UM AGENDAMENTO?',
      resposta: 'Sim, voce pode cancelar agendamentos pela plataforma com ate 24 horas de antecedencia sem custos adicionais.'
    },
    {
      id: 7,
      pergunta: 'COMO FUNCIONA O PLANO DE ASSINATURA?',
      resposta: 'Os planos de assinatura oferecem descontos em consultas e procedimentos. Voce pode escolher entre diferentes planos conforme sua necessidade e pagar mensalmente.'
    },
    {
      id: 8,
      pergunta: 'POSSO CADASTRAR MAIS DE UM PET?',
      resposta: 'Sim! Voce pode cadastrar quantos pets quiser na sua conta. Cada pet tera seu proprio perfil e historico de consultas.'
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // criar link mailto com os dados do formulario
    const assunto = encodeURIComponent(formData.assunto || 'Contato através do site Artemys');
    const corpo = encodeURIComponent(
      `Nome: ${formData.nome}\n` +
      `Email: ${formData.email}\n\n` +
      `Mensagem:\n${formData.mensagem}`
    );
    
    const mailtoLink = `mailto:projetoartemys@gmail.com?subject=${assunto}&body=${corpo}`;
    window.location.href = mailtoLink;
    
    setEnviado(true);
    setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
    
    setTimeout(() => {
      setEnviado(false);
    }, 3000);
  };

  return (
    <section className="faq-page">
      <div className="faq-container">
        <div className="faq-header">
          <Link to="/" className="btn-voltar">
            <i className="bi bi-arrow-left"></i>
            VOLTAR
          </Link>
          <h1 className="faq-titulo-principal">PERGUNTAS FREQUENTES</h1>
          <p className="faq-subtitulo">ENCONTRE RESPOSTAS PARA AS DUVIDAS MAIS COMUNS</p>
        </div>

        <div className="faq-lista">
          {faqs.map(faq => (
            <div key={faq.id} className={`faq-item ${openFaq === faq.id ? 'open' : ''}`}>
              <button className="faq-pergunta" onClick={() => toggleFaq(faq.id)}>
                <span>{faq.pergunta}</span>
                <i className={`bi bi-chevron-${openFaq === faq.id ? 'up' : 'down'}`}></i>
              </button>
              {openFaq === faq.id && (
                <div className="faq-resposta">
                  <p>{faq.resposta}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-contato">
          <h3 className="faq-contato-titulo">AINDA TEM DUVIDAS?</h3>
          <p className="faq-contato-texto">Entre em contato conosco através dos nossos canais de atendimento</p>
          <div className="faq-contato-buttons">
            <a href="mailto:projetoartemys@gmail.com" className="btn-contato btn-email">
              <i className="bi bi-envelope"></i>
              E-MAIL
            </a>
            <a href="tel:+5511999999999" className="btn-contato btn-telefone">
              <i className="bi bi-telephone"></i>
              TELEFONE
            </a>
          </div>
        </div>

        {/* formulario de contato */}
        <div className="faq-formulario-section">
          <div className="faq-formulario-container">
            <h3 className="faq-formulario-titulo">ENVIE SUA MENSAGEM</h3>
            <p className="faq-formulario-subtitulo">Preencha o formulario abaixo e entraremos em contato</p>
            
            {enviado && (
              <div className="mensagem-sucesso">
                <i className="bi bi-check-circle"></i>
                Mensagem preparada! Seu cliente de email sera aberto.
              </div>
            )}

            <form onSubmit={handleSubmit} className="faq-formulario">
              <div className="form-row-faq">
                <div className="form-group-faq">
                  <label htmlFor="nome">NOME *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className="form-group-faq">
                  <label htmlFor="email">E-MAIL *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="form-group-faq">
                <label htmlFor="assunto">ASSUNTO *</label>
                <input
                  type="text"
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleInputChange}
                  required
                  placeholder="Assunto da mensagem"
                />
              </div>

              <div className="form-group-faq">
                <label htmlFor="mensagem">MENSAGEM *</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  required
                  placeholder="Digite sua mensagem aqui..."
                  rows="6"
                ></textarea>
              </div>

              <button type="submit" className="btn-enviar-mensagem">
                <i className="bi bi-send"></i>
                ENVIAR MENSAGEM
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

