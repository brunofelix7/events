const mongoose = require('mongoose');
const schema = mongoose.Schema;

const eventSchema = new schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true }
});

module.exports = mongoose.model('event', eventSchema, 'events');