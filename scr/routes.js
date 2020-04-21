const express = require('express');
const routes = express.Router();

// Controllers
const UserController = require('./controllers/UserController');
const OrderController = require('./controllers/OrderController');
const CourseController = require('./controllers/CourseController');
const MailController = require('./controllers/MailController');
const WaitingList = require('./controllers/WaitingListController');

// Rotas
routes.get('/',(req, res) => {
    return res.send('');
});

// Usuário
routes.get('/user', UserController.index);
routes.post('/user', UserController.store);
// Compra
routes.get('/order', OrderController.index);
routes.post('/order/checkout', OrderController.create);
routes.post('/order', OrderController.store);
// Lista de espera
routes.get('/waiting/list', WaitingList.index);
routes.post('/waiting/list', WaitingList.store);
// Curso
routes.get('/course/:param?', CourseController.index);
routes.post('/course', CourseController.store);
// Email
routes.get('/mail/:param?', MailController.index);
routes.post('/mail', MailController.store);

module.exports = routes;