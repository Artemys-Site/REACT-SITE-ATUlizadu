import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Servicos.css';
import iconSearch from '../assets/iconSearch.png';
import iconLocation from '../assets/iconLocation.png';
import iconAvaliacao from '../assets/iconAvaliacao.png';
import iconMaleta from '../assets/iconMaleta.png';
import iconCloack from '../assets/iconCloack.png';
import iconTelefone from '../assets/iconTelefone.png';
import clinicaVidaanimal from '../assets/clinicaVidaanimal.png';
import drAnaPaula from '../assets/drAnaPaula.png';
import clinicaAnimalFeliz from '../assets/clinicaAnimalFeliz.png';
import drCarlos from '../assets/drCarlos.png';
import clinicaPetcar from '../assets/clinicaPetcar.png';
import draMarina from '../assets/draMarina.png';

const Servicos = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [filtroAba, setFiltroAba] = useState('todos');
  const [buscaTexto, setBuscaTexto] = useState('');
  const [buscaLocal, setBuscaLocal] = useState('');
  
  const handleContatar = (servico) => {
    if (!isLoggedIn) {
      alert('Você precisa estar logado para contatar um veterinário. Redirecionando para a página de login...');
      navigate('/login');
      return;
    }
    navigate('/agendar-servico', { state: { profissional: servico } });
  };
  
  const handleAssinarServico = () => {
    if (!isLoggedIn) {
      alert('Você precisa estar logado para assinar um serviço. Redirecionando para a página de login...');
      navigate('/login');
      return;
    }
    navigate('/planos');
  };

  const textosFiltro = {
    todos: {
      titulo: "Todos os Resultados",
      descricao: "Veja todos os profissionais e clínicas disponíveis."
    },
    vet: {
      titulo: "Veterinários Autônomos",
      descricao: "Profissionais qualificados prontos para cuidar do seu pet."
    },
    clinica: {
      titulo: "Clínicas",
      descricao: "Encontre clínicas e hospitais veterinários perto de você."
    }
  };

  const servicos = [
    {
      id: 1,
      tipo: "clinica",
      nome: "Clínica Veterinária Vida Animal",
      imagem: clinicaVidaanimal,
      avaliacao: 4.8,
      especialidade: "Clínico Geral",
      localizacao: "Av. Paulista, 1000 - São Paulo,SP",
      anos: "15 Anos",
      horario: "Seg-Sex: 7H - 18H",
      valor: "A partir de R$ 120",
      tags: ["Consultas", "Cirurgia", "Internação", "Emergencia 24H"]
    },
    {
      id: 2,
      tipo: "vet",
      nome: "Dr. Ana Paula Silva",
      imagem: drAnaPaula,
      avaliacao: 4.9,
      especialidade: "Clínico Geral",
      localizacao: "São Paulo - SP",
      anos: "8 Anos",
      horario: "Seg-Sex: 9H-18H",
      valor: "A partir de R$ 150",
      tags: ["Consultas", "Vacinação", "Check-up"]
    },
    {
      id: 3,
      tipo: "clinica",
      nome: "Centro Veterinário Animal Feliz",
      imagem: clinicaAnimalFeliz,
      avaliacao: 4.7,
      especialidade: "Clínico Geral",
      localizacao: "Av Itaberaba, 2100 - São Paulo,SP",
      anos: "10 Anos",
      horario: "Seg-Sex: 7H - 17H",
      valor: "A partir de R$ 100",
      tags: ["Consultas", "Cirurgia", "Internação", "Vacinação"]
    },
    {
      id: 4,
      tipo: "vet",
      nome: "Dr. Carlos Mendes",
      imagem: drCarlos,
      avaliacao: 4.8,
      especialidade: "Cirurgia e Ortopedia",
      localizacao: "São Paulo - SP",
      anos: "12 Anos",
      horario: "Ter-Sab: 10H-19H",
      valor: "A partir de R$ 200",
      tags: ["Cirurgia", "Ortopedia", "Emergências"]
    },
    {
      id: 5,
      tipo: "clinica",
      nome: "Hospital Veterinário Petcare",
      imagem: clinicaPetcar,
      avaliacao: 4.2,
      especialidade: "Emergências e Cirurgia Avançada",
      localizacao: "Rua Tito, 358 - São Paulo,SP",
      anos: "20 Anos",
      horario: "Seg-Sab: 9H - 19H",
      valor: "A partir de R$ 250",
      tags: ["UTI Veterinária", "Exames Laboratoriais", "Internação", "Raio-X"]
    },
    {
      id: 6,
      tipo: "vet",
      nome: "Dra. Marina Costa",
      imagem: draMarina,
      avaliacao: 4.1,
      especialidade: "Dermatologia Veterinária",
      localizacao: "São Paulo - SP",
      anos: "6 Anos",
      horario: "Seg-Qui: 8H-17H",
      valor: "A partir de R$ 180",
      tags: ["Dermatologia", "Alergia", "Estética"]
    }
  ];

  const filtrarServicos = () => {
    return servicos.filter(servico => {
      const matchAba = filtroAba === 'todos' || servico.tipo === filtroAba;
      const matchTexto = servico.nome.toLowerCase().includes(buscaTexto.toLowerCase()) ||
                        servico.especialidade.toLowerCase().includes(buscaTexto.toLowerCase()) ||
                        servico.tags.some(tag => tag.toLowerCase().includes(buscaTexto.toLowerCase()));
      const matchLocal = servico.localizacao.toLowerCase().includes(buscaLocal.toLowerCase());
      return matchAba && matchTexto && matchLocal;
    });
  };

  const servicosFiltrados = filtrarServicos();

  const handleBuscar = (e) => {
    e.preventDefault();
    // A filtragem já acontece automaticamente através do estado
  };

  return (
    <>
      <section className="busca-servicos-hero">
        <div className="busca-servicos-container">
          <h2 className="busca-servicos-titulo">Encontre o Melhor Cuidado para Seu Pet</h2>
          <p className="busca-servicos-subtitulo">
            CONECTANDO VOCÊ AOS MELHORES PROFISSIONAIS E CLÍNICAS VETERINÁRIAS
          </p>

          <form className="busca-input-group" onSubmit={handleBuscar}>
            <div className="input-wrapper">
              <img src={iconSearch} alt="Ícone de lupa" className="input-icon" />
              <input 
                type="text" 
                id="busca-texto" 
                placeholder="Buscar por especialidade, nome ou serviço..."
                value={buscaTexto}
                onChange={(e) => setBuscaTexto(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <img src={iconLocation} alt="Ícone de localização" className="input-icon" />
              <input 
                type="text" 
                id="busca-local" 
                placeholder="Localização (Ex: São Paulo)"
                value={buscaLocal}
                onChange={(e) => setBuscaLocal(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-buscar">Buscar</button>
          </form>

          <div className="estatisticas-servicos">
            <div className="estatistica-item">
              <span className="estatistica-numero">500+</span>
              <span className="estatistica-texto">Veterinários</span>
            </div>
            <div className="estatistica-item">
              <span className="estatistica-numero">200+</span>
              <span className="estatistica-texto">Clínicas</span>
            </div>
            <div className="estatistica-item">
              <span className="estatistica-numero">10K+</span>
              <span className="estatistica-texto">Pets Atendidos</span>
            </div>
            <div className="estatistica-item">
              <span className="estatistica-numero">4.8<img src={iconAvaliacao} alt="Estrela" className="estrela-icone" /></span>
              <span className="estatistica-texto">Avaliação Média</span>
            </div>
          </div>
        </div>
      </section>

      <section className="filtro-tabs">
        <div className="tabs-container">
          <button 
            className={`tab-button ${filtroAba === 'todos' ? 'active' : ''}`}
            onClick={() => setFiltroAba('todos')}
            data-filtro="todos"
          >
            Todos
          </button>
          <button 
            className={`tab-button ${filtroAba === 'vet' ? 'active' : ''}`}
            onClick={() => setFiltroAba('vet')}
            data-filtro="vet"
          >
            Veterinários Autônomos
          </button>
          <button 
            className={`tab-button ${filtroAba === 'clinica' ? 'active' : ''}`}
            onClick={() => setFiltroAba('clinica')}
            data-filtro="clinica"
          >
            Clínicas
          </button>
        </div>
      </section>

      <section className="lista-resultados">
        <div className="lista-container-wrapper">
          <div className="lista-header">
            <h3 className="filtro-subtitulo">{textosFiltro[filtroAba].titulo}</h3>
            <p className="filtro-descricao">{textosFiltro[filtroAba].descricao}</p>
          </div>

          <div className="grid-resultados">
            {servicosFiltrados.map((servico) => {
              return (
                <div key={servico.id} className="card-servico" data-tipo={servico.tipo}>
                  <div className="card-servico-imagem-wrapper">
                    <img src={servico.imagem} alt={servico.nome} />
                    {servico.tipo === 'clinica' && (
                      <p className="nome-entidade">{servico.nome}</p>
                    )}
                  </div>
                  <div className="card-servico-info">
                    <div className="card-header-info">
                      <h3>{servico.nome}</h3>
                      <span className="avaliacao-badge">{servico.avaliacao}</span>
                    </div>
                    <p className="especialidade-vet">{servico.especialidade}</p>
                    <p className="local-anos">
                      <img src={iconLocation} alt="Localização" /> {servico.localizacao}{' '}
                      <img src={iconMaleta} alt="Maleta" /> {servico.anos}
                    </p>
                    <p className="horario-valor">
                      <img src={iconCloack} alt="Horário" /> {servico.horario}{' '}
                      <span className="valor-consulta">{servico.valor}</span>
                    </p>
                    <div className="tags-servicos">
                      {servico.tags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                      ))}
                    </div>
                    <div className="card-botoes">
                      <button 
                        className="btn-contato"
                        onClick={() => handleContatar(servico)}
                      >
                        <img src={iconTelefone} alt="Telefone" /> Agendar
                      </button>
                      <Link to="/servicos/ver-perfil" className="btn-ver-perfil">Ver Perfil</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="secao-cta-profissional">
        <div className="cta-profissional-container">
          <h2>É um profissional veterinário?</h2>
          <p>Cadastre-se e conecte-se com milhares de tutores que precisam dos seus serviços</p>
          <button 
            className="btn-cadastrar-veterinario"
            onClick={() => navigate('/cadastro-veterinario')}
          >
            Cadastrar como Veterinário
          </button>
        </div>
      </section>
    </>
  );
};

export default Servicos;

