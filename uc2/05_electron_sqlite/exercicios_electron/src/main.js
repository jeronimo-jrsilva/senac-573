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
    return { success: true, data: stmt.all() };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Exercício 2: Buscar contato por e-mail
// ESCREVA AQUI:
// 1. Defina o listener 'ipcMain.handle' para o canal 'buscar-por-email'.
// 2. Prepare e execute uma query SQL usando '.get(email)' para buscar um unico contato.
// 3. Retorne um objeto { success: true, data: contato } ou captures erros no catch.
// (Dica: Use try/catch para manter a estabilidade do processo).



// ==========================================
// PASSO 3: GRAVANDO E EXCLUINDO DADOS (.RUN)
// ==========================================

// Exemplo: Inserir novo contato
ipcMain.handle('exemplo-inserir', (event, { nome, telefone, email }) => {
  try {
    const stmt = db.prepare('INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)');
    const result = stmt.run(nome, telefone, email);
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Exercício 3: Deletar contato por ID
// ESCREVA AQUI:
// 1. Defina o listener para o canal 'deletar-contato'.
// 2. Prepare e execute a query 'DELETE FROM contatos WHERE id = ?' usando '.run(id)'.
// 3. Retorne { success: true, changes: result.changes } para o renderer validar a exclusao.



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
// 3. Retorne { success: true, total: resultado.total }.



app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
