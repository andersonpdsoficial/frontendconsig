// src/components/ReservaForm.tsx
"use client";

import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const ReservaForm = () => {
  const [valor, setValor] = useState<number | ''>('');
  const [idConsulta, setIdConsulta] = useState<number | ''>('');
  const [prazoInicial, setPrazoInicial] = useState('');
  const [prazoFinal, setPrazoFinal] = useState('');
  const [contrato, setContrato] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/reservas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valor,
          consulta: idConsulta,
          prazo_inicial: prazoInicial,
          prazo_final: prazoFinal,
          contrato,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Reserva criada:', result);
      } else {
        console.error('Erro ao criar reserva:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Criar Reserva
      </Typography>
      <TextField
        type="number"
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
        label="Valor"
        required
        variant="outlined"
      />
      <TextField
        type="number"
        value={idConsulta}
        onChange={(e) => setIdConsulta(Number(e.target.value))}
        label="ID Consulta"
        required
        variant="outlined"
      />
      <TextField
        type="datetime-local"
        value={prazoInicial}
        onChange={(e) => setPrazoInicial(e.target.value)}
        label="Prazo Inicial"
        required
        variant="outlined"
      />
      <TextField
        type="datetime-local"
        value={prazoFinal}
        onChange={(e) => setPrazoFinal(e.target.value)}
        label="Prazo Final"
        required
        variant="outlined"
      />
      <TextField
        type="text"
        value={contrato}
        onChange={(e) => setContrato(e.target.value)}
        label="Contrato"
        required
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Criar Reserva
      </Button>
    </Box>
  );
};

export default ReservaForm;
