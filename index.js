const express = require('express');
const path = require('path');
const app = express();

//Setup static folder
app.use(express.static(path.join(__dirname, 'public')));

//It is possible to render HTML code here.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server at port ${PORT}`));