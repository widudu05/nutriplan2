// Script para tornar o dashboard interativo
document.addEventListener('DOMContentLoaded', function() {
  // Referências aos elementos do dashboard
  const evolucaoChart = document.getElementById('evolucaoChart');
  const objetivosChart = document.getElementById('objetivosChart');
  const periodoSelector = document.getElementById('periodo-selector');
  const filtroTipoSelector = document.getElementById('filtro-tipo');
  const refreshButton = document.getElementById('refresh-dashboard');
  const dashboardCards = document.querySelectorAll('.dashboard-card');
  
  // Dados para os gráficos
  const dadosEvolucao = {
    mensal: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      data: [5, 8, 12, 9, 11, 14]
    },
    trimestral: {
      labels: ['T1 2024', 'T2 2024', 'T3 2024', 'T4 2024', 'T1 2025'],
      data: [15, 22, 18, 25, 30]
    },
    anual: {
      labels: ['2021', '2022', '2023', '2024', '2025'],
      data: [45, 65, 80, 95, 110]
    }
  };
  
  const dadosObjetivos = {
    todos: [25, 55, 20, 15, 10],
    emagrecimento: [60, 20, 10, 5, 5],
    hipertrofia: [10, 70, 15, 3, 2]
  };
  
  // Instâncias dos gráficos
  let chartEvolucao;
  let chartObjetivos;
  
  // Inicializar gráficos
  function inicializarGraficos() {
    // Gráfico de evolução
    const ctxEvolucao = evolucaoChart.getContext('2d');
    chartEvolucao = new Chart(ctxEvolucao, {
      type: 'line',
      data: {
        labels: dadosEvolucao.mensal.labels,
        datasets: [{
          label: 'Novos Pacientes',
          data: dadosEvolucao.mensal.data,
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
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false
          },
          legend: {
            position: 'top',
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
    
    // Gráfico de objetivos
    const ctxObjetivos = objetivosChart.getContext('2d');
    chartObjetivos = new Chart(ctxObjetivos, {
      type: 'doughnut',
      data: {
        labels: ['Emagrecimento', 'Ganho de massa', 'Manutenção', 'Reeducação alimentar', 'Tratamento de patologia'],
        datasets: [{
          data: dadosObjetivos.todos,
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
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${percentage}% (${value})`;
              }
            }
          }
        }
      }
    });
  }
  
  // Atualizar gráfico de evolução com base no período selecionado
  function atualizarGraficoEvolucao(periodo) {
    chartEvolucao.data.labels = dadosEvolucao[periodo].labels;
    chartEvolucao.data.datasets[0].data = dadosEvolucao[periodo].data;
    chartEvolucao.update();
  }
  
  // Atualizar gráfico de objetivos com base no filtro selecionado
  function atualizarGraficoObjetivos(filtro) {
    chartObjetivos.data.datasets[0].data = dadosObjetivos[filtro];
    chartObjetivos.update();
  }
  
  // Adicionar animação de hover aos cards do dashboard
  function inicializarCardsInterativos() {
    dashboardCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.classList.add('transform', 'scale-105', 'transition-transform');
        this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.classList.remove('transform', 'scale-105', 'transition-transform');
        this.style.boxShadow = '';
      });
    });
  }
  
  // Adicionar funcionalidade de atualização de dados
  function inicializarBotaoAtualizar() {
    if (refreshButton) {
      refreshButton.addEventListener('click', function() {
        // Adicionar classe de rotação ao ícone
        const icon = this.querySelector('svg');
        icon.classList.add('animate-spin');
        
        // Simular atualização de dados (em produção, isso seria uma chamada de API)
        setTimeout(() => {
          // Gerar novos dados aleatórios
          dadosEvolucao.mensal.data = dadosEvolucao.mensal.data.map(() => Math.floor(Math.random() * 20) + 5);
          dadosObjetivos.todos = dadosObjetivos.todos.map(() => Math.floor(Math.random() * 30) + 5);
          
          // Atualizar gráficos
          atualizarGraficoEvolucao(periodoSelector.value);
          atualizarGraficoObjetivos(filtroTipoSelector.value);
          
          // Remover animação de rotação
          icon.classList.remove('animate-spin');
          
          // Mostrar notificação de sucesso
          mostrarNotificacao('Dashboard atualizado com sucesso!', 'success');
        }, 1000);
      });
    }
  }
  
  // Mostrar notificação
  function mostrarNotificacao(mensagem, tipo) {
    const notificacao = document.createElement('div');
    notificacao.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg text-white ${tipo === 'success' ? 'bg-green-500' : 'bg-red-500'} shadow-lg transition-opacity duration-500`;
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
      notificacao.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notificacao);
      }, 500);
    }, 3000);
  }
  
  // Inicializar seletores de período e filtro
  function inicializarSeletores() {
    if (periodoSelector) {
      periodoSelector.addEventListener('change', function() {
        atualizarGraficoEvolucao(this.value);
      });
    }
    
    if (filtroTipoSelector) {
      filtroTipoSelector.addEventListener('change', function() {
        atualizarGraficoObjetivos(this.value);
      });
    }
  }
  
  // Adicionar funcionalidade de exportação de dados
  function inicializarExportacao() {
    const exportButtons = document.querySelectorAll('.export-button');
    exportButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tipo = this.dataset.tipo;
        const formato = this.dataset.formato;
        
        // Simular exportação
        mostrarNotificacao(`Exportando dados em formato ${formato}...`, 'success');
        
        // Em produção, isso seria uma chamada para gerar e baixar o arquivo
        setTimeout(() => {
          mostrarNotificacao(`Dados exportados com sucesso!`, 'success');
        }, 1500);
      });
    });
  }
  
  // Inicializar todos os componentes interativos
  function inicializarDashboardInterativo() {
    inicializarGraficos();
    inicializarCardsInterativos();
    inicializarBotaoAtualizar();
    inicializarSeletores();
    inicializarExportacao();
    
    // Adicionar funcionalidade de arrastar e soltar para reorganizar cards (opcional)
    // Isso requer uma biblioteca adicional como SortableJS
  }
  
  // Iniciar o dashboard interativo
  inicializarDashboardInterativo();
});
