import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Header from './components/Header';
import HeaderVeterinario from './components/HeaderVeterinario';
import HeaderAmbulancia from './components/HeaderAmbulancia';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Notification from './components/Notification';
import ConfirmDialog from './components/ConfirmDialog';
import Home from './pages/Home';
import Login from './pages/Login';
import Artigos from './pages/Artigos';
import ArtigosLista from './pages/ArtigosLista';
import GuiasPrimeirosSocorros from './pages/GuiasPrimeirosSocorros';
import Sobre from './pages/Sobre';
import Servicos from './pages/Servicos';
import ServicosPlus from './pages/ServicosPlus';
import Planos from './pages/Planos';
import Ambulancia from './pages/Ambulancia';
import RastreamentoAmbulancia from './pages/RastreamentoAmbulancia';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import HomeLogado from './pages/HomeLogado';
import Agendamentos from './pages/Agendamentos';
import AgendamentosClinica from './pages/AgendamentosClinica';
import NovoAgendamento from './pages/NovoAgendamento';
import AgendarServico from './pages/AgendarServico';
import CadastroPet from './pages/CadastroPet';
import MetodoPagamento from './pages/MetodoPagamento';
import FinalizarPagamento from './pages/FinalizarPagamento';
import PagamentoPix from './pages/PagamentoPix';
import PagamentoCartao from './pages/PagamentoCartao';
import PagamentoAprovado from './pages/PagamentoAprovado';
import PagamentoRecusado from './pages/PagamentoRecusado';
import CadastroClinica from './pages/CadastroClinica';
import CadastroResponsavelTecnico from './pages/CadastroResponsavelTecnico';
import CadastroTutor from './pages/CadastroTutor';
import PainelClinica from './pages/PainelClinica';
import PainelTutor from './pages/PainelTutor';
import ProfissionaisClinica from './pages/ProfissionaisClinica';
import CadastrarProfissional from './pages/CadastrarProfissional';
import PerfilProfissional from './pages/PerfilProfissional';
import EditarPerfilProfissional from './pages/EditarPerfilProfissional';
import Relatorios from './pages/Relatorios';
import ConfiguracoesSistema from './pages/ConfiguracoesSistema';
import GestaoAmbulancia from './pages/GestaoAmbulancia';
import RegistroOcorrencia from './pages/RegistroOcorrencia';
import FAQ from './pages/FAQ';
import AcessoNegado from './pages/AcessoNegado';
import ChatBotButton from './components/ChatBotButton';
import PainelVeterinario from './pages/painelVeterinario';
import PacientesVeterinario from './pages/pacientesVeterinario';
import CadastroVeterinario from './pages/cadastroVeterinario';
import AgendaVeterinario from './pages/agendaVeterinario';
import RelatorioVeterinario from './pages/relatorioVeterinario';
import ConfiguracaoVeterinario from './pages/configuracaoVeterinario';
import ArtigosVeterinario from './pages/artigosVeterinario';
import EdicaoArtigosVeterinario from './pages/edicaoArtigosVeterinario';
import AmbulanciaConfiguracaoNotificacao from './pages/AmbulanciaConfiguracaoNotificacao';
import AmbulanciaConfiguracaoSeguranca from './pages/AmbulanciaConfiguracaoSeguranca';
import AmbulanciaConfiguracaoVeiculo from './pages/ambulanciaConfiguracaoVeiculo';
import AmbulanciaFinanceiro from './pages/AmbulanciaFinanceiro';
import AmbulanciaPerfil from './pages/AmbulanciaPerfil';
import AmbulanciaRelatorios from './pages/AmbulanciaRelatorios';
import ChamadosFinalizados from './pages/chamadosfinalizados';
import ChamadosPendentes from './pages/chamadospendentes';
import Historico from './pages/historico';
import PainelAmbulancia from './pages/painelambulancia';
import CadastroAmbulancia from './pages/CadastroAmbulancia';
import CadastroMotorista from './pages/CadastroMotorista';
import CadastroEmpresa from './pages/CadastroEmpresa';
import CadastroAuxiliar from './pages/CadastroAuxiliar';
import CadastroAuxiliarTecnica from './pages/CadastroAuxiliarTecnica';
import './App.css';

function AppContent() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  
  // Verifica se está em uma rota de cadastro (públicas - sempre mostram header normal)
  const isCadastroRoute = location.pathname === '/cadastro' ||
                          location.pathname === '/cadastro-tutor' ||
                          location.pathname === '/cadastro-clinica' ||
                          location.pathname === '/cadastro-responsavel-tecnico' ||
                          location.pathname === '/cadastro-veterinario' ||
                          location.pathname === '/cadastro-ambulancia' ||
                          location.pathname === '/cadastro-motorista' ||
                          location.pathname === '/cadastro-empresa' ||
                          location.pathname === '/cadastro-auxiliar' ||
                          location.pathname === '/cadastro-auxiliar-tecnica';
  
  // Verifica se está em uma rota do veterinário logado
  const isVeterinarioRoute = location.pathname.startsWith('/painel-veterinario') ||
                             location.pathname.startsWith('/pacientesVeterinario') ||
                             location.pathname.startsWith('/agendaVeterinario') ||
                             location.pathname.startsWith('/relatorioVeterinario') ||
                             location.pathname.startsWith('/configuracaoVeterinario') ||
                             location.pathname.startsWith('/artigosVeterinario') ||
                             location.pathname.startsWith('/edicaoArtigosVeterinario');

  // Verifica se está em uma rota de ambulância logada (exclui rotas de cadastro)
  const isAmbulanciaRoute = !isCadastroRoute && (
                            location.pathname.startsWith('/painel-ambulancia') ||
                            location.pathname.startsWith('/chamados') ||
                            location.pathname === '/historico' ||
                            location.pathname.startsWith('/ambulancia/relatorios') ||
                            location.pathname.startsWith('/ambulancia/configuracao') ||
                            location.pathname.startsWith('/ambulancia/perfil'));

  return (
    <div className="App">
      {isVeterinarioRoute ? <HeaderVeterinario /> : 
       isAmbulanciaRoute ? <HeaderAmbulancia /> : 
       <Header isLoggedIn={isLoggedIn} />}
      <main>
        <Routes>
          {/* rotas que qualquer usuario pode acessar, sem login */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/artigos" element={<Artigos />} />
          <Route path="/artigos-lista" element={<ArtigosLista />} />
          <Route path="/guias-primeiros-socorros" element={<GuiasPrimeirosSocorros />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/servicos/ver-perfil" element={<ServicosPlus />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/ambulancia" element={<Ambulancia />} />
          <Route path="/rastreamento-ambulancia" element={<RastreamentoAmbulancia />} />
          <Route path="/home-logado" element={<HomeLogado />} />
          <Route path="/metodo-pagamento" element={<MetodoPagamento />} />
          <Route path="/finalizar-pagamento" element={<FinalizarPagamento />} />
          <Route path="/pagamento-pix" element={<PagamentoPix />} />
          <Route path="/pagamento-cartao" element={<PagamentoCartao />} />
          <Route path="/pagamento-aprovado" element={<PagamentoAprovado />} />
          <Route path="/pagamento-recusado" element={<PagamentoRecusado />} />
          <Route path="/cadastro-clinica" element={<CadastroClinica />} />
          <Route path="/cadastro-responsavel-tecnico" element={<CadastroResponsavelTecnico />} />
          <Route path="/cadastro-tutor" element={<CadastroTutor />} />
          <Route path="/cadastro-veterinario" element={<CadastroVeterinario />} />
          
          {/* ROTAS PROTEGIDAS -Aqui só a clinica pode acessar*/}
          <Route 
            path="/painel-clinica" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <PainelClinica />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profissionais-clinica" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <ProfissionaisClinica />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cadastrar-profissional" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <CadastrarProfissional />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/perfil-profissional/:id" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <PerfilProfissional />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/editar-perfil-profissional/:id" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <EditarPerfilProfissional />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/relatorios" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <Relatorios />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/configuracoes-sistema" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <ConfiguracoesSistema />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/agendamento-clinica" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <AgendamentosClinica />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/gestao-ambulancia" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <GestaoAmbulancia />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/registro-ocorrencia" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <RegistroOcorrencia />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/novo-agendamento" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <NovoAgendamento />
              </ProtectedRoute>
            } 
          />

          {/* ROTAS PROTEGIDAS -Aqui só o tutor pode acessar*/}
          <Route 
            path="/painel-tutor" 
            element={
              <ProtectedRoute allowedRoles="tutor">
                <PainelTutor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute allowedRoles="tutor">
                <Perfil />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/agendamento-tutor" 
            element={
              <ProtectedRoute allowedRoles="tutor">
                <Agendamentos />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cadastro-pet" 
            element={
              <ProtectedRoute allowedRoles="tutor">
                <CadastroPet />
              </ProtectedRoute>
            } 
          />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/agendar-servico" element={<AgendarServico />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* ROTAS DE AMBULÂNCIA */}
          <Route path="/painel-ambulancia" element={<PainelAmbulancia />} />
          <Route path="/cadastro-ambulancia" element={<CadastroAmbulancia />} />
          <Route path="/cadastro-motorista" element={<CadastroMotorista />} />
          <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
          <Route path="/cadastro-auxiliar" element={<CadastroAuxiliar />} />
          <Route path="/cadastro-auxiliar-tecnica" element={<CadastroAuxiliarTecnica />} />
          <Route path="/ambulancia/configuracao/notificacao" element={<AmbulanciaConfiguracaoNotificacao />} />
          <Route path="/ambulancia/configuracao/seguranca" element={<AmbulanciaConfiguracaoSeguranca />} />
          <Route path="/ambulancia/configuracao/veiculo" element={<AmbulanciaConfiguracaoVeiculo />} />
          <Route path="/ambulancia/configuracao/financeiro" element={<AmbulanciaFinanceiro />} />
          <Route path="/ambulancia/perfil" element={<AmbulanciaPerfil />} />
          <Route path="/ambulancia/relatorios" element={<AmbulanciaRelatorios />} />
          <Route path="/chamados/finalizados" element={<ChamadosFinalizados />} />
          <Route path="/chamados/pendentes" element={<ChamadosPendentes />} />
          <Route path="/historico" element={<Historico />} />
          
          {/* ROTAS DO VETERINÁRIO */}
          <Route path="/painel-veterinario" element={<PainelVeterinario />} />
          <Route path="/pacientesVeterinario" element={<PacientesVeterinario />} />
          <Route path="/agendaVeterinario" element={<AgendaVeterinario />} />
          <Route path="/relatorioVeterinario" element={<RelatorioVeterinario />} />
          <Route path="/configuracaoVeterinario" element={<ConfiguracaoVeterinario />} />
          <Route path="/artigosVeterinario" element={<ArtigosVeterinario />} />
          <Route path="/edicaoArtigosVeterinario" element={<EdicaoArtigosVeterinario />} />
          <Route path="/edicaoArtigosVeterinario/:id" element={<EdicaoArtigosVeterinario />} />
          
          {/* rota pra quando nao pode acessar */}
          <Route path="/acesso-negado" element={<AcessoNegado />} />
        </Routes>
      </main>
      <Footer />
      <ChatBotButton />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
          <Notification />
          <ConfirmDialog />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

