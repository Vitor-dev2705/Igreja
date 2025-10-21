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

// Import da logo
import Logo from './assets/logo.png'; // certifique-se do caminho correto

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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
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
        <Toolbar>
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
          transition: 'width 0.3s',
          '& .MuiDrawer-paper': {
              width: aberto ? drawerWidth : drawerCollapsed,
              boxSizing: 'border-box',
              bgcolor: '#ffffffff', // fundo branco
              color: '#000000',   // textos pretos
              overflowX: 'hidden',
              borderRight: '1px solid #d1d9e6',
              transition: 'width 0.3s',
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
              <img src={Logo} alt="Logo" style={{ height: 40 }} />
              <Typography variant="h6" color="#000">Menu</Typography>
            </Box>
          ) : (
            <img src={Logo} alt="Logo" style={{ height: 35 }} />
          )}
          <IconButton onClick={() => setAberto(!aberto)} sx={{ color: '#000' }}>
            {aberto ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        <Divider sx={{ borderColor: 'rgba(0,0,0,0.1)' }} />

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
                  color: pagina === item.id ? '#fff' : '#000',
                  '&:hover': { bgcolor: '#cfe0fc' },
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: aberto ? 'row' : 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: pagina === item.id ? '#fff' : '#000',
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
