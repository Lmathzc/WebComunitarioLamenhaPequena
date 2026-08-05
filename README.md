# Catálogo Web Comunitário • Lamenha Pequena

> Projeto de Extensão Universitária desenvolvido para a disciplina de **Atividade Extensionista II - Tecnologia Aplicada à Inclusão Digital - Projeto**, do curso de Tecnologia em Análise e Desenvolvimento de Sistemas (UNINTER).

## Sobre o Projeto

O **Catálogo Web Comunitário** é uma plataforma digital focada em dar visibilidade, apoiar e fortalecer os pequenos comércios e prestadores de serviços tradicionais do bairro Lamenha Pequena, na cidade de Curitiba - PR. 

O projeto foi estruturado sob os princípios do **ODS 08 (Trabalho Decente e Crescimento Econômico)** da ONU, democratizando o acesso tecnológico para o fomento de renda local. Como a aplicação opera inteiramente no lado do cliente (Front-End) sem a necessidade de infraestrutura de servidores complexa, utiliza-se a API nativa de `localStorage` dos navegadores para a simulação de persistência de dados.

---

## Funcionalidades Principais

- **Mapeamento Local:** Visualização rápida de comércios da região com arquitetura orientada à acessibilidade (Mobile-First).
- **Filtros Dinâmicos:** Filtragem em tempo real por categorias e motor de busca textual por nome, descrição ou palavras-chave.
- **Gestão de Favoritos:** O usuário pode favoritar os estabelecimentos de sua preferência, com salvamento de estado no cache do próprio dispositivo.
- **Integração de Contato:** Linkagem direta com a API do WhatsApp do lojista, facilitando a geração de negócios reais.
- **Operações CRUD (Client-Side):**
  - **Create:** Modal interativo para cadastro autônomo de novos comércios.
  - **Read:** Leitura e renderização dinâmica dos *cards* na interface.
  - **Update:** Atualização do status de estabelecimentos favoritos.
  - **Delete:** Exclusão de comércios com alerta de confirmação no DOM.

---

## Tecnologias Utilizadas

Este projeto foi desenvolvido adotando uma abordagem **100% Vanilla** para a lógica de negócios, garantindo alta performance e independência de frameworks pesados no ambiente JavaScript.

- **HTML5:** Estruturação semântica e acessível.
- **CSS3:** Refinamentos de interface e customização de elementos nativos.
- **JavaScript (ES6+):** Manipulação avançada do DOM e gestão de estado global.
- **Tailwind CSS (via CDN):** Framework de utilitários para estilização ágil e responsividade.
- **Web Storage API (`localStorage`):** Persistência de dados local, atuando como banco de dados simulado.
- **Lucide Icons:** Biblioteca de ícones vetoriais leves para a interface gráfica.
