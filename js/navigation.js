// Arquivo de navegação para o SaaS de Gestão Nutricional

document.addEventListener('DOMContentLoaded', function() {
    // Seletores
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const pageContents = document.querySelectorAll('.page-content');
    
    // Containers de conteúdo
    const dashboardContent = document.getElementById('dashboard-content');
    const pacientesContent = document.getElementById('pacientes-content');
    const planosContent = document.getElementById('planos-content');
    const alimentosContent = document.getElementById('alimentos-content');
    const receitasContent = document.getElementById('receitas-content');
    const relatoriosContent = document.getElementById('relatorios-content');
    
    // Containers de módulos
    const pacientesContainer = document.getElementById('pacientes-container');
    const alimentosContainer = document.getElementById('alimentos-container');
    const receitasContainer = document.getElementById('receitas-container');
    const relatoriosContainer = document.getElementById('relatorios-container');
    
    // Função para alternar entre as páginas
    function navigateTo(target) {
        // Remover classe active de todos os links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Adicionar classe active ao link clicado
        document.querySelectorAll(`[data-target="${target}"]`).forEach(link => {
            link.classList.add('active');
        });
        
        // Esconder todas as páginas
        pageContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Mostrar a página selecionada
        const targetContent = document.getElementById(`${target}-content`);
        if (targetContent) {
            targetContent.classList.add('active');
            
            // Carregar o módulo correspondente se necessário
            if (target === 'pacientes' && pacientesContainer) {
                loadPacientesModule();
            } else if (target === 'alimentos' && alimentosContainer) {
                loadAlimentosModule();
            } else if (target === 'receitas' && receitasContainer) {
                loadReceitasModule();
            } else if (target === 'relatorios' && relatoriosContainer) {
                loadRelatoriosModule();
            }
        }
        
        // Fechar o menu mobile após a navegação
        if (mobileMenu.classList.contains('block')) {
            mobileMenu.classList.remove('block');
            mobileMenu.classList.add('hidden');
        }
    }
    
    // Adicionar event listeners aos links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            navigateTo(target);
        });
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            navigateTo(target);
        });
    });
    
    // Toggle do menu mobile
    mobileMenuButton.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        
        if (expanded) {
            mobileMenu.classList.remove('block');
            mobileMenu.classList.add('hidden');
        } else {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('block');
        }
        
        // Toggle dos ícones do botão
        const iconOpen = this.querySelector('.block');
        const iconClose = this.querySelector('.hidden');
        iconOpen.classList.toggle('block');
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('block');
        iconClose.classList.toggle('hidden');
    });
    
    // Inicializar com a página do dashboard
    navigateTo('dashboard');
});
