'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { cyan, yellow } from '@mui/material/colors';

export * from './Dark';
export * from './Light'; // Corrigido o nome da exportação

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

// Light theme
export const LightTheme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7f6f3', // Cinza claro no fundo
      paper: '#ffffff', // Destaque no card
    },
  },
});

export default theme;
