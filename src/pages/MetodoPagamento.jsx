import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MetodoPagamento.css';
import iconeDinheiro from '../assets/iconeDinheiro.png';

const MetodoPagamento = () => {
  const navigate = useNavigate();
  const [tipoPagamento, setTipoPagamento] = useState('credito');
  const [formData, setFormData] = useState({
    numeroCartao: '',
    nomeTitular: '',
    validade: '',
    cvv: '',
    bandeira: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 2624 2471724222
  
    if (name === 'numeroCartao') {
      // Formatar número do cartão
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();  //codigo que formata o formato do cartao xdddd
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'validade') {
      // Formatar validade MM/AA
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // aqui ée  coom  o beckk  eenndd
    console.log('Método de pagamento:', { tipoPagamento, ...formData });
    navigate('/perfil#pagamento');
  };

  const voltarParaPerfil = () => {
    navigate('/perfil#pagamento');
  };

  return (
    <section className="pagamento-page">
      <div className="pagamento-modal">
        <div className="modal-header">
          <h1 className="modal-titulo">ADICIONAR MÉTODO DE PAGAMENTO</h1>
          <button className="btn-fechar" onClick={voltarParaPerfil} aria-label="Fechar">
            ×
          </button>
        </div>

        <div className="tipo-pagamento-tabs">
          <button
            className={`tipo-pagamento-tab ${tipoPagamento === 'credito' ? 'active' : ''}`}
            onClick={() => setTipoPagamento('credito')}
            type="button"
          >
            <img src={iconeDinheiro} alt="Crédito" />
            <span>CRÉDITO</span>
          </button>
          <button
            className={`tipo-pagamento-tab ${tipoPagamento === 'debito' ? 'active' : ''}`}
            onClick={() => setTipoPagamento('debito')}
            type="button"
          >
            <img src={iconeDinheiro} alt="Débito" />
            <span>DÉBITO</span>
          </button>
        </div>

        {/* Formulário Crédito */}
        <form
          id="form-credito"
          className={`form-pagamento ${tipoPagamento === 'credito' ? 'active' : ''}`}
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="numero-cartao-credito">NÚMERO DO CARTÃO</label>
            <input
              type="text"
              id="numero-cartao-credito"
              name="numeroCartao"
              placeholder="0000 0000 0000 0000"
              maxLength="19"
              value={formData.numeroCartao}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nome-titular-credito">NOME DO TITULAR</label>
            <input
              type="text"
              id="nome-titular-credito"
              name="nomeTitular"
              placeholder="NOME COMO ESTÁ NO CARTÃO"
              value={formData.nomeTitular}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="validade-credito">VALIDADE</label>
              <input
                type="text"
                id="validade-credito"
                name="validade"
                placeholder="MM/AA"
                maxLength="5"
                value={formData.validade}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv-credito">CVV</label>
              <input
                type="text"
                id="cvv-credito"
                name="cvv"
                placeholder="123"
                maxLength="4"
                value={formData.cvv}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bandeira-credito">BANDEIRA</label>
            <select
              id="bandeira-credito"
              name="bandeira"
              value={formData.bandeira}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione a bandeira</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="elo">Elo</option>
              <option value="amex">American Express</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={voltarParaPerfil}>
              CANCELAR
            </button>
            <button type="submit" className="btn-adicionar">
              ADICIONAR
            </button>
          </div>
        </form>

        {/* Formulário Débito */}
        <form
          id="form-debito"
          className={`form-pagamento ${tipoPagamento === 'debito' ? 'active' : ''}`}
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="numero-cartao-debito">NÚMERO DO CARTÃO</label>
            <input
              type="text"
              id="numero-cartao-debito"
              name="numeroCartao"
              placeholder="0000 0000 0000 0000"
              maxLength="19"
              value={formData.numeroCartao}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nome-titular-debito">NOME DO TITULAR</label>
            <input
              type="text"
              id="nome-titular-debito"
              name="nomeTitular"
              placeholder="NOME COMO ESTÁ NO CARTÃO"
              value={formData.nomeTitular}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="validade-debito">VALIDADE</label>
              <input
                type="text"
                id="validade-debito"
                name="validade"
                placeholder="MM/AA"
                maxLength="5"
                value={formData.validade}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv-debito">CVV</label>
              <input
                type="text"
                id="cvv-debito"
                name="cvv"
                placeholder="123"
                maxLength="4"
                value={formData.cvv}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bandeira-debito">BANDEIRA</label>
            <select
              id="bandeira-debito"
              name="bandeira"
              value={formData.bandeira}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione a bandeira</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="elo">Elo</option>
              <option value="amex">American Express</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={voltarParaPerfil}>
              CANCELAR
            </button>
            <button type="submit" className="btn-adicionar">
              ADICIONAR
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MetodoPagamento;

