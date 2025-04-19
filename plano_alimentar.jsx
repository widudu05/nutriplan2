import React, { useState } from 'react';

// Componente para a tela de Plano Alimentar
const PlanoAlimentar = () => {
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [nomePlano, setNomePlano] = useState('');
  const [refeicoes, setRefeicoes] = useState([
    { id: 1, nome: 'Café da Manhã', horario: '07:00', alimentos: [] },
    { id: 2, nome: 'Lanche da Manhã', horario: '10:00', alimentos: [] },
    { id: 3, nome: 'Almoço', horario: '13:00', alimentos: [] },
    { id: 4, nome: 'Lanche da Tarde', horario: '16:00', alimentos: [] },
    { id: 5, nome: 'Jantar', horario: '19:00', alimentos: [] },
    { id: 6, nome: 'Ceia', horario: '22:00', alimentos: [] },
  ]);
  const [termoBusca, setTermoBusca] = useState('');
  const [alimentosFiltrados, setAlimentosFiltrados] = useState([]);
  const [refeicaoAtual, setRefeicaoAtual] = useState(null);
  const [mostrarModalAlimento, setMostrarModalAlimento] = useState(false);

  // Dados simulados
  const pacientes = [
    { id: 1, nome: 'Maria Silva' },
    { id: 2, nome: 'João Santos' },
    { id: 3, nome: 'Ana Oliveira' },
    { id: 4, nome: 'Carlos Pereira' },
    { id: 5, nome: 'Juliana Costa' },
  ];

  const bancoAlimentos = [
    { id: 1, nome: 'Arroz branco cozido', grupo: 'Cereais', calorias: 128, proteinas: 2.5, carboidratos: 28.1, gorduras: 0.2, medida: 'colher de sopa', gramas: 25 },
    { id: 2, nome: 'Feijão preto cozido', grupo: 'Leguminosas', calorias: 77, proteinas: 5.1, carboidratos: 13.6, gorduras: 0.5, medida: 'colher de sopa', gramas: 17 },
    { id: 3, nome: 'Peito de frango grelhado', grupo: 'Carnes', calorias: 159, proteinas: 31, carboidratos: 0, gorduras: 3.6, medida: 'filé médio', gramas: 100 },
    { id: 4, nome: 'Batata doce cozida', grupo: 'Tubérculos', calorias: 86, proteinas: 1.5, carboidratos: 20.1, gorduras: 0.1, medida: 'unidade média', gramas: 100 },
    { id: 5, nome: 'Brócolis cozido', grupo: 'Verduras', calorias: 35, proteinas: 3.6, carboidratos: 4.0, gorduras: 0.4, medida: 'colher de sopa', gramas: 10 },
    { id: 6, nome: 'Maçã', grupo: 'Frutas', calorias: 52, proteinas: 0.3, carboidratos: 13.8, gorduras: 0.2, medida: 'unidade média', gramas: 100 },
    { id: 7, nome: 'Leite desnatado', grupo: 'Laticínios', calorias: 83, proteinas: 8.2, carboidratos: 12.2, gorduras: 0.2, medida: 'copo', gramas: 200 },
    { id: 8, nome: 'Pão integral', grupo: 'Cereais', calorias: 247, proteinas: 13, carboidratos: 41.3, gorduras: 3.4, medida: 'fatia', gramas: 50 },
    { id: 9, nome: 'Azeite de oliva', grupo: 'Óleos', calorias: 120, proteinas: 0, carboidratos: 0, gorduras: 13.5, medida: 'colher de sopa', gramas: 15 },
    { id: 10, nome: 'Banana', grupo: 'Frutas', calorias: 89, proteinas: 1.1, carboidratos: 22.8, gorduras: 0.3, medida: 'unidade média', gramas: 100 },
  ];

  // Função para buscar alimentos
  const buscarAlimentos = (termo) => {
    if (!termo.trim()) {
      setAlimentosFiltrados([]);
      return;
    }
    
    const filtrados = bancoAlimentos.filter(alimento => 
      alimento.nome.toLowerCase().includes(termo.toLowerCase()) ||
      alimento.grupo.toLowerCase().includes(termo.toLowerCase())
    );
    
    setAlimentosFiltrados(filtrados);
  };

  // Função para adicionar alimento à refeição
  const adicionarAlimento = (alimento, quantidade = 1) => {
    if (!refeicaoAtual) return;
    
    const novasRefeicoes = [...refeicoes];
    const index = novasRefeicoes.findIndex(r => r.id === refeicaoAtual);
    
    if (index !== -1) {
      const alimentoComQuantidade = {
        ...alimento,
        quantidade,
        caloriasTotal: alimento.calorias * quantidade,
        proteinasTotal: alimento.proteinas * quantidade,
        carboidratosTotal: alimento.carboidratos * quantidade,
        gordurasTotal: alimento.gorduras * quantidade,
        gramasTotal: alimento.gramas * quantidade
      };
      
      novasRefeicoes[index].alimentos.push(alimentoComQuantidade);
      setRefeicoes(novasRefeicoes);
      setMostrarModalAlimento(false);
    }
  };

  // Função para remover alimento da refeição
  const removerAlimento = (refeicaoId, alimentoIndex) => {
    const novasRefeicoes = [...refeicoes];
    const index = novasRefeicoes.findIndex(r => r.id === refeicaoId);
    
    if (index !== -1) {
      novasRefeicoes[index].alimentos.splice(alimentoIndex, 1);
      setRefeicoes(novasRefeicoes);
    }
  };

  // Função para calcular totais nutricionais da refeição
  const calcularTotaisRefeicao = (refeicaoId) => {
    const refeicao = refeicoes.find(r => r.id === refeicaoId);
    if (!refeicao) return { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 };
    
    return refeicao.alimentos.reduce((acc, alimento) => {
      return {
        calorias: acc.calorias + alimento.caloriasTotal,
        proteinas: acc.proteinas + alimento.proteinasTotal,
        carboidratos: acc.carboidratos + alimento.carboidratosTotal,
        gorduras: acc.gorduras + alimento.gordurasTotal
      };
    }, { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 });
  };

  // Função para calcular totais nutricionais do plano
  const calcularTotaisPlano = () => {
    return refeicoes.reduce((acc, refeicao) => {
      const totaisRefeicao = calcularTotaisRefeicao(refeicao.id);
      return {
        calorias: acc.calorias + totaisRefeicao.calorias,
        proteinas: acc.proteinas + totaisRefeicao.proteinas,
        carboidratos: acc.carboidratos + totaisRefeicao.carboidratos,
        gorduras: acc.gorduras + totaisRefeicao.gorduras
      };
    }, { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 });
  };

  // Modal para adicionar alimento
  const ModalAdicionarAlimento = () => {
    const [quantidade, setQuantidade] = useState(1);
    const [alimentoSelecionado, setAlimentoSelecionado] = useState(null);
    
    return (
      <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 ${mostrarModalAlimento ? '' : 'hidden'}`}>
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Adicionar Alimento</h3>
            <button 
              onClick={() => setMostrarModalAlimento(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-4">
            <label htmlFor="busca-alimento" className="block text-sm font-medium text-gray-700">Buscar Alimento</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                id="busca-alimento"
                className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Digite o nome do alimento..."
                value={termoBusca}
                onChange={(e) => {
                  setTermoBusca(e.target.value);
                  buscarAlimentos(e.target.value);
                }}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alimento</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calorias</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {alimentosFiltrados.map((alimento) => (
                  <tr 
                    key={alimento.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${alimentoSelecionado?.id === alimento.id ? 'bg-teal-50' : ''}`}
                    onClick={() => setAlimentoSelecionado(alimento)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alimento.nome}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alimento.grupo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alimento.calorias} kcal</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setAlimentoSelecionado(alimento);
                        }}
                        className="text-teal-600 hover:text-teal-900"
                      >
                        Selecionar
                      </button>
                    </td>
                  </tr>
                ))}
                {alimentosFiltrados.length === 0 && termoBusca && (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      Nenhum alimento encontrado. Tente outro termo de busca.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {alimentoSelecionado && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h4 className="font-medium text-gray-900 mb-2">{alimentoSelecionado.nome}</h4>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-500">Grupo: {alimentoSelecionado.grupo}</p>
                  <p className="text-sm text-gray-500">Medida: {alimentoSelecionado.medida} ({alimentoSelecionado.gramas}g)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Calorias: {alimentoSelecionado.calorias} kcal</p>
                  <p className="text-sm text-gray-500">Proteínas: {alimentoSelecionado.proteinas}g</p>
                  <p className="text-sm text-gray-500">Carboidratos: {alimentoSelecionado.carboidratos}g</p>
                  <p className="text-sm text-gray-500">Gorduras: {alimentoSelecionado.gorduras}g</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700 mr-3">
                  Quantidade:
                </label>
                <input
                  type="number"
                  id="quantidade"
                  min="0.5"
                  step="0.5"
                  className="focus:ring-teal-500 focus:border-teal-500 block w-20 pl-3 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                  value={quantidade}
                  onChange={(e) => setQuantidade(parseFloat(e.target.value) || 1)}
                />
                <span className="ml-2 text-sm text-gray-500">{alimentoSelecionado.medida}</span>
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-900">Total com quantidade selecionada:</p>
                <p className="text-sm text-gray-500">Calorias: {(alimentoSelecionado.calorias * quantidade).toFixed(1)} kcal</p>
                <p className="text-sm text-gray-500">Proteínas: {(alimentoSelecionado.proteinas * quantidade).toFixed(1)}g</p>
                <p className="text-sm text-gray-500">Carboidratos: {(alimentoSelecionado.carboidratos * quantidade).toFixed(1)}g</p>
                <p className="text-sm text-gray-500">Gorduras: {(alimentoSelecionado.gorduras * quantidade).toFixed(1)}g</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mr-3"
              onClick={() => setMostrarModalAlimento(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              onClick={() => alimentoSelecionado && adicionarAlimento(alimentoSelecionado, quantidade)}
              disabled={!alimentoSelecionado}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de navegação superior */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-teal-600 text-xl font-bold">NutriSaaS</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Pacientes
                </a>
                <a href="#" className="border-teal-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Planos Alimentares
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Alimentos
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Receitas
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <span className="sr-only">Ver notificações</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="ml-3 relative">
                <div>
                  <button className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    <span className="sr-only">Abrir menu de usuário</span>
                    <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                      JS
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Conteúdo principal */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Novo Plano Alimentar</h1>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="paciente" className="block text-sm font-medium text-gray-700">
                    Paciente
                  </label>
                  <div className="mt-1">
                    <select
                      id="paciente"
                      name="paciente"
                      className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={pacienteSelecionado}
                      onChange={(e) => setPacienteSelecionado(e.target.value)}
                    >
                      <option value="">Selecione um paciente</option>
                      {pacientes.map((paciente) => (
                        <option key={paciente.id} value={paciente.id}>
                          {paciente.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="nome-plano" className="block text-sm font-medium text-gray-700">
                    Nome do Plano
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="nome-plano"
                      id="nome-plano"
                      className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Ex: Plano de Emagrecimento"
                      value={nomePlano}
                      onChange={(e) => setNomePlano(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Resumo Nutricional */}
          <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Resumo Nutricional</h3>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
                {(() => {
                  const totais = calcularTotaisPlano();
                  return (
                    <>
                      <div className="bg-teal-50 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <dt className="text-sm font-medium text-teal-500 truncate">
                            Calorias Totais
                          </dt>
                          <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            {totais.calorias.toFixed(0)} kcal
                          </dd>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <dt className="text-sm font-medium text-blue-500 truncate">
                            Proteínas
                          </dt>
                          <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            {totais.proteinas.toFixed(1)}g
                          </dd>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <dt className="text-sm font-medium text-yellow-500 truncate">
                            Carboidratos
                          </dt>
                          <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            {totais.carboidratos.toFixed(1)}g
                          </dd>
                        </div>
                      </div>
                      
                      <div className="bg-red-50 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <dt className="text-sm font-medium text-red-500 truncate">
                            Gorduras
                          </dt>
                          <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            {totais.gorduras.toFixed(1)}g
                          </dd>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
          
          {/* Refeições */}
          <div className="mt-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Refeições</h3>
            <div className="mt-3 space-y-6">
              {refeicoes.map((refeicao) => {
                const totaisRefeicao = calcularTotaisRefeicao(refeicao.id);
                
                return (
                  <div key={refeicao.id} className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {refeicao.nome} - {refeicao.horario}
                          </h3>
                          <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            {totaisRefeicao.calorias.toFixed(0)} kcal | Proteínas: {totaisRefeicao.proteinas.toFixed(1)}g | 
                            Carboidratos: {totaisRefeicao.carboidratos.toFixed(1)}g | Gorduras: {totaisRefeicao.gorduras.toFixed(1)}g
                          </p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          onClick={() => {
                            setRefeicaoAtual(refeicao.id);
                            setMostrarModalAlimento(true);
                          }}
                        >
                          <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                          Adicionar Alimento
                        </button>
                      </div>
                    </div>
                    
                    {refeicao.alimentos.length > 0 ? (
                      <div className="border-t border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Alimento
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantidade
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
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Ações</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {refeicao.alimentos.map((alimento, index) => (
                              <tr key={`${refeicao.id}-${alimento.id}-${index}`}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {alimento.nome}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {alimento.quantidade} {alimento.medida} ({alimento.gramasTotal}g)
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {alimento.caloriasTotal.toFixed(0)} kcal
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {alimento.proteinasTotal.toFixed(1)}g
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {alimento.carboidratosTotal.toFixed(1)}g
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {alimento.gordurasTotal.toFixed(1)}g
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    onClick={() => removerAlimento(refeicao.id, index)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Remover
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="px-4 py-5 sm:p-6 text-center text-sm text-gray-500">
                        Nenhum alimento adicionado a esta refeição.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Botões de ação */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mr-3"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Salvar Plano
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal para adicionar alimento */}
      <ModalAdicionarAlimento />
    </div>
  );
};

export default PlanoAlimentar;
