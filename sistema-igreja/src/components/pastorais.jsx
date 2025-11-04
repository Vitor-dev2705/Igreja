import { useState, useEffect } from 'react'
import { get, post } from '../api'
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ChurchIcon from '@mui/icons-material/Church'
import { motion, AnimatePresence } from 'framer-motion'
import PageTemplate from './PageTemplate'

const MotionCard = motion(Card)

export default function Pastorais() {
  const [pastorais, setPastorais] = useState([])
  const [novo, setNovo] = useState({ nome: '', coordenador: '', descricao: '' })

  useEffect(() => { get('pastorais').then(d => setPastorais(Array.isArray(d) ? d : [])) }, [])

  function adicionar() {
    if (!novo.nome) return
    post('pastorais', novo).then(p => {
      setPastorais(prev => [...prev, p])
      setNovo({ nome: '', coordenador: '', descricao: '' })
    })
  }

  return (
    <PageTemplate titulo="Pastorais" descricao="Organize e gerencie as pastorais." maxWidth={700}>
      <Box sx={{ mb: 2 }}>
        <TextField label="Nome" fullWidth sx={{ mb: 1 }} value={novo.nome} onChange={e => setNovo({ ...novo, nome: e.target.value })} />
        <TextField label="Coordenador" fullWidth sx={{ mb: 1 }} value={novo.coordenador} onChange={e => setNovo({ ...novo, coordenador: e.target.value })} />
        <TextField label="Descrição" fullWidth multiline rows={2} sx={{ mb: 1 }} value={novo.descricao} onChange={e => setNovo({ ...novo, descricao: e.target.value })} />
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={adicionar} sx={{ mt: 1, background: 'linear-gradient(90deg, #66A5AD, #8C6BB1)' }}>Adicionar Pastoral</Button>
      </Box>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Lista de Pastorais</Typography>
      <Grid container spacing={2}>
        <AnimatePresence>
          {pastorais.map(p => (
            <Grid item xs={12} key={p.id || p.nome}>
              <MotionCard initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.25 }} sx={{ p: 2, borderRadius: 3 }}>
                <CardContent sx={{ p: 0 }}>
                  <Typography fontWeight={700}>{p.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">{p.coordenador || '—'} • {p.descricao || '—'}</Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </PageTemplate>
  )
}
