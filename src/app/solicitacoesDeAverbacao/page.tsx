'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Button, Typography, Select, MenuItem, CircularProgress, Snackbar, Alert, Grid, Paper, TextField } from '@mui/material';
import { Print as PrintIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { deleteReservaInLocalApi, fetchReservaFromLocalApi, updateSituacaoInLocalApi } from '../../shared/services/apiService';
import CustomizedList from '../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../shared/components/cookiesBanner/CookiesBanner';

const ReservaTable = () => {
  const [reservas, setReservas] = useState([]);
  const [filteredReservas, setFilteredReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [searchText, setSearchText] = useState('');
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchReservaFromLocalApi();
        setFilteredReservas(data.results);
      } catch (error) {
        setSnackbarMessage('Erro ao carregar reservas.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteReservaInLocalApi(id);
      setFilteredReservas((prev) => prev.filter((reserva) => reserva.id !== id));
      setSnackbarMessage('Reserva deletada com sucesso.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao deletar reserva.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchText(query);
    const filtered = reservas.filter((reserva) => {
      return (
        reserva.cpf.toLowerCase().includes(query) ||
        reserva.matricula.toLowerCase().includes(query) ||
        reserva.nome.toLowerCase().includes(query) ||
        reserva.prazo_inicial.toLowerCase().includes(query) ||
        reserva.contrato.toLowerCase().includes(query) ||
        reserva.consulta.toLowerCase().includes(query) ||
        reserva.situacao.toLowerCase().includes(query) ||
        (typeof reserva.valor === 'string' && reserva.valor.toLowerCase().includes(query)) ||
        reserva.folha.toLowerCase().includes(query) ||
        reserva.observacoes.toLowerCase().includes(query)
      );
    });
    setFilteredReservas(filtered);
  };

  const situacaoStyles = {
    0: { backgroundColor: '#ffeb3b' },  // Em Análise
    1: { backgroundColor: '#4caf50' },  // Deferido
    2: { backgroundColor: '#f44336' },  // Indeferido
    3: { backgroundColor: '#9e9e9e' },  // Expirado
  };
  const handleSituacaoChange = async (id, newSituacao, valueToUpdate ) => {
    console.log("Aqui acionamos a handlechange ",{id}, {newSituacao})
    const updatedValue = {
      ...newSituacao,
      situacao: valueToUpdate
    }
    try {
      await updateSituacaoInLocalApi(id, updatedValue);
      setFilteredReservas((prev) =>
        prev.map((reserva) =>
          reserva.id === id ? { ...reserva, situacao: valueToUpdate } : reserva
        )
      );
      setSnackbarMessage('Situação atualizada com sucesso.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao atualizar situação.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const columns = [
    { field: 'contrato', headerName: 'CONTRATO', width: 100, align: 'center', },
    { field: 'nome', headerName: 'NOME', width: 250 },
    { field: 'cpf', headerName: 'CPF', width: 133 },
    { field: 'valor', headerName: 'VALOR', type: 'number', align: 'center' },
    {
      field: 'situacao',
      headerName: 'SITUAÇÃO',
      align: 'center',
      width: 200,
      renderCell: (params: GridCellParams) => {
        const situacao = params.row.situacao || 0; // Usando '0' como padrão
        const style = situacaoStyles[situacao] || {}; // Estilo padrão se a situação não estiver mapeada

        return (
          <Select
            value={situacao}
            onChange={(e) => handleSituacaoChange(params.row.id, params.row, e.target.value)}
            sx={{ minWidth: 160, transition: 'all 0.3s ease', ...style }}
          >
            <MenuItem value={0}>Em Análise</MenuItem>
            <MenuItem value={1}>Deferido</MenuItem>
            <MenuItem value={2}>Indeferido</MenuItem>
            <MenuItem value={3}>Expirado</MenuItem>
          </Select>
        );
      }
    },
    { field: 'observacoes', headerName: 'OBSERVAÇÃO', width: 120 },
    { field: 'liquido_liberado', headerName: 'VALOR LIQUIDO', width: 120, type: 'number', align: 'center' },
    { field: 'quantidade_parcelas', headerName: 'QTD PARCELAS', width: 120, type: 'number', align: 'center' },
    { field: 'valor_parcelas', headerName: 'VALOR PARCELAS', width: 120, type: 'number', align: 'center' },

    { field: 'consulta', headerName: 'CONSULTA', width: 120, type: 'number', align: 'center' }, {
      field: 'actions',
      headerName: 'AÇÃO',
      width: 120,
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.row.id)}
          color="error"
          align='center'
          startIcon={<DeleteIcon />}
          sx={{ '&:hover': { backgroundColor: '#f44336', color: '#fff' } }}
        >
          Excluir
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#272020', flexDirection: { xs: 'column', md: 'row' } }}>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />
      <Box sx={{ padding: '40px', backgroundColor: '#E0F2F1', flex: 1, minHeight: '100vh' }}>
        <Typography variant="h6" gutterBottom>
          Gerenciamento das Solicitações de Contratos
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={6} md={6}>
            <TextField
              label="Pesquisar"
              variant="outlined"
              fullWidth
              value={searchText}
              onChange={handleSearch}
              sx={{ backgroundColor: '#fff' }}
            />
          </Grid>
          <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="flex-end">
            <Button
              variant="contained"
              color="success"
              startIcon={<PrintIcon />}
              onClick={() => window.print()}
              sx={{ '&:hover': { backgroundColor: '#388e3c' } }}
            >
              Imprimir
            </Button>
          </Grid>
        </Grid>
        <Paper sx={{ height: 'auto', width: '100%', overflow: 'auto', backgroundColor: '#fff', boxShadow: 3 }}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={filteredReservas}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50 ,100]}
              disableSelectionOnClick
              checkboxSelection
              selectionModel={selectionModel}
              onSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
              sx={{
                backgroundColor: '#fff',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#4caf50',
                  color: '#0f1d07',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                },
                '& .MuiDataGrid-cell:hover': {
                  backgroundColor: '#e1f5fe',
                  transition: 'background-color 0.3s',
                },
              }}
            />
          )}
        </Paper>
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
      </Box>
    </Box>
  );
};

export default ReservaTable;

