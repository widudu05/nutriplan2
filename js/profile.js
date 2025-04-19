// Arquivo JavaScript para funcionalidade de perfil do usuário
document.addEventListener('DOMContentLoaded', function() {
    // Configurar ações para o perfil do usuário
    setupUserProfileActions();
});

// Configurar ações para o perfil do usuário
function setupUserProfileActions() {
    // Adicionar event listener para o botão de perfil do usuário
    const userProfileButton = document.querySelector('.nav-bar button:last-of-type');
    if (userProfileButton) {
        userProfileButton.addEventListener('click', function() {
            // Criar o menu de perfil se não existir
            let profileMenu = document.getElementById('profile-menu');
            if (!profileMenu) {
                profileMenu = document.createElement('div');
                profileMenu.id = 'profile-menu';
                profileMenu.className = 'absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50';
                profileMenu.style.top = '64px';
                profileMenu.style.right = '10px';
                profileMenu.innerHTML = `
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" id="profile-link">Meu Perfil</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" id="settings-link">Configurações</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" id="logout-link">Sair</a>
                `;
                document.body.appendChild(profileMenu);
                
                // Adicionar event listeners para os links do menu
                document.getElementById('profile-link').addEventListener('click', function(e) {
                    e.preventDefault();
                    showUserProfile();
                    profileMenu.style.display = 'none';
                });
                
                document.getElementById('settings-link').addEventListener('click', function(e) {
                    e.preventDefault();
                    showUserSettings();
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
    const notificationsButton = document.querySelector('.nav-bar button:nth-last-of-type(2)');
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

// Mostrar o perfil do usuário
function showUserProfile() {
    // Criar o modal de perfil do usuário
    let profileModal = document.getElementById('profile-modal');
    if (!profileModal) {
        profileModal = document.createElement('div');
        profileModal.id = 'profile-modal';
        profileModal.className = 'modal';
        profileModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="text-xl font-semibold text-gray-900">Meu Perfil</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="flex items-center mb-6">
                        <div class="flex-shrink-0 h-24 w-24 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
                            DR
                        </div>
                        <div class="ml-4">
                            <h3 class="text-lg font-medium text-gray-900">Dra. Renata Almeida</h3>
                            <p class="text-sm text-gray-500">Nutricionista - CRN 12345</p>
                            <p class="text-sm text-gray-500">renata.almeida@nutrisaas.com</p>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Informações Pessoais</h3>
                        <div class="bg-gray-50 p-4 rounded-md">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Nome Completo</p>
                                    <p class="text-sm text-gray-900">Renata Almeida Silva</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Data de Nascimento</p>
                                    <p class="text-sm text-gray-900">15/03/1985</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Telefone</p>
                                    <p class="text-sm text-gray-900">(11) 98765-4321</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">E-mail</p>
                                    <p class="text-sm text-gray-900">renata.almeida@nutrisaas.com</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Endereço</p>
                                    <p class="text-sm text-gray-900">Av. Paulista, 1000, São Paulo - SP</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Especialidade</p>
                                    <p class="text-sm text-gray-900">Nutrição Esportiva</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Estatísticas</h3>
                        <div class="grid grid-cols-3 gap-4">
                            <div class="bg-gray-50 p-4 rounded-md text-center">
                                <p class="text-2xl font-bold text-green-600">32</p>
                                <p class="text-sm text-gray-500">Pacientes Ativos</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-md text-center">
                                <p class="text-2xl font-bold text-green-600">128</p>
                                <p class="text-sm text-gray-500">Consultas Realizadas</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-md text-center">
                                <p class="text-2xl font-bold text-green-600">4.8</p>
                                <p class="text-sm text-gray-500">Avaliação Média</p>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Conta</h3>
                        <div class="bg-gray-50 p-4 rounded-md">
                            <div class="flex justify-between items-center mb-2">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">Plano Premium</p>
                                    <p class="text-sm text-gray-500">Renovação em 15/05/2025</p>
                                </div>
                                <button class="text-sm font-medium text-green-600 hover:text-green-500">
                                    Alterar Plano
                                </button>
                            </div>
                            <div class="mt-4">
                                <button class="text-sm font-medium text-green-600 hover:text-green-500 mr-4">
                                    Alterar Senha
                                </button>
                                <button class="text-sm font-medium text-red-600 hover:text-red-500">
                                    Excluir Conta
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="close-profile" class="btn-secondary px-4 py-2 text-sm font-medium rounded-md">Fechar</button>
                    <button id="edit-profile" class="btn-primary px-4 py-2 text-sm font-medium text-white rounded-md">Editar Perfil</button>
                </div>
            </div>
        `;
        document.body.appendChild(profileModal);
        
        // Adicionar event listeners para o modal
        profileModal.querySelector('.close').addEventListener('click', function() {
            profileModal.style.display = 'none';
        });
        
        document.getElementById('close-profile').addEventListener('click', function() {
            profileModal.style.display = 'none';
        });
        
        document.getElementById('edit-profile').addEventListener('click', function() {
            alert('Editar perfil');
            profileModal.style.display = 'none';
        });
        
        // Fechar o modal ao clicar fora dele
        window.addEventListener('click', function(e) {
            if (e.target === profileModal) {
                profileModal.style.display = 'none';
            }
        });
    }
    
    profileModal.style.display = 'block';
}

// Mostrar as configurações do usuário
function showUserSettings() {
    // Criar o modal de configurações
    let settingsModal = document.getElementById('settings-modal');
    if (!settingsModal) {
        settingsModal = document.createElement('div');
        settingsModal.id = 'settings-modal';
        settingsModal.className = 'modal';
        settingsModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="text-xl font-semibold text-gray-900">Configurações</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="mb-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Preferências Gerais</h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">Tema Escuro</p>
                                    <p class="text-sm text-gray-500">Ativar modo escuro para a interface</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" id="dark-mode-toggle">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">Notificações por E-mail</p>
                                    <p class="text-sm text-gray-500">Receber notificações por e-mail</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" id="email-notifications-toggle" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">Notificações no Navegador</p>
                                    <p class="text-sm text-gray-500">Receber notificações no navegador</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" id="browser-notifications-toggle" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Privacidade e Segurança</h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">Autenticação de Dois Fatores</p>
                                    <p class="text-sm text-gray-500">Adicionar uma camada extra de segurança</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" id="two-factor-toggle">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">Sessões Ativas</p>
                                    <p class="text-sm text-gray-500">Gerenciar dispositivos conectados</p>
                                </div>
                                <button class="text-sm font-medium text-green-600 hover:text-green-500">
                                    Gerenciar
                                </button>
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">Histórico de Atividades</p>
                                    <p class="text-sm text-gray-500">Ver atividades recentes da conta</p>
                                </div>
                                <button class="text-sm font-medium text-green-600 hover:text-green-500">
                                    Visualizar
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Configurações de Exibição</h3>
                        <div class="space-y-4">
                            <div>
                                <label for="language-select" class="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                                <select id="language-select" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                    <option value="pt-br" selected>Português (Brasil)</option>
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                </select>
                            </div>
                            <div>
                                <label for="timezone-select" class="block text-sm font-medium text-gray-700 mb-1">Fuso Horário</label>
                                <select id="timezone-select" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                    <option value="America/Sao_Paulo" selected>Brasília (GMT-3)</option>
                                    <option value="America/New_York">New York (GMT-4)</option>
                                    <option value="Europe/London">London (GMT+1)</option>
                                    <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                                </select>
                            </div>
                            <div>
                                <label for="date-format-select" class="block text-sm font-medium text-gray-700 mb-1">Formato de Data</label>
                                <select id="date-format-select" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                                    <option value="dd/mm/yyyy" selected>DD/MM/AAAA</option>
                                    <option value="mm/dd/yyyy">MM/DD/AAAA</option>
                                    <option value="yyyy-mm-dd">AAAA-MM-DD</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="close-settings" class="btn-secondary px-4 py-2 text-sm font-medium rounded-md">Cancelar</button>
                    <button id="save-settings" class="btn-primary px-4 py-2 text-sm font-medium text-white rounded-md">Salvar Alterações</button>
                </div>
            </div>
        `;
        document.body.appendChild(settingsModal);
        
        // Adicionar event listeners para o modal
        settingsModal.querySelector('.close').addEventListener('click', function() {
            settingsModal.style.display = 'none';
        });
        
        document.getElementById('close-settings').addEventListener('click', function() {
            settingsModal.style.display = 'none';
        });
        
        document.getElementById('save-settings').addEventListener('click', function() {
            alert('Configurações salvas com sucesso!');
            settingsModal.style.display = 'none';
        });
        
        // Fechar o modal ao clicar fora dele
        window.addEventListener('click', function(e) {
            if (e.target === settingsModal) {
                settingsModal.style.display = 'none';
            }
        });
    }
    
    settingsModal.style.display = 'block';
}
