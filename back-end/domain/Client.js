const mongoose = require('mongoose');

let clientSchema = mongoose.Schema({
    firstName: {type: "string", required: "true"},
    lastName: {type: "string", required: "true"},
    account: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

let Client = mongoose.model('Client', clientSchema);

module.exports = Client;