const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        // Variáveis auxiliares
        const { user } = req.headers;
        const { devId } = req.params;

        // Objetos do banco
        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        // Verifica se o dev existe
        if (!targetDev) {
            return res.status(400).json({ error: "Dev não existe"});
        }

        // Salva no banco
        loggedDev.dislikes.push(devId);
        await loggedDev.save();

        // Retorna
        return  res.json(loggedDev);
    }
};