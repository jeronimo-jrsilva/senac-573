---
marp: true
theme: uncover
class: invert
paginate: true
_class: lead
style: |
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

  section {
    background-color: #0f172a;
    color: #f8fafc;
    font-family: 'JetBrains Mono', monospace;
    font-size: 24px;
    letter-spacing: -0.5px;
  }
  
  section::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 70px 70px;
    border-color: transparent transparent #38bdf8 transparent;
    z-index: 1;
  }
  
  section.final::before {
    border-color: transparent transparent #f97316 transparent;
  }
  
  section::after {
    color: #ffffff !important;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700 !important;
    font-size: 20px !important;
    position: absolute;
    bottom: 8px !important;
    right: 12px !important;
    z-index: 2;
    background: transparent !important;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.8) !important;
  }

  section.final::after {
    color: #ffffff !important;
    text-shadow: none !important;
  }

  h1 {
    color: #38bdf8;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    font-size: 42px;
    letter-spacing: -1.5px;
  }
  h2 {
    color: #38bdf8;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    font-size: 34px;
    letter-spacing: -1px;
  }
  pre {
    background-color: #1e293b !important;
    border: 1px solid #334155 !important;
    padding: 10px;
    border-radius: 8px;
    text-align: left;
  }
  pre code {
    color: #38bdf8 !important;
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    background-color: transparent !important;
  }
  ul, ol {
    text-align: left;
    font-size: 22px;
    line-height: 1.5;
  }
  table {
    font-size: 20px;
  }
---

# 🏓 Tópico 05 - Parte 2: Mural de Contatos Persistente
### UC2 — Banco de Dados Relacional
### Prof. Jeronimo Silva

---

## 🗺️ Roteiro da Aula

- **Bloco 1:** Checklist de Conceitos da Aula
- **Bloco 2:** Memória Volátil (UC1) vs Persistência SQLite (UC2)
- **Bloco 3:** Arquitetura em 4 Camadas (`conexao` ↔ `main` ↔ `preload` ↔ `renderer`)
- **Bloco 4:** Canais IPC & Sanitização com Regex
- **Bloco 5:** Roteiro da Prática Guiada (Code-Along)
- **Bloco 6:** Desafio Prático & Encerramento

---

## 📋 Checklist de Conceitos da Aula

- **IPC (`ipcRenderer.invoke` / `ipcMain.handle`)**: Comunicação assíncrona bidirecional segura.
- **`better-sqlite3` (`prepare`, `.all()`, `.run()`)**: Execução síncrona e de alta performance no Node.js.
- **`AUTOINCREMENT`**: Geração automática de ID numérico sequencial único no banco.
- **`UNIQUE`**: Restrição SQL que previne cadastros duplicados (ex: e-mail).
- **Sanitização com Regex (`replace(/\D/g, '')`)**: Remoção de caracteres não numéricos.
- **`confirm()`**: Modal nativo do navegador para validação prévia de exclusão.

---

## 📞 Mural no DOM (UC1) vs SQLite (UC2)

### ❌ Limitação do DOM (UC1):
- Contatos armazenados no estado da página (`innerHTML += ...`).
- Ao recarregar (F5) ou fechar a janela, **tudo é perdido** (volatilidade da RAM).

### ✅ Solução Persistente no Electron (UC2):
- Dados gravados em arquivo físico no disco (`database/agenda.db`).
- Queries SQL garantem ordenação, busca eficiente e integridade relacional.

---

## 🏗️ Arquitetura da Aplicação em 4 Camadas

```
┌─────────────────┐       IPC        ┌─────────────────┐
│   renderer.js   │ ───────────────> │   preload.js    │
│  (UI / Eventos) │ <─────────────── │ (Bridge Seguro) │
└─────────────────┘                  └────────┬────────┘
                                              │ IPC Channel
                                              ▼
┌─────────────────┐    better-sqlite3 ┌─────────────────┐
│   agenda.db     │ <───────────────  │     main.js     │
│ (Arquivo Disco) │                   │ (Node.js/Backend)│
└─────────────────┘                   └─────────────────┘
```

- **Isolamento de Segurança:** O Frontend (`renderer.js`) não acessa o arquivo `.db` diretamente.

---

## 🗄️ Modelagem da Tabela `contatos`

```sql
CREATE TABLE IF NOT EXISTS contatos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  foto_url TEXT,
  telefone TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);
```

- **`id`**: Garantia de exclusão e atualização sem ambiguidade.
- **`foto_url`**: Armazena a URL da imagem para exibição no card.
- **`email UNIQUE`**: Retorna erro amigável se tentar cadastrar e-mail duplicado.

---

## 🔌 Mapeamento dos Canais IPC

| Canal | Método SQL | Descrição |
| :--- | :--- | :--- |
| **`get-contatos`** | `.prepare(...).all()` | Retorna todos os contatos por ordem alfabética (`ORDER BY nome ASC`). |
| **`add-contato`** | `.prepare(...).run(...)` | Insere novo contato no banco `{ nome, foto_url, telefone, email }`. |
| **`delete-contato`** | `.prepare(...).run(id)` | Exclui fisicamente o contato pelo `id`. |

---

## 🧹 Sanitização com Regex & Confirmação

### 1. Limpeza do Telefone com Expressão Regular (Regex):
```javascript
const telLimpo = inputTelefone.value.replace(/\D/g, '');
// Exemplo: "(81) 99999-8888" -> "81999998888"
```
- `\D`: Seleciona qualquer caractere que **NÃO seja dígito numérico**.
- `/g`: Flag global para substituir todas as ocorrências.

### 2. Confirmação Visual Pré-Deleção:
```javascript
if (confirm(`Deseja realmente excluir o contato ${nome}?`)) {
  await window.api.deleteContato(id);
}
```

---

## 🛠️ Roteiro da Prática Guiada (Code-Along)

1. **Passo 1 (`conexao.js`):** Configurar o `better-sqlite3` e executar a DDL `CREATE TABLE`.
2. **Passo 2 (`main.js`):** Registrar os 3 handlers `ipcMain.handle` com tratamento de erro.
3. **Passo 3 (`preload.js`):** Expor as funções em `window.api`.
4. **Passo 4 (`renderer.js`):** Conectar os formulários e botões de exclusão, executando `atualizarMural()`.

---

<!-- _class: final -->
## 🎯 Desafio Prático & Próximos Passos

### 🧪 Desafio da Aula (Mural Avançado):
1. **Filtro em Tempo Real (LIKE):** Adicione um campo `<input id="busca">` e crie a rota `search-contatos` (`WHERE nome LIKE ?`).
2. **Validação de E-mail:** Trate o erro de e-mail duplicado exibindo uma mensagem amigável ao usuário.

### ➡️ Próxima Aula:
- **Tópico 06:** Desafio Kanban Persistente (Arrastar e soltar com persistência de status no SQLite).
