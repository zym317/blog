@echo off
echo Generating SSH key...
ssh-keygen -t ed25519 -C 2323173449@qq.com -f %USERPROFILE%\.ssh\id_ed25519 -N ""
echo.
echo Your public key:
type %USERPROFILE%\.ssh\id_ed25519.pub
echo.
echo Copy the line above, then go to: https://github.com/settings/keys
pause
