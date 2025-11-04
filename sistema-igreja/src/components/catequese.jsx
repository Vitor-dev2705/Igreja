import { useState, useEffect } from 'react'
import { get, post } from '../api'
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SchoolIcon from '@mui/icons-material/School'
import { motion, AnimatePresence } from 'framer-motion'
import PageTemplate from './PageTemplate'

const MotionCard = motion(Card)

export default function Catequese() {
  const [turmas, setTurmas] = useState([])
  const [nova, setNova] = useState({ nome: '', catequista: '', horario: '' })

  useEffect(() => { get('catequese').then(d => setTurmas(Array.isArray(d) ? d : [])) }, [])

  function adicionar() {
    if (!nova.nome) return
    post('catequese', nova).then(t => {
      setTurmas(prev => [...prev, t])
      setNova({ nome: '', catequista: '', horario: '' })
    })
  }

  return (
    <PageTemplate titulo="Catequese" descricao="Gerencie turmas, alunos e catequistas." maxWidth={700}>
      <Box sx={{ mb: 2 }}>
        <TextField label="Nome da Turma" fullWidth sx={{ mb: 1 }} value={nova.nome} onChange={e => setNova({ ...nova, nome: e.target.value })} />
        <TextField label="Catequista" fullWidth sx={{ mb: 1 }} value={nova.catequista} onChange={e => setNova({ ...nova, catequista: e.target.value })} />
        <TextField label="Horário" fullWidth sx={{ mb: 1 }} value={nova.horario} onChange={e => setNova({ ...nova, horario: e.target.value })} />
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={adicionar} sx={{ mt: 1, background: 'linear-gradient(90deg, #66A5AD, #8C6BB1)' }}>Adicionar Turma</Button>
      </Box>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Turmas</Typography>
      <Grid container spacing={2}>
        <AnimatePresence>
          {turmas.map(t => (
            <Grid item xs={12} key={t.id || t.nome}>
              <MotionCard initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.25 }} sx={{ p: 2, borderRadius: 3 }}>
                <CardContent sx={{ p: 0 }}>
                  <Typography fontWeight={700}>{t.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">{t.catequista || '—'} • {t.horario || '—'}</Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </PageTemplate>
  )
}
