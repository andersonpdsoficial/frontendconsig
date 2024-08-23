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
import PrivacyPolicy from '../privacyPolicy/page';

export default function CookiesBanner() {
  const [bannerOpen, setBannerOpen] = React.useState(true);

  const closeBanner = () => {
    setBannerOpen(false);
  };

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
              bottom: 0,
              left: 0,
              right: 0,
              m: 0,
              p: 2,
              borderWidth: 0,
              borderTopWidth: 1,
              borderColor: '#0D7B52',
              color: '#0D7B52',
              backgroundColor: '#F0F8F8', // Adjust background color if needed
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
                <Typography fontWeight="bold">Este site utiliza cookies</Typography>
                <Typography variant="body2">
                  
                  Utilizamos cookies para melhorar sua experiência e personalizar o conteúdo. Ao continuar a navegação, você concorda com nossa <a href='/privacyPolicy' style={{ color: '#1aa2cc' }}>Política de Privacidade</a>.
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
                <Button size="small" onClick={closeBanner} variant="contained" sx={{ backgroundColor: '#0D7B52', color: '#FFF' }}>
                  PERMITIR TODOS
                </Button>
                <Button size="small" onClick={closeBanner}>
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
