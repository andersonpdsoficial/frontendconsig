'use client';


import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { metadata } from './metadata'; 
import theme from "../shared/themes/theme";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Outras tags meta podem ser adicionadas aqui */}
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
