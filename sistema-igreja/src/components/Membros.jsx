import { useState, useEffect } from 'react'
import { get, post } from '../api'
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import GroupIcon from '@mui/icons-material/Group'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

export default function MembrosDashboard() {
  const [membros, setMembros] = useState([])
  const [novo, setNovo] = useState({ nome: '', email: '', telefone: '' })
  const [alerta, setAlerta] = useState({ open: false, tipo: 'success', mensagem: '' })
  const [membroSelecionado, setMembroSelecionado] = useState(null) // modal

  // Carrega membros do backend
  useEffect(() => {
    get('membros')
      .then(setMembros)
      .catch(() =>
        setAlerta({ open: true, tipo: 'error', mensagem: 'Erro ao carregar membros.' })
      )
  }, [])

  // Adiciona novo membro
  function adicionar() {
    if (!novo.nome || !novo.email) {
      setAlerta({ open: true, tipo: 'warning', mensagem: 'Preencha nome e email!' })
      return
    }

    post('membros', novo)
      .then((m) => {
        setMembros([...membros, m])
        setNovo({ nome: '', email: '', telefone: '' })
        setAlerta({ open: true, tipo: 'success', mensagem: 'Membro adicionado com sucesso!' })
      })
      .catch(() =>
        setAlerta({ open: true, tipo: 'error', mensagem: 'Erro ao adicionar membro.' })
      )
  }

  // Estatísticas
  const totalMembros = membros.length
  const membrosHoje = membros.filter((m) => m.adicionadoHoje)?.length || 0
  const membrosAtivos = membros.filter((m) => m.ativo !== false).length
  const cardColors = ['#2ecc71', '#3498db', '#e67e22']

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        p: 3,
        bgcolor: '#f5f6fa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#2c3e50' }}>
        Dashboard de Membros
      </Typography>

      {/* Cards de resumo */}
      <Grid container spacing={3} sx={{ mb: 5, maxWidth: 1000, justifyContent: 'center' }}>
        {[
          { titulo: 'Total de Membros', valor: totalMembros, icone: <GroupIcon sx={{ fontSize: 40 }} />, cor: cardColors[0] },
          { titulo: 'Membros Hoje', valor: membrosHoje, icone: <PersonAddIcon sx={{ fontSize: 40 }} />, cor: cardColors[1] },
          { titulo: 'Membros Ativos', valor: membrosAtivos, icone: <GroupIcon sx={{ fontSize: 40 }} />, cor: cardColors[2] },
        ].map((card, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
              <Card
                sx={{
                  p: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 4,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  background: card.cor + '33',
                  width: 250,
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#34495e' }}>{card.titulo}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
                    {card.valor}
                  </Typography>
                </Box>
                <Box sx={{ color: card.cor }}>{card.icone}</Box>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Formulário de adição */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
        sx={{ mb: 5, maxWidth: 1000 }}
      >
        <TextField
          label="Nome"
          value={novo.nome}
          onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
          fullWidth
        />
        <TextField
          label="Email"
          value={novo.email}
          onChange={(e) => setNovo({ ...novo, email: e.target.value })}
          fullWidth
        />
        <TextField
          label="Telefone"
          value={novo.telefone}
          onChange={(e) => setNovo({ ...novo, telefone: e.target.value })}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 4, py: 1.5 }}
          onClick={adicionar}
        >
          Adicionar
        </Button>
      </Stack>

      {/* Lista de membros */}
      <Grid container spacing={3} sx={{ maxWidth: 1000, justifyContent: 'center' }}>
        <AnimatePresence>
          {membros.map((m) => (
            <Grid item xs={12} sm={6} md={4} key={m.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                layout
                onClick={() => setMembroSelecionado(m)}
                style={{ cursor: 'pointer' }}
              >
                <Card
                  sx={{
                    p: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    borderRadius: 3,
                    background: '#ffffff',
                    width: 250,
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontWeight: 600, color: '#34495e' }}>
                      {m.nome}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      {m.email} — {m.telefone || '—'}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {/* Modal de detalhes do membro */}
      <Dialog
        open={Boolean(membroSelecionado)}
        onClose={() => setMembroSelecionado(null)}
      >
        <DialogTitle>Detalhes do Membro</DialogTitle>
        <DialogContent dividers>
          {membroSelecionado && (
            <>
              <Typography sx={{ mb: 1 }}><strong>Nome:</strong> {membroSelecionado.nome}</Typography>
              <Typography sx={{ mb: 1 }}><strong>Email:</strong> {membroSelecionado.email}</Typography>
              <Typography sx={{ mb: 1 }}><strong>Telefone:</strong> {membroSelecionado.telefone || '—'}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMembroSelecionado(null)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Alertas */}
      <Snackbar
        open={alerta.open}
        autoHideDuration={3000}
        onClose={() => setAlerta({ ...alerta, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={alerta.tipo} sx={{ width: '100%' }}>
          {alerta.mensagem}
        </Alert>
      </Snackbar>
    </Box>
  )
}
