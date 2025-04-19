// Arquivo de integração com Google Calendar para o SaaS NutriPlan

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes de agendamento
    initAgendamentoButtons();
});

// Função para inicializar os botões de agendamento
function initAgendamentoButtons() {
    const agendarButtons = document.querySelectorAll('.agendar-consulta-btn');
    
    agendarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obter informações do paciente do botão ou elemento pai
            const pacienteCard = this.closest('.paciente-card');
            const pacienteNome = pacienteCard ? pacienteCard.getAttribute('data-nome') : 'Paciente';
            
            // Abrir modal de agendamento
            openAgendamentoModal(pacienteNome);
        });
    });
}

// Função para abrir o modal de agendamento
function openAgendamentoModal(pacienteNome) {
    // Verificar se o modal já existe, se não, criar
    let modal = document.getElementById('agendamento-modal');
    
    if (!modal) {
        modal = createAgendamentoModal();
        document.body.appendChild(modal);
        
        // Adicionar event listeners para o modal
        setupModalEventListeners(modal);
    }
    
    // Atualizar o nome do paciente no modal
    const pacienteElement = modal.querySelector('#agendamento-paciente-nome');
    if (pacienteElement) {
        pacienteElement.textContent = pacienteNome;
    }
    
    // Mostrar o modal
    modal.classList.remove('hidden');
}

// Função para criar o modal de agendamento
function createAgendamentoModal() {
    const modalHTML = document.createElement('div');
    modalHTML.id = 'agendamento-modal';
    modalHTML.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center';
    modalHTML.innerHTML = `
        <div class="relative bg-white rounded-lg shadow-xl max-w-md mx-auto p-5 w-full">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-900">Agendar Consulta</h3>
                <button type="button" class="close-modal text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Fechar</span>
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <form id="agendamento-form">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="agendamento-paciente">
                        Paciente
                    </label>
                    <div class="bg-gray-100 p-2 rounded">
                        <span id="agendamento-paciente-nome" class="text-gray-800"></span>
                    </div>
                </div>
                
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="agendamento-data">
                        Data
                    </label>
                    <input type="date" id="agendamento-data" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="agendamento-hora">
                        Hora
                    </label>
                    <input type="time" id="agendamento-hora" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="agendamento-tipo">
                        Tipo de Consulta
                    </label>
                    <select id="agendamento-tipo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                        <option value="">Selecione...</option>
                        <option value="Primeira Consulta">Primeira Consulta</option>
                        <option value="Retorno">Retorno</option>
                        <option value="Avaliação">Avaliação</option>
                    </select>
                </div>
                
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="agendamento-observacoes">
                        Observações
                    </label>
                    <textarea id="agendamento-observacoes" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="3"></textarea>
                </div>
                
                <div class="flex items-center justify-between">
                    <button type="button" class="close-modal bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Cancelar
                    </button>
                    <button type="button" id="agendar-google-calendar" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
                        <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c6.616 0 12-5.383 12-12S18.616 0 12 0zm0 22.5C6.21 22.5 1.5 17.79 1.5 12S6.21 1.5 12 1.5 22.5 6.21 22.5 12 17.79 22.5 12 22.5z" fill="#fff"/>
                            <path d="M12 4.5v7.5l5.196 5.195 1.061-1.06-4.757-4.757V4.5H12z" fill="#fff"/>
                        </svg>
                        Agendar no Google Calendar
                    </button>
                </div>
            </form>
        </div>
    `;
    
    return modalHTML;
}

// Configurar event listeners para o modal
function setupModalEventListeners(modal) {
    // Fechar modal
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.classList.add('hidden');
        });
    });
    
    // Clicar fora do modal para fechar
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
    
    // Botão de agendamento no Google Calendar
    const agendarGoogleBtn = modal.querySelector('#agendar-google-calendar');
    if (agendarGoogleBtn) {
        agendarGoogleBtn.addEventListener('click', function() {
            createGoogleCalendarEvent();
        });
    }
}

// Função para criar evento no Google Calendar
function createGoogleCalendarEvent() {
    // Obter valores do formulário
    const pacienteNome = document.getElementById('agendamento-paciente-nome').textContent;
    const data = document.getElementById('agendamento-data').value;
    const hora = document.getElementById('agendamento-hora').value;
    const tipo = document.getElementById('agendamento-tipo').value;
    const observacoes = document.getElementById('agendamento-observacoes').value;
    
    // Validar campos obrigatórios
    if (!data || !hora || !tipo) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Formatar data e hora para o formato do Google Calendar
    const dataHoraInicio = new Date(`${data}T${hora}`);
    // Consulta padrão de 1 hora
    const dataHoraFim = new Date(dataHoraInicio.getTime() + 60 * 60 * 1000);
    
    // Formatar para URL do Google Calendar
    const dataInicioFormatada = formatGoogleCalendarDate(dataHoraInicio);
    const dataFimFormatada = formatGoogleCalendarDate(dataHoraFim);
    
    // Criar título e descrição do evento
    const titulo = `Consulta ${tipo} - ${pacienteNome}`;
    const descricao = observacoes ? `Observações: ${observacoes}` : '';
    
    // Criar URL do Google Calendar
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(titulo)}&dates=${dataInicioFormatada}/${dataFimFormatada}&details=${encodeURIComponent(descricao)}`;
    
    // Abrir URL em nova janela
    window.open(googleCalendarUrl, '_blank');
    
    // Fechar o modal
    const modal = document.getElementById('agendamento-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
    
    // Mostrar mensagem de sucesso
    showSuccessMessage(pacienteNome, data, hora);
}

// Função para formatar data para o formato do Google Calendar
function formatGoogleCalendarDate(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage(pacienteNome, data, hora) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg transition-opacity duration-500 flex items-center';
    notification.innerHTML = `
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
            <p class="font-bold">Consulta agendada com sucesso!</p>
            <p class="text-sm">${pacienteNome} - ${formatarDataBR(data)} às ${hora}</p>
        </div>
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// Função para formatar data no formato brasileiro
function formatarDataBR(dataISO) {
    const partes = dataISO.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
