const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: {type: "string", required: "true", unique: "true"},
    password: {type: "string", required: "true"},
    email: {type: "string", required: "true", unique: "true"},
    type: {type: "string", required: "true"}
});

let User = mongoose.model('User', userSchema);

module.exports = User;