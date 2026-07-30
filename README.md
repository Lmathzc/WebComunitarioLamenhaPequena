# 🏪 Catálogo Web Comunitário • Lamenha Pequena

> Projeto de Extensão Universitária desenvolvido para a disciplina de **Atividade Extensionista II - Tecnologia aplicada à Inclusão Digital - Projeto** do curso de Análise e Desenvolvimento de Sistemas (UNINTER).

## 📍 Sobre o Projeto

O **Catálogo Web Comunitário** é uma plataforma digital focada em dar visibilidade, apoiar e fortalecer os pequenos comércios e prestadores de serviços tradicionais do bairro **Lamenha Pequena**, na cidade de Curitiba - PR. 

O projeto foi construído sob os princípios do **ODS 08 (Trabalho Decente e Crescimento Econômico)** da ONU, democratizando o acesso tecnológico para o fomento de renda local. Como a aplicação roda inteiramente no lado do cliente (Front-End) sem necessidade de infraestrutura de servidores complexa, ela simula um banco de dados utilizando a API nativa de `localStorage` dos navegadores.

---

## ✨ Funcionalidades (Features)

- **Mapeamento Local:** Visualização rápida de comércios da região com foco em acessibilidade (Mobile-First).
- **Filtros Dinâmicos:** Filtragem em tempo real por categoria (Alimentação, Saúde, Varejo, etc.) e busca textual por nome, descrição ou palavras-chave.
- **Gestão de Favoritos:** O usuário pode "favoritar" os estabelecimentos que mais frequenta, e essa preferência fica salva no cache do seu próprio dispositivo.
- **Integração com WhatsApp:** Botão de contato direto com o lojista, facilitando a geração de negócios reais.
- **Operações CRUD (Client-Side):**
  - **Create:** Modal interativo para que os próprios moradores cadastrem novos comércios.
  - **Read:** Leitura e renderização dinâmica dos *cards* na tela.
  - **Update:** Atualização do status de estabelecimentos favoritos.
  - **Delete:** Exclusão de comércios com alerta de confirmação.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando uma abordagem **100% Vanilla** para a lógica, garantindo alta performance e independência de frameworks pesados no JavaScript.

- **HTML5:** Estruturação semântica e acessível.
- **CSS3:** Refinamentos de interface e scrollbars customizadas.
- **JavaScript (ES6+):** Manipulação avançada do DOM e gestão de estado global.
- **Tailwind CSS (via CDN):** Framework de utilitários para estilização ágil, responsividade e animações.
- **Web Storage API (`localStorage`):** Persistência de dados local simulando um banco de dados relacional.
- **Lucide Icons:** Biblioteca de ícones vetoriais leves e consistentes.
