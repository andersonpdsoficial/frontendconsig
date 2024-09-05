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
  ArrowRight,
  KeyboardArrowDown,
  ExpandLess,
  ExpandMore,
  Home,
  Settings,
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
} from '@mui/icons-material';
import Link from 'next/link';

const FireNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export default function CustomizedList() {
  const [open, setOpen] = useState(true);
  const [movimentosOpen, setMovimentosOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  const handleMovimentosToggle = () => {
    setMovimentosOpen(!movimentosOpen);
  };

  const data = [
    { icon: <CreateNewFolderIcon />, label: 'Cadastros', href: '/cadastros' },
    {
      icon: <QueryStatsIcon />,
      label: 'Movimentos',
      href: '/movimentos',
      hasSubmenu: true,
      submenu: [
        { label: 'Liberar Margem', href: '/liberarMargem' },
        { label: 'Situação Funcional', href: '/situacaoFuncional' },
        { label: 'Decisão Judicial', href: '/decisaoJudicial' },
        { label: 'Migração de Contratos', href: '/migracaoContratos' },
        { label: 'Importação', href: '/importacao' },
        { label: 'Exportação', href: '/exportacao' },
        { label: 'Consignado Mensal', href: '/consignadoMensal' },
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
        open={true}
        onClose={handleMenuToggle}
        sx={{
          width: 275,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 275,
            boxSizing: 'border-box',
          },
        }}
      >
        <Paper elevation={0} sx={{ width: 275, bgcolor: '#0D7B52', height: '100%' }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="/">
              <img src="/dpe-logo.png" alt="Logo" width={60} height={60} />
              <ListItemText
                sx={{ my: 3 }}
                primary="Sistema de Consignado"
                primaryTypographyProps={{
                  fontSize: 24,
                  fontWeight: 'Bold',
                  letterSpacing: 0,
                  color: 'white'
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }} href="/visaoGeral">
                <ListItemIcon>
                  <Home color='#ffffff'/>
                </ListItemIcon>
                <ListItemText
                  primary="Visão Geral"
                  primaryTypographyProps={{
                    color: '#fafafa',
                    fontWeight: 'medium',
                    variant: 'body1',
                    alignItems: 'center'
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <Box
              sx={{
                bgcolor: open ? '#0D7B52' : null,
                pb: open ? 2 : 0,
              }}
            >
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
                <ListItemText
                  primary="Serviços Disponíveis"
                  primaryTypographyProps={{
                    fontSize: 22,
                    color: '#bce2d5',
                    fontWeight: 'medium',
                    lineHeight: '60px',
                    mb: '10px',
                  }}
                  secondary="Cadastros, Movimentos, Margem / Contratação, Gerenciador de Contratos, Aprovação de Contratos, Outras Consignações / Catões, Relatório, Ajuda, Sobre"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 13,
                    lineHeight: '25px',
                    color: open ? 'rgba(0,0,0,0)' : '#d5f1ddbc',
                  }}
                  sx={{ my: 0 }}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {open &&
                data.map((item) => (
                  <React.Fragment key={item.label}>
                    <ListItemButton
                      component={Link}
                      href={item.href}
                      sx={{ py: 0, minHeight: 65, color: 'rgba(255, 255, 255, 0.842)' }}
                      onClick={item.label === 'Movimentos' ? handleMovimentosToggle : undefined}
                    >
                      <ListItemIcon sx={{ color: 'inherit' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontSize: 16, fontWeight: 'medium' }}
                      />
                      {item.hasSubmenu && (movimentosOpen ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                    {item.hasSubmenu && movimentosOpen && (
                      <Box sx={{ pl: 4 }}>
                        {item.submenu?.map((subItem) => (
                          <ListItemButton
                            key={subItem.label}
                            component={Link}
                            href={subItem.href}
                            sx={{ py: 1, minHeight: 40, color: 'rgba(255, 255, 255, 0.842)' }}
                          >
                            <ListItemText
                              primary={subItem.label}
                              primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                            />
                          </ListItemButton>
                        ))}
                      </Box>
                    )}
                  </React.Fragment>
                )}
            </Box>
          </FireNav>
        </Paper>
      </Drawer>
      {isMobile && (
        <IconButton
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1200,
            backgroundColor: '#0D7B52',
            color: 'white',
          }}
          onClick={handleMenuToggle}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );
}