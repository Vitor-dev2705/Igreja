import express from "express";

export default function (pool) {
  const router = express.Router();

  // GET - Resumo financeiro
  router.get("/", async (req, res) => {
    try {
      // Total de doações
      const [doacoes] = await pool.query(
        "SELECT SUM(valor) as total FROM doacoes"
      );
      
      // Total de despesas
      const [despesas] = await pool.query(
        "SELECT SUM(valor) as total FROM despesas"
      );

      const totalDoacoes = doacoes[0].total || 0;
      const totalDespesas = despesas[0].total || 0;
      const saldo = totalDoacoes - totalDespesas;

      res.json({
        totalDoacoes,
        totalDespesas,
        saldo,
      });
    } catch (err) {
      console.error("Erro ao buscar resumo financeiro:", err);
      res.status(500).json({ error: "Erro ao buscar resumo" });
    }
  });

  return router;
}
