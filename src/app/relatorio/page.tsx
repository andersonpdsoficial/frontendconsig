'use client'
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Modal,
  Button
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
} from 'recharts';
import CustomizedList from '../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../shared/components/cookiesBanner/CookiesBanner';
import { fetchReservasForReports, fetchConsignatariasData, fetchConsultasData } from '../../shared/services/apiService';

const RelatorioReservas = () => {
  const [data, setData] = useState({ contratos: [], consignatarias: [], consultas: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [reservasResponse, consignatariasResponse, consultasResponse] = await Promise.all([
          fetchReservasForReports(),
          fetchConsignatariasData(),
          fetchConsultasData(),
        ]);

        const reservas = reservasResponse.results;
        const consignatarias = consignatariasResponse.results;
        const consultas = consultasResponse.results;

        setData({ contratos: reservas, consignatarias, consultas });
      } catch (error) {
        setSnackbarMessage('Erro ao carregar dados do relatório.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleBarClick = (data) => {
    setModalData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const filterData = (dataArray) => {
    if (!selectedMonth || !selectedYear) return dataArray;

    return dataArray.filter(item => {
      const itemDate = new Date(item.data);
      return itemDate.getMonth() === new Date(Date.parse(selectedMonth + " 1, 2021")).getMonth() &&
             itemDate.getFullYear() === parseInt(selectedYear);
    });
  };

  const filteredContratos = filterData(data.contratos);
  const filteredConsignatarias = filterData(data.consignatarias);
  const filteredConsultas = filterData(data.consultas);

  const calculatePercentages = (data) => {
    const total = data.reduce((acc, curr) => acc + curr.quantidade, 0);
    return data.map(item => ({
      ...item,
      percentual: total > 0 ? ((item.quantidade / total) * 100).toFixed(2) : 0
    }));
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '5px' }}>
          <p>{`Nome: ${payload[0].name}`}</p>
          <p>{`Quantidade: ${payload[0].value}`}</p>
          <p>{`Porcentagem: ${payload[0].payload.percentual}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#272020', flexDirection: { xs: 'column', md: 'row' } }}>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />
      <Box sx={{ padding: '40px', backgroundColor: '#E0F2F1', flex: 1, minHeight: '100vh' }}>
        <Typography variant="h6" gutterBottom>
          Relatório de Reservas
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={6} md={3}>
            <TextField
              select
              label="Mês"
              value={selectedMonth}
              onChange={handleMonthChange}
              fullWidth
              sx={{ backgroundColor: '#fff' }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i} value={new Date(0, i).toLocaleString('default', { month: 'long' })}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              select
              label="Ano"
              value={selectedYear}
              onChange={handleYearChange}
              fullWidth
              sx={{ backgroundColor: '#fff' }}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <MenuItem key={2021 + i} value={2021 + i}>
                  {2021 + i}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <Paper sx={{ padding: 2, backgroundColor: '#fff', boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Gráfico de Contratos
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredContratos} onClick={handleBarClick}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="expirados" fill="#ffeb3b" />
                <Bar dataKey="emAnalise" fill="#4caf50" />
                <Bar dataKey="deferido" fill="#2196f3" />
                <Bar dataKey="indeferido" fill="#f44336" />
                <Line type="monotone" dataKey="expirados" stroke="#ffeb3b" />
                <Line type="monotone" dataKey="emAnalise" stroke="#4caf50" />
                <Line type="monotone" dataKey="deferido" stroke="#2196f3" />
                <Line type="monotone" dataKey="indeferido" stroke="#f44336" />
              </BarChart>
            </ResponsiveContainer>

            <Typography variant="h6" gutterBottom mt={4}>
              Consignatárias Cadastradas
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={calculatePercentages(filteredConsignatarias)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="percentualContratos" fill="#4caf50" />
                <Line type="monotone" dataKey="percentualContratos" stroke="#4caf50" />
              </BarChart>
            </ResponsiveContainer>

            <Typography variant="h6" gutterBottom mt={4}>
              Consultas Realizadas
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={calculatePercentages(filteredConsultas)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="quantidade" fill="#2196f3" />
                <Line type="monotone" dataKey="quantidade" stroke="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <Modal open={modalOpen} onClose={closeModal}>
          <Box sx={{ padding: 4, bgcolor: 'white', outline: 'none', borderRadius: 2 }}>
            <Typography variant="h6">Detalhes</Typography>
            {modalData && (
              <Typography>
                Nome: {modalData.nome} <br />
                Expirados: {modalData.expirados} <br />
                Em Análise: {modalData.emAnalise} <br />
                Deferido: {modalData.deferido} <br />
                Indeferido: {modalData.indeferido}
              </Typography>
            )}
            <Button onClick={closeModal}>Fechar</Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default RelatorioReservas;
