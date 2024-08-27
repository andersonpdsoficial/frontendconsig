'use client'
import { useState } from 'react';
import { createConsultaMargem } from '../services/apiService';


export const useConsultaMargem = (servidorId: number, consignatariaId: number) => {
  const [margemTotal, setMargemTotal] = useState<string>('');
  const [margemDisponivel, setMargemDisponivel] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const consultarMargem = async () => {
    setLoading(true);
    try {
      const result = await createConsultaMargem(servidorId, consignatariaId);
      setMargemTotal(result.margem_total || '');
      setMargemDisponivel(result.margem_disponivel || '');
    } catch (error) {
      console.error('Erro ao consultar margem:', error);
    } finally {
      setLoading(false);
    }
  };

  return { margemTotal, margemDisponivel, loading, consultarMargem };
};
