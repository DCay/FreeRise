const bcrypt = require('bcrypt');

const User = require('../../domain/User');
const Freelancer = require('../../domain/Freelancer');
const Client = require('../../domain/Client');

const authService = require('../services/authenticationService');
const responseBuilderService = require('../services/responseBuilderService');

const SUCCESS_REGISTER_USER_MESSAGe = 'Successfully registered {type} - {user}';
const SUCCESS_REGISTER_FREELANCER_MESSAGE = SUCCESS_REGISTER_USER_MESSAGe.replace('{type}', 'Freelancer');
const SUCCESS_REGISTER_CLIENT_MESSAGE = SUCCESS_REGISTER_USER_MESSAGe.replace('{type}', 'Client');
const SUCCESS_LOGIN_MESSAGE = 'Successfully logged in!';

const FAILURE_LOGIN_INCORRECT_USER_OR_PASSWORD_MESSAGE = 'Username or password is invalid!';

function registerFreelancer(req, res) {
    let userData = {
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    };

    let freelancerData = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        skills: req.body.skills,
        resume: req.body.resume,
        phone: req.body.phone
    };

    User.create(userData).then(u => {
        freelancerData.account = u;

        Freelancer.create(freelancerData).then(f => {
            let data = {message: SUCCESS_REGISTER_FREELANCER_MESSAGE.replace('{user}', u.username)};

            responseBuilderService.ok(res, data);
        });
    }).catch(err => {
        let data = {message: err};

        responseBuilderService.internalServerError(res, data);
    });
}

function registerClient(req, res) {
    let userData = {
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    };

    let clientData = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    User.create(userData).then(u => {
        clientData.account = u;

        Client.create(clientData).then(f => {
            let data = {message: SUCCESS_REGISTER_CLIENT_MESSAGE.replace('{user}', u.username)};

            responseBuilderService.ok(res, data);
        });
    }).catch(err => {
        let data = {message: err};

        responseBuilderService.internalServerError(res, data);
    });
}

function loginUser(req, res) {
    let userData = req.body;

    User.findOne({username: userData.username}).then(user => {
        let data = {};

        if (!user || user.password !== userData.password) {
            data.message = FAILURE_LOGIN_INCORRECT_USER_OR_PASSWORD_MESSAGE;
            responseBuilderService.badRequest(res, data);
        } else {
            data.message = SUCCESS_LOGIN_MESSAGE;
            data.authToken = authService.signin(user.username);
            responseBuilderService.ok(res, data);
        }
    });
}

module.exports = (function () {
    return {
        registerFreelancer: registerFreelancer,
        registerClient: registerClient,
        loginUser: loginUser
    }
}());