import { Box, Typography, TextField, Button } from '@mui/material'
import PageTemplate from './PageTemplate'

export default function Configuracoes() {
  function salvar() {
    // placeholder: salvar ajustes
    console.log('Salvar configurações')
  }

  return (
    <PageTemplate titulo="⚙️ Configurações" descricao="Ajustes e preferências do sistema." maxWidth={700}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nome da Comunidade" fullWidth defaultValue="Comunidade Nossa Senhora do Perpétuo Socorro" />
        <TextField label="Fuso horário" fullWidth defaultValue="America/Sao_Paulo" />
        <TextField label="Contato administrativo" fullWidth />
        <Button variant="contained" onClick={salvar} sx={{ background: 'linear-gradient(90deg, #66A5AD, #8C6BB1)' }}>Salvar</Button>
      </Box>
    </PageTemplate>
  )
}
