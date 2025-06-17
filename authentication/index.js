const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
const secretKey = "jimil";
const users = [
];

app.get("/me", (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secretKey);
    const user = users.find(user => user.username === decoded.username);
    if (user) {
        console.log(user.username);
        res.send({
            username: user.username,
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({
            username: user.username
        }, secretKey);

        user.token = token;
        res.send({
            token
        })
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
});

app.post("/signup",(req,res)=>{
    const {username, password} = req.body;
    if(users.find(user => user.username === username)) {
        res.status(400).send("Account already exists");
    } else{
        const token = jwt.sign({username}, secretKey);
        users.push({username, password, token});
        res.status(200).send("Signup successful");
    }
})

app.listen(3000,()=> {
    console.log("Server is running on port 3000");
})