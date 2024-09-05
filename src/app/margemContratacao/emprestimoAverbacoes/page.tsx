'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Paper, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';  // Ícone de correto
import { jsPDF } from "jspdf";  // Importa jsPDF para criação do PDF

dayjs.locale('pt-br');
const LOCAL_API_BASE_URL = 'http://localhost:8000/api';

const NovoEmprestimo: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Informações do Contrato', 'Confirmação', 'Finalização'];

  
  const [formData, setFormData] = useState({
    matricula: '',
    cpf: '',
    nome: '',
    margemDisponivel : 'R$ ',
    margemTotal: 'R$ ',
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
    margemAntes: 'R$ 00,00',
    margemApos: 'R$ 00,00'
  });

  useEffect(() => {
    // Simulando uma chamada de API para preencher os dados
    const fetchData = async () => {
      // Trazer dados da api
      const data = {
        matricula: ' ',
        cpf: ' ',
        nome: ' ',
        margemDisponivel: 'R$  ',
        margemTotal: 'R$  ',
        numeroContrato: ' ',
        vencimentoParcela: ' ',
        folhaDesconto: 'mes/ano',
        totalFinanciado: 'R$  ',
        liquidoLiberado: 'R$  ',
        liberacaoCredito: ' ',
        cet: ' %',
        observacoes: 'Digite aqui as observações',
        quantidadeParcelas: ' ',
        valorParcelas: ' ',
        jurosMensal: ' ',
        valorIof: 'R$  ',
        carenciaDias: ' ',
        valorCarencia: 'R$  ',
        vinculo: ' ',
        situacao: ' ',
        margemAntes: 'R$ 00,00',
        margemApos: 'R$ 00,00'
      };

      setFormData(data);
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.text("Dados do Colaborador", 10, 10);
    doc.text("Nome:",10, 10);
    doc.text("Matrícula:",10, 10);
    doc.text("CPF:",10, 10);
    doc.text("Vínculo:",10, 10)
    doc.text("Situação:",10, 10)
    doc.text("Dados do Contrato", 10, 10);
    doc.text("Valor líquido liberado::",10, 10)
    doc.text("Folha 1º Desconto::",10, 10)
    doc.text("Quantidade de parcelas::",10, 10)
    doc.text("Valor da(s) parcela(s):",10, 10)
    doc.text("Data 1ª parcela::",10, 10)

    doc.save('documento.pdf');
    
  };

  const handleClose = () => {
    setActiveStep(steps.length);  // Finaliza o Stepper
  };

  return (
    <Box sx={{ display: 'flex'  ,backgroundColor: '#F2F2F2'}}>
    <CustomizedList />
    <FloatingSearchButton />
    <CookiesBanner />

    <Box sx={{ flexGrow: 2,   backgroundColor: '#F2F2F2'}}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem' , padding: 3 }}>
          Nova Reserva de Empréstimo
        </Typography>

       
{/*inicio do papre */}
        <Paper elevation={3} sx={{ padding: 10, borderRadius: 2, marginBottom: 2 }}>
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
          {/*i fim do papre */}

          
        {/* Seção para Margem Disponível e Margem Total */}
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
      </Box>
      {/* Inicio do Stepper */}
      <Container maxWidth="md" sx={{  backgroundColor: '#F2F2F2', borderRadius: 2, padding: 10 }}>
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
    

</Box>
  );
};

export default NovoEmprestimo;
