import { Router } from 'express';
const router = Router();

export default (pool) => {
  // Listar despesas
  router.get('/', (req, res) => {
    pool.query(
      `SELECT d.*, f.nome as fundo_nome 
       FROM despesas d 
       JOIN fundos f ON d.fundo_id = f.id 
       ORDER BY d.created_at DESC`,
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
      }
    );
  });

  // Adicionar despesa
  router.post('/', (req, res) => {
    const { fundo, valor, data, categoria, obs } = req.body;
    pool.query('SELECT id FROM fundos WHERE nome = ?', [fundo], (err, fundos) => {
      if (err || fundos.length === 0) return res.status(400).json({ error: 'Fundo não encontrado' });
      const fundoId = fundos[0].id;
      pool.query(
        'INSERT INTO despesas (fundo_id, valor, data, categoria, obs) VALUES (?, ?, ?, ?, ?)',
        [fundoId, valor, data, categoria, obs],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ success: true, id: result.insertId });
        }
      );
    });
  });

  return router;
};
