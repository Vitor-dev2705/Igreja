import { useState, useEffect } from 'react'
import { get, post } from '../api'
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material'
import InventoryIcon from '@mui/icons-material/Inventory'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { motion, AnimatePresence } from 'framer-motion'
import PageTemplate from './PageTemplate'

const MotionCard = motion(Card)

export default function Inventario() {
  const [itens, setItens] = useState([])
  const [novo, setNovo] = useState({ nome: '', quantidade: '' })

  useEffect(() => { get('inventario').then(d => setItens(Array.isArray(d) ? d : [])) }, [])

  function adicionar() {
    if (!novo.nome) return
    post('inventario', novo).then(i => {
      setItens(prev => [...prev, i])
      setNovo({ nome: '', quantidade: '' })
    })
  }

  return (
    <PageTemplate titulo="Inventário" descricao="Controle de materiais e bens." maxWidth={700}>
      <Box sx={{ mb: 2 }}>
        <TextField label="Item" fullWidth sx={{ mb: 1 }} value={novo.nome} onChange={e => setNovo({ ...novo, nome: e.target.value })} />
        <TextField label="Quantidade" type="number" fullWidth sx={{ mb: 1 }} value={novo.quantidade} onChange={e => setNovo({ ...novo, quantidade: e.target.value })} />
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={adicionar} sx={{ mt: 1, background: 'linear-gradient(90deg, #66A5AD, #8C6BB1)' }}>Adicionar Item</Button>
      </Box>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Itens</Typography>
      <Grid container spacing={2}>
        <AnimatePresence>
          {itens.map(i => (
            <Grid item xs={12} key={i.id || i.nome}>
              <MotionCard initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.25 }} sx={{ p: 2, borderRadius: 3 }}>
                <CardContent sx={{ p: 0 }}>
                  <Typography fontWeight={700}>{i.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">Quantidade: {i.quantidade || 0}</Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </PageTemplate>
  )
}
