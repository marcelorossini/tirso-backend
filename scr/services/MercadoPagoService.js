// Models
const Order = require('../models/Order')
const Course = require('../models/Course');
const User = require('../models/User');

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Outros
const queryString = require('query-string');

module.exports = {
    async checkout(params) {
        // User
        const { user, course } = params;

        // Try
        let result = {};
        try {
            // Dados do usuário
            const userData = await User.findOne({ _id: user });
            // Verifica se existe
            if (!userData)
                throw {message: 'Usuário não encontrado'};
            const { name, email } = userData;
            
            // Dados do curso
            const courseData = await Course.findOne({ _id: course });
            // Verifica se existe
            if (!courseData)
                throw {message: 'Curso não encontrado'};            
            const { title, price } = courseData;

            // Cria registro de compra
            const orderData = await Order.create({ user, course });
            
            // Query String
            const backUrlQuery = queryString.stringify({ order: orderData._id });            

            // Configura credenciais
            mercadopago.configure({
                access_token: process.env.MP_ACCESS_TOKEN
            });

            // Cria um objeto de preferência
            let preference = {
                binary_mode: true,
                items: [
                    {
                        title: `CURSO ${title} - TIRSO CURSOS E TREINAMENTOS`,
                        quantity: 1,
                        currency_id: 'BRL',
                        unit_price: price
                    }
                ],
                payer: {
                    name: name.split(' ').slice(0, -1).join(' '),
                    surname: name.split(' ').slice(-1).join(' '),
                    email
                },
                back_urls: {
                    success: `${process.env.APP_URL}/processar/aprovado?${backUrlQuery}`,
                    failure: `${process.env.APP_URL}/processar/erro?${backUrlQuery}`,
                    pending: `${process.env.APP_URL}/processar/pendente?${backUrlQuery}`
                },
                auto_return: "all",
                payment_methods: {
                    excluded_payment_types: [
                        {
                            id: "ticket"
                        }
                    ],
                    installments: 12
                }
            };

            // Chama mercado pago
            const response = await mercadopago.preferences.create(preference);

            // Retorna
            result.url = response.body.init_point;
        // Error
        } catch (e) {
            result.error = e.message;
        // Return
        } finally {
            return result;
        }
    }
};