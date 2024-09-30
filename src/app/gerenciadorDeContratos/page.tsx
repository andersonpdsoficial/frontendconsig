'use client';
import React, { useEffect, useState } from 'react';
import { Box, AppBar, Tabs, Tab, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, TextField } from '@mui/material';
import FloatingSearchButton from '../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../shared/components/cookiesBanner/CookiesBanner';
import CustomizedList from '../../shared/components/menu-lateral/Demo';
import { fetchReservasForReports } from '../../shared/services/apiService'; // Ajuste o caminho conforme necessário
import useGerenciamentoDeContrato from '../../shared/hooks/useGerenciamentoDeContrato';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm, Controller } from 'react-hook-form';

export default function VisaoGeral() {
  const [value, setValue] = useState(0);
  const [contratos, setContratos] = useState([]);
  const [error, setError] = useState(null);
  const { groupedContratos } = useGerenciamentoDeContrato();
  const { control } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReservasForReports();
        console.log('Dados recebidos da API:', data);
        setContratos(data.results || data); // Ajuste aqui conforme necessário
      } catch (err) {
        setError('Erro ao buscar contratos.');
      }
    };
  
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderContratos = (contratos) => {
    return contratos.map((contrato, index) => (
      <Accordion key={index}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{`${contrato.cpf} - ${contrato.contrato} - ${contrato.nome}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component="form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="valor"
                  control={control}
                  defaultValue={contrato.valor}
                  render={({ field }) => <TextField {...field} label="Valor" fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="cpf"
                  control={control}
                  defaultValue={contrato.cpf}
                  render={({ field }) => <TextField {...field} label="CPF: " fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="prazo_inicial"
                  control={control}
                  defaultValue={contrato.prazo_inicial}
                  render={({ field }) => <TextField {...field} label="Prazo Inicial" fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="prazo_final"
                  control={control}
                  defaultValue={contrato.prazo_final}
                  render={({ field }) => <TextField {...field} label="Prazo Final" fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="prazo_final"
                  control={control}
                  defaultValue={contrato.prazo_final}
                  render={({ field }) => <TextField {...field} label="Prazo Final" fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="observacoes"
                  control={control}
                  defaultValue={contrato.observacoes}
                  render={({ field }) => <TextField {...field} label="Observações: " fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="margem_disponivel"
                  control={control}
                  defaultValue={contrato.margem_disponivel}
                  render={({ field }) => <TextField {...field} label="Margem Disponivel: " fullWidth />}
                />
              </Grid>
              {/* Adicione os outros campos da mesma forma */}
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    ));
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F2F2F2', flexGrow: 1 }}>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />

      <Box sx={{ flexGrow: 1, padding: { xs: '10px', md: '20px' }, backgroundColor: '#F2F2F2' }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
          Gerenciamento de Contratos
        </Typography>

        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="DEFERIDOS" />
            <Tab label="INDEFERIDOS" />
            <Tab label="EM ANÁLISE" />
            <Tab label="EXPIRADOS" />
          </Tabs>
        </AppBar>

        {error && <Typography color="error">{error}</Typography>}

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TabPanel value={value} index={0}>
              <Typography variant="h6">Contratos Deferidos:</Typography>
              {renderContratos(groupedContratos.deferidos)}
            </TabPanel>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value={value} index={1}>
              <Typography variant="h6">Contratos Indeferidos:</Typography>
              {renderContratos(groupedContratos.indeferidos)}
            </TabPanel>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value={value} index={2}>
              <Typography variant="h6">Contratos em Análise:</Typography>
              {renderContratos(groupedContratos.emAnalise)}
            </TabPanel>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value={value} index={3}>
              <Typography variant="h6">Contratos Expirados:</Typography>
              {renderContratos(groupedContratos.expirados)}
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// Componente TabPanel
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
