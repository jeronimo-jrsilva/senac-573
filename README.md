# 🎓 Turma 573 - Programador de Sistemas (Senac Centro)
## Repositório Central de Materiais e Exercícios

Este repositório centraliza os slides e exercícios práticos da turma **573 (Programador de Sistemas)** organizados por Unidades Curriculares (UCs).

## 📂 Estrutura do Repositório

*   **`uc2/`**: Unidade Curricular 2 - Banco de Dados Relacional
    *   **`05_electron_sqlite/`**: Integração desktop com Electron e SQLite (Contém slides e boilerplate de laboratório).

## 🚀 Como Usar o Laboratório Prático

1. Clone o repositório na sua máquina local ou pendrive:
   ```bash
   git clone https://github.com/jeronimo-jrsilva/senac-573.git
   ```
2. Para praticar com o Electron + SQLite, acesse a pasta:
   ```bash
   cd senac-573/uc2/05_electron_sqlite/exercicios_electron
   ```
3. Instale as dependências locais:
   ```bash
   npm install
   ```
4. **Configuração Portátil (Caso o npm install falhe ou bloqueie):**
   Como as máquinas do laboratório possuem restrições de proxy, você pode usar a pasta do Electron Portátil (`electron-win32-x64`) presente no seu Pendrive.
   Como a letra do pendrive (D:, E:, F:) pode mudar ao conectar em portas USB diferentes, **use sempre caminhos relativos** no seu `package.json`.
   
   *   **Opção A (Ajuste no package.json - Recomendado para usar `npm start`):**
       Abra o arquivo `package.json` e altere o script `"start"` usando o caminho relativo que sobe até a raiz do seu pendrive para encontrar a pasta do Electron:
       ```json
       "scripts": {
         "start": "..\\..\\..\\..\\electron-win32-x64\\electron.exe ."
       }
       ```
       *(Nota: Se a sua pasta clonada estiver dentro de uma subpasta como `/projetos/`, adicione mais um nível: `..\\..\\..\\..\\..\\electron-win32-x64\\electron.exe .`)*
       
       Depois, basta rodar no terminal do VS Code:
       ```bash
       npm start
       ```
   *   **Opção B (Linha de comando direta no terminal):**
       Navegue até a pasta do exercício no terminal e execute o Electron portátil usando caminhos relativos:
       ```bash
       ..\..\..\..\electron-win32-x64\electron.exe .
       ```

---
*Bons estudos!*
