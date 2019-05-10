const express = require('express');
const app = express();
const cors = require('cors');
//const bodyParser = require('body-parser');
const env = require('./config/env');

app.use(cors());
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));*/

require('./routes.js')(app);

console.log(app.listen(env.port) ? `Server connected on port ${env.port}` : `Error server on port ${env.port}`);