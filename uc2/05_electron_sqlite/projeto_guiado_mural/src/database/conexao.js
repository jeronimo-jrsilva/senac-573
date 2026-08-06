const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../database/agenda.db');
const db = new Database(dbPath);

// ==========================================
// PASSO 1: CRIAR A TABELA DE CONTATOS
// ==========================================

// ESCREVA AQUI:
// 1. Use db.prepare('...') com o comando SQL abaixo.
// 2. Finalize com .run() para executar a criacao da tabela.
//
// Campos da tabela 'contatos':
//   id       INTEGER PRIMARY KEY AUTOINCREMENT  -> chave primaria gerada automaticamente
//   nome     TEXT NOT NULL                      -> obrigatorio
//   foto_url TEXT                               -> link da foto (opcional)
//   telefone TEXT NOT NULL                      -> obrigatorio
//   email    TEXT UNIQUE NOT NULL               -> unico (impede cadastro duplicado)
//
// (Dica: use "CREATE TABLE IF NOT EXISTS" para nao dar erro ao reabrir o app.)

module.exports = db;
