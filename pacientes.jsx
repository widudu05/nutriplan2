// Módulo de Pacientes para o SaaS de Gestão Nutricional
// Este arquivo implementa as funcionalidades da aba de pacientes

// Componente principal para a página de pacientes
function PacientesPage() {
  // Estado para armazenar a lista de pacientes
  const [pacientes, setPacientes] = useState([]);
  // Estado para armazenar o paciente selecionado para edição
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  // Estado para controlar a visibilidade do modal de novo paciente
  const [showModal, setShowModal] = useState(false);
  // Estado para controlar a visibilidade do modal de detalhes
  const [showDetalhes, setShowDetalhes] = useState(false);
  // Estado para armazenar o termo de busca
  const [termoBusca, setTermoBusca] = useState('');
  // Estado para armazenar o filtro de status
  const [filtroStatus, setFiltroStatus] = useState('todos');

  // Efeito para carregar os pacientes ao montar o componente
  useEffect(() => {
    carregarPacientes();
  }, []);

  // Função para carregar a lista de pacientes
  const carregarPacientes = () => {
    // Em um ambiente real, isso seria uma chamada de API
    // Simulação de dados para demonstração
    const dadosPacientes = [
      {
        id: 1,
        nome: 'Maria Silva',
        email: 'maria.silva@email.com',
        telefone: '(11) 98765-4321',
        dataNascimento: '1985-05-15',
        genero: 'Feminino',
        altura: 165,
        peso: 68.5,
        objetivo: 'Emagrecimento',
        status: 'ativo',
        ultimaConsulta: '2025-04-10',
        proximaConsulta: '2025-05-10'
      },
      {
        id: 2,
        nome: 'João Santos',
        email: 'joao.santos@email.com',
        telefone: '(11) 91234-5678',
        dataNascimento: '1990-08-22',
        genero: 'Masculino',
        altura: 178,
        peso: 82.3,
        objetivo: 'Ganho de massa muscular',
        status: 'ativo',
        ultimaConsulta: '2025-04-05',
        proximaConsulta: '2025-05-05'
      },
      {
        id: 3,
        nome: 'Ana Oliveira',
        email: 'ana.oliveira@email.com',
        telefone: '(11) 99876-5432',
        dataNascimento: '1978-12-03',
        genero: 'Feminino',
        altura: 160,
        peso: 65.0,
        objetivo: 'Manutenção',
        status: 'inativo',
        ultimaConsulta: '2025-02-15',
        proximaConsulta: null
      },
      {
        id: 4,
        nome: 'Carlos Pereira',
        email: 'carlos.pereira@email.com',
        telefone: '(11) 98888-7777',
        dataNascimento: '1995-03-27',
        genero: 'Masculino',
        altura: 182,
        peso: 90.5,
        objetivo: 'Emagrecimento',
        status: 'ativo',
        ultimaConsulta: '2025-04-15',
        proximaConsulta: '2025-05-15'
      },
      {
        id: 5,
        nome: 'Juliana Costa',
        email: 'juliana.costa@email.com',
        telefone: '(11) 97777-8888',
        dataNascimento: '1988-07-10',
        genero: 'Feminino',
        altura: 170,
        peso: 72.1,
        objetivo: 'Reeducação alimentar',
        status: 'ativo',
        ultimaConsulta: '2025-04-12',
        proximaConsulta: '2025-05-12'
      }
    ];
    
    setPacientes(dadosPacientes);
  };

  // Função para filtrar pacientes com base no termo de busca e filtro de status
  const pacientesFiltrados = useMemo(() => {
    return pacientes.filter(paciente => {
      const matchTermo = paciente.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                         paciente.email.toLowerCase().includes(termoBusca.toLowerCase()) ||
                         paciente.telefone.includes(termoBusca);
      
      const matchStatus = filtroStatus === 'todos' || paciente.status === filtroStatus;
      
      return matchTermo && matchStatus;
    });
  }, [pacientes, termoBusca, filtroStatus]);

  // Função para abrir o modal de novo paciente
  const handleNovoPaciente = () => {
    setPacienteSelecionado(null);
    setShowModal(true);
  };

  // Função para abrir o modal de edição de paciente
  const handleEditarPaciente = (paciente) => {
    setPacienteSelecionado(paciente);
    setShowModal(true);
  };

  // Função para abrir o modal de detalhes do paciente
  const handleDetalhesPaciente = (paciente) => {
    setPacienteSelecionado(paciente);
    setShowDetalhes(true);
  };

  // Função para salvar um paciente (novo ou editado)
  const handleSalvarPaciente = (dadosPaciente) => {
    if (dadosPaciente.id) {
      // Atualizar paciente existente
      setPacientes(pacientes.map(p => 
        p.id === dadosPaciente.id ? { ...p, ...dadosPaciente } : p
      ));
      showNotification('Paciente atualizado com sucesso!', 'success');
    } else {
      // Adicionar novo paciente
      const novoPaciente = {
        ...dadosPaciente,
        id: pacientes.length + 1,
        status: 'ativo',
        ultimaConsulta: null,
        proximaConsulta: null
      };
      setPacientes([...pacientes, novoPaciente]);
      showNotification('Paciente cadastrado com sucesso!', 'success');
    }
    setShowModal(false);
  };

  // Função para alterar o status de um paciente
  const handleAlterarStatus = (id, novoStatus) => {
    setPacientes(pacientes.map(p => 
      p.id === id ? { ...p, status: novoStatus } : p
    ));
    showNotification(`Status do paciente alterado para ${novoStatus}`, 'success');
  };

  // Função para agendar uma consulta
  const handleAgendarConsulta = (id, data) => {
    setPacientes(pacientes.map(p => 
      p.id === id ? { ...p, proximaConsulta: data } : p
    ));
    showNotification('Consulta agendada com sucesso!', 'success');
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Pacientes</h1>
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
                    placeholder="Buscar por nome, email ou telefone..."
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                  />
                </div>
                <div className="ml-3">
                  <select
                    className="form-select focus:ring-teal-500 focus:border-teal-500 h-full py-0 pl-3 pr-7 border-gray-300 bg-transparent text-gray-500 sm:text-sm rounded-md"
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value)}
                  >
                    <option value="todos">Todos</option>
                    <option value="ativo">Ativos</option>
                    <option value="inativo">Inativos</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                type="button"
                className="btn-primary inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={handleNovoPaciente}
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Novo Paciente
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabela de pacientes */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {pacientesFiltrados.length > 0 ? (
              pacientesFiltrados.map((paciente) => (
                <li key={paciente.id}>
                  <div className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium">
                            {paciente.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-teal-600 truncate">{paciente.nome}</p>
                            <p className="text-sm text-gray-500">{paciente.email}</p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            paciente.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {paciente.status === 'ativo' ? 'Ativo' : 'Inativo'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            {paciente.genero} • {calcularIdade(paciente.dataNascimento)} anos
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {paciente.telefone}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <p>
                            {paciente.proximaConsulta ? (
                              <>Próxima consulta: {formatarData(paciente.proximaConsulta)}</>
                            ) : (
                              <>Sem consulta agendada</>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          type="button"
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          onClick={() => handleDetalhesPaciente(paciente)}
                        >
                          Detalhes
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          onClick={() => handleEditarPaciente(paciente)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={() => handleAgendarConsulta(paciente.id, '2025-05-20')}
                        >
                          Agendar Consulta
                        </button>
                        {paciente.status === 'ativo' ? (
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            onClick={() => handleAlterarStatus(paciente.id, 'inativo')}
                          >
                            Inativar
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            onClick={() => handleAlterarStatus(paciente.id, 'ativo')}
                          >
                            Ativar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-6 text-center text-gray-500">
                Nenhum paciente encontrado com os filtros atuais.
              </li>
            )}
          </ul>
        </div>
      </div>
      
      {/* Modal de Novo/Editar Paciente */}
      {showModal && (
        <PacienteFormModal
          paciente={pacienteSelecionado}
          onClose={() => setShowModal(false)}
          onSave={handleSalvarPaciente}
        />
      )}
      
      {/* Modal de Detalhes do Paciente */}
      {showDetalhes && (
        <PacienteDetalhesModal
          paciente={pacienteSelecionado}
          onClose={() => setShowDetalhes(false)}
        />
      )}
    </div>
  );
}

// Componente do modal de formulário de paciente
function PacienteFormModal({ paciente, onClose, onSave }) {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    id: paciente?.id || null,
    nome: paciente?.nome || '',
    email: paciente?.email || '',
    telefone: paciente?.telefone || '',
    dataNascimento: paciente?.dataNascimento || '',
    genero: paciente?.genero || 'Feminino',
    altura: paciente?.altura || '',
    peso: paciente?.peso || '',
    objetivo: paciente?.objetivo || 'Emagrecimento'
  });
  
  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
            {paciente ? 'Editar Paciente' : 'Novo Paciente'}
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
                Nome Completo
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="telefone"
                  id="telefone"
                  required
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
                Data de Nascimento
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="dataNascimento"
                  id="dataNascimento"
                  required
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                Gênero
              </label>
              <div className="mt-1">
                <select
                  id="genero"
                  name="genero"
                  required
                  className="form-select shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.genero}
                  onChange={handleChange}
                >
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="altura" className="block text-sm font-medium text-gray-700">
                Altura (cm)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="altura"
                  id="altura"
                  required
                  min="0"
                  step="0.1"
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.altura}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="peso" className="block text-sm font-medium text-gray-700">
                Peso Atual (kg)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="peso"
                  id="peso"
                  required
                  min="0"
                  step="0.1"
                  className="form-input shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.peso}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700">
                Objetivo
              </label>
              <div className="mt-1">
                <select
                  id="objetivo"
                  name="objetivo"
                  required
                  className="form-select shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.objetivo}
                  onChange={handleChange}
                >
                  <option value="Emagrecimento">Emagrecimento</option>
                  <option value="Ganho de massa muscular">Ganho de massa muscular</option>
                  <option value="Manutenção">Manutenção</option>
                  <option value="Reeducação alimentar">Reeducação alimentar</option>
                  <option value="Tratamento de patologia">Tratamento de patologia</option>
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

// Componente do modal de detalhes do paciente
function PacienteDetalhesModal({ paciente, onClose }) {
  // Dados de histórico simulados
  const historicoConsultas = [
    { data: '2025-04-10', tipo: 'Avaliação', observacoes: 'Paciente relatou dificuldade para perder peso.' },
    { data: '2025-03-10', tipo: 'Retorno', observacoes: 'Perda de 1.5kg desde a última consulta.' },
    { data: '2025-02-10', tipo: 'Retorno', observacoes: 'Ajuste no plano alimentar para incluir mais proteínas.' },
    { data: '2025-01-10', tipo: 'Avaliação Inicial', observacoes: 'Primeira consulta. Objetivo: emagrecimento.' }
  ];
  
  // Dados de medidas simulados
  const historicoMedidas = [
    { data: '2025-04-10', peso: 68.5, imc: 25.2, gorduraCorporal: '28%', circunferencias: { cintura: 82, quadril: 98 } },
    { data: '2025-03-10', peso: 70.0, imc: 25.7, gorduraCorporal: '29%', circunferencias: { cintura: 84, quadril: 99 } },
    { data: '2025-02-10', peso: 71.2, imc: 26.1, gorduraCorporal: '30%', circunferencias: { cintura: 85, quadril: 100 } },
    { data: '2025-01-10', peso: 72.5, imc: 26.6, gorduraCorporal: '31%', circunferencias: { cintura: 87, quadril: 101 } }
  ];
  
  // Dados de planos alimentares simulados
  const planosAlimentares = [
    { id: 1, nome: 'Plano de Emagrecimento - Fase 1', dataInicio: '2025-01-10', dataFim: '2025-02-10', status: 'concluído' },
    { id: 2, nome: 'Plano de Emagrecimento - Fase 2', dataInicio: '2025-02-10', dataFim: '2025-03-10', status: 'concluído' },
    { id: 3, nome: 'Plano de Emagrecimento - Fase 3', dataInicio: '2025-03-10', dataFim: '2025-04-10', status: 'concluído' },
    { id: 4, nome: 'Plano de Emagrecimento - Fase 4', dataInicio: '2025-04-10', dataFim: '2025-05-10', status: 'ativo' }
  ];
  
  // Estado para controlar a aba ativa
  const [abaAtiva, setAbaAtiva] = useState('info');
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Detalhes do Paciente
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
            <div className="flex-shrink-0 h-16 w-16 rounded-full bg-teal-500 flex items-center justify-center text-white text-xl font-medium">
              {paciente.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900">{paciente.nome}</h2>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  {paciente.genero} • {calcularIdade(paciente.dataNascimento)} anos
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {paciente.email}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {paciente.telefone}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Abas de navegação */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${
                abaAtiva === 'info'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setAbaAtiva('info')}
            >
              Informações Básicas
            </button>
            <button
              className={`${
                abaAtiva === 'historico'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setAbaAtiva('historico')}
            >
              Histórico de Consultas
            </button>
            <button
              className={`${
                abaAtiva === 'medidas'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setAbaAtiva('medidas')}
            >
              Medidas Antropométricas
            </button>
            <button
              className={`${
                abaAtiva === 'planos'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setAbaAtiva('planos')}
            >
              Planos Alimentares
            </button>
          </nav>
        </div>
        
        {/* Conteúdo das abas */}
        <div className="mt-6">
          {/* Aba de Informações Básicas */}
          {abaAtiva === 'info' && (
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Dados Pessoais</h3>
                <div className="mt-4 border-t border-gray-200">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Nome completo</dt>
                      <dd className="text-sm text-gray-900">{paciente.nome}</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="text-sm text-gray-900">{paciente.email}</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Telefone</dt>
                      <dd className="text-sm text-gray-900">{paciente.telefone}</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Data de nascimento</dt>
                      <dd className="text-sm text-gray-900">{formatarData(paciente.dataNascimento)}</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Idade</dt>
                      <dd className="text-sm text-gray-900">{calcularIdade(paciente.dataNascimento)} anos</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Gênero</dt>
                      <dd className="text-sm text-gray-900">{paciente.genero}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Dados Nutricionais</h3>
                <div className="mt-4 border-t border-gray-200">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Altura</dt>
                      <dd className="text-sm text-gray-900">{paciente.altura} cm</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Peso atual</dt>
                      <dd className="text-sm text-gray-900">{paciente.peso} kg</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">IMC</dt>
                      <dd className="text-sm text-gray-900">{calcularIMC(paciente.peso, paciente.altura).toFixed(1)} kg/m²</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Classificação IMC</dt>
                      <dd className="text-sm text-gray-900">{classificarIMC(calcularIMC(paciente.peso, paciente.altura))}</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Objetivo</dt>
                      <dd className="text-sm text-gray-900">{paciente.objetivo}</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="text-sm text-gray-900">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          paciente.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {paciente.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}
          
          {/* Aba de Histórico de Consultas */}
          {abaAtiva === 'historico' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Histórico de Consultas</h3>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Nova Consulta
                </button>
              </div>
              
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {historicoConsultas.map((consulta, index) => (
                    <li key={index}>
                      <div className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-teal-600 truncate">
                              {consulta.tipo}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {formatarData(consulta.data)}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                Observações
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-700">{consulta.observacoes}</p>
                          </div>
                          <div className="mt-2 flex justify-end space-x-2">
                            <button
                              type="button"
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                              Ver Detalhes
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                              Editar
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Aba de Medidas Antropométricas */}
          {abaAtiva === 'medidas' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Medidas Antropométricas</h3>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Nova Medição
                </button>
              </div>
              
              {/* Gráfico de evolução */}
              <div className="bg-white p-4 shadow rounded-lg mb-6">
                <h4 className="text-base font-medium text-gray-900 mb-4">Evolução do Peso</h4>
                <div className="h-64">
                  <p className="text-center text-gray-500 italic">Gráfico de evolução do peso seria exibido aqui</p>
                </div>
              </div>
              
              {/* Tabela de medidas */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Peso (kg)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IMC
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gordura Corporal
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cintura (cm)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quadril (cm)
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Ações</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {historicoMedidas.map((medida, index) => (
                      <tr key={index} className="table-row-hover">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatarData(medida.data)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {medida.peso}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {medida.imc}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {medida.gorduraCorporal}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {medida.circunferencias.cintura}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {medida.circunferencias.quadril}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            type="button"
                            className="text-teal-600 hover:text-teal-900"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Aba de Planos Alimentares */}
          {abaAtiva === 'planos' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Planos Alimentares</h3>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Novo Plano
                </button>
              </div>
              
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {planosAlimentares.map((plano) => (
                    <li key={plano.id}>
                      <div className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-teal-600 truncate">
                              {plano.nome}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                plano.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {plano.status === 'ativo' ? 'Ativo' : 'Concluído'}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                {formatarData(plano.dataInicio)} - {formatarData(plano.dataFim)}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-end space-x-2">
                            <button
                              type="button"
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                              Ver Plano
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Gerar PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Funções utilitárias
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  
  return idade;
}

function formatarData(dataString) {
  if (!dataString) return 'N/A';
  
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR');
}

function calcularIMC(peso, altura) {
  return peso / Math.pow(altura / 100, 2);
}

function classificarIMC(imc) {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade grau I';
  if (imc < 40) return 'Obesidade grau II';
  return 'Obesidade grau III';
}

export default PacientesPage;
