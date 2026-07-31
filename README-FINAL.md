# MoneyTrack — Final Sürüm

## Gereksinimler

- .NET 8 SDK
- Node.js 20 veya üzeri
- MySQL (localhost:3306)

## 1. Veritabanı ve API

`Backend/MoneyTrack.API/appsettings.json` içindeki bağlantı bilgisini kendi MySQL kullanıcı adın ve şifrenle kontrol et. Ardından terminalde:

```powershell
cd Backend/MoneyTrack.API
dotnet restore
dotnet run --launch-profile https
```

API açılırken EF Core migration'ları otomatik uygular. Veritabanında kategori yoksa temel kategorileri bir kez oluşturur. Swagger adresi:

`https://localhost:7164/swagger`

HTTPS sertifika uyarısı alınırsa bir kez şu komutu çalıştır:

```powershell
dotnet dev-certs https --trust
```

## 2. React arayüzü

Yeni bir terminalde:

```powershell
cd Frontend
npm install
npm run dev
```

Site adresi: `http://localhost:5173`

API farklı bir adreste çalışıyorsa `Frontend/.env` dosyası oluştur:

```text
VITE_API_URL=https://localhost:7164/api
```

## Kontrol edilenler

- React production build
- ESLint
- .NET build (0 hata, 0 uyarı)
- MySQL bağlantısı ve EF Core migration kontrolü
- Swagger canlı HTTP yanıtı
