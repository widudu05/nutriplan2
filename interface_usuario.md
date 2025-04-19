# Interface do Usuário - SaaS de Gestão Nutricional

## Visão Geral

Este documento descreve a interface do usuário para o SaaS de Gestão Nutricional, baseado na análise da planilha Excel "Plano Alimentar" e nos requisitos do sistema. A interface será desenvolvida utilizando React.js com Tailwind CSS para criar uma experiência moderna, responsiva e intuitiva.

## Princípios de Design

1. **Simplicidade** - Interface limpa e intuitiva, focada nas tarefas principais
2. **Consistência** - Padrões visuais e de interação consistentes em toda a aplicação
3. **Responsividade** - Adaptação perfeita para desktop, tablet e dispositivos móveis
4. **Acessibilidade** - Conformidade com diretrizes WCAG 2.1 nível AA
5. **Eficiência** - Fluxos de trabalho otimizados para nutricionistas, reduzindo cliques e tempo

## Estrutura da Interface

### 1. Layout Principal

A interface seguirá um layout de aplicativo moderno com:

- **Barra de navegação superior** - Logo, pesquisa global, notificações, perfil do usuário
- **Menu lateral** - Navegação principal entre módulos
- **Área de conteúdo principal** - Conteúdo dinâmico baseado na navegação
- **Rodapé** - Links úteis, informações de versão, suporte

### 2. Sistema de Design

- **Paleta de cores**
  - Primária: Tons de verde (#0D9488, #14B8A6, #5EEAD4)
  - Secundária: Tons de azul (#0369A1, #0EA5E9)
  - Neutros: Cinzas (#1F2937, #374151, #6B7280, #E5E7EB)
  - Alertas: Vermelho (#EF4444), Amarelo (#F59E0B), Verde (#10B981)

- **Tipografia**
  - Família principal: Inter (sans-serif)
  - Tamanhos: 14px (texto base), 16px (subtítulos), 20px (títulos), 24px+ (cabeçalhos)

- **Componentes**
  - Botões (primário, secundário, terciário, ícone)
  - Campos de formulário (texto, número, data, seleção, checkbox)
  - Cards e painéis
  - Tabelas e listas
  - Modais e diálogos
  - Notificações e alertas
  - Navegação (tabs, breadcrumbs, paginação)

## Telas Principais

### 1. Dashboard Inicial (Aba: Início)

![Dashboard](https://placeholder.com/dashboard)

**Elementos:**
- Cards de métricas principais (total de pacientes, planos ativos)
- Atividades recentes
- Pacientes com consultas próximas
- Acesso rápido a funcionalidades frequentes
- Notificações e lembretes

**Interações:**
- Clique nos cards para acessar detalhes
- Filtros para personalizar visualização
- Atalhos para criar novos registros

### 2. Gestão de Pacientes (Aba: Clientes, Ficha Cadastral)

![Pacientes](https://placeholder.com/pacientes)

**Elementos:**
- Lista de pacientes com busca e filtros
- Visualização em tabela com colunas configuráveis
- Botões de ação para cada paciente (editar, plano, histórico)

**Tela de Cadastro/Edição:**
- Formulário completo com dados pessoais
- Histórico de medidas antropométricas
- Upload de documentos e fotos
- Histórico de planos alimentares
- Observações clínicas

### 3. Montagem de Plano Alimentar (Abas: Plano, Plano_R, Refeições_R)

![Plano Alimentar](https://placeholder.com/plano)

**Elementos:**
- Seleção de paciente
- Definição de período do plano
- Estrutura de refeições por dia e horário
- Painel de busca de alimentos
- Tabela de composição nutricional em tempo real

**Interações:**
- Arrastar e soltar alimentos nas refeições
- Ajuste de quantidades com cálculo automático
- Substituições de alimentos com equivalentes
- Visualização de macronutrientes por refeição e total
- Botões para salvar, duplicar e compartilhar plano

### 4. Banco de Alimentos e Medidas (Abas: Taco, Ibge, Medidas)

![Banco de Alimentos](https://placeholder.com/alimentos)

**Elementos:**
- Tabela de alimentos com busca avançada
- Filtros por grupo alimentar, nutrientes, etc.
- Detalhes nutricionais completos
- Medidas caseiras associadas

**Interações:**
- Busca instantânea
- Favoritar alimentos frequentes
- Visualizar detalhes completos
- Adicionar diretamente ao plano alimentar

### 5. Lista de Compras (Aba: Lista, Lista_R)

![Lista de Compras](https://placeholder.com/lista)

**Elementos:**
- Lista gerada automaticamente a partir do plano
- Agrupamento por categorias de alimentos
- Quantidades e medidas
- Opções de exportação e compartilhamento

**Interações:**
- Marcar itens como comprados
- Adicionar itens manualmente
- Ajustar quantidades
- Compartilhar via WhatsApp/Email

### 6. Gestão de Receitas (Aba: Receitas)

![Receitas](https://placeholder.com/receitas)

**Elementos:**
- Biblioteca de receitas com miniaturas
- Formulário de criação/edição
- Seleção de ingredientes do banco de dados
- Cálculo nutricional automático
- Instruções de preparo

**Interações:**
- Adicionar ingredientes com busca
- Ajustar porções com recálculo automático
- Categorizar e favoritar receitas
- Incluir receitas em planos alimentares

### 7. Relatórios Nutricionais (Aba: Relatorio_R)

![Relatórios](https://placeholder.com/relatorios)

**Elementos:**
- Seleção de tipo de relatório
- Configurações de conteúdo e formato
- Visualização prévia
- Opções de exportação

**Tipos de Relatórios:**
- Plano alimentar detalhado
- Resumo de macronutrientes
- Evolução do paciente
- Lista de substituições
- Orientações nutricionais

### 8. Favoritos (Aba: Favoritos)

![Favoritos](https://placeholder.com/favoritos)

**Elementos:**
- Tabs para diferentes tipos de favoritos (alimentos, refeições, receitas)
- Visualização em grade ou lista
- Opções de filtro e busca

**Interações:**
- Adicionar/remover dos favoritos
- Organizar em categorias personalizadas
- Usar diretamente em planos alimentares

## Fluxos de Usuário

### 1. Criação de Plano Alimentar

1. Nutricionista acessa o módulo "Planos Alimentares"
2. Seleciona "Novo Plano" e escolhe um paciente
3. Define nome do plano e período
4. Adiciona refeições com horários
5. Para cada refeição, busca e adiciona alimentos
6. Ajusta quantidades e visualiza cálculos nutricionais
7. Adiciona observações e orientações
8. Salva o plano e escolhe opções de compartilhamento

### 2. Cadastro de Paciente

1. Nutricionista acessa o módulo "Pacientes"
2. Seleciona "Novo Paciente"
3. Preenche dados pessoais e de contato
4. Adiciona medidas antropométricas iniciais
5. Registra objetivos e observações clínicas
6. Salva o cadastro
7. Opcionalmente, inicia criação de plano alimentar

### 3. Geração de Relatório

1. Nutricionista acessa o módulo "Relatórios"
2. Seleciona o paciente e o plano alimentar
3. Escolhe o tipo de relatório
4. Configura opções de conteúdo
5. Visualiza prévia do relatório
6. Exporta em PDF ou compartilha diretamente

## Responsividade

A interface será totalmente responsiva, adaptando-se a diferentes tamanhos de tela:

### Desktop (1200px+)
- Layout completo com menu lateral sempre visível
- Visualização em múltiplas colunas
- Tabelas completas com todas as colunas

### Tablet (768px - 1199px)
- Menu lateral colapsável
- Layout ajustado para largura média
- Tabelas com colunas prioritárias

### Mobile (320px - 767px)
- Menu em formato de gaveta (drawer)
- Layout de coluna única
- Tabelas simplificadas com opção de expandir
- Formulários com campos empilhados

## Acessibilidade

- Contraste adequado para texto e elementos interativos
- Suporte a navegação por teclado
- Compatibilidade com leitores de tela
- Textos alternativos para imagens
- Mensagens de erro claras e acessíveis

## Modo Escuro

A interface suportará alternância entre modo claro e escuro:

- **Modo Claro** - Fundo branco, texto escuro, cores primárias vibrantes
- **Modo Escuro** - Fundo escuro, texto claro, cores primárias ajustadas para menor intensidade

## Personalização

Os usuários poderão personalizar aspectos da interface:

- Densidade de informação (compacta, padrão, confortável)
- Módulos visíveis no dashboard
- Colunas visíveis em tabelas
- Atalhos favoritos no menu

## Protótipos de Alta Fidelidade

Para a próxima fase, serão desenvolvidos protótipos de alta fidelidade das principais telas usando Figma, permitindo validação visual e testes de usabilidade antes da implementação.

## Tecnologias de Implementação

- **React.js** - Biblioteca principal para construção da interface
- **Tailwind CSS** - Framework CSS para estilização
- **Headless UI** - Componentes acessíveis sem estilo predefinido
- **React Query** - Gerenciamento de estado do servidor e cache
- **React Hook Form** - Gerenciamento de formulários
- **Recharts** - Biblioteca de gráficos
- **React Router** - Navegação entre páginas
- **Framer Motion** - Animações e transições
