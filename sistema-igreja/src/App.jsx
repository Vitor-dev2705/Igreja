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
  Tooltip,
  Avatar,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SettingsIcon from '@mui/icons-material/Settings';

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
    <Box sx={{ display: 'flex', bgcolor: '#f3f3f5ff', minHeight: '100vh', width: '100vw' }}>
      {/* Barra superior */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: '#5d5959',
          borderBottom: '1px solid #ffffffff',
          color: '#0a1a3b',
          width: `calc(100% - ${aberto ? drawerWidth : drawerCollapsed}px)`,
          left: `${aberto ? drawerWidth : drawerCollapsed}px`,
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Título à esquerda */}
          <Typography variant="h6" noWrap>
            Comunidade Nossa Senhora do Perpétuo Socorro
          </Typography>

          {/* Avatar e engrenagem à direita */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton>
              <SettingsIcon sx={{ color: '#fff' }} />
            </IconButton>
            <Avatar alt="Usuário" src="/avatar.png" />
          </Box>
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
            bgcolor: '#5d5959',
            color: '#000000ff',
            transition: 'all 0.3s ease',
            overflowX: 'hidden',
            borderRight: '1px solid #ffffffff',
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
                  borderRadius: '80px',
                  mx: 1,
                  px: aberto ? 2 : 1,
                  bgcolor: pagina === item.id ? '#fff' : 'transparent',
                  '&:hover': { bgcolor: '#fff' },
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
          bgcolor: '#fff',
          p: 1,
          mt: 7,
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
