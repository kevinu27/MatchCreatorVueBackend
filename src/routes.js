const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
    app.post('/register', 
    AuthenticationControllerPolicy.register, // cuando esto entre en la url register va air pasando por estos middlewares, primero el de policies para ver que los datos estan bien, despues al siguiente
    AuthenticationController.register
    )

    app.post('/login', 
    AuthenticationController.login
    )
}