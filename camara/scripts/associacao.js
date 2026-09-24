const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-navigation");

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

const timestamp = document.querySelector("#timestamp");


/* =================================
   MENU RESPONSIVO
================================= */

function toggleMenu() {

    const isOpen =
        navigation.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen
            ? "Fechar menu"
            : "Abrir menu"
    );
}

menuButton.addEventListener(
    "click",
    toggleMenu
);


/* =================================
   DATA E HORA
================================= */

if (timestamp) {

    timestamp.value =
        new Date().toISOString();

}


/* =================================
   RODAPÉ
================================= */

currentYear.textContent =
    new Date().getFullYear();

lastModified.textContent =
    document.lastModified;


/* =================================
   MODAIS
================================= */

const modalLinks =
    document.querySelectorAll(".modal-link");

const closeButtons =
    document.querySelectorAll(".modal-close");


modalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const modalId =
            link.getAttribute("href");

        const modal =
            document.querySelector(modalId);

        if (modal) {
            modal.showModal();
        }

    });

});


closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modal =
            button.closest("dialog");

        modal.close();

    });

});


/* =================================
   FECHAR MODAL CLICANDO NO FUNDO
================================= */

document
    .querySelectorAll(".membership-modal")
    .forEach((modal) => {

        modal.addEventListener(
            "click",
            (event) => {

                if (event.target === modal) {
                    modal.close();
                }

            }
        );

    });