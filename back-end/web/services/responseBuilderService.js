function prepareResponse(res) {
    res.set('Content-Type', 'application/json');
}

function ok(res, data) {
    prepareResponse(res);

    res
        .status(200)
        .send(JSON.stringify(data));
}

function badRequest(res, data) {
    prepareResponse(res);

    res
        .status(400)
        .send(JSON.stringify(data));
}

function unauthorized(res, data) {
    prepareResponse(res);

    res
        .status(401)
        .send(JSON.stringify(data));
}

function forbidden(res, data) {
    prepareResponse(res);

    res
        .status(403)
        .send(JSON.stringify(data));
}

function notFound(res, data) {
    prepareResponse(res);

    res
        .status(404)
        .send(JSON.stringify(data));
}

function internalServerError(res, data) {
    prepareResponse(res);

    res
        .status(500)
        .send(JSON.stringify(data));
}

module.exports = (function () {
    return {
        ok: ok,
        badRequest: badRequest,
        unauthorized: unauthorized,
        forbidden: forbidden,
        notFound: notFound,
        internalServerError: internalServerError
    }
}());