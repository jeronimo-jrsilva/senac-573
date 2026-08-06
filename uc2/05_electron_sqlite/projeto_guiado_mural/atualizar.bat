@echo off
title Atualizar senac-573 sem perder progresso
cd /d "%~dp0"

echo.
echo  ================================================
echo    ATUALIZAR SENAC-573 SEM PERDER O PROGRESSO
echo  ================================================
echo.

REM Se uma atualizacao anterior foi interrompida (ex: fechou a
REM janela no meio), limpa o estado pendente antes de continuar.
echo  [0/3] Limpando atualizacao anterior (se houver)...
git pull --abort >nul 2>&1
git merge --abort >nul 2>&1

echo  [1/3] Salvando seu progresso...
git add .
git commit -m "meu progresso" >nul 2>&1
if %errorlevel% neq 0 (
    echo        (nada novo para salvar - ok)
)

echo  [2/3] Baixando o material novo do professor...
git pull --autostash

echo.
echo  ================================================
echo    PRONTO!
echo    - Se aparecer CONFLITO (arquivos com ^<^<^<^<^<^<^<)
echo      chame o professor para resolver.
echo    - Nenhum trabalho seu foi perdido.
echo  ================================================
echo.
git stash list
echo.
echo  - Se apareceu "stash@{0}" acima, chame o professor:
echo    ha trabalho seu guardado esperando para voltar.
echo.
pause
