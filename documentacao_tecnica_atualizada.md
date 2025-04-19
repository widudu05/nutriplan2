# Documentação Técnica Atualizada - NutriPlan SaaS

## Visão Geral

O NutriPlan é um Sistema de Gestão Nutricional (SaaS) desenvolvido para nutricionistas gerenciarem seus pacientes, planos alimentares, consultas e relatórios de forma eficiente e intuitiva. A aplicação foi projetada com foco na experiência do usuário, utilizando tecnologias modernas para garantir desempenho, escalabilidade e facilidade de uso.

## Arquitetura

O sistema segue uma arquitetura modular baseada em componentes, facilitando a manutenção e expansão. A estrutura atual é composta por:

### Frontend
- HTML5 para estruturação
- CSS3 com TailwindCSS para estilização
- JavaScript vanilla para interatividade
- Chart.js para visualizações gráficas

### Backend (Planejado)
- Node.js com Express para API RESTful
- PostgreSQL para armazenamento de dados
- Autenticação JWT para segurança

## Estrutura de Arquivos

```
nutriplan2/
├── index.html              # Página principal da aplicação
├── styles.css              # Estilos globais
├── js/                     # Scripts JavaScript modularizados
│   ├── navigation.js       # Navegação entre seções
│   ├── modules.js          # Módulos funcionais principais
│   ├── charts.js           # Configuração e inicialização de gráficos
│   ├── calendar.js         # Funcionalidade de calendário e agendamento
│   ├── dashboard.js        # Interatividade do dashboard
│   ├── agendamento.js      # Funcionalidade completa de agendamento
│   ├── planos.js           # Funcionalidade de planos alimentares
│   └── profile.js          # Ações do perfil de usuário
├── arquitetura_saas.md     # Documentação da arquitetura
├── documentacao_tecnica_saas.md  # Documentação técnica original
└── estrutura_banco_dados.md      # Estrutura do banco de dados
```

## Módulos Principais

### 1. Dashboard

O dashboard apresenta uma visão geral do sistema com estatísticas importantes e gráficos interativos:

- **Cards Estatísticos**: Total de pacientes, planos ativos, consultas agendadas e média de perda de peso
- **Gráficos**: Evolução de pacientes e distribuição por objetivo
- **Listas**: Consultas recentes e tarefas pendentes

Todos os elementos do dashboard são interativos e redirecionam para as seções correspondentes quando clicados.

### 2. Pacientes

Módulo para gerenciamento completo de pacientes:

- Cadastro e edição de informações
- Visualização de histórico
- Acompanhamento de progresso
- Agendamento de consultas

### 3. Planos Alimentares

Módulo para criação e gerenciamento de planos alimentares personalizados:

- Interface para criação de planos com múltiplas refeições
- Filtros para busca de planos por paciente, tipo ou status
- Visualização detalhada de cada plano
- Edição e exclusão de planos

### 4. Banco de Alimentos

Catálogo de alimentos com informações nutricionais:

- Busca e filtragem de alimentos
- Adição de novos alimentos
- Categorização por grupos alimentares

### 5. Receitas

Biblioteca de receitas saudáveis:

- Cadastro de novas receitas
- Cálculo automático de informações nutricionais
- Associação com planos alimentares

### 6. Relatórios

Geração de relatórios e análises:

- Progresso dos pacientes
- Eficácia dos planos alimentares
- Estatísticas de consultas

### 7. Agendamento

Sistema completo de agendamento de consultas:

- Calendário interativo
- Integração com Google Calendar
- Visualização de consultas agendadas
- Notificações de lembretes

## Funcionalidades Implementadas

### Navegação

- Barra de navegação superior com acesso a todos os módulos
- Sistema de navegação entre seções sem recarregar a página
- Indicação visual da seção atual

### Dashboard Interativo

- Cards estatísticos clicáveis que redirecionam para seções específicas
- Tooltips informativos ao passar o mouse sobre os elementos
- Gráficos interativos com informações detalhadas

### Sistema de Agendamento

- Calendário interativo para visualização e marcação de consultas
- Modal para agendamento com campos para paciente, tipo, data e hora
- Integração com Google Calendar para sincronização de eventos
- Lista de consultas agendadas com opções de edição e cancelamento

### Planos Alimentares

- Interface completa para criação e edição de planos
- Sistema de filtros para busca de planos
- Visualização detalhada de cada plano com todas as refeições
- Ações para visualizar, editar e excluir planos

### Perfil do Usuário

- Menu dropdown ao clicar na imagem do perfil
- Acesso a informações do perfil, configurações e opção de logout
- Modal detalhado com informações pessoais e estatísticas
- Configurações de conta, notificações e preferências

### Sistema de Notificações

- Ícone de notificações com contador
- Menu dropdown com lista de notificações recentes
- Categorização visual por tipo de notificação

## Melhorias Recentes

### 1. Interface Visual

- Cor verde na barra de navegação para alinhamento com a identidade visual do NutriSaaS
- Design responsivo para adaptação a diferentes dispositivos
- Elementos interativos com feedback visual (hover, active states)

### 2. Interatividade

- Cards do dashboard com ações ao serem clicados
- Tooltips informativos nos elementos principais
- Modais interativos para ações complexas

### 3. Novas Funcionalidades

- Aba de Agendamento completa com calendário e integração Google Calendar
- Conteúdo detalhado para a página de Planos Alimentares
- Ações para o perfil do usuário com menus dropdown e modais

### 4. Usabilidade

- Navegação intuitiva entre as seções
- Feedback visual para ações do usuário
- Confirmações para ações críticas (exclusão, logout)

## Tecnologias Utilizadas

- **HTML5**: Estruturação semântica do conteúdo
- **CSS3/TailwindCSS**: Framework de utilidades CSS para estilização rápida e consistente
- **JavaScript**: Linguagem de programação para interatividade do lado do cliente
- **Chart.js**: Biblioteca para criação de gráficos interativos
- **Google Calendar API**: Integração para sincronização de eventos

## Integração com Serviços Externos

- **Google Calendar**: Sincronização de consultas agendadas
- **Serviços de E-mail** (planejado): Envio de lembretes e notificações

## Requisitos do Sistema

### Cliente
- Navegador moderno com suporte a ES6+ (Chrome, Firefox, Safari, Edge)
- Conexão com internet

### Servidor (Planejado)
- Node.js 14+
- PostgreSQL 12+
- 2GB RAM mínimo
- 10GB de espaço em disco

## Plano de Implementação Backend

O backend será implementado em fases:

1. **Fase 1**: Autenticação e gerenciamento de usuários
2. **Fase 2**: API para pacientes e consultas
3. **Fase 3**: API para planos alimentares e banco de alimentos
4. **Fase 4**: Sistema de relatórios e análises
5. **Fase 5**: Integrações com serviços externos

## Considerações de Segurança

- Autenticação JWT para proteção de rotas
- Validação de dados em frontend e backend
- Sanitização de inputs para prevenção de XSS
- HTTPS para comunicação segura
- Proteção contra CSRF

## Próximos Passos

1. Implementação do backend com Node.js e Express
2. Integração com banco de dados PostgreSQL
3. Sistema de autenticação e autorização
4. Migração para arquitetura de componentes React
5. Implementação de testes automatizados
6. Otimização de performance

---

## Apêndice: Guia de Desenvolvimento

### Adicionando Novos Módulos

Para adicionar um novo módulo:

1. Criar arquivo JavaScript na pasta `js/`
2. Adicionar referência no `index.html`
3. Implementar função de inicialização no evento `DOMContentLoaded`
4. Adicionar link na barra de navegação

### Convenções de Código

- Nomes de funções em camelCase
- Nomes de constantes em UPPER_CASE
- Comentários para funções complexas
- Modularização de código por funcionalidade

### Processo de Build (Planejado)

- Webpack para bundling
- Babel para transpilação
- PostCSS para processamento de CSS
- Minificação para produção

---

Documentação atualizada em: 19 de Abril de 2025
