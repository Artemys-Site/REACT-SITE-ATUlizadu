import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegistroOcorrencia.css';
import MiaFoto from '../assets/Mia.png';

const RegistroOcorrencia = () => {
  const navigate = useNavigate();
  const [ocorrenciaId] = useState('OCR-' + Date.now());
  const [dataHora] = useState(() => {
    const now = new Date();
    return now.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  });
  
  const dataHoraFormatted = dataHora.replace(',', '').replace(/(\d{2}):(\d{2}):(\d{2})/, '$1H$2');

  useEffect(() => {
    sessionStorage.setItem('contexto_clinica', 'true');
  }, []);

  // Estados do formulário
  const [dadosOcorrencia, setDadosOcorrencia] = useState({
    localResgate: '',
    tipoEmergencia: '',
    condicaoAnimal: ''
  });

  const [sinaisVitais, setSinaisVitais] = useState({
    temperatura: '38.5',
    frequenciaCardiaca: '120',
    frequenciaRespiratoria: '30',
    tpc: '< 2',
    mucosa: '',
    pressaoArterial: '120/80',
    nivelConsciencia: ''
  });

  const [lesoesVisiveis, setLesoesVisiveis] = useState('');
  const [procedimentos, setProcedimentos] = useState([]);
  const [medicacoes, setMedicacoes] = useState([]);
  const [evolucao, setEvolucao] = useState({
    evolucaoTransporte: '',
    destinoPaciente: '',
    observacoesAdicionais: ''
  });
  const [responsavelAtendimento, setResponsavelAtendimento] = useState('');
  const [showHistoricoMedico, setShowHistoricoMedico] = useState(false);
  const [showModalProcedimento, setShowModalProcedimento] = useState(false);
  const [showModalMedicacao, setShowModalMedicacao] = useState(false);
  const [showModalSalvar, setShowModalSalvar] = useState(false);
  const [showModalFinalizar, setShowModalFinalizar] = useState(false);

  // Estado para novo procedimento
  const [novoProcedimento, setNovoProcedimento] = useState({
    procedimentoRapido: '',
    procedimento: '',
    horario: '',
    responsavel: ''
  });

  // Estado para nova medicação
  const [novaMedicacao, setNovaMedicacao] = useState({
    medicamento: '',
    dose: '10MG/KG',
    via: '',
    horario: ''
  });

  const medicacoesComuns = [
    'DIPIRONA',
    'TRAMADOL',
    'DEXAMETASONA',
    'DIAZEPAM',
    'ADRENALINA',
    'ATROPINA',
    'RINGER LACTATO'
  ];

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === 'ocorrencia') {
      setDadosOcorrencia(prev => ({ ...prev, [name]: value }));
    } else if (section === 'sinaisVitais') {
      setSinaisVitais(prev => ({ ...prev, [name]: value }));
    } else if (section === 'evolucao') {
      setEvolucao(prev => ({ ...prev, [name]: value }));
    } else if (section === 'procedimento') {
      setNovoProcedimento(prev => ({ ...prev, [name]: value }));
    } else if (section === 'medicacao') {
      setNovaMedicacao(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAdicionarProcedimento = (e) => {
    e.preventDefault();
    if (novoProcedimento.procedimento || novoProcedimento.procedimentoRapido) {
      setProcedimentos([...procedimentos, { ...novoProcedimento, id: Date.now() }]);
      setNovoProcedimento({
        procedimentoRapido: '',
        procedimento: '',
        horario: '',
        responsavel: ''
      });
      setShowModalProcedimento(false);
    }
  };

  const handleAdicionarMedicacao = (e) => {
    e.preventDefault();
    if (novaMedicacao.medicamento) {
      setMedicacoes([...medicacoes, { ...novaMedicacao, id: Date.now() }]);
      setNovaMedicacao({
        medicamento: '',
        dose: '10MG/KG',
        via: '',
        horario: ''
      });
      setShowModalMedicacao(false);
    }
  };

  const handleMedicacaoComum = (medicacao) => {
    setNovaMedicacao(prev => ({ ...prev, medicamento: medicacao }));
  };

  const handleSalvar = () => {
    // TODO: Implementar salvamento
    console.log('Salvando ocorrência...');
    setShowModalSalvar(false);
    alert('Ocorrência salva com sucesso!');
  };

  const handleFinalizar = () => {
    // TODO: Implementar finalização
    console.log('Finalizando ocorrência...');
    setShowModalFinalizar(false);
    alert('Ocorrência finalizada com sucesso!');
    navigate('/gestao-ambulancia');
  };

  // Dados mockados do paciente
  const paciente = {
    nome: 'MIA',
    especie: 'FELINO',
    raca: 'PERSA',
    sexo: 'FÊMEA',
    id: 'PET-2024-001',
    idade: '3 ANOS',
    peso: '4.2 KG',
    historicoMedico: 'CASTRADA. VACINAÇÃO EM DIA. SEM ALERGIAS CONHECIDAS.',
    foto: MiaFoto
  };

  const tutor = {
    nome: 'ANA SILVA',
    telefone: '(11) 98765-4321',
    endereco: 'RUA DAS FLORES, 123 - JARDIM PRIMAVERA'
  };

  return (
    <section className="registro-ocorrencia-page">
      <div className="registro-ocorrencia-container">
        {/* Header */}
        <div className="registro-header">
          <Link to="/gestao-ambulancia" className="btn-voltar-registro">
            <i className="bi bi-arrow-left"></i>
            VOLTAR
          </Link>
          <div>
            <h1 className="registro-titulo">REGISTRO DE OCORRÊNCIA - AMBULÂNCIA</h1>
            <p className="registro-subtitulo">
              PREENCHA OS DADOS DA OCORRÊNCIA DE RESGATE
            </p>
          </div>
        </div>

        {/* Banner de Status */}
        <div className="ocorrencia-status-banner">
          <i className="bi bi-exclamation-triangle"></i>
          <div>
            <span className="status-text">OCORRÊNCIA EM ANDAMENTO - {ocorrenciaId}</span>
            <span className="status-time">{dataHora}</span>
          </div>
        </div>

        <div className="form-registro-ocorrencia">
          {/* Dados do Paciente */}
          <div className="registro-section paciente-section">
            <div className="section-header purple-header">
              <i className="bi bi-heart-pulse"></i>
              <h3 className="section-titulo">DADOS DO PACIENTE</h3>
            </div>
            <div className="paciente-content">
              <div className="paciente-left">
                <img src={paciente.foto} alt={paciente.nome} className="paciente-foto" />
                <div className="paciente-info">
                  <h4 className="paciente-nome">{paciente.nome}</h4>
                  <p className="paciente-especie">{paciente.especie} • {paciente.raca} • {paciente.sexo}</p>
                  <div className="paciente-details">
                    <span><strong>ID:</strong> {paciente.id}</span>
                    <span><strong>IDADE:</strong> {paciente.idade}</span>
                    <span><strong>PESO:</strong> {paciente.peso}</span>
                  </div>
                  <button 
                    type="button" 
                    className="btn-historico-medico"
                    onClick={() => setShowHistoricoMedico(true)}
                  >
                    HISTÓRICO MÉDICO
                  </button>
                  <p className="paciente-historico-texto">{paciente.historicoMedico}</p>
                </div>
              </div>
              <div className="paciente-right">
                <span className="badge-cadastrado">CADASTRADO</span>
              </div>
            </div>
          </div>

          {/* Dados do Tutor */}
          <div className="registro-section tutor-section">
            <div className="tutor-content">
              <div className="tutor-info-item">
                <strong>TUTOR:</strong> {tutor.nome}
              </div>
              <div className="tutor-info-item">
                <strong>TELEFONE:</strong> {tutor.telefone}
              </div>
              <div className="tutor-info-item">
                <strong>ENDEREÇO:</strong> {tutor.endereco}
              </div>
            </div>
          </div>

          {/* Dados da Ocorrência */}
          <div className="registro-section ocorrencia-section">
            <div className="section-header orange-header">
              <i className="bi bi-file-earmark-text"></i>
              <h3 className="section-titulo">DADOS DA OCORRÊNCIA</h3>
            </div>
            <div className="ocorrencia-content">
              <div className="form-row-registro">
                <div className="form-group-registro">
                  <label>DATA E HORA</label>
                  <input
                    type="text"
                    value={dataHoraFormatted}
                    readOnly
                    className="input-registro"
                  />
                </div>
              </div>
              <div className="form-group-registro">
                <label htmlFor="local-resgate">LOCAL DO RESGATE</label>
                <input
                  type="text"
                  id="local-resgate"
                  name="localResgate"
                  value={dadosOcorrencia.localResgate}
                  onChange={(e) => handleInputChange(e, 'ocorrencia')}
                  placeholder="ENDEREÇO COMPLETO DO LOCAL"
                  className="input-registro"
                />
              </div>
              <div className="form-group-registro">
                <label htmlFor="tipo-emergencia">TIPO DE EMERGÊNCIA</label>
                <input
                  type="text"
                  id="tipo-emergencia"
                  name="tipoEmergencia"
                  value={dadosOcorrencia.tipoEmergencia}
                  onChange={(e) => handleInputChange(e, 'ocorrencia')}
                  placeholder="EX: ATROPELAMENTO, DIFICULDADE RESPIRATÓRIA"
                  className="input-registro"
                />
              </div>
              <div className="form-group-registro">
                <label htmlFor="condicao-animal">CONDIÇÃO EM QUE O ANIMAL FOI ENCONTRADO</label>
                <textarea
                  id="condicao-animal"
                  name="condicaoAnimal"
                  value={dadosOcorrencia.condicaoAnimal}
                  onChange={(e) => handleInputChange(e, 'ocorrencia')}
                  placeholder="DESCREVA O ESTADO DO ANIMAL AO CHEGAR NO LOCAL..."
                  className="textarea-registro"
                  rows="4"
                />
              </div>
            </div>
          </div>

          {/* Sinais Vitais */}
          <div className="registro-section sinais-vitais-section">
            <div className="section-header purple-header">
              <i className="bi bi-heart-pulse"></i>
              <h3 className="section-titulo">SINAIS VITAIS</h3>
            </div>
            <div className="sinais-vitais-grid">
              <div className="form-group-registro">
                <label htmlFor="temperatura">TEMP. (°C)</label>
                <input
                  type="text"
                  id="temperatura"
                  name="temperatura"
                  value={sinaisVitais.temperatura}
                  onChange={(e) => handleInputChange(e, 'sinaisVitais')}
                  className="input-registro"
                />
              </div>
              <div className="form-group-registro">
                <label htmlFor="fc">FC (BPM)</label>
                <input
                  type="text"
                  id="fc"
                  name="frequenciaCardiaca"
                  value={sinaisVitais.frequenciaCardiaca}
                  onChange={(e) => handleInputChange(e, 'sinaisVitais')}
                  className="input-registro"
                />
              </div>
              <div className="form-group-registro">
                <label htmlFor="fr">FR (MRPM)</label>
                <input
                  type="text"
                  id="fr"
                  name="frequenciaRespiratoria"
                  value={sinaisVitais.frequenciaRespiratoria}
                  onChange={(e) => handleInputChange(e, 'sinaisVitais')}
                  className="input-registro"
                />
              </div>
              <div className="form-group-registro">
                <label htmlFor="tpc">TPC (SEG)</label>
                <input
                  type="text"
                  id="tpc"
                  name="tpc"
                  value={sinaisVitais.tpc}
                  onChange={(e) => handleInputChange(e, 'sinaisVitais')}
                  className="input-registro"
                />
              </div>
              <div className="form-group-registro">
                <label htmlFor="mucosa">MUCOSA</label>
                <select
                  id="mucosa"
                  name="mucosa"
                  value={sinaisVitais.mucosa}
                  onChange={(e) => handleInputChange(e, 'sinaisVitais')}
                  className="select-registro"
                >
                  <option value="">SELECIONE</option>
                  <option value="ROSA">ROSA</option>
                  <option value="PALIDA">PÁLIDA</option>
                  <option value="CIANOTICA">CIANÓTICA</option>
                  <option value="ICTÉRICA">ICTÉRICA</option>
                </select>
              </div>
              <div className="form-group-registro">
                <label htmlFor="pa">PA (MMHG)</label>
                <input
                  type="text"
                  id="pa"
                  name="pressaoArterial"
                  value={sinaisVitais.pressaoArterial}
                  onChange={(e) => handleInputChange(e, 'sinaisVitais')}
                  placeholder="120/80"
                  className="input-registro"
                />
              </div>
              <div className="form-group-registro">
                <label htmlFor="nivel-consciencia">NÍVEL DE CONSCIÊNCIA</label>
                <select
                  id="nivel-consciencia"
                  name="nivelConsciencia"
                  value={sinaisVitais.nivelConsciencia}
                  onChange={(e) => handleInputChange(e, 'sinaisVitais')}
                  className="select-registro"
                >
                  <option value="">SELECIONE</option>
                  <option value="ALERTA">ALERTA</option>
                  <option value="LETÁRGICO">LETÁRGICO</option>
                  <option value="ESTUPOROSO">ESTUPOROSO</option>
                  <option value="COMATOSO">COMATOSO</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lesões Visíveis */}
          <div className="registro-section lesoes-section">
            <div className="form-group-registro">
              <label htmlFor="lesoes">LESÕES VISÍVEIS</label>
              <textarea
                id="lesoes"
                value={lesoesVisiveis}
                onChange={(e) => setLesoesVisiveis(e.target.value)}
                placeholder="DESCREVA FERIMENTOS, FRATURAS, HEMORRAGIAS..."
                className="textarea-registro"
                rows="4"
              />
            </div>
          </div>

          {/* Procedimentos Realizados */}
          <div className="registro-section procedimentos-section">
            <div className="section-header green-header">
              <i className="bi bi-heart-pulse"></i>
              <h3 className="section-titulo">PROCEDIMENTOS REALIZADOS</h3>
            </div>
            <div className="procedimentos-content">
              <button 
                type="button"
                className="btn-adicionar-procedimento"
                onClick={() => setShowModalProcedimento(true)}
              >
                <i className="bi bi-plus-circle"></i>
                + ADICIONAR PROCEDIMENTO
              </button>
              {procedimentos.length === 0 ? (
                <p className="lista-vazia">NENHUM PROCEDIMENTO REGISTRADO</p>
              ) : (
                <div className="lista-procedimentos">
                  {procedimentos.map(proc => (
                    <div key={proc.id} className="item-lista">
                      <strong>{proc.procedimento || proc.procedimentoRapido}</strong>
                      <span>{proc.horario} - {proc.responsavel}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Medicações Administradas */}
          <div className="registro-section medicacoes-section">
            <div className="section-header purple-header">
              <i className="bi bi-capsule"></i>
              <h3 className="section-titulo">MEDICAÇÕES ADMINISTRADAS</h3>
            </div>
            <div className="medicacoes-content">
              <div className="medicacoes-comuns">
                <label>MEDICAÇÕES COMUNS</label>
                <div className="medicacoes-tags">
                  {medicacoesComuns.map(med => (
                    <button
                      key={med}
                      type="button"
                      className="medicacao-tag"
                      onClick={() => handleMedicacaoComum(med)}
                    >
                      {med}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                type="button"
                className="btn-adicionar-medicacao"
                onClick={() => setShowModalMedicacao(true)}
              >
                <i className="bi bi-plus-circle"></i>
                + ADICIONAR MEDICAÇÃO
              </button>
              {medicacoes.length === 0 ? (
                <p className="lista-vazia">NENHUMA MEDICAÇÃO REGISTRADA</p>
              ) : (
                <div className="lista-medicacoes">
                  {medicacoes.map(med => (
                    <div key={med.id} className="item-lista">
                      <strong>{med.medicamento}</strong>
                      <span>{med.dose} - {med.via} - {med.horario}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Evolução e Observações */}
          <div className="registro-section evolucao-section">
            <div className="section-header green-header">
              <i className="bi bi-clipboard-data"></i>
              <h3 className="section-titulo">EVOLUÇÃO E OBSERVAÇÕES</h3>
            </div>
            <div className="evolucao-content">
              <div className="form-group-registro">
                <label htmlFor="evolucao-transporte">EVOLUÇÃO DURANTE O TRANSPORTE</label>
                <textarea
                  id="evolucao-transporte"
                  name="evolucaoTransporte"
                  value={evolucao.evolucaoTransporte}
                  onChange={(e) => handleInputChange(e, 'evolucao')}
                  placeholder="DESCREVA COMO O ANIMAL RESPONDEU AOS PROCEDIMENTOS, MUDANÇAS NO QUADRO CLÍNICO..."
                  className="textarea-registro"
                  rows="4"
                />
              </div>
              <div className="form-group-registro">
                <label htmlFor="destino">DESTINO DO PACIENTE</label>
                <input
                  type="text"
                  id="destino"
                  name="destinoPaciente"
                  value={evolucao.destinoPaciente}
                  onChange={(e) => handleInputChange(e, 'evolucao')}
                  placeholder="EX: CLÍNICA VETERINÁRIA X"
                  className="input-registro"
                />
              </div>
              <div className="form-group-registro">
                <label htmlFor="observacoes">OBSERVAÇÕES ADICIONAIS</label>
                <textarea
                  id="observacoes"
                  name="observacoesAdicionais"
                  value={evolucao.observacoesAdicionais}
                  onChange={(e) => handleInputChange(e, 'evolucao')}
                  placeholder="INFORMAÇÕES RELEVANTES SOBRE O ATENDIMENTO, INTERCORRÊNCIAS, ORIENTAÇÕES AO PROPRIETÁRIO..."
                  className="textarea-registro"
                  rows="4"
                />
              </div>
            </div>
          </div>

          {/* Banner Importante */}
          <div className="banner-importante">
            <i className="bi bi-check-circle-fill"></i>
            <div>
              <strong>IMPORTANTE!</strong>
              <p>REVISE TODAS AS INFORMAÇÕES ANTES DE FINALIZAR. CERTIFIQUE-SE DE QUE TODOS OS PROCEDIMENTOS E MEDICAÇÕES ESTÃO REGISTRADOS.</p>
            </div>
          </div>

          {/* Responsável pelo Atendimento */}
          <div className="registro-section responsavel-section">
            <div className="form-group-registro">
              <label htmlFor="responsavel">RESPONSÁVEL PELO ATENDIMENTO</label>
              <input
                type="text"
                id="responsavel"
                value={responsavelAtendimento}
                onChange={(e) => setResponsavelAtendimento(e.target.value)}
                placeholder="NOME DO PROFISSIONAL RESPONSÁVEL"
                className="input-registro"
              />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="registro-actions">
            <button 
              type="button" 
              className="btn-salvar-ocorrencia"
              onClick={() => setShowModalSalvar(true)}
            >
              <i className="bi bi-floppy"></i>
              SALVAR
            </button>
            <button 
              type="button" 
              onClick={() => setShowModalFinalizar(true)} 
              className="btn-finalizar-ocorrencia"
            >
              <i className="bi bi-file-earmark-check"></i>
              FINALIZAR OCORRÊNCIA
            </button>
          </div>
        </div>
      </div>

      {/* Modal Histórico Médico */}
      {showHistoricoMedico && (
        <div className="modal-overlay-registro" onClick={() => setShowHistoricoMedico(false)}>
          <div className="modal-registro" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-registro">
              <h2 className="modal-titulo-registro">HISTÓRICO MÉDICO - {paciente.nome}</h2>
              <button className="modal-close-registro" onClick={() => setShowHistoricoMedico(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-body-registro">
              <div className="historico-medico-content">
                <div className="historico-paciente-info">
                  <img src={paciente.foto} alt={paciente.nome} className="historico-paciente-foto" />
                  <div>
                    <h3>{paciente.nome}</h3>
                    <p>{paciente.especie} • {paciente.raca} • {paciente.sexo}</p>
                    <p>ID: {paciente.id}</p>
                  </div>
                </div>
                <div className="historico-section">
                  <h4>INFORMAÇÕES GERAIS</h4>
                  <p><strong>IDADE:</strong> {paciente.idade}</p>
                  <p><strong>PESO:</strong> {paciente.peso}</p>
                  <p><strong>STATUS:</strong> CASTRADA. VACINAÇÃO EM DIA. SEM ALERGIAS CONHECIDAS.</p>
                </div>
                <div className="historico-section">
                  <h4>PRONTUÁRIO MÉDICO</h4>
                  <p>Nenhum registro médico adicional encontrado.</p>
                </div>
              </div>
            </div>
            <div className="modal-footer-registro">
              <button className="btn-fechar-modal" onClick={() => setShowHistoricoMedico(false)}>
                FECHAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Adicionar Procedimento */}
      {showModalProcedimento && (
        <div className="modal-overlay-registro" onClick={() => setShowModalProcedimento(false)}>
          <div className="modal-registro" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-registro">
              <h2 className="modal-titulo-registro">ADICIONAR PROCEDIMENTO</h2>
              <button className="modal-close-registro" onClick={() => setShowModalProcedimento(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <form className="modal-body-registro" onSubmit={handleAdicionarProcedimento}>
              <div className="form-row-registro">
                <div className="form-group-registro">
                  <label htmlFor="modal-procedimento-rapido">PROCEDIMENTOS RÁPIDOS</label>
                  <input
                    type="text"
                    id="modal-procedimento-rapido"
                    name="procedimentoRapido"
                    value={novoProcedimento.procedimentoRapido}
                    onChange={(e) => handleInputChange(e, 'procedimento')}
                    placeholder="ESCREVA O PROCEDIMENTO"
                    className="input-registro"
                  />
                </div>
              </div>
              <div className="form-row-registro">
                <div className="form-group-registro">
                  <label htmlFor="modal-procedimento">PROCEDIMENTO</label>
                  <input
                    type="text"
                    id="modal-procedimento"
                    name="procedimento"
                    value={novoProcedimento.procedimento}
                    onChange={(e) => handleInputChange(e, 'procedimento')}
                    placeholder="DESCREVA O PROCEDIMENTO"
                    className="input-registro"
                  />
                </div>
                <div className="form-group-registro">
                  <label htmlFor="modal-horario-procedimento">HORÁRIO</label>
                  <input
                    type="text"
                    id="modal-horario-procedimento"
                    name="horario"
                    value={novoProcedimento.horario}
                    onChange={(e) => handleInputChange(e, 'procedimento')}
                    className="input-registro"
                  />
                </div>
                <div className="form-group-registro">
                  <label htmlFor="modal-responsavel-procedimento">RESPONSÁVEL</label>
                  <input
                    type="text"
                    id="modal-responsavel-procedimento"
                    name="responsavel"
                    value={novoProcedimento.responsavel}
                    onChange={(e) => handleInputChange(e, 'procedimento')}
                    placeholder="INICIAIS"
                    className="input-registro"
                  />
                </div>
              </div>
              <div className="modal-footer-registro">
                <button type="button" className="btn-cancelar-modal" onClick={() => setShowModalProcedimento(false)}>
                  CANCELAR
                </button>
                <button type="submit" className="btn-confirmar-modal">
                  ADICIONAR PROCEDIMENTO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Adicionar Medicação */}
      {showModalMedicacao && (
        <div className="modal-overlay-registro" onClick={() => setShowModalMedicacao(false)}>
          <div className="modal-registro" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-registro">
              <h2 className="modal-titulo-registro">ADICIONAR MEDICAÇÃO</h2>
              <button className="modal-close-registro" onClick={() => setShowModalMedicacao(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <form className="modal-body-registro" onSubmit={handleAdicionarMedicacao}>
              <div className="medicacoes-comuns">
                <label>MEDICAÇÕES COMUNS</label>
                <div className="medicacoes-tags">
                  {medicacoesComuns.map(med => (
                    <button
                      key={med}
                      type="button"
                      className="medicacao-tag"
                      onClick={() => handleMedicacaoComum(med)}
                    >
                      {med}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-row-registro">
                <div className="form-group-registro">
                  <label htmlFor="modal-medicamento">MEDICAÇÃO</label>
                  <input
                    type="text"
                    id="modal-medicamento"
                    name="medicamento"
                    value={novaMedicacao.medicamento}
                    onChange={(e) => handleInputChange(e, 'medicacao')}
                    placeholder="NOME DO MEDICAMENTO"
                    className="input-registro"
                    required
                  />
                </div>
                <div className="form-group-registro">
                  <label htmlFor="modal-dose">DOSE</label>
                  <input
                    type="text"
                    id="modal-dose"
                    name="dose"
                    value={novaMedicacao.dose}
                    onChange={(e) => handleInputChange(e, 'medicacao')}
                    placeholder="10MG/KG"
                    className="input-registro"
                  />
                </div>
                  <div className="form-group-registro">
                    <label htmlFor="modal-via">VIA DE ADMINISTRAÇÃO</label>
                    <select
                      id="modal-via"
                      name="via"
                      value={novaMedicacao.via}
                      onChange={(e) => handleInputChange(e, 'medicacao')}
                      className="select-registro"
                    >
                      <option value="">SELECIONE A VIA</option>
                      <option value="IV">IV - INTRAVENOSA</option>
                      <option value="IM">IM - INTRAMUSCULAR</option>
                      <option value="SC">SC - SUBCUTÂNEA</option>
                      <option value="VO">VO - VIA ORAL</option>
                      <option value="TOP">TOP - TÓPICA</option>
                      <option value="IN">IN - INALAÇÃO</option>
                    </select>
                  </div>
                <div className="form-group-registro">
                  <label htmlFor="modal-horario-medicacao">HORÁRIO</label>
                  <input
                    type="text"
                    id="modal-horario-medicacao"
                    name="horario"
                    value={novaMedicacao.horario}
                    onChange={(e) => handleInputChange(e, 'medicacao')}
                    className="input-registro"
                  />
                </div>
              </div>
              <div className="modal-footer-registro">
                <button type="button" className="btn-cancelar-modal" onClick={() => setShowModalMedicacao(false)}>
                  CANCELAR
                </button>
                <button type="submit" className="btn-confirmar-modal">
                  ADICIONAR MEDICAÇÃO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Salvar Ocorrência */}
      {showModalSalvar && (
        <div className="modal-overlay-registro" onClick={() => setShowModalSalvar(false)}>
          <div className="modal-registro modal-confirmacao" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-registro">
              <h2 className="modal-titulo-registro">SALVAR OCORRÊNCIA</h2>
              <button className="modal-close-registro" onClick={() => setShowModalSalvar(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-body-registro">
              <div className="modal-confirmacao-content">
                <i className="bi bi-floppy modal-confirmacao-icon"></i>
                <p>Deseja salvar o registro desta ocorrência?</p>
                <p className="modal-confirmacao-detalhes">
                  A ocorrência será salva e você poderá continuar editando posteriormente.
                </p>
              </div>
            </div>
            <div className="modal-footer-registro">
              <button type="button" className="btn-cancelar-modal" onClick={() => setShowModalSalvar(false)}>
                CANCELAR
              </button>
              <button type="button" className="btn-confirmar-modal" onClick={handleSalvar}>
                <i className="bi bi-floppy"></i>
                SALVAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Finalizar Ocorrência */}
      {showModalFinalizar && (
        <div className="modal-overlay-registro" onClick={() => setShowModalFinalizar(false)}>
          <div className="modal-registro modal-confirmacao" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-registro">
              <h2 className="modal-titulo-registro">FINALIZAR OCORRÊNCIA</h2>
              <button className="modal-close-registro" onClick={() => setShowModalFinalizar(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-body-registro">
              <div className="modal-confirmacao-content">
                <i className="bi bi-exclamation-triangle modal-confirmacao-icon warning"></i>
                <p><strong>ATENÇÃO!</strong></p>
                <p>Deseja finalizar esta ocorrência?</p>
                <p className="modal-confirmacao-detalhes">
                  Após finalizar, não será possível editar os dados desta ocorrência. Certifique-se de que todas as informações estão corretas.
                </p>
              </div>
            </div>
            <div className="modal-footer-registro">
              <button type="button" className="btn-cancelar-modal" onClick={() => setShowModalFinalizar(false)}>
                CANCELAR
              </button>
              <button type="button" className="btn-finalizar-modal" onClick={handleFinalizar}>
                <i className="bi bi-file-earmark-check"></i>
                FINALIZAR OCORRÊNCIA
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RegistroOcorrencia;

