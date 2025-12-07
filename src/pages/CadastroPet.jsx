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
        // Tentar ler a resposta, mas não falhar se houver erro de serialização
        try {
          const createdPet = await response.json();
          console.log('Pet cadastrado com sucesso:', createdPet);
        } catch (jsonError) {
          // Se houver erro ao ler o JSON (pode ser problema de serialização no backend),
          // mas o status 201 indica que o pet foi criado, então continuamos
          console.warn('Pet criado, mas houve erro ao ler a resposta:', jsonError);
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

