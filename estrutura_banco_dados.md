# Estrutura do Banco de Dados - SaaS de Gestão Nutricional

## Visão Geral

Este documento descreve a estrutura do banco de dados relacional PostgreSQL para o SaaS de Gestão Nutricional. O esquema foi projetado para suportar todas as funcionalidades identificadas na planilha Excel "Plano Alimentar" e nos requisitos do sistema.

## Esquemas

O banco de dados será organizado em esquemas para melhor separação de responsabilidades:

1. **auth** - Autenticação e autorização
2. **core** - Entidades principais do sistema
3. **nutrition** - Dados nutricionais e alimentos
4. **plan** - Planos alimentares e refeições
5. **config** - Configurações do sistema

## Tabelas Principais

### Esquema: auth

#### Tabela: users
- `id` SERIAL PRIMARY KEY
- `email` VARCHAR(255) UNIQUE NOT NULL
- `password_hash` VARCHAR(255) NOT NULL
- `name` VARCHAR(255) NOT NULL
- `role` VARCHAR(50) NOT NULL DEFAULT 'nutritionist'
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `last_login` TIMESTAMP
- `status` VARCHAR(50) NOT NULL DEFAULT 'active'

#### Tabela: user_profiles
- `id` SERIAL PRIMARY KEY
- `user_id` INTEGER REFERENCES auth.users(id)
- `profile_picture` VARCHAR(255)
- `company_name` VARCHAR(255)
- `state_registration` VARCHAR(100)
- `municipal_registration` VARCHAR(100)
- `opening_date` DATE
- `social_capital` DECIMAL(15,2)
- `current_situation` VARCHAR(100)
- `current_status` VARCHAR(100)
- `start_date` DATE
- `end_date` DATE
- `registration_date` DATE
- `period` VARCHAR(100)
- `main_activity` VARCHAR(255)
- `secondary_activity` VARCHAR(255)
- `phone` VARCHAR(20)
- `mobile` VARCHAR(20)
- `address` JSONB
- `preferences` JSONB
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

### Esquema: core

#### Tabela: patients
- `id` SERIAL PRIMARY KEY
- `user_id` INTEGER REFERENCES auth.users(id)
- `sequence` INTEGER NOT NULL
- `name` VARCHAR(255) NOT NULL
- `gender` VARCHAR(50) NOT NULL
- `birth_date` DATE NOT NULL
- `age` INTEGER
- `profession` VARCHAR(255)
- `profile_picture` VARCHAR(255)
- `phone` VARCHAR(20)
- `mobile` VARCHAR(20)
- `email` VARCHAR(255)
- `general_observations` TEXT
- `address` JSONB
- `id_document` VARCHAR(100)
- `id_document_attachment` VARCHAR(255)
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `status` VARCHAR(50) NOT NULL DEFAULT 'active'

#### Tabela: patient_records
- `id` SERIAL PRIMARY KEY
- `patient_id` INTEGER REFERENCES core.patients(id)
- `record_date` DATE NOT NULL
- `weight` DECIMAL(5,2)
- `height` DECIMAL(5,2)
- `bmi` DECIMAL(5,2)
- `waist_circumference` DECIMAL(5,2)
- `hip_circumference` DECIMAL(5,2)
- `waist_hip_ratio` DECIMAL(5,2)
- `body_fat_percentage` DECIMAL(5,2)
- `lean_mass` DECIMAL(5,2)
- `basal_metabolic_rate` INTEGER
- `physical_activity_level` VARCHAR(50)
- `total_energy_expenditure` INTEGER
- `allergies` TEXT[]
- `intolerances` TEXT[]
- `health_conditions` TEXT[]
- `medications` TEXT[]
- `supplements` TEXT[]
- `goals` TEXT[]
- `observations` TEXT
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `version` INTEGER NOT NULL DEFAULT 1

### Esquema: nutrition

#### Tabela: food_groups
- `id` SERIAL PRIMARY KEY
- `name` VARCHAR(255) NOT NULL
- `description` TEXT
- `source` VARCHAR(50) NOT NULL
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

#### Tabela: foods
- `id` SERIAL PRIMARY KEY
- `group_id` INTEGER REFERENCES nutrition.food_groups(id)
- `name` VARCHAR(255) NOT NULL
- `description` TEXT
- `calories` DECIMAL(7,2)
- `protein` DECIMAL(7,2)
- `lipids` DECIMAL(7,2)
- `carbohydrates` DECIMAL(7,2)
- `fiber` DECIMAL(7,2)
- `calcium` DECIMAL(7,2)
- `iron` DECIMAL(7,2)
- `sodium` DECIMAL(7,2)
- `potassium` DECIMAL(7,2)
- `phosphorus` DECIMAL(7,2)
- `zinc` DECIMAL(7,2)
- `magnesium` DECIMAL(7,2)
- `vitamin_a` DECIMAL(7,2)
- `vitamin_c` DECIMAL(7,2)
- `vitamin_d` DECIMAL(7,2)
- `vitamin_e` DECIMAL(7,2)
- `vitamin_b1` DECIMAL(7,2)
- `vitamin_b2` DECIMAL(7,2)
- `vitamin_b3` DECIMAL(7,2)
- `vitamin_b6` DECIMAL(7,2)
- `vitamin_b12` DECIMAL(7,2)
- `folate` DECIMAL(7,2)
- `source` VARCHAR(50) NOT NULL
- `source_id` VARCHAR(100)
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

#### Tabela: measures
- `id` SERIAL PRIMARY KEY
- `name` VARCHAR(255) NOT NULL
- `abbreviation` VARCHAR(50)
- `description` TEXT
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

#### Tabela: food_measures
- `id` SERIAL PRIMARY KEY
- `food_id` INTEGER REFERENCES nutrition.foods(id)
- `measure_id` INTEGER REFERENCES nutrition.measures(id)
- `grams` DECIMAL(7,2) NOT NULL
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

#### Tabela: recipes
- `id` SERIAL PRIMARY KEY
- `user_id` INTEGER REFERENCES auth.users(id)
- `sequence` INTEGER NOT NULL
- `name` VARCHAR(255) NOT NULL
- `preparation_time` VARCHAR(100)
- `servings` VARCHAR(100)
- `calories` DECIMAL(7,2)
- `protein` DECIMAL(7,2)
- `lipids` DECIMAL(7,2)
- `carbohydrates` DECIMAL(7,2)
- `observations` TEXT
- `instructions` TEXT
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

#### Tabela: recipe_ingredients
- `id` SERIAL PRIMARY KEY
- `recipe_id` INTEGER REFERENCES nutrition.recipes(id)
- `food_id` INTEGER REFERENCES nutrition.foods(id)
- `measure_id` INTEGER REFERENCES nutrition.measures(id)
- `quantity` DECIMAL(7,2) NOT NULL
- `grams` DECIMAL(7,2) NOT NULL
- `calories` DECIMAL(7,2)
- `protein` DECIMAL(7,2)
- `lipids` DECIMAL(7,2)
- `carbohydrates` DECIMAL(7,2)
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

### Esquema: plan

#### Tabela: meal_plans
- `id` SERIAL PRIMARY KEY
- `user_id` INTEGER REFERENCES auth.users(id)
- `patient_id` INTEGER REFERENCES core.patients(id)
- `sequence` INTEGER NOT NULL
- `name` VARCHAR(255) NOT NULL
- `start_date` DATE
- `end_date` DATE
- `calories` DECIMAL(7,2)
- `protein` DECIMAL(7,2)
- `lipids` DECIMAL(7,2)
- `carbohydrates` DECIMAL(7,2)
- `observations` TEXT
- `status` VARCHAR(50) NOT NULL DEFAULT 'active'
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `version` INTEGER NOT NULL DEFAULT 1

#### Tabela: meal_types
- `id` SERIAL PRIMARY KEY
- `name` VARCHAR(255) NOT NULL
- `description` TEXT
- `sequence` INTEGER NOT NULL
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

#### Tabela: meals
- `id` SERIAL PRIMARY KEY
- `meal_plan_id` INTEGER REFERENCES plan.meal_plans(id)
- `meal_type_id` INTEGER REFERENCES plan.meal_types(id)
- `name` VARCHAR(255) NOT NULL
- `time` TIME
- `calories` DECIMAL(7,2)
- `protein` DECIMAL(7,2)
- `lipids` DECIMAL(7,2)
- `carbohydrates` DECIMAL(7,2)
- `observations` TEXT
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

#### Tabela: meal_items
- `id` SERIAL PRIMARY KEY
- `meal_id` INTEGER REFERENCES plan.meals(id)
- `food_id` INTEGER REFERENCES nutrition.foods(id)
- `recipe_id` INTEGER REFERENCES nutrition.recipes(id)
- `measure_id` INTEGER REFERENCES nutrition.measures(id)
- `quantity` DECIMAL(7,2) NOT NULL
- `grams` DECIMAL(7,2) NOT NULL
- `calories` DECIMAL(7,2)
- `protein` DECIMAL(7,2)
- `lipids` DECIMAL(7,2)
- `carbohydrates` DECIMAL(7,2)
- `is_substitution` BOOLEAN NOT NULL DEFAULT FALSE
- `substitution_group` INTEGER
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

#### Tabela: shopping_lists
- `id` SERIAL PRIMARY KEY
- `user_id` INTEGER REFERENCES auth.users(id)
- `meal_plan_id` INTEGER REFERENCES plan.meal_plans(id)
- `name` VARCHAR(255) NOT NULL
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

#### Tabela: shopping_list_items
- `id` SERIAL PRIMARY KEY
- `shopping_list_id` INTEGER REFERENCES plan.shopping_lists(id)
- `food_id` INTEGER REFERENCES nutrition.foods(id)
- `measure_id` INTEGER REFERENCES nutrition.measures(id)
- `quantity` DECIMAL(7,2) NOT NULL
- `grams` DECIMAL(7,2) NOT NULL
- `checked` BOOLEAN NOT NULL DEFAULT FALSE
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

### Esquema: config

#### Tabela: favorites
- `id` SERIAL PRIMARY KEY
- `user_id` INTEGER REFERENCES auth.users(id)
- `food_id` INTEGER REFERENCES nutrition.foods(id)
- `recipe_id` INTEGER REFERENCES nutrition.recipes(id)
- `meal_id` INTEGER REFERENCES plan.meals(id)
- `type` VARCHAR(50) NOT NULL
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

#### Tabela: settings
- `id` SERIAL PRIMARY KEY
- `user_id` INTEGER REFERENCES auth.users(id)
- `key` VARCHAR(255) NOT NULL
- `value` JSONB NOT NULL
- `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()

## Índices

Para otimizar o desempenho do banco de dados, serão criados os seguintes índices:

```sql
-- Índices para busca de alimentos
CREATE INDEX idx_foods_name ON nutrition.foods(name);
CREATE INDEX idx_foods_group_id ON nutrition.foods(group_id);

-- Índices para busca de pacientes
CREATE INDEX idx_patients_user_id ON core.patients(user_id);
CREATE INDEX idx_patients_name ON core.patients(name);

-- Índices para planos alimentares
CREATE INDEX idx_meal_plans_user_id ON plan.meal_plans(user_id);
CREATE INDEX idx_meal_plans_patient_id ON plan.meal_plans(patient_id);

-- Índices para receitas
CREATE INDEX idx_recipes_user_id ON nutrition.recipes(user_id);
CREATE INDEX idx_recipes_name ON nutrition.recipes(name);

-- Índices para favoritos
CREATE INDEX idx_favorites_user_id ON config.favorites(user_id);
CREATE INDEX idx_favorites_type ON config.favorites(type);
```

## Relacionamentos

Os relacionamentos entre as tabelas são definidos através de chaves estrangeiras, garantindo a integridade referencial dos dados. Os principais relacionamentos são:

1. Um usuário pode ter múltiplos pacientes
2. Um paciente pode ter múltiplos registros de ficha cadastral
3. Um paciente pode ter múltiplos planos alimentares
4. Um plano alimentar pode ter múltiplas refeições
5. Uma refeição pode ter múltiplos itens (alimentos ou receitas)
6. Um alimento pode pertencer a um grupo alimentar
7. Um alimento pode ter múltiplas medidas
8. Uma receita pode ter múltiplos ingredientes
9. Um usuário pode ter múltiplos favoritos

## Considerações de Segurança

1. Senhas armazenadas como hashes (bcrypt)
2. Dados sensíveis criptografados
3. Controle de acesso baseado em papéis
4. Auditoria de alterações em tabelas críticas

## Migração de Dados

Para migrar os dados da planilha Excel para o banco de dados, será necessário:

1. Extrair os dados das abas da planilha
2. Transformar os dados para o formato adequado
3. Carregar os dados nas tabelas correspondentes

A migração será feita em etapas, começando pelos dados de referência (alimentos, medidas, grupos) e depois os dados específicos do usuário (pacientes, planos, receitas).

## Versionamento e Histórico

Para manter o histórico de alterações em entidades importantes como planos alimentares e fichas cadastrais, utilizamos o campo `version` e tabelas de histórico quando necessário.

## Backup e Recuperação

O banco de dados será configurado com:

1. Backups automáticos diários
2. Retenção de backups por 30 dias
3. Procedimentos de recuperação documentados
4. Monitoramento de integridade
