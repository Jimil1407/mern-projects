import express from 'express';
import { Pool } from 'pg'
import cors from 'cors'

const app = express()
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

app.use(express.json())
app.use(cors())
// Connect to database when server starts
pool.connect()
    .then(() => console.log('Connected to database'))
    .catch((err: any) => console.error('Database connection error:', err))

async function createTable(){
    const result = await pool.query(`
        CREATE TABLE IF NOT EXISTS notes(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(20) NOT NULL,
        description VARCHAR(100) NOT NULL,
        date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`
    );
    console.log('Table created successfully')
}

createTable()

app.post('/submit', async (req, res) => {
    try {
        const { title, description} = req.body
        const result = await pool.query(`
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
        const result = await pool.query(`
            SELECT * FROM notes
        `)
        res.send(result.rows)
        //console.log(result.rows)
    } catch (error) {
        console.error('Error fetching notes:', error)
        res.status(500).send('Error fetching notes')
    }
})

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    const result = await pool.query(`
        DELETE FROM notes WHERE id = $1
    `, [id])
    res.send('Note deleted successfully')
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})
