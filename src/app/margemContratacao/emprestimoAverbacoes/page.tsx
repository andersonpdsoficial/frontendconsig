// src/app/margemContratacao/emprestimoAverbacoes/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Box,
  IconButton
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useQuery } from '@tanstack/react-query';
import { useReserva } from '../../../shared/hooks/useReserva';
import { fetchConsultas } from '../../../shared/services/apiService';


// Etapas do stepper
const steps = ['Preenchimento dos Dados', 'Análise dos Dados', 'Geração do Contrato'];

const ReservaPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [reservaData, setReservaData] = useState<any>({
    valor: '',
    consulta: '',
    prazoInicial: '',
    prazoFinal: '',
    situacao: 0,
    contrato: '',
    matricula: '',
    cpf: '',
    nome: '',
    margemDisponivel: '',
    margemTotal: '',
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
    margemAntes: '',
    margemApos: '',
  });

  const { mutate: createReserva, isLoading: isSaving } = useReserva();

  // Consultas para o select
  const { data: consultas, isLoading: isLoadingConsultas, isError: isErrorConsultas } = useQuery({
    queryKey: ['consultas'],
    queryFn: fetchConsultas,
  });

  useEffect(() => {
    if (activeStep === 2 && reservaData.contrato) {
      // Fetch margin data for the current reservation
      // Logic to fetch margin data should be here
    }
  }, [activeStep, reservaData.contrato]);

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate fields for the first step
      if (reservaData.consulta && reservaData.valor) {
        setActiveStep((prev) => prev + 1);
      }
    } else if (activeStep === 1) {
      // Confirm and submit data
      createReserva(reservaData, {
        onSuccess: (data) => {
          setReservaData((prev) => ({ ...prev, contrato: data.contrato }));
          setActiveStep((prev) => prev + 1);
        },
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setReservaData({
      valor: '',
      consulta: '',
      prazoInicial: '',
      prazoFinal: '',
      situacao: 0,
      contrato: '',
      matricula: '',
      cpf: '',
      nome: '',
      margemDisponivel: '',
      margemTotal: '',
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
      margemAntes: '',
      margemApos: '',
    });
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ padding: 3 }}>
        {activeStep === 0 && (
          <div>
            <Typography variant="h6">Preenchimento dos Dados</Typography>
            <TextField
              fullWidth
              label="Valor"
              variant="outlined"
              value={reservaData.valor}
              onChange={(e) => setReservaData({ ...reservaData, valor: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Consulta"
              variant="outlined"
              value={reservaData.consulta}
              onChange={(e) => setReservaData({ ...reservaData, consulta: e.target.value })}
              margin="normal"
            >
              {isLoadingConsultas ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : isErrorConsultas ? (
                <MenuItem disabled>
                  <Typography color="error">Erro ao carregar consultas</Typography>
                </MenuItem>
              ) : (
                consultas?.map((consulta: any) => (
                  <MenuItem key={consulta.id} value={consulta.id}>
                    {consulta.nome}
                  </MenuItem>
                ))
              )}
            </TextField>
            {/* Outros campos aqui */}
            <Button onClick={handleNext} variant="contained" color="primary">Próximo</Button>
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <Typography variant="h6">Análise dos Dados</Typography>
            <Typography>Valor: {reservaData.valor}</Typography>
            <Typography>Consulta: {reservaData.consulta}</Typography>
            <Typography>Margem Antes: {reservaData.margemAntes}</Typography>
            <Typography>Margem Após: {reservaData.margemApos}</Typography>
            {/* Outros dados a confirmar */}
            <Button onClick={handleBack} variant="contained">Voltar</Button>
            <Button onClick={handleNext} variant="contained" color="primary" disabled={isSaving}>
              {isSaving ? <CircularProgress size={24} /> : 'Confirmar'}
            </Button>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <CheckCircleIcon color="success" fontSize="large" />
            <Typography variant="h6">Contrato gerado com sucesso!</Typography>
            <Typography>Número do contrato: {reservaData.contrato}</Typography>
            <Typography>Status: Em Análise</Typography>
            <Button 
              onClick={handleReset} 
              variant="contained" 
              color="primary"
            >
              Finalizar
            </Button>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default ReservaPage;