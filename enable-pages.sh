#!/bin/bash
TOKEN=$(echo "protocol=https
host=github.com" | git credential fill | grep password | cut -d= -f2)

curl -s -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/zym317/blog/pages" \
  -d '{"source":{"branch":"main","path":"/"}}'

echo ""
echo "Done! Check https://zym317.github.io/blog"
