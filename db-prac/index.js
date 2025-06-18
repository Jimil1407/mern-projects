const express = require("express");
const { UserModel, TodoModel } = require("./db");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "s3cret";
mongoose.connect("mongodb+srv://jimildigaswala:Oqk9jBkyxW1WMEwK@cluster0.eviqs98.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: password,
        name: name
    });
    
    res.json({
        message: "You are signed up"
    })
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
        password: password,
    });
 
    if (response) { 
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


function auth(req, res, next) {
    const token = req.headers.authorization;

    const response = jwt.verify(token, JWT_SECRET);

    if (response) {
        req.userId = response.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET
}


app.post("/todo", auth, async function(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const userId = req.userId;

    const todo = await TodoModel.create({
        title,
        description,
        userId
    });

    res.json({
        message: "Todo created successfully",
        userId
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;
    const todos = await TodoModel.find({ userId });
    res.json(todos);
});

app.listen(3000);
