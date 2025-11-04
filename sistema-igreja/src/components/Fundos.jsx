import { useState, useEffect } from 'react';
import { get } from '../api';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const MotionCard = motion(Card);

export default function Doacoes() {
  const [doacoes, setDoacoes] = useState([]);

  useEffect(() => {
    get('doacoes').then(setDoacoes);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 5,
        px: 2,
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #fdfaf6, #f0f7f4)',
        pb: 5,
      }}
    >
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 800,
          backgroundColor: '#ffffffdd',
          backdropFilter: 'blur(6px)',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#2c3e50' }}>
          Controle de Doações
        </Typography>

        <Grid container spacing={2}>
          <AnimatePresence>
            {doacoes.map(d => (
              <Grid item xs={12} sm={6} md={4} key={d.id}>
                <MotionCard
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    bgcolor: '#fefefe',
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontWeight: 700, color: '#2c3e50' }}>
                      R$ {Number(d.valor).toLocaleString('pt-BR')}
                    </Typography>
                    <Typography color="text.secondary">
                      {d.data} • {d.doador}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>{d.obs}</Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Paper>
    </Box>
  );
}