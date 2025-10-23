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

// 🎨 Paleta baseada na logo
const colors = {
  primary: '#007B83', 
  secondary: '#4DB6AC', 
  background: '#F7F9FA', 
  surface: '#FFFFFF', 
  textPrimary: '#2C3E50',
  textSecondary: '#607D8B',
  accent: '#A7FFEB', 
};

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
    <Box sx={{ display: 'flex', bgcolor: colors.background, minHeight: '100vh', width: '100vw' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: colors.primary,
          color: colors.surface,
          width: `calc(100% - ${aberto ? drawerWidth : drawerCollapsed}px)`,
          left: `${aberto ? drawerWidth : drawerCollapsed}px`,
          transition: 'all 0.3s ease',
          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" noWrap fontWeight={600} sx={{ color: colors.surface }}>
              Comunidade Nossa Senhora do Perpétuo Socorro
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Configurações">
              <IconButton>
                <SettingsIcon sx={{ color: colors.surface }} />
              </IconButton>
            </Tooltip>
            <Avatar alt="Usuário" src="/avatar.png" />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: aberto ? drawerWidth : drawerCollapsed,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          '& .MuiDrawer-paper': {
            width: aberto ? drawerWidth : drawerCollapsed,
            boxSizing: 'border-box',
            background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            color: '#fff',
            transition: 'all 0.3s ease',
            overflowX: 'hidden',
            borderRight: '1px solid rgba(255,255,255,0.2)',
          },
        }}
      >
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
              <img src="/logo.png" alt="Logo" style={{ height: 40, borderRadius: 8 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: colors.surface }}>
                Menu
              </Typography>
            </Box>
          ) : (
            <img src="/logo.png" alt="Logo" style={{ height: 35, borderRadius: 8 }} />
          )}
          <IconButton onClick={() => setAberto(!aberto)} sx={{ color: colors.surface }}>
            {aberto ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

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
                  bgcolor: pagina === item.id ? colors.surface : 'transparent',
                  color: pagina === item.id ? colors.primary : colors.surface,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.2)',
                  },
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: aberto ? 'row' : 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: pagina === item.id ? colors.primary : colors.surface,
                    minWidth: aberto ? '40px' : 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {aberto && (
                  <ListItemText
                    primary={item.label}
                    sx={{
                      ml: 1,
                      fontWeight: pagina === item.id ? 700 : 400,
                      color: pagina === item.id ? colors.primary : colors.surface,
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Drawer>

      {/* Conteúdo */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: colors.surface,
          p: 3,
          mt: 7,
          overflowY: 'auto',
          minHeight: '100vh',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          boxShadow: '0 -4px 10px rgba(0,0,0,0.05)',
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
