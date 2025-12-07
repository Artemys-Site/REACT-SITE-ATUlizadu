import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CadastroPet.css';
import artySegurandogato from '../assets/artySegurandogato.webp';
import iconeCoracao from '../assets/iconeCoracao.png';

const CadastroPet = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    diaNascimento: '',
    mesNascimento: '',
    anoNascimento: '',
    raca: '',
    especie: '',
    microchip: '',
    sexo: 'macho',
    castracao: 'sim',
    porte: 'pequeno',
    peso: '',
    cor: '',
    condicoesPreexistentes: [],
    medicacoesAtuais: [],
    vacinacoes: [],
    medicacoesControladas: []
  });

  const [novaCondicao, setNovaCondicao] = useState('');
  const [novaMedicacao, setNovaMedicacao] = useState('');
  const [novaVacinacao, setNovaVacinacao] = useState({ tipo: '', dose: '' });
  const [novaMedicacaoControlada, setNovaMedicacaoControlada] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const adicionarCondicao = () => {
    if (novaCondicao.trim()) {
      setFormData(prev => ({
        ...prev,
        condicoesPreexistentes: [...prev.condicoesPreexistentes, novaCondicao]
      }));
      setNovaCondicao('');
    }
  };

  const adicionarMedicacao = () => {
    if (novaMedicacao.trim()) {
      setFormData(prev => ({
        ...prev,
        medicacoesAtuais: [...prev.medicacoesAtuais, novaMedicacao]
      }));
      setNovaMedicacao('');
    }
  };

  const adicionarVacinacao = () => {
    if (novaVacinacao.tipo.trim() && novaVacinacao.dose.trim()) {
      setFormData(prev => ({
        ...prev,
        vacinacoes: [...prev.vacinacoes, novaVacinacao]
      }));
      setNovaVacinacao({ tipo: '', dose: '' });
    }
  };

  const adicionarMedicacaoControlada = () => {
    if (novaMedicacaoControlada.trim()) {
      setFormData(prev => ({
        ...prev,
        medicacoesControladas: [...prev.medicacoesControladas, novaMedicacaoControlada]
      }));
      setNovaMedicacaoControlada('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || user.accountType !== 'tutor') {
      alert('Você precisa estar logado como tutor para cadastrar um pet.');
      navigate('/login');
      return;
    }
    
    try {
      // Formatar data de nascimento
      const dia = formData.diaNascimento.padStart(2, '0');
      const mes = formData.mesNascimento.padStart(2, '0');
      const ano = formData.anoNascimento;
      const dataNascimento = `${ano}-${mes}-${dia}`;
      
      // TODO: Integração com backend será implementada
      alert('Pet cadastrado com sucesso!');
      navigate('/perfil');
  };

  return (
    <section className="cadastro-pet-page">
      <div className="cadastro-pet-container">
        <h1 className="cadastro-pet-titulo">CADASTRO DE PET</h1>

        <div className="cadastro-pet-content">
          <div className="cadastro-pet-ilustracao">
            <img src={artySegurandogato} alt="Ilustração de pet" />
          </div>

          <form className="cadastro-pet-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nome-pet">Nome</label>
                  <input
                    type="text"
                    id="nome-pet"
                    name="nome"
                    placeholder="Nome do pet"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Data de Nascimento</label>
                  <div className="data-nascimento-group">
                    <input
                      type="text"
                      id="dia-nascimento"
                      placeholder="Dia"
                      maxLength="2"
                      value={formData.diaNascimento}
                      onChange={(e) => setFormData(prev => ({ ...prev, diaNascimento: e.target.value }))}
                    />
                    <input
                      type="text"
                      id="mes-nascimento"
                      placeholder="Mês"
                      maxLength="2"
                      value={formData.mesNascimento}
                      onChange={(e) => setFormData(prev => ({ ...prev, mesNascimento: e.target.value }))}
                    />
                    <input
                      type="text"
                      id="ano-nascimento"
                      placeholder="Ano"
                      maxLength="4"
                      value={formData.anoNascimento}
                      onChange={(e) => setFormData(prev => ({ ...prev, anoNascimento: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="raca-pet">Raça</label>
                  <input
                    type="text"
                    id="raca-pet"
                    name="raca"
                    placeholder="Raça do pet"
                    value={formData.raca}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="especie-pet">Espécie</label>
                  <input
                    type="text"
                    id="especie-pet"
                    name="especie"
                    placeholder="Espécie"
                    value={formData.especie}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="microchip-pet">Microchip (Opcional)</label>
                  <input
                    type="text"
                    id="microchip-pet"
                    name="microchip"
                    placeholder="Número do microchip"
                    value={formData.microchip}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Sexo</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="sexo-macho"
                        name="sexo"
                        value="macho"
                        checked={formData.sexo === 'macho'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="sexo-macho">Macho</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="sexo-femea"
                        name="sexo"
                        value="femea"
                        checked={formData.sexo === 'femea'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="sexo-femea">Fêmea</label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Castração</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="castracao-sim"
                        name="castracao"
                        value="sim"
                        checked={formData.castracao === 'sim'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="castracao-sim">Possui</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="castracao-nao"
                        name="castracao"
                        value="nao"
                        checked={formData.castracao === 'nao'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="castracao-nao">Não possui</label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Porte</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="porte-pequeno"
                        name="porte"
                        value="pequeno"
                        checked={formData.porte === 'pequeno'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="porte-pequeno">Pequeno</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="porte-medio"
                        name="porte"
                        value="medio"
                        checked={formData.porte === 'medio'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="porte-medio">Médio</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="porte-grande"
                        name="porte"
                        value="grande"
                        checked={formData.porte === 'grande'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="porte-grande">Grande</label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="peso-pet">Peso em KG</label>
                  <input
                    type="number"
                    id="peso-pet"
                    name="peso"
                    placeholder="Peso"
                    step="0.1"
                    value={formData.peso}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cor-pet">Cor</label>
                  <input
                    type="text"
                    id="cor-pet"
                    name="cor"
                    placeholder="Cor do pet"
                    value={formData.cor}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-titulo">
                <img src={iconeCoracao} alt="Saúde" />
                <span>SAÚDE</span>
              </h2>

              <div className="form-group">
                <label htmlFor="condicoes-preexistentes">Condições pré-existentes (Opcional)</label>
                <div className="input-with-button">
                  <div className="form-group">
                    <input
                      type="text"
                      id="condicoes-preexistentes"
                      placeholder="Condições pré-existentes"
                      value={novaCondicao}
                      onChange={(e) => setNovaCondicao(e.target.value)}
                    />
                  </div>
                  <button type="button" className="btn-adicionar-item" onClick={adicionarCondicao}>
                    +
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="medicacoes-atuais">Medicações Atuais (Opcional)</label>
                <div className="input-with-button">
                  <div className="form-group">
                    <input
                      type="text"
                      id="medicacoes-atuais"
                      placeholder="Medicações atuais"
                      value={novaMedicacao}
                      onChange={(e) => setNovaMedicacao(e.target.value)}
                    />
                  </div>
                  <button type="button" className="btn-adicionar-item" onClick={adicionarMedicacao}>
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-titulo">
                <span>VACINAÇÃO</span>
              </h2>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="tipo-vacinacao">Tipo</label>
                  <input
                    type="text"
                    id="tipo-vacinacao"
                    placeholder="Tipo de vacina"
                    value={novaVacinacao.tipo}
                    onChange={(e) => setNovaVacinacao(prev => ({ ...prev, tipo: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dose-vacinacao">Dose</label>
                  <div className="input-with-button">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <input
                        type="text"
                        id="dose-vacinacao"
                        placeholder="Dose"
                        value={novaVacinacao.dose}
                        onChange={(e) => setNovaVacinacao(prev => ({ ...prev, dose: e.target.value }))}
                      />
                    </div>
                    <button type="button" className="btn-adicionar-item" onClick={adicionarVacinacao}>
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="medicacoes-controladas">Medicações Controladas (Opcional)</label>
                <div className="input-with-button">
                  <div className="form-group">
                    <input
                      type="text"
                      id="medicacoes-controladas"
                      placeholder="Medicações controladas"
                      value={novaMedicacaoControlada}
                      onChange={(e) => setNovaMedicacaoControlada(e.target.value)}
                    />
                  </div>
                  <button type="button" className="btn-adicionar-item" onClick={adicionarMedicacaoControlada}>
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="consentimento" name="consentimento" defaultChecked />
              <label htmlFor="consentimento">Eu autorizo o uso de dados para personalização de atendimento</label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-finalizar">FINALIZAR</button>
              <Link to="/perfil" className="btn-voltar-cadastro">VOLTAR</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CadastroPet;

