import { useState, useEffect } from 'react'
import { get, post, put, del } from '../api'
import {
  Box, Button, TextField, MenuItem, Select, InputLabel, FormControl,
  Typography, Paper, Stack, Grid, Snackbar, Alert, Divider, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material'
import { motion } from 'framer-motion'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const MotionPaper = motion(Paper)

const categorias = [
  'Salários',
  'Energia',
  'Água',
  'Telefone',
  'Internet',
  'Manutenção',
  'Material de Limpeza',
  'Material de Escritório',
  'Impostos',
  'Outros'
]

const formasPagamento = ['Dinheiro', 'Pix', 'Cartão', 'TED', 'Boleto']
const statusOptions = ['pendente', 'pago', 'cancelado']

export default function Despesas() {
  const [despesas, setDespesas] = useState([])
  const [form, setForm] = useState({
    descricao: '',
    valor: '',
    data: new Date().toISOString().split('T')[0],
    categoria: '',
    forma_pagamento: 'Dinheiro',
    favorecido: '',
    observacoes: '',
    status: 'pendente'
  })
  const [editando, setEditando] = useState(null)
  const [snack, setSnack] = useState({ open: false, msg: '', tipo: 'success' })

  useEffect(() => {
    buscarDespesas()
  }, [])

  async function buscarDespesas() {
    try {
      const dados = await get('despesas')
      setDespesas(Array.isArray(dados) ? dados : [])
    } catch (err) {
      console.error('Erro ao buscar despesas:', err)
      setSnack({ open: true, msg: 'Erro ao buscar despesas', tipo: 'error' })
      setDespesas([])
    }
  }

  async function salvar() {
    try {
      if (!form.descricao || !form.valor || !form.data) {
        setSnack({ open: true, msg: 'Preencha todos os campos obrigatórios', tipo: 'warning' })
        return
      }

      if (editando) {
        await put(`despesas/${editando}`, form)
        setSnack({ open: true, msg: 'Despesa atualizada com sucesso!', tipo: 'success' })
      } else {
        await post('despesas', form)
        setSnack({ open: true, msg: 'Despesa cadastrada com sucesso!', tipo: 'success' })
      }

      limparForm()
      buscarDespesas()
    } catch (err) {
      console.error('Erro ao salvar:', err)
      setSnack({ open: true, msg: 'Erro ao salvar despesa', tipo: 'error' })
    }
  }

  async function deletarDespesa(id) {
    if (!confirm('Deseja realmente deletar esta despesa?')) return

    try {
      await del(`despesas/${id}`)
      setSnack({ open: true, msg: 'Despesa deletada com sucesso!', tipo: 'success' })
      buscarDespesas()
    } catch (err) {
      console.error('❌ Erro ao deletar:', err)
      setSnack({ open: true, msg: 'Erro ao deletar despesa', tipo: 'error' })
    }
  }

  function editarDespesa(desp) {
    setForm({
      descricao: desp.descricao || '',
      valor: desp.valor || '',
      data: desp.data ? desp.data.split('T')[0] : new Date().toISOString().split('T')[0],
      categoria: desp.categoria || '',
      forma_pagamento: desp.forma_pagamento || 'Dinheiro',
      favorecido: desp.favorecido || '',
      observacoes: desp.observacoes || '',
      status: desp.status || 'pendente'
    })
    setEditando(desp.id)
  }

  function limparForm() {
    setForm({
      descricao: '',
      valor: '',
      data: new Date().toISOString().split('T')[0],
      categoria: '',
      forma_pagamento: 'Dinheiro',
      favorecido: '',
      observacoes: '',
      status: 'pendente'
    })
    setEditando(null)
  }

  // Funções auxiliares para formatação
  function formatarValor(valor) {
    const num = parseFloat(valor)
    return isNaN(num) ? 'R$ 0,00' : `R$ ${num.toFixed(2).replace('.', ',')}`
  }

  function formatarData(dataStr) {
    if (!dataStr) return 'Data inválida'
    try {
      const data = new Date(dataStr)
      // Adiciona 1 dia para corrigir timezone
      data.setDate(data.getDate() + 1)
      return data.toLocaleDateString('pt-BR')
    } catch {
      return 'Data inválida'
    }
  }

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        💰 Gerenciar Despesas
      </Typography>

      {/* FORMULÁRIO */}
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ p: 3, mb: 4 }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {editando ? '✏️ Editar Despesa' : '➕ Nova Despesa'}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Descrição *"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Valor *"
              type="number"
              value={form.valor}
              onChange={(e) => setForm({ ...form, valor: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Data *"
              type="date"
              value={form.data}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={form.categoria}
                label="Categoria"
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              >
                <MenuItem value="">Nenhuma</MenuItem>
                {categorias.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Forma de Pagamento</InputLabel>
              <Select
                value={form.forma_pagamento}
                label="Forma de Pagamento"
                onChange={(e) => setForm({ ...form, forma_pagamento: e.target.value })}
              >
                {formasPagamento.map((fp) => (
                  <MenuItem key={fp} value={fp}>{fp}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={form.status}
                label="Status"
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                {statusOptions.map((st) => (
                  <MenuItem key={st} value={st}>{st}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Favorecido"
              value={form.favorecido}
              onChange={(e) => setForm({ ...form, favorecido: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Observações"
              value={form.observacoes}
              onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button variant="contained" startIcon={editando ? <EditIcon /> : <AddIcon />} onClick={salvar}>
            {editando ? 'Atualizar' : 'Cadastrar'}
          </Button>
          {editando && (
            <Button variant="outlined" onClick={limparForm}>
              Cancelar
            </Button>
          )}
        </Stack>
      </MotionPaper>

      {/* TABELA */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Descrição</strong></TableCell>
              <TableCell><strong>Valor</strong></TableCell>
              <TableCell><strong>Data</strong></TableCell>
              <TableCell><strong>Categoria</strong></TableCell>
              <TableCell><strong>Forma Pgto</strong></TableCell>
              <TableCell><strong>Favorecido</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {despesas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    Nenhuma despesa cadastrada
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              despesas.map((desp) => (
                <TableRow key={desp.id} hover>
                  <TableCell>{desp.id}</TableCell>
                  <TableCell>{desp.descricao}</TableCell>
                  <TableCell>{formatarValor(desp.valor)}</TableCell>
                  <TableCell>{formatarData(desp.data)}</TableCell>
                  <TableCell>{desp.categoria || '-'}</TableCell>
                  <TableCell>{desp.forma_pagamento || '-'}</TableCell>
                  <TableCell>{desp.favorecido || '-'}</TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: desp.status === 'pago' ? '#e8f5e9' : '#fff3e0',
                        color: desp.status === 'pago' ? '#2e7d32' : '#e65100'
                      }}
                    >
                      {desp.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton size="small" color="primary" onClick={() => editarDespesa(desp)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => deletarDespesa(desp.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* SNACKBAR */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.tipo} onClose={() => setSnack({ ...snack, open: false })}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  )
}