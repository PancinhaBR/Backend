const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");

db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    senha TEXT
)`);

app.post("/usuarios", async (req, res) => {
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    let senhaHash = await bcrypt.hash(senha, 10);

    db.run(
        `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
        [nome, email, senhaHash],
        function () {
            res.json({
                id: this.lastID,
                nome,
                email,
            });
        }
    );
});

app.get("/usuarios", (req, res) => {
    db.all(`SELECT id, nome, email FROM usuarios`, [], (err, rows) => {
        res.json(rows);
    });
});


app.get("/usuarios/:id",(req,res) => {
    let idUsuario = req.params.id;

    db.get(`SELECT id, nome, email FROM usuarios
    Where id =?`,

    [idUsuario],(err,result) => {
        if(result){
            res.json(result)
        } else{
            res.status(404).json({
                "message" : "Usuário não encontado"
        })
        }
    })
})
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));