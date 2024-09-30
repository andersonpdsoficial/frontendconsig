import { useEffect, useState } from 'react';
import { fetchReservasForReports } from '../services/apiService'; // Ajuste o caminho conforme necessário

const useGerenciamentoDeContrato = () => {
  const [contratos, setContratos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReservasForReports(); // Verifique a estrutura da resposta aqui
        console.log('Dados recebidos da API:', data);
        setContratos(data.results || data); // Ajuste aqui conforme necessário
      } catch (err) {
        setError('Erro ao buscar contratos.');
      }
    };
  
    fetchData();
  }, []);
  
  const groupedContratos = {
    deferidos: contratos.filter(contrato => contrato.situacao === 1), // Deferido
    indeferidos: contratos.filter(contrato => contrato.situacao === 2), // Indeferido
    emAnalise: contratos.filter(contrato => contrato.situacao === 0), // Em Análise
    expirados: contratos.filter(contrato => contrato.situacao === 3), // Expirado
  };

  return { groupedContratos, error };
};

export default useGerenciamentoDeContrato;
