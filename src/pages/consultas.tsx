// src/app/consultas/page.tsx
import ConsultaMargemForm from '../components/ConsultaMargemForm';
import { Box, Typography } from '@mui/material';

const ConsultasPage = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Consulta de Margem de Crédito
      </Typography>
      <ConsultaMargemForm />
    </Box>
  );
};

export default ConsultasPage;
