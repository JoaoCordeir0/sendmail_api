const nodemailer = require('nodemailer');
const emailModel = require('../models/emailModel')
const recipientModel = require('../models/recipientModel')
const log = require("../controllers/logController")

module.exports = class SendMail {

    constructor(group, email) {
        this.group = group;
        this.email = email;
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async send() {
        try {
            const recipients = await recipientModel.findAll({ where: { groupId: this.group }})
            const emailTemplate = await emailModel.findOne({ where: { id: this.email }}) 

            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: false,
                auth: {
                    user: process.env.EMAIL_DOMAIN,
                    pass: process.env.EMAIL_PASS
                },
                tls: { rejectUnauthorized: false }
            });

            recipients.forEach(async recipient => {                                       
                const mailOptions = {
                    from: process.env.EMAIL_DOMAIN,
                    to: recipient.email,
                    subject: emailTemplate.title,
                    html: (emailTemplate.body).replace('<<name>>', recipient.name)
                }
            
                transporter.sendMail(mailOptions, function (err, info) {
                    let status = err ? err.response : 'sent'

                    log.register({
                        type: 'SendMail',
                        name: '{"emailId": "' + emailTemplate.id + '", "emailTitle": "' + emailTemplate.title + '", "groupId": "' + recipient.groupId + '"}',                        
                        description: '{"name": "' + recipient.name + '", "email": "'+ recipient.email +'", "status": "' + status + '"}'
                    })                     
                });       

                await this.sleep(1000);
            });                       
        } catch (err) {
            log.register({
                type: 'Err',
                name: err.name + ' | processSendMailer',
                description: err.message
            })            
        }
      
        // Example demo async task

        // for(let c = 0; c < 50; c++)
        // {
        //     fs.writeFile('./' + this.fila + '.txt', c.toString(), (err) => {
        //         if (err)
        //             console.log(err)
        //     });     

        //     await this.sleep(2000);
        // }
    }
}
