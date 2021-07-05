const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')


const app = express()
const router = express.Router()

router.use(express.static('dist'))
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/user', (req, res) => {
    res.send(req.body.user)
})

app.use('/.netlify/functions/api', router)

module.exports.handler = serverless(app)