'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Select, MenuItem, IconButton, CircularProgress, Snackbar, Alert, Grid, Paper, TextField } from '@mui/material';
import { Print as PrintIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
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
        // Verificar se a resposta tem dados
        console.log('Dados da API:', data);
        // Adicionar IDs únicos para cada reserva
        const dataWithId = data.map((item) => ({ ...item, id: item.contrato }));
        setReservas(dataWithId);
        setFilteredReservas(dataWithId);
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

  const handleSituacaoChange = async (id, newSituacao) => {
    try {
      await updateSituacaoInLocalApi(id, newSituacao);
      setReservas((prevReservas) =>
        prevReservas.map((reserva) =>
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

  const handleDelete = async (id) => {
    try {
      await deleteReservaInLocalApi(id);
      setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== id));
      setSnackbarMessage('Reserva deletada com sucesso.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao deletar reserva.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchText(query);
    const filtered = reservas.filter((reserva) =>
      reserva.cpf.toLowerCase().includes(query) ||
      reserva.matricula.toLowerCase().includes(query) ||
      reserva.nome.toLowerCase().includes(query) ||
      reserva.contrato.toLowerCase().includes(query)
    );
    setFilteredReservas(filtered);
  };

  const handleSelectionChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectionModel.map((id) => deleteReservaInLocalApi(id)));
      setReservas((prevReservas) => prevReservas.filter((reserva) => !selectionModel.includes(reserva.id)));
      setSelectionModel([]);
      setSnackbarMessage('Reservas deletadas com sucesso.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao deletar reservas.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const columns = [
    { field: 'id', headerName: '', width: 50, renderHeader: () => null, renderCell: (params) => (
      <input
        type="checkbox"
        checked={selectionModel.includes(params.id)}
        onChange={() => handleSelectionChange(
          selectionModel.includes(params.id)
            ? selectionModel.filter((id) => id !== params.id)
            : [...selectionModel, params.id]
        )}
      />
    )},
    { field: 'matricula', headerName: 'Matrícula', width: 150 },
    { field: 'cpf', headerName: 'CPF', width: 150 },
    { field: 'valor', headerName: 'Valor', width: 150, type: 'number' },
    { field: 'consulta', headerName: 'Consulta', width: 150 },
    { field: 'prazo_inicial', headerName: 'Prazo Inicial', width: 150 },
    { field: 'prazo_final', headerName: 'Prazo Final', width: 150 },
    {
      field: 'situacao',
      headerName: 'Situação',
      width: 150,
      renderCell: (params: GridCellParams) => (
        <Select
          value={params.value}
          onChange={(e) => handleSituacaoChange(params.row.id, e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="Em Análise">Em Análise</MenuItem>
          <MenuItem value="Deferido">Deferido</MenuItem>
          <MenuItem value="Indeferido">Indeferido</MenuItem>
          <MenuItem value="Expirado">Expirado</MenuItem>
        </Select>
      ),
    },
    { field: 'contrato', headerName: 'Contrato', width: 150 },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'margem_disponivel', headerName: 'Margem Disponível', width: 150 },
    { field: 'margem_total', headerName: 'Margem Total', width: 150 },
    { field: 'vencimento_parcela', headerName: 'Vencimento Parcela', width: 150 },
    { field: 'folha_desconto', headerName: 'Folha Desconto', width: 150 },
    { field: 'total_financiado', headerName: 'Total Financiado', width: 150 },
    { field: 'liquido_liberado', headerName: 'Líquido Liberado', width: 150 },
    { field: 'liberacao_credito', headerName: 'Liberação Crédito', width: 150 },
    { field: 'cet', headerName: 'CET', width: 150 },
    { field: 'observacoes', headerName: 'Observações', width: 200 },
    { field: 'quantidade_parcelas', headerName: 'Quantidade Parcelas', width: 150 },
    { field: 'valor_parcelas', headerName: 'Valor Parcelas', width: 150 },
    { field: 'folha', headerName: 'Folha', width: 150 },
    { field: 'juros_mensal', headerName: 'Juros Mensal', width: 150 },
    { field: 'valorIof', headerName: 'Valor IOF', width: 150 },
    { field: 'carencia_dias', headerName: 'Carência Dias', width: 150 },
    { field: 'valor_carencia', headerName: 'Valor Carência', width: 150 },
    { field: 'vinculo', headerName: 'Vínculo', width: 150 },
    { field: 'margem_antes', headerName: 'Margem Antes', width: 150 },
    { field: 'margem_apos', headerName: 'Margem Após', width: 150 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleDelete(params.row.id)}
            color="error"
            startIcon={<DeleteIcon />}
          >
            Excluir
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: { xs: 6, sm: 3 }, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Tabela de Consulta Reservas
      </Typography>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />
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
          >
            Imprimir
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleBulkDelete}
            sx={{ ml: 1 }}
          >
            Deletar Selecionados
          </Button>
        </Grid>
      </Grid>
      <Paper
        sx={{
          height: { xs: 'auto', sm: 600 },
          width: '100%',
          backgroundColor: '#f5f5f5',
          overflow: 'auto',
        }}
      >
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
              rows={filteredReservas}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
              checkboxSelection
              selectionModel={selectionModel}
              onSelectionModelChange={handleSelectionChange}
              sx={{
                backgroundColor: '#fff',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#00ff00',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                },
                '& .MuiDataGrid-virtualScroller': {
                  overflowY: 'auto',
                },
              }}
            />
          </div>
        )}
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReservaTable;
