let express = require('express');
let app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//POST route for login
app.post('/login', (res,req)=>{
    const loginData = JSON.stringify(req.body);
    console.log(loginData);

    //login check..
    res.status(200).json({
        message: 'Login successfull'
    })
});
app.post('/signup', (res,req)=>{
    const signupData = JSON.stringify(req.body);
    console.log(signupData);

    //login check..
    res.status(200).json({
        message:'Signup successfull'
    })
});


module.exports = app;