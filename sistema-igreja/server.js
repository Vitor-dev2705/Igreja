import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 🧩 Middleware
app.use(cors());
app.use(express.json());

//Conexão com o banco de dados igreja_db
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "igreja_db", // 👈 nome do banco fixo ou via .env
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//Importação das rotas
import membrosRoutes from "./routes/membros.js";
import fundosRoutes from "./routes/fundos.js";
import doacoesRoutes from "./routes/doacoes.js";
import despesasRoutes from "./routes/despesas.js";

//Rotas com o pool injetado
app.use("/membros", membrosRoutes(pool));
app.use("/fundos", fundosRoutes(pool));
app.use("/doacoes", doacoesRoutes(pool));
app.use("/despesas", despesasRoutes(pool));

// Inicializa o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`)
);
