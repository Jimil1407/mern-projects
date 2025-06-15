const z = require("zod");
const jwt = require("jsonwebtoken");

const emailschema = z.string().email();
const passwordschema = z.string().min(6);

function generateToken(username, jwtpassword)   {
  const result = emailschema.safeParse(username);
  if (!result.success) {
    return null;
  }
  const result2 = passwordschema.safeParse(jwtpassword);
  if (!result2.success) {
    return null;
  }
  const encoded = jwt.sign({username}, jwtpassword);
  return encoded;
}

function verifyToken(token, jwtpassword,username) {
  const decoded = jwt.verify(token, jwtpassword);
  if (decoded.username === username) {
    return decoded;
  } else {
    return null;
  }
}

const ans =  generateToken("jimil@gmail.com","1234567890");
console.log(ans);

const ans2 = verifyToken(ans,"1234567890","jimil@gmail.com");
console.log(ans2);
