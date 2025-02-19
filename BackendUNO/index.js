"use strict";

//require recull el paquet express (ha d'estar dins de la carpeta node_modules)
//és normal fixar com a nom del pquet una constant amb el mateix nom que el paquet requerit
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require('cors');

//aquesta constant estableix la cadena de connexió
const connection = mysql.createConnection({ 
    host: 'localhost', 
    database: 'users', 
    user: 'root', 
    password: '' 
});

//crides/utilitzes al framework express
const app = express()
app.use(cors());

// app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Creació recurs /login
app.post('/login', (req, res) => {

    // Ens connectem al servidor fent servir la cadena de conexió
    connection.connect((error) => {

        if (error) { //si hi ha error en la connexió            
            console.log("Error connecting: " + error.stack);
            return; //no continuï, surti del recurs /login
        }

        //si tot ok, pots voler saber l'id que tens de connexió (voluntari)
        console.log("Connectat amb la id" + connection.threadId);

    });

    const { username, password } = req.body;

    // Si estic en aquest punt és que he pogut connectar-me, no hi ha error
    connection.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (error, results) => {
            if (error) {
                res.status(500).send({ error: true, message: "Error amb la consulta a la BBDD", dades: "" });
            } else if (results.length > 0) {
                res.status(200).send({ error: false, message: "Inicio de sesion exitoso", dades: results[0] });
            } else {
                res.status(404).send({ error: true, message: "Credenciales incorrectas", dades: "" });
            }
        }
    );
});


//aquesta aplicació li assignes el port 3000
app.listen(3000, () => {
    console.log('Aquest és un servidor Node Express')
})


// npm start