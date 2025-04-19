# Documentação Técnica - SaaS de Gestão Nutricional

## Sumário

1. [Introdução](#introdução)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Banco de Dados](#banco-de-dados)
4. [Frontend](#frontend)
5. [Backend](#backend)
6. [Funcionalidades Principais](#funcionalidades-principais)
7. [Guia de Instalação](#guia-de-instalação)
8. [Guia do Usuário](#guia-do-usuário)
9. [Manutenção e Suporte](#manutenção-e-suporte)
10. [Referências](#referências)

## Introdução

O SaaS de Gestão Nutricional é uma plataforma web desenvolvida para nutricionistas e profissionais da área de saúde, permitindo o gerenciamento completo de pacientes, criação de planos alimentares personalizados, cálculos nutricionais automáticos, e acompanhamento de resultados.

Este sistema foi desenvolvido com base na planilha Excel "Plano Alimentar", transformando suas funcionalidades em uma aplicação web moderna, acessível e escalável.

### Objetivos do Sistema

- Facilitar a gestão de pacientes e seus dados clínicos
- Automatizar a criação de planos alimentares personalizados
- Calcular automaticamente valores nutricionais com base em banco de dados de alimentos
- Gerar relatórios e visualizações para acompanhamento de resultados
- Permitir o gerenciamento de receitas e listas de compras
- Oferecer uma interface intuitiva e responsiva para uso em diferentes dispositivos

## Arquitetura do Sistema

O SaaS de Gestão Nutricional foi desenvolvido utilizando uma arquitetura moderna de três camadas:

### Camada de Apresentação (Frontend)
- **Tecnologias**: HTML5, CSS3, JavaScript, Tailwind CSS
- **Frameworks**: React.js
- **Bibliotecas**: Chart.js para visualizações gráficas

### Camada de Aplicação (Backend)
- **Tecnologias**: Node.js
- **Framework**: Express.js
- **API**: RESTful API para comunicação com o frontend

### Camada de Dados
- **Banco de Dados**: PostgreSQL
- **ORM**: Sequelize para mapeamento objeto-relacional

### Diagrama de Arquitetura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│    Frontend     │◄───►│     Backend     │◄───►│  Banco de Dados │
│    (React.js)   │     │   (Node.js)     │     │  (PostgreSQL)   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Banco de Dados

O banco de dados do sistema foi projetado para armazenar todas as informações necessárias para o funcionamento do SaaS de Gestão Nutricional.

### Modelo de Dados

#### Tabelas Principais

1. **Usuários**
   - id (PK)
   - nome
   - email
   - senha (hash)
   - tipo (nutricionista, admin)
   - data_criacao
   - ultimo_acesso

2. **Pacientes**
   - id (PK)
   - id_nutricionista (FK)
   - nome
   - email
   - telefone
   - data_nascimento
   - genero
   - altura
   - peso_atual
   - objetivo
   - data_cadastro
   - status

3. **Consultas**
   - id (PK)
   - id_paciente (FK)
   - id_nutricionista (FK)
   - data_hora
   - status
   - observacoes
   - medidas_antropometricas (JSON)

4. **Planos_Alimentares**
   - id (PK)
   - id_paciente (FK)
   - id_nutricionista (FK)
   - nome
   - data_inicio
   - data_fim
   - objetivo
   - calorias_totais
   - proteinas_totais
   - carboidratos_totais
   - gorduras_totais
   - observacoes
   - status

5. **Refeicoes**
   - id (PK)
   - id_plano_alimentar (FK)
   - nome
   - horario
   - calorias
   - proteinas
   - carboidratos
   - gorduras

6. **Alimentos_Refeicao**
   - id (PK)
   - id_refeicao (FK)
   - id_alimento (FK)
   - quantidade
   - unidade_medida
   - calorias
   - proteinas
   - carboidratos
   - gorduras

7. **Alimentos**
   - id (PK)
   - nome
   - categoria
   - calorias_100g
   - proteinas_100g
   - carboidratos_100g
   - gorduras_100g
   - fibras_100g
   - fonte (TACO, IBGE, personalizado)
   - porcao_padrao
   - unidade_padrao

8. **Receitas**
   - id (PK)
   - id_nutricionista (FK)
   - nome
   - categoria
   - tempo_preparo
   - porcoes
   - modo_preparo
   - calorias_porcao
   - proteinas_porcao
   - carboidratos_porcao
   - gorduras_porcao
   - imagem_url

9. **Ingredientes_Receita**
   - id (PK)
   - id_receita (FK)
   - id_alimento (FK)
   - quantidade
   - unidade_medida

10. **Listas_Compras**
    - id (PK)
    - id_paciente (FK)
    - id_plano_alimentar (FK)
    - nome
    - data_criacao
    - observacoes

11. **Itens_Lista_Compras**
    - id (PK)
    - id_lista_compras (FK)
    - id_alimento (FK)
    - quantidade
    - unidade_medida
    - status (pendente, comprado)

### Relacionamentos

- Um nutricionista pode ter muitos pacientes
- Um paciente pertence a um nutricionista
- Um paciente pode ter muitas consultas
- Um paciente pode ter muitos planos alimentares
- Um plano alimentar tem muitas refeições
- Uma refeição tem muitos alimentos
- Um nutricionista pode criar muitas receitas
- Uma receita tem muitos ingredientes
- Um paciente pode ter muitas listas de compras
- Uma lista de compras tem muitos itens

## Frontend

O frontend do SaaS de Gestão Nutricional foi desenvolvido utilizando tecnologias web modernas para garantir uma experiência de usuário intuitiva e responsiva.

### Estrutura de Diretórios

```
/src
  /assets
    /images
    /icons
  /components
    /common
    /dashboard
    /patients
    /meal-plans
    /food-database
    /recipes
    /shopping-lists
  /contexts
  /hooks
  /pages
  /services
  /utils
```

### Componentes Principais

1. **Dashboard**
   - Visão geral das métricas principais
   - Gráficos de acompanhamento
   - Lista de atividades recentes
   - Acesso rápido às funcionalidades mais usadas

2. **Gestão de Pacientes**
   - Cadastro de novos pacientes
   - Listagem e busca de pacientes
   - Visualização de histórico
   - Agendamento de consultas

3. **Planos Alimentares**
   - Criação de planos personalizados
   - Adição de refeições e alimentos
   - Cálculos nutricionais automáticos
   - Visualização de macronutrientes

4. **Banco de Alimentos**
   - Busca no banco de dados TACO/IBGE
   - Cadastro de alimentos personalizados
   - Visualização de informações nutricionais
   - Categorização de alimentos

5. **Receitas**
   - Criação de receitas personalizadas
   - Cálculo automático de valores nutricionais
   - Compartilhamento de receitas
   - Categorização e busca

6. **Listas de Compras**
   - Geração automática baseada em planos alimentares
   - Adição manual de itens
   - Marcação de itens comprados
   - Compartilhamento com pacientes

### Responsividade

O frontend foi desenvolvido com design responsivo, adaptando-se a diferentes tamanhos de tela:

- **Desktop**: Layout completo com sidebar e múltiplas colunas
- **Tablet**: Layout adaptado com sidebar colapsável
- **Mobile**: Layout simplificado com menu hambúrguer e visualização em coluna única

## Backend

O backend do sistema foi desenvolvido em Node.js com Express, fornecendo uma API RESTful para comunicação com o frontend.

### Estrutura de Diretórios

```
/src
  /config
  /controllers
  /middlewares
  /models
  /routes
  /services
  /utils
```

### API Endpoints

#### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/logout` - Logout de usuário
- `POST /api/auth/register` - Registro de novo usuário
- `GET /api/auth/me` - Obter usuário atual

#### Pacientes
- `GET /api/patients` - Listar pacientes
- `GET /api/patients/:id` - Obter paciente específico
- `POST /api/patients` - Criar novo paciente
- `PUT /api/patients/:id` - Atualizar paciente
- `DELETE /api/patients/:id` - Remover paciente

#### Consultas
- `GET /api/appointments` - Listar consultas
- `GET /api/appointments/:id` - Obter consulta específica
- `POST /api/appointments` - Agendar nova consulta
- `PUT /api/appointments/:id` - Atualizar consulta
- `DELETE /api/appointments/:id` - Cancelar consulta

#### Planos Alimentares
- `GET /api/meal-plans` - Listar planos alimentares
- `GET /api/meal-plans/:id` - Obter plano específico
- `POST /api/meal-plans` - Criar novo plano
- `PUT /api/meal-plans/:id` - Atualizar plano
- `DELETE /api/meal-plans/:id` - Remover plano

#### Refeições
- `GET /api/meal-plans/:id/meals` - Listar refeições de um plano
- `POST /api/meals` - Adicionar refeição
- `PUT /api/meals/:id` - Atualizar refeição
- `DELETE /api/meals/:id` - Remover refeição

#### Alimentos
- `GET /api/foods` - Listar alimentos
- `GET /api/foods/:id` - Obter alimento específico
- `POST /api/foods` - Adicionar alimento personalizado
- `PUT /api/foods/:id` - Atualizar alimento
- `DELETE /api/foods/:id` - Remover alimento personalizado

#### Receitas
- `GET /api/recipes` - Listar receitas
- `GET /api/recipes/:id` - Obter receita específica
- `POST /api/recipes` - Criar nova receita
- `PUT /api/recipes/:id` - Atualizar receita
- `DELETE /api/recipes/:id` - Remover receita

#### Listas de Compras
- `GET /api/shopping-lists` - Listar listas de compras
- `GET /api/shopping-lists/:id` - Obter lista específica
- `POST /api/shopping-lists` - Criar nova lista
- `PUT /api/shopping-lists/:id` - Atualizar lista
- `DELETE /api/shopping-lists/:id` - Remover lista

### Segurança

- Autenticação via JWT (JSON Web Tokens)
- Validação de dados com Joi
- Proteção contra ataques CSRF
- Rate limiting para prevenir ataques de força bruta
- Sanitização de inputs para prevenir injeção SQL e XSS

## Funcionalidades Principais

### 1. Gestão de Pacientes

O sistema permite o cadastro completo de pacientes, incluindo:

- Dados pessoais (nome, contato, data de nascimento)
- Histórico médico
- Objetivos nutricionais
- Preferências alimentares e restrições
- Medidas antropométricas
- Histórico de consultas

### 2. Planos Alimentares

A criação de planos alimentares é o núcleo do sistema, oferecendo:

- Criação de planos personalizados por paciente
- Definição de múltiplas refeições por dia
- Seleção de alimentos a partir do banco de dados
- Cálculo automático de macronutrientes e calorias
- Ajuste de quantidades e porções
- Visualização de distribuição de macronutrientes
- Geração de PDF para impressão

### 3. Banco de Alimentos

O sistema inclui um banco de dados completo de alimentos:

- Base de dados TACO (Tabela Brasileira de Composição de Alimentos)
- Base de dados IBGE
- Possibilidade de cadastro de alimentos personalizados
- Informações nutricionais detalhadas
- Categorização por grupos alimentares
- Busca avançada por nome, categoria ou valores nutricionais

### 4. Receitas

O módulo de receitas permite:

- Criação de receitas personalizadas
- Adição de ingredientes do banco de alimentos
- Cálculo automático de valores nutricionais por porção
- Inclusão de modo de preparo e tempo de cozimento
- Categorização e tags para facilitar a busca
- Inclusão de receitas em planos alimentares

### 5. Listas de Compras

Para facilitar a adesão aos planos alimentares:

- Geração automática de listas baseadas nos planos
- Adição manual de itens
- Organização por categorias de alimentos
- Compartilhamento com pacientes
- Marcação de itens já comprados
- Exportação em formato PDF

### 6. Dashboard e Relatórios

Para acompanhamento e análise:

- Visão geral de métricas importantes
- Gráficos de evolução de pacientes
- Relatórios de adesão aos planos
- Estatísticas de distribuição de macronutrientes
- Exportação de dados para análise externa

## Guia de Instalação

### Requisitos do Sistema

#### Servidor
- Node.js 14.x ou superior
- PostgreSQL 12.x ou superior
- NPM 6.x ou superior
- 2GB RAM mínimo (4GB recomendado)
- 10GB de espaço em disco

#### Cliente
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexão à internet estável

### Instalação do Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/nutrisaas/gestao-nutricional.git
   cd gestao-nutricional/backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. Configure o banco de dados:
   ```bash
   npm run db:create
   npm run db:migrate
   npm run db:seed
   ```

5. Inicie o servidor:
   ```bash
   npm run start
   ```

### Instalação do Frontend

1. Navegue para o diretório do frontend:
   ```bash
   cd ../frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run start
   ```

5. Para build de produção:
   ```bash
   npm run build
   ```

### Configuração do Servidor Web

Para ambiente de produção, recomenda-se o uso de Nginx como proxy reverso:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Guia do Usuário

### Primeiros Passos

1. **Acesso ao Sistema**
   - Acesse o sistema através da URL fornecida
   - Faça login com suas credenciais
   - Na primeira vez, será solicitado que você altere a senha temporária

2. **Configuração Inicial**
   - Complete seu perfil profissional
   - Configure preferências do sistema
   - Importe dados existentes (se aplicável)

3. **Cadastro de Pacientes**
   - Acesse o menu "Pacientes"
   - Clique em "Novo Paciente"
   - Preencha os dados solicitados
   - Salve o cadastro

### Criação de Plano Alimentar

1. **Iniciar Novo Plano**
   - Acesse o perfil do paciente
   - Clique em "Novo Plano Alimentar"
   - Defina nome, objetivo e período do plano

2. **Adicionar Refeições**
   - Clique em "Adicionar Refeição"
   - Defina nome e horário
   - Confirme a adição

3. **Adicionar Alimentos**
   - Na refeição criada, clique em "Adicionar Alimento"
   - Busque pelo nome ou categoria
   - Selecione o alimento desejado
   - Defina a quantidade e unidade de medida
   - Confirme a adição

4. **Verificar Valores Nutricionais**
   - Os valores de calorias e macronutrientes são calculados automaticamente
   - Verifique o resumo no topo do plano
   - Ajuste as quantidades se necessário

5. **Finalizar e Salvar**
   - Revise todas as refeições e alimentos
   - Clique em "Salvar Plano"
   - Opcionalmente, gere um PDF para impressão

### Utilização do Banco de Alimentos

1. **Buscar Alimentos**
   - Acesse o menu "Banco de Alimentos"
   - Utilize a barra de busca
   - Filtre por categoria se necessário

2. **Visualizar Informações Nutricionais**
   - Clique no alimento desejado
   - Visualize detalhes nutricionais completos
   - Verifique diferentes porções e medidas

3. **Adicionar Alimento Personalizado**
   - Clique em "Novo Alimento"
   - Preencha nome, categoria e valores nutricionais
   - Defina porção padrão
   - Salve o novo alimento

### Criação de Receitas

1. **Iniciar Nova Receita**
   - Acesse o menu "Receitas"
   - Clique em "Nova Receita"
   - Defina nome, categoria e número de porções

2. **Adicionar Ingredientes**
   - Clique em "Adicionar Ingrediente"
   - Busque e selecione o alimento
   - Defina quantidade e unidade de medida
   - Confirme a adição

3. **Incluir Modo de Preparo**
   - Preencha o campo de modo de preparo
   - Adicione tempo de cozimento e dicas

4. **Verificar Valores Nutricionais**
   - Os valores por porção são calculados automaticamente
   - Verifique o resumo nutricional
   - Ajuste ingredientes se necessário

5. **Finalizar e Salvar**
   - Revise todos os dados
   - Clique em "Salvar Receita"

### Geração de Listas de Compras

1. **Criar Lista Baseada em Plano**
   - Acesse o plano alimentar
   - Clique em "Gerar Lista de Compras"
   - Defina período (dias ou semanas)
   - Confirme a geração

2. **Criar Lista Manual**
   - Acesse o menu "Listas de Compras"
   - Clique em "Nova Lista"
   - Adicione itens manualmente

3. **Editar Lista**
   - Adicione ou remova itens
   - Ajuste quantidades
   - Organize por categorias

4. **Compartilhar com Paciente**
   - Clique em "Compartilhar"
   - Selecione método (email, link, PDF)
   - Confirme o compartilhamento

## Manutenção e Suporte

### Backup de Dados

Recomenda-se a configuração de backups automáticos:

1. **Backup do Banco de Dados**
   ```bash
   # Adicione ao crontab para execução diária
   pg_dump -U usuario -d nutrisaas > /path/to/backup/nutrisaas_$(date +\%Y\%m\%d).sql
   ```

2. **Backup de Arquivos**
   ```bash
   # Adicione ao crontab para execução semanal
   tar -czf /path/to/backup/nutrisaas_files_$(date +\%Y\%m\%d).tar.gz /path/to/nutrisaas/uploads
   ```

### Atualizações do Sistema

Para manter o sistema atualizado:

1. Pare os serviços:
   ```bash
   pm2 stop nutrisaas-api
   pm2 stop nutrisaas-frontend
   ```

2. Faça backup dos dados

3. Atualize o código:
   ```bash
   git pull origin main
   ```

4. Atualize dependências:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

5. Execute migrações:
   ```bash
   cd ../backend
   npm run db:migrate
   ```

6. Reinicie os serviços:
   ```bash
   pm2 start nutrisaas-api
   pm2 start nutrisaas-frontend
   ```

### Solução de Problemas Comuns

#### Problemas de Conexão com Banco de Dados
- Verifique as credenciais no arquivo .env
- Confirme se o serviço PostgreSQL está em execução
- Verifique permissões do usuário do banco

#### Erros de API
- Verifique os logs do servidor: `pm2 logs nutrisaas-api`
- Confirme se todas as variáveis de ambiente estão configuradas
- Verifique se as portas necessárias estão abertas no firewall

#### Problemas de Frontend
- Limpe o cache do navegador
- Verifique se o build de produção foi gerado corretamente
- Confirme se o proxy reverso está configurado adequadamente

## Referências

- Tabela TACO: http://www.tbca.net.br/
- Tabela IBGE: https://www.ibge.gov.br/estatisticas/sociais/saude/
- Documentação React.js: https://reactjs.org/docs/
- Documentação Node.js: https://nodejs.org/en/docs/
- Documentação PostgreSQL: https://www.postgresql.org/docs/
- Documentação Tailwind CSS: https://tailwindcss.com/docs/
- Documentação Chart.js: https://www.chartjs.org/docs/
