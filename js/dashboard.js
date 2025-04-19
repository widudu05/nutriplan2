// Arquivo para tornar o dashboard interativo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar os cards do dashboard para serem interativos
    initDashboardCards();
});

// Função para inicializar os cards do dashboard
function initDashboardCards() {
    // Obter todos os cards do dashboard
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    // Adicionar evento de clique a cada card
    dashboardCards.forEach(card => {
        card.addEventListener('click', function() {
            // Obter o tipo de card a partir do atributo data-type
            const cardType = this.getAttribute('data-type');
            
            // Navegar para a seção correspondente com base no tipo de card
            navigateToSection(cardType);
        });
        
        // Adicionar classe de cursor e hover para indicar que é clicável
        card.classList.add('cursor-pointer', 'hover:shadow-lg', 'transition-shadow', 'duration-300');
    });
    
    // Inicializar os gráficos para serem interativos
    initInteractiveCharts();
    
    // Inicializar as listas de consultas e tarefas para serem interativas
    initConsultasRecentes();
    initTarefasPendentes();
}

// Função para navegar para uma seção específica
function navigateToSection(sectionType) {
    // Mapear tipos de card para seções de navegação
    const sectionMap = {
        'pacientes': 'pacientes',
        'planos': 'planos',
        'consultas': 'pacientes', // Consultas agendadas leva para pacientes
        'perda-peso': 'relatorios' // Média de perda de peso leva para relatórios
    };
    
    // Obter o alvo de navegação
    const navTarget = sectionMap[sectionType];
    
    if (navTarget) {
        // Encontrar o link de navegação correspondente
        const navLink = document.querySelector(`.nav-link[data-target="${navTarget}"]`);
        
        if (navLink) {
            // Simular um clique no link de navegação
            navLink.click();
        }
    }
}

// Função para inicializar os gráficos para serem interativos
function initInteractiveCharts() {
    // Obter os containers dos gráficos
    const chartContainers = document.querySelectorAll('.chart-container');
    
    // Adicionar evento de clique a cada container de gráfico
    chartContainers.forEach(container => {
        container.addEventListener('click', function() {
            // Obter o tipo de gráfico a partir do atributo data-chart-type
            const chartType = this.getAttribute('data-chart-type');
            
            // Navegar para a seção correspondente com base no tipo de gráfico
            if (chartType === 'evolucao') {
                // Gráfico de evolução leva para relatórios
                navigateToSection('relatorios');
            } else if (chartType === 'objetivo') {
                // Gráfico de objetivo leva para pacientes
                navigateToSection('pacientes');
            }
        });
        
        // Adicionar classe de cursor e hover para indicar que é clicável
        container.classList.add('cursor-pointer', 'hover:shadow-lg', 'transition-shadow', 'duration-300');
    });
}

// Função para inicializar a lista de consultas recentes para ser interativa
function initConsultasRecentes() {
    // Obter todos os itens de consulta
    const consultaItems = document.querySelectorAll('.consulta-item');
    
    // Adicionar evento de clique a cada item
    consultaItems.forEach(item => {
        item.addEventListener('click', function() {
            // Obter o nome do paciente
            const pacienteNome = this.getAttribute('data-paciente');
            
            // Navegar para a seção de pacientes
            navigateToSection('pacientes');
            
            // Aqui poderia ter lógica adicional para filtrar o paciente específico
            console.log(`Navegando para detalhes do paciente: ${pacienteNome}`);
        });
        
        // Adicionar classe de cursor e hover para indicar que é clicável
        item.classList.add('cursor-pointer', 'hover:bg-gray-50', 'transition-colors', 'duration-300');
    });
}

// Função para inicializar a lista de tarefas pendentes para ser interativa
function initTarefasPendentes() {
    // Obter todos os itens de tarefa
    const tarefaItems = document.querySelectorAll('.tarefa-item');
    
    // Adicionar evento de clique a cada item
    tarefaItems.forEach(item => {
        item.addEventListener('click', function() {
            // Obter o tipo de tarefa
            const tarefaTipo = this.getAttribute('data-tipo');
            
            // Navegar para a seção correspondente com base no tipo de tarefa
            if (tarefaTipo === 'plano-alimentar') {
                navigateToSection('planos');
            } else if (tarefaTipo === 'banco-alimentos') {
                navigateToSection('alimentos');
            }
        });
        
        // Adicionar classe de cursor e hover para indicar que é clicável
        item.classList.add('cursor-pointer', 'hover:bg-gray-50', 'transition-colors', 'duration-300');
    });
    
    // Adicionar funcionalidade aos checkboxes
    const checkboxes = document.querySelectorAll('.tarefa-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function(e) {
            // Evitar propagação do evento para não acionar o clique no item
            e.stopPropagation();
            
            // Obter o item pai
            const tarefaItem = this.closest('.tarefa-item');
            
            // Adicionar ou remover classe de concluído
            if (this.checked) {
                tarefaItem.classList.add('opacity-50');
            } else {
                tarefaItem.classList.remove('opacity-50');
            }
        });
    });
}
