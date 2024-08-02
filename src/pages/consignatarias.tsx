// src/app/consignatarias/page.tsx
import ConsignatariaForm from '../components/ConsignatariaForm';
import { Box, Typography } from '@mui/material';

const ConsignatariasPage = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Consignatárias
      </Typography>
      <ConsignatariaForm />
    </Box>
  );
};

export default ConsignatariasPage;
