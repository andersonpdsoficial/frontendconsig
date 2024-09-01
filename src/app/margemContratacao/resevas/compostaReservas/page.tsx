'use client'

import { Box, Button, TextField, Typography, Grid, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import CustomizedList from '../../../../shared/components/menu-lateral/Demo';
import FloatingSearchButton from '../../../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../../../shared/components/cookiesBanner/CookiesBanner';


const ContractForm = () => {
    const [contractNumber, setContractNumber] = useState('');
    const [firstPaymentDue, setFirstPaymentDue] = useState('');
    const [discountDate, setDiscountDate] = useState('');
    const [totalFinancedValue, setTotalFinancedValue] = useState('');
    const [liquidReleasedValue, setLiquidReleasedValue] = useState('');
    const [creditReleaseDate, setCreditReleaseDate] = useState('');
    const [installmentQuantity, setInstallmentQuantity] = useState('');
    const [monthlyInterest, setMonthlyInterest] = useState('');
    const [cet, setCet] = useState('');
    const [iofValue, setIofValue] = useState('');
    const [graceDays, setGraceDays] = useState('');
    const [carenciaValue, setCarenciaValue] = useState('');
    const [observations, setObservations] = useState('');
    const rows =[
        createData(300132117, 5409790235, '300132117')
    ]
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica para manipular o envio do formulário
    };
{/*Const do sneeper */}
const steps = ['Informações do contrato', 'Confirmação', 'Finalização'];
const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted()
      ? steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

    function createData(
        Matricula: number,
        cpf: number,
        name: string,

    ) {
        return { name, Matricula, cpf };
    }

    

    return (
        <Box sx={{ display: 'flex' }}>
            <CustomizedList />
            <FloatingSearchButton />
            <CookiesBanner />
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid item xs={12} sx={{ mt: 1 }}>
                    <Typography variant="h6">Nova Reserva de Emprestimo</Typography>
                </Grid>
     
            <Box sx={{ width: '100%' }}>
    <Stepper nonLinear activeStep={activeStep}>
      {steps.map((label, index) => (
        <Step key={label} completed={completed[index]}>
          <StepButton color="inherit" onClick={handleStep(index)}>
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
    <div>
      {allStepsCompleted() ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Todos os passos completos - você está finalizado
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Cancelar</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
            Passo atual: {activeStep + 1}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Próximo
            </Button>
            {activeStep !== steps.length - 1 && (
              completed[activeStep] ? (
                <Typography
                  variant="caption"
                  sx={{ display: 'inline-block' }}
                >
                  Passo {activeStep + 1} já completado
                </Typography>
              ) : (
                <Button onClick={handleComplete}>
                  {completedSteps() === totalSteps() - 1
                    ? 'Finalizar'
                    : 'Completar Passo'}
                </Button>
              )
            )}
          </Box>
        </React.Fragment>
      )}
    </div>
    </Box></Box>
    </Box>
    );
};


export default ContractForm;
