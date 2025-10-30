import { Router } from 'express';
const router = Router();

export default (pool) => {
  // Listar doações
  router.get('/', (req, res) => {
    pool.query(
      `SELECT d.*, m.nome as membro_nome, f.nome as fundo_nome 
       FROM doacoes d 
       JOIN membros m ON d.membro_id = m.id 
       JOIN fundos f ON d.fundo_id = f.id 
       ORDER BY d.created_at DESC`,
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
      }
    );
  });

  // Adicionar doação
  router.post('/', (req, res) => {
    const { membroId, fundo, valor, data, obs } = req.body;
    pool.query('SELECT id FROM fundos WHERE nome = ?', [fundo], (err, fundos) => {
      if (err || fundos.length === 0) return res.status(400).json({ error: 'Fundo não encontrado' });
      const fundoId = fundos[0].id;
      pool.query(
        'INSERT INTO doacoes (membro_id, fundo_id, valor, data, obs) VALUES (?, ?, ?, ?, ?)',
        [membroId, fundoId, valor, data, obs],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ success: true, id: result.insertId });
        }
      );
    });
  });

  return router;
};
