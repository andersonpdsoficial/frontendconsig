'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';

const cookieName = 'cookiesAccepted';

export default function CookiesBanner() {
  // Verifica se o cookie existe ao inicializar o componente
  const [bannerOpen, setBannerOpen] = React.useState(() => !Cookies.get(cookieName));

  // Fecha o banner e armazena a preferência no cookie
  const handleAccept = () => {
    console.log('Aceitou cookies'); // Log de depuração
    Cookies.set(cookieName, 'accepted', { expires: 365 });  // Define cookie para expirar em 365 dias
    setBannerOpen(false);
  };

  const handleReject = () => {
    console.log('Rejeitou cookies'); // Log de depuração
    Cookies.set(cookieName, 'rejected', { expires: 365 });  // Define cookie para expirar em 365 dias
    setBannerOpen(false);
  };

  // Use Effect para garantir que o banner abra apenas se o cookie não estiver presente
  React.useEffect(() => {
    console.log('Verificação de cookie'); // Log de depuração
    setBannerOpen(!Cookies.get(cookieName));
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <TrapFocus open disableAutoFocus disableEnforceFocus>
        <Fade appear={false} in={bannerOpen}>
          <Paper
            role="dialog"
            aria-modal="false"
            aria-label="Cookie banner"
            square
            variant="outlined"
            tabIndex={-1}
            sx={{
              position: 'fixed',
              bottom: 16,
              left: 16,
              right: 16,
              m: 0,
              p: 3,
              borderRadius: 2,
              borderWidth: 0,
              borderTopWidth: 1,
              bgcolor: 'background.paper',
              color: '#0D7B52',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              gap={2}
            >
              <Box
                sx={{
                  flexShrink: 1,
                  alignSelf: { xs: 'flex-start', sm: 'center' },
                }}
              >
                <Typography fontWeight="bold">Este site usa cookies</Typography>
                <Typography variant="body2">
                  Este é um exemplo de cookies que pode ser utilizado na aplicação.
                </Typography>
              </Box>
              <Stack
                gap={2}
                direction={{ xs: 'row-reverse', sm: 'row' }}
                sx={{
                  flexShrink: 0,
                  alignSelf: { xs: 'flex-end', sm: 'center' },
                }}
              >
                <Button
                  size="small"
                  onClick={handleAccept}
                  variant="contained"
                  sx={{
                    bgcolor: '#0D7B52',
                    '&:hover': {
                      bgcolor: '#0a6b42',
                    },
                    transition: 'background-color 0.3s ease',
                    borderRadius: 2,
                  }}
                >
                  PERMITIR TODOS
                </Button>
                <Button
                  size="small"
                  onClick={handleReject}
                  variant="outlined"
                  sx={{
                    color: '#0D7B52',
                    borderColor: '#0D7B52',
                    '&:hover': {
                      borderColor: '#0a6b42',
                      backgroundColor: 'rgba(13, 123, 82, 0.1)',
                    },
                    transition: 'all 0.3s ease',
                    borderRadius: 2,
                  }}
                >
                  REJEITAR TODOS
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Fade>
      </TrapFocus>
    </React.Fragment>
  );
}
