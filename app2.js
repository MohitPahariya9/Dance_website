const express = require("express");
const app = express();
const path = require("path");
const port = 8000;
const fs = require("fs");
const bodyparser = require("body-parser");


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
    

    name = req.body.name
    phone = req.body.phone
    email = req.body.email
    about = req.body.about
    
    let outputToWrite = `The name of the client is "${name}" \nEmail is "${email}"\nPhone no is "${phone} " \nCondition and goals: "${about}"`
    // fs.writeFileSync('output.txt', outputToWrite);
    fs.appendFileSync('output.txt', '\n' + outputToWrite );
    

 const params = {'message': 'Your form has been submitted successfully'}
 res.status(200).render('contact.pug', params);
});

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
