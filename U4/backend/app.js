const express = require("express");
const cors = require('cors');
const app = express();
const db = require('./db'); // Assuming db is in the same directory

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("First middleware");
    next();
});

app.get("/", (req, res) => {
    console.log('token Data:');
    console.log(db.tokens);
    res.status(200).json(db.tokens);
});

app.post("/login", (req, res) => {
    console.log('login data:');
    console.log(req.body);

    let credentials = db.login(req.body.email, req.body.password);
    if (credentials) {
        console.log('login successful');
        res.status(200).json({ Token: credentials.token });
    } else {
        console.log('login failed');
        res.status(401).json({ error: "Invalid Credentials" });
    }
});

app.put("/highscores/1", (req, res) => {
    const authToken = req.headers['authorization'];

    if (!db.isAuthenticated(authToken)) {
        return res.status(403).send("Forbidden");
    }

    const authUser = db.getAuthUser(authToken);
    db.addHighscore(authUser.username, req.body.score);

    console.log('highscore updated');
    res.status(200).send("Highscore updated");
});
app.get("/highscores", (req, res) => {
    const highscores = db.getHighscores();
    res.status(200).json(highscores);
});

module.exports = app;
