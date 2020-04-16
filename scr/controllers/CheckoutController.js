const Course = require('../models/Course');
const User = require('../models/User');

const queryString = require('query-string');
// SDK de Mercado Pago
const mercadopago = require('mercadopago');

module.exports = {
    async store(req, res) {
        // User
        const { user, course } = req.body;

        // Query String
        const backUrlQuery = queryString.stringify({ user, course });

        // Dados do usuário
        const userData = await User.find({ _id: user });
        const { name, email } = userData[0];
        
        // Dados do curso
        const courseData = await Course.find({ _id: course });
        const { title, price } = courseData[0];

        // Configura credenciais
        mercadopago.configure({
            access_token: 'TEST-1939877258476361-040102-49dc8bae9bafc9c74c384f50d25fa234-10098978'
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
        return res.json({
            'url': response.body.init_point
        });
    }
};