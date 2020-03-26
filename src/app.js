//https://github.com/FaztWeb/express-mongodb-crud

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();


//connecting to DB
mongoose.connect('mongodb://localhost/crud-mongo')
.then( db => console.log('db connected'))
.catch(err => console.log(err));

//importing routes
const indexRoutes = require('./routes/index');

//setting
app.set('PORT', 3000);
app.set('views', path.join(__dirname, 'views'));    //tell where is the views located
app.set('view engine', 'ejs');      //motor included in express,


    //middleware
app.use(morgan('dev'));                     //catch  http petitions
app.use(express.urlencoded( {extended: false} ));

//routes
app.use('/', indexRoutes);


app.listen(app.get('PORT'), () => {
    console.log('Funcionando en puerto ', app.get('PORT'));
});