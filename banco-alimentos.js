// Banco de Alimentos - Implementação das tabelas TACO e IBGE
// Este arquivo contém a implementação do banco de alimentos com as tabelas TACO e IBGE
// e a funcionalidade para inclusão manual de alimentos personalizados

// Classe para gerenciar o banco de alimentos
class BancoAlimentos {
  constructor() {
    this.alimentos = [];
    this.alimentosPersonalizados = [];
    this.fontes = ['TACO', 'IBGE', 'Personalizado'];
    this.categorias = [
      'Cereais e derivados',
      'Verduras, hortaliças e derivados',
      'Frutas e derivados',
      'Gorduras e óleos',
      'Pescados e frutos do mar',
      'Carnes e derivados',
      'Leite e derivados',
      'Bebidas',
      'Ovos e derivados',
      'Produtos açucarados',
      'Miscelâneas',
      'Outros alimentos industrializados',
      'Alimentos preparados',
      'Leguminosas e derivados',
      'Nozes e sementes'
    ];
    this.init();
  }

  // Inicializar o banco de alimentos
  async init() {
    try {
      // Carregar alimentos das tabelas TACO e IBGE
      await this.carregarAlimentosTACO();
      await this.carregarAlimentosIBGE();
      
      // Carregar alimentos personalizados do localStorage
      this.carregarAlimentosPersonalizados();
      
      console.log(`Banco de Alimentos inicializado com ${this.alimentos.length} alimentos.`);
    } catch (error) {
      console.error('Erro ao inicializar o banco de alimentos:', error);
    }
  }

  // Carregar alimentos da tabela TACO
  async carregarAlimentosTACO() {
    try {
      const response = await fetch('/data/taco_alimentos.csv');
      const data = await response.text();
      
      // Processar CSV
      const linhas = data.split('\n');
      const cabecalho = linhas[0].split(',');
      
      for (let i = 1; i < linhas.length; i++) {
        if (!linhas[i].trim()) continue;
        
        const valores = linhas[i].split(',');
        const alimento = {};
        
        for (let j = 0; j < cabecalho.length; j++) {
          alimento[cabecalho[j]] = valores[j];
        }
        
        alimento.id = `taco_${i}`;
        alimento.fonte = 'TACO';
        this.alimentos.push(alimento);
      }
      
      console.log(`Carregados ${this.alimentos.length} alimentos da tabela TACO.`);
    } catch (error) {
      console.error('Erro ao carregar alimentos TACO:', error);
      // Carregar dados de exemplo em caso de erro
      this.carregarDadosExemploTACO();
    }
  }

  // Carregar alimentos da tabela IBGE
  async carregarAlimentosIBGE() {
    try {
      const response = await fetch('/data/ibge_alimentos.csv');
      const data = await response.text();
      
      // Processar CSV
      const linhas = data.split('\n');
      const cabecalho = linhas[0].split(',');
      
      const alimentosAnteriores = this.alimentos.length;
      
      for (let i = 1; i < linhas.length; i++) {
        if (!linhas[i].trim()) continue;
        
        const valores = linhas[i].split(',');
        const alimento = {};
        
        for (let j = 0; j < cabecalho.length; j++) {
          alimento[cabecalho[j]] = valores[j];
        }
        
        alimento.id = `ibge_${i}`;
        alimento.fonte = 'IBGE';
        this.alimentos.push(alimento);
      }
      
      console.log(`Carregados ${this.alimentos.length - alimentosAnteriores} alimentos da tabela IBGE.`);
    } catch (error) {
      console.error('Erro ao carregar alimentos IBGE:', error);
      // Carregar dados de exemplo em caso de erro
      this.carregarDadosExemploIBGE();
    }
  }

  // Carregar alimentos personalizados do localStorage
  carregarAlimentosPersonalizados() {
    try {
      const alimentosPersonalizados = localStorage.getItem('alimentosPersonalizados');
      if (alimentosPersonalizados) {
        this.alimentosPersonalizados = JSON.parse(alimentosPersonalizados);
        this.alimentos = [...this.alimentos, ...this.alimentosPersonalizados];
        console.log(`Carregados ${this.alimentosPersonalizados.length} alimentos personalizados.`);
      }
    } catch (error) {
      console.error('Erro ao carregar alimentos personalizados:', error);
    }
  }

  // Adicionar um alimento personalizado
  adicionarAlimentoPersonalizado(alimento) {
    try {
      // Validar dados do alimento
      if (!alimento.nome_alimento || !alimento.categoria) {
        throw new Error('Nome e categoria são obrigatórios');
      }
      
      // Adicionar ID e fonte
      alimento.id = `personalizado_${Date.now()}`;
      alimento.fonte = 'Personalizado';
      
      // Adicionar ao array de alimentos personalizados
      this.alimentosPersonalizados.push(alimento);
      
      // Adicionar ao array geral de alimentos
      this.alimentos.push(alimento);
      
      // Salvar no localStorage
      localStorage.setItem('alimentosPersonalizados', JSON.stringify(this.alimentosPersonalizados));
      
      console.log(`Alimento personalizado "${alimento.nome_alimento}" adicionado com sucesso.`);
      return alimento;
    } catch (error) {
      console.error('Erro ao adicionar alimento personalizado:', error);
      throw error;
    }
  }

  // Editar um alimento personalizado
  editarAlimentoPersonalizado(id, dadosAtualizados) {
    try {
      // Encontrar o alimento personalizado pelo ID
      const index = this.alimentosPersonalizados.findIndex(a => a.id === id);
      if (index === -1) {
        throw new Error('Alimento personalizado não encontrado');
      }
      
      // Atualizar os dados
      this.alimentosPersonalizados[index] = {
        ...this.alimentosPersonalizados[index],
        ...dadosAtualizados
      };
      
      // Atualizar também no array geral de alimentos
      const indexGeral = this.alimentos.findIndex(a => a.id === id);
      if (indexGeral !== -1) {
        this.alimentos[indexGeral] = {
          ...this.alimentos[indexGeral],
          ...dadosAtualizados
        };
      }
      
      // Salvar no localStorage
      localStorage.setItem('alimentosPersonalizados', JSON.stringify(this.alimentosPersonalizados));
      
      console.log(`Alimento personalizado "${this.alimentosPersonalizados[index].nome_alimento}" atualizado com sucesso.`);
      return this.alimentosPersonalizados[index];
    } catch (error) {
      console.error('Erro ao editar alimento personalizado:', error);
      throw error;
    }
  }

  // Excluir um alimento personalizado
  excluirAlimentoPersonalizado(id) {
    try {
      // Encontrar o alimento personalizado pelo ID
      const index = this.alimentosPersonalizados.findIndex(a => a.id === id);
      if (index === -1) {
        throw new Error('Alimento personalizado não encontrado');
      }
      
      // Remover do array de alimentos personalizados
      const alimentoRemovido = this.alimentosPersonalizados.splice(index, 1)[0];
      
      // Remover também do array geral de alimentos
      const indexGeral = this.alimentos.findIndex(a => a.id === id);
      if (indexGeral !== -1) {
        this.alimentos.splice(indexGeral, 1);
      }
      
      // Salvar no localStorage
      localStorage.setItem('alimentosPersonalizados', JSON.stringify(this.alimentosPersonalizados));
      
      console.log(`Alimento personalizado "${alimentoRemovido.nome_alimento}" excluído com sucesso.`);
      return alimentoRemovido;
    } catch (error) {
      console.error('Erro ao excluir alimento personalizado:', error);
      throw error;
    }
  }

  // Buscar alimentos por nome
  buscarAlimentosPorNome(termo) {
    if (!termo) return this.alimentos;
    
    const termoLowerCase = termo.toLowerCase();
    return this.alimentos.filter(alimento => 
      alimento.nome_alimento.toLowerCase().includes(termoLowerCase)
    );
  }

  // Buscar alimentos por categoria
  buscarAlimentosPorCategoria(categoria) {
    if (!categoria || categoria === 'Todas') return this.alimentos;
    
    return this.alimentos.filter(alimento => 
      alimento.categoria === categoria
    );
  }

  // Buscar alimentos por fonte
  buscarAlimentosPorFonte(fonte) {
    if (!fonte || fonte === 'Todas') return this.alimentos;
    
    return this.alimentos.filter(alimento => 
      alimento.fonte === fonte
    );
  }

  // Obter todas as categorias disponíveis
  obterCategorias() {
    return this.categorias;
  }

  // Obter todas as fontes disponíveis
  obterFontes() {
    return this.fontes;
  }

  // Carregar dados de exemplo da tabela TACO em caso de erro
  carregarDadosExemploTACO() {
    const dadosExemplo = [
      {
        id: 'taco_1',
        nome_alimento: 'Arroz, integral, cozido',
        categoria: 'Cereais e derivados',
        energia_kcal: '124',
        proteina_g: '2.6',
        lipideos_g: '1.0',
        carboidrato_g: '25.8',
        fibra_g: '1.8',
        calcio_mg: '5',
        ferro_mg: '0.3',
        sodio_mg: '1',
        vitamina_c_mg: '0.0',
        fonte: 'TACO'
      },
      {
        id: 'taco_2',
        nome_alimento: 'Arroz, tipo 1, cozido',
        categoria: 'Cereais e derivados',
        energia_kcal: '128',
        proteina_g: '2.5',
        lipideos_g: '0.2',
        carboidrato_g: '28.1',
        fibra_g: '1.6',
        calcio_mg: '4',
        ferro_mg: '0.1',
        sodio_mg: '1',
        vitamina_c_mg: '0.0',
        fonte: 'TACO'
      },
      {
        id: 'taco_3',
        nome_alimento: 'Feijão, carioca, cozido',
        categoria: 'Leguminosas e derivados',
        energia_kcal: '76',
        proteina_g: '4.8',
        lipideos_g: '0.5',
        carboidrato_g: '13.6',
        fibra_g: '8.5',
        calcio_mg: '27',
        ferro_mg: '1.3',
        sodio_mg: '2',
        vitamina_c_mg: '0.0',
        fonte: 'TACO'
      },
      {
        id: 'taco_4',
        nome_alimento: 'Feijão, preto, cozido',
        categoria: 'Leguminosas e derivados',
        energia_kcal: '77',
        proteina_g: '4.5',
        lipideos_g: '0.5',
        carboidrato_g: '14.0',
        fibra_g: '8.4',
        calcio_mg: '29',
        ferro_mg: '1.5',
        sodio_mg: '2',
        vitamina_c_mg: '0.0',
        fonte: 'TACO'
      },
      {
        id: 'taco_5',
        nome_alimento: 'Maçã, Fuji, com casca',
        categoria: 'Frutas e derivados',
        energia_kcal: '56',
        proteina_g: '0.3',
        lipideos_g: '0.2',
        carboidrato_g: '15.0',
        fibra_g: '2.6',
        calcio_mg: '3',
        ferro_mg: '0.1',
        sodio_mg: '1',
        vitamina_c_mg: '2.4',
        fonte: 'TACO'
      }
    ];
    
    this.alimentos = [...this.alimentos, ...dadosExemplo];
    console.log(`Carregados ${dadosExemplo.length} alimentos de exemplo da tabela TACO.`);
  }

  // Carregar dados de exemplo da tabela IBGE em caso de erro
  carregarDadosExemploIBGE() {
    const dadosExemplo = [
      {
        id: 'ibge_1',
        codigo: '63001',
        nome_alimento: 'Arroz integral',
        energia_kcal: '124',
        proteina_g: '2.6',
        lipideos_g: '1.0',
        carboidrato_g: '25.8',
        fibra_g: '1.8',
        calcio_mg: '5',
        ferro_mg: '0.3',
        sodio_mg: '1',
        fonte: 'IBGE'
      },
      {
        id: 'ibge_2',
        codigo: '63002',
        nome_alimento: 'Arroz branco',
        energia_kcal: '128',
        proteina_g: '2.5',
        lipideos_g: '0.2',
        carboidrato_g: '28.1',
        fibra_g: '1.6',
        calcio_mg: '4',
        ferro_mg: '0.1',
        sodio_mg: '1',
        fonte: 'IBGE'
      },
      {
        id: 'ibge_3',
        codigo: '63003',
        nome_alimento: 'Feijão preto',
        energia_kcal: '77',
        proteina_g: '4.5',
        lipideos_g: '0.5',
        carboidrato_g: '14.0',
        fibra_g: '8.4',
        calcio_mg: '29',
        ferro_mg: '1.5',
        sodio_mg: '2',
        fonte: 'IBGE'
      },
      {
        id: 'ibge_4',
        codigo: '63004',
        nome_alimento: 'Feijão carioca',
        energia_kcal: '76',
        proteina_g: '4.8',
        lipideos_g: '0.5',
        carboidrato_g: '13.6',
        fibra_g: '8.5',
        calcio_mg: '27',
        ferro_mg: '1.3',
        sodio_mg: '2',
        fonte: 'IBGE'
      },
      {
        id: 'ibge_5',
        codigo: '63005',
        nome_alimento: 'Maçã',
        energia_kcal: '56',
        proteina_g: '0.3',
        lipideos_g: '0.2',
        carboidrato_g: '15.0',
        fibra_g: '2.6',
        calcio_mg: '3',
        ferro_mg: '0.1',
        sodio_mg: '1',
        fonte: 'IBGE'
      }
    ];
    
    this.alimentos = [...this.alimentos, ...dadosExemplo];
    console.log(`Carregados ${dadosExemplo.length} alimentos de exemplo da tabela IBGE.`);
  }
}

// Exportar a classe para uso em outros arquivos
window.BancoAlimentos = BancoAlimentos;
