@echo off
echo Enabling GitHub Pages...
for /f "tokens=2 delims==" %%a in ('echo protocol^=https^&echo host^=github.com ^| git credential fill ^| findstr password') do set TOKEN=%%a
curl -s -X POST -H "Authorization: Bearer %TOKEN%" -H "Accept: application/vnd.github+json" "https://api.github.com/repos/zym317/blog/pages" -d "{\"source\":{\"branch\":\"main\",\"path\":\"/\"}}"
echo.
echo Done! Now visit https://zym317.github.io/blog
pause
