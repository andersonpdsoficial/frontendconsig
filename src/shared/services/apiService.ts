

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

// //Função para buscar a margem  disponivel do servidor no athenas
// export const fetchValorMargemServidorFromLocalApi = async (consultaMargemAthenas: number)=>{
//   try{
//     const response = await localApi.get(`/consultas-margem-athenas/`)
//     return response.data;

//    } catch (error){
//     console.log('Erro ao Consultar Margem do Servidor', error);
//     throw error;
//    }
// }



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



// Função para excluir um servidor na API local não esta habilitado
export const deleteServidor = async (matricula: string) => {
  try {
    await localApi.delete(`/servidores/${matricula}/`);
  } catch (error) {
    console.error('Erro ao excluir servidor na API local:', error);
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


// Função para buscar a margem disponível do servidor na API local
export const fetchMargemServidor = async (matricula: number, id_consignataria: number) => {
  try {
    const response = await localApi.post('/consultas-margem-athenas/', {
      servidor: matricula,
      consignataria: id_consignataria
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar consulta de margem:', error);
    throw error;
  }
};



//Função para criar uma nova reseerva na api local 300130571
export const fetchreRervaFromLocalApi = async (reservaData: {

  valor: number;
  prazoInicial?: string;
  prazoFinal?: string;
  prazoInicialEmData?: string;
  prazoFinalEmHora?: string;
  situcao: string;
  contrato: number;
  contsulta?: string; 
  cadastradoPor?: string;
  modificadoPor?: string;
  desativadoPor?: string;
  desativadoEmData?: string;
  desativadoEmHora?: string;
}) => {
  try {
    const response = await localApi.post('/reservas/', reservaData, {
      headers: {
        'Authorization': `Bearer ${LOCAL_API_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar Reserva  na API local:', error);
    throw error;
  }
};



// Função para buscar a margem disponível do servidor na API local
export const fetchMargemServidor = async (matricula: number, id_consignataria: number) => {
  try {
    // Realiza a consulta na API local
    const response = await localApi.post('/consultas-margem-athenas/', {
      servidor: matricula,
      consignataria: id_consignataria
    });

    // Se o response contiver tanto os dados do servidor quanto da consignatária,
    // podemos simplesmente retornar ambos juntos
    const { margemDisponivel, servidor, consignataria } = response.data;

    // Retorna os dados do servidor e da consignatária
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
