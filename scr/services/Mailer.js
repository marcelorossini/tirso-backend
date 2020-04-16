var nodemailer = require('nodemailer');

module.exports =  {
    async send(req, res) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'mar.18.celo@gmail.com',
              pass: 'mAr43571807'
            }
          });
          
          var mailOptions = {
            from: 'mar.18.celo@gmail.com',
            to: 'marcelo@hsist.com.br',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        return res.json({teste: 'asd'});
    }
};