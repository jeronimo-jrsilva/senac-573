const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // ==========================================
  // PASSO 2: A PONTE (PRELOAD) ENTRE TELA E COZINHA
  // ==========================================

  // O preload e o "garcom": expoe ao renderer funcoes seguras
  // que enviam mensagens (envelopes) para o main process.

  // 1. Listar todos os contatos
  // ESCREVA AQUI:
  //   getContatos: () => ipcRenderer.invoke('get-contatos'),

  // 2. Inserir um novo contato (enviar { nome, foto_url, telefone, email })
  // ESCREVA AQUI:
  //   addContato: (contato) => ipcRenderer.invoke('add-contato', contato),

  // 3. Excluir um contato pelo id
  // ESCREVA AQUI:
  //   deleteContato: (id) => ipcRenderer.invoke('delete-contato', id),
});
