// src/components/FetchHello.tsx
"use client";

import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';

const FetchHello = () => {
  const [data, setData] = useState<{ message: string; status: number } | null>(null);
  const [error, setError] = useState<string | null>(null); // Adicionando estado para erros

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/hello'); // Atualizando para o URL do Django
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Lidar com resposta de erro
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError('Erro ao buscar dados'); // Configurar mensagem de erro
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {data.message}
      </Typography>
      <Typography variant="body1">
        Status: {data.status}
      </Typography>
    </Box>
  );
};

export default FetchHello;
