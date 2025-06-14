const jwt = require("jsonwebtoken");

const contents = {
    name: "jimil",
    accno: "123456"
}

const newtoken = jwt.sign(contents,"jimil");
//const vstatus = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamltaWwiLCJhY2NubyI6IjEyMzQ1NiIsImlhdCI6MTc0OTkxODI1Nn0.ZwpHEdeR-OBMKFaB_GOh9z1PVOcwsOT7Liy4_Ru9rO0","secret");
//console.log(vstatus)
console.log(newtoken);