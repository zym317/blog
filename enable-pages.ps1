$creds = @"
protocol=https
host=github.com

"@ | git credential fill 2>$null
$token = ($creds | Select-String "password=(.*)").Matches.Groups[1].Value

$body = @{source=@{branch="main";path="/"}} | ConvertTo-Json

$result = Invoke-RestMethod -Uri "https://api.github.com/repos/zym317/blog/pages" -Method Post -Headers @{
    Authorization = "Bearer $token"
    Accept = "application/vnd.github+json"
} -Body $body -ContentType "application/json"

Write-Host "Result: $($result.html_url)"
Write-Host "Done! Visit https://zym317.github.io/blog"
