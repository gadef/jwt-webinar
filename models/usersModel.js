const mongoose = require('mongoose');

const users = new mongoose.Schema({
    user: { type: String, required: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('users', users);