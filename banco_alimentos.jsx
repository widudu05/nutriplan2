// Módulo de Banco de Alimentos para o SaaS de Gestão Nutricional
// Este arquivo implementa as funcionalidades da aba de banco de alimentos

// Componente principal para a página de banco de alimentos
function BancoAlimentosPage() {
  // Estado para armazenar a lista de alimentos
  const [alimentos, setAlimentos] = useState([]);
  // Estado para armazenar o alimento selecionado para edição
  const [alimentoSelecionado, setAlimentoSelecionado] = useState(null);
  // Estado para controlar a visibilidade do modal de novo alimento
  const [showModal, setShowModal] = useState(false);
  // Estado para controlar a visibilidade do modal de detalhes
  const [showDetalhes, setShowDetalhes] = useState(false);
  // Estado para armazenar o termo de busca
  const [termoBusca, setTermoBusca] = useState('');
  // Estado para armazenar o filtro de categoria
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  // Estado para armazenar o filtro de fonte
  const [filtroFonte, setFiltroFonte] = useState('todas');

  // Efeito para carregar os alimentos ao montar o componente
  useEffect(() => {
    carregarAlimentos();
  }, []);

  // Função para carregar a lista de alimentos
  const carregarAlimentos = () => {
    // Em um ambiente real, isso seria uma chamada de API
    // Simulação de dados para demonstração
    const dadosAlimentos = [
      {
        id: 1,
        nome: 'Arroz branco cozido',
        categoria: 'Cereais',
        fonte: 'TACO',
        calorias_100g: 128,
        proteinas_100g: 2.5,
        carboidratos_100g: 28.1,
        gorduras_100g: 0.2,
        fibras_100g: 1.6,
        porcao_padrao: 100,
        unidade_padrao: 'g',
        favorito: true
      },
      {
        id: 2,
        nome: 'Feijão preto cozido',
        categoria: 'Leguminosas',
        fonte: 'TACO',
        calorias_100g: 77,
        proteinas_100g: 5.1,
        carboidratos_100g: 13.6,
        gorduras_100g: 0.5,
        fibras_100g: 8.4,
        porcao_padrao: 80,
        unidade_padrao: 'g',
        favorito: true
      },
      {
        id: 3,
        nome: 'Peito de frango grelhado',
        categoria: 'Carnes',
        fonte: 'TACO',
        calorias_100g: 159,
        proteinas_100g: 31.0,
        carboidratos_100g: 0.0,
        gorduras_100g: 3.6,
        fibras_100g: 0.0,
        porcao_padrao: 100,
        unidade_padrao: 'g',
        favorito: true
      },
      {
        id: 4,
        nome: 'Brócolis cozido',
        categoria: 'Vegetais',
        fonte: 'TACO',
        calorias_100g: 35,
        proteinas_100g: 3.6,
        carboidratos_100g: 4.0,
        gorduras_100g: 0.4,
        fibras_100g: 3.4,
        porcao_padrao: 60,
        unidade_padrao: 'g',
        favorito: false
      },
      {
        id: 5,
        nome: 'Banana',
        categoria: 'Frutas',
        fonte: 'TACO',
        calorias_100g: 89,
        proteinas_100g: 1.1,
        carboidratos_100g: 22.8,
        gorduras_100g: 0.3,
        fibras_100g: 2.0,
        porcao_padrao: 100,
        unidade_padrao: 'g',
        favorito: false
      },
      {
        id: 6,
        nome: 'Leite desnatado',
        categoria: 'Laticínios',
        fonte: 'TACO',
        calorias_100g: 83,
        proteinas_100g: 8.2,
        carboidratos_100g: 12.2,
        gorduras_100g: 0.2,
        fibras_100g: 0.0,
        porcao_padrao: 200,
        unidade_padrao: 'ml',
        favorito: false
      },
      {
        id: 7,
        nome: 'Pão integral',
        categoria: 'Cereais',
        fonte: 'TACO',
        calorias_100g: 247,
        proteinas_100g: 13.0,
        carboidratos_100g: 41.3,
        gorduras_100g: 3.4,
        fibras_100g: 7.0,
        porcao_padrao: 50,
        unidade_padrao: 'g',
        favorito: true
      },
      {
        id: 8,
        nome: 'Azeite de oliva',
        categoria: 'Óleos e Gorduras',
        fonte: 'TACO',
        calorias_100g: 884,
        proteinas_100g: 0.0,
        carboidratos_100g: 0.0,
        gorduras_100g: 100.0,
        fibras_100g: 0.0,
        porcao_padrao: 10,
        unidade_padrao: 'ml',
        favorito: false
      },
      {
        id: 9,
        nome: 'Batata doce cozida',
        categoria: 'Tubérculos',
        fonte: 'TACO',
        calorias_100g: 77,
        proteinas_100g: 0.6,
        carboidratos_100g: 18.4,
        gorduras_100g: 0.1,
        fibras_100g: 2.2,
        porcao_padrao: 100,
        unidade_padrao: 'g',
        favorito: false
      },
      {
        id: 10,
        nome: 'Whey Protein',
        categoria: 'Suplementos',
        fonte: 'Personalizado',
        calorias_100g: 400,
        proteinas_100g: 80.0,
        carboidratos_100g: 10.0,
        gorduras_100g: 3.0,
        fibras_100g: 0.0,
        porcao_padrao: 30,
        unidade_padrao: 'g',
        favorito: true
      }
    ];
    
    setAlimentos(dadosAlimentos);
  };

  // Lista de categorias disponíveis
  const categorias = [
    'Cereais',
    'Leguminosas',
    'Carnes',
    'Vegetais',
    'Frutas',
    'Laticínios',
    'Óleos e Gorduras',
    'Tubérculos',
    'Suplementos',
    'Bebidas',
    'Doces e Sobremesas',
    'Outros'
  ];

  // Lista de fontes disponíveis
  const fontes = [
    'TACO',
    'IBGE',
    'Personalizado'
  ];

  // Função para filtrar alimentos com base no termo de busca e filtros
  const alimentosFiltrados = useMemo(() => {
    return alimentos.filter(alimento => {
      const matchTermo = alimento.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                         alimento.categoria.toLowerCase().includes(termoBusca.toLowerCase());
      
      const matchCategoria = filtroCategoria === 'todas' || alimento.categoria === filtroCategoria;
      
      const matchFonte = filtroFonte === 'todas' || alimento.fonte === filtroFonte;
      
      return matchTermo && matchCategoria && matchFonte;
    });
  }, [alimentos, termoBusca, filtroCategoria, filtroFonte]);

  // Função para abrir o modal de novo alimento
  const handleNovoAlimento = () => {
    setAlimentoSelecionado(null);
    setShowModal(true);
  };

  // Função para abrir o modal de edição de alimento
  const handleEditarAlimento = (alimento) => {
    setAlimentoSelecionado(alimento);
    setShowModal(true);
  };

  // Função para abrir o modal de detalhes do alimento
  const handleDetalhesAlimento = (alimento) => {
    setAlimentoSelecionado(alimento);
    setShowDetalhes(true);
  };

  // Função para salvar um alimento (novo ou editado)
  const handleSalvarAlimento = (dadosAlimento) => {
    if (dadosAlimento.id) {
      // Atualizar alimento existente
      setAlimentos(alimentos.map(a => 
        a.id === dadosAlimento.id ? { ...a, ...dadosAlimento } : a
      ));
      showNotification('Alimento atualizado com sucesso!', 'success');
    } else {
      // Adicionar novo alimento
      const novoAlimento = {
        ...dadosAlimento,
        id: alimentos.length + 1,
        favorito: false
      };
      setAlimentos([...alimentos, novoAlimento]);
      showNotification('Alimento cadastrado com sucesso!', 'success');
    }
    setShowModal(false);
  };

  // Função para alternar o status de favorito de um alimento
  const handleToggleFavorito = (id) => {
    setAlimentos(alimentos.map(a => 
      a.id === id ? { ...a, favorito: !a.favorito } : a
    ));
  };

  // Função para excluir um alimento
  const handleExcluirAlimento = (id) => {
    if (confirm('Tem certeza que deseja excluir este alimento?')) {
      setAlimentos(alimentos.filter(a => a.id !== id));
      showNotification('Alimento excluído com sucesso!', 'success');
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Banco de Alimentos</h1>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Barra de ferramentas */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex items-stretch flex-grow">
                  <input
                    type="text"
                    className="form-input focus:ring-teal-500 focus:border-teal-500 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="Buscar por nome ou categoria..."
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                  />
                </div>
                <div className="ml-3">
                  <select
                    className="form-select focus:ring-teal-500 focus:border-teal-500 h-full py-0 pl-3 pr-7 border-gray-300 bg-transparent text-gray-500 sm:text-sm rounded-md"
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                  >
                    <option value="todas">Todas as categorias</option>
                    {categorias.map((categoria, index) => (
                      <option key={index} value={categoria}>{categoria}</option>
                    ))}
                  </select>
                </div>
                <div className="ml-3">
                  <select
                    className="form-select focus:ring-teal-500 focus:border-teal-500 h-full py-0 pl-3 pr-7 border-gray-300 bg-transparent text-gray-500 sm:text-sm rounded-md"
                    value={filtroFonte}
                    onChange={(e) => setFiltroFonte(e.target.value)}
                  >
                    <option value="todas">Todas as fontes</option>
                    {fontes.map((fonte, index) => (
                      <option key={index} value={fonte}>{fonte}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                type="button"
                className="btn-primary inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={handleNovoAlimento}
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Novo Alimento
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabela de alimentos */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alimento
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Calorias (100g)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proteínas (g)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carboidratos (g)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gorduras (g)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fonte
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alimentosFiltrados.length > 0 ? (
                alimentosFiltrados.map((alimento) => (
                  <tr key={alimento.id} className="table-row-hover">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {alimento.nome}
                          </div>
                          <div className="text-sm text-gray-500">
                            Porção padrão: {alimento.porcao_padrao} {alimento.unidade_padrao}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{alimento.categoria}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{alimento.calorias_100g} kcal</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{alimento.proteinas_100g}g</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{alimento.carboidratos_100g}g</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{alimento.gorduras_100g}g</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        alimento.fonte === 'TACO' ? 'bg-green-100 text-green-800' : 
                        alimento.fonte === 'IBGE' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {alimento.fonte}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => handleToggleFavorito(alimento.id)}
                        >
                          {alimento.favorito ? (
                            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          )}
                        </button>
                        <button
                          type="button"
                          className="text-teal-600 hover:text-teal-900"
                          onClick={() => handleDetalhesAlimento(alimento)}
                        >
                          Detalhes
                        </button>
                        <button
                          type="button"
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleEditarAlimento(alimento)}
                        >
                          Editar
                        </button>
                        {alimento.fonte === 'Personalizado' && (
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleExcluirAlimento(alimento.id)}
                          >
                            Excluir
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    Nenhum alimento encontrado com os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal de Novo/Editar Alimento */}
      {showModal && (
        <AlimentoFormModal
          alimento={alimentoSelecionado}
          categorias={categorias}
          fontes={fontes}
          onClose={() => setShowModal(false)}
          onSave={handleSalvarAlimento}
        />
      )}
      
      {/* Modal de Detalhes do Alimento */}
      {showDetalhes && (
        <AlimentoDetalhesModal
          alimento={alimentoSelecionado}
          onClose={() => setShowDetalhes(false)}
        />
      )}
    </div>
  );
}

// Componente do modal de formulário de alimento
function AlimentoFormModal({ alimento, categorias, fontes, onClose, onSave }) {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    id: alimento?.id || null,
    nome: alimento?.nome || '',
    categoria: alimento?.categoria || 'Cereais',
    fonte: alimento?.fonte || 'Personalizado',
    calorias_100g: alimento?.calorias_100g || '',
    proteinas_100g: alimento?.proteinas_100g || '',
    carboidratos_100g: alimento?.carboidratos_100g || '',
    gorduras_100g: alimento?.gorduras_100g || '',
    fibras_100g: alimento?.fibras_100g || '',
    porcao_padrao: alimento?.porcao_padrao || '',
    unidade_padrao: alimento?.unidade_padrao || 'g'
  });
  
  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes('_100g') || name === 'porcao_padrao' ? parseFloat(value) : value
    });
  };
  
  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {alimento ? 'Editar Alimento' : 'Novo Alimento'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome do Alimento
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  required
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                Categoria
              </label>
              <div className="mt-1">
                <select
                  id="categoria"
                  name="categoria"
                  required
                  className="form-select shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.categoria}
                  onChange={handleChange}
                >
                  {categorias.map((categoria, index) => (
                    <option key={index} value={categoria}>{categoria}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="fonte" className="block text-sm font-medium text-gray-700">
                Fonte
              </label>
              <div className="mt-1">
                <select
                  id="fonte"
                  name="fonte"
                  required
                  className="form-select shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.fonte}
                  onChange={handleChange}
                  disabled={alimento && alimento.fonte !== 'Personalizado'}
                >
                  {fontes.map((fonte, index) => (
                    <option key={index} value={fonte}>{fonte}</option>
                  ))}
                </select>
                {alimento && alimento.fonte !== 'Personalizado' && (
                  <p className="mt-1 text-xs text-gray-500">A fonte de alimentos da tabela oficial não pode ser alterada.</p>
                )}
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="calorias_100g" className="block text-sm font-medium text-gray-700">
                Calorias (100g)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="calorias_100g"
                  id="calorias_100g"
                  required
                  min="0"
                  step="0.1"
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.calorias_100g}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="proteinas_100g" className="block text-sm font-medium text-gray-700">
                Proteínas (g)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="proteinas_100g"
                  id="proteinas_100g"
                  required
                  min="0"
                  step="0.1"
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.proteinas_100g}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="carboidratos_100g" className="block text-sm font-medium text-gray-700">
                Carboidratos (g)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="carboidratos_100g"
                  id="carboidratos_100g"
                  required
                  min="0"
                  step="0.1"
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.carboidratos_100g}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="gorduras_100g" className="block text-sm font-medium text-gray-700">
                Gorduras (g)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="gorduras_100g"
                  id="gorduras_100g"
                  required
                  min="0"
                  step="0.1"
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.gorduras_100g}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="fibras_100g" className="block text-sm font-medium text-gray-700">
                Fibras (g)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="fibras_100g"
                  id="fibras_100g"
                  required
                  min="0"
                  step="0.1"
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.fibras_100g}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="porcao_padrao" className="block text-sm font-medium text-gray-700">
                Porção Padrão
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="porcao_padrao"
                  id="porcao_padrao"
                  required
                  min="0"
                  step="0.1"
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.porcao_padrao}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="unidade_padrao" className="block text-sm font-medium text-gray-700">
                Unidade
              </label>
              <div className="mt-1">
                <select
                  id="unidade_padrao"
                  name="unidade_padrao"
                  required
                  className="form-select shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.unidade_padrao}
                  onChange={handleChange}
                >
                  <option value="g">g (gramas)</option>
                  <option value="ml">ml (mililitros)</option>
                  <option value="unidade">unidade</option>
                  <option value="colher de sopa">colher de sopa</option>
                  <option value="colher de chá">colher de chá</option>
                  <option value="xícara">xícara</option>
                  <option value="fatia">fatia</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="btn-secondary bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mr-3"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Componente do modal de detalhes do alimento
function AlimentoDetalhesModal({ alimento, onClose }) {
  // Cálculo de calorias por macronutrientes
  const caloriasPorMacro = {
    proteinas: alimento.proteinas_100g * 4,
    carboidratos: alimento.carboidratos_100g * 4,
    gorduras: alimento.gorduras_100g * 9
  };
  
  // Cálculo de percentuais de macronutrientes
  const totalCalorias = alimento.calorias_100g;
  const percentuais = {
    proteinas: (caloriasPorMacro.proteinas / totalCalorias * 100).toFixed(1),
    carboidratos: (caloriasPorMacro.carboidratos / totalCalorias * 100).toFixed(1),
    gorduras: (caloriasPorMacro.gorduras / totalCalorias * 100).toFixed(1)
  };
  
  // Medidas equivalentes
  const medidasEquivalentes = [
    { nome: 'Porção padrão', quantidade: alimento.porcao_padrao, unidade: alimento.unidade_padrao },
    { nome: '100g', quantidade: 100, unidade: 'g' }
  ];
  
  // Se a unidade padrão não for gramas, adicionar conversão
  if (alimento.unidade_padrao !== 'g') {
    medidasEquivalentes.push({ 
      nome: '1 unidade', 
      quantidade: 1, 
      unidade: alimento.unidade_padrao,
      equivalenteGramas: alimento.porcao_padrao
    });
  }
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Detalhes do Alimento
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Cabeçalho com informações básicas */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
              <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900">{alimento.nome}</h2>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  {alimento.categoria}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Fonte: {alimento.fonte}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações nutricionais */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Informações Nutricionais</h4>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Porção de referência</dt>
                    <dd className="mt-1 text-sm text-gray-900">100g</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Valor Energético</dt>
                    <dd className="mt-1 text-sm text-gray-900">{alimento.calorias_100g} kcal</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Proteínas</dt>
                    <dd className="mt-1 text-sm text-gray-900">{alimento.proteinas_100g}g</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Carboidratos</dt>
                    <dd className="mt-1 text-sm text-gray-900">{alimento.carboidratos_100g}g</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Gorduras Totais</dt>
                    <dd className="mt-1 text-sm text-gray-900">{alimento.gorduras_100g}g</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Fibras Alimentares</dt>
                    <dd className="mt-1 text-sm text-gray-900">{alimento.fibras_100g}g</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            {/* Distribuição de macronutrientes */}
            <h4 className="text-lg font-medium text-gray-900 mt-6 mb-4">Distribuição de Macronutrientes</h4>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">Proteínas</div>
                      <div className="text-sm font-medium text-gray-900">{percentuais.proteinas}%</div>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentuais.proteinas}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">Carboidratos</div>
                      <div className="text-sm font-medium text-gray-900">{percentuais.carboidratos}%</div>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${percentuais.carboidratos}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">Gorduras</div>
                      <div className="text-sm font-medium text-gray-900">{percentuais.gorduras}%</div>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${percentuais.gorduras}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Medidas e equivalências */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Medidas e Equivalências</h4>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Porção Padrão</dt>
                    <dd className="mt-1 text-sm text-gray-900">{alimento.porcao_padrao} {alimento.unidade_padrao}</dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Medida
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Calorias
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proteínas
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Carboidratos
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gorduras
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {medidasEquivalentes.map((medida, index) => {
                      // Fator de conversão para calcular valores nutricionais
                      const fator = medida.unidade === 'g' ? medida.quantidade / 100 : medida.quantidade * (alimento.porcao_padrao / 100);
                      
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {medida.nome} ({medida.quantidade} {medida.unidade})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(alimento.calorias_100g * fator).toFixed(1)} kcal
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(alimento.proteinas_100g * fator).toFixed(1)}g
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(alimento.carboidratos_100g * fator).toFixed(1)}g
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(alimento.gorduras_100g * fator).toFixed(1)}g
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Calculadora de porções */}
            <h4 className="text-lg font-medium text-gray-900 mt-6 mb-4">Calculadora de Porções</h4>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">
                      Quantidade
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="quantidade"
                        id="quantidade"
                        min="0"
                        step="0.1"
                        defaultValue="1"
                        className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="unidade" className="block text-sm font-medium text-gray-700">
                      Unidade
                    </label>
                    <div className="mt-1">
                      <select
                        id="unidade"
                        name="unidade"
                        className="form-select shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        defaultValue={alimento.unidade_padrao}
                      >
                        <option value="g">g (gramas)</option>
                        <option value="ml">ml (mililitros)</option>
                        <option value={alimento.unidade_padrao}>{alimento.unidade_padrao}</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Calcular
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Resultado:</h5>
                  <p className="text-sm text-gray-900">
                    1 {alimento.unidade_padrao} = {alimento.calorias_100g * (alimento.porcao_padrao / 100)} kcal, {alimento.proteinas_100g * (alimento.porcao_padrao / 100)}g proteínas, {alimento.carboidratos_100g * (alimento.porcao_padrao / 100)}g carboidratos, {alimento.gorduras_100g * (alimento.porcao_padrao / 100)}g gorduras
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BancoAlimentosPage;
