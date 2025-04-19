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
                                </div>
                                <div class="ml-3">
                                    <select class="form-select focus:ring-teal-500 focus:border-teal-500 h-full py-0 pl-3 pr-7 border-gray-300 bg-transparent text-gray-500 sm:text-sm rounded-md">
                                        <option>Todas as categorias</option>
                                        <option>Cereais</option>
                                        <option>Leguminosas</option>
                                        <option>Carnes</option>
                                        <option>Vegetais</option>
                                        <option>Frutas</option>
                                    </select>
                                </div>
                                <div class="ml-3">
                                    <select class="form-select focus:ring-teal-500 focus:border-teal-500 h-full py-0 pl-3 pr-7 border-gray-300 bg-transparent text-gray-500 sm:text-sm rounded-md">
                                        <option>Todas as fontes</option>
                                        <option>TACO</option>
                                        <option>IBGE</option>
                                        <option>Personalizado</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 flex md:mt-0 md:ml-4">
                            <button type="button" class="btn-primary inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                </svg>
                                Novo Alimento
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Alimento
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Categoria
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Calorias (100g)
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Proteínas (g)
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Carboidratos (g)
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Gorduras (g)
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fonte
                                </th>
                                <th scope="col" class="relative px-6 py-3">
                                    <span class="sr-only">Ações</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr class="table-row-hover">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">
                                                Arroz branco cozido
                                            </div>
                                            <div class="text-sm text-gray-500">
                                                Porção padrão: 100 g
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">Cereais</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">128 kcal</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">2.5g</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">28.1g</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">0.2g</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        TACO
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div class="flex justify-end space-x-2">
                                        <button type="button" class="text-gray-400 hover:text-gray-500">
                                            <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </button>
                                        <button type="button" class="text-teal-600 hover:text-teal-900">
                                            Detalhes
                                        </button>
                                        <button type="button" class="text-indigo-600 hover:text-indigo-900">
                                            Editar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr class="table-row-hover">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">
                                                Feijão preto cozido
                                            </div>
                                            <div class="text-sm text-gray-500">
                                                Porção padrão: 80 g
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">Leguminosas</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">77 kcal</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">5.1g</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">13.6g</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">0.5g</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        TACO
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div class="flex justify-end space-x-2">
                                        <button type="button" class="text-gray-400 hover:text-gray-500">
                                            <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </button>
                                        <button type="button" class="text-teal-600 hover:text-teal-900">
                                            Detalhes
                                        </button>
                                        <button type="button" class="text-indigo-600 hover:text-indigo-900">
                                            Editar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        alimentosContainer.innerHTML = alimentosModule;
    }

    // Função para carregar o módulo de receitas
    function loadReceitasModule() {
        // Simulação de carregamento do módulo
        const receitasModule = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
                    <div class="md:flex md:items-center md:justify-between">
                        <div class="flex-1 min-w-0">
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <div class="relative flex items-stretch flex-grow">
                                    <input type="text" class="form-input focus:ring-teal-500 focus:border-teal-500 block w-full rounded-md sm:text-sm border-gray-300" placeholder="Buscar por nome ou ingrediente...">
                                </div>
                                <div class="ml-3">
                                    <select class="form-select focus:ring-teal-500 focus:border-teal-500 h-full py-0 pl-3 pr-7 border-gray-300 bg-transparent text-gray-500 sm:text-sm rounded-md">
                                        <option>Todas as categorias</option>
                                        <option>Café da Manhã</option>
                                        <option>Almoço</option>
                                        <option>Jantar</option>
                                        <option>Lanches</option>
                                        <option>Sobremesas</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 flex md:mt-0 md:ml-4">
                            <button type="button" class="btn-primary inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                </svg>
                                Nova Receita
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center justify-between">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Salada de Frango com Abacate</h3>
                                <button type="button" class="text-gray-400 hover:text-gray-500">
                                    <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                            </div>
                            <div class="mt-2 flex items-center text-sm text-gray-500">
                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                </svg>
                                Saladas
                            </div>
                            <div class="mt-2 flex items-center text-sm text-gray-500">
                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                                </svg>
                                20 minutos
                            </div>
                            <div class="mt-2 flex items-center text-sm text-gray-500">
                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                2 porções
                            </div>
                            
                            <div class="mt-4 border-t border-gray-200 pt-4">
                                <div class="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p class="text-sm font-medium text-gray-500">Calorias</p>
                                        <p class="mt-1 text-lg font-semibold text-gray-900">320</p>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-500">Proteínas</p>
                                        <p class="mt-1 text-lg font-semibold text-gray-900">28g</p>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-500">Carboidratos</p>
                                        <p class="mt-1 text-lg font-semibold text-gray-900">12g</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mt-5 flex justify-end space-x-2">
                                <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    Ver Receita
                                </button>
                                <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    Editar
                                </button>
                                <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center justify-between">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Omelete de Espinafre e Queijo</h3>
                                <button type="button" class="text-gray-400 hover:text-gray-500">
                                    <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                            </div>
                            <div class="mt-2 flex items-center text-sm text-gray-500">
                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                </svg>
                                Café da Manhã
                            </div>
                            <div class="mt-2 flex items-center text-sm text-gray-500">
                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                                </svg>
                                15 minutos
                            </div>
                            <div class="mt-2 flex items-center text-sm text-gray-500">
                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                1 porção
                            </div>
                            
                            <div class="mt-4 border-t border-gray-200 pt-4">
                                <div class="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p class="text-sm font-medium text-gray-500">Calorias</p>
                                        <p class="mt-1 text-lg font-semibold text-gray-900">280</p>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-500">Proteínas</p>
                                        <p class="mt-1 text-lg font-semibold text-gray-900">22g</p>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-500">Carboidratos</p>
                                        <p class="mt-1 text-lg font-semibold text-gray-900">4g</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mt-5 flex justify-end space-x-2">
                                <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    Ver Receita
                                </button>
                                <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    Editar
                                </button>
                                <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        receitasContainer.innerHTML = receitasModule;
    }

    // Função para carregar o módulo de relatórios
    function loadRelatoriosModule() {
        // Simulação de carregamento do módulo
        const relatoriosModule = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
                    <div class="md:grid md:grid-cols-3 md:gap-6">
                        <div class="md:col-span-1">
                            <h3 class="text-lg font-medium leading-6 text-gray-900">Configuração do Relatório</h3>
                            <p class="mt-1 text-sm text-gray-500">
                                Selecione o tipo de relatório, período e formato de exportação desejados.
                            </p>
                        </div>
                        <div class="mt-5 md:mt-0 md:col-span-2">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="tipo-relatorio" class="block text-sm font-medium text-gray-700">
                                        Tipo de Relatório
                                    </label>
                                    <select id="tipo-relatorio" name="tipo-relatorio" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
                                        <option>Relatório de Pacientes</option>
                                        <option>Relatório Nutricional</option>
                                        <option>Relatório de Evolução</option>
                                        <option>Relatório Financeiro</option>
                                        <option>Relatório Individual</option>
                                    </select>
                                </div>
                                
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="periodo" class="block text-sm font-medium text-gray-700">
                                        Período
                                    </label>
                                    <select id="periodo" name="periodo" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
                                        <option>Último mês</option>
                                        <option>Últimos 3 meses</option>
                                        <option>Últimos 6 meses</option>
                                        <option>Último ano</option>
                                    </select>
                                </div>
                                
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="formato-exportacao" class="block text-sm font-medium text-gray-700">
                                        Formato de Exportação
                                    </label>
                                    <select id="formato-exportacao" name="formato-exportacao" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
                                        <option>PDF</option>
                                        <option>Excel</option>
                                        <option>CSV</option>
                                    </select>
                                </div>
                                
                                <div class="col-span-6 sm:col-span-3 flex items-end">
                                    <div class="flex space-x-3 w-full">
                                        <button type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex-grow">
                                            Gerar Relatório
                                        </button>
                                        <button type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                            Exportar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Relatório de Pacientes</h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">Período: 19/03/2025 a 19/04/2025</p>
                    </div>
                    
                    <div class="px-4 py-5 sm:p-6">
                        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            <div class="bg-white overflow-hidden shadow rounded-lg">
                                <div class="px-4 py-5 sm:p-6">
                                    <dt class="text-sm font-medium text-gray-500 truncate">Total de Pacientes</dt>
                                    <dd class="mt-1 text-3xl font-semibold text-gray-900">32</dd>
                                </div>
                            </div>
                            <div class="bg-white overflow-hidden shadow rounded-lg">
                                <div class="px-4 py-5 sm:p-6">
                                    <dt class="text-sm font-medium text-gray-500 truncate">Novos Pacientes</dt>
                                    <dd class="mt-1 text-3xl font-semibold text-gray-900">8</dd>
                                </div>
                            </div>
                            <div class="bg-white overflow-hidden shadow rounded-lg">
                                <div class="px-4 py-5 sm:p-6">
                                    <dt class="text-sm font-medium text-gray-500 truncate">Pacientes Ativos</dt>
                                    <dd class="mt-1 text-3xl font-semibold text-gray-900">28</dd>
                                </div>
                            </div>
                            <div class="bg-white overflow-hidden shadow rounded-lg">
                                <div class="px-4 py-5 sm:p-6">
                                    <dt class="text-sm font-medium text-gray-500 truncate">Consultas Realizadas</dt>
                                    <dd class="mt-1 text-3xl font-semibold text-gray-900">45</dd>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div class="bg-white overflow-hidden shadow rounded-lg">
                                <div class="px-4 py-5 sm:p-6">
                                    <h4 class="text-base font-medium text-gray-900 mb-4">Distribuição por Objetivo</h4>
                                    <div class="space-y-4">
                                        <div>
                                            <div class="flex items-center justify-between">
                                                <div class="text-sm font-medium text-gray-900">Emagrecimento</div>
                                                <div class="text-sm font-medium text-gray-900">56%</div>
                                            </div>
                                            <div class="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                                                <div class="bg-teal-600 h-2.5 rounded-full" style="width: 56%"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex items-center justify-between">
                                                <div class="text-sm font-medium text-gray-900">Ganho de massa muscular</div>
                                                <div class="text-sm font-medium text-gray-900">19%</div>
                                            </div>
                                            <div class="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                                                <div class="bg-teal-600 h-2.5 rounded-full" style="width: 19%"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex items-center justify-between">
                                                <div class="text-sm font-medium text-gray-900">Manutenção</div>
                                                <div class="text-sm font-medium text-gray-900">13%</div>
                                            </div>
                                            <div class="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                                                <div class="bg-teal-600 h-2.5 rounded-full" style="width: 13%"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="bg-white overflow-hidden shadow rounded-lg">
                                <div class="px-4 py-5 sm:p-6">
                                    <h4 class="text-base font-medium text-gray-900 mb-4">Distribuição por Gênero</h4>
                                    <div class="h-64 flex items-center justify-center">
                                        <div class="w-full max-w-md">
                                            <div class="relative h-40">
                                                <div class="absolute inset-0 flex items-center justify-center">
                                                    <div class="text-center">
                                                        <span class="block text-3xl font-bold text-gray-900">32</span>
                                                        <span class="block text-sm font-medium text-gray-500">Total de Pacientes</span>
                                                    </div>
                                                </div>
                                                <svg viewBox="0 0 100 100" class="w-full h-full">
                                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#d1d5db" stroke-width="15" />
                                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0694a2" stroke-width="15" stroke-dasharray="251.2" stroke-dashoffset="94.2" transform="rotate(-90 50 50)" />
                                                </svg>
                                            </div>
                                            <div class="mt-4 grid grid-cols-2 gap-4">
                                                <div class="flex items-center">
                                                    <span class="h-3 w-3 rounded-full bg-teal-500 mr-2"></span>
                                                    <span class="text-sm text-gray-700">Feminino: 62.5%</span>
                                                </div>
                                                <div class="flex items-center">
                                                    <span class="h-3 w-3 rounded-full bg-gray-300 mr-2"></span>
                                                    <span class="text-sm text-gray-700">Masculino: 37.5%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        relatoriosContainer.innerHTML = relatoriosModule;
    }

    // Carregar os módulos quando necessário
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            
            // Remover classe ativa de todos os links
            document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(el => {
                el.classList.remove('active');
            });
            
            // Adicionar classe ativa ao link clicado
            document.querySelectorAll(`.nav-link[data-target="${target}"], .mobile-nav-link[data-target="${target}"]`).forEach(el => {
                el.classList.add('active');
            });
            
            // Esconder todos os conteúdos
            document.querySelectorAll('.page-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar o conteúdo alvo
            const targetContent = document.getElementById(`${target}-content`);
            targetContent.classList.add('active');
            
            // Carregar o módulo correspondente se necessário
            if (target === 'pacientes') {
                loadPacientesModule();
            } else if (target === 'alimentos') {
                loadAlimentosModule();
            } else if (target === 'receitas') {
                loadReceitasModule();
            } else if (target === 'relatorios') {
                loadRelatoriosModule();
            }
            
            // Fechar o menu mobile se estiver aberto
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu.classList.contains('block')) {
                mobileMenu.classList.remove('block');
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // Controle do menu mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('block');
        } else {
            mobileMenu.classList.remove('block');
            mobileMenu.classList.add('hidden');
        }
    });
});
