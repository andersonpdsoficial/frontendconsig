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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  const data = [
    { icon: <PriceChangeIcon />, label: 'Margem / Contratação', href: '/margemContratacao' },
    { icon: <RuleFolderIcon />, label: 'Gerenciador de Contratos', href: '/gerenciadorDeContratos' },
    { icon: <TaskIcon />, label: 'Solicitações de Averbação', href: '/solicitacoesDeAverbacao' },
    { icon: <CreditCardIcon />, label: 'Outras Consignações / Catões', href: '/outrasConsignacoesCatoes' },
    { icon: <FindInPageIcon />, label: 'Relatório', href: '/relatorio' },
    { icon: <HelpCenterIcon />, label: 'Ajuda', href: '/ajuda' },
    { icon: <InfoIcon />, label: 'Sobre', href: '/sobre' },
  ];

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Drawer
        variant={isMobile || !open ? 'temporary' : 'permanent'}
        open={open}
        onClose={handleMenuToggle}
        sx={{
          width: open ? 275 : 0,
          transition: 'width 0.3s',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 275 : 0,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
          },
        }}
      >
        <Paper elevation={0} sx={{ width: 275, bgcolor: '#0D7B52', height: '100%' }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="/visaoGeral">
              <img src="/dpe-logo.png" alt="Logo" width={60} height={60} />
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
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }} href="/visaoGeral">
                <ListItemIcon>
                  <Home color="#ffffff" />
                </ListItemIcon>
                <ListItemText
                  primary="Visão Geral"
                  primaryTypographyProps={{
                    color: '#fafafa',
                    fontWeight: 'medium',
                    variant: 'body1',
                    alignItems: 'center',
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
                    >
                      <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontSize: 16, fontWeight: 'medium' }}
                      />
                    </ListItemButton>
                  </React.Fragment>
                ))}
            </Box>
          </FireNav>
        </Paper>
      </Drawer>
      {/* Ícone de Menu Hambúrguer */}
      <IconButton
        sx={{
          position: 'fixed',
          top: 5,
          left: 6,
          zIndex: 1200,
          backgroundColor: '#0D7B52',
          color: 'white',
        }}
         onClick={handleMenuToggle}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
}
