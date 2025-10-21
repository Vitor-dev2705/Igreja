import { useState, useEffect } from 'react'
import { get, post } from '../api'
import { Box, Button, TextField, Paper, Typography, Stack, Grid, Card, CardContent } from '@mui/material'

export default function Fundos() {
  const [fundos, setFundos] = useState([])
  const [novo, setNovo] = useState({ nome: '' })

  useEffect(() => {
    get('fundos').then(setFundos)
  }, [])

  function adicionar() {
    post('fundos', novo).then(f => {
      setFundos([...fundos, f])
      setNovo({ nome: '' })
    })
  }

  return (
    <Box sx={{ maxWidth: 700, margin: 'auto', mt: 5, p:0  }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Fundos</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Nome"
            value={novo.nome}
            onChange={e => setNovo({ ...novo, nome: e.target.value })}
          />
          <Button variant="contained" onClick={adicionar}>Adicionar</Button>
        </Stack>
      </Paper>
      <Grid container spacing={2}>
        {fundos.map(f => (
          <Grid item xs={12} sm={6} md={4} key={f.id}>
            <Card sx={{ background: '#3498DB', color: '#FFF' }}>
              <CardContent>
                <Typography variant="h6">{f.nome}</Typography>
                {/* Aqui você pode exibir saldo/meta se quiser */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
