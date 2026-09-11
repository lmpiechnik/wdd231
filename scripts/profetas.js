const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';

const cartoes = document.querySelector('#cartoes');

async function obterDadosDeProfetas() {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    // console.table(dados.profetas);

    exibirProfetas(dados.profetas);
}

const exibirProfetas = (profetas) => {
    profetas.forEach((profeta) => {
        // Cria os elementos do cartão
        const cartao = document.createElement('section');
        const nomeCompleto = document.createElement('h2');
        const retrato = document.createElement('img');

        // Nome completo
        nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;

        // Imagem
        retrato.setAttribute('src', profeta.urlImagem);
        retrato.setAttribute(
            'alt',
            `Retrato de ${profeta.nome} ${profeta.sobrenome}`
        );
        retrato.setAttribute('loading', 'lazy');
        retrato.setAttribute('width', '340');
        retrato.setAttribute('height', '440');

        // Data e local de nascimento
        const nascimento = document.createElement('p');
        nascimento.textContent = `Nascimento: ${profeta.nascimento} - ${profeta.localNascimento}`;

        // Adiciona os elementos ao cartão
        cartao.appendChild(nomeCompleto);
        cartao.appendChild(retrato);
        cartao.appendChild(nascimento);

        // Adiciona o cartão à div
        cartoes.appendChild(cartao);
    });
};

obterDadosDeProfetas();

