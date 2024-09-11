// useReserva.ts

import { useMutation } from '@tanstack/react-query';
import { createReserva } from '../services/apiService';


export const useReserva = () => {
  return useMutation({
    mutationFn: createReserva,
    onError: (error) => {
      console.error('Erro na criação da reserva:', error);
    },
    onSuccess: (data) => {
      console.log('Reserva criada com sucesso:', data);
    }
  });
};
