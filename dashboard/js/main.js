// Main JavaScript for Hisse Analiz Dashboard

class StockDashboard {
    constructor() {
        this.data = [];
        this.filteredData = [];
        this.charts = {};
        this.currentTheme = 'light';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadSampleData();
        this.setupCharts();
    }
    
    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Data refresh
        document.getElementById('refreshData').addEventListener('click', () => {
            this.loadData();
        });
        
        // Search functionality
        document.getElementById('stockSearch').addEventListener('input', (e) => {
            this.filterStocks();
        });
        
        // Sector filter
        document.getElementById('sectorFilter').addEventListener('change', (e) => {
            this.filterStocks();
        });
        
        // Table sorting
        document.querySelectorAll('.sortable').forEach(header => {
            header.addEventListener('click', () => {
                this.sortTable(header.dataset.sort);
            });
        });
    }
    
    toggleTheme() {
        const body = document.body;
        const themeIcon = document.getElementById('themeIcon');
        
        if (this.currentTheme === 'light') {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeIcon.className = 'fas fa-sun';
            this.currentTheme = 'dark';
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeIcon.className = 'fas fa-moon';
            this.currentTheme = 'light';
        }
        
        // Update charts with new theme
        this.updateChartsTheme();
    }
    
    showLoading() {
        document.getElementById('loadingOverlay').style.display = 'flex';
    }
    
    hideLoading() {
        document.getElementById('loadingOverlay').style.display = 'none';
    }
    
    // Load sample data for demonstration
    loadSampleData() {
        this.data = [
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
            {
                "HİSSE KODU": "SASA",
                "SEKTÖR": "KIMYA PLASTİK",
                "FİYAT": 28.40,
                "HEDEF FİYAT": 36.80,
                "YÜKSELİŞ POTANSİYELİ (%)": 29.6,
                "YATIRIM SKORU": 78.5,
                "SAĞLIK SKORU": 82,
                "DEĞERLEME SKORU": 75,
                "GELECEK SKORU": 78,
                "ROE (%)": 18.3,
                "F/K": 6.2,
                "PD/DD": 0.9,
                "NET SATIŞ(M)": 12500,
                "NET KAR(M)": 1800,
                "BORÇ ORAN(%)": 28.5
            },
            {
                "HİSSE KODU": "ARCLK",
                "SEKTÖR": "DAYANIKLI TÜKETİM MALLARI",
                "FİYAT": 42.15,
                "HEDEF FİYAT": 54.20,
                "YÜKSELİŞ POTANSİYELİ (%)": 28.6,
                "YATIRIM SKORU": 72.8,
                "SAĞLIK SKORU": 75,
                "DEĞERLEME SKORU": 70,
                "GELECEK SKORU": 73,
                "ROE (%)": 12.7,
                "F/K": 9.8,
                "PD/DD": 1.4,
                "NET SATIŞ(M)": 18500,
                "NET KAR(M)": 2100,
                "BORÇ ORAN(%)": 42.1
            },
            {
                "HİSSE KODU": "KCHOL",
                "SEKTÖR": "HOLDİNG",
                "FİYAT": 156.80,
                "HEDEF FİYAT": 188.20,
                "YÜKSELİŞ POTANSİYELİ (%)": 20.0,
                "YATIRIM SKORU": 68.5,
                "SAĞLIK SKORU": 72,
                "DEĞERLEME SKORU": 65,
                "GELECEK SKORU": 68,
                "ROE (%)": 11.2,
                "F/K": 12.5,
                "PD/DD": 1.8,
                "NET SATIŞ(M)": 65000,
                "NET KAR(M)": 5800,
                "BORÇ ORAN(%)": 55.8
            },
            {
                "HİSSE KODU": "AKBNK",
                "SEKTÖR": "BANKALAR",
                "FİYAT": 52.20,
                "HEDEF FİYAT": 65.25,
                "YÜKSELİŞ POTANSİYELİ (%)": 25.0,
                "YATIRIM SKORU": 65.8,
                "SAĞLIK SKORU": 68,
                "DEĞERLEME SKORU": 63,
                "GELECEK SKORU": 66,
                "ROE (%)": 14.5,
                "F/K": 7.2,
                "PD/DD": 1.1,
                "NET SATIŞ(M)": 35000,
                "NET KAR(M)": 8500,
                "BORÇ ORAN(%)": 25.5
            },
            {
                "HİSSE KODU": "TUPRS",
                "SEKTÖR": "KIMYA PLASTİK",
                "FİYAT": 89.75,
                "HEDEF FİYAT": 98.50,
                "YÜKSELİŞ POTANSİYELİ (%)": 9.7,
                "YATIRIM SKORU": 62.5,
                "SAĞLIK SKORU": 65,
                "DEĞERLEME SKORU": 58,
                "GELECEK SKORU": 64,
                "ROE (%)": 16.8,
                "F/K": 11.2,
                "PD/DD": 2.1,
                "NET SATIŞ(M)": 28500,
                "NET KAR(M)": 3200,
                "BORÇ ORAN(%)": 38.2
            },
            {
                "HİSSE KODU": "GARAN",
                "SEKTÖR": "BANKALAR",
                "FİYAT": 88.90,
                "HEDEF FİYAT": 105.60,
                "YÜKSELİŞ POTANSİYELİ (%)": 18.8,
                "YATIRIM SKORU": 61.2,
                "SAĞLIK SKORU": 64,
                "DEĞERLEME SKORU": 57,
                "GELECEK SKORU": 62,
                "ROE (%)": 13.8,
                "F/K": 8.9,
                "PD/DD": 1.3,
                "NET SATIŞ(M)": 42000,
                "NET KAR(M)": 9200,
                "BORÇ ORAN(%)": 22.8
            },
            {
                "HİSSE KODU": "BIMAS",
                "SEKTÖR": "TOPTAN PARAKENDE",
                "FİYAT": 385.50,
                "HEDEF FİYAT": 425.80,
                "YÜKSELİŞ POTANSİYELİ (%)": 10.5,
                "YATIRIM SKORU": 58.8,
                "SAĞLIK SKORU": 62,
                "DEĞERLEME SKORU": 54,
                "GELECEK SKORU": 60,
                "ROE (%)": 22.5,
                "F/K": 15.8,
                "PD/DD": 3.2,
                "NET SATIŞ(M)": 85000,
                "NET KAR(M)": 8500,
                "BORÇ ORAN(%)": 45.2
            },
            {
                "HİSSE KODU": "EREGL",
                "SEKTÖR": "ANA METAL",
                "FİYAT": 48.25,
                "HEDEF FİYAT": 52.80,
                "YÜKSELİŞ POTANSİYELİ (%)": 9.4,
                "YATIRIM SKORU": 55.2,
                "SAĞLIK SKORU": 58,
                "DEĞERLEME SKORU": 51,
                "GELECEK SKORU": 56,
                "ROE (%)": 8.5,
                "F/K": 18.2,
                "PD/DD": 1.6,
                "NET SATIŞ(M)": 32000,
                "NET KAR(M)": 2800,
                "BORÇ ORAN(%)": 48.5
            },
            {
                "HİSSE KODU": "SISE",
                "SEKTÖR": "CAM SERAMİK",
                "FİYAT": 18.85,
                "HEDEF FİYAT": 21.50,
                "YÜKSELİŞ POTANSİYELİ (%)": 14.1,
                "YATIRIM SKORU": 52.8,
                "SAĞLIK SKORU": 55,
                "DEĞERLEME SKORU": 49,
                "GELECEK SKORU": 54,
                "ROE (%)": 9.8,
                "F/K": 12.5,
                "PD/DD": 1.8,
                "NET SATIŞ(M)": 15500,
                "NET KAR(M)": 1200,
                "BORÇ ORAN(%)": 52.8
            }
        ];
        
        this.filteredData = [...this.data];
        this.updateDashboard();
    }
    
    async loadData() {
        this.showLoading();
        
        try {
            // Try to load data from JSON file or API
            const response = await fetch('data/stock_analysis.json');
            if (response.ok) {
                this.data = await response.json();
                this.filteredData = [...this.data];
                this.updateDashboard();
            } else {
                throw new Error('Data file not found');
            }
        } catch (error) {
            console.log('Using sample data:', error.message);
            // Fallback to sample data
            this.loadSampleData();
        }
        
        this.hideLoading();
    }
    
    updateDashboard() {
        this.updateOverviewCards();
        this.updateCharts();
        this.updateTable();
        this.populateSectorFilter();
    }
    
    updateOverviewCards() {
        const totalStocks = this.filteredData.length;
        const avgScore = totalStocks > 0 ? 
            (this.filteredData.reduce((sum, stock) => sum + stock["YATIRIM SKORU"], 0) / totalStocks).toFixed(1) : 0;
        
        const topPerformer = this.filteredData.reduce((prev, current) => 
            (prev["YATIRIM SKORU"] > current["YATIRIM SKORU"]) ? prev : current, {});
        
        const avgTargetReturn = totalStocks > 0 ?
            (this.filteredData.reduce((sum, stock) => sum + stock["YÜKSELİŞ POTANSİYELİ (%)"], 0) / totalStocks).toFixed(1) : 0;
        
        document.getElementById('totalStocks').textContent = totalStocks;
        document.getElementById('avgInvestmentScore').textContent = avgScore;
        document.getElementById('topPerformer').textContent = topPerformer["HİSSE KODU"] || '---';
        document.getElementById('topPerformerScore').textContent = topPerformer["YATIRIM SKORU"] ? 
            `${topPerformer["YATIRIM SKORU"]}/100` : '---';
        document.getElementById('avgTargetReturn').textContent = avgTargetReturn;
    }
    
    setupCharts() {
        // Chart.js default configuration
        Chart.defaults.font.family = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
        Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
        
        this.createScoreDistributionChart();
        this.createSectorComparisonChart();
        this.createRiskReturnChart();
        this.createTargetPriceChart();
        this.createPerformanceMetricsChart();
    }
    
    createScoreDistributionChart() {
        const ctx = document.getElementById('scoreDistributionChart').getContext('2d');
        
        // Create score distribution data
        const scoreRanges = ['0-20', '20-40', '40-60', '60-80', '80-100'];
        const scoreCounts = [0, 0, 0, 0, 0];
        
        this.filteredData.forEach(stock => {
            const score = stock["YATIRIM SKORU"];
            if (score < 20) scoreCounts[0]++;
            else if (score < 40) scoreCounts[1]++;
            else if (score < 60) scoreCounts[2]++;
            else if (score < 80) scoreCounts[3]++;
            else scoreCounts[4]++;
        });
        
        this.charts.scoreDistribution = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: scoreRanges,
                datasets: [{
                    label: 'Hisse Sayısı',
                    data: scoreCounts,
                    backgroundColor: [
                        'rgba(220, 38, 38, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(16, 163, 74, 0.8)'
                    ],
                    borderColor: [
                        'rgb(220, 38, 38)',
                        'rgb(245, 158, 11)',
                        'rgb(59, 130, 246)',
                        'rgb(34, 197, 94)',
                        'rgb(16, 163, 74)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    createSectorComparisonChart() {
        const ctx = document.getElementById('sectorComparisonChart').getContext('2d');
        
        // Group by sector and calculate averages
        const sectorData = {};
        this.filteredData.forEach(stock => {
            const sector = stock["SEKTÖR"];
            if (!sectorData[sector]) {
                sectorData[sector] = {
                    scores: [],
                    count: 0
                };
            }
            sectorData[sector].scores.push(stock["YATIRIM SKORU"]);
            sectorData[sector].count++;
        });
        
        const sectorLabels = [];
        const sectorAverages = [];
        
        Object.keys(sectorData).forEach(sector => {
            const avgScore = sectorData[sector].scores.reduce((a, b) => a + b, 0) / sectorData[sector].scores.length;
            sectorLabels.push(sector);
            sectorAverages.push(avgScore.toFixed(1));
        });
        
        // Sort by average score
        const sortedData = sectorLabels.map((label, index) => ({
            label,
            average: parseFloat(sectorAverages[index])
        })).sort((a, b) => b.average - a.average).slice(0, 8); // Top 8 sectors
        
        this.charts.sectorComparison = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: sortedData.map(d => d.label),
                datasets: [{
                    label: 'Ortalama Yatırım Skoru',
                    data: sortedData.map(d => d.average),
                    backgroundColor: 'rgba(8, 145, 178, 0.8)',
                    borderColor: 'rgb(8, 145, 178)',
                    borderWidth: 2,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    createRiskReturnChart() {
        const ctx = document.getElementById('riskReturnChart').getContext('2d');
        
        const chartData = this.filteredData.map(stock => ({
            x: stock["F/K"],
            y: stock["ROE (%)"],
            label: stock["HİSSE KODU"],
            score: stock["YATIRIM SKORU"]
        }));
        
        this.charts.riskReturn = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Hisse Senetleri',
                    data: chartData,
                    backgroundColor: chartData.map(point => {
                        const score = point.score;
                        if (score >= 80) return 'rgba(16, 163, 74, 0.8)';
                        if (score >= 60) return 'rgba(34, 197, 94, 0.8)';
                        if (score >= 40) return 'rgba(59, 130, 246, 0.8)';
                        if (score >= 20) return 'rgba(245, 158, 11, 0.8)';
                        return 'rgba(220, 38, 38, 0.8)';
                    }),
                    borderColor: chartData.map(point => {
                        const score = point.score;
                        if (score >= 80) return 'rgb(16, 163, 74)';
                        if (score >= 60) return 'rgb(34, 197, 94)';
                        if (score >= 40) return 'rgb(59, 130, 246)';
                        if (score >= 20) return 'rgb(245, 158, 11)';
                        return 'rgb(220, 38, 38)';
                    }),
                    borderWidth: 2,
                    pointRadius: 8,
                    pointHoverRadius: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                return context[0].raw.label;
                            },
                            label: function(context) {
                                return [
                                    `F/K: ${context.raw.x.toFixed(1)}`,
                                    `ROE: ${context.raw.y.toFixed(1)}%`,
                                    `Yatırım Skoru: ${context.raw.score.toFixed(1)}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'F/K Oranı'
                        },
                        grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'ROE (%)'
                        },
                        grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                        }
                    }
                }
            }
        });
    }
    
    createTargetPriceChart() {
        const ctx = document.getElementById('targetPriceChart').getContext('2d');
        
        const top10 = this.filteredData
            .sort((a, b) => b["YATIRIM SKORU"] - a["YATIRIM SKORU"])
            .slice(0, 10);
        
        this.charts.targetPrice = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: top10.map(stock => stock["HİSSE KODU"]),
                datasets: [
                    {
                        label: 'Mevcut Fiyat',
                        data: top10.map(stock => stock["FİYAT"]),
                        backgroundColor: 'rgba(59, 130, 246, 0.8)',
                        borderColor: 'rgb(59, 130, 246)',
                        borderWidth: 2,
                        borderRadius: 6
                    },
                    {
                        label: 'Hedef Fiyat',
                        data: top10.map(stock => stock["HEDEF FİYAT"]),
                        backgroundColor: 'rgba(16, 163, 74, 0.8)',
                        borderColor: 'rgb(16, 163, 74)',
                        borderWidth: 2,
                        borderRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Fiyat (TL)'
                        },
                        grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    createPerformanceMetricsChart() {
        const ctx = document.getElementById('performanceMetricsChart').getContext('2d');
        
        const top10 = this.filteredData
            .sort((a, b) => b["YATIRIM SKORU"] - a["YATIRIM SKORU"])
            .slice(0, 10);
        
        this.charts.performanceMetrics = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Sağlık Skoru', 'Değerleme Skoru', 'Gelecek Skoru', 'ROE (%)', 'Borç Oranı (Ters)'],
                datasets: top10.slice(0, 5).map((stock, index) => ({
                    label: stock["HİSSE KODU"],
                    data: [
                        stock["SAĞLIK SKORU"],
                        stock["DEĞERLEME SKORU"],
                        stock["GELECEK SKORU"],
                        Math.min(stock["ROE (%)"] * 4, 100), // Scale ROE to 0-100
                        Math.max(100 - stock["BORÇ ORAN(%)"], 0) // Invert debt ratio
                    ],
                    backgroundColor: `hsla(${index * 72}, 70%, 50%, 0.2)`,
                    borderColor: `hsla(${index * 72}, 70%, 50%, 1)`,
                    borderWidth: 2,
                    pointBackgroundColor: `hsla(${index * 72}, 70%, 50%, 1)`,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: `hsla(${index * 72}, 70%, 50%, 1)`
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                        },
                        angleLines: {
                            color: 'rgba(156, 163, 175, 0.2)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    updateCharts() {
        // Update all charts with new data
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        this.setupCharts();
    }
    
    updateChartsTheme() {
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
        Chart.defaults.color = textColor;
        
        // Update all charts
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.options.scales.x.ticks.color = textColor;
                chart.options.scales.y.ticks.color = textColor;
                chart.update();
            }
        });
    }
    
    updateTable() {
        const tbody = document.getElementById('stocksTableBody');
        tbody.innerHTML = '';
        
        // Sort by investment score by default
        const sortedData = [...this.filteredData].sort((a, b) => b["YATIRIM SKORU"] - a["YATIRIM SKORU"]);
        
        sortedData.slice(0, 20).forEach((stock, index) => {
            const row = document.createElement('tr');
            row.className = 'fade-in-up';
            
            const scoreClass = this.getScoreClass(stock["YATIRIM SKORU"]);
            const potentialClass = stock["YÜKSELİŞ POTANSİYELİ (%)"] > 0 ? 'performance-positive' : 'performance-negative';
            
            row.innerHTML = `
                <td><strong>${index + 1}</strong></td>
                <td><span class="stock-code">${stock["HİSSE KODU"]}</span></td>
                <td><span class="sector-tag">${stock["SEKTÖR"]}</span></td>
                <td><span class="score-badge ${scoreClass}">${stock["YATIRIM SKORU"].toFixed(1)}</span></td>
                <td>${stock["FİYAT"].toFixed(2)} ₺</td>
                <td>${stock["HEDEF FİYAT"].toFixed(2)} ₺</td>
                <td class="${potentialClass}">${stock["YÜKSELİŞ POTANSİYELİ (%)"].toFixed(1)}%</td>
                <td class="performance-positive">${stock["ROE (%)"].toFixed(1)}%</td>
                <td>${stock["F/K"].toFixed(1)}</td>
                <td>${stock["PD/DD"].toFixed(1)}</td>
                <td>
                    <button class="btn-detail" onclick="dashboard.showStockDetail('${stock["HİSSE KODU"]}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }
    
    getScoreClass(score) {
        if (score >= 80) return 'score-excellent';
        if (score >= 60) return 'score-good';
        if (score >= 40) return 'score-medium';
        return 'score-weak';
    }
    
    filterStocks() {
        const searchTerm = document.getElementById('stockSearch').value.toLowerCase();
        const selectedSector = document.getElementById('sectorFilter').value;
        
        this.filteredData = this.data.filter(stock => {
            const matchesSearch = stock["HİSSE KODU"].toLowerCase().includes(searchTerm);
            const matchesSector = !selectedSector || stock["SEKTÖR"] === selectedSector;
            return matchesSearch && matchesSector;
        });
        
        this.updateDashboard();
    }
    
    populateSectorFilter() {
        const sectors = [...new Set(this.data.map(stock => stock["SEKTÖR"]))];
        const select = document.getElementById('sectorFilter');
        
        // Clear existing options except the first one
        select.innerHTML = '<option value="">Tüm Sektörler</option>';
        
        sectors.sort().forEach(sector => {
            const option = document.createElement('option');
            option.value = sector;
            option.textContent = sector;
            select.appendChild(option);
        });
    }
    
    sortTable(column) {
        // Implementation for table sorting
        console.log('Sorting by:', column);
        // Add sorting logic here
    }
    
    showStockDetail(stockCode) {
        const stock = this.data.find(s => s["HİSSE KODU"] === stockCode);
        if (!stock) return;
        
        const modal = new bootstrap.Modal(document.getElementById('stockDetailModal'));
        document.getElementById('stockDetailTitle').textContent = `${stock["HİSSE KODU"]} - Detaylı Analiz`;
        
        const detailBody = document.getElementById('stockDetailBody');
        detailBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6>Temel Bilgiler</h6>
                    <table class="table table-sm">
                        <tr><td>Sektör:</td><td><strong>${stock["SEKTÖR"]}</strong></td></tr>
                        <tr><td>Mevcut Fiyat:</td><td><strong>${stock["FİYAT"].toFixed(2)} ₺</strong></td></tr>
                        <tr><td>Hedef Fiyat:</td><td><strong>${stock["HEDEF FİYAT"].toFixed(2)} ₺</strong></td></tr>
                        <tr><td>Yükseliş Potansiyeli:</td><td><strong class="${stock["YÜKSELİŞ POTANSİYELİ (%)"] > 0 ? 'text-success' : 'text-danger'}">${stock["YÜKSELİŞ POTANSİYELİ (%)"].toFixed(1)}%</strong></td></tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <h6>Finansal Oranlar</h6>
                    <table class="table table-sm">
                        <tr><td>ROE:</td><td><strong>${stock["ROE (%)"].toFixed(1)}%</strong></td></tr>
                        <tr><td>F/K Oranı:</td><td><strong>${stock["F/K"].toFixed(1)}</strong></td></tr>
                        <tr><td>PD/DD Oranı:</td><td><strong>${stock["PD/DD"].toFixed(1)}</strong></td></tr>
                        <tr><td>Borç Oranı:</td><td><strong>${stock["BORÇ ORAN(%)"].toFixed(1)}%</strong></td></tr>
                    </table>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <h6>Skor Analizi</h6>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="text-center p-3 bg-light rounded">
                                <h4 class="text-primary">${stock["SAĞLIK SKORU"]}</h4>
                                <small>Sağlık Skoru</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="text-center p-3 bg-light rounded">
                                <h4 class="text-info">${stock["DEĞERLEME SKORU"]}</h4>
                                <small>Değerleme Skoru</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="text-center p-3 bg-light rounded">
                                <h4 class="text-success">${stock["GELECEK SKORU"]}</h4>
                                <small>Gelecek Skoru</small>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-3">
                        <div class="p-3 bg-primary text-white rounded">
                            <h3>${stock["YATIRIM SKORU"].toFixed(1)}/100</h3>
                            <strong>GENEL YATIRIM SKORU</strong>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.show();
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new StockDashboard();
});

// Chart.js horizontal bar chart workaround for newer versions
Chart.register({
    id: 'horizontalBarWorkaround',
    beforeInit: function(chart) {
        if (chart.config.type === 'horizontalBar') {
            chart.config.type = 'bar';
            chart.config.options.indexAxis = 'y';
        }
    }
});