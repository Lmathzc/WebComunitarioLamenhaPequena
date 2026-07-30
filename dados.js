/**
 * @file dados.js
 * ========================================================================
 * BANCO DE DADOS ESTÁTICO (MOCK) E CONFIGURAÇÕES GLOBAIS
 * ========================================================================
 * Como nossa aplicação não possui um Back-End ou Banco de Dados em nuvem,
 * este arquivo atua como a nossa fonte de verdade inicial. Ele fornece 
 * as informações acadêmicas da UNINTER, as categorias do sistema e a 
 * carga inicial de 8 comércios locais.
 */

/* ========================================================================
  [1] INFORMAÇÕES ACADÊMICAS (UNINTER)
  Objeto constante lido pelo script.js para preencher a barra lateral 
  (Painel do Estudante) automaticamente.
  ========================================================================
*/
const PROPOSTA_ACADEMICA = {
  aluno: "Leonardo Mathucewski Pupia",
  ru: "4568395",
  titulo: "Desenvolvimento de Catálogo Web Comunitário para Divulgação de Pequenos Comércios no Bairro Lamenha Pequena em Curitiba - PR",
  setorAplicacao: "Pequenos comércios varejistas, microempreendedores individuais e prestadores de serviços locais situados no bairro Lamenha Pequena, no município de Curitiba - PR.",
  ods: "ODS 08 - Trabalho Decente e Crescimento Econômico",
  odsJustificativa: "O catálogo web expande a presença digital de empreendedores locais de pequeno porte, fomentando a geração de renda e fortalecendo o comércio de bairro de maneira sustentável.",
  
  // Lista de objetivos. O script.js vai iterar sobre ela para gerar os <li> no HTML
  objetivos: [
    "Desenvolver um catálogo web interativo e responsivo utilizando HTML, CSS e JavaScript para mapear e divulgar pequenos comércios do bairro Lamenha Pequena em Curitiba - PR.",
    "Implementar interface amigável e acessível com HTML, CSS e JavaScript para facilitar a localização de serviços e o contato direto entre consumidores e comerciantes locais.",
    "Avaliar a usabilidade da aplicação em HTML, CSS e JavaScript por meio do feedback dos comerciantes cadastrados, otimizando a navegação e a visibilidade dos estabelecimentos."
  ]
};

/* ========================================================================
  [2] CATEGORIAS DO SISTEMA
  Array simples usado para renderizar os botões de filtro no topo da 
  página e as tags <option> dentro do formulário de cadastro (Modal).
  A opção "Todos" é exclusiva para o filtro geral e ignorada no cadastro.
  ========================================================================
*/
const CATEGORIAS = [
  "Todos",
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
  [3] MAPEAMENTO DE ÍCONES (Assets Locais)
  Dicionário (Objeto) que liga exatamente o nome da categoria com o 
  caminho físico do arquivo de imagem salvo na pasta "imagens/".
  ========================================================================
*/
const MAPA_IMAGENS_CATEGORIA = {
  "Alimentação & Gastronomia": "imagens/alimentação & gastronomia.png",
  "Saúde, Beleza & Bem-estar": "imagens/saúde, beleza & bem-estar.png",
  "Comércio & Varejo": "imagens/comércio & varejo.png",
  "Serviços Profissionais": "imagens/serviços profissionais.png",
  "Casa & Construção": "imagens/casa & construção.png",
  "Transporte & Automotivo": "imagens/transporte & automotivo.png",
  "Educação & Lazer": "imagens/educação & lazer.png",
  "Tecnologia & Eletrônicos": "imagens/tecnologia & eletrônicos.png",
  "Outros": "imagens/outros.png"
};

/**
 * Função Auxiliar Global: Puxa o caminho da imagem de acordo com a categoria.
 * Caso a categoria não exista no mapa, aciona um "fallback" (plano B)
 * retornando a imagem padrão "outros.png".
 */
function obterImagemPorCategoria(categoria) {
  return MAPA_IMAGENS_CATEGORIA[categoria] || "imagens/outros.png";
}

/* ========================================================================
  [4] BASE DE DADOS INICIAL (Array de Objetos)
  Lista oficial com 8 comércios locais. Quando o site abre pela 1ª vez, 
  o script.js copia esta lista e a guarda no LocalStorage do navegador.
  Cada chave deste objeto alimenta diretamente o visual do Card.
  ========================================================================
*/
const comercios = [
  {
    id: "1", // Identificador único (Primary Key)
    nome: "Osvaldo Pupia - Elétrica e Hidráulica",
    categoria: "Casa & Construção",
    descricao: "Serviços profissionais e de confiança em manutenção elétrica e hidráulica, residencial e comercial.",
    localizacao: "Rua Justo Manfron, Santa Felicidade",
    contato: "(41) 99621-3405", // O script vai limpar a formatação na hora de criar o link do Whatsapp
    imagem: "imagens/casa & construção.png",
    horario: "Segunda a Sexta: 08:00 às 18:00",
    tags: ["eletricista", "encanador", "reformas", "manutenção"], // Palavras ocultas para o buscador
    rating: 5.0, // Avaliação simulada de 5 estrelas
    destaque: true // Ativa a tag dourada "DESTAQUE" no topo do Card
  },
  {
    id: "2",
    nome: "Guindastes Ribas",
    categoria: "Serviços Profissionais",
    descricao: "Especialistas em locação de guindastes, guinchos e empilhadeiras. Tradição e segurança para o seu serviço.",
    localizacao: "Rua Justo Manfron, Santa Felicidade",
    contato: "(41) 99971-0136",
    imagem: "imagens/serviços profissionais.png",
    horario: "Segunda a Sábado: 07:30 às 18:30",
    tags: ["guindaste", "locação", "guincho", "carga"],
    rating: 4.8,
    destaque: false
  },
  {
    id: "3",
    nome: "Brechó Madonas",
    categoria: "Comércio & Varejo",
    descricao: "Moda circular com peças únicas, sustentáveis e de alta qualidade com ótimos preços.",
    localizacao: "Rua Justo Manfron, 2422",
    contato: "(41) 98450-0260",
    imagem: "imagens/comércio & varejo.png",
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
    imagem: "imagens/saúde, beleza & bem-estar.png",
    horario: "Segunda a Sábado: 09:00 às 19:00",
    tags: ["maquiagem", "perfume", "cosméticos", "beleza"],
    rating: 4.7,
    destaque: false
  },
  {
    id: "5",
    nome: "Bar do Vermelho",
    categoria: "Alimentação & Gastronomia",
    descricao: "Ponto de encontro tradicional do bairro com bebidas geladas, petiscos e itens de conveniência.",
    localizacao: "Rua Justo Manfron, 2348",
    contato: "(41) 3657-2291",
    imagem: "imagens/alimentação & gastronomia.png",
    horario: "Segunda a Domingo: 10:00 às 22:00",
    tags: ["bebidas", "petiscos", "conveniência", "bar"],
    rating: 4.9,
    destaque: false
  },
  {
    id: "6",
    nome: "Toldos Santa Felicidade",
    categoria: "Casa & Construção",
    descricao: "Fabricação e instalação sob medida de toldos e coberturas, protegendo seu ambiente com qualidade.",
    localizacao: "Rua Justo Manfron, 2206",
    contato: "(41) 99991-6825",
    imagem: "imagens/casa & construção.png",
    horario: "Segunda a Sexta: 08:00 às 18:00 | Sábado: 08:00 às 12:00",
    tags: ["toldos", "coberturas", "proteção", "lona"],
    rating: 5.0,
    destaque: true
  },
  {
    id: "7",
    nome: "Madeireira Manfron",
    categoria: "Casa & Construção",
    descricao: "Madeiras de procedência, ferragens e materiais essenciais para a sua construção ou reforma.",
    localizacao: "Rua Justo Manfron, 2176",
    contato: "(41) 98873-4866",
    imagem: "imagens/casa & construção.png",
    horario: "Segunda a Sexta: 07:30 às 18:00 | Sábado: 07:30 às 12:00",
    tags: ["madeira", "construção", "ferragens", "reforma"],
    rating: 4.8,
    destaque: false
  },
  {
    id: "8",
    nome: "Bueno Consultora",
    categoria: "Serviços Profissionais",
    descricao: "Consultoria especializada e atendimento personalizado para impulsionar o seu desenvolvimento.",
    localizacao: "Av. Dr. Eugênio Bertolli, 3901",
    contato: "(41) 3224-1713",
    imagem: "imagens/serviços profissionais.png",
    horario: "Segunda a Sexta: 09:00 às 18:00",
    tags: ["consultoria", "planejamento", "gestão", "atendimento"],
    rating: 4.9,
    destaque: false
  }
];