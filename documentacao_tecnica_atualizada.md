# Documentação Técnica - NutriSaaS

## Visão Geral

O NutriSaaS é um sistema de gestão nutricional baseado na web, desenvolvido para nutricionistas e profissionais da área de saúde. O sistema permite o gerenciamento completo de pacientes, planos alimentares, banco de alimentos, receitas e relatórios.

## Arquitetura do Sistema

### Frontend
- **Tecnologias**: HTML5, CSS3 (Tailwind CSS), JavaScript
- **Frameworks**: React.js (para implementação futura)
- **Bibliotecas**: Chart.js (para visualização de dados)

### Backend
- **Tecnologias**: Node.js, Express.js
- **Banco de Dados**: PostgreSQL
- **API**: RESTful

### Infraestrutura
- **Hospedagem**: Serviço de hospedagem estática
- **Implantação**: Contínua via GitHub

## Estrutura do Banco de Dados

### Tabelas Principais

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
   - objetivo
   - status (ativo, inativo)
   - data_cadastro

3. **Avaliações**
   - id (PK)
   - id_paciente (FK)
   - data_avaliacao
   - peso
   - imc
   - percentual_gordura
   - circunferencias (JSON)
   - observacoes

4. **Consultas**
   - id (PK)
   - id_paciente (FK)
   - id_nutricionista (FK)
   - data_hora
   - tipo (avaliacao, retorno)
   - status (agendada, realizada, cancelada)
   - observacoes

5. **Planos_Alimentares**
   - id (PK)
   - id_paciente (FK)
   - id_nutricionista (FK)
   - data_criacao
   - data_inicio
   - data_fim
   - objetivo
   - calorias_totais
   - macronutrientes (JSON)
   - observacoes

6. **Refeicoes**
   - id (PK)
   - id_plano (FK)
   - nome (café da manhã, almoço, etc.)
   - horario
   - ordem

7. **Itens_Refeicao**
   - id (PK)
   - id_refeicao (FK)
   - id_alimento (FK)
   - quantidade
   - unidade_medida
   - calorias
   - proteinas
   - carboidratos
   - gorduras

8. **Alimentos**
   - id (PK)
   - nome
   - categoria
   - calorias (por 100g)
   - proteinas
   - carboidratos
   - gorduras
   - fibras
   - sodio
   - fonte (TACO, IBGE, personalizado)
   - porcao_padrao
   - unidade_medida

9. **Receitas**
   - id (PK)
   - id_nutricionista (FK)
   - nome
   - categoria
   - tempo_preparo
   - porcoes
   - modo_preparo
   - calorias_total
   - proteinas_total
   - carboidratos_total
   - gorduras_total

10. **Ingredientes_Receita**
    - id (PK)
    - id_receita (FK)
    - id_alimento (FK)
    - quantidade
    - unidade_medida

## Interface do Usuário

### Componentes Principais

1. **Barra de Navegação**
   - Cor de fundo: Verde (#047857 - bg-green-600)
   - Texto: Branco
   - Elementos interativos: Verde escuro (#065f46 - bg-green-700)
   - Responsiva para dispositivos móveis

2. **Dashboard**
   - Cards de estatísticas
   - Gráficos de evolução
   - Consultas recentes
   - Tarefas pendentes

3. **Módulo de Pacientes**
   - Listagem de pacientes
   - Formulário de cadastro
   - Detalhes do paciente
   - Histórico de consultas

4. **Módulo de Planos Alimentares**
   - Criação de planos
   - Seleção de alimentos
   - Cálculos nutricionais automáticos
   - Visualização e impressão

5. **Módulo de Banco de Alimentos**
   - Tabela de alimentos
   - Informações nutricionais
   - Filtros por categoria
   - Adição de novos alimentos

6. **Módulo de Receitas**
   - Cards de receitas
   - Detalhes nutricionais
   - Modo de preparo
   - Gerenciamento de receitas

7. **Módulo de Relatórios**
   - Configuração de relatórios
   - Visualização gráfica
   - Exportação em diferentes formatos
   - Análises estatísticas

## Funcionalidades Principais

### Gestão de Pacientes
- Cadastro completo de pacientes
- Agendamento de consultas
- Histórico de avaliações
- Acompanhamento de evolução

### Planos Alimentares
- Criação personalizada
- Cálculos nutricionais automáticos
- Sugestões baseadas em objetivos
- Impressão de planos

### Banco de Alimentos
- Base de dados TACO/IBGE
- Adição de alimentos personalizados
- Informações nutricionais detalhadas
- Favoritos e mais utilizados

### Receitas
- Criação e compartilhamento
- Cálculo automático de valores nutricionais
- Categorização e busca
- Inclusão em planos alimentares

### Relatórios
- Evolução de pacientes
- Análise de resultados
- Estatísticas de atendimento
- Exportação em PDF, Excel e CSV

## Guia de Instalação

### Requisitos
- Node.js 14+
- PostgreSQL 12+
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Passos para Instalação
1. Clone o repositório: `git clone https://github.com/widudu05/nutriplan2.git`
2. Instale as dependências: `npm install`
3. Configure o banco de dados: `npm run setup-db`
4. Inicie o servidor: `npm start`
5. Acesse: `http://localhost:3000`

## Manutenção e Suporte

### Atualizações
- Verificar atualizações: `npm run check-updates`
- Aplicar atualizações: `npm run update`

### Backup
- Backup do banco de dados: `npm run backup-db`
- Restaurar backup: `npm run restore-db [arquivo]`

### Suporte
- Email: suporte@nutrisaas.com
- Documentação: https://docs.nutrisaas.com
- FAQ: https://nutrisaas.com/faq

## Histórico de Versões

### v1.2.3 (19/04/2025)
- Atualizada a cor da barra de navegação para verde
- Melhorado o contraste para melhor visibilidade
- Implementados todos os módulos funcionais

### v1.2.2 (19/04/2025)
- Corrigido o contraste da barra de navegação
- Implementados módulos de pacientes, banco de alimentos, receitas e relatórios

### v1.2.1 (19/04/2025)
- Primeira versão completa do sistema
- Implementação do dashboard e planos alimentares

## Referências

- Tabela TACO: http://www.tbca.net.br/
- IBGE: https://www.ibge.gov.br/
- Tailwind CSS: https://tailwindcss.com/
- Chart.js: https://www.chartjs.org/
