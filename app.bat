@echo off
set cwd=%cd%
set B=bootstrap
set S=stylus
set V=v1.0.6
title %B% 4 stylus
set TS=Call :Color 6 "Task started: %TIME:~0,-3%"
set SBS=%S% %B%.styl
set BMIN=./dist/%B%.min.css
set APP=app.bat
set CBS=Create %B%.
set RSDELAY=3
set WATCH=start node watch.js
set SV=stylus -v
:home
cls

echo.
Call :Color 9 "=========================" \n
Call :Color B "%B% 4 %S% %V%" \n
Call :Color 9 "=========================" \n
echo.
Call :Color A "Select a task:" \n
echo.
Call :Color D "1) " && Call :Color B "Create main.js" \n
Call :Color D "2) " && Call :Color B "%CBS%css" \n
Call :Color D "3) " && Call :Color B "%CBS%min.css" \n
Call :Color D "4) " && Call :Color B "%CBS%css.map" \n
Call :Color D "5) " && Call :Color B "%CBS%min.css.map" \n
Call :Color D "6) " && Call :Color B "Create all %B%.css files" \n
Call :Color D "7) " && Call :Color B "Start watch" \n
Call :Color D "8) " && Call :Color B "backup" \n
Call :Color D "9) " && Call :Color B "Exit" \n
Call :Color D "0) " && Call :Color B "restart" \n
echo.
set /p web=Type option:
if "%web%"=="1" cd example && copy main.js %cwd% && cd.. && pause && call %APP%
if "%web%"=="2" %TS% \n && %SBS% -o ./dist && Call :Color 3 "restarting..." \n && timeout /t %RSDELAY% && call %APP%
if "%web%"=="3" %TS% \n && %SBS% -c -o %BMIN% && Call :Color 3 "restarting..." \n && timeout /t %RSDELAY% && call %APP%
if "%web%"=="4" %TS% \n && %SBS% -m -o ./dist && Call :Color 3 "restarting..." \n && timeout /t %RSDELAY% && call %APP%
if "%web%"=="5" %TS% \n && %SBS% -c -m -o %BMIN% && Call :Color 3 "restarting..." \n && timeout /t %RSDELAY% && call %APP%
if "%web%"=="6" %TS% \n && backup
if "%web%"=="7" %TS% \n && %WATCH% && pause && call %APP%
if "%web%"=="8" cd bin && zip.bat "../bootstrap.styl" "../includes" "../includes.styl" -o "../backup.zip" && cd.. && Call :Color 3 "restarting..." \n && timeout /t %RSDELAY% && call %APP%
if "%web%"=="9" exit
if "%web%"=="0" Call :Color 3 "restarting..." && timeout /t %RSDELAY% && call %APP%

:Color
SetLocal EnableExtensions EnableDelayedExpansion
Set "Text=%~2"
If Not Defined Text (Set Text=^")
Subst `: "!Temp!" >Nul &`: &Cd \
If Not Exist `.7 (
Echo(|(Pause >Nul &Findstr "^" >`)
Set /P "=." >>` <Nul
For /F "delims=;" %%# In (
'"Prompt $H;&For %%_ In (_) Do Rem"') Do (
Set /P "=%%#%%#%%#" <Nul >`.3
Set /P "=%%#%%#%%#%%#%%#" <Nul >`.5
Set /P "=%%#%%#%%#%%#%%#%%#%%#" <Nul >`.7))
Set /P "LF=" <` &Set "LF=!LF:~0,1!"
For %%# in ("!LF!") Do For %%_ In (
\ / :) Do Set "Text=!Text:%%_=%%~#%%_%%~#!"
For /F delims^=^ eol^= %%# in ("!Text!") Do (
If #==#! SetLocal DisableDelayedExpansion
If \==%%# (Findstr /A:%~1 . \` Nul
Type `.3) Else If /==%%# (Findstr /A:%~1 . /.\` Nul
Type `.5) Else (Echo %%#\..\`>`.dat
Findstr /F:`.dat /A:%~1 .
Type `.7))
If "\n"=="%~3" (Echo()
Goto :Eof
