const { app, BrowserWindow } = require("electron");

let win;

const dashboards = [

    "https://192.168.1.../public-dashboards/...",

    "https://192.168.1.../public-dashboards/...",

    "https://192.168.1.../public-dashboards/...",

    "https://192.168.1.../public-dashboards/...",

    "https://192.168.1.../public-dashboards/...",

    "https://192.168.1.../public-dashboards/..."

];

const painelChamados =
    "https://192.168.1.../public-dashboards/...";

const tempoRotacao = 15000;
const tempoAlerta = 5000;
const tempoConsulta = 5000;

let indice = 0;
let emAlerta = false;
let ultimoID = null;

function loadDashboard(url) {

    console.log("Abrindo:", url);

    win.loadURL(url);

}

async function verificarChamado() {

    try {

        const resposta = await fetch("http://localhost:3000/ultimo-chamado");

        if (!resposta.ok) {
            console.log("Servidor indisponível.");
            return;
        }

        const dados = await resposta.json();

        if (ultimoID === null) {

            ultimoID = dados.ultimo_id;

            console.log("Primeiro ID encontrado:", ultimoID);

            return;

        }

        if (dados.ultimo_id > ultimoID && !emAlerta) {

            ultimoID = dados.ultimo_id;

            console.log("=================================");
            console.log("NOVO CHAMADO DETECTADO");
            console.log("ID:", ultimoID);
            console.log("=================================");

            emAlerta = true;

            loadDashboard(painelChamados);

            setTimeout(() => {

                console.log("Voltando para a rotação.");

                emAlerta = false;

                loadDashboard(dashboards[indice]);

            }, tempoAlerta);

        }

    } catch (erro) {

        console.error("Erro ao consultar servidor:", erro.message);

    }

}

function iniciarRotacao() {

    setInterval(() => {

        if (emAlerta)
            return;

        indice++;

        if (indice >= dashboards.length)
            indice = 0;

        loadDashboard(dashboards[indice]);

    }, tempoRotacao);

}

function createWindow() {

    win = new BrowserWindow({

        width: 1920,
        height: 1080,
        fullscreen: true,
        autoHideMenuBar: true

    });

      win.webContents.on("did-finish-load", () => {
        win.webContents.setZoomFactor(0.62);
        console.log("Zoom aplicado");
    });

    loadDashboard(dashboards[0]);

    iniciarRotacao();

    verificarChamado();

    setInterval(verificarChamado, tempoConsulta);

}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {

        app.quit();

    }

});
