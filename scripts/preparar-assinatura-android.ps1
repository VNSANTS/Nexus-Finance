param(
  [string]$Alias = 'nexus-finance-beta'
)

# Run only when no release keystore/secrets already exist. Replacing the
# signing key makes APKs installed with the previous key impossible to update.

$ErrorActionPreference = 'Stop'
$keytool = Get-Command keytool -ErrorAction SilentlyContinue
if (-not $keytool) { throw 'JDK não encontrado. Instale o Temurin JDK 21 e tente novamente.' }

$secureDir = Join-Path ([Environment]::GetFolderPath('UserProfile')) '.nexus-finance-signing'
New-Item -ItemType Directory -Force -Path $secureDir | Out-Null
$keystore = Join-Path $secureDir 'nexus-finance-release.p12'
if (Test-Path $keystore) { throw "Já existe uma keystore em $keystore. Não a sobrescrevi." }

$securePassword = Read-Host 'Crie uma senha forte para a keystore (guarde em um gerenciador de senhas)' -AsSecureString
if ($securePassword.Length -lt 12) { throw 'Use uma senha com pelo menos 12 caracteres.' }
$passwordPtr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
try {
  $password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($passwordPtr)
  $env:NEXUS_SIGNING_PASSWORD = $password
  & $keytool.Source -genkeypair -v -keystore $keystore -storetype PKCS12 -alias $Alias `
    -keyalg RSA -keysize 3072 -validity 10000 `
    -dname 'CN=Nexus Finance Beta, OU=Android, O=VNSANTS, L=Salvador, ST=Bahia, C=BR' `
    -storepass:env NEXUS_SIGNING_PASSWORD -keypass:env NEXUS_SIGNING_PASSWORD -noprompt
  if ($LASTEXITCODE -ne 0) { throw 'keytool falhou ao criar a keystore.' }
} finally {
  Remove-Item Env:NEXUS_SIGNING_PASSWORD -ErrorAction SilentlyContinue
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($passwordPtr)
}

$base64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($keystore))
Set-Clipboard -Value $base64
Write-Host "Keystore criada em: $keystore"
Write-Host 'ANDROID_KEYSTORE_BASE64 foi copiado para a área de transferência.'
Write-Host "ANDROID_KEY_ALIAS: $Alias"
Write-Host 'Use a MESMA senha da keystore nos secrets ANDROID_KEYSTORE_PASSWORD e ANDROID_KEY_PASSWORD.'
Write-Host 'Cadastre esses quatro valores como GitHub Actions repository secrets. Nunca envie senha ou keystore no chat.'
Write-Host 'Guarde uma cópia segura da keystore e da senha. Sem ambas não será possível atualizar o app instalado.'
