

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

export const fetchDataForNewLoan = async (matricula: string) => {
  try {
    // Supondo que você tenha endpoints para obter essas informações
    const externalDataResponse = await axios.get(`http://api.example.com/servidor/${matricula}`);
    const externalData = externalDataResponse.data;

    const localDataResponse = await axios.get(`http://api.example.com/local/${externalData.matricula}`);
    const localData = localDataResponse.data;

    const consignatariaDataResponse = await axios.get('http://api.example.com/consignataria');
    const consignatariaData = consignatariaDataResponse.data;
    const consignatariaId = consignatariaData[0]?.id || 0;

    const margemDataResponse = await axios.get(`http://api.example.com/margem/${externalData.matricula}/${consignatariaId}`);
    const margemData = margemDataResponse.data;

    return {
      matricula: externalData.matricula,
      nome: externalData.nome,
      cpf: externalData.cpf,
      margemDisponivel: `R$ ${margemData.margemDisponivel}`,
      margemTotal: `R$ ${margemData.margemTotal}`,
      // Adicione outros campos conforme necessário
    };
  } catch (error) {
    console.error('Erro ao buscar dados para o novo empréstimo:', error);
    throw error;
  }
};


// // Função para buscar consultas
// export const fetchConsultas = async () => {
//   try {
//     const response = await localApi.get('/consultas-margem-athenas/');
//     return response.data; // Certifique-se de que isso é um array
//   } catch (error) {
//     console.error('Erro ao buscar consultas:', error);
//     throw new Error('Erro ao buscar consultas');
//   }
// };


export const createReserva = async (reservaData: any) => {
  try {
    const response = await axios.post(API_BASE_URL, reservaData, {
      headers: { 'Authorization': `Token ${API_TOKEN}` }
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
    const response = await axios.get('/consultas-margem-athenas/', {
      headers: { 'Authorization': `Token ${API_TOKEN}` }
    });
    return response.data; // Certifique-se de que isso é um array
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    throw new Error('Erro ao buscar consultas');
  }
};