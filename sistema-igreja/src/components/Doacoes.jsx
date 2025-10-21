import { useState, useEffect } from 'react'
import { get, post } from '../api'
import { 
  Box, 
  Button, 
  TextField, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Typography, 
  Paper, 
  Stack, 
  Grid 
} from '@mui/material'
import { motion } from 'framer-motion'

export default function Doacoes() {
  const [doacoes, setDoacoes] = useState([])
  const [fundos, setFundos] = useState([])
  const [membros, setMembros] = useState([])
  const [nova, setNova] = useState({ valor:'', data:'', fundo:'', membroId:'', obs:'' })

  useEffect(() => {
    get('doacoes').then(setDoacoes)
    get('fundos').then(setFundos)
    get('membros').then(setMembros)
  }, [])

  function adicionar() {
    if(!nova.valor || !nova.data || !nova.fundo || !nova.membroId) return
    post('doacoes', nova).then(d => {
      setDoacoes([...doacoes, d])
      setNova({ valor:'', data:'', fundo:'', membroId:'', obs:'' })
    })
  }

  const getMembroNome = id => {
    const membro = membros.find(m => String(m.id) === String(id))
    return membro ? membro.nome : '-'
  }

  const cores = ['#2ecc71', '#3498db', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
  const getCorFundo = (fundo) => {
    const index = fundos.findIndex(f => f.nome === fundo)
    return cores[index % cores.length] + '33'
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 5, px: 2 }}>
      <Paper sx={{ p: 3, mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Registrar Doações</Typography>

        <Stack spacing={2}>
          <TextField
            label="Valor (R$)"
            type="number"
            value={nova.valor}
            onChange={e => setNova({ ...nova, valor: e.target.value })}
            fullWidth
          />

          <TextField
            type="date"
            value={nova.data}
            onChange={e => setNova({ ...nova, data: e.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <FormControl fullWidth>
            <InputLabel>Fundo</InputLabel>
            <Select
              value={nova.fundo}
              label="Fundo"
              onChange={e => setNova({ ...nova, fundo: e.target.value })}
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
              onChange={e => setNova({ ...nova, membroId: e.target.value })}
            >
              <MenuItem value="">Selecione o Membro</MenuItem>
              {membros.map(m => <MenuItem key={m.id} value={m.id}>{m.nome}</MenuItem>)}
            </Select>
          </FormControl>

          <TextField
            label="Observação"
            value={nova.obs}
            onChange={e => setNova({ ...nova, obs: e.target.value })}
            fullWidth
          />

          <Button variant="contained" color="primary" onClick={adicionar}>
            Adicionar Doação
          </Button>
        </Stack>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Lista de Doações</Typography>
      <Grid container spacing={3}>
        {doacoes.length === 0 && (
          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'center', color: 'gray' }}>Nenhuma doação registrada.</Typography>
          </Grid>
        )}
        {doacoes.map(d => (
          <Grid item xs={12} sm={6} key={d.id}>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
              transition={{ duration: 0.3 }}
            >
              <Paper sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                background: getCorFundo(d.fundo)
              }}>
                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                    R$ {Number(d.valor).toLocaleString('pt-BR')}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    Data: <strong>{d.data}</strong>
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    Fundo: <strong>{d.fundo}</strong>
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    Membro: <strong>{getMembroNome(d.membroId)}</strong>
                  </Typography>
                  {d.obs && <Typography sx={{ fontSize: 13, fontStyle: 'italic', color: '#555' }}>Obs: {d.obs}</Typography>}
                </Stack>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
