const axios = require('axios');
const Course = require('../models/Course');

module.exports = {
    async index(req, res) {
        // Dados
        const data = { ...req.query, ...({ inativ: false }) };
        console.log(data);

        // Try
        let result = {};
        try {
            // Busca no db
            result = await Course.find(data).sort({ order: 1 })
        // Error
        } catch (e) {
            result.error = e.message;
        // Return
        } finally {
            return res.json(result);
        }
    },
    async store(req, res) {    
        // Dados requisição
        const data = req.body;
                  
        // Try
        let result = {};
        try {
            // Busca no db
            result = await Course.create(data);
        // Error
        } catch (e) {
            result.error = e.message;
        // Return
        } finally {
            return res.json(result);
        }        
    }
};