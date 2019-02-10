const mongoose = require('mongoose');
const conn = 'mongodb://admin:admin123@ds127825.mlab.com:27825/eventsdb';

mongoose.connect(conn, error => {
    if(error) {
        console.error('Connection fail '+ error);
        return;
    }
    console.log('Connected to MongoDB');
});

module.exports = mongoose;