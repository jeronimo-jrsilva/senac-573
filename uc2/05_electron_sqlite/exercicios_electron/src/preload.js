const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // ==========================================
  // PASSO 1: COMUNICACAO IPC BASICA (SOMA)
  // ==========================================
  
  // Exemplo: Obter tamanho do texto
  // JORNADA DA COMUNICACAO (A PONTE):
  // 1. Recebe a chamada do 'renderer.js' via 'window.api.exemploTamanho(texto)'
  // 2. Envia o envelope para o 'main.js' via 'ipcRenderer.invoke()' no canal 'exemplo-tamanho'
  exemploTamanho: (texto) => ipcRenderer.invoke('exemplo-tamanho', texto),
  
  // Exercício 1: Somar dois números (Resolvido no Preload para demonstração)
  somarNumeros: (a, b) => ipcRenderer.invoke('somar-numeros', { a, b }),


  // ==========================================
  // PASSO 2: CONSULTANDO O SQLITE (.ALL E .GET)
  // ==========================================
  
  // Exemplo: Listar todos os contatos
  exemploListarTodos: () => ipcRenderer.invoke('exemplo-listar-todos'),
  
  // Exercício 2: Buscar contato por e-mail
  // ESCREVA AQUI: Exponha a funcao 'buscarPorEmail(email)' invocando o canal 'buscar-por-email'
  


  // ==========================================
  // PASSO 3: GRAVANDO E EXCLUINDO DADOS (.RUN)
  // ==========================================
  
  // Exemplo: Inserir novo contato
  exemploInserir: (nome, telefone, email) => ipcRenderer.invoke('exemplo-inserir', nome, telefone, email),
  
  // Exercício 3: Deletar contato por ID
  // ESCREVA AQUI: Exponha a funcao 'deletarContato(id)' invocando o canal 'deletar-contato'
  


  // ==========================================
  // PASSO 4: BUSCA DINAMICA (OPERADOR LIKE)
  // ==========================================
  
  // Exercício 4: Filtrar contatos por nome
  // ESCREVA AQUI: Exponha a funcao 'buscarPorNome(nome)' invocando o canal 'buscar-por-nome'
  


  // ==========================================
  // PASSO 5: ESTATISTICAS DO BANCO (COUNT)
  // ==========================================
  
  // Exercício 5: Obter quantidade total de contatos
  // ESCREVA AQUI: Exponha a funcao 'obterTotalContatos()' invocando o canal 'obter-total-contatos'
  
});
