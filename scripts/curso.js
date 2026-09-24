const listaCursos = document.querySelector("#listaCursos");
const totalCreditos = document.querySelector("#totalCreditos");
const infosDoCurso = document.querySelector("#infos-do-curso");

const botaoTodos = document.querySelector("#todos");
const botaoWdd = document.querySelector("#wdd");
const botaoCse = document.querySelector("#cse");


function mostrarCursos(filtro = "todos") {

    let cursosFiltrados = cursos;

    if (filtro === "wdd") {
        cursosFiltrados = cursos.filter(
            curso => curso.assunto === "WDD"
        );
    }

    if (filtro === "cse") {
        cursosFiltrados = cursos.filter(
            curso => curso.assunto === "CSE"
        );
    }

    listaCursos.innerHTML = "";

    cursosFiltrados.forEach(curso => {

        const cartao = document.createElement("article");

        cartao.classList.add("curso");

        if (curso.concluido) {
            cartao.classList.add("concluido");
        }

        cartao.innerHTML = `
            <h3>${curso.assunto} ${curso.numero}</h3>

            <h4>${curso.titulo}</h4>

            <p>${curso.descricao}</p>

            <p>
                <strong>Créditos:</strong> ${curso.creditos}
            </p>

            <p>
                <strong>Tecnologias:</strong>
                ${curso.tecnologia.join(", ")}
            </p>

            <span class="status">
                ${curso.concluido ? "Concluído ✓" : "Em andamento"}
            </span>
        `;

        cartao.addEventListener("click", () => {
            exibirInfosDoCurso(curso);
        });

        listaCursos.appendChild(cartao);
    });

    const creditos = cursosFiltrados.reduce(
        (total, curso) => total + curso.creditos,
        0
    );

    totalCreditos.textContent = creditos;
}


function exibirInfosDoCurso(curso) {

    infosDoCurso.innerHTML = `
        <button id="fecharModal" type="button" aria-label="Fechar">
            ❌
        </button>

        <h2>${curso.assunto} ${curso.numero}</h2>

        <h3>${curso.titulo}</h3>

        <p>
            <strong>Créditos:</strong>
            ${curso.creditos}
        </p>

        <p>
            <strong>Certificado:</strong>
            ${curso.certificado}
        </p>

        <p>
            <strong>Descrição:</strong>
            ${curso.descricao}
        </p>

        <p>
            <strong>Arquitetura Tecnológica:</strong>
            ${curso.tecnologia.join(", ")}
        </p>
    `;

    infosDoCurso.showModal();

    const fecharModal = document.querySelector("#fecharModal");

    fecharModal.addEventListener("click", () => {
        infosDoCurso.close();
    });
}


infosDoCurso.addEventListener("click", (event) => {

    const retangulo = infosDoCurso.getBoundingClientRect();

    const clicouFora =
        event.clientX < retangulo.left ||
        event.clientX > retangulo.right ||
        event.clientY < retangulo.top ||
        event.clientY > retangulo.bottom;

    if (clicouFora) {
        infosDoCurso.close();
    }
});


function ativarFiltro(botaoSelecionado) {

    document.querySelectorAll(".filtro").forEach(botao => {
        botao.classList.remove("ativo");
    });

    botaoSelecionado.classList.add("ativo");
}


botaoTodos.addEventListener("click", () => {
    ativarFiltro(botaoTodos);
    mostrarCursos("todos");
});


botaoWdd.addEventListener("click", () => {
    ativarFiltro(botaoWdd);
    mostrarCursos("wdd");
});


botaoCse.addEventListener("click", () => {
    ativarFiltro(botaoCse);
    mostrarCursos("cse");
});


document.querySelector("#anoAtual").textContent =
    new Date().getFullYear();


document.querySelector("#ultimaModificacao").textContent =
    `Última modificação: ${document.lastModified}`;


mostrarCursos();