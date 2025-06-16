const express = require('express');
const app = express();

app.use(express.json());

app.get('/', function (req, res) {
    res.send("Hello World");
});


app.post('/add',function(req,res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    const result = a + b;
    res.json({ result });
});

app.post('/subtract',function(req,res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    const result = a - b;
    res.json({ result });
});

app.listen(3000);