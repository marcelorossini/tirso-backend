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
            result.error = e;
        // Return
        } finally {
            return res.json(result);
        }
    },
    async store(req, res) {      
        // Try
        let result = {};
        try {
            // Busca no db
            result = await Course.create(data);
        // Error
        } catch (e) {
            result.error = e;
        // Return
        } finally {
            return res.json(result);
        }        
    }
};