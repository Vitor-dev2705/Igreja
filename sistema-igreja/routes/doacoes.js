import { Router } from 'express';
const router = Router();

export default (pool) => {
  // GET - Lista doações
  router.get('/', async (req, res) => {
    try {
      console.log('GET /api/doacoes - Buscando doações...');
      
      const [results] = await pool.query(
        `SELECT d.*, f.nome as fundo_nome 
         FROM doacoes d 
         JOIN fundos f ON d.fundoid = f.id 
         ORDER BY d.createdat DESC`
      );
      
      console.log(`GET /api/doacoes - ${results.length} registros encontrados`);
      res.json(results);
    } catch (err) {
      console.error('Erro GET /api/doacoes:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // POST - Adiciona doação
  router.post('/', async (req, res) => {
    try {
      const { fundo, valor, data, obs, forma } = req.body;

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('POST /api/doacoes - Dados recebidos:');
      console.log('   fundo:', fundo);
      console.log('   valor:', valor);
      console.log('   data:', data);
      console.log('   obs:', obs);
      console.log('   forma:', forma);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      // Validação
      if (!fundo || !valor || !data) {
        console.error('❌ Campos obrigatórios faltando!');
        return res.status(400).json({ 
          error: 'Campos obrigatórios: fundo, valor e data'
        });
      }

      // Buscar ID do fundo
      console.log('Buscando fundo:', fundo);
      const [fundos] = await pool.query('SELECT id FROM fundos WHERE nome = ?', [fundo]);
      
      if (!fundos.length) {
        console.error('Fundo não encontrado:', fundo);
        return res.status(400).json({ 
          error: `Fundo "${fundo}" não encontrado`
        });
      }
      
      const fundoid = fundos[0].id;
      console.log(`Fundo encontrado: ${fundo} (ID: ${fundoid})`);

      // Inseri doação
      console.log('Inserindo doação...');
      const [result] = await pool.query(
        'INSERT INTO doacoes (fundoid, valor, data, obs, forma) VALUES (?, ?, ?, ?, ?)',
        [fundoid, valor, data, obs || '', forma || '']
      );
      
      console.log('Doação inserida com ID:', result.insertId);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      res.status(201).json({
        success: true,
        id: result.insertId,
        fundoid,
        valor,
        data,
        obs: obs || '',
        forma: forma || ''
      });
    } catch (err) {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('   ERRO ao adicionar doação:');
      console.error('   Mensagem:', err.message);
      console.error('   Stack:', err.stack);
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};