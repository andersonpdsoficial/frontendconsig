
'use client';

import React from 'react';
import { Box, Button, StyledEngineProvider, Typography } from '@mui/material';


import FloatingSearchButton from '@/shared/components/buttons/FloatingSearchButton';
import CookiesBanner from '@/shared/components/cookiesBanner/CookiesBanner';
import CustomizedList from '@/shared/components/menu-lateral/Demo';


export default function visaoGeral() {
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F2F2F2', }}>
    <CustomizedList />
    <FloatingSearchButton />
    <CookiesBanner />

    <Box sx={{ flexGrow: 1, padding: '20px', backgroundColor: '#F2F2F2' }}>
      <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
        importações
      </Typography>

      </Box>
      </Box>
  );
}
