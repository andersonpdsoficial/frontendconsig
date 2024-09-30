'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CookiesBanner from '../shared/components/cookiesBanner/CookiesBanner';
import NovoEmprestimo from './margemContratacao/emprestimoAverbacoes/page';
import { createTheme, ThemeProvider } from '@mui/material';

// Crie uma instância do QueryClient
const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    mode: 'light', // ou 'dark'
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <CookiesBanner />
        {/* Renderiza o NovoEmprestimo apenas em uma condição, se necessário */}
        <NovoEmprestimo />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
