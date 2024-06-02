const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const path = require('path');
const mysql = require('mysql');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'maisondart',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 2
});

// Use the pool to execute queries
const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            connection.query(sql, params, (error, results, fields) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    });
};

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/home.html'));
});

app.get('/login', (req, res) => {
    res.render(path.join(__dirname,'public','/login.ejs'));
});

app.get('/coba', (req,res) => {
    res.render(path.join(__dirname, 'public','/coba.ejs'), {data:"Asal"});
});

app.get('/artist', (req,res) => {
    res.render(path.join(__dirname, 'public', '/artist_page.ejs'))
})

app.get('/auction', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', '/auction.html'))
})

app.get('/shop', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public', '/shop.html'))
})
app.get('/product', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public', '/product.html'))
})

app.post('/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { name: req.body.name, email: req.body.email, password: req.body.password };

        await executeQuery('INSERT INTO msUser (userName, userEmail, userPassword) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
        
        console.log('User signed up:', user);
        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const rows = await executeQuery('SELECT * FROM msUser WHERE userEmail = ?', [email]);
        const user = rows[0];

        if (!user) {
            console.log('User not found');
            return res.status(400).send('Cannot find user');
        }

        console.log('Entered Password:', password);
        console.log('Stored Password:', user.userPassword);

        const passwordMatch = bcrypt.compare(password, user.userPassword);
        console.log('Password Match:', passwordMatch);

        if (passwordMatch) {
            console.log('Login successful');
            res.redirect('/home');
        } else {
            console.log('Incorrect password');
            res.send('Not Allowed');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});

app.post('/artis', async(req, res) =>{

})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
