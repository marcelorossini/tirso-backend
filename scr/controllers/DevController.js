const axios = require('axios');
const Dev = require('../models/Dev');

module.exports =  {
    async index(req, res) {
        // Usuário logado
        const { user } = req.headers;
        const loggedDev = await Dev.findById(user);

        // Busca no db
        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ],
        });

        // Retorna
        return res.json(users);
    },
    async store(req, res) {
        // Recebe o usuário
        const { username } = req.body;

        // Pesquisa o usuário no db, se ja houver, retorna
        const userExists = await Dev.findOne({ user: username });        
        if (userExists) {
            return res.json(userExists);
        }

        // Se o usuário não existir no db, busca do GitHub
        const response = await axios.get(`https://api.github.com/users/${username}`);
        // Seleciona o que pegar do retorno
        const { name, login, bio, avatar_url: avatar} = response.data;
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        // Retorna
        return res.json(dev);
    }
};