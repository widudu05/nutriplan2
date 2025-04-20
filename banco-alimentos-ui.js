// Implementação da interface do Banco de Alimentos
// Este arquivo contém a lógica para interagir com a classe BancoAlimentos
// e gerenciar a interface de usuário para o banco de alimentos

// Inicializar o banco de alimentos quando o documento estiver pronto
let bancoAlimentos;
document.addEventListener('DOMContentLoaded', () => {
  // Carregar os modais do banco de alimentos
  carregarModaisBancoAlimentos();
  
  // Inicializar o banco de alimentos
  bancoAlimentos = new BancoAlimentos();
  
  // Configurar os eventos da interface
  configurarEventos();
  
  // Carregar a lista de alimentos
  setTimeout(() => {
    carregarListaAlimentos();
  }, 1000); // Pequeno delay para garantir que o banco de alimentos foi inicializado
});

// Função para carregar os modais do banco de alimentos
async function carregarModaisBancoAlimentos() {
  try {
    const response = await fetch('banco-alimentos-modals.html');
    const html = await response.text();
    
    // Adicionar os modais ao DOM
    const modaisContainer = document.getElementById('banco-alimentos-modals');
    if (modaisContainer) {
      modaisContainer.innerHTML = html;
    } else {
      // Se o container não existir, criar um novo
      const div = document.createElement('div');
      div.id = 'banco-alimentos-modals';
      div.innerHTML = html;
      document.body.appendChild(div);
    }
    
    console.log('Modais do banco de alimentos carregados com sucesso.');
  } catch (error) {
    console.error('Erro ao carregar modais do banco de alimentos:', error);
  }
}

// Função para configurar os eventos da interface
function configurarEventos() {
  // Botão para abrir o modal de adicionar alimento
  const btnAdicionarAlimento = document.getElementById('btn-adicionar-alimento');
  if (btnAdicionarAlimento) {
    btnAdicionarAlimento.addEventListener('click', abrirModalAdicionarAlimento);
  }
  
  // Eventos para o modal de adicionar alimento
  document.addEventListener('click', (event) => {
    // Fechar modal de adicionar alimento
    if (event.target.id === 'fechar-modal-adicionar-alimento' || 
        event.target.id === 'cancelar-adicionar-alimento') {
      fecharModal('modal-adicionar-alimento');
    }
    
    // Fechar modal de editar alimento
    if (event.target.id === 'fechar-modal-editar-alimento' || 
        event.target.id === 'cancelar-editar-alimento') {
      fecharModal('modal-editar-alimento');
    }
    
    // Fechar modal de confirmar exclusão
    if (event.target.id === 'cancelar-exclusao') {
      fecharModal('modal-confirmar-exclusao');
    }
    
    // Confirmar exclusão de alimento
    if (event.target.id === 'confirmar-exclusao') {
      const id = document.getElementById('excluir_id').value;
      excluirAlimentoPersonalizado(id);
    }
    
    // Fechar modal de visualizar alimento
    if (event.target.id === 'fechar-modal-visualizar-alimento' || 
        event.target.id === 'fechar-visualizar-alimento') {
      fecharModal('modal-visualizar-alimento');
    }
    
    // Botões de ação na lista de alimentos
    if (event.target.classList.contains('btn-visualizar-alimento')) {
      const id = event.target.dataset.id;
      abrirModalVisualizarAlimento(id);
    }
    
    if (event.target.classList.contains('btn-editar-alimento')) {
      const id = event.target.dataset.id;
      abrirModalEditarAlimento(id);
    }
    
    if (event.target.classList.contains('btn-excluir-alimento')) {
      const id = event.target.dataset.id;
      abrirModalConfirmarExclusao(id);
    }
  });
  
  // Formulário de adicionar alimento
  const formAdicionarAlimento = document.getElementById('form-adicionar-alimento');
  if (formAdicionarAlimento) {
    formAdicionarAlimento.addEventListener('submit', (event) => {
      event.preventDefault();
      adicionarAlimentoPersonalizado();
    });
  }
  
  // Formulário de editar alimento
  const formEditarAlimento = document.getElementById('form-editar-alimento');
  if (formEditarAlimento) {
    formEditarAlimento.addEventListener('submit', (event) => {
      event.preventDefault();
      salvarEdicaoAlimento();
    });
  }
  
  // Campo de busca
  const campoBusca = document.getElementById('busca-alimento');
  if (campoBusca) {
    campoBusca.addEventListener('input', () => {
      carregarListaAlimentos();
    });
  }
  
  // Filtro de categoria
  const filtroCategorias = document.getElementById('filtro-categoria');
  if (filtroCategorias) {
    filtroCategorias.addEventListener('change', () => {
      carregarListaAlimentos();
    });
  }
  
  // Filtro de fonte
  const filtroFontes = document.getElementById('filtro-fonte');
  if (filtroFontes) {
    filtroFontes.addEventListener('change', () => {
      carregarListaAlimentos();
    });
  }
  
  console.log('Eventos da interface configurados com sucesso.');
}

// Função para carregar a lista de alimentos
function carregarListaAlimentos() {
  if (!bancoAlimentos) return;
  
  // Obter os filtros
  const termoBusca = document.getElementById('busca-alimento')?.value || '';
  const categoria = document.getElementById('filtro-categoria')?.value || '';
  const fonte = document.getElementById('filtro-fonte')?.value || '';
  
  // Aplicar os filtros
  let alimentos = bancoAlimentos.buscarAlimentosPorNome(termoBusca);
  
  if (categoria) {
    alimentos = alimentos.filter(a => a.categoria === categoria);
  }
  
  if (fonte) {
    alimentos = alimentos.filter(a => a.fonte === fonte);
  }
  
  // Renderizar a lista
  const listaAlimentos = document.getElementById('lista-alimentos');
  if (!listaAlimentos) return;
  
  if (alimentos.length === 0) {
    listaAlimentos.innerHTML = `
      <div class="text-center py-8">
        <p class="text-gray-500">Nenhum alimento encontrado.</p>
      </div>
    `;
    return;
  }
  
  let html = '';
  
  alimentos.forEach(alimento => {
    const podeEditar = alimento.fonte === 'Personalizado';
    
    html += `
      <div class="bg-white rounded-lg shadow-md p-4 mb-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">${alimento.nome_alimento}</h3>
            <p class="text-sm text-gray-500">${alimento.categoria}</p>
            
            <div class="grid grid-cols-2 gap-2 mt-2">
              <div>
                <span class="text-xs text-gray-500">Energia:</span>
                <span class="text-sm font-medium">${alimento.energia_kcal} kcal</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Proteína:</span>
                <span class="text-sm font-medium">${alimento.proteina_g} g</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Carboidratos:</span>
                <span class="text-sm font-medium">${alimento.carboidrato_g} g</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Lipídeos:</span>
                <span class="text-sm font-medium">${alimento.lipideos_g} g</span>
              </div>
            </div>
            
            <div class="mt-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getFonteBadgeColor(alimento.fonte)}-100 text-${getFonteBadgeColor(alimento.fonte)}-800">
                ${alimento.fonte}
              </span>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <button class="btn-visualizar-alimento p-2 text-blue-600 hover:text-blue-800" data-id="${alimento.id}">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
            
            ${podeEditar ? `
              <button class="btn-editar-alimento p-2 text-yellow-600 hover:text-yellow-800" data-id="${alimento.id}">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              
              <button class="btn-excluir-alimento p-2 text-red-600 hover:text-red-800" data-id="${alimento.id}">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  });
  
  listaAlimentos.innerHTML = html;
  
  // Preencher os filtros de categoria e fonte
  preencherFiltros();
}

// Função para preencher os filtros de categoria e fonte
function preencherFiltros() {
  if (!bancoAlimentos) return;
  
  // Preencher filtro de categorias
  const filtroCategorias = document.getElementById('filtro-categoria');
  if (filtroCategorias) {
    const categorias = bancoAlimentos.obterCategorias();
    
    let html = '<option value="">Todas as categorias</option>';
    categorias.forEach(categoria => {
      html += `<option value="${categoria}">${categoria}</option>`;
    });
    
    filtroCategorias.innerHTML = html;
  }
  
  // Preencher filtro de fontes
  const filtroFontes = document.getElementById('filtro-fonte');
  if (filtroFontes) {
    const fontes = bancoAlimentos.obterFontes();
    
    let html = '<option value="">Todas as fontes</option>';
    fontes.forEach(fonte => {
      html += `<option value="${fonte}">${fonte}</option>`;
    });
    
    filtroFontes.innerHTML = html;
  }
  
  // Preencher selects de categorias nos modais
  const selectCategorias = document.getElementById('categoria');
  const selectEditarCategorias = document.getElementById('editar_categoria');
  
  if (selectCategorias) {
    const categorias = bancoAlimentos.obterCategorias();
    
    let html = '<option value="">Selecione uma categoria</option>';
    categorias.forEach(categoria => {
      html += `<option value="${categoria}">${categoria}</option>`;
    });
    
    selectCategorias.innerHTML = html;
  }
  
  if (selectEditarCategorias) {
    const categorias = bancoAlimentos.obterCategorias();
    
    let html = '<option value="">Selecione uma categoria</option>';
    categorias.forEach(categoria => {
      html += `<option value="${categoria}">${categoria}</option>`;
    });
    
    selectEditarCategorias.innerHTML = html;
  }
}

// Função para abrir o modal de adicionar alimento
function abrirModalAdicionarAlimento() {
  // Limpar o formulário
  document.getElementById('form-adicionar-alimento').reset();
  
  // Preencher o select de categorias
  preencherFiltros();
  
  // Abrir o modal
  abrirModal('modal-adicionar-alimento');
}

// Função para abrir o modal de editar alimento
function abrirModalEditarAlimento(id) {
  if (!bancoAlimentos) return;
  
  // Encontrar o alimento pelo ID
  const alimento = bancoAlimentos.alimentos.find(a => a.id === id);
  if (!alimento) return;
  
  // Preencher o formulário com os dados do alimento
  document.getElementById('editar_id').value = alimento.id;
  document.getElementById('editar_nome_alimento').value = alimento.nome_alimento;
  document.getElementById('editar_categoria').value = alimento.categoria;
  document.getElementById('editar_energia_kcal').value = alimento.energia_kcal;
  document.getElementById('editar_proteina_g').value = alimento.proteina_g;
  document.getElementById('editar_lipideos_g').value = alimento.lipideos_g;
  document.getElementById('editar_carboidrato_g').value = alimento.carboidrato_g;
  document.getElementById('editar_fibra_g').value = alimento.fibra_g;
  document.getElementById('editar_calcio_mg').value = alimento.calcio_mg;
  document.getElementById('editar_ferro_mg').value = alimento.ferro_mg;
  document.getElementById('editar_sodio_mg').value = alimento.sodio_mg;
  document.getElementById('editar_vitamina_c_mg').value = alimento.vitamina_c_mg;
  
  // Abrir o modal
  abrirModal('modal-editar-alimento');
}

// Função para abrir o modal de visualizar alimento
function abrirModalVisualizarAlimento(id) {
  if (!bancoAlimentos) return;
  
  // Encontrar o alimento pelo ID
  const alimento = bancoAlimentos.alimentos.find(a => a.id === id);
  if (!alimento) return;
  
  // Preencher o modal com os dados do alimento
  document.getElementById('visualizar_nome_alimento').textContent = alimento.nome_alimento;
  document.getElementById('visualizar_categoria').textContent = alimento.categoria;
  document.getElementById('visualizar_energia_kcal').textContent = `${alimento.energia_kcal} kcal`;
  document.getElementById('visualizar_proteina_g').textContent = `${alimento.proteina_g} g`;
  document.getElementById('visualizar_lipideos_g').textContent = `${alimento.lipideos_g} g`;
  document.getElementById('visualizar_carboidrato_g').textContent = `${alimento.carboidrato_g} g`;
  document.getElementById('visualizar_fibra_g').textContent = `${alimento.fibra_g} g`;
  document.getElementById('visualizar_calcio_mg').textContent = `${alimento.calcio_mg} mg`;
  document.getElementById('visualizar_ferro_mg').textContent = `${alimento.ferro_mg} mg`;
  document.getElementById('visualizar_sodio_mg').textContent = `${alimento.sodio_mg} mg`;
  document.getElementById('visualizar_vitamina_c_mg').textContent = `${alimento.vitamina_c_mg || 0} mg`;
  document.getElementById('visualizar_fonte').textContent = alimento.fonte;
  
  // Abrir o modal
  abrirModal('modal-visualizar-alimento');
}

// Função para abrir o modal de confirmar exclusão
function abrirModalConfirmarExclusao(id) {
  document.getElementById('excluir_id').value = id;
  abrirModal('modal-confirmar-exclusao');
}

// Função para adicionar um alimento personalizado
function adicionarAlimentoPersonalizado() {
  if (!bancoAlimentos) return;
  
  // Obter os dados do formulário
  const nome = document.getElementById('nome_alimento').value;
  const categoria = document.getElementById('categoria').value;
  const energia = document.getElementById('energia_kcal').value;
  const proteina = document.getElementById('proteina_g').value;
  const lipideos = document.getElementById('lipideos_g').value;
  const carboidrato = document.getElementById('carboidrato_g').value;
  const fibra = document.getElementById('fibra_g').value;
  const calcio = document.getElementById('calcio_mg').value;
  const ferro = document.getElementById('ferro_mg').value;
  const sodio = document.getElementById('sodio_mg').value;
  const vitaminaC = document.getElementById('vitamina_c_mg').value;
  
  // Validar dados obrigatórios
  if (!nome || !categoria) {
    alert('Nome e categoria são obrigatórios.');
    return;
  }
  
  // Criar objeto do alimento
  const alimento = {
    nome_alimento: nome,
    categoria: categoria,
    energia_kcal: energia || '0',
    proteina_g: proteina || '0',
    lipideos_g: lipideos || '0',
    carboidrato_g: carboidrato || '0',
    fibra_g: fibra || '0',
    calcio_mg: calcio || '0',
    ferro_mg: ferro || '0',
    sodio_mg: sodio || '0',
    vitamina_c_mg: vitaminaC || '0'
  };
  
  try {
    // Adicionar o alimento
    bancoAlimentos.adicionarAlimentoPersonalizado(alimento);
    
    // Fechar o modal
    fecharModal('modal-adicionar-alimento');
    
    // Recarregar a lista de alimentos
    carregarListaAlimentos();
    
    // Mostrar mensagem de sucesso
    mostrarNotificacao('Alimento adicionado com sucesso!', 'suc
(Content truncated due to size limit. Use line ranges to read in chunks)