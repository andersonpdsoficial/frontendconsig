'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Paper, Typography, TextField } from '@mui/material';
import { jsPDF } from 'jspdf';  // Importa jsPDF para criação do PDF
import CustomizedList from '../../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../../shared/components/cookiesBanner/CookiesBanner';
import StepperComponent from '../../../shared/components/StepperComponent/page';
import { fetchConsignatariaFromLocalApi, fetchMargemServidor, fetchServidorFromExternalApi, fetchServidorFromLocalApi } from '../../../shared/services/apiService';

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
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = ['Informações do Contrato', 'Confirmação', 'Finalização'];

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
    const fetchData = async () => {
      try {
        const matricula = 123456; // Use a matrícula apropriada
        const externalData = await fetchServidorFromExternalApi(matricula);
        const localData = await fetchServidorFromLocalApi(externalData.matricula);
        const consignatariaData = await fetchConsignatariaFromLocalApi();

        // Assumindo que o primeiro item é o relevante
        const consignatariaId = consignatariaData[0]?.id || 0;
        const margemData = await fetchMargemServidor(externalData.matricula, consignatariaId);

        setFormData(prevData => ({
          ...prevData,
          matricula: externalData.matricula,
          nome: externalData.nome,
          cpf: externalData.cpf,
          margemDisponivel: `R$ ${margemData.margemDisponivel}`,
          margemTotal: `R$ ${margemData.margemTotal}`
        }));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setActiveStep(prevActiveStep => Math.min(prevActiveStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => Math.max(prevActiveStep - 1, 0));
  };

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    const lineHeight = 10;
    let yOffset = 10;

    doc.text("Dados do Colaborador", 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Nome: ${formData.nome}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Matrícula: ${formData.matricula}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`CPF: ${formData.cpf}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Margem Disponível: ${formData.margemDisponivel}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Margem Total: ${formData.margemTotal}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text("Dados do Contrato", 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Número do Contrato: ${formData.numeroContrato}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Vencimento da 1ª parcela: ${formData.vencimentoParcela}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Folha 1º Desconto: ${formData.folhaDesconto}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Valor Total Financiado: ${formData.totalFinanciado}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Valor Líquido Liberado: ${formData.liquidoLiberado}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Data de Liberação do Crédito: ${formData.liberacaoCredito}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`CET: ${formData.cet}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Observações: ${formData.observacoes}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Quantidade de Parcelas: ${formData.quantidadeParcelas}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Valor da(s) Parcela(s): ${formData.valorParcelas}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Juros Mensal: ${formData.jurosMensal}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Valor IOF: ${formData.valorIof}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Carência em Dias: ${formData.carenciaDias}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Valor da Carência: ${formData.valorCarencia}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Vínculo: ${formData.vinculo}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Situação: ${formData.situacao}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Margem Antes: ${formData.margemAntes}`, 10, yOffset);
    yOffset += lineHeight;
    doc.text(`Margem Após: ${formData.margemApos}`, 10, yOffset);

    doc.save('contrato.pdf');
  };

  const handleClose = () => {
    setActiveStep(steps.length - 1);  // Finaliza o Stepper
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F2F2F2' }}>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />

      <Box sx={{ flexGrow: 2, backgroundColor: '#F2F2F2', padding: 6 }}>
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
