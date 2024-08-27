'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const LOCAL_API_BASE_URL = 'http://localhost:8000/api/consignatarias/';
const LOCAL_API_TOKEN = '682770e6bbe57c2736138619840a564bd0775486';

const fetchConsignatariaFromLocalApi = async () => {
    const { data } = await axios.get(`${LOCAL_API_BASE_URL}`, {
      headers: { 'Authorization': `Token ${LOCAL_API_BASE_URL}` }
    });
    return data;
  };

  
export const useConsignataria = () =>{
    const localQuery = useQuery({
        queryKey: ['consignatariaLocal', ],
        queryFn: () => 
            fetchConsignatariaFromLocalApi(),
    })

    return {
        localData: localQuery.data,
      };
    
   };
  
