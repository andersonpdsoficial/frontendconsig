// src/components/ConsultaMargemForm.tsx
"use client";

import { useState } from 'react';
import { TextField, Button, Typography, Box, Snackbar } from '@mui/material';

const ConsultaMargemForm = () => {
  const [matricula, setMatricula] = useState<number | ''>('');
  const [idConsignataria, setIdConsignataria] = useState<number | ''>('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para controlar o Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Mensagem do Snackbar

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/consultas', { // Atualizando para o URL do Django
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matricula, id_consignataria: idConsignataria }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Consulta realizada:', result);
      setSnackbarMessage('Consulta realizada com sucesso!'); // Mensagem de sucesso
      setOpenSnackbar(true); // Abrir Snackbar
      // Limpar os campos após a consulta
      setMatricula('');
      setIdConsignataria('');
    } else {
      console.error('Erro ao consultar margem');
      setSnackbarMessage('Erro ao consultar margem!'); // Mensagem de erro
      setOpenSnackbar(true); // Abrir Snackbar
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Fechar Snackbar
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Consultar Margem de Crédito
      </Typography>
      <TextField
        type="number"
        label="Matrícula"
        variant="outlined"
        value={matricula}
        onChange={(e) => setMatricula(Number(e.target.value))}
        fullWidth
        required
      />
      <TextField
        type="number"
        label="ID Consignatária"
        variant="outlined"
        value={idConsignataria}
        onChange={(e) => setIdConsignataria(Number(e.target.value))}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Consultar Margem
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Fechar
          </Button>
        }
      />
    </Box>
  );
};

export default ConsultaMargemForm;
