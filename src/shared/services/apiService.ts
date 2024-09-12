

import axios, { Axios } from 'axios';


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
export const createServidor = async (servidorData: {
  nome: string;
  matricula: string;
  cadastradoPor?: string;
  modificadoPor?: string;
  desativadoPor?: string;
  desativadoEmData?: string;
  desativadoEmHora?: string;
}) => {
  try {
    const response = await localApi.post('/servidores/', servidorData, {
      headers: {
        'Authorization': `Bearer ${LOCAL_API_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar servidor na API local:', error);
    throw error;
  }
};


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


//Função para criar uma nova reseerva na api local 
export const fetchreRervaFromLocalApi = async (reservaData: {

  valor: number;
  consulta?: string; 
  prazoInicial?: string;
  prazoFinal?: string;
  prazoInicialEmData?: string;
  prazoFinalEmHora?: string;
  situcao: string;
  contrato: number;
  cpf:number;
  nome:string;
  valorDisponivel: number;
  margemTotal:number;
  vencimentoParcela?: string;
  vencimentoParcelaEmData?: string;
  totalFinanciado: number;
  liquidoLiberado: number;
  observacoes: string;
  cet: number;
  quantidadeParcelas: number;
  valorParcelas:number;
  jurosMensal:number;
  valorIof:number;
  carenciaDias: number;
  valorCarencia:number;
  vinculo:string;
  margemAntes:number;
  margemApos:number;
  cadastradoPor?: string;
  modificadoPor?: string;
  desativadoPor?: string;
  desativadoEmData?: string;
  desativadoEmHora?: string;
}) => {
  try {
    const response = await localApi.post('/reservas/', reservaData, {
      // headers: {
      //   'Authorization': `Bearer ${LOCAL_API_TOKEN}`
      // }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar Reserva  na API local:', error);
    throw error;
  }
};

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
      // headers: { 'Authorization': `Token ${LOCAL_API_TOKEN}` } // Certifique-se de incluir o header se necessário
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
