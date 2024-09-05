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

const fetchDataFromAPI = async () => {
  // Replace with your API call
  return {
    carteiraContratos: 120,
    meusContratos: 80,
    percentualCarteira: 60,
    contratosMes: 25,
    pendencias: 15,
    origem: 'Origem API Data',
    operacoes: 'Operações API Data'
  };
};

export default function VisaoGeral() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const getData = async () => {
      const result = await fetchDataFromAPI();
      setData(result);
    };
    getData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: '20px', backgroundColor: '#F2F2F2' }}>
       <CustomizedList />
        <FloatingSearchButton />
        <CookiesBanner />
      <Grid container spacing={3}>
        {/* Quadrado 1: Carteira de Contratos */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalance fontSize="large" />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  Carteira de Contratos
                </Typography>
              </Box>
              <Typography variant="body1">Número de Contratos:</Typography>
              <TextField
                value={data.carteiraContratos || ''}
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true
                }}
                sx={{ mb: 1 }}
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
              >
                Meus Contratos
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Quadrado 2: Novos Contratos */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NewReleases fontSize="large" />
                <Typography variant="h6" sx={{ ml: 2 }}>
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
              >
                Contratos deste Mês
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Quadrado 3: Pendências em Contratos */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PendingActions fontSize="large" />
                <Typography variant="h6" sx={{ ml: 2 }}>
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
              >
                Minhas Pendências
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Quadrado 4: Data de Cortes */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarToday fontSize="large" />
                <Typography variant="h6" sx={{ ml: 2 }}>
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
  );
}
