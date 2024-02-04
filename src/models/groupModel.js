const sequelize = require('sequelize')
const conn = require('./database')

const Group = conn.define('groups', {
    name: {
        type: sequelize.STRING,
        allowNull: false,        
    },   
})

Group.sync({force: false})

module.exports = Group

