import { Router } from 'express';
const router = Router();

export default (pool) => {
  router.get('/', async (req, res) => {
    try {
      const mesAtual = new Date().getMonth() + 1;
      const anoAtual = new Date().getFullYear();

      console.log('GET /api/dashboard - Mês:', mesAtual, 'Ano:', anoAtual);

      // 1. Doações de hoje
      const [doacoesHoje] = await pool.query(
        'SELECT COALESCE(SUM(valor), 0) as total FROM doacoes WHERE DATE(data) = CURDATE()'
      );

      // 2. Despesas de hoje (TODAS, não apenas pendentes)
      const [despesasHoje] = await pool.query(
        'SELECT COALESCE(SUM(valor), 0) as total FROM despesas WHERE DATE(data) = CURDATE()'
      );

      // 3. Receita do mês
      const [receitaMes] = await pool.query(
        'SELECT COALESCE(SUM(valor), 0) as total FROM doacoes WHERE MONTH(data) = ? AND YEAR(data) = ?',
        [mesAtual, anoAtual]
      );

      // 4. Despesas do mês
      const [despesasMes] = await pool.query(
        'SELECT COALESCE(SUM(valor), 0) as total FROM despesas WHERE MONTH(data) = ? AND YEAR(data) = ?',
        [mesAtual, anoAtual]
      );

      // 5. Faturamento do mês
      const faturamentoMes = parseFloat(receitaMes[0].total) - parseFloat(despesasMes[0].total);

      // 6. Doações vs Despesas por mês (últimos 12 meses)
      const [receitaDespesaData] = await pool.query(`
        SELECT 
          DATE_FORMAT(data, '%b') as mes,
          MONTH(data) as mes_num,
          YEAR(data) as ano,
          'doacao' as tipo,
          SUM(valor) as total
        FROM doacoes
        WHERE data >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        GROUP BY YEAR(data), MONTH(data)
        
        UNION ALL
        
        SELECT 
          DATE_FORMAT(data, '%b') as mes,
          MONTH(data) as mes_num,
          YEAR(data) as ano,
          'despesa' as tipo,
          SUM(valor) as total
        FROM despesas
        WHERE data >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        GROUP BY YEAR(data), MONTH(data)
        
        ORDER BY ano, mes_num
      `);

      // Transformar para formato do gráfico
      const mesesData = {};
      receitaDespesaData.forEach(row => {
        const key = `${row.mes}/${row.ano}`;
        if (!mesesData[key]) {
          mesesData[key] = { mes: row.mes, receita: 0, despesa: 0 };
        }
        if (row.tipo === 'doacao') {
          mesesData[key].receita = parseFloat(row.total);
        } else {
          mesesData[key].despesa = parseFloat(row.total);
        }
      });

      const receitaDespesaArray = Object.values(mesesData);

      // 7. Despesas por Categoria (CORRIGIDO - MÊS ATUAL)
      const [despesasCat] = await pool.query(
        `SELECT 
          COALESCE(categoria, 'Sem Categoria') as categoria,
          SUM(valor) as total
        FROM despesas
        WHERE MONTH(data) = ? AND YEAR(data) = ?
        GROUP BY categoria
        ORDER BY total DESC
        LIMIT 5`,
        [mesAtual, anoAtual]
      );

      console.log('📊 Despesas por categoria encontradas:', despesasCat.length);

      const totalDespesas = despesasCat.reduce((acc, d) => acc + parseFloat(d.total), 0);
      const cores = ['#FF7F50', '#FFA500', '#1E90FF', '#9370DB', '#32CD32'];
      
      const despesasPorCategoria = despesasCat.map((d, i) => ({
        nome: d.categoria,
        valor: totalDespesas > 0 ? parseFloat(((parseFloat(d.total) / totalDespesas) * 100).toFixed(1)) : 0,
        cor: cores[i]
      }));

      // 8. Doações por Fundo (Top 5)
      let doacoesPorFundo = [];
      try {
        const [doacoesFundo] = await pool.query(
          `SELECT 
            f.nome as fundo,
            SUM(d.valor) as total
          FROM doacoes d
          JOIN fundos f ON d.fundoid = f.id
          WHERE MONTH(d.data) = ? AND YEAR(d.data) = ?
          GROUP BY f.nome
          ORDER BY total DESC
          LIMIT 5`,
          [mesAtual, anoAtual]
        );

        const totalFundos = doacoesFundo.reduce((acc, d) => acc + parseFloat(d.total), 0);
        const coresFundos = ['#2ecc71', '#3498db', '#e67e22', '#9b59b6', '#e74c3c'];
        
        doacoesPorFundo = doacoesFundo.map((d, i) => ({
          nome: d.fundo,
          valor: totalFundos > 0 ? parseFloat(((parseFloat(d.total) / totalFundos) * 100).toFixed(1)) : 0,
          cor: coresFundos[i]
        }));

        console.log('📊 Doações por fundo encontradas:', doacoesFundo.length);
      } catch (errFundo) {
        console.warn('⚠️ Sem doações por fundo:', errFundo.message);
      }

      const dados = {
        vendasHoje: parseFloat(doacoesHoje[0].total),
        planoHoje: parseFloat(despesasHoje[0].total),
        receitaHoje: parseFloat(doacoesHoje[0].total),
        pagamentoMes: faturamentoMes,
        receitaDespesaData: receitaDespesaArray,
        vendasComprasData: [],
        despesasPorCategoria,
        doacoesPorFundo
      };

      console.log('✅ Dashboard completo:', JSON.stringify(dados, null, 2));
      res.json(dados);
    } catch (err) {
      console.error('❌ Erro dashboard:', err);
      res.status(500).json({ erro: err.message });
    }
  });

  return router;
};
