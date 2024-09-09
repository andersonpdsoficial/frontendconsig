'use client';

import React, { useState } from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ExpandLess,
  ExpandMore,
  Home,
  PriceChange as PriceChangeIcon,
  CreateNewFolder as CreateNewFolderIcon,
  QueryStats as QueryStatsIcon,
  RuleFolder as RuleFolderIcon,
  Task as TaskIcon,
  CreditCard as CreditCardIcon,
  FindInPage as FindInPageIcon,
  HelpCenter as HelpCenterIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import Link from 'next/link';

const FireNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
    transition: 'padding 0.3s ease',
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
    transition: 'margin 0.3s ease',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export default function CustomizedList() {
  const [open, setOpen] = useState(true);
  const [movimentosOpen, setMovimentosOpen] = useState(false);
  const [importacaoOpen, setImportacaoOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  const handleMovimentosToggle = () => {
    setMovimentosOpen(!movimentosOpen);
  };

  const handleImportacaoToggle = () => {
    setImportacaoOpen(!importacaoOpen);
  };

  const data = [
    { icon: <CreateNewFolderIcon />, label: 'Cadastros', href: '/cadastros' },
    {
      icon: <QueryStatsIcon />,
      label: 'Movimentos',
      hasSubmenu: true,
      submenu: [
        { label: 'Liberar Margem', href: '/movimentos/liberarMargem' },
        { label: 'Situação Funcional', href: '/movimentos/situacaoFuncional' },
        { label: 'Decisão Judicial', href: '/movimentos/decisaoJudicial' },
        { label: 'Migração de Contratos', href: '/movimentos/migracaoDeContrato' },
        { label: 'Exportação', href: '/movimentos/exportacao' },
        {
          icon: <QueryStatsIcon />,
          label: 'Importação',
          hasSubmenu: true,
          submenu: [
            { label: 'Arquivo de Margem', href: '/movimentos/importacao/arquivoDeMargem' },
            { label: 'Conferência Fechamento', href: '/movimentos/importacao/conferenciaFechamento' },
            { label: 'Rendimentos e Capital', href: '/movimentos/importacao/rendimentosEcapital' },
          ],
        },
      ],
    },
    { icon: <PriceChangeIcon />, label: 'Margem / Contratação', href: '/margemContratacao' },
    { icon: <RuleFolderIcon />, label: 'Gerenciador de Contratos', href: '/gerenciadorDeContratos' },
    { icon: <TaskIcon />, label: 'Aprovação de Contratos', href: '/aprovacaoDeContratos' },
    { icon: <CreditCardIcon />, label: 'Outras Consignações / Catões', href: '/outrasConsignacoesCatoes' },
    { icon: <FindInPageIcon />, label: 'Relatório', href: '/relatorio' },
    { icon: <HelpCenterIcon />, label: 'Ajuda', href: '/ajuda' },
    { icon: <InfoIcon />, label: 'Sobre', href: '/sobre' },
  ];

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={open}
        onClose={handleMenuToggle}
        sx={{
          width: open ? 275 : 60,
          transition: 'width 0.3s ease',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 275 : 60,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
          },
        }}
      >
        <Paper elevation={0} sx={{ width: open ? 275 : 60, bgcolor: '#0D7B52', height: '100%' }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="/visaoGeral">
              <img src="/dpe-logo.png" alt="Logo" width={open ? 60 : 40} height={open ? 60 : 40} />
              {open && (
                <ListItemText
                  sx={{ my: 3 }}
                  primary="Sistema de Consignado"
                  primaryTypographyProps={{
                    fontSize: 24,
                    fontWeight: 'Bold',
                    letterSpacing: 0,
                    color: 'white',
                  }}
                />
              )}
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }} href="/visaoGeral">
                <ListItemIcon>
                  <Home color="#ffffff" />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Visão Geral"
                    primaryTypographyProps={{
                      color: '#fafafa',
                      fontWeight: 'medium',
                      variant: 'body1',
                      alignItems: 'center',
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
            <Divider />
            <Box sx={{ bgcolor: open ? '#0D7B52' : null, pb: open ? 2 : 0 }}>
              <ListItemButton
                alignItems="flex-start"
                onClick={handleMenuToggle}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                }}
              >
                {open ? (
                  <ChevronLeftIcon sx={{ color: 'white' }} />
                ) : (
                  <MenuIcon sx={{ color: 'white' }} />
                )}
              </ListItemButton>

              {open &&
                data.map((item) => (
                  <React.Fragment key={item.label}>
                    <ListItemButton
                      component={Link}
                      href={item.href ? item.href : '#'}
                      sx={{ py: 0, minHeight: 65, color: 'rgba(255, 255, 255, 0.842)' }}
                      onClick={item.label === 'Movimentos' ? handleMovimentosToggle : undefined}
                    >
                      <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                      {open && (
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{ fontSize: 16, fontWeight: 'medium' }}
                        />
                      )}
                      {item.hasSubmenu && (movimentosOpen ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>

                    {item.hasSubmenu && movimentosOpen && (
                      <Box sx={{ pl: 4 }}>
                        {item.submenu?.map((subItem) => (
                          <React.Fragment key={subItem.label}>
                            <ListItemButton
                              onClick={subItem.label === 'Importação' ? handleImportacaoToggle : undefined}
                              sx={{ py: 1, minHeight: 40, color: 'rgba(255, 255, 255, 0.842)' }}
                            >
                              <ListItemText
                                primary={subItem.label}
                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                              />
                              {subItem.hasSubmenu && (importacaoOpen ? <ExpandLess /> : <ExpandMore />)}
                            </ListItemButton>

                            {subItem.hasSubmenu && importacaoOpen && (
                              <Box sx={{ pl: 4 }}>
                                {subItem.submenu?.map((importSubItem) => (
                                  <ListItemButton
                                    key={importSubItem.label}
                                    component={Link}
                                    href={importSubItem.href}
                                    sx={{ py: 1, minHeight: 40, color: 'rgba(255, 255, 255, 0.842)' }}
                                  >
                                    <ListItemText
                                      primary={importSubItem.label}
                                      primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                    />
                                  </ListItemButton>
                                ))}
                              </Box>
                            )}
                          </React.Fragment>
                        ))}
                      </Box>
                    )}
                  </React.Fragment>
                ))}
            </Box>
          </FireNav>
        </Paper>
      </Drawer>
    </Box>
  );
}
