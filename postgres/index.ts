// write a function to create a users table in your database.
import { Client } from 'pg'
import express from 'express'

const app = express()
app.use(express.json())

const client = new Client({
    connectionString: "postgresql://neondb_owner:npg_O56ZQfjWeKBy@ep-ancient-voice-a80enuhl-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require"
  })

app.post('/signup', async (req, res) => {
    await client.connect()
    const {username, email, password} = req.body
    const user = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3);`
    const result = await client.query(user, [username, email, password])
    //console.log(result)
    res.json({message: "signup successfull", user: result.rows[0]})
   console.log(result)
})

app.get('/users',async(req,res) => {
    await client.connect()
    const result = await client.query(`SELECT * FROM users;`)
    res.json(result.rows)
    await client.end() 
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})






