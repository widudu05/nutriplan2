# Documentação Técnica Atualizada - SaaS NutriPlan

## Sumário

1. [Introdução](#introdução)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Estrutura de Arquivos](#estrutura-de-arquivos)
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [Componentes Principais](#componentes-principais)
6. [Funcionalidades Implementadas](#funcionalidades-implementadas)
7. [Guia de Instalação](#guia-de-instalação)
8. [Guia de Desenvolvimento](#guia-de-desenvolvimento)
9. [Melhorias Recentes](#melhorias-recentes)
10. [Melhorias Futuras](#melhorias-futuras)
11. [Referências](#referências)

## Introdução

O SaaS NutriPlan é uma plataforma web desenvolvida para nutricionistas e profissionais da área de saúde, permitindo o gerenciamento completo de pacientes, criação de planos alimentares personalizados, cálculos nutricionais automáticos, e acompanhamento de resultados.

Este sistema foi desenvolvido com base na planilha Excel "Plano Alimentar", transformando suas funcionalidades em uma aplicação web moderna, acessível e escalável.

### Objetivos do Sistema

- Facilitar a gestão de pacientes e seus dados clínicos
- Automatizar a criação de planos alimentares personalizados
- Calcular automaticamente valores nutricionais com base em banco de dados de alimentos
- Gerar relatórios e visualizações para acompanhamento de resultados
- Permitir o gerenciamento de receitas e listas de compras
- Oferecer uma interface intuitiva e responsiva para uso em diferentes dispositivos

## Arquitetura do Sistema

O SaaS NutriPlan foi implementado inicialmente como uma aplicação frontend estática, com planos para evolução para uma arquitetura completa de três camadas:

### Camada de Apresentação (Frontend) - Implementada
- **Tecnologias**: HTML5, CSS3, JavaScript
- **Frameworks/Bibliotecas**: TailwindCSS, Chart.js
- **Estrutura**: Arquitetura modular com separação de responsabilidades

### Camada de Aplicação (Backend) - Planejada para Implementação Futura
- **Tecnologias**: Node.js
- **Framework**: Express.js
- **API**: RESTful API para comunicação com o frontend

### Camada de Dados - Planejada para Implementação Futura
- **Banco de Dados**: PostgreSQL
- **ORM**: Sequelize para mapeamento objeto-relacional

### Diagrama de Arquitetura Atual

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                  Frontend Estático                      │
│                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │             │    │             │    │             │  │
│  │    HTML     │    │     CSS     │    │  JavaScript │  │
│  │             │    │             │    │             │  │
│  └─────────────┘    └─────────────┘    └─────────────┘  │
│                                                         │
│  ┌─────────────┐    ┌─────────────┐                     │
│  │             │    │             │                     │
│  │ TailwindCSS │    │   Chart.js  │                     │
│  │             │    │             │                     │
│  └─────────────┘    └─────────────┘                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Diagrama de Arquitetura Futura Planejada

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│    Frontend     │◄───►│     Backend     │◄───►│  Banco de Dados │
│    (React.js)   │     │   (Node.js)     │     │  (PostgreSQL)   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Estrutura de Arquivos

A estrutura de arquivos do projeto foi reorganizada para melhor modularidade e manutenção:

```
/nutriplan2_melhorado/
├── index.html              # Página principal da aplicação
├── styles.css              # Estilos CSS personalizados
├── app.js                  # Arquivo JavaScript principal (legado)
├── js/                     # Diretório de scripts JavaScript modularizados
│   ├── navigation.js       # Lógica de navegação entre seções
│   ├── modules.js          # Módulos funcionais (pacientes, alimentos, etc.)
│   ├── charts.js           # Configuração e inicialização de gráficos
│   ├── calendar.js         # Funcionalidade de agendamento com Google Calendar
│   └── dashboard.js        # Interatividade do dashboard
├── arquitetura_saas.md     # Documentação da arquitetura planejada
├── documentacao_tecnica.md # Documentação técnica original
├── documentacao_tecnica_atualizada.md # Documentação técnica atualizada
├── estrutura_banco_dados.md # Estrutura do banco de dados planejado
├── interface_usuario.md    # Documentação da interface do usuário
├── melhorias_sugeridas.md  # Documentação de melhorias sugeridas
├── ajustes_realizados.md   # Documentação dos ajustes implementados
└── README.md               # Informações gerais do projeto
```

## Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura da página
- **CSS3**: Estilização
- **JavaScript**: Lógica de interação e funcionalidades
- **TailwindCSS**: Framework CSS para design responsivo
- **Chart.js**: Biblioteca para criação de gráficos e visualizações

### Ambiente de Desenvolvimento
- **Node.js**: Ambiente de execução JavaScript
- **npm**: Gerenciador de pacotes
- **http-server**: Servidor local para desenvolvimento

### Implantação
- **Vercel/Netlify**: Plataformas de hospedagem estática (recomendadas)

## Componentes Principais

### 1. Sistema de Navegação
O sistema de navegação foi implementado para permitir a transição entre diferentes seções da aplicação sem recarregar a página.

**Arquivo**: `js/navigation.js`

**Funcionalidades**:
- Navegação entre seções (Dashboard, Pacientes, Planos, etc.)
- Suporte a navegação responsiva (desktop e mobile)
- Gerenciamento de estado ativo das seções

### 2. Módulos Funcionais
Os módulos funcionais foram separados para melhor organização e manutenção do código.

**Arquivo**: `js/modules.js`

**Módulos Implementados**:
- Módulo de Pacientes
- Módulo de Banco de Alimentos
- Módulo de Receitas
- Módulo de Relatórios

### 3. Sistema de Visualização
O sistema de visualização utiliza Chart.js para criar gráficos interativos.

**Arquivo**: `js/charts.js`

**Gráficos Implementados**:
- Gráfico de evolução de pacientes
- Gráfico de objetivos dos pacientes
- Gráfico de distribuição de macronutrientes

### 4. Sistema de Agendamento
O sistema de agendamento permite integração com o Google Calendar para gerenciar consultas.

**Arquivo**: `js/calendar.js`

**Funcionalidades**:
- Modal de agendamento de consultas
- Integração com Google Calendar
- Notificações de agendamento bem-sucedido

### 5. Dashboard Interativo
O dashboard interativo permite navegação rápida para diferentes seções da aplicação.

**Arquivo**: `js/dashboard.js`

**Funcionalidades**:
- Cards interativos que redirecionam para seções correspondentes
- Gráficos clicáveis para análises detalhadas
- Listas de consultas e tarefas interativas

## Funcionalidades Implementadas

### 1. Dashboard
- Visão geral com métricas principais
- Gráficos de evolução e distribuição
- Cards de estatísticas rápidas
- Interatividade com redirecionamento para seções correspondentes

### 2. Gestão de Pacientes
- Listagem de pacientes
- Busca e filtragem
- Visualização de detalhes do paciente
- Agendamento de consultas com integração ao Google Calendar

### 3. Banco de Alimentos
- Listagem de alimentos com informações nutricionais
- Busca e filtragem por categoria
- Visualização de detalhes nutricionais

### 4. Receitas
- Listagem de receitas
- Visualização de informações nutricionais por porção
- Categorização de receitas

### 5. Relatórios
- Interface para geração de relatórios
- Seleção de parâmetros e filtros
- Opções de exportação

## Guia de Instalação

### Requisitos
- Node.js (v14.x ou superior)
- npm (v6.x ou superior)

### Instalação Local

1. Clone o repositório
   ```bash
   git clone https://github.com/widudu05/nutriplan2.git
   cd nutriplan2_melhorado
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento
   ```bash
   npm start
   ```

4. Acesse a aplicação em seu navegador
   ```
   http://localhost:8080
   ```

### Implantação em Produção

#### Opção 1: Vercel/Netlify (Recomendado)
1. Conecte seu repositório GitHub à plataforma Vercel ou Netlify
2. Configure as opções de build (não necessárias para site estático)
3. Deploy automático a partir do branch principal

#### Opção 2: Servidor Web Tradicional
1. Execute o build da aplicação (se necessário)
2. Copie os arquivos para o diretório do servidor web
3. Configure o servidor para servir os arquivos estáticos

## Guia de Desenvolvimento

### Estrutura de Desenvolvimento

O projeto segue uma estrutura modular para facilitar o desenvolvimento e manutenção:

1. **HTML (`index.html`)**: Contém a estrutura da página e os containers para os diferentes módulos
2. **CSS (`styles.css`)**: Contém estilos personalizados além do TailwindCSS
3. **JavaScript Modular**:
   - `navigation.js`: Gerencia a navegação entre seções
   - `modules.js`: Implementa os módulos funcionais
   - `charts.js`: Configura e inicializa os gráficos
   - `calendar.js`: Implementa a funcionalidade de agendamento
   - `dashboard.js`: Implementa a interatividade do dashboard

### Adicionando Novos Módulos

Para adicionar um novo módulo funcional:

1. Crie um container no `index.html`:
   ```html
   <div id="novo-modulo-content" class="page-content">
     <div id="novo-modulo-container"></div>
   </div>
   ```

2. Adicione um link de navegação:
   ```html
   <a href="#" class="nav-link" data-target="novo-modulo">Novo Módulo</a>
   ```

3. Implemente a função de carregamento no `modules.js`:
   ```javascript
   function loadNovoModulo() {
     const novoModuloContainer = document.getElementById('novo-modulo-container');
     if (!novoModuloContainer) return;
     
     // Implementação do módulo
     const novoModuloHTML = `
       <!-- HTML do novo módulo -->
     `;
     novoModuloContainer.innerHTML = novoModuloHTML;
   }
   ```

4. Atualize o sistema de navegação em `navigation.js` para incluir o novo módulo

### Boas Práticas

1. **Modularidade**: Mantenha o código organizado em módulos com responsabilidades bem definidas
2. **Comentários**: Documente o código adequadamente, especialmente em funções complexas
3. **Consistência**: Siga os padrões de estilo e nomenclatura existentes
4. **Responsividade**: Teste em diferentes tamanhos de tela ao desenvolver novas interfaces
5. **Performance**: Otimize o carregamento e renderização, especialmente para gráficos e tabelas grandes

## Melhorias Recentes

### 1. Alinhamento da Barra de Navegação
- Alinhamento dos itens da barra superior com o logo NutriSaaS
- Melhoria na responsividade da barra de navegação
- Ajustes visuais para melhor experiência do usuário

### 2. Funcionalidade de Agendamento
- Implementação de funcionalidade de agendamento de consultas
- Integração com Google Calendar para gerenciamento de agenda
- Modal interativo para preenchimento de informações da consulta
- Notificações de confirmação de agendamento

### 3. Dashboard Interativo
- Cards do dashboard agora são clicáveis e redirecionam para seções correspondentes
- Gráficos interativos que levam para análises detalhadas
- Listas de consultas recentes e tarefas pendentes com interatividade
- Checkboxes funcionais para gerenciamento de tarefas

## Melhorias Futuras

Consulte o arquivo `melhorias_sugeridas.md` para uma lista detalhada de melhorias potenciais, incluindo:

1. Implementação do backend em Node.js/Express
2. Integração com banco de dados PostgreSQL
3. Migração para arquitetura de componentes React
4. Melhorias de interface e experiência do usuário
5. Implementação de funcionalidades avançadas
6. Melhorias técnicas e de segurança

## Referências

1. [Documentação do TailwindCSS](https://tailwindcss.com/docs)
2. [Documentação do Chart.js](https://www.chartjs.org/docs/latest/)
3. [Documentação da API do Google Calendar](https://developers.google.com/calendar)
4. [Tabela TACO - Tabela Brasileira de Composição de Alimentos](https://www.cfn.org.br/wp-content/uploads/2017/03/taco_4_edicao_ampliada_e_revisada.pdf)
5. [Documentação do Node.js](https://nodejs.org/en/docs/)
6. [Documentação do Express.js](https://expressjs.com/)
7. [Documentação do PostgreSQL](https://www.postgresql.org/docs/)
