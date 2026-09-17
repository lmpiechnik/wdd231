/* =================================
   ELEMENTOS DA PÁGINA
================================= */

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-navigation");

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

const temperatureElement =
    document.querySelector("#current-temperature");

const weatherDescription =
    document.querySelector("#weather-description");

const weatherFeelsLike =
    document.querySelector("#weather-feels-like");

const weatherIcon =
    document.querySelector("#weather-icon");

const forecastContainer =
    document.querySelector("#forecast-container");

const spotlightContainer =
    document.querySelector("#spotlight-container");


/* =================================
   CONFIGURAÇÃO OPENWEATHERMAP
================================= */

/*
   Substitua pelo seu API Key do OpenWeatherMap.
*/

const API_KEY = "MinhaChaveeSecreta";

const CITY = "Curitiba,BR";

const WEATHER_URL =
    `https://api.openweathermap.org/data/2.5/weather?` +
    `q=${CITY}` +
    `&units=metric` +
    `&lang=pt_br` +
    `&appid=${API_KEY}`;

const FORECAST_URL =
    `https://api.openweathermap.org/data/2.5/forecast?` +
    `q=${CITY}` +
    `&units=metric` +
    `&lang=pt_br` +
    `&appid=${API_KEY}`;


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
   COPYRIGHT
================================= */

currentYear.textContent =
    new Date().getFullYear();


/* =================================
   ÚLTIMA MODIFICAÇÃO
================================= */

lastModified.textContent =
    document.lastModified;


/* =================================
   CLIMA ATUAL
================================= */

async function getCurrentWeather() {

    try {

        const response =
            await fetch(WEATHER_URL);

        if (!response.ok) {

            throw new Error(
                "Não foi possível carregar o clima."
            );

        }

        const data =
            await response.json();


        temperatureElement.textContent =
            `${Math.round(data.main.temp)}°C`;


        weatherDescription.textContent =
            capitalizeFirstLetter(
                data.weather[0].description
            );


        weatherFeelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;


        weatherIcon.textContent =
            getWeatherEmoji(
                data.weather[0].icon
            );


    } catch (error) {

        console.error(
            "Erro ao carregar o clima:",
            error
        );

        temperatureElement.textContent =
            "--°C";

        weatherDescription.textContent =
            "Clima indisponível";

        weatherFeelsLike.textContent =
            "--°C";

        weatherIcon.textContent =
            "❓";

    }

}


/* =================================
   PREVISÃO DO TEMPO
================================= */

async function getForecast() {

    try {

        const response =
            await fetch(FORECAST_URL);

        if (!response.ok) {

            throw new Error(
                "Não foi possível carregar a previsão."
            );

        }

        const data =
            await response.json();


        const forecastDays =
            groupForecastByDay(data.list);


        displayForecast(
            forecastDays.slice(0, 3)
        );


    } catch (error) {

        console.error(
            "Erro ao carregar previsão:",
            error
        );

        forecastContainer.innerHTML = `
            <p>
                Previsão do tempo indisponível.
            </p>
        `;

    }

}


/* =================================
   AGRUPAR PREVISÃO POR DIA
================================= */

function groupForecastByDay(forecastList) {

    const days = {};

    forecastList.forEach((item) => {

        const date =
            item.dt_txt.split(" ")[0];


        if (!days[date]) {

            days[date] = [];

        }


        days[date].push(item);

    });


    return Object.entries(days).map(
        ([date, items]) => {

            const temperatures =
                items.map(
                    item => item.main.temp
                );


            const representative =
                items.reduce(
                    (closest, item) => {

                        const hour =
                            new Date(
                                item.dt * 1000
                            ).getHours();

                        const closestHour =
                            new Date(
                                closest.dt * 1000
                            ).getHours();

                        return Math.abs(
                            hour - 12
                        ) <
                            Math.abs(
                                closestHour - 12
                            )
                            ? item
                            : closest;

                    }
                );


            return {

                date,

                min:
                    Math.min(
                        ...temperatures
                    ),

                max:
                    Math.max(
                        ...temperatures
                    ),

                icon:
                    representative.weather[0].icon,

                description:
                    representative.weather[0].description

            };

        }
    );

}


/* =================================
   EXIBIR PREVISÃO
================================= */

function displayForecast(days) {

    forecastContainer.innerHTML = "";


    days.forEach((day) => {

        const forecastElement =
            document.createElement("div");


        forecastElement.classList.add(
            "forecast-day"
        );


        forecastElement.innerHTML = `

            <strong>
                ${formatForecastDate(day.date)}
            </strong>

            <span
                class="forecast-icon"
                aria-label="${day.description}"
                title="${day.description}"
            >
                ${getWeatherEmoji(day.icon)}
            </span>

            <span>
                ${Math.round(day.max)}°C /
                ${Math.round(day.min)}°C
            </span>

        `;


        forecastContainer.appendChild(
            forecastElement
        );

    });

}


/* =================================
   MEMBROS EM DESTAQUE
================================= */

async function getFeaturedMembers() {

    try {

        const response =
            await fetch("data/membros.json");


        if (!response.ok) {

            throw new Error(
                "Não foi possível carregar os membros."
            );

        }


        const data =
            await response.json();


        const eligibleMembers =
            data.members.filter(
                member =>
                    member.membershipLevel === 2 ||
                    member.membershipLevel === 3
            );


        const randomMembers =
            shuffleArray(
                eligibleMembers
            ).slice(0, 3);


        displayFeaturedMembers(
            randomMembers
        );


    } catch (error) {

        console.error(
            "Erro ao carregar membros:",
            error
        );


        spotlightContainer.innerHTML = `
            <p>
                Não foi possível carregar os
                membros em destaque.
            </p>
        `;

    }

}


/* =================================
   EXIBIR MEMBROS EM DESTAQUE
================================= */

function displayFeaturedMembers(members) {

    spotlightContainer.innerHTML = "";


    members.forEach((member) => {

        const card =
            document.createElement("article");


        card.classList.add(
            "spotlight-card"
        );


        card.innerHTML = `

            <img
                class="spotlight-image"
                src="imagens/${member.image}"
                alt="Logo da empresa ${member.name}"
                loading="lazy"
                width="300"
                height="180"
            >

            <div class="spotlight-content">

                <span class="
                    membership-level
                    level-${member.membershipLevel}
                ">
                    ${getMembershipName(
            member.membershipLevel
        )}
                </span>


                <h3>
                    ${member.name}
                </h3>


                <p class="member-info">

                    <strong>
                        Endereço:
                    </strong><br>

                    ${member.address}

                </p>


                <p class="member-info">

                    <strong>
                        Telefone:
                    </strong><br>

                    <a href="tel:${member.phoneLink}">
                        ${member.phone}
                    </a>

                </p>


                <p class="member-info">

                    <strong>
                        Site:
                    </strong><br>

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


        spotlightContainer.appendChild(
            card
        );

    });

}


/* =================================
   NÍVEL DE ASSOCIAÇÃO
================================= */

function getMembershipName(level) {

    switch (level) {

        case 2:
            return "Prata";

        case 3:
            return "Ouro";

        default:
            return "Membro";

    }

}


/* =================================
   EMBARALHAR ARRAY
================================= */

function shuffleArray(array) {

    const shuffled =
        [...array];


    for (
        let i = shuffled.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            shuffled[i],
            shuffled[j]
        ] = [
                shuffled[j],
                shuffled[i]
            ];

    }


    return shuffled;

}


/* =================================
   EMOJIS DO CLIMA
================================= */

function getWeatherEmoji(icon) {

    const weatherIcons = {

        "01d": "☀️",
        "01n": "🌙",

        "02d": "🌤️",
        "02n": "🌙",

        "03d": "☁️",
        "03n": "☁️",

        "04d": "☁️",
        "04n": "☁️",

        "09d": "🌧️",
        "09n": "🌧️",

        "10d": "🌦️",
        "10n": "🌧️",

        "11d": "⛈️",
        "11n": "⛈️",

        "13d": "❄️",
        "13n": "❄️",

        "50d": "🌫️",
        "50n": "🌫️"

    };


    return weatherIcons[icon] || "🌤️";

}


/* =================================
   FORMATAR DATA
================================= */

function formatForecastDate(dateString) {

    const date =
        new Date(`${dateString}T12:00:00`);


    return date.toLocaleDateString(
        "pt-BR",
        {
            weekday: "long"
        }
    ).replace(
        "-feira",
        ""
    );

}


/* =================================
   PRIMEIRA LETRA MAIÚSCULA
================================= */

function capitalizeFirstLetter(text) {

    return text.charAt(0).toUpperCase()
        + text.slice(1);

}


/* =================================
   INICIAR PÁGINA
================================= */

getCurrentWeather();

getForecast();

getFeaturedMembers();