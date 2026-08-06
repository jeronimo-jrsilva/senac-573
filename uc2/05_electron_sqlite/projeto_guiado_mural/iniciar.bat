@echo off
setlocal
cd /d "%~dp0"
set "ELEC="

REM 1) Sobe pastas a partir do repo. Em cada nivel procura primeiro em
REM    "recursos\electron-win32-x64" (dentro do proprio repo senac-573) e
REM    depois em "electron-win32-x64" (raiz do pendrive ou pasta acima).

:loop
if exist "recursos\electron-win32-x64\electron.exe" (
    set "ELEC=%CD%\recursos\electron-win32-x64\electron.exe"
    goto achou
)
if exist "electron-win32-x64\electron.exe" (
    set "ELEC=%CD%\electron-win32-x64\electron.exe"
    goto achou
)
set "BEFORE=%CD%"
cd ..
if "%BEFORE%"=="%CD%" goto scan_pendrive
goto loop

REM 2) Varredura na raiz do pendrive.

:scan_pendrive
for /d %%p in ("%~d0\*") do (
    if exist "%%p\electron-win32-x64\electron.exe" (
        set "ELEC=%%p\electron-win32-x64\electron.exe"
        goto achou
    )
    if exist "%%p\recursos\electron-win32-x64\electron.exe" (
        set "ELEC=%%p\recursos\electron-win32-x64\electron.exe"
        goto achou
    )
)

:falha
echo.
echo  [ERRO] Pasta electron-win32-x64 nao encontrada.
echo  Certifique-se de que a pasta senac-573 possui a pasta
echo  "recursos\electron-win32-x64" (baixada junto com o repositorio).
echo.
pause
exit /b 1

:achou
cd /d "%~dp0"
"%ELEC%" .
exit /b 0
