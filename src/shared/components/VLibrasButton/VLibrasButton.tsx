'use client';

import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Componente VLibrasButton
const VLibrasButton: React.FC = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Cria e adiciona o script do VLibras
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      } else {
        console.error('VLibras não está disponível no objeto window.');
      }
    };
    document.body.appendChild(script);

    // Adiciona o HTML necessário para o VLibras
    const vlibrasContainer = document.createElement('div');
    vlibrasContainer.setAttribute('vw', 'class="enabled"');
    vlibrasContainer.innerHTML = `
      <div vw-access-button class="active"></div>
      <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
      </div>
    `;
    document.body.appendChild(vlibrasContainer);

    // Função de limpeza
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(vlibrasContainer);
    };
  }, []);

  const toggleVLibras = () => {
    const vlibrasContainer = document.querySelector('[vw]');
    if (vlibrasContainer) {
      const currentDisplay = getComputedStyle(vlibrasContainer).display;
      vlibrasContainer.setAttribute('style', currentDisplay === 'none' ? 'display:block' : 'display:none');
      setIsVisible(!isVisible);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={toggleVLibras}
        style={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        }}
      >
        <img src="https://vlibras.gov.br/app/images/logo-vlibras.png" alt="VLibras" style={{ width: '40px', height: '40px' }} />
      </IconButton>
    </div>
  );
};

export default VLibrasButton;
