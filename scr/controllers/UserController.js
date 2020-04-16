const axios = require('axios');
const User = require('../models/User');

module.exports =  {
    async index(req, res) {
        // Dados
        const data = req.query;

        // Busca no db
        const user = await User.find(data);

        // Retorna
        return res.json(user);
    },
    async store(req, res) {
        // Recebe o usuário
        const { email } = req.body;

        /*
        // Pesquisa o usuário no db, se ja houver, retorna
        const userExists = await User.findOne({ email });        
        if (userExists) {
            return res.json({error: `O email ${email} já está cadastrado!`});
        }
        */

        // Seleciona o que pegar do retorno
        const user = await User.create(req.body);

        // Retorna
        return res.json(user);
    }
};