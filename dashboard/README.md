# 📊 Hisse Senedi Analiz Dashboard

Modern ve interaktif web tabanlı hisse senedi analiz dashboard'u. Mevcut Python finansal analiz sisteminden elde edilen verileri görselleştiren, kullanıcı dostu ve responsive bir web uygulaması.

## 🌟 Özellikler

### Ana Özellikler
- **📈 Genel Bakış Kartları**: Toplam analiz edilen hisse sayısı, ortalama yatırım skoru, en iyi performans
- **📊 Yatırım Skoru Dağılımı**: Histogram grafik ile skorların dağılımı
- **🏭 Sektörel Karşılaştırma**: Sektörlere göre ortalama yatırım skorları
- **🏆 En İyi 10 Hisse Tablosu**: Detaylı bilgilerle interaktif tablo
- **💹 Risk-Getiri Analizi**: ROE vs F/K scatter plot
- **🎯 Hedef Fiyat Analizi**: Mevcut fiyat vs hedef fiyat karşılaştırması
- **📈 Performans Metrikleri**: ROE, ROA, ROIC gibi temel oranların radar chart ile görselleştirilmesi

### Teknik Özellikler
- ✅ **Responsive tasarım**: Tüm cihazlarda mükemmel görüntü
- 🎨 **Modern CSS3**: Gradient'lar, shadow'lar, animasyonlar
- 📊 **Chart.js**: İnteraktif ve profesyonel grafikler
- 🎨 **Bootstrap 5**: Temiz ve modern UI bileşenleri
- 🌓 **Koyu/Açık tema**: Göz dostu tema değiştirme
- 🔍 **Filtre ve Arama**: Hisse kodu ve sektöre göre filtreleme
- 📱 **Mobil Uyumlu**: Responsive grid sistemi

### Tasarım Özellikleri
- 🎨 **Professional finans teması**: Mavi-beyaz tonları
- ✨ **Hover efektleri ve animasyonlar**: Smooth geçişler
- 🌈 **Gradient backgrounds**: Modern görsel efektler
- 💫 **Shadow efektleri**: Derinlik hissi veren kartlar
- 🔤 **Modern tipografi**: Okunabilir fontlar

## 📁 Dosya Yapısı

```
dashboard/
├── index.html              # Ana dashboard sayfası
├── css/
│   └── style.css           # Modern CSS stilleri
├── js/
│   └── main.js             # Dashboard JavaScript kodu
└── data/
    └── stock_analysis.json # Hisse analiz verileri
```

## 🚀 Kurulum ve Kullanım

### 1. Basit Kullanım
Dashboard'u kullanmak için sadece `index.html` dosyasını bir web tarayıcısında açın:

```bash
# Dashboard dizinine gidin
cd dashboard

# Web tarayıcısında açın
open index.html
# veya
python -m http.server 8000
# Sonra http://localhost:8000 adresine gidin
```

### 2. Python Analiz Verilerini Yükleme

Mevcut Python analiz sisteminizden gelen verileri dashboard'a aktarmak için:

```python
# dashboard_export.py dosyasını kullanın
from dashboard_export import export_analysis_to_dashboard

# Python analiz sonuçlarınızı dashboard formatına dönüştürün
results = await analyzer.batch_analyze(stock_list)
export_analysis_to_dashboard(results)
```

### 3. Excel Dosyasından Veri Yükleme

Excel dosyanızdan dashboard verisi oluşturmak için:

```python
from dashboard_export import export_excel_to_dashboard

# Excel dosyasını dashboard formatına dönüştürün
export_excel_to_dashboard('yatirim_analizi.xlsx')
```

## 📊 Veri Formatı

Dashboard aşağıdaki JSON formatını beklemektedir:

```json
[
  {
    "HİSSE KODU": "THYAO",
    "SEKTÖR": "ULAŞTIRMA",
    "FİYAT": 85.50,
    "HEDEF FİYAT": 102.60,
    "YÜKSELİŞ POTANSİYELİ (%)": 20.0,
    "YATIRIM SKORU": 85.2,
    "SAĞLIK SKORU": 88,
    "DEĞERLEME SKORU": 82,
    "GELECEK SKORU": 86,
    "ROE (%)": 15.8,
    "F/K": 8.5,
    "PD/DD": 1.2,
    "NET SATIŞ(M)": 45000,
    "NET KAR(M)": 7200,
    "BORÇ ORAN(%)": 35.2
  }
]
```

## 🎨 Tema Özelleştirme

### CSS Değişkenleri
Dashboard CSS değişkenleri kullanarak kolayca özelleştirilebilir:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --success-color: #16a34a;
    --danger-color: #dc2626;
    --warning-color: #d97706;
    --info-color: #0891b2;
}
```

### Tema Değiştirme
Dashboard otomatik olarak koyu/açık tema desteği sunar. Kullanıcılar sağ üst köşedeki düğme ile tema değiştirebilir.

## 📱 Responsive Tasarım

Dashboard tüm cihaz boyutlarında mükemmel çalışır:

- 🖥️ **Desktop**: Tam özellik seti
- 📱 **Tablet**: Optimize edilmiş layout
- 📱 **Mobile**: Dokunmatik uyumlu arayüz

## 🔧 Gelişmiş Özellikler

### Grafik Özelleştirme
Chart.js konfigürasyonları `main.js` dosyasında özelleştirilebilir:

```javascript
// Örnek: Renk paleti değiştirme
const colors = ['#2563eb', '#16a34a', '#d97706', '#dc2626'];
```

### Filtre Sistemi
- **Hisse Kodu Arama**: Gerçek zamanlı arama
- **Sektör Filtresi**: Dropdown ile sektör seçimi
- **Skor Filtreleri**: Min/max skor aralıkları (geliştirilebilir)

### Sıralama Sistemi
Tablolar tüm sütunlara göre sıralanabilir:
- Yatırım skoru
- Hedef getiri
- ROE
- F/K oranı
- Sektör

## 🔄 Veri Güncelleme

Dashboard'da "Verileri Yenile" düğmesi ile veriler güncellenebilir. Bu özellik:

1. `data/stock_analysis.json` dosyasını tekrar okur
2. Tüm grafikleri günceller
3. Tablo verilerini yeniler
4. İstatistikleri hesaplar

## 🚀 Performans Optimizasyonu

- **Lazy Loading**: Büyük veri setleri için
- **Debounced Search**: Arama performansı
- **Chart Caching**: Grafik yeniden çizim optimizasyonu
- **CSS Transitions**: Smooth animasyonlar

## 📈 Kullanım Senaryoları

### 1. Günlük Analiz
```javascript
// Günlük rutin için hızlı bakış
dashboard.updateOverviewCards();
dashboard.updateCharts();
```

### 2. Sektörel Karşılaştırma
```javascript
// Belirli bir sektörü filtreleme
document.getElementById('sectorFilter').value = 'BANKALAR';
dashboard.filterStocks();
```

### 3. En İyi Hisseler
```javascript
// En yüksek skorlu 10 hisseyi göster
const top10 = data.sort((a, b) => b.YATIRIM_SKORU - a.YATIRIM_SKORU).slice(0, 10);
```

## 🎯 Gelecek Geliştirmeler

- [ ] **Real-time veri**: WebSocket ile canlı veriler
- [ ] **Portföy takibi**: Kişisel portföy yönetimi
- [ ] **Uyarı sistemi**: Skor değişiklikleri için bildirimler
- [ ] **PDF Export**: Rapor dışa aktarma
- [ ] **Karşılaştırma aracı**: Hisse karşılaştırma
- [ ] **Geçmiş veriler**: Tarihsel performans grafikleri

## 📞 Destek

Bu dashboard'u kullanırken herhangi bir sorunla karşılaşırsanız:

1. **Console Log**: Tarayıcı geliştirici araçlarını kontrol edin
2. **Veri Formatı**: JSON formatının doğru olduğundan emin olun
3. **Dosya Yolları**: Tüm dosyaların doğru dizinde olduğunu kontrol edin

## 📄 Lisans

Bu proje MIT lisansı altında sunulmaktadır. Ticari ve kişisel kullanım serbesttir.

---

**💡 İpucu**: Dashboard'u kullanmadan önce Python analiz sisteminizi çalıştırıp güncel verileri `dashboard_export.py` ile aktarmayı unutmayın!