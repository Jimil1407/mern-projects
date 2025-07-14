import express from 'express';
import { Pool } from 'pg'
import cors from 'cors'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

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
        date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE 
    )`
    );
    console.log('notes Table created successfully')
}

async function createUsers(){
    const result = await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL 
        )`
    );
    console.log("users table created")
}

createUsers()
createTable()

// app.post('/signup', async (req, res) => {
//     try{
//         const {username, password} = req.body;
//         const result = await pool.query(`
//             INSERT INTO users (username, password) VALUES ($1, $2)
//             `, [username, password])
//             res.send('sign up succesfull')
//         }catch(error){
//             res.status(500).send("can't sign up");
//         }
// })

// app.post('/signin', async (req, res) => {
//     try{
//         const {username, password} = req.body;
//         const result = await pool.query(`
//             SELECT EXISTS (SELECT username, password FROM users);
//             `, [username, password])
//             res.send('sign up succesfull')
//         }catch(error){
//             res.status(500).send("can't sign up");
//         }
// })

// Extend Express Request type to include user
interface AuthenticatedRequest extends Request {
    user?: any;
}

function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET environment variable is not set');
    }

    jwt.verify(token, jwtSecret, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post('/submit', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.userId;
        const result = await pool.query(
            `INSERT INTO notes (title, description, user_id) VALUES ($1, $2, $3)`,
            [title, description, userId]
        );
        res.send('Note added successfully');
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).send('Error adding note');
    }
});

app.get('/showNotes', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.userId;
        const result = await pool.query(
            `SELECT * FROM notes WHERE user_id = $1`,
            [userId]
        );
        res.send(result.rows);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send('Error fetching notes');
    }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    const result = await pool.query(`
        DELETE FROM notes WHERE id = $1
    `, [id])
    res.send('Note deleted successfully')
})

// assuming Express.js
app.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    try {
      await pool.query("UPDATE notes SET title = $1, description = $2 WHERE id = $3", [title, description, id]);
      res.status(200).json({ message: "Note updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update note" });
    }
  });

// Register endpoint
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        // Check if user already exists
        const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userCheck.rows.length > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert user
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.status(201).json({ message: 'User registered successfully' });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login endpoint
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        // Find user
        const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = userResult.rows[0];
        // Compare password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate JWT
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not set');
        }
        const token = jwt.sign({ userId: user.id, email: user.username }, jwtSecret, { expiresIn: '7d' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
});
  
app.listen(3001, () => {
    console.log('Server is running on port 3001')
})
