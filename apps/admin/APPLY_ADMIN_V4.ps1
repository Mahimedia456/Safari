param(
    [string]$AdminPath = "E:\Safari\apps\admin"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "Safari Admin V4 replacement" -ForegroundColor Green
Write-Host "Target: $AdminPath"
Write-Host ""

$source = Join-Path $PSScriptRoot "src"
$target = Join-Path $AdminPath "src"

if (-not (Test-Path $source)) {
    throw "Package src folder not found: $source"
}

if (Test-Path $target) {
    Write-Host "Removing old admin src completely..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $target
}

Write-Host "Copying clean V4 src..." -ForegroundColor Cyan
Copy-Item -Recurse -Force $source $target

$staleFiles = @(
    (Join-Path $target "pages\pricing\GermanyPricingPage.tsx"),
    (Join-Path $target "pages\regions\GermanyRegionPage.tsx"),
    (Join-Path $target "lib\supabase.ts")
)

foreach ($file in $staleFiles) {
    if (Test-Path $file) {
        Remove-Item -Force $file
        Write-Host "Deleted stale file: $file" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "V4 source installed." -ForegroundColor Green
Write-Host "Now run:"
Write-Host "  cd $AdminPath"
Write-Host "  npm run build"
