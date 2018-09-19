const mongoose = require('mongoose');

let freelancerSchema = mongoose.Schema({
    firstName: {type: "string", required: "true"},
    lastName: {type: "string", required: "true"},
    skills: {type: [String], default: []},
    resume: {type: "string", required: "true"},
    phone: {type: "string"},
    account: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

let Freelancer = mongoose.model('Freelancer', freelancerSchema);

module.exports = Freelancer;