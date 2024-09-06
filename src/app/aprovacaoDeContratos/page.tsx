'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Grid
} from '@mui/material';
import { ArrowCircleUp, ExpandMore, ExpandLess, Search, SyncRounded } from '@mui/icons-material';
import { format as formatDate } from 'date-fns';
import { jsPDF } from 'jspdf';
import * as xmlBuilder from 'xmlbuilder';
import CookiesBanner from '../../shared/components/cookiesBanner/CookiesBanner';
import CustomizedList from '../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../shared/components/buttons/FloatingSearchButton';

const initialData = [
  // Example data
];

const columns = [
  { id: 'select', label: '' },
  { id: 'cpf', label: 'CPF' },
  { id: 'matricula', label: 'Matricula' },
  { id: 'quantidade', label: 'Quantidade' },
  { id: 'valor', label: 'Valor da parcela' },
  { id: 'codigoVerba', label: 'Código da Verba' },
  { id: 'tipoContrato', label: 'Tipo de contrato' },
  { id: 'data', label: 'Data' },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const formatDateForDisplay = (date: string) => {
  return formatDate(new Date(date), 'dd/MM/yyyy');
};

export default function VisaoGeral() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('cpf');
  const [filter, setFilter] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [data, setData] = useState(initialData);
  const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedRows = new Set(data.map((_, index) => index));
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setExportMenuAnchor(event.currentTarget);
    setIsExportMenuOpen(true);
  };

  const handleExportClose = () => {
    setExportMenuAnchor(null);
    setIsExportMenuOpen(false);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Tabela de Aprovação de Contratos', 20, 10);
    // Generate PDF content from the selected data
    doc.save('tabela.pdf');
    handleExportClose();
  };

  const handleExportXML = () => {
    const selectedData = data.filter((_, index) => selectedRows.has(index));
    const xmlData = xmlBuilder.create('root');
    selectedData.forEach(row => {
      const item = xmlData.ele('item');
      Object.keys(row).forEach(key => item.ele(key, row[key]));
    });
    const xmlString = xmlData.end({ pretty: true });
    const blob = new Blob([xmlString], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tabela.xml';
    link.click();
    handleExportClose();
  };

  const handleExportTXT = () => {
    const selectedData = data.filter((_, index) => selectedRows.has(index));
    const txtData = selectedData.map(row => Object.values(row).join('\t')).join('\n');
    const blob = new Blob([txtData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tabela.txt';
    link.click();
    handleExportClose();
  };

  const handleUpdate = () => {
    // Update data logic
    // For now, just reset the selected rows
    setSelectedRows(new Set());
    // Simulate fetching new data
    setData(initialData);
  };

  const filteredData = data.filter(row =>
    columns.slice(1).some(column =>
      row[column.id]?.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F2F2F2', height: '100vh' }}>
      <Box sx={{ width: 240, backgroundColor: '#0D7B52', padding: '0px', borderRight: '1px solid #311414' }}>
        <CustomizedList />
        <FloatingSearchButton />
        <CookiesBanner />
      </Box>
      <Box sx={{ flexGrow: 1, padding: '40px', backgroundColor: '#F2F2F2', overflowX: 'auto' }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
          Aprovação de contratos
        </Typography>

        <Grid container spacing={2} alignItems="center" mb={2}>
          <Grid item xs={12} sm={6} md={8}>
            <TextField
              label="Pesquisar cadastro"
              variant="outlined"
              size="small"
              value={filter}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <IconButton edge="start">
                    <Search />
                  </IconButton>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} textAlign="right">
            <Button
              variant="contained"
              color="primary"
              onClick={handleExportClick}
              sx={{ marginLeft: '10px', backgroundColor: '#0D7B52' }}
            >
              {isExportMenuOpen ? <ExpandLess /> : <ExpandMore />}
              EXPORTAÇÃO
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: '10px', backgroundColor: '#0D7B52' }}
              onClick={handleUpdate}
            >
              <SyncRounded />
              ATUALIZAR
            </Button>
          </Grid>
        </Grid>

        <TableContainer sx={{ maxWidth: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    sortDirection={orderBy === column.id ? order : false}
                    sx={{ backgroundColor: '#0D7B52', color: 'white' }}
                  >
                    {column.id === 'select' ? (
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedRows.size === data.length}
                      />
                    ) : (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRows.has(index)}
                          onChange={() => handleSelectRow(index)}
                        />
                      </TableCell>
                      <TableCell>{row.cpf}</TableCell>
                      <TableCell>{row.matricula}</TableCell>
                      <TableCell>{row.quantidade}</TableCell>
                      <TableCell>{formatCurrency(row.valor)}</TableCell>
                      <TableCell>{row.codigoVerba}</TableCell>
                      <TableCell>{row.tipoContrato}</TableCell>
                      <TableCell>{formatDateForDisplay(row.data)}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Typography variant="body2" color="textSecondary">
                      Nenhum registro encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Menu
          anchorEl={exportMenuAnchor}
          open={isExportMenuOpen}
          onClose={handleExportClose}
        >
          <MenuItem onClick={handleExportPDF}>Exportar como PDF</MenuItem>
          <MenuItem onClick={handleExportXML}>Exportar como XML</MenuItem>
          <MenuItem onClick={handleExportTXT}>Exportar como TXT</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
