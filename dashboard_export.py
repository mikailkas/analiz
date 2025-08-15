#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Data Export Script for Stock Analysis Dashboard
Bu script mevcut Python analiz sisteminden çıkan verileri 
web dashboard'u için uygun JSON formatına dönüştürür.
"""

import json
import pandas as pd
import os
from datetime import datetime

def export_analysis_to_dashboard(results, output_path="dashboard/data/stock_analysis.json"):
    """
    Python analiz sonuçlarını dashboard için JSON formatına dönüştürür
    
    Args:
        results: Python analiz sisteminden gelen sonuçlar (list of dict)
        output_path: Çıktı dosyası yolu
    """
    
    if not results:
        print("❌ Aktarılacak veri bulunamadı!")
        return
    
    # Gerekli alanları kontrol et ve düzenle
    dashboard_data = []
    
    for stock in results:
        # Dashboard için gereken temel alanları çıkar
        dashboard_stock = {
            "HİSSE KODU": stock.get("HİSSE KODU", ""),
            "SEKTÖR": stock.get("SEKTÖR", ""),
            "FİYAT": float(stock.get("FİYAT", 0)),
            "HEDEF FİYAT": float(stock.get("HEDEF FİYAT", 0)),
            "YÜKSELİŞ POTANSİYELİ (%)": float(stock.get("YÜKSELİŞ POTANSİYELİ (%)", 0)),
            "YATIRIM SKORU": float(stock.get("YATIRIM SKORU", 0)),
            "SAĞLIK SKORU": int(stock.get("SAĞLIK SKORU", 0)),
            "DEĞERLEME SKORU": int(stock.get("DEĞERLEME SKORU", 0)),
            "GELECEK SKORU": int(stock.get("GELECEK SKORU", 0)),
            "ROE (%)": float(stock.get("ROE (%)", 0)),
            "F/K": float(stock.get("F/K", 0)),
            "PD/DD": float(stock.get("PD/DD", 0)),
            "NET SATIŞ(M)": float(stock.get("NET SATIŞ(M)", 0)),
            "NET KAR(M)": float(stock.get("NET KAR(M)", 0)),
            "BORÇ ORAN(%)": float(stock.get("BORÇ ORAN(%)", 0)),
            # Dashboard için ekstra alanlar
            "EPS": float(stock.get("EPS", 0)),
            "DEFTER DEĞERİ": float(stock.get("DEFTER DEĞERİ", 0)),
            "TOPLAM VARLIK(M)": float(stock.get("TOPLAM VARLIK(M)", 0)),
            "ÖZKAYNAK(M)": float(stock.get("ÖZKAYNAK(M)", 0)),
            "ÖDENMİŞ SERMAYE(M)": float(stock.get("ÖDENMİŞ SERMAYE(M)", 0)),
            "FAALİYET KARI(M)": float(stock.get("FAALİYET KARI(M)", 0)),
            "ROA (%)": float(stock.get("ROA (%)", 0)),
            "ROIC (%)": float(stock.get("ROIC (%)", 0)),
            "NET.K.MARJ(%)": float(stock.get("NET.K.MARJ(%)", 0)),
            "BRÜT.K.MARJ(%)": float(stock.get("BRÜT.K.MARJ(%)", 0)),
            "FAAL.K.MARJ(%)": float(stock.get("FAAL.K.MARJ(%)", 0)),
            "EBITDA_MARJI": float(stock.get("EBITDA_MARJI", 0)),
            "LİKİT ORAN": float(stock.get("LİKİT ORAN", 0)),
            "NAKİT ORAN": float(stock.get("NAKİT ORAN", 0)),
            "ASİT.T.ORAN": float(stock.get("ASİT.T.ORAN", 0)),
            "EV/EBITDA": float(stock.get("EV/EBITDA", 0)),
            "FİYAT TRENDİ (%)": float(stock.get("FİYAT TRENDİ (%)", 0)),
            "YATIRIM KATEGORİ": stock.get("YATIRIM KATEGORİ", ""),
            "SAĞLIK KATEGORİ": stock.get("SAĞLIK KATEGORİ", ""),
            "DEĞERLEME KATEGORİ": stock.get("DEĞERLEME KATEGORİ", ""),
            "GELECEK KATEGORİ": stock.get("GELECEK KATEGORİ", ""),
            "DÖNEM": stock.get("DÖNEM", ""),
            "HEDEF FİYAT AÇIKLAMA": stock.get("HEDEF FİYAT AÇIKLAMA", ""),
            "UYARILAR": stock.get("UYARILAR", ""),
            # Analiz tarihi ekle
            "ANALİZ TARİHİ": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        dashboard_data.append(dashboard_stock)
    
    # Yatırım skoruna göre sırala
    dashboard_data.sort(key=lambda x: x["YATIRIM SKORU"], reverse=True)
    
    # Çıktı dizinini oluştur
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # JSON olarak kaydet
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(dashboard_data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Dashboard verisi oluşturuldu: {output_path}")
    print(f"📊 Toplam {len(dashboard_data)} hisse analiz edildi")
    
    # İstatistikleri yazdır
    if dashboard_data:
        avg_score = sum(stock["YATIRIM SKORU"] for stock in dashboard_data) / len(dashboard_data)
        top_performer = max(dashboard_data, key=lambda x: x["YATIRIM SKORU"])
        avg_potential = sum(stock["YÜKSELİŞ POTANSİYELİ (%)"] for stock in dashboard_data) / len(dashboard_data)
        
        print(f"📈 Ortalama Yatırım Skoru: {avg_score:.1f}")
        print(f"🏆 En İyi Performans: {top_performer['HİSSE KODU']} ({top_performer['YATIRIM SKORU']:.1f})")
        print(f"💰 Ortalama Yükseliş Potansiyeli: {avg_potential:.1f}%")

def export_excel_to_dashboard(excel_file, output_path="dashboard/data/stock_analysis.json"):
    """
    Excel dosyasından dashboard verisi oluştur
    
    Args:
        excel_file: Excel dosya yolu
        output_path: Çıktı JSON dosya yolu
    """
    try:
        # Excel dosyasını oku
        df = pd.read_excel(excel_file, sheet_name='YATIRIM ANALİZİ')
        
        # DataFrame'i dictionary listesine dönüştür
        results = df.to_dict('records')
        
        # Dashboard formatına dönüştür
        export_analysis_to_dashboard(results, output_path)
        
    except Exception as e:
        print(f"❌ Excel dosyası okunamadı: {str(e)}")

def create_sample_dashboard_data():
    """
    Demo amaçlı örnek dashboard verisi oluştur
    """
    sample_data = [
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
        },
        # Diğer örnek veriler...
    ]
    
    export_analysis_to_dashboard(sample_data, "dashboard/data/sample_data.json")

if __name__ == "__main__":
    print("🚀 Hisse Analiz Dashboard Veri Aktarım Aracı")
    print("=" * 50)
    
    # Kullanım örnekleri
    print("\n📋 KULLANIM ÖRNEKLERİ:")
    print("1. Python analiz sonuçlarından:")
    print("   export_analysis_to_dashboard(results)")
    print("\n2. Excel dosyasından:")
    print("   export_excel_to_dashboard('yatirim_analizi.xlsx')")
    print("\n3. Örnek veri oluşturma:")
    print("   create_sample_dashboard_data()")
    
    # Eğer Excel dosyası varsa otomatik dönüştür
    excel_files = [f for f in os.listdir('.') if f.endswith('.xlsx') and 'analiz' in f.lower()]
    if excel_files:
        print(f"\n📁 Excel dosyası bulundu: {excel_files[0]}")
        choice = input("Bu dosyayı dashboard verisine dönüştürmek istiyor musunuz? (y/n): ")
        if choice.lower() == 'y':
            export_excel_to_dashboard(excel_files[0])
    else:
        print("\n💡 Excel dosyası bulunamadı. Örnek veri oluşturuluyor...")
        create_sample_dashboard_data()