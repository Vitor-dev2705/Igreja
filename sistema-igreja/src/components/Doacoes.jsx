import { useState, useEffect } from 'react'
import { get, post } from '../api' // ✅ IMPORTAR!
import {
  Box, Button, TextField, MenuItem, Select, InputLabel,
  FormControl, Typography, Paper, Stack, Grid, Snackbar,
  Alert, Divider,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'

export default function Doacoes() {
  const [doacoes, setDoacoes] = useState([])

  const fundosOptions = [
    'DÍZIMO', 'OFERTA', 'OB. RELIGIOSO', 'CASAMENTO', 'CERTIDÃO', 'DOAÇÕES',
    'CONTRIBUIÇÃO A.A', 'CRISMA', 'TRANSF. CASAMENTO', 'CURSO NOIVOS',
    'PROMOÇÕES/EVENTOS', 'ALUGUEL', 'CONTRIBUIÇÃO BATISMO'
  ]

  const formasPagamento = ['Caixa', 'Pix', 'TED', 'Banco', 'Cartão']

  const [nova, setNova] = useState({
    valor: '', data: '', fundo: '', forma: '', obs: ''
  })
  const [alerta, setAlerta] = useState({ open: false, msg: '', tipo: 'success' })

  useEffect(() => {
    get('doacoes')
      .then(data => {
        console.log('✅ Doações carregadas:', data)
        setDoacoes(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error('❌ Erro ao carregar:', err)
        setAlerta({ open: true, msg: 'Erro ao carregar doações', tipo: 'error' })
      })
  }, [])

   async function adicionar() {
    if (!nova.valor || !nova.data || !nova.fundo || !nova.forma) {
      setAlerta({ open: true, msg: 'Preencha todos os campos obrigatórios.', tipo: 'warning' })
      return
    }

    try {
      const resultado = await post('doacoes', {
        fundo: nova.fundo,
        valor: nova.valor,
        data: nova.data,
        obs: nova.obs || '',
        forma: nova.forma
      })

      if (resultado && resultado.error) {
        setAlerta({ open: true, msg: resultado.error, tipo: 'error' })
        return
      }

      if (resultado && resultado.success) {
        const doacoesAtualizadas = await get('doacoes')
        setDoacoes(Array.isArray(doacoesAtualizadas) ? doacoesAtualizadas : [])
        
        setNova({ valor: '', data: '', fundo: '', forma: '', obs: '' })
        setAlerta({ open: true, msg: '✅ Doação adicionada!', tipo: 'success' })
      }
    } catch (error) {
      console.error('Erro:', error)
      setAlerta({ open: true, msg: 'Erro ao salvar', tipo: 'error' })
    }
  }

  const cores = ['#2ecc71', '#3498db', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
  const getCorFundo = (fundo) => {
    const index = fundosOptions.findIndex(f => f === fundo)
    return cores[index % cores.length] + '22'
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 6, mb: 8, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, background: '#fafafa' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: '#2c3e50' }}>💰 Registrar Nova Doação</Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack spacing={2}>
          <TextField label="Valor (R$)" type="number" value={nova.valor} onChange={e => setNova({ ...nova, valor: e.target.value })} fullWidth variant="outlined" inputProps={{ step: '0.01', min: '0' }} />
          <TextField type="date" value={nova.data} onChange={e => setNova({ ...nova, data: e.target.value })} fullWidth InputLabelProps={{ shrink: true }} label="Data" />
          <FormControl fullWidth>
            <InputLabel>Fundo</InputLabel>
            <Select value={nova.fundo} label="Fundo" onChange={e => setNova({ ...nova, fundo: e.target.value })}>
              <MenuItem value="">Selecione o Fundo</MenuItem>
              {fundosOptions.map((fundo, idx) => (<MenuItem key={idx} value={fundo}>{fundo}</MenuItem>))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Forma de Pagamento</InputLabel>
            <Select value={nova.forma} label="Forma de Pagamento" onChange={e => setNova({ ...nova, forma: e.target.value })}>
              <MenuItem value="">Selecione a Forma</MenuItem>
              {formasPagamento.map((forma, idx) => (<MenuItem key={idx} value={forma}>{forma}</MenuItem>))}
            </Select>
          </FormControl>
          <TextField label="Observação" value={nova.obs} onChange={e => setNova({ ...nova, obs: e.target.value })} fullWidth multiline rows={2} />
          <Button variant="contained" color="primary" size="large" sx={{ mt: 1, borderRadius: 2, textTransform: 'none', fontWeight: 600 }} onClick={adicionar}>Adicionar Doação</Button>
        </Stack>
      </Paper>

      <Typography variant="h6" sx={{ mt: 6, mb: 3, fontWeight: 700, color: '#34495e', textAlign: 'center' }}>📋 Lista de Doações ({doacoes.length})</Typography>

      <Grid container spacing={3}>
        {doacoes.length === 0 && (<Grid item xs={12}><Typography sx={{ textAlign: 'center', color: 'gray' }}>Nenhuma doação registrada.</Typography></Grid>)}
        <AnimatePresence>
          {doacoes.map((d, i) => (
            <Grid item xs={12} sm={6} md={4} key={d.id || i}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Paper elevation={2} sx={{ p: 2.5, borderRadius: 3, background: getCorFundo(d.fundo_nome || d.fundo), backdropFilter: 'blur(4px)', transition: 'all 0.3s', '&:hover': { transform: 'scale(1.03)', boxShadow: '0 6px 18px rgba(0,0,0,0.12)' } }}>
                  <Stack spacing={1}>
                    <Typography sx={{ fontWeight: 700, fontSize: 18 }}>R$ {Number(d.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Typography>
                    <Typography sx={{ fontSize: 14 }}>📅 {d.data}</Typography>
                    <Typography sx={{ fontSize: 14 }}>🏦 Fundo: <strong>{d.fundo_nome || d.fundo}</strong></Typography>
                    <Typography sx={{ fontSize: 14 }}>💳 Forma: <strong>{d.forma}</strong></Typography>
                    {d.obs && (<Typography sx={{ fontSize: 13, fontStyle: 'italic', color: '#555' }}>📝 {d.obs}</Typography>)}
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      <Snackbar open={alerta.open} autoHideDuration={3000} onClose={() => setAlerta({ ...alerta, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setAlerta({ ...alerta, open: false })} severity={alerta.tipo} variant="filled">{alerta.msg}</Alert>
      </Snackbar>
    </Box>
  )
}