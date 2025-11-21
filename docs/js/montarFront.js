import { profissao } from "./objetos.js";

document.addEventListener("DOMContentLoaded", function () {
  const elMain = document.querySelector("#gridProfissao");
  const elSelectFiltro = document.querySelector("#filtroProfissao");
  const elTextBuscar = document.querySelector("#txtBuscar");

  function exibirProfissao(profissoes) {
    elMain.innerHTML = "";

    if (profissoes.length === 0) {

      elMain.innerHTML = `
      <div class="my-10 flex justify-center">
        <div class="text-center  md:w-2/3">
        <h3 class="text-2xl text-center ">Desculpe, nenhuma profissão encontrada!</h3>
       </div>
  </div>
`;
      return;
    }

    profissoes.forEach((p) => {
      let corDemanda = "";
      if (p.demanda.toLowerCase() === "alta") {
        corDemanda = "bg-red-400";
      } else if (p.demanda.toLowerCase() === "média" || p.demanda.toLowerCase() === "media") {
        corDemanda = "bg-yellow-300";
      } else if (p.demanda.toLowerCase() === "baixa") {
        corDemanda = "bg-green-300";
      }

      elMain.innerHTML += `

      <div class="bg-white dark:bg-gray-900/30 border border-violet-500/40 dark:border-violet-300/20 
       shadow-xl rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">

      <div class="w-full h-56 sm:h-60 md:h-64 lg:h-72 xl:h-80">
        <img src="${p.imagem}" class="w-full h-full object-cover" />
      </div>

      <div class="p-6 flex flex-col gap-6">

      <div class="flex flex-wrap items-center justify-between gap-4">

        <h1 class="font-chakra font-extrabold text-gray-900 dark:text-gray-100
          text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl "> ${p.titulo} </h1>

            <div class="flex flex-wrap gap-2">

                <span class="px-3 py-1 rounded-full border bg-violet-700/30 dark:bg-violet-600/30 
                 text-violet-800 dark:text-violet-100  border-violet-400/30 dark:border-violet-300/20
                    text-xs sm:text-sm md:text-base lg:text-lg"> ${p.area} </span>

                <span class="px-3 py-1 rounded-full text-white
                  text-xs sm:text-sm md:text-base lg:text-lg ${corDemanda}">
                   ${p.demanda}</span>
              
            </div>
        </div>

      
        <p class="text-gray-900 dark:text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl">
            ${p.descricao}
        </p>

        <div class="grid grid-cols-2 gap-4">

            <div class="bg-white dark:bg-gray-700/40 p-4 rounded-lg 
                border border-white/10 dark:border-gray-600/20 hover:scale-[1.02] transition-transform duration-300">
                <p class="opacity-70 text-gray-700 dark:text-gray-300
                    text-[10px] sm:text-xs md:text-sm lg:text-base">
                    Competência
                </p>
                <p class="font-semibold text-gray-900 dark:text-gray-100
                    text-sm sm:text-base md:text-lg">
                    ${p.competencia}
                </p>
            </div>

            <div class="bg-white dark:bg-gray-700/40 p-4 rounded-lg 
                border border-white/10 dark:border-gray-600/20 hover:scale-[1.02] transition-transform duration-300">
                <p class="opacity-70 text-gray-700 dark:text-gray-300
                    text-[10px] sm:text-xs md:text-sm lg:text-base">
                    Formação
                </p>
                <p class="font-semibold text-gray-900 dark:text-gray-100
                    text-sm sm:text-base md:text-lg">
                    ${p.formacao}
                </p>
            </div>

            <div class="bg-white dark:bg-gray-700/40 p-4 rounded-lg 
                border border-white/10 dark:border-gray-600/20 hover:scale-[1.02] transition-transform duration-300">
                <p class="opacity-70 text-gray-700 dark:text-gray-300
                    text-[10px] sm:text-xs md:text-sm lg:text-base">
                    Salário
                </p>
                <p class="font-semibold text-gray-900 dark:text-gray-100
                    text-sm sm:text-base md:text-lg">
                    R$ ${p.mediaSalarial}
                </p>
            </div>

            <div class="bg-white dark:bg-gray-700/40 p-4 rounded-lg 
                border border-white/10 dark:border-gray-600/20 hover:scale-[1.02] transition-transform duration-300">
                <p class="opacity-70 text-gray-700 dark:text-gray-300
                    text-[10px] sm:text-xs md:text-sm lg:text-base">
                    Impacto Social
                </p>
                <p class="font-semibold text-gray-900 dark:text-gray-100
                    text-sm sm:text-base md:text-lg">
                    ${p.impactoSocial}
                </p>
            </div>

        </div>
    </div>
</div>`;
    });
  }
    
    
   //Preenche o filtro

  function preencherAreas() {
    const areas = [...new Set(profissao.map((p) => p.area))].sort();
      areas.forEach((are) => {
      const option = document.createElement("option");
      option.value = are;
      option.textContent = are;
      elSelectFiltro.appendChild(option);
    });
  }
    
     // Função para o Buscar

  function buscarProfissoes() {
    const valorBusca = elTextBuscar.value.toLowerCase().trim();

    if (valorBusca === "") {
      alert("Preencha o campo. Exibindo todas as profissões.");
      exibirProfissao(profissao);
    } else {
      const encontrados = profissao.filter((p) =>
        p.titulo.toLowerCase().includes(valorBusca)
      );
      exibirProfissao(encontrados);
    }
  }

    // Função para o filtro

  elSelectFiltro.addEventListener("change", function () {
    const valor = elSelectFiltro.value;
    if (valor === "todos") {
      exibirProfissao(profissao);
    } else {
      const filtrados = profissao.filter((p) => p.area === valor);
      exibirProfissao(filtrados);
    }
  });

    // Fazer a busca quando o enter for pressionado
  
  elTextBuscar.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      buscarProfissoes();
    }
  });

    preencherAreas();
  exibirProfissao(profissao);
});