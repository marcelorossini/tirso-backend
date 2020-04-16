const axios = require('axios');
const Course = require('../models/Course');

module.exports =  {
    async index(req, res) {
        // Dados
        const param = req.query;

        // Busca no db
        let courses = [];
        try {
            courses = await Course.find(param)
        } catch (error) {            
        }

        // Retorna
        return res.json(courses);
    },
    async store(req, res) {
        // Dados
        let object = req.body;

        // Gera url
        /*
        const url = object.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g,'-');
        object = {...object, url};        

        // Id video youtube
        console.log(req.body.);
        let  { query } = require('url').parse('https://www.youtube.com/watch?v=sJcrAcEKKEY&t=2266s', true);
        console.log(query.v);
        return res.send({});
        */
        // Seleciona o que pegar do retorno
        const course = await Course.create(object);

        // Retorna
        return res.json(course);
    }
};