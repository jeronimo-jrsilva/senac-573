# 📦 Como atualizar o repositório sem perder seu progresso

> Dois jeitos de receber o material novo do professor **sem perder** os exercícios que você já preencheu. Siga sempre o jeito 2 (comandos). O jeito 1 é só para a **primeira vez** (aula de 06/08).

---

## 🥇 Jeito 1 — SÓ HOJE: backup + clone novo

Use uma vez só. Guarda seu trabalho numa pasta de backup e baixa o repositório limpo.

```bash
mv senac-573 senac-573-meu-progresso
git clone https://github.com/jeronimo-jrsilva/senac-573.git
```

- Sua pasta antiga continua no pendrive como **backup** (`senac-573-meu-progresso`).
- O material novo chega na pasta `senac-573` limpa.
- Se quiser trazer de volta um exercício que você preencheu: **copie o arquivo** da pasta antiga para a nova.

---

## 🥈 Jeito 2 — Próximas aulas: 3 comandos (ou o `atualizar.bat`)

Sempre que o professor avisar que subiu material novo:

```bash
git add .
git commit -m "meu progresso"
git pull --autostash
```

O que cada comando faz:

| Comando | O que faz |
| :--- | :--- |
| `git add .` | Marca todos os seus arquivos alterados. |
| `git commit -m "meu progresso"` | Salva seu trabalho num "ponto seguro" do git. |
| `git pull --autostash` | Baixa o novo material e reaplica seu trabalho por cima. |

- **Sem conflito?** Seu trabalho volta intacto e o material novo aparece. ✅
- **Com conflito?** O git mostra os arquivos com `<<<<<<<` — chame o professor para resolver juntos. Nada é perdido.

---

## 💡 Atalho no Windows: `atualizar.bat`

Duplo clique no `atualizar.bat` que fica nesta pasta — ele roda os 3 comandos sozinho.

---

## ⚠️ Regras de ouro

1. **Nunca** apague a pasta para "clonar de novo" — isso perde seu trabalho.
2. **Nunca** rode `git clone` dentro de uma pasta que já tem o repositório.
3. Se o git pedir para resolver algo e você não souber, **pare e chame o professor**.
