import { useState, useEffect } from 'react'
import { get, post } from '../api'
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Typography, Paper, Stack, Grid } from '@mui/material'

export default function Doacoes() {
  const [doacoes, setDoacoes] = useState([])
  const [fundos, setFundos] = useState([])
  const [membros, setMembros] = useState([])
  const [nova, setNova] = useState({valor:'', data:'', fundo:'', membroId:'', obs:''})

  useEffect(() => {
    get('doacoes').then(setDoacoes)
    get('fundos').then(setFundos)
    get('membros').then(setMembros)
  }, [])

  function adicionar() {
    post('doacoes', nova).then(d => {
      setDoacoes([...doacoes, d])
      setNova({valor:'', data:'', fundo:'', membroId:'', obs:''})
    })
  }

  const getMembroNome = id => {
    const membro = membros.find(m => String(m.id) === String(id))
    return membro ? membro.nome : '-'
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Doações</Typography>
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
        <FormControl fullWidth>
          <InputLabel>Membro</InputLabel>
          <Select
            value={nova.membroId}
            label="Membro"
            onChange={e => setNova({...nova,membroId:e.target.value})}
          >
            <MenuItem value="">Selecione o Membro</MenuItem>
            {membros.map(m => <MenuItem key={m.id} value={m.id}>{m.nome}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          label="Observação"
          value={nova.obs}
          onChange={e => setNova({...nova,obs:e.target.value})}
          fullWidth
        />
        <Button variant="contained" onClick={adicionar}>Adicionar</Button>
      </Stack>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Lista de Doações</Typography>
        <Grid container spacing={1}>
          {doacoes.map(d=>(
            <Grid item xs={12} key={d.id}>
              <Paper sx={{ p: 1, mb: 1 }}>
                <Typography>
                  <strong>R$ {Number(d.valor).toLocaleString('pt-BR')}</strong>
                  {' '}em <strong>{d.data}</strong> (<strong>{d.fundo}</strong>)
                  — <strong>{getMembroNome(d.membroId)}</strong>. {d.obs}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  )
}
