const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function acharElectron() {
  // 1) Sobe pastas a partir do repo. Em cada nivel procura primeiro em
  //    'recursos/electron-win32-x64' (dentro do proprio repo senac-573) e
  //    depois em 'electron-win32-x64' (raiz do pendrive ou pasta acima).
  let dir = __dirname;
  while (true) {
    const emRecursos = path.join(dir, 'recursos', 'electron-win32-x64', 'electron.exe');
    if (fs.existsSync(emRecursos)) return emRecursos;

    const candidato = path.join(dir, 'electron-win32-x64', 'electron.exe');
    if (fs.existsSync(candidato)) return candidato;

    const pai = path.dirname(dir);
    if (pai === dir) break;
    dir = pai;
  }

  // 2) Varredura rasa na raiz do pendrive.
  const raiz = path.parse(dir).root;
  try {
    for (const item of fs.readdirSync(raiz, { withFileTypes: true })) {
      if (!item.isDirectory() && !item.isSymbolicLink()) continue;
      const candidato = path.join(raiz, item.name, 'electron-win32-x64', 'electron.exe');
      if (fs.existsSync(candidato)) return candidato;
      const emRecursos = path.join(raiz, item.name, 'recursos', 'electron-win32-x64', 'electron.exe');
      if (fs.existsSync(emRecursos)) return emRecursos;
    }
  } catch (e) {
    // raiz sem permissao de leitura: segue para o erro
  }
  return null;
}

const electron = acharElectron();

if (!electron) {
  console.error('\n[ERRO] Pasta electron-win32-x64 nao encontrada.');
  console.error('Certifique-se de que a pasta senac-573 possui a pasta');
  console.error('"recursos/electron-win32-x64" (baixada junto com o repositorio).\n');
  process.exit(1);
}

const child = spawn(electron, ['.'], { cwd: __dirname, stdio: 'inherit' });
child.on('exit', (code) => process.exit(code));
