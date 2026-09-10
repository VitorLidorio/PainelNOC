const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const config = require("./config");

const app = express();

app.use(cors());

async function consultarUltimoChamado(){

    const conexao = await mysql.createConnection(config);

    const [rows] = await conexao.execute(`
        SELECT MAX(id) AS ultimo_id
        FROM tickets
    `);

    await conexao.end();

    return rows[0];

}

app.get("/ultimo-chamado", async(req,res)=>{

    try{

        const resultado = await consultarUltimoChamado();

        res.json(resultado);

    }catch(err){

        console.log(err);

        res.status(500).json(err);

    }

});

app.listen(3000,()=>{

    console.log("Servidor iniciado");

});