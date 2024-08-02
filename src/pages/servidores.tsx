// src/app/servidores/page.tsx
import ServidorForm from '../components/ServidorForm';
import { Box, Typography } from '@mui/material';

const ServidoresPage = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Servidores
      </Typography>
      <ServidorForm />
    </Box>
  );
};

export default ServidoresPage;
