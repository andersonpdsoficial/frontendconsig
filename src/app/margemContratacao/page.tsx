'use client';

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
  InputAdornment,
  Snackbar,
  Alert,
  Stack,
  IconButton,
  styled,
  LinearProgress,
  debounce,
  FormControl,
  Select,
  MenuItem,
  TablePagination,
  TableCell,
  TableRow,
  TableBody
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import CustomizedList from '../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../shared/components/buttons/FloatingSearchButton';
import { useServidor } from '../../shared/hooks/useServidor';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {
  AttachMoney,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon,
  KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon
} from '@mui/icons-material';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { formatDate } from '../../shared/utils/dateUtils';
import CookiesBanner from '../../shared/components/cookiesBanner/CookiesBanner';
import { useConsignataria } from '../../shared/hooks/useConsignataria';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { useNavigate } from 'react-router-dom';
import { fetchServidorFromExternalApi, fetchServidorFromLocalApi, fetchConsignatariaFromLocalApi, fetchMargemServidor } from '../../../shared/services/apiService'; // Ajuste o caminho conforme necessário


dayjs.locale('pt-br');
const LOCAL_API_BASE_URL = 'http://localhost:8000/api';

const MargemContratacao = () => {
  const router = useRouter();
  const [matricula, setMatricula] = useState<number | null>(null);
  const [cpf, setCpf] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [selectValue, setSelectdValue] = useState<number | ''>('');
  const [margemTotal, setMargemTotal] = useState<number | null>(null);
  const [margemDisponivel, setMargemDisponivel] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleNavigate = async () => {
    try {
      const matricula = '300131045'; // Pode ser ajustado conforme necessário
      // Buscar dados do servidor na API externa
      const externalData = await fetchServidorFromExternalApi(matricula);

      // Buscar dados do servidor na API local
      const localData = await fetchServidorFromLocalApi(externalData.matricula);

      // Buscar dados da consignataria na API local
      const consignatariaData = await fetchConsignatariaFromLocalApi();
      const consignatariaId = consignatariaData[0]?.id || 0;

      // Buscar margem do servidor na API local
      const margemData = await fetchMargemServidor(externalData.matricula, consignatariaId);

      const dataToSend = {
        matricula: externalData.matricula,
        nome: externalData.nome,
        cpf: externalData.cpf,
        margemDisponivel: `R$ ${margemData.margemDisponivel}`,
        margemTotal: `R$ ${margemData.margemTotal}`,
        // Adicione outros dados conforme necessário
      };

      navigate('/novo-emprestimo', { state: { formData: dataToSend } });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };









  // // Função para lidar com a navegação e envio de dados 6981331967
  // const NovoEmprestimo = () => {
  //   const queryParams = new URLSearchParams({
  //     matricula: matricula?.toString() || '',
  //     cpf: cpf,
  //     margemDisponivel: margemDisponivel?.toString() || '',
  //     margemTotal: margemTotal?.toString() || '',
  //   }).toString();

  //   router.push(`/margemContratacao/emprestimoAverbacoes?${queryParams}`);
  // };
 
  //rotas das novas averbações
  const handleRefinanciamentoAverbacoesClick = () => {
    router.push('/margemContratacao/refinaciamentoAverbacao');
  };

  const handleNavigate = () => {
    router.push('/margemContratacao/emprestimoAverbacoes');
  };



  //constantes para  calcular valores do colaborador para proximos meses anos
  const [selectedMonthYear, setSelectedMonthYear] = useState({
    month: dayjs().month() + 1, // Default to current month
    year: dayjs().year() // Default to current year
  });

  // Function to generate the next 4 months and years
  const generateNextDates = (startMonth, startYear) => {
    const dates = [];
    let month = startMonth;
    let year = startYear;

    for (let i = 0; i < 4; i++) {
      month++;
      if (month > 12) {
        month = 1;
        year++;
      }
      dates.push({ month, year });
    }

    return dates;
  };

  // State to hold the next dates
  const [nextDates, setNextDates] = useState(() => generateNextDates(selectedMonthYear.month + 1, selectedMonthYear.year));

  // Effect to update nextDates when selectedMonthYear changes
  useEffect(() => {
    const { month, year } = selectedMonthYear;
    const newDates = generateNextDates(month, year); // Start from the next month
    setNextDates(newDates);
  }, [selectedMonthYear]);

  // Function to handle month change from CustomDateCalendar
  const handleMonthChange = (newMonth, newYear) => {
    setSelectedMonthYear({ month: newMonth, year: newYear });
  };

  const getMonthName = (month) => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[month - 1];
  };




  // Determine o parâmetro de busca baseado em matricula ou cpf
  const searchParam = matricula !== null ? matricula.toString() : cpf;

  // Fetch data based on search parameter
  const { externalData, localData, isLoading, isError, error: fetchError } = useServidor(searchParam);
  const { localData: consignataria } = useConsignataria();

  const handleChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    setSelectdValue(e.target.value);
  };
  //carregamento de dados
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
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setLoadingProgress(0);
    }
  }, [isLoading]);

  const handleSearch = () => {
    if (!matricula && !cpf) {
      setError('Informe a matrícula ou CPF para a busca!');
      return;
    }
    if (matricula && cpf) {
      setError('Informe apenas a matrícula ou o CPF, não ambos.');
      return;
    }
    setError(null);
  };

  const handleClear = () => {
    setMatricula(null);
    setCpf('');
    setError(null);
  };

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

  console.log('Dados vindos das APIs :', localData, ' e consignataria ', consignataria?.results);

  function CustomCalendarHeaderMonth(props: PickersCalendarHeaderProps<Dayjs>) {
    const { currentMonth, onMonthChange } = props;

    const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'), 'left');
    const selectPreviousMonth = () => onMonthChange(currentMonth.subtract(1, 'month'), 'right');

    return (
      //Returns da Data calendario
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

  const onHandleCredoresSearch = async (searchTerm: string) => {
    setMatricula(Number(searchTerm));
  };

  const debouncedHandleCredoresSearch = useCallback(
    debounce(onHandleCredoresSearch, 100),
    [],
  );

  const handleInputChange = (event: any, value: string, reason: string) => {
    debouncedHandleCredoresSearch(event.target.value);
  };

  // Será necessário selecionar a consignataria
  const calculateMargem = async () => {
    if (!externalData || !selectValue) {
      setError('Dados incompletos para cálculo, selecione a consignataria');
      return;
    }

    try {
      // Criando uma instância de FormData
      const formData = new FormData();
      formData.append('servidor', localData[0].id);
      formData.append('consignataria', selectValue);

      // Fazendo a requisição POST usando axios com FormData  
      const response = await axios.post(
        `${LOCAL_API_BASE_URL}/consultas-margem-athenas/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 201) {300127568
        const data = response.data;
        setMargemTotal(data.margem_total);
        setMargemDisponivel(data.margem_disponivel);
        console.log('dados de margem', data)
      } else {
        setError(response.data.message || 'Erro ao calcular margem.');
      }
    } catch (err) {
      setError('Não foi possível completar o cálculo. Verifique o vínculo; caso contrário, o servidor pode não ter margem suficiente para o cálculo.');
    }
  };
  // Função para formatar a data
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('pt-BR', options).format(new Date(dateString));
  };

  // Função para formatar o valor monetário
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    //1
    <Box sx={{ display: 'flex' }}>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />

      <Box sx={{ flexGrow: 1, padding: '45px', backgroundColor: '#E0F2F1' }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
          Margem / Contratação
        </Typography>

        <Box
          sx={{
            padding: 2,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            borderRadius: 2,
            marginTop: 2,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={12}>
              <Typography variant="body1" color="primary">
                <Divider textAlign="left">Buscar servidor</Divider>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Matrícula"
                value={matricula ?? ''}
                onChange={(e) => setMatricula(Number(e.target.value))}
                fullWidth
                variant="outlined"
                error={Boolean(error && !cpf)}
                helperText={error && !cpf ? error : ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch} disabled={isLoading}>
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
                error={Boolean(error && !matricula)}
                helperText={error && !matricula ? error : null}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch} disabled={isLoading}>
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
                color="primary"
                sx={{ backgroundColor: '#0D7B52' }}
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
                sx={{ color: '#0D7B52' }}
                fullWidth
                onClick={handleClear}
              >
                Limpar Busca
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box marginTop={2}>
          <Divider />
        </Box>
        <Box
          sx={{
            backgroundColor: 'white',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
            padding: 2,
            marginTop: 2,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body1" color="primary">
                <Divider textAlign="left">Selecione a Consignataria</Divider>
              </Typography>

              <Divider textAlign="left" sx={{ marginTop: 1 }} />
              <FormControl fullWidth>
                <Select
                  value={selectValue || ''}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#ffffff' }} 
                >
                  <MenuItem value="" disabled sx={{ color: '#000000f0', backgroundColor: '#E8F5E9' }}>
                    Selecione a Consignatária
                  </MenuItem>
                  {consignataria?.results.map((item: { id: any; nome: any; }) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                      sx={{ color: '#073a18' }}
                    >
                      {item.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {isLoading ? (
          <Box
            sx={{
              backgroundColor: 'white',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
              padding: 2,
              width: '100%',
              marginTop: 2,
            }}
          >
            <LinearProgress variant="determinate" value={loadingProgress} />
            <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 1 }}>
              Processando... {loadingProgress}%
            </Typography>
          </Box>
        ) : (


          <>
            <Box marginTop={2}>
              <Divider />
            </Box>
            {externalData && externalData.results.length > 0 && (
              <>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: 2,
                    padding: 2,
                    width: '100%',
                    marginTop: 2,
                  }}
                >
                  <Grid item xs={12} sm={12} marginTop={2}>
                    <Typography variant="body1" color="primary">
                      <Divider textAlign="left">Dados Do Servidor</Divider>
                    </Typography>
                  </Grid>


                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        <strong>Nome: </strong>{externalData.results[0]?.nome || ''}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        <strong>CPF: </strong>{externalData.results[0]?.cpf || ''}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        <strong>Data de Admissão:</strong> {formatDate(
                          externalData.results[0]?.data_exercicio || 'Data Não Encontrada'
                        )}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        <strong>Vínculo:</strong> {externalData.results[0]?.tipo_servidor.nome || 'Vínculo Não Localizado'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        <strong>Lotação:</strong> {externalData.results[0]?.lotacao_principal?.lotacao.nome || 'Sem Lotação'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        <strong>Situação Funcional:</strong> {externalData.results[0]?.situacao_funcional_atual?.display_name || ''}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                {/* Fim de uma box */}
                <Box marginTop={2}>
                  <Divider />
                </Box>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: 2,
                    padding: 2,
                    width: '100%',
                    marginTop: 2,
                  }}
                >
                  <Grid container spacing={2} marginTop={2} alignItems="center">
                    <Grid item xs={12} sm={12}>
                      <Typography variant="body1" color="primary">
                        <Divider textAlign="left">Valor da Margem do Colaborador</Divider>
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginTop={2} alignItems="center">
                    <Grid item xs={12} sm={7}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                            <CustomDateCalendar
                              slots={{ calendarHeader: CustomCalendarHeaderMonth }}
                              sx={{
                                height: 'fit-content',
                                '& .MuiDayCalendar-root': { display: 'none' },
                              }}
                              onMonthChange={(date) => handleMonthChange(date.month() + 1, date.year())}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                            <CustomDateCalendar
                              slots={{ calendarHeader: CustomCalendarHeaderYear }}
                              sx={{
                                height: 'fit-content',
                                '& .MuiDayCalendar-root': { display: 'none' },
                              }}
                              onMonthChange={(date) => handleMonthChange(date.month() + 1, date.year())}
                            />
                          </LocalizationProvider>
                        </Grid>
                      </Grid>

                      <Box sx={{ backgroundColor: '#bce7d84e', padding: '7px', borderRadius: '8px', textAlign: 'center', marginTop: '10px' }}>
                        <Typography variant="h6">Margem Total</Typography>
                        <Typography variant="h5" color="primary">{margemTotal !== null ? `R$ ${margemTotal}` : 'R$ 0,00'}</Typography>
                        <Typography variant="body2" color="#004b70">
                          <strong>EMPRÉSTIMO</strong>
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={5} display="flex" flexDirection="column" alignItems="center">
                      <Button variant="contained" color="primary" fullWidth sx={{ backgroundColor: '#0D7B52' }} onClick={calculateMargem}>
                        Calcular Margem
                      </Button>
                      <Box sx={{ backgroundColor: '#bce7d84e', padding: '20px', borderRadius: '8px', textAlign: 'center', marginTop: '10px', width: '100%' }}>
                        <Typography variant="h6">Margem Disponível</Typography>
                        <Typography variant="h5" color="primary">{margemDisponivel !== null ? `R$ ${margemDisponivel}` : 'R$ 0,00'}</Typography>
                        <Typography variant="body2" color="#004b70">
                          <strong>EMPRÉSTIMO</strong>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginTop={2} alignItems="center">
                    <Grid item xs={12}>
                      <Typography variant="body2" color="darkgray">
                        <strong>Margem do colaborador para:</strong>
                      </Typography>
                      <Grid container spacing={2} marginTop={1}>
                        {nextDates.map((date, index) => (
                          <Grid item xs={12} sm={3} key={index}>
                            <Box
                              sx={{
                                backgroundColor: '#e0f7fa', // Cor de fundo da caixa
                                padding: '10px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                border: '1px solid #bce7d84e', // Borda da caixa
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}
                            >
                              <Typography variant="body2">
                                <strong>{`${getMonthName(date.month)}/${date.year}`}</strong>
                              </Typography>
                              <Typography variant="h6" color="primary">
                                {margemDisponivel !== null ? `R$ ${margemDisponivel}` : 'R$ 0,00'}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                {/*divisor*/}
                <>
                  <Box marginTop={2}>
                    <Divider />
                  </Box>





                  <Grid container spacing={0} marginTop={4} alignItems="center">
                    <Typography variant="h6" gutterBottom>
                      Novas Contratações
                    </Typography>

                  </Grid>
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                      borderRadius: 2,
                      padding: 2,
                      width: '100%',
                      marginTop: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        <Divider textAlign="left">Averbações</Divider>
                      </Typography>
                    </Box>

                    <Grid container spacing={2} marginTop={1} marginBottom={4}>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<AttachMoney />}
                          sx={{ height: 100, borderRadius: 2, backgroundColor: '#0D7B52' }}
                          onClick={handleNavigate}
                        >
                          Empréstimo
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<CreditCard />}
                          sx={{ height: 100, borderRadius: 2, backgroundColor: '#0D7B52' }}
                          onClick={handleRefinanciamentoAverbacoesClick}
                        >
                          Refinanciamento
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>

                </>

                {/*divisor*/}
                <Box marginTop={2}>
                  <Divider />
                </Box>

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
