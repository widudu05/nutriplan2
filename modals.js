// Arquivo para gerenciar todos os modais do sistema
document.addEventListener('DOMContentLoaded', function() {
    // Funções para gerenciar modais
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    }

    function closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.classList.remove('modal-open');
    }

    // Configurar fechamento de modais
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });

    // Funções para pacientes
    function setupPacientesButtons() {
        // Botão Novo Paciente
        const novoPacienteBtn = document.querySelector('button[data-action="novo-paciente"]');
        if (novoPacienteBtn) {
            novoPacienteBtn.addEventListener('click', function() {
                openModal('novo-paciente-modal');
            });
        }

        // Botões Detalhes
        document.querySelectorAll('button[data-action="detalhes-paciente"]').forEach(btn => {
            btn.addEventListener('click', function() {
                const pacienteId = this.getAttribute('data-id');
                // Aqui você carregaria os detalhes do paciente com base no ID
                document.getElementById('paciente-detalhes-nome').textContent = this.closest('.paciente-item').querySelector('.paciente-nome').textContent;
                openModal('detalhes-paciente-modal');
            });
        });

        // Botões Editar
        document.querySelectorAll('button[data-action="editar-paciente"]').forEach(btn => {
            btn.addEventListener('click', function() {
                const pacienteId = this.getAttribute('data-id');
                // Aqui você carregaria os dados do paciente para edição
                const pacienteItem = this.closest('.paciente-item');
                const nome = pacienteItem.querySelector('.paciente-nome').textContent;
                
                document.getElementById('editar-paciente-nome').value = nome;
                document.getElementById('editar-paciente-id').value = pacienteId;
                
                openModal('editar-paciente-modal');
            });
        });

        // Botões Agendar Consulta
        document.querySelectorAll('button[data-action="agendar-consulta"]').forEach(btn => {
            btn.addEventListener('click', function() {
                const pacienteId = this.getAttribute('data-id');
                const pacienteNome = this.closest('.paciente-item').querySelector('.paciente-nome').textContent;
                
                document.getElementById('agendar-consulta-paciente-id').value = pacienteId;
                document.getElementById('agendar-consulta-paciente-nome').textContent = pacienteNome;
                
                openModal('agendar-consulta-modal');
            });
        });
    }

    // Funções para receitas
    function setupReceitasButtons() {
        // Botão Nova Receita
        const novaReceitaBtn = document.querySelector('button[data-action="nova-receita"]');
        if (novaReceitaBtn) {
            novaReceitaBtn.addEventListener('click', function() {
                openModal('nova-receita-modal');
            });
        }

        // Botões Ver Receita
        document.querySelectorAll('button[data-action="ver-receita"]').forEach(btn => {
            btn.addEventListener('click', function() {
                const receitaId = this.getAttribute('data-id');
                const receitaItem = this.closest('.receita-item');
                const nome = receitaItem.querySelector('.receita-nome').textContent;
                
                document.getElementById('ver-receita-nome').textContent = nome;
                // Aqui você carregaria mais detalhes da receita
                
                openModal('ver-receita-modal');
            });
        });

        // Botões Editar Receita
        document.querySelectorAll('button[data-action="editar-receita"]').forEach(btn => {
            btn.addEventListener('click', function() {
                const receitaId = this.getAttribute('data-id');
                const receitaItem = this.closest('.receita-item');
                const nome = receitaItem.querySelector('.receita-nome').textContent;
                
                document.getElementById('editar-receita-nome').value = nome;
                document.getElementById('editar-receita-id').value = receitaId;
                
                openModal('editar-receita-modal');
            });
        });

        // Botões Excluir Receita
        document.querySelectorAll('button[data-action="excluir-receita"]').forEach(btn => {
            btn.addEventListener('click', function() {
                const receitaId = this.getAttribute('data-id');
                const receitaItem = this.closest('.receita-item');
                const nome = receitaItem.querySelector('.receita-nome').textContent;
                
                if (confirm(`Tem certeza que deseja excluir a receita "${nome}"?`)) {
                    // Aqui você implementaria a lógica para excluir a receita
                    receitaItem.remove();
                    showNotification('Receita excluída com sucesso!', 'success');
                }
            });
        });
    }

    // Função para mostrar notificações
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg text-white ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'} shadow-lg transition-opacity duration-500`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remover notificação após 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }

    // Configurar formulários
    function setupForms() {
        // Formulário de novo paciente
        const novoPacienteForm = document.getElementById('novo-paciente-form');
        if (novoPacienteForm) {
            novoPacienteForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Aqui você implementaria a lógica para salvar o novo paciente
                const nome = document.getElementById('novo-paciente-nome').value;
                const email = document.getElementById('novo-paciente-email').value;
                
                // Simulação de adição de paciente
                const pacientesLista = document.querySelector('.pacientes-lista');
                if (pacientesLista) {
                    // Adicionar novo paciente à lista (em uma implementação real, isso viria do backend)
                    // ...
                }
                
                closeModal('novo-paciente-modal');
                showNotification('Paciente adicionado com sucesso!', 'success');
                
                // Limpar formulário
                this.reset();
            });
        }

        // Formulário de edição de paciente
        const editarPacienteForm = document.getElementById('editar-paciente-form');
        if (editarPacienteForm) {
            editarPacienteForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Aqui você implementaria a lógica para atualizar o paciente
                const id = document.getElementById('editar-paciente-id').value;
                const nome = document.getElementById('editar-paciente-nome').value;
                
                // Atualizar informações na interface
                const pacienteItem = document.querySelector(`.paciente-item[data-id="${id}"]`);
                if (pacienteItem) {
                    pacienteItem.querySelector('.paciente-nome').textContent = nome;
                }
                
                closeModal('editar-paciente-modal');
                showNotification('Paciente atualizado com sucesso!', 'success');
            });
        }

        // Formulário de agendamento de consulta
        const agendarConsultaForm = document.getElementById('agendar-consulta-form');
        if (agendarConsultaForm) {
            agendarConsultaForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Aqui você implementaria a lógica para agendar a consulta
                const pacienteId = document.getElementById('agendar-consulta-paciente-id').value;
                const data = document.getElementById('agendar-consulta-data').value;
                const hora = document.getElementById('agendar-consulta-hora').value;
                
                closeModal('agendar-consulta-modal');
                showNotification('Consulta agendada com sucesso!', 'success');
                
                // Limpar formulário
                this.reset();
            });
        }

        // Formulário de nova receita
        const novaReceitaForm = document.getElementById('nova-receita-form');
        if (novaReceitaForm) {
            novaReceitaForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Aqui você implementaria a lógica para salvar a nova receita
                const nome = document.getElementById('nova-receita-nome').value;
                
                closeModal('nova-receita-modal');
                showNotification('Receita adicionada com sucesso!', 'success');
                
                // Limpar formulário
                this.reset();
            });
        }

        // Formulário de edição de receita
        const editarReceitaForm = document.getElementById('editar-receita-form');
        if (editarReceitaForm) {
            editarReceitaForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Aqui você implementaria a lógica para atualizar a receita
                const id = document.getElementById('editar-receita-id').value;
                const nome = document.getElementById('editar-receita-nome').value;
                
                // Atualizar informações na interface
                const receitaItem = document.querySelector(`.receita-item[data-id="${id}"]`);
                if (receitaItem) {
                    receitaItem.querySelector('.receita-nome').textContent = nome;
                }
                
                closeModal('editar-receita-modal');
                showNotification('Receita atualizada com sucesso!', 'success');
            });
        }
    }

    // Inicializar todos os componentes interativos
    function initInteractiveComponents() {
        setupPacientesButtons();
        setupReceitasButtons();
        setupForms();
    }

    // Iniciar os componentes interativos
    initInteractiveComponents();

    // Expor funções globalmente para uso em outros scripts
    window.nutriplanModals = {
        openModal,
        closeModal,
        closeAllModals,
        showNotification
    };
});
