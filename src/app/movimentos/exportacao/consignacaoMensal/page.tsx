'use client'
import FloatingSearchButton from "@/shared/components/buttons/FloatingSearchButton";
import CookiesBanner from "@/shared/components/cookiesBanner/CookiesBanner";
import CustomizedList from "@/shared/components/menu-lateral/Demo";
import { Typography, Box } from "@mui/material";
// import React from "react";
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const consignacaoMensal: React.FC = () => {


  

  interface Column {
    id: 'situacao' | 'convenio' | 'estabelecimento' | 'folha' | 'usuarioExportacao' | 'dataEHora' | 'acoes';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    {
      id: 'situacao',
      label: 'Situação',
      minWidth: 170
    },
    {
      id: 'convenio',
      label: 'Convênio',
      minWidth: 100
    },
    {
      id: 'estabelecimento',
      label: 'Estabelecimento',
      minWidth: 170,
      align: 'right',
      
    },
    {
      id: 'folha',
      label: 'Folha',
      minWidth: 170,
      align: 'right',
     
    },

    {
      id: 'usuarioExportacao',
      label: 'Usuário Exportação',
      minWidth: 170,
      align: 'right',
      
    },
    {
      id: 'dataEHora',
      label: 'Dta/Hora',
      minWidth: 170,
      align: 'right',
     
    },
    {
      id: 'acoes',
      label: 'Ações',
      minWidth: 170,
      align: 'right',
      
    },
  ];

  interface Data {
    situacao: string;
    convenio: string;
    estabelecimento: string;
    folha: string;
    usuarioExportacao: string;
    dataEHora: string;
    acoes: string;
  }



  function createData(
    situacao: string,
    convenio: string,
    estabelecimento: string,
    folha: string,
    usuarioExportacao: string,
    dataEHora: string,
    acoes: string,
  ): Data{
    return {situacao,convenio, estabelecimento,folha,usuarioExportacao,dataEHora,acoes}
  }


  const rows = [
    createData('Concluido', 'todos ', 'Folha Defensoria', 'Agosto/2024','Admin','04-09-2024',' '),

  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F2F2F2', }}>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />

      <Box sx={{ flexGrow: 1, padding: '20px', backgroundColor: '#E0F2F1' }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
          Exportação de Consignação Mensal
        </Typography>
        {/* incio de uma box */}
        <Box
          sx={{
            padding: 2,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            borderRadius: 2,
            marginTop: 2,
          }}
        >

          {/* <Box sx={{ flexGrow: 1, backgroundColor: '#F2F2F2' }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', padding: 4, color: '#0C764F', backgroundColor: '#E8F5E9' }}>
              Consultar Exportações Mensais
            </Typography>
          </Box> */}


          <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                  <TableCell align="left" colSpan={12}  sx={{padding: 4, color: '#0C764F', backgroundColor: '#E8F5E9' }}>
              Pesquisa
            </TableCell>
                    <TableCell align="right" colSpan={12} sx={{padding: 4, color: '#0C764F', backgroundColor: '#E8F5E9' }}>
                      Nova Exportação
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 57, minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.situacao}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100,150,200,250]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>


        </Box>
      </Box>
    </Box>
  )
}
export default consignacaoMensal;
