const mongoose = require('mongoose');
const schema = mongoose.Schema;

const specialSchema = new schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true }
});

module.exports = mongoose.model('special', specialSchema, 'special');