$baseDir = "d:\Gore 9-12-2025"
$logFile = "$baseDir\fix_encoding_log.txt"

$files = Get-ChildItem -Path $baseDir -Recurse -Include *.html, *.css, *.js, *.json, *.md, *.txt | Where-Object {
    $_.Name -ne "fix_encoding_log.txt" -and
    $_.Name -ne "fix_encoding.ps1" -and
    $_.Name -ne "assets_path_update_log.txt"
}

"Starting encoding fix at $(Get-Date)" | Out-File $logFile

$totalFixed = 0

foreach ($file in $files) {
    try {
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $content = [System.Text.Encoding]::UTF8.GetString($bytes)
        
        if ($null -eq $content -or $content.Length -eq 0) { continue }
        
        $modified = $false
        
        # Replace the specific bad sequences
        $searches = @(
            @{bad = '"'; good = '—' },
            @{bad = '"'; good = '–' },
            @{bad = '™'; good = "'" },
            @{bad = 'œ'; good = '"' },
            @{bad = ''; good = '"' },
            @{bad = '¢'; good = '•' },
            @{bad = '¦'; good = '…' },
            @{bad = '˜'; good = "'" }
        )
        
        foreach ($pair in $searches) {
            if ($content.IndexOf($pair.bad) -ge 0) {
                $content = $content.Replace($pair.bad, $pair.good)
                $modified = $true
            }
        }
        
        if ($modified) {
            $utf8NoBom = New-Object System.Text.UTF8Encoding $false
            [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
            "Fixed: $($file.FullName)" | Out-File $logFile -Append
            $totalFixed++
        }
        
    }
    catch {
        "Error processing $($file.FullName): $_" | Out-File $logFile -Append
    }
}

"Fixed $totalFixed files" | Out-File $logFile -Append
"Encoding fix completed at $(Get-Date)" | Out-File $logFile -Append
