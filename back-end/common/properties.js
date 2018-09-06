let properties = {
    'server.port': 8000,
    'server.init-message': 'Server listening on port: {port}.',
    'database.connection-string': 'mongodb://localhost:27017/freerise_db',
    'authentication.jwt-secret': 'JWT_FR252097800623'
};

module.exports = (function () {
    return {
        get: function (propertyName) {
            return properties[propertyName];
        }
    }
}());
