const express = require("express");
const app = express();
const path = require("path");
// getting-started.js
// const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/test');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://127.0.0.1:27017/contactDance',{useNewUrlParser: true});
const port = 8000;
const fs = require("fs");

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    about: String,
  });

const Contact = mongoose.model('Contact', contactSchema);

// app.use(express.static('public', options)) //api ref in pug

//for express
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }))

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send('This item has been saved to the database')
    }).catch(()=>{
    res.status(400).send('item was not saved to the databse')
})
res.status(200).render('index.pug');
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});