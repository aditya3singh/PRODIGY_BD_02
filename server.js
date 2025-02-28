const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/database');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Function to validate email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Routes
app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('index', { data: users, error: null });
    } catch (error) {
        res.render('index', { data: [], error: 'Error fetching users' });
    }
});

app.post('/upload', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const parsedAge = parseInt(age);

        if (!name || !email || !age || !isValidEmail(email) || isNaN(parsedAge) || parsedAge < 0) {
            const users = await User.find();
            return res.render('index', {
                data: users,
                error: 'Invalid input! Ensure all fields are filled correctly and age is a valid number.'
            });
        }

        console.log('Attempting to create user:', { name, email, age: parsedAge });
        const newUser = await User.create({ name, email, age: parsedAge });
        console.log('User created successfully:', newUser);
        
        res.redirect('/');
    } catch (error) {
        console.error('Error creating user:', error);
        const users = await User.find();
        res.render('index', {
            data: users,
            error: error.code === 11000 ? 'Email already exists' : 'Error creating user'
        });
    }
});

app.get('/search', async (req, res) => {
    try {
        if (!req.query.q) {
            return res.render('search', { results: [], error: 'Search query is required' });
        }
        const query = req.query.q.toLowerCase();
        const results = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });
        res.render('search', { results, error: results.length ? null : 'No results found' });
    } catch (error) {
        res.render('search', { results: [], error: 'Error performing search' });
    }
});

app.get('/edit/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.render('edit', { user: null, error: 'User not found' });
        res.render('edit', { user, error: null });
    } catch (error) {
        res.render('edit', { user: null, error: 'Error fetching user' });
    }
});

app.post('/update/:id', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const parsedAge = parseInt(age);

        if (!name || !email || !age || !isValidEmail(email) || isNaN(parsedAge) || parsedAge < 0) {
            const user = await User.findById(req.params.id);
            return res.render('edit', {
                user,
                error: 'Invalid input! Ensure all fields are filled correctly.'
            });
        }

        await User.findByIdAndUpdate(req.params.id, { name, email, age: parsedAge });
        res.redirect('/');
    } catch (error) {
        const user = await User.findById(req.params.id);
        res.render('edit', {
            user,
            error: error.code === 11000 ? 'Email already exists' : 'Error updating user'
        });
    }
});

app.get('/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        const users = await User.find();
        res.render('search', { results: users, error: 'Error deleting user' });
    }
});

app.get('/read/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.render('read', { user: null, error: 'User not found' });
        res.render('read', { user, error: null });
    } catch (error) {
        res.render('read', { user: null, error: 'Error fetching user' });
    }
});

// Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
