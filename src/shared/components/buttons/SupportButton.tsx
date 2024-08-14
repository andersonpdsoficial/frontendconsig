// src/shared/components/buttons/SupportButton.tsx
'use client';

import React from 'react';
import { IconButton } from '@mui/material';
import SupportIcon from '@mui/icons-material/Support'; // Supondo que você use o ícone de suporte do Material UI

const SupportButton: React.FC = () => {
  const handleChatRedirect = () => {
    window.open('https://wa.me/5511999999999', '_blank'); // Substitua pelo número do WhatsApp
  };

  return (
    <IconButton
      sx={{
        position: 'fixed',
        bottom: 80, // Ajustado para ficar um pouco acima do chat
        right: 20,
        backgroundColor: 'rgb(44, 95, 37)',
        color: 'white',
        borderRadius: '50%',
        '&:hover': {
          backgroundColor: 'rgb(36, 85, 31)',
        },
        zIndex: 10,
      }}
      onClick={handleChatRedirect}
    >
      <SupportIcon />
    </IconButton>
  );
};

export default SupportButton;
