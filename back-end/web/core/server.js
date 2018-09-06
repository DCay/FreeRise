const express = require('express');
const router = express.Router();
const app = express();

const properties = require('../../common/properties');
const routing = require('./routing');
const database = require('../../db/database');

const port = process.env.port || properties.get('server.port');
const serverInitializeListeningMessage = properties.get('server.init-message');

database.init();

routing.configure(router);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen(port, () => console.log(serverInitializeListeningMessage.replace('{port}', port)));
