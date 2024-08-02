// src/components/ConsignatariaForm.tsx
"use client";

import { useState } from 'react';
import { TextField, Button, Typography, Box, Snackbar } from '@mui/material';

const ConsignatariaForm = () => {
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para controlar o Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Mensagem do Snackbar

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/consignatarias', { // Atualizando para o URL do Django
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, cpf_cnpj: cpfCnpj }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Consignatária criada:', result);
      setSnackbarMessage('Consignatária criada com sucesso!'); // Mensagem de sucesso
      setOpenSnackbar(true); // Abrir Snackbar
      // Limpar os campos após o envio
      setNome('');
      setCpfCnpj('');
    } else {
      console.error('Erro ao criar consignatária');
      setSnackbarMessage('Erro ao criar consignatária!'); // Mensagem de erro
      setOpenSnackbar(true); // Abrir Snackbar
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Fechar Snackbar
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Cadastrar Consignatária
      </Typography>
      <TextField
        label="Nome"
        variant="outlined"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="CPF ou CNPJ"
        variant="outlined"
        value={cpfCnpj}
        onChange={(e) => setCpfCnpj(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Cadastrar Consignatária
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

export default ConsignatariaForm;
