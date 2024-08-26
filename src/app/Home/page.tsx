
'use client';

import React from 'react';
import { Box, Button, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomizedList from '../../shared/components/menu-lateral/Demo';
import { Dashboard } from '@mui/icons-material';
import FloatingSearchButton from '../../shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '../../shared/components/cookiesBanner/CookiesBanner';






const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Box>
        <CookiesBanner /> 
          <CustomizedList />
          <Dashboard />
          
          <FloatingSearchButton />
           
           
        </Box>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}
