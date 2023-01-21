// express middleware para validar algnos requirements y formatos

const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string()
            // .regex(
            //     new RegExp('^[a-zA-Z0-9]{8,32}$')
            // )
        }
            // todo esto de abajo e incluso la regla de regex la puedo quitar porque esto lo hago por frontend
        const {error, value} = new Joi.ValidationError(req.body, schema)
        
        if(error){
            switch(error.details[0].context.key){
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email adress'
                    })
                  break
                case 'password':
                    res.status(400).send({
                        error: `the password provided failed to match teh following rules:
                        <br>
                        1. it must contain only the following characters: lower case, upper case, numerics 
                        <br>
                        2. It must be at least 8 characters in legths and not greater than 32 `
                    })
                  break
                default:
                    res,status(400).send({
                        error: 'invalid registration information'
                    })
            }
        } else {
            next()

        }
       
    }
}