const bcrypt = require('bcrypt');

const User = require('../../domain/User');
const Freelancer = require('../../domain/Freelancer');
const Client = require('../../domain/Client');
const authService = require('../services/authenticationService');

function registerFreelancer(req, res) {
    let userData = {
        username: req.body.username,
        password: req.body.password
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
            let data = {message: 'Successfully registered Freelancer - {user}.'};

            data.message = data.message.replace('{user}', u.username);

            res
                .status(200)
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(data));
        }).catch(err => {
            res
                .status(500)
                .send(err);
        });
    }).catch(err => {
        res
            .status(500)
            .send(err);
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
            let data = {message: 'Successfully registered Client - {user}.'};

            data.message = data.message.replace('{user}', u.username);

            res
                .status(200)
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(data));
        });
    }).catch(err => {
        res
            .status(500)
            .send(err);
    });
}

function loginUser(req, res) {
    let userData = req.body;

    User.findOne({username: userData.username}).then(user => {
        let status = 200;
        let data = {message: ''};

        if (!user) {
            status = 400;
            data.message = 'Username or password is invalid!';
        } else if (user.password !== userData.password) {
            status = 400;
            data.message = 'Username or password is invalid!';
        } else {
            data.message = 'Successfully logged in!';
            data.authToken = authService.signin(user.username);
        }

        res
            .status(status)
            .send(JSON.stringify(data));
    });
}

module.exports = (function () {
    return {
        registerFreelancer: registerFreelancer,
        registerClient: registerClient,
        loginUser: loginUser
    }
}());