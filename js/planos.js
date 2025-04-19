// Arquivo JavaScript para funcionalidade de planos alimentares
document.addEventListener('DOMContentLoaded', function() {
    // Criar o conteúdo da página de planos alimentares
    createPlanosAlimentaresPage();
    
    // Configurar ações para o perfil do usuário
    setupUserProfileActions();
});

// Criar a página de planos alimentares
function createPlanosAlimentaresPage() {
    const planosPage = document.querySelector('#planos-page');
    if (!planosPage) return;
    
    // Adicionar conteúdo à página de planos alimentares
    planosPage.innerHTML = `
        <div class="mb-6 flex justify-between items-center">
            <h1 class="text-2xl font-semibold text-gray-900">Planos Alimentares</h1>
            <button id="new-plan-btn" class="btn-primary inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white">
                <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Novo Plano
            </button>
        </div>
        
        <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                    <h2 class="text-lg leading-6 font-medium text-gray-900">Filtros</h2>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Filtre os planos alimentares por paciente, tipo ou status</p>
                </div>
            </div>
            <div class="border-t border-gray-200">
                <div class="px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label for="patient-filter" class="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
                            <select id="patient-filter" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                <option value="">Todos os pacientes</option>
                                <option value="1">Maria Silva</option>
                                <option value="2">João Santos</option>
                                <option value="3">Ana Oliveira</option>
                                <option value="4">Carlos Pereira</option>
                            </select>
                        </div>
                        <div>
                            <label for="plan-type-filter" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Plano</label>
                            <select id="plan-type-filter" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                <option value="">Todos os tipos</option>
                                <option value="emagrecimento">Emagrecimento</option>
                                <option value="ganho-massa">Ganho de Massa</option>
                                <option value="manutencao">Manutenção</option>
                                <option value="reeducacao">Reeducação Alimentar</option>
                                <option value="patologia">Tratamento de Patologia</option>
                            </select>
                        </div>
                        <div>
                            <label for="status-filter" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select id="status-filter" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                <option value="">Todos os status</option>
                                <option value="ativo">Ativo</option>
                                <option value="concluido">Concluído</option>
                                <option value="pausado">Pausado</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-4 flex justify-end">
                        <button id="apply-filter-btn" class="btn-primary px-4 py-2 text-sm font-medium text-white rounded-md">
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
                <h2 class="text-lg leading-6 font-medium text-gray-900">Planos Alimentares Ativos</h2>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">Lista de planos alimentares ativos</p>
            </div>
            <div class="border-t border-gray-200">
                <ul id="plans-list" class="divide-y divide-gray-200">
                    <!-- Plano 1 -->
                    <li class="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer plan-item">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <span class="text-green-700 font-medium">MS</span>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">Maria Silva</div>
                                    <div class="text-sm text-gray-500">Plano de Emagrecimento</div>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Ativo
                                </span>
                                <div class="ml-4 flex">
                                    <button class="text-green-600 hover:text-green-900 mr-2 view-plan-btn">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                    </button>
                                    <button class="text-blue-600 hover:text-blue-900 mr-2 edit-plan-btn">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                        </svg>
                                    </button>
                                    <button class="text-red-600 hover:text-red-900 delete-plan-btn">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <!-- Plano 2 -->
                    <li class="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer plan-item">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span class="text-blue-700 font-medium">JS</span>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">João Santos</div>
                                    <div class="text-sm text-gray-500">Plano de Ganho de Massa</div>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Ativo
                                </span>
                                <div class="ml-4 flex">
                                    <button class="text-green-600 hover:text-green-900 mr-2 view-plan-btn">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                    </button>
                                    <button class="text-blue-600 hover:text-blue-900 mr-2 edit-plan-btn">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                        </svg>
                                    </button>
                                    <button class="text-red-600 hover:text-red-900 delete-plan-btn">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <!-- Plano 3 -->
                    <li class="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer plan-item">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span class="text-purple-700 font-medium">AO</span>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">Ana Oliveira</div>
                                    <div class="text-sm text-gray-500">Plano de Reeducação Alimentar</div>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Ativo
                                </span>
                                <div class="ml-4 flex">
                                    <button class="text-green-600 hover:text-green-900 mr-2 view-plan-btn">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                    </button>
                                    <button class="text-blue-600 hover:text-blue-900 mr-2 edit-plan-btn">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                        </svg>
                                    </button>
                                    <button class="text-red-600 hover:text-red-900 delete-plan-btn">
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
        
        <!-- Modal de visualização do plano -->
        <div id="view-plan-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="text-xl font-semibold text-gray-900">Detalhes do Plano Alimentar</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Informações Gerais</h3>
                        <div class="bg-gray-50 p-4 rounded-md">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Paciente</p>
                                    <p class="text-sm text-gray-900">Maria Silva</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Tipo de Plano</p>
                                    <p class="text-sm text-gray-900">Emagrecimento</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Data de Início</p>
                                    <p class="text-sm text-gray-900">01/04/2025</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Data de Término</p>
                                    <p class="text-sm text-gray-900">01/07/2025</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Status</p>
                                    <p class="text-sm text-gray-900">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Ativo
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Objetivo</p>
                                    <p class="text-sm text-gray-900">Perda de 5kg em 3 meses</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Refeições</h3>
                        <div class="space-y-4">
                            <!-- Café da Manhã -->
                            <div class="bg-gray-50 p-4 rounded-md">
                                <h4 class="text-md font-medium text-gray-900 mb-2">Café da Manhã (7:00)</h4>
                                <ul class="list-disc pl-5 text-sm text-gray-700">
                                    <li>1 fatia de pão integral</li>
                                    <li>1 colher (sopa) de queijo cottage</li>
                                    <li>1 xícara de chá verde ou café sem açúcar</li>
                                    <li>1 maçã pequena</li>
                                </ul>
                            </div>
                            
                            <!-- Lanche da Manhã -->
                            <div class="bg-gray-50 p-4 rounded-md">
                                <h4 class="text-md font-medium text-gray-900 mb-2">Lanche da Manhã (10:00)</h4>
                                <ul class="list-disc pl-5 text-sm text-gray-700">
                                    <li>1 iogurte natural desnatado</li>
                                    <li>1 colher (sopa) de granola sem açúcar</li>
                                </ul>
                            </div>
                            
                            <!-- Almoço -->
                            <div class="bg-gray-50 p-4 rounded-md">
                                <h4 class="text-md font-medium text-gray-900 mb-2">Almoço (13:00)</h4>
                                <ul class="list-disc pl-5 text-sm text-gray-700">
                                    <li>120g de frango grelhado</li>
                                    <li>2 colheres (sopa) de arroz integral</li>
                                    <li>Salada de folhas verdes à vontade</li>
                                    <li>1 colher (sopa) de azeite extra virgem</li>
                                    <li>1/2 abacate pequeno</li>
                                </ul>
                            </div>
                            
                            <!-- Lanche da Tarde -->
                            <div class="bg-gray-50 p-4 rounded-md">
                                <h4 class="text-md font-medium text-gray-900 mb-2">Lanche da Tarde (16:00)</h4>
                                <ul class="list-disc pl-5 text-sm text-gray-700">
                                    <li>1 punhado de castanhas (30g)</li>
                                    <li>1 fruta de tamanho médio</li>
                                </ul>
                            </div>
                            
                            <!-- Jantar -->
                            <div class="bg-gray-50 p-4 rounded-md">
                                <h4 class="text-md font-medium text-gray-900 mb-2">Jantar (19:00)</h4>
                                <ul class="list-disc pl-5 text-sm text-gray-700">
                                    <li>150g de peixe assado</li>
                                    <li>Legumes cozidos (brócolis, cenoura, abobrinha)</li>
                                    <li>1 batata doce pequena</li>
                                    <li>Salada de folhas verdes à vontade</li>
                                    <li>1 colher (sopa) de azeite extra virgem</li>
                                </ul>
                            </div>
                            
                            <!-- Ceia -->
                            <div class="bg-gray-50 p-4 rounded-md">
                                <h4 class="text-md font-medium text-gray-900 mb-2">Ceia (22:00)</h4>
                                <ul class="list-disc pl-5 text-sm text-gray-700">
                                    <li>1 xícara de chá de camomila</li>
                                    <li>1 colher (sopa) de sementes de chia</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Observações</h3>
                        <div class="bg-gray-50 p-4 rounded-md">
                            <p class="text-sm text-gray-700">
                                - Beber pelo menos 2 litros de água por dia<br>
                                - Evitar alimentos processados e ultraprocessados<br>
                                - Praticar atividade física pelo menos 3 vezes por semana<br>
                                - Evitar consumo de álcool<br>
                                - Suplementação: Ômega 3 (1g/dia) e Vitamina D (2000 UI/dia)
                            </p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="close-view-plan" class="btn-secondary px-4 py-2 text-sm font-medium rounded-md">Fechar</button>
                    <button id="edit-view-plan" class="btn-primary px-4 py-2 text-sm font-medium text-white rounded-md">Editar Plano</button>
                </div>
            </div>
        </div>
        
        <!-- Modal de criação/edição de plano -->
        <div id="edit-plan-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="text-xl font-semibold text-gray-900">Criar/Editar Plano Alimentar</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <form id="plan-form">
                        <div class="mb-4">
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Informações Gerais</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="plan-patient" class="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
                                    <select id="plan-patient" name="plan-patient" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                        <option value="">Selecione um paciente</option>
                                        <option value="1">Maria Silva</option>
                                        <option value="2">João Santos</option>
                                        <option value="3">Ana Oliveira</option>
                                        <option value="4">Carlos Pereira</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="plan-type" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Plano</label>
                                    <select id="plan-type" name="plan-type" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                        <option value="">Selecione o tipo</option>
                                        <option value="emagrecimento">Emagrecimento</option>
                                        <option value="ganho-massa">Ganho de Massa</option>
                                        <option value="manutencao">Manutenção</option>
                                        <option value="reeducacao">Reeducação Alimentar</option>
                                        <option value="patologia">Tratamento de Patologia</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="plan-start-date" class="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
                                    <input type="date" id="plan-start-date" name="plan-start-date" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                </div>
                                <div>
                                    <label for="plan-end-date" class="block text-sm font-medium text-gray-700 mb-1">Data de Término</label>
                                    <input type="date" id="plan-end-date" name="plan-end-date" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                </div>
                                <div>
                                    <label for="plan-status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select id="plan-status" name="plan-status" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                        <option value="ativo">Ativo</option>
                                        <option value="concluido">Concluído</option>
                                        <option value="pausado">Pausado</option>
                                        <option value="cancelado">Cancelado</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="plan-goal" class="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
                                    <input type="text" id="plan-goal" name="plan-goal" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" placeholder="Ex: Perda de 5kg em 3 meses">
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Refeições</h3>
                            <div id="meals-container" class="space-y-4">
                                <!-- Café da Manhã -->
                                <div class="bg-gray-50 p-4 rounded-md">
                                    <div class="flex justify-between items-center mb-2">
                                        <h4 class="text-md font-medium text-gray-900">Café da Manhã</h4>
                                        <div class="flex items-center">
                                            <label for="breakfast-time" class="block text-sm font-medium text-gray-700 mr-2">Horário:</label>
                                            <input type="time" id="breakfast-time" name="breakfast-time" class="form-input block rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" value="07:00">
                                        </div>
                                    </div>
                                    <textarea id="breakfast-items" name="breakfast-items" rows="4" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" placeholder="Digite os alimentos, um por linha"></textarea>
                                </div>
                                
                                <!-- Lanche da Manhã -->
                                <div class="bg-gray-50 p-4 rounded-md">
                                    <div class="flex justify-between items-center mb-2">
                                        <h4 class="text-md font-medium text-gray-900">Lanche da Manhã</h4>
                                        <div class="flex items-center">
                                            <label for="morning-snack-time" class="block text-sm font-medium text-gray-700 mr-2">Horário:</label>
                                            <input type="time" id="morning-snack-time" name="morning-snack-time" class="form-input block rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" value="10:00">
                                        </div>
                                    </div>
                                    <textarea id="morning-snack-items" name="morning-snack-items" rows="4" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" placeholder="Digite os alimentos, um por linha"></textarea>
                                </div>
                                
                                <!-- Almoço -->
                                <div class="bg-gray-50 p-4 rounded-md">
                                    <div class="flex justify-between items-center mb-2">
                                        <h4 class="text-md font-medium text-gray-900">Almoço</h4>
                                        <div class="flex items-center">
                                            <label for="lunch-time" class="block text-sm font-medium text-gray-700 mr-2">Horário:</label>
                                            <input type="time" id="lunch-time" name="lunch-time" class="form-input block rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" value="13:00">
                                        </div>
                                    </div>
                                    <textarea id="lunch-items" name="lunch-items" rows="4" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" placeholder="Digite os alimentos, um por linha"></textarea>
                                </div>
                                
                                <!-- Lanche da Tarde -->
                                <div class="bg-gray-50 p-4 rounded-md">
                                    <div class="flex justify-between items-center mb-2">
                                        <h4 class="text-md font-medium text-gray-900">Lanche da Tarde</h4>
                                        <div class="flex items-center">
                                            <label for="afternoon-snack-time" class="block text-sm font-medium text-gray-700 mr-2">Horário:</label>
                                            <input type="time" id="afternoon-snack-time" name="afternoon-snack-time" class="form-input block rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" value="16:00">
                                        </div>
                                    </div>
                                    <textarea id="afternoon-snack-items" name="afternoon-snack-items" rows="4" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" placeholder="Digite os alimentos, um por linha"></textarea>
                                </div>
                                
                                <!-- Jantar -->
                                <div class="bg-gray-50 p-4 rounded-md">
                                    <div class="flex justify-between items-center mb-2">
                                        <h4 class="text-md font-medium text-gray-900">Jantar</h4>
                                        <div class="flex items-center">
                                            <label for="dinner-time" class="block text-sm font-medium text-gray-700 mr-2">Horário:</label>
                                            <input type="time" id="dinner-time" name="dinner-time" class="form-input block rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" value="19:00">
                                        </div>
                                    </div>
                                    <textarea id="dinner-items" name="dinner-items" rows="4" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" placeholder="Digite os alimentos, um por linha"></textarea>
                                </div>
                                
                                <!-- Ceia -->
                                <div class="bg-gray-50 p-4 rounded-md">
                                    <div class="flex justify-between items-center mb-2">
                                        <h4 class="text-md font-medium text-gray-900">Ceia</h4>
                                        <div class="flex items-center">
                                            <label for="supper-time" class="block text-sm font-medium text-gray-700 mr-2">Horário:</label>
                                            <input type="time" id="supper-time" name="supper-time" class="form-input block rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" value="22:00">
                                        </div>
                                    </div>
                                    <textarea id="supper-items" name="supper-items" rows="4" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" placeholder="Digite os alimentos, um por linha"></textarea>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Observações</h3>
                            <textarea id="plan-notes" name="plan-notes" rows="6" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" placeholder="Digite as observações, recomendações e suplementações"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button id="cancel-plan" class="btn-secondary px-4 py-2 text-sm font-medium rounded-md">Cancelar</button>
                    <button id="save-plan" class="btn-primary px-4 py-2 text-sm font-medium text-white rounded-md">Salvar Plano</button>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar event listeners para os botões e modais
    setupPlanosAlimentaresEvents();
}

// Configurar eventos para a página de planos alimentares
function setupPlanosAlimentaresEvents() {
    // Botão de novo plano
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'new-plan-btn') {
            openEditPlanModal();
        }
    });
    
    // Botões de visualizar plano
    document.querySelectorAll('.view-plan-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            openViewPlanModal();
        });
    });
    
    // Botões de editar plano
    document.querySelectorAll('.edit-plan-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            openEditPlanModal(true);
        });
    });
    
    // Botões de excluir plano
    document.querySelectorAll('.delete-plan-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm('Tem certeza que deseja excluir este plano alimentar?')) {
                alert('Plano alimentar excluído com sucesso!');
            }
        });
    });
    
    // Itens da lista de planos (clique na linha)
    document.querySelectorAll('.plan-item').forEach(item => {
        item.addEventListener('click', function() {
            openViewPlanModal();
        });
    });
    
    // Modal de visualização do plano
    const viewPlanModal = document.getElementById('view-plan-modal');
    if (viewPlanModal) {
        // Fechar o modal ao clicar no X
        viewPlanModal.querySelector('.close').addEventListener('click', function() {
            viewPlanModal.style.display = 'none';
        });
        
        // Fechar o modal ao clicar no botão Fechar
        document.getElementById('close-view-plan').addEventListener('click', function() {
            viewPlanModal.style.display = 'none';
        });
        
        // Abrir o modal de edição ao clicar no botão Editar
        document.getElementById('edit-view-plan').addEventListener('click', function() {
            viewPlanModal.style.display = 'none';
            openEditPlanModal(true);
        });
        
        // Fechar o modal ao clicar fora dele
        window.addEventListener('click', function(e) {
            if (e.target === viewPlanModal) {
                viewPlanModal.style.display = 'none';
            }
        });
    }
    
    // Modal de edição do plano
    const editPlanModal = document.getElementById('edit-plan-modal');
    if (editPlanModal) {
        // Fechar o modal ao clicar no X
        editPlanModal.querySelector('.close').addEventListener('click', function() {
            editPlanModal.style.display = 'none';
        });
        
        // Fechar o modal ao clicar no botão Cancelar
        document.getElementById('cancel-plan').addEventListener('click', function() {
            editPlanModal.style.display = 'none';
        });
        
        // Salvar o plano ao clicar no botão Salvar
        document.getElementById('save-plan').addEventListener('click', function() {
            savePlan();
        });
        
        // Fechar o modal ao clicar fora dele
        window.addEventListener('click', function(e) {
            if (e.target === editPlanModal) {
                editPlanModal.style.display = 'none';
            }
        });
    }
    
    // Botão de aplicar filtros
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'apply-filter-btn') {
            alert('Filtros aplicados com sucesso!');
        }
    });
}

// Abrir o modal de visualização do plano
function openViewPlanModal() {
    const modal = document.getElementById('view-plan-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Abrir o modal de edição do plano
function openEditPlanModal(isEdit = false) {
    const modal = document.getElementById('edit-plan-modal');
    if (modal) {
        // Atualizar o título do modal
        const modalTitle = modal.querySelector('.modal-header h2');
        if (modalTitle) {
            modalTitle.textContent = isEdit ? 'Editar Plano Alimentar' : 'Criar Novo Plano Alimentar';
        }
        
        // Se for edição, preencher o formulário com os dados do plano
        if (isEdit) {
            // Preencher com dados de exemplo (em uma aplicação real, esses dados viriam do banco de dados)
            document.getElementById('plan-patient').value = '1'; // Maria Silva
            document.getElementById('plan-type').value = 'emagrecimento';
            document.getElementById('plan-start-date').value = '2025-04-01';
            document.getElementById('plan-end-date').value = '2025-07-01';
            document.getElementById('plan-status').value = 'ativo';
            document.getElementById('plan-goal').value = 'Perda de 5kg em 3 meses';
            
            // Preencher as refeições
            document.getElementById('breakfast-items').value = '1 fatia de pão integral\n1 colher (sopa) de queijo cottage\n1 xícara de chá verde ou café sem açúcar\n1 maçã pequena';
            document.getElementById('morning-snack-items').value = '1 iogurte natural desnatado\n1 colher (sopa) de granola sem açúcar';
            document.getElementById('lunch-items').value = '120g de frango grelhado\n2 colheres (sopa) de arroz integral\nSalada de folhas verdes à vontade\n1 colher (sopa) de azeite extra virgem\n1/2 abacate pequeno';
            document.getElementById('afternoon-snack-items').value = '1 punhado de castanhas (30g)\n1 fruta de tamanho médio';
            document.getElementById('dinner-items').value = '150g de peixe assado\nLegumes cozidos (brócolis, cenoura, abobrinha)\n1 batata doce pequena\nSalada de folhas verdes à vontade\n1 colher (sopa) de azeite extra virgem';
            document.getElementById('supper-items').value = '1 xícara de chá de camomila\n1 colher (sopa) de sementes de chia';
            
            // Preencher as observações
            document.getElementById('plan-notes').value = '- Beber pelo menos 2 litros de água por dia\n- Evitar alimentos processados e ultraprocessados\n- Praticar atividade física pelo menos 3 vezes por semana\n- Evitar consumo de álcool\n- Suplementação: Ômega 3 (1g/dia) e Vitamina D (2000 UI/dia)';
        } else {
            // Limpar o formulário
            document.getElementById('plan-form').reset();
            
            // Preencher a data de início com a data atual
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            document.getElementById('plan-start-date').value = `${year}-${month}-${day}`;
            
            // Preencher a data de término com 3 meses depois
            const endDate = new Date(today);
            endDate.setMonth(endDate.getMonth() + 3);
            const endYear = endDate.getFullYear();
            const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
            const endDay = String(endDate.getDate()).padStart(2, '0');
            document.getElementById('plan-end-date').value = `${endYear}-${endMonth}-${endDay}`;
            
            // Definir o status como ativo
            document.getElementById('plan-status').value = 'ativo';
        }
        
        modal.style.display = 'block';
    }
}

// Salvar o plano alimentar
function savePlan() {
    // Validar os campos obrigatórios
    const patient = document.getElementById('plan-patient').value;
    const type = document.getElementById('plan-type').value;
    const startDate = document.getElementById('plan-start-date').value;
    const endDate = document.getElementById('plan-end-date').value;
    
    if (!patient || !type || !startDate || !endDate) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Simular o salvamento do plano
    console.log('Plano alimentar salvo com sucesso!');
    
    // Fechar o modal
    const modal = document.getElementById('edit-plan-modal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Mostrar mensagem de sucesso
    alert('Plano alimentar salvo com sucesso!');
}

// Configurar ações para o perfil do usuário
function setupUserProfileActions() {
    // Adicionar event listener para o botão de perfil do usuário
    const userProfileButton = document.querySelector('button:last-of-type');
    if (userProfileButton) {
        userProfileButton.addEventListener('click', function() {
            // Criar o menu de perfil se não existir
            let profileMenu = document.getElementById('profile-menu');
            if (!profileMenu) {
                profileMenu = document.createElement('div');
                profileMenu.id = 'profile-menu';
                profileMenu.className = 'absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50';
                profileMenu.style.top = '64px';
                profileMenu.innerHTML = `
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" id="profile-link">Meu Perfil</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" id="settings-link">Configurações</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" id="logout-link">Sair</a>
                `;
                document.body.appendChild(profileMenu);
                
                // Adicionar event listeners para os links do menu
                document.getElementById('profile-link').addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('Página de perfil do usuário');
                    profileMenu.style.display = 'none';
                });
                
                document.getElementById('settings-link').addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('Página de configurações');
                    profileMenu.style.display = 'none';
                });
                
                document.getElementById('logout-link').addEventListener('click', function(e) {
                    e.preventDefault();
                    if (confirm('Tem certeza que deseja sair?')) {
                        alert('Usuário desconectado com sucesso!');
                        profileMenu.style.display = 'none';
                    }
                });
                
                // Fechar o menu ao clicar fora dele
                document.addEventListener('click', function(e) {
                    if (e.target !== userProfileButton && !profileMenu.contains(e.target)) {
                        profileMenu.style.display = 'none';
                    }
                });
            } else {
                // Alternar a visibilidade do menu
                profileMenu.style.display = profileMenu.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
    
    // Adicionar event listener para o botão de notificações
    const notificationsButton = document.querySelector('button:nth-last-of-type(2)');
    if (notificationsButton) {
        notificationsButton.addEventListener('click', function() {
            // Criar o menu de notificações se não existir
            let notificationsMenu = document.getElementById('notifications-menu');
            if (!notificationsMenu) {
                notificationsMenu = document.createElement('div');
                notificationsMenu.id = 'notifications-menu';
                notificationsMenu.className = 'absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50';
                notificationsMenu.style.top = '64px';
                notificationsMenu.style.right = '80px';
                notificationsMenu.innerHTML = `
                    <div class="px-4 py-2 border-b border-gray-200">
                        <h3 class="text-sm font-medium text-gray-900">Notificações</h3>
                    </div>
                    <div class="max-h-60 overflow-y-auto">
                        <a href="#" class="block px-4 py-3 hover:bg-gray-100 border-b border-gray-200">
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <span class="inline-block h-8 w-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </span>
                                </div>
                                <div class="ml-3 w-0 flex-1">
                                    <p class="text-sm font-medium text-gray-900">Consulta agendada</p>
                                    <p class="text-sm text-gray-500">Maria Silva - 10/05/2025 às 14:30</p>
                                    <p class="text-xs text-gray-400 mt-1">Há 2 horas</p>
                                </div>
                            </div>
                        </a>
                        <a href="#" class="block px-4 py-3 hover:bg-gray-100 border-b border-gray-200">
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <span class="inline-block h-8 w-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                        </svg>
                                    </span>
                                </div>
                                <div class="ml-3 w-0 flex-1">
                                    <p class="text-sm font-medium text-gray-900">Nova mensagem</p>
                                    <p class="text-sm text-gray-500">João Santos enviou uma mensagem</p>
                                    <p class="text-xs text-gray-400 mt-1">Ontem às 18:45</p>
                                </div>
                            </div>
                        </a>
                        <a href="#" class="block px-4 py-3 hover:bg-gray-100">
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <span class="inline-block h-8 w-8 rounded-full bg-yellow-100 text-yellow-500 flex items-center justify-center">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                        </svg>
                                    </span>
                                </div>
                                <div class="ml-3 w-0 flex-1">
                                    <p class="text-sm font-medium text-gray-900">Lembrete</p>
                                    <p class="text-sm text-gray-500">Preparar plano alimentar para Maria Silva</p>
                                    <p class="text-xs text-gray-400 mt-1">Há 2 dias</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="px-4 py-2 border-t border-gray-200">
                        <a href="#" class="text-sm font-medium text-green-600 hover:text-green-500">Ver todas as notificações</a>
                    </div>
                `;
                document.body.appendChild(notificationsMenu);
                
                // Fechar o menu ao clicar fora dele
                document.addEventListener('click', function(e) {
                    if (e.target !== notificationsButton && !notificationsMenu.contains(e.target)) {
                        notificationsMenu.style.display = 'none';
                    }
                });
            } else {
                // Alternar a visibilidade do menu
                notificationsMenu.style.display = notificationsMenu.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
}
