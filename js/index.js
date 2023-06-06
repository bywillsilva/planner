function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}


function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text/plain");
    let colab = document.getElementById(data);
    colab.style.left = event.clientX - 10 + "px";
    colab.style.top = event.clientY - 10 + "px";

    // Salvar a posição no armazenamento local
    salvarPosicoes();
}

function salvarPosicoes() {
    let colab = document.querySelectorAll(".colaborador");
    let clients = document.querySelectorAll(".nome-client");
    let posicoes = {};
    let posicoesClients = {};

    clients.forEach((client) => {
        let clientId = client.id;
        let posicao = {
            left: client.style.left,
            top: client.style.top,
        };
        let nomeClient = document.querySelector(".nome-client").value;
        posicoesClients[clientId] = { posicao, nomeClient };
    });

    colab.forEach((colab) => {
        let colabId = colab.id;
        let posicao = {
            left: colab.style.left,
            top: colab.style.top,
        };
        let nomeColab = colab.querySelector(".nome").value;
        posicoes[colabId] = { posicao, nomeColab };
    });

    localStorage.setItem("posicoes", JSON.stringify(posicoes));
    localStorage.setItem("posicoesClients", JSON.stringify(posicoesClients));
}

function removeItem(event) {
    let item = document.getElementById(event.target.id);
    item.parentNode.removeChild(item);
    salvarPosicoes();
}

function carregarPosicoes() {
    let posicoesSalvas = localStorage.getItem("posicoes");
    let posicoesClientSalvas = localStorage.getItem("posicoesClients");

    if (posicoesSalvas) {
        let posicoes = JSON.parse(posicoesSalvas);
        let campo = document.getElementById("campo");

        for (let colabId in posicoes) {
            if (posicoes.hasOwnProperty(colabId)) {
                let { posicao, nomeColab } = posicoes[colabId];
                let name = document.createElement("input");
                name.setAttribute("type", "text");
                name.setAttribute("class", "nome");
                name.setAttribute("placeholder", "Nome");
                name.setAttribute("onchange", "salvarPosicoes()");
                name.value = nomeColab;

                let colab = document.createElement("div");
                colab.setAttribute("class", "colaborador");

                colab.setAttribute("draggable", "true");
                colab.setAttribute("ondragstart", "dragStart(event)");
                colab.setAttribute("id", colabId);
                colab.setAttribute("ondblclick", "removeItem(event)");
                colab.style.left = posicao.left;
                colab.style.top = posicao.top;
                colab.appendChild(name);
                campo.appendChild(colab);
            }
        }
    }
    if (posicoesClientSalvas) {
        let posicoes = JSON.parse(posicoesClientSalvas);
        let campo = document.getElementById("campo");

        for (let clientId in posicoes) {
            if (posicoes.hasOwnProperty(clientId)) {
                let { posicao, nomeClient } = posicoes[clientId];
                let name = document.createElement("input");
                name.setAttribute("type", "text");
                name.setAttribute("class", "nome-client");
                name.setAttribute("placeholder", "Nome Cliente");
                name.setAttribute("onchange", "salvarPosicoes()");
                name.value = nomeClient

                name.setAttribute("draggable", "true");
                name.setAttribute("ondragstart", "dragStart(event)");
                name.setAttribute("id", clientId);
                name.setAttribute("ondblclick", "removeItem(event)");
                name.style.left = posicao.left;
                name.style.top = posicao.top;
                campo.appendChild(name);
            }
        }
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    carregarPosicoes();
});

const popup = document.getElementById("popup");
const Mesa = document.querySelectorAll(".mesa");
for (let i = 0; i < Mesa.length; i++) {
    Mesa[i].addEventListener("click", (event) => {
        popup.style.display = "flex";

        if (event.clientX > 700) {
            popup.style.left = event.clientX - 150 + "px";
        } else {
            popup.style.left = event.clientX - 20 + "px";
        }

        if (event.clientY < 500) {
            popup.style.top = event.clientY + 50 + "px";
        } else {
            popup.style.top = event.clientY - 100 + "px";
        }
    });

    setInterval(() => {
        popup.style.display = "none";
    }, 2000);
}

const btn = document.querySelectorAll("button");
const campo = document.querySelector("#campo");
let countColab = 0;
let countClient = 0;
btn[0].addEventListener("click", (event) => {
    let name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("class", "nome");
    name.setAttribute("placeholder", "Nome");
    name.setAttribute("onchange", "salvarPosicoes()");

    let colab = document.createElement("div");
    colab.setAttribute("class", "colaborador");

    colab.setAttribute("draggable", "true");
    colab.setAttribute("ondragstart", "dragStart(event)");
    colab.setAttribute("id", `${"colab" + countColab++}`);
    colab.setAttribute("ondblclick", "removeItem(event)");
    colab.appendChild(name);
    colab.setAttribute(
        "style",
        `${"left:" + event.clientX + "px;" + "top:" + event.clientY + "px;"}`
    );

    campo.appendChild(colab);
    salvarPosicoes();
});

btn[1].addEventListener("click", (event) => {
    let name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("class", "nome-client");
    name.setAttribute("placeholder", "Nome Cliente");
    name.setAttribute("onchange", "salvarPosicoes()");

    name.setAttribute("draggable", "true");
    name.setAttribute("ondragstart", "dragStart(event)");
    name.setAttribute("id", `${"cliente" + countClient++}`);
    name.setAttribute("ondblclick", "removeItem(event)");
    name.setAttribute(
        "style",
        `${"left:" + event.clientX + "px;" + "top:" + event.clientY + "px;"}`
    );

    campo.appendChild(name);
    salvarPosicoes();
});
