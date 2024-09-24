

import axios, { Axios } from 'axios';

//busca de servidor na api externa SERVIDORES
const EXTERNAL_API_BASE_URL = 'https://athenas.defensoria.ro.def.br/api/servidores/';
const EXTERNAL_API_TOKEN = '682770e6bbe57c2736138619840a564bd0775486';

const externalApi = axios.create({
  baseURL: EXTERNAL_API_BASE_URL,
  headers: {
    'Authorization': `Token ${EXTERNAL_API_TOKEN}`
  }
});


//Busca de servidor na api externa no CONSIGNADO
const EXTERNAL__CONSIGNADO_API_BASE_URL = 'https://athenas.defensoria.ro.def.br/api/consignado/';
const EXTERNAL_CONSIGNADO_API_TOKEN = '682770e6bbe57c2736138619840a564bd0775486';

const externalConsignadoApi = axios.create({
  baseURL: EXTERNAL__CONSIGNADO_API_BASE_URL,
  headers: {
    'Authorization': `Token ${EXTERNAL_CONSIGNADO_API_TOKEN}`
  }
});

//Busca de dados na api local
const LOCAL_API_BASE_URL = 'http://localhost:8000/api';
const LOCAL_API_TOKEN = '682770e6bbe57c2736138619840a564bd0775486';

const localApi = axios.create({
  baseURL: LOCAL_API_BASE_URL,
   headers: {
     'Authorization': `Bearer ${LOCAL_API_TOKEN}`
 }
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

// Função para buscar o servidor na API externa consignado
export const fetchServidorConsignadoFromExternalApi = async (matricula: number) => {
  try {
    const response = await externalConsignadoApi.get(`?matricula=${matricula}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar servidor na API externa consignado:', error);
    throw error;
  }
};

// Função para buscar a consignataria  na API local
export const fetchConsignatariaFromLocalApi = async () =>{
  try{
    const response = await localApi.get(`/consignatarias/`);
    return response.data;
  } catch (error){
    console.log('Erro ao buscar consignataria na Api Local:', error);
    throw error;
  }
}


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

// Função para criar um novo servidor na API local
//Essa função foi desativada por não ser necessario
// export const createServidor = async (servidorData: {
//   nome: string;
//   matricula: string;
//   cadastradoPor?: string;
//   modificadoPor?: string;
//   desativadoPor?: string;
//   desativadoEmData?: string;
//   desativadoEmHora?: string;
// }) => {
//   try {
//     const response = await localApi.post('/servidores/', servidorData, {
//       headers: {
//         'Authorization': `Bearer ${LOCAL_API_TOKEN}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao criar servidor na API local:', error);
//     throw error;
//   }
// };


//Função para criar uma nova consulta de margem na API local
export const createConsultaMargem = async (id_servidor: number, id_consignataria: number) => {
  try {
    const response = await localApi.post('/consultas-margem-athenas/', {
      servidor: id_servidor,
      consignataria: id_consignataria
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar consulta de margem:', error);
    throw error;
  }
};


// Função para verificar se um contrato já existe
export const checkContratoExists = async (contrato: number) => {
  try {
    const response = await localApi.get(`/reservas/${contrato}`, {
      headers: { 'Authorization': `Bearer ${LOCAL_API_TOKEN}` }
    });
    return response.status === 200; // Retorna true se o contrato já existe
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false; // Contrato não encontrado
    }
    console.error('Erro ao verificar existência do contrato:', error);
    throw new Error('Erro ao verificar existência do contrato');
  }
};

// Função para criar uma nova reserva
export const fetchreRervaFromLocalApi = async (reservaData: {
  valor: number;
  consulta?: string;
  prazoInicial?: string;
  prazoFinal?: string;
  prazoInicialEmData?: string;
  prazoFinalEmHora?: string;
  situacao: string; // Corrigido o nome da propriedade
  contrato: number;
  cpf: number;
  nome: string;
  valorDisponivel: number;
  margemTotal: number;
  vencimentoParcela?: string;
  vencimentoParcelaEmData?: string;
  totalFinanciado: number;
  liquidoLiberado: number;
  observacoes: string;
  cet: number;
  quantidadeParcelas: number;
  valorParcelas: number;
  jurosMensal: number;
  valorIof: number;
  carenciaDias: number;
  valorCarencia: number;
  vinculo: string;
  margemAntes: number;
  margemApos: number;
  cadastradoPor?: string;
  modificadoPor?: string;
  desativadoPor?: string;
  desativadoEmData?: string;
  desativadoEmHora?: string;
}) => {
  if (reservaData.situacao !== '0') {
    console.error('A situação deverá sempre ser 0, pois é EM ANALISE');
    throw new Error('A situação deverá sempre ser 0, pois é EM ANALISE');
  }

  try {
    const exists = await checkContratoExists(reservaData.contrato);
    if (exists) {
      console.error('Contrato já existente, favor informar outro');
      throw new Error('Contrato já existente, favor informar outro');
    }

    const response = await localApi.post('/reservas/', reservaData, {
      headers: { 'Authorization': `Bearer ${LOCAL_API_TOKEN}` }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar Reserva na API local:', error);
    throw error;
  }
};


//gerencie as reservas diretamente do banco de dados. 

export const fetchReservaFromLocalApi = async () => {
  try {
    const response = await localApi.get('/reservas/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar reservas na API local:', error);
    throw error;
  }
};

export const updateSituacaoInLocalApi = async (id, situacao) => {
  try {
    // Envia apenas o campo 'situacao' na requisição PATCH
    await localApi.patch(`/reservas/${id}/`, situacao);
  } catch (error) {
    console.error('Erro ao atualizar situação na API local:', error);
    throw error;
  }
};




export const deleteReservaInLocalApi = async (id) => {
  try {
    await localApi.delete(`/reservas/${id}/`);
  } catch (error) {
    console.error('Erro ao deletar reserva na API local:', error);
    throw error;
  }
};

// Função de criação de reserva (não alterada, mas pode ser removida se for redundante)
export const createReserva = async (reservaData: any) => {
  try {
    const response = await localApi.post('/reservas/', reservaData, {
      headers: { 'Authorization': `Token ${LOCAL_API_BASE_URL}` }
    });
    return response.data; // Retorna os dados da reserva criada, incluindo o número do contrato
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    throw new Error('Erro ao criar reserva');
  }
};


// Função para buscar consultas
export const fetchConsultas = async () => {
  try {
    const response = await localApi.get('/consultas-margem-athenas/', {
      headers: { 'Authorization': `Token ${LOCAL_API_TOKEN}` } // Certifique-se de incluir o header se necessário
    });
    
    // Verifique se a resposta é um array
    if (Array.isArray(response.data.results)) {
      return response.data.results;
    } else {
      console.error('Resposta da API não é um array:', response.data);
      return []; // Retorne um array vazio para evitar erros
    }
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    return []; // Retorne um array vazio em caso de erro
  }
};



// Função para buscar a margem disponível do servidor na API local
export const fetchMargemServidor = async (matricula: number, id_consignataria: number) => {
  try {
    const response = await localApi.post('/api/consultas-margem-athenas/', {
      servidor: matricula,
      consignataria: id_consignataria
    });

    const { margemDisponivel, servidor, consignataria } = response.data

    // Verifique se os dados estão no formato correto
    return {
      margemDisponivel,
      servidor,
      consignataria
    };
  } catch (error) {
    console.error('Erro ao buscar margem do servidor na API local:', error);
    throw error;
  }
};
