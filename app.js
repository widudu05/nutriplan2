// Arquivo JavaScript principal para o SaaS de Gestão Nutricional

// Inicialização dos gráficos
document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de evolução
    const evolucaoCtx = document.getElementById('evolucaoChart').getContext('2d');
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

    // Gráfico de objetivos
    const objetivosCtx = document.getElementById('objetivosChart').getContext('2d');
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
});

// Inicialização dos módulos
document.addEventListener('DOMContentLoaded', function() {
    // Carregar módulos
    const pacientesContainer = document.getElementById('pacientes-container');
    const alimentosContainer = document.getElementById('alimentos-container');
    const receitasContainer = document.getElementById('receitas-container');
    const relatoriosContainer = document.getElementById('relatorios-container');

    // Função para carregar o módulo de pacientes
    function loadPacientesModule() {
        // Simulação de carregamento do módulo
        const pacientesModule = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
                    <div class="md:flex md:items-center md:justify-between">
                        <div class="flex-1 min-w-0">
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <div class="relative flex items-stretch flex-grow">
                                    <input type="text" class="form-input focus:ring-teal-500 focus:border-teal-500 block w-full rounded-md sm:text-sm border-gray-300" placeholder="Buscar por nome, email ou telefone...">
                                </div>
                                <div class="ml-3">
                                    <select class="form-select focus:ring-teal-500 focus:border-teal-500 h-full py-0 pl-3 pr-7 border-gray-300 bg-transparent text-gray-500 sm:text-sm rounded-md">
                                        <option>Todos</option>
                                        <option>Ativos</option>
                                        <option>Inativos</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 flex md:mt-0 md:ml-4">
                            <button type="button" class="btn-primary inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                </svg>
                                Novo Paciente
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul class="divide-y divide-gray-200">
                        <li>
                            <div class="block hover:bg-gray-50">
                                <div class="px-4 py-4 sm:px-6">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium">
                                                MS
                                            </div>
                                            <div class="ml-4">
                                                <p class="text-sm font-medium text-teal-600 truncate">Maria Silva</p>
                                                <p class="text-sm text-gray-500">maria.silva@email.com</p>
                                            </div>
                                        </div>
                                        <div class="ml-2 flex-shrink-0 flex">
                                            <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Ativo
                                            </p>
                                        </div>
                                    </div>
                                    <div class="mt-2 sm:flex sm:justify-between">
                                        <div class="sm:flex">
                                            <p class="flex items-center text-sm text-gray-500">
                                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                                </svg>
                                                Feminino • 40 anos
                                            </p>
                                            <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                                </svg>
                                                (11) 98765-4321
                                            </p>
                                        </div>
                                        <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                            </svg>
                                            <p>
                                                Próxima consulta: 10/05/2025
                                            </p>
                                        </div>
                                    </div>
                                    <div class="mt-2 flex justify-end space-x-2">
                                        <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                            Detalhes
                                        </button>
                                        <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                            Editar
                                        </button>
                                        <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            Agendar Consulta
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="block hover:bg-gray-50">
                                <div class="px-4 py-4 sm:px-6">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium">
                                                JS
                                            </div>
                                            <div class="ml-4">
                                                <p class="text-sm font-medium text-teal-600 truncate">João Santos</p>
                                                <p class="text-sm text-gray-500">joao.santos@email.com</p>
                                            </div>
                                        </div>
                                        <div class="ml-2 flex-shrink-0 flex">
                                            <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Ativo
                                            </p>
                                        </div>
                                    </div>
                                    <div class="mt-2 sm:flex sm:justify-between">
                                        <div class="sm:flex">
                                            <p class="flex items-center text-sm text-gray-500">
                                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                                </svg>
                                                Masculino • 35 anos
                                            </p>
                                            <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                                </svg>
                                                (11) 91234-5678
                                            </p>
                                        </div>
                                        <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                            </svg>
                                            <p>
                                                Próxima consulta: 05/05/2025
                                            </p>
                                        </div>
                                    </div>
                                    <div class="mt-2 flex justify-end space-x-2">
                                        <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                            Detalhes
                                        </button>
                                        <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                            Editar
                                        </button>
                                        <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            Agendar Consulta
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        `;
        pacientesContainer.innerHTML = pacientesModule;
    }

    // Função para carregar o módulo de banco de alimentos
    function loadAlimentosModule() {
        // Simulação de carregamento do módulo
        const alimentosModule = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
                    <div class="md:flex md:items-center md:justify-between">
                        <div class="flex-1 min-w-0">
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <div class="relative flex items-stretch flex-grow">
                                    <input type="text" class="form-input focus:ring-teal-500 focus:border-teal-500 block w-full rounded-md sm:text-sm border-gray-300" placeholder="Buscar por nome ou categoria...">
                                </d
(Content truncated due to size limit. Use line ranges to read in chunks)