import { useState } from 'react';
import {  } from 'react-router-dom';
import './pacientesVeterinario.css'; 
import {  Search, Filter, Plus, ChevronRight, Dog, Cat, MapPin, Phone, Calendar, User, MoreVertical, Stethoscope, Eye } from 'lucide-react';

// --- DADOS ESTRUTURAIS (MOCK DATA) ---
const PATIENTS = [
  { id: 1, name: 'Bob', initial: 'B', species: 'CANINO', breed: 'GOLDEN RETRIEVER', age: 5, tutor: 'João Victor Lima', phone: '(11) 9870-4567', visits: 12, lastVisit: 'Ontem', vaccines: 'Em Dia', colorClass: 'initial-purple' },
  { id: 2, name: 'Luna', initial: 'L', species: 'FELINO', breed: 'PERSA', age: 3, tutor: 'Maria Silva', phone: '(11) 9870-5678', visits: 8, lastVisit: '2 Dias Atrás', vaccines: 'Em Dia', colorClass: 'initial-orange' },
  { id: 3, name: 'Max', initial: 'M', species: 'CANINO', breed: 'LABRADOR', age: 3, tutor: 'Pedro Costa', phone: '(11) 9543-1709', visits: 15, lastVisit: '3 Dias Atrás', vaccines: 'Pendente', colorClass: 'initial-purple' },
  { id: 4, name: 'Nina', initial: 'N', species: 'FELINO', breed: 'SIAMÊS', age: 2, tutor: 'Ana Paula', phone: '(11) 9543-4568', visits: 6, lastVisit: '1 Semana', vaccines: 'Em Dia', colorClass: 'initial-orange' },
  { id: 5, name: 'Rex', initial: 'R', species: 'CANINO', breed: 'PASTOR ALEMÃO', age: 4, tutor: 'Carlos Eduardo', phone: '(11) 9543-9870', visits: 10, lastVisit: '2 Semanas', vaccines: 'Em Dia', colorClass: 'initial-purple' },
  { id: 6, name: 'Mia', initial: 'M', species: 'FELINO', breed: 'MAINE COON', age: 6, tutor: 'Juliana Santos', phone: '(11) 9210-4870', visits: 14, lastVisit: '3 Dias Atrás', vaccines: 'Em Dia', colorClass: 'initial-orange' },
];

// --- COMPONENTE AUXILIAR: PatientCard ---

// Renderiza um único cartão de paciente
const PatientCard = ({ patient }) => {
  const isCanino = patient.species === 'CANINO';
  const speciesTagClass = isCanino ? 'species-canino' : 'species-felino';
  // Variável vaccinesOk definida para uso nas classes
  const vaccinesOk = patient.vaccines === 'EM DIA';

  return (
    <div className="patient-card">
      {/* Cabeçalho do Cartão */}
      <div className="card-header">
        <div className="patient-info-main">
          {/* Inicial do Nome */}
          <div className={`patient-initial ${patient.colorClass}`}>
            {patient.initial}
          </div>
          <div className="patient-details">
            <h2 className="patient-name">{patient.name}</h2>
            <div className="species-info">

              <span className={`species-tag ${speciesTagClass}`}>
                {isCanino ? <Dog/> : <Cat/>}
                {patient.species}
              </span>
              <span className="breed-text">{patient.breed.toUpperCase()}</span>
<span className="patient-age">{patient.age} ANOS</span>
            </div>
          </div>
        </div>
      </div>
      {/* Tag de Idade */}
      

      {/* Detalhes do Paciente (Tutor e Contato) */}
      <div className="patient-contact-details">
        <div className="contact-item">
            
            <User className="contact-icon contact-icon-tutor" />
            <span className="contact-text">Tutor: <span className="contact-value">{patient.tutor}</span></span>
        </div>
        <div className="contact-item">
            <Phone className="contact-icon contact-icon-phone" />
            {/* Removido o rótulo "Contacto:" para manter o visual limpo */}
            <span className="contact-text">
                <span className="contact-value">{patient.phone}</span>
            </span>
        </div>
        </div>
      
      {/* MÉTRICAS RÁPIDAS (Caixas Coloridas) */}
      <div className="metrics-grid">
        {/* 1. Consultas */}
        <div className="metric-item metric-item-consultas">
          {/* Ícone de Consultas (Stethoscope) e ordem de elementos */}
          <span className="metric-label">Consultas</span>
          <span className="metric-value">{patient.visits}</span>
        </div>

        {/* 2. Última Visita */}
        <div className="metric-item metric-item-visita">
          <span className="metric-label">Última Visita</span>
          <span className="metric-value ">{patient.lastVisit}</span>
        </div>

        {/* 3. Vacinas */}
        <div className={`metric-item metric-item-vacinas ${vaccinesOk ? 'metric-item-vacinas-ok' : 'metric-item-vacinas-pending'}`}>
          <span className="metric-label">Vacinas</span>
          <span className="metric-value">{patient.vaccines}</span>
        </div>
      </div>

      {/* Ações */}
      <div className="card-actions">
        {/* CORREÇÃO: Usando ícone Eye para "Ver Prontuário" */}
        <button className="action-button-secondary">
          <Eye className="button-icon" />
          <span>Ver Prontuário</span>
        </button>
        {/* CORREÇÃO: Adicionado ícone Calendar para "Agendar" */}
        <button className="action-button-primary">
          <Calendar className="button-icon" />
          <span>Agendar</span>
        </button>
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL: Painel de Pacientes (O "Corpo" da Aplicação) ---
const PacientesVeterinario = ({ navigateTo = (view) => console.log(`Navegação simulada para: ${view}`) }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('Todas as Espécies');
 

  // Lógica de filtragem simples
  const filteredPatients = PATIENTS.filter(p => {
    const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.tutor.toLowerCase().includes(searchTerm.toLowerCase());
    const speciesMatch = speciesFilter === 'Todas as Espécies' || p.species === speciesFilter;
    return searchMatch && speciesMatch;
  });

  // Simulação de paginação (apenas para exibição)
  const patientsToShow = filteredPatients.slice(0, 6); // Apenas os 6 primeiros para o layout

  return (
    <main className="pacientes-main-container">
        <div className="page-actions-bar">
          <h1 >MEUS PACIENTES</h1>
          <p >Gerencie todos os seus pacientes em um só lugar.</p>
        </div>
      
        {/* Barra de Pesquisa e Filtros */}
        <section className="search-filter-bar">
          <div className="search-filter-content">
          
            {/* Campo de Pesquisa */}
            <div className="search-input-group">
  <Search className="search-icon" size={20} /> {/* Ícone da Lupa */}
              <input
                type="text"
                placeholder="BUSCAR POR NOME DO PACIENTE OU DO TUTOR..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Filtro de Espécies (Dropdown Simples) */}
            <select
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
              className="species-filter-select"
            >
              <option value="Todas as Espécies">Todas as Espécies</option>
              <option value="CANINO">Canino</option>
              <option value="FELINO">Felino</option>
            </select>

            {/* Botão Mais Filtros */}
            <button className="more-filters-btn">
              <Filter className="button-icon" />
              <span>MAIS FILTROS</span>
            </button>
          </div>
        </section>

        {/* Grade de Cartões de Pacientes */}
        <section className="patient-grid">
          {patientsToShow.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
          {patientsToShow.length === 0 && (
            <p className="no-patients-found">Nenhum paciente encontrado com estes filtros.</p>
          )}
        </section>

        {/* Paginação */}
        <div className="pagination-controls">
          <button className="pagination-btn pagination-prev">
            <ChevronRight className="pagination-icon pagination-icon-prev" />
          </button>
          <div className="pagination-page-numbers">
            <span className="page-number page-number-active">1</span>
            <span className="page-number">2</span>
            <span className="page-number">3</span>
          </div>
          <button className="pagination-btn pagination-next">
            <ChevronRight className="pagination-icon" />
          </button>
        </div>
    </main>
  );
};

export default PacientesVeterinario;