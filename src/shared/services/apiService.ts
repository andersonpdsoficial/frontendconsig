// apiService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer 682770e6bbe57c2736138619840a564bd0775486`
  }
});

// Função para buscar um servidor específico pela matrícula
export const getServidor = async (matricula: number) => {
  try {
    const response = await api.get(`/servidores?matricula=${matricula}`);
    if (response.data.length === 0) {
      return null; // Se nenhum servidor for encontrado
    }
    return response.data[0]; // Supondo que a resposta seja um array e você quer o primeiro item
  } catch (error) {
    console.error('Erro ao buscar servidor:', error);
    throw error;
  }
};
