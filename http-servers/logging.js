const express = require('express');
const app = express();

let reqcount = 0;

function logs(req,res,next){
    const requrl = req.url;
    const method = req.method;
    const timestamp = new Date().toISOString();
    const httpstatus = res.statusCode; 
    console.log(`${timestamp} - ${method} ${requrl} - ${httpstatus}`);
    next();
}

// Calculator endpoints
app.get('/add', logs, function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const result = a + b;
    console.log("Add request:",a,"+",b,"=",result);
    res.json({ result });
});

app.get('/subtract', logs, function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const result = a - b;
    console.log("Subtract request:",a,"-",b,"=",result);
    res.json({ result });
});


app.listen(3000);
