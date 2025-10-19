import React, { useState } from 'react'
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material'
import * as XLSX from 'xlsx'

const categoriasFixas = [
  'DZIMO', 'OFERTA', 'CASAMENTO', 'CERTIDO', 'DOAES', 'PROMOESEVENTOS', 'ALUGUEL', 'DESPESA' // Inclua o que quiser
]

export default function Dashboard() {
  const [totais, setTotais] = useState({})

  // Função para importar e processar planilha XLSX
  function handleFile(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = evt => {
      const data = new Uint8Array(evt.target.result)
      const workbook = XLSX.read(data, { type: 'array' })

      // Pega a primeira aba (sheet) encontrada
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 })

      // Procura o índice das colunas por nome (categorias)
      const headerRow = rows.find(row => row.includes('DZIMO') || row.includes('OFERTA'))
      const catIndices = {}
      categoriasFixas.forEach(cat => {
        catIndices[cat] = headerRow?.indexOf(cat)
      })

      // Soma o valor das colunas por categoria
      const somas = {}
      categoriasFixas.forEach(cat => somas[cat] = 0)
      rows.forEach((row, i) => {
        if (i === 0) return // pula cabeçalho
        categoriasFixas.forEach(cat => {
          const idx = catIndices[cat]
          if (idx && !isNaN(row[idx])) somas[cat] += Number(row[idx])
        })
      })
      setTotais(somas)
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Dashboard Financeiro Automatizado
      </Typography>
      <input type="file" onChange={handleFile} accept=".xls,.xlsx"/>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {Object.keys(totais).map(cat => (
          <Grid item xs={12} sm={6} md={4} key={cat}>
            <Card>
              <CardContent>
                <Typography variant="h6">{cat}</Typography>
                <Typography variant="h5" sx={{ color: cat.includes('DESPESA') ? "error.main" : "success.main" }}>
                  R$ {totais[cat]?.toLocaleString('pt-BR', { minimumFractionDigits:2 })}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
