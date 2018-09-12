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

function configure(router) {
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        let token = req.header('Authorization') || 'Invalid';

        if(!publicRoutes.contains(req.url)) {
            authService.verify(token, req, res, next);
        } else {
            next();
        }
    });

    router.post('/api/users/freelancer/register', userController.registerFreelancer);
    router.post('/api/users/client/register', userController.registerClient);
    router.post('/api/users/login', userController.loginUser);
    router.post('/api/users/reset', userController.resetPassword);

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