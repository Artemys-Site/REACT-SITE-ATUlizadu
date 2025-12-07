import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Perfil.css';
import fotoBob from '../assets/fotoBob.jpeg';
import fotoMila from '../assets/fotoMila.jpg';
import iconePerfilAvalia from '../assets/iconePerfilAvalia.png';
import iconeCalendarioPreto from '../assets/iconeCalendarioPreto.png';
import iconeNotificacao from '../assets/iconeNotificacao.png';
import perfilLogado from '../assets/perfilLogado.png';
import iconeConfirmar from '../assets/iconeConfirmar.png';

const Perfil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();
  
  // Detectar tipo de conta do usuário logado
  const accountType = user?.accountType || user?.tipo?.toLowerCase() || 'tutor';
  const isTutor = accountType === 'tutor';
  const isClinica = accountType === 'clinica';
  const isVeterinario = accountType === 'veterinario';
  const isAmbulancia = accountType === 'ambulancia';
  
  const [activeTab, setActiveTab] = useState('perfil');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [fotoFile, setFotoFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalPet, setModalPet] = useState(null);
  const [isEditingPet, setIsEditingPet] = useState(false);
  const [petEditData, setPetEditData] = useState(null);
  const [petFotoPreview, setPetFotoPreview] = useState(null);
  const [isSavingPet, setIsSavingPet] = useState(false);
  const [isDeletingPet, setIsDeletingPet] = useState(false);

  const [notificacoes, setNotificacoes] = useState({
    emailAgendamento: true,
    smsLembrete: true,
    pushEmergencia: true,
    whatsappConfirmacao: true,
    emailsPromocionais: false
  });

  useEffect(() => {
    // Verifica se tem # na URL para ativar a aba correta
    if (location.hash === '#pagamento') {
      setActiveTab('pagamento');
    }
  }, [location]);


  // Buscar dados do usuário logado baseado no tipo de conta
  useEffect(() => {
    let isMounted = true; // Flag para verificar se o componente ainda está montado
    let abortController = new AbortController(); // Para cancelar requisições pendentes
    
    // Verificar se há flag de refresh na location state
    const shouldRefresh = location.state?.refresh || false;
    console.log('🔄 useEffect executado. shouldRefresh:', shouldRefresh, 'pathname:', location.pathname);
    
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Usuário não autenticado');
        }

        // Obter tipo de conta atual do user ou localStorage
        const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');
        const currentAccountType = currentUser.accountType || currentUser.tipo?.toLowerCase() || 'tutor';
        const currentIsTutor = currentAccountType === 'tutor';
        const currentIsClinica = currentAccountType === 'clinica';
        const currentIsVeterinario = currentAccountType === 'veterinario';
        const currentIsAmbulancia = currentAccountType === 'ambulancia';

        // Obter ID do usuário baseado no tipo de conta
        let userId = null;
        const userFromStorage = localStorage.getItem('user');
        
        if (userFromStorage) {
          try {
            const userObj = JSON.parse(userFromStorage);
            // Tenta diferentes campos possíveis para o ID baseado no tipo de conta
            if (currentIsTutor) {
              userId = userObj.idTutor || userObj.id || userObj.userId || localStorage.getItem('userId');
            } else if (currentIsClinica) {
              userId = userObj.idClinica || userObj.id || userObj.userId || localStorage.getItem('userId');
            } else if (currentIsVeterinario) {
              userId = userObj.idVeterinario || userObj.id || userObj.userId || localStorage.getItem('userId');
            } else if (currentIsAmbulancia) {
              userId = userObj.idAmbulancia || userObj.id || userObj.userId || localStorage.getItem('userId');
            } else {
              userId = userObj.id || userObj.userId || localStorage.getItem('userId');
            }
            
            if (userId) {
              localStorage.setItem('userId', userId.toString());
            }
          } catch (e) {
            console.error('Erro ao parsear user do localStorage:', e);
          }
        }
        
        if (!userId) {
          userId = localStorage.getItem('userId');
        }

        if (!userId) {
          throw new Error('ID do usuário não encontrado. Faça login novamente.');
        }

        // Buscar dados baseado no tipo de conta
        let url = '';
        if (currentIsTutor) {
          url = `/api/Tutors/id/${userId}`;
        } else if (currentIsClinica) {
          url = `/api/Clinicas/${userId}`;
        } else if (currentIsVeterinario) {
          url = `/api/Veterinarios/${userId}`;
        } else if (currentIsAmbulancia) {
          url = `/api/Ambulancias/${userId}`;
        } else {
          throw new Error('Tipo de conta não suportado');
        }

        console.log('Fazendo requisição para:', url);
        console.log('User ID:', userId);
        console.log('Tipo de conta:', currentAccountType);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          signal: abortController.signal
        });

        if (!response.ok) {
          let errorDetails = '';
          try {
            const errorData = await response.text();
            errorDetails = errorData;
            console.error('Resposta de erro do servidor:', errorData);
          } catch (e) {
            console.error('Não foi possível ler resposta de erro');
          }
          
          if (response.status === 404) {
            throw new Error(`Usuário com ID ${userId} não encontrado. Verifique se o ID está correto ou faça login novamente.`);
          } else if (response.status === 401) {
            throw new Error('Token de autenticação inválido ou expirado. Faça login novamente.');
          } else {
            throw new Error(`Erro ao buscar dados: ${response.status}${errorDetails ? ` - ${errorDetails}` : ''}`);
          }
        }

        const data = await response.json();
        console.log('Dados recebidos do backend:', data);

        // Verificar se o componente ainda está montado antes de atualizar o estado
        if (!isMounted) {
          return;
        }

        // Mapear dados baseado no tipo de conta
        let mappedData = {};
        let petsDoTutor = [];

        if (currentIsTutor) {
          // Sempre buscar pets separadamente para garantir que a lista esteja atualizada
          const tutorIdParaPets = parseInt(data.idTutor || data.id);
          if (!isNaN(tutorIdParaPets) && tutorIdParaPets > 0) {
            console.log('🔍 Buscando pets do tutor ID:', tutorIdParaPets);
            try {
              const petsUrl = `/api/Pets/tutor/${tutorIdParaPets}`;
              const petsResponse = await fetch(petsUrl, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
                signal: abortController.signal
              });

              if (petsResponse.ok) {
                try {
                  const petsBuscados = await petsResponse.json();
                  petsDoTutor = Array.isArray(petsBuscados) ? petsBuscados : (petsBuscados ? [petsBuscados] : []);
                  console.log('✅ Pets buscados com sucesso:', petsDoTutor.length);
                  console.log('Pets recebidos:', petsDoTutor);
                } catch (jsonError) {
                  console.warn('⚠️ Erro ao ler resposta de pets:', jsonError.message);
                  // Fallback: usar pets que vieram no tutorData
                  petsDoTutor = data.pets || data.Pets || [];
                }
              } else {
                console.warn('⚠️ Erro ao buscar pets:', petsResponse.status);
                // Fallback: usar pets que vieram no tutorData
                petsDoTutor = data.pets || data.Pets || [];
              }
            } catch (petsError) {
              if (petsError.name !== 'AbortError') {
                console.warn('⚠️ Erro ao buscar pets separadamente:', petsError.message);
                // Fallback: usar pets que vieram no tutorData
                petsDoTutor = data.pets || data.Pets || [];
              }
            }
          } else {
            // Se não tem ID válido, usar pets que vieram no tutorData
            petsDoTutor = data.pets || data.Pets || [];
          }
          
          // Garantir que seja sempre um array válido
          if (!Array.isArray(petsDoTutor)) {
            petsDoTutor = petsDoTutor ? [petsDoTutor] : [];
          } else {
            petsDoTutor = petsDoTutor.filter(p => p != null && p !== undefined);
          }
          
          console.log('=== PETS FINAIS PROCESSADOS ===');
          console.log('Quantidade de pets:', petsDoTutor.length);
          console.log('Pets:', petsDoTutor);

          mappedData = {
            id: data.idTutor || data.id,
            nome: data.ncTutor || data.nome,
            genero: data.gTutor || data.genero,
            cpf: data.cpfTutor || data.cpf,
            email: data.emailTutor || data.email,
            dataNascimento: data.dnTutor || data.dataNascimento,
            telefone: data.fkNumTtutorNumTtutorPkNavigation?.numTtutor1 || 
                     data.fkNumCtutorNumCtutorPkNavigation?.numCtutor1 || 
                     data.telefone,
            endereco: data.fkEndTutorEndTutorPkNavigation,
            pets: petsDoTutor,
            foto: data.fotoTutor || data.foto || null
          };
        } else if (currentIsClinica) {
          // Mapear dados da clínica
          mappedData = {
            id: data.idClinica || data.id,
            nome: data.nomeClinica || data.nomeFantasia || data.nome,
            cnpj: data.cnpj || data.cnpjClinica,
            email: data.emailClinica || data.email,
            telefone: data.telefoneClinica || data.telefone,
            endereco: data.endereco || data.fkEndClinicaEndClinicaPkNavigation,
            foto: data.fotoClinica || data.foto || null
          };
        } else if (currentIsVeterinario) {
          // Mapear dados do veterinário
          mappedData = {
            id: data.idVeterinario || data.id,
            nome: data.nomeVeterinario || data.nome,
            crmv: data.crmv || data.numeroCRMV,
            email: data.emailVeterinario || data.email,
            telefone: data.telefoneVeterinario || data.telefone,
            endereco: data.endereco || data.fkEndVeterinarioEndVeterinarioPkNavigation,
            foto: data.fotoVeterinario || data.foto || null
          };
        } else if (currentIsAmbulancia) {
          // Mapear dados da ambulância
          mappedData = {
            id: data.idAmbulancia || data.id,
            nome: data.nomeAmbulancia || data.nome,
            cnpj: data.cnpj || data.cnpjAmbulancia,
            email: data.emailAmbulancia || data.email,
            telefone: data.telefoneAmbulancia || data.telefone,
            endereco: data.endereco || data.fkEndAmbulanciaEndAmbulanciaPkNavigation,
            foto: data.fotoAmbulancia || data.foto || null
          };
        }

        // Processar foto
        let fotoProcessada = null;
        if (mappedData.foto && mappedData.foto.trim() !== '' && mappedData.foto !== 'null') {
          const fotoOriginal = mappedData.foto.trim();
          
          if (fotoOriginal.startsWith('data:')) {
            fotoProcessada = fotoOriginal;
          } else if (fotoOriginal.startsWith('http')) {
            fotoProcessada = fotoOriginal;
          } else if (fotoOriginal.startsWith('/api/')) {
            fotoProcessada = `${fotoOriginal}`;
          } else {
            const base64String = fotoOriginal.replace(/\s/g, '');
            const base64Regex = /^[A-Za-z0-9+/=]+$/;
            
            if (base64String.length > 500 && base64Regex.test(base64String)) {
              fotoProcessada = `data:image/jpeg;base64,${base64String}`;
            } else if (fotoOriginal.startsWith('/') && base64String.length < 100) {
              fotoProcessada = `/api/${currentAccountType}s/fotos${fotoOriginal}`;
            } else if (!fotoOriginal.startsWith('/') && base64String.length < 100) {
              fotoProcessada = `/api/${currentAccountType}s/fotos/${fotoOriginal}`;
            } else if (base64Regex.test(base64String) && base64String.length > 100) {
              fotoProcessada = `data:image/jpeg;base64,${base64String}`;
            } else {
              fotoProcessada = fotoOriginal;
            }
          }
        } else {
          fotoProcessada = perfilLogado;
        }

        // Verificar novamente se o componente ainda está montado
        if (!isMounted) {
          return;
        }

        setFotoPreview(fotoProcessada);
        mappedData.foto = fotoProcessada;
        setUserData(mappedData);

        // Atualizar contexto de autenticação e salvar foto no localStorage
        const userAtualizado = {
          ...mappedData,
          foto: fotoProcessada,
          accountType: currentAccountType,
          tipo: currentAccountType.charAt(0).toUpperCase() + currentAccountType.slice(1)
        };
        updateUser(userAtualizado);
        
        // Sempre salvar foto no localStorage para o Header usar
        localStorage.setItem('userFoto', fotoProcessada);
        
        // Disparar evento para atualizar o Header
        window.dispatchEvent(new CustomEvent('userUpdated', { 
          detail: { foto: fotoProcessada } 
        }));

        if (mappedData.id) {
          localStorage.setItem('userId', mappedData.id.toString());
        }

      } catch (err) {
        // Ignorar erros de abort
        if (err.name === 'AbortError') {
          return;
        }
        
        if (!isMounted) {
          return;
        }
        setError(err.message);
        console.error('Erro ao buscar dados do usuário:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUserData();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // Recarregar quando a rota mudar (ex: voltar do cadastro)

  // ... resto do código continua igual ao fornecido, mas adaptado para diferentes tipos de conta
  // Por questão de espaço, vou manter a estrutura principal e adaptar as partes críticas

  const handleToggleNotificacao = (key) => {
    setNotificacoes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Lidar com upload de foto
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

  // Iniciar edição
  const handleEdit = () => {
    setIsEditing(true);
    
    // Garantir que o endereço seja sempre inicializado
    const enderecoAtual = userData.endereco || {};
    
    setEditData({
      nome: userData.nome || '',
      genero: userData.genero || '',
      email: userData.email || '',
      telefone: userData.telefone ? userData.telefone.replace(/\D/g, '') : '',
      endereco: {
        endTutorPk: enderecoAtual.endTutorPk || enderecoAtual.endClinicaPk || enderecoAtual.endVeterinarioPk || enderecoAtual.endAmbulanciaPk || null,
        cepTutor: enderecoAtual.cepTutor || enderecoAtual.cep || '',
        ruaTutor: enderecoAtual.ruaTutor || enderecoAtual.rua || '',
        numeroRuaTutor: enderecoAtual.numeroRuaTutor || enderecoAtual.numero || '',
        bairroTutor: enderecoAtual.bairroTutor || enderecoAtual.bairro || '',
        cidadeTutor: enderecoAtual.cidadeTutor || enderecoAtual.cidade || '',
        estadoTutor: enderecoAtual.estadoTutor || enderecoAtual.estado || '',
        complemento: enderecoAtual.complemento || enderecoAtual.compTutor || ''
      }
    });
  };

  // Cancelar edição
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(null);
    setFotoFile(null);
    setFotoPreview(userData.foto || perfilLogado);
  };

  // Lidar com mudanças nos campos editáveis
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('endereco.')) {
      const field = name.split('.')[1];
      setEditData(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [field]: value
        }
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Salvar alterações
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');
      const userId = userData.id;

      if (!token || !userId) {
        throw new Error('Dados de autenticação não encontrados');
      }

      // Preparar dados para atualização
      const updateData = {};

      // Comparar e incluir apenas campos alterados
      if (editData.nome !== userData.nome) {
        if (isTutor) {
          updateData.ncTutor = editData.nome;
        } else if (isClinica) {
          updateData.nomeClinica = editData.nome;
        } else if (isVeterinario) {
          updateData.nomeVeterinario = editData.nome;
        } else if (isAmbulancia) {
          updateData.nomeAmbulancia = editData.nome;
        }
      }
      
      if (isTutor && editData.genero !== userData.genero) {
        updateData.gTutor = editData.genero;
      }
      
      if (editData.email !== userData.email) {
        if (isTutor) {
          updateData.emailTutor = editData.email;
        } else if (isClinica) {
          updateData.emailClinica = editData.email;
        } else if (isVeterinario) {
          updateData.emailVeterinario = editData.email;
        } else if (isAmbulancia) {
          updateData.emailAmbulancia = editData.email;
        }
      }

      // Se tem foto selecionada, converter para base64 e incluir nos dados
      if (fotoFile && fotoPreview) {
        let base64String = fotoPreview;
        if (fotoPreview.includes(',')) {
          base64String = fotoPreview.split(',')[1];
        } else if (!fotoPreview.startsWith('data:')) {
          base64String = fotoPreview;
        }
        
        if (base64String && base64String.length > 0) {
          if (isTutor) {
            updateData.fotoTutor = base64String;
          } else if (isClinica) {
            updateData.fotoClinica = base64String;
          } else if (isVeterinario) {
            updateData.fotoVeterinario = base64String;
          } else if (isAmbulancia) {
            updateData.fotoAmbulancia = base64String;
          }
        }
      }

      // Verificar se há algo para atualizar
      if (Object.keys(updateData).length === 0) {
        alert('Nenhuma alteração foi feita.');
        setIsSaving(false);
        return;
      }

      // Determinar endpoint baseado no tipo de conta
      let url = '';
      if (isTutor) {
        url = `/api/Tutors/${userId}`;
      } else if (isClinica) {
        url = `/api/Clinicas/${userId}`;
      } else if (isVeterinario) {
        url = `/api/Veterinarios/${userId}`;
      } else if (isAmbulancia) {
        url = `/api/Ambulancias/${userId}`;
      }

      // Atualizar dados
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao atualizar: ${response.status} - ${errorText}`);
      }

      const updatedData = await response.json();

      // Atualizar estado local
      const newUserData = {
        ...userData,
        nome: editData.nome || userData.nome,
        genero: editData.genero || userData.genero,
        email: editData.email || userData.email,
        foto: fotoPreview || userData.foto
      };

      setUserData(newUserData);
      setFotoPreview(fotoPreview || userData.foto);
      
      // Atualizar contexto de autenticação
      const userFromStorage = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = {
        ...userFromStorage,
        nome: newUserData.nome,
        email: newUserData.email,
        foto: newUserData.foto
      };
      updateUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Salvar foto no localStorage para o Header usar
      if (newUserData.foto && newUserData.foto !== perfilLogado) {
        localStorage.setItem('userFoto', newUserData.foto);
      }

      // Disparar evento customizado para atualizar a navbar
      window.dispatchEvent(new CustomEvent('userUpdated', { 
        detail: { foto: newUserData.foto } 
      }));

      setIsEditing(false);
      setEditData(null);
      setFotoFile(null);
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao salvar alterações:', err);
      alert(err.message || 'Erro ao salvar alterações. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  // Excluir conta
  const handleDeleteAccount = async () => {
    const confirmMessage = 'Tem certeza que deseja excluir sua conta?\n\nEsta ação não pode ser desfeita e todos os seus dados serão permanentemente removidos.';
    if (!window.confirm(confirmMessage)) {
      return;
    }

    const secondConfirm = window.confirm('ATENÇÃO: Esta é sua última chance de cancelar. Deseja realmente excluir sua conta permanentemente?');
    if (!secondConfirm) {
      return;
    }

    setIsDeleting(true);

    try {
      const token = localStorage.getItem('token');
      const userId = userData?.id || localStorage.getItem('userId');

      if (!token || !userId) {
        throw new Error('Não foi possível identificar sua conta. Faça login novamente.');
      }

      // Determinar endpoint baseado no tipo de conta
      let url = '';
      if (isTutor) {
        url = `/api/Tutors/${userId}`;
      } else if (isClinica) {
        url = `/api/Clinicas/${userId}`;
      } else if (isVeterinario) {
        url = `/api/Veterinarios/${userId}`;
      } else if (isAmbulancia) {
        url = `/api/Ambulancias/${userId}`;
      }

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Conta não encontrada.');
        } else if (response.status === 401) {
          throw new Error('Sessão expirada. Faça login novamente.');
        } else {
          const errorData = await response.text();
          throw new Error(`Erro ao excluir conta: ${response.status}${errorData ? ` - ${errorData}` : ''}`);
        }
      }

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('userFoto');

      logout();
      alert('Sua conta foi excluída com sucesso.');
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      alert(error.message || 'Erro ao excluir conta. Tente novamente.');
      setIsDeleting(false);
    }
  };

  // Funções do Modal do Pet
  const handleAbrirModalPet = (pet) => {
    setModalPet(pet);
    setIsEditingPet(false);
    setPetEditData(null);
    setPetFotoPreview(null);
  };

  const handleFecharModalPet = () => {
    setModalPet(null);
    setIsEditingPet(false);
    setPetEditData(null);
    setPetFotoPreview(null);
  };

  const handleIniciarEdicaoPet = () => {
    if (!modalPet) return;
    
    // Parsear data de nascimento se existir
    let diaNascimento = '';
    let mesNascimento = '';
    let anoNascimento = '';
    
    const dnPet = modalPet.DnPet || modalPet.dnPet || modalPet.dataNascimento;
    if (dnPet) {
      try {
        let dataStr = '';
        if (typeof dnPet === 'string') {
          if (dnPet.includes('-')) {
            // Formato YYYY-MM-DD
            const partes = dnPet.split('-');
            if (partes.length === 3) {
              anoNascimento = partes[0];
              mesNascimento = partes[1];
              diaNascimento = partes[2];
            }
          } else if (dnPet.includes('/')) {
            // Formato DD/MM/YYYY
            const partes = dnPet.split('/');
            if (partes.length === 3) {
              diaNascimento = partes[0];
              mesNascimento = partes[1];
              anoNascimento = partes[2];
            }
          }
        } else if (dnPet instanceof Date) {
          diaNascimento = dnPet.getDate().toString();
          mesNascimento = (dnPet.getMonth() + 1).toString();
          anoNascimento = dnPet.getFullYear().toString();
        }
      } catch (e) {
        console.warn('Erro ao parsear data:', e);
      }
    }

    // Parsear condições preexistentes e medicações
    const cpePet = modalPet.CpePet || modalPet.cpePet || modalPet.condicoesPreexistentes || '';
    const maPet = modalPet.MaPet || modalPet.maPet || modalPet.medicacoesAtuais || '';
    
    const condicoesPreexistentes = cpePet ? (typeof cpePet === 'string' ? cpePet.split(',').map(c => c.trim()).filter(c => c) : cpePet) : [];
    const medicacoesAtuais = maPet ? (typeof maPet === 'string' ? maPet.split(',').map(m => m.trim()).filter(m => m) : maPet) : [];

    setPetEditData({
      NPet: modalPet.NPet || modalPet.nPet || modalPet.nomePet || modalPet.nome || '',
      EspPet: modalPet.EspPet || modalPet.espPet || modalPet.especiePet || modalPet.especie || '',
      RacaPet: modalPet.RacaPet || modalPet.racaPet || modalPet.raca || '',
      diaNascimento,
      mesNascimento,
      anoNascimento,
      CmPet: modalPet.CmPet || modalPet.cmPet || modalPet.microchip || '',
      SexoPet: modalPet.SexoPet || modalPet.sexoPet || modalPet.sexo || 'Macho',
      CasPet: modalPet.CasPet !== undefined ? modalPet.CasPet : (modalPet.casPet !== undefined ? modalPet.casPet : true),
      PortePet: modalPet.PortePet || modalPet.portePet || modalPet.porte || 'Pequeno',
      PeqPet: modalPet.PeqPet || modalPet.peqPet || modalPet.peso || '',
      CorPet: modalPet.CorPet || modalPet.corPet || modalPet.cor || '',
      condicoesPreexistentes,
      medicacoesAtuais
    });

    // Processar foto do pet
    const petFoto = modalPet.FotoPet || modalPet.fotoPet || modalPet.foto || null;
    if (petFoto) {
      setPetFotoPreview(processarFotoPet(petFoto));
    }

    setIsEditingPet(true);
  };

  const handleCancelarEdicaoPet = () => {
    setIsEditingPet(false);
    setPetEditData(null);
    setPetFotoPreview(null);
  };

  const handlePetEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setPetEditData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'condicoesPreexistentes' || name === 'medicacoesAtuais') {
      // Para arrays, não usar handlePetEditChange diretamente
      return;
    } else {
      setPetEditData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePetFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPetFotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const adicionarCondicaoPet = (novaCondicao) => {
    if (novaCondicao.trim()) {
      setPetEditData(prev => ({
        ...prev,
        condicoesPreexistentes: [...(prev.condicoesPreexistentes || []), novaCondicao.trim()]
      }));
    }
  };

  const removerCondicaoPet = (index) => {
    setPetEditData(prev => ({
      ...prev,
      condicoesPreexistentes: prev.condicoesPreexistentes.filter((_, i) => i !== index)
    }));
  };

  const adicionarMedicacaoPet = (novaMedicacao) => {
    if (novaMedicacao.trim()) {
      setPetEditData(prev => ({
        ...prev,
        medicacoesAtuais: [...(prev.medicacoesAtuais || []), novaMedicacao.trim()]
      }));
    }
  };

  const removerMedicacaoPet = (index) => {
    setPetEditData(prev => ({
      ...prev,
      medicacoesAtuais: prev.medicacoesAtuais.filter((_, i) => i !== index)
    }));
  };

  const handleSalvarPet = async () => {
    if (!modalPet || !petEditData) return;

    setIsSavingPet(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      const petId = modalPet.IdPet || modalPet.idPet || modalPet.id;
      if (!petId) {
        throw new Error('ID do pet não encontrado.');
      }

      // Construir data de nascimento
      let dnPet = null;
      if (petEditData.diaNascimento && petEditData.mesNascimento && petEditData.anoNascimento) {
        const dia = parseInt(petEditData.diaNascimento);
        const mes = parseInt(petEditData.mesNascimento);
        const ano = parseInt(petEditData.anoNascimento);
        
        if (dia && mes && ano && dia > 0 && dia <= 31 && mes > 0 && mes <= 12 && ano > 1900) {
          dnPet = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
        }
      }

      // Converter castração para boolean
      const casPet = petEditData.CasPet === true || petEditData.CasPet === 'true';

      // Converter peso para decimal
      const peqPet = petEditData.PeqPet ? parseFloat(petEditData.PeqPet) : null;

      // Processar foto
      let fotoBase64 = null;
      if (petFotoPreview) {
        if (petFotoPreview.includes(',')) {
          fotoBase64 = petFotoPreview.split(',')[1];
        } else {
          fotoBase64 = petFotoPreview;
        }
      }

      // Preparar dados para atualização
      const updateData = {
        NPet: petEditData.NPet || '',
        EspPet: petEditData.EspPet || '',
        RacaPet: petEditData.RacaPet || '',
        CmPet: petEditData.CmPet || '',
        SexoPet: petEditData.SexoPet || 'Macho',
        CasPet: casPet,
        PortePet: petEditData.PortePet || 'Pequeno',
        CorPet: petEditData.CorPet || '',
        CpePet: (petEditData.condicoesPreexistentes || []).join(', ') || '',
        MaPet: (petEditData.medicacoesAtuais || []).join(', ') || ''
      };

      if (dnPet) {
        updateData.DnPetString = dnPet;
      }

      if (peqPet !== null) {
        updateData.PeqPet = peqPet;
      }

      if (fotoBase64) {
        updateData.FotoPet = fotoBase64;
      }

      // Fazer requisição PUT
      const response = await fetch(`/api/Pets/${petId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Pet não encontrado.');
        } else if (response.status === 401) {
          throw new Error('Sessão expirada. Faça login novamente.');
        } else {
          const errorData = await response.text();
          throw new Error(`Erro ao atualizar pet: ${response.status}${errorData ? ` - ${errorData}` : ''}`);
        }
      }

      // Recarregar dados do perfil
      try {
        const userId = localStorage.getItem('userId');
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const currentAccountType = parsedUser.accountType || parsedUser.tipo?.toLowerCase() || 'tutor';
          const currentIsTutor = currentAccountType === 'tutor';

          if (currentIsTutor) {
            const tutorId = parseInt(userId);
            const petsUrl = `/api/Pets/tutor/${tutorId}`;
            const petsResponse = await fetch(petsUrl, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            if (petsResponse.ok) {
              const petsBuscados = await petsResponse.json();
              const petsDoTutor = Array.isArray(petsBuscados) ? petsBuscados : (petsBuscados ? [petsBuscados] : []);
              
              setUserData(prev => ({
                ...prev,
                pets: petsDoTutor.filter(p => p != null && p !== undefined)
              }));
            }
          }
        }
      } catch (err) {
        console.error('Erro ao recarregar pets:', err);
      }

      alert('Pet atualizado com sucesso!');
      setIsEditingPet(false);
      setPetEditData(null);
      setPetFotoPreview(null);
      
      // Atualizar modalPet com os novos dados
      const updatedPet = await response.json().catch(() => null);
      if (updatedPet) {
        setModalPet(updatedPet);
      }
    } catch (error) {
      console.error('Erro ao salvar pet:', error);
      alert(error.message || 'Erro ao salvar alterações do pet. Tente novamente.');
    } finally {
      setIsSavingPet(false);
    }
  };

  const handleExcluirPet = async () => {
    if (!modalPet) return;

    const confirmMessage = 'Tem certeza que deseja excluir este pet?\n\nEsta ação não pode ser desfeita e todos os dados do pet serão permanentemente removidos.';
    if (!window.confirm(confirmMessage)) {
      return;
    }

    setIsDeletingPet(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      const petId = modalPet.IdPet || modalPet.idPet || modalPet.id;
      if (!petId) {
        throw new Error('ID do pet não encontrado.');
      }

      const response = await fetch(`/api/Pets/${petId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Pet não encontrado.');
        } else if (response.status === 401) {
          throw new Error('Sessão expirada. Faça login novamente.');
        } else {
          const errorData = await response.text();
          throw new Error(`Erro ao excluir pet: ${response.status}${errorData ? ` - ${errorData}` : ''}`);
        }
      }

      // Recarregar dados do perfil
      const userId = localStorage.getItem('userId');
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const currentAccountType = parsedUser.accountType || parsedUser.tipo?.toLowerCase() || 'tutor';
        const currentIsTutor = currentAccountType === 'tutor';

        if (currentIsTutor) {
          const tutorId = parseInt(userId);
          const petsUrl = `/api/Pets/tutor/${tutorId}`;
          const petsResponse = await fetch(petsUrl, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (petsResponse.ok) {
            const petsBuscados = await petsResponse.json();
            const petsDoTutor = Array.isArray(petsBuscados) ? petsBuscados : (petsBuscados ? [petsBuscados] : []);
            
            setUserData(prev => ({
              ...prev,
              pets: petsDoTutor.filter(p => p != null && p !== undefined)
            }));
          }
        }
      }

      alert('Pet excluído com sucesso!');
      handleFecharModalPet();
    } catch (error) {
      console.error('Erro ao excluir pet:', error);
      alert(error.message || 'Erro ao excluir pet. Tente novamente.');
    } finally {
      setIsDeletingPet(false);
    }
  };

  // Funções auxiliares
  const formatarCPF = (cpf) => {
    if (!cpf) return '';
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length === 11) {
      return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  };

  const formatarTelefone = (telefone) => {
    if (!telefone) return 'Não informado';
    const telLimpo = telefone.replace(/\D/g, '');
    if (telLimpo.length === 10) {
      return telLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (telLimpo.length === 11) {
      return telLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return telefone;
  };

  const formatarData = (data) => {
    if (!data || data === '' || data === 'null') return 'Não informado';
    try {
      if (typeof data === 'string' && data.includes('-')) {
        const partes = data.split('-');
        if (partes.length === 3) {
          return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
      }
      if (data instanceof Date) {
        return data.toLocaleDateString('pt-BR');
      }
      return data;
    } catch (e) {
      return data;
    }
  };

  // Determinar tipo de conta para exibição
  const getAccountTypeLabel = () => {
    if (isTutor) return 'Tutor';
    if (isClinica) return 'Clínica';
    if (isVeterinario) return 'Veterinário';
    if (isAmbulancia) return 'Ambulância';
    return 'Usuário';
  };

  // Processar foto do pet que vem do banco de dados
  const processarFotoPet = (fotoPet) => {
    if (!fotoPet || fotoPet.trim() === '' || fotoPet === 'null') {
      return perfilLogado;
    }

    const fotoOriginal = fotoPet.trim();
    
    // Se já está no formato data:image, retornar como está
    if (fotoOriginal.startsWith('data:')) {
      return fotoOriginal;
    }
    
    // Se é uma URL HTTP, retornar como está
    if (fotoOriginal.startsWith('http')) {
      return fotoOriginal;
    }
    
    // Se começa com /api/, retornar como está
    if (fotoOriginal.startsWith('/api/')) {
      return fotoOriginal;
    }
    
    // Tentar processar como base64
    const base64String = fotoOriginal.replace(/\s/g, '');
    const base64Regex = /^[A-Za-z0-9+/=]+$/;
    
    // Se parece ser base64 válido (mais de 100 caracteres e passa no regex)
    if (base64String.length > 100 && base64Regex.test(base64String)) {
      return `data:image/jpeg;base64,${base64String}`;
    }
    
    // Se é um caminho curto, tentar buscar via API
    if (fotoOriginal.startsWith('/') && base64String.length < 100) {
      return `/api/Pets/fotos${fotoOriginal}`;
    }
    
    if (!fotoOriginal.startsWith('/') && base64String.length < 100) {
      return `/api/Pets/fotos/${fotoOriginal}`;
    }
    
    // Fallback: retornar a string original ou imagem padrão
    return fotoOriginal || perfilLogado;
  };

  if (loading) {
    return (
      <section className="configuracoes-page">
        <div className="configuracoes-container">
          <div className="loading">Carregando dados do perfil...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="configuracoes-page">
        <div className="configuracoes-container">
          <div className="error-message">
            <h3>Erro ao carregar perfil</h3>
            <p>{error}</p>
            <br />
            <Link to="/login">Fazer login novamente</Link>
          </div>
        </div>
      </section>
    );
  }

  if (!userData) {
    return (
      <section className="configuracoes-page">
        <div className="configuracoes-container">
          <div className="error-message">
            Nenhum dado de usuário encontrado.
            <br />
            <Link to="/login">Fazer login</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="configuracoes-page">
      <div className="configuracoes-container">
        <div className="configuracoes-header">
          <h1 className="configuracoes-titulo">CONFIGURAÇÕES</h1>
          <p className="configuracoes-subtitulo">GERENCIE SUAS INFORMAÇÕES PESSOAIS E PREFERÊNCIAS</p>
        </div>

        <div className="configuracoes-tabs">
          <button
            className={`config-tab ${activeTab === 'perfil' ? 'active' : ''}`}
            onClick={() => setActiveTab('perfil')}
            data-tab="perfil"
          >
            <img src={iconePerfilAvalia} alt="Perfil" />
            <span>PERFIL</span>
          </button>
          {isTutor && (
            <>
          <button
            className={`config-tab ${activeTab === 'historico' ? 'active' : ''}`}
            onClick={() => setActiveTab('historico')}
            data-tab="historico"
          >
            <img src={iconeCalendarioPreto} alt="Histórico" />
            <span>HISTÓRICO</span>
          </button>
          <button
            className={`config-tab ${activeTab === 'pagamento' ? 'active' : ''}`}
            onClick={() => setActiveTab('pagamento')}
            data-tab="pagamento"
          >
            <i className="bi bi-credit-card-2-front-fill"></i>
            <span>PAGAMENTO</span>
          </button>
            </>
          )}
          <button
            className={`config-tab ${activeTab === 'notificacoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notificacoes')}
            data-tab="notificacoes"
          >
            <img src={iconeNotificacao} alt="Notificações" />
            <span>NOTIFICAÇÕES</span>
          </button>
        </div>

        {/* Conteúdo Perfil - Adaptado para diferentes tipos de conta */}
        {activeTab === 'perfil' && (
          <div id="perfil-content" className="config-content active">
            <div className="perfil-card">
              <div className="perfil-card-header">
                <div className="perfil-info">
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img 
                      src={fotoPreview || perfilLogado} 
                      alt={userData.nome || 'Usuário'} 
                      className="perfil-foto" 
                    />
                    {isEditing && (
                      <label 
                        htmlFor="foto-upload" 
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          backgroundColor: '#6B46C1',
                          color: 'white',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          border: '2px solid white',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                        title="Alterar foto"
                      >
                        <i className="bi bi-camera-fill" style={{ fontSize: '16px' }}></i>
                      </label>
                    )}
                    {isEditing && (
                      <input
                        type="file"
                        id="foto-upload"
                        accept="image/*"
                        onChange={handleFotoChange}
                        style={{ display: 'none' }}
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="perfil-nome">{userData.nome || 'Nome não informado'}</h2>
                    <p className="perfil-tipo">{getAccountTypeLabel()}</p>
                  </div>
                </div>
                {!isEditing ? (
                  <button className="btn-editar-perfil" onClick={handleEdit}>
                  <img src={iconeConfirmar} alt="Editar" />
                  <span>Editar Perfil</span>
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      className="btn-editar-perfil" 
                      onClick={handleSave}
                      disabled={isSaving}
                      style={{ backgroundColor: '#10B981' }}
                    >
                      <span>{isSaving ? 'Salvando...' : 'Salvar'}</span>
                    </button>
                    <button 
                      className="btn-editar-perfil" 
                      onClick={handleCancelEdit}
                      disabled={isSaving}
                      style={{ backgroundColor: '#EF4444' }}
                    >
                      <span>Cancelar</span>
                </button>
                  </div>
                )}
              </div>
              <div className="perfil-card-body">
                <div className="perfil-grid">
                  <div className="perfil-campo">
                    <label>Nome {isClinica ? 'da Clínica' : isAmbulancia ? 'da Ambulância' : 'Completo'}</label>
                    <input 
                      type="text" 
                      value={isEditing ? (editData?.nome || '') : (userData.nome || '')} 
                      readOnly={!isEditing}
                      onChange={isEditing ? handleEditChange : undefined}
                      name="nome"
                      disabled={!isEditing}
                    />
                  </div>
                  
                  {isTutor && (
                    <>
                  <div className="perfil-campo">
                    <label>Gênero</label>
                        <select 
                          disabled={!isEditing} 
                          value={isEditing ? (editData?.genero || '') : (userData.genero || '')}
                          onChange={isEditing ? handleEditChange : undefined}
                          name="genero"
                        >
                          <option value="">Selecione</option>
                          <option value="Masculino">Masculino</option>
                          <option value="Feminino">Feminino</option>
                          <option value="Outro">Outro</option>
                          <option value="Prefiro não informar">Prefiro não informar</option>
                    </select>
                  </div>
                  <div className="perfil-campo">
                    <label>CPF</label>
                        <input 
                          type="text" 
                          value={formatarCPF(userData.cpf)} 
                          readOnly 
                        />
                  </div>
                      <div className="perfil-campo">
                        <label>Data de Nascimento</label>
                        <input 
                          type="text" 
                          value={formatarData(userData.dataNascimento)} 
                          readOnly 
                        />
                      </div>
                    </>
                  )}
                  
                  {(isClinica || isAmbulancia) && (
                    <div className="perfil-campo">
                      <label>CNPJ</label>
                      <input 
                        type="text" 
                        value={userData.cnpj || ''} 
                        readOnly 
                      />
                    </div>
                  )}
                  
                  {isVeterinario && (
                    <div className="perfil-campo">
                      <label>CRMV</label>
                      <input 
                        type="text" 
                        value={userData.crmv || ''} 
                        readOnly 
                      />
                    </div>
                  )}
                  
                  <div className="perfil-campo">
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={isEditing ? (editData?.email || '') : (userData.email || '')} 
                      readOnly={!isEditing}
                      onChange={isEditing ? handleEditChange : undefined}
                      name="email"
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="perfil-campo">
                    <label>Telefone</label>
                    <input 
                      type="text" 
                      value={isEditing ? (editData?.telefone ? formatarTelefone(editData.telefone) : '') : formatarTelefone(userData.telefone)} 
                      readOnly={!isEditing}
                      onChange={isEditing ? (e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        handleEditChange({ target: { name: 'telefone', value } });
                      } : undefined}
                      name="telefone"
                      disabled={!isEditing}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Seção de Pets - Apenas para Tutores */}
            {isTutor && (
            <div className="pets-section">
              <div className="pets-section-header">
                <div>
                  <h2 className="pets-section-titulo">MEU(S) PET(S)</h2>
                  <p className="pets-section-subtitulo">GERENCIE AS INFORMAÇÕES DOS SEUS COMPANHEIROS</p>
                </div>
                <Link to="/cadastro-pet" className="btn-cadastrar-pet" style={{textDecoration: 'none', display: 'inline-flex'}}>
                  <span>+</span>
                  <span>Cadastrar Pet</span>
                </Link>
              </div>

                {userData.pets && Array.isArray(userData.pets) && userData.pets.length > 0 ? (
              <div className="pets-grid">
                    {userData.pets.map(pet => {
                      const petNome = pet.NPet || pet.nPet || pet.nomePet || pet.nome || 'Sem nome';
                      const petEspecie = pet.EspPet || pet.espPet || pet.especiePet || pet.especie || 'Não informado';
                      const petRaca = pet.RacaPet || pet.racaPet || pet.raca || 'Não informado';
                      const petFoto = pet.FotoPet || pet.fotoPet || pet.foto || null;
                      const fotoPetProcessada = processarFotoPet(petFoto);
                      
                      return (
                        <div key={pet.IdPet || pet.idPet || pet.id} className="pet-card">
                    <div className="pet-card-header">
                      <div className="pet-info">
                              <img 
                                src={fotoPetProcessada} 
                                alt={petNome} 
                                className="pet-foto"
                                onError={(e) => {
                                  // Se a imagem falhar ao carregar, usar imagem padrão
                                  e.target.src = perfilLogado;
                                }}
                              />
                        <div>
                                <h3 className="pet-nome">{petNome}</h3>
                                <p className="pet-tipo">{petEspecie} - {petRaca}</p>
                        </div>
                      </div>
                      <button className="btn-editar-pet">
                        <img src={iconeConfirmar} alt="Editar" />
                      </button>
                    </div>
                    <div className="pet-card-body">
                      <div className="pet-detalhes">
                        <div className="pet-detalhe-item">
                                <strong>Raça:</strong> {petRaca}
                        </div>
                        <div className="pet-detalhe-item">
                                <strong>Espécie:</strong> {petEspecie}
                        </div>
                      </div>
                            <button 
                              className="btn-mais-detalhes"
                              onClick={() => handleAbrirModalPet(pet)}
                            >
                              Mais Detalhes &gt;
                            </button>
                    </div>
                  </div>
                      );
                    })}
              </div>
                ) : (
                  <div className="no-pets" style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    backgroundColor: '#F9FAFB',
                    borderRadius: '12px',
                    border: '2px dashed #E5E7EB',
                    marginTop: '20px'
                  }}>
                    <p style={{
                      fontSize: '18px',
                      color: '#6B7280',
                      marginBottom: '20px',
                      fontWeight: '500'
                    }}>
                      Nenhum pet cadastrado
                    </p>
                    <Link 
                      to="/cadastro-pet" 
                      className="btn-cadastrar-pet" 
                      style={{
                        textDecoration: 'none', 
                        display: 'inline-flex',
                        backgroundColor: '#7A2FF5',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#6A4C9C';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#7A2FF5';
                      }}
                    >
                      <span style={{ marginRight: '8px', fontSize: '20px' }}>+</span>
                      <span>Cadastrar Primeiro Pet</span>
                    </Link>
            </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Conteúdo Histórico - Apenas para Tutores */}
        {activeTab === 'historico' && isTutor && (
          <div id="historico-content" className="config-content active">
            <div className="historico-card">
              <h2 className="historico-titulo">HISTÓRICO DE SERVIÇOS</h2>
              <p>Histórico de serviços será implementado em breve.</p>
            </div>
          </div>
        )}

        {/* Conteúdo Pagamento - Apenas para Tutores */}
        {activeTab === 'pagamento' && isTutor && (
          <div id="pagamento-content" className="config-content active">
            <h2 className="pagamento-titulo">MÉTODOS DE PAGAMENTO</h2>
            <p>Métodos de pagamento serão implementados em breve.</p>
          </div>
        )}

        {/* Conteúdo Notificações */}
        {activeTab === 'notificacoes' && (
          <div id="notificacoes-content" className="config-content active">
            <div className="notificacoes-card">
              <h2 className="notificacoes-titulo">PREFERÊNCIAS DE NOTIFICAÇÃO</h2>
              
              <div className="notificacao-item">
                <div className="notificacao-info">
                  <div className="notificacao-titulo">E-MAIL DE AGENDAMENTO</div>
                  <div className="notificacao-descricao">RECEBA CONFIRMAÇÕES DE CONSULTAS POR E-MAIL</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notificacoes.emailAgendamento}
                    onChange={() => handleToggleNotificacao('emailAgendamento')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notificacao-item">
                <div className="notificacao-info">
                  <div className="notificacao-titulo">SMS DE LEMBRETE</div>
                  <div className="notificacao-descricao">LEMBRETES DE CONSULTAS 24H ANTES</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notificacoes.smsLembrete}
                    onChange={() => handleToggleNotificacao('smsLembrete')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notificacao-item">
                <div className="notificacao-info">
                  <div className="notificacao-titulo">PUSH DE EMERGÊNCIA</div>
                  <div className="notificacao-descricao">NOTIFICAÇÕES URGENTES SOBRE SEUS PETS</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notificacoes.pushEmergencia}
                    onChange={() => handleToggleNotificacao('pushEmergencia')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
                </div>
              </div>
        )}

        {/* Botão de Excluir Conta */}
        <div style={{ 
          marginTop: '40px', 
          paddingTop: '40px', 
          borderTop: '2px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            style={{
              backgroundColor: isDeleting ? '#9CA3AF' : '#DC2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s ease',
              fontFamily: "'Ysabeau SC', sans-serif",
              opacity: isDeleting ? 0.6 : 1
            }}
          >
            <i className="bi bi-trash-fill" style={{ marginRight: '8px' }}></i>
            {isDeleting ? 'Excluindo...' : 'Excluir Conta'}
          </button>
                </div>
      </div>

      {/* Modal de Detalhes do Pet */}
      {modalPet && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleFecharModalPet();
            }
          }}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div style={{
              backgroundColor: '#7A2FF5',
              padding: '24px',
              borderRadius: '16px 16px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              zIndex: 1
            }}>
              <h2 style={{ color: 'white', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
                {isEditingPet ? 'EDITAR PET' : 'DETALHES DO PET'}
              </h2>
              <button
                onClick={handleFecharModalPet}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '28px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ×
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div style={{ padding: '24px' }}>
              {!isEditingPet ? (
                // Modo Visualização
                <>
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '0 0 auto' }}>
                      <img 
                        src={processarFotoPet(modalPet.FotoPet || modalPet.fotoPet || modalPet.foto || null)} 
                        alt={modalPet.NPet || modalPet.nPet || 'Pet'}
                        style={{
                          width: '150px',
                          height: '150px',
                          borderRadius: '12px',
                          objectFit: 'cover',
                          border: '3px solid #7A2FF5'
                        }}
                        onError={(e) => {
                          e.target.src = perfilLogado;
                        }}
                      />
                    </div>
                    <div style={{ flex: '1 1 300px' }}>
                      <h3 style={{ fontSize: '28px', margin: '0 0 8px 0', color: '#1F2937' }}>
                        {modalPet.NPet || modalPet.nPet || modalPet.nomePet || modalPet.nome || 'Sem nome'}
                      </h3>
                      <p style={{ fontSize: '16px', color: '#6B7280', margin: '0 0 16px 0' }}>
                        {modalPet.EspPet || modalPet.espPet || modalPet.especiePet || modalPet.especie || 'Não informado'} - {modalPet.RacaPet || modalPet.racaPet || modalPet.raca || 'Não informado'}
                      </p>
                      <button
                        onClick={handleIniciarEdicaoPet}
                        style={{
                          backgroundColor: '#7A2FF5',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px 20px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          transition: 'background-color 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#6A4C9C'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#7A2FF5'}
                      >
                        <i className="bi bi-pencil-fill" style={{ marginRight: '8px' }}></i>
                        Editar Pet
                      </button>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '16px',
                    marginBottom: '24px'
                  }}>
                    <div>
                      <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase' }}>Data de Nascimento</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1F2937' }}>
                        {modalPet.DnPet || modalPet.dnPet || modalPet.dataNascimento 
                          ? (() => {
                              try {
                                const data = modalPet.DnPet || modalPet.dnPet || modalPet.dataNascimento;
                                if (typeof data === 'string' && data.includes('-')) {
                                  const partes = data.split('-');
                                  if (partes.length === 3) {
                                    return `${partes[2]}/${partes[1]}/${partes[0]}`;
                                  }
                                }
                                return data;
                              } catch {
                                return modalPet.DnPet || modalPet.dnPet || modalPet.dataNascimento || 'Não informado';
                              }
                            })()
                          : 'Não informado'}
                      </p>
                    </div>
                    <div>
                      <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase' }}>Microchip</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1F2937' }}>
                        {modalPet.CmPet || modalPet.cmPet || modalPet.microchip || 'Não informado'}
                      </p>
                    </div>
                    <div>
                      <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase' }}>Sexo</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1F2937' }}>
                        {modalPet.SexoPet || modalPet.sexoPet || modalPet.sexo || 'Não informado'}
                      </p>
                    </div>
                    <div>
                      <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase' }}>Castrado</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1F2937' }}>
                        {(modalPet.CasPet !== undefined ? modalPet.CasPet : (modalPet.casPet !== undefined ? modalPet.casPet : false)) ? 'Sim' : 'Não'}
                      </p>
                    </div>
                    <div>
                      <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase' }}>Porte</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1F2937' }}>
                        {modalPet.PortePet || modalPet.portePet || modalPet.porte || 'Não informado'}
                      </p>
                    </div>
                    <div>
                      <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase' }}>Peso</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1F2937' }}>
                        {modalPet.PeqPet || modalPet.peqPet || modalPet.peso 
                          ? `${modalPet.PeqPet || modalPet.peqPet || modalPet.peso} kg`
                          : 'Não informado'}
                      </p>
                    </div>
                    <div>
                      <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase' }}>Cor</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1F2937' }}>
                        {modalPet.CorPet || modalPet.corPet || modalPet.cor || 'Não informado'}
                      </p>
                    </div>
                  </div>

                  {(modalPet.CpePet || modalPet.cpePet || modalPet.condicoesPreexistentes) && (
                    <div style={{ marginBottom: '24px' }}>
                      <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Condições Preexistentes</strong>
                      <div style={{ 
                        backgroundColor: '#F9FAFB', 
                        padding: '12px', 
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#1F2937'
                      }}>
                        {(() => {
                          const cpe = modalPet.CpePet || modalPet.cpePet || modalPet.condicoesPreexistentes;
                          if (typeof cpe === 'string') {
                            return cpe || 'Nenhuma';
                          }
                          return Array.isArray(cpe) ? (cpe.length > 0 ? cpe.join(', ') : 'Nenhuma') : 'Nenhuma';
                        })()}
                      </div>
                    </div>
                  )}

                  {(modalPet.MaPet || modalPet.maPet || modalPet.medicacoesAtuais) && (
                    <div style={{ marginBottom: '24px' }}>
                      <strong style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Medicações Atuais</strong>
                      <div style={{ 
                        backgroundColor: '#F9FAFB', 
                        padding: '12px', 
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#1F2937'
                      }}>
                        {(() => {
                          const ma = modalPet.MaPet || modalPet.maPet || modalPet.medicacoesAtuais;
                          if (typeof ma === 'string') {
                            return ma || 'Nenhuma';
                          }
                          return Array.isArray(ma) ? (ma.length > 0 ? ma.join(', ') : 'Nenhuma') : 'Nenhuma';
                        })()}
                      </div>
                    </div>
                  )}

                  <div style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    justifyContent: 'flex-end',
                    marginTop: '24px',
                    paddingTop: '24px',
                    borderTop: '2px solid #E5E7EB'
                  }}>
                    <button
                      onClick={handleExcluirPet}
                      disabled={isDeletingPet}
                      style={{
                        backgroundColor: isDeletingPet ? '#9CA3AF' : '#DC2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: isDeletingPet ? 'not-allowed' : 'pointer',
                        textTransform: 'uppercase',
                        transition: 'background-color 0.3s'
                      }}
                    >
                      <i className="bi bi-trash-fill" style={{ marginRight: '8px' }}></i>
                      {isDeletingPet ? 'Excluindo...' : 'Excluir Pet'}
                    </button>
                  </div>
                </>
              ) : (
                // Modo Edição
                <>
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '0 0 auto', position: 'relative' }}>
                      <img 
                        src={petFotoPreview || processarFotoPet(modalPet.FotoPet || modalPet.fotoPet || modalPet.foto || null)} 
                        alt={modalPet.NPet || 'Pet'}
                        style={{
                          width: '150px',
                          height: '150px',
                          borderRadius: '12px',
                          objectFit: 'cover',
                          border: '3px solid #7A2FF5'
                        }}
                        onError={(e) => {
                          e.target.src = perfilLogado;
                        }}
                      />
                      <label
                        style={{
                          position: 'absolute',
                          bottom: '8px',
                          right: '8px',
                          backgroundColor: '#7A2FF5',
                          color: 'white',
                          borderRadius: '50%',
                          width: '36px',
                          height: '36px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        <i className="bi bi-camera-fill"></i>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePetFotoChange}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                    <div style={{ flex: '1 1 300px' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Nome do Pet</label>
                        <input
                          type="text"
                          name="NPet"
                          value={petEditData?.NPet || ''}
                          onChange={handlePetEditChange}
                          style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #D1D5DB',
                            fontSize: '16px'
                          }}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Espécie</label>
                          <input
                            type="text"
                            name="EspPet"
                            value={petEditData?.EspPet || ''}
                            onChange={handlePetEditChange}
                            style={{
                              width: '100%',
                              padding: '10px',
                              borderRadius: '8px',
                              border: '1px solid #D1D5DB',
                              fontSize: '16px'
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Raça</label>
                          <input
                            type="text"
                            name="RacaPet"
                            value={petEditData?.RacaPet || ''}
                            onChange={handlePetEditChange}
                            style={{
                              width: '100%',
                              padding: '10px',
                              borderRadius: '8px',
                              border: '1px solid #D1D5DB',
                              fontSize: '16px'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '16px',
                    marginBottom: '24px'
                  }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Data de Nascimento</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                        <input
                          type="number"
                          name="diaNascimento"
                          value={petEditData?.diaNascimento || ''}
                          onChange={handlePetEditChange}
                          placeholder="Dia"
                          min="1"
                          max="31"
                          style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #D1D5DB',
                            fontSize: '16px'
                          }}
                        />
                        <input
                          type="number"
                          name="mesNascimento"
                          value={petEditData?.mesNascimento || ''}
                          onChange={handlePetEditChange}
                          placeholder="Mês"
                          min="1"
                          max="12"
                          style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #D1D5DB',
                            fontSize: '16px'
                          }}
                        />
                        <input
                          type="number"
                          name="anoNascimento"
                          value={petEditData?.anoNascimento || ''}
                          onChange={handlePetEditChange}
                          placeholder="Ano"
                          min="1900"
                          max={new Date().getFullYear()}
                          style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #D1D5DB',
                            fontSize: '16px'
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Microchip</label>
                      <input
                        type="text"
                        name="CmPet"
                        value={petEditData?.CmPet || ''}
                        onChange={handlePetEditChange}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Sexo</label>
                      <select
                        name="SexoPet"
                        value={petEditData?.SexoPet || 'Macho'}
                        onChange={handlePetEditChange}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          fontSize: '16px'
                        }}
                      >
                        <option value="Macho">Macho</option>
                        <option value="Fêmea">Fêmea</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Castrado</label>
                      <select
                        name="CasPet"
                        value={petEditData?.CasPet ? 'true' : 'false'}
                        onChange={(e) => handlePetEditChange({ target: { name: 'CasPet', value: e.target.value === 'true' } })}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          fontSize: '16px'
                        }}
                      >
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Porte</label>
                      <select
                        name="PortePet"
                        value={petEditData?.PortePet || 'Pequeno'}
                        onChange={handlePetEditChange}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          fontSize: '16px'
                        }}
                      >
                        <option value="Pequeno">Pequeno</option>
                        <option value="Médio">Médio</option>
                        <option value="Grande">Grande</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Peso (kg)</label>
                      <input
                        type="number"
                        name="PeqPet"
                        value={petEditData?.PeqPet || ''}
                        onChange={handlePetEditChange}
                        step="0.1"
                        min="0"
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Cor</label>
                      <input
                        type="text"
                        name="CorPet"
                        value={petEditData?.CorPet || ''}
                        onChange={handlePetEditChange}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Condições Preexistentes</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="text"
                        placeholder="Adicionar condição"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            adicionarCondicaoPet(e.target.value);
                            e.target.value = '';
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          fontSize: '16px'
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.target.parentElement.querySelector('input[type="text"]');
                          if (input && input.value.trim()) {
                            adicionarCondicaoPet(input.value);
                            input.value = '';
                          }
                        }}
                        style={{
                          backgroundColor: '#7A2FF5',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px 20px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Adicionar
                      </button>
                    </div>
                    <div style={{ 
                      backgroundColor: '#F9FAFB', 
                      padding: '12px', 
                      borderRadius: '8px',
                      minHeight: '40px'
                    }}>
                      {(petEditData?.condicoesPreexistentes || []).length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {petEditData.condicoesPreexistentes.map((condicao, index) => (
                            <span
                              key={index}
                              style={{
                                backgroundColor: '#E5E7EB',
                                padding: '6px 12px',
                                borderRadius: '16px',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}
                            >
                              {condicao}
                              <button
                                type="button"
                                onClick={() => removerCondicaoPet(index)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#6B7280',
                                  cursor: 'pointer',
                                  fontSize: '18px',
                                  padding: 0,
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: '#9CA3AF', fontSize: '14px' }}>Nenhuma condição adicionada</span>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Medicações Atuais</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="text"
                        placeholder="Adicionar medicação"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            adicionarMedicacaoPet(e.target.value);
                            e.target.value = '';
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          fontSize: '16px'
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.target.parentElement.querySelector('input[type="text"]');
                          if (input && input.value.trim()) {
                            adicionarMedicacaoPet(input.value);
                            input.value = '';
                          }
                        }}
                        style={{
                          backgroundColor: '#7A2FF5',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px 20px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Adicionar
                      </button>
                    </div>
                    <div style={{ 
                      backgroundColor: '#F9FAFB', 
                      padding: '12px', 
                      borderRadius: '8px',
                      minHeight: '40px'
                    }}>
                      {(petEditData?.medicacoesAtuais || []).length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {petEditData.medicacoesAtuais.map((medicacao, index) => (
                            <span
                              key={index}
                              style={{
                                backgroundColor: '#E5E7EB',
                                padding: '6px 12px',
                                borderRadius: '16px',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}
                            >
                              {medicacao}
                              <button
                                type="button"
                                onClick={() => removerMedicacaoPet(index)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#6B7280',
                                  cursor: 'pointer',
                                  fontSize: '18px',
                                  padding: 0,
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: '#9CA3AF', fontSize: '14px' }}>Nenhuma medicação adicionada</span>
                      )}
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    justifyContent: 'flex-end',
                    marginTop: '24px',
                    paddingTop: '24px',
                    borderTop: '2px solid #E5E7EB'
                  }}>
                    <button
                      onClick={handleCancelarEdicaoPet}
                      disabled={isSavingPet}
                      style={{
                        backgroundColor: '#F3F4F6',
                        color: '#374151',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        transition: 'background-color 0.3s'
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSalvarPet}
                      disabled={isSavingPet}
                      style={{
                        backgroundColor: isSavingPet ? '#9CA3AF' : '#7A2FF5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: isSavingPet ? 'not-allowed' : 'pointer',
                        textTransform: 'uppercase',
                        transition: 'background-color 0.3s'
                      }}
                    >
                      {isSavingPet ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Perfil;
