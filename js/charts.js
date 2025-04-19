// Arquivo de gráficos para o SaaS de Gestão Nutricional

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar gráficos apenas se os elementos existirem
    initCharts();
});

// Função para inicializar todos os gráficos
function initCharts() {
    initEvolucaoChart();
    initObjetivosChart();
    initDistribuicaoMacrosChart();
}

// Gráfico de evolução de pacientes
function initEvolucaoChart() {
    const evolucaoChartEl = document.getElementById('evolucaoChart');
    if (!evolucaoChartEl) return;
    
    const evolucaoCtx = evolucaoChartEl.getContext('2d');
    const evolucaoChart = new Chart(evolucaoCtx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
            datasets: [{
                label: 'Novos Pacientes',
                data: [5, 7, 6, 8],
                backgroundColor: 'rgba(13, 148, 136, 0.2)',
                borderColor: 'rgba(13, 148, 136, 1)',
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Gráfico de objetivos dos pacientes
function initObjetivosChart() {
    const objetivosChartEl = document.getElementById('objetivosChart');
    if (!objetivosChartEl) return;
    
    const objetivosCtx = objetivosChartEl.getContext('2d');
    const objetivosChart = new Chart(objetivosCtx, {
        type: 'doughnut',
        data: {
            labels: ['Emagrecimento', 'Ganho de massa', 'Manutenção', 'Reeducação alimentar', 'Tratamento de patologia'],
            datasets: [{
                data: [18, 6, 4, 3, 1],
                backgroundColor: [
                    'rgba(13, 148, 136, 0.8)',
                    'rgba(79, 70, 229, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Gráfico de distribuição de macronutrientes
function initDistribuicaoMacrosChart() {
    const macrosChartEl = document.getElementById('macrosChart');
    if (!macrosChartEl) return;
    
    const macrosCtx = macrosChartEl.getContext('2d');
    const macrosChart = new Chart(macrosCtx, {
        type: 'pie',
        data: {
            labels: ['Proteínas', 'Carboidratos', 'Gorduras'],
            datasets: [{
                data: [25, 50, 25],
                backgroundColor: [
                    'rgba(79, 70, 229, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}
