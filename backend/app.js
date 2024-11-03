const express = require('express'); 
const studentRoutes = require('./routes/studentRoute'); 
const teacherRoutes = require('./routes/teacherRoute'); 
const courseRoutes = require('./routes/courseRoute'); 
const loginRoutes = require('./routes/loginRoute')
const cors = require('cors'); 
const app = express(); 
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/admin', studentRoutes);
app.use('/admin',teacherRoutes);
app.use('/admin',courseRoutes);
app.use('',loginRoutes);
module.exports = app;
