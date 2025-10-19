import { useState, useEffect } from 'react'
import { Box, Grid, Card, CardContent, Typography, Paper, Stack } from '@mui/material'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    vendasHoje: 0,
    planoHoje: 0,
    receitaHoje: 0,
    pagamentoMes: 0,
    receitaDespesaData: [],
    vendasComprasData: [],
    despesasPorCategoria: [],
  });

  useEffect(() => {
    async function buscarDados() {
      const res = await fetch('http://localhost:3001/dashboard');
      const dados = await res.json();
      setDashboard({
        vendasHoje: dados.vendasHoje,
        planoHoje: dados.planoHoje,
        receitaHoje: dados.receitaHoje,
        pagamentoMes: dados.pagamentoMes,
        receitaDespesaData: dados.receitaDespesaData,
        vendasComprasData: dados.vendasComprasData,
        despesasPorCategoria: dados.despesasPorCategoria,
      });
    }
    buscarDados();
  }, []);

  const cardColors = ['#24b36b', '#e74c3c', '#3498db', '#11b5b8'];

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f6f8fa', p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Cards do topo */}
      <Grid container spacing={2}>
        {[
          { cor: cardColors[0], titulo: 'VENDAS DE HOJE', valor: dashboard.vendasHoje, icone: <TrendingUpIcon sx={{ fontSize: 30 }} /> },
          { cor: cardColors[1], titulo: 'A PAGAR DE HOJE', valor: dashboard.planoHoje, icone: <AttachMoneyIcon sx={{ fontSize: 30 }} /> },
          { cor: cardColors[2], titulo: 'A RECEBER DE HOJE', valor: dashboard.receitaHoje, icone: <TrendingUpIcon sx={{ fontSize: 30 }} /> },
          { cor: cardColors[3], titulo: 'FATURAMENTO DO MÊS', valor: dashboard.pagamentoMes, icone: <AttachMoneyIcon sx={{ fontSize: 30 }} /> },
        ].map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card elevation={2} sx={{ display: 'flex', alignItems: 'center', p: 0.5, bgcolor: card.cor, color: '#fff', borderRadius: 2 }}>
              <Box sx={{ flex: 1 }}>
                <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, opacity: 0.85 }}>{card.titulo}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                    {card.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </Typography>
                </CardContent>
              </Box>
              <Box sx={{ pr: 2 }}>{card.icone}</Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Área de gráficos */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Coluna esquerda - gráficos de linha */}
        <Grid item xs={12} md={8}>
          {/* Receita x Despesa */}
          <Paper elevation={1} sx={{ p: 2, mb: 3, height: 400 }}>
            <Typography sx={{ fontWeight: 700, color: '#34496d', mb: 1 }}>
              Receita x Despesa <span style={{ color: '#999', fontWeight: 400, fontSize: 13 }}>(2022-2025)</span>
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={dashboard.receitaDespesaData}>
                <defs>
                  <linearGradient id="color2022" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e74c3c" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#e74c3c" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="color2023" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#95A5A6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#95A5A6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="color2024" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498db" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="color2025" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9B59B6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9B59B6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECF0F1" />
                <XAxis dataKey="mes" stroke="#888" style={{ fontSize: 12 }} />
                <YAxis stroke="#888" style={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="2022" stroke="#e74c3c" fillOpacity={1} fill="url(#color2022)" strokeWidth={2} />
                <Area type="monotone" dataKey="2023" stroke="#95A5A6" fillOpacity={1} fill="url(#color2023)" strokeWidth={2} />
                <Area type="monotone" dataKey="2024" stroke="#3498db" fillOpacity={1} fill="url(#color2024)" strokeWidth={2} />
                <Area type="monotone" dataKey="2025" stroke="#9B59B6" fillOpacity={1} fill="url(#color2025)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>

          {/* Vendas x Compras */}
          <Paper elevation={1} sx={{ p: 2, height: 350 }}>
            <Typography sx={{ fontWeight: 700, color: '#34496d', mb: 1 }}>
              Vendas x Compras <span style={{ color: '#999', fontWeight: 400, fontSize: 13 }}>(2022-2025)</span>
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={dashboard.vendasComprasData}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498db" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECF0F1" />
                <XAxis dataKey="mes" stroke="#888" style={{ fontSize: 12 }} />
                <YAxis stroke="#888" style={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="vendas" stroke="#3498db" fillOpacity={1} fill="url(#colorVendas)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Coluna direita - gráfico de pizza */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography sx={{ fontWeight: 700, color: '#34496d', mb: 1 }}>
              Despesas por Categoria
              <span style={{ color: '#999', fontWeight: 400, fontSize: 13, marginLeft: 8 }}>
                01/08/2022 a 01/08/2023
              </span>
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={dashboard.despesasPorCategoria} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="valor">
                  {dashboard.despesasPorCategoria.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip formatter={value => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>

            <Box sx={{ mt: 2 }}>
              <Grid container spacing={1}>
                {dashboard.despesasPorCategoria.map((cat, idx) => (
                  <Grid item xs={6} key={idx}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '9px', backgroundColor: cat.cor }} />
                      <Typography variant="caption" sx={{ fontSize: 12 }}>{cat.nome}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
