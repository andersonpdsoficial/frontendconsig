'use client'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CookiesBanner from '../shared/components/cookiesBanner/CookiesBanner';

// Crie uma instância do QueryClient
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <CookiesBanner />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
