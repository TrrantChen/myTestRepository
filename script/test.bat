@echo off
for /f "tokens=4" %%a in ('route print^|findstr 0.0.0.0.*0.0.0.0') do (
 set IP=%%a
)
start cmd /c node-inspector app
start cmd /c nodemon --debug app
start cmd /c "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://%IP%:8080/?port=5858

