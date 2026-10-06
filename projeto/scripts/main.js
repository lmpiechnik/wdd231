const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#site-navigation");
const yearElement = document.querySelector("#current-year");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );
    });
}

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/*
 * LocalStorage:
 * registra a última página visitada pelo usuário.
 */
localStorage.setItem("ultimaPagina", window.location.pathname);

/*
 * Formulário da página inicial.
 * Mantemos esta função preparada para quando o formulário
 * for adicionado à página principal.
 */
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", () => {
        const nameInput = contactForm.querySelector("#nome");

        if (nameInput) {
            localStorage.setItem("ultimoNome", nameInput.value);
        }
    });
}