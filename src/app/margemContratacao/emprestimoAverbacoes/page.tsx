'use client';

import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, TextField } from '@mui/material';
import { jsPDF } from 'jspdf';
import CustomizedList from '../../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../../shared/components/cookiesBanner/CookiesBanner';
import StepperComponent from '../../../shared/components/StepperComponent/page';

import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';

dayjs.locale('pt-br');

interface FormData {
  matricula: string;
  cpf: string;
  nome: string;
  margemDisponivel: string;
  margemTotal: string;
  numeroContrato: string;
  vencimentoParcela: string;
  folhaDesconto: string;
  totalFinanciado: string;
  liquidoLiberado: string;
  liberacaoCredito: string;
  cet: string;
  observacoes: string;
  quantidadeParcelas: string;
  valorParcelas: string;
  jurosMensal: string;
  valorIof: string;
  carenciaDias: string;
  valorCarencia: string;
  vinculo: string;
  situacao: string;
  margemAntes: string;
  margemApos: string;
}

const NovoEmprestimo: React.FC = () => {
  const location = useLocalizationContext();
  const [formData, setFormData] = useState<FormData>({
    matricula: '',
    cpf: '',
    nome: '',
    margemDisponivel: 'R$ 0,00',
    margemTotal: 'R$ 0,00',
    numeroContrato: '',
    vencimentoParcela: '',
    folhaDesconto: '',
    totalFinanciado: '',
    liquidoLiberado: '',
    liberacaoCredito: '',
    cet: '',
    observacoes: '',
    quantidadeParcelas: '',
    valorParcelas: '',
    jurosMensal: '',
    valorIof: '',
    carenciaDias: '',
    valorCarencia: '',
    vinculo: '',
    situacao: '',
    margemAntes: 'R$ 0,00',
    margemApos: 'R$ 0,00'
  });

  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
    } else {
      console.error('Dados não encontrados.');
    }
  }, [location.state]);

  const handleNext = () => {
    // ... seu código existente
  };

  const handleBack = () => {
    // ... seu código existente
  };

  const handlePrintPDF = () => {
    // ... seu código existente
  };

  const handleClose = () => {
    // ... seu código existente
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F2F2F2' }}>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />

      <Box sx={{ flexGrow: 2, backgroundColor: '#F2F2F2', padding: 7 }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', padding: '6px' }}>
          Nova Reserva de Empréstimo
        </Typography>

        <Paper elevation={3} sx={{ padding: 6, borderRadius: 2, marginBottom: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Informações do Cliente
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Matrícula"
                variant="standard"
                fullWidth
                value={formData.matricula}
                onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="CPF"
                variant="standard"
                fullWidth
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                variant="standard"
                fullWidth
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h6">Margem Disponível (R$)</Typography>
              <Typography variant="body1">{formData.margemDisponivel}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h6">Margem Total (R$)</Typography>
              <Typography variant="body1">{formData.margemTotal}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <StepperComponent
          activeStep={activeStep}
          steps={steps}
          handleNext={handleNext}
          handleBack={handleBack}
          handlePrintPDF={handlePrintPDF}
          handleClose={handleClose}
          formData={formData}
        />
      </Box>
    </Box>
  );
};

export default NovoEmprestimo;