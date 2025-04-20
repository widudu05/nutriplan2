// Carregar conteúdo dos modais
document.addEventListener('DOMContentLoaded', function() {
    // Carregar modais de pacientes
    fetch('pacientes-modals.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('pacientes-modals').innerHTML = html;
            // Inicializar modais após carregamento
            initializeModals();
        })
        .catch(error => console.error('Erro ao carregar modais de pacientes:', error));
    
    // Carregar modais de receitas
    fetch('receitas-modals.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('receitas-modals').innerHTML = html;
            // Inicializar modais após carregamento
            initializeModals();
        })
        .catch(error => console.error('Erro ao carregar modais de receitas:', error));
    
    // Adicionar atributos data-id aos botões existentes
    setupButtonAttributes();
});

// Configurar atributos de dados para os botões existentes
function setupButtonAttributes() {
    // Botões da página de pacientes
    document.querySelectorAll('.Detalhes').forEach((btn, index) => {
        btn.classList.add('detalhes-paciente-btn');
        btn.setAttribute('data-id', (index + 1).toString());
    });
    
    document.querySelectorAll('.Editar').forEach((btn, index) => {
        if (btn.closest('.paciente-card') || btn.closest('#pacientes-content')) {
            btn.classList.add('editar-paciente-btn');
            btn.setAttribute('data-id', (index + 1).toString());
        } else if (btn.closest('.receita-card') || btn.closest('#receitas-content')) {
            btn.classList.add('editar-receita-btn');
            btn.setAttribute('data-id', (index + 1).toString());
        }
    });
    
    document.querySelectorAll('.Agendar.Consulta').forEach((btn, index) => {
        btn.classList.add('agendar-consulta-btn');
        btn.setAttribute('data-id', (index + 1).toString());
        // Encontrar o nome do paciente mais próximo
        const pacienteNome = btn.closest('div')?.querySelector('h3')?.textContent || 
                            btn.closest('div')?.querySelector('strong')?.textContent || 
                            'Paciente ' + (index + 1);
        btn.setAttribute('data-nome', pacienteNome);
    });
    
    // Botões da página de receitas
    document.querySelectorAll('.Ver.Receita').forEach((btn, index) => {
        btn.classList.add('ver-receita-btn');
        btn.setAttribute('data-id', (index + 1).toString());
    });
    
    document.querySelectorAll('.Excluir').forEach((btn, index) => {
        if (btn.closest('.receita-card') || btn.closest('#receitas-content')) {
            btn.classList.add('excluir-receita-btn');
            btn.setAttribute('data-id', (index + 1).toString());
            // Encontrar o nome da receita mais próxima
            const receitaNome = btn.closest('div')?.querySelector('h3')?.textContent || 
                               btn.closest('div')?.querySelector('strong')?.textContent || 
                               'Receita ' + (index + 1);
            btn.setAttribute('data-nome', receitaNome);
        }
    });
    
    // Botões de nova receita e novo paciente
    document.querySelectorAll('.Nova.Receita').forEach(btn => {
        btn.id = 'nova-receita-btn';
        btn.classList.add('nova-receita-btn');
    });
    
    document.querySelectorAll('.Novo.Paciente').forEach(btn => {
        btn.id = 'novo-paciente-btn';
    });
}
