const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

var properties = {
    pageTitle: 'About',
    authorName: 'Alex Karydis',
    jobTitle: 'developer',
    dateYear: new Date().getFullYear(),
    welcomeMsg: "Welcome to my website where I am learning how to use handlebars to make templates."
}

// app.use( (req, res, next) => {
//     res.render('maintenance.hbs');
// } )

app.use( (req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('file.log', log + '\n', (err) => {
        if(err){
            console.log(err);
        }
    });
    next();
} );

app.get('/', (req, res) => {
    res.render('home.hbs', properties);
} );

app.get('/about', (req, res) => {
    res.render('about.hbs', properties);
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running in port ${port}!`);
});