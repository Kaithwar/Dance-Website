const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;
const bodyparser = require("body-parser");

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ContactDance', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    gender: String,
    phone: String,
    email: String,
    address: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/about', (req, res)=>{
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res)=>{
    const params = { }
    res.status(200).render('services.pug', params);
})
app.get('/class', (req, res)=>{
    const params = { }
    res.status(200).render('class.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(() =>{
        res.send("This item has been Saved to the Database");
    }).catch(() => {
        res.status(400).send("Item was not Saved to the Data")
    });

   // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started sussesfully on port ${port}`);

})