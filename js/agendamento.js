// Arquivo JavaScript para funcionalidade de agendamento
document.addEventListener('DOMContentLoaded', function() {
    // Criar o conteúdo da página de agendamento
    createAgendamentoPage();
    
    // Adicionar event listeners para os botões de agendamento
    setupAgendamentoButtons();
    
    // Configurar o modal de agendamento
    setupAgendamentoModal();
    
    // Configurar tooltips para os cards do dashboard
    setupDashboardCardTooltips();
});

// Criar a página de agendamento
function createAgendamentoPage() {
    const mainContent = document.querySelector('#main-content');
    if (!mainContent) return;
    
    // Criar o conteúdo da página de agendamento
    const agendamentoPage = document.createElement('div');
    agendamentoPage.id = 'agendamento-page';
    agendamentoPage.className = 'page-content';
    agendamentoPage.innerHTML = `
        <h1 class="text-2xl font-semibold text-gray-900 mb-6">Agendamento de Consultas</h1>
        
        <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                    <h2 class="text-lg leading-6 font-medium text-gray-900">Calendário de Consultas</h2>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Visualize e gerencie suas consultas agendadas</p>
                </div>
                <button id="new-appointment-btn" class="btn-primary inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white">
                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Nova Consulta
                </button>
            </div>
            <div class="border-t border-gray-200">
                <div class="px-4 py-5 sm:p-6">
                    <div id="calendar-container" class="bg-white p-4 rounded-lg shadow">
                        <div class="flex justify-between items-center mb-4">
                            <button id="prev-month" class="text-gray-600 hover:text-gray-900">
                                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </button>
                            <h2 id="current-month" class="text-xl font-semibold text-gray-900">Abril 2025</h2>
                            <button id="next-month" class="text-gray-600 hover:text-gray-900">
                                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="grid grid-cols-7 gap-1 text-center mb-2">
                            <div class="text-gray-500 font-medium">Dom</div>
                            <div class="text-gray-500 font-medium">Seg</div>
                            <div class="text-gray-500 font-medium">Ter</div>
                            <div class="text-gray-500 font-medium">Qua</div>
                            <div class="text-gray-500 font-medium">Qui</div>
                            <div class="text-gray-500 font-medium">Sex</div>
                            <div class="text-gray-500 font-medium">Sáb</div>
                        </div>
                        <div id="calendar-days" class="grid grid-cols-7 gap-1">
                            <!-- Dias do calendário serão inseridos aqui via JavaScript -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
                <h2 class="text-lg leading-6 font-medium text-gray-900">Próximas Consultas</h2>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">Detalhes das consultas agendadas</p>
            </div>
            <div class="border-t border-gray-200">
                <ul id="appointments-list" class="divide-y divide-gray-200">
                    <li class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <span class="text-green-700 font-medium">MS</span>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">Maria Silva</div>
                                    <div class="text-sm text-gray-500">Avaliação Nutricional</div>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="text-sm text-gray-500 mr-4">
                                    <div class="flex items-center">
                                        <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        10/05/2025
                                    </div>
                                    <div class="flex items-center">
                                        <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        14:30
                                    </div>
                                </div>
                                <div>
                                    <button class="text-green-600 hover:text-green-900 mr-2">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                        </svg>
                                    </button>
                                    <button class="text-red-600 hover:text-red-900">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span class="text-blue-700 font-medium">JS</span>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">João Santos</div>
                                    <div class="text-sm text-gray-500">Retorno</div>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="text-sm text-gray-500 mr-4">
                                    <div class="flex items-center">
                                        <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        05/05/2025
                                    </div>
                                    <div class="flex items-center">
                                        <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        10:00
                                    </div>
                                </div>
                                <div>
                                    <button class="text-green-600 hover:text-green-900 mr-2">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                        </svg>
                                    </button>
                                    <button class="text-red-600 hover:text-red-900">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- Modal de agendamento -->
        <div id="appointment-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="text-xl font-semibold text-gray-900">Agendar Consulta</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <form id="appointment-form">
                        <div class="mb-4">
                            <label for="patient" class="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
                            <select id="patient" name="patient" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                <option value="">Selecione um paciente</option>
                                <option value="1">Maria Silva</option>
                                <option value="2">João Santos</option>
                                <option value="3">Ana Oliveira</option>
                                <option value="4">Carlos Pereira</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label for="appointment-type" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Consulta</label>
                            <select id="appointment-type" name="appointment-type" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                <option value="">Selecione o tipo</option>
                                <option value="avaliacao">Avaliação Inicial</option>
                                <option value="retorno">Retorno</option>
                                <option value="emergencia">Emergência</option>
                                <option value="online">Consulta Online</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label for="appointment-date" class="block text-sm font-medium text-gray-700 mb-1">Data</label>
                                <input type="date" id="appointment-date" name="appointment-date" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                            </div>
                            <div>
                                <label for="appointment-time" class="block text-sm font-medium text-gray-700 mb-1">Horário</label>
                                <input type="time" id="appointment-time" name="appointment-time" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                            </div>
                        </div>
                        <div class="mb-4">
                            <label for="appointment-notes" class="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                            <textarea id="appointment-notes" name="appointment-notes" rows="3" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"></textarea>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="google-calendar" name="google-calendar" type="checkbox" class="form-checkbox h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500">
                            <label for="google-calendar" class="ml-2 block text-sm text-gray-900">
                                Adicionar ao Google Calendar
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button id="cancel-appointment" class="btn-secondary px-4 py-2 text-sm font-medium rounded-md">Cancelar</button>
                    <button id="save-appointment" class="btn-primary px-4 py-2 text-sm font-medium text-white rounded-md">Salvar</button>
                </div>
            </div>
        </div>
    `;
    
    mainContent.appendChild(agendamentoPage);
    
    // Gerar o calendário
    generateCalendar();
}

// Configurar os botões de agendamento
function setupAgendamentoButtons() {
    // Adicionar event listeners para todos os botões "Agendar Consulta"
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('Agendar Consulta')) {
            button.addEventListener('click', openAgendamentoModal);
        }
    });
    
    // Adicionar event listener para o botão "Nova Consulta" na página de agendamento
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'new-appointment-btn') {
            openAgendamentoModal();
        }
    });
}

// Configurar o modal de agendamento
function setupAgendamentoModal() {
    // Adicionar event listeners para o modal
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('appointment-modal');
        if (!modal) return;
        
        // Fechar o modal quando clicar no X
        if (e.target && e.target.classList.contains('close')) {
            closeAgendamentoModal();
        }
        
        // Fechar o modal quando clicar no botão Cancelar
        if (e.target && e.target.id === 'cancel-appointment') {
            closeAgendamentoModal();
        }
        
        // Salvar o agendamento quando clicar no botão Salvar
        if (e.target && e.target.id === 'save-appointment') {
            saveAppointment();
        }
    });
    
    // Fechar o modal quando clicar fora dele
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('appointment-modal');
        if (e.target === modal) {
            closeAgendamentoModal();
        }
    });
}

// Abrir o modal de agendamento
function openAgendamentoModal() {
    const modal = document.getElementById('appointment-modal');
    if (modal) {
        modal.style.display = 'block';
        
        // Preencher a data atual no formulário
        const today = new Date();
        const dateInput = document.getElementById('appointment-date');
        if (dateInput) {
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            dateInput.value = `${year}-${month}-${day}`;
        }
    }
}

// Fechar o modal de agendamento
function closeAgendamentoModal() {
    const modal = document.getElementById('appointment-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Salvar o agendamento
function saveAppointment() {
    // Obter os valores do formulário
    const patient = document.getElementById('patient').value;
    const appointmentType = document.getElementById('appointment-type').value;
    const appointmentDate = document.getElementById('appointment-date').value;
    const appointmentTime = document.getElementById('appointment-time').value;
    const appointmentNotes = document.getElementById('appointment-notes').value;
    const addToGoogleCalendar = document.getElementById('google-calendar').checked;
    
    // Validar os campos obrigatórios
    if (!patient || !appointmentType || !appointmentDate || !appointmentTime) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Simular o salvamento do agendamento
    console.log('Agendamento salvo:', {
        patient,
        appointmentType,
        appointmentDate,
        appointmentTime,
        appointmentNotes,
        addToGoogleCalendar
    });
    
    // Se marcado para adicionar ao Google Calendar, abrir a URL do Google Calendar
    if (addToGoogleCalendar) {
        const patientName = document.getElementById('patient').options[document.getElementById('patient').selectedIndex].text;
        const appointmentTypeText = document.getElementById('appointment-type').options[document.getElementById('appointment-type').selectedIndex].text;
        
        // Formatar a data e hora para o formato do Google Calendar
        const [year, month, day] = appointmentDate.split('-');
        const [hours, minutes] = appointmentTime.split(':');
        
        const startDate = new Date(year, month - 1, day, hours, minutes);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hora depois
        
        const formatDate = (date) => {
            return date.toISOString().replace(/-|:|\.\d+/g, '');
        };
        
        const startDateFormatted = formatDate(startDate);
        const endDateFormatted = formatDate(endDate);
        
        // Criar a URL do Google Calendar
        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Consulta: ${patientName} - ${appointmentTypeText}&dates=${startDateFormatted}/${endDateFormatted}&details=${encodeURIComponent(appointmentNotes)}&location=Consultório NutriSaaS`;
        
        // Abrir a URL em uma nova aba
        window.open(googleCalendarUrl, '_blank');
    }
    
    // Fechar o modal
    closeAgendamentoModal();
    
    // Mostrar mensagem de sucesso
    alert('Consulta agendada com sucesso!');
}

// Gerar o calendário
function generateCalendar() {
    const calendarDays = document.getElementById('calendar-days');
    if (!calendarDays) return;
    
    // Limpar o calendário
    calendarDays.innerHTML = '';
    
    // Obter a data atual
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Atualizar o título do mês
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    document.getElementById('current-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Obter o primeiro dia do mês
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDay.getDay();
    
    // Obter o número de dias no mês
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    
    // Adicionar os dias vazios antes do primeiro dia do mês
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'h-10 flex items-center justify-center text-gray-400';
        calendarDays.appendChild(emptyDay);
    }
    
    // Adicionar os dias do mês
    for (let i = 1; i <= totalDays; i++) {
        const day = document.createElement('div');
        day.className = 'h-10 flex items-center justify-center';
        
        // Destacar o dia atual
        if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            day.className += ' bg-green-100 text-green-800 font-semibold rounded-full';
        }
        
        // Adicionar classe para dias com consultas (simulação)
        if (i === 5 || i === 10 || i === 15) {
            day.className += ' relative';
            day.innerHTML = `
                ${i}
                <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
            `;
        } else {
            day.textContent = i;
        }
        
        // Adicionar event listener para abrir o modal ao clicar em um dia
        day.addEventListener('click', function() {
            openAgendamentoModal();
            
            // Preencher a data selecionada no formulário
            const dateInput = document.getElementById('appointment-date');
            if (dateInput) {
                const year = currentYear;
                const month = String(currentMonth + 1).padStart(2, '0');
                const day = String(i).padStart(2, '0');
                dateInput.value = `${year}-${month}-${day}`;
            }
        });
        
        calendarDays.appendChild(day);
    }
}

// Configurar tooltips para os cards do dashboard
function setupDashboardCardTooltips() {
    // Adicionar tooltips aos cards do dashboard
    const dashboardCards = document.querySelectorAll('.stat-card');
    
    dashboardCards.forEach(card => {
        // Adicionar classe para tooltip
        card.classList.add('card-tooltip');
        
        // Obter o título do card
        const title = card.querySelector('div:first-child').textContent.trim();
        
        // Criar conteúdo do tooltip baseado no título
        let tooltipContent = '';
        switch (title) {
            case 'Total de Pacientes':
                tooltipContent = 'Clique para ver a lista completa de pacientes';
                break;
            case 'Planos Ativos':
                tooltipContent = 'Clique para gerenciar os planos alimentares ativos';
                break;
            case 'Consultas Agendadas':
                tooltipContent = 'Clique para ver todas as consultas agendadas';
                break;
            case 'Média de Perda de Peso':
                tooltipContent = 'Clique para ver relatórios detalhados de progresso';
                break;
            default:
                tooltipContent = 'Clique para mais detalhes';
        }
        
        // Adicionar o elemento de tooltip
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'tooltip-content';
        tooltipElement.textContent = tooltipContent;
        card.appendChild(tooltipElement);
        
        // Adicionar event listener para navegação ao clicar no card
        card.addEventListener('click', function() {
            let targetSection = '';
            switch (title) {
                case 'Total de Pacientes':
                    targetSection = 'pacientes';
                    break;
                case 'Planos Ativos':
                    targetSection = 'planos';
                    break;
                case 'Consultas Agendadas':
                    targetSection = 'agendamento';
                    break;
                case 'Média de Perda de Peso':
                    targetSection = 'relatorios';
                    break;
                default:
                    targetSection = 'dashboard';
            }
            
            // Navegar para a seção correspondente
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (link.getAttribute('data-target') === targetSection) {
                    link.click();
                }
            });
        });
    });
}
