$creds = @"
protocol=https
host=github.com

"@ | git credential fill 2>$null
$token = ($creds | Select-String "password=(.*)").Matches.Groups[1].Value

$headers = @{
    Authorization = "Bearer $token"
    Accept = "application/vnd.github+json"
}

$result = Invoke-RestMethod -Uri "https://api.github.com/repos/zym317/blog/pages" -Headers $headers
Write-Host "URL: $($result.html_url)"
Write-Host "Status: $($result.status)"
Write-Host "Branch: $($result.source.branch)"
Write-Host "Path: $($result.source.path)"

Write-Host ""
Write-Host "Latest build:"
$builds = Invoke-RestMethod -Uri "https://api.github.com/repos/zym317/blog/pages/builds/latest" -Headers $headers
Write-Host "Build status: $($builds.status)"
Write-Host "Error message: $($builds.error.message)"
