import { useState, useEffect } from 'react'
import { get, post } from '../api'
import { Box, Button, TextField, Typography, Paper, Stack, Grid, Card, CardContent } from '@mui/material'

export default function Membros() {
  const [membros, setMembros] = useState([])
  const [novo, setNovo] = useState({nome:'', email:'', telefone:''})

  useEffect(() => { get('membros').then(setMembros) }, [])

  function adicionar() {
    post('membros', novo).then(m => {
      setMembros([...membros, m])
      setNovo({nome:'', email:'', telefone:''})
    })
  }

   return (
    <Box sx={{ width: '100%', height: '100%', p: 0, m: 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mb: 2 }}>Membros</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField label="Nome" value={novo.nome} onChange={e => setNovo({ ...novo, nome: e.target.value })} />
            <TextField label="Email" value={novo.email} onChange={e => setNovo({ ...novo, email: e.target.value })} />
            <TextField label="Telefone" value={novo.telefone} onChange={e => setNovo({ ...novo, telefone: e.target.value })} />
            <Button variant="contained" onClick={adicionar}>Adicionar</Button>
          </Stack>
        </Grid>
        {membros.map(m => (
          <Grid item xs={12} sm={6} md={4} key={m.id}>
            <Card>
              <CardContent>
                <Typography>
                  <strong>{m.nome}</strong> — {m.email} — {m.telefone}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
