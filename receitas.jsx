// Módulo de Receitas para o SaaS de Gestão Nutricional
// Este arquivo implementa as funcionalidades da aba de receitas

// Componente principal para a página de receitas
function ReceitasPage() {
  // Estado para armazenar a lista de receitas
  const [receitas, setReceitas] = useState([]);
  // Estado para armazenar a receita selecionada para edição
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  // Estado para controlar a visibilidade do modal de nova receita
  const [showModal, setShowModal] = useState(false);
  // Estado para controlar a visibilidade do modal de detalhes
  const [showDetalhes, setShowDetalhes] = useState(false);
  // Estado para armazenar o termo de busca
  const [termoBusca, setTermoBusca] = useState('');
  // Estado para armazenar o filtro de categoria
  const [filtroCategoria, setFiltroCategoria] = useState('todas');

  // Efeito para carregar as receitas ao montar o componente
  useEffect(() => {
    carregarReceitas();
  }, []);

  // Função para carregar a lista de receitas
  const carregarReceitas = () => {
    // Em um ambiente real, isso seria uma chamada de API
    // Simulação de dados para demonstração
    const dadosReceitas = [
      {
        id: 1,
        nome: 'Salada de Frango com Abacate',
        categoria: 'Saladas',
        tempoPreparo: 20,
        porcoes: 2,
        calorias_porcao: 320,
        proteinas_porcao: 28,
        carboidratos_porcao: 12,
        gorduras_porcao: 18,
        ingredientes: [
          { id: 1, nome: 'Peito de frango grelhado', quantidade: 200, unidade: 'g' },
          { id: 2, nome: 'Abacate', quantidade: 1, unidade: 'unidade' },
          { id: 3, nome: 'Alface', quantidade: 100, unidade: 'g' },
          { id: 4, nome: 'Tomate', quantidade: 1, unidade: 'unidade' },
          { id: 5, nome: 'Azeite de oliva', quantidade: 1, unidade: 'colher de sopa' },
          { id: 6, nome: 'Sal', quantidade: 1, unidade: 'pitada' },
          { id: 7, nome: 'Pimenta do reino', quantidade: 1, unidade: 'pitada' }
        ],
        modoPreparo: 'Corte o peito de frango em cubos e grelhe até dourar. Corte o abacate em cubos. Lave e pique a alface e o tomate. Misture todos os ingredientes em uma tigela, tempere com azeite, sal e pimenta.',
        imagem_url: 'https://example.com/salada-frango.jpg',
        favorito: true,
        dataCriacao: '2025-03-15'
      },
      {
        id: 2,
        nome: 'Bowl de Açaí com Frutas',
        categoria: 'Sobremesas',
        tempoPreparo: 10,
        porcoes: 1,
        calorias_porcao: 380,
        proteinas_porcao: 5,
        carboidratos_porcao: 65,
        gorduras_porcao: 12,
        ingredientes: [
          { id: 1, nome: 'Polpa de açaí', quantidade: 200, unidade: 'g' },
          { id: 2, nome: 'Banana', quantidade: 1, unidade: 'unidade' },
          { id: 3, nome: 'Morango', quantidade: 5, unidade: 'unidades' },
          { id: 4, nome: 'Granola', quantidade: 2, unidade: 'colheres de sopa' },
          { id: 5, nome: 'Mel', quantidade: 1, unidade: 'colher de chá' }
        ],
        modoPreparo: 'Bata a polpa de açaí com metade da banana no liquidificador. Transfira para uma tigela. Corte o restante da banana e os morangos. Decore com as frutas picadas, granola e mel.',
        imagem_url: 'https://example.com/bowl-acai.jpg',
        favorito: false,
        dataCriacao: '2025-02-20'
      },
      {
        id: 3,
        nome: 'Omelete de Espinafre e Queijo',
        categoria: 'Café da Manhã',
        tempoPreparo: 15,
        porcoes: 1,
        calorias_porcao: 280,
        proteinas_porcao: 22,
        carboidratos_porcao: 4,
        gorduras_porcao: 20,
        ingredientes: [
          { id: 1, nome: 'Ovos', quantidade: 2, unidade: 'unidades' },
          { id: 2, nome: 'Espinafre', quantidade: 50, unidade: 'g' },
          { id: 3, nome: 'Queijo mussarela', quantidade: 30, unidade: 'g' },
          { id: 4, nome: 'Azeite de oliva', quantidade: 1, unidade: 'colher de chá' },
          { id: 5, nome: 'Sal', quantidade: 1, unidade: 'pitada' },
          { id: 6, nome: 'Pimenta do reino', quantidade: 1, unidade: 'pitada' }
        ],
        modoPreparo: 'Bata os ovos em uma tigela, tempere com sal e pimenta. Refogue o espinafre em uma frigideira com azeite. Adicione os ovos batidos e o queijo ralado. Cozinhe em fogo médio até firmar.',
        imagem_url: 'https://example.com/omelete.jpg',
        favorito: true,
        dataCriacao: '2025-04-05'
      },
      {
        id: 4,
        nome: 'Smoothie de Banana e Proteína',
        categoria: 'Bebidas',
        tempoPreparo: 5,
        porcoes: 1,
        calorias_porcao: 250,
        proteinas_porcao: 25,
        carboidratos_porcao: 30,
        gorduras_porcao: 5,
        ingredientes: [
          { id: 1, nome: 'Banana', quantidade: 1, unidade: 'unidade' },
          { id: 2, nome: 'Whey Protein', quantidade: 1, unidade: 'scoop' },
          { id: 3, nome: 'Leite desnatado', quantidade: 200, unidade: 'ml' },
          { id: 4, nome: 'Canela em pó', quantidade: 1, unidade: 'pitada' },
          { id: 5, nome: 'Gelo', quantidade: 3, unidade: 'cubos' }
        ],
        modoPreparo: 'Coloque todos os ingredientes no liquidificador e bata até ficar homogêneo. Sirva imediatamente.',
        imagem_url: 'https://example.com/smoothie.jpg',
        favorito: false,
        dataCriacao: '2025-03-28'
      },
      {
        id: 5,
        nome: 'Salada de Quinoa com Legumes',
        categoria: 'Saladas',
        tempoPreparo: 30,
        porcoes: 4,
        calorias_porcao: 220,
        proteinas_porcao: 8,
        carboidratos_porcao: 35,
        gorduras_porcao: 7,
        ingredientes: [
          { id: 1, nome: 'Quinoa', quantidade: 200, unidade: 'g' },
          { id: 2, nome: 'Cenoura', quantidade: 1, unidade: 'unidade' },
          { id: 3, nome: 'Pepino', quantidade: 1, unidade: 'unidade' },
          { id: 4, nome: 'Tomate', quantidade: 2, unidade: 'unidades' },
          { id: 5, nome: 'Cebola roxa', quantidade: 1/2, unidade: 'unidade' },
          { id: 6, nome: 'Azeite de oliva', quantidade: 2, unidade: 'colheres de sopa' },
          { id: 7, nome: 'Suco de limão', quantidade: 1, unidade: 'unidade' },
          { id: 8, nome: 'Sal', quantidade: 1, unidade: 'pitada' },
          { id: 9, nome: 'Pimenta do reino', quantidade: 1, unidade: 'pitada' }
        ],
        modoPreparo: 'Cozinhe a quinoa conforme as instruções da embalagem. Deixe esfriar. Pique todos os legumes em cubos pequenos. Misture a quinoa e os legumes. Tempere com azeite, suco de limão, sal e pimenta.',
        imagem_url: 'https://example.com/salada-quinoa.jpg',
        favorito: true,
        dataCriacao: '2025-04-10'
      }
    ];
    
    setReceitas(dadosReceitas);
  };

  // Lista de categorias disponíveis
  const categorias = [
    'Café da Manhã',
    'Almoço',
    'Jantar',
    'Lanches',
    'Sobremesas',
    'Bebidas',
    'Saladas',
    'Sopas',
    'Low Carb',
    'Vegetariano',
    'Vegano',
    'Sem Glúten',
    'Sem Lactose'
  ];

  // Função para filtrar receitas com base no termo de busca e filtro de categoria
  const receitasFiltradas = useMemo(() => {
    return receitas.filter(receita => {
      const matchTermo = receita.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                         receita.ingredientes.some(ing => ing.nome.toLowerCase().includes(termoBusca.toLowerCase()));
      
      const matchCategoria = filtroCategoria === 'todas' || receita.categoria === filtroCategoria;
      
      return matchTermo && matchCategoria;
    });
  }, [receitas, termoBusca, filtroCategoria]);

  // Função para abrir o modal de nova receita
  const handleNovaReceita = () => {
    setReceitaSelecionada(null);
    setShowModal(true);
  };

  // Função para abrir o modal de edição de receita
  const handleEditarReceita = (receita) => {
    setReceitaSelecionada(receita);
    setShowModal(true);
  };

  // Função para abrir o modal de detalhes da receita
  const handleDetalhesReceita = (receita) => {
    setReceitaSelecionada(receita);
    setShowDetalhes(true);
  };

  // Função para salvar uma receita (nova ou editada)
  const handleSalvarReceita = (dadosReceita) => {
    if (dadosReceita.id) {
      // Atualizar receita existente
      setReceitas(receitas.map(r => 
        r.id === dadosReceita.id ? { ...r, ...dadosReceita } : r
      ));
      showNotification('Receita atualizada com sucesso!', 'success');
    } else {
      // Adicionar nova receita
      const novaReceita = {
        ...dadosReceita,
        id: receitas.length + 1,
        favorito: false,
        dataCriacao: new Date().toISOString().split('T')[0]
      };
      setReceitas([...receitas, novaReceita]);
      showNotification('Receita cadastrada com sucesso!', 'success');
    }
    setShowModal(false);
  };

  // Função para alternar o status de favorito de uma receita
  const handleToggleFavorito = (id) => {
    setReceitas(receitas.map(r => 
      r.id === id ? { ...r, favorito: !r.favorito } : r
    ));
  };

  // Função para excluir uma receita
  const handleExcluirReceita = (id) => {
    if (confirm('Tem certeza que deseja excluir esta receita?')) {
      setReceitas(receitas.filter(r => r.id !== id));
      showNotification('Receita excluída com sucesso!', 'success');
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Receitas</h1>
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
                    placeholder="Buscar por nome ou ingrediente..."
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
              </div>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                type="button"
                className="btn-primary inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={handleNovaReceita}
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Nova Receita
              </button>
            </div>
          </div>
        </div>
        
        {/* Grid de receitas */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {receitasFiltradas.length > 0 ? (
            receitasFiltradas.map((receita) => (
              <div key={receita.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{receita.nome}</h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => handleToggleFavorito(receita.id)}
                    >
                      {receita.favorito ? (
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    {receita.categoria}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {receita.tempoPreparo} minutos
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    {receita.porcoes} {receita.porcoes === 1 ? 'porção' : 'porções'}
                  </div>
                  
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Calorias</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{receita.calorias_porcao}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Proteínas</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{receita.proteinas_porcao}g</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Carboidratos</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{receita.carboidratos_porcao}g</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      onClick={() => handleDetalhesReceita(receita)}
                    >
                      Ver Receita
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      onClick={() => handleEditarReceita(receita)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => handleExcluirReceita(receita.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Nenhuma receita encontrada com os filtros atuais.
            </div>
          )}
        </div>
      </div>
      
      {/* Modal de Nova/Editar Receita */}
      {showModal && (
        <ReceitaFormModal
          receita={receitaSelecionada}
          categorias={categorias}
          onClose={() => setShowModal(false)}
          onSave={handleSalvarReceita}
        />
      )}
      
      {/* Modal de Detalhes da Receita */}
      {showDetalhes && (
        <ReceitaDetalhesModal
          receita={receitaSelecionada}
          onClose={() => setShowDetalhes(false)}
        />
      )}
    </div>
  );
}

// Componente do modal de formulário de receita
function ReceitaFormModal({ receita, categorias, onClose, onSave }) {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    id: receita?.id || null,
    nome: receita?.nome || '',
    categoria: receita?.categoria || 'Café da Manhã',
    tempoPreparo: receita?.tempoPreparo || '',
    porcoes: receita?.porcoes || '',
    calorias_porcao: receita?.calorias_porcao || '',
    proteinas_porcao: receita?.proteinas_porcao || '',
    carboidratos_porcao: receita?.carboidratos_porcao || '',
    gorduras_porcao: receita?.gorduras_porcao || '',
    ingredientes: receita?.ingredientes || [],
    modoPreparo: receita?.modoPreparo || '',
    imagem_url: receita?.imagem_url || ''
  });
  
  // Estado para armazenar o novo ingrediente sendo adicionado
  const [novoIngrediente, setNovoIngrediente] = useState({
    nome: '',
    quantidade: '',
    unidade: 'g'
  });
  
  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes('_porcao') || name === 'tempoPreparo' || name === 'porcoes' ? 
        parseFloat(value) : value
    });
  };
  
  // Função para lidar com mudanças nos campos do novo ingrediente
  const handleIngredienteChange = (e) => {
    const { name, value } = e.target;
    setNovoIngrediente({
      ...novoIngrediente,
      [name]: name === 'quantidade' ? parseFloat(value) : value
    });
  };
  
  // Função para adicionar um novo ingrediente
  const handleAdicionarIngrediente = () => {
    if (novoIngrediente.nome && novoIngrediente.quantidade) {
      const ingrediente = {
        ...novoIngrediente,
        id: Date.now() // Usar timestamp como ID temporário
      };
      
      setFormData({
        ...formData,
        ingredientes: [...formData.ingredientes, ingrediente]
      });
      
      // Resetar o formulário de novo ingrediente
      setNovoIngrediente({
        nome: '',
        quantidade: '',
        unidade: 'g'
      });
    }
  };
  
  // Função para remover um ingrediente
  const handleRemoverIngrediente = (id) => {
    setFormData({
      ...formData,
      ingredientes: formData.ingredientes.filter(ing => ing.id !== id)
    });
  };
  
  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {receita ? 'Editar Receita' : 'Nova Receita'}
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
                Nome da Receita
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
              <label htmlFor="imagem_url" className="block text-sm font-medium text-gray-700">
                URL da Imagem (opcional)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="imagem_url"
                  id="imagem_url"
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.imagem_url}
                  onChange={handleChange}
                  placeholder="https://example.com/imagem.jpg"
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="tempoPreparo" className="block text-sm font-medium text-gray-700">
                Tempo de Preparo (minutos)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="tempoPreparo"
                  id="tempoPreparo"
                  required
                  min="1"
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.tempoPreparo}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="porcoes" className="block text-sm font-medium text-gray-700">
                Número de Porções
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="porcoes"
                  id="porcoes"
                  required
                  min="1"
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.porcoes}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Informações Nutricionais (por porção)</h4>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-4">
                <div className="sm:col-span-1">
                  <label htmlFor="calorias_porcao" className="block text-sm font-medium text-gray-700">
                    Calorias (kcal)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="calorias_porcao"
                      id="calorias_porcao"
                      required
                      min="0"
                      step="0.1"
                      className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={formData.calorias_porcao}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-1">
                  <label htmlFor="proteinas_porcao" className="block text-sm font-medium text-gray-700">
                    Proteínas (g)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="proteinas_porcao"
                      id="proteinas_porcao"
                      required
                      min="0"
                      step="0.1"
                      className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={formData.proteinas_porcao}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-1">
                  <label htmlFor="carboidratos_porcao" className="block text-sm font-medium text-gray-700">
                    Carboidratos (g)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="carboidratos_porcao"
                      id="carboidratos_porcao"
                      required
                      min="0"
                      step="0.1"
                      className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={formData.carboidratos_porcao}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-1">
                  <label htmlFor="gorduras_porcao" className="block text-sm font-medium text-gray-700">
                    Gorduras (g)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="gorduras_porcao"
                      id="gorduras_porcao"
                      required
                      min="0"
                      step="0.1"
                      className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={formData.gorduras_porcao}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Ingredientes</h4>
              
              {/* Lista de ingredientes */}
              {formData.ingredientes.length > 0 && (
                <div className="mb-4 bg-gray-50 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ingrediente
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantidade
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unidade
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Ações</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.ingredientes.map((ingrediente, index) => (
                        <tr key={ingrediente.id || index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {ingrediente.nome}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {ingrediente.quantidade}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {ingrediente.unidade}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleRemoverIngrediente(ingrediente.id)}
                            >
                              Remover
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Formulário para adicionar novo ingrediente */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 bg-gray-50 p-4 rounded-md">
                <div className="sm:col-span-3">
                  <label htmlFor="ingrediente_nome" className="block text-sm font-medium text-gray-700">
                    Nome do Ingrediente
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="nome"
                      id="ingrediente_nome"
                      className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={novoIngrediente.nome}
                      onChange={handleIngredienteChange}
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-1">
                  <label htmlFor="ingrediente_quantidade" className="block text-sm font-medium text-gray-700">
                    Quantidade
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="quantidade"
                      id="ingrediente_quantidade"
                      min="0"
                      step="0.1"
                      className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={novoIngrediente.quantidade}
                      onChange={handleIngredienteChange}
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-1">
                  <label htmlFor="ingrediente_unidade" className="block text-sm font-medium text-gray-700">
                    Unidade
                  </label>
                  <div className="mt-1">
                    <select
                      id="ingrediente_unidade"
                      name="unidade"
                      className="form-select shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={novoIngrediente.unidade}
                      onChange={handleIngredienteChange}
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
                
                <div className="sm:col-span-1 flex items-end">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    onClick={handleAdicionarIngrediente}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor="modoPreparo" className="block text-sm font-medium text-gray-700">
                Modo de Preparo
              </label>
              <div className="mt-1">
                <textarea
                  id="modoPreparo"
                  name="modoPreparo"
                  rows={5}
                  required
                  className="form-textarea shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.modoPreparo}
                  onChange={handleChange}
                />
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

// Componente do modal de detalhes da receita
function ReceitaDetalhesModal({ receita, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Detalhes da Receita
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900">{receita.nome}</h2>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  {receita.categoria}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {receita.tempoPreparo} minutos
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  {receita.porcoes} {receita.porcoes === 1 ? 'porção' : 'porções'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Informações nutricionais */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Informações Nutricionais</h4>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Porção</dt>
                    <dd className="mt-1 text-sm text-gray-900">1/{receita.porcoes} da receita</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Valor Energético</dt>
                    <dd className="mt-1 text-sm text-gray-900">{receita.calorias_porcao} kcal</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Proteínas</dt>
                    <dd className="mt-1 text-sm text-gray-900">{receita.proteinas_porcao}g</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Carboidratos</dt>
                    <dd className="mt-1 text-sm text-gray-900">{receita.carboidratos_porcao}g</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Gorduras Totais</dt>
                    <dd className="mt-1 text-sm text-gray-900">{receita.gorduras_porcao}g</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            {/* Distribuição de macronutrientes */}
            <h4 className="text-lg font-medium text-gray-900 mt-6 mb-4">Distribuição de Macronutrientes</h4>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  {/* Cálculo de percentuais de macronutrientes */}
                  {(() => {
                    const caloriasPorMacro = {
                      proteinas: receita.proteinas_porcao * 4,
                      carboidratos: receita.carboidratos_porcao * 4,
                      gorduras: receita.gorduras_porcao * 9
                    };
                    
                    const totalCalorias = receita.calorias_porcao;
                    const percentuais = {
                      proteinas: (caloriasPorMacro.proteinas / totalCalorias * 100).toFixed(1),
                      carboidratos: (caloriasPorMacro.carboidratos / totalCalorias * 100).toFixed(1),
                      gorduras: (caloriasPorMacro.gorduras / totalCalorias * 100).toFixed(1)
                    };
                    
                    return (
                      <>
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
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
          
          {/* Ingredientes e modo de preparo */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Ingredientes</h4>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden mb-6">
              <ul className="divide-y divide-gray-200">
                {receita.ingredientes.map((ingrediente, index) => (
                  <li key={index} className="px-4 py-3 flex items-center">
                    <svg className="h-5 w-5 text-teal-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-900">
                      {ingrediente.quantidade} {ingrediente.unidade} de {ingrediente.nome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <h4 className="text-lg font-medium text-gray-900 mb-4">Modo de Preparo</h4>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <p className="text-sm text-gray-900 whitespace-pre-line">
                  {receita.modoPreparo}
                </p>
              </div>
            </div>
            
            {/* Botões de ação */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={onClose}
              >
                Fechar
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Exportar PDF
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Compartilhar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceitasPage;
