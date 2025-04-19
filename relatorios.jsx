// Módulo de Relatórios para o SaaS de Gestão Nutricional
// Este arquivo implementa as funcionalidades da aba de relatórios

// Componente principal para a página de relatórios
function RelatoriosPage() {
  // Estado para armazenar o tipo de relatório selecionado
  const [tipoRelatorio, setTipoRelatorio] = useState('pacientes');
  // Estado para armazenar o período selecionado
  const [periodo, setPeriodo] = useState('ultimo_mes');
  // Estado para armazenar o formato de exportação
  const [formatoExportacao, setFormatoExportacao] = useState('pdf');
  // Estado para armazenar os dados do relatório
  const [dadosRelatorio, setDadosRelatorio] = useState(null);
  // Estado para controlar o carregamento
  const [carregando, setCarregando] = useState(false);
  // Estado para armazenar o paciente selecionado (para relatórios individuais)
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  // Estado para armazenar a lista de pacientes
  const [pacientes, setPacientes] = useState([]);

  // Efeito para carregar a lista de pacientes ao montar o componente
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

  // Função para gerar o relatório
  const gerarRelatorio = () => {
    setCarregando(true);
    
    // Simulação de chamada de API com timeout
    setTimeout(() => {
      // Dados simulados para cada tipo de relatório
      let dados = null;
      
      if (tipoRelatorio === 'pacientes') {
        dados = {
          titulo: 'Relatório de Pacientes',
          periodo: obterDescricaoPeriodo(periodo),
          totalPacientes: 32,
          novosPacientes: 8,
          pacientesAtivos: 28,
          pacientesInativos: 4,
          consultasRealizadas: 45,
          objetivos: [
            { nome: 'Emagrecimento', quantidade: 18, percentual: 56 },
            { nome: 'Ganho de massa muscular', quantidade: 6, percentual: 19 },
            { nome: 'Manutenção', quantidade: 4, percentual: 13 },
            { nome: 'Reeducação alimentar', quantidade: 3, percentual: 9 },
            { nome: 'Tratamento de patologia', quantidade: 1, percentual: 3 }
          ],
          generos: [
            { nome: 'Feminino', quantidade: 20, percentual: 62.5 },
            { nome: 'Masculino', quantidade: 12, percentual: 37.5 }
          ],
          faixasEtarias: [
            { nome: '18-25 anos', quantidade: 5, percentual: 16 },
            { nome: '26-35 anos', quantidade: 12, percentual: 37 },
            { nome: '36-45 anos', quantidade: 8, percentual: 25 },
            { nome: '46-55 anos', quantidade: 4, percentual: 13 },
            { nome: '56+ anos', quantidade: 3, percentual: 9 }
          ]
        };
      } else if (tipoRelatorio === 'nutricional') {
        dados = {
          titulo: 'Relatório Nutricional',
          periodo: obterDescricaoPeriodo(periodo),
          totalPlanos: 42,
          planosAtivos: 28,
          distribuicaoMacros: [
            { nome: 'Proteínas', media: 25, min: 20, max: 30 },
            { nome: 'Carboidratos', media: 50, min: 40, max: 60 },
            { nome: 'Gorduras', media: 25, min: 20, max: 30 }
          ],
          alimentosMaisUtilizados: [
            { nome: 'Arroz branco', frequencia: 38 },
            { nome: 'Peito de frango', frequencia: 35 },
            { nome: 'Feijão preto', frequencia: 32 },
            { nome: 'Brócolis', frequencia: 28 },
            { nome: 'Batata doce', frequencia: 25 }
          ],
          receitasMaisUtilizadas: [
            { nome: 'Salada de Frango com Abacate', frequencia: 15 },
            { nome: 'Omelete de Espinafre e Queijo', frequencia: 12 },
            { nome: 'Smoothie de Banana e Proteína', frequencia: 10 },
            { nome: 'Salada de Quinoa com Legumes', frequencia: 8 },
            { nome: 'Bowl de Açaí com Frutas', frequencia: 6 }
          ],
          mediaCaloriasDiarias: 1850,
          mediaProteinas: 120,
          mediaCarboidratos: 200,
          mediaGorduras: 60
        };
      } else if (tipoRelatorio === 'evolucao') {
        dados = {
          titulo: 'Relatório de Evolução',
          periodo: obterDescricaoPeriodo(periodo),
          totalAvaliacoes: 85,
          mediaPerdaPeso: 3.2,
          mediaGanhoMassa: 1.8,
          evolucaoIMC: [
            { mes: 'Janeiro', media: 26.8 },
            { mes: 'Fevereiro', media: 26.5 },
            { mes: 'Março', media: 26.1 },
            { mes: 'Abril', media: 25.7 }
          ],
          evolucaoGorduraCorporal: [
            { mes: 'Janeiro', media: 28.5 },
            { mes: 'Fevereiro', media: 27.8 },
            { mes: 'Março', media: 27.0 },
            { mes: 'Abril', media: 26.2 }
          ],
          objetivosAlcancados: 12,
          percentualSucesso: 75
        };
      } else if (tipoRelatorio === 'financeiro') {
        dados = {
          titulo: 'Relatório Financeiro',
          periodo: obterDescricaoPeriodo(periodo),
          receitaTotal: 15800.00,
          receitaConsultas: 12600.00,
          receitaPlanos: 3200.00,
          mediaValorConsulta: 280.00,
          mediaValorPlano: 320.00,
          consultasPorTipo: [
            { nome: 'Avaliação Inicial', quantidade: 8, valor: 3200.00 },
            { nome: 'Retorno', quantidade: 32, valor: 8000.00 },
            { nome: 'Avaliação Antropométrica', quantidade: 5, valor: 1400.00 }
          ],
          receitaPorMes: [
            { mes: 'Janeiro', valor: 3600.00 },
            { mes: 'Fevereiro', valor: 3800.00 },
            { mes: 'Março', valor: 4100.00 },
            { mes: 'Abril', valor: 4300.00 }
          ]
        };
      } else if (tipoRelatorio === 'individual') {
        if (pacienteSelecionado) {
          // Dados simulados para o paciente selecionado
          const paciente = pacientes.find(p => p.id === pacienteSelecionado);
          
          dados = {
            titulo: `Relatório Individual - ${paciente.nome}`,
            periodo: obterDescricaoPeriodo(periodo),
            paciente: paciente,
            historicoConsultas: [
              { data: '2025-04-10', tipo: 'Avaliação', observacoes: 'Paciente relatou dificuldade para perder peso.' },
              { data: '2025-03-10', tipo: 'Retorno', observacoes: 'Perda de 1.5kg desde a última consulta.' },
              { data: '2025-02-10', tipo: 'Retorno', observacoes: 'Ajuste no plano alimentar para incluir mais proteínas.' },
              { data: '2025-01-10', tipo: 'Avaliação Inicial', observacoes: 'Primeira consulta. Objetivo: emagrecimento.' }
            ],
            historicoMedidas: [
              { data: '2025-04-10', peso: 68.5, imc: 25.2, gorduraCorporal: '28%', circunferencias: { cintura: 82, quadril: 98 } },
              { data: '2025-03-10', peso: 70.0, imc: 25.7, gorduraCorporal: '29%', circunferencias: { cintura: 84, quadril: 99 } },
              { data: '2025-02-10', peso: 71.2, imc: 26.1, gorduraCorporal: '30%', circunferencias: { cintura: 85, quadril: 100 } },
              { data: '2025-01-10', peso: 72.5, imc: 26.6, gorduraCorporal: '31%', circunferencias: { cintura: 87, quadril: 101 } }
            ],
            planosAlimentares: [
              { id: 1, nome: 'Plano de Emagrecimento - Fase 1', dataInicio: '2025-01-10', dataFim: '2025-02-10', status: 'concluído' },
              { id: 2, nome: 'Plano de Emagrecimento - Fase 2', dataInicio: '2025-02-10', dataFim: '2025-03-10', status: 'concluído' },
              { id: 3, nome: 'Plano de Emagrecimento - Fase 3', dataInicio: '2025-03-10', dataFim: '2025-04-10', status: 'concluído' },
              { id: 4, nome: 'Plano de Emagrecimento - Fase 4', dataInicio: '2025-04-10', dataFim: '2025-05-10', status: 'ativo' }
            ],
            evolucaoPeso: [
              { data: '2025-01-10', valor: 72.5 },
              { data: '2025-02-10', valor: 71.2 },
              { data: '2025-03-10', valor: 70.0 },
              { data: '2025-04-10', valor: 68.5 }
            ],
            evolucaoIMC: [
              { data: '2025-01-10', valor: 26.6 },
              { data: '2025-02-10', valor: 26.1 },
              { data: '2025-03-10', valor: 25.7 },
              { data: '2025-04-10', valor: 25.2 }
            ],
            evolucaoGorduraCorporal: [
              { data: '2025-01-10', valor: 31 },
              { data: '2025-02-10', valor: 30 },
              { data: '2025-03-10', valor: 29 },
              { data: '2025-04-10', valor: 28 }
            ]
          };
        } else {
          showNotification('Selecione um paciente para gerar o relatório individual', 'error');
          setCarregando(false);
          return;
        }
      }
      
      setDadosRelatorio(dados);
      setCarregando(false);
      showNotification('Relatório gerado com sucesso!', 'success');
    }, 1500); // Simula um tempo de processamento
  };

  // Função para exportar o relatório
  const exportarRelatorio = () => {
    if (!dadosRelatorio) {
      showNotification('Gere um relatório antes de exportar', 'error');
      return;
    }
    
    showNotification(`Relatório exportado com sucesso no formato ${formatoExportacao.toUpperCase()}!`, 'success');
  };

  // Função para obter a descrição do período selecionado
  const obterDescricaoPeriodo = (periodo) => {
    const hoje = new Date();
    let dataInicio, dataFim;
    
    switch (periodo) {
      case 'ultimo_mes':
        dataInicio = new Date(hoje.getFullYear(), hoje.getMonth() - 1, hoje.getDate());
        dataFim = hoje;
        break;
      case 'ultimos_3_meses':
        dataInicio = new Date(hoje.getFullYear(), hoje.getMonth() - 3, hoje.getDate());
        dataFim = hoje;
        break;
      case 'ultimos_6_meses':
        dataInicio = new Date(hoje.getFullYear(), hoje.getMonth() - 6, hoje.getDate());
        dataFim = hoje;
        break;
      case 'ultimo_ano':
        dataInicio = new Date(hoje.getFullYear() - 1, hoje.getMonth(), hoje.getDate());
        dataFim = hoje;
        break;
      default:
        dataInicio = new Date(hoje.getFullYear(), hoje.getMonth() - 1, hoje.getDate());
        dataFim = hoje;
    }
    
    return `${formatarData(dataInicio)} a ${formatarData(dataFim)}`;
  };

  // Função para formatar data
  const formatarData = (data) => {
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Relatórios</h1>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Painel de configuração do relatório */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Configuração do Relatório</h3>
              <p className="mt-1 text-sm text-gray-500">
                Selecione o tipo de relatório, período e formato de exportação desejados.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="tipo-relatorio" className="block text-sm font-medium text-gray-700">
                    Tipo de Relatório
                  </label>
                  <select
                    id="tipo-relatorio"
                    name="tipo-relatorio"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    value={tipoRelatorio}
                    onChange={(e) => setTipoRelatorio(e.target.value)}
                  >
                    <option value="pacientes">Relatório de Pacientes</option>
                    <option value="nutricional">Relatório Nutricional</option>
                    <option value="evolucao">Relatório de Evolução</option>
                    <option value="financeiro">Relatório Financeiro</option>
                    <option value="individual">Relatório Individual</option>
                  </select>
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="periodo" className="block text-sm font-medium text-gray-700">
                    Período
                  </label>
                  <select
                    id="periodo"
                    name="periodo"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value)}
                  >
                    <option value="ultimo_mes">Último mês</option>
                    <option value="ultimos_3_meses">Últimos 3 meses</option>
                    <option value="ultimos_6_meses">Últimos 6 meses</option>
                    <option value="ultimo_ano">Último ano</option>
                  </select>
                </div>
                
                {tipoRelatorio === 'individual' && (
                  <div className="col-span-6">
                    <label htmlFor="paciente" className="block text-sm font-medium text-gray-700">
                      Paciente
                    </label>
                    <select
                      id="paciente"
                      name="paciente"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      value={pacienteSelecionado || ''}
                      onChange={(e) => setPacienteSelecionado(e.target.value ? parseInt(e.target.value) : null)}
                    >
                      <option value="">Selecione um paciente</option>
                      {pacientes.map((paciente) => (
                        <option key={paciente.id} value={paciente.id}>
                          {paciente.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="formato-exportacao" className="block text-sm font-medium text-gray-700">
                    Formato de Exportação
                  </label>
                  <select
                    id="formato-exportacao"
                    name="formato-exportacao"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    value={formatoExportacao}
                    onChange={(e) => setFormatoExportacao(e.target.value)}
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>
                
                <div className="col-span-6 sm:col-span-3 flex items-end">
                  <div className="flex space-x-3 w-full">
                    <button
                      type="button"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex-grow"
                      onClick={gerarRelatorio}
                      disabled={carregando}
                    >
                      {carregando ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Gerando...
                        </>
                      ) : (
                        'Gerar Relatório'
                      )}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={exportarRelatorio}
                      disabled={!dadosRelatorio || carregando}
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Exportar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Visualização do relatório */}
        {dadosRelatorio && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{dadosRelatorio.titulo}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Período: {dadosRelatorio.periodo}</p>
            </div>
            
            {/* Conteúdo específico para cada tipo de relatório */}
            {tipoRelatorio === 'pacientes' && (
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Cards com métricas principais */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Total de Pacientes</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.totalPacientes}</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Novos Pacientes</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.novosPacientes}</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Pacientes Ativos</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.pacientesAtivos}</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Consultas Realizadas</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.consultasRealizadas}</dd>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Gráfico de objetivos */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Distribuição por Objetivo</h4>
                      <div className="space-y-4">
                        {dadosRelatorio.objetivos.map((objetivo, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium text-gray-900">{objetivo.nome}</div>
                              <div className="text-sm font-medium text-gray-900">{objetivo.percentual}%</div>
                            </div>
                            <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${objetivo.percentual}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Gráfico de gêneros */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Distribuição por Gênero</h4>
                      <div className="h-64 flex items-center justify-center">
                        <div className="w-full max-w-md">
                          <div className="relative h-40">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <span className="block text-3xl font-bold text-gray-900">{dadosRelatorio.totalPacientes}</span>
                                <span className="block text-sm font-medium text-gray-500">Total de Pacientes</span>
                              </div>
                            </div>
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#d1d5db" strokeWidth="15" />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="#0694a2"
                                strokeWidth="15"
                                strokeDasharray="251.2"
                                strokeDashoffset={251.2 * (1 - dadosRelatorio.generos[0].percentual / 100)}
                                transform="rotate(-90 50 50)"
                              />
                            </svg>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            {dadosRelatorio.generos.map((genero, index) => (
                              <div key={index} className="flex items-center">
                                <span className={`h-3 w-3 rounded-full ${index === 0 ? 'bg-teal-500' : 'bg-gray-300'} mr-2`}></span>
                                <span className="text-sm text-gray-700">{genero.nome}: {genero.percentual}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Gráfico de faixas etárias */}
                  <div className="bg-white overflow-hidden shadow rounded-lg lg:col-span-2">
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Distribuição por Faixa Etária</h4>
                      <div className="h-64">
                        <div className="h-full flex items-end space-x-2">
                          {dadosRelatorio.faixasEtarias.map((faixa, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                              <div className="w-full bg-teal-100 rounded-t-md" style={{ height: `${faixa.percentual * 2}px` }}>
                                <div className="w-full bg-teal-500 rounded-t-md h-full opacity-75" style={{ height: `${faixa.percentual}%` }}></div>
                              </div>
                              <div className="text-xs font-medium text-gray-500 mt-2">{faixa.nome}</div>
                              <div className="text-sm font-semibold text-gray-900">{faixa.percentual}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {tipoRelatorio === 'nutricional' && (
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Cards com métricas principais */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Total de Planos Alimentares</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.totalPlanos}</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Planos Ativos</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.planosAtivos}</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Média de Calorias Diárias</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.mediaCaloriasDiarias}</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Média de Proteínas (g)</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.mediaProteinas}</dd>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Gráfico de distribuição de macronutrientes */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Distribuição Média de Macronutrientes</h4>
                      <div className="h-64 flex items-center justify-center">
                        <div className="w-full max-w-md">
                          <div className="relative h-40">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <span className="block text-3xl font-bold text-gray-900">100%</span>
                                <span className="block text-sm font-medium text-gray-500">Total</span>
                              </div>
                            </div>
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              {/* Proteínas */}
                              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="188.4" transform="rotate(-90 50 50)" />
                              {/* Carboidratos */}
                              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="125.6" transform="rotate(0 50 50)" />
                              {/* Gorduras */}
                              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="188.4" transform="rotate(90 50 50)" />
                            </svg>
                          </div>
                          <div className="mt-4 grid grid-cols-3 gap-4">
                            {dadosRelatorio.distribuicaoMacros.map((macro, index) => (
                              <div key={index} className="flex items-center">
                                <span className={`h-3 w-3 rounded-full ${
                                  index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-yellow-500'
                                } mr-2`}></span>
                                <span className="text-sm text-gray-700">{macro.nome}: {macro.media}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Alimentos mais utilizados */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Alimentos Mais Utilizados</h4>
                      <div className="space-y-4">
                        {dadosRelatorio.alimentosMaisUtilizados.map((alimento, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium text-gray-900">{alimento.nome}</div>
                              <div className="text-sm font-medium text-gray-900">{alimento.frequencia} planos</div>
                            </div>
                            <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${(alimento.frequencia / dadosRelatorio.alimentosMaisUtilizados[0].frequencia) * 100}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Receitas mais utilizadas */}
                  <div className="bg-white overflow-hidden shadow rounded-lg lg:col-span-2">
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Receitas Mais Utilizadas</h4>
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Receita</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Frequência</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Popularidade</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {dadosRelatorio.receitasMaisUtilizadas.map((receita, index) => (
                              <tr key={index}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{receita.nome}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{receita.frequencia} planos</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                      <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${(receita.frequencia / dadosRelatorio.receitasMaisUtilizadas[0].frequencia) * 100}%` }}></div>
                                    </div>
                                    <span>{Math.round((receita.frequencia / dadosRelatorio.receitasMaisUtilizadas[0].frequencia) * 100)}%</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {tipoRelatorio === 'evolucao' && (
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Cards com métricas principais */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Total de Avaliações</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.totalAvaliacoes}</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Média de Perda de Peso</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.mediaPerdaPeso} kg</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Objetivos Alcançados</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.objetivosAlcancados}</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Taxa de Sucesso</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.percentualSucesso}%</dd>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Gráfico de evolução do IMC */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Evolução do IMC Médio</h4>
                      <div className="h-64">
                        <div className="h-full flex flex-col">
                          <div className="flex-1 flex items-end space-x-2">
                            {dadosRelatorio.evolucaoIMC.map((item, index) => (
                              <div key={index} className="flex-1 flex flex-col items-center">
                                <div className="w-full bg-blue-100 rounded-t-md" style={{ height: `${(item.media - 24) * 20}px` }}>
                                  <div className="w-full bg-blue-500 rounded-t-md h-full opacity-75"></div>
                                </div>
                                <div className="text-xs font-medium text-gray-500 mt-2">{item.mes}</div>
                                <div className="text-sm font-semibold text-gray-900">{item.media}</div>
                              </div>
                            ))}
                          </div>
                          <div className="h-6 border-t border-gray-200 flex items-center">
                            <div className="text-xs text-gray-500">Valor de referência: IMC saudável entre 18.5 e 24.9</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Gráfico de evolução da gordura corporal */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Evolução da Gordura Corporal Média</h4>
                      <div className="h-64">
                        <div className="h-full flex flex-col">
                          <div className="flex-1 flex items-end space-x-2">
                            {dadosRelatorio.evolucaoGorduraCorporal.map((item, index) => (
                              <div key={index} className="flex-1 flex flex-col items-center">
                                <div className="w-full bg-green-100 rounded-t-md" style={{ height: `${item.media * 2}px` }}>
                                  <div className="w-full bg-green-500 rounded-t-md h-full opacity-75"></div>
                                </div>
                                <div className="text-xs font-medium text-gray-500 mt-2">{item.mes}</div>
                                <div className="text-sm font-semibold text-gray-900">{item.media}%</div>
                              </div>
                            ))}
                          </div>
                          <div className="h-6 border-t border-gray-200 flex items-center">
                            <div className="text-xs text-gray-500">Valor de referência: varia conforme gênero e idade</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {tipoRelatorio === 'financeiro' && (
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Cards com métricas principais */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Receita Total</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">R$ {dadosRelatorio.receitaTotal.toFixed(2)}</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Receita de Consultas</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">R$ {dadosRelatorio.receitaConsultas.toFixed(2)}</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Receita de Planos</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">R$ {dadosRelatorio.receitaPlanos.toFixed(2)}</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Média por Consulta</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">R$ {dadosRelatorio.mediaValorConsulta.toFixed(2)}</dd>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Gráfico de receita por mês */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Receita por Mês</h4>
                      <div className="h-64">
                        <div className="h-full flex items-end space-x-2">
                          {dadosRelatorio.receitaPorMes.map((item, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                              <div className="w-full bg-teal-100 rounded-t-md" style={{ height: `${(item.valor / dadosRelatorio.receitaPorMes[dadosRelatorio.receitaPorMes.length - 1].valor) * 200}px` }}>
                                <div className="w-full bg-teal-500 rounded-t-md h-full opacity-75"></div>
                              </div>
                              <div className="text-xs font-medium text-gray-500 mt-2">{item.mes}</div>
                              <div className="text-sm font-semibold text-gray-900">R$ {item.valor.toFixed(0)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tabela de consultas por tipo */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Consultas por Tipo</h4>
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Tipo de Consulta</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantidade</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Valor Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {dadosRelatorio.consultasPorTipo.map((consulta, index) => (
                              <tr key={index}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{consulta.nome}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{consulta.quantidade}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">R$ {consulta.valor.toFixed(2)}</td>
                              </tr>
                            ))}
                            <tr className="bg-gray-50">
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Total</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                {dadosRelatorio.consultasPorTipo.reduce((acc, curr) => acc + curr.quantidade, 0)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                R$ {dadosRelatorio.consultasPorTipo.reduce((acc, curr) => acc + curr.valor, 0).toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {tipoRelatorio === 'individual' && (
              <div className="px-4 py-5 sm:p-6">
                {/* Informações do paciente */}
                <div className="bg-white overflow-hidden shadow sm:rounded-lg mb-6">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Informações do Paciente</h3>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Nome completo</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dadosRelatorio.paciente.nome}</dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dadosRelatorio.paciente.email}</dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Telefone</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dadosRelatorio.paciente.telefone}</dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Objetivo</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dadosRelatorio.paciente.objetivo}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Cards com métricas principais */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Peso Atual</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.historicoMedidas[0].peso} kg</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">IMC Atual</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{dadosRelatorio.historicoMedidas[0].imc}</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Perda de Peso Total</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        {(dadosRelatorio.historicoMedidas[dadosRelatorio.historicoMedidas.length - 1].peso - dadosRelatorio.historicoMedidas[0].peso).toFixed(1)} kg
                      </dd>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Gráfico de evolução do peso */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Evolução do Peso</h4>
                      <div className="h-64">
                        <div className="h-full flex items-center">
                          <div className="w-full h-48">
                            <div className="relative h-full">
                              {dadosRelatorio.evolucaoPeso.map((item, index, arr) => {
                                if (index === arr.length - 1) return null;
                                
                                const startX = index * (100 / (arr.length - 1));
                                const endX = (index + 1) * (100 / (arr.length - 1));
                                const startY = 100 - ((item.valor - 65) / 10) * 100;
                                const endY = 100 - ((arr[index + 1].valor - 65) / 10) * 100;
                                
                                return (
                                  <svg key={index} className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <line
                                      x1={`${startX}%`}
                                      y1={`${startY}%`}
                                      x2={`${endX}%`}
                                      y2={`${endY}%`}
                                      stroke="#0694a2"
                                      strokeWidth="2"
                                    />
                                    <circle cx={`${startX}%`} cy={`${startY}%`} r="2" fill="#0694a2" />
                                    {index === arr.length - 2 && (
                                      <circle cx={`${endX}%`} cy={`${endY}%`} r="2" fill="#0694a2" />
                                    )}
                                  </svg>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        {dadosRelatorio.evolucaoPeso.map((item, index) => (
                          <div key={index} className="text-center">
                            <div>{formatarData(new Date(item.data))}</div>
                            <div className="font-medium text-gray-900">{item.valor} kg</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Histórico de consultas */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Histórico de Consultas</h4>
                      <div className="flow-root">
                        <ul className="-mb-8">
                          {dadosRelatorio.historicoConsultas.map((consulta, index) => (
                            <li key={index}>
                              <div className="relative pb-8">
                                {index !== dadosRelatorio.historicoConsultas.length - 1 ? (
                                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                ) : null}
                                <div className="relative flex space-x-3">
                                  <div>
                                    <span className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center ring-8 ring-white">
                                      <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                      </svg>
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        {consulta.tipo} <span className="font-medium text-gray-900">em {formatarData(new Date(consulta.data))}</span>
                                      </p>
                                      <p className="mt-1 text-sm text-gray-900">{consulta.observacoes}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RelatoriosPage;
