// Protótipo de Dashboard para SaaS de Gestão Nutricional
// Este código implementa a interface do Dashboard inicial

import React, { useState } from 'react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Componente principal do Dashboard
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('visaoGeral');
  
  // Dados simulados para os gráficos
  const pacientesData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Novos Pacientes',
        data: [5, 8, 12, 9, 11, 14],
        borderColor: '#0D9488',
        backgroundColor: 'rgba(13, 148, 136, 0.2)',
        tension: 0.4,
      },
    ],
  };
  
  const planosData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Planos Criados',
        data: [12, 19, 15, 22, 18, 25],
        backgroundColor: '#0EA5E9',
      },
    ],
  };
  
  const macronutrientesData = {
    labels: ['Proteínas', 'Carboidratos', 'Gorduras'],
    datasets: [
      {
        data: [25, 55, 20],
        backgroundColor: ['#0D9488', '#0EA5E9', '#F59E0B'],
      },
    ],
  };
  
  // Lista de pacientes recentes
  const pacientesRecentes = [
    { id: 1, nome: 'Maria Silva', data: '15/04/2025', status: 'Ativo' },
    { id: 2, nome: 'João Santos', data: '12/04/2025', status: 'Ativo' },
    { id: 3, nome: 'Ana Oliveira', data: '10/04/2025', status: 'Pendente' },
    { id: 4, nome: 'Carlos Pereira', data: '08/04/2025', status: 'Ativo' },
    { id: 5, nome: 'Juliana Costa', data: '05/04/2025', status: 'Inativo' },
  ];
  
  // Lista de planos recentes
  const planosRecentes = [
    { id: 1, paciente: 'Maria Silva', nome: 'Plano Emagrecimento', data: '15/04/2025' },
    { id: 2, paciente: 'João Santos', nome: 'Plano Hipertrofia', data: '12/04/2025' },
    { id: 3, paciente: 'Ana Oliveira', nome: 'Plano Diabetes', data: '10/04/2025' },
    { id: 4, paciente: 'Carlos Pereira', nome: 'Plano Manutenção', data: '08/04/2025' },
    { id: 5, paciente: 'Juliana Costa', nome: 'Plano Detox', data: '05/04/2025' },
  ];
  
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
                <a href="#" className="border-teal-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Pacientes
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
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
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cards de métricas */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-teal-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total de Pacientes
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          47
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Planos Ativos
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          32
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Consultas Pendentes
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          8
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Receitas Cadastradas
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          124
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="mt-8">
            <div className="sm:hidden">
              <select
                className="block w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="visaoGeral">Visão Geral</option>
                <option value="pacientes">Pacientes Recentes</option>
                <option value="planos">Planos Recentes</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('visaoGeral')}
                    className={`${
                      activeTab === 'visaoGeral'
                        ? 'border-teal-500 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Visão Geral
                  </button>
                  <button
                    onClick={() => setActiveTab('pacientes')}
                    className={`${
                      activeTab === 'pacientes'
                        ? 'border-teal-500 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Pacientes Recentes
                  </button>
                  <button
                    onClick={() => setActiveTab('planos')}
                    className={`${
                      activeTab === 'planos'
                        ? 'border-teal-500 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Planos Recentes
                  </button>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Conteúdo das tabs */}
          <div className="mt-6">
            {activeTab === 'visaoGeral' && (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Novos Pacientes</h3>
                    <div className="mt-4 h-64">
                      <Line 
                        data={pacientesData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                          },
                        }} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Planos Criados</h3>
                    <div className="mt-4 h-64">
                      <Bar 
                        data={planosData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                          },
                        }} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Distribuição de Macronutrientes</h3>
                    <div className="mt-4 h-64 flex justify-center">
                      <div style={{ width: '50%' }}>
                        <Pie 
                          data={macronutrientesData} 
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'bottom',
                              },
                            },
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
      
(Content truncated due to size limit. Use line ranges to read in chunks)