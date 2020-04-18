const axios = require('axios');
const Order = require('../models/Order');

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
            result.error = e;
            // Return
        } finally {
            return res.json(result);
        }
    },
    async store(req, res) {
        // Pega ID
        const data = req.body;
        const { collection_id } = data;

        // Tenta
        let result = {};
        try {
        // Atualiza/Grava
            await Order.findOneAndUpdate({ collection_id }, data, { upsert: true, new: true, useFindAndModify: false }, (error, doc) => {
                return res.json(doc);
            });
        // Error
        } catch (e) {
            result.error = e;
            return res.json(result);
        }
    }
};