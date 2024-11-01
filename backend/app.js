const express = require('express'); 
const studentRoutes = require('./routes/studentRoute'); 
const cors = require('cors'); 
const app = express(); 
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/admin', studentRoutes);
module.exports = app;
