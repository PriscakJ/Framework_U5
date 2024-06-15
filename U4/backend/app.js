const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let userData = {
    "ich@du.at": "test",
    "ich2@du.at": "test3"
};

let tokenData = {};

app.use((req, res, next) => {
    console.log("First middleware");
    next();
});

app.get("/", (req, res) => {
    // Alle Token Daten ausgeben
    console.log('token Data:');
    console.log(tokenData);
    res.status(200).json(tokenData);
});

app.post("/login", (req, res) => {
    // Übergebene Daten loggen
    console.log('login data:');
    console.log(req.body);

    // Passwort überprüfen
    if (req.body.password === userData[req.body.email]) {
        // Login erfolgreich
        console.log('login successful');
        // Token erstellen
        const token = (Math.random() + 1).toString(36).substring(2)

        // Token zur E-Mail Adresse speichern
        tokenData[req.body.email] = token;

        // Status 200 und Token zurückgeben
        res.status(200).json({
            Token: token
        });
    } else {
        // Login nicht erfolgreich
        // Status 401 und Fehlermeldung zurückgeben
        res.status(401).send("Invalid Credentials");
    }
});

// Middleware to check token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    // Find user by token
    const user = Object.keys(tokenData).find(email => tokenData[email] === token);
    if (!user) return res.sendStatus(403);

    req.user = user;
    next();
}

app.put("/highscore/1", authenticateToken, (req, res) =>{
    console.log('highscore updated');
    res.status(200).send('Highscore updated');
});

module.exports = app;

