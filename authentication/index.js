const express = require('express');

const app = express();
app.use(express.json());

const users = [
];

app.get("/me", (req, res) => {
    const token = req.headers.authorization;
    const user = users.find(user => user.token === token);
    if (user) {
        res.send({
            username: user.username,
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})

function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post("/login",(req,res)=> {
    const {username, password} = req.body;
    if(users.find(user => user.username === username && user.password === password)) {
        const token = generateToken();
        users.push({username, password, token});
        res.status(200).send({token});
        console.log(users);
    } else {
        res.status(400).send("Login failed");
    }
})

app.post("/signup",(req,res)=>{
    const {username, password} = req.body;
    if(users.find(user => user.username === username)) {
        res.status(400).send("Account already exists");
    } else{
        users.push({username, password});
        res.status(200).send("Signup successful");
    }
})

app.listen(3000,()=> {
    console.log("Server is running on port 3000");
})