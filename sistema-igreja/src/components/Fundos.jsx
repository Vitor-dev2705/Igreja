import { useState, useEffect } from 'react'
import { get, post } from '../api'
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Stack,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { motion, AnimatePresence } from 'framer-motion'

export default function Fundos() {
  const [fundos, setFundos] = useState([])
  const [novo, setNovo] = useState({ nome: '' })

  useEffect(() => {
    get('fundos').then(setFundos)
  }, [])

  function adicionar() {
    if (!novo.nome.trim()) return
    post('fundos', novo).then(f => {
      setFundos([...fundos, f])
      setNovo({ nome: '' })
    })
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, px: 2 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 800,
          backgroundColor: '#fdfdfd',
        }}
      >
        {/* Cabeçalho */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            🏦 Fundos
          </Typography>
          <Tooltip title="Adicionar novo fundo">
            <IconButton color="primary" onClick={adicionar}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Campo de adição */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
          <TextField
            label="Nome do Fundo"
            value={novo.nome}
            onChange={e => setNovo({ ...novo, nome: e.target.value })}
            fullWidth
          />
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={adicionar}
            sx={{ minWidth: 180, py: 1 }}
          >
            Adicionar
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          💼 Lista de Fundos
        </Typography>

        {/* Lista de Fundos */}
        <Grid container spacing={3}>
          <AnimatePresence>
            {fundos.map(f => (
              <Grid item xs={12} sm={6} md={4} key={f.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #3498db, #1abc9c)',
                      color: 'white',
                      textAlign: 'center',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                          <AccountBalanceIcon />
                        </Avatar>
                      }
                      title={f.nome}
                      titleTypographyProps={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                      }}
                      sx={{ pb: 0 }}
                    />
                    <CardContent sx={{ pt: 1 }}>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Fundo ativo
                      </Typography>
                      {/* Você pode exibir saldo/meta aqui futuramente */}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        {fundos.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
            Nenhum fundo cadastrado ainda.
          </Typography>
        )}
      </Paper>
    </Box>
  )
}
