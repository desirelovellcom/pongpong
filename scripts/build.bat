@echo off
REM PongPong Build Script for Windows
echo Building PongPong for Windows...

REM Install dependencies
call npm install

REM Build the application
call npm run build

REM Create distribution directory
if not exist "dist\pongpong" mkdir "dist\pongpong"

REM Copy built files
xcopy /E /I "out\*" "dist\pongpong\"
copy "config.json" "dist\pongpong\"
copy "README.md" "dist\pongpong\"
copy "LICENSE" "dist\pongpong\"

REM Create launcher batch file
echo @echo off > "dist\pongpong\pongpong.bat"
echo cd /d "%%~dp0" >> "dist\pongpong\pongpong.bat"
echo start index.html >> "dist\pongpong\pongpong.bat"

echo Build complete! Run dist\pongpong\pongpong.bat to start the game
pause
