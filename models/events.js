const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event