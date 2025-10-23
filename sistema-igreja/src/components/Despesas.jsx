import { useState, useEffect } from 'react'
import { get, post } from '../api'
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Paper,
  Stack,
  Grid,
  Divider,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { motion, AnimatePresence } from 'framer-motion'

const MotionCard = motion(Card)

export default function Despesas() {
  const [despesas, setDespesas] = useState([])
  const [fundos, setFundos] = useState([])
  const [nova, setNova] = useState({ valor: '', data: '', fundo: '', categoria: '', obs: '' })

  useEffect(() => {
    get('despesas').then(setDespesas)
    get('fundos').then(setFundos)
  }, [])

  function adicionar() {
    if (!nova.valor || !nova.data || !nova.fundo) return
    post('despesas', nova).then(d => {
      setDespesas([...despesas, d])
      setNova({ valor: '', data: '', fundo: '', categoria: '', obs: '' })
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 5,
        px: 2,
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #fdfaf6, #f0f7f4)',
        pb: 5,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 700,
          backgroundColor: '#ffffffdd',
          backdropFilter: 'blur(6px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#2c3e50' }}>
            💰 Controle de Despesas
          </Typography>
          <Tooltip title="Adicionar nova despesa">
            <IconButton color="primary" onClick={adicionar}>
              <AddCircleIcon sx={{ fontSize: 30, color: '#66A5AD' }} />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* FORMULÁRIO */}
        <Stack spacing={2}>
          <TextField
            label="Valor (R$)"
            type="number"
            value={nova.valor}
            onChange={e => setNova({ ...nova, valor: e.target.value })}
            fullWidth
          />
          <TextField
            label="Data"
            type="date"
            value={nova.data}
            onChange={e => setNova({ ...nova, data: e.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth>
            <InputLabel>Fundo</InputLabel>
            <Select
              value={nova.fundo}
              label="Fundo"
              onChange={e => setNova({ ...nova, fundo: e.target.value })}
            >
              <MenuItem value="">Selecione o Fundo</MenuItem>
              {fundos.map(f => (
                <MenuItem key={f.id} value={f.nome}>
                  {f.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Categoria"
            value={nova.categoria}
            onChange={e => setNova({ ...nova, categoria: e.target.value })}
            fullWidth
          />
          <TextField
            label="Observação"
            value={nova.obs}
            onChange={e => setNova({ ...nova, obs: e.target.value })}
            fullWidth
            multiline
          />

          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={adicionar}
            sx={{
              mt: 1,
              py: 1.2,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #66A5AD, #8C6BB1)',
              '&:hover': { background: 'linear-gradient(90deg, #5a929a, #7a5da3)' },
            }}
          >
            Adicionar Despesa
          </Button>
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* LISTA DE DESPESAS */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#2c3e50' }}>
          🧾 Lista de Despesas
        </Typography>

        <Grid container spacing={2}>
          <AnimatePresence>
            {despesas.map(d => (
              <Grid item xs={12} key={d.id}>
                <MotionCard
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    bgcolor: '#fefefe',
                    backgroundImage: 'linear-gradient(145deg, #f9f9f9, #f4f4f4)',
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: '#8C6BB1' }}>
                        <AttachMoneyIcon />
                      </Avatar>
                    }
                    title={
                      <Typography sx={{ fontWeight: 700, color: '#2c3e50' }}>
                        R$ {Number(d.valor).toLocaleString('pt-BR')}
                      </Typography>
                    }
                    subheader={
                      <Typography sx={{ color: '#7f8c8d' }}>
                        {d.data} • {d.fundo}
                      </Typography>
                    }
                  />
                  <CardContent sx={{ pt: 0 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Categoria:</strong> {d.categoria || '—'}
                    </Typography>
                    {d.obs && (
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {d.obs}
                      </Typography>
                    )}
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Paper>
    </Box>
  )
}
