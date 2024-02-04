const groupModel = require('../models/groupModel')
const log = require("./logController")

// Function by insert groups
const register = async (request, response) => {
    groupModel.create({
        name: request.body.name
    }).then(() => {
        response.status(200).json({ message: 'Group insert success!' });
    }).catch((err) => {
        log.register({
            type: 'Err',
            name: err.name + ' | groupRegister',
            description: err.message
        })
        response.status(500).json({ message: "Internal error!" });
    })
}

module.exports = {
    register,   
}