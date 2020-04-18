const express = require('express');
const routes = express.Router();

// Controllers
const UserController = require('./controllers/UserController');
const OrderController = require('./controllers/OrderController');
const CourseController = require('./controllers/CourseController');

// Services
const MercadoPagoService = require('./services/MercadoPago');
const Mailer = require('./services/Mailer');

// Rotas
// Checkout
routes.post('/checkout', MercadoPagoService.checkout);
// Usuário
routes.get('/user', UserController.index);
routes.post('/user', UserController.store);
// Compra
routes.get('/order', OrderController.index);
routes.post('/order', OrderController.store);
// Curso
routes.get('/course/:param?', CourseController.index);
routes.post('/course', CourseController.store);
// Email
routes.post('/mail/send', Mailer.send);

module.exports = routes;