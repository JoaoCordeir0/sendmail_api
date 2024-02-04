const sequelize = require('sequelize')
const conn = require('./database')
const Group = require('./groupModel')

const Recipients = conn.define('recipients', {  
    name: {
        type: sequelize.STRING,
        allowNull: false,        
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },              
})

// ForeignKeys
Recipients.belongsTo(Group, { constraint: true, foreignKey: { allowNull: false }})

// Um usuário para varios chamados
Group.hasMany(Recipients)

Recipients.sync({force: false})

module.exports = Recipients