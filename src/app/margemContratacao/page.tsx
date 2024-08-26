'use client';

import { Box, Button, Grid, TextField, Typography, Divider, InputAdornment, Snackbar, Alert, Stack, IconButton, styled, LinearProgress, debounce } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, useCallback } from 'react';
import CustomizedList from '../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../shared/components/buttons/FloatingSearchButton';
import { useServidor } from '../../shared/hooks/useServidor';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ChevronLeft, ChevronRight, KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon, KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon } from '@mui/icons-material';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { formatDate } from '../../shared/utils/dateUtils';
import CookiesBanner from '../../shared/components/cookiesBanner/CookiesBanner';

dayjs.locale('pt-br');

const CustomDateCalendar = styled(DateCalendar)({
  '& .MuiDayCalendar-weekContainer, & .MuiDayCalendar-header, & .MuiDayCalendar-slideTransition, & .MuiDayCalendar-monthContainer': {
    display: 'none',
  },
});

const CustomCalendarHeaderRoot = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1px 6px',
  alignItems: 'center',
});

function CustomCalendarHeaderMonth(props: PickersCalendarHeaderProps<Dayjs>) {
  const { currentMonth, onMonthChange } = props;

  const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'), 'left');
  const selectPreviousMonth = () => onMonthChange(currentMonth.subtract(1, 'month'), 'right');

  return (
    <CustomCalendarHeaderRoot>
      <Stack spacing={1} direction="row">
        <IconButton onClick={selectPreviousMonth} title="Mês Anterior">
          <ChevronLeft />
        </IconButton>
      </Stack>
      <Typography variant="body2">
        {currentMonth.format('MMMM')}
      </Typography>
      <Stack spacing={1} direction="row">
        <IconButton onClick={selectNextMonth} title="Próximo Mês">
          <ChevronRight />
        </IconButton>
      </Stack>
    </CustomCalendarHeaderRoot>
  );
}

function CustomCalendarHeaderYear(props: PickersCalendarHeaderProps<Dayjs>) {
  const { currentMonth, onMonthChange } = props;

  const selectPreviousYear = () => onMonthChange(currentMonth.subtract(1, 'year'), 'right');
  const selectNextYear = () => onMonthChange(currentMonth.add(1, 'year'), 'left');

  return (
    <CustomCalendarHeaderRoot>
      <Stack spacing={1} direction="row">
        <IconButton onClick={selectPreviousYear} title="Ano Anterior">
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
      </Stack>
      <Typography variant="body2">
        {currentMonth.format('YYYY')}
      </Typography>
      <Stack spacing={1} direction="row">
        <IconButton onClick={selectNextYear} title="Próximo Ano">
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
      </Stack>
    </CustomCalendarHeaderRoot>
  );
}

const MargemContratacao = () => {
  const [matricula, setMatricula] = useState<number | null>(null);
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { externalData, isLoading, isError, error: fetchError } = useServidor(matricula || 0);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev === 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      return () => clearInterval(timer);
    } else {
      setLoadingProgress(0);
    }
  }, [isLoading]);

  const handleSearch = () => {
    if (!matricula && !cpf) {
      setError('Informe somente a matrícula no momento!');
      return;
    }

    if (matricula) {
      setError(null);
    } else {
      setError('Busca por CPF não implementada. Por favor, use matrícula.');
    }
  };

  const handleClear = () => {
    setMatricula(null);
    setCpf('');
    setError(null);
  };

<<<<<<< HEAD
  const onHandleCredoresSearch = async (searchTerm: string) => {
    console.log('Searching for:', searchTerm);
    setMatricula(searchTerm);
  };
=======
   // Customização de datas
   const CustomDateCalendar = styled(DateCalendar)({
    '& .MuiDayCalendar-weekContainer, & .MuiDayCalendar-header, & .MuiDayCalendar-slideTransition, & .MuiDayCalendar-monthContainer': {
      display: 'none',
    },
  });
>>>>>>> 659215e1b776185c149edcc1910353806295a77b

  const debouncedHandleCredoresSearch = useCallback(
    debounce(onHandleCredoresSearch, 100),
    [],
  );

<<<<<<< HEAD
  const handleInputChange = (event: any) => {
    debouncedHandleCredoresSearch(event.target.value);
  };
=======
   function CustomCalendarHeaderMonth(props: PickersCalendarHeaderProps<Dayjs>) {
    const { currentMonth, onMonthChange } = props;

    const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'), 'left');
    const selectPreviousMonth = () => onMonthChange(currentMonth.subtract(1, 'month'), 'right');

    return (
      <CustomCalendarHeaderRoot>
        <Stack spacing={1} direction="row">
          <IconButton onClick={selectPreviousMonth} title="Mês Anterior">
            <ChevronLeft />
          </IconButton>
        </Stack>
        <Typography variant="body2">
          {currentMonth.format('MMMM')}
        </Typography>
        <Stack spacing={1} direction="row">
          <IconButton onClick={selectNextMonth} title="Próximo Mês">
            <ChevronRight />
          </IconButton>
        </Stack>
      </CustomCalendarHeaderRoot>
    );
  }

  function CustomCalendarHeaderYear(props: PickersCalendarHeaderProps<Dayjs>) {
    const { currentMonth, onMonthChange } = props;

    const selectPreviousYear = () => onMonthChange(currentMonth.subtract(1, 'year'), 'right');
    const selectNextYear = () => onMonthChange(currentMonth.add(1, 'year'), 'left');

    return (
      <CustomCalendarHeaderRoot>
        <Stack spacing={1} direction="row">
          <IconButton onClick={selectPreviousYear} title="Ano Anterior">
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
        </Stack>
        <Typography variant="body2">
          {currentMonth.format('YYYY')}
        </Typography>
        <Stack spacing={1} direction="row">
          <IconButton onClick={selectNextYear} title="Próximo Ano">
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Stack>
      </CustomCalendarHeaderRoot>
    );
  }
>>>>>>> 659215e1b776185c149edcc1910353806295a77b

  return (
    <Box sx={{ display: 'flex' }}>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />
      <Box sx={{ flexGrow: 1, padding: '20px', backgroundColor: '#F2F2F2' }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
          Margem / Contratação
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Matrícula"
              value={matricula ?? ''}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              error={Boolean(error)}
              helperText={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
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
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} marginTop={1}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#0D7B52',
                color: '#FFF',
                '&:hover': {
                  backgroundColor: '#0A6E43',
                },
              }}
              fullWidth
              onClick={handleSearch}
              disabled={isLoading}
            >
              Buscar DADOS
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#0D7B52',
                color: '#0D7B52',
                backgroundColor: '#E0F2F1',
                '&:hover': {
                  borderColor: '#0D7B52',
                  backgroundColor: '#B2DFDB',
                },
              }}
              fullWidth
              onClick={handleClear}
            >
              Limpar Busca
            </Button>
          </Grid>
        </Grid>

        {isLoading ? (
          <Box sx={{ width: '100%', marginTop: 2 }}>
            <LinearProgress variant="determinate" value={loadingProgress} />
            <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 1 }}>
              Processando... {loadingProgress}%
            </Typography>
          </Box>
        ) : (
          <>
            {externalData && externalData.results.length > 0 && (
              <>
                <Box marginTop={4}>
                  <Divider />
                </Box>

                <Grid container spacing={2} marginTop={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Nome"
                      value={externalData.results[0]?.nome || ''}
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="CPF"
                      value={externalData.results[0]?.cpf || ''}
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                </Grid>


                <Grid container spacing={2} marginTop={2}>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2">
                      <strong>Data de Admissão:</strong> {formatDate(externalData.results[0]?.data_exercicio)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2">
                      <strong>Vínculo:</strong> {
                        externalData.results[0]?.tipo_servidor.nome || 'Vinculo Não Localizado'
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2">
                      <strong>Lotação:</strong> {
                        externalData.results[0]?.lotacao_principal?.lotacao.nome || 'Sem Lotação'
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2">
                      <strong>Situação Funcional:</strong> {
                        externalData.results[0]?.situacao_funcional_atual?.display_name || ''
                      }
                    </Typography>
                  </Grid>
                </Grid>

                <Box marginTop={2}>
                  <Divider />
                </Box>

                {/*  O PREENCHIEMNTO AUTOMATICO FOI ATE ESSE PONTO */}

                
                <Grid container spacing={2} marginTop={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="primary">
                      Valor da Margem do Colaborador
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} marginTop={2} alignItems="center">
                  <Grid item xs={12} sm={7}> {/*verificar*/}
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                          <DateCalendar
                            slots={{ calendarHeader: CustomCalendarHeaderMonth }}
                            sx={{
                              height: 'fit-content',
                              '& .MuiDayCalendar-root': { display: 'none' },
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                          <DateCalendar
                            slots={{ calendarHeader: CustomCalendarHeaderYear }}
                            sx={{
                              height: 'fit-content',
                              '& .MuiDayCalendar-root': { display: 'none' },
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
<<<<<<< HEAD
                    <Box sx={{ backgroundColor: '#E8F5E9', padding: '7px', borderRadius: '8px', textAlign: 'center', marginTop: '10px' }}>
=======
                    <Box sx={{ backgroundColor: '#e3f2fd', padding: '7px', borderRadius: '8px', textAlign: 'center', marginTop: '10px' }}>
>>>>>>> 659215e1b776185c149edcc1910353806295a77b
                      <Typography variant="h6">Margem Total</Typography>
                      <TextField
                        label="Valor da Margem"
                        value={externalData.margem || ''}
                        onChange={(e) => setCpf(e.target.value)}
                        fullWidth
                        variant="outlined"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={5} display="flex" flexDirection="column" alignItems="center">
                    <Button variant="contained" color="primary" fullWidth sx={{ backgroundColor: '#0D7B52' }}>
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
          </>
        )}

        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">{error}</Alert>
        </Snackbar>
        <Snackbar open={Boolean(fetchError)} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">{fetchError?.message}</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default MargemContratacao;
