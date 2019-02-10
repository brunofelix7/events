const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const api = require('./src/routes/api');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

app.listen(PORT, () => {
    console.log(`API running on localhost:${PORT}...`);
});