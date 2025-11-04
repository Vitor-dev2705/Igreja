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
  Collapse,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InventoryIcon from '@mui/icons-material/Inventory';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ChurchIcon from '@mui/icons-material/Church';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Dashboard from './components/Dashboard';
import Doacoes from './components/Doacoes';
import Despesas from './components/Despesas';
import Fundos from './components/Fundos';

const drawerWidth = 240;
const drawerCollapsed = 75;
const baseColor = '#3f51b5';

export default function App() {
  const [pagina, setPagina] = useState('dashboard');
  const [aberto, setAberto] = useState(true);
  const [openPastoral, setOpenPastoral] = useState(false);
  const [openFinanceiro, setOpenFinanceiro] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

  const togglePastoral = () => setOpenPastoral(!openPastoral);
  const toggleFinanceiro = () => setOpenFinanceiro(!openFinanceiro);
  const toggleAdmin = () => setOpenAdmin(!openAdmin);

  const renderItem = (item) => (
    <Tooltip key={item.id} title={!aberto ? item.label : ''} placement="right">
      <ListItemButton
        selected={pagina === item.id}
        onClick={() => setPagina(item.id)}
        sx={{
          mb: 0.5,
          borderRadius: '8px',
          mx: 1,
          px: aberto ? 2 : 1,
          bgcolor: pagina === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
          color: '#fff',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
          transition: 'all 0.25s ease',
          height: 45,
          display: 'flex',
          justifyContent: aberto ? 'flex-start' : 'center',
          alignItems: 'center',
        }}
      >
        <ListItemIcon
          sx={{
            color: '#fff',
            minWidth: 40,
            mr: aberto ? 1.5 : 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.25s ease',
          }}
        >
          {item.icon}
        </ListItemIcon>
        {aberto && (
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: 500,
            }}
          />
        )}
      </ListItemButton>
    </Tooltip>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f9f9f9', minHeight: '100vh', width: '100vw' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: baseColor,
          color: '#fff',
          width: `calc(100% - ${aberto ? drawerWidth : drawerCollapsed}px)`,
          left: `${aberto ? drawerWidth : drawerCollapsed}px`,
          transition: 'all 0.3s ease',
          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={600}>
            Comunidade Nossa Senhora do Perpétuo Socorro
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Configurações">
              <IconButton sx={{ color: '#fff' }}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Avatar alt="Usuário" src="/avatar.png" />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: aberto ? drawerWidth : drawerCollapsed,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: aberto ? drawerWidth : drawerCollapsed,
            backgroundColor: baseColor,
            color: '#fff',
            transition: 'all 0.3s ease',
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar sx={{ justifyContent: aberto ? 'space-between' : 'center', px: 2 }}>
          {aberto ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src="/logo.png" alt="Logo" style={{ height: 40, borderRadius: 8 }} />
              <Typography variant="h6" fontWeight={700}>Menu</Typography>
            </Box>
          ) : (
            <img src="/logo.png" alt="Logo" style={{ height: 35, borderRadius: 8 }} />
          )}
          <IconButton onClick={() => setAberto(!aberto)} sx={{ color: '#fff' }}>
            {aberto ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        <List sx={{ mt: 1 }}>
          {renderItem({ label: 'Dashboard', icon: <DashboardIcon />, id: 'dashboard' })}

          <ListItemButton
            onClick={togglePastoral}
            sx={{
              mb: 0.5,
              borderRadius: '8px',
              mx: 1,
              px: aberto ? 2 : 1,
              color: '#fff',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              height: 45,
              display: 'flex',
              justifyContent: aberto ? 'flex-start' : 'center',
              alignItems: 'center',
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: '#fff',
                minWidth: 40,
                mr: aberto ? 1.5 : 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ChurchIcon />
            </ListItemIcon>
            {aberto && <ListItemText primary="Pastoral e Comunidade" />}
            {aberto && (openPastoral ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </ListItemButton>

          <Collapse in={openPastoral} timeout="auto" unmountOnExit>
            {[
              { label: 'Voluntários', icon: <VolunteerActivismIcon />, id: 'voluntarios' },
              { label: 'Catequese', icon: <SchoolIcon />, id: 'catequese' },
              { label: 'Eventos', icon: <EventIcon />, id: 'eventos' },
              { label: 'Pastorais', icon: <ChurchIcon />, id: 'pastorais' },
            ].map(renderItem)}
          </Collapse>

          <ListItemButton
            onClick={toggleFinanceiro}
            sx={{
              mb: 0.5,
              borderRadius: '8px',
              mx: 1,
              px: aberto ? 2 : 1,
              color: '#fff',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              height: 45,
              display: 'flex',
              justifyContent: aberto ? 'flex-start' : 'center',
              alignItems: 'center',
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: '#fff',
                minWidth: 40,
                mr: aberto ? 1.5 : 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AttachMoneyIcon />
            </ListItemIcon>
            {aberto && <ListItemText primary="Financeiro" />}
            {aberto && (openFinanceiro ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </ListItemButton>

          <Collapse in={openFinanceiro} timeout="auto" unmountOnExit>
            {[
              { label: 'Doações', icon: <AttachMoneyIcon />, id: 'doacoes' },
              { label: 'Despesas', icon: <MoneyOffIcon />, id: 'despesas' },
              { label: 'Fundos', icon: <AccountBalanceIcon />, id: 'fundos' },
              { label: 'Relatórios', icon: <BarChartIcon />, id: 'relatorios' },
            ].map(renderItem)}
          </Collapse>

          <ListItemButton
            onClick={toggleAdmin}
            sx={{
              mb: 0.5,
              borderRadius: '8px',
              mx: 1,
              px: aberto ? 2 : 1,
              color: '#fff',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              height: 45,
              display: 'flex',
              justifyContent: aberto ? 'flex-start' : 'center',
              alignItems: 'center',
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: '#fff',
                minWidth: 40,
                mr: aberto ? 1.5 : 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SettingsIcon />
            </ListItemIcon>
            {aberto && <ListItemText primary="Administração" />}
            {aberto && (openAdmin ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </ListItemButton>

          <Collapse in={openAdmin} timeout="auto" unmountOnExit>
            {[
              { label: 'Inventário', icon: <InventoryIcon />, id: 'inventario' },
              { label: 'Usuários', icon: <SupervisorAccountIcon />, id: 'usuarios' },
              { label: 'Configurações', icon: <SettingsIcon />, id: 'configuracoes' },
            ].map(renderItem)}
          </Collapse>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#fff',
          p: 3,
          mt: 7,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          overflowY: 'auto',
          minHeight: '100vh',
        }}
      >
        {pagina === 'dashboard' && <Dashboard />}
        {pagina === 'doacoes' && <Doacoes />}
        {pagina === 'despesas' && <Despesas />}
        {pagina === 'fundos' && <Fundos />}
      </Box>
    </Box>
  );
}