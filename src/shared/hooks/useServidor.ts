// src/shared/hooks/useServidor.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const EXTERNAL_API_BASE_URL = 'https://athenas.defensoria.ro.def.br/api/servidores/';
const EXTERNAL_API_TOKEN = '682770e6bbe57c2736138619840a564bd0775486';

const LOCAL_API_BASE_URL = 'http://localhost:8000/api';
const LOCAL_API_TOKEN = '682770e6bbe57c2736138619840a564bd0775486';

const fetchServidorFromExternalApi = async (matricula: number) => {
  const { data } = await axios.get(`${EXTERNAL_API_BASE_URL}?matricula=${matricula}`, {
    headers: { 'Authorization': `Token ${EXTERNAL_API_TOKEN}` }
  });
  return data;
};

const fetchServidorFromLocalApi = async (matricula: number) => {
  const { data } = await axios.get(`${LOCAL_API_BASE_URL}/servidores/?matricula=${matricula}`, {
    headers: { 'Authorization': `Token ${LOCAL_API_TOKEN}` }
  });
  return data;
};

export const useServidor = (matricula: number) => {
  const externalQuery = useQuery({
    queryKey: ['servidorExternal', matricula],
    queryFn: () => fetchServidorFromExternalApi(matricula),
    enabled: !!matricula,
  });

  const localQuery = useQuery({
    queryKey: ['servidorLocal', matricula],
    queryFn: () => fetchServidorFromLocalApi(matricula),
    enabled: !!externalQuery.data,
  });

  return {
    externalData: externalQuery.data,
    localData: localQuery.data,
    isLoading: externalQuery.isLoading || localQuery.isLoading,
    isError: externalQuery.isError || localQuery.isError,
    error: externalQuery.error || localQuery.error
  };
};
