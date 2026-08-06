const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./database/conexao');

function createWindow() {
  const win = new BrowserWindow({
    width: 850,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

// ==========================================
// COZINHA (MAIN PROCESS): GESTAO DOS CONTATOS NO SQLITE
// ==========================================
//
// PADRAO DE CADA FUNCAO (EXEMPLO de como escrever):
//   ipcMain.handle('nome-do-canal', (event, dados) => {
//     try {
//       // ... usa o db para ler/escrever no SQLite
//       return { success: true, ... };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   });
// -> O try/catch garante que o app nao quebre se o banco falhar.

// 1. Listar todos os contatos (canal: 'get-contatos') - EXEMPLO PRONTO
ipcMain.handle('get-contatos', () => {
  try {
    const stmt = db.prepare('SELECT * FROM contatos ORDER BY nome ASC');
    return { success: true, data: stmt.all() };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// 2. Inserir novo contato (canal: 'add-contato')
// ESCREVA AQUI:
// 1. Defina 'ipcMain.handle('add-contato', ...)' recebendo { nome, foto_url, telefone, email }.
// 2. Prepare 'INSERT INTO contatos (nome, foto_url, telefone, email) VALUES (?, ?, ?, ?)'.
// 3. Execute com '.run(nome, foto_url, telefone, email)' e retorne
//    { success: true, id: result.lastInsertRowid }.
//    (result.lastInsertRowid = id gerado automaticamente pelo SQLite.)
// 4. Use o mesmo padrao try/catch do exemplo acima.



// 3. Excluir contato pelo id (canal: 'delete-contato')
// ESCREVA AQUI:
// 1. Defina 'ipcMain.handle('delete-contato', ...)' recebendo o id.
// 2. Prepare 'DELETE FROM contatos WHERE id = ?' e execute com '.run(id)'.
// 3. Retorne { success: true, changes: result.changes }
//    (result.changes = quantas linhas foram deletadas).
// 4. Use o mesmo padrao try/catch do exemplo acima.



app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
