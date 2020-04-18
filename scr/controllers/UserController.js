const axios = require('axios');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        // Dados
        const data = req.query;

        // Try
        let result = {};
        try {
            // Busca no db
            result = await User.find(data);
        // Error
        } catch (e) {
            result.error = e;
        // Return
        } finally {
            return res.json(result);
        }
    },
    async store(req, res) {
        // Recebe o usuário
        const data = req.body;
        const { email } = data;

        // Tenta
        let result = {};
        try {
        // Atualiza/Grava
            await User.findOneAndUpdate({ email }, data, { upsert: true, new: true, useFindAndModify: false }, (error, doc) => {
                return res.json(doc);
            });         
        // Error
        } catch (e) {
            result.error = e;
            return res.json(result);         
        }
    }
};