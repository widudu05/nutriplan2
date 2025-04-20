// Funções para manipulação de modais e interatividade
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos os modais
    initializeModals();
    
    // Adicionar event listeners para botões de ação
    setupActionButtons();
    
    // Inicializar notificações
    setupNotifications();
});

// Função para inicializar todos os modais
function initializeModals() {
    // Modais de Pacientes
    setupModal('novo-paciente-modal');
    setupModal('detalhes-paciente-modal');
    setupModal('editar-paciente-modal');
    setupModal('agendar-consulta-modal');
    
    // Modais de Receitas
    setupModal('nova-receita-modal');
    setupModal('ver-receita-modal');
    setupModal('editar-receita-modal');
    setupModal('excluir-receita-modal');
}

// Configurar um modal específico
function setupModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Botões para fechar o modal
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    });
    
    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Configurar botões de ação
function setupActionButtons() {
    // Botões da página de pacientes
    setupButton('novo-paciente-btn', 'novo-paciente-modal');
    document.querySelectorAll('.detalhes-paciente-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const pacienteId = this.getAttribute('data-id');
            showPacienteDetalhes(pacienteId);
        });
    });
    
    document.querySelectorAll('.editar-paciente-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const pacienteId = this.getAttribute('data-id');
            showEditarPaciente(pacienteId);
        });
    });
    
    document.querySelectorAll('.agendar-consulta-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const pacienteId = this.getAttribute('data-id');
            const pacienteNome = this.getAttribute('data-nome');
            showAgendarConsulta(pacienteId, pacienteNome);
        });
    });
    
    // Botões da página de receitas
    setupButton('nova-receita-btn', 'nova-receita-modal');
    document.querySelectorAll('.ver-receita-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const receitaId = this.getAttribute('data-id');
            showReceitaDetalhes(receitaId);
        });
    });
    
    document.querySelectorAll('.editar-receita-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const receitaId = this.getAttribute('data-id');
            showEditarReceita(receitaId);
        });
    });
    
    document.querySelectorAll('.excluir-receita-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const receitaId = this.getAttribute('data-id');
            const receitaNome = this.getAttribute('data-nome');
            showExcluirReceita(receitaId, receitaNome);
        });
    });
}

// Configurar um botão específico para abrir um modal
function setupButton(buttonId, modalId) {
    const button = document.getElementById(buttonId);
    const modal = document.getElementById(modalId);
    
    if (button && modal) {
        button.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    } else if (buttonId === 'nova-receita-btn') {
        // Caso especial para o botão de Nova Receita que pode estar em várias páginas
        const buttons = document.querySelectorAll('.nova-receita-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                document.getElementById('nova-receita-modal').style.display = 'block';
            });
        });
    }
}

// Funções para manipulação de pacientes
function showPacienteDetalhes(pacienteId) {
    // Buscar dados do paciente (simulado)
    const paciente = getPacienteById(pacienteId);
    
    // Preencher o modal com os dados
    const modal = document.getElementById('detalhes-paciente-modal');
    if (modal) {
        const nome = modal.querySelector('#detalhe-nome');
        const email = modal.querySelector('#detalhe-email');
        const telefone = modal.querySelector('#detalhe-telefone');
        const idade = modal.querySelector('#detalhe-idade');
        const genero = modal.querySelector('#detalhe-genero');
        
        if (nome) nome.textContent = paciente.nome;
        if (email) email.textContent = paciente.email;
        if (telefone) telefone.textContent = paciente.telefone;
        if (idade) idade.textContent = paciente.idade + ' anos';
        if (genero) genero.textContent = paciente.genero;
        
        // Exibir o modal
        modal.style.display = 'block';
    } else {
        showNotification('Erro ao carregar detalhes do paciente', 'error');
    }
}

function showEditarPaciente(pacienteId) {
    // Buscar dados do paciente (simulado)
    const paciente = getPacienteById(pacienteId);
    
    // Preencher o formulário com os dados
    const modal = document.getElementById('editar-paciente-modal');
    if (modal) {
        const form = modal.querySelector('form');
        if (form) {
            form.elements['paciente-id'].value = paciente.id;
            form.elements['paciente-nome'].value = paciente.nome;
            form.elements['paciente-email'].value = paciente.email;
            form.elements['paciente-telefone'].value = paciente.telefone;
            form.elements['paciente-idade'].value = paciente.idade;
            form.elements['paciente-genero'].value = paciente.genero;
        }
        
        // Exibir o modal
        modal.style.display = 'block';
    } else {
        showNotification('Erro ao carregar formulário de edição', 'error');
    }
}

function showAgendarConsulta(pacienteId, pacienteNome) {
    const modal = document.getElementById('agendar-consulta-modal');
    if (modal) {
        const form = modal.querySelector('form');
        if (form) {
            form.elements['paciente-id'].value = pacienteId;
            form.elements['paciente-nome'].value = pacienteNome || '';
        }
        
        // Exibir o modal
        modal.style.display = 'block';
    } else {
        showNotification('Erro ao carregar formulário de agendamento', 'error');
    }
}

// Funções para manipulação de receitas
function showReceitaDetalhes(receitaId) {
    // Buscar dados da receita (simulado)
    const receita = getReceitaById(receitaId);
    
    // Preencher o modal com os dados
    const modal = document.getElementById('ver-receita-modal');
    if (modal) {
        const titulo = modal.querySelector('#detalhe-titulo');
        const categoria = modal.querySelector('#detalhe-categoria');
        const tempo = modal.querySelector('#detalhe-tempo');
        const porcoes = modal.querySelector('#detalhe-porcoes');
        const calorias = modal.querySelector('#detalhe-calorias');
        const proteinas = modal.querySelector('#detalhe-proteinas');
        const carboidratos = modal.querySelector('#detalhe-carboidratos');
        const ingredientes = modal.querySelector('#detalhe-ingredientes');
        const preparo = modal.querySelector('#detalhe-preparo');
        
        if (titulo) titulo.textContent = receita.titulo;
        if (categoria) categoria.textContent = receita.categoria;
        if (tempo) tempo.textContent = receita.tempo + ' minutos';
        if (porcoes) porcoes.textContent = receita.porcoes + ' porções';
        if (calorias) calorias.textContent = receita.calorias;
        if (proteinas) proteinas.textContent = receita.proteinas + 'g';
        if (carboidratos) carboidratos.textContent = receita.carboidratos + 'g';
        
        if (ingredientes) {
            ingredientes.innerHTML = '';
            receita.ingredientes.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ingredientes.appendChild(li);
            });
        }
        
        if (preparo) {
            preparo.innerHTML = '';
            receita.preparo.forEach((passo, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${passo}`;
                preparo.appendChild(li);
            });
        }
        
        // Exibir o modal
        modal.style.display = 'block';
    } else {
        showNotification('Erro ao carregar detalhes da receita', 'error');
    }
}

function showEditarReceita(receitaId) {
    // Buscar dados da receita (simulado)
    const receita = getReceitaById(receitaId);
    
    // Preencher o formulário com os dados
    const modal = document.getElementById('editar-receita-modal');
    if (modal) {
        const form = modal.querySelector('form');
        if (form) {
            form.elements['receita-id'].value = receita.id;
            form.elements['receita-titulo'].value = receita.titulo;
            form.elements['receita-categoria'].value = receita.categoria;
            form.elements['receita-tempo'].value = receita.tempo;
            form.elements['receita-porcoes'].value = receita.porcoes;
            form.elements['receita-calorias'].value = receita.calorias;
            form.elements['receita-proteinas'].value = receita.proteinas;
            form.elements['receita-carboidratos'].value = receita.carboidratos;
            form.elements['receita-ingredientes'].value = receita.ingredientes.join('\n');
            form.elements['receita-preparo'].value = receita.preparo.join('\n');
        }
        
        // Exibir o modal
        modal.style.display = 'block';
    } else {
        showNotification('Erro ao carregar formulário de edição', 'error');
    }
}

function showExcluirReceita(receitaId, receitaNome) {
    const modal = document.getElementById('excluir-receita-modal');
    if (modal) {
        const mensagem = modal.querySelector('.mensagem-confirmacao');
        if (mensagem) {
            mensagem.textContent = `Tem certeza que deseja excluir a receita "${receitaNome}"?`;
        }
        
        const form = modal.querySelector('form');
        if (form) {
            form.elements['receita-id'].value = receitaId;
        }
        
        // Exibir o modal
        modal.style.display = 'block';
    } else {
        showNotification('Erro ao carregar confirmação de exclusão', 'error');
    }
}

// Funções auxiliares para buscar dados (simuladas)
function getPacienteById(id) {
    // Dados simulados - em uma aplicação real, isso viria de uma API ou banco de dados
    const pacientes = {
        '1': {
            id: '1',
            nome: 'Maria Silva',
            email: 'maria.silva@email.com',
            telefone: '(11) 98765-4321',
            idade: 40,
            genero: 'Feminino'
        },
        '2': {
            id: '2',
            nome: 'João Santos',
            email: 'joao.santos@email.com',
            telefone: '(11) 91234-5678',
            idade: 35,
            genero: 'Masculino'
        }
    };
    
    return pacientes[id] || {
        id: id,
        nome: 'Paciente não encontrado',
        email: '',
        telefone: '',
        idade: 0,
        genero: ''
    };
}

function getReceitaById(id) {
    // Dados simulados - em uma aplicação real, isso viria de uma API ou banco de dados
    const receitas = {
        '1': {
            id: '1',
            titulo: 'Salada de Frango com Abacate',
            categoria: 'Saladas',
            tempo: 20,
            porcoes: 2,
            calorias: 320,
            proteinas: 28,
            carboidratos: 12,
            ingredientes: [
                '200g de peito de frango grelhado',
                '1 abacate maduro',
                '1 tomate',
                'Folhas de alface',
                'Azeite de oliva',
                'Sal e pimenta a gosto'
            ],
            preparo: [
                'Corte o frango em cubos',
                'Pique o abacate e o tomate',
                'Misture todos os ingredientes',
                'Tempere com azeite, sal e pimenta'
            ]
        },
        '2': {
            id: '2',
            titulo: 'Omelete de Espinafre e Queijo',
            categoria: 'Café da Manhã',
            tempo: 15,
            porcoes: 1,
            calorias: 280,
            proteinas: 22,
            carboidratos: 4,
            ingredientes: [
                '2 ovos',
                '50g de espinafre',
                '30g de queijo',
                'Sal e pimenta a gosto'
            ],
            preparo: [
                'Bata os ovos em uma tigela',
                'Adicione o espinafre picado e o queijo ralado',
                'Tempere com sal e pimenta',
                'Cozinhe em uma frigideira antiaderente'
            ]
        }
    };
    
    return receitas[id] || {
        id: id,
        titulo: 'Receita não encontrada',
        categoria: '',
        tempo: 0,
        porcoes: 0,
        calorias: 0,
        proteinas: 0,
        carboidratos: 0,
        ingredientes: [],
        preparo: []
    };
}

// Sistema de notificações
function setupNotifications() {
    // Criar container de notificações se não existir
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.padding = '12px 20px';
    notification.style.marginBottom = '10px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    
    // Definir cores com base no tipo
    if (type === 'success') {
        notification.style.backgroundColor = '#d4edda';
        notification.style.color = '#155724';
        notification.style.borderLeft = '4px solid #28a745';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f8d7da';
        notification.style.color = '#721c24';
        notification.style.borderLeft = '4px solid #dc3545';
    } else if (type === 'warning') {
        notification.style.backgroundColor = '#fff3cd';
        notification.style.color = '#856404';
        notification.style.borderLeft = '4px solid #ffc107';
    } else {
        notification.style.backgroundColor = '#d1ecf1';
        notification.style.color = '#0c5460';
        notification.style.borderLeft = '4px solid #17a2b8';
    }
    
    notification.textContent = message;
    container.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remover após duração
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    }, duration);
}

// Inicializar formulários
function setupForms() {
    // Formulário de novo paciente
    const novoPacienteForm = document.getElem
(Content truncated due to size limit. Use line ranges to read in chunks)