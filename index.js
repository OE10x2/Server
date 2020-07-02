const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const app = express();

//Initialize middleware: "app.use(logger);"

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Setup static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API routes
app.use('/api/members', require('./routes/api/members'));

//It is possible to render HTML code here.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server at port ${PORT}`));