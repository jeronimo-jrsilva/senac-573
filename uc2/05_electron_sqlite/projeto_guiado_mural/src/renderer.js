// =================================================================
// PROJETO GUIADO: MURAL DE CONTATOS PERSISTENTE (renderer.js)
// Curso: Programador de Sistemas - Senac Centro
// =================================================================

// Mapeamento de Elementos do DOM
const formContato = document.getElementById('form-contato');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputFoto = document.getElementById('foto-url');
const inputTelefone = document.getElementById('telefone');
const muralContatos = document.getElementById('mural-contatos');

// -----------------------------------------------------------------
// 1. FUNÇÃO PARA CARREGAR E EXIBIR OS CONTATOS
// -----------------------------------------------------------------
async function atualizarMural() {
  // A) Limpar o mural na tela
  muralContatos.innerHTML = '';

  // B) Chamar a API 'window.api.getContatos()' para obter do banco
  const response = await window.api.getContatos();
  
  if (!response.success) {
    console.error('Erro ao ler contatos:', response.error);
    return;
  }

  const contatos = response.data;

  // C) Percorrer os contatos obtidos e desenhar os cards dinâmicos
  contatos.forEach(c => {
    // Monte o HTML do card de contato usando a tag <article>
    // Nota: Cada card de contato deve possuir um botão para excluir contendo o ID dele.
    const card = document.createElement('article');

    // Imagem do Contato
    const img = document.createElement('img');
    img.src = c.foto_url || 'https://via.placeholder.com/150';
    img.alt = 'Foto de ' + c.nome;
    card.appendChild(img);

    // Título do Nome
    const h3 = document.createElement('h3');
    h3.textContent = c.nome;
    card.appendChild(h3);

    // Detalhe do Email
    const pEmail = document.createElement('p');
    pEmail.textContent = c.email;
    card.appendChild(pEmail);

    // Botão de Conversa (WhatsApp Link)
    const btnWhats = document.createElement('a');
    btnWhats.href = `https://wa.me/55${c.telefone.replace(/\D/g, '')}`;
    btnWhats.target = '_blank';
    btnWhats.textContent = 'Conversar no WhatsApp';
    card.appendChild(btnWhats);

    // Botão de Excluir Contato
    const btnDeletar = document.createElement('button');
    btnDeletar.innerHTML = '✕';
    btnDeletar.addEventListener('click', async () => {
      // ESCREVA AQUI: Chamar a exclusão física do contato por ID
      
    });
    card.appendChild(btnDeletar);

    // Adiciona o card ao mural
    muralContatos.appendChild(card);
  });
}

// -----------------------------------------------------------------
// 2. OUVINTE DE ENVIO - CADASTRAR CONTATO
// -----------------------------------------------------------------
formContato.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = inputNome.value.trim();
  const email = inputEmail.value.trim();
  const foto_url = inputFoto.value.trim();
  const telefone = inputTelefone.value.trim();

  // ESCREVA AQUI:
  // 1. Chame a API 'window.api.addContato({ nome, foto_url, telefone, email })'
  // 2. Se a inserção tiver sucesso:
  //    - Limpe o formulário (formContato.reset())
  //    - Chame atualizarMural() para renderizar novamente
  // 3. Trate erros de inserção (ex: e-mail duplicado) usando try/catch ou alert
  
});

// -----------------------------------------------------------------
// 3. INICIALIZAÇÃO DA TELA
// -----------------------------------------------------------------
atualizarMural();
