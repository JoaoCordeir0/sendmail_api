const recipientsModel = require('../models/recipientModel')
const sequelize = require('../models/database')
const log = require("./logController")

const register = async (request, response) => {
    let recipients = JSON.parse(JSON.stringify(request.body.recipients))
    let group = request.body.group

    const t = await sequelize.transaction();

    try {
        for (let i = 0; i < Object.keys(recipients).length; i++) {
            await recipientsModel.create({
                name: recipients[i].name,
                email: recipients[i].email,
                status: 1,
                groupId: group
            }, { transaction: t })  
        }

        await t.commit();

        response.status(200).json({ message: 'Recipients registered successfully!' });
    } catch (err) {       
        await t.rollback();        
   
        description_err = 'parent' in err ? err.parent.sqlMessage : err.errors

        log.register({
            type: 'Err',
            name: err.name + ' | recipientsRegister',
            description: description_err
        })
          
        response.status(500).json({ message: 'Internal error!', description: description_err });
    }
}

module.exports = {
    register,   
}