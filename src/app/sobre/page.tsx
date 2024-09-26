'use client'
import { Container, Typography, Button, Link } from "@mui/material";
import React from "react";
import Home from "../page";


const Movimentos: React.FC = () =>{
    return (

        <>
        
            <div>
  
                <h1> Essa pagina é ref Sobre  </h1>
               
            </div>
        </>
    )
}
export default Movimentos



// Determine o parâmetro de busca baseado em matricula ou cpf
const searchParamMatricula = matricula !== null ? matricula : undefined;
const searchParamCpf = cpf !== '' ? cpf : undefined;

// Fetch data based on search parameter
const { externalData, localData, isLoading, isError, error: fetchError } = useServidor(searchParamMatricula, searchParamCpf);












'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const EXTERNAL_API_BASE_URL = 'https://athenas.defensoria.ro.def.br/api/servidores/';
const EXTERNAL_API_TOKEN = '682770e6bbe57c2736138619840a564bd0775486';

const LOCAL_API_BASE_URL = 'http://localhost:8000/api';
const LOCAL_API_TOKEN = '682770e6bbe57c2736138619840a564bd0775486';

// Função para buscar servidor pela matrícula ou CPF na API externa
const fetchServidorFromExternalApi = async (matricula?: number, cpf?: string) => {
  const queryParam = matricula ? `matricula=${matricula}` : `cpf=${cpf}`;
  const { data } = await axios.get(`${EXTERNAL_API_BASE_URL}?${queryParam}`, {
    headers: { 'Authorization': `Token ${EXTERNAL_API_TOKEN}` }
  });
  return data;
};

// Função para buscar servidor pela matrícula ou CPF na API local
const fetchServidorFromLocalApi = async (matricula?: number, cpf?: string) => {
  const queryParam = matricula ? `matricula=${matricula}` : `cpf=${cpf}`;
  const { data } = await axios.get(`${LOCAL_API_BASE_URL}/servidores/?${queryParam}`, {
    headers: { 'Authorization': `Token ${LOCAL_API_TOKEN}` }
  });
  return data;
};

// Hook atualizado para aceitar matrícula ou CPF
export const useServidor = (matricula?: number, cpf?: string) => {
  const externalQuery = useQuery({
    queryKey: ['servidorExternal', matricula || cpf],
    queryFn: () => fetchServidorFromExternalApi(matricula, cpf),
    enabled: !!matricula || !!cpf,
  });

  const localQuery = useQuery({
    queryKey: ['servidorLocal', matricula || cpf],
    queryFn: () => fetchServidorFromLocalApi(matricula, cpf),
    enabled: !!externalQuery.data,
  });

  return {
    externalData: externalQuery.data,
    localData: localQuery.data?.results,
    isLoading: externalQuery.isLoading || localQuery.isLoading,
    isError: externalQuery.isError || localQuery.isError,
    error: externalQuery.error || localQuery.error
  };
};
