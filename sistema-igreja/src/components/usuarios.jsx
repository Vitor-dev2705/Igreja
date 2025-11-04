import { useState, useEffect } from 'react'
import { get, post } from '../api'
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { motion, AnimatePresence } from 'framer-motion'
import PageTemplate from './PageTemplate'

const MotionCard = motion(Card)

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [novo, setNovo] = useState({ nome: '', email: '', papel: '' })

  useEffect(() => { get('usuarios').then(d => setUsuarios(Array.isArray(d) ? d : [])) }, [])

  function adicionar() {
    if (!novo.nome || !novo.email) return
    post('usuarios', novo).then(u => {
      setUsuarios(prev => [...prev, u])
      setNovo({ nome: '', email: '', papel: '' })
    })
  }

  return (
    <PageTemplate titulo="👤 Usuários" descricao="Gerencie contas e permissões." maxWidth={700}>
      <Box sx={{ mb: 2 }}>
        <TextField label="Nome" fullWidth sx={{ mb: 1 }} value={novo.nome} onChange={e => setNovo({ ...novo, nome: e.target.value })} />
        <TextField label="E-mail" fullWidth sx={{ mb: 1 }} value={novo.email} onChange={e => setNovo({ ...novo, email: e.target.value })} />
        <TextField label="Papel" fullWidth sx={{ mb: 1 }} value={novo.papel} onChange={e => setNovo({ ...novo, papel: e.target.value })} />
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={adicionar} sx={{ mt: 1, background: 'linear-gradient(90deg, #66A5AD, #8C6BB1)' }}>Criar Usuário</Button>
      </Box>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Lista de Usuários</Typography>
      <Grid container spacing={2}>
        <AnimatePresence>
          {usuarios.map(u => (
            <Grid item xs={12} key={u.id || u.email}>
              <MotionCard initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.25 }} sx={{ p: 2, borderRadius: 3 }}>
                <CardContent sx={{ p: 0 }}>
                  <Typography fontWeight={700}>{u.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">{u.email} • {u.papel || '—'}</Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </PageTemplate>
  )
}
