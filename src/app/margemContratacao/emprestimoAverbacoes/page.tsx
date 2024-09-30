'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Grid, Button, TextField, Typography, Stepper, Step, StepLabel, Box,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useReserva } from '../../../shared/hooks/useReserva';
import { fetchConsultas } from '../../../shared/services/apiService';
import CustomizedList from '../../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../../shared/components/cookiesBanner/CookiesBanner';
import { create } from 'zustand';
import { PlaylistAddCheckCircle } from '@mui/icons-material';

// Define the validation schema with zod
const schema = z.object({
  matricula: z.string().min(1, 'Matrícula é obrigatória'),
  nome: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().min(1, 'CPF é obrigatório'),
  valor: z.string().min(1, 'Valor é obrigatório'),
  consulta: z.string().min(1, 'Consulta é obrigatória'),
  prazo_inicial: z.string().min(1, 'Prazo Inicial é obrigatório'),
  prazo_final: z.string().min(1, 'Prazo Final é obrigatório'),
  situacao: z.string().min(1, 'Situação é obrigatória'),
  contrato: z.string().min(1, 'Contrato é obrigatório'),
  vencimento_parcela: z.string().min(1, 'Vencimento das Parcelas é obrigatório'),
  folha_desconto: z.string().min(1, 'Folha é obrigatória'),
  total_financiado: z.string().min(1, 'Total Financiado é obrigatório'),
  liquido_liberado: z.string().min(1, 'Líquido Liberado é obrigatório'),
  liberacao_credito: z.string().min(1, 'Liberação de Crédito é obrigatória'),
  cet: z.string().min(1, 'CET é obrigatório'),
  observacoes: z.string().optional(),
  quantidade_parcelas: z.string().min(1, 'Quantidade de Parcelas é obrigatória'),
  valor_parcelas: z.string().min(1, 'Valor das Parcelas é obrigatório'),
  juros_mensal: z.string().min(1, 'Juros Mensal é obrigatório'),
  valor_iof: z.string().min(1, 'Valor do IOF é obrigatório'),
  carencia_dias: z.string().min(1, 'Dias de Carência são obrigatórios'),
  valor_carencia: z.string().min(1, 'Valor da Carência é obrigatório'),
  vinculo: z.string().min(1, 'Vínculo é obrigatório'),
});

const steps = ['Preenchimento dos Dados', 'Análise dos Dados', 'Geração do Contrato'];

// Defina a interface do estado
interface Store {
  cpf: string;
  matricula: string | null;
  nome: string;
  vinculo: string;
  margemDisponivel: number | null;
}

const useStore = create<Store>((set) => ({
  cpf: '',
  nome: '',
  matricula: null,
  vinculo: '',
  margemDisponivel: null,
  salvarDados: (dados) => set((state) => ({ ...state, ...dados })),
}));

const ReservaPage = () => {
  const { cpf, matricula, nome, vinculo, margemDisponivel } = useStore();

  const { control, handleSubmit, setValue, formState: { errors }, reset, getValues } = useForm({
    resolver: zodResolver(schema),
  });

  const [activeStep, setActiveStep] = useState(0);
  const { mutate: createReserva } = useReserva();
  const { data: consultas, isLoading: isLoadingConsultas, isError: isErrorConsultas } = useQuery({
    queryKey: ['consultas'],
    queryFn: fetchConsultas,
  });

  useEffect(() => {
    if (consultas && consultas.length > 0) {
      const lastConsulta = consultas[consultas.length - 1];
      setValue('consulta', String(lastConsulta.id)); // Converta para string
    }
  }, [consultas, setValue]);

  // Preencher automaticamente os campos do formulário com os dados da store
  useEffect(() => {
    setValue('cpf', String(cpf));
    setValue('matricula', String(matricula)); // Converter para string se necessário
    setValue('nome', String(nome));
    setValue('vinculo', String(vinculo));
    setValue('valor', String(margemDisponivel)); // Converter para string se necessário
  }, [cpf, matricula, nome, vinculo, margemDisponivel, setValue]);

  const onSubmit = (data) => {
    if (activeStep === 1) {
      createReserva(data, {
        onSuccess: () => setActiveStep((prev) => prev + 1),
        onError: (error) => {
          console.error('Erro ao criar reserva:', error);
        },
      });
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    reset();
    setActiveStep(0);
  };

  return (

    <Box sx={{ display: 'flex', backgroundColor: '#F2F2F2', minHeight: '100vh' }}>
      <CustomizedList />
      <FloatingSearchButton />
      <CookiesBanner />
      <Box sx={{ flexGrow: 2, backgroundColor: '#F2F2F2', padding: 10 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Nova Reserva de Empréstimo
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ padding: 2 }}>
          {activeStep === 0 && (
            <Box
              sx={{
                bgcolor: '#ffff',
                borderRadius: 2,
                boxShadow: 3,
                p: 3,
                mt: 2,
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  {[
                    { name: 'matricula', label: 'Matrícula' },
                    { name: 'cpf', label: 'CPF' },
                    { name: 'nome', label: 'Nome' },
                    { name: 'valor', label: 'Valor' },
                    { name: 'prazo_inicial', label: 'Prazo Inicial', type: 'datetime-local' },
                    { name: 'prazo_final', label: 'Prazo Final', type: 'datetime-local' },
                    { name: 'situacao', label: 'Situação' },
                    { name: 'contrato', label: 'Contrato' },
                    { name: 'vencimento_parcela', label: 'Vencimento das Parcelas', type: 'date' },
                    { name: 'folha_desconto', label: 'Folha de Desconto' },
                    { name: 'total_financiado', label: 'Total Financiado' },
                    { name: 'liquido_liberado', label: 'Líquido Liberado' },
                    { name: 'liberacao_credito', label: 'Liberação de Crédito' },
                    { name: 'cet', label: 'CET' },
                    { name: 'observacoes', label: 'Observações' },
                    { name: 'quantidade_parcelas', label: 'Quantidade de Parcelas' },
                    { name: 'valor_parcelas', label: 'Valor das Parcelas' },
                    { name: 'juros_mensal', label: 'Juros Mensal' },
                    { name: 'valor_iof', label: 'Valor do IOF' },
                    { name: 'carencia_dias', label: 'Dias de Carência' },
                    { name: 'valor_carencia', label: 'Valor da Carência' },
                    { name: 'vinculo', label: 'Vínculo' },
                  ].map(({ name, label, type }) => (
                    <Grid item xs={12} sm={6} key={name}>
                      <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={label}
                            type={type || 'text'}
                            fullWidth
                            required
                            error={Boolean(errors[name])}
                            helperText={errors[name]?.message}
                            InputLabelProps={type === 'datetime-local' || type === 'date' ? { shrink: true } : {}}
                            variant="outlined"
                            sx={{ bgcolor: 'white', borderRadius: 1 }}
                          />
                        )}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="consulta"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Consulta"
                          fullWidth
                          required
                          error={Boolean(errors.consulta)}
                          helperText={errors.consulta?.message}
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                          sx={{ bgcolor: 'white', borderRadius: 1 }}
                          InputLabelProps={{
                            shrink: true, // Faz o rótulo ficar acima do campo
                          }}
                        />
                      )}
                    />
                  </Grid>



                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
                      Próximo
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
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
                backgroundColor: 'success.main',
                color: 'white',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Análise dos Dados
              </Typography>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                {[
                  { name: 'matricula', label: 'Matrícula' },
                  { name: 'cpf', label: 'CPF' },
                  { name: 'nome', label: 'Nome' },
                  { name: 'valor', label: 'Valor' },
                  { name: 'prazo_inicial', label: 'Prazo Inicial' },
                  { name: 'prazo_final', label: 'Prazo Final' },
                  { name: 'situacao', label: 'Situação' },
                  { name: 'contrato', label: 'Contrato' },
                  { name: 'vencimento_parcela', label: 'Vencimento das Parcelas' },
                  { name: 'folha_desconto', label: 'Folha de Desconto' },
                  { name: 'total_financiado', label: 'Total Financiado' },
                  { name: 'liquido_liberado', label: 'Líquido Liberado' },
                  { name: 'liberacao_credito', label: 'Liberação de Crédito' },
                  { name: 'cet', label: 'CET' },
                  { name: 'observacoes', label: 'Observações' },
                  { name: 'quantidade_parcelas', label: 'Quantidade de Parcelas' },
                  { name: 'valor_parcelas', label: 'Valor das Parcelas' },
                  { name: 'juros_mensal', label: 'Juros Mensal' },
                  { name: 'valor_iof', label: 'Valor do IOF' },
                  { name: 'carencia_dias', label: 'Dias de Carência' },
                  { name: 'valor_carencia', label: 'Valor da Carência' },
                  { name: 'vinculo', label: 'Vínculo' },
                ].map(({ name, label }) => (
                  <Grid item xs={12} sm={6} key={name}>
                    <Typography variant="body1">{label}:</Typography>
                    <Typography variant="body2">{getValues(name)}</Typography>
                  </Grid>
                ))}
              </Grid>
              <Button variant="contained" color="secondary" onClick={handleBack} sx={{ mt: 2 }}>
                Voltar
              </Button>
              <Button variant="contained" color="lightgreen" onClick={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                Confirmar
              </Button>
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
                bgcolor: 'success.main',
                color: 'white',
              }}
            >
              <PlaylistAddCheckCircle color="inherit" fontSize="large" sx={{ mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Contrato gerado com sucesso!
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Número do contrato: {getValues('contrato')}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Status: Enviado para Análise.
              </Typography>
              <Button
                onClick={handleReset}
                variant="contained"
                color="lightgreen"
                sx={{ mt: 2 }}
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

