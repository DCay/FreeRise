const bcrypt = require('bcrypt');

const User = require('../../domain/User');
const Freelancer = require('../../domain/Freelancer');
const Client = require('../../domain/Client');

const authService = require('../services/authenticationService');
const responseBuilderService = require('../services/responseBuilderService');

const USER_FREELANCER_TYPE = 'FREELANCER';
const USER_CLIENT_TYPE = 'CLIENT';

const SUCCESS_REGISTER_USER_MESSAGE = 'Successfully registered {type} - {user}';
const SUCCESS_REGISTER_FREELANCER_MESSAGE = SUCCESS_REGISTER_USER_MESSAGE.replace('{type}', 'Freelancer');
const SUCCESS_REGISTER_CLIENT_MESSAGE = SUCCESS_REGISTER_USER_MESSAGE.replace('{type}', 'Client');
const SUCCESS_LOGIN_MESSAGE = 'Successfully logged in!';
const SUCCESS_LOGOUT_MESSAGE = 'Successfully logged out!';
const SUCCESS_CHANGE_USER_PASSWORD_MESSAGE = 'User password successfully changed.';
const SUCCESS_CHANGE_USER_EMAIL_MESSAGE = 'User email successfully changed.';
const SUCCESS_DELETE_USER_MESSAGE = 'User successfully deleted.';
const SUCCESS_RESET_PASSWORD_SUCCESS_MESSAGE = 'You have been sent an email to reset your password.';

const INCORRECT_USER_OR_PASSWORD_MESSAGE = 'Username or password is invalid!';
const INCORRECT_EMAIL_MESSAGE = 'There is no user with the given email.';
const INCORRECT_PASSWORD_MESSAGE = 'The password you have entered is incorrect.';
const INCORRECT_OLD_PASSWORD_MESSAGE = 'The old password you have entered is incorrect.';
const NEW_PASSWORDS_DO_NOT_MATCH_MESSAGE = 'New passwords do not match.';

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
            data.message = INCORRECT_USER_OR_PASSWORD_MESSAGE;
            responseBuilderService.badRequest(res, data);
        } else {
            data.message = SUCCESS_LOGIN_MESSAGE;
            data.authToken = authService.signin({username: user.username, type: user.type});
            responseBuilderService.ok(res, data);
        }
    });
}

function logoutUser(req, res) {
    responseBuilderService.ok(res, {message: SUCCESS_LOGOUT_MESSAGE});
}

function changeUserPassword(req, res) {
    let userData = {
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
        confirmNewPassword: req.body.confirmNewPassword
    };

    if(userData.newPassword !== userData.confirmNewPassword) {
        responseBuilderService.badRequest(res, {message: NEW_PASSWORDS_DO_NOT_MATCH_MESSAGE});
        return;
    }

    User.findOneAndUpdate({username: req.auth.username, password: userData.oldPassword}, {password: userData.newPassword}).then(u => {
        if(!u) {
            responseBuilderService.badRequest(res, {message: INCORRECT_OLD_PASSWORD_MESSAGE});
            return;
        }

        responseBuilderService.ok(res, {message: SUCCESS_CHANGE_USER_PASSWORD_MESSAGE});
    }).catch(err => {
        responseBuilderService.internalServerError(res, {message: err});
    });
}

function changeUserEmail(req, res) {
    let userData = {
        password: req.body.password,
        newEmail: req.body.newEmail,
    };

    User.findOneAndUpdate({username: req.auth.username, password: userData.password}, {email: userData.newEmail}).then(u => {
        if(!u) {
            responseBuilderService.badRequest(res, {message: INCORRECT_PASSWORD_MESSAGE});
            return;
        }

        responseBuilderService.ok(res, {message: SUCCESS_CHANGE_USER_EMAIL_MESSAGE});
    }).catch(err => {
        responseBuilderService.internalServerError(res, {message: err});
    });
}

function deleteUser(req, res) {
    let userData = {
        password: req.body.password
    };

    User.findOneAndDelete({username: req.auth.username, password: userData.password}).then(u => {
        if(!u) {
            responseBuilderService.badRequest(res, {message: INCORRECT_PASSWORD_MESSAGE});
            return;
        }

        responseBuilderService.ok(res, {message: SUCCESS_DELETE_USER_MESSAGE});
    }).catch(err => {
        responseBuilderService.internalServerError(res, {message: err});
    });
}

function resetUserPassword(req, res) {
    User.findOne({email: req.body.email}).then(u => {
        if(!u) {
            responseBuilderService.badRequest(res, {message: INCORRECT_EMAIL_MESSAGE});

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
        logoutUser: logoutUser,
        changeUserPassword: changeUserPassword,
        changeUserEmail: changeUserEmail,
        deleteUser: deleteUser,
        resetUserPassword: resetUserPassword
    }
}());