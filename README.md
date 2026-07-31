# Kayıt Defterim

Kayıt Defterim; kullanıcıların gelir, gider, kategori, aylık bütçe ve birikim hedeflerini tek panelden takip edebilmesi için geliştirilmiş tam kapsamlı bir kişisel finans uygulamasıdır.

## Öne çıkan özellikler

- JWT tabanlı kayıt, giriş ve korumalı sayfalar
- Kullanıcıya özel gelir ve gider kayıtları
- İşlem ekleme, düzenleme, silme, arama ve filtreleme
- Dinamik kategori yönetimi
- Başlangıç bakiyesi ve aylık harcama limiti
- Güncel bakiye, gelir ve gider hesaplamaları
- Aylık finans hareketi ve kategori dağılımı grafikleri
- Çoklu birikim hedefleri ve ilerleme göstergesi
- Açık/koyu tema
- Masaüstü, tablet ve mobil uyumlu arayüz

## Teknolojiler

### Frontend

- React 19
- Vite
- React Router
- Recharts
- CSS responsive tasarım

### Backend

- ASP.NET Core 8 Web API
- Entity Framework Core
- MySQL
- JWT Authentication
- BCrypt parola şifreleme
- Swagger / OpenAPI

## Mimari

```text
React arayüzü
     │ HTTPS + JSON + JWT
     ▼
ASP.NET Core Web API
     │ Entity Framework Core
     ▼
MySQL veritabanı
```

API, JWT içindeki kullanıcı kimliğini okuyarak işlemleri yalnızca oturum açmış kullanıcı için sorgular. Parolalar düz metin olarak değil BCrypt özeti şeklinde saklanır.

## Kurulum

### Backend

`Backend/MoneyTrack.API/appsettings.example.json` dosyasını `appsettings.json` adıyla kopyalayın. MySQL parolanızı ve en az 32 karakterlik rastgele JWT anahtarınızı yazdıktan sonra:

```powershell
cd Backend/MoneyTrack.API
dotnet restore
dotnet run --launch-profile https
```

Swagger: `https://localhost:7164/swagger`

### Frontend

```powershell
cd Frontend
npm install
npm run dev
```

Uygulama: `http://localhost:5173`

## Temel hesaplamalar

```text
Güncel bakiye = Başlangıç bakiyesi + Toplam gelir - Toplam gider
Bütçe kullanımı = Bu ayın giderleri / Aylık bütçe × 100
Hedef ilerlemesi = Biriken tutar / Hedef tutarı × 100
```

## Güvenlik

- Korumalı API uçlarında `[Authorize]` kullanılır.
- Kullanıcı kimliği istemciden değil JWT claim bilgisinden alınır.
- İşlem sorguları kullanıcı kimliğiyle filtrelenir.
- DTO doğrulamaları geçersiz tutar ve boş açıklamaları engeller.
- Parolalar BCrypt ile hashlenir.

## Test edilen komutlar

```powershell
cd Frontend
npm run lint
npm run build

cd ../Backend/MoneyTrack.API
dotnet build
```

## Geliştirici notu

Bu proje; frontend–backend entegrasyonu, kimlik doğrulama, ilişkisel veri modelleme, responsive arayüz ve gerçek finansal hesaplamalar üzerine uygulamalı çalışma amacıyla geliştirilmiştir.
