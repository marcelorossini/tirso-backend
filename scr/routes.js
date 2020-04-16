const express = require('express');
const CheckoutController = require('./controllers/CheckoutController');
const UserController = require('./controllers/UserController');
const OrderController = require('./controllers/OrderController');
const CourseController = require('./controllers/CourseController');

const Mailer = require('./services/Mailer');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({ message: "Teste"});
});

routes.post('/checkout', CheckoutController.store);
routes.post('/checkout/process', CheckoutController.store);

routes.get('/user', UserController.index);
routes.post('/user', UserController.store);

routes.get('/order', OrderController.index);
routes.post('/order', OrderController.store);

routes.get('/course/:param?', CourseController.index);
routes.post('/course', CourseController.store);

routes.get('/mail/send', Mailer.send);

/*
routes.get('/data', DataController.index);
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);
*/

module.exports = routes;