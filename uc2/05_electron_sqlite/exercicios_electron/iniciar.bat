@echo off
setlocal
cd /d "%~dp0"
set "ELEC="

REM 1) Sobe pastas a partir do repo procurando a pasta electron-win32-x64.
REM    Cobre o caso do electron na raiz do pendrive ou em qualquer pasta acima.

:loop
if exist "electron-win32-x64\electron.exe" (
    set "ELEC=%CD%\electron-win32-x64\electron.exe"
    goto achou
)
set "BEFORE=%CD%"
cd ..
if "%BEFORE%"=="%CD%" goto scan_pendrive
goto loop

REM 2) Varredura na raiz do pendrive (pasta do proprio repositorio).

:scan_pendrive
for /d %%p in ("%~d0\*") do (
    if exist "%%p\electron-win32-x64\electron.exe" (
        set "ELEC=%%p\electron-win32-x64\electron.exe"
        goto achou
    )
)

:falha
echo.
echo  [ERRO] Pasta electron-win32-x64 nao encontrada no pendrive.
echo  Copie a pasta electron-win32-x64 para a RAIZ do pendrive
echo  (ou para qualquer pasta acima da pasta senac-573) e rode de novo.
echo.
pause
exit /b 1

:achou
cd /d "%~dp0"
"%ELEC%" .
exit /b 0
