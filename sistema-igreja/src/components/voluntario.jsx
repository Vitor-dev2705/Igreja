import { useState, useEffect } from 'react'
import { get, post } from '../api'
import { Box, Typography, TextField, Button, Grid, Avatar, Card, CardContent, IconButton, Tooltip } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import VolunteerIcon from '@mui/icons-material/VolunteerActivism'
import { motion, AnimatePresence } from 'framer-motion'
import PageTemplate from './PageTemplate'

const MotionCard = motion(Card)

export default function Voluntarios() {
  const [vols, setVols] = useState([])
  const [novo, setNovo] = useState({ nome: '', tarefa: '', contato: '' })

  useEffect(() => { get('voluntarios').then(d => setVols(Array.isArray(d) ? d : [])) }, [])

  function adicionar() {
    if (!novo.nome) return
    post('voluntarios', novo).then(v => {
      setVols(prev => [...prev, v])
      setNovo({ nome: '', tarefa: '', contato: '' })
    })
  }

  return (
    <PageTemplate titulo="🙌 Voluntários" descricao="Gerencie voluntários e suas atividades." maxWidth={700}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 2 }}>
          <TextField label="Nome" fullWidth sx={{ mb: 1 }} value={novo.nome} onChange={e => setNovo({ ...novo, nome: e.target.value })} />
          <TextField label="Tarefa / Função" fullWidth sx={{ mb: 1 }} value={novo.tarefa} onChange={e => setNovo({ ...novo, tarefa: e.target.value })} />
          <TextField label="Contato" fullWidth sx={{ mb: 1 }} value={novo.contato} onChange={e => setNovo({ ...novo, contato: e.target.value })} />
        </Box>
        <Tooltip title="Adicionar voluntário">
          <IconButton color="primary" onClick={adicionar}>
            <AddCircleIcon sx={{ fontSize: 36, color: '#66A5AD' }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Lista de Voluntários</Typography>
      <Grid container spacing={2}>
        <AnimatePresence>
          {vols.map(v => (
            <Grid item xs={12} key={v.id || v.nome}>
              <MotionCard initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} whileHover={{ scale: 1.02 }} transition={{ duration: 0.28 }} sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: 3 }}>
                <Avatar sx={{ bgcolor: '#66A5AD', mr: 2 }}><VolunteerIcon /></Avatar>
                <CardContent sx={{ p: 0 }}>
                  <Typography fontWeight={700}>{v.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">{v.tarefa || '—'} • {v.contato || '—'}</Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </PageTemplate>
  )
}
