const local = window.location.search;
console.log(local);

const info = new URLSearchParams(local);
console.log(info);

console.log(info.get('nome'));
console.log(info.get('sobrenome'));
console.log(info.get('ordenanca'));
console.log(info.get('data'));
console.log(info.get('local'));
console.log(info.get('fone'));
console.log(info.get('e-mail'));

document.querySelector('#resultados').innerHTML = `
    <p>Agendamento para ${info.get('nome')} ${info.get('sobrenome')}</p>`