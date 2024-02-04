const log = require('../controllers/logController')

const auth = (request, response, next) => {
    const token = request.body.token || request.query.token || request.headers['x-access-token']

    if (!token)     
        return response.status(403).json({ message: 'A token is required for authentication' })    
    
    try 
    {
        jwt.verify(token, process.env.TOKEN_KEY)                

        return next()
    } 
    catch (err) 
    {
        log.register({             
            type: 'Err',
            name: err.message,   
            description: token,                                
        }) 

        return response.status(401).json({ message: 'Invalid or expired Token' })
    }    
}

module.exports = {
    auth,
}