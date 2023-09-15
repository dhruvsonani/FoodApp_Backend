const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const foodRoutes = require('./routes/Food');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

app.get('/',(req,res,next) => {
    res.json({message: 'Hi this is foods API, you might want to go to /api to receive data!'});
})

app.use('/api',foodRoutes);

app.get('/*',(req,res,next) => {
    res.json({error: '404 Not found! Sure you got the right address?'});
})

mongoose.connect('mongodb+srv://dhruvsonani1008:mviekcVnCt33phSL@cluster0.uc0nhal.mongodb.net/Zwiggy_Meals?retryWrites=true&w=majority').then(
    app.listen(5000, () => {
        console.log('Database and server connected');
    })
).catch(error => {
    console.log(error);
})