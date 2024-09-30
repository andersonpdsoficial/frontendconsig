

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

// Função para buscar servidor pela matrícula ou CPF na API externa 
export const fetchServidorFromExternalApi = async (matricula?: number, cpf?: string) => {
  let queryParam;

  if (matricula) {
    queryParam = `matricula=${matricula}`;
  } else if (cpf) {
    queryParam = `pessoa_fisica__cpf=${cpf}`; // Padrão correto para CPF 300132117
  } else {
    throw new Error('Pelo menos um dos parâmetros deve ser fornecido: matrícula ou CPF.');
  }

  try {
    const { data } = await axios.get(`${EXTERNAL_API_BASE_URL}?${queryParam}`, {
      headers: { 'Authorization': `Token ${EXTERNAL_API_TOKEN}` }
    });
    return data;
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

// Função para buscar servidor pela matrícula ou CPF na API externa
// export const fetchServidorFromExternalApi = async (matricula?: number, cpf?: string) => {
//   const queryParam = matricula ? `matricula=${matricula}` : `cpf=${cpf}`;
//   const { data } = await axios.get(`${EXTERNAL_API_BASE_URL}?${queryParam}`, {
//     headers: { 'Authorization': `Token ${EXTERNAL_API_TOKEN}` }
//   });
//   return data;
// };
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


// // Função para buscar o servidor na API externa consignado
// export const fetchServidorFromExternalApiServidor = async (cpf: number) => {
//   try {
//     const response = await externalApi.get(`?cpf=${cpf}`);
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao buscar servidor na API externa consignado:', error);
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
  folha?: number;
  prazoInicial?: string;
  prazoFinal?: string;
  prazoInicialEmData?: string;
  prazoFinalEmHora?: string;
  situacao: number; // Corrigido o nome da propriedade
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
  if (reservaData.situacao !== 0 ){
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
//Função para atualizar status da situação 
export const updateSituacaoInLocalApi = async (id,data) => {
  try {
    await localApi.patch(`/reservas/${id}/`,data ); 
    console.log('Situação atualizada com sucesso.');
  } catch (error) {
    console.error('Erro ao atualizar situação na API local:', error);
    throw error; 
  }
};

export const deleteReservaInLocalApi = async (id) => {
  try {
    const response = await localApi.delete(`/reservas/${id}/`);
    
    // Log para confirmar que a reserva foi deletada com sucesso
    console.log('Reserva deletada com sucesso:', response.data);
    
    // Retorna os dados da resposta se necessário para a função chamadora
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Erro ao deletar reserva na API local:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error('Erro ao deletar reserva na API local: Nenhuma resposta recebida', error.request);
    } else {
      console.error('Erro ao deletar reserva na API local:', error.message);
    }
    
    throw error; // Re-lança o erro para que a função chamadora possa lidar com ele
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



// Função para buscar reservas para relatórios, agora com filtro por situação
export const fetchReservasForReports = async () => {
  try {
    const response = await localApi.get('/reservas/');
    return response.data; // Retorna todos os contratos
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    throw error;
  }
};



// Função para buscar as consignatárias
export const fetchConsignatariasData = async () => {
  try {
    const response = await localApi.get('/consignatarias/'); // Ajuste a URL conforme necessário
    return response.data; // Supondo que a resposta contenha os dados que você precisa
  } catch (error) {
    console.error('Erro ao buscar consignatárias:', error);
    throw new Error('Erro ao buscar consignatárias');
  }
};

// Função para buscar as consultas realizadas
export const fetchConsultasData = async () => {
  try {
    const response = await localApi.get('/consultas-margem-athenas/'); // Ajuste a URL conforme necessário
    return response.data; // Supondo que a resposta contenha os dados que você precisa
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    throw new Error('Erro ao buscar consultas');
  }
};
