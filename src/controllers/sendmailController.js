const SendMail = require('../services/sendmail')
const emailModel = require('../models/emailModel')
const recipientModel = require('../models/recipientModel')

// Function by start process send emails
const start = async (request, response) => {
    let group = request.body.group
    let email = request.body.email

    if (isNullOrEmpty(group) || isNullOrEmpty(email))
    {
        response.status(500).json({ message: "Email or group not provided!"})
    }    
    
    const have_email = await emailModel.count({ where: { id: email } })
    const have_recipient = await recipientModel.count({ where: { groupId: group } })

    if (!have_email || !have_recipient)      
    {
        response.status(500).json({ message: "Invalid email or recipients!"})
    }
    else 
    {
        const mail = new SendMail(group, email)
        mail.send()

        response.status(200).json({ message: "Success, process started!"})
    }            
}
 
const isNullOrEmpty = (string) => {
    if (string == null)
        return true
    if (string == undefined)
        return true
    if (string == '')
        return true
    if (string == ' ')
        return true
    return false
}

module.exports = {
    start,   
}