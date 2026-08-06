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

// 1. Listar todos os contatos (canal: 'get-contatos')
// ESCREVA AQUI:
// 1. Defina 'ipcMain.handle('get-contatos', ...)'.
// 2. Prepare e execute 'SELECT * FROM contatos ORDER BY nome ASC' usando '.all()'.
// 3. Retorne { success: true, data } (no erro, { success: false, error } dentro do catch).
//
// (Dica: use try/catch para o app nao quebrar se o banco falhar.)



// 2. Inserir novo contato (canal: 'add-contato')
// ESCREVA AQUI:
// 1. Defina 'ipcMain.handle('add-contato', ...)' recebendo { nome, foto_url, telefone, email }.
// 2. Prepare 'INSERT INTO contatos (nome, foto_url, telefone, email) VALUES (?, ?, ?, ?)'.
// 3. Execute com '.run(nome, foto_url, telefone, email)' e retorne { success: true, id: result.lastInsertRowid }.
//    (result.lastInsertRowid = id gerado automaticamente pelo SQLite.)



// 3. Excluir contato pelo id (canal: 'delete-contato')
// ESCREVA AQUI:
// 1. Defina 'ipcMain.handle('delete-contato', ...)' recebendo o id.
// 2. Prepare 'DELETE FROM contatos WHERE id = ?' e execute com '.run(id)'.
// 3. Retorne { success: true, changes: result.changes } (result.changes = quantas linhas foram deletadas).



app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
