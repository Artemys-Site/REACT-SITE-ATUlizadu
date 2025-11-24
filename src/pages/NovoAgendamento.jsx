import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NovoAgendamento.css';

const NovoAgendamento = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Dados do paciente para backend
    pacienteId: '', // ID do paciente selecionado
    paciente: '', // Nome do paciente (para exibição/envio)
    tutor: '',
    profissional: '',
    data: '',
    hora: '',
    tipo: 'CONSULTA',
    observacoes: ''
  });

  useEffect(() => {
    sessionStorage.setItem('contexto_clinica', 'true');
  }, []);

  // Dados mockados - depois vem do backend
  const pacientes = [
    { id: 1, nome: 'BOB', tutor: 'JOÃO VICTOR LIMA' },
    { id: 2, nome: 'NINA', tutor: 'PEDRO SANTOS COSTA' },
    { id: 3, nome: 'MAX', tutor: 'ANA SILVA' },
    { id: 4, nome: 'LUNA', tutor: 'MARCIA CAVALCANTE' }
  ];

  const profissionais = [
    { id: 1, nome: 'DR. LAURA CARVALHO', especialidade: 'CARDIOLOGIA' },
    { id: 2, nome: 'DR. CARLOS EDUARDO SANTOS', especialidade: 'GERAL' },
    { id: 3, nome: 'DRA. CAMILA SILVA MENDONÇA', especialidade: 'DERMATOLOGIA' },
    { id: 4, nome: 'DR. ROBERTO ALVES', especialidade: 'ORTOPEDIA' }
  ];

  const tiposAgendamento = ['CONSULTA', 'VACINA', 'CIRURGIA', 'RETORNO', 'EXAME', 'EMERGÊNCIA'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePacienteChange = (e) => {
    const pacienteId = e.target.value;
    const paciente = pacientes.find(p => p.id === parseInt(pacienteId));
    if (paciente) {
      setFormData(prev => ({
        ...prev,
        pacienteId: pacienteId,
        paciente: paciente.nome,
        tutor: paciente.tutor
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        pacienteId: '',
        paciente: '',
        tutor: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.pacienteId || !formData.profissional || !formData.data || !formData.hora) {
      alert('PREENCHA TODOS OS CAMPOS OBRIGATÓRIOS');
      return;
    }
    
    try {
      // TODO: implementar chamada à API de criação de agendamento
      console.log('Dados do agendamento:', formData);
      alert('AGENDAMENTO SERÁ CRIADO PELO BACKEND');
      navigate('/agendamento-clinica');
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      alert('ERRO AO CRIAR AGENDAMENTO. TENTE NOVAMENTE.');
    }
  };

  return (
    <section className="novo-agendamento-page">
      <div className="novo-agendamento-container">
        {/* Header */}
        <div className="novo-agendamento-header">
          <div>
            <Link to="/agendamento-clinica" className="btn-voltar-agendamento">
              <i className="bi bi-arrow-left"></i>
              VOLTAR
            </Link>
            <h1 className="novo-agendamento-titulo">NOVO AGENDAMENTO</h1>
            <p className="novo-agendamento-subtitulo">
              PREENCHA OS DADOS PARA CRIAR UM NOVO AGENDAMENTO
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="novo-agendamento-form">
          {/* Informações do Paciente */}
          <div className="form-section-agendamento">
            <h3 className="section-titulo-agendamento">
              <i className="bi bi-heart-pulse"></i>
              INFORMAÇÕES DO PACIENTE
            </h3>
            
            <div className="form-row-agendamento">
              <div className="form-group-agendamento">
                <label htmlFor="paciente">PACIENTE *</label>
                <select
                  id="paciente"
                  name="paciente"
                  value={formData.pacienteId}
                  onChange={handlePacienteChange}
                  required
                >
                  <option value="">SELECIONE O PACIENTE</option>
                  {pacientes.map(paciente => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-agendamento">
                <label htmlFor="tutor">TUTOR *</label>
                <input
                  type="text"
                  id="tutor"
                  name="tutor"
                  value={formData.tutor}
                  onChange={handleInputChange}
                  placeholder="NOME DO TUTOR"
                  required
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Informações do Agendamento */}
          <div className="form-section-agendamento">
            <h3 className="section-titulo-agendamento">
              <i className="bi bi-calendar-check"></i>
              INFORMAÇÕES DO AGENDAMENTO
            </h3>
            
            <div className="form-row-agendamento">
              <div className="form-group-agendamento">
                <label htmlFor="profissional">PROFISSIONAL *</label>
                <select
                  id="profissional"
                  name="profissional"
                  value={formData.profissional}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">SELECIONE O PROFISSIONAL</option>
                  {profissionais.map(prof => (
                    <option key={prof.id} value={prof.nome}>
                      {prof.nome} - {prof.especialidade}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-agendamento">
                <label htmlFor="tipo">TIPO DE ATENDIMENTO *</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  required
                >
                  {tiposAgendamento.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row-agendamento">
              <div className="form-group-agendamento">
                <label htmlFor="data">DATA *</label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  value={formData.data}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group-agendamento">
                <label htmlFor="hora">HORA *</label>
                <input
                  type="time"
                  id="hora"
                  name="hora"
                  value={formData.hora}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className="form-section-agendamento">
            <h3 className="section-titulo-agendamento">
              <i className="bi bi-file-text"></i>
              OBSERVAÇÕES
            </h3>
            
            <div className="form-group-agendamento">
              <label htmlFor="observacoes">OBSERVAÇÕES ADICIONAIS</label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                placeholder="DESCREVA QUALQUER INFORMAÇÃO RELEVANTE SOBRE O AGENDAMENTO..."
                rows="4"
              ></textarea>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="agendamento-form-actions">
            <Link to="/agendamento-clinica" className="btn-cancelar-agendamento">
              CANCELAR
            </Link>
            <button type="submit" className="btn-criar-agendamento">
              <i className="bi bi-check-circle"></i>
              CRIAR AGENDAMENTO
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NovoAgendamento;

