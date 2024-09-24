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

  const handleSituacaoChange = async (id, newSituacao) => {
    try {
      await updateSituacaoInLocalApi(id, { situacao: newSituacao });
      setFilteredReservas((prev) =>
        prev.map((reserva) =>
          reserva.id === id ? { ...reserva, situacao: newSituacao } : reserva
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
    { field: 'contrato', headerName: 'Número do Contrato', width: 150, align: 'center' },
    { field: 'nome', headerName: 'Nome do Usuário', width: 200 },
    { field: 'cpf', headerName: 'CPF', width: 133 },
    { field: 'valor', headerName: 'Valor (R$)', type: 'number', align: 'center' },
    {
      field: 'situacao',
      headerName: 'Situação',
      width: 200,
      renderCell: (params: GridCellParams) => (
        <Select
          value={params.row.situacao || 0}
          onChange={(e) => handleSituacaoChange(params.row.id, e.target.value)}
          sx={{ minWidth: 180, transition: 'all 0.3s ease', backgroundColor: '#e3f2fd' }}
        >
          <MenuItem value="0">Em Análise</MenuItem>
          <MenuItem value="1">Deferido</MenuItem>
          <MenuItem value="2">Indeferido</MenuItem>
          <MenuItem value="3">Expirado</MenuItem>
        </Select>
      ),
    },
    { field: 'observacoes', headerName: 'Observações', width: 200 },
    { field: 'prazo_inicial', headerName: 'Prazo de Início', width: 190, type: 'number', align: 'center' },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 200,
      renderCell: (params) => (
        <Button 
          onClick={() => handleDelete(params.row.id)} 
          color="error" 
          startIcon={<DeleteIcon />}
          sx={{ '&:hover': { backgroundColor: '#f44336', color: '#fff' }}}
        >
          Excluir
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F2F2F2', flexDirection: { xs: 'column', md: 'row' } }}>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />
      <Box sx={{ padding: '20px', backgroundColor: '#E0F2F1', flex: 1, minHeight: '100vh' }}>
        <Typography variant="h6" gutterBottom>
          Tabela de Solicitações de Contratos
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
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
              sx={{ '&:hover': { backgroundColor: '#388e3c' }}}
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
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
              checkboxSelection
              selectionModel={selectionModel}
              onSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
              sx={{
                backgroundColor: '#fff',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#4caf50',
                  color: '#fff',
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
