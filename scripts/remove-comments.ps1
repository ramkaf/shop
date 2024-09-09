Get-ChildItem -Recurse -Filter *.ts | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $content -replace '/\*[\s\S]*?\*/', '' -replace '//.*', '' -replace '^\s*[\r\n]', ''
    $newContent | Set-Content $_.FullName -Encoding utf8
}
