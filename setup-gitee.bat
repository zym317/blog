@echo off
echo === Adding Gitee remote ===
git remote add gitee https://gitee.com/ack317/blog.git

echo === Pushing to Gitee ===
git push gitee main

echo === Done ===
echo Now open https://gitee.com/ack317/blog
pause
