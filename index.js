const express = require('express');
const bars = require('express-handlebars');
const path = require('path');
const app = express();
const members = require('./members');

/*Initialize middleware:
const logger = require('./middleware/logger');
"app.use(logger);"
*/

//Handlebars Middleware
app.engine('handlebars', bars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

//Setup static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API routes
app.use('/api/members', require('./routes/api/members'));

//It is possible to render HTML code here.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server at port ${PORT}`));