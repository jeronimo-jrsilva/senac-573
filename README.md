# 🎓 Turma 573 - Programador de Sistemas (Senac Centro)
## Repositório Central de Materiais e Exercícios

Este repositório centraliza os slides e exercícios práticos da turma **573 (Programador de Sistemas)** organizados por Unidades Curriculares (UCs).

## 📂 Estrutura do Repositório

*   **`uc2/`**: Unidade Curricular 2 - Banco de Dados Relacional
    *   **`05_electron_sqlite/`**: Integração desktop com Electron e SQLite (Contém slides e boilerplate de laboratório).

## 🚀 Como Usar o Laboratório Prático

As dependências já vêm incluídas no repositório (**não** é preciso rodar `npm install` — o laboratório tem restrições de proxy e de compilação nativa). O único requisito é o Electron portátil na raiz do pendrive.

**Estrutura esperada no pendrive:**

```text
SEU-PENDRIVE/
├── electron-win32-x64/          <-- Electron portátil (já entregue em aula)
└── senac-573/                   <-- clone do repositório
    └── uc2/05_electron_sqlite/exercicios_electron/
```

### ⚡ Passo a passo

1. Clone o repositório para a raiz do pendrive:
   ```bash
   git clone https://github.com/jeronimo-jrsilva/senac-573.git
   ```
2. Confira se a pasta `electron-win32-x64` está na raiz do pendrive (ao lado da pasta `senac-573`). Se ainda não estiver, copie-a para lá.
3. Entre na pasta do exercício e **clique duas vezes no `iniciar.bat`** (ou rode no terminal):
   ```bash
   cd senac-573/uc2/05_electron_sqlite/exercicios_electron
   npm start
   ```

> 💡 **Por que funciona em qualquer PC?** Tanto o `iniciar.bat` quanto o `npm start` fazem uma varredura no pendrive: sobem diretórios a partir do repositório (cobrindo o electron na raiz ou em qualquer pasta acima) e, se preciso, uma varredura rasa na raiz do pendrive. Ao encontrar a pasta `electron-win32-x64`, ela fica fixada e o programa abre sempre por ela — a letra da unidade (D:, E:, F:) pode mudar que funciona do mesmo jeito, sem instalar nada no PC do laboratório.

---
*Bons estudos!*
