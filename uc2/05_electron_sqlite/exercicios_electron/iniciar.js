const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function acharElectron() {
  // 1) Sobe pastas a partir do repo procurando a pasta electron-win32-x64.
  let dir = __dirname;
  while (true) {
    const candidato = path.join(dir, 'electron-win32-x64', 'electron.exe');
    if (fs.existsSync(candidato)) return candidato;
    const pai = path.dirname(dir);
    if (pai === dir) break;
    dir = pai;
  }
  // 2) Varredura rasa na raiz do pendrive (pasta do proprio repositorio).
  const raiz = path.parse(dir).root;
  try {
    for (const item of fs.readdirSync(raiz, { withFileTypes: true })) {
      if (!item.isDirectory() && !item.isSymbolicLink()) continue;
      const candidato = path.join(raiz, item.name, 'electron-win32-x64', 'electron.exe');
      if (fs.existsSync(candidato)) return candidato;
    }
  } catch (e) {
    // raiz sem permissao de leitura: segue para o erro
  }
  return null;
}

const electron = acharElectron();

if (!electron) {
  console.error('\n[ERRO] Pasta electron-win32-x64 nao encontrada no pendrive.');
  console.error('Copie a pasta electron-win32-x64 para a RAIZ do pendrive');
  console.error('(ou para qualquer pasta acima da pasta senac-573) e rode de novo.\n');
  process.exit(1);
}

const child = spawn(electron, ['.'], { cwd: __dirname, stdio: 'inherit' });
child.on('exit', (code) => process.exit(code));
