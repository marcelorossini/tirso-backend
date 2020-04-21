const axios = require('axios');
const Course = require('../models/Course');

module.exports = {
    async index(req, res) {
        // Dados
        const data = req.query;

        // Try
        let result = {};
        try {
            // Busca no db
            result = await Course.find(data)
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