import { useState, useEffect } from 'react'
import { get } from '../api'
import {
  Box, Grid, Card, Typography, Paper, Stack, Divider,
  AppBar, Toolbar, MenuItem, Select
} from '@mui/material'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { motion } from 'framer-motion'

const MotionCard = motion(Card)
const MotionPaper = motion(Paper)

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    vendasHoje: 0,
    planoHoje: 0,
    receitaHoje: 0,
    pagamentoMes: 0,
    receitaDespesaData: [],
    vendasComprasData: [],
    despesasPorCategoria: [],
    doacoesPorFundo: [] // ✅ ADICIONAR
  })

  const [periodo, setPeriodo] = useState('Mensal')

  useEffect(() => {
    async function buscarDados() {
      try {
        console.log('Buscando dados do dashboard...')
        const dados = await get('dashboard')
        
        console.log('Dados recebidos:', dados)
        
        setDashboard({
          vendasHoje: dados.vendasHoje || 0,
          planoHoje: dados.planoHoje || 0,
          receitaHoje: dados.receitaHoje || 0,
          pagamentoMes: dados.pagamentoMes || 0,
          receitaDespesaData: dados.receitaDespesaData || [],
          vendasComprasData: dados.vendasComprasData || [],
          despesasPorCategoria: dados.despesasPorCategoria || [],
          doacoesPorFundo: dados.doacoesPorFundo || [] // ✅ ADICIONAR
        })
      } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err)
      }
    }
    buscarDados()
  }, [])

  const cardColors = ['#FFDAB9', '#FFE4B5', '#B0E0E6', '#E6E6FA']

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #fff7e6, #e6f2ff)',
        pb: 5,
      }}
    >
      {/* HEADER FIXO */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
          color: '#2c3e50',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarMonthIcon sx={{ fontSize: 28, color: '#FF8C00' }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Painel da Igreja
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Select
              size="small"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              sx={{
                bgcolor: '#fff',
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              }}
            >
              <MenuItem value="Diário">Diário</MenuItem>
              <MenuItem value="Semanal">Semanal</MenuItem>
              <MenuItem value="Mensal">Mensal</MenuItem>
              <MenuItem value="Anual">Anual</MenuItem>
            </Select>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* CARDS PRINCIPAIS */}
      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {[
            { cor: cardColors[0], titulo: 'Doações Hoje', valor: dashboard.vendasHoje, icone: <TrendingUpIcon sx={{ fontSize: 45, color: '#FF7F50' }} /> },
            { cor: cardColors[1], titulo: 'Despesas Hoje', valor: dashboard.planoHoje, icone: <AttachMoneyIcon sx={{ fontSize: 45, color: '#FFA500' }} /> },
            { cor: cardColors[2], titulo: 'Receita Hoje', valor: dashboard.receitaHoje, icone: <TrendingUpIcon sx={{ fontSize: 45, color: '#1E90FF' }} /> },
            { cor: cardColors[3], titulo: 'Faturamento do Mês', valor: dashboard.pagamentoMes, icone: <AttachMoneyIcon sx={{ fontSize: 45, color: '#9370DB' }} /> },
          ].map((card, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <MotionCard
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                sx={{
                  p: 4,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 16,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  background: card.cor,
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#2c3e50' }}>
                    {card.titulo}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, mt: 1, color: '#2c3e50' }}>
                    {card.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </Typography>
                </Box>
                {card.icone}
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        {/* GRÁFICOS */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Receita x Despesa */}
          <Grid item xs={12} md={8}>
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              sx={{ p: 4, borderRadius: 16, boxShadow: '0 6px 20px rgba(0,0,0,0.15)', background: '#fff' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
                Receita x Despesa (Últimos 12 meses)
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={dashboard.receitaDespesaData}>
                  <defs>
                    <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2ecc71" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e74c3c" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#e74c3c" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="mes" stroke="#7f8c8d" />
                  <YAxis stroke="#7f8c8d" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="receita" stroke="#2ecc71" fill="url(#colorReceita)" strokeWidth={2} />
                  <Area type="monotone" dataKey="despesa" stroke="#e74c3c" fill="url(#colorDespesa)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </MotionPaper>
          </Grid>

          {/* Despesas por Categoria */}
          <Grid item xs={12} md={4}>
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              sx={{ p: 4, borderRadius: 16, boxShadow: '0 6px 20px rgba(0,0,0,0.15)', background: '#fff' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
                Despesas por Categoria
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboard.despesasPorCategoria}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="valor"
                  >
                    {dashboard.despesasPorCategoria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={1}>
                {dashboard.despesasPorCategoria.map((cat, idx) => (
                  <Grid item xs={12} key={idx}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: cat.cor }} />
                      <Typography variant="caption" sx={{ fontSize: 13, color: '#2c3e50' }}>
                        {cat.nome} ({cat.valor}%)
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </MotionPaper>
          </Grid>

          {/* ✅ DOAÇÕES POR FUNDO */}
          <Grid item xs={12} md={6}>
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              sx={{ p: 4, borderRadius: 16, boxShadow: '0 6px 20px rgba(0,0,0,0.15)', background: '#fff' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
                Doações por Fundo (Top 5)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboard.doacoesPorFundo}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="valor"
                  >
                    {dashboard.doacoesPorFundo.map((entry, index) => (
                      <Cell key={`cell-fundo-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={1}>
                {dashboard.doacoesPorFundo.map((fundo, idx) => (
                  <Grid item xs={12} key={idx}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: fundo.cor }} />
                      <Typography variant="caption" sx={{ fontSize: 13, color: '#2c3e50' }}>
                        {fundo.nome} ({fundo.valor}%)
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </MotionPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}