@echo off
setlocal
cd /d "%~dp0"
set "PORT=8080"
set "HOST=127.0.0.1"

IF NOT EXIST "server.js" (
  echo ERROR: No se encontró server.js en el directorio del proyecto.
  pause
  exit /b 1
)

start "A1S Server" cmd /c "set "PORT=%PORT%" && set "HOST=%HOST%" && node "%~dp0server.js""
start "A1S Site" "http://%HOST%:%PORT%"
exit /b 0
