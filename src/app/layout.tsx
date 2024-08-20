

import { CssBaseline } from "@mui/material";
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../shared/themes/theme";


export const metadata = {
  title: 'Sistema Consignado',
  description: 'Sistema de Consignado Defensoria Publica de Rondônia',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <div vw="true" className="enabled">
          <div vw-access-button="true" className="active" />
          <div vw-plugin-wrapper="true">
            <div className="vw-plugin-top-wrapper" />
          </div>
        </div>
        {/* Injetando o script inline após o carregamento do script externo */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              new window.VLibras.Widget('https://vlibras.gov.br/app');
            `,
          }}
        />
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
