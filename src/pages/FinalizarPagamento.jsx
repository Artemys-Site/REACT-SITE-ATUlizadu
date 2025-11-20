import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './FinalizarPagamento.css';
import check from '../assets/check.png';
import iconeCalendario from '../assets/iconeCalendario.png';

const FinalizarPagamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const planoData = location.state || { plano: null, preco: null };

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    formaPagamento: 'credito',
    numeroCartao: '',
    nomeTitular: '',
    validade: '',
    cvv: '',
    cpf: ''
  });

  // Se vier de um plano, exibir o plano no resumo
  const servicos = planoData.plano ? [
    { nome: `PLANO ${planoData.plano.toUpperCase()}`, descricao: 'ASSINATURA MENSAL', preco: planoData.preco || 0 }
  ] : [
    { nome: 'CONSULTA VETERINÁRIA', descricao: 'CONSULTA GERAL COM VETERINÁRIO', preco: 150.00 },
    { nome: 'VACINAÇÃO ANTIRRÁBICA', descricao: 'VACINA CONTRA RAIVA', preco: 80.00 }
  ];

  const total = servicos.reduce((sum, servico) => sum + servico.preco, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'numeroCartao') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'validade') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'telefone') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').slice(0, 15);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cpf') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Se PIX foi selecionado, redirecionar para página de PIX
    if (formData.formaPagamento === 'pix') {
      navigate('/pagamento-pix', {
        state: {
          plano: planoData.plano,
          preco: total,
          metodo: 'PIX',
          formData: formData
        }
      });
      return;
    }
    
    // Se cartão foi selecionado, redirecionar para página de cartão
    if (formData.formaPagamento === 'credito' || formData.formaPagamento === 'debito') {
      navigate('/pagamento-cartao', {
        state: {
          plano: planoData.plano,
          preco: total,
          metodo: formData.formaPagamento === 'credito' ? 'CARTÃO DE CRÉDITO' : 'CARTÃO DE DÉBITO',
          formData: formData
        }
      });
      return;
    }
    
    // Para outros métodos de pagamento, processar normalmente
    // Aqui adicione a logica do money
    alert('Pagamento processado com sucesso!');
    navigate('/agendamento-tutor');
  };

  return (
    <>
      <section className="finalizar-pagamento-page">
        <div className="finalizar-pagamento-container">
          <Link to="/agendamento-tutor" className="btn-voltar-pagamento">← VOLTAR</Link>
          
          <div className="finalizar-pagamento-header">
            <h1 className="finalizar-pagamento-titulo">FINALIZAR PAGAMENTO</h1>
            <p className="finalizar-pagamento-subtitulo">
              COMPLETE SUAS INFORMAÇÕES PARA CONFIRMAR O AGENDAMENTO
            </p>
          </div>

          <form onSubmit={handleSubmit} className="finalizar-pagamento-form">
            <div className="form-section-card">
              <div className="section-header">
                <i className="bi bi-person-fill"></i>
                <h2 className="section-titulo">DADOS PESSOAIS</h2>
              </div>
              
              <div className="form-group-finalizar">
                <label htmlFor="nome-completo">NOME COMPLETO *</label>
                <input
                  type="text"
                  id="nome-completo"
                  name="nomeCompleto"
                  placeholder="DIGITE SEU NOME COMPLETO"
                  value={formData.nomeCompleto}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group-finalizar">
                <label htmlFor="email">EMAIL *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="SEU@EMAIL.COM"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group-finalizar">
                <label htmlFor="telefone">TELEFONE *</label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-section-card">
              <div className="section-header">
                <i className="bi bi-wallet2"></i>
                <h2 className="section-titulo">FORMA DE PAGAMENTO</h2>
              </div>

              <div className="pagamento-options">
                <div className="pagamento-option">
                  <input
                    type="radio"
                    id="credito"
                    name="formaPagamento"
                    value="credito"
                    checked={formData.formaPagamento === 'credito'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="credito" className={`pagamento-label ${formData.formaPagamento === 'credito' ? 'selected' : ''}`}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                      <i className="bi bi-credit-card-2-front-fill pagamento-icon"></i>
                      <div className="pagamento-info">
                        <span className="pagamento-tipo">CARTÃO DE CRÉDITO</span>
                        <span className="pagamento-detalhes">VISA, MASTERCARD, ELO, AMEX</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="pagamento-option">
                  <input
                    type="radio"
                    id="debito"
                    name="formaPagamento"
                    value="debito"
                    checked={formData.formaPagamento === 'debito'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="debito" className={`pagamento-label ${formData.formaPagamento === 'debito' ? 'selected' : ''}`}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                      <i className="bi bi-credit-card-2-front pagamento-icon"></i>
                      <div className="pagamento-info">
                        <span className="pagamento-tipo">CARTÃO DE DÉBITO</span>
                        <span className="pagamento-detalhes">VISA, MASTERCARD, ELO, AMEX</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="pagamento-option">
                  <input
                    type="radio"
                    id="pix"
                    name="formaPagamento"
                    value="pix"
                    checked={formData.formaPagamento === 'pix'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="pix" className={`pagamento-label ${formData.formaPagamento === 'pix' ? 'selected' : ''}`}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                      <i className="bi bi-qr-code pagamento-icon"></i>
                      <div className="pagamento-info">
                        <span className="pagamento-tipo">PIX</span>
                        <span className="pagamento-detalhes">APROVAÇÃO INSTANTÂNEA</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {(formData.formaPagamento === 'credito' || formData.formaPagamento === 'debito') && (
              <div className="form-section-card">
                <div className="section-header">
                  <i className="bi bi-credit-card-2-front-fill"></i>
                  <h2 className="section-titulo">
                    DADOS DO CARTÃO {formData.formaPagamento === 'credito' ? 'DE CRÉDITO' : 'DE DÉBITO'}
                  </h2>
                </div>

                <div className="form-group-finalizar">
                  <label htmlFor="numero-cartao">NÚMERO DO CARTÃO *</label>
                  <input
                    type="text"
                    id="numero-cartao"
                    name="numeroCartao"
                    placeholder="0000 0000 0000 0000"
                    maxLength="19"
                    value={formData.numeroCartao}
                    onChange={handleInputChange}
                    required={formData.formaPagamento === 'credito' || formData.formaPagamento === 'debito'}
                  />
                </div>

                <div className="form-group-finalizar">
                  <label htmlFor="nome-titular">NOME DO TITULAR (COMO ESTÁ NO CARTÃO) *</label>
                  <input
                    type="text"
                    id="nome-titular"
                    name="nomeTitular"
                    placeholder="NOME COMPLETO"
                    value={formData.nomeTitular}
                    onChange={handleInputChange}
                    required={formData.formaPagamento === 'credito' || formData.formaPagamento === 'debito'}
                  />
                </div>

                <div className="form-row-finalizar">
                  <div className="form-group-finalizar">
                    <label htmlFor="validade">VALIDADE *</label>
                    <input
                      type="text"
                      id="validade"
                      name="validade"
                      placeholder="MM/AA"
                      maxLength="5"
                      value={formData.validade}
                      onChange={handleInputChange}
                      required={formData.formaPagamento === 'credito' || formData.formaPagamento === 'debito'}
                    />
                  </div>
                  <div className="form-group-finalizar">
                    <label htmlFor="cvv">CVV *</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      maxLength="4"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required={formData.formaPagamento === 'credito' || formData.formaPagamento === 'debito'}
                    />
                  </div>
                </div>

                <div className="form-group-finalizar">
                  <label htmlFor="cpf">CPF *</label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    placeholder="000.000.000-00"
                    maxLength="14"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    required={formData.formaPagamento === 'credito' || formData.formaPagamento === 'debito'}
                  />
                </div>
              </div>
            )}

            <div className="form-section-card resumo-card">
              <h2 className="section-titulo">RESUMO DO PEDIDO</h2>
              
              <div className="resumo-servicos">
                {servicos.map((servico, index) => (
                  <div key={index} className="resumo-servico-item">
                    <div className="servico-info">
                      <span className="servico-nome">{servico.nome}</span>
                      <span className="servico-descricao">{servico.descricao}</span>
                    </div>
                    <span className="servico-preco">R$ {servico.preco.toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>

              <div className="resumo-total">
                <span className="total-label">TOTAL</span>
                <span className="total-valor">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <button type="submit" className="btn-confirmar-pagamento">
              CONFIRMAR PAGAMENTO
            </button>

            <div className="banner-seguranca">
              <img src={check} alt="Check" className="banner-icon" />
              <div className="banner-content">
                <strong className="banner-titulo">PAGAMENTO 100% SEGURO</strong>
                <p className="banner-texto">SEUS DADOS ESTÃO PROTEGIDOS COM CRIPTOGRAFIA DE PONTA A PONTA</p>
              </div>
            </div>

            <div className="banner-confirmacao">
              <img src={iconeCalendario} alt="Calendário" className="banner-icon" />
              <div className="banner-content">
                <strong className="banner-titulo">AGENDAMENTO CONFIRMADO</strong>
                <p className="banner-texto">SEU AGENDAMENTO SERÁ CONFIRMADO APÓS A APROVAÇÃO DO PAGAMENTO</p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default FinalizarPagamento;

