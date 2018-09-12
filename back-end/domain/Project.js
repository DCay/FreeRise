const mongoose = require('mongoose');

let projectSchema = mongoose.Schema({
    title: {type: "string", required: "true"},
    description: {type: "string", required: "true"},
    requirements: {type: "string", required: "true"},
    daysActive: {type: "Number", required: "true"},
    category: {type: "string", required: "true"},
    file: {type: "string"},
    client: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    freelancer: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    applicants: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

let Project = mongoose.model('Project', projectSchema);

module.exports = Project;