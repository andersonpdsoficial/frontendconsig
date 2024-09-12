// src/app/margemContratacao/emprestimoAverbacoes/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import {Grid,
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
import { fetchConsultas, fetchServidorFromExternalApi } from '../../../shared/services/apiService';
import CustomizedList from '../../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../../shared/components/cookiesBanner/CookiesBanner';


// Etapas do stepper
const steps = ['Preenchimento dos Dados', 'Análise dos Dados', 'Geração do Contrato'];



const ReservaPage = () => {

  // const [consultas, setConsultas] = useState([]);
  // const [isLoadingConsultas, setIsLoadingConsultas] = useState(true);
  // const [isErrorConsultas, setIsErrorConsultas] = useState(false);

  // useEffect(() => {
  //   const loadConsultas = async () => {
  //     try {
  //       const data = await fetchConsultas();
  //       setConsultas(data);
  //     } catch (error) {
  //       setIsErrorConsultas(true);
  //     } finally {
  //       setIsLoadingConsultas(false);
  //     }
  //   };

  //   loadConsultas();
  // }, []);


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
  const [isLoadingServidor, setIsLoadingServidor] = useState(false);
  const [isErrorServidor, setIsErrorServidor] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      if (reservaData.cpf.length === 11) { // Supondo que CPF tenha 11 dígitos
        setIsLoadingServidor(true);
        setIsErrorServidor(false);
        try {
          const data = await fetchServidorFromExternalApi(reservaData.cpf);
          setReservaData(prevData => ({
            ...prevData,
            nome: data.nome || '',
            matricula: data.matricula || '',
            vinculo: data.vinculo || ''
          }));
        } catch (error) {
          setIsErrorServidor(true);
        } finally {
          setIsLoadingServidor(false);
        }
      }
    };

    fetchData();
  }, [reservaData.cpf]);


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
    <Box sx={{ display: 'flex', backgroundColor: '#F2F2F2' }}>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />

      <Box sx={{ flexGrow: 2, backgroundColor: '#F2F2F2', padding: 7 }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', padding: '6px' }}>
          Nova Reserva de Empréstimo
        </Typography>

        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ padding: 3 }}>
          {activeStep === 0 && (
           <Grid item xs={12} sm={6}>
           <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <Typography variant="h6" gutterBottom>Preenchimento dos Dados</Typography>
      
      <TextField
        fullWidth
        label="Valor"
        variant="outlined"
        value={reservaData.valor}
        onChange={(e) => setReservaData({ ...reservaData, valor: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        select
        label="Consulta"
        variant="outlined"
        value={reservaData.consulta}
        onChange={(e) => setReservaData({ ...reservaData, consulta: e.target.value })}
        margin="normal"
        required
      >
        {isLoadingConsultas ? (
          <MenuItem disabled>
            <CircularProgress size={24} />
          </MenuItem>
        ) : isErrorConsultas ? (
          <MenuItem disabled>
            <Typography color="error">Erro ao carregar consultas</Typography>
          </MenuItem>
        ) : consultas.length > 0 ? (
          consultas.map((consulta) => (
            <MenuItem key={consulta.id} value={consulta.id}>
              {consulta.id}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>Nenhuma consulta disponível</MenuItem>
        )}
      </TextField>
      
      <TextField
        fullWidth
        label="Prazo Inicial"
        variant="outlined"
        value={reservaData.prazoInicial}
        onChange={(e) => setReservaData({ ...reservaData, prazoInicial: e.target.value })}
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        required
      />
      
      <TextField
        fullWidth
        label="Prazo Final"
        variant="outlined"
        value={reservaData.prazoFinal}
        onChange={(e) => setReservaData({ ...reservaData, prazoFinal: e.target.value })}
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        required
      />
      
      <TextField
        fullWidth
        label="Situação"
        variant="outlined"
        value={reservaData.situacao}
        onChange={(e) => setReservaData({ ...reservaData, situacao: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Contrato"
        variant="outlined"
        value={reservaData.contrato}
        onChange={(e) => setReservaData({ ...reservaData, contrato: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Matricula"
        variant="outlined"
        value={reservaData.matricula}
        onChange={(e) => setReservaData({ ...reservaData, matricula: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="CPF"
        variant="outlined"
        value={reservaData.cpf}
        onChange={(e) => setReservaData({ ...reservaData, cpf: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Nome"
        variant="outlined"
        value={reservaData.nome}
        onChange={(e) => setReservaData({ ...reservaData, nome: e.target.value })}
        margin="normal"
        required
        disabled
      />
      
      <TextField
        fullWidth
        label="Valor Disponível"
        variant="outlined"
        value={reservaData.valorDisponivel}
        onChange={(e) => setReservaData({ ...reservaData, valorDisponivel: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Margem Total"
        variant="outlined"
        value={reservaData.margemTotal}
        onChange={(e) => setReservaData({ ...reservaData, margemTotal: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Vencimento das Parcelas"
        variant="outlined"
        value={reservaData.vencimentoParcela}
        onChange={(e) => setReservaData({ ...reservaData, vencimentoParcela: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Total Financiado"
        variant="outlined"
        value={reservaData.totalFinanciado}
        onChange={(e) => setReservaData({ ...reservaData, totalFinanciado: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Líquido Liberado"
        variant="outlined"
        value={reservaData.liquidoLiberado}
        onChange={(e) => setReservaData({ ...reservaData, liquidoLiberado: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Observações"
        variant="outlined"
        value={reservaData.observacoes}
        onChange={(e) => setReservaData({ ...reservaData, observacoes: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Custo Efetivo Total - CET"
        variant="outlined"
        value={reservaData.cet}
        onChange={(e) => setReservaData({ ...reservaData, cet: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Quantidade de Parcelas"
        variant="outlined"
        value={reservaData.quantidadeParcelas}
        onChange={(e) => setReservaData({ ...reservaData, quantidadeParcelas: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Valor das Parcelas"
        variant="outlined"
        value={reservaData.valorParcelas}
        onChange={(e) => setReservaData({ ...reservaData, valorParcelas: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Juros Mensal"
        variant="outlined"
        value={reservaData.jurosMensal}
        onChange={(e) => setReservaData({ ...reservaData, jurosMensal: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Valor do IOF"
        variant="outlined"
        value={reservaData.valorIof}
        onChange={(e) => setReservaData({ ...reservaData, valorIof: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Dias de Carência"
        variant="outlined"
        value={reservaData.carenciaDias}
        onChange={(e) => setReservaData({ ...reservaData, carenciaDias: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Valor da Carência"
        variant="outlined"
        value={reservaData.valorCarencia}
        onChange={(e) => setReservaData({ ...reservaData, valorCarencia: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Vínculo do Servidor"
        variant="outlined"
        value={reservaData.vinculo}
        onChange={(e) => setReservaData({ ...reservaData, vinculo: e.target.value })}
        margin="normal"
        required
        disabled
      />
      
      <Button onClick={handleNext} variant="contained" color="primary" style={{ marginTop: '16px' }}>Próximo</Button>
    </div>
         </Grid>
         

          )}
          {activeStep === 1 && (
            <div>
              <Typography variant="h6">Análise dos Dados</Typography>
              <Typography>Valor: {reservaData.valor}</Typography>
              <Typography>Consulta: {reservaData.consulta}</Typography>
              <Typography>Prazo Incial: {reservaData.prazoInicial}</Typography>
              <Typography>Prazo Final: {reservaData.prazoFinal}</Typography>
              <Typography>Contrato: {reservaData.contrato}</Typography>
              <Typography>CPF: {reservaData.cpf}</Typography>
              <Typography>Nome: {reservaData.nome}</Typography>
              <Typography>Valor Diponivel: {reservaData.valorDisponivel}</Typography>
              <Typography>Margem Total: {reservaData.margemTotal}</Typography>
              <Typography>Vencimento das Parcelas: {reservaData.vencimentoParcela}</Typography>
              <Typography>Total Financiado: {reservaData.totalFinanciado}</Typography>
              <Typography>Valor Liquido Liberado: {reservaData.liquidoLiberado}</Typography>
              <Typography>Observações: {reservaData.observacoes}</Typography>
              <Typography>Custo Efetivo Total - CET: {reservaData.cet}</Typography>
              <Typography>Quantidades de Parcelas: {reservaData.quantidadeParcelas}</Typography>
              <Typography>Valor das Parcelas: {reservaData.valorParcelas}</Typography>
              <Typography>Juros Mensal: {reservaData.jurosMensal}</Typography>
              <Typography>Valor do Iof: {reservaData.valorIof}</Typography>
              <Typography>Dias de Carencia: {reservaData.carenciaDias}</Typography>
              <Typography>Valor da Carência: {reservaData.valorCarencia}</Typography>
              <Typography>Vinculo do Servidor: {reservaData.vinculo}</Typography>

              {/*Aqui vai ser feito calculo de subtração ao ser criado a reserva */}
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
              <Typography>Status: Enviado para Analise.</Typography>
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

    </Box>

  );
};

export default ReservaPage;





//FFFFFFFFFFFFFFFFFFFFFFFFFFFF
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, MenuItem, CircularProgress, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { fetchServidorFromExternalApi } from './apiService'; // Importar a função de serviço
import { Stepper, Step, StepLabel } from '@mui/material';

const Formulario = ({ activeStep, steps, handleNext, handleBack, handleReset, isSaving }) => {
  const [reservaData, setReservaData] = useState({
    valor: '',
    consulta: '',
    prazoInicial: '',
    prazoFinal: '',
    situacao: '',
    contrato: '',
    matricula: '',
    cpf: '',
    nome: '',
    valorDisponivel: '',
    margemTotal: '',
    vencimentoParcela: '',
    totalFinanciado: '',
    liquidoLiberado: '',
    observacoes: '',
    cet: '',
    quantidadeParcelas: '',
    valorParcelas: '',
    jurosMensal: '',
    valorIof: '',
    carenciaDias: '',
    valorCarencia: '',
    vinculo: '',
    margemAntes: '',
    margemApos: ''
  });

  const [isLoadingServidor, setIsLoadingServidor] = useState(false);
  const [isErrorServidor, setIsErrorServidor] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (reservaData.cpf.length === 11) { // Supondo que CPF tenha 11 dígitos
        setIsLoadingServidor(true);
        setIsErrorServidor(false);
        try {
          const data = await fetchServidorFromExternalApi(reservaData.cpf);
          setReservaData(prevData => ({
            ...prevData,
            nome: data.nome || '',
            matricula: data.matricula || '',
            vinculo: data.vinculo || ''
          }));
        } catch (error) {
          setIsErrorServidor(true);
        } finally {
          setIsLoadingServidor(false);
        }
      }
    };

    fetchData();
  }, [reservaData.cpf]);

  const renderTextField = (label, key, isDisabled = false) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
      <TextField
        fullWidth
        label={label}
        variant="outlined"
        value={reservaData[key]}
        onChange={(e) => setReservaData({ ...reservaData, [key]: e.target.value })}
        margin="normal"
        required
        disabled={isDisabled}
        InputProps={{
          endAdornment: reservaData[key] ? (
            <IconButton edge="end">
              <CheckCircleIcon color="success" />
            </IconButton>
          ) : null,
        }}
      />
    </Grid>
  );

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F2F2F2' }}>
      <Box sx={{ flexGrow: 2, backgroundColor: '#F2F2F2', padding: 7 }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', padding: '6px' }}>
          Nova Reserva de Empréstimo
        </Typography>

        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ padding: 3 }}>
          {activeStep === 0 && (
            <Grid container spacing={2}>
              {renderTextField('Valor', 'valor')}
              {renderTextField('Consulta', 'consulta')}
              {renderTextField('Prazo Inicial', 'prazoInicial', false, 'date')}
              {renderTextField('Prazo Final', 'prazoFinal', false, 'date')}
              {renderTextField('Situação', 'situacao')}
              {renderTextField('Contrato', 'contrato')}
              {renderTextField('Matricula', 'matricula')}
              {renderTextField('CPF', 'cpf')}
              {renderTextField('Nome', 'nome', true)}
              {renderTextField('Valor Disponível', 'valorDisponivel')}
              {renderTextField('Margem Total', 'margemTotal')}
              {renderTextField('Vencimento das Parcelas', 'vencimentoParcela')}
              {renderTextField('Total Financiado', 'totalFinanciado')}
              {renderTextField('Líquido Liberado', 'liquidoLiberado')}
              {renderTextField('Observações', 'observacoes')}
              {renderTextField('Custo Efetivo Total - CET', 'cet')}
              {renderTextField('Quantidade de Parcelas', 'quantidadeParcelas')}
              {renderTextField('Valor das Parcelas', 'valorParcelas')}
              {renderTextField('Juros Mensal', 'jurosMensal')}
              {renderTextField('Valor do IOF', 'valorIof')}
              {renderTextField('Dias de Carência', 'carenciaDias')}
              {renderTextField('Valor da Carência', 'valorCarencia')}
              {renderTextField('Vínculo do Servidor', 'vinculo', true)}

              <Button onClick={handleNext} variant="contained" color="primary" style={{ marginTop: '16px' }}>
                Próximo
              </Button>
            </Grid>
          )}
          {activeStep === 1 && (
            <div>
              <Typography variant="h6">Análise dos Dados</Typography>
              <Typography>Valor: {reservaData.valor}</Typography>
              <Typography>Consulta: {reservaData.consulta}</Typography>
              <Typography>Prazo Incial: {reservaData.prazoInicial}</Typography>
              <Typography>Prazo Final: {reservaData.prazoFinal}</Typography>
              <Typography>Contrato: {reservaData.contrato}</Typography>
              <Typography>CPF: {reservaData.cpf}</Typography>
              <Typography>Nome: {reservaData.nome}</Typography>
              <Typography>Valor Disponível: {reservaData.valorDisponivel}</Typography>
              <Typography>Margem Total: {reservaData.margemTotal}</Typography>
              <Typography>Vencimento das Parcelas: {reservaData.vencimentoParcela}</Typography>
              <Typography>Total Financiado: {reservaData.totalFinanciado}</Typography>
              <Typography>Valor Líquido Liberado: {reservaData.liquidoLiberado}</Typography>
              <Typography>Observações: {reservaData.observacoes}</Typography>
              <Typography>Custo Efetivo Total - CET: {reservaData.cet}</Typography>
              <Typography>Quantidade de Parcelas: {reservaData.quantidadeParcelas}</Typography>
              <Typography>Valor das Parcelas: {reservaData.valorParcelas}</Typography>
              <Typography>Juros Mensal: {reservaData.jurosMensal}</Typography>
              <Typography>Valor do IOF: {reservaData.valorIof}</Typography>
              <Typography>Dias de Carência: {reservaData.carenciaDias}</Typography>
              <Typography>Valor da Carência: {reservaData.valorCarencia}</Typography>
              <Typography>Vínculo do Servidor: {reservaData.vinculo}</Typography>

              <Typography>Margem Antes: {reservaData.margemAntes}</Typography>
              <Typography>Margem Após: {reservaData.margemApos}</Typography>
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
              <Typography>Status: Enviado para Análise.</Typography>
              <Button onClick={handleReset} variant="contained" color="primary">
                Finalizar
              </Button>
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Formulario;

