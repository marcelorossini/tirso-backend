const axios = require('axios');
const WaitingList = require('../models/WaitingList');

// Models
const Course = require('../models/Course');
const User = require('../models/User');

// Serviços
const Mailer = require('../services/MailerService');

module.exports = {
    async index(req, res) {
        // Dados
        const data = req.query;

        // Try
        let result = {};
        try {
            // Busca no db
            result = await WaitingList.find(data)
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
            result = await WaitingList.create(data);
            
            // Dados do usuário
            const userData = await User.findOne({ _id: result.user });
            
            // Dados do curso
            const courseData = await Course.findOne({ _id: result.course });            

            // Envia email
            await Mailer.send({ type: 'waitlist', userData, courseData });
        // Error
        } catch (e) {
            result.error = e.message;
        // Return
        } finally {
            return res.json(result);
        }        
    }
};