@echo off
echo ========================================================
echo   Inicializando Electron Portatil desde o Pendrive...
echo ========================================================
echo.

REM Caminho relativo assumindo que a pasta "electron-win32-x64" 
REM esta localizada na raiz do Pendrive, ao lado da pasta "senac-573".
REM Estrutura:
REM [Pendrive]
REM   ├── electron-win32-x64/
REM   └── senac-573/

if exist "..\..\..\..\electron-win32-x64\electron.exe" (
    ..\..\..\..\electron-win32-x64\electron.exe .
) else (
    echo [ERRO] Nao foi possivel encontrar o Electron Portatil no caminho:
    echo "..\..\..\..\electron-win32-x64\electron.exe"
    echo.
    echo Certifique-se de que a pasta "electron-win32-x64" esta na raiz do seu pendrive,
    echo ao lado da pasta clonada "senac-573".
    echo.
)
pause
