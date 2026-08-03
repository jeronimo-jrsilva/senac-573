const Database = require('better-sqlite3');
const path = require('path');

// Localiza ou cria o arquivo "contatos.db" na pasta "database" na raiz do projeto (dois níveis acima de src/database)
const dbPath = path.join(__dirname, '../../database/contatos.db');
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

module.exports = db;
