const botaoMenu = document.querySelector("#botaoMenu");
const menuNavegacao = document.querySelector("#menuNavegacao");

botaoMenu.addEventListener("click", () => {
    const menuAberto = menuNavegacao.classList.toggle("aberto");

    botaoMenu.setAttribute("aria-expanded", menuAberto);

    if (menuAberto) {
        botaoMenu.setAttribute("aria-label", "Fechar menu de navegação");
        botaoMenu.textContent = "✕";
    } else {
        botaoMenu.setAttribute("aria-label", "Abrir menu de navegação");
        botaoMenu.textContent = "☰";
    }
});