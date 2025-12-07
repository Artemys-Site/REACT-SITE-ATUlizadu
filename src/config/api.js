// Configuração da API
// URL base do backend hospedado no Azure
export const API_BASE_URL = 'https://apiartemys20251205182055-ffh8dzf7auf2hrdp.centralus-01.azurewebsites.net';

// Em desenvolvimento, o Vite proxy redireciona /api para o backend
// Em produção, você pode configurar o servidor web para fazer proxy ou usar a URL completa
// Por padrão, usamos /api que funciona com o proxy do Vite em desenvolvimento
export const API_URL = '/api';

// Função auxiliar para obter a URL completa quando necessário (produção sem proxy)
export const getFullApiUrl = (endpoint) => {
  // Remove a barra inicial se existir
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // Em desenvolvimento, usa o proxy (retorna endpoint relativo)
  // Em produção, retorna URL completa (se não houver proxy configurado no servidor)
  if (import.meta.env.DEV) {
    return cleanEndpoint;
  }
  
  // Em produção, você pode descomentar a linha abaixo se não houver proxy no servidor
  // return `${API_BASE_URL}${cleanEndpoint}`;
  
  // Por padrão, assume que há proxy configurado no servidor de produção
  return cleanEndpoint;
};

// Endpoints da API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
  },
  TUTORS: {
    CREATE: '/api/Tutors',
    GET: (id) => `/api/Tutors/${id}`,
    UPDATE: (id) => `/api/Tutors/${id}`,
    DELETE: (id) => `/api/Tutors/${id}`,
  },
  // Adicione outros endpoints conforme necessário
};

export default {
  API_BASE_URL,
  API_URL,
  API_ENDPOINTS,
  getFullApiUrl,
};

