import { Router } from "express";

export default (pool) => {
  const router = Router();

  // 🔹 Buscar todos os membros
  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM membros ORDER BY id DESC");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // 🔹 Inserir novo membro
  router.post("/", async (req, res) => {
    const { nome, email, telefone } = req.body;
    if (!nome || !email || !telefone)
      return res.status(400).json({ error: "Campos obrigatórios faltando" });

    try {
      const [result] = await pool.query(
        "INSERT INTO membros (nome, email, telefone) VALUES (?, ?, ?)",
        [nome, email, telefone]
      );
      res.json({ id: result.insertId, nome, email, telefone });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
