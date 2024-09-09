// StepperComponent.tsx
import React from 'react';
import { Box, Button, Container, Grid, Paper, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';  // Ícone de correto
import { jsPDF } from "jspdf";  // Importa jsPDF para criação do PDF

interface StepperComponentProps {
  activeStep: number;
  steps: string[];
  handleNext: () => void;
  handleBack: () => void;
  handlePrintPDF: () => void;
  handleClose: () => void;
  formData: {
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
  };
}

const StepperComponent: React.FC<StepperComponentProps> = ({
  activeStep,
  steps,
  handleNext,
  handleBack,
  handlePrintPDF,
  handleClose,
  formData
}) => {
  return (
    <Container maxWidth="md" sx={{ backgroundColor: '#F2F2F2', borderRadius: 2, padding: 10 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh'
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 80,
              color: 'green',
              animation: 'bounce 15s infinite'
            }}
          />
          <Typography variant="h4" sx={{ color: 'darkgreen', mt: 2 }}>
            ADF 000000
          </Typography>
          <Typography variant="h6" sx={{ color: 'gray', mt: 1 }}>
            Autorização de Desconto em Folha
          </Typography>
          <Typography variant="body1" sx={{ color: 'red', mt: 2, textAlign: 'center' }}>
            ATENÇÃO - O PAGAMENTO deve ser informado até às 23h:59 do dia dd/mm/aaaa. Caso não seja informado até esta data o Contrato será automaticamente Cancelado!
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'green' }}
              onClick={handlePrintPDF}
            >
              IMPRIMIR PDF
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              ENCERRAR
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ marginTop: 2 }}>
            {activeStep === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Número do Contrato do Sistema do Banco"
                    variant="standard"
                    fullWidth
                    value={formData.numeroContrato}
                    onChange={(e) => setFormData({ ...formData, numeroContrato: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Vencimento 1ª parcela"
                    variant="standard"
                    fullWidth
                    value={formData.vencimentoParcela}
                    onChange={(e) => setFormData({ ...formData, vencimentoParcela: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Folha 1º Desconto"
                    variant="standard"
                    fullWidth
                    value={formData.folhaDesconto}
                    onChange={(e) => setFormData({ ...formData, folhaDesconto: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Valor Total Financiado"
                    variant="standard"
                    fullWidth
                    value={formData.totalFinanciado}
                    onChange={(e) => setFormData({ ...formData, totalFinanciado: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Valor Líquido Liberado"
                    variant="standard"
                    fullWidth
                    value={formData.liquidoLiberado}
                    onChange={(e) => setFormData({ ...formData, liquidoLiberado: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Data de Liberação do Crédito"
                    variant="standard"
                    fullWidth
                    value={formData.liberacaoCredito}
                    onChange={(e) => setFormData({ ...formData, liberacaoCredito: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="CET"
                    variant="standard"
                    fullWidth
                    value={formData.cet}
                    onChange={(e) => setFormData({ ...formData, cet: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Observações"
                    variant="standard"
                    fullWidth
                    multiline
                    rows={3}
                    value={formData.observacoes}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  />
                </Grid>
              </Grid>
            )}
            {activeStep === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                    <Typography variant="subtitle1">Dados do Colaborador</Typography>
                    <Typography>Nome: {formData.nome}</Typography>
                    <Typography>Matrícula: {formData.matricula}</Typography>
                    <Typography>CPF: {formData.cpf}</Typography>
                    <Typography>Vínculo: {formData.vinculo}</Typography>
                    <Typography>Situação: {formData.situacao}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                    <Typography variant="subtitle1">Dados do Contrato</Typography>
                    <Typography>Valor líquido liberado: {formData.liquidoLiberado}</Typography>
                    <Typography>Folha 1º Desconto: {formData.folhaDesconto}</Typography>
                    <Typography>Quantidade de parcelas: {formData.quantidadeParcelas}</Typography>
                    <Typography>Valor da(s) parcela(s): {formData.valorParcelas}</Typography>
                    <Typography>Data 1ª parcela: {formData.vencimentoParcela}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="subtitle1">Margem antes de Finalizar</Typography>
                    <Typography variant="h6">{formData.margemAntes}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="subtitle1">Margem após Finalizar</Typography>
                    <Typography variant="h6">{formData.margemApos}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-between' }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Anterior
            </Button>
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Confirmar'}
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default StepperComponent;
