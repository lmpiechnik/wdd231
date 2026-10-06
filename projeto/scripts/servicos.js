import "./main.js";

const servicesContainer = document.querySelector("#services-list");
const filterSelect = document.querySelector("#service-filter");

const modal = document.querySelector("#service-modal");
const modalClose = document.querySelector("#modal-close");
const modalContent = document.querySelector("#modal-content");

let services = [];

/**
 * Busca os serviços no arquivo JSON.
 */
async function loadServices() {

    try {
        const response = await fetch("./data/servicos.json");

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        services = await response.json();

        displayServices(services);

    } catch (error) {

        console.error("Erro ao carregar os serviços:", error);

        if (servicesContainer) {
            servicesContainer.innerHTML = `
                <p>
                    Não foi possível carregar os serviços.
                    Tente novamente mais tarde.
                </p>
            `;
        }
    }
}

/**
 * Converte a categoria para texto amigável.
 */
function categoryName(category) {

    const categories = {
        civil: "Engenharia Civil",
        instalacoes: "Instalações",
        consultoria: "Consultoria",
        seguranca: "Segurança"
    };

    return categories[category] || "Engenharia";
}

/**
 * Exibe os serviços na página.
 */
function displayServices(items) {

    if (!servicesContainer) {
        return;
    }

    if (items.length === 0) {
        servicesContainer.innerHTML = `
            <p>Nenhum serviço encontrado.</p>
        `;

        return;
    }

    servicesContainer.innerHTML = items.map((service) => `
        <article class="service-card">

            <span class="service-category">
                ${categoryName(service.categoria)}
            </span>

            <h2>${service.nome}</h2>

            <p>
                ${service.descricao}
            </p>

            <ul class="service-details">
                <li>
                    <strong>Público:</strong>
                    ${service.publico}
                </li>

                <li>
                    <strong>Modalidade:</strong>
                    ${service.modalidade}
                </li>

                <li>
                    <strong>ID:</strong>
                    ${service.id}
                </li>
            </ul>

            <button
                class="button button-secondary service-details-button"
                type="button"
                data-id="${service.id}">
                Ver detalhes
            </button>

        </article>
    `).join("");

    addModalEvents();
}

/**
 * Filtra os serviços.
 */
function filterServices(category) {

    if (category === "todos") {
        displayServices(services);
        return;
    }

    const filteredServices = services.filter(
        (service) => service.categoria === category
    );

    displayServices(filteredServices);
}

/**
 * Adiciona eventos aos botões dos cards.
 */
function addModalEvents() {

    const buttons = document.querySelectorAll(".service-details-button");

    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            const serviceId = Number(button.dataset.id);

            const service = services.find(
                (item) => item.id === serviceId
            );

            if (!service) {
                return;
            }

            openServiceModal(service);
        });
    });
}

/**
 * Abre o modal acessível.
 */
function openServiceModal(service) {

    modalContent.innerHTML = `
        <span class="eyebrow">
            ${categoryName(service.categoria)}
        </span>

        <h2>${service.nome}</h2>

        <p>${service.descricao}</p>

        <p>
            <strong>Público:</strong>
            ${service.publico}
        </p>

        <p>
            <strong>Modalidade:</strong>
            ${service.modalidade}
        </p>
    `;

    modal.showModal();

    localStorage.setItem(
        "ultimoServicoVisualizado",
        service.nome
    );
}

/**
 * Fecha o modal.
 */
if (modalClose) {
    modalClose.addEventListener("click", () => {
        modal.close();
    });
}

/**
 * Fecha o modal quando o usuário clica fora do conteúdo.
 */
if (modal) {
    modal.addEventListener("click", (event) => {

        const rect = modal.getBoundingClientRect();

        const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (clickedOutside) {
            modal.close();
        }
    });
}

/**
 * Evento do filtro.
 */
if (filterSelect) {

    filterSelect.addEventListener("change", (event) => {
        filterServices(event.target.value);
    });
}

/**
 * Inicialização.
 */
loadServices();