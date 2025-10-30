import { Router } from 'express';
const router = Router();

export default (pool) => {
  // Listar fundos
  router.get('/', (req, res) => {
    pool.query('SELECT * FROM fundos ORDER BY created_at DESC', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

  // Adicionar fundo
  router.post('/', (req, res) => {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ error: 'Nome obrigatório' });
    pool.query(
      'INSERT INTO fundos (nome) VALUES (?)',
      [nome],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: result.insertId });
      }
    );
  });

  return router;
};
