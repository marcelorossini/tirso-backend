// Models
const Course = require('../models/Course');
const User = require('../models/User');

// Node mailer
const nodemailer = require('nodemailer');

module.exports = {
    async send(req, res) {
        // Dados 
        const { user, course } = req.body;

        // Dados do usuário
        const userData = await User.find({ _id: user });
        // Verifica se existe
        if (typeof userData[0] === "undefined")
            throw {message: 'Usuário não encontrado'};
        const { name, email } = userData[0];
        
        // Dados do curso
        const courseData = await Course.find({ _id: course });
        // Verifica se existe
        if (typeof courseData[0] === "undefined")
            throw {message: 'Curso não encontrado'};            
        const { title } = courseData[0];        

        // Dados de conexão
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER,
            port: process.env.EMAIL_PORT,
            secure: false, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Opções do email
        let mailOptions = {
            from: `"Tirso Cursos e Treinamentos" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Pagamento confirmado!',
            html: `Olá, ${name}! <br>Você comprou: ${title}<br>Seu pagamento foi confirmado com sucesso. Logo enviaremos os dados para acesso ao curso, por favor aguarde!`
        };

        // Envia
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.json({ status: 'success' });
            }
        });
    }
};