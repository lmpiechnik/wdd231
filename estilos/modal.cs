body {
  margin: 2rem;
font - size: 1.25rem;
line - height: 1.5;
}

h1,
h2 {
  margin: 0;
}

/* Estilos para elementos de diálogo com IDs #signup ou #newsletter */
#inscricao,
#newsletter {
  padding: 1em;
max - width: 40ch;
border: 0;
box - shadow: 0 0 1em rgb(0 0 0 / 30 %);

/* Estilo para o fundo quando o diálogo é modal */
&::backdrop {
background: rgb(0 0 0 / 70 %);
}

/* Estilos para formulários dentro dessas caixas de diálogo */
&form {
display: grid;
gap: 0.5em;

    /* Estilos para campos de entrada dentro dos formulários */
    &input {
    width: 90 %;
    padding: 0.5rem;
    }
}

  /* Estilos para o botão fechar dentro dessas caixas de diálogo */
  .botao - fechar {
position: absolute;
top: 10px;
right: 10px;
border: none;
background: none;
cursor: pointer; /* Adicionado para melhor UX */
}
}

/* Estilos gerais de botões */
.botao {
  border: 0;
cursor: pointer;
background: #333;
  color: #eee;
  font - weight: 700;
padding: 0.5rem 1rem;

/* Estados de foco e foco para botões */
&:hover,
  &:focus {
    background: purple;
  }
}

/* Estilos para qualquer elemento 'dialog' quando estiver aberto */
dialog[open] {
    background - color: beige;
    border - radius: 10px;
border: 1px solid rgb(0 0 0 / 0.1);
}

/* A pseudoclasse :modal ainda não é totalmente suportada em todos os navegadores e pode causar erros em alguns ambientes. dialog[open] tem como alvo todos os elementos de diálogo... */

code {
  color: forestgreen;
}
