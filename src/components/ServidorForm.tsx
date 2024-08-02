// src/components/ServidorForm.tsx
"use client";

import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const ServidorForm = () => {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/servidores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, matricula }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Servidor criado:', result);
      } else {
        console.error('Erro ao criar servidor:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Cadastrar Servidor
      </Typography>
      <TextField
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        label="Nome"
        required
        variant="outlined"
      />
      <TextField
        type="number"
        value={matricula}
        onChange={(e) => setMatricula(Number(e.target.value))}
        label="Matrícula"
        required
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Cadastrar Servidor
      </Button>
    </Box>
  );
};

export default ServidorForm;
