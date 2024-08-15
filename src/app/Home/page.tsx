'use client';

import React from 'react';
import { Box, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomizedList from '../../shared/components/menu-lateral/Demo';
import { Dashboard } from '@mui/icons-material';
import FloatingSearchButton from '../../shared/components/buttons/FloatingSearchButton';


// Definição do tema Material-UI
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

// Função principal da página Home
export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Box>
          {/* Lista personalizada */}
          <CustomizedList />
          
          {/* Ícone do Dashboard */}
          <Dashboard />
          
          {/* Botão de pesquisa flutuante */}
          <FloatingSearchButton />
          
         
        </Box>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}
