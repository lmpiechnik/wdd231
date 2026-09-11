const membersContainer = document.querySelector("#members-container");
const memberCount = document.querySelector("#member-count");

const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-navigation");

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");


/* =================================
   CARREGAR MEMBROS
================================= */

async function getMembers() {

    try {

        const response = await fetch("data/membros.json");

        if (!response.ok) {
            throw new Error("Não foi possível carregar os dados dos membros.");
        }

        const data = await response.json();

        displayMembers(data.members);

    } catch (error) {

        console.error("Erro:", error);

        memberCount.textContent =
            "Não foi possível carregar os membros.";

        membersContainer.innerHTML = `
            <p class="error-message">
                Ocorreu um erro ao carregar o diretório.
                Tente novamente mais tarde.
            </p>
        `;
    }
}


/* =================================
   EXIBIR MEMBROS
================================= */

function displayMembers(members) {

    membersContainer.innerHTML = "";

    memberCount.textContent =
        `${members.length} empresas e organizações associadas`;


    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img
                class="member-image"
                src="imagens/${member.image}"
                alt="Logo da empresa ${member.name}"
                loading="lazy"
                width="300"
                height="180"
            >

            <div class="member-content">

                <span class="membership-level level-${member.membershipLevel}">
                    ${getMembershipName(member.membershipLevel)}
                </span>

                <h3>${member.name}</h3>

                <p class="member-info">
                    <strong>Endereço:</strong><br>
                    ${member.address}
                </p>

                <p class="member-info">
                    <strong>Telefone:</strong><br>
                    <a href="tel:${member.phoneLink}">
                        ${member.phone}
                    </a>
                </p>

                <p class="member-info">
                    <strong>Site:</strong><br>
                    <a
                        href="${member.website}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visitar site
                    </a>
                </p>

            </div>
        `;

        membersContainer.appendChild(card);

    });

}


/* =================================
   NÍVEL DE ASSOCIAÇÃO
================================= */

function getMembershipName(level) {

    switch (level) {

        case 1:
            return "Membro";

        case 2:
            return "Prata";

        case 3:
            return "Ouro";

        default:
            return "Membro";

    }

}


/* =================================
   VISUALIZAÇÃO EM GRADE
================================= */

function showGrid() {

    membersContainer.classList.remove("members-list");
    membersContainer.classList.add("members-grid");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");

}


/* =================================
   VISUALIZAÇÃO EM LISTA
================================= */

function showList() {

    membersContainer.classList.remove("members-grid");
    membersContainer.classList.add("members-list");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");

}


/* =================================
   MENU RESPONSIVO
================================= */

function toggleMenu() {

    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

}


/* =================================
   EVENTOS
================================= */

gridButton.addEventListener("click", showGrid);

listButton.addEventListener("click", showList);

menuButton.addEventListener("click", toggleMenu);


/* =================================
   COPYRIGHT
================================= */

currentYear.textContent = new Date().getFullYear();


/* =================================
   ÚLTIMA MODIFICAÇÃO
================================= */

lastModified.textContent = document.lastModified;


/* =================================
   INICIAR DIRETÓRIO
================================= */

getMembers();