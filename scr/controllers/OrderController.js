const axios = require('axios');

// Models
const Order = require('../models/Order');
const Course = require('../models/Course');
const User = require('../models/User');

// Seviços
const MercadoPago = require('../services/MercadoPagoService');
const Mailer = require('../services/MailerService');

module.exports = {
    async index(req, res) {
        // Dados
        const data = req.query;

        // Try
        let result = {};
        try {
            // Busca no db
            result = await Order.find(data);
            // Error
        } catch (e) {
            result.error = e.message;
            // Return
        } finally {
            return res.json(result);
        }
    },
    async create(req, res) {
        // Cria compra no mercado pago
        const response = await MercadoPago.checkout(req.body);
        res.json(response);
    },
    async store(req, res) {
        // Dados requisição
        const { _id, ...data} = req.body;

        // Tenta
        let result = {};
        try {
            // Verifica se existe
            const order = await Order.findOne({ _id });
            if (!order) 
                throw {message: 'Compra não existe'};
            
            // Grava
            order.collection_id = data.collection_id;
            order.collection_status = data.collection_status;
            order.external_reference = data.external_reference;
            order.payment_type = data.payment_type;
            order.merchant_order_id = data.merchant_order_id;
            order.preference_id = data.preference_id;
            order.site_id = data.site_id;
            order.processing_mode = data.processing_mode;
            order.merchant_account_id = data.merchant_account_id;
            await order.save();

            // Dados do usuário
            const userData = await User.findOne({ _id: order.user });
            
            // Dados do curso
            const courseData = await Course.findOne({ _id: order.course });

            // Envia email
            await Mailer.send({ type: 'approved', userData, courseData });

            // Retorno
            return res.json({
                order,
                user: userData,
                course : courseData
            });            
        // Error
        } catch (e) {
            result.error = e.message;
            return res.json(result);
        }
    }
};