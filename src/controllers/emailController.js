const emailModel = require('../models/emailModel')
const log = require("./logController")

// Function by insert email
const register = async (request, response) => {
    emailModel.create({
        title: request.body.title,
        body: request.body.body,
        status: 1,
    }).then(() => {
        response.status(200).json({ message: 'Email insert success!' });
    }).catch((err) => {
        log.register({
            type: 'Err',
            name: err.name + ' | emailRegister',
            description: err.message
        })     
        response.status(500).json({ message: "Internal error!" });
    })
}

module.exports = {
    register,
}