import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './AgendarServico.css';
import drAnaPaula from '../assets/drAnaPaula.png';


const AgendarServico = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Pegar dados do profissional/clínica passados via state
  const profissional = location.state?.profissional || {
    id: 2,
    nome: 'DR. ANA PAULA SILVA',
    imagem: '/drAnaPaula.png',
    especialidade: 'CLÍNICO GERAL',
    horario: 'SEG-SEX: 9H-18H',
    avaliacao: 4.9,
    tipo: 'vet'
  };

  const [formData, setFormData] = useState({
    tipoAtendimento: 'PRESENCIAL',
    servico: 'CONSULTA',
    data: '',
    petId: '',
    observacoes: ''
  });

  // Pets mockados - depois vem do backend
  const [pets, setPets] = useState([
    { id: 1, nome: 'BOB', especie: 'CÃO' },
    { id: 2, nome: 'NINA', especie: 'GATO' },
    { id: 3, nome: 'MAX', especie: 'CÃO' }
  ]);

  useEffect(() => {
    // TODO: Carregar pets do usuário logado do backend
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.data || !formData.petId) {
      alert('PREENCHA TODOS OS CAMPOS OBRIGATÓRIOS');
      return;
    }
    
    try {
      // TODO: implementar chamada à API de criação de agendamento
      console.log('Dados do agendamento:', {
        ...formData,
        profissionalId: profissional.id,
        profissionalNome: profissional.nome
      });
      alert('AGENDAMENTO SERÁ CRIADO PELO BACKEND');
      navigate('/agendamento-tutor');
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      alert('ERRO AO CRIAR AGENDAMENTO. TENTE NOVAMENTE.');
    }
  };

  const petSelecionado = pets.find(p => p.id === parseInt(formData.petId));

  return (
    <section className="agendar-servico-page">
      <div className="agendar-servico-container">
        {/* Botão Voltar */}
        <Link to="/servicos" className="btn-voltar-servico">
          <i className="bi bi-arrow-left"></i>
          VOLTAR
        </Link>

        {/* Card do Profissional */}
        <div className="card-profissional-agendamento">
          <div className="profissional-imagem-wrapper">
            <img 
              src={profissional.imagem || drAnaPaula} 
              alt={profissional.nome}
              onError={(e) => {
                e.target.src = drAnaPaula;
              }}
            />
          </div>
          <div className="profissional-info-agendamento">
            <h2 className="titulo-agendar-consulta">AGENDAR CONSULTA</h2>
            <h3 className="nome-profissional-agendamento">{profissional.nome}</h3>
            <div className="horario-profissional">
              <i className="bi bi-calendar-event"></i>
              <span>{profissional.horario || 'SEG-SEX: 9H-18H'}</span>
            </div>
          </div>
        </div>


        {/* Banner Modalidades */}
        <div className="banner-modalidades">
          <div className="banner-modalidades-icon">
            <i className="bi bi-heart-pulse"></i>
          </div>
          <div className="banner-modalidades-texto">
            <p className="banner-modalidades-titulo">OFERECEMOS DUAS MODALIDADES DE ATENDIMENTO</p>
            <p className="banner-modalidades-descricao">
              ESCOLHA ENTRE ATENDIMENTO PRESENCIAL OU TELEATENDIMENTO ONLINE
            </p>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="form-agendar-servico">
          {/* Tipo de Atendimento */}
          <div className="form-section-servico">
            <label className="label-form-servico">
              TIPO DE ATENDIMENTO *
            </label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="tipoAtendimento"
                  value="PRESENCIAL"
                  checked={formData.tipoAtendimento === 'PRESENCIAL'}
                  onChange={(e) => handleRadioChange('tipoAtendimento', e.target.value)}
                />
                <span>ATENDIMENTO PRESENCIAL</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="tipoAtendimento"
                  value="TELEATENDIMENTO"
                  checked={formData.tipoAtendimento === 'TELEATENDIMENTO'}
                  onChange={(e) => handleRadioChange('tipoAtendimento', e.target.value)}
                />
                <span>TELEATENDIMENTO</span>
              </label>
            </div>
          </div>

          {/* Serviço */}
          <div className="form-section-servico">
            <label className="label-form-servico">
              SERVIÇO *
            </label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="servico"
                  value="CONSULTA"
                  checked={formData.servico === 'CONSULTA'}
                  onChange={(e) => handleRadioChange('servico', e.target.value)}
                />
                <span>CONSULTA</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="servico"
                  value="CHECK-UP"
                  checked={formData.servico === 'CHECK-UP'}
                  onChange={(e) => handleRadioChange('servico', e.target.value)}
                />
                <span>CHECK-UP</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="servico"
                  value="VACINAÇÃO"
                  checked={formData.servico === 'VACINAÇÃO'}
                  onChange={(e) => handleRadioChange('servico', e.target.value)}
                />
                <span>VACINAÇÃO</span>
              </label>
            </div>
          </div>

          {/* Data */}
          <div className="form-section-servico">
            <label htmlFor="data" className="label-form-servico">
              DATA DA CONSULTA *
            </label>
            <div className="input-wrapper-servico">
              <i className="bi bi-calendar3"></i>
              <input
                type="date"
                id="data"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
                placeholder="SELECIONE UMA DATA"
              />
            </div>
          </div>

          {/* Pet */}
          <div className="form-section-servico">
            <label className="label-form-servico label-pet">
              <i className="bi bi-heart-fill"></i>
              SEU PET
            </label>
            <p className="subtitle-pet">QUAL PET VOCÊ ESTÁ AGENDANDO?</p>
            <div className="select-wrapper-servico">
              <select
                id="petId"
                name="petId"
                value={formData.petId}
                onChange={handleInputChange}
                required
              >
                <option value="">SELECIONE UM DOS PETS CADASTRADOS</option>
                {pets.map(pet => (
                  <option key={pet.id} value={pet.id}>
                    {pet.nome} - {pet.especie}
                  </option>
                ))}
              </select>
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>

          {/* Observações */}
          <div className="form-section-servico">
            <label htmlFor="observacoes" className="label-form-servico">
              OBSERVAÇÕES (OPCIONAL)
            </label>
            <div className="textarea-wrapper-servico">
              <textarea
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                placeholder="DESCREVA OS SINTOMAS, COMPORTAMENTOS OU MOTIVO DA CONSULTA....."
                rows="4"
              ></textarea>
            </div>
          </div>

          {/* Botões */}
          <div className="form-actions-servico">
            <Link to="/servicos" className="btn-cancelar-servico">
              CANCELAR
            </Link>
            <button type="submit" className="btn-confirmar-servico">
              <i className="bi bi-check-circle"></i>
              CONFIRMAR AGENDAMENTO
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AgendarServico;

