Get-ChildItem -Recurse -Filter *.ts | ForEach-Object {
    (Get-Content $_.FullName) | Where-Object { $_.Trim() -ne "" } | Set-Content $_.FullName -Encoding utf8
}
