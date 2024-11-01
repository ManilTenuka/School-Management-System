const express = require('express'); 
const studentRoutes = require('./routes/studentRoute'); 
const app = express(); 
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/admin', studentRoutes);
module.exports = app;
