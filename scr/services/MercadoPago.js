// Models
const Course = require('../models/Course');
const User = require('../models/User');

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Outros
const queryString = require('query-string');

module.exports = {
    async checkout(req, res) {
        // User
        const { user, course } = req.body;

        // Query String
        const backUrlQuery = queryString.stringify({ user, course });

        // Try
        let result = {};
        try {
            // Dados do usuário
            const userData = await User.find({ _id: user });
            // Verifica se existe
            if (typeof userData[0] === "undefined")
                throw {message: 'Usuário não encontrado'};
            const { name, email } = userData[0];
            
            // Dados do curso
            const courseData = await Course.find({ _id: course });
            // Verifica se existe
            if (typeof courseData[0] === "undefined")
                throw {message: 'Curso não encontrado'};            
            const { title, price } = courseData[0];

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
                    installments: 1
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
            return res.json(result);
        }
    }
};