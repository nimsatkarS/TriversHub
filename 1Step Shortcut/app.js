const express = require('express');
const pg = require('pg');
const { pool } =require('pg');

const ejs = require('ejs');
const app = express();


app.use(express.static('public'))
const Client = new pg.Client({
    host: 'tiny.db.elephantsql.com',
    user: 'jsdawjqh',
    password: 'EaGfh-f8IrBfBfH6rTRMqV1w3xQcqZXj',
    database: 'jsdawjqh'
});

Client.connect((err) => {
    if (err) console.error(err);
    else console.log('connect securly')
})

app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + '/Home.html');
})

app.get('/login', (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + '/login.html');
})

app.get('/profile',(req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + '/profile.html');  
})

app.get('/loginForm', (req, res) =>{
    console.log("STORING THE DATA....");
    console.log(req.query);    

    let name = req.query.name;
    let email = req.query.email;
    let phone = req.query.phone;

    console.log(name, email, phone);

    Client.query(
        "INSERT INTO onestep (username, useremail, userphone) VALUES ($1, $2, $3)",
        [name, email, phone]
    ).then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    
    //res.send('Data will sucessully stored');
    res.redirect('/');
})

app.get('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetch data from the database based on the userId
        const userData = await YourModel.findOne({ _id: userId });

        // Render the profile page with the fetched data
        res.render('profile', { userData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(4000, (err) => {
    if(err) console.error(err);
    else console.log('listen port in 4000');
});