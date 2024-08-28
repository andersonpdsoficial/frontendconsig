'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const LOCAL_API_BASE_URL = 'http://localhost:8000/api/consultas-margem-athenas/';
const LOCAL_API_TOKEN = '682770e6bbe57c2736138619840a564bd0775486';

const fetchMargemServidor = async (servidorId: number, consignatariaId: number) => {
  try {
    const { data } = await axios.get(`${LOCAL_API_BASE_URL}margem-servidor/`, {
      params: { servidor: servidorId, consignataria: consignatariaId },
      headers: { 'Authorization': `Token ${LOCAL_API_TOKEN}` }
    });
    return data;
  } catch (error) {
    console.error("Erro ao buscar margem do servidor:", error);
    throw new Error(error.response?.data?.detail || 'Erro ao buscar dados da margem do servidor');
  }
};

export const useConsultaMargemServidor = (servidorId: number | null, consignatariaId: number | null) => {
  const query = useQuery({
    queryKey: ['margemServidor', servidorId, consignatariaId],
    queryFn: () => {
      if (servidorId === null || consignatariaId === null) {
        return Promise.resolve(null); // Retorna null se os IDs não forem válidos
      }
      return fetchMargemServidor(servidorId, consignatariaId);
    },
    enabled: !!servidorId && !!consignatariaId, // Habilita a consulta se ambos IDs estiverem definidos
    retry: false, // Não tenta novamente em caso de falha
    staleTime: 60000, // Define o tempo de cache dos dados (1 minuto)
  });

  return {
    margemData: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
