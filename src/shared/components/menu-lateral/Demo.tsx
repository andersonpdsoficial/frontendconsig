// Demo.tsx
'use client';

import React, { useState } from 'react';
import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Tooltip, Typography } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import TaskIcon from '@mui/icons-material/Task';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import InfoIcon from '@mui/icons-material/Info';

const data = [
  { icon: <CreateNewFolderIcon />, label: 'Cadastros' },
  { icon: <QueryStatsIcon />, label: 'Movimentos' },
  { icon: <PriceChangeIcon />, label: 'Margem / Contratação' },
  { icon: <RuleFolderIcon />, label: 'Gerenciador de Contratos' },
  { icon: <TaskIcon />, label: 'Aprovação de Contratos' },
  { icon: <CreditCardIcon />, label: 'Outras Consignações / Catões' },
  { icon: <FindInPageIcon />, label: 'Relatório' },
  { icon: <HelpCenterIcon />, label: 'Ajuda' },
  { icon: <InfoIcon />, label: 'Sobre' }
];

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

  return (
    <Box sx={{ display: 'flex' }}>
      <Paper elevation={0} sx={{ width: 275, bgcolor: 'rgb(42, 73, 39)' }}>
        <FireNav component="nav" disablePadding>
          <ListItemButton component="a" href="#customized-list">
            <ListItemIcon sx={{ fontSize: 30 }}></ListItemIcon>
            <ListItemText
              sx={{ my: 0 }}
              primary="Sistema de Consignado"
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: 'medium',
                letterSpacing: 0,
                color: 'white'
              }}
            />
          </ListItemButton>
          <Divider />
          <ListItem component="div" disablePadding>
            <ListItemButton sx={{ height: 56 }}>
              <ListItemIcon>
                <Home color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Visão Geral"
                primaryTypographyProps={{
                  color: 'primary',
                  fontWeight: 'medium',
                  variant: 'body2',
                }}
              />
            </ListItemButton>
            <Tooltip title="Project Settings">
              <IconButton
                size="large"
                sx={{
                  '& svg': {
                    color: 'rgb(44, 95, 37)',
                    transition: '0.2s',
                    transform: 'translateX(0) rotate(0)',
                  },
                  '&:hover, &:focus': {
                    bgcolor: 'unset',
                    '& svg:first-of-type': {
                      transform: 'translateX(-4px) rotate(-20deg)',
                    },
                    '& svg:last-of-type': {
                      right: 0,
                      opacity: 1,
                    },
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    height: '80%',
                    display: 'block',
                    left: 0,
                    width: '1px',
                    bgcolor: 'divider',
                  },
                }}
              >
                <Settings />
                <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
              </IconButton>
            </Tooltip>
          </ListItem>
          <Divider />
          <Box
            sx={{
              bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
              pb: open ? 2 : 0,
            }}
          >
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setOpen(!open)}
              sx={{
                px: 3,
                pt: 2.5,
                pb: open ? 0 : 2.5,
                '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
              }}
            >
              <ListItemText
                primary="Serviços Disponiveis"
                primaryTypographyProps={{
                  fontSize: 18,
                  fontWeight: 'medium',
                  lineHeight: '50px',
                  mb: '10px',
                }}
                secondary="Cadastros, Movimentos Margem / Contratação, Gerenciador de Contratos Aprovação de Contratos, Outras Consignações / Catões,Relatório, Ajuda, Sobre"
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: '16px',
                  color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDown
                sx={{
                  mr: -1,
                  opacity: 0,
                  transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                  transition: '0.3s',
                }}
              />
            </ListItemButton>
            {open &&
              data.map((item) => (
                <ListItemButton
                  key={item.label}
                  sx={{ py: 0, minHeight: 32, color: 'rgba(255, 255, 255, 0.842)' }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                  />
                </ListItemButton>
              ))}
          </Box>
        </FireNav>
      </Paper>
    </Box>
  );
}
