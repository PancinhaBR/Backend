const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const cors = require("cors")
const bcrypt = require("bcrypt")

// configurar o servidor
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

//criar banco sqlite3
const db = new sqlite3.Database("./database.db")

//criar tabela usuario
db.run(`CREATE TABLE IF NOT EXISTS usuarios ( id INTEGER PRIMAY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    senha TEXT
    )`
    )
    //cadaastrar usuario
    app.post("/usuario", async (req, res) => {
        console.log(req.body);
    
    
        let nome = req.body.nome
        let email = req.body.emal
        let senha = req.body.senha
    
        let senhaHash = await bcrypt.hash(senha, 10)
        console.log(senhaHash);
    
        db.run(`INSERT INTO usuarios (nome, email, senha)
            VALUES (?, ?, ?)`,
            [nome, email, senhaHash],
            res.json({
                id: this.lastID,
                nome,
                email
            })
        )
    })