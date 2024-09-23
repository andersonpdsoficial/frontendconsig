'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Button, Typography, Select, MenuItem, IconButton, CircularProgress, Snackbar, Alert, Grid, Paper, TextField, Breadcrumbs } from '@mui/material';
import { Print as PrintIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';

import { alignProperty } from '@mui/material/styles/cssUtils';
import { deleteReservaInLocalApi, fetchReservaFromLocalApi } from '../../shared/services/apiService';
import CustomizedList from '../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../shared/components/cookiesBanner/CookiesBanner';
const ReservaTable = () => {
  const [reservas, setReservas] = useState([]);
  const [filteredReservas, setFilteredReservas] = useState();
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
         console.log('Dados da API:', data.results);
         setFilteredReservas(data.results)
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

  const severity: 'success' | 'error' | 'warning' | 'info' = 'success'; 
  const updateSituacaoInLocalApi = async (id: number, newSituacao: string): Promise<void> => {
  };
  const handleSituacaoChange = async (id, newSituacao) => {
    try {
      await updateSituacaoInLocalApi(id, newSituacao);
      setReservas((prevReservas) =>
        prevReservas.map((reserva) =>
          reserva.id === id? { ...reserva, situacao: newSituacao } : reserva
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
      // Chama a função para deletar a reserva na API
      await deleteReservaInLocalApi( id);
      
      // Atualiza o estado para remover a reserva excluída
      setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== id));
      
      // Define a mensagem e a severidade do snackbar para indicar sucesso
      setSnackbarMessage('Reserva deletada com sucesso.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      // Define a mensagem e a severidade do snackbar para indicar erro
      setSnackbarMessage('Erro ao deletar reserva.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      
      // Opcional: Log detalhado do erro para depuração
      console.error('Erro ao deletar reserva:', error);
    }
  };
  

// função handleSearch com tipagem
const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
  const query = event.target.value.toLowerCase();
  setSearchText(query);

   // Filtra as reservas
const filtered = reservas.filter((reserva) => {
  const searchQuery = query.toLowerCase(); // Armazenar a consulta em minúsculas
  return (
    reserva.cpf.toLowerCase().includes(searchQuery) ||
    reserva.matricula.toLowerCase().includes(searchQuery) ||
    reserva.nome.toLowerCase().includes(searchQuery) ||
    reserva.contrato.toLowerCase().includes(searchQuery) ||
    reserva.consulta.toLowerCase().includes(searchQuery) ||
    reserva.situacao.toLowerCase().includes(searchQuery) || 0
    (typeof reserva.valor === 'string' && reserva.valor.toLowerCase().includes(searchQuery)) || // Verifica se é string
    reserva.folha.toLowerCase().includes(searchQuery) ||
    reserva.observacoes.toLowerCase().includes(searchQuery)
  );
});

setFilteredReservas(filtered);
};

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
  const [selectedValue, setSelectedValue] = useState('');
  const columns = [

    { field: 'contrato', headerName: 'Contrato', width: 90 , align: 'center'},
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'cpf', headerName: 'CPF', width: 133 },
    { field: 'valor', headerName: 'Valor', type: 'number' , align: 'height'},
    {
      field: 'situacao',
      headerName: 'Situação',
      width: 200,
      renderCell: (params: GridCellParams) => {
        const situacaoValue = params.row.situacao || 0; // Definir valor padrão
    
        return (
          <Select
            value={situacaoValue}  // Usa o valor correto, com fallback
            onChange={(e) => handleSituacaoChange(params.row, e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="Em Análise">Em Análise</MenuItem>
            <MenuItem value="Deferido">Deferido</MenuItem>
            <MenuItem value="Indeferido">Indeferido</MenuItem>
            <MenuItem value="Expirado">Expirado</MenuItem>
          </Select>
        );
      },
    },
    
    
    { field: 'observacoes',align: 'height', headerName: 'Observações', width: 200 },
    { field: 'vinculo',  headerName: 'Vinculo', width: 190, type: 'number', align: 'center' },
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
    <Box sx={{ display: 'flex', backgroundColor: '#F2F2F2', }}>
    <CustomizedList />
    <FloatingSearchButton />
    <CookiesBanner />
    <Box sx={{ padding: '100px', backgroundColor: '#E0F2F1', minHeight: '100vh' }}>
      <Box>
       
        <Typography variant="h6" gutterBottom>
          Tabela de Solicitações de Contratos
        </Typography>
      </Box>
      <Grid container spacing={2} mb={2}>
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
        <Grid item xs={6} md={6} display="flex" alignItems="center" justifyContent="flex-end">
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
    </Box>
  );
};

export default ReservaTable;
