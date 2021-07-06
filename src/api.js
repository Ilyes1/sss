const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')


const app = express()
const router = express.Router()

router.use(express.static('dist'))
router.use(bodyParser.urlencoded({ extended: true }))


router.post('/user', (req, res) => {
    res.send(req.body.user)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ihannouch7@gmail.com',
          pass: 'Qwertylyes8'
        }
      });
    
      var mailOptions = {
        from: 'ihannouch7@gmail.com',
        to: req.body.user,
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
})

app.use('/.netlify/functions/api', router)

module.exports.handler = serverless(app)