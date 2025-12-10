import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CadastroPet.css';
import artySegurandogato from '../assets/artySegurandogato.webp';
import iconeCoracao from '../assets/iconeCoracao.png';

const CadastroPet = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [fotoFile, setFotoFile] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
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
  const [novaVacinacao, setNovaVacinacao] = useState({ tipo: '', dose: '', data: '' });
  
  // Tipos de vacina disponíveis (ajuste conforme suas tabelas no banco)
  const tiposVacina = [
    { value: 'V8', label: 'V8', endpoint: 'VacinaV8' },
    { value: 'V10', label: 'V10', endpoint: 'VacinaV10' },
    { value: 'V11', label: 'V11', endpoint: 'VacinaV11' },
    { value: 'V12', label: 'V12', endpoint: 'VacinaV12' },
    { value: 'Raiva', label: 'Raiva', endpoint: 'VacinaRaiva' },
    { value: 'Gripe', label: 'Gripe Canina', endpoint: 'VacinaGripe' },
    { value: 'Giardia', label: 'Giardia', endpoint: 'VacinaGiardia' },
    { value: 'Leishmaniose', label: 'Leishmaniose', endpoint: 'VacinaLeishmaniose' },
    { value: 'Outra', label: 'Outra', endpoint: 'VacinaOutra' }
  ];
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
        condicoesPreexistentes: [...prev.condicoesPreexistentes, novaCondicao.trim()]
      }));
      setNovaCondicao('');
    }
  };

  const removerCondicao = (index) => {
    setFormData(prev => ({
      ...prev,
      condicoesPreexistentes: prev.condicoesPreexistentes.filter((_, i) => i !== index)
    }));
  };

  const adicionarMedicacao = () => {
    if (novaMedicacao.trim()) {
      setFormData(prev => ({
        ...prev,
        medicacoesAtuais: [...prev.medicacoesAtuais, novaMedicacao.trim()]
      }));
      setNovaMedicacao('');
    }
  };

  const removerMedicacao = (index) => {
    setFormData(prev => ({
      ...prev,
      medicacoesAtuais: prev.medicacoesAtuais.filter((_, i) => i !== index)
    }));
  };

  const adicionarVacinacao = () => {
    if (novaVacinacao.tipo.trim() && novaVacinacao.dose.trim()) {
      const tipoVacina = tiposVacina.find(t => t.value === novaVacinacao.tipo);
      setFormData(prev => ({
        ...prev,
        vacinacoes: [...prev.vacinacoes, {
          ...novaVacinacao,
          endpoint: tipoVacina?.endpoint || 'VacinaOutra'
        }]
      }));
      setNovaVacinacao({ tipo: '', dose: '', data: '' });
    }
  };

  const removerVacinacao = (index) => {
    setFormData(prev => ({
      ...prev,
      vacinacoes: prev.vacinacoes.filter((_, i) => i !== index)
    }));
  };

  const adicionarMedicacaoControlada = () => {
    if (novaMedicacaoControlada.trim()) {
      setFormData(prev => ({
        ...prev,
        medicacoesControladas: [...prev.medicacoesControladas, novaMedicacaoControlada.trim()]
      }));
      setNovaMedicacaoControlada('');
    }
  };

  const removerMedicacaoControlada = (index) => {
    setFormData(prev => ({
      ...prev,
      medicacoesControladas: prev.medicacoesControladas.filter((_, i) => i !== index)
    }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }
      
      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      setFotoFile(file);
      
      // Criar preview e converter para base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Obter token e ID do tutor
      const token = localStorage.getItem('token');
      const tutorId = user?.idTutor || user?.id || localStorage.getItem('userId');

      if (!token || !tutorId) {
        throw new Error('Você precisa estar logado para cadastrar um pet. Faça login novamente.');
      }

      // Construir data de nascimento (DateOnly - formato YYYY-MM-DD)
      let dnPet = null;
      console.log('=== PROCESSANDO DATA DE NASCIMENTO ===');
      console.log('diaNascimento:', formData.diaNascimento);
      console.log('mesNascimento:', formData.mesNascimento);
      console.log('anoNascimento:', formData.anoNascimento);
      
      if (formData.diaNascimento && formData.mesNascimento && formData.anoNascimento) {
        const dia = parseInt(formData.diaNascimento);
        const mes = parseInt(formData.mesNascimento);
        const ano = parseInt(formData.anoNascimento);
        
        console.log('Valores parseados - dia:', dia, 'mes:', mes, 'ano:', ano);
        
        if (dia && mes && ano && dia > 0 && dia <= 31 && mes > 0 && mes <= 12 && ano > 1900) {
          // DateOnly requer formato YYYY-MM-DD
          dnPet = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
          console.log('✅ Data formatada:', dnPet);
        } else {
          console.warn('⚠️ Valores inválidos para data:', { dia, mes, ano });
        }
      } else {
        console.warn('⚠️ Campos de data não preenchidos completamente');
      }

      // Converter castração de string para boolean
      const casPet = formData.castracao === 'sim' ? true : false;

      // Converter peso para decimal
      const peqPet = formData.peso ? parseFloat(formData.peso) : null;

      // Processar foto - remover prefixo data:image/...;base64, se existir
      let fotoBase64 = null;
      if (fotoPreview) {
        if (fotoPreview.includes(',')) {
          // Remover prefixo data:image/...;base64,
          fotoBase64 = fotoPreview.split(',')[1];
        } else {
          // Já é base64 puro
          fotoBase64 = fotoPreview;
        }
      }

      // Preparar dados para enviar ao backend
      const petData = {
        NPet: formData.nome || '',
        EspPet: formData.especie || '',
        RacaPet: formData.raca || '',
        DnPetString: dnPet, // String no formato YYYY-MM-DD (será convertido para DateOnly no backend)
        CmPet: formData.microchip || '',
        SexoPet: formData.sexo === 'macho' ? 'Macho' : 'Fêmea',
        CasPet: casPet,
        PortePet: formData.porte === 'pequeno' ? 'Pequeno' : 
                 formData.porte === 'medio' ? 'Médio' : 'Grande',
        PeqPet: peqPet,
        CorPet: formData.cor || '',
        CpePet: formData.condicoesPreexistentes?.join(', ') || '',
        MaPet: formData.medicacoesAtuais?.join(', ') || '',
        // Se houver campo para medicações controladas na tabela Pets, adicione aqui:
        // McPet: formData.medicacoesControladas?.join(', ') || '',
        FotoPet: fotoBase64, // Base64 puro (sem prefixo)
        FkTutorId: parseInt(tutorId)
      };

      console.log('Enviando dados do pet:', { ...petData, FotoPet: fotoPreview ? '[Base64]' : null });

      // Fazer requisição POST para criar o pet
      const response = await fetch('/api/Pets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(petData)
      });

      // Verificar se a requisição foi bem-sucedida (201 Created)
      if (response.status === 201) {
        // Pet foi criado com sucesso
        let createdPet;
        try {
          createdPet = await response.json();
          console.log('Pet cadastrado com sucesso:', createdPet);
        } catch (jsonError) {
          // Se houver erro ao ler o JSON, tentar extrair o ID do header Location ou da resposta
          console.warn('Pet criado, mas houve erro ao ler a resposta:', jsonError);
          // Tentar obter ID do header Location se disponível
          const locationHeader = response.headers.get('Location');
          if (locationHeader) {
            const match = locationHeader.match(/\/(\d+)$/);
            if (match) {
              createdPet = { idPet: parseInt(match[1]) };
            }
          }
        }

        const petId = createdPet?.idPet || createdPet?.id;
        
        // Se houver vacinações, cadastrar cada uma na sua respectiva tabela
        if (formData.vacinacoes && formData.vacinacoes.length > 0 && petId) {
          console.log('Cadastrando vacinações...', formData.vacinacoes);
          
          // Agrupar vacinações por tipo/endpoint
          const vacinacoesPorTipo = {};
          formData.vacinacoes.forEach((vacina, index) => {
            const endpoint = vacina.endpoint || 'VacinaOutra';
            if (!vacinacoesPorTipo[endpoint]) {
              vacinacoesPorTipo[endpoint] = [];
            }
            vacinacoesPorTipo[endpoint].push({
              ...vacina,
              index
            });
          });

          // Cadastrar cada tipo de vacina na sua respectiva tabela
          const promessasVacinas = [];
          for (const [endpoint, vacinas] of Object.entries(vacinacoesPorTipo)) {
            vacinas.forEach(vacina => {
              const vacinaData = {
                FkPetIdPetPk: petId,
                DoseVacina: vacina.dose,
                DataVacina: vacina.data || new Date().toISOString().split('T')[0], // Se não tiver data, usar hoje
                // Adicione outros campos específicos da tabela aqui conforme necessário
              };

              promessasVacinas.push(
                fetch(`/api/${endpoint}`, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(vacinaData)
                }).then(async (vacinaResponse) => {
                  if (!vacinaResponse.ok) {
                    const errorText = await vacinaResponse.text();
                    console.error(`Erro ao cadastrar vacina ${endpoint}:`, errorText);
                    throw new Error(`Erro ao cadastrar vacina ${vacina.tipo}`);
                  }
                  return vacinaResponse.json();
                })
              );
            });
          }

          // Aguardar todas as vacinações serem cadastradas
          try {
            await Promise.all(promessasVacinas);
            console.log('Todas as vacinações foram cadastradas com sucesso');
          } catch (vacinaError) {
            console.error('Erro ao cadastrar algumas vacinações:', vacinaError);
            // Avisar o usuário, mas não falhar o cadastro do pet
            alert('Pet cadastrado com sucesso, mas houve erro ao cadastrar algumas vacinações. Você pode adicioná-las depois no perfil.');
          }
        }

        // Redirecionar para o perfil após sucesso
        setIsSubmitting(false);
        alert('Pet cadastrado com sucesso!');
        // Usar replace para forçar recarregamento e adicionar timestamp para garantir atualização
        navigate('/perfil', { replace: true, state: { refresh: true, timestamp: Date.now() } });
        return;
      }

      // Se não for 201, tratar como erro
      if (!response.ok) {
        const errorData = await response.text();
        let errorMessage = `Erro ao cadastrar pet: ${response.status}`;
        
        try {
          const errorJson = JSON.parse(errorData);
          errorMessage = errorJson.message || errorMessage;
        } catch {
          errorMessage = errorData || errorMessage;
        }
        
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('Erro ao cadastrar pet:', err);
      setError(err.message || 'Erro ao cadastrar pet. Tente novamente.');
      setIsSubmitting(false);
    }
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

                <div className="form-group">
                  <label htmlFor="foto-pet">Foto do Pet (Opcional)</label>
                  <input
                    type="file"
                    id="foto-pet"
                    accept="image/*"
                    onChange={handleFotoChange}
                    style={{ padding: '8px' }}
                    disabled={isSubmitting}
                  />
                  {fotoPreview && (
                    <div style={{ marginTop: '10px' }}>
                      <img 
                        src={fotoPreview} 
                        alt="Preview" 
                        style={{ 
                          maxWidth: '150px', 
                          maxHeight: '150px', 
                          borderRadius: '8px',
                          objectFit: 'cover'
                        }} 
                      />
                    </div>
                  )}
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
                      placeholder="Ex: Diabetes, Hipertensão, Asma"
                      value={novaCondicao}
                      onChange={(e) => setNovaCondicao(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          adicionarCondicao();
                        }
                      }}
                    />
                  </div>
                  <button 
                    type="button" 
                    className="btn-adicionar-item" 
                    onClick={adicionarCondicao}
                    disabled={!novaCondicao.trim()}
                    style={{ 
                      opacity: !novaCondicao.trim() ? 0.5 : 1,
                      cursor: !novaCondicao.trim() ? 'not-allowed' : 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
                {/* Lista de condições adicionadas */}
                {formData.condicoesPreexistentes.length > 0 && (
                  <div className="lista-itens" style={{ marginTop: '10px' }}>
                    {formData.condicoesPreexistentes.map((condicao, index) => (
                      <div 
                        key={index} 
                        className="item-lista"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px',
                          backgroundColor: '#F8F6FD',
                          borderRadius: '6px',
                          marginBottom: '6px',
                          fontSize: '14px'
                        }}
                      >
                        <span>{condicao}</span>
                        <button
                          type="button"
                          onClick={() => removerCondicao(index)}
                          style={{
                            background: '#DC2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="medicacoes-atuais">Medicações Atuais (Opcional)</label>
                <div className="input-with-button">
                  <div className="form-group">
                    <input
                      type="text"
                      id="medicacoes-atuais"
                      placeholder="Ex: Prednisona 5mg, Insulina"
                      value={novaMedicacao}
                      onChange={(e) => setNovaMedicacao(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          adicionarMedicacao();
                        }
                      }}
                    />
                  </div>
                  <button 
                    type="button" 
                    className="btn-adicionar-item" 
                    onClick={adicionarMedicacao}
                    disabled={!novaMedicacao.trim()}
                    style={{ 
                      opacity: !novaMedicacao.trim() ? 0.5 : 1,
                      cursor: !novaMedicacao.trim() ? 'not-allowed' : 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
                {/* Lista de medicações adicionadas */}
                {formData.medicacoesAtuais.length > 0 && (
                  <div className="lista-itens" style={{ marginTop: '10px' }}>
                    {formData.medicacoesAtuais.map((medicacao, index) => (
                      <div 
                        key={index} 
                        className="item-lista"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px',
                          backgroundColor: '#F8F6FD',
                          borderRadius: '6px',
                          marginBottom: '6px',
                          fontSize: '14px'
                        }}
                      >
                        <span>{medicacao}</span>
                        <button
                          type="button"
                          onClick={() => removerMedicacao(index)}
                          style={{
                            background: '#DC2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-titulo">
                <span>VACINAÇÃO</span>
              </h2>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="tipo-vacinacao">Tipo</label>
                  <select
                    id="tipo-vacinacao"
                    value={novaVacinacao.tipo}
                    onChange={(e) => setNovaVacinacao(prev => ({ ...prev, tipo: e.target.value }))}
                    required
                  >
                    <option value="">Selecione o tipo</option>
                    {tiposVacina.map(tipo => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="dose-vacinacao">Dose</label>
                  <input
                    type="text"
                    id="dose-vacinacao"
                    placeholder="Ex: 1ª dose, 2ª dose, reforço"
                    value={novaVacinacao.dose}
                    onChange={(e) => setNovaVacinacao(prev => ({ ...prev, dose: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="data-vacinacao">Data (Opcional)</label>
                  <input
                    type="date"
                    id="data-vacinacao"
                    value={novaVacinacao.data}
                    onChange={(e) => setNovaVacinacao(prev => ({ ...prev, data: e.target.value }))}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button 
                    type="button" 
                    className="btn-adicionar-item" 
                    onClick={adicionarVacinacao}
                    disabled={!novaVacinacao.tipo || !novaVacinacao.dose}
                    style={{ 
                      width: '100%',
                      opacity: (!novaVacinacao.tipo || !novaVacinacao.dose) ? 0.5 : 1,
                      cursor: (!novaVacinacao.tipo || !novaVacinacao.dose) ? 'not-allowed' : 'pointer'
                    }}
                  >
                    + Adicionar Vacina
                  </button>
                </div>
              </div>

              {/* Lista de vacinações adicionadas */}
              {formData.vacinacoes.length > 0 && (
                <div className="vacinacoes-lista" style={{ marginTop: '20px' }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '10px', color: '#7A2FF5' }}>
                    Vacinações Adicionadas:
                  </h3>
                  {formData.vacinacoes.map((vacina, index) => (
                    <div 
                      key={index} 
                      className="vacinacao-item"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        backgroundColor: '#F8F6FD',
                        borderRadius: '8px',
                        marginBottom: '8px'
                      }}
                    >
                      <div>
                        <strong>{vacina.tipo}</strong> - {vacina.dose}
                        {vacina.data && <span style={{ marginLeft: '10px', color: '#666' }}>({vacina.data})</span>}
                      </div>
                      <button
                        type="button"
                        onClick={() => removerVacinacao(index)}
                        style={{
                          background: '#DC2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          cursor: 'pointer'
                        }}
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="medicacoes-controladas">Medicações Controladas (Opcional)</label>
                <div className="input-with-button">
                  <div className="form-group">
                    <input
                      type="text"
                      id="medicacoes-controladas"
                      placeholder="Ex: Morfina, Codeína, Tramadol"
                      value={novaMedicacaoControlada}
                      onChange={(e) => setNovaMedicacaoControlada(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          adicionarMedicacaoControlada();
                        }
                      }}
                    />
                  </div>
                  <button 
                    type="button" 
                    className="btn-adicionar-item" 
                    onClick={adicionarMedicacaoControlada}
                    disabled={!novaMedicacaoControlada.trim()}
                    style={{ 
                      opacity: !novaMedicacaoControlada.trim() ? 0.5 : 1,
                      cursor: !novaMedicacaoControlada.trim() ? 'not-allowed' : 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
                {/* Lista de medicações controladas adicionadas */}
                {formData.medicacoesControladas.length > 0 && (
                  <div className="lista-itens" style={{ marginTop: '10px' }}>
                    {formData.medicacoesControladas.map((medicacao, index) => (
                      <div 
                        key={index} 
                        className="item-lista"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px',
                          backgroundColor: '#F8F6FD',
                          borderRadius: '6px',
                          marginBottom: '6px',
                          fontSize: '14px'
                        }}
                      >
                        <span>{medicacao}</span>
                        <button
                          type="button"
                          onClick={() => removerMedicacaoControlada(index)}
                          style={{
                            background: '#DC2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="consentimento" name="consentimento" defaultChecked />
              <label htmlFor="consentimento">Eu autorizo o uso de dados para personalização de atendimento</label>
            </div>

            {error && (
              <div style={{ 
                color: '#DC2626', 
                backgroundColor: '#FEE2E2', 
                padding: '12px', 
                borderRadius: '8px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-finalizar"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? 'CADASTRANDO...' : 'FINALIZAR'}
              </button>
              <Link to="/perfil" className="btn-voltar-cadastro">VOLTAR</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CadastroPet;

