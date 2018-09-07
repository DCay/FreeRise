const jwt = require('jsonwebtoken');

const properties = require('../../common/properties');
const responseBuilderService = require('./responseBuilderService');

const CREDENTIALS_BAD_FORMAT_MESSAGE = 'Error: Credentials are in bad format.';
const UNIDENTIFIED_CREDENTIALS_MESSAGE = 'Error: Unidentified credentials.';

const AUTH_TOKEN_EXPIRATION_TIME = 3600;
const AUTH_TOKEN_HASHING_ALGORITHM = 'HS256';
const AUTH_TOKEN_PREFIX = 'Bearer';

function verify(token, req, res, next) {
    let tokenArgs = token.split(' ');

    let data = {};

    if (tokenArgs[0] !== AUTH_TOKEN_PREFIX) {
        data.message = CREDENTIALS_BAD_FORMAT_MESSAGE;

        responseBuilderService.badRequest(res, data);
    } else {
        jwt.verify(tokenArgs[1], properties.get('authentication.jwt-secret'), (err, decoded) => {
            if (err) {
                data.message = UNIDENTIFIED_CREDENTIALS_MESSAGE;

                responseBuilderService.unauthorized(res, data);
            } else {
                req.auth = decoded.data;

                next();
            }
        });
    }
}

function signin(data) {
    let tokenData = {
        data: data
    };

    let tokenSecret = properties.get('authentication.jwt-secret');

    let tokenConfig = {
        expiresIn: AUTH_TOKEN_EXPIRATION_TIME,
        algorithm: AUTH_TOKEN_HASHING_ALGORITHM
    };

    return jwt.sign(tokenData, tokenSecret, tokenConfig);
}

module.exports = (function () {
    return {
        verify: verify,
        signin: signin
    }
}());