# Documentação Técnica - SaaS de Gestão Nutricional

## Introdução

Este documento apresenta a documentação técnica completa do SaaS de Gestão Nutricional, uma aplicação web desenvolvida para nutricionistas gerenciarem planos alimentares personalizados para seus pacientes. O sistema foi projetado com base na análise da planilha Excel "Plano Alimentar" e nos requisitos especificados.

## Visão Geral do Sistema

O SaaS de Gestão Nutricional é uma aplicação web multiusuário que permite aos nutricionistas:

- Gerenciar cadastros de pacientes
- Criar e editar planos alimentares personalizados
- Acessar banco de dados de alimentos (TACO e IBGE)
- Gerenciar receitas personalizadas
- Gerar listas de compras
- Produzir relatórios nutricionais
- Manter biblioteca de favoritos

## Arquitetura do Sistema

### Stack Tecnológico

- **Frontend**: React.js com Tailwind CSS
- **Backend**: Node.js com Express.js
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (JSON Web Tokens)
- **Hospedagem**: Vercel (frontend), Heroku (backend), Supabase (banco de dados)

### Diagrama de Arquitetura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│    Frontend     │◄────┤     Backend     │◄────┤   Banco de      │
│    (React.js)   │     │   (Node.js)     │     │     Dados       │
│                 │────►│                 │────►│  (PostgreSQL)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                       ▲                       ▲
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Autenticação   │     │   Serviços      │     │   Backup e      │
│     (JWT)       │     │   Externos      │     │   Replicação    │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Componentes Principais

1. **Frontend (Cliente)**
   - Interface de usuário responsiva
   - Gerenciamento de estado com React Context API
   - Comunicação com backend via API RESTful
   - Validação de formulários
   - Visualização de dados e gráficos

2. **Backend (Servidor)**
   - API RESTful
   - Controladores para cada módulo funcional
   - Middleware de autenticação e autorização
   - Validação de dados
   - Lógica de negócio

3. **Banco de Dados**
   - Esquemas relacionais
   - Procedimentos armazenados
   - Índices otimizados
   - Backup automático

## Estrutura do Banco de Dados

O banco de dados PostgreSQL está organizado em cinco esquemas principais:

1. **auth** - Autenticação e autorização
2. **core** - Entidades principais do sistema
3. **nutrition** - Dados nutricionais e alimentos
4. **plan** - Planos alimentares e refeições
5. **config** - Configurações do sistema

### Diagrama ER Simplificado

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│    users      │       │   patients    │       │  meal_plans   │
├───────────────┤       ├───────────────┤       ├───────────────┤
│ id            │       │ id            │       │ id            │
│ email         │       │ user_id       │──┐    │ patient_id    │──┐
│ password_hash │       │ name          │  │    │ name          │  │
│ name          │       │ gender        │  │    │ start_date    │  │
│ role          │       │ birth_date    │  │    │ end_date      │  │
└───────┬───────┘       └───────────────┘  │    └───────────────┘  │
        │                                  │                        │
        │                                  │                        │
        │       ┌───────────────┐          │    ┌───────────────┐   │
        └───────┤ user_profiles │          │    │     meals     │   │
                ├───────────────┤          │    ├───────────────┤   │
                │ id            │          │    │ id            │   │
                │ user_id       │          │    │ meal_plan_id  │───┘
                │ company_name  │          │    │ meal_type_id  │
                │ preferences   │          │    │ name          │
                └───────────────┘          │    └──────┬────────┘
                                           │           │
                                           │           │
┌───────────────┐       ┌───────────────┐  │    ┌──────┴────────┐
│     foods     │       │    recipes    │  │    │  meal_items   │
├───────────────┤       ├───────────────┤  │    ├───────────────┤
│ id            │       │ id            │  │    │ id            │
│ group_id      │       │ user_id       │──┘    │ meal_id       │
│ name          │       │ name          │       │ food_id       │
│ calories      │       │ instructions  │       │ recipe_id     │
│ protein       │       └──────┬────────┘       │ measure_id    │
└──────┬────────┘              │                │ quantity      │
       │                       │                └───────────────┘
       │                       │
       │                       │
┌──────┴────────┐       ┌──────┴────────┐
│ food_measures │       │recipe_ingredients│
├───────────────┤       ├───────────────┤
│ id            │       │ id            │
│ food_id       │       │ recipe_id     │
│ measure_id    │       │ food_id       │
│ grams         │       │ measure_id    │
└───────────────┘       │ quantity      │
                        └───────────────┘
```

### Principais Tabelas

- **users**: Armazena informações de usuários (nutricionistas)
- **patients**: Cadastro de pacientes
- **meal_plans**: Planos alimentares
- **meals**: Refeições dentro de um plano
- **meal_items**: Alimentos ou receitas em uma refeição
- **foods**: Banco de dados de alimentos (TACO/IBGE)
- **recipes**: Receitas personalizadas
- **food_measures**: Medidas caseiras para alimentos

## API RESTful

A API do sistema segue os princípios RESTful e está organizada nos seguintes endpoints:

### Autenticação

- `POST /api/auth/login` - Autenticação de usuário
- `POST /api/auth/register` - Registro de novo usuário
- `POST /api/auth/refresh-token` - Renovação de token
- `POST /api/auth/forgot-password` - Recuperação de senha

### Pacientes

- `GET /api/patients` - Listar pacientes
- `GET /api/patients/:id` - Obter paciente específico
- `POST /api/patients` - Criar novo paciente
- `PUT /api/patients/:id` - Atualizar paciente
- `DELETE /api/patients/:id` - Remover paciente

### Planos Alimentares

- `GET /api/meal-plans` - Listar planos alimentares
- `GET /api/meal-plans/:id` - Obter plano específico
- `POST /api/meal-plans` - Criar novo plano
- `PUT /api/meal-plans/:id` - Atualizar plano
- `DELETE /api/meal-plans/:id` - Remover plano

### Alimentos

- `GET /api/foods` - Listar alimentos
- `GET /api/foods/:id` - Obter alimento específico
- `GET /api/foods/search` - Buscar alimentos

### Receitas

- `GET /api/recipes` - Listar receitas
- `GET /api/recipes/:id` - Obter receita específica
- `POST /api/recipes` - Criar nova receita
- `PUT /api/recipes/:id` - Atualizar receita
- `DELETE /api/recipes/:id` - Remover receita

### Listas de Compras

- `GET /api/shopping-lists` - Listar listas de compras
- `GET /api/shopping-lists/:id` - Obter lista específica
- `POST /api/shopping-lists` - Criar nova lista
- `PUT /api/shopping-lists/:id` - Atualizar lista
- `DELETE /api/shopping-lists/:id` - Remover lista

### Favoritos

- `GET /api/favorites` - Listar favoritos
- `POST /api/favorites` - Adicionar favorito
- `DELETE /api/favorites/:id` - Remover favorito

## Frontend

### Estrutura de Componentes

O frontend está organizado em componentes reutilizáveis:

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Table.jsx
│   │   └── ...
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── dashboard/
│   │   ├── MetricCard.jsx
│   │   ├── ActivityFeed.jsx
│   │   ├── Charts.jsx
│   │   └── ...
│   ├── patients/
│   │   ├── PatientForm.jsx
│   │   ├── PatientList.jsx
│   │   ├── PatientDetails.jsx
│   │   └── ...
│   ├── meal-plans/
│   │   ├── MealPlanForm.jsx
│   │   ├── MealList.jsx
│   │   ├── FoodSelector.jsx
│   │   └── ...
│   └── ...
├── pages/
│   ├── Dashboard.jsx
│   ├── Patients.jsx
│   ├── MealPlans.jsx
│   ├── Foods.jsx
│   ├── Recipes.jsx
│   └── ...
├── contexts/
│   ├── AuthContext.jsx
│   ├── PatientContext.jsx
│   ├── MealPlanContext.jsx
│   └── ...
├── hooks/
│   ├── useAuth.js
│   ├── usePatients.js
│   ├── useMealPlans.js
│   └── ...
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── patientService.js
│   ├── mealPlanService.js
│   └── ...
└── utils/
    ├── formatters.js
    ├── validators.js
    ├── calculations.js
    └── ...
```

### Principais Telas

1. **Dashboard**
   - Visão geral do sistema
   - Métricas e estatísticas
   - Atividades recentes
   - Acesso rápido a funcionalidades

2. **Gestão de Pacientes**
   - Lista de pacientes
   - Formulário de cadastro/edição
   - Detalhes do paciente
   - Histórico de medidas

3. **Planos Alimentares**
   - Lista de planos
   - Criação/edição de plano
   - Adição de refeições e alimentos
   - Cálculos nutricionais automáticos

4. **Banco de Alimentos**
   - Busca de alimentos
   - Visualização de informações nutricionais
   - Filtros por grupo alimentar

5. **Receitas**
   - Lista de receitas
   - Criação/edição de receita
   - Adição de ingredientes
   - Cálculo nutricional automático

6. **Listas de Compras**
   - Geração automática
   - Edição manual
   - Compartilhamento

7. **Relatórios**
   - Seleção de tipo de relatório
   - Configuração de parâmetros
   - Visualização prévia
   - Exportação em PDF

## Funcionalidades Implementadas

### Gestão de Pacientes

- Cadastro completo de pacientes
- Armazenamento de dados antropométricos
- Histórico de evolução
- Busca e filtragem

### Planos Alimentares

- Criação de planos personalizados
- Definição de refeições e horários
- Adição de alimentos com medidas caseiras
- Cálculo automático de valores nutricionais
- Substituições de alimentos

### Banco de Alimentos

- Integração com tabelas TACO e IBGE
- Busca por nome ou grupo alimentar
- Visualização de informações nutricionais
- Medidas caseiras com equivalência em gramas

### Receitas

- Criação de receitas personalizadas
- Adição de ingredientes do banco de dados
- Cálculo nutricional automático
- Inclusão em planos alimentares

### Listas de Compras

- Geração automática a partir do plano alimentar
- Organização por categorias
- Compartilhamento via WhatsApp/Email

### Relatórios

- Plano alimentar detalhado
- Resumo de macronutrientes
- Orientações nutricionais
- Exportação em PDF

## Segurança

### Autenticação e Autorização

- Autenticação baseada em JWT
- Controle de acesso baseado em papéis
- Proteção de rotas no frontend e backend
- Renovação automática de tokens

### Proteção de Dados

- Criptografia de senhas com bcrypt
- HTTPS para todas as comunicações
- Validação de entrada de dados
- Proteção contra ataques comuns (CSRF, XSS, SQL Injection)

### Conformidade com LGPD

- Consentimento explícito para coleta de dados
- Acesso e portabilidade de dados
- Política de retenção de dados
- Logs de auditoria para operações sensíveis

## Escalabilidade e Performance

### Otimizações de Frontend

- Code splitting para carregamento sob demanda
- Memoização de componentes
- Virtualização de listas longas
- Lazy loading de imagens

### Otimizações de Backend

- Caching com Redis
- Paginação de resultados
- Índices otimizados no banco de dados
- Compressão de resposta

### Infraestrutura

- Arquitetura sem estado (stateless)
- Balanceamento de carga
- CDN para assets estáticos
- Escalabilidade horizontal

## Integração e Implantação Contínua (CI/CD)

### Pipeline de Desenvolvimento

1. **Desenvolvimento Local**
   - Ambiente de desenvolvimento com dados de teste
   - Testes unitários e de integração

2. **Ambiente de Staging**
   - Implantação automática após aprovação de PR
   - Testes de aceitação automatizados
   - Validação de performance

3. **Produção**
   - Implantação controlada
   - Monitoramento de erros
   - Rollback automatizado em caso de falha

### Ferramentas de CI/CD

- GitHub Actions para automação
- Jest para testes unitários
- Cypress para testes end-to-end
- Sentry para monitoramento de erros

## Monitoramento e Logging

### Métricas de Sistema

- Tempo de resposta da API
- Uso de CPU e memória
- Tempo de consulta ao banco de dados
- Taxa de erro

### Logs

- Logs estruturados em JSON
- Níveis de log (debug, info, warn, error)
- Agregação centralizada
- Retenção configurável

## Backup e Recuperação

### Estratégia de Backup

- Backup completo diário
- Backup incremental a cada 6 horas
- Retenção de 30 dias
- Armazenamento em múltiplas regiões

### Recuperação de Desastres

- RTO (Recovery Time Objective): 1 hora
- RPO (Recovery Point Objective): 6 horas
- Procedimentos documentados
- Testes regulares de recuperação

## Considerações Futuras

### Melhorias Planejadas

- Integração com dispositivos de monitoramento (smartwatches, balanças inteligentes)
- Aplicativo móvel para pacientes
- Inteligência artificial para sugestões de planos
- Integração com sistemas de telemedicina

### Expansão de Funcionalidades

- Módulo de agendamento de consultas
- Faturamento e gestão financeira
- Comunidade de nutricionistas
- Marketplace de planos alimentares

## Conclusão

O SaaS de Gestão Nutricional foi projetado como uma solução completa para nutricionistas gerenciarem seus pacientes e planos alimentares. A arquitetura modular e escalável permite fácil manutenção e expansão futura, enquanto a interface intuitiva proporciona uma excelente experiência de usuário.

A implementação segue as melhores práticas de desenvolvimento web moderno, com foco em segurança, performance e usabilidade. O sistema está pronto para evolução contínua, com um roadmap claro de melhorias e novas funcionalidades.

---

## Apêndice A: Requisitos de Sistema

### Requisitos de Hardware (Servidor)

- CPU: 2+ núcleos
- RAM: 4GB+ 
- Armazenamento: 20GB+ SSD

### Requisitos de Software

- Node.js 14+
- PostgreSQL 12+
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Conexão à internet estável

## Apêndice B: Glossário

- **TACO**: Tabela Brasileira de Composição de Alimentos
- **IBGE**: Instituto Brasileiro de Geografia e Estatística
- **JWT**: JSON Web Token
- **API**: Application Programming Interface
- **REST**: Representational State Transfer
- **LGPD**: Lei Geral de Proteção de Dados
- **CI/CD**: Continuous Integration/Continuous Deployment
