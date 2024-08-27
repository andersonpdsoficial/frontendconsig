'use client';

import axios from 'axios';

// Definições das constantes da API
const LOCAL_API_BASE_URL = 'http://localhost:8000/api/consultas-margem-athenas/';
const LOCAL_API_TOKEN = '682770e6bbe57c2736138619840a564bd0775486';

// Interface que define a estrutura da resposta da API
interface MargemResponse {
  id: number;
  margem_total: string;
  margem_disponivel: string;
  servidor: number;
  consignataria: number;
}

// Função que busca a margem total do servidor da API
const fetchValorMargemServidorFromLocalApi = async (servidorId: number): Promise<MargemResponse> => {
  const { data } = await axios.get<MargemResponse>(`${LOCAL_API_BASE_URL}?servidor=${servidorId}`, {
    headers: { 'Authorization': `Token ${LOCAL_API_TOKEN}` }
  });
  return data;
};

export default fetchValorMargemServidorFromLocalApi;
