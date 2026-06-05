# Moon Buddy -> GitHub publish helper
# Prerequisites: run `gh auth login` once before using this script.

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path $PSScriptRoot -Parent
$git = Join-Path $repoRoot ".tools\mingit\cmd\git.exe"
$gh = Join-Path $repoRoot ".tools\bin\gh.exe"

if (-not (Test-Path $git)) {
  Write-Error "Portable git not found at $git. Re-run setup or install Git for Windows."
}
if (-not (Test-Path $gh)) {
  Write-Error "Portable gh not found at $gh. Download GitHub CLI first."
}

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
