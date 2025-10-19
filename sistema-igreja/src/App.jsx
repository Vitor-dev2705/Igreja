import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import Dashboard from './components/Dashboard';
import Membros from './components/Membros';
import Doacoes from './components/Doacoes';
import Despesas from './components/Despesas';
import Fundos from './components/Fundos';

const drawerWidth = 240;
const drawerCollapsed = 75;

export default function App() {
  const [pagina, setPagina] = useState('dashboard');
  const [aberto, setAberto] = useState(true);

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, id: 'dashboard' },
    { label: 'Membros', icon: <PeopleIcon />, id: 'membros' },
    { label: 'Doações', icon: <AttachMoneyIcon />, id: 'doacoes' },
    { label: 'Despesas', icon: <EventIcon />, id: 'despesas' },
    { label: 'Fundos', icon: <EventIcon />, id: 'fundos' },
  ];

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f3f6fc', minHeight: '100vh', width: '100vw' }}>
      {/* Barra superior */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: '#1976d2',
          width: `calc(100% - ${aberto ? drawerWidth : drawerCollapsed}px)`,
          left: `${aberto ? drawerWidth : drawerCollapsed}px`,
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap>
            Comunidade Nossa Senhora do Perpétuo Socorro
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menu lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: aberto ? drawerWidth : drawerCollapsed,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          '& .MuiDrawer-paper': {
            width: aberto ? drawerWidth : drawerCollapsed,
            boxSizing: 'border-box',
            bgcolor: '#0d214f',
            color: '#fff',
            transition: 'all 0.3s ease',
            overflowX: 'hidden',
            borderRight: '1px solid #0a1a3b',
          },
        }}
      >
        {/* Logo e botão */}
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: aberto ? 'space-between' : 'center',
            alignItems: 'center',
            px: 2,
          }}
        >
          {aberto ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
              <Typography variant="h6">Menu</Typography>
            </Box>
          ) : (
            <img src="/logo.png" alt="Logo" style={{ height: 35 }} />
          )}
          <IconButton onClick={() => setAberto(!aberto)} sx={{ color: '#fff' }}>
            {aberto ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        {/* Itens do menu */}
        <List sx={{ mt: 2 }}>
          {menuItems.map((item) => (
            <Tooltip key={item.id} title={!aberto ? item.label : ''} placement="right">
              <ListItemButton
                selected={pagina === item.id}
                onClick={() => setPagina(item.id)}
                sx={{
                  mb: 1,
                  borderRadius: '8px',
                  mx: 1,
                  px: aberto ? 2 : 1,
                  bgcolor: pagina === item.id ? '#1150c5' : 'transparent',
                  '&:hover': { bgcolor: '#0e3a94' },
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: aberto ? 'row' : 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: '#fff',
                    minWidth: aberto ? '40px' : 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {aberto && <ListItemText primary={item.label} sx={{ ml: 1 }} />}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Drawer>

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f3f6fc',
          p: 3,
          pt: 10,
          overflowY: 'auto',
          minHeight: '100vh',
          transition: 'margin 0.3s ease',
        }}
      >
        {pagina === 'dashboard' && <Dashboard />}
        {pagina === 'membros' && <Membros />}
        {pagina === 'doacoes' && <Doacoes />}
        {pagina === 'despesas' && <Despesas />}
        {pagina === 'fundos' && <Fundos />}
      </Box>
    </Box>
  );
}
