# Kitapsepeti.com – Cypress E2E Test Otomasyonu

## 📌 Proje Hakkında
Kitapsepeti.com e-ticaret platformunun sepet ve ödeme süreçlerini kapsayan uçtan uca (E2E) test otomasyon projesidir.

## 🧪 Test Edilen User Story'ler
| User Story | Konu |
|---|---|
| US01 | Kullanıcı Girişi |
| US02 | Ürün Arama ve Listeleme |
| US03 | Ürün Detay Sayfası ve Sepete Ekleme |
| US04 | Sepet Yönetimi ve Kontrolü |
| US05 | Ödeme ve Sipariş Onayı |
| US06 | Misafir Olarak Satın Alma Akışı |

## 🛠️ Kullanılan Teknolojiler
- JavaScript
- Cypress
- Page Object Model (POM) mimarisi

## 📁 Klasör Yapısı


kitapsepeti-cypress/
├── cypress/
│   ├── e2e/          → Test dosyaları
│   ├── pages/        → POM sınıfları
│   ├── fixtures/     → Test verileri
│   └── support/      → Yardımcı komutlar
├── evidence/         → Ekran görüntüleri
└── cypress.config.js


## ⚙️ Kurulum

```bash
npm install


🚀 Testleri Çalıştırma

# Headless mod
npx cypress run

# Arayüz ile
npx cypress open


📊 Test Sonuçları
	∙	Video çıktıları: https://drive.google.com/drive/folders/1yu1JQhejhsCZ2pISsUescM3_2Gi0bQUh?usp=drive_link
	∙	Manuel Testler: https://docs.google.com/spreadsheets/d/1uee_BsurqkPWSUblX28IQ2FfNphz8iCB52aOHEOX1gc/edit?usp=sharing
    .   Mocha Test Raporu: https://mervekimyagonbe.github.io/kitapsepeti-automation/
👤 Geliştirici
	∙	Merve GÖNBE
	∙




