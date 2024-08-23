

import axios from 'axios';

const EXTERNAL_API_BASE_URL = 'https://athenas.defensoria.ro.def.br/api/servidores/';
const EXTERNAL_API_TOKEN = '682770e6bbe57c2736138619840a564bd0775486';

const externalApi = axios.create({
  baseURL: EXTERNAL_API_BASE_URL,
  headers: {
    'Authorization': `Token ${EXTERNAL_API_TOKEN}`
  }
});

const LOCAL_API_BASE_URL = 'http://localhost:8000/api';
const LOCAL_API_TOKEN = '682770e6bbe57c2736138619840a564bd0775486';

const localApi = axios.create({
  baseURL: LOCAL_API_BASE_URL,
  // headers: {
  //   'Authorization': `Bearer ${LOCAL_API_TOKEN}`
  // }
});

// Função para buscar o servidor na API externa
export const fetchServidorFromExternalApi = async (matricula: number) => {
  try {
    const response = await externalApi.get(`?matricula=${matricula}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar servidor na API externa:', error);
    throw error;
  }
};

// Função para buscar o servidor na API local
export const fetchServidorFromLocalApi = async (matricula: number) => {
  try {
    const response = await localApi.get(`/servidores/?matricula=${matricula}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar servidor na API local:', error);
    throw error;
  }
};
