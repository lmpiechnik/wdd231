// Selecione os elementos HTML no documento
const tempAtual = document.querySelector('#temp-atual');

const iconeDoClima = document.querySelector('#icone-do-clima');

const descrDaLegenda = document.querySelector('figcaption');


// URL da API
const url =
    'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=MinhaChaveAPIeSecreta';


// Função para buscar os dados da API
async function apiFetch() {
    try {
        const resposta = await fetch(url);

        if (resposta.ok) {
            const dados = await resposta.json();

            console.log(dados);

            mostrarResultados(dados);

        } else {
            throw Error(await resposta.text());
        }

    } catch (erro) {
        console.log(erro);
    }
}

apiFetch();


// Função para mostrar os resultados no HTML
function mostrarResultados(dados) {

    tempAtual.innerHTML = `${dados.main.temp}&deg;C`;

    const iconesrc =
        `https://openweathermap.org/img/w/${dados.weather[0].icon}.png`;

    let descr = dados.weather[0].description;

    iconeDoClima.setAttribute('src', iconesrc);

    iconeDoClima.setAttribute('alt', descr);

    descrDaLegenda.textContent = `${descr}`;
}

// Executar a função
apiFetch();