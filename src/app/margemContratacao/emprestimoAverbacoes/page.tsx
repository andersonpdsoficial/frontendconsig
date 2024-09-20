'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Grid,
  Button,
  TextField,
  MenuItem,
  Typography,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Box,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useReserva } from '../../../shared/hooks/useReserva';
import { fetchConsultas } from '../../../shared/services/apiService';
import CustomizedList from '../../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../../shared/components/cookiesBanner/CookiesBanner';

// Define o esquema de validação com zod
const schema = z.object({
  matricula: z.string().min(1, 'Matrícula é obrigatória'),
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

const ReservaPage = () => {
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const { mutate: createReserva, isLoading: isSaving } = useReserva();

  const { data: consultas, isLoading: isLoadingConsultas, isError: isErrorConsultas } = useQuery({
    queryKey: ['consultas'],
    queryFn: fetchConsultas,
  });

  // Preenche automaticamente com a última consulta realizada, se existir
  useEffect(() => {
    if (consultas && consultas.length > 0) {
      const lastConsulta = consultas[consultas.length - 1];
      setValue('consulta', lastConsulta.id); // Certifique-se de que lastConsulta.id é um número
    }
  }, [consultas, setValue]);


  const onSubmit = (data) => {
    if (activeStep === 1) {
      createReserva(data, {
        onSuccess: () => {
          setActiveStep((prev) => prev + 1);
        },
      });
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
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
                {/* Outros campos */}
                <Controller
                  name="matricula"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Matrícula" fullWidth required error={Boolean(errors.matricula)} helperText={errors.matricula?.message} />
                  )}
                />

                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="CPF" fullWidth required error={Boolean(errors.cpf)} helperText={errors.cpf?.message} />
                  )}
                />

                <Controller
                  name="valor"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Valor" fullWidth required error={Boolean(errors.valor)} helperText={errors.valor?.message} />
                  )}
                />

                <Controller
                  name="consulta"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Consulta" fullWidth required error={Boolean(errors.consulta)} helperText={errors.consulta?.message}>
                      {isLoadingConsultas ? (
                        <MenuItem disabled>
                          <CircularProgress size={24} />
                        </MenuItem>
                      ) : isErrorConsultas ? (
                        <MenuItem disabled>
                          <Typography color="error">Erro ao carregar consultas</Typography>
                        </MenuItem>
                      ) : (
                        consultas.map((consulta) => (
                          <MenuItem key={consulta.id} value={consulta.id}>
                            {consulta.id}
                          </MenuItem>
                        ))
                      )}
                    </TextField>
                  )}
                />

                {/* Campos adicionais */}
                <Controller
                  name="prazo_inicial"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Prazo Inicial" type="datetime-local" fullWidth required error={Boolean(errors.prazo_inicial)} helperText={errors.prazo_inicial?.message} InputLabelProps={{ shrink: true }} />
                  )}
                />

                <Controller
                  name="prazo_final"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Prazo Final" type="datetime-local" fullWidth required error={Boolean(errors.prazo_final)} helperText={errors.prazo_final?.message} InputLabelProps={{ shrink: true }} />
                  )}
                />

                <Controller
                  name="situacao"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Situação" fullWidth required error={Boolean(errors.situacao)} helperText={errors.situacao?.message} />
                  )}
                />

                <Controller
                  name="contrato"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Contrato" fullWidth required error={Boolean(errors.contrato)} helperText={errors.contrato?.message} />
                  )}
                />

                <Controller
                  name="vencimento_parcela"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Vencimento das Parcelas" type="date" fullWidth required error={Boolean(errors.vencimento_parcela)} helperText={errors.vencimento_parcela?.message} InputLabelProps={{ shrink: true }} />
                  )}
                />

                <Controller
                  name="folha_desconto"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Folha de Desconto" fullWidth required error={Boolean(errors.folha_desconto)} helperText={errors.folha_desconto?.message} />
                  )}
                />

                <Controller
                  name="total_financiado"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Total Financiado" fullWidth required error={Boolean(errors.total_financiado)} helperText={errors.total_financiado?.message} />
                  )}
                />

                <Controller
                  name="liquido_liberado"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Líquido Liberado" fullWidth required error={Boolean(errors.liquido_liberado)} helperText={errors.liquido_liberado?.message} />
                  )}
                />

                <Controller
                  name="liberacao_credito"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Liberação de Crédito" fullWidth required error={Boolean(errors.liberacao_credito)} helperText={errors.liberacao_credito?.message} />
                  )}
                />

                <Controller
                  name="cet"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="CET" fullWidth required error={Boolean(errors.cet)} helperText={errors.cet?.message} />
                  )}
                />

                <Controller
                  name="observacoes"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Observações" fullWidth required error={Boolean(errors.observacoes)} helperText={errors.observacoes?.message} />
                  )}
                />

                <Controller
                  name="quantidade_parcelas"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Quantidade de Parcelas" fullWidth required error={Boolean(errors.quantidade_parcelas)} helperText={errors.quantidade_parcelas?.message} />
                  )}
                />

                <Controller
                  name="valor_parcelas"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Valor das Parcelas" fullWidth required error={Boolean(errors.valor_parcelas)} helperText={errors.valor_parcelas?.message} />
                  )}
                />

                <Controller
                  name="juros_mensal"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Juros Mensal" fullWidth required error={Boolean(errors.juros_mensal)} helperText={errors.juros_mensal?.message} />
                  )}
                />

                <Controller
                  name="valor_iof"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Valor do IOF" fullWidth required error={Boolean(errors.valor_iof)} helperText={errors.valor_iof?.message} />
                  )}
                />

                <Controller
                  name="carencia_dias"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Dias de Carência" fullWidth required error={Boolean(errors.carencia_dias)} helperText={errors.carencia_dias?.message} />
                  )}
                />

                <Controller
                  name="valor_carencia"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Valor da Carência" fullWidth required error={Boolean(errors.valor_carencia)} helperText={errors.valor_carencia?.message} />
                  )}
                />

                <Controller
                  name="vinculo"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Vínculo" fullWidth required error={Boolean(errors.vinculo)} helperText={errors.vinculo?.message} />
                  )}
                />

                <Button onClick={handleNext} variant="contained" color="primary" style={{ marginTop: '16px' }}>Próximo</Button>
              </div>
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <Controller
              name="consulta"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Consulta"
                  fullWidth
                  required
                  error={Boolean(errors.consulta)}
                  helperText={errors.consulta?.message}
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
                    consultas.map((consulta) => (
                      <MenuItem key={consulta.id} value={consulta.id}>
                        {consulta.id}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              )}
            />

          </Grid>
          {/* Adicione outros campos aqui, conforme necessário */}
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Próximo
          </Button>
        </Grid>
      </form>
          )}
      {activeStep === 1 && (
        <Box>
          <Typography variant="h6">Análise dos Dados</Typography>
          <Button variant="contained" color="primary" onClick={handleBack} style={{ marginTop: '16px' }}>
            Voltar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)} style={{ marginTop: '16px' }}>
            Confirmar
          </Button>
        </Box>
      )}
      {activeStep === 2 && (
        <Typography variant="h6">Contrato gerado com sucesso!</Typography>
      )}
    </Box>
      </Box >
    </Box >
  );
};

export default ReservaPage;
