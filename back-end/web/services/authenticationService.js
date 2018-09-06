const properties = require('../../common/properties');
const jwt = require('jsonwebtoken');

function verify(token, req, res, next) {
    let tokenArgs = token.split(' ');

    if(tokenArgs[0] !== 'Bearer') {
        res
            .status(400)
            .send(JSON.stringify({message: 'Error: Credentials are in bad format.'}));

        return;
    }

    jwt.verify(tokenArgs[1], properties.get('authentication.jwt-secret'), (err, decoded) => {
        if(err) {
            res
                .status(401)
                .send(JSON.stringify({message: 'Error: Unidentified credentials.'}));

            return;
        }

        req.auth = decoded.data;
        next();
    });
}

function signin(data) {
    let tokenData = {
        data: data
    };

    let tokenSecret = properties.get('authentication.jwt-secret');

    let tokenConfig = {
        expiresIn: 3600,
        algorithm: 'HS256'
    };

    return jwt.sign(tokenData, tokenSecret, tokenConfig);
}

module.exports = (function () {
    return {
        verify: verify,
        signin: signin
    }
}());