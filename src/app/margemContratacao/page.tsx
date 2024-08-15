'use client'
import { Box, Button, Grid, TextField, Typography, Divider, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import CustomizedList from '../../shared/components/menu-lateral/Demo';
import { validarCPF, validarMatricula, validarNome } from '../../shared/components/validacao/validacoes';
import FloatingSearchButton from '../../shared/components/buttons/FloatingSearchButton';

const MargemContratacao = () => {
  const [matricula, setMatricula] = useState('');
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [margem, setMargem] = useState(''); // Novo estado para a margem
  const [showDetails, setShowDetails] = useState(false); // Novo estado para controlar a visibilidade

  // Funções para validar os campos
  const isCPFValid = validarCPF(cpf);
  const isMatriculaValid = validarMatricula(matricula);
  const isNomeValid = validarNome(nome);

  // Valores que serão preenchidos após a pesquisa
  const orgao = 'FOLHA - COMERCIAL ALEX';
  const dataAdmissao = '15/04/2019';
  const vinculo = 'Efetivo (Estatutário)';
  const situacaoFuncional = 'Trabalhando';

  const handleSearch = () => {
    // Aqui você faria a requisição à API e, se bem-sucedida, exibiria os detalhes
    setShowDetails(true);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CustomizedList /> {/* Menu lateral */}
      <FloatingSearchButton /> {/* ChatConsig */}
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
              error={!isMatriculaValid && matricula !== ''}
              helperText={!isMatriculaValid && matricula !== '' ? 'Matrícula inválida' : ''}
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
              error={!isCPFValid && cpf !== ''}
              helperText={!isCPFValid && cpf !== '' ? 'CPF inválido' : ''}
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
                  onChange={(e) => setNome(e.target.value)}
                  fullWidth
                  variant="outlined"
                  error={!isNomeValid && nome !== ''}
                  helperText={!isNomeValid && nome !== '' ? 'Nome inválido' : ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
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
                <Button variant="contained" color="primary" fullWidth sx={{ backgroundColor: '#4caf50' }}>
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
      </Box>
    </Box>
  );
};

export default MargemContratacao;
