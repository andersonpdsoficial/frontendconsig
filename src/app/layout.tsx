
import * as React from 'react';
import { StyledEngineProvider } from '@mui/material';


export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        
        
        
          <StyledEngineProvider>
          {props.children}
          </StyledEngineProvider>
       
        
      </body>
    </html>
  );
}
