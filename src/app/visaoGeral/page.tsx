'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Card,
  CardContent,
  Grid,
  TextField,
  Divider
} from '@mui/material';
import { AccountBalance, Add, NewReleases, CalendarToday, PendingActions } from '@mui/icons-material';
import CookiesBanner from '../../shared/components/cookiesBanner/CookiesBanner';
import CustomizedList from '../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../shared/components/buttons/FloatingSearchButton';
import { useRouter } from 'next/navigation';
const fetchReservaFromLocalApi = async () => {
  // Replace with your API call
  return {
    carteiraContratos: 0,
    meusContratos: 0,
    percentualCarteira: 0,
    contratosMes: 0,
    pendencias: 0,
    origem: 'Origem API Data',
    operacoes: ' '
  };
};



export default function VisaoGeral() {
  const [data, setData] = useState<any>({});
  const router = useRouter();
  useEffect(() => {
   
    const getData = async () => {
      
      const result = await fetchReservaFromLocalApi();
      setData(result);
      console.log(result)
    };
    getData();
  }, []);

  

  const handlePendenciasContratos =()=>{
    router.push('/solicitacoesDeAverbacao')
  }

  const handleGerenciamentoDeContratos =()=>{
    router.push('/gerenciadorDeContratos')
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />
      <Box sx={{ flexGrow: 1, padding: '45px', backgroundColor: '#E0F2F1' }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
          Visão Geral
        </Typography>

        <Grid container spacing={3}>


          {/* Carteira de Contratos */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#ffffff', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccountBalance fontSize="large" />
                  <Typography variant="h6" sx={{ ml: 2, color: '#095538' }}>
                    Carteira de Contratos
                  </Typography>
                </Box>
                <Typography variant="body1">Número de Contratos:</Typography>
                <TextField
                  value={data.results?.contratos || ''}
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ mb: 1, backgroundColor: '#ffffff' }}
                />
                <Typography variant="body1">Meus Contratos:</Typography>
                <TextField
                  value={data.meusContratos || ''}
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body1">Percentual de Carteira:</Typography>
                <TextField
                  value={`${data.percentualCarteira || 0}%`}
                  
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ mb: 1 }}
                />
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  onClick={handleGerenciamentoDeContratos}
                  sx={{
                    color: '#ffffff',
                    backgroundColor: '#0D7B52'
                  }}
                  
                >
                  Meus Contratos
                </Button>
              </Box>
            </Card>
          </Grid>

          {/*  Novos Contratos */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#ffffff', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NewReleases fontSize="large" />
                  <Typography variant="h6" sx={{ ml: 2, color: '#095538' }}>
                    Novos Contratos
                  </Typography>
                </Box>
                <Typography variant="body1">Contratos deste Mês:</Typography>
                <TextField
                  value={data.contratosMes || ''}
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    readOnly: true
                  }}
                />
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  sx={{
                    color: '#ffffff',
                    backgroundColor: '#0D7B52'
                  }}
                >
                  Contratos deste Mês
                </Button>
              </Box>
            </Card>
          </Grid>

          {/*  Pendências em Contratos */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#ffffff', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PendingActions fontSize="large" />
                  <Typography variant="h6" sx={{ ml: 2, color: '#095538' }}>
                    Pendências em Contratos
                  </Typography>
                </Box>
                <Typography variant="body1">Número de Pendências:</Typography>
                <TextField
                  value={data.pendencias || ''}
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ mb: 1 }}
                />
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  sx={{
                    color: '#ffffff',
                    backgroundColor: '#0D7B52'
                  }}
                  onClick={handlePendenciasContratos}
                >
                  Minhas Pendências
                </Button>
              </Box>
            </Card>
          </Grid>

          {/*  Data de Cortes */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#ffffff', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarToday fontSize="large" />
                  <Typography variant="h6" sx={{ ml: 2, color: '#095538' }}>
                    Data de Cortes
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ color: 'orange' }}>
                    {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                  </Typography>
                  <Box>
                    <IconButton>
                      <Add />
                    </IconButton>
                    <IconButton>
                      <Add />
                    </IconButton>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1">Origem:</Typography>
                <TextField
                  value={data.origem || ''}
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body1">Operações:</Typography>
                <TextField
                  value={data.operacoes || ''}
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    readOnly: true
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

        </Grid>

      </Box>

    </Box>
  );
}
