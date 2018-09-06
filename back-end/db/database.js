const mongoose = require('mongoose');

const properties = require('../common/properties');

function init() {
    mongoose.connect(properties.get('database.connection-string', {useNewUrlParser: true}));

    let database = mongoose.connection;

    database.once('open', (error) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log('Database Initialized!')
    });
}

module.exports = (function () {
    return {
        init: init
    }
}());