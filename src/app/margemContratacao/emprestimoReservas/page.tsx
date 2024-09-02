'use client';

import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Paper, Typography, Grid, TextField } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FloatingSearchButton from '../../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../../shared/components/cookiesBanner/CookiesBanner';
import CustomizedList from '../../../shared/components/menu-lateral/Demo';
import { jsPDF } from 'jspdf';

const steps = ['Informações do Contrato', 'Confirmação', 'Finalização'];

const NovaEmprestimoReserva = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.text('ADF 000000 Autorização de Desconto Em Folha', 10, 10);
    doc.text('ATENÇÃO - O PAGAMENTO deve ser informado até as 23h59 do dia da emissão. Caso não seja informado até esta data o Contrato será automaticamente Cancelado!', 10, 20);
    doc.save('autorizacao_desconto.pdf');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Menu Lateral */}
      <CustomizedList />

      {/* Conteúdo Principal */}
      <Box sx={{ flexGrow: 1, p: 3, boxShadow: 3 }}>
        <FloatingSearchButton />
        <CookiesBanner />

        {/* Formulário de Reserva de Empréstimo */}
        <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 4, elevation: 2 }}>
          <Typography variant="h6" gutterBottom>
            Nova Reserva de Empréstimo
          </Typography>

          <Grid container spacing={2}>
            {/* Informações do Cliente */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ padding: 2, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Informações do Cliente
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField label="Matrícula" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField label="Nome" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField label="CPF" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField label="Vínculo" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField label="Situação" variant="standard" fullWidth />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Informações do Empréstimo */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: 2, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Informações do Empréstimo
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField label="Valor" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Parcelas" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Vencimento" variant="standard" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Banco" variant="standard" fullWidth />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          {/* Stepper */}
          <Box sx={{ width: '100%', marginTop: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ mt: 2, mb: 1 }}>
              {activeStep === 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Número do Contrato do Sistema do Banco
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <TextField label="Vencimento 1ª parcela" variant="standard" fullWidth />
                    </Grid>
                  </Grid>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                      Voltar
                    </Button>
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                      Próximo
                    </Button>
                  </Box>
                </Paper>
              )}

              {activeStep === 1 && (
                <Paper sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Dados do Colaborador
                      </Typography>
                      <Typography>Nome: ______________________</Typography>
                      <Typography>Matrícula: __________________</Typography>
                      <Typography>CPF: _________________________</Typography>
                      <Typography>Vínculo: _____________________</Typography>
                      <Typography>Situação: ____________________</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Dados do Contrato
                      </Typography>
                      <Typography>Valor líquido liberado: R$ 00,00</Typography>
                      <Typography>Folha 1° Desconto: mes/ano</Typography>
                      <Typography>Quantidade de parcelas:</Typography>
                      <Typography>Valor da(s) parcela(s): R$ 00,00</Typography>
                      <Typography>Data 1ª parcela: dia/mes/ano</Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                      Anterior
                    </Button>
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                      Confirmar
                    </Button>
                  </Box>
                </Paper>
              )}

              {activeStep === 2 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Passo 3: Finalização
                  </Typography>
                  <Typography>ADF 000000 Autorização de Desconto Em Folha</Typography>
                  <Typography>ATENÇÃO - O PAGAMENTO deve ser informado até as 23h59 do dia da emissão. Caso não seja informado até esta data o Contrato será automaticamente Cancelado!</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                      Anterior
                    </Button>
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                      Confirmar
                    </Button>
                    <Button onClick={handlePrintPDF} sx={{ mr: 1 }}>
                      IMPRIMIR PDF
                    </Button>
                    <Button onClick={handleReset}>
                      ENCERRAR
                    </Button>
                  </Box>
                </Paper>
              )}
            </Box>

            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>Todos os passos concluídos - você terminou</Typography>
                <Button onClick={handleReset}>Resetar</Button>
              </Paper>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default NovaEmprestimoReserva;
