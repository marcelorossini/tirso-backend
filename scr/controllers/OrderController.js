const axios = require('axios');
const Order = require('../models/Order');

module.exports =  {
    async index(req, res) {
        // Dados
        const data = req.query;

        // Busca no db
        const order = await Order.find(data);

        // Retorna
        return res.json({order});
    },
    async store(req, res) {
        // Pega ID
        const data = req.body;
        const { collection_id } = data;
        
        // Atualiza / Insere
        await Order.findOneAndUpdate({ collection_id }, data, {upsert: true, new: true, useFindAndModify: false},(error, doc) => {
            return res.json(doc);        
        });
    }
};