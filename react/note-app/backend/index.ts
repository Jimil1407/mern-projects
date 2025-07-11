import express from 'express';
import { Client } from 'pg'
import cors from 'cors'

const app = express()
const client = new Client({
    connectionString: process.env.DATABASE_URL,
})

app.use(express.json())
app.use(cors())
// Connect to database when server starts
client.connect()
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Database connection error:', err))

async function createTable(){
    const result = await client.query(`
        CREATE TABLE IF NOT EXISTS notes(
        id SERIAL PRIMARY KEY,
        title VARCHAR(20) NOT NULL,
        description VARCHAR(100) NOT NULL,
        date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`
    );
    console.log('Table created successfully')
}

//createTable()

app.post('/submit', async (req, res) => {
    try {
        const { title, description} = req.body
        const result = await client.query(`
            INSERT INTO notes (title, description) VALUES ($1, $2)
        `, [title, description])
        res.send('Note added successfully')
    } catch (error) {
        console.error('Error adding note:', error)
        res.status(500).send('Error adding note')
    }
})

app.get('/showNotes', async (req, res) => {
    try {
        const result = await client.query(`
            SELECT * FROM notes
        `)
        res.send(result.rows)
        console.log(result.rows)
    } catch (error) {
        console.error('Error fetching notes:', error)
        res.status(500).send('Error fetching notes')
    }
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})
