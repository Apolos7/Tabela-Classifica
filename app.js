class Jogador {
  constructor(nome) {
    this.nome = nome;
    this.vitorias = 0;
    this.derrotas = 0;
    this.empates = 0;
    this.pontos = 0;
    this.foto = "https://www.imagensempng.com.br/wp-content/uploads/2021/08/02-52.png";
  }

  calcularPontos() {
    this.pontos = (this.vitorias * 3) + this.empates;
  }

  adicionarVitoria() {
    this.vitorias++;
    this.calcularPontos();
  }

  adicionarDerrota() {
    this.derrotas++;
  }

  adicionarEmpate() {
    this.empates++;
    this.calcularPontos();
  }

  resetar() {
    this.vitorias = 0;
    this.derrotas = 0;
    this.empates = 0;
    this.pontos = 0;
  }
}

const listaJogadores = [];

function adicionarJogador() {
  let nome = document.querySelector("#nomeJogador").value;

  if (nome == "") {
    alert("O campo \"nome\" precisa estar preenchido.")
  } else {
    const jogador = new Jogador(nome);

    limparInput("nomeJogador");

    listaJogadores.push(jogador);
    mostrarTabela();
  }
}

function adicionarVitoria(indice) {
  listaJogadores[indice].adicionarVitoria();
  for (let i = 0; i < listaJogadores.length; i++) {
    if (i != indice) {
      listaJogadores[i].adicionarDerrota();
    }
  }
  mostrarTabela();
}

function adicionarEmpate() {
  for (let i = 0; i < listaJogadores.length; i++) {
    listaJogadores[i].adicionarEmpate();
  }
  mostrarTabela();
}

function resetarPlacar() {
  for (let i = 0; i < listaJogadores.length; i++) {
    listaJogadores[i].resetar();
  }
  mostrarTabela();
}

function mostrarTabela() {
  const tabela = document.querySelector("#tabelaJogadores");
  tabela.innerHTML = "";
  for (let i = 0; i < listaJogadores.length; i++) {
    let td;
    let button;
    let tr = document.createElement("tr");

    td = document.createElement("td");
    td.innerHTML = `<p>${listaJogadores[i].nome}</p><img src="${listaJogadores[i].foto}" onClick="adicionarFoto(${i})">`
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = `${listaJogadores[i].vitorias}`;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = `${listaJogadores[i].empates}`;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = `${listaJogadores[i].derrotas}`;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = `${listaJogadores[i].pontos}`;
    tr.appendChild(td);

    td = document.createElement("td");
    button = document.createElement("button");
    button.setAttribute("onclick", `adicionarVitoria(${i})`);
    button.innerText = "Vitórias";
    td.appendChild(button);
    tr.appendChild(td);

    td = document.createElement("td");
    button = document.createElement("button");
    button.setAttribute("onclick", `adicionarEmpate()`);
    button.innerText = "Empate";
    td.appendChild(button);
    tr.appendChild(td);

    tabela.appendChild(tr);
  }
}

function limparInput(idElemento) {
  document.querySelector(`#${idElemento}`).value = "";
}

function adicionarFoto(indece) {
  let url = window.prompt("Preencha com o endereço da imagem", "");
  if (url != null && url != "") {
    listaJogadores[indece].foto = url;
    mostrarTabela();
  }
}
