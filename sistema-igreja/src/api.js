const BASE_URL = "http://localhost:3001/api";

/**
 * Função para processar respostas HTTP
 * @param {Response} res - Resposta do fetch
 * @param {string} route - Rota chamada (para logs)
 * @returns {Promise<any>} - Dados parseados ou null
 */
async function handleResponse(res, route) {
  const text = await res.text();
  
  // LOG para debug
  console.log(`📡 Status ${res.status} de ${route}`);
  
  if (!res.ok) {
    const msg = `Erro na requisição ${route}: ${res.status} ${res.statusText}`;
    console.error(`❌ ${msg}`);
    console.error("📄 Resposta recebida:", text);
    throw new Error(msg);
  }
  
  // Verificar se a resposta está vazia
  if (!text || text.trim() === '') {
    console.warn(`⚠️ Resposta vazia de ${route}`);
    return null;
  }
  
  try {
    const data = JSON.parse(text);
    console.log(`✅ Dados recebidos de ${route}:`, data);
    return data;
  } catch (e) {
    console.error(`❌ Erro ao parsear JSON da rota ${route}:`, e.message);
    console.error("📄 Conteúdo recebido:", text);
    throw new Error(`Conteúdo inválido recebido da rota ${route}`);
  }
}

/**
 * GET - Buscar dados
 * @param {string} route - Rota da API (ex: 'despesas', 'doacoes')
 * @returns {Promise<any>} - Dados ou array vazio em caso de erro
 */
export async function get(route) {
  try {
    console.log(`🔄 GET ${BASE_URL}/${route}`);
    const res = await fetch(`${BASE_URL}/${route}`);
    return await handleResponse(res, route);
  } catch (err) {
    console.error(`❌ Erro em GET ${route}:`, err.message);
    return []; // Retorna array vazio em caso de erro
  }
}

/**
 * POST - Criar novo registro
 * @param {string} route - Rota da API
 * @param {object} data - Dados a serem enviados
 * @returns {Promise<any>} - Dados criados ou null em caso de erro
 */
export async function post(route, data) {
  try {
    console.log(`🔄 POST ${BASE_URL}/${route}`, data);
    const res = await fetch(`${BASE_URL}/${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await handleResponse(res, route);
  } catch (err) {
    console.error(`❌ Erro em POST ${route}:`, err.message);
    throw err; // Re-throw para componente tratar
  }
}

/**
 * PUT - Atualizar registro existente
 * @param {string} route - Rota da API (ex: 'despesas/5')
 * @param {object} data - Dados a serem atualizados
 * @returns {Promise<any>} - Dados atualizados ou null em caso de erro
 */
export async function put(route, data) {
  try {
    console.log(`🔄 PUT ${BASE_URL}/${route}`, data);
    const res = await fetch(`${BASE_URL}/${route}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await handleResponse(res, route);
  } catch (err) {
    console.error(`❌ Erro em PUT ${route}:`, err.message);
    throw err; // Re-throw para componente tratar
  }
}

/**
 * DELETE - Deletar registro
 * @param {string} route - Rota da API (ex: 'despesas/5')
 * @returns {Promise<any>} - Resposta da deleção ou null em caso de erro
 */
export async function del(route) {
  try {
    console.log(`🔄 DELETE ${BASE_URL}/${route}`);
    const res = await fetch(`${BASE_URL}/${route}`, {
      method: "DELETE",
    });
    return await handleResponse(res, route);
  } catch (err) {
    console.error(`❌ Erro em DELETE ${route}:`, err.message);
    throw err; // Re-throw para componente tratar
  }
}