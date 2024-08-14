
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<any>(null);

  useEffect(() => {
    // Definir o tema aqui para garantir que seja criado no cliente
    const createTheme = require('@mui/material/styles').createTheme;
    setTheme(createTheme({
      palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
      },
    }));
  }, []);

  if (!theme) return null; // Retorna nada enquanto o tema está sendo criado

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
