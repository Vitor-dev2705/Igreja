import { useState, useEffect } from 'react'
import { get, post } from '../api'
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import EventIcon from '@mui/icons-material/Event'
import { motion, AnimatePresence } from 'framer-motion'
import PageTemplate from './PageTemplate'

const MotionCard = motion(Card)

export default function Eventos() {
  const [eventos, setEventos] = useState([])
  const [novo, setNovo] = useState({ titulo: '', data: '', descricao: '' })

  useEffect(() => { get('eventos').then(d => setEventos(Array.isArray(d) ? d : [])) }, [])

  function adicionar() {
    if (!novo.titulo || !novo.data) return
    post('eventos', novo).then(ev => {
      setEventos(prev => [...prev, ev])
      setNovo({ titulo: '', data: '', descricao: '' })
    })
  }

  return (
    <PageTemplate titulo="🎉 Eventos" descricao="Crie e gerencie eventos da comunidade." maxWidth={700}>
      <Box sx={{ mb: 2 }}>
        <TextField label="Título" fullWidth sx={{ mb: 1 }} value={novo.titulo} onChange={e => setNovo({ ...novo, titulo: e.target.value })} />
        <TextField label="Data" type="date" InputLabelProps={{ shrink: true }} fullWidth sx={{ mb: 1 }} value={novo.data} onChange={e => setNovo({ ...novo, data: e.target.value })} />
        <TextField label="Descrição" fullWidth multiline rows={3} sx={{ mb: 1 }} value={novo.descricao} onChange={e => setNovo({ ...novo, descricao: e.target.value })} />
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={adicionar} sx={{ mt: 1, background: 'linear-gradient(90deg, #66A5AD, #8C6BB1)' }}>Adicionar Evento</Button>
      </Box>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Próximos Eventos</Typography>
      <Grid container spacing={2}>
        <AnimatePresence>
          {eventos.map(ev => (
            <Grid item xs={12} key={ev.id || ev.titulo}>
              <MotionCard initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.25 }} sx={{ p: 2, borderRadius: 3 }}>
                <CardContent sx={{ p: 0 }}>
                  <Typography fontWeight={700}>{ev.titulo}</Typography>
                  <Typography variant="body2" color="text.secondary">{ev.data} • {ev.descricao}</Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </PageTemplate>
  )
}
