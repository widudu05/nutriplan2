import pandas as pd
import tabula
import re
import os

# Diretórios para salvar os dados extraídos
os.makedirs('/home/ubuntu/nutriplan2/data', exist_ok=True)

# Função para extrair tabelas do PDF TACO
def extract_taco_tables(pdf_path):
    print("Iniciando extração das tabelas TACO...")
    
    # Extrair todas as tabelas do PDF
    tables = tabula.read_pdf(pdf_path, pages='all', multiple_tables=True)
    
    # Categorias de alimentos na tabela TACO
    categories = [
        "Cereais e derivados",
        "Verduras, hortaliças e derivados",
        "Frutas e derivados",
        "Gorduras e óleos",
        "Pescados e frutos do mar",
        "Carnes e derivados",
        "Leite e derivados",
        "Bebidas",
        "Ovos e derivados",
        "Produtos açucarados",
        "Miscelâneas",
        "Outros alimentos industrializados",
        "Alimentos preparados",
        "Leguminosas e derivados",
        "Nozes e sementes"
    ]
    
    # Dicionário para armazenar os dados por categoria
    taco_data = {category: [] for category in categories}
    
    # Processar cada tabela extraída
    for i, table in enumerate(tables):
        if len(table.columns) > 3:  # Verificar se é uma tabela de dados
            # Tentar identificar a categoria da tabela
            category = None
            for cat in categories:
                if any(cat.lower() in str(col).lower() for col in table.columns):
                    category = cat
                    break
            
            if category:
                # Limpar e processar a tabela
                table = table.dropna(how='all')
                taco_data[category].append(table)
                print(f"Tabela {i+1}: Categoria {category} - {len(table)} linhas")
    
    # Combinar tabelas da mesma categoria
    for category in categories:
        if taco_data[category]:
            taco_data[category] = pd.concat(taco_data[category], ignore_index=True)
            # Salvar em CSV
            taco_data[category].to_csv(f'/home/ubuntu/nutriplan2/data/taco_{category.replace(", ", "_").replace(" ", "_").lower()}.csv', index=False)
            print(f"Salvou {len(taco_data[category])} linhas para {category}")
    
    return taco_data

# Função para extrair tabelas do PDF IBGE
def extract_ibge_tables(pdf_path):
    print("Iniciando extração das tabelas IBGE...")
    
    # Extrair todas as tabelas do PDF
    tables = tabula.read_pdf(pdf_path, pages='all', multiple_tables=True)
    
    # Tabelas específicas do IBGE
    ibge_tables = [
        "Energia, macronutrientes e fibra",
        "Gorduras e açúcar",
        "Minerais",
        "Vitaminas",
        "Código e descrição da fonte"
    ]
    
    # Dicionário para armazenar os dados por tipo de tabela
    ibge_data = {table_name: [] for table_name in ibge_tables}
    
    # Processar cada tabela extraída
    for i, table in enumerate(tables):
        if len(table.columns) > 3:  # Verificar se é uma tabela de dados
            # Tentar identificar o tipo da tabela
            table_type = None
            for t in ibge_tables:
                if any(t.lower() in str(col).lower() for col in table.columns):
                    table_type = t
                    break
            
            if table_type:
                # Limpar e processar a tabela
                table = table.dropna(how='all')
                ibge_data[table_type].append(table)
                print(f"Tabela {i+1}: Tipo {table_type} - {len(table)} linhas")
    
    # Combinar tabelas do mesmo tipo
    for table_type in ibge_tables:
        if ibge_data[table_type]:
            ibge_data[table_type] = pd.concat(ibge_data[table_type], ignore_index=True)
            # Salvar em CSV
            ibge_data[table_type].to_csv(f'/home/ubuntu/nutriplan2/data/ibge_{table_type.replace(", ", "_").replace(" ", "_").lower()}.csv', index=False)
            print(f"Salvou {len(ibge_data[table_type])} linhas para {table_type}")
    
    return ibge_data

# Função principal
def main():
    # Baixar os PDFs
    os.system('wget -O /home/ubuntu/taco.pdf https://www.cfn.org.br/wp-content/uploads/2017/03/taco_4_edicao_ampliada_e_revisada.pdf')
    os.system('wget -O /home/ubuntu/ibge.pdf https://biblioteca.ibge.gov.br/visualizacao/livros/liv50002.pdf')
    
    # Extrair dados
    taco_data = extract_taco_tables('/home/ubuntu/taco.pdf')
    ibge_data = extract_ibge_tables('/home/ubuntu/ibge.pdf')
    
    # Criar um arquivo consolidado com todos os alimentos
    all_foods = []
    
    # Consolidar dados TACO
    for category, data in taco_data.items():
        if not isinstance(data, pd.DataFrame) or data.empty:
            continue
        
        # Adicionar coluna de categoria e fonte
        data['categoria'] = category
        data['fonte'] = 'TACO'
        all_foods.append(data)
    
    # Consolidar dados IBGE
    for table_type, data in ibge_data.items():
        if not isinstance(data, pd.DataFrame) or data.empty:
            continue
        
        # Adicionar coluna de tipo e fonte
        data['tipo_tabela'] = table_type
        data['fonte'] = 'IBGE'
        all_foods.append(data)
    
    # Combinar todos os dados
    if all_foods:
        all_foods_df = pd.concat(all_foods, ignore_index=True)
        all_foods_df.to_csv('/home/ubuntu/nutriplan2/data/all_foods.csv', index=False)
        print(f"Arquivo consolidado criado com {len(all_foods_df)} alimentos.")

if __name__ == "__main__":
    main()
