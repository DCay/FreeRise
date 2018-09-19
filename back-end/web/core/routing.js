const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');

const authService = require('../services/authenticationService');

let publicRoutes = {
    routes: [
        '/api/users/freelancer/register',
        '/api/users/client/register',
        '/api/users/login',
        '/api/users/reset'
    ],
    contains: function (route) {
        return this.routes.filter(r => r === route).length > 0;
    }
};

let allowedMethods = {
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    contains: function (method) {
        return this.methods.filter(m => m === method).length > 0;
    }
}

function configure(router) {
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        let token = req.header('Authorization') || 'Invalid';

        if(!publicRoutes.contains(req.url) && allowedMethods.contains(req.method)) {
            authService.verify(token, req, res, next);
        } else {
            next();
        }
    });

    router.post('/api/users/freelancer/register', userController.registerFreelancer);
    router.post('/api/users/client/register', userController.registerClient);
    router.post('/api/users/login', userController.loginUser);
    router.post('/api/users/logout', userController.logoutUser);
    router.post('/api/users/change/password', userController.changeUserPassword);
    router.post('/api/users/change/email', userController.changeUserEmail);
    router.post('/api/users/reset/password', userController.resetUserPassword);
    router.post('/api/users/delete', userController.deleteUser);

    router.get('/api/home', (req, res) => {
        res.status(200).send({message: 'CONGRATULATIONS!!! YOU DID IT!!!'})
    });

    router.post('/api/projects/create', projectController.createProject);
    router.get('/api/projects/files/:name', projectController.retrieveProjectFile);
}

module.exports = (function () {
    return {
        configure: configure
    }
}());