import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Artigos from './pages/Artigos';
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
import FAQ from './pages/FAQ';
import AcessoNegado from './pages/AcessoNegado';
import ChatBotButton from './components/ChatBotButton';
import './App.css';

function AppContent() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/artigos" element={<Artigos />} />
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
          
          {/* rotas protegidas - so clinica pode acessar */}
          <Route 
            path="/painel-clinica" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <PainelClinica />
              </ProtectedRoute>
            } 
          />
          {/* rota protegida - so tutor pode acessar */}
          <Route 
            path="/painel-tutor" 
            element={
              <ProtectedRoute allowedRoles="tutor">
                <PainelTutor />
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
            path="/agendamento-clinica" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <AgendamentosClinica />
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
          <Route 
            path="/cadastro-pet" 
            element={
              <ProtectedRoute allowedRoles="tutor">
                <CadastroPet />
              </ProtectedRoute>
            } 
          />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/faq" element={<FAQ />} />
          
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
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
