const params = new URLSearchParams(window.location.search);

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-navigation");

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");


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
   EXIBIR DADOS DO FORMULÁRIO
================================= */

document.querySelector("#display-first-name").textContent =
    params.get("first-name") || "Não informado";

document.querySelector("#display-last-name").textContent =
    params.get("last-name") || "Não informado";

document.querySelector("#display-email").textContent =
    params.get("email") || "Não informado";

document.querySelector("#display-phone").textContent =
    params.get("phone") || "Não informado";

document.querySelector("#display-organization").textContent =
    params.get("organization") || "Não informado";


/* =================================
   DATA E HORA
================================= */

const timestamp =
    params.get("timestamp");

const timestampElement =
    document.querySelector("#display-timestamp");


if (timestamp) {

    const date =
        new Date(timestamp);

    if (!Number.isNaN(date.getTime())) {

        timestampElement.textContent =
            date.toLocaleString(
                "pt-BR",
                {
                    dateStyle: "short",
                    timeStyle: "short"
                }
            );

    } else {

        timestampElement.textContent =
            timestamp;

    }

} else {

    timestampElement.textContent =
        "Não informado";

}


/* =================================
   RODAPÉ
================================= */

currentYear.textContent =
    new Date().getFullYear();

lastModified.textContent =
    document.lastModified;