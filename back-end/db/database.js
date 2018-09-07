const mongoose = require('mongoose');

const properties = require('../common/properties');

const DATABASE_INITIALIZE_MESSAGE = 'DATABASE INITIALIZED!';

function init() {
    mongoose.connect(properties.get('database.connection-string', {useNewUrlParser: true}));

    let database = mongoose.connection;

    database.once('open', (error) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(DATABASE_INITIALIZE_MESSAGE);
    });
}

module.exports = (function () {
    return {
        init: init
    }
}());