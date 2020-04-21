// Models
const Mail = require('../models/Mail');

// Node mailer
const nodemailer = require('nodemailer');

module.exports = {
    async send(params) {
        // Dados 
        const { userData: user, courseData: course, type } = params;

        // Tipo email
        let _id = null;
        if (type === 'approved') {
            _id = process.env.EMAIL_APPROVED;
        } else if (type === 'waitlist') {
            _id = process.env.EMAIL_WAITLIST;
        }
        // Se nenhum configurado, sai da rotina
        if ( _id === null ) {
            return { status: false, info: '' };
        }
        // Dados do email
        const mail = await Mail.findOne({ _id });        

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

        // Trata conteudo HTML
        const variables = [...mail.html.matchAll(/\{(.*?)\}/g)];
        for (item in variables) {
            mail.html = mail.html.replace(new RegExp(variables[item][0],'g'), eval(variables[item][1]));
        }    

        // Opções do email
        const mailOptions = {
            from: `"Tirso Cursos e Treinamentos" <${process.env.EMAIL_USER}>`,
            to: `${user.email}, ${process.env.EMAIL_USER}`,
            subject: mail.title,
            html: mail.html
        };

        // Envia
        transporter.sendMail(mailOptions, (error, info) => {
            return { status: !error, info };
        });
    }
};