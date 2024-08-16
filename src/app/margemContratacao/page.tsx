'use client'
import { Box, Button, Grid, TextField, Typography, Divider, InputAdornment, Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import CustomizedList from '../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../shared/components/cookiesBanner/CookiesBanner';
import { getServidor, createConsulta } from '../../shared/services/apiService';

const MargemContratacao = () => {
  const [matricula, setMatricula] = useState('');
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [margem, setMargem] = useState('');
  const [dataAdmissao, setDataAdmissao] = useState('');
  const [vinculo, setVinculo] = useState('');
  const [situacaoFuncional, setSituacaoFuncional] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSearch = async () => {
    try {
      // Verifica se matrícula ou CPF foi preenchido
      if (!matricula && !cpf) {
        setError('Informe a matrícula ou CPF.');
        return;
      }

      // Simples lógica para determinar o tipo de busca
      let servidor;
      if (matricula) {
        servidor = await getServidor(parseInt(matricula, 10));
      } else if (cpf) {
        // Se você tiver uma API para buscar por CPF, adicione a lógica aqui
        // Exemplo: servidor = await getServidorByCPF(cpf);
        setError('Busca por CPF não implementada. Por favor, use matrícula.');
        return;
      }

      // Preenche os detalhes do servidor
      setNome(servidor.nome || '');
      setDataAdmissao(servidor.dataAdmissao || '');
      setVinculo(servidor.vinculo || '');
      setSituacaoFuncional(servidor.situacaoFuncional || '');
      setShowDetails(true);
      setError(''); // Limpa mensagens de erro
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar informações.');
    }
  };

  const handleClear = () => {
    setMatricula('');
    setCpf('');
    setNome('');
    setDataAdmissao('');
    setVinculo('');
    setSituacaoFuncional('');
    setMargem('');
    setShowDetails(false);
    setError('');
    setSuccess('');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />
      <Box sx={{ flexGrow: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
          Margem / Contratação
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              fullWidth
              variant="outlined"
              error={Boolean(error)}
              helperText={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              fullWidth
              variant="outlined"
              error={Boolean(error)}
              helperText={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {showDetails && (
          <>
            <Grid container spacing={2} marginTop={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Nome"
                  value={nome}
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} marginTop={2}>
              <Grid item xs={12} sm={3}>
                <Typography variant="body2">
                  <strong>Órgão:</strong> {orgao}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body2">
                  <strong>Data de Admissão:</strong> {dataAdmissao}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body2">
                  <strong>Vínculo:</strong> {vinculo}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body2">
                  <strong>Situação Funcional:</strong> {situacaoFuncional}
                </Typography>
              </Grid>
            </Grid>

            <Box marginTop={2}>
              <Divider />
            </Box>

            <Grid container spacing={2} marginTop={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="primary">
                  Valor da Margem do Colaborador
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} marginTop={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Mês"
                      value="Outubro"
                      fullWidth
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Ano"
                      value="2023"
                      fullWidth
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                </Grid>
                <Box sx={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px', textAlign: 'center', marginTop: '10px' }}>
                  <Typography variant="h6">Margem Total</Typography>
                  <TextField
                    label="Valor da Margem"
                    value={margem}
                    onChange={(e) => setMargem(e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
                <Button variant="contained" color="primary" fullWidth sx={{ backgroundColor: '##00A00A' }}>
                  Calcular Margem
                </Button>
                <Box sx={{ backgroundColor: '#e8f5e9', padding: '20px', borderRadius: '8px', textAlign: 'center', marginTop: '10px', width: '100%' }}>
                  <Typography variant="h6">Margem Disponível</Typography>
                  <Typography variant="h5" color="primary">R$-</Typography>
                </Box>
              </Grid>
            </Grid>

            <Box marginTop={2}>
              <Divider />
            </Box>

            <Grid container spacing={2} marginTop={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography variant="body2">
                  <strong>Empréstimo:</strong> {/* Valor do Empréstimo */}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body2">
                  <strong>Refinanciamento:</strong> {/* Valor do Refinanciamento */}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body2">
                  <strong>Composição:</strong> {/* Valor da Composição */}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body2">
                  <strong>Portabilidade:</strong> {/* Valor da Portabilidade */}
                </Typography>
              </Grid>
            </Grid>

            <Box marginTop={2}>
              <Divider />
            </Box>

            <Grid container spacing={2} marginTop={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Contratos
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Typography variant="body2">
                      <strong>Situação:</strong> {/* Situação do Contrato */}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">
                      <strong>BOT:</strong> {/* BOT */}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">
                      <strong>Data de Contratação:</strong> {/* Data de Contratação */}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">
                      <strong>Total Parcelas:</strong> {/* Total de Parcelas */}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">
                      <strong>Valor Parcela:</strong> {/* Valor da Parcela */}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">
                      <strong>Crédito:</strong> {/* Valor do Crédito */}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}

        {/* Mensagens de feedback */}
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error">{error}</Alert>
        </Snackbar>
        <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={() => setSuccess('')}>
          <Alert onClose={() => setSuccess('')} severity="success">{success}</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default MargemContratacao;
