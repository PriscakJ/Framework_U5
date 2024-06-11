const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// POST route for root (test route)
app.post('/', (req, res) => {
    console.log('Received a request at the root endpoint');
    res.status(200).json({
        message: 'Root endpoint'
    });
});
app.use((req,res)=>{
    console.log('aaa');
});

// POST route for login
app.post('/login', (req, res) => {
    const loginData = JSON.stringify(req.body);
    console.log(loginData);

    // login check..
    res.status(200).json({
        message: 'Login successful'
    });
});

// POST route for signup
app.post('/signup', (req, res) => {
    const signupData = JSON.stringify(req.body);
    console.log(signupData);

    // signup check..
    res.status(200).json({
        message: 'Signup successful'
    });
});

module.exports = app;
