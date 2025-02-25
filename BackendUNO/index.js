"use strict";

//require recull el paquet express (ha d'estar dins de la carpeta node_modules)
//és normal fixar com a nom del pquet una constant amb el mateix nom que el paquet requerit
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cookieParser = require("cookie-parser");  //Para trabajar con cookies
const cors = require('cors');
const jwt = require('jsonwebtoken');

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
app.use(cookieParser());

//Esto sirve para que solo esta url pueda acceder
//Si pusiese sólo CORS, cualquier url podría acceder
// app.use(cors({
//     origin: 'http://localhost:4200', // La URL de tu aplicación Angular
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
//   }));

const accessTokenSecret = 'youraccesstokensecret';

// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//CONSTANT MIDDLEWARE JWT
const authenticateJWT = (req, res, next) => {

    const authHeader = req.headers["authorization"];
    //En la constante authHeader, el valor prové de:
    // Authorization: Bearer <token> ( per exemple Postman)
    console.log("wuirerioewurioep"+authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }
  
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

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

    // Creació recurs /login
    const { username, password } = req.body;

    // Si estic en aquest punt és que he pogut connectar-me, no hi ha error
    connection.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (error, results) => {
            if (error) {
                res.status(500).send({ error: true, message: "Error amb la consulta a la BBDD", dades: "" });
            } else if (results.length > 0) {
                // res.status(200).send({ error: false, message: "Inicio de sesion exitoso", dades: results[0] });
                const accessToken = jwt.sign({ username: username,  password: password }, accessTokenSecret);
                res.status(200).send({
                    error: false,
                    message: "Inicio de sesión exitoso",
                    dades: results[0],
                    accessToken: accessToken
                });
            } else {
                res.status(404).send({ error: true, message: "Credenciales incorrectas", dades: "" });
            }
        }
    );
});


app.get('/prova', authenticateJWT, (req, res)=> {
    connection.query(
        "SELECT * FROM users",
        (error, results) => {
            if (error) {
                res.status(500).send({ error: true, message: "Error amb la consulta a la BBDD", dades: "" });
            } else if (results.length > 0) {
                // res.status(200).send({ error: false, message: "Inicio de sesion exitoso", dades: results[0] })
                res.status(200).send({
                    error: false,
                    message: "Estem a la DDBB",
                    dades: results,
                });
            } else {
                res.status(404).send({ error: true, message: "No estem", dades: "" });
            }
        }
    )
});
// Pasos manejar JWT:

// Hago el login desde el Cliente ( Http )

// Almaceno el token en localstorage en el servicio de login ( conectar a la api)
//localStorage.setItem('accessToken', response.accessToken);

//Envio el accessToken a las solicitudes de la api con Interceptor
//Se crea el interceptor independiente, y se debe incrustrar en el app.config.ts


//Register no necessita autenticació JWT

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Comprovem si l'usuari ja existeix
    connection.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (error, results) => {
            if (error) {
                return res.status(500).send({ error: true, message: "Error en la consulta a la BBDD" });
            }
            if (results.length > 0) {
                return res.status(400).send({ error: true, message: "Usuari ja registrat" });
            }
            // Inserim el nou usuari
            connection.query(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                [username, password],
                (error, results) => {
                    if (error) {
                        return res.status(500).send({ error: true, message: "Error al registrar l'usuari" });
                    }
                    res.status(201).send({ error: false, message: "Usuari registrat correctament" });
                }
            );
        }
    );
});

//Endpoints CRUD Torneo

//READ
app.get('/torneos', (req, res) => {

    connection.query(
        "SELECT * FROM torneos",
        (error, results) => {
            if (error) {
                res.status(500).send({ error: true, message: "Error en la consulta a la BBDD" });
            }
            if (results.length > 0) {
                res.status(200).send({ error: false, message: "Torneos obtinguts correctament",
                    torneos: results
                 });
            }
            else {
                res.status(404).send({ error: true, message: "No hi ha torneos" });
            }
        }
    );

});

//CREATE
app.post('/crear_torneo', (req, res) =>{

    connection.query(
        "SELECT * FROM torneos WHERE torneo = ?",
        [torneo],
        (error, results) => {
            if (error) {
                return res.status(500).send({ error: true, message: "Error en la consulta a la BBDD" });
            }
            if (results.length > 0) {
                return res.status(400).send({ error: true, message: "Torneo ja registrat" });
            }
            // Inserim el nou torneo
            connection.query(
                "INSERT INTO torneos (torneo, description) VALUES (?, ?)",
                [torneo, password],
                (error, results) => {
                    if (error) {
                        return res.status(500).send({ error: true, message: "Error al registrar el torneig" });
                    }
                    res.status(201).send({ error: false, message: "Torneo registrat correctament" });
                }
            );
        }
    );

});

//UPDATE
//En aquest endpoint només es pot actualitzar el description
app.put('/actualitzar_torneo', (req, res) => {
    const { id, description } = req.body;

    connection.query(
        "UPDATE torneos SET description = ? WHERE id = ?",
        [description, id],
        (error, results) => {
            if (error) {
                return res.status(500).send({ error: true, message: "Error en la consulta a la BBDD" });
            }
            if (results.length > 0) {
                return res.status(200).send({ error: false, message: "Torneo actualitzat correctament" });
            }
            else {
                return res.status(404).send({ error: true, message: "No hi ha torneos" });
            }
        }
    );
});

//DELETE
app.put('/actualitzar_torneo', (req, res) => {

    const { id } = req.body;

    connection.query(
        "DELETE FROM torneos WHERE id = ?",
        [id],
        (error, results) => {

            if (error) {
                return res.status(500).send({ error: true, message: "Error en la consulta a la BBDD" });
            }
            if (results.length > 0) {
                return res.status(200).send({ error: false, message: "Torneig eliminat correctament" });
            }
            else {
                return res.status(404).send({ error: true, message: "No hi ha torneigs" });
            }


        }

    )

});


//aquesta aplicació li assignes el port 3000
app.listen(3000, () => {
    console.log('Aquest és un servidor Node Express')
})

// npm start
// Millor fer node index.js
// És mes específic per a executar l'arxiu del servidor