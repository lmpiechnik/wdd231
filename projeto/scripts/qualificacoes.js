import "./main.js";

const qualifications = [
    {
        area: "Engenharia Civil",
        nivel: "Conhecimento técnico",
        foco: "Projetos e edificações",
        aplicacao: "Análise e planejamento"
    },
    {
        area: "Gestão de projetos",
        nivel: "Competência profissional",
        foco: "Planejamento",
        aplicacao: "Organização de atividades"
    },
    {
        area: "Inspeções técnicas",
        nivel: "Conhecimento aplicado",
        foco: "Edificações",
        aplicacao: "Identificação de problemas"
    },
    {
        area: "Instalações prediais",
        nivel: "Conhecimento técnico",
        foco: "Sistemas prediais",
        aplicacao: "Avaliação e planejamento"
    },
    {
        area: "Segurança",
        nivel: "Conhecimento aplicado",
        foco: "Prevenção",
        aplicacao: "Análise de riscos"
    },
    {
        area: "Consultoria",
        nivel: "Experiência profissional",
        foco: "Soluções técnicas",
        aplicacao: "Suporte à tomada de decisão"
    }
];

const container = document.querySelector("#qualifications-list");

if (container) {
    container.innerHTML = qualifications.map((qualification) => `
        <article class="info-card">
            <span class="eyebrow">${qualification.area}</span>

            <h3>${qualification.nivel}</h3>

            <p>
                <strong>Foco:</strong>
                ${qualification.foco}
            </p>

            <p>
                <strong>Aplicação:</strong>
                ${qualification.aplicacao}
            </p>
        </article>
    `).join("");
}