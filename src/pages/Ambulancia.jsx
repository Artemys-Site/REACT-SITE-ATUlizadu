import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Ambulancia.css';
import iconeAlerta from '../assets/iconeAlerta.png';
import iconLocation from '../assets/iconLocation.png';
import iconeChamarambulancia from '../assets/iconeChamarambulancia.png';
import imagemMaps from '../assets/imagemMaps.jpeg';
import iconeRelogio from '../assets/iconeRelogio.png';
import iconeDinheiro from '../assets/iconeDinheiro.png';
import check from '../assets/check.png';

const Ambulancia = () => {
  const [step, setStep] = useState(1);
  const [localizacao, setLocalizacao] = useState('Rua Visconde de Parnaíba, 1461 - SP');
  const [isEditandoLocalizacao, setIsEditandoLocalizacao] = useState(false);
  const [petSelecionado, setPetSelecionado] = useState('');
  const [urgencia, setUrgencia] = useState('media');
  const [sintomas, setSintomas] = useState('');
  const [telefone, setTelefone] = useState('(11) 91488-6511');
  const [pets, setPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  // Buscar pets do usuário logado
  useEffect(() => {
    const fetchPets = async () => {
      if (!isLoggedIn || !user) return;
      
      try {
        setLoadingPets(true);
        const token = localStorage.getItem('token');
        const userId = user.idTutor || user.id || localStorage.getItem('userId');
        
        if (!userId) return;
        
        const response = await fetch(`/api/Pets/tutor/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const petsData = await response.json();
          const petsArray = Array.isArray(petsData) ? petsData : (petsData ? [petsData] : []);
          setPets(petsArray.map(pet => ({
            value: pet.idPet || pet.id,
            nome: pet.nPet || pet.nome || 'Pet sem nome'
          })));
        }
      } catch (error) {
        console.error('Erro ao buscar pets:', error);
      } finally {
        setLoadingPets(false);
      }
    };
    
    fetchPets();
  }, [isLoggedIn, user]);

  const handleContinuar = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Redirecionar para página de rastreamento
      navigate('/rastreamento-ambulancia');
    }
  };

  const handleUsarLocalizacao = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Usar API de geocodificação reversa (OpenStreetMap Nominatim)
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              {
                headers: {
                  'User-Agent': 'Artemys Pet Care App'
                }
              }
            );
            
            if (response.ok) {
              const data = await response.json();
              if (data.address) {
                const endereco = [];
                if (data.address.road) endereco.push(data.address.road);
                if (data.address.house_number) endereco.push(data.address.house_number);
                if (data.address.suburb || data.address.neighbourhood) endereco.push(data.address.suburb || data.address.neighbourhood);
                if (data.address.city || data.address.town) endereco.push(data.address.city || data.address.town);
                if (data.address.state) endereco.push(data.address.state);
                
                const enderecoFormatado = endereco.length > 0 
                  ? endereco.join(', ') 
                  : `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
                
                setLocalizacao(enderecoFormatado);
                setIsEditandoLocalizacao(false);
              } else {
                setLocalizacao(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
                setIsEditandoLocalizacao(false);
              }
            } else {
              setLocalizacao(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
              setIsEditandoLocalizacao(false);
            }
          } catch (error) {
            console.error('Erro ao obter endereço:', error);
            setLocalizacao(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
            setIsEditandoLocalizacao(false);
          }
        },
        (error) => {
          let mensagem = 'Não foi possível obter sua localização';
          if (error.code === 1) {
            mensagem = 'Permissão de localização negada. Por favor, permita o acesso à localização nas configurações do navegador.';
          } else if (error.code === 2) {
            mensagem = 'Localização indisponível. Verifique se o GPS está ativado.';
          } else if (error.code === 3) {
            mensagem = 'Tempo esgotado ao obter localização. Tente novamente.';
          }
          alert(mensagem);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert('Geolocalização não é suportada pelo seu navegador');
    }
  };

  return (
    <>
      <section className="ambulancia-banner">
        <div className="ambulancia-banner-content">
          <Link to="/home-logado" className="btn-voltar-ambulancia">← VOLTAR</Link>
          <div className="tag-emergencia-wrapper">
            <img src={iconeAlerta} alt="Alerta" className="icone-alerta" />
            <span className="tag-emergencia">ATENDIMENTO DE EMERGÊNCIA</span>
          </div>
        </div>
      </section>

      <section className="ambulancia-page">
        <div className="ambulancia-container">
          <div className="ambulancia-header">
            <h1 className="ambulancia-titulo">CHAMADO DE AMBULÂNCIA</h1>
            <p className="ambulancia-subtitulo">Processo rápido em 3 passos simples</p>
          </div>

          <div className="ambulancia-progress">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">INFORMAÇÕES</span>
            </div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">CONFIRMAÇÃO</span>
            </div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">CONCLUÍDO</span>
            </div>
          </div>

          <div className="ambulancia-content">
            <div className="ambulancia-form-column">
              <div className="ambulancia-form-card">
                {step === 1 && (
                  <>
                    <h2 className="form-card-titulo">INFORMAÇÕES DA EMERGÊNCIA</h2>

                    <div className="form-group-ambulancia">
                      <label htmlFor="localizacao" className="label-com-icone">
                        <img src={iconLocation} alt="Localização" className="icone-label" />
                        Sua localização (DETECTADA)
                      </label>
                      <div className="localizacao-group">
                        {isEditandoLocalizacao ? (
                          <input
                            type="text"
                            id="localizacao"
                            value={localizacao}
                            onChange={(e) => setLocalizacao(e.target.value)}
                            className="input-ambulancia"
                          />
                        ) : (
                          <input
                            type="text"
                            id="localizacao"
                            value={localizacao}
                            readOnly
                            className="input-ambulancia"
                          />
                        )}
                        <button
                          type="button"
                          className="btn-editar"
                          onClick={() => setIsEditandoLocalizacao(!isEditandoLocalizacao)}
                        >
                          {isEditandoLocalizacao ? 'Salvar' : 'Editar'}
                        </button>
                      </div>
                      <button
                        type="button"
                        className="btn-usar-localizacao"
                        onClick={handleUsarLocalizacao}
                      >
                        <img src={iconeChamarambulancia} alt="Localização" className="icone-localizacao" />
                        Usar minha localização atual
                      </button>
                    </div>

                    <div className="form-group-ambulancia">
                      <label htmlFor="pet-selecao">QUAL PET PRECISA DE ATENDIMENTO?</label>
                      <select
                        id="pet-selecao"
                        className="select-ambulancia"
                        value={petSelecionado}
                        onChange={(e) => setPetSelecionado(e.target.value)}
                        disabled={loadingPets}
                      >
                        <option value="">
                          {loadingPets ? 'Carregando pets...' : pets.length === 0 ? 'Nenhum pet cadastrado' : 'Selecione seu pet'}
                        </option>
                        {pets.map(pet => (
                          <option key={pet.value} value={pet.value}>{pet.nome}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group-ambulancia">
                      <label>Nível de urgência</label>
                      <div className="urgencia-options">
                        <div className="urgencia-option">
                          <input
                            type="radio"
                            id="urgencia-baixa"
                            name="urgencia"
                            value="baixa"
                            checked={urgencia === 'baixa'}
                            onChange={(e) => setUrgencia(e.target.value)}
                          />
                          <label htmlFor="urgencia-baixa" className="urgencia-label urgencia-baixa">
                            <span className="urgencia-dot"></span>
                            <div>
                              <strong>BAIXA</strong>
                              <p>Pode aguardar alguns minutos</p>
                            </div>
                          </label>
                        </div>
                        <div className="urgencia-option">
                          <input
                            type="radio"
                            id="urgencia-media"
                            name="urgencia"
                            value="media"
                            checked={urgencia === 'media'}
                            onChange={(e) => setUrgencia(e.target.value)}
                          />
                          <label htmlFor="urgencia-media" className="urgencia-label urgencia-media">
                            <span className="urgencia-dot"></span>
                            <div>
                              <strong>MÉDIA</strong>
                              <p>Situação preocupante</p>
                            </div>
                          </label>
                        </div>
                        <div className="urgencia-option">
                          <input
                            type="radio"
                            id="urgencia-alta"
                            name="urgencia"
                            value="alta"
                            checked={urgencia === 'alta'}
                            onChange={(e) => setUrgencia(e.target.value)}
                          />
                          <label htmlFor="urgencia-alta" className="urgencia-label urgencia-alta">
                            <span className="urgencia-dot"></span>
                            <div>
                              <strong>ALTA</strong>
                              <p>Emergência imediata</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group-ambulancia">
                      <label htmlFor="sintomas">SINTOMAS (OPCIONAL)</label>
                      <textarea
                        id="sintomas"
                        className="textarea-ambulancia"
                        rows="4"
                        placeholder="Descreva brevemente o que está acontecendo..."
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="form-group-ambulancia">
                      <label htmlFor="telefone">TELEFONE PARA CONTATO</label>
                      <input
                        type="text"
                        id="telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="input-ambulancia"
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <div className="confirmacao-content">
                    <h2 className="form-card-titulo">CONFIRMAÇÃO</h2>
                    <div className="resumo-chamado">
                      <div className="resumo-item">
                        <strong>Localização:</strong>
                        <span>{localizacao}</span>
                      </div>
                      <div className="resumo-item">
                        <strong>Pet:</strong>
                        <span>{pets.find(p => p.value === petSelecionado || p.value === parseInt(petSelecionado))?.nome || 'Não selecionado'}</span>
                      </div>
                      <div className="resumo-item">
                        <strong>Urgência:</strong>
                        <span className={`urgencia-badge ${urgencia}`}>{urgencia.toUpperCase()}</span>
                      </div>
                      {sintomas && (
                        <div className="resumo-item">
                          <strong>Sintomas:</strong>
                          <span>{sintomas}</span>
                        </div>
                      )}
                      <div className="resumo-item">
                        <strong>Telefone:</strong>
                        <span>{telefone}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-voltar-step"
                      onClick={() => setStep(1)}
                    >
                      VOLTAR
                    </button>
                  </div>
                )}

                {step === 3 && (
                  <div className="concluido-content">
                    <div className="check-icon">✓</div>
                    <h2 className="form-card-titulo">CHAMADO ENVIADO!</h2>
                    <p className="concluido-texto">
                      Sua solicitação foi enviada com sucesso. A ambulância está a caminho!
                    </p>
                    <p className="tempo-estimado-texto">
                      Tempo estimado de chegada: <strong>10-15 minutos</strong>
                    </p>
                    <button
                      type="button"
                      className="btn-continuar-ambulancia"
                      onClick={handleContinuar}
                    >
                      ACESSAR RASTREAMENTO
                    </button>
                  </div>
                )}

                {step < 3 && (
                  <button
                    type="button"
                    className="btn-continuar-ambulancia"
                    onClick={handleContinuar}
                    disabled={!petSelecionado || !localizacao}
                  >
                    {step === 1 ? 'CONTINUAR' : 'CONFIRMAR CHAMADO'}
                  </button>
                )}
              </div>
            </div>

            <div className="ambulancia-info-column">
              <div className="ambulancia-mapa">
                <img src={imagemMaps} alt="Mapa de localização" className="mapa-container" />
              </div>

              <div className="ambulancia-cards">
                <div className="info-card tempo-card">
                  <img src={iconeRelogio} alt="Relógio" />
                  <div>
                    <p className="card-label">TEMPO ESTIMADO</p>
                    <p className="card-value">10-15 MIN</p>
                  </div>
                </div>
                <div className="info-card valor-card">
                  <img src={iconeDinheiro} alt="Dinheiro" />
                  <div>
                    <p className="card-label">VALOR ESTIMADO</p>
                    <p className="card-value">R$ 100</p>
                  </div>
                </div>
              </div>

              <div className="info-importante-box">
                <h3>INFORMAÇÕES IMPORTANTES</h3>
                <ul className="info-list">
                  <li>
                    <img src={check} alt="Check" />
                    <span>Ambulância equipada 24h</span>
                  </li>
                  <li>
                    <img src={check} alt="Check" />
                    <span>Veterinário a bordo</span>
                  </li>
                  <li>
                    <img src={check} alt="Check" />
                    <span>Equipamento de primeiros socorros</span>
                  </li>
                  <li>
                    <img src={check} alt="Check" />
                    <span>Transporte seguro e confortável</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Ambulancia;

