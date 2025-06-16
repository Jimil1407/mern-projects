const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:56015',
}));

app.get('/', function (req, res) {
    res.send("Hello World");
});


app.post('/add',function(req,res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    const ans = a + b;
    res.json({ ans });
});

app.post('/subtract',function(req,res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    const ans = a - b;
    res.json({ ans });
});

app.listen(3000);