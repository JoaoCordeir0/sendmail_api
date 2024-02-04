const sequelize = require('sequelize')
const conn = require('./database')

const Email = conn.define('emails', {
    title: {
        type: sequelize.STRING,
        allowNull: false,
    },
    body: {
        type: sequelize.TEXT,
        allowNull: false,        
    },   
    status: {
        type: sequelize.BOOLEAN,
        allowNull: false,
    }
})

Email.sync({force: false})

module.exports = Email

