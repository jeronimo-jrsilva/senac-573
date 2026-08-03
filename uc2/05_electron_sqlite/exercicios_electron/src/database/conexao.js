const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Localiza ou cria o arquivo "contatos.db" na pasta "database" na raiz do projeto (dois níveis acima de src/database)
const dbPath = path.join(__dirname, '../../database/contatos.db');

// Garante que a pasta "database" exista (o SQLite cria o arquivo, mas não a pasta pai)
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

// Cria a tabela caso não exista
db.prepare(`
    CREATE TABLE IF NOT EXISTS contatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        telefone TEXT NOT NULL,
        email TEXT UNIQUE
    )
`).run();

// Semear dados de exemplo apenas se a tabela estiver vazia
// (permite visualizar algo ao testar; não duplica ao reabrir)
const { total } = db.prepare('SELECT COUNT(*) as total FROM contatos').get();
if (total === 0) {
  const inserir = db.prepare('INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)');
  inserir.run('Ana Souza', '(11) 98888-1111', 'ana.souza@email.com');
  inserir.run('Bruno Lima', '(11) 97777-2222', 'bruno.lima@email.com');
  inserir.run('Carla Mendes', '(11) 96666-3333', 'carla.mendes@email.com');
}

module.exports = db;
