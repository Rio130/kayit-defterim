# Kayıt Defterim'i Anlatma Rehberi

## 30 saniyelik proje anlatımı

“Kayıt Defterim, React ve ASP.NET Core kullanarak geliştirdiğim kişisel finans takip uygulaması. Kullanıcılar JWT ile giriş yaptıktan sonra gelir ve giderlerini, kategorilerini, aylık bütçelerini ve birikim hedeflerini yönetebiliyor. Veriler MySQL'de Entity Framework Core üzerinden saklanıyor. Backend sorguları JWT'deki kullanıcı kimliğine göre filtrelediği için her kullanıcı yalnızca kendi işlemlerini görüyor. Arayüz responsive ve açık/koyu tema destekli.”

## Veri modeli

```text
User 1 ───── N Transaction N ───── 1 Category
```

- `User`: ad, e-posta, parola özeti ve oluşturulma tarihi
- `Transaction`: tutar, açıklama, tarih, gelir/gider türü, kullanıcı ve kategori
- `Category`: ad, ikon ve ilişkili işlemler

## İstek akışı

1. Kullanıcı giriş formunu gönderir.
2. API e-posta ve parolayı doğrular.
3. API, kullanıcı kimliğini içeren JWT üretir.
4. Frontend tokenı sonraki isteklerde `Authorization: Bearer` başlığıyla gönderir.
5. Controller, kullanıcı kimliğini JWT claim bilgisinden okur.
6. EF Core sorguyu kullanıcı kimliğine göre filtreler.
7. Sonuç JSON olarak React arayüzüne döner.

## Neden bu teknolojileri seçtim?

### React

Bileşen tabanlı arayüz, state yönetimi ve veriler değiştiğinde ekranın otomatik güncellenmesi için.

### ASP.NET Core

Tip güvenliği, yerleşik dependency injection, JWT desteği ve güçlü Web API altyapısı için.

### Entity Framework Core

SQL sorgularını elle yazmadan ilişkileri modellemek, migration yönetmek ve LINQ kullanmak için.

### MySQL

Kullanıcı, işlem ve kategori ilişkilerini güvenilir şekilde saklayan ilişkisel veritabanı olduğu için.

## Sık sorulan mülakat soruları

### Kullanıcıların verilerini nasıl ayırdın?

Her korumalı istekte kullanıcı kimliğini JWT içindeki `NameIdentifier` claim'inden alıyorum. İşlem sorgularında `UserId` filtresi uyguluyorum. Böylece kullanıcı başka bir işlem ID'sini tahmin etse bile o kayda erişemiyor.

### Parolalar nasıl korunuyor?

Parolayı veritabanına doğrudan yazmıyorum. BCrypt ile hash oluşturup yalnızca hash değerini saklıyorum. Girişte BCrypt doğrulaması yapıyorum.

### Bakiye nasıl hesaplanıyor?

Başlangıç bakiyesine gelir kayıtlarını ekleyip gider kayıtlarını çıkarıyorum. Gelir ve gider toplamlarını işlemlerdeki `IsIncome` alanına göre ayırıyorum.

### Route koruması nasıl çalışıyor?

Frontend token yoksa kullanıcıyı giriş sayfasına yönlendiriyor. Asıl güvenlik backend'deki `[Authorize]` niteliğiyle sağlanıyor. Frontend koruması tek başına güvenlik değildir.

### Neden DTO kullandın?

Veritabanı modelini doğrudan dışarı açmamak ve gelen veriyi doğrulamak için. DTO, API sözleşmesini veri modelinden ayırıyor.

### Uygulamayı nasıl geliştirebilirsin?

- Birikim hedeflerini backend veritabanına taşımak
- Yenileme tokenı eklemek
- Sayfalama ve gelişmiş raporlama eklemek
- Unit ve integration testleri yazmak
- Docker ile kurulum sağlamak
- Production CORS ve secret yönetimi eklemek

## Canlı sunum sırası

1. Yeni kullanıcı kaydı oluştur.
2. Giriş yap ve JWT akışını açıkla.
3. Başlangıç bakiyesi belirle.
4. Bir gelir ve bir gider ekle.
5. Dashboard hesaplarının değiştiğini göster.
6. Arama ve filtreleri göster.
7. Kategori ekle ve güncelle.
8. Birikim hedefi oluşturup para ekle.
9. Mobil görünümü ve koyu temayı göster.
10. Swagger'da korumalı endpointleri göster.

## Dürüst portföy anlatımı

Projeyi geliştirirken dokümantasyon, hata ayıklama araçları ve yapay zekâ destekli geliştirme araçlarından yararlandığını söyleyebilirsin. Önemli olan mimari kararları, kodun çalışma biçimini ve güvenlik yaklaşımını açıklayabilmendir.
