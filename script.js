/**
 * @file script.js
 * ========================================================================
 * MOTOR PRINCIPAL DA APLICAÇÃO (LÓGICA FRONT-END)
 * ========================================================================
 * Arquivo inteiramente escrito em Vanilla JavaScript (JS Puro).
 * Responsável por gerenciar o estado da aplicação, ler/gravar dados no 
 * cache do navegador (LocalStorage), renderizar os cards dinamicamente 
 * e escutar as interações do usuário (cliques, digitação e formulários).
 */

/* ========================================================================
  [1] ESTADO GLOBAL DA APLICAÇÃO (State Management)
  Objeto central que guarda as informações que estão ativas na tela no 
  momento. Sempre que o usuário pesquisa ou filtra algo, alteramos este 
  estado e mandamos a tela desenhar novamente (renderizar).
  ========================================================================
*/
let estado = {
  comercios: [],            // Array que guardará a lista de lojas atual
  favoritos: [],            // Array com os IDs das lojas favoritadas
  categoriaSelecionada: "Todos", // Categoria ativa no filtro
  buscaTermo: "",           // O que o usuário digitou na barra de pesquisa
  apenasFavoritos: false    // Flag (interruptor) do botão "Mostrar Favoritos"
};

/* ========================================================================
  [2] INICIALIZAÇÃO (Gatilho de Partida)
  O evento "DOMContentLoaded" avisa o JS que o HTML terminou de carregar.
  Só depois disso é seguro começar a manipular a tela.
  ========================================================================
*/
document.addEventListener("DOMContentLoaded", () => {
  inicializarEstado();         // 1. Puxa os dados do cache ou do dados.js
  carregarPainelAcademico();   // 2. Preenche os dados da UNINTER na sidebar
  carregarFiltrosCategorias(); // 3. Cria os botões redondos de categoria
  renderizar();                // 4. Desenha as lojas na tela pela 1ª vez
  configurarEventos();         // 5. Liga os "ouvintes" de cliques e digitação
  
  // Transforma as tags <i> em ícones SVG reais na tela inicial
  lucide.createIcons();
});

/* ========================================================================
  [3] BANCO DE DADOS LOCAL (LocalStorage)
  Função que tenta ler o cache do navegador. Se não existir (primeiro acesso),
  ele pega a constante 'comercios' do arquivo dados.js e salva no cache.
  ========================================================================
*/
function inicializarEstado() {
  // Lê a string salva no navegador sob a chave 'lamenha_comercios_v4'
  const savedComercios = localStorage.getItem("lamenha_comercios_v4");
  if (savedComercios) {
    try {
      // Converte a string de texto de volta para um Array de Objetos JS
      estado.comercios = JSON.parse(savedComercios);
    } catch (e) {
      estado.comercios = [...comercios]; // Falha de segurança, reseta para o padrão
    }
  } else {
    // Primeiro acesso: clona o array original do dados.js e salva no cache
    estado.comercios = [...comercios];
    localStorage.setItem("lamenha_comercios_v4", JSON.stringify(comercios));
  }

  // Faz o mesmo processo para a lista de IDs de lojas favoritadas
  const savedFavoritos = localStorage.getItem("lamenha_favoritos_v4");
  if (savedFavoritos) {
    try {
      estado.favoritos = JSON.parse(savedFavoritos);
    } catch (e) {
      estado.favoritos = [];
    }
  } else {
    estado.favoritos = [];
  }
}

/* ========================================================================
  [4] PREENCHIMENTO DO PAINEL DA UNINTER
  Lê o objeto PROPOSTA_ACADEMICA (dados.js) e injeta os textos no HTML.
  ========================================================================
*/
function carregarPainelAcademico() {
  // Pega os elementos do HTML pelo ID e troca o texto interno (textContent)
  const headerAluno = document.getElementById("header-aluno");
  if (headerAluno) headerAluno.textContent = PROPOSTA_ACADEMICA.aluno;
  
  const headerRu = document.getElementById("header-ru");
  if (headerRu) headerRu.textContent = `RU ${PROPOSTA_ACADEMICA.ru}`;

  document.getElementById("titulo-text").textContent = PROPOSTA_ACADEMICA.titulo;
  document.getElementById("setor-text").textContent = PROPOSTA_ACADEMICA.setorAplicacao;
  document.getElementById("ods-title-text").textContent = PROPOSTA_ACADEMICA.ods;
  document.getElementById("ods-just-text").textContent = PROPOSTA_ACADEMICA.odsJustificativa;

  // Lógica complexa para injetar a lista de objetivos formatada com cores e estilos
  const listContainer = document.getElementById("objectives-list");
  listContainer.innerHTML = "";

  PROPOSTA_ACADEMICA.objetivos.forEach((obj, idx) => {
    let formattedText = obj;
    
    // Destaca as palavras-chave de tecnologia pintando-as de azul
    const techs = ["HTML", "CSS", "JavaScript"];
    techs.forEach(tech => {
      formattedText = formattedText.replaceAll(
        tech, 
        `<span class="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 border border-indigo-100 rounded text-[10px] font-mono font-semibold">${tech}</span>`
      );
    });

    // Sublinha o primeiro verbo de cada objetivo (ex: "Desenvolver")
    const firstSpace = formattedText.indexOf(" ");
    if (firstSpace !== -1) {
      const verb = formattedText.substring(0, firstSpace);
      const rest = formattedText.substring(firstSpace);
      formattedText = `<strong class="text-amber-850 font-semibold underline decoration-amber-500 decoration-2">${verb}</strong>${rest}`;
    }

    // Injeta o HTML montado na tela
    const itemHTML = `
      <div class="pl-3.5 border-l-2 border-amber-500/80 relative animate-fade-in" style="animation-delay: ${idx * 80}ms">
        <div class="absolute top-0 left-0 w-1.5 h-1.5 bg-amber-500 rounded-full -ml-[4px] mt-1.5"></div>
        <div class="flex items-start gap-1.5">
          <p class="text-stone-700 text-xs leading-relaxed">${formattedText}</p>
        </div>
      </div>
    `;
    listContainer.insertAdjacentHTML("beforeend", itemHTML);
  });
}

/* ========================================================================
  [5] CRIAÇÃO DOS BOTÕES DE CATEGORIA DINÂMICOS
  Percorre o array CATEGORIAS (dados.js) e cria os botões para filtro.
  ========================================================================
*/
function carregarFiltrosCategorias() {
  const container = document.getElementById("categories-container");
  container.innerHTML = ""; // Limpa a div antes de redesenhar

  CATEGORIAS.forEach(cat => {
    const isActive = estado.categoriaSelecionada === cat; // Verifica se este botão é o que está ativo
    const button = document.createElement("button"); // Cria o elemento <button>
    button.textContent = cat;
    
    // Se estiver ativo, pinta de Laranja. Se não, pinta de Cinza claro.
    button.className = `px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition flex-shrink-0 duration-150 ${
      isActive
        ? "bg-amber-500 text-stone-900 font-semibold shadow-sm"
        : "bg-stone-100/80 text-stone-600 hover:bg-stone-200"
    }`;

    // Adiciona a função de clique no botão
    button.addEventListener("click", () => {
      estado.categoriaSelecionada = cat; // Atualiza o Estado Global
      carregarFiltrosCategorias(); // Redesenha os botões (para atualizar a cor)
      renderizar(); // Redesenha a lista de lojas (aplicando o filtro)
      showToast(`Filtrado por: ${cat}`);
    });

    container.appendChild(button); // Injeta o botão na tela
  });

  // Aproveita a carona e preenche as opções do campo <select> no formulário de Cadastro
  const modalSelect = document.getElementById("modal-select-category");
  modalSelect.innerHTML = "";
  CATEGORIAS.filter(c => c !== "Todos").forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    modalSelect.appendChild(opt);
  });
}

/* ========================================================================
  [6] MOTOR DE RENDERIZAÇÃO E FILTROS DAS LOJAS
  O coração do script. Sempre que algo muda (busca, filtro, apagar loja),
  esta função é chamada. Ela esvazia o HTML das lojas e desenha os cards 
  novamente aplicando as regras.
  ========================================================================
*/
function renderizar() {
  const grid = document.getElementById("businesses-grid");
  grid.innerHTML = ""; // Esvazia o painel

  // A função filter() cria uma nova lista apenas com as lojas que passarem nos 3 testes
  const filtrados = estado.comercios.filter(biz => {
    // 1º Teste (Categoria): A loja pertence à categoria selecionada?
    const matchesCategory = estado.categoriaSelecionada === "Todos" || biz.categoria === estado.categoriaSelecionada;
    
    // 2º Teste (Busca Textual): O texto digitado existe no nome, descrição ou tags da loja?
    const matchesSearch = 
      biz.nome.toLowerCase().includes(estado.buscaTermo.toLowerCase()) ||
      biz.descricao.toLowerCase().includes(estado.buscaTermo.toLowerCase()) ||
      (biz.tags && biz.tags.some(t => t.toLowerCase().includes(estado.buscaTermo.toLowerCase())));
      
    // 3º Teste (Favoritos): O usuário ativou o botão de só mostrar favoritos?
    const matchesFavorite = !estado.apenasFavoritos || estado.favoritos.includes(biz.id);

    // Só exibe a loja se ela passar em TODOS os testes (&&)
    return matchesCategory && matchesSearch && matchesFavorite;
  });

  // Atualiza os textos de "Mostrando X de Y comércios" na tela
  const countEl = document.getElementById("active-businesses-count");
  if (countEl) countEl.textContent = estado.comercios.length;
  
  document.getElementById("results-indicator").textContent = `Mostrando ${filtrados.length} de ${estado.comercios.length} comércios`;

  // Mostra ou esconde o botão "Limpar Filtros" se houver algum filtro ativo
  const resetLink = document.getElementById("btn-reset-filters-link");
  if (estado.categoriaSelecionada !== "Todos" || estado.buscaTermo !== "" || estado.apenasFavoritos) {
    resetLink.classList.remove("hidden");
  } else {
    resetLink.classList.add("hidden");
  }

  // CENA A: Nenhum comércio passou nos filtros (Tela de vazio)
  if (filtrados.length === 0) {
    grid.className = "min-h-[200px] flex items-center justify-center col-span-1 sm:col-span-2";
    grid.innerHTML = `
      <div class="bg-white rounded-2xl border border-stone-200 p-10 text-center flex flex-col items-center justify-center space-y-3.5 w-full animate-fade-in">
        <div class="p-4 bg-amber-50 rounded-full text-amber-700">
          <i data-lucide="search" class="h-8 w-8"></i>
        </div>
        <h4 class="text-stone-850 font-display font-bold text-base">Nenhum comércio encontrado</h4>
        <p class="text-stone-500 text-xs leading-relaxed max-w-md">
          Não localizamos nenhum estabelecimento para a pesquisa ou categoria selecionada. Redefina a busca ou cadastre um novo comércio!
        </p>
        <button
          onclick="abrirModal()"
          class="mt-2.5 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition duration-150 cursor-pointer"
        >
          <i data-lucide="plus" class="h-4 w-4"></i>
          <span>Cadastrar Comércio Local</span>
        </button>
      </div>
    `;
  } 
  // CENA B: Lojas encontradas. Vamos desenhar os Cartões (Cards).
  else {
    grid.className = "grid grid-cols-1 sm:grid-cols-2 gap-5 min-h-[200px]";
    
    // Loop para cada loja na lista 'filtrados'
    filtrados.forEach(biz => {
      const isFav = estado.favoritos.includes(biz.id);
      
      // Limpa pontuações do telefone e monta o link real do WhatsApp (API)
      const dddPhone = biz.contato.replace(/\D/g, "");
      const waLink = `https://wa.me/${dddPhone}?text=Olá!%20Encontrei%20sua%20empresa%20no%20Catálogo%20Web%20Comunitário%20de%20Lamenha%20Pequena.`;

      // Monta as mini-tags (palavras-chave)
      const tagsHTML = biz.tags ? biz.tags.map(t => `
        <span class="text-[10px] text-stone-500 bg-stone-100 hover:bg-stone-200/80 transition duration-100 px-2 py-0.5 rounded flex items-center gap-0.5 font-mono">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-2 w-2 text-stone-400"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
          ${t}
        </span>
      `).join('') : '';

      // Monta as estrelas de avaliação
      const ratingHTML = biz.rating ? `
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 text-amber-500 fill-amber-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span class="font-semibold text-stone-700 text-xs">${biz.rating.toFixed(1)}</span>
          <span class="text-[10px] text-stone-400 font-mono">(Avaliação Local)</span>
        </div>
      ` : '';

      const destaqueBadge = biz.destaque ? `
        <span class="inline-flex items-center text-[10px] uppercase font-mono font-bold px-3 py-0.5 bg-amber-500 text-stone-900 rounded-full tracking-wider shadow-sm">
          DESTAQUE
        </span>
      ` : '';

      // Chama função global (dados.js) para garantir que a imagem .png certa seja carregada baseada na categoria
      const imagemSrc = obterImagemPorCategoria(biz.categoria);

      // O HTML do Card Principal
      const cardHTML = `
        <div class="business-card bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between overflow-hidden relative group animate-fade-in">
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-neutral-100 group-hover:bg-amber-400 transition-colors duration-300"></div>

          <div>
            <div class="flex justify-between items-center mb-3 pt-1">
              <span class="text-[10px] uppercase font-mono font-bold px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-md">
                ${biz.categoria}
              </span>
              
              ${destaqueBadge}

              <div class="flex gap-1.5">
                <button onclick="compartilharComercio('${biz.id}')" class="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition cursor-pointer" title="Compartilhar informações">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </button>
                <button onclick="toggleFavorito('${biz.id}')" class="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer" title="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 ${isFav ? 'fill-rose-600 text-rose-600' : ''}"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
                <button onclick="excluirComercio('${biz.id}')" class="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer" title="Excluir comércio">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
              </div>
            </div>

            <div class="mb-4 flex gap-4 items-start">
              <div class="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0 flex items-center justify-center relative shadow-sm p-1">
                <img src="${imagemSrc}" alt="${biz.nome}" class="w-full h-full object-contain" onerror="this.onerror=null; this.src='imagens/outros.png';"/>
              </div>

              <div class="flex-1 min-w-0">
                <h3 class="text-sm md:text-base font-display font-bold text-stone-900 group-hover:text-amber-900 transition-colors duration-200 flex flex-wrap items-center gap-1.5">
                  ${biz.nome}
                </h3>
                <p class="text-xs text-stone-600 mt-1 leading-relaxed line-clamp-2" title="${biz.descricao}">
                  ${biz.descricao}
                </p>
              </div>
            </div>

            <div class="space-y-2.5 text-xs text-stone-500 border-t border-stone-100 pt-3.5 mb-4">
              <div class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 mt-0.5 text-amber-600 flex-shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span class="leading-tight text-stone-600">${biz.localizacao}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 text-amber-600 flex-shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span class="truncate leading-none text-stone-600">${biz.horario ? biz.horario : "Segunda a Sexta: Horário comercial"}</span>
              </div>
              ${ratingHTML}
            </div>
          </div>

          <div>
            <div class="flex flex-wrap gap-1 mb-4 max-h-[48px] overflow-hidden">
              ${tagsHTML}
            </div>
            <a
              href="${waLink}" target="_blank" rel="noopener noreferrer"
              class="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition duration-150 shadow-md shadow-emerald-600/10 hover:-translate-y-0.5 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 fill-white text-emerald-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Falar com o Proprietário</span>
            </a>
          </div>
        </div>
      `;

      grid.insertAdjacentHTML("beforeend", cardHTML); // Injeta o Card no grid
    });
  }

  lucide.createIcons(); // Transforma todos os novos ícones gerados no HTML acima em gráficos
}

/* ========================================================================
  [7] ESCUTADORES DE EVENTOS (Event Listeners)
  Atrela funções aos botões fixos da tela, como barra de pesquisa e form.
  ========================================================================
*/
function configurarEventos() {
  
  // Evento: Usuário digitou algo na barra de pesquisa
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    estado.buscaTermo = e.target.value; // Salva o que foi digitado
    renderizar(); // Manda desenhar a tela de novo
  });

  // Evento: Clique no botão de Favoritos (Coração) no topo
  const favButton = document.getElementById("btn-filter-favorites");
  favButton.addEventListener("click", () => {
    estado.apenasFavoritos = !estado.apenasFavoritos; // Inverte o status (true/false)
    
    // Troca o visual do botão dependendo do status
    if (estado.apenasFavoritos) {
      favButton.classList.add("bg-rose-50", "border-rose-300", "text-rose-700");
      favButton.classList.remove("bg-white", "border-stone-200", "text-stone-600");
      showToast("Exibindo apenas os seus comércios salvos ❤️");
    } else {
      favButton.classList.remove("bg-rose-50", "border-rose-300", "text-rose-700");
      favButton.classList.add("bg-white", "border-stone-200", "text-stone-600");
      showToast("Exibindo todos os comércios do catálogo");
    }
    renderizar();
  });

  // Liga botões de limpar aos seus respectivos IDs
  document.getElementById("btn-clear-filters").addEventListener("click", resetarFiltros);
  document.getElementById("btn-reset-filters-link").addEventListener("click", resetarFiltros);

  // Liga botões que abrem e fecham o Modal
  document.getElementById("btn-open-modal").addEventListener("click", abrirModal);
  document.getElementById("btn-close-modal").addEventListener("click", fecharModal);
  document.getElementById("btn-cancel-modal").addEventListener("click", fecharModal);
  document.getElementById("modal-backdrop").addEventListener("click", fecharModal);

  /* ==================================================================
     [7.1] ROTINA DE CADASTRO (O "Create" do CRUD)
     O que acontece quando o usuário clica em "Cadastrar Comércio"
     ================================================================== */
  const addForm = document.getElementById("add-business-form");
  addForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede a página de dar refresh ao enviar o formulário
    
    // Coleta os valores digitados no formulário
    const nome = document.getElementById("modal-input-name").value.trim();
    const categoria = document.getElementById("modal-select-category").value;
    const contato = document.getElementById("modal-input-phone").value.trim();
    const localizacao = document.getElementById("modal-input-address").value.trim();
    const descricao = document.getElementById("modal-input-description").value.trim();
    const horario = document.getElementById("modal-input-hours").value.trim();
    const tagsInput = document.getElementById("modal-input-tags").value.trim();

    const errorBox = document.getElementById("modal-error-box");
    const errorMsg = document.getElementById("modal-error-message");

    // Validação de Segurança Básico
    if (!nome || !contato || !localizacao || !descricao || !horario) {
      errorBox.classList.remove("hidden");
      errorMsg.textContent = "Por favor, preencha todos os campos obrigatórios (*).";
      return; // Interrompe o envio se faltar algo
    }

    // Valida se o número tem pelo menos DDD (2) + 8 dígitos
    const dddDigits = contato.replace(/\D/g, "");
    if (dddDigits.length < 10) {
      errorBox.classList.remove("hidden");
      errorMsg.textContent = "Informe um WhatsApp completo válido (DDD + número).";
      return;
    }

    // Quebra as palavras-chave pela vírgula para criar o Array de tags
    const tags = tagsInput.split(",").map(t => t.trim().toLowerCase()).filter(t => t.length > 0);

    // Cria o novo "Objeto" de Loja
    const novoComercio = {
      id: `custom_${Date.now()}`, // Gera um ID único com base no relógio (timestamp)
      nome,
      categoria,
      descricao,
      localizacao: `${localizacao}, Curitiba - PR`,
      contato,
      imagem: obterImagemPorCategoria(categoria), // Puxa o ícone nativo associado
      horario,
      tags: tags.length > 0 ? tags : [categoria.toLowerCase()],
      destaque: false,
      rating: 5.0
    };

    // Adiciona o comércio no TOPO da lista oficial do sistema (unshift em vez de push)
    estado.comercios.unshift(novoComercio);
    
    // [PERSISTÊNCIA] Salva a lista atualizada no cache do navegador (LocalStorage)
    localStorage.setItem("lamenha_comercios_v4", JSON.stringify(estado.comercios));

    // Sucesso: Avisa o usuário, limpa o formulário, fecha a janela e redesenha a tela
    showToast(`Comércio "${nome}" cadastrado com sucesso! 🎉`);
    addForm.reset();
    fecharModal();
    renderizar();
  });
}

/* ========================================================================
  [8] FUNÇÕES AUXILIARES DE INTERFACE
  - resetarFiltros: Volta o sistema pro formato inicial.
  - abrirModal/fecharModal: Removem as classes CSS de invisibilidade.
  - showToast: Exibe a notificação verde no rodapé por 3 segundos.
  ========================================================================
*/
function resetarFiltros() {
  estado.categoriaSelecionada = "Todos";
  estado.buscaTermo = "";
  estado.apenasFavoritos = false;

  const favButton = document.getElementById("btn-filter-favorites");
  favButton.classList.remove("bg-rose-50", "border-rose-300", "text-rose-700");
  favButton.classList.add("bg-white", "border-stone-200", "text-stone-600");

  document.getElementById("search-input").value = "";

  carregarFiltrosCategorias();
  renderizar();
  showToast("Todos os filtros e buscas foram redefinidos.");
}

function abrirModal() {
  const modal = document.getElementById("add-business-modal");
  const modalContainer = modal.querySelector(".relative");
  const errorBox = document.getElementById("modal-error-box");

  errorBox.classList.add("hidden"); // Sempre esconde a caixa de erro ao abrir de novo
  modal.classList.remove("opacity-0", "pointer-events-none"); // Tira invisibilidade
  modalContainer.classList.remove("translate-y-[20px]"); // Faz o modal subir (Animação)
}

function fecharModal() {
  const modal = document.getElementById("add-business-modal");
  const modalContainer = modal.querySelector(".relative");

  modal.classList.add("opacity-0", "pointer-events-none");
  modalContainer.classList.add("translate-y-[20px]");
}

function showToast(message) {
  const toast = document.getElementById("toast-notification");
  const msgSpan = document.getElementById("toast-message");

  msgSpan.textContent = message;
  toast.classList.remove("opacity-0", "pointer-events-none", "translate-y-[-20px]");
  toast.classList.add("opacity-100", "translate-y-0");

  // Temporizador para esconder o Toast após 3 segundos
  setTimeout(() => {
    toast.classList.add("opacity-0", "pointer-events-none", "translate-y-[-20px]");
    toast.classList.remove("opacity-100", "translate-y-0");
  }, 3000);
}

/* ========================================================================
  [9] FUNÇÕES EDITORIAIS DOS CARDS (CRUD / Ações Diretas)
  Como essas funções são chamadas direto no HTML (onclick="funcao()"), 
  precisamos atrelá-las ao objeto global 'window' para que o HTML as enxergue.
  ========================================================================
*/

// (Update) Adiciona ou remove da lista de Favoritos do LocalStorage
window.toggleFavorito = function(id) {
  const index = estado.favoritos.indexOf(id); // Procura se a loja já está na lista
  const comercio = estado.comercios.find(c => c.id === id);
  const nome = comercio ? comercio.nome : "Comércio";

  // Se 'index' não for -1, a loja já existe. Logo, removemos da lista.
  if (index !== -1) {
    estado.favoritos.splice(index, 1);
    showToast(`"${nome}" removido dos seus favoritos.`);
  } else {
    // Se não existir, inserimos na lista (push).
    estado.favoritos.push(id);
    showToast(`"${nome}" adicionado aos favoritos! ❤️`);
  }

  // Salva o novo Array de favoritos no LocalStorage e desenha a tela de novo
  localStorage.setItem("lamenha_favoritos_v4", JSON.stringify(estado.favoritos));
  renderizar();
};

// Função de Compartilhar: Copia as infos textuais da loja para a área de transferência do dispositivo
window.compartilharComercio = function(id) {
  const biz = estado.comercios.find(c => c.id === id);
  if (!biz) return;

  const shareText = `Confira o comércio "${biz.nome}" no Catálogo Web de Lamenha Pequena!\nCategoria: ${biz.categoria}\nEndereço: ${biz.localizacao}\nContato: ${biz.contato}`;
  
  navigator.clipboard.writeText(shareText).then(() => {
    showToast(`Informações de "${biz.nome}" copiadas para compartilhamento!`);
  }).catch(() => {
    showToast("Erro ao tentar copiar texto de compartilhamento.");
  });
};

// (Delete) A rotina de Exclusão de Comércio
window.excluirComercio = function(id) {
  const comercio = estado.comercios.find(c => c.id === id);
  if (!comercio) return;

  // Usa o sistema de alerta nativo do navegador (Caixa pop-up com OK / Cancelar)
  const confirmar = confirm(`Tem certeza que deseja excluir o comércio "${comercio.nome}"?\nEsta ação não poderá ser desfeita.`);

  if (confirmar) {
    // 1. Remove da lista principal recriando o Array com todas as lojas, MENOS (id !==) a que foi clicada.
    estado.comercios = estado.comercios.filter(c => c.id !== id);
    localStorage.setItem("lamenha_comercios_v4", JSON.stringify(estado.comercios));

    // 2. Por segurança, removemos dos favoritos também para não gerar erros no sistema
    const favIndex = estado.favoritos.indexOf(id);
    if (favIndex !== -1) {
      estado.favoritos.splice(favIndex, 1);
      localStorage.setItem("lamenha_favoritos_v4", JSON.stringify(estado.favoritos));
    }

    // 3. Atualiza a tela e mostra a notificação de sucesso
    renderizar();
    showToast(`"${comercio.nome}" foi excluído com sucesso.`);
  }
};