import { useState, useEffect } from 'react'
import { get, post } from '../api'
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Typography, Paper, Stack, Grid } from '@mui/material'

export default function Despesas() {
  const [despesas, setDespesas] = useState([])
  const [fundos, setFundos] = useState([])
  const [nova, setNova] = useState({valor:'', data:'', fundo:'', categoria:'', obs:''})

  useEffect(() => {
    get('despesas').then(setDespesas)
    get('fundos').then(setFundos)
  }, [])

  function adicionar() {
    post('despesas', nova).then(d => {
      setDespesas([...despesas, d])
      setNova({valor:'', data:'', fundo:'', categoria:'', obs:''})
    })
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Despesas</Typography>
      <Stack spacing={2}>
        <TextField
          label="Valor (R$)"
          type="number"
          value={nova.valor}
          onChange={e => setNova({...nova,valor:e.target.value})}
          fullWidth
        />
        <TextField
          type="date"
          value={nova.data}
          onChange={e => setNova({...nova,data:e.target.value})}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth>
          <InputLabel>Fundo</InputLabel>
          <Select
            value={nova.fundo}
            label="Fundo"
            onChange={e => setNova({...nova,fundo:e.target.value})}
          >
            <MenuItem value="">Selecione o Fundo</MenuItem>
            {fundos.map(f => <MenuItem key={f.id} value={f.nome}>{f.nome}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          label="Categoria"
          value={nova.categoria}
          onChange={e => setNova({...nova,categoria:e.target.value})}
          fullWidth
        />
        <TextField
          label="Observação"
          value={nova.obs}
          onChange={e => setNova({...nova,obs:e.target.value})}
          fullWidth
        />
        <Button variant="contained" onClick={adicionar}>Adicionar</Button>
      </Stack>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Lista de Despesas</Typography>
        <Grid container spacing={1}>
          {despesas.map(d=>(
            <Grid item xs={12} key={d.id}>
              <Paper sx={{ p: 1, mb: 1 }}>
                <Typography>
                  <strong>R$ {Number(d.valor).toLocaleString('pt-BR')} </strong>
                  em <strong>{d.data}</strong> (<strong>{d.fundo}</strong>) [{d.categoria}]. {d.obs}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  )
}
