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
import Relatorios from './pages/Relatorios';
import AcessoNegado from './pages/AcessoNegado';
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
          
          {/* Rotas protegidas por role - apenas clínica */}
          <Route 
            path="/painel-clinica" 
            element={
              <ProtectedRoute allowedRoles="clinica">
                <PainelClinica />
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
            path="/perfil" 
            element={
              <ProtectedRoute allowedRoles="tutor">
                <Perfil />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/agendamentos" 
            element={
              <ProtectedRoute allowedRoles={['tutor', 'clinica']}>
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
          
          {/* Rota de acesso negado */}
          <Route path="/acesso-negado" element={<AcessoNegado />} />
        </Routes>
      </main>
      <Footer />
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
