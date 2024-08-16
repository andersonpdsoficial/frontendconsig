// apiService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer 682770e6bbe57c2736138619840a564bd0775486`
  }
});

// Função para buscar um servidor específico
export const getServidor = async (id: number) => {
  try {
    const response = await api.get(`/servidores/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar servidor:', error);
    throw error;
  }
};
