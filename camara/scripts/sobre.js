import { locais } from "../data/locais.mjs";

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-navigation");
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");
const placesContainer = document.querySelector("#places-container");
const visitMessage = document.querySelector("#visit-message");

// Menu mobile
if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );
    });
}

// Ano atual
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Última modificação
if (lastModified) {
    lastModified.textContent = document.lastModified;
}

// Mensagem de visita
function displayVisitMessage() {
    if (!visitMessage) return;

    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();

    if (!lastVisit) {
        visitMessage.textContent =
            "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
    } else {
        const difference = currentVisit - Number(lastVisit);
        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        if (days < 1) {
            visitMessage.textContent = "Já voltou? Que legal!";
        } else {
            visitMessage.textContent =
                `Seu último acesso foi há ${days} dia${days === 1 ? "" : "s"}.`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit);
}

// Exibe os pontos de interesse
function displayPlaces() {
    if (!placesContainer) return;

    placesContainer.innerHTML = "";

    locais.forEach((local) => {
        const card = document.createElement("article");

        card.className = "place-card";

        card.innerHTML = `
            <h2>${local.nome}</h2>

            <figure>
                <img
                    src="${local.imagem}"
                    alt="${local.nome}"
                    loading="lazy"
                    width="300"
                    height="200"
                >
            </figure>

            <address>${local.endereco}</address>

            <p>${local.descricao}</p>

            <button
                class="place-button"
                type="button"
                data-place="${local.nome}"
            >
                Saiba mais
            </button>
        `;

        placesContainer.appendChild(card);
    });

    setupLearnMoreButtons();
}

// Botões "Saiba mais"
function setupLearnMoreButtons() {
    const buttons = document.querySelectorAll(".place-button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const placeName = button.dataset.place;

            alert(
                `Você selecionou: ${placeName}`
            );
        });
    });
}

displayVisitMessage();
displayPlaces();