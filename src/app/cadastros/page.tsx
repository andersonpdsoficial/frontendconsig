'use client'
import React, { useState, useRef } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { createServidor, deleteServidor } from '../../shared/services/apiService'; // Importe a função deleteServidor

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0D7B52',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#0A6E49',
  },
}));

const WhiteBox = styled(Box)({
  backgroundColor: '#fff',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
});

const LogoWrapper = styled(Box)({
  textAlign: 'center',
  marginBottom: '16px',
});

const MatriculaContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '8px',
  [theme.breakpoints.down('sm')]: {
    '& .MuiTextField-root': {
      width: '32px',
    },
  },
}));

const MatriculaField = styled(TextField)(({ theme }) => ({
  width: '40px',
  textAlign: 'center',
  '& .MuiInputBase-input': {
    padding: '10px',
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    width: '32px',
    fontSize: '0.8rem',
  },
}));

const CadastroForm: React.FC = () => {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState(Array(9).fill(''));
  const [cadastradoPor, setCadastradoPor] = useState('');
  const [modificadoPor, setModificadoPor] = useState('');
  const [desativadoPor, setDesativadoPor] = useState('');
  const [desativadoEmData, setDesativadoEmData] = useState('');
  const [desativadoEmHora, setDesativadoEmHora] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const matriculaRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validação dos campos obrigatórios
    if (!nome || matricula.join('').length !== 9) {
      setError('Nome e Matrícula são obrigatórios e a matrícula deve conter exatamente 9 dígitos.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await createServidor({
        nome,
        matricula: matricula.join(''),
        cadastradoPor,
        modificadoPor,
        desativadoPor,
        desativadoEmData,
        desativadoEmHora
      });
      setSuccessMessage('Cadastro realizado com sucesso!');
      handleClear(); // Limpa o formulário após o sucesso
    } catch (err) {
      setError('Erro ao salvar o cadastro. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const matriculaStr = matricula.join('');

    // Validação da matrícula obrigatória
    if (matriculaStr.length !== 9) {
      setError('A matrícula deve conter exatamente 9 dígitos.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteServidor(matriculaStr);
      setSuccessMessage('Cadastro excluído com sucesso!');
      handleClear(); // Limpa o formulário após a exclusão
    } catch (err) {
      setError('Erro ao excluir o cadastro. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNome('');
    setMatricula(Array(9).fill(''));
    setCadastradoPor('');
    setModificadoPor('');
    setDesativadoPor('');
    setDesativadoEmData('');
    setDesativadoEmHora('');
  };

  const handleMatriculaChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newMatricula = [...matricula];
    newMatricula[index] = value;
    setMatricula(newMatricula);

    if (value && index < 8) {
      const nextInput = matriculaRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F2F2F2', }}>
    <CustomizedList />
    <FloatingSearchButton />
    <CookiesBanner />
    <Box sx={{ padding: 2, backgroundColor: '#E0F2F1', minHeight: '100vh' }}>
      <LogoWrapper>
        <img src="/dpe-logo.png" alt="Logo da Defensoria" style={{ maxWidth: '150px' }} />
        <Typography variant="h6" gutterBottom>
          Sistema de Consignado da Defensoria Pública de Rondônia
        </Typography>
      </LogoWrapper>
      
      <WhiteBox>
        <Typography variant="h6"   gutterBottom >
          Cadastro
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome"
                variant="outlined"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                helperText="Nome completo (Nome e Sobrenome)"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ mb: 1 }}>Matrícula</Typography>
              <MatriculaContainer container>
                {matricula.map((value, index) => (
                  <Grid item key={index}>
                    <MatriculaField
                      variant="outlined"
                      value={value}
                      onChange={(e) => handleMatriculaChange(index, e.target.value)}
                      inputProps={{ maxLength: 1 }}
                      sx={{ bgcolor: '#E0F2F1' }}
                      inputRef={(ref) => matriculaRefs.current[index] = ref}
                    />
                  </Grid>
                ))}
              </MatriculaContainer>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cadastrado Por"
                variant="outlined"
                value={cadastradoPor}
                onChange={(e) => setCadastradoPor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Modificado Por"
                variant="outlined"
                value={modificadoPor}
                onChange={(e) => setModificadoPor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Desativado Por"
                variant="outlined"
                value={desativadoPor}
                onChange={(e) => setDesativadoPor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Desativado Em (Data)"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={desativadoEmData}
                onChange={(e) => setDesativadoEmData(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Desativado Em (Hora)"
                variant="outlined"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={desativadoEmHora}
                onChange={(e) => setDesativadoEmHora(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <CustomButton type="submit" variant="contained" sx={{ mr: 1 }} disabled={loading}>
              Salvar
            </CustomButton>
            <CustomButton
              variant="outlined"
              color="error"
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
              sx={{ mr: 1 }}
              disabled={loading}
            >
              Excluir
            </CustomButton>
            <CustomButton
              variant="outlined"
              color="info"
              onClick={handleClear}
              startIcon={<ClearIcon />}
              disabled={loading}
            >
              Limpar
            </CustomButton>
            {successMessage && <Typography color="success.main" sx={{ mt: 2 }}>{successMessage}</Typography>}
            {error && <Typography color="error.main" sx={{ mt: 2 }}>{error}</Typography>}
          </Box>
        </form>
      </WhiteBox>
    </Box>
    </Box>
  );
  
};

export default CadastroForm;
