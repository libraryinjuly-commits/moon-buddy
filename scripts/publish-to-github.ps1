# Moon Buddy -> GitHub publish helper
# Prerequisites: run `gh auth login` once before using this script.

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path $PSScriptRoot -Parent
$gitCandidates = @(
  "C:\Program Files\Git\cmd\git.exe",
  (Join-Path $repoRoot ".tools\mingit\cmd\git.exe")
)
$ghCandidates = @(
  "C:\Program Files\GitHub CLI\gh.exe",
  (Join-Path $repoRoot ".tools\bin\gh.exe")
)

$git = $gitCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
$gh = $ghCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $git) { Write-Error "git not found. Install Git for Windows first." }
if (-not $gh) { Write-Error "gh not found. Install GitHub CLI first." }

Set-Location $repoRoot

& $gh auth status | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Host "GitHub login required. Run:" -ForegroundColor Yellow
  Write-Host "  & `"$gh`" auth login" -ForegroundColor Cyan
  exit 1
}

$repoName = "moon-buddy"
Write-Host "Creating public GitHub repository '$repoName' and pushing..." -ForegroundColor Green

& $gh repo create $repoName --public --source . --remote origin --push --description "Moon Buddy - menstrual cycle tracker with mascot companion"

if ($LASTEXITCODE -eq 0) {
  $url = & $gh repo view --json url -q .url
  Write-Host "Done! Repository URL: $url" -ForegroundColor Green
}
