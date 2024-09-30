// useRelatorio.ts

import { useEffect, useState } from 'react';
import { fetchConsignatariasData, fetchConsultasData, fetchReservasForReports } from '../services/apiService';


const useRelatorio = () => {
  const [data, setData] = useState({
    contratos: [],
    consignatarias: [],
    consultas: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [reservas, consignatarias, consultas] = await Promise.all([
          fetchReservasForReports(),
          fetchConsignatariasData(),
          fetchConsultasData(),
        ]);
        setData({ contratos: reservas, consignatarias, consultas });
      } catch (err) {
        setError('Erro ao carregar dados do relatório.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return { data, isLoading, error };
};

export default useRelatorio;
