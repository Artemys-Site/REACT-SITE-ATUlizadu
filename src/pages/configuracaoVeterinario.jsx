import React, { useState, useRef } from 'react';
import { 
    Upload, Save, Plus, ChevronRight, Dog, Cat, MapPin, 
    Phone, Clock, Calendar, CheckCircle, User, Briefcase, 
    DollarSign, Bell, CreditCard, Edit, Trash2, Mail, PhoneCall, Smartphone 
} from 'lucide-react';
import './ConfiguracaoVeterinario.css'; 
import veterinariaLauraimg from '../assets/veterinariaLauraimg.jpg';


// --- Componentes Reutilizáveis e Dados Iniciais ---

const initialServices = [
    { id: 1, name: 'Consulta Cardiológica', duration: '45 min', price: 200.00 },
    { id: 2, name: 'Ecocardiograma', duration: '60 min', price: 350.00 },
    { id: 3, name: 'Eletrocardiograma', duration: '30 min', price: 180.00 },
    { id: 4, name: 'Consulta Online', duration: '30 min', price: 150.00 },
    { id: 5, name: 'Retorno', duration: '30 min', price: 100.00 },
];

const ServiceModal = ({ service, onClose, onSave }) => {
    const isEditing = !!service;
    const [name, setName] = useState(isEditing ? service.name : '');
    const [duration, setDuration] = useState(isEditing ? service.duration : '');
    const [price, setPrice] = useState(isEditing ? service.price : '');

    const handleSubmit = () => {
        if (!name || !duration || !price) return;
        
        onSave({ 
            id: isEditing ? service.id : Date.now(), 
            name, 
            duration, 
            price: parseFloat(price) 
        });
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>{isEditing ? 'Editar Serviço' : 'Novo Serviço'}</h2>
                <button className="close-modal" onClick={onClose}>&times;</button>
                
                <div className="input-group">
                    <label>Nome do Serviço</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Duração</label>
                    <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Preço (R$)</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className="modal-actions">
                    <button className="cancel-button" onClick={onClose}>Cancelar</button>
                    <button className="save-modal-button" onClick={handleSubmit}>
                        {isEditing ? 'Salvar Alterações' : 'Criar Serviço'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Componente de Item de Notificação (COM APENAS 2 TOGGLES E ÍCONES)
const NotificationItem = ({ title, subtitle, isFinancial = false }) => (
    <div className={`method-item notification-item ${isFinancial ? 'finance-highlight' : ''}`}>
        <div className="method-info">
            <h4>{title}</h4>
            <p className="subtitle">{subtitle}</p>
        </div>
        
        <div className="notification-options">
            {/* Toggle 1: Email */}
            <div className="toggle-group">
                <Mail size={16} className="notification-icon mail-icon" />
                <label className="toggle-switch small-toggle">
                    <input type="checkbox" defaultChecked={true} />
                    <span className="slider round"></span>
                </label>
            </div>
            {/* Toggle 2: Chamada/App (O ícone PhoneCall é usado para replicar o segundo ícone da imagem) */}
            <div className="toggle-group">
                <PhoneCall size={16} className="notification-icon call-icon" />
                <label className="toggle-switch small-toggle">
                    <input type="checkbox" defaultChecked={true} />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    </div>
);


// ---------------------------------------------------------------------------------
// --- CONTEÚDO DAS ABAS ---
// ---------------------------------------------------------------------------------

// A. Conteúdo da Aba Perfil
const PerfilContent = () => {
    const fileInputRef = useRef(null);
    const initialImagePath = veterinariaLauraimg; 
    const [profileImage, setProfileImage] = useState(initialImagePath); 

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl); 
        }
    };

    return (
        <div className="content-container">
            <div className="section">
                <h3>Informações Pessoais</h3>
                <div className="profile-header">
                    <img src={profileImage} alt="Perfil" className="profile-pic" />
                    <div>
                       <button className="alt-foto-button" onClick={handleButtonClick}>
    <Upload className="icon-upload-perfil" /> 
    Alterar Foto
</button>
                        <p className="formats-info">Formatos aceitos: JPG, PNG ou GIF (máx. 5MB)</p>
                        
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png,.gif"
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                
                <div className="form-grid profile-grid">
                    <div className="input-group"><label>Nome Completo</label><input type="text" defaultValue="Laura Carvalho" /></div>
                    <div className="input-group"><label>Email</label><input type="email" defaultValue="laura.carvalho@arteiave.com" /></div>
                    <div className="input-group"><label>Telefone</label><input type="text" defaultValue="(11) 98765-4321" /></div>
                    <div className="input-group"><label>Whatsapp</label><input type="text" defaultValue="(11) 98765-4321" /></div>
                    <div className="input-group full-width"><label>Endereço</label><input type="text" defaultValue="Rua das Flores, 123 - São Paulo, SP" /></div>
                    <div className="input-group full-width"><label>Biografia</label><textarea rows="3" defaultValue="Conte um pouco sobre você e sua experiência..."></textarea></div>
                </div>
            </div>

            <div className="section security-section">
                <h3 className="orange-text">Segurança</h3>
                <div className="form-grid security-grid">
                    <div className="input-group"><label>Senha Atual</label><input type="password" /></div>
                    <div className="input-group"><label>Nova Senha</label><input type="password" /></div>
                </div>
                <button className="alt-auth-button">Ativar Autenticação em Dois Fatores</button>
            </div>
        </div>
    );
};

// B. Conteúdo da Aba Profissional
const ProfissionalContent = () => {
    const [specializations, setSpecializations] = useState([
        'Ecocardiografia', 
        'Cardiologia Intervencionista'
    ]);
    const [newSpecialization, setNewSpecialization] = useState('');

    const handleAddSpecialization = () => {
        const trimmedSpec = newSpecialization.trim();
        
        if (trimmedSpec && !specializations.includes(trimmedSpec)) {
            setSpecializations([...specializations, trimmedSpec]);
            setNewSpecialization('');
        }
    };
    
    const handleRemoveSpecialization = (specToRemove) => {
        setSpecializations(specializations.filter(spec => spec !== specToRemove));
    };

    return (
        <div className="content-container">
            <div className="section">
                <h3>Informações Profissionais</h3>
                <div className="form-grid">
                    <div className="input-group"><label>CRMV</label><input type="text" defaultValue="SP-12345" /></div>
                    <div className="input-group"><label>Especialidade Principal</label><input type="text" defaultValue="Cardiologia" /></div>
                    <div className="input-group"><label>Formação</label><input type="text" defaultValue="USP - Medicina Veterinária" /></div>
                    <div className="input-group"><label>Ano de Formação</label><input type="number" defaultValue="2015" /></div>
                    
                    <div className="input-group full-width">
                        <label>Especializações Adicionais</label>
                        <div className="tags-container">
                            {/* Tags existentes */}
                            {specializations.map(spec => (
                                <span className="tag" key={spec}>
                                    {spec} 
                                    <button 
                                        type="button" 
                                        className="remove-tag-button"
                                        onClick={() => handleRemoveSpecialization(spec)}
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                            
                            {/* Input para digitação da nova tag */}
                            <input 
                                type="text"
                                placeholder="Nova Especialidade..."
                                value={newSpecialization}
                                onChange={(e) => setNewSpecialization(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddSpecialization();
                                    }
                                }}
                                className="tag-input"
                            />
                            
                            {/* Botão "+ Adicionar" */}
                            <button 
                                type="button"
                                className="add-tag-button"
                                onClick={handleAddSpecialization}
                            >
                                + Adicionar
                            </button>
                        </div>
                    </div>
                    
                    <div className="input-group full-width">
                        <label>Experiência Profissional</label>
                        <textarea rows="3" placeholder="Descreva sua experiência profissional..."></textarea>
                    </div>
                </div>
            </div>
            <div className="section telemedicine-section">
                <h3>Telemedicina</h3>
                <p>Configure suas preferências para atendimento online</p>
                <div className="telemedicina-config">
                    <div className="method-item">
                        <div className="method-info">
                            <h4>Atendimento Online</h4>
                            <p className="subtitle">Permitir consultas por vídeo-chamada</p>
                        </div>
                        <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="form-grid small-grid">
                        <div className="input-group"><label>Duração Padrão (min)</label><input type="number" defaultValue="30" /></div>
                        <div className="input-group"><label>Valor Consulta Online</label><input type="text" defaultValue="R$ 150,00" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// C. Conteúdo da Aba Horários
const HorariosContent = () => (
    <div className="content-container">
        <div className="section">
            <h3>Horários de Atendimento</h3>
            <p>Configure seus horários disponíveis para consultas</p>
            
            {['Segunda-feira', 'Terça-feira', 'Quinta-feira', 'Quarta-feira', 'Sexta-feira', 'Sábado'].map(day => (
                <div className="schedule-item" key={day}>
                    <div className="schedule-day">
                        <label className="toggle-switch small-toggle">
                            <input type="checkbox" defaultChecked />
                            <span className="slider round"></span>
                        </label>
                        <span>{day}</span>
                    </div>
                    <div className="schedule-hours">
                        <input type="text" defaultValue="8h00" />
                        <span>até</span>
                        <input type="text" defaultValue="18h00" />
                    </div>
                    <span className="active-status">Ativo</span>
                </div>
            ))}
             <div className="schedule-item">
                <div className="schedule-day">
                    <label className="toggle-switch small-toggle">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                    <span>Domingo</span>
                </div>
                <div className="schedule-hours">
                    <input type="text" defaultValue="Não Atende" disabled />
                </div>
                <span className="inactive-status">Inativo</span>
            </div>
        </div>
        <div className="section config-agenda">
            <h3>Configurações de Agenda</h3>
            <div className="form-grid small-grid">
                <div className="input-group"><label>Intervalo entre consultas (min)</label><input type="text" defaultValue="30 minutos" /></div>
                <div className="input-group"><label>Antecedência Máxima (horas)</label><input type="text" defaultValue="32 horas" /></div>
            </div>
        </div>
    </div>
);


// D. Conteúdo da Aba Serviços
const ServicosContent = () => {
    const [services, setServices] = useState(initialServices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const handleOpenEdit = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleOpenNew = () => {
        setSelectedService(null);
        setIsModalOpen(true);
    };

    const handleSave = (newService) => {
        if (selectedService) {
            setServices(services.map(s => s.id === newService.id ? newService : s));
        } else {
            setServices([...services, newService]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
            setServices(services.filter(service => service.id !== id));
        }
    };

    const formatPrice = (price) => `R$ ${price.toFixed(2).replace('.', ',')}`;

    return (
        <div className="servicos-content content-container">
            <div className="section services-list">
                <h3>Serviços & Preços</h3>
                <p>Configure os serviços que você oferece e seus valores</p>
                
                <button className="new-service-button" onClick={handleOpenNew}><Plus size={16} style={{marginRight: 4}}/> Novo Serviço</button>

                {services.map(service => (
                    <div className="service-item" key={service.id}>
                        <div className="service-info">
                             <label className="toggle-switch small-toggle">
                                <input type="checkbox" defaultChecked />
                                <span className="slider round"></span>
                             </label>
                            <span className="name">{service.name}</span>
                            <span className="duration">Duração: {service.duration}</span>
                        </div>
                        <div className="service-actions">
                            <span className="price">{formatPrice(service.price)}</span>
                            <button className="icon-button" onClick={() => handleOpenEdit(service)}>
                                <Edit size={16} />
                            </button>
                            <button className="icon-button trash-icon" onClick={() => handleDelete(service.id)}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {isModalOpen && (
                <ServiceModal 
                    service={selectedService} 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

// E. Conteúdo da Aba Financeiro
const FinanceiroContent = () => (
    <div className="financeiro-content content-container">
      <div className="section bank-data">
        <h3>Dados Bancários</h3>
        <p>Configure sua conta para receber pagamentos</p>
        <div className="form-grid">
          <div className="input-group"><label>Banco</label><input type="text" defaultValue="Banco do Brasil" readOnly /></div>
          <div className="input-group"><label>Tipo de Conta</label><input type="text" defaultValue="Conta Corrente" readOnly /></div>
          <div className="input-group"><label>Agência</label><input type="text" defaultValue="1233-1" readOnly /></div>
          <div className="input-group"><label>Conta</label><input type="text" defaultValue="123456-0" readOnly /></div>
          <div className="input-group full-width"><label>Chave PIX</label><input type="email" defaultValue="laura.carvalho@arteiave.com" readOnly /></div>
        </div>

        <div className="verification-status verified">
          <CheckCircle size={16} style={{marginRight: 5}}/> Seus dados bancários foram validados com sucesso
        </div>
      </div>

      <div className="section payment-methods">
        <h3>Métodos de Pagamento</h3>
        <p>Escolha como você deseja receber pagamentos</p>
        
        <div className="method-item">
          <div className="method-info">
            <h4>PIX</h4>
            <p className="subtitle">Receba instantaneamente</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="method-item">
          <div className="method-info">
            <h4>Transferência</h4>
            <p className="subtitle">Transferência Bancária</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
);

// F. Conteúdo da Aba Notificações
const NotificacoesContent = () => (
    <div className="notificacoes-content content-container">
      <div className="section">
        <h3>Preferências de Notificação</h3>
        <p>Escolha como e quando deseja receber notificações</p>

        {/* Consultas e Agendamentos */}
        <div className="category-group consult-group">
            <h4 className="category-title">Consultas e Agendamentos</h4>
            <NotificationItem title="Nova Consulta Agendada" subtitle="Notificar quando uma nova consulta for marcada"/>
            <NotificationItem title="Cancelamento de Consulta" subtitle="Notificar quando uma consulta for cancelada"/>
            <NotificationItem title="Lembrete de Consulta" subtitle="Lembrete 1 hora antes da consulta"/>
            <NotificationItem title="Confirmação de Presença" subtitle="Quando o tutor confirmar presença"/>
        </div>

        {/* Financeiro (Removido Relatório Mensal) */}
        <div className="category-group finance-group no-border-top">
            <h4 className="category-title green-text">Financeiro</h4>
            <NotificationItem title="Pagamento Recebido" subtitle="Notificar quando receber um pagamento" isFinancial={true}/>
        </div>

        {/* Sistema */}
        <div className="category-group">
            <h4 className="category-title">Sistema</h4>
            <NotificationItem title="Atualizações da Plataforma" subtitle="Novidades e recursos do Artemisys"/>
            <NotificationItem title="Dicas e Sugestões" subtitle="Conteúdos selecionados para veterinários"/>
        </div>
      </div>
    </div>
);


// ---------------------------------------------------------------------------------
// --- COMPONENTE PRINCIPAL (ConfiguracaoVeterinario) ---
// ---------------------------------------------------------------------------------

const contentMap = {
    Perfil: PerfilContent,
    Profissional: ProfissionalContent,
    Horários: HorariosContent,
    Serviços: ServicosContent,
    Financeiro: FinanceiroContent,
    Notificações: NotificacoesContent,
};

const ConfiguracaoVeterinario = () => {
    const [activeTab, setActiveTab] = useState('Perfil');
    const TabContent = contentMap[activeTab];

    const tabs = [
        { id: 'Perfil', icon: <User size={16} style={{marginRight: 8}}/> },
        { id: 'Profissional', icon: <Briefcase size={16} style={{marginRight: 8}}/> },
        { id: 'Horários', icon: <Clock size={16} style={{marginRight: 8}}/> },
        { id: 'Serviços', icon: <DollarSign size={16} style={{marginRight: 8}}/> },
        { id: 'Financeiro', icon: <CreditCard size={16} style={{marginRight: 8}}/> },
        { id: 'Notificações', icon: <Bell size={16} style={{marginRight: 8}}/> },
    ];

    return (
        <div className="system-settings-page">
            <header className="page-header">
                <div className="header-info">
                    <h1>CONFIGURAÇÕES DO SISTEMA</h1>
                    <p>GERENCIE SEU PERFIL PROFISSIONAL E PREFERÊNCIAS DA PLATAFORMA</p>
                </div>
                <button className="save-button"><Save className="icon-salvar" /> Salvar Alterações</button>
            </header>
            
            <nav className="tab-navigation">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon} {tab.id}
                    </button>
                ))}
            </nav>

            <main className="tab-content">
                <TabContent />
            </main>
        </div>
    );
};

export default ConfiguracaoVeterinario;