// write a function to create a users table in your database.
import { Client } from "pg";
import express from "express";
    
const app = express();
app.use(express.json());

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

app.post("/signup", async (req, res) => {
  await client.connect();
  const { user_id, city, country, street, pincode } = req.body;
  const user = `INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5);`;
  const result = await client.query(user, [
    user_id,
    city,
    country,
    street,
    pincode,
  ]);
  //console.log(result)
  res.json({ message: "signup successfull", user: result.rows[0] });
  console.log(result);
});

app.get("/users", async (req, res) => {
  const id = req.query.id;
  await client.connect();
  const result = await client.query(`SELECT * FROM users where id = $1;`, [id]);
  const address = await client.query(
    `SELECT * FROM addresses where user_id = $1;`,
    [id]
  );
  res.json({ user: result.rows[0], address: address.rows });
  await client.end();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
