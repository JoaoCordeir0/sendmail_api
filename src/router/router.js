const express = require('express')
const router = express.Router()
const middleware = require("../middleware/auth");

const recipients = require('../controllers/recipientController')
const group = require('../controllers/groupController')
const email = require('../controllers/emailController')
const mailer = require('../controllers/sendmailController')

router.post('/mailer/start', mailer.start)
router.post('/email/register', email.register)
router.post('/group/register', group.register)
router.post('/recipient/register', recipients.register)

// Welcome router
router.get('/', (request, response) => { response.render('welcome') })
 
module.exports = router