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
import { fetchConsultas, fetchServidorConsignadoFromExternalApi, fetchServidorFromExternalApi } from '../../../shared/services/apiService';
import CustomizedList from '../../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../../shared/components/cookiesBanner/CookiesBanner';

// Etapas do stepper
const steps = ['Preenchimento dos Dados', 'Análise dos Dados', 'Geração do Contrato'];


const margem_apos = reservaData.margem_disponivel - reservaData.valor_parcelas;


const ReservaPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [reservaData, setReservaData] = useState<any>({
    matricula: '',
    cpf: '',
    valor: '',
    consulta: '',
    email: '',
    prazo_inicial: '',
    prazo_final: '',
    situacao: 0,
    contrato: '',
    nome: '',
    margem_disponivel: '',
    margem_total: '',
    vencimento_parcela: '',
    folha_desconto: '',
    total_financiado: '',
    liquido_liberado: '',
    liberacao_credito: '',
    cet: '',
    observacoes: '',
    quantidade_parcelas: '',
    valor_parcelas: '',
    folha: '',
    juros_mensal: '',
    valorIof: '',
    carencia_dias: '',
    valor_carencia: '',
    vinculo: '',
    margem_antes: '',
    margem_apos: '',
  });
  const { mutate: createReserva, isLoading: isSaving } = useReserva();


  // Consultas para o select
  const { data: consultas, isLoading: isLoadingConsultas, isError: isErrorConsultas } = useQuery({
    queryKey: ['consultas'],
    queryFn: fetchConsultas,
  });

  useEffect(() => {
    if (activeStep === 2 && reservaData.contrato) {

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
   
      prazo_inicial:'',
      prazo_final: '',
      situacao: ' ',
      contrato: '',
      matricula: '',
      cpf: '',
      nome: '',
      margem_disponivel: '',
      margem_total: '',
      vencimento_parcela: '',
      folha_desconto: '',
      total_financiado: '',
      liquido_liberado: '',
      liberacao_credito: '',
      cet: '',
      observacoes: '',
      quantidade_parcelas: '',
      valor_parcelas: '',
      folha: '',
      juros_mensal: '',
      valor_iof: '',
      carencia_dias: '',
      valor_carencia: '',
      vinculo: '',
      margem_antes: '',
      margem_apos: '',
    });
    setActiveStep(0);
  };

  const [isLoadingServidor, setIsLoadingServidor] = useState(false);
  const [isErrorServidor, setIsErrorServidor] = useState(false);

//Busca pelo dados na externalApi consignado
  useEffect(() => {
    const fetchData = async () => {
      if (reservaData.matricula.length ) { 
        setIsLoadingServidor(true);
        setIsErrorServidor(false);
        try {
          const data = await fetchServidorConsignadoFromExternalApi(reservaData.matricula);
          setReservaData(prevData => ({
            ...prevData,
            nome: data.results[0]?.nome_servidor || '',
            cpf: data.results[0]?.cpf_servidor || '',
            margem_disponivel: data.results[0]?.margem_consignada_livre || '',
            margem_total: data.results[0]?.margem_consignada_total || '',
            // margem_disponivel: data.results[0]?.margem_consignada_livre || '',
            
          }));
        } catch (error) {
          setIsErrorServidor(true);
        } finally {
          setIsLoadingServidor(false);
        }
      }
    };

    fetchData();
  }, [reservaData.matricula]);
//Busca pelo vinculo externalApi no servidor
  useEffect(() => {
    const fetchData = async () => {
      if (reservaData.matricula.length ) { 
        setIsLoadingServidor(true);
        setIsErrorServidor(false);
        try {
          const data = await fetchServidorFromExternalApi(reservaData.matricula);
          setReservaData(prevData => ({
            ...prevData,
            vinculo: data.results[0]?.tipo_servidor.nome || 'Vínculo Não Localizado',
          }));
        } catch (error) {
          setIsErrorServidor(true);
        } finally {
          setIsLoadingServidor(false);
        }
      }
    };

    fetchData();
  }, [reservaData.matricula]);

  

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
          )).at(-1)
        ) : (
          <MenuItem disabled>Nenhuma consulta disponível</MenuItem>
        )}
      </TextField>
      
                
      <TextField
        fullWidth
        label="Prazo Inicial"
        variant="outlined"
        value={reservaData.prazo_inicial}
        onChange={(e) => setReservaData({ ...reservaData, prazo_inicial: e.target.value })}
        margin="normal"
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        required
      />
      
      <TextField
        fullWidth
        label="Prazo Final"
        variant="outlined"
        value={reservaData.prazo_final}
        onChange={(e) => setReservaData({ ...reservaData, prazo_final: e.target.value })}
        margin="normal"
        type="datetime-local"
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
        value={reservaData.margem_disponivel}
        onChange={(e) => setReservaData({ ...reservaData, margem_disponivel: e.target.value })}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
        required
      />
      
      <TextField
        fullWidth
        label="Margem Total"
        variant="outlined"
        value={reservaData.margem_total}
        onChange={(e) => setReservaData({ ...reservaData, margem_total: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Vencimento das Parcelas"
        variant="outlined"
        value={reservaData.vencimento_parcela}
        onChange={(e) => setReservaData({ ...reservaData, vencimento_parcela: e.target.value })}
        type="date"
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Folha"
        variant="outlined"
        value={reservaData.folha_desconto}
        onChange={(e) => setReservaData({ ...reservaData, folha_desconto: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Total Financiado"
        variant="outlined"
        value={reservaData.total_financiado}
        onChange={(e) => setReservaData({ ...reservaData, total_financiado: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Líquido Liberado"
        variant="outlined"
        value={reservaData.liquido_liberado}
        onChange={(e) => setReservaData({ ...reservaData, liquido_liberado: e.target.value })}
        margin="normal"
        required
      />
       <TextField
        fullWidth
        label="Liberação de Crédito"
        variant="outlined"
        value={reservaData.liberacao_credito}
        onChange={(e) => setReservaData({ ...reservaData, liberacao_credito: e.target.value })}
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
        value={reservaData.quantidade_parcelas}
        onChange={(e) => setReservaData({ ...reservaData, quantidade_parcelas: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Valor das Parcelas"
        variant="outlined"
        value={reservaData.valor_parcelas}
        onChange={(e) => setReservaData({ ...reservaData, valor_parcelas: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Juros Mensal"
        variant="outlined"
        value={reservaData.juros_mensal}
        onChange={(e) => setReservaData({ ...reservaData, juros_mensal: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Valor do IOF"
        variant="outlined"
        value={reservaData.valor_iof}
        onChange={(e) => setReservaData({ ...reservaData, valor_iof: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Dias de Carência"
        variant="outlined"
        value={reservaData.carencia_dias}
        onChange={(e) => setReservaData({ ...reservaData, carencia_dias: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Valor da Carência"
        variant="outlined"
        value={reservaData.valor_carencia}
        onChange={(e) => setReservaData({ ...reservaData, valor_carencia: e.target.value })}
        margin="normal"
        required
      />
       <TextField
        fullWidth
        label="Vinculo"
        variant="outlined"
        value={reservaData.vinculo}
        onChange={(e) => setReservaData({ ...reservaData, vinculo: e.target.value })}
        margin="normal"
        required
      />
 
      <Button onClick={handleNext} variant="contained" color="primary" style={{ marginTop: '16px' }}>Próximo</Button>
    </div>
         </Grid>
         

          )}
          {activeStep === 1 && (
             <Box
             sx={{
               width: '90%',
               maxWidth: '800px',
               margin: 'auto',
               padding: 3,
               boxShadow: 3,
               borderRadius: 2,
               backgroundColor: 'background.paper',
             }}
           >
             <Typography variant="h6" gutterBottom>
               Análise dos Dados
             </Typography>
             <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography>Matricula:</Typography>
        <Typography>CPF:</Typography>
        {/* <Typography>E-mail:</Typography> */}
        <Typography>Valor:</Typography>
        <Typography>Consulta:</Typography>
        <Typography>Prazo Inicial:</Typography>
        <Typography>Prazo Final:</Typography>
        <Typography>Contrato:</Typography>
        <Typography>Nome:</Typography>
        <Typography>Valor Disponível:</Typography>
        <Typography>Margem Total:</Typography>
        <Typography>Vencimento das Parcelas:</Typography>
        <Typography>Folha:</Typography>
        <Typography>Total Financiado:</Typography>
        <Typography>Valor Líquido Liberado:</Typography>
        <Typography>Liberação de Crédito:</Typography>
        <Typography>Observações:</Typography>
        <Typography>Custo Efetivo Total - CET:</Typography>
        <Typography>Quantidade de Parcelas:</Typography>
        <Typography>Valor das Parcelas:</Typography>
        <Typography>Juros Mensal:</Typography>
        <Typography>Valor do IOF:</Typography>
        <Typography>Dias de Carência:</Typography>
        <Typography>Valor da Carência:</Typography>
        <Typography>Vínculo:</Typography>
        <Typography>Margem Antes:</Typography>
        <Typography>Margem Após:</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>{reservaData.matricula}</Typography>
        <Typography>{reservaData.cpf}</Typography>
        {/* <Typography>{reservaData.email}</Typography> */}
        <Typography>{reservaData.valor}</Typography>
        <Typography>{reservaData.consulta}</Typography>
        <Typography>{reservaData.prazo_inicial}</Typography>
        <Typography>{reservaData.prazo_final}</Typography>
        <Typography>{reservaData.contrato}</Typography>
        <Typography>{reservaData.nome}</Typography>
        <Typography>{reservaData.margem_disponivel}</Typography>
        <Typography>{reservaData.margem_total}</Typography>
        <Typography>{reservaData.vencimento_parcela}</Typography>
        <Typography>{reservaData.folha_desconto}</Typography>
        <Typography>{reservaData.total_financiado}</Typography>
        <Typography>{reservaData.liquido_liberado}</Typography>
        <Typography>{reservaData.liberacao_credito}</Typography>
        <Typography>{reservaData.observacoes}</Typography>
        <Typography>{reservaData.cet}</Typography>
        <Typography>{reservaData.quantidade_parcelas}</Typography>
        <Typography>{reservaData.valor_parcelas}</Typography>
        <Typography>{reservaData.juros_mensal}</Typography>
        <Typography>{reservaData.valor_iof}</Typography>
        <Typography>{reservaData.carencia_dias}</Typography>
        <Typography>{reservaData.valor_carencia}</Typography>
        <Typography>{reservaData.vinculo}</Typography>
        <Typography>{reservaData.margem_antes}</Typography>
        <Typography>{margem_apos}</Typography> {/* Exibindo o valor calculado */}
      </Grid>
    </Grid>
             <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
               <Button onClick={handleBack} variant="contained" sx={{ marginRight: 1 }}>
                 Voltar
               </Button>
               <Button onClick={handleNext} variant="contained" color="primary" disabled={isSaving}>
                 {isSaving ? <CircularProgress size={24} /> : 'Confirmar'}
               </Button>
             </Box>
           </Box>
          )}
          {activeStep === 2 && (
            <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 3,
              maxWidth: '600px',
              margin: 'auto',
              boxShadow: 3, 
              borderRadius: 2,
              textAlign: 'center',
              bgcolor: 'background.paper',
            }}
          >
            <CheckCircleIcon color="success" fontSize="large" sx={{ mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Contrato gerado com sucesso!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Número do contrato: {reservaData.contrato}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Status: Enviado para Análise.
            </Typography>
            <Button
              onClick={handleReset}
              variant="contained"
              color="primary"
            >
              Finalizar
            </Button>
          </Box>
          )}
        </Box>
      </Box>

    </Box>


  );
};

export default ReservaPage;
