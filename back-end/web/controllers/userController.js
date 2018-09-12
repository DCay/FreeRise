const bcrypt = require('bcrypt');

const User = require('../../domain/User');
const Freelancer = require('../../domain/Freelancer');
const Client = require('../../domain/Client');

const authService = require('../services/authenticationService');
const responseBuilderService = require('../services/responseBuilderService');

const USER_FREELANCER_TYPE = 'FREELANCER';
const USER_CLIENT_TYPE = 'CLIENT';

const SUCCESS_REGISTER_USER_MESSAGe = 'Successfully registered {type} - {user}';
const SUCCESS_REGISTER_FREELANCER_MESSAGE = SUCCESS_REGISTER_USER_MESSAGe.replace('{type}', 'Freelancer');
const SUCCESS_REGISTER_CLIENT_MESSAGE = SUCCESS_REGISTER_USER_MESSAGe.replace('{type}', 'Client');
const SUCCESS_LOGIN_MESSAGE = 'Successfully logged in!';
const SUCCESS_RESET_PASSWORD_SUCCESS_MESSAGE = 'You have been sent an email to reset your password.';

const FAILURE_LOGIN_INCORRECT_USER_OR_PASSWORD_MESSAGE = 'Username or password is invalid!';
const FAILURE_RESET_PASSWORD_INCORRECT_EMAIL_MESSAGE = 'There is no user with the given email.';

function registerFreelancer(req, res) {
    let userData = {
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        email: req.body.email,
        type: USER_FREELANCER_TYPE
    };

    let freelancerData = {
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
        confirmPassword: req.body.confirmPassword,
        email: req.body.email,
        type: USER_CLIENT_TYPE
    };

    let clientData = {
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
            data.authToken = authService.signin({username: user.username, type: user.type});
            responseBuilderService.ok(res, data);
        }
    });
}

function resetPassword(req, res) {
    User.findOne({email: req.body.email}).then(u => {
        if(!u) {
            responseBuilderService.badRequest(res, {message: FAILURE_RESET_PASSWORD_INCORRECT_EMAIL_MESSAGE});

            return;
        }

        responseBuilderService.ok(res, {message: SUCCESS_RESET_PASSWORD_SUCCESS_MESSAGE});
    }).catch(err => {
        console.log(err);
        responseBuilderService.internalServerError(res, {message: err});
    });
}

module.exports = (function () {
    return {
        registerFreelancer: registerFreelancer,
        registerClient: registerClient,
        loginUser: loginUser,
        resetPassword: resetPassword
    }
}());