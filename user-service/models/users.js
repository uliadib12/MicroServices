const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid username'],
        minlength: [3, 'Username must be at least 3 characters long'],
    },
    email: {
        type: String,
        requred: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true
    },
}, { versionKey: false });

const User = mongoose.model('user', userSchema);

module.exports = User;