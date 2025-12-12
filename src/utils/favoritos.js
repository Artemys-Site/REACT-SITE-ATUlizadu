// Utilitário para gerenciar favoritos de artigos e guias

const FAVORITOS_KEY = 'artigos_favoritos';

// Obter todos os favoritos
export const getFavoritos = () => {
  try {
    const favoritos = localStorage.getItem(FAVORITOS_KEY);
    return favoritos ? JSON.parse(favoritos) : [];
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return [];
  }
};

// Adicionar aos favoritos
export const adicionarFavorito = (item) => {
  try {
    const favoritos = getFavoritos();
    // Verificar se já existe
    const existe = favoritos.some(fav => fav.id === item.id && fav.tipo === item.tipo);
    if (!existe) {
      favoritos.push({
        ...item,
        dataAdicionado: new Date().toISOString()
      });
      localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    return false;
  }
};

// Remover dos favoritos
export const removerFavorito = (id, tipo) => {
  try {
    const favoritos = getFavoritos();
    const novosFavoritos = favoritos.filter(fav => !(fav.id === id && fav.tipo === tipo));
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(novosFavoritos));
    return true;
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    return false;
  }
};

// Verificar se está favoritado
export const isFavoritado = (id, tipo) => {
  try {
    const favoritos = getFavoritos();
    return favoritos.some(fav => fav.id === id && fav.tipo === tipo);
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    return false;
  }
};

// Limpar todos os favoritos
export const limparFavoritos = () => {
  try {
    localStorage.removeItem(FAVORITOS_KEY);
    return true;
  } catch (error) {
    console.error('Erro ao limpar favoritos:', error);
    return false;
  }
};


