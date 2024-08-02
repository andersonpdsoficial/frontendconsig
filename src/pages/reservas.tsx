// src/app/reservas/page.tsx
import ReservaForm from '../components/ReservaForm';
import { Box, Typography } from '@mui/material';

const ReservasPage = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reservas de Crédito
      </Typography>
      <ReservaForm />
    </Box>
  );
};

export default ReservasPage;
