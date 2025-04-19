// Arquivo de módulos para o SaaS de Gestão Nutricional

// Função para carregar o módulo de pacientes
function loadPacientesModule() {
    const pacientesContainer = document.getElementById('pacientes-container');
    if (!pacientesContainer) return;
    
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
                    <li class="paciente-card" data-nome="Maria Silva">
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
                                    <button type="button" class="agendar-consulta-btn inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        Agendar Consulta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="paciente-card" data-nome="João Santos">
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
                                    <button type="button" class="agendar-consulta-btn inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
    
    // Inicializar botões de agendamento após carregar o módulo
    initAgendamentoButtons();
}

// Função para carregar o módulo de banco de alimentos
function loadAlimentosModule() {
    const alimentosContainer = document.getElementById('alimentos-container');
    if (!alimentosContainer) return;
    
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
                                    <option>Cereais e derivados</option>
                                    <option>Verduras e legumes</option>
                                    <option>Frutas</option>
                                    <option>Carnes e ovos</option>
                                    <option>Leites e derivados</option>
                                    <option>Leguminosas</option>
                                    <option>Óleos e gorduras</option>
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
                            <th scope="col" class="relative px-6 py-3">
                                <span class="sr-only">Ações</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr class="table-row-hover">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-teal-600">Arroz, tipo 1, cozido</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-500">Cereais e derivados</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">128</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">2.5</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">28.1</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">0.2</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" class="text-teal-600 hover:text-teal-900">Detalhes</a>
                            </td>
                        </tr>
                        <tr class="table-row-hover">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-teal-600">Feijão, carioca, cozido</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-500">Leguminosas</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">76</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">4.8</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">13.6</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">0.5</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" class="text-teal-600 hover:text-teal-900">Detalhes</a>
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
    const receitasContainer = document.getElementById('receitas-container');
    if (!receitasContainer) return;
    
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
                                    <option>Café da manhã</option>
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
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <svg class="h-6 w-6 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-lg font-medium text-teal-600 truncate">
                                        Salada de Quinoa com Legumes
                                    </dt>
                                    <dd>
                                        <div class="text-sm text-gray-500">
                                            Tempo de preparo: 30 min • Porções: 4
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-5 py-3">
                        <div class="text-sm">
                            <div class="flex justify-between">
                                <div>
                                    <span class="font-medium text-teal-700">Calorias:</span> 
                                    <span class="text-gray-900">245 kcal</span>
                                </div>
                                <a href="#" class="font-medium text-teal-600 hover:text-teal-500">
                                    Ver detalhes
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <svg class="h-6 w-6 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-lg font-medium text-teal-600 truncate">
                                        Omelete de Claras com Espinafre
                                    </dt>
                                    <dd>
                                        <div class="text-sm text-gray-500">
                                            Tempo de preparo: 15 min • Porções: 1
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-5 py-3">
                        <div class="text-sm">
                            <div class="flex justify-between">
                                <div>
                                    <span class="font-medium text-teal-700">Calorias:</span> 
                                    <span class="text-gray-900">180 kcal</span>
                                </div>
                                <a href="#" class="font-medium text-teal-600 hover:text-teal-500">
                                    Ver detalhes
                                </a>
                            </div>
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
    const relatoriosContainer = document.getElementById('relatorios-container');
    if (!relatoriosContainer) return;
    
    // Simulação de carregamento do módulo
    const relatoriosModule = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
                <div class="md:flex md:items-center md:justify-between">
                    <div class="flex-1 min-w-0">
                        <h2 class="text-lg leading-6 font-medium text-gray-900">Relatórios</h2>
                        <p class="mt-1 text-sm text-gray-500">
                            Gere relatórios personalizados para análise e acompanhamento.
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            Evolução de Pacientes
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                            Acompanhamento de métricas ao longo do tempo.
                        </p>
                    </div>
                    <div class="px-4 py-5 sm:p-6">
                        <p class="text-sm text-gray-500 mb-4">
                            Selecione os parâmetros para gerar o relatório:
                        </p>
                        <div class="space-y-4">
                            <div>
                                <label for="paciente" class="block text-sm font-medium text-gray-700">Paciente</label>
                                <select id="paciente" name="paciente" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                                    <option>Todos os pacientes</option>
                                    <option>Maria Silva</option>
                                    <option>João Santos</option>
                                </select>
                            </div>
                            <div>
                                <label for="metrica" class="block text-sm font-medium text-gray-700">Métrica</label>
                                <select id="metrica" name="metrica" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                                    <option>Peso</option>
                                    <option>IMC</option>
                                    <option>Circunferência da Cintura</option>
                                    <option>% de Gordura Corporal</option>
                                </select>
                            </div>
                            <div>
                                <label for="periodo" class="block text-sm font-medium text-gray-700">Período</label>
                                <select id="periodo" name="periodo" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                                    <option>Últimos 3 meses</option>
                                    <option>Últimos 6 meses</option>
                                    <option>Último ano</option>
                                    <option>Todo o histórico</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 py-4 sm:px-6">
                        <button type="button" class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            Gerar Relatório
                        </button>
                    </div>
                </div>
                
                <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            Análise de Planos Alimentares
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                            Distribuição de macronutrientes e calorias.
                        </p>
                    </div>
                    <div class="px-4 py-5 sm:p-6">
                        <p class="text-sm text-gray-500 mb-4">
                            Selecione os parâmetros para gerar o relatório:
                        </p>
                        <div class="space-y-4">
                            <div>
                                <label for="paciente-plano" class="block text-sm font-medium text-gray-700">Paciente</label>
                                <select id="paciente-plano" name="paciente-plano" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                                    <option>Todos os pacientes</option>
                                    <option>Maria Silva</option>
                                    <option>João Santos</option>
                                </select>
                            </div>
                            <div>
                                <label for="plano" class="block text-sm font-medium text-gray-700">Plano Alimentar</label>
                                <select id="plano" name="plano" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                                    <option>Todos os planos</option>
                                    <option>Plano de Emagrecimento - Maria</option>
                                    <option>Plano de Ganho de Massa - João</option>
                                </select>
                            </div>
                            <div>
                                <label for="tipo-analise" class="block text-sm font-medium text-gray-700">Tipo de Análise</label>
                                <select id="tipo-analise" name="tipo-analise" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                                    <option>Distribuição de Macronutrientes</option>
                                    <option>Calorias por Refeição</option>
                                    <option>Adequação Nutricional</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 py-4 sm:px-6">
                        <button type="button" class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            Gerar Relatório
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    relatoriosContainer.innerHTML = relatoriosModule;
}
