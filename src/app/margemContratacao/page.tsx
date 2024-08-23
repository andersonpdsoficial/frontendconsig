// pages/margem-contratacao.tsx
'use client'
import { Box, Button, Grid, TextField, Typography, Divider, InputAdornment, Snackbar, Alert, Stack, IconButton, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import CustomizedList from '../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../shared/components/buttons/FloatingSearchButton';
import { useServidor } from '../../shared/hooks/useServidor'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ChevronLeft, ChevronRight, KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon, KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon } from '@mui/icons-material';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader';
import dayjs, { Dayjs } from 'dayjs';

const MargemContratacao = () => {
  const [matricula, setMatricula] = useState<number | null>(null);
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { externalData, isLoading, isError, error: fetchError } = useServidor(matricula || 0);

  const handleSearch = () => {
    if (!matricula && !cpf) {
      setError('Informe somente a matrícula ou CPF.');
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

  // Customização de datas
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

  return (
    <Box sx={{ display: 'flex' }}>
      <CustomizedList />
      <FloatingSearchButton />
     
      <Box sx={{ flexGrow: 1, padding: '20px', backgroundColor: '#F2F2F2' }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
          Margem / Contratação
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Matrícula"
              value={matricula ?? ''}
              onChange={(e) => setMatricula(parseInt(e.target.value, 10) || null)}
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

        <Grid container spacing={2} marginTop={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSearch} disabled={isLoading}>
              Buscar
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" color="secondary" fullWidth onClick={handleClear}>
              Limpar
            </Button>
          </Grid>
        </Grid>

        {isLoading ? (
          <Typography>Processando...</Typography>
        ) : (
          <>
            {externalData && externalData.results.length > 0 && (
              <>
                <Grid container spacing={2} marginTop={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Nome"
                      value={externalData.results[0]?.nome || ''}
                      fullWidth
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} marginTop={2}>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2">
                      <strong>Data de Admissão:</strong> {externalData.results[0]?.data_exercicio || ''}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2">
                      <strong>Vínculo:</strong> {externalData.results[0]?.vinculo || ''}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2">
                      <strong>Situação Funcional:</strong> {externalData.results[0]?.situacao_funcional_atual?.display_name || ''}
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
                  <Grid item xs={12} sm={7}>
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
                  </Grid>
                </Grid>
              </>
            )}
          </>
        )}

        {isError && fetchError && (
          <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
            <Alert onClose={() => setError(null)} severity="error">
              {fetchError.message}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Box>
  );
};

export default MargemContratacao;
