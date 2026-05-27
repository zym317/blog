@echo off
echo === 配置 Git 身份 ===
git config user.name "zym317"
git config user.email "2323173449@qq.com"

echo === 添加远程仓库 ===
git remote add origin https://github.com/zym317/blog.git

echo === 提交代码 ===
git add .
git commit -m "初始化个人博客"

echo === 推送到 GitHub ===
git push -u origin master

echo === 完成 ===
pause
