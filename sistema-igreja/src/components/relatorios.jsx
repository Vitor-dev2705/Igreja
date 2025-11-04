import { useState } from 'react'
import { Box, Typography, Button, Grid, Card, CardContent, TextField } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import { motion } from 'framer-motion'
import PageTemplate from './PageTemplate'

const MotionCard = motion(Card)

export default function Relatorios() {
  const [periodo, setPeriodo] = useState({ inicio: '', fim: '' })

  function gerar() {
    // placeholder: você pode ligar à API que gera relatórios
    console.log('Gerar relatório', periodo)
  }

  return (
    <PageTemplate titulo="Relatórios" descricao="Gere relatórios financeiros e operacionais." maxWidth={800}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Início" type="date" InputLabelProps={{ shrink: true }} value={periodo.inicio} onChange={e => setPeriodo({ ...periodo, inicio: e.target.value })} />
        <TextField label="Fim" type="date" InputLabelProps={{ shrink: true }} value={periodo.fim} onChange={e => setPeriodo({ ...periodo, fim: e.target.value })} />
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={gerar} sx={{ background: 'linear-gradient(90deg, #66A5AD, #8C6BB1)' }}>Gerar</Button>
      </Box>

      <Grid container spacing={2}>
        {[1,2].map(i => (
          <Grid item xs={12} md={6} key={i}>
            <MotionCard whileHover={{ scale: 1.02 }} sx={{ p: 2, borderRadius: 3 }}>
              <CardContent>
                <Typography fontWeight={700}>Relatório Exemplo #{i}</Typography>
                <Typography variant="body2" color="text.secondary">Resumo com KPIs e gráficos (placeholder)</Typography>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </PageTemplate>
  )
}
