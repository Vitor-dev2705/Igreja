import { Router } from 'express';
const router = Router();

export default (pool) => {
  // GET - Busca todas as despesas
  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM despesas ORDER BY data DESC, id DESC"
      );
      console.log(`GET /api/despesas - ${rows.length} registros encontrados`);
      res.json(rows);
    } catch (err) {
      console.error("Erro ao buscar despesas:", err);
      res.status(500).json({ erro: "Erro ao buscar despesas", detalhes: err.message });
    }
  });

  // POST - Adiciona nova despesa
  router.post("/", async (req, res) => {
    try {
      const { 
        descricao, 
        valor, 
        data, 
        categoria, 
        forma_pagamento, 
        favorecido, 
        observacoes,
        status 
      } = req.body;

      console.log("POST /api/despesas:", req.body);

      if (!descricao || !valor || !data) {
        return res.status(400).json({ 
          erro: "Descrição, valor e data são obrigatórios" 
        });
      }

      const [result] = await pool.query(
        `INSERT INTO despesas 
        (descricao, valor, data, categoria, forma_pagamento, favorecido, observacoes, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          descricao,
          parseFloat(valor),
          data,
          categoria || null,
          forma_pagamento || "dinheiro",
          favorecido || null,
          observacoes || null,
          status || "pendente"
        ]
      );

      const [novaDespesa] = await pool.query(
        "SELECT * FROM despesas WHERE id = ?",
        [result.insertId]
      );
      
      console.log("Despesa criada com ID:", result.insertId);
      res.status(201).json(novaDespesa[0]);
    } catch (err) {
      console.error("Erro ao adicionar despesa:", err);
      res.status(500).json({ erro: "Erro ao adicionar despesa", detalhes: err.message });
    }
  });

  // PUT - Atualiza despesa
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { 
        descricao, valor, data, categoria, 
        forma_pagamento, favorecido, observacoes, status 
      } = req.body;

      await pool.query(
        `UPDATE despesas 
        SET descricao = ?, valor = ?, data = ?, categoria = ?, 
            forma_pagamento = ?, favorecido = ?, observacoes = ?, status = ?
        WHERE id = ?`,
        [descricao, parseFloat(valor), data, categoria, forma_pagamento, favorecido, observacoes, status, id]
      );

      const [despesaAtualizada] = await pool.query("SELECT * FROM despesas WHERE id = ?", [id]);
      res.json(despesaAtualizada[0]);
    } catch (err) {
      console.error(`Erro ao atualizar despesa ${req.params.id}:`, err);
      res.status(500).json({ erro: "Erro ao atualizar despesa" });
    }
  });

  // DELETE - Deleta despesa
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM despesas WHERE id = ?", [id]);
      res.json({ mensagem: "Despesa deletada com sucesso", id: parseInt(id) });
    } catch (err) {
      console.error(`Erro ao deletar despesa ${req.params.id}:`, err);
      res.status(500).json({ erro: "Erro ao deletar despesa" });
    }
  });

  return router;
};
