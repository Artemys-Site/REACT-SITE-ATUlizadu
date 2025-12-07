// Configuração da API
// URL base do backend hospedado no Azure
export const API_BASE_URL = 'https://apiartemys20251205182055-ffh8dzf7auf2hrdp.centralus-01.azurewebsites.net';

// Em desenvolvimento, o Vite proxy redireciona /api para o backend
// Em produção no Vercel, o vercel.json faz o rewrite de /api para o backend
// Por padrão, usamos /api que funciona tanto em desenvolvimento quanto em produção
export const API_URL = '/api';

// Função auxiliar para obter a URL completa quando necessário
// Em desenvolvimento e produção, usa /api (que é redirecionado pelo proxy/rewrite)
// Se precisar da URL completa diretamente, use API_BASE_URL + endpoint
export const getFullApiUrl = (endpoint) => {
  // Remove a barra inicial se existir
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // Sempre usa o endpoint relativo /api, que será redirecionado:
  // - Em desenvolvimento: pelo proxy do Vite (vite.config.js)
  // - Em produção: pelo rewrite do Vercel (vercel.json)
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

