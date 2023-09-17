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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
  
    next();
  });

app.get('/',(req,res,next) => {
    res.json({message: 'Hi this is foods API, you might want to go to /api to receive data!'});
})

app.use('/api',foodRoutes);

app.get('/*',(req,res,next) => {
    res.json({error: '404 Not found! Sure you got the right address?'});
})

mongoose.connect(`${process.env.MONGODB_URL}`).then(
    app.listen(5000, () => {
        console.log('Database and server connected');
    })
).catch(error => {
    console.log(error);
})