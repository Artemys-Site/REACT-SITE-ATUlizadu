import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './prontuarioVeterinario.css';

// --- DADOS MOCKADOS INICIAIS (3 consultas, CORRIGIDO) ---
const dadosIniciaisPaciente = {
    // DADOS DE IDENTIFICAÇÃO BÁSICOS
    nome: "Bob",
    rga: "RGA-2020-001234",
    especie: "Canino",
    raca: "Golden Retriever",
    genero: "Macho - Castrado",
    idade: "5 anos",
    peso: "30kg",
    
    urlImagem: null,
    
    // DADOS ADICIONAIS PARA A ABA 'DADOS CADASTRAIS'
    microchip: "982000123456789",
    dataNascimento: "15/05/2020",
    corPelagem: "Dourado",
    pesoInicial: "25kg",
    aspectoPelagem: "Brilhante",
    temperamento: "Dócil e brincalhão",
    habitat: "Vive dentro de casa",
    rotina: "Passeia duas vezes ao dia. Alimentação às 8h e 18h.",
    alergias: ["Frango", "Corante artificial"],
    
    // DADOS DO TUTOR
    tutor: "João Victor Lima",
    tutorCpf: "123.456.789-00",
    tutorRg: "12.345.678-9",
    telefonePrincipal: "(11) 98765-4321",
    telefoneSecundario: "(11) 3456-7890",
    emailTutor: "joao.lima@email.com",
    endereco: "Rua das Flores, 123, Jardim Primavera, São Paulo - SP - 01234-567",

    // HISTÓRICOS (Lista de Consultas - CORRIGIDA E COMPLETA)
    listaConsultas: [
        {
            id: 1,
            data: "01/12/2025",
            vet: "Dr. Carlos Silva",
            motivo: "Consulta de rotina",
            tempExame: "38.5°C", fcExame: "90 bpm", frExame: "24 rpm",
            mucosasExame: "Róseas e úmidas", hidratacaoExame: "Normal", geralExame: "Ideal (5/9)",
            diagnostico: "Animal saudável",
            tratamento: "Manutenção da dieta e exercícios",
            prescricao: null,
            posAtendimento: "Manter dieta atual. Retornar em caso de alterações.",
            notasVet: "Peso: 30kg. Comportamento ativo e saudável.",
            documentos: [],
        },
        {
            id: 2,
            data: "19/11/2025",
            vet: "Dra. Ana Paula",
            motivo: "Exames preventivos",
            tempExame: "38.3°C", fcExame: "88 bpm", frExame: "22 rpm",
            mucosasExame: "Róseas", hidratacaoExame: "Normal", geralExame: "Não informado",
            diagnostico: "Check-up anual",
            tratamento: "Hemograma solicitado",
            prescricao: null,
            posAtendimento: "Aguardar resultados dos exames para conduta final.",
            notasVet: "Solicitado hemograma completo e bioquímico para avaliação geral.",
            documentos: [
                { nome: "pedido_hemograma_20112025.pdf", link: "#" },
                { nome: "pedido_bioquimico_20112025.pdf", link: "#" }
            ],
        },
        {
            id: 3,
            data: "14/10/2025",
            vet: "Dr. Carlos Silva",
            motivo: "Tosse persistente",
            tempExame: "39.2°C", fcExame: "110 bpm", frExame: "32 rpm",
            mucosasExame: "Róseas", hidratacaoExame: "Levemente desidratado", geralExame: "Não informado",
            diagnostico: "Infecção respiratória leve",
            tratamento: "Antibiótico por 7 dias",
            prescricao: "Amoxicilina 500mg - 1 comp, 2x/dia, por 7 dias.",
            posAtendimento: "Oferecer água fresca constantemente. Retornar se sintomas piorarem.",
            notasVet: "Prescrição: Amoxicilina 500mg, 2x ao dia",
            documentos: [],
        },
    ],
    listaVacinas: [
        { id: 1, nome: "V8 (Polivalente)", data: "16/11/2025", proximaData: "16/11/2026", lote: "ABC1234" },
        { id: 2, nome: "Raiva", data: "16/11/2025", proximaData: "16/11/2026", lote: "XYZ9876" },
    ],
    listaVermifugacao: [
        { id: 1, medicamento: "Drontal Plus", data: "01/10/2025", proximaData: "01/01/2026", dose: "1 comprimido" },
    ],
    listaExames: [
        { id: 1, nome: "Hemograma Completo", data: "16/11/2025", resultado: "Normal", observacoes: "Todos os valores dentro do esperado" },
        { id: 2, nome: "Raio-X Tórax", data: "14/10/2025", resultado: "Sem alteração", observacoes: "Estrutura pulmonar normal" },
    ],
    listaCirurgias: [
        { id: 1, nome: 'Castração', data: '19 de outubro de 2025', observacoes: 'Procedimento realizado sem intercorrências' },
    ],
    listaProblemas: [
        { id: 1, nome: 'Displasia Coxofemoral Grau I', diagnosticadoEm: '14/03/2024', status: 'Controlado', tratamento: 'Tratamento com suplementação (Condroitina + Glicosamina) e fisioterapia semanal' },
    ],
};

// --- SIMULAÇÃO DO USUÁRIO LOGADO ---
const VET_LOGADO = {
    vet: 'Dr. Carlos Silva', crmv: 'CRMV-SP 12345', clinicName: 'Clínica Veterinária Artemys',
    clinicAddress: 'Rua das Flores, 456, São Paulo - SP', clinicPhone: '(11) 3456-7890', clinicCrmv: 'CRMV-SP 001234',
};

// --- DADOS INICIAIS DOS FORMULÁRIOS DE ADIÇÃO (CHAVES PADRONIZADAS) ---
const cirurgiaInicial = { procedimento: '', data: '', observacoes: '' };
const problemaInicial = { nome: '', dataDiagnostico: '', status: '', tratamento: '' }; 
const consultaInicial = {
    data: '', motivo: '', meio: '',
    tempExame: '', fcExame: '', frExame: '',
    mucosasExame: '', hidratacaoExame: '', geralExame: '',
    obsExame: '',
    diagnostico: '', tratamento: '', prescricao: '', posAtendimento: '', notasVet: '',
    queixaPrincipal: '' // Adicionado para desambiguação
};
const vacinaInicial = { nome: '', data: '', proximaData: '', lote: '' };
const exameInicial = { nome: '', data: '', resultado: '', observacoes: '' };
const vermifugacaoInicial = { nome: '', tipo: '', data: '', proximaData: '' };

// Componente CampoFormulario - FORA do componente principal para evitar recriação
const CampoFormulario = ({ rotulo, nome, valor, aoMudar, placeholder, requerido = false, tipo = "text", areaTexto = false, somenteLeitura = false }) => (
    <div className="campo-formulario">
        <label className={somenteLeitura ? 'rotulo-somente-leitura' : ''}>{rotulo} {requerido && '*'}</label>
        {areaTexto ? (
            <textarea
                name={nome}
                value={valor || ''}
                onChange={aoMudar}
                placeholder={placeholder}
                required={requerido}
                rows="4"
                readOnly={somenteLeitura}
                className={somenteLeitura ? 'input-somente-leitura' : ''}
            />
        ) : (
            <input
                type={tipo}
                name={nome}
                value={valor || ''}
                onChange={aoMudar}
                placeholder={placeholder}
                required={requerido}
                readOnly={somenteLeitura}
                className={somenteLeitura ? 'input-somente-leitura' : ''}
            />
        )}
    </div>
);

const ProntuarioVeterinario = ({ tipoUsuarioLogado = 'veterinario' }) => {
    // Hook de navegação
    const navigate = useNavigate();
    
    // Tipo de usuário vem do backend via props (ou contexto de autenticação)
    // Valores possíveis: 'veterinario' ou 'tutor'
    const tipoUsuario = tipoUsuarioLogado;
    
    // Permissões baseadas no tipo de usuário
    const isVeterinario = tipoUsuario === 'veterinario';
    const isTutor = tipoUsuario === 'tutor';

    // Renomeando estados
    const [abaAtiva, setAbaAtiva] = useState('data');
    const [dadosPaciente, setDadosPaciente] = useState(dadosIniciaisPaciente);
    const [mostrarFormulario, setMostrarFormulario] = useState(null);

    // --- ESTADOS DOS NOVOS FORMULÁRIOS ---
    const [novaCirurgia, setNovaCirurgia] = useState(cirurgiaInicial);
    // CORREÇÃO: Variável e Setter renomeados de 'novoProblemo' para 'novoProblema'
    const [novoProblema, setNovoProblema] = useState(problemaInicial);
    const [novaConsulta, setNovaConsulta] = useState(consultaInicial);
    const [novaVacina, setNovaVacina] = useState(vacinaInicial);
    const [novoExame, setNovoExame] = useState(exameInicial);
    const [novaVermifugacao, setNovaVermifugacao] = useState(vermifugacaoInicial);
    
    // Estado para documentos anexados à consulta (pedidos de exame)
    const [documentosConsulta, setDocumentosConsulta] = useState([]);
    // Estado para documentos de prescrição
    const [documentosPrescricao, setDocumentosPrescricao] = useState([]);
    // Estado para controlar qual consulta está expandida
    const [consultaExpandida, setConsultaExpandida] = useState(null);

    // Função para alternar expansão da consulta
    const toggleConsulta = (id) => {
        setConsultaExpandida(prev => prev === id ? null : id);
    };

    // --- HANDLERS DE MUDANÇA (CHANGE) ---
    // MANTIDO: Funções de mudança que garantem a atualização do estado
    const handleCirurgiaChange = (e) => { const { name, value } = e.target; setNovaCirurgia(prev => ({ ...prev, [name]: value })); };
    // CORREÇÃO: Usando setNovoProblema (o setter correto)
    const handleProblemaChange = (e) => { const { name, value } = e.target; setNovoProblema(prev => ({ ...prev, [name]: value })); };
    const handleVacinaChange = (e) => { const { name, value } = e.target; setNovaVacina(prev => ({ ...prev, [name]: value })); };
    const handleExameChange = (e) => { const { name, value } = e.target; setNovoExame(prev => ({ ...prev, [name]: value })); };
    const handleVermifugacaoChange = (e) => { const { name, value } = e.target; setNovaVermifugacao(prev => ({ ...prev, [name]: value })); };

    const handleConsultaChange = (e) => {
        const { name, value } = e.target;
        setNovaConsulta(prev => ({ ...prev, [name]: value }));
    };

    // Handler para upload de documentos (exames)
    const handleDocumentoUpload = (e) => {
        const files = Array.from(e.target.files);
        const novosDocumentos = files.map(file => ({
            id: Date.now() + Math.random(),
            nome: file.name,
            tamanho: (file.size / 1024).toFixed(2) + ' KB',
            tipo: file.type,
            arquivo: file,
            link: URL.createObjectURL(file)
        }));
        setDocumentosConsulta(prev => [...prev, ...novosDocumentos]);
        e.target.value = '';
    };

    // Handler para remover documento (exames)
    const handleRemoverDocumento = (idDocumento) => {
        setDocumentosConsulta(prev => prev.filter(doc => doc.id !== idDocumento));
    };

    // Handler para upload de prescrições
    const handlePrescricaoUpload = (e) => {
        const files = Array.from(e.target.files);
        const novosDocumentos = files.map(file => ({
            id: Date.now() + Math.random(),
            nome: file.name,
            tamanho: (file.size / 1024).toFixed(2) + ' KB',
            tipo: file.type,
            arquivo: file,
            link: URL.createObjectURL(file)
        }));
        setDocumentosPrescricao(prev => [...prev, ...novosDocumentos]);
        e.target.value = '';
    };

    // Handler para remover prescrição
    const handleRemoverPrescricao = (idDocumento) => {
        setDocumentosPrescricao(prev => prev.filter(doc => doc.id !== idDocumento));
    };


    // --- HANDLERS DE SUBMISSÃO (ADD) - FUNCIONANDO ---

    const gerarId = (lista) => (lista.length > 0 ? Math.max(...lista.map(item => item.id)) + 1 : 1);

    const handleAdicionarCirurgia = (e) => {
        e.preventDefault();
        const novoRegistro = { id: gerarId(dadosPaciente.listaCirurgias), nome: novaCirurgia.procedimento, data: novaCirurgia.data, observacoes: novaCirurgia.observacoes };
        setDadosPaciente(prev => ({ ...prev, listaCirurgias: [...prev.listaCirurgias, novoRegistro] }));
        setNovaCirurgia(cirurgiaInicial);
        setMostrarFormulario(null);
    };

    const handleAdicionarProblema = (e) => {
        e.preventDefault();
        // CORREÇÃO: Usando 'novoProblema' (com 'a') e setNovoProblema
        const novoRegistro = { id: gerarId(dadosPaciente.listaProblemas), nome: novoProblema.nome, diagnosticadoEm: novoProblema.dataDiagnostico, status: novoProblema.status, tratamento: novoProblema.tratamento };
        setDadosPaciente(prev => ({ ...prev, listaProblemas: [...prev.listaProblemas, novoRegistro] }));
        setNovoProblema(problemaInicial);
        setMostrarFormulario(null);
    };

    const handleAdicionarConsulta = (e) => {
        e.preventDefault();
        const novoRegistro = {
            id: gerarId(dadosPaciente.listaConsultas),
            data: novaConsulta.data,
            motivo: novaConsulta.motivo,
            queixaPrincipal: novaConsulta.queixaPrincipal,
            meio: novaConsulta.meio,
            tempExame: novaConsulta.tempExame, fcExame: novaConsulta.fcExame, frExame: novaConsulta.frExame,
            mucosasExame: novaConsulta.mucosasExame, hidratacaoExame: novaConsulta.hidratacaoExame,
            geralExame: novaConsulta.geralExame, obsExame: novaConsulta.obsExame,
            diagnostico: novaConsulta.diagnostico,
            tratamento: novaConsulta.tratamento,
            prescricao: novaConsulta.prescricao,
            posAtendimento: novaConsulta.posAtendimento,
            notasVet: novaConsulta.notasVet,
            vet: VET_LOGADO.vet,
            documentos: documentosConsulta.map(doc => ({ nome: doc.nome, link: doc.link, tipo: 'exame' })),
            prescricoes: documentosPrescricao.map(doc => ({ nome: doc.nome, link: doc.link, tipo: 'prescricao' })),
        };
        setDadosPaciente(prev => ({ ...prev, listaConsultas: [...prev.listaConsultas, novoRegistro] }));
        setNovaConsulta(consultaInicial);
        setDocumentosConsulta([]); // Limpa os documentos de exames
        setDocumentosPrescricao([]); // Limpa os documentos de prescrição
        setMostrarFormulario(null);
    };

    const handleAdicionarVacina = (e) => {
        e.preventDefault();
        const novoRegistro = { id: gerarId(dadosPaciente.listaVacinas), nome: novaVacina.nome, data: novaVacina.data, proximaData: novaVacina.proximaData, lote: novaVacina.lote };
        setDadosPaciente(prev => ({ ...prev, listaVacinas: [...prev.listaVacinas, novoRegistro] }));
        setNovaVacina(vacinaInicial);
        setMostrarFormulario(null);
    };

    const handleAdicionarExame = (e) => {
        e.preventDefault();
        const novoRegistro = { id: gerarId(dadosPaciente.listaExames), nome: novoExame.nome, data: novoExame.data, resultado: novoExame.resultado, observacoes: novoExame.observacoes };
        setDadosPaciente(prev => ({ ...prev, listaExames: [...prev.listaExames, novoRegistro] }));
        setNovoExame(exameInicial);
        setMostrarFormulario(null);
    };

    const handleAdicionarVermifugacao = (e) => {
        e.preventDefault();
        const novoRegistro = { 
            id: gerarId(dadosPaciente.listaVermifugacao), 
            medicamento: novaVermifugacao.nome,
            tipo: novaVermifugacao.tipo,
            data: novaVermifugacao.data, 
            proximaData: novaVermifugacao.proximaData,
            vet: VET_LOGADO.vet
        };
        setDadosPaciente(prev => ({ ...prev, listaVermifugacao: [...prev.listaVermifugacao, novoRegistro] }));
        setNovaVermifugacao(vermifugacaoInicial);
        setMostrarFormulario(null);
    };

    const handleVoltar = () => navigate('/pacientesVeterinario');

    // --- FUNÇÕES AUXILIARES DE RENDERIZAÇÃO ---

    const CampoExibicao = ({ label, value }) => (
        <div className="campo-exibicao">
            <label>{label}</label>
            <p className="valor">{value}</p>
        </div>
    );

    const HistoricoVazio = ({ tipoRegistro }) => (
        <div className="mensagem-historico-vazio">
            <p>Não há **{tipoRegistro}** registradas para este paciente.</p>
            <p>Use o botão **"+ Adicionar"** acima para incluir um novo registro.</p>
        </div>
    );

    // --- COMPONENTE ESPECÍFICO PARA A ABA DE DADOS CADASTRAIS (COMPLETO) ---
    const SecaoDadosPaciente = () => (
        <div className="conteudo-aba-dados">
            <div className="cabecalho-aba">
                <h3>Dados Cadastrais Completos</h3>
            </div>

            {/* Dados do Animal */}
            <section className="secao-card-info roxo-fundo">
                <h4>🐾 Dados do Animal</h4>
                <div className="tres-colunas">
                    <CampoExibicao label="Nome" value={dadosPaciente.nome} />
                    <CampoExibicao label="Número de Registro/RGA" value={dadosPaciente.rga} />
                    <CampoExibicao label="Microchip" value={dadosPaciente.microchip} />
                </div>
                <div className="tres-colunas">
                    <CampoExibicao label="Espécie" value={dadosPaciente.especie} />
                    <CampoExibicao label="Raça" value={dadosPaciente.raca} />
                    <CampoExibicao label="Gênero" value={dadosPaciente.genero} />
                </div>
                <div className="tres-colunas">
                    <CampoExibicao label="Status Reprodutivo" value={dadosPaciente.genero} />
                    <CampoExibicao label="Data de Nascimento" value={dadosPaciente.dataNascimento} />
                    <CampoExibicao label="Idade" value={dadosPaciente.idade} />
                </div>
                <CampoExibicao label="Pelagem/Cor" value={dadosPaciente.corPelagem} />
            </section>

            {/* Peso Atual e Histórico */}
            <section className="secao-card-info azul-fundo">
                <h4>⚖️ Peso Atual e Histórico</h4>
                <div className="tres-colunas">
                    <CampoExibicao label="Peso Atual" value={dadosPaciente.peso} />
                    <CampoExibicao label="Peso Inicial (Admissão)" value={dadosPaciente.pesoInicial} />
                    <CampoExibicao label="Aspecto da Pelagem" value={dadosPaciente.aspectoPelagem} />
                </div>
            </section>

            {/* Temperamento e Hábitos */}
            <section className="secao-card-info verde-fundo">
                <h4>🏡 Temperamento e Hábitos</h4>
                <CampoExibicao label="Temperamento" value={dadosPaciente.temperamento} />
                <CampoExibicao label="Habitat" value={dadosPaciente.habitat} />
                <CampoExibicao label="Rotina Diária" value={dadosPaciente.rotina} />
            </section>

            {/* Alergias */}
            <section className="secao-card-info vermelho-fundo">
                <h4>🚨 Alergias Conhecidas</h4>
                <div className="tags-alergia">
                    {dadosPaciente.alergias.map((alergia, index) => (
                        <span key={index} className="tag-status vermelho-tag">{alergia}</span>
                    ))}
                </div>
            </section>

            {/* Dados do Tutor */}
            <section className="secao-card-info laranja-fundo">
                <h4>👨‍👩‍👧‍👦 Dados do Tutor (Responsável)</h4>
                <div className="duas-colunas">
                    <CampoExibicao label="Nome Completo" value={dadosPaciente.tutor} />
                    <CampoExibicao label="CPF" value={dadosPaciente.tutorCpf} />
                </div>
                <div className="tres-colunas">
                    <CampoExibicao label="Telefone Principal" value={dadosPaciente.telefonePrincipal} />
                    <CampoExibicao label="Telefone Alternativo" value={dadosPaciente.telefoneSecundario} />
                    <CampoExibicao label="Email" value={dadosPaciente.emailTutor} />
                </div>
                <CampoExibicao label="Endereço Completo" value={dadosPaciente.endereco} />
            </section>
        </div>
    );

    // --- RENDERIZAÇÃO DOS FORMULÁRIOS DE ADIÇÃO (MODAIS) ---

    const renderizarFormularioCirurgia = () => mostrarFormulario === 'surgery' && (
        <div className="overlay-formulario">
            <div className="modal-formulario">
                <h3 className="cabecalho-modal">Adicionar Cirurgia / Procedimento</h3>
                <form onSubmit={handleAdicionarCirurgia}>
                    <section className="secao-informacao cirurgia-info">
                        <h4>✂️ Informações da Cirurgia</h4>
                        <div className="duas-colunas">
                            <CampoFormulario rotulo="Procedimento" nome="procedimento" valor={novaCirurgia.procedimento} aoMudar={handleCirurgiaChange} placeholder="Ex: Castração, Remoção de tumor..." requerido />
                            <CampoFormulario rotulo="Data da Cirurgia" nome="data" tipo="date" valor={novaCirurgia.data} aoMudar={handleCirurgiaChange} placeholder="DD/MM/AAAA" requerido />
                        </div>
                        <CampoFormulario rotulo="Observações e Detalhes do Procedimento" nome="observacoes" valor={novaCirurgia.observacoes} aoMudar={handleCirurgiaChange} areaTexto placeholder="Descreva detalhes do procedimento, intercorrências, cuidados pós-operatórios..." />
                    </section>
                    <section className="secao-informacao vet-clinica-info">
                        <h4>💡 Veterinário e Clínica (Registro Automático)</h4>
                        <div className="duas-colunas">
                            <CampoFormulario rotulo="Veterinário Responsável" nome="vet" valor={VET_LOGADO.vet} somenteLeitura />
                            <CampoFormulario rotulo="CRMV" nome="crmv" valor={VET_LOGADO.crmv} somenteLeitura />
                        </div>
                    </section>
                    <div className="acoes-formulario">
                        <button type="button" onClick={() => setMostrarFormulario(null)} className="botao-cancelar">Cancelar</button>
                        <button type="submit" className="botao-enviar">✅ Adicionar Cirurgia</button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderAddProblemForm = () => mostrarFormulario === 'problem' && (
        <div className="overlay-formulario">
            <div className="modal-formulario">
                <h3 className="cabecalho-modal">Adicionar Problema de Saúde</h3>
                <form onSubmit={handleAdicionarProblema}>
                    <section className="secao-informacao problema-info">
                        <h4>💊 Informações do Problema de Saúde</h4>
                        <CampoFormulario rotulo="Nome do Problema" nome="nome" valor={novoProblema.nome} aoMudar={handleProblemaChange} placeholder="Ex: Displasia Coxofemoral, Artrite, Diabetes..." requerido />
                        <div className="duas-colunas">
                            <CampoFormulario rotulo="Data do Diagnóstico" nome="dataDiagnostico" tipo="date" valor={novoProblema.dataDiagnostico} aoMudar={handleProblemaChange} requerido />
                            <CampoFormulario rotulo="Status" nome="status" valor={novoProblema.status} aoMudar={handleProblemaChange} placeholder="Ex: Controlado, Ativo, Resolvido..." requerido />
                        </div>
                        <CampoFormulario rotulo="Observações e Tratamento" nome="tratamento" valor={novoProblema.tratamento} aoMudar={handleProblemaChange} areaTexto placeholder="Adicione informações sobre o tratamento, medicações, recomendações, etc..." />
                    </section>
                    <div className="acoes-formulario">
                        <button type="button" onClick={() => setMostrarFormulario(null)} className="botao-cancelar">Cancelar</button>
                        <button type="submit" className="botao-enviar">✅ Adicionar Problema</button>
                    </div>
                </form>
            </div>
        </div>
    );

    // Função de Consulta Completa e Mapeada para o LAYOUT DA IMAGEM
    const renderAddConsultForm = () => mostrarFormulario === 'consult' && (
        <div className="overlay-formulario">
            <div className="modal-formulario modal-grande">
                <h3 className="cabecalho-modal">Informações da Consulta</h3>
                <form onSubmit={handleAdicionarConsulta}>

                    {/* USANDO DUAS COLUNAS PARA REPLICAR O LAYOUT DE BLOCOS DA IMAGEM */}
                    <div className="duas-colunas">

                        {/* --- COLUNA ESQUERDA --- */}
                        <div>

                            {/* BLOCO 1: INFORMAÇÕES DA CONSULTA (Roxo Claro) */}
                            <section className="secao-informacao detalhes-consulta">
                                <h4>📅 Informações da Consulta</h4>
                                <div className="tres-colunas gap-pequeno">
                                    <CampoFormulario rotulo="Data *" nome="data" tipo="date" valor={novaConsulta.data} aoMudar={handleConsultaChange} requerido />
                                    <CampoFormulario rotulo="Motivo *" nome="motivo" valor={novaConsulta.motivo} aoMudar={handleConsultaChange} placeholder="Ex: Rotina" requerido />
                                    <CampoFormulario rotulo="Meio *" nome="meio" valor={novaConsulta.meio} aoMudar={handleConsultaChange} placeholder="Ex: Em Clínica" requerido />
                                </div>
                                <CampoFormulario rotulo="Queixa Principal *" nome="queixaPrincipal" valor={novaConsulta.queixaPrincipal} aoMudar={handleConsultaChange} areaTexto placeholder="Detalhes da Queixa Principal..." requerido />
                            </section>

                            {/* BLOCO 2: VETERINÁRIO E CLÍNICA (Roxo) */}
                            <section className="secao-informacao vet-clinica-info">
                                <h4>🩺 Veterinário e Clínica</h4>
                                <div className="duas-colunas">
                                    <CampoFormulario rotulo="Veterinário *" nome="vet" valor={VET_LOGADO.vet} somenteLeitura />
                                    <CampoFormulario rotulo="CRMV" nome="crmv" valor={VET_LOGADO.crmv} somenteLeitura />
                                </div>
                                <CampoFormulario rotulo="Clínica" nome="clinicaNome" valor={VET_LOGADO.clinicName} somenteLeitura />
                                <CampoFormulario rotulo="Endereço" nome="enderecoClinica" valor={VET_LOGADO.clinicAddress} somenteLeitura />
                                <div className="duas-colunas">
                                    <CampoFormulario rotulo="Telefone" nome="telefoneClinica" valor={VET_LOGADO.clinicPhone} somenteLeitura />
                                    <CampoFormulario rotulo="CRMV Clínica" nome="crmvClinica" valor={VET_LOGADO.clinicCrmv} somenteLeitura />
                                </div>
                            </section>

                            {/* BLOCO 3: EXAME FÍSICO (Verde) */}
                            <section className="secao-informacao captura-exame">
                                <h4>🌡️ Exame Físico</h4>
                                <div className="tres-colunas gap-pequeno">
                                    <CampoFormulario rotulo="Temp (°C)" nome="tempExame" valor={novaConsulta.tempExame} aoMudar={handleConsultaChange} placeholder="38.5" requerido />
                                    <CampoFormulario rotulo="FC (bpm)" nome="fcExame" valor={novaConsulta.fcExame} aoMudar={handleConsultaChange} placeholder="90" requerido />
                                    <CampoFormulario rotulo="FR" nome="frExame" valor={novaConsulta.frExame} aoMudar={handleConsultaChange} placeholder="24" requerido />
                                </div>
                                <div className="tres-colunas gap-pequeno">
                                    <CampoFormulario rotulo="Mucosas" nome="mucosasExame" valor={novaConsulta.mucosasExame} aoMudar={handleConsultaChange} placeholder="Róseas" requerido />
                                    <CampoFormulario rotulo="Hidratação" nome="hidratacaoExame" valor={novaConsulta.hidratacaoExame} aoMudar={handleConsultaChange} placeholder="Normal" requerido />
                                    <CampoFormulario rotulo="Condição" nome="geralExame" valor={novaConsulta.geralExame} aoMudar={handleConsultaChange} placeholder="Ideal" />
                                </div>
                                <CampoFormulario rotulo="Observações Detalhadas do Exame" nome="obsExame" valor={novaConsulta.obsExame} aoMudar={handleConsultaChange} areaTexto placeholder="Observações..." />
                            </section>

                            {/* BLOCO 4: DIAGNÓSTICO E TRATAMENTO (Roxo Claro) */}
                            <section className="secao-informacao diagnostico-prescricao">
                                <h4>🔬 Diagnóstico e Tratamento</h4>

                                <CampoFormulario rotulo="Diagnóstico *" nome="diagnostico" valor={novaConsulta.diagnostico} aoMudar={handleConsultaChange} areaTexto placeholder="Sintomas e Diagnóstico..." requerido />

                                <CampoFormulario rotulo="Tratamento *" nome="tratamento" valor={novaConsulta.tratamento} aoMudar={handleConsultaChange} areaTexto placeholder="Descreva o tratamento..." requerido />
                            </section>
                        </div>

                        {/* --- COLUNA DIREITA --- */}
                        <div>

                            {/* BLOCO 5: PRESCRIÇÕES (Amarelo) */}
                            <section className="secao-informacao prescricoes-info">
                                <h4>💊 Prescrições</h4>
                                <CampoFormulario
                                    rotulo="Detalhes da Prescrição"
                                    nome="prescricao"
                                    valor={novaConsulta.prescricao}
                                    aoMudar={handleConsultaChange}
                                    areaTexto
                                    placeholder="Ex: Amoxicilina 500mg - 1 comp, 2x/dia, por 7 dias."
                                />
                                
                                {/* Upload de Prescrições */}
                                <div className="upload-documentos">
                                    <label className="rotulo-upload">📎 Anexar Receituário / Prescrição</label>
                                    <div className="area-upload">
                                        <input
                                            type="file"
                                            id="upload-prescricao"
                                            multiple
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                            onChange={handlePrescricaoUpload}
                                            className="input-upload"
                                        />
                                        <label htmlFor="upload-prescricao" className="botao-upload prescricao">
                                            📤 Selecionar Arquivos
                                        </label>
                                        <span className="info-upload">PDF, DOC, JPG, PNG (máx. 10MB cada)</span>
                                    </div>
                                    
                                    {/* Lista de Prescrições Anexadas */}
                                    {documentosPrescricao.length > 0 && (
                                        <div className="lista-documentos-upload prescricao">
                                            <p className="titulo-documentos">Receituários anexados ({documentosPrescricao.length}):</p>
                                            {documentosPrescricao.map(doc => (
                                                <div key={doc.id} className="item-documento-upload">
                                                    <div className="info-documento">
                                                        <span className="icone-documento">💊</span>
                                                        <span className="nome-documento">{doc.nome}</span>
                                                        <span className="tamanho-documento">({doc.tamanho})</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="botao-remover-documento"
                                                        onClick={() => handleRemoverPrescricao(doc.id)}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* BLOCO 6: EXAMES SOLICITADOS (Amarelo) */}
                            <section className="secao-informacao exames-solicitados-info">
                                <h4>🧪 Exames Solicitados</h4>
                                <CampoFormulario
                                    rotulo="Exames Solicitados / Notas"
                                    nome="notasVet"
                                    valor={novaConsulta.notasVet}
                                    aoMudar={handleConsultaChange}
                                    areaTexto
                                    placeholder="Ex: Hemograma Básico, Bioquímico, Raio X de Tórax."
                                />
                                
                                {/* Upload de Documentos */}
                                <div className="upload-documentos">
                                    <label className="rotulo-upload">📎 Anexar Pedidos de Exame</label>
                                    <div className="area-upload">
                                        <input
                                            type="file"
                                            id="upload-exames"
                                            multiple
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                            onChange={handleDocumentoUpload}
                                            className="input-upload"
                                        />
                                        <label htmlFor="upload-exames" className="botao-upload">
                                            📤 Selecionar Arquivos
                                        </label>
                                        <span className="info-upload">PDF, DOC, JPG, PNG (máx. 10MB cada)</span>
                                    </div>
                                    
                                    {/* Lista de Documentos Anexados */}
                                    {documentosConsulta.length > 0 && (
                                        <div className="lista-documentos-upload">
                                            <p className="titulo-documentos">Arquivos anexados ({documentosConsulta.length}):</p>
                                            {documentosConsulta.map(doc => (
                                                <div key={doc.id} className="item-documento-upload">
                                                    <div className="info-documento">
                                                        <span className="icone-documento">📄</span>
                                                        <span className="nome-documento">{doc.nome}</span>
                                                        <span className="tamanho-documento">({doc.tamanho})</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="botao-remover-documento"
                                                        onClick={() => handleRemoverDocumento(doc.id)}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* BLOCO 7: ORIENTAÇÕES PÓS-ATENDIMENTO (Amarelo) */}
                            <section className="secao-informacao observacoes-orientacoes-info">
                                <h4>📜 Orientações Pós-Atendimento</h4>
                                <CampoFormulario rotulo="Orientações Pós-Consulta *" nome="posAtendimento" valor={novaConsulta.posAtendimento} aoMudar={handleConsultaChange} areaTexto placeholder="Orientações para o tutor sobre cuidados após a consulta..." requerido />
                            </section>

                        </div>
                    </div>

                    {/* --- AÇÕES DO FORMULÁRIO (Full width) --- */}
                    <div className="acoes-formulario">
                        <button type="button" onClick={() => { setMostrarFormulario(null); setDocumentosConsulta([]); setDocumentosPrescricao([]); }} className="botao-cancelar">Cancelar</button>
                        <button type="submit" className="botao-enviar">✅ Registrar Consulta</button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderAddVaccineForm = () => mostrarFormulario === 'vaccine' && (
        <div className="overlay-formulario">
            <div className="modal-formulario">
                <h3 className="cabecalho-modal">Adicionar Nova Vacina</h3>
                <form onSubmit={handleAdicionarVacina}>
                    <section className="secao-informacao vacina-info">
                        <h4>💉 Detalhes da Vacina</h4>
                        <CampoFormulario rotulo="Nome da Vacina" nome="nome" valor={novaVacina.nome} aoMudar={handleVacinaChange} placeholder="Ex: V8, V10, Raiva, Gripe..." requerido />
                        <div className="tres-colunas">
                            <CampoFormulario rotulo="Data da Aplicação" nome="data" tipo="date" valor={novaVacina.data} aoMudar={handleVacinaChange} requerido />
                            <CampoFormulario rotulo="Próxima Dose (Previsão)" nome="proximaData" tipo="date" valor={novaVacina.proximaData} aoMudar={handleVacinaChange} placeholder="DD/MM/AAAA" />
                            <CampoFormulario rotulo="Lote/Fabricante" nome="lote" valor={novaVacina.lote} aoMudar={handleVacinaChange} placeholder="Lote da vacina" />
                        </div>
                        <CampoFormulario rotulo="Veterinário Responsável" nome="vet" valor={VET_LOGADO.vet} somenteLeitura />
                    </section>
                    <div className="acoes-formulario">
                        <button type="button" onClick={() => setMostrarFormulario(null)} className="botao-cancelar">Cancelar</button>
                        <button type="submit" className="botao-enviar sucesso">✅ Registrar Vacina</button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderAddExamForm = () => mostrarFormulario === 'exam' && (
        <div className="overlay-formulario">
            <div className="modal-formulario">
                <h3 className="cabecalho-modal">Adicionar Resultado de Exame</h3>
                <form onSubmit={handleAdicionarExame}>
                    <section className="secao-informacao exame-info">
                        <h4>🔬 Informações do Exame</h4>
                        <CampoFormulario rotulo="Nome do Exame" nome="nome" valor={novoExame.nome} aoMudar={handleExameChange} placeholder="Ex: Hemograma, Ultrassom Abdominal..." requerido />
                        <div className="duas-colunas">
                            <CampoFormulario rotulo="Data do Exame" nome="data" tipo="date" valor={novoExame.data} aoMudar={handleExameChange} requerido />
                            <CampoFormulario rotulo="Resultado Principal" nome="resultado" valor={novoExame.resultado} aoMudar={handleExameChange} placeholder="Ex: Normal, Alterado, Cisto de 2cm..." requerido />
                        </div>
                        <CampoFormulario rotulo="Observações / Interpretação Clínica" nome="observacoes" valor={novoExame.observacoes} aoMudar={handleExameChange} areaTexto placeholder="Interpretação, recomendação de acompanhamento..." />
                    </section>
                    <div className="acoes-formulario">
                        <button type="button" onClick={() => setMostrarFormulario(null)} className="botao-cancelar">Cancelar</button>
                        <button type="submit" className="botao-enviar">✅ Registrar Exame</button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderAddDewormingForm = () => mostrarFormulario === 'deworming' && (
        <div className="overlay-formulario">
            <div className="modal-formulario">
                <h3 className="cabecalho-modal">Adicionar Vermifugação</h3>
                <form onSubmit={handleAdicionarVermifugacao}>
                    <section className="secao-informacao info-produto">
                        <h4>💊 Informações do Produto</h4>
                        <div className="duas-colunas">
                            <CampoFormulario rotulo="Nome do Produto" nome="nome" valor={novaVermifugacao.nome} aoMudar={handleVermifugacaoChange} placeholder="Ex: Drontal Plus, Bravecto..." requerido />
                            <CampoFormulario rotulo="Tipo" nome="tipo" valor={novaVermifugacao.tipo} aoMudar={handleVermifugacaoChange} placeholder="" requerido />
                        </div>
                        <div className="duas-colunas">
                            <CampoFormulario rotulo="Data da Aplicação" nome="data" tipo="date" valor={novaVermifugacao.data} aoMudar={handleVermifugacaoChange} requerido />
                            <CampoFormulario rotulo="Próxima Dose" nome="proximaData" tipo="date" valor={novaVermifugacao.proximaData} aoMudar={handleVermifugacaoChange} />
                        </div>
                    </section>
                    <section className="secao-informacao vet-clinica-info">
                        <h4>🩺 Veterinário e Clínica</h4>
                        <div className="duas-colunas">
                            <CampoFormulario rotulo="Veterinário" nome="vet" valor={VET_LOGADO.vet} somenteLeitura />
                            <CampoFormulario rotulo="CRMV" nome="crmv" valor={VET_LOGADO.crmv} somenteLeitura />
                        </div>
                        <CampoFormulario rotulo="Nome da Clínica" nome="clinicaNome" valor={VET_LOGADO.clinicName} somenteLeitura />
                        <CampoFormulario rotulo="Endereço da Clínica" nome="enderecoClinica" valor={VET_LOGADO.clinicAddress} somenteLeitura />
                        <div className="duas-colunas">
                            <CampoFormulario rotulo="Telefone" nome="telefoneClinica" valor={VET_LOGADO.clinicPhone} somenteLeitura />
                            <CampoFormulario rotulo="CRMV da Clínica" nome="crmvClinica" valor={VET_LOGADO.clinicCrmv} somenteLeitura />
                        </div>
                    </section>
                    <div className="acoes-formulario">
                        <button type="button" onClick={() => setMostrarFormulario(null)} className="botao-cancelar">Cancelar</button>
                        <button type="submit" className="botao-enviar">✅ Adicionar Registro</button>
                    </div>
                </form>
            </div>
        </div>
    );

    // --- RENDERIZAÇÃO DAS ABAS (Conteúdo completo) ---
    const renderizarConteudoAba = () => {
        switch (abaAtiva) {
            case 'data':
                return <SecaoDadosPaciente />;

            case 'consults':
                return (
                    <div>
                        <div className="cabecalho-aba">
                            <h3>📋 Histórico de Consultas</h3>
                            {isVeterinario && (
                                <button className="botao-adicionar" onClick={() => setMostrarFormulario('consult')}>+ Adicionar Consulta</button>
                            )}
                        </div>
                        {dadosPaciente.listaConsultas.length === 0 ? (
                            <HistoricoVazio tipoRegistro="consultas" />
                        ) : (
                            <div className="lista-consultas-accordion">
                                {dadosPaciente.listaConsultas.map((c) => {
                                    const isExpandida = consultaExpandida === c.id;
                                    return (
                                        <div key={c.id} className={`consulta-accordion ${isExpandida ? 'expandida' : ''}`}>
                                            {/* Cabeçalho Clicável */}
                                            <div 
                                                className="consulta-accordion-header"
                                                onClick={() => toggleConsulta(c.id)}
                                            >
                                                <div className="consulta-header-info">
                                                    <div className="consulta-header-principal">
                                                        <span className="consulta-data">📅 {c.data}</span>
                                                        <h4 className="consulta-motivo">{c.motivo || 'Consulta'}</h4>
                                                    </div>
                                                    <div className="consulta-header-secundario">
                                                        <span className="consulta-vet">🩺 {c.vet}</span>
                                                        {c.meio && <span className="tag-meio">{c.meio}</span>}
                                                    </div>
                                                    {c.diagnostico && (
                                                        <p className="consulta-preview">
                                                            <strong>Diagnóstico:</strong> {c.diagnostico.substring(0, 80)}{c.diagnostico.length > 80 ? '...' : ''}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className={`consulta-accordion-icon ${isExpandida ? 'rotacionado' : ''}`}>
                                                    ▼
                                                </div>
                                            </div>

                                            {/* Conteúdo Expansível */}
                                            <div className={`consulta-accordion-content ${isExpandida ? 'aberto' : ''}`}>
                                                <div className="consulta-accordion-inner">
                                                    
                                                    {/* Informações da Consulta */}
                                                    <div className="caixa-secao-consulta azul-claro-fundo animada">
                                                        <h5>📋 Informações da Consulta</h5>
                                                        <div className="info-consulta-grid">
                                                            <div><label>Motivo:</label><p>{c.motivo || 'N/A'}</p></div>
                                                            <div><label>Meio:</label><p>{c.meio || 'Presencial'}</p></div>
                                                        </div>
                                                        {c.queixaPrincipal && (
                                                            <div className="queixa-principal">
                                                                <label>Queixa Principal:</label>
                                                                <p>{c.queixaPrincipal}</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Exame Físico */}
                                                    <div className="caixa-secao-consulta rosa-fundo animada" style={{animationDelay: '0.05s'}}>
                                                        <h5>🌡️ Exame Físico</h5>
                                                        <div className="exibicao-grade-exame">
                                                            <div className="exibicao-item-exame"><label>Temperatura</label><p>{c.tempExame || 'N/A'}</p></div>
                                                            <div className="exibicao-item-exame"><label>FC</label><p>{c.fcExame || 'N/A'}</p></div>
                                                            <div className="exibicao-item-exame"><label>FR</label><p>{c.frExame || 'N/A'}</p></div>
                                                            <div className="exibicao-item-exame"><label>Mucosas</label><p>{c.mucosasExame || 'N/A'}</p></div>
                                                            <div className="exibicao-item-exame"><label>Hidratação</label><p>{c.hidratacaoExame || 'N/A'}</p></div>
                                                            <div className="exibicao-item-exame"><label>Condição</label><p>{c.geralExame || 'N/A'}</p></div>
                                                        </div>
                                                        {c.obsExame && <p className="obs-do-exame">📝 Obs: {c.obsExame}</p>}
                                                    </div>

                                                    {/* Diagnóstico e Tratamento */}
                                                    <div className="caixa-secao-consulta roxo-fundo animada" style={{animationDelay: '0.1s'}}>
                                                        <h5>🔬 Diagnóstico e Tratamento</h5>
                                                        <div className="diagnostico-tratamento">
                                                            <div className="item-diagnostico">
                                                                <label>Diagnóstico:</label>
                                                                <p>{c.diagnostico || 'N/A'}</p>
                                                            </div>
                                                            <div className="item-diagnostico">
                                                                <label>Tratamento:</label>
                                                                <p>{c.tratamento || 'N/A'}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Prescrições */}
                                                    {c.prescricao && (
                                                        <div className="caixa-secao-consulta amarelo-fundo animada" style={{animationDelay: '0.15s'}}>
                                                            <h5>💊 Prescrições</h5>
                                                            <p>{c.prescricao}</p>
                                                        </div>
                                                    )}

                                                    {/* Exames Solicitados */}
                                                    {c.notasVet && (
                                                        <div className="caixa-secao-consulta amarelo-claro-fundo animada" style={{animationDelay: '0.2s'}}>
                                                            <h5>🧪 Exames Solicitados / Observações</h5>
                                                            <p>{c.notasVet}</p>
                                                        </div>
                                                    )}

                                                    {/* Orientações Pós-Atendimento */}
                                                    {c.posAtendimento && (
                                                        <div className="caixa-secao-consulta verde-fundo animada" style={{animationDelay: '0.25s'}}>
                                                            <h5>📜 Orientações Pós-Atendimento</h5>
                                                            <p>{c.posAtendimento}</p>
                                                        </div>
                                                    )}

                                                    {/* Receituários/Prescrições Anexadas */}
                                                    {c.prescricoes && c.prescricoes.length > 0 && (
                                                        <div className="container-lista-documentos prescricao animada" style={{animationDelay: '0.3s'}}>
                                                            <p className="titulo-detalhe-consulta">💊 Receituários Anexados ({c.prescricoes.length}):</p>
                                                            {c.prescricoes.map((doc, docIndex) => (
                                                                <button key={docIndex} className="botao-documento prescricao" onClick={(e) => { e.stopPropagation(); window.open(doc.link, '_blank'); }}>
                                                                    📋 {doc.nome}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Pedidos de Exame Anexados */}
                                                    {c.documentos && c.documentos.length > 0 && (
                                                        <div className="container-lista-documentos animada" style={{animationDelay: '0.35s'}}>
                                                            <p className="titulo-detalhe-consulta">🧪 Pedidos de Exame Anexados ({c.documentos.length}):</p>
                                                            {c.documentos.map((doc, docIndex) => (
                                                                <button key={docIndex} className="botao-documento" onClick={(e) => { e.stopPropagation(); window.open(doc.link, '_blank'); }}>
                                                                    📄 {doc.nome}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );

            case 'exams':
                return <div>
                    <div className="cabecalho-aba">
                        <h3>🔬 Exames Laboratoriais e de Imagem</h3>
                        {isVeterinario && (
                            <button className="botao-adicionar" onClick={() => setMostrarFormulario('exam')}>+ Adicionar Exame</button>
                        )}
                    </div>
                    <div className="lista-cards">
                        {dadosPaciente.listaExames.map((exame, index) => (<div key={index} className="cartao-registro"><h4>{exame.nome}</h4><p>Resultado: **{exame.resultado}**</p><p>Data: {exame.data}</p></div>))}
                    </div>
                </div>;

            case 'vaccines':
                return (
                    <div>
                        <div className="cabecalho-aba">
                            <h3>💉 Carteira de Vacinação</h3>
                            <button className="botao-adicionar" onClick={() => setMostrarFormulario('vaccine')}>+ Adicionar Vacina</button>
                        </div>
                        {dadosPaciente.listaVacinas.length === 0 ? (
                            <HistoricoVazio tipoRegistro="vacinas" />
                        ) : (
                            <div className="lista-cards">
                                {dadosPaciente.listaVacinas.map((v, index) => (<div key={index} className="cartao-registro largo cartao-vacina"><h4>{v.nome}</h4><p>Aplicação: **{v.data}**</p><p>Próxima Dose: **{v.proximaData}**</p></div>))}
                            </div>
                        )}
                    </div>
                );

            case 'deworming':
                return (
                    <div>
                        <div className="cabecalho-aba">
                            <h3>🐛 Histórico de Vermifugação</h3>
                            <button className="botao-adicionar" onClick={() => setMostrarFormulario('deworming')}>+ Adicionar Vermífugo</button>
                        </div>
                        {dadosPaciente.listaVermifugacao.length === 0 ? (
                            <HistoricoVazio tipoRegistro="vermifugações" />
                        ) : (
                            <div className="lista-cards">
                                {dadosPaciente.listaVermifugacao.map((d, index) => (
                                    <div key={index} className="cartao-registro largo cartao-vermifugacao">
                                        <div className="cabecalho-cartao">
                                            <h4>💊 {d.medicamento}</h4>
                                            {d.tipo && <span className="tag-tipo">{d.tipo}</span>}
                                        </div>
                                        <div className="datas-vermifugacao-exibicao">
                                            <p>📅 Aplicação: <strong>{d.data}</strong></p>
                                            {d.proximaData && <p>🔔 Próxima Dose: <strong>{d.proximaData}</strong></p>}
                                        </div>
                                        {d.vet && <p className="vet-responsavel">🩺 {d.vet}</p>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case 'surgeries':
                return <div>
                    <div className="cabecalho-aba">
                        <h3>🏥 Cirurgias e Internações</h3>
                        <button className="botao-adicionar" onClick={() => setMostrarFormulario('surgery')}>+ Adicionar Cirurgia</button>
                    </div>
                    <div className="lista-cards">
                        {dadosPaciente.listaCirurgias.map((s, index) => (<div key={index} className="cartao-registro largo"><h4>{s.nome}</h4><p>Realizada em: **{s.data}**</p><p className="observacoes">**Observações:** {s.observacoes}</p></div>))}
                    </div>
                </div>;

            case 'problems':
                return <div>
                    <div className="cabecalho-aba">
                        <h3>🚨 Problemas de Saúde e Condições Crônicas</h3>
                        <button className="botao-adicionar" onClick={() => setMostrarFormulario('problem')}>+ Adicionar Problema</button>
                    </div>
                    <div className="lista-cards">
                        {dadosPaciente.listaProblemas.map((p, index) => (
                            <div key={index} className="cartao-registro cartao-problema">
                                <div className="cabecalho-cartao">
                                    <h4>{p.nome}</h4>
                                    <span className={`tag-status ${p.status === 'Controlado' ? 'controlado' : ''}`}>{p.status}</span>
                                </div>
                                <p className="diagnostico">Diagnosticado em: **{p.diagnosticadoEm}**</p>
                                <p className="observacoes">**Tratamento:** {p.tratamento}</p>
                            </div>
                        ))}
                    </div>
                </div>;

            default: return null;
        }
    };


    // --- LÓGICA DO AVATAR ---
    const inicial = dadosPaciente.nome ? dadosPaciente.nome.charAt(0).toUpperCase() : '?';
    const temImagem = dadosPaciente.urlImagem && dadosPaciente.urlImagem.trim() !== '';

    return (
        <div className="container-perfil">
            {/* 1. Header e Resumo (Sempre visível) */}
            <div className="barra-cabecalho">
                <button onClick={handleVoltar} className="btn-voltar">
                    <ChevronLeft size={16} className="icon-voltar" />
                    Voltar
                </button>
                <h2>PRONTUÁRIO</h2>
                
            </div>

            {/* CABEÇALHO DO PACIENTE: AVATAR + NOME/TUTOR (Simplificado) */}
            <div className="resumo-paciente">

                <div className="avatar">
                    {temImagem ? (
                        <img
                            src={dadosPaciente.urlImagem}
                            alt={`Foto de ${dadosPaciente.nome}`}
                            className="imagem-avatar"
                        />
                    ) : (
                        inicial
                    )}
                </div>

                <div className="detalhes-resumo-paciente">
                    <h1 className="nome-resumo">{dadosPaciente.nome.toUpperCase()}</h1>
                    <p className="info-resumo-tutor">
                        Tutor: **{dadosPaciente.tutor}**
                    </p>
                </div>
            </div>

            {/* 2. Abas de Conteúdo */}
            <div className="area-conteudo">
                <div className="navegacao-abas">
                    {[
                        { id: 'data', rotulo: 'Dados Cadastrais', contagem: null },
                        { id: 'consults', rotulo: 'Consultas', contagem: dadosPaciente.listaConsultas.length },
                        { id: 'exams', rotulo: 'Exames', contagem: dadosPaciente.listaExames.length },
                        { id: 'vaccines', rotulo: 'Vacinas', contagem: dadosPaciente.listaVacinas.length },
                        { id: 'deworming', rotulo: 'Vermifugos', contagem: dadosPaciente.listaVermifugacao.length },
                        { id: 'surgeries', rotulo: 'Cirurgias', contagem: dadosPaciente.listaCirurgias.length },
                        { id: 'problems', rotulo: 'Problemas', contagem: dadosPaciente.listaProblemas.length },
                    ].map(aba => (
                        <button
                            key={aba.id}
                            className={`item-aba ${abaAtiva === aba.id ? 'active' : ''}`}
                            onClick={() => setAbaAtiva(aba.id)}
                        >
                            {aba.rotulo} {aba.contagem !== null && <span>({aba.contagem})</span>}
                        </button>
                    ))}
                </div>

                <div className="conteudo-aba">
                    {renderizarConteudoAba()}
                </div>
            </div>

            {/* 3. Renderização Condicional dos Formulários (Modais) */}
            {renderizarFormularioCirurgia()}
            {renderAddProblemForm()}
            {renderAddConsultForm()}
            {renderAddVaccineForm()}
            {renderAddExamForm()}
            {renderAddDewormingForm()}
        </div>
    );
};

export default ProntuarioVeterinario;