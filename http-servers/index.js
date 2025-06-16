const express = require('express');
const app = express();

let reqcount = 0;

function requestincreaser(req,res,next){
    reqcount++;
    console.log("Total requests:",reqcount);
    next();
}

// Calculator endpoints
app.get('/add', requestincreaser, function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const result = a + b;
    console.log("Add request:",a,"+",b,"=",result);
    res.json({ result });
});

app.get('/subtract', requestincreaser, function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const result = a - b;
    console.log("Subtract request:",a,"-",b,"=",result);
    res.json({ result });
});


app.listen(3000);
