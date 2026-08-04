const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./database/conexao');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

// ==========================================
// PASSO 1: COMUNICACAO IPC BASICA (SOMA)
// ==========================================

// Exemplo: Obter tamanho do texto
ipcMain.handle('exemplo-tamanho', (event, texto) => {
  return texto.length;
});

// Exercício 1: Somar dois números (Resolvido no Main Process para fins didáticos)
ipcMain.handle('somar-numeros', (event, { a, b }) => {
  const resultado = Number(a) + Number(b);
  return resultado;
});


// ==========================================
// PASSO 2: CONSULTANDO O SQLITE (.ALL E .GET)
// ==========================================

// Exemplo: Listar todos os contatos
ipcMain.handle('exemplo-listar-todos', () => {
  try {
    const stmt = db.prepare('SELECT * FROM contatos ORDER BY nome ASC');
    return stmt.all();
  } catch (error) {
    console.error('Erro ao listar contatos:', error.message);
    return [];
  }
});

// Exercício 2: Buscar contato por e-mail
// ESCREVA AQUI:
// 1. Defina o listener 'ipcMain.handle' para o canal 'buscar-por-email'.
// 2. Prepare e execute uma query SQL usando '.get(email)' para buscar um unico contato.
// 3. Retorne o contato encontrado (ou null se nao encontrar) ou capture erros no catch.
// (Dica: Use try/catch para manter a estabilidade do processo).



// ==========================================
// PASSO 3: GRAVANDO E EXCLUINDO DADOS (.RUN)
// ==========================================

// Exemplo: Inserir novo contato
ipcMain.handle('exemplo-inserir', (event, nome, telefone, email) => {
  try {
    const stmt = db.prepare('INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)');
    const result = stmt.run(nome, telefone, email);
    
    // 'result.lastInsertRowid' é uma propriedade do SQLite que retorna o ID (número inteiro)
    // gerado automaticamente para o novo registro que acabou de ser inserido.
    return result.lastInsertRowid;
  } catch (error) {
    console.error('Erro ao inserir contato:', error.message);
    return null;
  }
});

// Exercício 3: Deletar contato por ID
// ESCREVA AQUI:
// 1. Defina o listener para o canal 'deletar-contato'.
// 2. Prepare e execute a query 'DELETE FROM contatos WHERE id = ?' usando '.run(id)'.
// 3. Retorne a quantidade de linhas alteradas (result.changes) para o renderer validar a exclusao.
// (Dica: 'result.changes' retorna a quantidade de linhas deletadas. Se for maior que 0, a exclusão deu certo).



// ==========================================
// PASSO 4: BUSCA DINAMICA (OPERADOR LIKE)
// ==========================================

// Exercício 4: Filtrar contatos por nome
// ESCREVA AQUI:
// 1. Defina o listener para o canal 'buscar-por-nome'.
// 2. Prepare a query 'SELECT * FROM contatos WHERE nome LIKE ? ORDER BY nome ASC'.
// 3. Use '.all(`%${nome}%`)' para buscar todos os registros que coincidem e retorne-os.



// ==========================================
// PASSO 5: ESTATISTICAS DO BANCO (COUNT)
// ==========================================

// Exercício 5: Obter quantidade total de contatos
// ESCREVA AQUI:
// 1. Defina o listener para o canal 'obter-total-contatos'.
// 2. Execute 'SELECT COUNT(*) as total FROM contatos' usando '.get()'.
// 3. Retorne a contagem total obtida (resultado.total).



app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
