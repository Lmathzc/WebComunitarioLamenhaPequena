/**
 * @file dados.js
 * ========================================================================
 * BANCO DE DADOS ESTÁTICO (MOCK) E CONFIGURAÇÕES GLOBAIS
 * ========================================================================
 * Como a nossa arquitetura é 100% Client-Side (Front-End) e não possui um 
 * Back-End ou servidor tradicional, este ficheiro atua como a "Fonte de Verdade" inicial.
 * Ele fornece os dados institucionais, as regras de categoria e a carga inicial 
 * (seed) de comércios que alimentarão o localStorage do navegador da aplicação.
 */

/* ========================================================================
   1. INFORMAÇÕES ACADÉMICAS (UNINTER)
   ------------------------------------------------------------------------
   Objeto lido pelo ficheiro script.js para preencher dinamicamente a barra lateral 
   (Painel do Estudante). Separar estes dados da lógica da interface (UI) facilita 
   futuras atualizações do projeto sem que seja necessário alterar o código HTML.
   ======================================================================== */
const PROPOSTA_ACADEMICA = {
  aluno: "Leonardo Mathucewski Pupia",
  ru: "4568395",
  titulo: "Desenvolvimento de Catálogo Web Comunitário para Divulgação de Pequenos Comércios no Bairro Lamenha Pequena em Curitiba - PR",
  setorAplicacao: "Pequenos comércios varejistas, microempreendedores individuais e prestadores de serviços locais situados no bairro Lamenha Pequena, no município de Curitiba - PR.",
  ods: "ODS 08 - Trabalho Decente e Crescimento Econômico",
  odsJustificativa: "O catálogo web expande a presença digital de empreendedores locais de pequeno porte, fomentando a geração de renda e fortalecendo o comércio de bairro de maneira sustentável.",
  // Array de objetivos que será percorrido (loop) para gerar a lista no DOM dinamicamente
  objetivos: [
    "Desenvolver um catálogo web interativo e responsivo utilizando HTML, CSS e JavaScript para mapear e divulgar pequenos comércios do bairro Lamenha Pequena em Curitiba - PR.",
    "Implementar interface amigável e acessível com HTML, CSS e JavaScript para facilitar a localização de serviços e o contato direto entre consumidores e comerciantes locais.",
    "Avaliar a usabilidade da aplicação em HTML, CSS e JavaScript por meio do feedback dos comerciantes cadastrados, otimizando a navegação e a visibilidade dos estabelecimentos."
  ]
};

/* ========================================================================
   2. SISTEMA DE CATEGORIAS
   ------------------------------------------------------------------------
   Array de strings que define a taxonomia (classificação) do catálogo web.
   IMPORTANTE: O índice [0] ("Todos") atua como um reset global para os filtros.
   O script.js itera sobre esta lista para renderizar os botões de filtro no topo
   da página e preencher as opções (<option>) do <select> no modal de cadastro.
   ======================================================================== */
const CATEGORIAS = [
  "Todos", // Não remover. Estruturalmente vital para limpar os filtros categóricos.
  "Alimentação & Gastronomia",
  "Saúde, Beleza & Bem-estar",
  "Comércio & Varejo",
  "Serviços Profissionais",
  "Casa & Construção",
  "Transporte & Automotivo",
  "Educação & Lazer",
  "Tecnologia & Eletrônicos",
  "Outros"
];

/* ========================================================================
   3. MAPEAMENTO DE ATIVOS (ASSETS) E LÓGICA DE FALLBACK
   ------------------------------------------------------------------------
   Dicionário (Hash Map) que relaciona cada categoria a um ficheiro de imagem
   específico. Garante que qualquer comércio cadastrado (antigo ou novo) tenha 
   sempre uma identidade visual associada à sua área de atuação, evitando erros 404.
   ======================================================================== */
const MAPA_IMAGENS_CATEGORIA = {
  "Alimentação & Gastronomia": "imagens/alimentacao.png",
  "Saúde, Beleza & Bem-estar": "imagens/saude.png",
  "Comércio & Varejo": "imagens/comercio.png",
  "Serviços Profissionais": "imagens/servicos.png",
  "Casa & Construção": "imagens/casa.png",
  "Transporte & Automotivo": "imagens/transporte.png",
  "Educação & Lazer": "imagens/educacao.png",
  "Tecnologia & Eletrônicos": "imagens/tecnologia.png",
  "Outros": "imagens/outros.png"
};

/**
 * Função utilitária global para obter a imagem correspondente a uma categoria.
 * @param {string} categoria - O nome exato da categoria selecionada.
 * @returns {string} O caminho relativo da imagem (.png) ou a imagem de fallback ("outros.png").
 */
function obterImagemPorCategoria(categoria) {
  // Utiliza o operador de curto-circuito (||) para garantir uma imagem genérica 
  // caso a categoria solicitada não seja encontrada no mapa acima.
  return MAPA_IMAGENS_CATEGORIA[categoria] || "imagens/outros.png";
}

/* ========================================================================
   4. CARGA DE DADOS INICIAL (SEED) DA APLICAÇÃO
   ------------------------------------------------------------------------
   Lista base (Array de Objetos) com os comércios de Lamenha Pequena. 
   Na primeira execução da aplicação, o script.js vai ler esta matriz e 
   guardá-la no 'localStorage'. As edições, favoritos e novos cadastros 
   feitos via interface (UI) irão atualizar o localStorage e não este ficheiro.
   ======================================================================== */
const comercios = [
  {
    id: "1", // Identificador único (UUID simplificado) vital para encontrar itens ao favoritar ou excluir
    nome: "Osvaldo Pupia - Elétrica e Hidráulica",
    categoria: "Casa & Construção", // Deve ser uma correspondência exata de uma string do array CATEGORIAS
    descricao: "Serviços profissionais e de confiança em manutenção elétrica e hidráulica, residencial e comercial.",
    localizacao: "Rua Justo Manfron, Santa Felicidade",
    contato: "(41) 99621-3405", // O JavaScript processará esta string, removendo espaços e parênteses para a API do WhatsApp
    imagem: "imagens/casa.png",
    horario: "Segunda a Sexta: 08:00 às 18:00",
    tags: ["eletricista", "encanador", "reformas", "manutenção"], // Palavras-chave fundamentais para alimentar o motor de busca
    rating: 5.0, // Avaliação base do comércio
    destaque: true // Propriedade booleana que controla a renderização de badges especiais na interface (Cartão Destaque)
  },
  {
    id: "3",
    nome: "Brechó Madonas",
    categoria: "Comércio & Varejo",
    descricao: "Moda circular com peças únicas, sustentáveis e de alta qualidade com ótimos preços.",
    localizacao: "Rua Justo Manfron, 2422",
    contato: "(41) 98450-0260",
    imagem: "imagens/comercio.png",
    horario: "Segunda a Sábado: 09:00 às 18:00",
    tags: ["roupas", "sustentável", "brechó", "moda"],
    rating: 4.9,
    destaque: true
  },
  {
    id: "4",
    nome: "Jéssica Cosméticos",
    categoria: "Saúde, Beleza & Bem-estar",
    descricao: "Produtos de beleza, estética e perfumaria para cuidar do seu bem-estar diário.",
    localizacao: "Rua Justo Manfron, 2415",
    contato: "(43) 99953-8081",
    imagem: "imagens/saude.png",
    horario: "Segunda a Sábado: 09:00 às 19:00",
    tags: ["maquiagem", "perfume", "cosméticos", "beleza"],
    rating: 4.7,
    destaque: false
  },
  {
    id: "5",
    nome: "Floricultura Botanic Garden",
    categoria: "Comércio & Varejo",
    descricao: "Lindos arranjos florais, plantas ornamentais e artigos para jardinagem. A opção perfeita para presentear ou decorar o seu ambiente com a beleza da natureza.",
    localizacao: "Rua Justo Manfron, 1779",
    contato: "(41) 99877-8491",
    imagem: "imagens/comercio.png",
    horario: "Segunda a Sábado: 09:00 às 17:00",
    tags: ["floricultura", "flores", "jardim", "plantas", "presentes", "botanic"],
    rating: 5.0,
    destaque: false
  },
  {
    id: "6",
    nome: "Chacrinha",
    categoria: "Alimentação & Gastronomia",
    descricao: "Um ambiente agradável e descontraído para curtir com a família e amigos. Servimos lanches deliciosos, porções caprichadas e bebidas sempre geladas.",
    localizacao: "Rua Justo Manfron, 1874",
    contato: "(41) 98444-8484",
    imagem: "imagens/alimentacao.png",
    horario: "Quarta a Domingo: 12:00 às 21:00",
    tags: ["bar", "lanchonete", "lanches", "porções", "bebidas", "chacrinha"],
    rating: 5.0,
    destaque: false
  },
  {
    id: "7",
    nome: "Aviário Bom Pra Cachorro",
    categoria: "Comércio & Varejo",
    descricao: "Tudo o que o seu pet precisa em um só lugar! Oferecemos uma grande variedade de rações, petiscos, acessórios e produtos de higiene para o bem-estar do seu animal de estimação.",
    localizacao: "Rua Justo Manfron, 2336",
    contato: "(41) 4101-0532",
    imagem: "imagens/comercio.png",
    horario: "Segunda a Sábado: 07:00 às 20:00",
    tags: ["aviário", "pet shop", "ração", "cachorro", "gato", "animais", "pet"],
    rating: 5.0,
    destaque: false
  },
  {
    id: "8",
    nome: "Big Brother Lanches",
    categoria: "Alimentação & Gastronomia",
    descricao: "O lugar ideal para matar a sua fome e curtir com os amigos! Oferecemos lanches saborosos, porções bem servidas e bebidas geladas com um atendimento de primeira.",
    localizacao: "Rua Justo Manfron, 4142",
    contato: "(41) 99779-8261",
    imagem: "imagens/alimentacao.png",
    horario: "Todos os dias: 09:00 às 21:00",
    tags: ["lanchonete", "bar", "lanches", "porções", "hambúrguer", "bebidas"],
    rating: 5.0,
    destaque: false
  }
];
