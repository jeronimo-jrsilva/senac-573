// =================================================================
// CLIENTE (RENDERER PROCESS) - EXERCÍCIOS DE INTEGRACAO
// Curso: Programador de Sistemas - Senac Centro
// =================================================================

// ==========================================
// PASSO 1: COMUNICACAO IPC BASICA (SOMA)
// ==========================================

// --- Exemplo Resolvido 1: Tamanho do texto via IPC ---
// Conecta com o HTML mapeando os elementos da tela:
const inputExemploTexto = document.getElementById('exemplo-texto');
const btnExemploTamanho = document.getElementById('btn-exemplo-tamanho');
const divResultadoExemplo = document.getElementById('resultado-exemplo-tamanho');

btnExemploTamanho.addEventListener('click', async () => {
  const texto = inputExemploTexto.value;
  
  // JORNADA DA COMUNICACAO (APERTO DE MAO):
  // 1. 'window.api.exemploTamanho(texto)' aciona a funcao correspondente exposta no PRELOAD.JS
  // 2. O Preload.js embrulha o dado e executa o 'ipcRenderer.invoke()' enviando o envelope pelo canal
  // 3. O MAIN.JS (Processo Principal) intercepta no 'ipcMain.handle()', calcula o tamanho e retorna o valor
  // 4. Como essa viagem de ida e volta pelo sistema operacional leva tempo, usamos 'await' para esperar o retorno
  const tamanho = await window.api.exemploTamanho(texto);
  
  divResultadoExemplo.textContent = `Tamanho: ${tamanho} caracteres.`;
});

// --- Exercício 1: Calcular Soma via IPC ---
// Instruções:
// 1. Capture os valores numéricos dos inputs 'numA' e 'numB'.
// 2. Chame a API 'window.api.somarNumeros(a, b)' passando os valores.
//    (Isso cruzará a ponte do preload.js e executará o calculo no main.js)
// 3. Exiba o resultado dentro do elemento 'resultado-soma'.
const inputNumA = document.getElementById('numA');
const inputNumB = document.getElementById('numB');
const btnSomar = document.getElementById('btn-somar');
const divResultadoSoma = document.getElementById('resultado-soma');

btnSomar.addEventListener('click', async () => {
  // Escreva seu código abaixo:

});


// ==========================================
// PASSO 2: CONSULTANDO O SQLITE (.ALL E .GET)
// ==========================================

// --- Exemplo Resolvido 2: Listar todos os contatos ---
const btnListarTodos = document.getElementById('btn-listar-todos');
const divListaContatos = document.getElementById('lista-contatos-completa');

btnListarTodos.addEventListener('click', async () => {
  // JORNADA DA CONSULTA BANCO DE DADOS:
  // 1. Solicita a lista de contatos chamando 'window.api.exemploListarTodos()' (Preload.js)
  // 2. O Preload envia a mensagem pelo canal correspondente para o MAIN.JS
  // 3. O MAIN.JS importa a conexao do SQLite, executa o comando SQL 'SELECT' com o metodo '.all()'
  // 4. O MAIN.JS envia de volta um objeto { success, data } contendo a lista de contatos do banco
  const contatos = await window.api.exemploListarTodos();
  divListaContatos.innerHTML = '';
  for (let i = 0; i < contatos.length; i++) {
    const c = contatos[i];
    divListaContatos.innerHTML += `
      <div class="contact-card">
        <span><strong>ID: ${c.id}</strong> - ${c.nome} (${c.email})</span>
      </div>
    `;
  }
});

// --- Exercício 2: Buscar Contato por E-mail ---
// Instruções:
// 1. Capture o valor do e-mail do input 'busca-email'.
// 2. Chame 'window.api.buscarPorEmail(email)' para executar a query.
//    (Isso solicitara ao main.js buscar o registro unico com o metodo '.get()' do SQLite)
// 3. Se retornar o contato, exiba na tela o ID, Nome e Telefone dele.
// 4. Caso o contato não exista, exiba "Nenhum contato encontrado com este e-mail."
const inputBuscaEmail = document.getElementById('busca-email');
const btnBuscarEmail = document.getElementById('btn-buscar-email');
const divResultadoBusca = document.getElementById('resultado-busca-email');

btnBuscarEmail.addEventListener('click', async () => {
  // Escreva seu código abaixo:

});


// ==========================================
// PASSO 3: GRAVANDO E EXCLUINDO DADOS (.RUN)
// ==========================================

// --- Exemplo Resolvido 3: Inserir Contato ---
const formInserir = document.getElementById('form-exemplo-inserir');

formInserir.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('ins-nome').value.trim();
  const telefone = document.getElementById('ins-telefone').value.trim();
  const email = document.getElementById('ins-email').value.trim();

  // 1. Envia os dados para 'window.api.exemploInserir()' (Preload.js)
  // 2. O Preload executa o invoke que joga os dados no Main Process (main.js)
  // 3. O main.js executa o SQL 'INSERT' de forma segura com placeholders '?' e o metodo '.run()'
  // 4. O bloco 'try/catch' no main.js impede travamentos caso o e-mail inserido ja exista (UNIQUE)
  const novoId = await window.api.exemploInserir(nome, telefone, email);
  if (novoId) {
    alert(`Contato cadastrado com sucesso! ID: ${novoId}`);
    formInserir.reset();
  } else {
    alert('Erro ao cadastrar: verifique se o e-mail ja existe.');
  }
});

// --- Exercício 3: Excluir Registro por ID ---
// Instruções:
// 1. Capture o ID inserido no input 'del-id'.
// 2. Chame a API 'window.api.deletarContato(id)' para efetuar o DELETE.
//    (Isso acionara o main.js que executara o 'DELETE' com '.run()' no SQLite)
// 3. Exiba uma mensagem de sucesso no elemento 'resultado-deletar'.
// 4. Trate possíveis falhas ou IDs inexistentes.
const inputDelId = document.getElementById('del-id');
const btnDeletar = document.getElementById('btn-deletar');
const divResultadoDeletar = document.getElementById('resultado-deletar');

btnDeletar.addEventListener('click', async () => {
  // Escreva seu código abaixo:

});


// ==========================================
// PASSO 4: BUSCA DINAMICA (OPERADOR LIKE)
// ==========================================

// --- Exercício 4: Busca Dinâmica por Nome ---
// Instruções:
// 1. Adicione um listener para o evento de digitação 'input' no campo 'busca-nome'.
// 2. Capture o texto digitado e chame 'window.api.buscarPorNome(texto)'.
//    (Isso executara a query 'SELECT ... WHERE nome LIKE ?' no SQLite do main.js)
// 3. Se a busca tiver sucesso, limpe o container 'resultado-busca-nome' e monte
//    uma lista de resultados usando tags <div> (cards de contatos).
const inputBuscaNome = document.getElementById('busca-nome');
const divResultadoBuscaNome = document.getElementById('resultado-busca-nome');

inputBuscaNome.addEventListener('input', async () => {
  // Escreva seu código abaixo:

});


// ==========================================
// PASSO 5: ESTATISTICAS DO BANCO (COUNT)
// ==========================================

// --- Exercício 5: Quantidade Total de Contatos ---
// Instruções:
// 1. Crie uma função assíncrona chamada 'atualizarContadorTotal()'.
// 2. Ela deve chamar 'window.api.obterTotalContatos()'.
//    (Isso acionara o main.js para executar 'SELECT COUNT(*)...' no banco)
// 3. Insira o valor total retornado dentro do elemento HTML com id 'total-contatos'.
// 4. Adicione um listener de clique no botão 'btn-atualizar-total' para rodar a função.
const spanTotalContatos = document.getElementById('total-contatos');
const btnAtualizarTotal = document.getElementById('btn-atualizar-total');

// Escreva seu código abaixo:

