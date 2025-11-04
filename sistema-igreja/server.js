// server.js
import express from 'express';
import cors from 'cors';
import pool from './db.js';
import doacoesRoutes from './routes/doacoes.js';
import despesasRoutes from './routes/despesas.js'; // ✅ ADICIONAR
import dashboardRoutes from './routes/dashboard.js';
import fundosRoutes from './routes/fundos.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Rotas
app.use('/api/doacoes', doacoesRoutes(pool));
app.use('/api/despesas', despesasRoutes(pool)); // ✅ ADICIONAR
app.use('/api/dashboard', dashboardRoutes(pool));
app.use('/api/fundos', fundosRoutes(pool));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
